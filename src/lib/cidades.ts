// As páginas de cidade (ticket 11; spec, "Páginas por cidade"). A cidade onde há mais do que a tradução presencial
// ganha uma página dela, na raiz; a cidade onde só a tradução é presencial ganha a página "Tradução simultânea em
// <cidade>", dentro da Tradução Simultânea. Sem o Astro: o mapa de redirecionamentos também usa.

export const TIPOS_DE_CIDADE = ['cidade', 'traducao'] as const;
export type TipoDeCidade = (typeof TIPOS_DE_CIDADE)[number];

/** O endereço da página: o nome do arquivo em content/cidades/ é o fim dele. */
export function caminhoDaCidade(id: string, tipo: TipoDeCidade): string {
  return tipo === 'cidade' ? `/${id}/` : `/traducao-simultanea/${id}/`;
}

const escaparRegex = (texto: string) => texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Liga a primeira menção de cada cidade publicada à página dela, no formato de link do content/. O nome dentro de
 * colchetes (um link ou uma pendência) fica como está.
 */
export function ligarCidades(texto: string, publicadas: ReadonlyMap<string, string>): string {
  let ligado = texto;
  for (const [nome, caminho] of publicadas) {
    const nomeSolto = new RegExp(`(?<!\\p{L})${escaparRegex(nome)}(?!\\p{L})(?![^[\\]]*\\])`, 'u');
    ligado = ligado.replace(nomeSolto, `[${nome}](${caminho})`);
  }
  return ligado;
}
