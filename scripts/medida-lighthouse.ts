// A medida do Lighthouse mobile que os dois scripts usam: o do build local (lighthouse.ts) e o do site no ar
// (lighthouse-no-ar.ts). Cada página mede num processo próprio, que roda este arquivo com o endereço: o
// Lighthouse não devolve a memória entre as rodadas, e as páginas pesadas do Wix estouraram o limite do Node.
// O pacote não fica no package.json. Instale a versão do retrato do antes, para o depois usar a mesma régua:
// npm install --no-save lighthouse@13.5.0
import { execFile } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';

export const RODADAS = 3;

const CAMPOS = ['performance', 'acessibilidade', 'praticas', 'seo', 'lcp', 'cls', 'tbt'] as const;
type Campo = (typeof CAMPOS)[number];

// Nota ou valor que o Lighthouse não conseguiu calcular numa rodada fica null, e não 0: um zero falso
// derrubaria a mediana. Foi o que deu Boas práticas 0 na primeira medida da home do Wix.
type Rodada = Record<Campo, number | null>;

/** A mediana de um campo e quantas rodadas deram valor para ele. */
export interface Valor {
  mediana: number | null;
  rodadas: number;
}

export interface Medida {
  campos: Record<Campo, Valor>;
  /** O Lighthouse e o Chrome que mediram: o depois precisa da mesma régua do antes. */
  versoes: string;
}

interface RodadaMedida {
  rodada: Rodada;
  /** A versão do Lighthouse que mediu a rodada. */
  lighthouse: string;
}

async function medirRodada(url: string, portaDoChrome: number): Promise<RodadaMedida | null> {
  const opcoes = { port: portaDoChrome, output: 'json' as const, logLevel: 'error' as const, disableFullPageScreenshot: true };
  const { lhr } = (await lighthouse(url, opcoes))!;
  // Página que não carregou (erro de rede, 404, tela em branco) não vale como rodada.
  if (lhr.runtimeError) {
    console.error(`rodada sem valor em ${url}: ${lhr.runtimeError.code}`);
    return null;
  }
  const nota = (id: string) => {
    const pontos = lhr.categories[id].score;
    return pontos === null ? null : Math.round(pontos * 100);
  };
  const valor = (id: string) => lhr.audits[id].numericValue ?? null;
  return {
    rodada: {
      performance: nota('performance'),
      acessibilidade: nota('accessibility'),
      praticas: nota('best-practices'),
      seo: nota('seo'),
      lcp: valor('largest-contentful-paint'),
      cls: valor('cumulative-layout-shift'),
      tbt: valor('total-blocking-time'),
    },
    lighthouse: lhr.lighthouseVersion,
  };
}

// A versão completa vem do próprio Chrome. O user agent que o Lighthouse guarda é o reduzido, que zera tudo
// depois do número principal (154.0.0.0).
async function versaoDoChrome(porta: number): Promise<string> {
  const resposta = await fetch(`http://127.0.0.1:${porta}/json/version`);
  const { Browser } = (await resposta.json()) as { Browser: string };
  return /\/([\d.]+)/.exec(Browser)?.[1] ?? 'de versão desconhecida';
}

/** A mediana dos valores que existem. Com um número par deles, a média dos dois do meio, e não o maior. */
function mediana(valores: (number | null)[]): Valor {
  const validos = valores.filter((valor): valor is number => valor !== null).sort((a, b) => a - b);
  const meio = Math.floor(validos.length / 2);
  if (validos.length === 0) return { mediana: null, rodadas: 0 };
  const resultado = validos.length % 2 === 1 ? validos[meio] : (validos[meio - 1] + validos[meio]) / 2;
  return { mediana: resultado, rodadas: validos.length };
}

// As RODADAS de uma página, num Chrome só, dentro do processo próprio dela.
async function medirNesteProcesso(url: string): Promise<Medida> {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new'] });
  try {
    const versaoChrome = await versaoDoChrome(chrome.port);
    const rodadas: RodadaMedida[] = [];
    for (let i = 0; i < RODADAS; i++) {
      const rodada = await medirRodada(url, chrome.port);
      if (rodada) rodadas.push(rodada);
    }
    if (rodadas.length === 0) throw new Error(`nenhuma das ${RODADAS} rodadas carregou ${url}`);
    const campos = Object.fromEntries(
      CAMPOS.map((campo) => [campo, mediana(rodadas.map(({ rodada }) => rodada[campo]))]),
    ) as Record<Campo, Valor>;
    return { campos, versoes: `Lighthouse ${rodadas[0].lighthouse} e Chrome ${versaoChrome}` };
  } finally {
    await chrome.kill();
  }
}

const executar = promisify(execFile);
const ESTE_ARQUIVO = fileURLToPath(import.meta.url);

/**
 * Mede a página num processo próprio, que roda este arquivo, e devolve a medida. Assíncrono, para o servidor
 * local do lighthouse.ts continuar respondendo enquanto a página é medida.
 */
export async function medirPagina(url: string): Promise<Medida> {
  const { stdout, stderr } = await executar(process.execPath, [...process.execArgv, ESTE_ARQUIVO, url], {
    timeout: 10 * 60 * 1000,
  });
  if (stderr) process.stderr.write(stderr);
  return JSON.parse(stdout) as Medida;
}

export const CABECALHO_DA_TABELA = [
  '| Página | Perf. | Acess. | Práticas | SEO | LCP | CLS | TBT |',
  '|---|---|---|---|---|---|---|---|',
];

// Quando alguma rodada não deu valor, a célula diz de quantas a mediana saiu: "96 (2 de 3)".
function celula({ mediana, rodadas }: Valor, formato: (numero: number) => string): string {
  if (mediana === null) return 'sem nota';
  return rodadas < RODADAS ? `${formato(mediana)} (${rodadas} de ${RODADAS})` : formato(mediana);
}

export function linhaDaTabela(nome: string, { campos }: Medida): string {
  const nota = (valor: Valor) => celula(valor, String);
  const lcp = celula(campos.lcp, (ms) => `${(ms / 1000).toFixed(2)} s`);
  const cls = celula(campos.cls, (valor) => valor.toFixed(3));
  const tbt = celula(campos.tbt, (ms) => `${Math.round(ms)} ms`);
  const notas = [campos.performance, campos.acessibilidade, campos.praticas, campos.seo].map(nota);
  return `| ${nome} | ${notas.join(' | ')} | ${lcp} | ${cls} | ${tbt} |`;
}

// Rodado direto com um endereço, este arquivo é o processo próprio de uma página: mede e imprime a medida.
if (process.argv[1] && resolve(process.argv[1]) === ESTE_ARQUIVO) {
  console.log(JSON.stringify(await medirNesteProcesso(process.argv[2])));
}
