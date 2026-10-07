import type { BrowserContext, Page } from '@playwright/test';
import { CHAVE_COOKIES, novaEscolha, textoDaEscolha } from '../../src/lib/cookies.ts';
import { TEMPO_MINIMO_DO_PEDIDO } from '../../src/lib/envio.ts';
import {
  drawer,
  expect,
  opcao,
  responderComoServico,
  salvarCookies,
  salvarPublico,
  semWhatsAppDeVerdade,
  test,
  vigiarEnvios,
} from './pedido.ts';

// O aviso de cookies e o GA4 do ticket 13. O preview sai sem GA4: para ver o GA4 carregar, o teste põe um ID no
// aviso de cada página que abre. O script do Google é de mentira (tests/e2e/pedido.ts), então a fila do gtag fica
// como o site a montou, e é ela que o teste lê.
test.use({ cookiesRespondidos: false });
test.beforeEach(({ context }) => semWhatsAppDeVerdade(context));

const ID = 'G-TESTE12345';
const aviso = (p: Page) => p.locator('[data-aviso-cookies]');
const botaoDoAviso = (p: Page, nome: string) => aviso(p).getByRole('button', { name: nome, exact: true });

/** O aviso de cada página que abre leva o ID de teste, como o local e a produção levam o deles. */
const comGa4 = (page: Page) =>
  page.route('**/*', async (rota) => {
    if (rota.request().resourceType() !== 'document') return rota.fallback();
    const resposta = await rota.fetch();
    const html = (await resposta.text()).replace('data-aviso-cookies ', `data-aviso-cookies data-ga4="${ID}" `);
    await rota.fulfill({ response: resposta, body: html });
  });

/** Cada pedido do script do GA4 que a página fez. */
function vigiarGa4(page: Page): string[] {
  const pedidos: string[] = [];
  page.on('request', (pedido) => {
    if (pedido.url().startsWith('https://www.googletagmanager.com/gtag/js')) pedidos.push(pedido.url());
  });
  return pedidos;
}

/** A fila do gtag, como o site a montou: cada chamada vira uma lista (o comando e o que vai com ele). */
const filaDoGtag = (page: Page) =>
  page.evaluate(() =>
    ((window as unknown as { dataLayer?: ArrayLike<unknown>[] }).dataLayer ?? []).map((chamada) => Array.from(chamada)),
  );
const eventos = async (page: Page) =>
  (await filaDoGtag(page)).filter(([comando]) => comando === 'event').map(([, nome, parametros]) => ({ nome, parametros }));

const respostaGuardada = (page: Page) =>
  page.evaluate((chave) => JSON.parse(localStorage.getItem(chave) ?? 'null'), CHAVE_COOKIES);

test.describe('aviso de cookies', () => {
  test('aparece na primeira visita, e a resposta fica guardada com a data e a versão', async ({ page }) => {
    const ga4 = vigiarGa4(page);
    await page.goto('/');
    await expect(aviso(page)).toBeVisible();
    await expect(aviso(page)).toHaveAccessibleName('Aviso de cookies');

    await botaoDoAviso(page, 'Recusar').click();
    await expect(aviso(page)).toBeHidden();
    const resposta = await respostaGuardada(page);
    expect(resposta).toMatchObject({ estatistica: false, versao: 1 });
    expect(Number.isNaN(Date.parse(resposta.em))).toBe(false);

    await page.reload();
    await expect(page.locator('h1')).toBeVisible();
    await expect(aviso(page)).toBeHidden();
    expect(ga4).toEqual([]);
  });

  test('pelo teclado, o aviso é a primeira parada, com o foco visível, e a resposta devolve o foco ao conteúdo', async ({ page, isMobile }) => {
    test.skip(isMobile, 'teclado físico só no desktop');
    await page.goto('/');
    await expect(aviso(page)).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(aviso(page).getByRole('link', { name: 'política de privacidade' })).toBeFocused();
    await page.keyboard.press('Tab');
    const aceitar = botaoDoAviso(page, 'Aceitar');
    await expect(aceitar).toBeFocused();
    expect(await aceitar.evaluate((botao) => getComputedStyle(botao).outlineStyle)).not.toBe('none');
    await page.keyboard.press('Tab');
    await expect(botaoDoAviso(page, 'Recusar')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(aviso(page)).toBeHidden();
    await expect(page.locator('#conteudo')).toBeFocused();
  });

  test('Preferências abre as categorias, com os necessários ligados e a estatística desligada, e salva a escolha', async ({ page }) => {
    await comGa4(page);
    const ga4 = vigiarGa4(page);
    await page.goto('/');
    await botaoDoAviso(page, 'Preferências').click();
    const estatistica = aviso(page).locator('input[name="cookies-estatistica"]');
    await expect(estatistica).toBeFocused();
    await expect(estatistica).not.toBeChecked();
    await expect(aviso(page).locator('input[type="checkbox"][disabled]')).toBeChecked();
    await expect(botaoDoAviso(page, 'Preferências')).toBeHidden();

    await estatistica.check();
    await botaoDoAviso(page, 'Salvar escolha').click();
    await expect(aviso(page)).toBeHidden();
    expect(await respostaGuardada(page)).toMatchObject({ estatistica: true, versao: 1 });
    await expect.poll(() => ga4.length).toBe(1);
  });

  test('não esconde o atalho do WhatsApp nem faz a página rolar de lado, no celular', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/');
    await expect(aviso(page)).toBeVisible();
    const doAviso = (await aviso(page).boundingBox())!;
    const doAtalho = (await page.locator('[data-whatsapp-flutuante]').boundingBox())!;
    expect(doAtalho.y + doAtalho.height).toBeLessThanOrEqual(doAviso.y);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
  });
});

test.describe('GA4 com Consent Mode v2', () => {
  test('só carrega depois do aceite, com tudo negado antes e só a estatística liberada', async ({ page }) => {
    await comGa4(page);
    const ga4 = vigiarGa4(page);
    await page.goto('/');
    await expect(aviso(page)).toBeVisible();
    expect(ga4).toEqual([]);
    expect(await filaDoGtag(page)).toEqual([]);

    await botaoDoAviso(page, 'Aceitar').click();
    await expect.poll(() => ga4).toEqual([`https://www.googletagmanager.com/gtag/js?id=${ID}`]);
    const [padrao, atualizacao, , configuracao] = await filaDoGtag(page);
    expect(padrao).toEqual([
      'consent',
      'default',
      { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' },
    ]);
    expect(atualizacao).toEqual([
      'consent',
      'update',
      { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' },
    ]);
    expect(configuracao).toEqual(['config', ID]);

    // Na volta, o aceite guardado já carrega o GA4, sem o aviso.
    await page.reload();
    await expect(page.locator('h1')).toBeVisible();
    await expect(aviso(page)).toBeHidden();
    await expect.poll(() => ga4.length).toBe(2);
  });

  test('sem ID, como no preview, o aceite fica guardado e nada do Google carrega', async ({ page }) => {
    const ga4 = vigiarGa4(page);
    await page.goto('/');
    await botaoDoAviso(page, 'Aceitar').click();
    await expect(aviso(page)).toBeHidden();
    await page.locator('.cabecalho__cta').click();
    expect(ga4).toEqual([]);
    expect(await filaDoGtag(page)).toEqual([]);
  });

  test('o botão do rodapé reabre as preferências, e quem volta atrás fica sem os cookies do Google', async ({ page, context }) => {
    await salvarCookies(context, true);
    await comGa4(page);
    await page.goto('/');
    await expect(aviso(page)).toBeHidden();
    await context.addCookies([
      { name: '_ga', value: 'GA1.1.1.1', domain: 'localhost', path: '/' },
      { name: `_ga_${ID.slice(2)}`, value: 'GS1.1.1', domain: 'localhost', path: '/' },
    ]);

    const doRodape = page.locator('footer [data-preferencias-cookies]');
    await doRodape.click();
    const estatistica = aviso(page).locator('input[name="cookies-estatistica"]');
    await expect(estatistica).toBeFocused();
    await expect(estatistica).toBeChecked();
    await estatistica.uncheck();
    await botaoDoAviso(page, 'Salvar escolha').click();
    await expect(aviso(page)).toBeHidden();
    await expect(doRodape).toBeFocused();

    expect((await context.cookies()).map((cookie) => cookie.name)).not.toContain('_ga');
    expect(await page.evaluate((id) => Reflect.get(window, `ga-disable-${id}`), ID)).toBe(true);
    expect((await filaDoGtag(page)).at(-1)?.slice(0, 2)).toEqual(['consent', 'update']);

    await page.locator('.cabecalho__cta').click();
    expect(await eventos(page)).toEqual([]);
  });

  // A página que já media continua viva quando a recusa acontece fora dela: noutra aba, ou noutra página antes de a
  // pessoa voltar a esta pelo cache do navegador. A política promete que, depois da recusa, nada mais é medido.
  const desligado = (p: Page) => p.evaluate((id) => Reflect.get(window, `ga-disable-${id}`), ID);

  test('a recusa feita noutra aba desliga o GA4 da página que já media', async ({ page, context }) => {
    await salvarCookies(context, true);
    await comGa4(page);
    await page.goto('/');
    await expect.poll(() => page.evaluate(() => Reflect.has(window, 'gtag'))).toBe(true);
    expect(await desligado(page)).toBe(false);

    const outraAba = await context.newPage();
    await outraAba.goto('/lms/');
    await outraAba.locator('footer [data-preferencias-cookies]').click();
    await aviso(outraAba).locator('input[name="cookies-estatistica"]').uncheck();
    await botaoDoAviso(outraAba, 'Salvar escolha').click();

    await expect.poll(() => desligado(page)).toBe(true);
    expect((await filaDoGtag(page)).at(-1)).toEqual(['consent', 'update', expect.objectContaining({ analytics_storage: 'denied' })]);
  });

  test('a página que volta do cache do navegador depois da recusa para de medir', async ({ page, context }) => {
    await salvarCookies(context, true);
    await comGa4(page);
    await page.goto('/');
    await expect.poll(() => page.evaluate(() => Reflect.has(window, 'gtag'))).toBe(true);

    // A recusa gravada noutra página, e a volta a esta pelo cache, que o navegador avisa com o pageshow persistido.
    await page.evaluate(
      ([chave, valor]) => {
        localStorage.setItem(chave, valor);
        dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
      },
      [CHAVE_COOKIES, textoDaEscolha(novaEscolha(false, new Date(), 1))] as const,
    );
    expect(await desligado(page)).toBe(true);
    await page.locator('.cabecalho__cta').click();
    expect(await eventos(page)).toEqual([]);
  });

  test('Esc fecha o aviso reaberto pelo rodapé, sem mudar a escolha', async ({ page, context, isMobile }) => {
    test.skip(isMobile, 'teclado físico só no desktop');
    await salvarCookies(context, false);
    await page.goto('/');
    await page.locator('footer [data-preferencias-cookies]').click();
    await expect(aviso(page)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(aviso(page)).toBeHidden();
    expect(await respostaGuardada(page)).toMatchObject({ estatistica: false });
  });
});

test.describe('eventos de lead', () => {
  /** Quem aceitou a estatística e já escolheu "Para sua empresa", na página de NR-1, com o GA4 ligado. */
  async function naPaginaDeNr1(page: Page, context: BrowserContext) {
    await salvarCookies(context, true);
    await salvarPublico(context, 'empresa');
    await comGa4(page);
    await page.clock.install();
    await page.goto('/treinamento-nr-1/');
    await expect(aviso(page)).toBeHidden();
  }

  async function preencherNr1AteOEnvio(page: Page) {
    await page.fill('#campo-nr1-empresa', 'Metalúrgica Exemplo');
    await opcao(page, 'nr1', '51 a 200').click();
    await opcao(page, 'nr1', 'Até 3 meses').click();
    await opcao(page, 'nr1', 'Online ao vivo').click();
    await opcao(page, 'nr1', 'Em construção').click();
    await drawer(page).locator('[data-continuar]').click();
    await page.fill('#campo-final-nome', 'Maria');
  }

  async function enviar(page: Page) {
    await drawer(page).locator('[data-abre-receber]').click();
    await page.fill('#campo-final-contato', 'maria@exemplo.com.br');
    await drawer(page).locator('input[name="final-consentimento"]').check();
    await page.clock.fastForward(TEMPO_MINIMO_DO_PEDIDO);
    await drawer(page).locator('[data-enviar-pedido]').click();
  }

  const DA_PAGINA = { servico: 'nr1', publico: 'empresa', pagina: 'Treinamento de NR-1' };

  test('abrir o pedido conta drawer_open, com o serviço e a página', async ({ page, context }) => {
    await naPaginaDeNr1(page, context);
    await page.locator('.cabecalho__cta').click();
    await expect(drawer(page)).toBeVisible();
    expect(await eventos(page)).toEqual([{ nome: 'drawer_open', parametros: { servico: 'nr1', pagina: 'Treinamento de NR-1' } }]);
  });

  test('o atalho do WhatsApp e a saída do pedido contam whatsapp_click, sem o nome nem a mensagem', async ({ page, context }) => {
    await naPaginaDeNr1(page, context);
    const aba = context.waitForEvent('page');
    await page.locator('[data-whatsapp-flutuante]').click();
    await (await aba).close();

    await page.locator('.cabecalho__cta').click();
    await preencherNr1AteOEnvio(page);
    const outra = context.waitForEvent('page');
    await drawer(page).locator('[data-saida-whatsapp]').click();
    await (await outra).close();

    const doWhatsApp = (await eventos(page)).filter(({ nome }) => nome === 'whatsapp_click');
    expect(doWhatsApp).toEqual([
      { nome: 'whatsapp_click', parametros: DA_PAGINA },
      { nome: 'whatsapp_click', parametros: DA_PAGINA },
    ]);
    expect(JSON.stringify(await filaDoGtag(page))).not.toMatch(/Maria|Metalúrgica|wa\.me/);
  });

  test('o pedido que chega conta lead_form_submit', async ({ page, context }) => {
    await naPaginaDeNr1(page, context);
    await vigiarEnvios(page);
    await page.locator('.cabecalho__cta').click();
    await preencherNr1AteOEnvio(page);
    await enviar(page);
    await expect(drawer(page).locator('[data-etapa="confirmado"]')).toBeVisible();
    expect((await eventos(page)).filter(({ nome }) => nome === 'lead_form_submit')).toEqual([
      { nome: 'lead_form_submit', parametros: DA_PAGINA },
    ]);
  });

  test('o pedido que falha e o da isca do robô não contam como lead', async ({ page, context }) => {
    await naPaginaDeNr1(page, context);
    await vigiarEnvios(page, (rota) => responderComoServico(rota, 500, { success: false }));
    await page.locator('.cabecalho__cta').click();
    await preencherNr1AteOEnvio(page);
    await enviar(page);
    await expect(drawer(page).locator('[data-etapa="falhou"]')).toBeVisible();

    await drawer(page).locator('[data-voltar]').click();
    await page.evaluate(() => {
      (document.querySelector('input[name="botcheck"]') as HTMLInputElement).checked = true;
    });
    await drawer(page).locator('[data-enviar-pedido]').click();
    await expect(drawer(page).locator('[data-etapa="confirmado"]')).toBeVisible();
    expect((await eventos(page)).map(({ nome }) => nome)).not.toContain('lead_form_submit');
  });

  test('sem o aceite, nenhum evento sai', async ({ page, context }) => {
    await salvarCookies(context, false);
    await comGa4(page);
    await page.goto('/treinamento-nr-1/');
    await page.locator('.cabecalho__cta').click();
    await expect(drawer(page)).toBeVisible();
    expect(await filaDoGtag(page)).toEqual([]);
  });
});
