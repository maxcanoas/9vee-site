import { describe, expect, it } from 'vitest';
import { parametrosDoEvento } from '../../src/lib/medicao';

// O que vai para o GA4 com cada evento: o serviço, o público e a página, sempre com um valor, para o relatório não
// mostrar "(not set)". Nunca o nome nem o contato de quem pede.
describe('parâmetros dos eventos', () => {
  it('leva o serviço, o público e a página nos eventos de lead', () => {
    const dados = { servico: 'nr1', publico: 'empresa', pagina: 'Treinamento de NR-1' } as const;
    for (const evento of ['whatsapp_click', 'lead_form_submit'] as const) {
      expect(parametrosDoEvento(evento, dados)).toEqual({ servico: 'nr1', publico: 'empresa', pagina: 'Treinamento de NR-1' });
    }
  });

  it('marca o serviço e o público que a pessoa ainda não escolheu', () => {
    expect(parametrosDoEvento('whatsapp_click', { servico: null, publico: null, pagina: 'inicial' })).toEqual({
      servico: 'nenhum',
      publico: 'sem_escolha',
      pagina: 'inicial',
    });
  });

  // A abertura do pedido conta o serviço e a página: o público pode mudar dentro do drawer.
  it('leva só o serviço e a página na abertura do pedido', () => {
    expect(parametrosDoEvento('drawer_open', { servico: 'idiomas', publico: 'voce', pagina: 'Curso de inglês' })).toEqual({
      servico: 'idiomas',
      pagina: 'Curso de inglês',
    });
  });
});
