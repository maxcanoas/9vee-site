// A medida do Lighthouse mobile que os dois scripts usam: o do build local (lighthouse.ts) e o do site no ar
// (lighthouse-no-ar.ts). Cada página mede num processo próprio, que roda este arquivo com o endereço: o
// Lighthouse não devolve a memória entre as rodadas, e as páginas pesadas do Wix estouraram o limite do Node.
// O pacote não fica no package.json: npm install --no-save lighthouse@13.5.0
import { execFile } from 'node:child_process';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';

export const RODADAS = 3;

// A régua do retrato do antes (docs/antes.md): com outra versão, o antes e o depois deixam de ser comparáveis.
const VERSAO_DO_LIGHTHOUSE = '13.5.0';
const { version: versaoInstalada } = createRequire(import.meta.url)('lighthouse/package.json') as { version: string };
if (versaoInstalada !== VERSAO_DO_LIGHTHOUSE) {
  console.error(
    `O retrato do antes mediu com o Lighthouse ${VERSAO_DO_LIGHTHOUSE}, e o instalado é o ${versaoInstalada}. ` +
      `Instale a mesma versão: npm install --no-save lighthouse@${VERSAO_DO_LIGHTHOUSE}`,
  );
  process.exit(1);
}

const CAMPOS = ['performance', 'acessibilidade', 'praticas', 'seo', 'lcp', 'cls', 'tbt'] as const;
type Campo = (typeof CAMPOS)[number];

// Nota ou valor que o Lighthouse não conseguiu calcular numa rodada fica null, e não 0: um zero falso
// derrubaria a mediana. Foi o que deu Boas práticas 0 na primeira medida da home do Wix.
type Rodada = Record<Campo, number | null>;

interface Mediana {
  valor: number | null;
  rodadasComValor: number;
}

interface Medida {
  campos: Record<Campo, Mediana>;
  versoes: string;
}

interface Pagina {
  nome: string;
  url: string;
}

async function medirRodada(url: string, portaDoChrome: number): Promise<Rodada | null> {
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
    performance: nota('performance'),
    acessibilidade: nota('accessibility'),
    praticas: nota('best-practices'),
    seo: nota('seo'),
    lcp: valor('largest-contentful-paint'),
    cls: valor('cumulative-layout-shift'),
    tbt: valor('total-blocking-time'),
  };
}

// A versão completa vem do próprio Chrome. O user agent que o Lighthouse guarda é o reduzido, que zera tudo
// depois do número principal (154.0.0.0).
async function versaoDoChrome(porta: number): Promise<string> {
  const resposta = await fetch(`http://127.0.0.1:${porta}/json/version`);
  const { Browser } = (await resposta.json()) as { Browser: string };
  return /\/([\d.]+)/.exec(Browser)?.[1] ?? 'de versão desconhecida';
}

// Com um número par de valores, a média dos dois do meio, e não o maior.
function medianaDe(valores: (number | null)[]): Mediana {
  const validos = valores.filter((valor): valor is number => valor !== null).sort((a, b) => a - b);
  if (validos.length === 0) return { valor: null, rodadasComValor: 0 };
  const meio = Math.floor(validos.length / 2);
  const valor = validos.length % 2 === 1 ? validos[meio] : (validos[meio - 1] + validos[meio]) / 2;
  return { valor, rodadasComValor: validos.length };
}

async function medirNesteProcesso(url: string): Promise<Medida> {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new'] });
  try {
    const versaoChrome = await versaoDoChrome(chrome.port);
    const rodadas: Rodada[] = [];
    for (let i = 0; i < RODADAS; i++) {
      const rodada = await medirRodada(url, chrome.port);
      if (rodada) rodadas.push(rodada);
    }
    if (rodadas.length === 0) throw new Error(`nenhuma das ${RODADAS} rodadas carregou ${url}`);
    const campos = Object.fromEntries(
      CAMPOS.map((campo) => [campo, medianaDe(rodadas.map((rodada) => rodada[campo]))]),
    ) as Record<Campo, Mediana>;
    return { campos, versoes: `Lighthouse ${VERSAO_DO_LIGHTHOUSE} e Chrome ${versaoChrome}` };
  } finally {
    await chrome.kill();
  }
}

const executar = promisify(execFile);
const ESTE_ARQUIVO = fileURLToPath(import.meta.url);

// Assíncrono, para o servidor local do lighthouse.ts continuar respondendo enquanto a página é medida.
async function medirPagina(url: string): Promise<Medida> {
  const { stdout, stderr } = await executar(process.execPath, [...process.execArgv, ESTE_ARQUIVO, url], {
    timeout: 10 * 60 * 1000,
  });
  if (stderr) process.stderr.write(stderr);
  return JSON.parse(stdout) as Medida;
}

const CABECALHO_DA_TABELA = [
  '| Página | Perf. | Acess. | Práticas | SEO | LCP | CLS | TBT |',
  '|---|---|---|---|---|---|---|---|',
];

// Quando alguma rodada não deu valor, a célula diz de quantas a mediana saiu: "96 (2 de 3)".
function celula({ valor, rodadasComValor }: Mediana, formato: (numero: number) => string): string {
  if (valor === null) return 'sem nota';
  return rodadasComValor < RODADAS ? `${formato(valor)} (${rodadasComValor} de ${RODADAS})` : formato(valor);
}

function linhaDaTabela(nome: string, { campos }: Medida): string {
  const nota = (mediana: Mediana) => celula(mediana, String);
  const lcp = celula(campos.lcp, (ms) => `${(ms / 1000).toFixed(2)} s`);
  const cls = celula(campos.cls, (valor) => valor.toFixed(3));
  const tbt = celula(campos.tbt, (ms) => `${Math.round(ms)} ms`);
  const notas = [campos.performance, campos.acessibilidade, campos.praticas, campos.seo].map(nota);
  return `| ${nome} | ${notas.join(' | ')} | ${lcp} | ${cls} | ${tbt} |`;
}

// Cada linha também sai por aCadaLinha assim que fica pronta: se uma página falhar, as de antes não se perdem.
export async function medirTabela(paginas: Pagina[], aCadaLinha: (linha: string) => void): Promise<string[]> {
  const linhas: string[] = [];
  const escrever = (linha: string) => {
    linhas.push(linha);
    aCadaLinha(linha);
  };
  CABECALHO_DA_TABELA.forEach(escrever);
  // O Chrome se atualiza sozinho, como entre as duas medidas do Wix em 29/09, e pode mudar no meio de uma
  // medida: cada versão que mediu aparece no fim.
  const versoes = new Set<string>();
  for (const { nome, url } of paginas) {
    const medida = await medirPagina(url);
    versoes.add(medida.versoes);
    escrever(linhaDaTabela(nome, medida));
  }
  escrever('');
  escrever(`Medido com ${[...versoes].join('; ')}.`);
  return linhas;
}

// Rodado direto com um endereço, este arquivo é o processo próprio de uma página: mede e imprime a medida.
if (process.argv[1] && resolve(process.argv[1]) === ESTE_ARQUIVO) {
  console.log(JSON.stringify(await medirNesteProcesso(process.argv[2])));
}
