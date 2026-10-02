import { getEntry } from 'astro:content';
import type { ServicoId } from './contato';
import { ordenarPorPublico } from './publico';

export async function dadosDoSite() {
  const entrada = await getEntry('site', 'site');
  if (!entrada) throw new Error('content/site.md não encontrado');
  return entrada.data;
}

export type DadosDoSite = Awaited<ReturnType<typeof dadosDoSite>>;
export type PaginaId = keyof DadosDoSite['paginas'];

export function servicoDoSite(site: DadosDoSite, id: ServicoId) {
  const servico = site.servicos.find((s) => s.id === id);
  if (!servico) throw new Error(`serviço "${id}" não está em content/site.md`);
  return servico;
}

/** O idioma de uma página, como content/site.md o descreve: o nome, a saudação, o lang e a família. */
export function idiomaDaPagina(site: DadosDoSite, pagina: PaginaId) {
  const idioma = site.idiomas.find(({ slug }) => slug === site.paginas[pagina].idioma);
  if (!idioma) throw new Error(`a página "${pagina}" não diz o idioma dela em content/site.md`);
  return idioma;
}

/**
 * Junta a cada item a ordem do serviço por público, que vive em content/site.md, e devolve a lista na ordem
 * de quem ainda não escolheu. Assim o HTML sem JavaScript já sai na ordem da tela, e a ordem mora só nos números.
 */
export function comOrdemDoServico<T extends { id: ServicoId }>(site: DadosDoSite, itens: readonly T[]) {
  const comOrdem = itens.map((item) => {
    const { ordemEmpresa, ordemVoce } = servicoDoSite(site, item.id);
    return { ...item, ordemEmpresa, ordemVoce };
  });
  return ordenarPorPublico(comOrdem, null);
}
