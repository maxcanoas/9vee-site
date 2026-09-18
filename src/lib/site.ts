import { getEntry } from 'astro:content';

export async function dadosDoSite() {
  const entrada = await getEntry('site', 'site');
  if (!entrada) throw new Error('content/site.md não encontrado');
  return entrada.data;
}

export type DadosDoSite = Awaited<ReturnType<typeof dadosDoSite>>;
export type PaginaId = keyof DadosDoSite['paginas'];

/** Junta a cada item a ordem do serviço por público, que vive em content/site.md. */
export function comOrdemDoServico<T extends { id: DadosDoSite['servicos'][number]['id'] }>(
  site: DadosDoSite,
  itens: readonly T[],
) {
  return itens.map((item) => {
    const servico = site.servicos.find((s) => s.id === item.id);
    if (!servico) throw new Error(`serviço "${item.id}" não está em content/site.md`);
    return { ...item, ordemEmpresa: servico.ordemEmpresa, ordemVoce: servico.ordemVoce };
  });
}
