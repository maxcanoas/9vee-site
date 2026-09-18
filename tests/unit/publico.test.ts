import { describe, expect, it, vi } from 'vitest';
import { CHAVE_PUBLICO, gravarPublico, lerPublico, ordenarPorPublico, publicoValido } from '../../src/lib/publico';

function armazenamento(inicial: Record<string, string> = {}) {
  const dados = new Map(Object.entries(inicial));
  return {
    getItem: vi.fn((chave: string) => dados.get(chave) ?? null),
    setItem: vi.fn((chave: string, valor: string) => void dados.set(chave, valor)),
    removeItem: vi.fn((chave: string) => void dados.delete(chave)),
  };
}

const quebrado = {
  getItem: () => {
    throw new Error('SecurityError');
  },
  setItem: () => {
    throw new Error('QuotaExceededError');
  },
  removeItem: () => {
    throw new Error('SecurityError');
  },
};

describe('publicoValido', () => {
  it('aceita só empresa e voce', () => {
    expect(publicoValido('empresa')).toBe('empresa');
    expect(publicoValido('voce')).toBe('voce');
    expect(publicoValido('você')).toBeNull();
    expect(publicoValido('')).toBeNull();
    expect(publicoValido(null)).toBeNull();
  });
});

describe('lerPublico', () => {
  it('devolve o público salvo', () => {
    expect(lerPublico(armazenamento({ [CHAVE_PUBLICO]: 'voce' }))).toBe('voce');
  });

  it('ignora valor estranho salvo por outra versão do site', () => {
    expect(lerPublico(armazenamento({ [CHAVE_PUBLICO]: 'pf' }))).toBeNull();
  });

  it('não quebra quando o navegador bloqueia o armazenamento', () => {
    expect(lerPublico(quebrado)).toBeNull();
    expect(lerPublico(undefined)).toBeNull();
  });
});

describe('gravarPublico', () => {
  it('salva a escolha na chave do site', () => {
    const memoria = armazenamento();
    gravarPublico(memoria, 'empresa');
    expect(memoria.setItem).toHaveBeenCalledWith(CHAVE_PUBLICO, 'empresa');
  });

  it('apaga a escolha quando o público volta a ser nenhum', () => {
    const memoria = armazenamento({ [CHAVE_PUBLICO]: 'voce' });
    gravarPublico(memoria, null);
    expect(memoria.removeItem).toHaveBeenCalledWith(CHAVE_PUBLICO);
  });

  it('não quebra quando o navegador bloqueia o armazenamento', () => {
    expect(() => gravarPublico(quebrado, 'voce')).not.toThrow();
  });
});

describe('ordenarPorPublico', () => {
  const servicos = [
    { id: 'nr1', ordemEmpresa: 1, ordemVoce: 3 },
    { id: 'traducao', ordemEmpresa: 2, ordemVoce: 2 },
    { id: 'idiomas', ordemEmpresa: 3, ordemVoce: 1 },
    { id: 'lms', ordemEmpresa: 4, ordemVoce: 4 },
  ];

  it('põe idiomas primeiro para quem escolheu "Para você"', () => {
    expect(ordenarPorPublico(servicos, 'voce').map((s) => s.id)).toEqual(['idiomas', 'traducao', 'nr1', 'lms']);
  });

  it('usa a ordem de empresa quando não há escolha', () => {
    expect(ordenarPorPublico(servicos, null).map((s) => s.id)).toEqual(['nr1', 'traducao', 'idiomas', 'lms']);
  });

  it('não altera a lista original', () => {
    ordenarPorPublico(servicos, 'voce');
    expect(servicos[0].id).toBe('nr1');
  });
});
