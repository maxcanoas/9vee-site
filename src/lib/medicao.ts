// Os três eventos que medem os leads no GA4, sem tela: o nome de cada um e o que vai junto. O envio ao Google está em
// src/scripts/cookies.ts, que só manda com o aceite. O que cada evento significa está em docs/medicao.md.
import type { ServicoId } from './contato';
import type { Publico } from './publico';

/** A conversa aberta no WhatsApp, o pedido que chegou à 9vee e o pedido aberto na tela. */
export type EventoDeLead = 'whatsapp_click' | 'lead_form_submit' | 'drawer_open';

export interface DadosDoEvento {
  servico: ServicoId | null;
  publico: Publico | null;
  /** O nome da página, como a mensagem do WhatsApp diz ("Cursos de Idiomas", "Curso de inglês"). */
  pagina: string;
}

/**
 * Os parâmetros de cada evento. O que a pessoa ainda não escolheu vai com um valor próprio, e não vazio, para o
 * relatório não juntar tudo em "(not set)". O nome e o contato de quem pede nunca vão: a política promete.
 */
export function parametrosDoEvento(evento: EventoDeLead, { servico, publico, pagina }: DadosDoEvento): Record<string, string> {
  const doServico = { servico: servico ?? 'nenhum', pagina };
  // A abertura conta o serviço e a página: o público pode mudar dentro do drawer, e o envio e o WhatsApp levam o final.
  if (evento === 'drawer_open') return doServico;
  return { servico: doServico.servico, publico: publico ?? 'sem_escolha', pagina };
}
