import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { MODO } from 'astro:env/server';
import { entraNoBuild } from './publicacao';
import { dadosDoSite, idiomaDoSite, type DadosDoSite } from './site';
import { trilhaDoCaminho } from './trilha';

export async function paginaHome() {
  return exigir(await getEntry('home', 'home'), 'content/home.md');
}

export async function paginaNr1() {
  return exigir(await getEntry('nr1', 'treinamento-nr-1'), 'content/treinamento-nr-1.md');
}

export async function paginaIdiomas() {
  return exigir(await getEntry('idiomas', 'curso-de-idiomas'), 'content/curso-de-idiomas.md');
}

export async function paginaLms() {
  return exigir(await getEntry('lms', 'lms'), 'content/lms.md');
}

export async function paginaTraducao() {
  return exigir(await getEntry('traducao', 'traducao-simultanea'), 'content/traducao-simultanea.md');
}

const CAMINHO_DA_INTERPRETACAO_DE_MANDARIM = '/traducao-simultanea/mandarim/';

export async function paginaInterpretacaoDeMandarim() {
  return exigir(
    await getEntry('interpretacaoDeMandarim', 'interpretacao-de-mandarim'),
    'content/interpretacao-de-mandarim.md',
  );
}

export async function paginaQuemSomos() {
  return exigir(await getEntry('quemSomos', 'quem-somos'), 'content/quem-somos.md');
}

export async function paginaPrivacidade() {
  return exigir(await getEntry('privacidade', 'politica-de-privacidade'), 'content/politica-de-privacidade.md');
}

export type IdiomaDoSite = DadosDoSite['idiomas'][number];

export interface PaginaDeIdioma {
  /** O nome do arquivo em content/idiomas/, que é o fim do endereço. */
  id: string;
  caminho: string;
  idioma: IdiomaDoSite;
  conteudo: CollectionEntry<'paginasDeIdioma'>['data'];
}

/** As páginas de idioma deste build: todas no local e no preview, só as publicadas na produção. */
export async function paginasDeIdioma(): Promise<PaginaDeIdioma[]> {
  const site = await dadosDoSite();
  const entradas = await getCollection('paginasDeIdioma', ({ data }) => entraNoBuild(data, MODO));
  const comPagina = new Set<string>();
  return entradas.map(({ id, data }) => {
    const idioma = idiomaDoSite(site, data.idioma, `content/idiomas/${id}.md`);
    if (comPagina.has(idioma.slug)) throw new Error(`O idioma "${idioma.slug}" tem mais de uma página em content/idiomas/`);
    comPagina.add(idioma.slug);
    return { id, caminho: `/curso-de-idiomas/${id}/`, idioma, conteudo: data };
  });
}

/**
 * Do idioma para o endereço da página dele, só das publicadas, em todos os modos: é para elas que a home e a página
 * de cursos levam. A não publicada aparece no local e no preview, mas só por quem tem o endereço.
 */
export async function enderecoDosIdiomasPublicados(): Promise<Map<string, string>> {
  const publicadas = (await paginasDeIdioma()).filter(({ conteudo }) => conteudo.publicada);
  return new Map(publicadas.map(({ idioma, caminho }) => [idioma.slug, caminho]));
}

/**
 * A trilha do endereço, com o nome das páginas que não estão no menu nem no rodapé: as de idioma, pelo nome do idioma,
 * e a de interpretação de mandarim, pelo nome que ela mesma dá. O Base (no JSON-LD) e a Trilha (na tela) usam esta.
 */
export async function trilhaDaPagina(caminho: string) {
  const site = await dadosDoSite();
  const { data: mandarim } = await paginaInterpretacaoDeMandarim();
  const comNomeProprio = [
    ...(await paginasDeIdioma()).map((pagina) => ({ rotulo: pagina.idioma.nome, href: pagina.caminho })),
    { rotulo: mandarim.nomeNaTrilha, href: CAMINHO_DA_INTERPRETACAO_DE_MANDARIM },
  ];
  return trilhaDoCaminho(site, caminho, comNomeProprio);
}

function exigir<T>(entrada: T | undefined, arquivo: string): T {
  if (!entrada) throw new Error(`${arquivo} não encontrado`);
  return entrada;
}
