import type { Page } from '@playwright/test';
import { INTERPRETACAO_DE_MANDARIM, PAGINAS_DE_TEXTO, paginasDeCidadeNoConteudo, paginasDeIdiomaNoConteudo } from '../conteudo.ts';
import { expect, salvarPublico, test } from './pedido.ts';

// As páginas de idioma e de cidade saem de content/: cada página nova entra aqui sozinha.
const ROTAS_DE_IDIOMA = paginasDeIdiomaNoConteudo().map((pagina) => pagina.rota);
const ROTAS_DE_CIDADE = paginasDeCidadeNoConteudo().map((pagina) => pagina.rota);
const COM_HERO = [
  '/treinamento-nr-1/',
  '/curso-de-idiomas/',
  '/traducao-simultanea/',
  INTERPRETACAO_DE_MANDARIM,
  '/lms/',
  '/quem-somos/',
  ...ROTAS_DE_IDIOMA,
  ...ROTAS_DE_CIDADE,
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
  // A trilha fica no alto do hero: ela não pode empurrar o botão para fora da primeira tela de um notebook. 1366 x 657
  // é a tela de 1366 x 768, a mais comum, menos as barras do navegador. Na página que promete um prazo, a medida é a
  // da caixa do botão com a nota, que vem antes dele no HTML.
  const NOTEBOOKS = [
    [1280, 800],
    [1366, 657],
  ] as const;
  for (const rota of COM_HERO) {
    for (const [largura, altura] of NOTEBOOKS) {
      test(`${rota}: o botão cabe inteiro na primeira tela em ${largura} x ${altura}`, async ({ page }) => {
        await page.setViewportSize({ width: largura, height: altura });
        await page.goto(rota);
        await page.evaluate(() => document.fonts.ready);
        const botao = page.locator(':is(.hero-pagina, .topo-idioma) :is(.botao-com-nota, [data-abre-contato])').first();
        const caixa = await botao.boundingBox();
        expect(caixa!.y + caixa!.height).toBeLessThanOrEqual(altura);
      });
    }
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

test.describe('atalho do WhatsApp', () => {
  // A partir de 768 px o atalho não se recolhe: a meia-lua da pergunta, na borda direita, tem de ficar antes dele.
  for (const largura of [768, 1280, 1366]) {
    test(`em ${largura} px ele não cobre a meia-lua das perguntas`, async ({ page }) => {
      await page.setViewportSize({ width: largura, height: 800 });
      await page.goto('/');
      const fimDaMeiaLua = await page
        .locator('.faq__pergunta')
        .first()
        .evaluate((resumo) => resumo.getBoundingClientRect().right - parseFloat(getComputedStyle(resumo).paddingInlineEnd));
      const atalho = await page.locator('.whatsapp-flutuante').boundingBox();
      expect(fimDaMeiaLua).toBeLessThan(atalho!.x);
    });
  }
});