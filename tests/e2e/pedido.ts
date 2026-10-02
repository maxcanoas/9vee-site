// O que os testes de navegador e o roteiro de capturas dividem: o `test` que nunca deixa um pedido sair de verdade,
// os atalhos para o drawer e a mensagem que sai para o WhatsApp.
import { test as base, type BrowserContext, type Page, type Route } from '@playwright/test';

/** O WhatsApp de verdade nunca abre nos testes: a aba nova recebe uma página de mentira. */
export const semWhatsAppDeVerdade = (context: BrowserContext) =>
  context.route('https://wa.me/**', (rota) => rota.fulfill({ contentType: 'text/plain', body: 'wa.me interceptado' }));

export const SERVICO_DE_FORMULARIO = 'https://api.web3forms.com/submit';

// O que o navegador exige de uma resposta de outro domínio, na consulta antes do envio e no envio.
const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'Content-Type',
  'access-control-allow-methods': 'OPTIONS,POST',
};

/** Responde no lugar do serviço de formulário, com o status e o corpo que o teste escolher. */
export const responderComoServico = (rota: Route, status: number, corpo: unknown) =>
  rota.fulfill({ status, contentType: 'application/json', headers: CORS, body: JSON.stringify(corpo) });

/**
 * O serviço de formulário de verdade nunca recebe nada dos testes nem das capturas: esta rota responde no lugar
 * dele, que o pedido chegou. A caixa de quem recebe os pedidos não pode encher de envio de teste.
 */
export const semEnvioDeVerdade = (context: BrowserContext) =>
  context.route(SERVICO_DE_FORMULARIO, (rota) => responderComoServico(rota, 200, { success: true, message: 'interceptado' }));

/**
 * O `test` de todo teste de navegador: com ele, nenhum pedido sai para o serviço de formulário. O
 * tests/unit/testes-de-navegador.test.ts confere que nenhum arquivo usa o do Playwright direto.
 */
export const test = base.extend({
  context: async ({ context }, use) => {
    await semEnvioDeVerdade(context);
    await use(context);
  },
});

export { expect } from '@playwright/test';

/**
 * Guarda cada pedido que a página manda ao serviço e responde com o que o teste escolher: sem escolha, que chegou.
 * A rota da página vale antes da do contexto.
 */
export async function vigiarEnvios(
  page: Page,
  responder: (rota: Route) => Promise<void> = (rota) => responderComoServico(rota, 200, { success: true }),
): Promise<Record<string, string>[]> {
  const recebidos: Record<string, string>[] = [];
  await page.route(SERVICO_DE_FORMULARIO, async (rota) => {
    if (rota.request().method() === 'OPTIONS') return responderComoServico(rota, 200, {});
    recebidos.push(rota.request().postDataJSON() as Record<string, string>);
    await responder(rota);
  });
  return recebidos;
}

/** O público já escolhido antes de a página carregar, como fica para quem volta ao site. */
export const salvarPublico = (context: BrowserContext, publico: 'empresa' | 'voce') =>
  context.addInitScript((p) => localStorage.setItem('9vee:publico', p), publico);

export const drawer = (p: Page) => p.locator('#drawer-contato');
export const tituloDoPasso = (p: Page) => drawer(p).locator('.etapa:not([hidden]) .etapa__titulo');
export const opcao = (p: Page, formulario: string, texto: string) =>
  p.locator(`[data-formulario="${formulario}"] label.opcao`, { hasText: texto }).first();
export const mensagemDe = (url: string) => new URL(url).searchParams.get('text') ?? '';
