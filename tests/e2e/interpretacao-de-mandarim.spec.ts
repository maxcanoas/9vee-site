import { expect, test, type Page } from '@playwright/test';
import { INTERPRETACAO_DE_MANDARIM } from '../conteudo.ts';
import { contrasteSobreOGrifo } from './grifo.ts';
import { drawer, mensagemDe, opcao, salvarPublico, semWhatsAppDeVerdade, tituloDoPasso } from './pedido.ts';

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
    });
  }

  test('a mensagem do WhatsApp leva a página e o mandarim, sem a pessoa marcar o idioma', async ({ page, context }) => {
    await salvarPublico(context, 'empresa');
    await page.goto(INTERPRETACAO_DE_MANDARIM);
    await page.locator('#contato [data-abre-contato]').click();

    await page.fill('#campo-traducao-empresa', 'Fundo Exemplo');
    await opcao(page, 'traducao', 'Ainda sem data').click();
    await opcao(page, 'traducao', 'Até 1 hora').click();
    await opcao(page, 'traducao', 'Online').click();
    await opcao(page, 'traducao', 'Até 50').click();
    await page.locator('[data-continuar]').click();
    await expect(tituloDoPasso(page)).toHaveText('Como podemos te chamar?');
    await page.fill('#campo-final-nome', 'Maria');

    const [aba] = await Promise.all([
      context.waitForEvent('page'),
      drawer(page).locator('[data-saida-whatsapp]').click(),
    ]);
    expect(mensagemDe(aba.url())).toBe(
      [
        'Olá, 9vee. Vim pela página Interpretação de Mandarim do site e falo pela minha empresa.',
        'Quero um orçamento de tradução simultânea.',
        'Empresa: Fundo Exemplo',
        'Idiomas: mandarim',
        'Data do evento: ainda sem data',
        'Duração: até 1 hora',
        'Formato: online',
        'Participantes: até 50',
        'Meu nome é Maria.',
      ].join('\n'),
    );
  });

  test('quem troca o idioma encontra a própria escolha quando reabre o pedido', async ({ page, context }) => {
    await salvarPublico(context, 'empresa');
    await page.goto(INTERPRETACAO_DE_MANDARIM);
    await page.locator('.cabecalho__cta').click();
    await opcao(page, 'traducao', 'Mandarim').click();
    await opcao(page, 'traducao', 'Inglês').click();
    await drawer(page).locator('.drawer__fechar').click();
    await page.locator('.hero-pagina [data-abre-contato]').click();

    await expect(idiomaDoEvento(page, 'ingles')).toBeChecked();
    await expect(idiomaDoEvento(page, 'mandarim')).not.toBeChecked();
  });

  // O prazo fica logo abaixo do botão: os dois precisam caber na primeira tela de um notebook.
  test('o prazo de resposta cabe na primeira tela em 1280 x 800, junto do botão', async ({ page, isMobile }) => {
    test.skip(isMobile, 'a medida é a do notebook');
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(INTERPRETACAO_DE_MANDARIM);
    await page.evaluate(() => document.fonts.ready);
    const caixa = await page.locator('.hero-pagina .botao-com-nota').boundingBox();
    expect(caixa!.y + caixa!.height).toBeLessThanOrEqual(800);
  });

  // O grifo passa por trás das letras da frase em tipo grande: ali o texto também precisa de 4,5:1.
  test('a palavra "mandarim" dá 4,5:1 sobre o grifo', async ({ page }) => {
    await page.goto(INTERPRETACAO_DE_MANDARIM);
    const contrastes = await page.locator('#precisao .grifo').evaluateAll(contrasteSobreOGrifo);
    expect(contrastes.map(({ texto }) => texto)).toEqual(['mandarim']);
    for (const { texto, razao } of contrastes) expect(razao, texto).toBeGreaterThanOrEqual(4.5);
  });
});
