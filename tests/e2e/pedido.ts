// O que os testes do pedido de contato dividem: os atalhos para o drawer e a mensagem que sai para o WhatsApp.
import type { BrowserContext, Page } from '@playwright/test';

/** O WhatsApp de verdade nunca abre nos testes: a aba nova recebe uma página de mentira. */
export const semWhatsAppDeVerdade = (context: BrowserContext) =>
  context.route('https://wa.me/**', (rota) => rota.fulfill({ contentType: 'text/plain', body: 'wa.me interceptado' }));

export const salvarPublico = (context: BrowserContext, publico: 'empresa' | 'voce') =>
  context.addInitScript((p) => localStorage.setItem('9vee:publico', p), publico);

export const drawer = (p: Page) => p.locator('#drawer-contato');
export const titulo = (p: Page) => drawer(p).locator('.etapa:not([hidden]) .etapa__titulo');
export const opcao = (p: Page, formulario: string, texto: string) =>
  p.locator(`[data-formulario="${formulario}"] label.opcao`, { hasText: texto }).first();
export const mensagemDe = (url: string) => new URL(url).searchParams.get('text') ?? '';
