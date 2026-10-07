// As regras do mapa de redirecionamentos (ticket 14; spec, "Preparação da migração"): para onde vai cada URL do site
// atual quando o domínio passar para o site novo. O destino é sempre uma página do build de produção, então nunca é
// página não publicada nem outra URL que redireciona (sem corrente).
import { CAMINHO_DA_INTERPRETACAO_DE_MANDARIM as INTERPRETACAO_DE_MANDARIM, caminhoDoIdioma } from '../src/lib/caminhos.ts';
import { caminhoDaCidade, TIPOS_DE_CIDADE } from '../src/lib/cidades.ts';

export { INTERPRETACAO_DE_MANDARIM };

export type Tipo = '301' | '410' | '200';

export interface Destino {
  destino: string;
  tipo: Tipo;
  motivo: string;
}

export type ServicoDoPost = 'idiomas' | 'traducao' | 'lms';

/** Uma página de cidade publicada e as palavras do endereço dos posts que apontam para ela. */
export interface CidadePublicada {
  caminho: string;
  termos: readonly string[];
}

export interface SiteNovo {
  /** Os caminhos das páginas do build de produção, com a barra no fim. */
  paginas: ReadonlySet<string>;
  /** As páginas de cidade publicadas: vazia enquanto nenhuma está no build de produção. */
  cidades: readonly CidadePublicada[];
}

export const CURSOS = '/curso-de-idiomas/';
const SUMIU = null;

// As palavras do endereço dos posts que apontam para cada página de cidade (o nome do arquivo em content/cidades/), com
// os bairros de São Paulo que o blog cita.
const TERMOS_DAS_CIDADES: Record<string, readonly string[]> = {
  'sao-paulo': ['sao-paulo', 'sp', 'av-paulista', 'faria-lima', 'itaim-bibi', 'jardins', 'perdizes', 'pinheiros', 'tatuape', 'vila-madalena', 'vila-mariana', 'vila-olimpia'],
  'rio-de-janeiro': ['rio-de-janeiro'],
  curitiba: ['curitiba'],
  brasilia: ['brasilia'],
};

/** As cidades cuja página está no build de produção, isto é, publicada, no endereço do tipo dela. */
export function cidadesPublicadas(paginas: ReadonlySet<string>): CidadePublicada[] {
  return Object.entries(TERMOS_DAS_CIDADES).flatMap(([id, termos]) =>
    TIPOS_DE_CIDADE.map((tipo) => caminhoDaCidade(id, tipo))
      .filter((caminho) => paginas.has(caminho))
      .map((caminho) => ({ caminho, termos })),
  );
}

// As páginas do site atual e o destino de cada uma no site novo. O curso de mandarim depende da publicação.
const PAGINAS_ANTIGAS: Record<string, string | ((site: SiteNovo) => Destino) | null> = {
  '/': '/',
  '/quem-somos': '/quem-somos/',
  '/lms': '/lms/',
  '/curso-de-idiomas': CURSOS,
  '/traducao-simultanea': '/traducao-simultanea/',
  '/politica-de-privacidade': '/politica-de-privacidade/',
  // O título no Wix é o do LMS, mas o conteúdo é o do treinamento de NR-1 (docs/urls-site-atual.csv).
  '/treinamentos': '/treinamento-nr-1/',
  // A landing de interpretação mandarim-português, em português, inglês e chinês (decisão 5 da spec, 30/09/2026).
  '/mandarim-portugues': INTERPRETACAO_DE_MANDARIM,
  '/mandarim-english': INTERPRETACAO_DE_MANDARIM,
  '/mandarim-chines': INTERPRETACAO_DE_MANDARIM,
  // "Mandarim -Old" no Wix: é a página do curso.
  '/mandarim': (site) => paginaDoIdioma('mandarim', site),
  // Decisão de 29/09/2026: o termo de uso é um modelo de plataforma, sem equivalente no site novo.
  '/termo-de-uso': SUMIU,
  '/blog': SUMIU,
  // A "Program List" do app Programas Online, com seis programas de modelo.
  '/challenges': SUMIU,
};

const MOTIVO_DA_PAGINA_QUE_SUMIU: Record<string, string> = {
  '/termo-de-uso': 'modelo de plataforma, sem equivalente no site novo',
  '/blog': 'o blog não vai para o site novo; os posts têm destino próprio',
  '/challenges': 'lista do app Programas Online, que não vai para o site novo',
};

// As palavras do endereço do post que apontam cada idioma, pelo nome do arquivo da página dele em content/idiomas/.
const TERMOS_DOS_IDIOMAS: Record<string, readonly string[]> = {
  ingles: ['ingles', 'toefl'],
  espanhol: ['espanhol'],
  frances: ['frances'],
  alemao: ['alemao'],
  italiano: ['italiano'],
  holandes: ['holandes', 'inburgering'],
  mandarim: ['mandarim', 'chines'],
  japones: ['japones'],
  noruegues: ['noruegues'],
  sueco: ['sueco'],
  russo: ['russo'],
  arabe: ['arabe'],
  'portugues-para-estrangeiros': ['portugues-para-estrangeiros'],
  cantones: ['cantones'],
};

// As palavras que apontam um serviço. A tradução vale antes do idioma; o LMS e os idiomas em geral, só sem idioma.
const TERMOS_DOS_SERVICOS: Record<ServicoDoPost, readonly string[]> = {
  traducao: ['traducao', 'interpretacao'],
  lms: ['lms'],
  idiomas: ['idiomas', 'linguas', 'imersao'],
};

const PAGINA_DO_SERVICO: Record<ServicoDoPost, string> = {
  idiomas: CURSOS,
  traducao: '/traducao-simultanea/',
  lms: '/lms/',
};

const NOME_DO_SERVICO: Record<ServicoDoPost, string> = {
  idiomas: 'idiomas em geral',
  traducao: 'tradução ou interpretação',
  lms: 'LMS',
};

/** O fim do endereço do post, decodificado e sem acento: "curso-de-alemao-em-porto-alegre". */
export function slugDoPost(caminho: string): string {
  const fim = decodeURIComponent(caminho.replace(/^\/post\//, '').replace(/\/$/, ''));
  return fim.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

/** O slug entre hífens, para achar palavra inteira: "-curso-de-alemao-em-...-". */
const palavrasDoPost = (caminho: string) => `-${slugDoPost(caminho)}-`;

const cita = (palavras: string, termos: readonly string[]) => termos.some((termo) => palavras.includes(`-${termo}-`));

function paginaDoIdioma(slug: string, site: SiteNovo): Destino {
  const caminho = caminhoDoIdioma(slug);
  return site.paginas.has(caminho)
    ? { destino: caminho, tipo: '301', motivo: `curso de ${slug}` }
    : { destino: CURSOS, tipo: '301', motivo: `curso de ${slug}, cuja página não está publicada` };
}

/**
 * O destino de um post do blog, pelo serviço, pela cidade e pelo idioma que o endereço cita. O post de tradução ou de
 * interpretação é do serviço, mesmo citando um idioma: "interpretacao-...-mandarim" é da interpretação, e não do curso.
 * Só ele vai para a página da cidade publicada (decisão de 07/10/2026); o de idioma fica no idioma.
 */
export function destinoDoPost(caminho: string, site: SiteNovo): Destino {
  const palavras = palavrasDoPost(caminho);
  const idiomas = Object.keys(TERMOS_DOS_IDIOMAS).filter((pagina) => cita(palavras, TERMOS_DOS_IDIOMAS[pagina]));

  if (cita(palavras, TERMOS_DOS_SERVICOS.traducao)) {
    const cidade = site.cidades.find((c) => cita(palavras, c.termos));
    if (cidade) return { destino: cidade.caminho, tipo: '301', motivo: 'post de tradução da cidade' };
    if (idiomas.includes('mandarim') && site.paginas.has(INTERPRETACAO_DE_MANDARIM)) {
      return { destino: INTERPRETACAO_DE_MANDARIM, tipo: '301', motivo: 'post de interpretação de mandarim' };
    }
    return { destino: PAGINA_DO_SERVICO.traducao, tipo: '301', motivo: `post sobre ${NOME_DO_SERVICO.traducao}` };
  }

  if (idiomas.length === 1) {
    const destino = paginaDoIdioma(idiomas[0], site);
    return { ...destino, motivo: `post sobre ${destino.motivo}` };
  }
  if (idiomas.length > 1) return { destino: CURSOS, tipo: '301', motivo: `post sobre mais de um idioma (${idiomas.join(', ')})` };
  const servico = (['lms', 'idiomas'] as const).find((s) => cita(palavras, TERMOS_DOS_SERVICOS[s]));
  if (!servico) return { destino: '', tipo: '410', motivo: 'post sem idioma, serviço ou cidade no endereço' };
  return { destino: PAGINA_DO_SERVICO[servico], tipo: '301', motivo: `post sobre ${NOME_DO_SERVICO[servico]}` };
}

function destinoDaPagina(caminho: string, site: SiteNovo): Destino {
  if (!(caminho in PAGINAS_ANTIGAS)) throw new Error(`${caminho}: página do site atual sem regra no mapa`);
  const regra = PAGINAS_ANTIGAS[caminho];
  if (regra === SUMIU) return { destino: '', tipo: '410', motivo: MOTIVO_DA_PAGINA_QUE_SUMIU[caminho] };
  if (typeof regra === 'function') return regra(site);
  if (regra === caminho) return { destino: regra, tipo: '200', motivo: 'o mesmo endereço no site novo' };
  return { destino: regra, tipo: '301', motivo: 'a página equivalente no site novo' };
}

/** A URL antiga como está em docs/urls-site-atual.csv: o caminho, o tipo e, no redirecionamento do Wix, o alvo dele. */
export interface UrlAntiga {
  caminho: string;
  tipo: string;
  observacao?: string;
}

export function destinoDe({ caminho, tipo, observacao = '' }: UrlAntiga, site: SiteNovo): Destino {
  switch (tipo) {
    case 'pagina':
    case 'lista-de-programas':
      return destinoDaPagina(caminho, site);
    case 'post-do-blog':
      return destinoDoPost(caminho, site);
    case 'programa-online':
      return { destino: '', tipo: '410', motivo: 'programa de modelo do app Programas Online' };
    case 'sitemap':
      return caminho === '/sitemap.xml'
        ? { destino: caminho, tipo: '200', motivo: 'o sitemap do site novo, no endereço que o Search Console conhece' }
        : { destino: '', tipo: '410', motivo: 'sitemap do Wix' };
    case 'redirecionamento-no-wix': {
      // Direto para o destino final: o Wix leva a uma página antiga, e ela tem destino próprio no site novo.
      const alvo = /redireciona para (\/\S*)/.exec(observacao)?.[1];
      if (!alvo) throw new Error(`${caminho}: redirecionamento do Wix sem o alvo na observação`);
      const final = destinoDaPagina(alvo, site);
      return { ...final, tipo: final.tipo === '200' ? '301' : final.tipo, motivo: `o Wix leva a ${alvo}; ${final.motivo}` };
    }
    default:
      throw new Error(`${caminho}: tipo "${tipo}" sem regra no mapa`);
  }
}

/** Uma linha do mapa já decidida: a regra, a exceção à mão (um caminho do site novo ou "410") e o que vale. */
export interface LinhaDoMapa {
  origem: string;
  destino: string;
  tipo: Tipo;
  excecao: string;
}

/** O que vale numa linha: a exceção, quando há, ou a regra. */
export function comExcecao(regra: Destino, excecao: string): Pick<LinhaDoMapa, 'destino' | 'tipo'> {
  const valor = excecao.trim();
  if (!valor) return { destino: regra.destino, tipo: regra.tipo };
  return valor === '410' ? { destino: '', tipo: '410' } : { destino: valor, tipo: '301' };
}

/**
 * Os problemas do mapa: destino que não é página do site novo, origem que pode formar corrente, 200 fora do mesmo
 * endereço. Não há corrente porque nenhuma origem termina em barra e todo destino, página do build, termina.
 */
export function problemasDoMapa(linhas: readonly LinhaDoMapa[], site: SiteNovo): string[] {
  return linhas.flatMap(({ origem, destino, tipo }) => {
    if (tipo === '410') return destino ? [`${origem}: 410 com destino`] : [];
    if (tipo === '200') return destino === origem ? [] : [`${origem}: 200 para outro endereço`];
    if (!destino) return [`${origem}: 301 sem destino`];
    if (origem.endsWith('/')) return [`${origem}: origem com a barra do fim, que pode coincidir com um destino e formar corrente`];
    if (!site.paginas.has(destino)) return [`${origem}: ${destino} não é página do build de produção`];
    return [];
  });
}
