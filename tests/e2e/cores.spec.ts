import { expect, test, type Locator } from '@playwright/test';

// A cor da faixa do grifo, lida do box-shadow calculado ("rgb(92, 88, 244) 0px -9.6px 0px 0px inset").
const corDoGrifo = (grifo: Locator) =>
  grifo.evaluate((el) => {
    const faixa = getComputedStyle(el).boxShadow;
    return faixa === 'none' ? null : (faixa.match(/rgba?\([^)]*\)/)?.[0] ?? null);
  });

test.describe('código de cor', () => {
  test('no menu do celular, Empresas e Para você têm cada um a sua cor', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'o menu em folha só existe no celular');
    await page.goto('/');
    await page.getByRole('button', { name: 'Menu', exact: true }).click();

    const empresas = await corDoGrifo(page.locator('#menu-movel [data-grupo="empresas"] .grifo'));
    const voce = await corDoGrifo(page.locator('#menu-movel [data-grupo="para-voce"] .grifo'));
    expect(empresas).not.toBeNull();
    expect(voce).not.toBeNull();
    expect(empresas).not.toBe(voce);
  });

  test('as três famílias de idiomas têm três cores', async ({ page }) => {
    await page.goto('/');
    const cores = await Promise.all(
      ['germanicas', 'romanicas', 'outras'].map((familia) =>
        corDoGrifo(page.locator(`.familia[data-familia="${familia}"] .grifo`)),
      ),
    );
    expect(cores.every(Boolean)).toBe(true);
    expect(new Set(cores).size).toBe(3);
  });

  test('no computador, o grifo do grupo só aparece com o painel aberto', async ({ page, isMobile }) => {
    test.skip(isMobile, 'a barra com os grupos só existe no computador');
    await page.goto('/');
    const grifo = page.locator('.nav-larga [data-grupo="empresas"] .grifo');
    expect(await corDoGrifo(grifo)).toBeNull();

    await page.getByRole('button', { name: 'Empresas' }).click();
    // Tira o mouse de cima do botão: o que vale aqui é o painel aberto, e não o hover.
    await page.mouse.move(640, 600);
    expect(await corDoGrifo(grifo)).not.toBeNull();
  });
});
