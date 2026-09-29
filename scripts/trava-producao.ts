// A trava de produção: o que não pode ir ao ar no site definitivo. Lê uma pasta de build e devolve
// cada achado, na ordem das páginas. O `npm run check:producao` roda esta verificação sobre dist-producao/.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';
import { arquivoDaRota, carregarPaginas, type Pagina } from './paginas-do-build.ts';

const PENDENCIA_CRUA = /\[CONFIRMAR[^\]]*\]/g;
// As marcas do MVP, pelo elemento e não pelo texto: a resposta "Em construção" do formulário de NR-1 é
// conteúdo de verdade. São a etiqueta das páginas parciais e o aviso de que o pedido não era enviado.
const MARCAS_DO_MVP = '.hero-pagina__etiqueta, .drawer__simulado';
const TRAVESSAO = /[—–]/g;

function pendencias(pagina: Pagina): string[] {
  const marcadas = pagina.raiz
    .querySelectorAll('mark.confirmar')
    .map((marca) => marca.getAttribute('title') ?? marca.text.trim());
  const cruas = [...pagina.html.matchAll(PENDENCIA_CRUA)].map(([trecho]) => trecho);
  return [...marcadas, ...cruas];
}

function placeholders(pagina: Pagina): string[] {
  return pagina.raiz
    .querySelectorAll('.placeholder')
    .map((placeholder) => placeholder.querySelector('.placeholder__id')?.text.trim() || 'Placeholder sem ID');
}

function marcasDoMvp(pagina: Pagina): string[] {
  return pagina.raiz.querySelectorAll(MARCAS_DO_MVP).map((marca) => marca.text.replace(/\s+/g, ' ').trim());
}

function noindex(pagina: Pagina): string[] {
  return pagina.raiz
    .querySelectorAll('meta[name="robots"]')
    .map((meta) => meta.getAttribute('content') ?? '')
    .filter((conteudo) => /noindex/i.test(conteudo))
    .map((conteudo) => `meta robots "${conteudo}"`);
}

function travessoes(pagina: Pagina): string[] {
  return [...pagina.html.matchAll(TRAVESSAO)].map(({ index }) =>
    pagina.html.slice(Math.max(0, index - 30), index + 30).replace(/\s+/g, ' '),
  );
}

/** Link para dentro do site que não abre, que não termina com barra ou que aponta uma âncora que não existe. */
export function linksQuebrados(pagina: Pagina, pasta: string): string[] {
  const problemas: string[] = [];
  for (const link of pagina.raiz.querySelectorAll('a[href]')) {
    const href = link.getAttribute('href') ?? '';
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const [caminho, ancora] = href.split('#');
    const destino = caminho ? arquivoDaRota(pasta, caminho) : pagina.arquivo;
    if (!existsSync(destino)) {
      problemas.push(`link quebrado: ${href}`);
      continue;
    }
    if (caminho && !caminho.includes('.') && !caminho.endsWith('/')) {
      problemas.push(`sem barra no fim: ${href}`);
      continue;
    }
    if (ancora) {
      const alvo = caminho ? parse(readFileSync(destino, 'utf8')) : pagina.raiz;
      if (!alvo.getElementById(ancora)) problemas.push(`âncora que não existe: ${href}`);
    }
  }
  return problemas;
}

/** Cada regra, com o nome que o check:producao mostra e o que ela procura em cada página. Regra nova entra só aqui. */
export const REGRAS = {
  pendencia: { nome: 'Pendência sem resposta', naPagina: pendencias },
  placeholder: { nome: 'Placeholder no lugar da imagem', naPagina: placeholders },
  obra: { nome: 'Marca do MVP (etiqueta de obra ou envio simulado)', naPagina: marcasDoMvp },
  noindex: { nome: 'Noindex', naPagina: noindex },
  travessao: { nome: 'Travessão ou meia-risca', naPagina: travessoes },
  link: { nome: 'Link interno quebrado', naPagina: linksQuebrados },
} satisfies Record<string, { nome: string; naPagina: (pagina: Pagina, pasta: string) => string[] }>;

export type Regra = keyof typeof REGRAS;

export interface Achado {
  regra: Regra;
  /** A rota da página, ou o arquivo, quando o achado não é de uma página. */
  onde: string;
  detalhe: string;
}

export function verificarBuild(pasta: string): Achado[] {
  const regras = Object.entries(REGRAS) as [Regra, (typeof REGRAS)[Regra]][];
  const achados: Achado[] = carregarPaginas(pasta).flatMap((pagina) =>
    regras.flatMap(([regra, { naPagina }]) =>
      naPagina(pagina, pasta).map((detalhe) => ({ regra, onde: pagina.rota, detalhe })),
    ),
  );
  // O cabeçalho de noindex que o build de preview deixa para a Cloudflare.
  const cabecalhos = join(pasta, '_headers');
  if (existsSync(cabecalhos)) {
    for (const linha of readFileSync(cabecalhos, 'utf8').split('\n')) {
      if (/x-robots-tag:.*noindex/i.test(linha)) achados.push({ regra: 'noindex', onde: '_headers', detalhe: linha.trim() });
    }
  }
  return achados;
}
