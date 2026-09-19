import { describe, expect, it } from 'vitest';
import { telefoneInternacional } from '../../src/lib/jsonld';

describe('telefoneInternacional', () => {
  it('escreve o número do WhatsApp no padrão internacional', () => {
    expect(telefoneInternacional('5511934661917')).toBe('+55 11 93466-1917');
  });

  it('também serve para telefone fixo, com 8 dígitos', () => {
    expect(telefoneInternacional('551134661917')).toBe('+55 11 3466-1917');
  });
});
