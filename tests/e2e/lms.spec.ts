import { expect, test } from '@playwright/test';
import { contrasteSobreOGrifo } from './grifo.ts';

test.describe('página de LMS', () => {
  // O destino para logo abaixo do cabeçalho fixo, e não embaixo dele.
  test('cada motivo leva à seção que o explica', async ({ page }) => {
    await page.goto('/lms/');
    const atalhos = page.locator('#motivos a');
    await expect(atalhos).toHaveCount(3);
    for (const atalho of await atalhos.all()) {
      const ancora = (await atalho.getAttribute('href'))!;
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await atalho.click();
      await expect(page).toHaveURL(new RegExp(`/lms/${ancora}$`));
      await expect(page.locator(`${ancora} h2`)).toBeInViewport();
      const escondido = await page.locator(`${ancora} h2`).evaluate((titulo) => {
        const cabecalho = document.querySelector('header')!.getBoundingClientRect();
        return titulo.getBoundingClientRect().top < cabecalho.bottom;
      });
      expect(escondido, ancora).toBe(false);
    }
  });

  test('o atalho tem pelo menos 44 px de altura para o toque', async ({ page }) => {
    await page.goto('/lms/');
    for (const atalho of await page.locator('#motivos a').all()) {
      expect((await atalho.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('a chamada do meio abre o pedido com o LMS já escolhido', async ({ page, context }) => {
    await context.addInitScript(() => localStorage.setItem('9vee:publico', 'empresa'));
    await page.goto('/lms/');
    await page.locator('#chamada [data-abre-contato]').click();

    const drawer = page.locator('#drawer-contato');
    await expect(drawer.locator('.etapa:not([hidden]) .etapa__titulo')).toHaveText('Sobre a plataforma');
    await expect(page.locator('[data-formulario="lms"]')).toBeVisible();
    await expect(drawer.locator('[data-resumo-de="servico"]')).toContainText('LMS');
  });

  // O grifo passa por trás das letras do título de mostra: ali o texto também precisa de 4,5:1.
  test('o título em tipo grande dá 4,5:1 sobre o grifo', async ({ page }) => {
    await page.goto('/lms/');
    const contrastes = await page.locator('#plataforma .grifo').evaluateAll(contrasteSobreOGrifo);
    // O espaço dentro do grifo é o que não quebra: aqui ele vale como espaço comum.
    expect(contrastes.map(({ texto }) => texto?.replace(/\s/g, ' '))).toEqual(['24 horas', '7 dias']);
    for (const { texto, razao } of contrastes) expect(razao, texto).toBeGreaterThanOrEqual(4.5);
  });

  // Quando a linha não cabe, o resto dela desce inteiro: "24 horas", "por dia,", "7 dias" e "por semana.", sem
  // deixar uma palavra sozinha.
  test('no celular, cada linha do título de mostra quebra só depois do grifo', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/lms/');
    await page.evaluate(() => document.fonts.ready);
    const medidas = await page.locator('#plataforma h2').evaluate((titulo) => {
      const alturaDaLinha = parseFloat(getComputedStyle(titulo).lineHeight);
      const topos = [...titulo.querySelectorAll('.grifo')].map((grifo) => grifo.getBoundingClientRect().top);
      return {
        linhas: Math.round(titulo.getBoundingClientRect().height / alturaDaLinha),
        linhasEntreOsGrifos: Math.round((topos[1] - topos[0]) / alturaDaLinha),
      };
    });
    expect(medidas).toEqual({ linhas: 4, linhasEntreOsGrifos: 2 });
  });
});
