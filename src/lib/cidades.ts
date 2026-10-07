// As páginas de cidade (ticket 11; spec, "Páginas por cidade"). A cidade onde há mais do que a tradução presencial
// ganha uma página dela, na raiz; a cidade onde só a tradução é presencial ganha a página "Tradução simultânea em
// <cidade>", dentro da Tradução Simultânea. Sem o Astro: o mapa de redirecionamentos também usa.
import { escaparRegex } from './texto.ts';

export const TIPOS_DE_CIDADE = ['cidade', 'traducao'] as const;
export type TipoDeCidade = (typeof TIPOS_DE_CIDADE)[number];

/**
 * O que muda de um tipo para o outro: a pasta do endereço, o modelo de content/site.md que dá o nome da página no
 * pedido e no WhatsApp, e o serviço com que o pedido abre. A página da cidade tem mais de um serviço: a pessoa escolhe.
 */
export const DADOS_DO_TIPO = {
  cidade: { pasta: '/', modelo: 'cidade', servicoDoPedido: undefined },
  traducao: { pasta: '/traducao-simultanea/', modelo: 'traducaoNaCidade', servicoDoPedido: 'traducao' },
} as const satisfies Record<TipoDeCidade, { pasta: string; modelo: string; servicoDoPedido: 'traducao' | undefined }>;

export type ModeloDeCidade = (typeof DADOS_DO_TIPO)[TipoDeCidade]['modelo'];

/** O endereço da página: o nome do arquivo em content/cidades/ é o fim dele. */
export function caminhoDaCidade(id: string, tipo: TipoDeCidade): string {
  return `${DADOS_DO_TIPO[tipo].pasta}${id}/`;
}

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
