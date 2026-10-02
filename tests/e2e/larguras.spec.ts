import { expect, test, type Page } from '@playwright/test';
import { INTERPRETACAO_DE_MANDARIM, PAGINAS_DE_TEXTO, paginasDeIdiomaNoConteudo } from '../conteudo.ts';
import { salvarPublico } from './pedido.ts';

// As páginas de idioma saem de content/idiomas/: cada idioma novo entra aqui sozinho.
const ROTAS_DE_IDIOMA = paginasDeIdiomaNoConteudo().map((pagina) => pagina.rota);
const COM_HERO = [
  '/treinamento-nr-1/',
  '/curso-de-idiomas/',
  '/traducao-simultanea/',
  INTERPRETACAO_DE_MANDARIM,
  '/lms/',
  '/quem-somos/',
  ...ROTAS_DE_IDIOMA,
];
// As páginas de texto não têm hero, e a 404 responde por qualquer endereço que não existe.
const PAGINAS = ['/', ...COM_HERO, ...PAGINAS_DE_TEXTO, '/pagina-que-nao-existe/'];
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
      await salvarPublico(context, 'voce');
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

test.describe('hero das páginas internas', () => {
  // A trilha fica no alto do hero: ela não pode empurrar o botão para fora da primeira tela de um notebook. Na
  // página que promete um prazo, a medida é a da caixa do botão com a nota, que vem antes dele no HTML.
  for (const rota of COM_HERO) {
    test(`${rota}: o botão cabe inteiro na primeira tela em 1280 x 800`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(rota);
      await page.evaluate(() => document.fonts.ready);
      const botao = page.locator(':is(.hero-pagina, .topo-idioma) :is(.botao-com-nota, [data-abre-contato])').first();
      const caixa = await botao.boundingBox();
      expect(caixa!.y + caixa!.height).toBeLessThanOrEqual(800);
    });
  }

  // "Início" é mais estreito que 44 px: a área de toque em volta do centro dele precisa cair no link.
  test('o link da trilha tem 44 x 44 px de área de toque', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/lms/');
    const alcanca = await page.locator('.trilha a').evaluate((link) => {
      const caixa = link.getBoundingClientRect();
      const [x, y] = [caixa.left + caixa.width / 2, caixa.top + caixa.height / 2];
      const pontas = [
        [x - 21, y],
        [x + 21, y],
        [x, y - 21],
        [x, y + 21],
      ];
      return pontas.every(([px, py]) => link.contains(document.elementFromPoint(px, py)));
    });
    expect(alcanca).toBe(true);
  });
});
