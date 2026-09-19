import { describe, expect, it } from 'vitest';
import { servico, telefoneInternacional } from '../../src/lib/jsonld';

describe('telefoneInternacional', () => {
  it('escreve o número do WhatsApp no padrão internacional', () => {
    expect(telefoneInternacional('5511934661917')).toBe('+55 11 93466-1917');
  });

  it('também serve para telefone fixo, com 8 dígitos', () => {
    expect(telefoneInternacional('551134661917')).toBe('+55 11 3466-1917');
  });
});

describe('servico', () => {
  const no = servico(new URL('https://exemplo.9vee.com.br/'), {
    nome: 'Treinamento de NR-1',
    tipo: 'Treinamento corporativo',
    caminho: '/treinamento-nr-1/',
    descricao: 'Treinamento de NR-1 [CONFIRMAR COM A DANIELLA: carga horária] para RH e SESMT.',
  });

  it('usa endereços absolutos e liga o serviço à organização', () => {
    expect(no['@id']).toBe('https://exemplo.9vee.com.br/treinamento-nr-1/#servico');
    expect(no.url).toBe('https://exemplo.9vee.com.br/treinamento-nr-1/');
    expect(no.provider).toEqual({ '@id': 'https://exemplo.9vee.com.br/#organizacao' });
  });

  it('tira a pendência da descrição que o Google lê', () => {
    expect(no.description).toBe('Treinamento de NR-1 para RH e SESMT.');
  });
});
