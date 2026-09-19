import { expect, test, type Page } from '@playwright/test';

const ordemDosServicos = (pagina: Page) =>
  pagina.locator('[data-ordenavel] > li').evaluateAll((itens) => itens.map((li) => li.getAttribute('data-servico')));

test.describe('escolha de público', () => {
  test('sem escolha, a home mostra os serviços na ordem de empresa', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).not.toHaveAttribute('data-publico', /.+/);
    expect(await ordemDosServicos(page)).toEqual(['nr1', 'traducao', 'idiomas', 'lms']);
  });

  test('"Para você" põe os idiomas primeiro, no DOM e na tela, e troca o texto do CTA', async ({ page }) => {
    await page.goto('/');
    await page.locator('.duas-metades__metade--voce').click();

    await expect(page.locator('html')).toHaveAttribute('data-publico', 'voce');
    expect(await ordemDosServicos(page)).toEqual(['idiomas', 'traducao', 'nr1', 'lms']);
    await expect(page.getByRole('button', { name: 'Quero estudar' }).first()).toBeVisible();

    const topoIdiomas = await page.locator('.servico[data-servico="idiomas"]').boundingBox();
    const topoNr1 = await page.locator('.servico[data-servico="nr1"]').boundingBox();
    expect(topoIdiomas!.y).toBeLessThan(topoNr1!.y);
  });

  test('"Para sua empresa" volta o NR-1 para o destaque', async ({ page }) => {
    await page.goto('/');
    await page.locator('.duas-metades__metade--voce').click();
    await page.locator('.duas-metades__metade--empresa').click();
    // A troca roda dentro de uma View Transition: a ordem nova chega um instante depois do clique.
    await expect.poll(() => ordemDosServicos(page)).toEqual(['nr1', 'traducao', 'idiomas', 'lms']);
    await expect(page.getByRole('button', { name: 'Pedir orçamento' }).first()).toBeVisible();
  });

  test('a escolha vale nas outras páginas e depois de recarregar', async ({ page }) => {
    await page.goto('/');
    await page.locator('.duas-metades__metade--voce').click();

    await page.goto('/curso-de-idiomas/');
    await expect(page.locator('html')).toHaveAttribute('data-publico', 'voce');
    await expect(page.getByRole('button', { name: 'Quero estudar' }).first()).toBeVisible();

    await page.goto('/');
    await page.reload();
    await expect(page.locator('input[name="publico"][value="voce"]')).toBeChecked();
    expect(await ordemDosServicos(page)).toEqual(['idiomas', 'traducao', 'nr1', 'lms']);
  });
});
