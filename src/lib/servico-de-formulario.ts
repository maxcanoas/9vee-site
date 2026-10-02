// O único módulo que conhece o serviço de formulário, a Web3Forms. Recebe o pedido pronto e diz se ele chegou.
// Trocar de serviço é trocar este módulo e a chave do .env. O envio sai do navegador: o plano grátis não aceita
// envio feito por servidor.
import type { LinhaDoPedido } from './contato.ts';

const ENDERECO = 'https://api.web3forms.com/submit';
// Sem resposta nesse tempo, o pedido conta como não entregue, e a pessoa recebe a saída pelo WhatsApp.
const ESPERA_MAXIMA = 15_000;

export interface PedidoPronto {
  assunto: string;
  /** O nome que aparece como remetente do e-mail. */
  remetente: string;
  /** O corpo do e-mail, um campo por linha. */
  linhas: LinhaDoPedido[];
  /** O e-mail de quem pediu, quando o contato é um e-mail: a resposta do comercial vai direto para ele. */
  responderPara?: string;
}

// Um rótulo repetido viraria um campo só, e uma resposta sumiria do e-mail: a segunda leva o número dela.
function camposDasLinhas(linhas: LinhaDoPedido[]): Record<string, string> {
  const campos: Record<string, string> = {};
  const vezes = new Map<string, number>();
  for (const { rotulo, valor } of linhas) {
    const vez = (vezes.get(rotulo) ?? 0) + 1;
    vezes.set(rotulo, vez);
    campos[vez === 1 ? rotulo : `${rotulo} (${vez})`] = valor;
  }
  return campos;
}

/** Entrega o pedido e devolve se ele chegou. Erro do serviço, rede caída e build sem chave contam como não. */
export async function entregarPedido(pedido: PedidoPronto, chave: string, buscar: typeof fetch = fetch): Promise<boolean> {
  if (!chave) return false;
  try {
    const resposta = await buscar(ENDERECO, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: chave,
        subject: pedido.assunto,
        from_name: pedido.remetente,
        ...(pedido.responderPara ? { replyto: pedido.responderPara } : {}),
        ...camposDasLinhas(pedido.linhas),
      }),
      // Navegador antigo, sem o AbortSignal.timeout, manda sem o limite de espera.
      signal: 'timeout' in AbortSignal ? AbortSignal.timeout(ESPERA_MAXIMA) : undefined,
    });
    const corpo = (await resposta.json()) as { success?: unknown };
    return resposta.ok && corpo.success === true;
  } catch {
    return false;
  }
}
