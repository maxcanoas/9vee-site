import { drawer, expect, mensagemDe, opcao, salvarPublico, semWhatsAppDeVerdade, test, tituloDoPasso } from './pedido.ts';

test.beforeEach(({ context }) => semWhatsAppDeVerdade(context));

test.describe('página de tradução simultânea', () => {
  // A duração decide se vai um intérprete ou dois: o pedido cobra a resposta e leva para a mensagem.
  test('o pedido cobra a duração do evento e leva a resposta na mensagem do WhatsApp', async ({ page, context }) => {
    await salvarPublico(context, 'empresa');
    await page.goto('/traducao-simultanea/');
    await page.locator('.hero-pagina [data-abre-contato]').click();

    await page.fill('#campo-traducao-empresa', 'Hotel Exemplo');
    await opcao(page, 'traducao', 'Inglês').click();
    await opcao(page, 'traducao', 'Ainda sem data').click();
    await opcao(page, 'traducao', 'Online').click();
    await opcao(page, 'traducao', 'Até 50').click();
    await page.locator('[data-continuar]').click();
    await expect(page.locator('#campo-traducao-duracao-erro')).toHaveText('Escolha uma das opções.');

    await opcao(page, 'traducao', 'Meio período').click();
    await page.locator('[data-continuar]').click();
    await expect(tituloDoPasso(page)).toHaveText('Como podemos te chamar?');
    await page.fill('#campo-final-nome', 'Maria');

    const [aba] = await Promise.all([
      context.waitForEvent('page'),
      drawer(page).locator('[data-saida-whatsapp]').click(),
    ]);
    expect(mensagemDe(aba.url())).toBe(
      [
        'Olá, 9vee. Vim pela página Tradução Simultânea do site e falo pela minha empresa.',
        'Quero um orçamento de tradução simultânea.',
        'Empresa: Hotel Exemplo',
        'Idiomas: inglês',
        'Data do evento: ainda sem data',
        'Duração: meio período',
        'Formato: online',
        'Participantes: até 50',
        'Meu nome é Maria.',
      ].join('\n'),
    );
  });
});
