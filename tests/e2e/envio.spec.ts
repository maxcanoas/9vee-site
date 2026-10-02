import type { BrowserContext, Page } from '@playwright/test';
import { TEMPO_MINIMO_DO_PEDIDO } from '../../src/lib/envio.ts';
import {
  drawer,
  expect,
  mensagemDe,
  opcao,
  responderComoServico,
  salvarPublico,
  semWhatsAppDeVerdade,
  test,
  tituloDoPasso,
  vigiarEnvios,
} from './pedido.ts';

test.beforeEach(({ context }) => semWhatsAppDeVerdade(context));

const CONSENTIMENTO = 'Li a política de privacidade e concordo que a 9vee use estes dados para responder ao meu pedido.';
const caixaDoConsentimento = (p: Page) => drawer(p).locator('input[name="final-consentimento"]');
const botaoEnviar = (p: Page) => drawer(p).locator('[data-enviar-pedido]');

/** Um pedido de NR-1 de empresa, preenchido até o contato: falta a caixa do consentimento e o envio. */
async function chegarAoEnvio(page: Page, context: BrowserContext) {
  await salvarPublico(context, 'empresa');
  // O relógio do teste: o pedido só sai depois do tempo mínimo, e é o teste que diz quanto tempo passou.
  await page.clock.install();
  await page.goto('/treinamento-nr-1/');
  await page.locator('.cabecalho__cta').click();
  await page.fill('#campo-nr1-empresa', 'Metalúrgica Exemplo');
  await opcao(page, 'nr1', '51 a 200').click();
  await opcao(page, 'nr1', 'Até 3 meses').click();
  await opcao(page, 'nr1', 'Online ao vivo').click();
  await opcao(page, 'nr1', 'Em construção').click();
  await drawer(page).locator('[data-continuar]').click();
  await page.fill('#campo-final-nome', 'Maria');
  await drawer(page).locator('[data-abre-receber]').click();
  await page.fill('#campo-final-contato', 'maria@exemplo.com.br');
}

const passarOTempoMinimo = (page: Page) => page.clock.fastForward(TEMPO_MINIMO_DO_PEDIDO);

test.describe('envio do pedido', () => {
  test('"Prefiro receber contato" abre o campo do contato e confere o que foi digitado', async ({ page, context }) => {
    await chegarAoEnvio(page, context);
    const recebidos = await vigiarEnvios(page);
    await expect(drawer(page).locator('[data-abre-receber]')).toHaveAttribute('aria-expanded', 'true');

    await page.fill('#campo-final-contato', 'maria@exemplo');
    await caixaDoConsentimento(page).check();
    await passarOTempoMinimo(page);
    await botaoEnviar(page).click();

    await expect(page.locator('#campo-final-contato-erro')).toHaveText('Informe um WhatsApp com DDD ou um e-mail.');
    await expect(page.locator('#campo-final-contato')).toBeFocused();
    expect(recebidos).toHaveLength(0);
  });

  test('a caixa do consentimento vem desmarcada, leva à política e é obrigatória', async ({ page, context }) => {
    await chegarAoEnvio(page, context);
    const recebidos = await vigiarEnvios(page);
    const caixa = caixaDoConsentimento(page);

    await expect(caixa).not.toBeChecked();
    // O nome da caixa é a frase do aceite, com o aviso de nova aba que o link leva para o leitor de tela.
    await expect(caixa).toHaveAccessibleName(CONSENTIMENTO.replace('privacidade', 'privacidade (abre em nova aba)'));
    const politica = drawer(page).locator('.consentimento a');
    await expect(politica).toHaveText(/^política de privacidade/);
    await expect(politica).toHaveAttribute('href', '/politica-de-privacidade/#pedido');
    // Em outra aba: na mesma, a pessoa perderia o pedido que acabou de preencher.
    await expect(politica).toHaveAttribute('target', '_blank');
    await expect(politica).toHaveAttribute('rel', /noopener/);

    await passarOTempoMinimo(page);
    await botaoEnviar(page).click();
    await expect(page.locator('#campo-final-consentimento-erro')).toHaveText('Marque a caixa para enviar o pedido.');
    await expect(caixa).toBeFocused();
    await expect(caixa).toHaveAttribute('aria-invalid', 'true');
    expect(recebidos).toHaveLength(0);

    await caixa.check();
    await expect(page.locator('#campo-final-consentimento-erro')).toBeHidden();
  });

  test('o pedido chega com o assunto do comercial, as respostas, a página e o consentimento', async ({ page, context }) => {
    await chegarAoEnvio(page, context);
    const recebidos = await vigiarEnvios(page);
    await caixaDoConsentimento(page).check();
    await passarOTempoMinimo(page);
    await botaoEnviar(page).click();

    await expect(tituloDoPasso(page)).toHaveText('Pedido anotado.');
    await expect(tituloDoPasso(page)).toBeFocused();
    await expect(drawer(page).locator('[data-linhas-confirmacao]')).toContainText('E-mail: maria@exemplo.com.br');
    await expect(drawer(page)).not.toContainText('MVP');

    expect(recebidos).toHaveLength(1);
    const { access_key: chave, 'Aceito em': aceitoEm, ...pedido } = recebidos[0];
    expect(typeof chave).toBe('string');
    // A hora do aceite em ISO, com o fuso de quem enviou.
    expect(aceitoEm).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/);
    expect(Object.entries(pedido)).toEqual([
      ['subject', '[Lead site] NR-1 | Empresa | Metalúrgica Exemplo'],
      ['from_name', 'Site 9vee'],
      ['replyto', 'maria@exemplo.com.br'],
      ['Público', 'Empresa'],
      ['Serviço', 'Treinamento de NR-1'],
      ['Empresa', 'Metalúrgica Exemplo'],
      ['Colaboradores', '51 a 200'],
      ['Prazo de adequação', 'até 3 meses'],
      ['Formato', 'online ao vivo'],
      ['Programa em andamento', 'em construção'],
      ['Nome', 'Maria'],
      ['E-mail', 'maria@exemplo.com.br'],
      ['Página de origem', `Treinamento de NR-1 (${new URL('/treinamento-nr-1/', page.url()).href})`],
      ['Consentimento', CONSENTIMENTO],
    ]);
  });

  test('quem deixa o WhatsApp não vira endereço de resposta do e-mail', async ({ page, context }) => {
    await chegarAoEnvio(page, context);
    const recebidos = await vigiarEnvios(page);
    await page.fill('#campo-final-contato', '(11) 91234-5678');
    await caixaDoConsentimento(page).check();
    await passarOTempoMinimo(page);
    await botaoEnviar(page).click();

    await expect(tituloDoPasso(page)).toHaveText('Pedido anotado.');
    expect(recebidos[0]).not.toHaveProperty('replyto');
    expect(recebidos[0].WhatsApp).toBe('(11) 91234-5678');
  });

  test('mostra "Enviando" enquanto espera, e um segundo toque não manda outro pedido', async ({ page, context }) => {
    await chegarAoEnvio(page, context);
    let liberar = () => {};
    const espera = new Promise<void>((resolver) => (liberar = resolver));
    const recebidos = await vigiarEnvios(page, async (rota) => {
      await espera;
      await responderComoServico(rota, 200, { success: true });
    });
    await caixaDoConsentimento(page).check();
    await passarOTempoMinimo(page);
    await botaoEnviar(page).click();

    await expect(botaoEnviar(page)).toHaveText('Enviando');
    await expect(botaoEnviar(page)).toHaveAttribute('aria-disabled', 'true');
    await botaoEnviar(page).click({ force: true });
    liberar();

    await expect(tituloDoPasso(page)).toHaveText('Pedido anotado.');
    expect(recebidos).toHaveLength(1);
  });

  for (const { caso, responder } of [
    { caso: 'o serviço responde com erro', responder: (rota) => responderComoServico(rota, 500, { success: false }) },
    { caso: 'a rede cai', responder: (rota) => rota.abort('failed') },
  ] satisfies { caso: string; responder: Parameters<typeof vigiarEnvios>[1] }[]) {
    test(`quando ${caso}, a tela oferece o WhatsApp com a mensagem pronta e deixa tentar de novo`, async ({ page, context }) => {
      await chegarAoEnvio(page, context);
      let falhar = true;
      const recebidos = await vigiarEnvios(page, (rota) =>
        falhar ? responder!(rota) : responderComoServico(rota, 200, { success: true }),
      );
      await caixaDoConsentimento(page).check();
      await passarOTempoMinimo(page);
      await botaoEnviar(page).click();

      await expect(tituloDoPasso(page)).toHaveText('Não deu para enviar.');
      await expect(tituloDoPasso(page)).toBeFocused();
      const saida = drawer(page).locator('[data-falha-whatsapp]');
      await expect(saida).toBeVisible();
      await expect(saida).toHaveAttribute('target', '_blank');
      expect(mensagemDe((await saida.getAttribute('href'))!)).toBe(
        [
          'Olá, 9vee. Vim pela página Treinamento de NR-1 do site e falo pela minha empresa.',
          'Quero um orçamento de treinamento de NR-1.',
          'Empresa: Metalúrgica Exemplo',
          'Colaboradores: 51 a 200',
          'Prazo de adequação: até 3 meses',
          'Formato: online ao vivo',
          'Programa em andamento: em construção',
          'Meu nome é Maria.',
        ].join('\n'),
      );

      // De volta ao pedido, com o contato e a caixa como a pessoa deixou.
      falhar = false;
      await drawer(page).getByRole('button', { name: 'Tentar de novo' }).click();
      await expect(tituloDoPasso(page)).toHaveText('Como podemos te chamar?');
      await expect(page.locator('#campo-final-contato')).toHaveValue('maria@exemplo.com.br');
      await expect(caixaDoConsentimento(page)).toBeChecked();
      await botaoEnviar(page).click();
      await expect(tituloDoPasso(page)).toHaveText('Pedido anotado.');
      expect(recebidos).toHaveLength(2);
    });
  }

  test('pela isca, nada é enviado, e o robô vê a confirmação', async ({ page, context }) => {
    await chegarAoEnvio(page, context);
    const recebidos = await vigiarEnvios(page);
    const isca = drawer(page).locator('input[name="botcheck"]');
    // Pessoa não vê nem alcança a isca: só um robô, que mexe no HTML, marca a caixa.
    await expect(isca).toBeHidden();
    await isca.evaluate((caixa: HTMLInputElement) => (caixa.checked = true));

    await caixaDoConsentimento(page).check();
    await passarOTempoMinimo(page);
    await botaoEnviar(page).click();

    await expect(tituloDoPasso(page)).toHaveText('Pedido anotado.');
    expect(recebidos).toHaveLength(0);
  });

  test('com pressa de robô, nada é enviado, e quem é gente tenta de novo e consegue', async ({ page, context }) => {
    await chegarAoEnvio(page, context);
    const recebidos = await vigiarEnvios(page);
    // O relógio volta à hora em que o pedido abriu e para: o envio sai no mesmo instante da abertura.
    await drawer(page).locator('.drawer__fechar').click();
    await page.clock.pauseAt(new Date(Date.now() + 60_000));
    await page.locator('.cabecalho__cta').click();
    await drawer(page).locator('[data-abre-receber]').click();
    await caixaDoConsentimento(page).check();
    await botaoEnviar(page).click();

    await expect(tituloDoPasso(page)).toHaveText('Não deu para enviar.');
    expect(recebidos).toHaveLength(0);

    await passarOTempoMinimo(page);
    await drawer(page).getByRole('button', { name: 'Tentar de novo' }).click();
    await botaoEnviar(page).click();
    await expect(tituloDoPasso(page)).toHaveText('Pedido anotado.');
    expect(recebidos).toHaveLength(1);
  });

  test('um pedido novo pede o consentimento de novo', async ({ page, context }) => {
    await chegarAoEnvio(page, context);
    await vigiarEnvios(page);
    await caixaDoConsentimento(page).check();
    await passarOTempoMinimo(page);
    await botaoEnviar(page).click();
    await expect(tituloDoPasso(page)).toHaveText('Pedido anotado.');

    await drawer(page).locator('[data-fechar-fim]').click();
    await page.locator('.cabecalho__cta').click();
    await drawer(page).locator('[data-abre-receber]').click();
    await expect(caixaDoConsentimento(page)).not.toBeChecked();
  });
});
