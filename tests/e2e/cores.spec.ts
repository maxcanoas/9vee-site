import { expect, test, type Locator } from '@playwright/test';
import { GRUPO_DO_PUBLICO } from '../../src/lib/publico';

// A cor da faixa do grifo, que abre o box-shadow calculado ("oklab(...) 0px -9.6px 0px 0px inset": a cor vem
// de um color-mix). Faixa transparente conta como sem grifo.
const corDoGrifo = (grifo: Locator) =>
  grifo.evaluate((el) => {
    const cor = /^(\w+\([^)]*\)|#\w+|\w+)/.exec(getComputedStyle(el).boxShadow)?.[1] ?? 'none';
    return cor === 'none' || cor === 'rgba(0, 0, 0, 0)' ? null : cor;
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
        corDoGrifo(page.locator(`.familia[data-grupo="${familia}"] .grifo`)),
      ),
    );
    expect(cores.every(Boolean)).toBe(true);
    expect(new Set(cores).size).toBe(3);
  });

  // A cor do público vai só para a escolha. O botão de ação continua menta, a única cor de ação do site.
  test('a metade escolhida ganha a cor do público, a mesma do menu, e o botão continua menta', async ({ page }) => {
    await page.goto('/');
    for (const [publico, grupo] of Object.entries(GRUPO_DO_PUBLICO)) {
      const metade = page.locator(`.duas-metades__metade--${publico}`);
      await metade.click();
      await expect(page.locator('html')).toHaveAttribute('data-publico', publico);
      // A troca de cor tem transição curta: espera o valor final, e não o do meio do caminho.
      const corDoMenu = await corDoGrifo(page.locator(`#menu-movel [data-grupo="${grupo}"] .grifo`));
      await expect.poll(() => metade.evaluate((el) => getComputedStyle(el).backgroundColor), { message: publico }).toBe(corDoMenu);
      await expect.poll(() => metade.evaluate((el) => getComputedStyle(el).color), { message: publico }).toBe('rgb(33, 45, 77)');
      const botao = await page.locator('.hero__cta').evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(botao, publico).toBe('rgb(22, 223, 151)');
    }
  });

  test('ao passar o mouse numa língua, o sublinhado tem a cor da família dela', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover só existe com mouse');
    await page.goto('/');
    for (const familia of ['germanicas', 'romanicas', 'outras']) {
      const grupo = page.locator(`.familia[data-grupo="${familia}"]`);
      const lingua = grupo.locator('a.idioma').first();
      await lingua.hover();
      const sublinhado = await lingua.locator('.idioma__saudacao').evaluate((el) => getComputedStyle(el).textDecorationColor);
      expect(sublinhado, familia).toBe(await corDoGrifo(grupo.locator('.grifo')));
    }
  });

  test('o idioma de destino ganha o fio na cor da família dele', async ({ page }) => {
    await page.goto('/curso-de-idiomas/#japones');
    const fio = await page.locator('#japones .idioma').first().evaluate((el) => getComputedStyle(el).borderTopColor);
    expect(fio).toBe(await corDoGrifo(page.locator('.familia[data-grupo="outras"] .grifo')));
  });

  // A faixa passa por trás da parte de baixo das letras: ali o texto também precisa de 4,5:1.
  test('o texto dá 4,5:1 sobre a faixa, no fundo claro e no escuro', async ({ page }) => {
    await page.goto('/');
    const contrastes = await page.locator('#menu-movel .grifo, footer .grifo, .familia .grifo').evaluateAll((grifos) => {
      // O canvas converte qualquer cor CSS (oklab, color-mix resolvido) para RGB.
      const tela = document.createElement('canvas').getContext('2d')!;
      const rgb = (cor: string) => {
        tela.clearRect(0, 0, 1, 1);
        tela.fillStyle = cor;
        tela.fillRect(0, 0, 1, 1);
        return [...tela.getImageData(0, 0, 1, 1).data.slice(0, 3)];
      };
      const luminancia = (cor: string) => {
        const [r, g, b] = rgb(cor).map((v) => (v / 255 <= 0.04045 ? v / 255 / 12.92 : ((v / 255 + 0.055) / 1.055) ** 2.4));
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      return grifos.map((grifo) => {
        const estilo = getComputedStyle(grifo);
        const faixa = /^(\w+\([^)]*\)|#\w+|\w+)/.exec(estilo.boxShadow)?.[1] ?? '';
        const [a, b] = [luminancia(estilo.color), luminancia(faixa)];
        return { texto: grifo.textContent?.trim(), razao: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) };
      });
    });
    expect(contrastes).toHaveLength(7);
    for (const { texto, razao } of contrastes) expect(razao, texto).toBeGreaterThanOrEqual(4.5);
  });

  test('no computador, o grifo do grupo aparece com o painel aberto e some parado', async ({ page, isMobile }) => {
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
