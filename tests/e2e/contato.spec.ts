import { expect, test, type BrowserContext, type Page } from '@playwright/test';

// O WhatsApp de verdade nunca abre nos testes: a aba nova recebe uma página de mentira.
test.beforeEach(async ({ context }) => {
  await context.route('https://wa.me/**', (rota) =>
    rota.fulfill({ contentType: 'text/plain', body: 'wa.me interceptado' }),
  );
});

const salvarPublico = (context: BrowserContext, publico: 'empresa' | 'voce') =>
  context.addInitScript((p) => localStorage.setItem('9vee:publico', p), publico);

const drawer = (p: Page) => p.locator('#drawer-contato');
const titulo = (p: Page) => drawer(p).locator('.etapa:not([hidden]) .etapa__titulo');
const opcao = (p: Page, formulario: string, texto: string) =>
  p.locator(`[data-formulario="${formulario}"] label.opcao`, { hasText: texto }).first();
const mensagemDe = (url: string) => new URL(url).searchParams.get('text') ?? '';

async function preencherNr1(p: Page) {
  await p.fill('#campo-nr1-empresa', 'Metalúrgica Exemplo');
  await opcao(p, 'nr1', '51 a 200').click();
  await opcao(p, 'nr1', 'Até 3 meses').click();
  await opcao(p, 'nr1', 'Online ao vivo').click();
  await opcao(p, 'nr1', 'Em construção').click();
  await p.locator('[data-continuar]').click();
}

test.describe('drawer de contato', () => {
  test('abre no primeiro passo sem resposta, com o foco na pergunta', async ({ page }) => {
    await page.goto('/');
    await page.locator('.hero__cta').click();

    await expect(drawer(page)).toBeVisible();
    await expect(titulo(page)).toHaveText('É para sua empresa ou para você?');
    await expect(titulo(page)).toBeFocused();
    await expect(drawer(page).locator('[data-passo-texto]')).toHaveText('Passo 1 de 4');
  });

  test('no toque, escolher o público avança e vale para o site todo', async ({ page }) => {
    await page.goto('/');
    await page.locator('.hero__cta').click();
    await drawer(page).locator('.metade--esquerda').click();

    await expect(titulo(page)).toHaveText('Qual serviço você procura?');
    await expect(drawer(page).locator('[data-resumo-de="publico"]')).toContainText('Para a minha empresa');
    await expect(page.locator('html')).toHaveAttribute('data-publico', 'empresa');
  });

  test('a página de NR-1 já chega com o serviço escolhido', async ({ page, context }) => {
    await salvarPublico(context, 'empresa');
    await page.goto('/treinamento-nr-1/');
    await page.locator('.cabecalho__cta').click();

    await expect(titulo(page)).toHaveText('Sobre o treinamento');
    await expect(page.locator('[data-formulario="nr1"]')).toBeVisible();
    await expect(drawer(page).locator('[data-resumo-de="servico"]')).toContainText('Treinamento de NR-1');
  });

  test('quem escolheu "Para você" monta as aulas, com os idiomas já marcados como serviço', async ({ page, context }) => {
    await salvarPublico(context, 'voce');
    await page.goto('/');
    await page.getByRole('button', { name: 'Quero estudar' }).first().click();

    // O nome acessível ignora a versão escondida do título, como o leitor de tela.
    await expect(drawer(page)).toHaveAccessibleName('Montar suas aulas');
    await expect(titulo(page)).toHaveText('Sobre as suas aulas');
    await expect(page.locator('[data-formulario="idiomasVoce"]')).toBeVisible();
  });

  test('o botão pode trazer o idioma escolhido', async ({ page, context }) => {
    await salvarPublico(context, 'voce');
    await page.goto('/curso-de-idiomas/');
    await page.evaluate(() => {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.textContent = 'Estudar japonês';
      botao.dataset.abreContato = '';
      botao.dataset.idioma = 'japones';
      document.querySelector('main')!.append(botao);
    });
    await page.getByRole('button', { name: 'Estudar japonês' }).click();

    await expect(page.locator('input[name="idiomasVoce-idioma"][value="japones"]')).toBeChecked();
  });

  test('"Continuar" sem resposta aponta cada erro e leva o foco ao primeiro', async ({ page, context }) => {
    await salvarPublico(context, 'empresa');
    await page.goto('/treinamento-nr-1/');
    await page.locator('.cabecalho__cta').click();
    await page.locator('[data-continuar]').click();

    await expect(page.locator('#campo-nr1-empresa-erro')).toHaveText('Escreva o nome da empresa.');
    await expect(page.locator('#campo-nr1-colaboradores-erro')).toHaveText('Escolha uma das opções.');
    await expect(page.locator('#campo-nr1-empresa')).toBeFocused();
    await expect(page.locator('#campo-nr1-empresa')).toHaveAttribute('aria-invalid', 'true');

    await page.fill('#campo-nr1-empresa', 'Metalúrgica Exemplo');
    await expect(page.locator('#campo-nr1-empresa-erro')).toBeHidden();
  });

  test('do começo ao WhatsApp: a mensagem leva a página, o público, as respostas e o nome', async ({ page, context }) => {
    await page.goto('/');
    await page.locator('.hero__cta').click();
    await drawer(page).locator('.metade--esquerda').click();
    await drawer(page).locator('.servico-opcao', { hasText: 'Treinamento de NR-1' }).click();
    await expect(titulo(page)).toHaveText('Sobre o treinamento');
    await preencherNr1(page);

    await expect(titulo(page)).toHaveText('Como podemos te chamar?');
    await page.fill('#campo-final-nome', 'Maria');

    const saida = drawer(page).locator('[data-saida-whatsapp]');
    await expect(saida).toHaveAttribute('target', '_blank');
    await expect(saida).toHaveAttribute('rel', /noopener/);

    const [aba] = await Promise.all([context.waitForEvent('page'), saida.click()]);
    expect(aba.url()).toMatch(/^https:\/\/wa\.me\/5511934661917\?text=/);
    expect(mensagemDe(aba.url())).toBe(
      [
        'Olá, 9vee. Vim pela página inicial do site e falo pela minha empresa.',
        'Quero um orçamento de treinamento de NR-1.',
        'Empresa: Metalúrgica Exemplo',
        'Colaboradores: 51 a 200',
        'Prazo de adequação: até 3 meses',
        'Formato: online ao vivo',
        'Programa em andamento: em construção',
        'Meu nome é Maria.',
      ].join('\n'),
    );
    await expect(titulo(page)).toHaveText('Abrimos a conversa no WhatsApp.');
    await expect(drawer(page).locator('[data-link-whatsapp]')).toHaveAttribute('href', aba.url());
  });

  test('sem nome, o WhatsApp não abre e o campo pede o nome', async ({ page, context }) => {
    await salvarPublico(context, 'empresa');
    await page.goto('/treinamento-nr-1/');
    await page.locator('.cabecalho__cta').click();
    await preencherNr1(page);

    let abriu = false;
    context.on('page', () => (abriu = true));
    await drawer(page).locator('[data-saida-whatsapp]').click();

    await expect(page.locator('#campo-final-nome-erro')).toHaveText('Escreva como podemos te chamar.');
    await expect(page.locator('#campo-final-nome')).toBeFocused();
    expect(abriu).toBe(false);
  });

  test('"Prefiro receber contato" confere o contato e mostra a confirmação simulada', async ({ page, context }) => {
    await salvarPublico(context, 'empresa');
    await page.goto('/treinamento-nr-1/');
    await page.locator('.cabecalho__cta').click();
    await preencherNr1(page);
    await page.fill('#campo-final-nome', 'Maria');

    const receber = drawer(page).locator('[data-abre-receber]');
    await receber.click();
    await expect(receber).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#campo-final-contato')).toBeFocused();

    await page.fill('#campo-final-contato', 'maria@exemplo');
    await drawer(page).locator('[data-enviar-pedido]').click();
    await expect(page.locator('#campo-final-contato-erro')).toHaveText('Informe um WhatsApp com DDD ou um e-mail.');

    await page.fill('#campo-final-contato', 'maria@exemplo.com.br');
    await drawer(page).locator('[data-enviar-pedido]').click();
    await expect(titulo(page)).toHaveText('Pedido anotado.');
    await expect(drawer(page).locator('[data-linhas-confirmacao]')).toContainText('E-mail: maria@exemplo.com.br');
    await expect(drawer(page).locator('.drawer__simulado')).toContainText('MVP: envio simulado');
  });

  test('tradução: a cidade some no online, e "Outra" pede o nome da cidade', async ({ page, context }) => {
    await salvarPublico(context, 'empresa');
    await page.goto('/traducao-simultanea/');
    await page.locator('.cabecalho__cta').click();
    const cidade = page.locator('[data-formulario="traducao"] [data-campo="cidade"]');
    const outra = page.locator('#campo-traducao-cidadeOutra');
    await expect(titulo(page)).toHaveText('Sobre o evento');

    await opcao(page, 'traducao', 'Online').click();
    await expect(cidade).toBeHidden();
    await opcao(page, 'traducao', 'Presencial').click();
    await expect(cidade).toBeVisible();
    await expect(outra).toBeHidden();
    await opcao(page, 'traducao', 'Outra').click();
    await expect(outra).toBeVisible();
  });

  test('"Alterar" volta ao passo e o "Continuar" retorna ao que falta', async ({ page, context }) => {
    await salvarPublico(context, 'empresa');
    await page.goto('/treinamento-nr-1/');
    await page.locator('.cabecalho__cta').click();
    await preencherNr1(page);

    await drawer(page).getByRole('button', { name: 'Alterar para quem é o pedido' }).click();
    await expect(titulo(page)).toHaveText('É para sua empresa ou para você?');
    await drawer(page).locator('[data-continuar]').click();
    await expect(titulo(page)).toHaveText('Como podemos te chamar?');
  });
});

test.describe('drawer pelo teclado', () => {
  test.skip(({ isMobile }) => isMobile, 'teclado físico só no desktop');

  test('Enter abre, as setas marcam sem avançar e o Enter avança', async ({ page }) => {
    await page.goto('/');
    await page.locator('.cabecalho__cta').focus();
    await page.keyboard.press('Enter');
    await expect(titulo(page)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="drawer-publico"][value="empresa"]')).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('input[name="drawer-publico"][value="voce"]')).toBeChecked();
    await expect(titulo(page)).toHaveText('É para sua empresa ou para você?');

    await page.keyboard.press('Enter');
    await expect(titulo(page)).toHaveText('Qual serviço você procura?');
  });

  test('Tab dá a volta dentro do drawer, Esc fecha e o foco volta ao botão', async ({ page }) => {
    await page.goto('/');
    const abridor = page.locator('.cabecalho__cta');
    await abridor.focus();
    await page.keyboard.press('Enter');

    const continuar = drawer(page).locator('[data-continuar]');
    const fechar = drawer(page).locator('.drawer__fechar');
    await continuar.focus();
    await page.keyboard.press('Tab');
    await expect(fechar).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(continuar).toBeFocused();

    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => Boolean(document.activeElement?.closest('#drawer-contato')))).toBe(true);
    }

    await page.keyboard.press('Escape');
    await expect(drawer(page)).toBeHidden();
    await expect(abridor).toBeFocused();
  });

  test('clique no véu fecha o drawer', async ({ page }) => {
    await page.goto('/');
    await page.locator('.hero__cta').click();
    await expect(drawer(page)).toBeVisible();
    await page.mouse.click(40, 400);
    await expect(drawer(page)).toBeHidden();
  });
});

test.describe('atalho do WhatsApp', () => {
  test('leva a página e o público na mensagem, em nova aba', async ({ page, context }) => {
    await salvarPublico(context, 'empresa');
    await page.goto('/treinamento-nr-1/');
    const atalho = page.locator('[data-whatsapp-flutuante]');

    await expect(atalho).toHaveAttribute('target', '_blank');
    await expect(atalho).toHaveAttribute('rel', /noopener/);
    expect(mensagemDe((await atalho.getAttribute('href'))!)).toBe(
      'Olá, 9vee. Vim pela página Treinamento de NR-1 do site e quero um orçamento do treinamento de NR-1 para a minha empresa.',
    );
  });

  test('troca a mensagem quando a pessoa escolhe o público', async ({ page }) => {
    await page.goto('/');
    const atalho = page.locator('[data-whatsapp-flutuante]');
    expect(mensagemDe((await atalho.getAttribute('href'))!)).toContain('e quero pedir um orçamento.');

    await page.locator('.duas-metades__metade--voce').click();
    await expect.poll(async () => mensagemDe((await atalho.getAttribute('href'))!)).toContain('quero saber das aulas de idioma para mim');
  });

  test('some enquanto o drawer está aberto', async ({ page }) => {
    await page.goto('/');
    await page.locator('.hero__cta').click();
    await expect(page.locator('[data-whatsapp-flutuante]')).toBeHidden();
  });

  test('não cobre o fim do rodapé', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
    // Pior caso: o atalho visível no fim da página (no celular ele se recolhe ao descer).
    await page.locator('[data-whatsapp-flutuante]').evaluate((el) => el.removeAttribute('data-recolhido'));

    const atalho = (await page.locator('[data-whatsapp-flutuante]').boundingBox())!;
    for (const ultimo of await page.locator('.rodape__base > *').all()) {
      const caixa = (await ultimo.boundingBox())!;
      expect(caixa.y + caixa.height).toBeLessThanOrEqual(atalho.y);
    }
  });
});
