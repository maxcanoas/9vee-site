// A escolha de cookies, sem tela: o que fica no navegador, quando o aviso aparece de novo e o que cada resposta
// libera no Google (Consent Mode v2). O aviso e o carregamento do GA4 estão em src/scripts/cookies.ts.

/** Onde a resposta ao aviso fica, no localStorage. A escolha de público usa a chave dela, em src/lib/publico.ts. */
export const CHAVE_COOKIES = '9vee:cookies';

/** A resposta ao aviso: se a estatística foi aceita, quando, e a que versão do texto do aviso. */
export interface EscolhaDeCookies {
  estatistica: boolean;
  versao: number;
  em: string;
}

export function novaEscolha(estatistica: boolean, agora: Date, versao: number): EscolhaDeCookies {
  return { estatistica, versao, em: agora.toISOString() };
}

export const textoDaEscolha = (escolha: EscolhaDeCookies) => JSON.stringify(escolha);

/**
 * A resposta guardada, se ela ainda vale: de outra versão do aviso, ou ilegível, ela não conta, e o aviso aparece de
 * novo. Quando o texto do aviso muda, a versão em content/site.md sobe junto.
 */
export function lerEscolha(guardada: string | null, versao: number): EscolhaDeCookies | null {
  if (!guardada) return null;
  try {
    const escolha = JSON.parse(guardada) as Partial<EscolhaDeCookies>;
    const valida =
      typeof escolha.estatistica === 'boolean' && escolha.versao === versao && typeof escolha.em === 'string';
    return valida ? (escolha as EscolhaDeCookies) : null;
  } catch {
    return null;
  }
}

type Estado = 'granted' | 'denied';

/** O consentimento que vai para o Google: só a estatística pode ser liberada, e só com o aceite. */
export function consentimentoDoGoogle(escolha: EscolhaDeCookies | null): Record<string, Estado> {
  return {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: escolha?.estatistica ? 'granted' : 'denied',
  };
}

/** O script do Google só carrega com o aceite e com um ID: quem recusa, ou ainda não respondeu, não manda nada. */
export const carregaGa4 = (escolha: EscolhaDeCookies | null, id: string | undefined) =>
  Boolean(id) && escolha?.estatistica === true;

/** Os cookies do GA4 (o _ga e o _ga_ de cada propriedade) entre os do navegador, pelo nome. */
export function cookiesDoGa4(doNavegador: string): string[] {
  return doNavegador
    .split(';')
    .map((par) => par.split('=')[0].trim())
    .filter((nome) => /^_ga(_\w+)?$/.test(nome));
}

/**
 * Os domínios onde o GA4 pode ter gravado o cookie: o endereço e cada domínio acima dele. O GA4 grava no mais alto
 * que o navegador aceita (o 9vee.com.br, no www.9vee.com.br), e apagar exige o mesmo domínio.
 */
export function dominiosDoCookie(endereco: string): string[] {
  const partes = endereco.split('.');
  if (partes.length === 1) return [endereco];
  return partes.slice(0, -1).map((_, i) => partes.slice(i).join('.'));
}
