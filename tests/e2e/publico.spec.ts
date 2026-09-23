import { expect, test, type Page } from '@playwright/test';

// A ordem que a cliente pediu em 23/09/2026. A escolha de público não mexe nela.
const ORDEM = ['idiomas', 'traducao', 'nr1', 'lms'];

const ordemDosServicos = (pagina: Page) =>
  pagina.locator('[data-ordenavel] > li').evaluateAll((itens) => itens.map((li) => li.getAttribute('data-servico')));

/** A ordem no DOM da home, a ordem na tela (pela posição, que é o que o CSS mostra) e a do passo do serviço no pedido. */
async function conferirOrdem(pagina: Page) {
  expect(await ordemDosServicos(pagina)).toEqual(ORDEM);
  const naTela = await pagina
    .locator('[data-ordenavel] > li')
    .evaluateAll((itens) =>
      itens
        .map((li) => ({ id: li.getAttribute('data-servico'), caixa: li.getBoundingClientRect() }))
        .sort((a, b) => a.caixa.top - b.caixa.top || a.caixa.left - b.caixa.left)
        .map(({ id }) => id),
    );
  expect(naTela).toEqual(ORDEM);
  const noPedido = await pagina
    .locator('input[name="drawer-servico"]')
    .evaluateAll((opcoes) => opcoes.map((opcao) => opcao.getAttribute('value')));
  expect(noPedido).toEqual(ORDEM);
}

test.describe('escolha de público', () => {
  test('sem escolha, a home mostra os serviços na ordem da cliente', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).not.toHaveAttribute('data-publico', /.+/);
    await conferirOrdem(page);
  });

  test('"Para você" troca o texto do CTA e mantém a ordem, na home e no pedido', async ({ page }) => {
    await page.goto('/');
    await page.locator('.duas-metades__metade--voce').click();

    await expect(page.locator('html')).toHaveAttribute('data-publico', 'voce');
    await expect(page.getByRole('button', { name: 'Quero estudar' }).first()).toBeVisible();
    await conferirOrdem(page);
  });

  test('"Para sua empresa" volta o CTA para o orçamento e mantém a ordem', async ({ page }) => {
    await page.goto('/');
    await page.locator('.duas-metades__metade--voce').click();
    await page.locator('.duas-metades__metade--empresa').click();

    await expect(page.locator('html')).toHaveAttribute('data-publico', 'empresa');
    await expect(page.getByRole('button', { name: 'Pedir orçamento' }).first()).toBeVisible();
    await conferirOrdem(page);
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
    await conferirOrdem(page);
  });

  test('na página de cursos, a empresa vê o bloco da equipe antes dos formatos', async ({ page, context }) => {
    const ordemDosBlocos = () =>
      page
        .locator('.modalidades > .modalidade')
        .evaluateAll((blocos) =>
          blocos
            .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
            .map((bloco) => bloco.querySelector('section')?.id),
        );

    await page.goto('/curso-de-idiomas/');
    expect(await ordemDosBlocos()).toEqual(['formatos', 'empresas']);

    await context.addInitScript(() => localStorage.setItem('9vee:publico', 'empresa'));
    await page.goto('/curso-de-idiomas/');
    expect(await ordemDosBlocos()).toEqual(['empresas', 'formatos']);
  });
});
