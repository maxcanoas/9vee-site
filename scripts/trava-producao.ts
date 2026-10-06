// A trava de produção: o que não pode ir ao ar no site definitivo. Lê uma pasta de build e devolve
// cada achado, na ordem das páginas. O `npm run check:producao` roda esta verificação sobre dist-producao/.
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { parse } from 'node-html-parser';
import { PASTAS_COM_PUBLICACAO, publicadaNoArquivo } from '../src/lib/publicacao.ts';
import { pendenciasDoArquivo } from '../src/lib/texto.ts';
import { arquivoDaRota, carregarPaginas, listarArquivos, type Pagina } from './paginas-do-build.ts';

const PENDENCIA_CRUA = /\[CONFIRMAR[^\]]*\]/g;
// As marcas do MVP, pelo elemento e não pelo texto: a resposta "Em construção" do formulário de NR-1 é
// conteúdo de verdade. São a etiqueta das páginas parciais e o aviso de que o pedido não era enviado.
const MARCAS_DO_MVP = '.hero-pagina__etiqueta, .drawer__simulado';
const TRAVESSAO = /[—–]/g;
// As marcas de revisão de src/lib/texto.ts que escaparam cruas, sem virar destaque.
const REVISAO_CRUA = /\[(?:NOVO|SAI):[^\]]*\]/g;

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

/**
 * O que ainda está em revisão com o cliente: a legenda, a seção inteira nova (pelo título dela), o trecho novo e o que
 * sai. Depois da aprovação, as marcas saem do conteúdo e a página vai ao ar com o texto revisado.
 */
function marcasDeRevisao(pagina: Pagina): string[] {
  const marcadas = pagina.raiz.querySelectorAll('.revisao').map((marca) => {
    const texto = (marca.querySelector('h2, h3') ?? marca).text.replace(/\s+/g, ' ').trim();
    return texto.length > 80 ? `${texto.slice(0, 79)}…` : texto;
  });
  const cruas = [...pagina.html.matchAll(REVISAO_CRUA)].map(([trecho]) => trecho);
  return [...marcadas, ...cruas];
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

/**
 * A chave do serviço de formulário que o build entrega ao pedido, lida dos dados dele no HTML. É a mesma em todas
 * as páginas: a primeira que tem o pedido responde. Build sem pedido não tem o que conferir.
 */
function chaveDoPedido(paginas: Pagina[]): string | undefined {
  for (const { raiz } of paginas) {
    const dados = raiz.querySelector('#dados-contato')?.textContent;
    if (dados) return (JSON.parse(dados) as { envio?: { chave?: string } }).envio?.chave ?? '';
  }
  return undefined;
}

/**
 * O pedido que não chegaria à 9vee: o build sem a chave, que só oferece o WhatsApp, e o build com a chave de teste
 * do preview, que mandaria os pedidos para o e-mail de teste.
 */
function pedidoSemDestino(paginas: Pagina[], chaveDeTeste: string | undefined): string[] {
  const chave = chaveDoPedido(paginas);
  if (chave === undefined) return [];
  if (!chave) return ['sem a FORMULARIO_CHAVE do .env.producao: nenhum pedido chegaria à 9vee'];
  if (chave === chaveDeTeste) return ['com a chave de teste do .env.preview: os pedidos iriam para o e-mail de teste'];
  return [];
}

/**
 * A medição que não mediria o que conta: o build sem o ID do GA4 no aviso de cookies, e o build com o ID da
 * propriedade de teste do local, que misturaria as visitas de verdade com as de teste. Build sem aviso não tem o que
 * conferir.
 */
function medicaoSemDestino(paginas: Pagina[], ga4DeTeste: string | undefined): string[] {
  const aviso = paginas.map(({ raiz }) => raiz.querySelector('[data-aviso-cookies]')).find(Boolean);
  if (!aviso) return [];
  const ga4 = aviso.getAttribute('data-ga4') ?? '';
  if (!ga4) return ['sem o GA4_ID do .env.producao: o site não mediria nada'];
  if (ga4 === ga4DeTeste) return ['com o ID da propriedade de teste do .env.development: as visitas iriam para o teste'];
  return [];
}

/**
 * Cada regra, com o nome que o check:producao mostra e o que ela procura em cada página. Regra nova entra só aqui.
 * A do formulário e a da medição não têm o que procurar em cada página: elas olham o build uma vez.
 */
export const REGRAS = {
  pendencia: { nome: 'Pendência sem resposta', naPagina: pendencias },
  placeholder: { nome: 'Placeholder no lugar da imagem', naPagina: placeholders },
  obra: { nome: 'Marca do MVP (etiqueta de obra ou envio simulado)', naPagina: marcasDoMvp },
  revisao: { nome: 'Marca de revisão (texto do cliente ainda não aprovado)', naPagina: marcasDeRevisao },
  noindex: { nome: 'Noindex', naPagina: noindex },
  travessao: { nome: 'Travessão ou meia-risca', naPagina: travessoes },
  link: { nome: 'Link interno quebrado', naPagina: linksQuebrados },
  formulario: { nome: 'Pedido sem destino (a chave do serviço de formulário)' },
  medicao: { nome: 'Medição sem destino (o ID do GA4)' },
  redirecionamento: { nome: 'Redirecionamento para página que não está no build (o .htaccess)' },
} satisfies Record<string, { nome: string; naPagina?: (pagina: Pagina, pasta: string) => string[] }>;

export type Regra = keyof typeof REGRAS;

export interface Achado {
  regra: Regra;
  /** A rota da página, ou o arquivo, quando o achado não é de uma página. */
  onde: string;
  detalhe: string;
}

/**
 * As pendências da fonte, em content/. A página nem sempre mostra a pendência como marca: a faixa de números
 * da home tira a nota do texto, e o título, a descrição e o JSON-LD saem sem ela. O arquivo de página não
 * publicada, nas pastas que têm a marca, fica de fora, porque ela não entra no build de produção.
 */
export function pendenciasNoConteudo(pastaDoConteudo: string): Achado[] {
  const base = dirname(pastaDoConteudo);
  return listarArquivos(pastaDoConteudo, '.md').flatMap((arquivo) => {
    const texto = readFileSync(arquivo, 'utf8');
    const pasta = relative(pastaDoConteudo, arquivo).split(sep)[0];
    if (PASTAS_COM_PUBLICACAO.includes(pasta) && !publicadaNoArquivo(texto)) return [];
    return pendenciasDoArquivo(texto).map(({ nota }) => ({
      regra: 'pendencia' as const,
      onde: relative(base, arquivo).split(sep).join('/'),
      detalhe: nota,
    }));
  });
}

/**
 * Os 301 do .htaccess (ticket 19) que levam a uma página fora do build: a página deixou de ser publicada depois que o
 * mapa foi gerado. As regras gerais (https, www e a barra no fim) não têm destino fixo e ficam de fora.
 */
export function redirecionamentosQuebrados(pasta: string): string[] {
  const arquivo = join(pasta, '.htaccess');
  if (!existsSync(arquivo)) return [];
  return readFileSync(arquivo, 'utf8')
    .split('\n')
    .flatMap((linha) => {
      const [, origem, destino] = /^RewriteRule (\S+) https:\/\/www\.9vee\.com\.br(\/[^\s%$]*) \[R=301,L\]$/.exec(linha) ?? [];
      return destino && !existsSync(arquivoDaRota(pasta, destino)) ? [`${origem} leva a ${destino}, que não está no build`] : [];
    });
}

/** A chave de teste é a do .env.preview: com ela, a trava reconhece a chave que não pode ir para a produção. */
export function verificarBuild(
  pasta: string,
  { chaveDeTeste, ga4DeTeste }: { chaveDeTeste?: string; ga4DeTeste?: string } = {},
): Achado[] {
  const regras = Object.entries(REGRAS) as [Regra, { nome: string; naPagina?: (pagina: Pagina, pasta: string) => string[] }][];
  const paginas = carregarPaginas(pasta);
  const achados: Achado[] = paginas.flatMap((pagina) =>
    regras.flatMap(([regra, { naPagina }]) =>
      (naPagina?.(pagina, pasta) ?? []).map((detalhe) => ({ regra, onde: pagina.rota, detalhe })),
    ),
  );
  for (const detalhe of pedidoSemDestino(paginas, chaveDeTeste)) {
    achados.push({ regra: 'formulario', onde: 'pedido de contato', detalhe });
  }
  for (const detalhe of medicaoSemDestino(paginas, ga4DeTeste)) {
    achados.push({ regra: 'medicao', onde: 'aviso de cookies', detalhe });
  }
  for (const detalhe of redirecionamentosQuebrados(pasta)) {
    achados.push({ regra: 'redirecionamento', onde: '.htaccess', detalhe });
  }
  // O cabeçalho de noindex que o build de preview deixa para a Cloudflare.
  const cabecalhos = join(pasta, '_headers');
  if (existsSync(cabecalhos)) {
    for (const linha of readFileSync(cabecalhos, 'utf8').split('\n')) {
      if (/x-robots-tag:.*noindex/i.test(linha)) achados.push({ regra: 'noindex', onde: '_headers', detalhe: linha.trim() });
    }
  }
  return achados;
}
