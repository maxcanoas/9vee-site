import { expect, test, type Page } from '@playwright/test';

const PAGINAS = ['/', '/treinamento-nr-1/', '/curso-de-idiomas/', '/traducao-simultanea/', '/lms/', '/quem-somos/'];
const LARGURAS = [360, 390, 768, 1280, 1920];

const sobraHorizontal = (pagina: Page) =>
  pagina.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

// A largura vem do próprio teste, então um perfil basta: o de desktop.
test.skip(({ isMobile, browserName }) => isMobile || browserName !== 'chromium', 'um perfil basta');

for (const largura of LARGURAS) {
  test.describe(`${largura} px`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: largura, height: 900 });
    });

    for (const rota of PAGINAS) {
      test(`${rota} não rola na horizontal`, async ({ page }) => {
        await page.goto(rota);
        expect(await sobraHorizontal(page)).toBeLessThanOrEqual(0);
      });
    }

    // O passo mais largo do drawer: os 14 idiomas em pílulas.
    test('o drawer aberto não rola na horizontal', async ({ page, context }) => {
      await context.addInitScript(() => localStorage.setItem('9vee:publico', 'voce'));
      await page.goto('/');
      await page.locator('.cabecalho__cta').click();
      await expect(page.locator('[data-formulario="idiomasVoce"]')).toBeVisible();
      const sobraNoDrawer = await page
        .locator('#drawer-contato [data-corpo]')
        .evaluate((corpo) => corpo.scrollWidth - corpo.clientWidth);
      expect(sobraNoDrawer).toBeLessThanOrEqual(0);
      expect(await sobraHorizontal(page)).toBeLessThanOrEqual(0);
    });
  });
}
