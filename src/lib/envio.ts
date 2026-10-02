// O pedido que sai por e-mail quando a pessoa prefere receber contato: o assunto que o comercial filtra, as linhas do
// corpo, o registro do consentimento e o que separa pessoa de robô. Sem tela e sem rede: quem entrega é o
// src/lib/servico-de-formulario.ts. Os textos vêm de content/site.md.
import type { LinhaDoPedido, Respostas, ServicoId } from './contato.ts';
import type { Publico } from './publico.ts';
import { preencher } from './texto.ts';

export interface TextosDoEnvio {
  /** O nome que aparece como remetente do e-mail. */
  remetente: string;
  /** O modelo do assunto, com {servico}, {publico} e {quem}. */
  assunto: string;
  /** O nome curto de cada serviço e de cada público, como o comercial os lê no assunto. */
  servicos: Record<ServicoId, string>;
  publicos: Record<Publico, string>;
  rotulos: { publico: string; pagina: string; consentimento: string; aceitoEm: string };
}

/** O tempo mínimo, em milissegundos, entre a abertura do pedido e o envio: menos que isso não é gente. */
export const TEMPO_MINIMO_DO_PEDIDO = 3000;

/** O nome que fecha o assunto: o da empresa, quando o pedido é dela e ela disse o nome, ou o da pessoa. */
export function quemPede(pedido: { publico: Publico; respostas: Respostas; nome: string }): string {
  const empresa = pedido.respostas.empresa;
  const daEmpresa = pedido.publico === 'empresa' && typeof empresa === 'string' ? empresa.trim() : '';
  return daEmpresa || pedido.nome.trim();
}

export function assuntoDoPedido(pedido: { servico: ServicoId; publico: Publico; quem: string }, textos: TextosDoEnvio): string {
  return preencher(textos.assunto, {
    servico: textos.servicos[pedido.servico],
    publico: textos.publicos[pedido.publico],
    quem: pedido.quem,
  });
}

const doisDigitos = (numero: number) => String(numero).padStart(2, '0');

/**
 * A data e a hora em ISO, na hora de quem está no site, com o fuso: "2026-10-02T11:03:22-03:00". O deslocamento é o
 * do getTimezoneOffset, os minutos a somar à hora local para chegar ao UTC.
 */
export function momentoComFuso(data: Date, deslocamento = data.getTimezoneOffset()): string {
  const local = new Date(data.getTime() - deslocamento * 60_000).toISOString().slice(0, 19);
  const minutos = Math.abs(deslocamento);
  return `${local}${deslocamento > 0 ? '-' : '+'}${doisDigitos(Math.floor(minutos / 60))}:${doisDigitos(minutos % 60)}`;
}

/**
 * O corpo do e-mail, uma linha por campo: o público, o pedido como a pessoa o conferiu (o serviço, as respostas, o
 * nome e o contato), a página de onde ele saiu e a prova do consentimento, com o texto aceito e a hora do aceite.
 */
export function linhasDoEnvio(
  pedido: {
    publico: Publico;
    linhas: LinhaDoPedido[];
    pagina: { nome: string; endereco: string };
    consentimento: { texto: string; aceitoEm: string };
  },
  textos: TextosDoEnvio,
): LinhaDoPedido[] {
  const { rotulos } = textos;
  return [
    { rotulo: rotulos.publico, valor: textos.publicos[pedido.publico] },
    ...pedido.linhas,
    { rotulo: rotulos.pagina, valor: `${pedido.pagina.nome} (${pedido.pagina.endereco})` },
    { rotulo: rotulos.consentimento, valor: pedido.consentimento.texto },
    { rotulo: rotulos.aceitoEm, valor: pedido.consentimento.aceitoEm },
  ];
}

/**
 * O que barra robô sem CAPTCHA: a isca, que pessoa não vê, e a pressa, o envio antes do tempo mínimo desde a
 * abertura do pedido. A isca é certeza; a pressa é suspeita, e quem a tela barrar por ela pode tentar de novo.
 */
export function barreiraContraRobo(sinais: { isca: boolean; abertoHa: number }): 'isca' | 'pressa' | null {
  if (sinais.isca) return 'isca';
  return sinais.abertoHa < TEMPO_MINIMO_DO_PEDIDO ? 'pressa' : null;
}
