export const PUBLICOS = ['empresa', 'voce'] as const;
export type Publico = (typeof PUBLICOS)[number];

/** O grupo do menu (id em content/site.md) que cada público representa: é por ele que a escolha pega a cor. */
export const GRUPO_DO_PUBLICO: Record<Publico, string> = { empresa: 'empresas', voce: 'para-voce' };

/** Um texto para cada situação: sem escolha (neutro), empresa e você. */
export type TextosPorPublico = Record<'neutro' | Publico, string>;

export const CHAVE_PUBLICO = '9vee:publico';

type Armazenamento = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export function publicoValido(valor: unknown): Publico | null {
  return PUBLICOS.find((publico) => publico === valor) ?? null;
}

// O acesso ao localStorage pode lançar erro (aba anônima, cookies bloqueados): a escolha vira "nenhuma".
export function lerPublico(armazenamento: Armazenamento | undefined): Publico | null {
  try {
    return publicoValido(armazenamento?.getItem(CHAVE_PUBLICO));
  } catch {
    return null;
  }
}

export function gravarPublico(armazenamento: Armazenamento | undefined, publico: Publico | null): void {
  try {
    if (publico) armazenamento?.setItem(CHAVE_PUBLICO, publico);
    else armazenamento?.removeItem(CHAVE_PUBLICO);
  } catch {
    // Sem armazenamento, a escolha vale só para esta página.
  }
}

/** Sem escolha, vale a ordem de empresa: três dos quatro serviços são para empresas. */
export function ordenarPorPublico<T extends { ordemEmpresa: number; ordemVoce: number }>(
  itens: readonly T[],
  publico: Publico | null,
): T[] {
  const chave = publico === 'voce' ? 'ordemVoce' : 'ordemEmpresa';
  return [...itens].sort((a, b) => a[chave] - b[chave]);
}
