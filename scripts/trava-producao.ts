// A trava de produção: o que não pode ir ao ar no site definitivo. Lê uma pasta de build e devolve
// cada achado, na ordem das páginas. O `npm run check:producao` roda esta verificação sobre dist-producao/.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';
import { arquivoDaRota, carregarPaginas, type Pagina } from './paginas-do-build.ts';

export type Regra = 'pendencia' | 'placeholder' | 'obra' | 'noindex' | 'travessao' | 'link';

export interface Achado {
  regra: Regra;
  /** A rota da página, ou o nome do arquivo quando o achado não é de uma página. */
  rota: string;
  detalhe: string;
}

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

function marcasDeObra(pagina: Pagina): string[] {
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

const REGRAS: [Regra, (pagina: Pagina, pasta: string) => string[]][] = [
  ['pendencia', pendencias],
  ['placeholder', placeholders],
  ['obra', marcasDeObra],
  ['noindex', noindex],
  ['travessao', travessoes],
  ['link', linksQuebrados],
];

export function verificarBuild(pasta: string): Achado[] {
  const achados: Achado[] = carregarPaginas(pasta).flatMap((pagina) =>
    REGRAS.flatMap(([regra, verificar]) =>
      verificar(pagina, pasta).map((detalhe) => ({ regra, rota: pagina.rota, detalhe })),
    ),
  );
  // O cabeçalho de noindex que o build de preview deixa para a Cloudflare.
  const cabecalhos = join(pasta, '_headers');
  if (existsSync(cabecalhos)) {
    for (const linha of readFileSync(cabecalhos, 'utf8').split('\n')) {
      if (/x-robots-tag:.*noindex/i.test(linha)) achados.push({ regra: 'noindex', rota: '_headers', detalhe: linha.trim() });
    }
  }
  return achados;
}
