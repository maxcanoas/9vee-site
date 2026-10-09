import type { Locator, Page } from '@playwright/test';
import { CHAVE_COOKIES } from '../../src/lib/cookies.ts';
import { drawer, expect, test, tituloDoPasso, vigiarEnvios } from './pedido.ts';

// O pedido e o aviso de cookies do começo ao fim só com o teclado (ticket 20, 09/10/2026): Tab, Espaço, Enter e as
// setas, sem nenhum clique. Os detalhes de cada passo (o foco no título, o Tab que dá a volta, o Esc) estão em
// contato.spec.ts e cookies.spec.ts; aqui é o caminho inteiro de quem não usa mouse.
test.skip(({ isMobile }) => isMobile, 'teclado físico só no computador');

/** Aperta Tab até o foco chegar ao elemento, ou falha depois de `maximo` vezes. */
async function tabAte(page: Page, alvo: Locator, maximo = 12) {
  for (let i = 0; i < maximo; i++) {
    if (await alvo.evaluate((el) => el === document.activeElement)) return;
    await page.keyboard.press('Tab');
  }
  await expect(alvo).toBeFocused();
}

test('o pedido inteiro só com o teclado, do primeiro Tab da página até o pedido anotado', async ({ page }) => {
  await page.clock.install();
  const recebidos = await vigiarEnvios(page);
  await page.goto('/treinamento-nr-1/');

  // Do topo da página ao botão do cabeçalho: o pular para o conteúdo vem primeiro.
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
  await tabAte(page, page.locator('.cabecalho__cta'), 8);
  await page.keyboard.press('Enter');
  await expect(tituloDoPasso(page)).toBeFocused();

  // Para quem é: o Espaço marca a opção que tem o foco, e o Enter avança.
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await expect(drawer(page).locator('input[name="drawer-publico"][value="empresa"]')).toBeChecked();
  await page.keyboard.press('Enter');
  await expect(tituloDoPasso(page)).toHaveText('Sobre o treinamento');
  await expect(tituloDoPasso(page)).toBeFocused();

  // Os detalhes do NR-1: o nome da empresa e quatro grupos de opções, cada grupo uma parada do Tab.
  await page.keyboard.press('Tab');
  await expect(page.locator('#campo-nr1-empresa')).toBeFocused();
  await page.keyboard.type('Empresa de Teste');
  for (const grupo of ['colaboradores', 'prazo', 'formato', 'programa']) {
    await page.keyboard.press('Tab');
    await expect(page.locator(`input[name="nr1-${grupo}"]`).first()).toBeFocused();
    await page.keyboard.press('Space');
  }
  await page.keyboard.press('Enter');
  await expect(tituloDoPasso(page)).toHaveText('Como podemos te chamar?');
  await expect(tituloDoPasso(page)).toBeFocused();

  // O nome, o "Prefiro receber contato", o contato, a caixa do consentimento e o envio.
  await page.keyboard.press('Tab');
  await expect(page.locator('#campo-final-nome')).toBeFocused();
  await page.keyboard.type('Maria');
  await tabAte(page, drawer(page).locator('[data-abre-receber]'), 4);
  await page.keyboard.press('Enter');
  await expect(page.locator('#campo-final-contato')).toBeFocused();
  await page.keyboard.type('maria@exemplo.com.br');
  const consentimento = page.locator('#campo-final-consentimento');
  await tabAte(page, consentimento, 4);
  await page.keyboard.press('Space');
  await expect(consentimento).toBeChecked();
  await tabAte(page, drawer(page).getByRole('button', { name: 'Pedir contato' }), 4);
  // O pedido mais rápido que uma pessoa é tratado como robô: o relógio anda até passar o tempo mínimo.
  await page.clock.fastForward(5000);
  await page.keyboard.press('Enter');

  await expect(tituloDoPasso(page)).toHaveText('Pedido anotado.');
  await expect(tituloDoPasso(page)).toBeFocused();
  expect(recebidos).toHaveLength(1);
});

test.describe('aviso de cookies', () => {
  test.use({ cookiesRespondidos: false });

  test('o aviso inteiro só com o teclado: preferências, marcar a estatística e salvar', async ({ page }) => {
    await page.goto('/');
    const aviso = page.locator('[data-aviso-cookies]');
    await tabAte(page, aviso.getByRole('button', { name: 'Preferências', exact: true }), 8);
    await page.keyboard.press('Enter');

    const estatistica = aviso.locator('input[name="cookies-estatistica"]');
    await expect(estatistica).toBeFocused();
    await page.keyboard.press('Space');
    await expect(estatistica).toBeChecked();
    await tabAte(page, aviso.getByRole('button', { name: 'Salvar escolha' }), 6);
    await page.keyboard.press('Enter');

    await expect(aviso).toBeHidden();
    await expect(page.locator('#conteudo')).toBeFocused();
    const guardado = await page.evaluate((chave) => localStorage.getItem(chave), CHAVE_COOKIES);
    expect(guardado).toContain('"estatistica":true');
  });
});
