import type { Page } from '@playwright/test';
import { INTERPRETACAO_DE_MANDARIM } from '../conteudo.ts';
import { contrasteSobreOGrifo } from './grifo.ts';
import { drawer, expect, mensagemDe, opcao, salvarPublico, semWhatsAppDeVerdade, test, tituloDoPasso } from './pedido.ts';

test.beforeEach(({ context }) => semWhatsAppDeVerdade(context));

const idiomaDoEvento = (p: Page, valor: string) => p.locator(`input[name="traducao-idiomas"][value="${valor}"]`);

test.describe('página de interpretação de mandarim', () => {
  // O botão da página diz o serviço; o do cabeçalho não diz nada, e vale o que a página entrega ao pedido.
  for (const { nome, botao } of [
    { nome: 'o botão da página', botao: '.hero-pagina [data-abre-contato]' },
    { nome: 'o botão do cabeçalho', botao: '.cabecalho__cta' },
  ]) {
    test(`${nome} abre o pedido com a tradução simultânea e o mandarim marcados`, async ({ page, context }) => {
      await salvarPublico(context, 'empresa');
      await page.goto(INTERPRETACAO_DE_MANDARIM);
      await page.locator(botao).click();

      await expect(tituloDoPasso(page)).toHaveText('Sobre o evento');
      await expect(drawer(page).locator('[data-resumo-de="servico"]')).toContainText('Tradução simultânea');
      await expect(idiomaDoEvento(page, 'mandarim')).toBeChecked();
      await expect(page.locator('input[name="traducao-idiomas"]:checked')).toHaveCount(1);

      // A mensagem do WhatsApp já sai com a página e o idioma, sem a pessoa marcar nada.
      const saida = (await drawer(page).locator('[data-saida-whatsapp]').getAttribute('href'))!;
      expect(mensagemDe(saida)).toBe(
        [
          'Olá, 9vee. Vim pela página Interpretação de Mandarim do site e falo pela minha empresa.',
          'Quero um orçamento de tradução simultânea.',
          'Idiomas: mandarim',
        ].join('\n'),
      );
    });
  }

  test('quem troca o idioma encontra a própria escolha quando reabre o pedido', async ({ page, context }) => {
    await salvarPublico(context, 'empresa');
    await page.goto(INTERPRETACAO_DE_MANDARIM);
    await page.locator('.cabecalho__cta').click();
    await opcao(page, 'traducao', 'Mandarim').click();
    await opcao(page, 'traducao', 'Inglês').click();
    await drawer(page).locator('.drawer__fechar').click();
    await page.locator('#contato [data-abre-contato]').click();

    await expect(idiomaDoEvento(page, 'ingles')).toBeChecked();
    await expect(idiomaDoEvento(page, 'mandarim')).not.toBeChecked();
  });

  // O grifo passa por trás das letras da frase em tipo grande: ali o texto também precisa de 4,5:1.
  test('a palavra "mandarim" dá 4,5:1 sobre o grifo', async ({ page }) => {
    await page.goto(INTERPRETACAO_DE_MANDARIM);
    const contrastes = await page.locator('#precisao .grifo').evaluateAll(contrasteSobreOGrifo);
    expect(contrastes.map(({ texto }) => texto)).toEqual(['mandarim']);
    for (const { texto, razao } of contrastes) expect(razao, texto).toBeGreaterThanOrEqual(4.5);
  });
});

test.describe('página de interpretação de mandarim, sem JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  // O botão do pedido some, e o prazo é conteúdo da página: continua à vista, com o WhatsApp no atalho.
  test('o prazo de resposta continua à vista, e o WhatsApp, alcançável', async ({ page }) => {
    await page.goto(INTERPRETACAO_DE_MANDARIM);
    await expect(page.locator('.hero-pagina [data-abre-contato]')).toBeHidden();
    await expect(page.locator('.hero-pagina .botao-com-nota__nota')).toHaveText('A 9vee responde em até um dia útil.');
    await expect(page.locator('[data-whatsapp-flutuante]')).toBeVisible();
  });
});
