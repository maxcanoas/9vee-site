import { expect, test } from './pedido.ts';

// O carrossel dos depoimentos (09/10/2026): as setas andam um cartão, ficam apagadas na ponta, e os pontos acompanham.
// Nada anda sozinho.
const posicao = (page: import('@playwright/test').Page) =>
  page.locator('#depoimentos-trilho').evaluate((trilho) => Math.round(trilho.scrollLeft));

test.describe('carrossel dos depoimentos', () => {
  // Com movimento reduzido, a seta rola de uma vez, sem a rolagem suave: o estado da seta não muda no meio do clique.
  test('as setas andam um cartão por vez, e cada ponta apaga a seta dela', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const anterior = page.locator('#depoimentos [data-carrossel-anterior]');
    const proximo = page.locator('#depoimentos [data-carrossel-proximo]');
    await page.locator('#depoimentos-trilho').scrollIntoViewIfNeeded();

    await expect(anterior).toHaveAttribute('aria-disabled', 'true');
    await expect(proximo).toHaveAttribute('aria-disabled', 'false');
    await expect(page.locator('[data-carrossel-pontos] span').first()).toHaveAttribute('data-atual', '');

    await proximo.click();
    await expect.poll(() => posicao(page)).toBeGreaterThan(0);
    await expect(anterior).toHaveAttribute('aria-disabled', 'false');
    await expect(page.locator('[data-carrossel-pontos] span').nth(1)).toHaveAttribute('data-atual', '');

    // Até a ponta: a seta continua focável, mas apagada, e não anda mais.
    for (let i = 0; i < 8; i++) {
      if ((await proximo.getAttribute('aria-disabled')) === 'true') break;
      await proximo.click();
      await page.waitForTimeout(150);
    }
    await expect(proximo).toHaveAttribute('aria-disabled', 'true');
    const naPonta = await posicao(page);
    // O Playwright não clica no que tem aria-disabled: o evento vai direto, como o clique de quem insiste na seta.
    await proximo.dispatchEvent('click');
    await page.waitForTimeout(300);
    expect(await posicao(page)).toBe(naPonta);
    await expect(page.locator('[data-carrossel-pontos] span').last()).toHaveAttribute('data-atual', '');
  });

  test('a faixa rola de lado sem a página rolar de lado', async ({ page }) => {
    await page.goto('/');
    await page.locator('#depoimentos-trilho').scrollIntoViewIfNeeded();
    const larguras = await page.evaluate(() => ({
      pagina: document.documentElement.scrollWidth,
      janela: document.documentElement.clientWidth,
    }));
    expect(larguras.pagina).toBeLessThanOrEqual(larguras.janela);
  });

  test('o teclado rola a faixa quando ela tem o foco', async ({ page, isMobile }) => {
    test.skip(isMobile, 'teclado só no computador');
    await page.goto('/');
    await page.locator('#depoimentos-trilho').focus();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => posicao(page)).toBeGreaterThan(0);
  });

  test('no holandês, os dois cabem no computador, e os controles somem', async ({ page, isMobile }) => {
    test.skip(isMobile, 'no celular cabe um por vez');
    await page.goto('/curso-de-idiomas/holandes/');
    await expect(page.locator('#depoimentos')).toHaveAttribute('data-cabe', '');
    await expect(page.locator('#depoimentos .depoimentos__controles')).toBeHidden();
  });
});
