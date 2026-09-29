// A medida do Lighthouse mobile que os dois scripts usam: o do build local (lighthouse.ts) e o do site no ar
// (lighthouse-no-ar.ts). O pacote não fica no package.json: instale antes com `npm install --no-save lighthouse`.
import lighthouse from 'lighthouse';

export const RODADAS = 3;

// Nota ou valor que o Lighthouse não conseguiu calcular numa rodada fica null, e não 0: um zero falso
// derrubaria a mediana. Foi o que deu Boas práticas 0 na primeira medida da home do Wix.
export interface Medida {
  performance: number | null;
  acessibilidade: number | null;
  praticas: number | null;
  seo: number | null;
  lcp: number | null;
  cls: number | null;
  tbt: number | null;
}

async function medir(url: string, portaDoChrome: number): Promise<Medida> {
  const { lhr } = (await lighthouse(url, { port: portaDoChrome, output: 'json', logLevel: 'error' }))!;
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

/** A mediana das rodadas que deram valor; null se nenhuma deu. */
function mediana(valores: (number | null)[]): number | null {
  const validos = valores.filter((valor): valor is number => valor !== null).sort((a, b) => a - b);
  return validos.length ? validos[Math.floor(validos.length / 2)] : null;
}

/** A mediana de RODADAS medidas de uma página, pronta para a tabela. */
export async function medirPagina(url: string, portaDoChrome: number): Promise<Medida> {
  const medidas: Medida[] = [];
  for (let i = 0; i < RODADAS; i++) medidas.push(await medir(url, portaDoChrome));
  const m = (campo: keyof Medida) => mediana(medidas.map((medida) => medida[campo]));
  return {
    performance: m('performance'),
    acessibilidade: m('acessibilidade'),
    praticas: m('praticas'),
    seo: m('seo'),
    lcp: m('lcp'),
    cls: m('cls'),
    tbt: m('tbt'),
  };
}

export const CABECALHO_DA_TABELA = [
  '| Página | Perf. | Acess. | Práticas | SEO | LCP | CLS | TBT |',
  '|---|---|---|---|---|---|---|---|',
];

const ou = (valor: number | null, formato: (numero: number) => string) => (valor === null ? 'sem nota' : formato(valor));

export function linhaDaTabela(nome: string, m: Medida): string {
  const nota = (valor: number | null) => ou(valor, String);
  return (
    `| ${nome} | ${nota(m.performance)} | ${nota(m.acessibilidade)} | ${nota(m.praticas)} | ${nota(m.seo)} | ` +
    `${ou(m.lcp, (lcp) => `${(lcp / 1000).toFixed(2)} s`)} | ${ou(m.cls, (cls) => cls.toFixed(3))} | ${ou(m.tbt, (tbt) => `${Math.round(tbt)} ms`)} |`
  );
}
