// Capturas para revisão de cada etapa, em relatorios/<etapa>/ (fora do git).
// Uso: npm run build && node scripts/screenshots.ts <etapa>
// Página inteira sai sempre com movimento reduzido: a captura não rola a tela, então o que depende de
// rolagem ficaria no estado inicial. O movimento é conferido em capturas de tela rolada.
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { preview } from 'astro';
import { chromium, type Page } from '@playwright/test';

interface Captura {
  nome: string;
  rota: string;
  largura: number;
  altura: number;
  paginaInteira?: boolean;
  movimento?: boolean;
  /** Público já salvo no localStorage antes de a página carregar. */
  publico?: 'empresa' | 'voce';
  antes?: (pagina: Page) => Promise<void>;
}

const rolarAte = (seletor: string, deslocamento = 0) => async (pagina: Page) => {
  await pagina.evaluate(
    ([sel, extra]) => {
      const alvo = document.querySelector(sel as string);
      if (alvo) window.scrollTo({ top: alvo.getBoundingClientRect().top + window.scrollY + (extra as number), behavior: 'instant' });
    },
    [seletor, deslocamento],
  );
};

// Rola até o bloco e espera a imagem dele decodificar: fora da primeira tela, ela só carrega perto da vista.
const rolarAteImagem = (seletor: string, deslocamento = 0) => async (pagina: Page) => {
  await rolarAte(seletor, deslocamento)(pagina);
  await pagina.locator(`${seletor} img`).first().evaluate((imagem) => (imagem as HTMLImageElement).decode());
};

const opcao = (pagina: Page, formulario: string, texto: string) =>
  pagina.locator(`[data-formulario="${formulario}"] label.opcao`, { hasText: texto }).first().click();

const preencherNr1 = async (p: Page) => {
  await p.locator('.cabecalho__cta').click();
  await p.fill('#campo-nr1-empresa', 'Metalúrgica Exemplo');
  await opcao(p, 'nr1', '51 a 200');
  await opcao(p, 'nr1', 'Até 3 meses');
  await opcao(p, 'nr1', 'Online ao vivo');
  await opcao(p, 'nr1', 'Em construção');
  await p.locator('[data-continuar]').click();
  await p.fill('#campo-final-nome', 'Maria');
};

// Abre o pedido pelo hero e responde que é para a empresa: o drawer para no passo do serviço.
const abrirServicoComoEmpresa = async (p: Page) => {
  await p.locator('.hero__cta').click();
  await p.locator('.metade--esquerda').click();
};

const roteiros: Record<string, Captura[]> = {
  'etapa-1': [
    { nome: 'cabecalho-390', rota: '/', largura: 390, altura: 844 },
    { nome: 'cabecalho-1280', rota: '/', largura: 1280, altura: 800 },
    { nome: 'menu-aberto-390', rota: '/', largura: 390, altura: 844, antes: (p) => p.getByRole('button', { name: 'Menu', exact: true }).click() },
    { nome: 'painel-empresas-1280', rota: '/', largura: 1280, altura: 800, antes: (p) => p.getByRole('button', { name: 'Empresas' }).click() },
  ],
  'etapa-2': [
    { nome: 'home-390', rota: '/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'home-1280', rota: '/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'hero-390', rota: '/', largura: 390, altura: 844, movimento: true },
    { nome: 'hero-1280', rota: '/', largura: 1280, altura: 800, movimento: true },
    { nome: 'hero-rolado-390', rota: '/', largura: 390, altura: 844, movimento: true, antes: (p) => p.evaluate(() => window.scrollTo({ top: 420, behavior: 'instant' })) },
    {
      nome: 'publico-voce-390',
      rota: '/',
      largura: 390,
      altura: 844,
      movimento: true,
      antes: async (p) => {
        await p.locator('.duas-metades__metade--voce').click();
        await p.waitForTimeout(600);
        await rolarAte('#servicos', -60)(p);
      },
    },
    {
      nome: 'publico-voce-1280',
      rota: '/',
      largura: 1280,
      altura: 800,
      movimento: true,
      antes: async (p) => {
        await p.locator('.duas-metades__metade--voce').click();
        await p.waitForTimeout(600);
        await rolarAte('#servicos', -80)(p);
      },
    },
    { nome: 'nr1-390', rota: '/', largura: 390, altura: 844, movimento: true, antes: rolarAte('#nr-1') },
    { nome: 'como-etapa2-390', rota: '/', largura: 390, altura: 844, movimento: true, antes: rolarAte('.como__etapa[data-etapa="2"]', -300) },
    { nome: 'como-etapa3-1280', rota: '/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('.como__etapa[data-etapa="3"]', -200) },
    { nome: 'saudacoes-1280', rota: '/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('.saudacoes', -250) },
  ],
  'etapa-3': [
    { nome: 'flutuante-390', rota: '/', largura: 390, altura: 844 },
    { nome: 'rodape-fim-390', rota: '/', largura: 390, altura: 844, antes: async (p) => {
      await p.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
      await p.evaluate(() => window.scrollBy({ top: -40, behavior: 'instant' }));
    } },
    { nome: 'drawer-publico-390', rota: '/', largura: 390, altura: 844, antes: (p) => p.locator('.hero__cta').click() },
    { nome: 'drawer-servico-390', rota: '/', largura: 390, altura: 844, antes: abrirServicoComoEmpresa },
    { nome: 'drawer-servico-1280', rota: '/', largura: 1280, altura: 800, antes: abrirServicoComoEmpresa },
    { nome: 'drawer-nr1-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: (p) => p.locator('.cabecalho__cta').click() },
    { nome: 'drawer-nr1-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, publico: 'empresa', antes: (p) => p.locator('.cabecalho__cta').click() },
    { nome: 'drawer-erros-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: async (p) => {
      await p.locator('.cabecalho__cta').click();
      await p.locator('[data-continuar]').click();
    } },
    { nome: 'drawer-final-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: preencherNr1 },
    { nome: 'drawer-receber-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: async (p) => {
      await preencherNr1(p);
      await p.locator('[data-abre-receber]').click();
      await p.fill('#campo-final-contato', 'maria@exemplo');
      await p.locator('[data-enviar-pedido]').click();
    } },
    { nome: 'drawer-confirmado-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: async (p) => {
      await preencherNr1(p);
      await p.locator('[data-abre-receber]').click();
      await p.fill('#campo-final-contato', 'maria@exemplo.com.br');
      await p.locator('[data-enviar-pedido]').click();
    } },
    { nome: 'drawer-aberto-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: async (p) => {
      await preencherNr1(p);
      const aba = p.context().waitForEvent('page');
      await p.locator('[data-saida-whatsapp]').click();
      await (await aba).close();
    } },
    { nome: 'drawer-aulas-390', rota: '/', largura: 390, altura: 844, publico: 'voce', antes: (p) => p.locator('.hero__cta').click() },
    { nome: 'drawer-traducao-390', rota: '/traducao-simultanea/', largura: 390, altura: 844, publico: 'empresa', antes: async (p) => {
      await p.locator('.cabecalho__cta').click();
      await opcao(p, 'traducao', 'Presencial');
      await opcao(p, 'traducao', 'Outra');
      await p.locator('#campo-traducao-cidadeOutra').scrollIntoViewIfNeeded();
    } },
  ],
  'etapa-4': [
    { nome: 'nr1-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'nr1-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'nr1-hero-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, movimento: true },
    { nome: 'nr1-hero-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, movimento: true },
    { nome: 'nr1-hero-rolado-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, movimento: true, antes: (p) => p.evaluate(() => window.scrollTo({ top: 420, behavior: 'instant' })) },
    { nome: 'nr1-por-que-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, movimento: true, antes: rolarAte('#por-que-agora') },
    { nome: 'nr1-por-que-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#por-que-agora') },
    { nome: 'nr1-recebe-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#o-que-recebe') },
    { nome: 'nr1-modulos-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, movimento: true, antes: rolarAte('#modulos') },
    { nome: 'nr1-modulos-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#modulos') },
    { nome: 'nr1-formato-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, movimento: true, antes: rolarAte('#formato') },
    { nome: 'nr1-abordagem-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#abordagem') },
    { nome: 'nr1-drawer-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: (p) => p.locator('#formato [data-abre-contato]').click() },
  ],
  'etapa-5': [
    { nome: 'idiomas-390', rota: '/curso-de-idiomas/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'idiomas-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'idiomas-hero-390', rota: '/curso-de-idiomas/', largura: 390, altura: 844, movimento: true },
    { nome: 'idiomas-hero-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, movimento: true },
    { nome: 'idiomas-familias-390', rota: '/curso-de-idiomas/', largura: 390, altura: 844, movimento: true, antes: rolarAte('#idiomas') },
    { nome: 'idiomas-familias-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#idiomas') },
    { nome: 'idiomas-alvo-1280', rota: '/curso-de-idiomas/#japones', largura: 1280, altura: 800, movimento: true },
    { nome: 'idiomas-niveis-390', rota: '/curso-de-idiomas/', largura: 390, altura: 844, movimento: true, antes: rolarAte('#niveis') },
    { nome: 'idiomas-niveis-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#niveis') },
    { nome: 'idiomas-aulas-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#formatos') },
    { nome: 'idiomas-provas-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#provas') },
    { nome: 'idiomas-equipe-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#empresas') },
    { nome: 'idiomas-comeca-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#como-comeca') },
    { nome: 'idiomas-drawer-390', rota: '/curso-de-idiomas/', largura: 390, altura: 844, publico: 'voce', antes: (p) => p.locator('#japones button').click() },
  ],
  'etapa-6': [
    { nome: 'traducao-390', rota: '/traducao-simultanea/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'traducao-1280', rota: '/traducao-simultanea/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'traducao-hero-1280', rota: '/traducao-simultanea/', largura: 1280, altura: 800, movimento: true },
    { nome: 'lms-390', rota: '/lms/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'lms-1280', rota: '/lms/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'quem-somos-390', rota: '/quem-somos/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'quem-somos-1280', rota: '/quem-somos/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'quem-somos-hero-1280', rota: '/quem-somos/', largura: 1280, altura: 800, movimento: true },
    { nome: 'traducao-drawer-390', rota: '/traducao-simultanea/', largura: 390, altura: 844, publico: 'empresa', antes: (p) => p.locator('#formatos [data-abre-contato]').click() },
  ],
  'ajustes-cliente': [
    { nome: 'home-390', rota: '/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'home-1280', rota: '/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'servicos-390', rota: '/', largura: 390, altura: 844, movimento: true, antes: rolarAte('#servicos', -60) },
    { nome: 'servicos-1280', rota: '/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#servicos', -80) },
    { nome: 'menu-aberto-390', rota: '/', largura: 390, altura: 844, antes: (p) => p.getByRole('button', { name: 'Menu', exact: true }).click() },
    { nome: 'painel-empresas-1280', rota: '/', largura: 1280, altura: 800, antes: (p) => p.getByRole('button', { name: 'Empresas' }).click() },
    { nome: 'drawer-servico-390', rota: '/', largura: 390, altura: 844, antes: abrirServicoComoEmpresa },
    { nome: 'hero-390', rota: '/', largura: 390, altura: 844, movimento: true },
    { nome: 'hero-rolado-390', rota: '/', largura: 390, altura: 844, movimento: true, antes: (p) => p.evaluate(() => window.scrollTo({ top: 200, behavior: 'instant' })) },
    { nome: 'hero-1280', rota: '/', largura: 1280, altura: 800, movimento: true },
    { nome: 'hero-rolado-1280', rota: '/', largura: 1280, altura: 800, movimento: true, antes: (p) => p.evaluate(() => window.scrollTo({ top: 250, behavior: 'instant' })) },
    { nome: 'hero-parado-1280', rota: '/', largura: 1280, altura: 800 },
    { nome: 'nr1-hero-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, movimento: true },
    { nome: 'idiomas-hero-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, movimento: true },
    { nome: 'cta-final-390', rota: '/', largura: 390, altura: 844, movimento: true, antes: rolarAteImagem('#contato', -80) },
    { nome: 'cta-final-1280', rota: '/', largura: 1280, altura: 800, movimento: true, antes: rolarAteImagem('#contato', -120) },
  ],
};

const etapa = process.argv[2] ?? 'etapa-1';
const capturas = roteiros[etapa];
if (!capturas) throw new Error(`Roteiro desconhecido: ${etapa}. Opções: ${Object.keys(roteiros).join(', ')}`);

const saida = new URL(`../relatorios/${etapa}/`, import.meta.url);
await mkdir(saida, { recursive: true });

const servidor = await preview({ root: fileURLToPath(new URL('../', import.meta.url)), logLevel: 'warn' });
const base = `http://localhost:${servidor.port}`;
const navegador = await chromium.launch({ channel: 'chrome' });

try {
  for (const c of capturas) {
    const movel = c.largura < 768;
    const contexto = await navegador.newContext({
      viewport: { width: c.largura, height: c.altura },
      // Página inteira em 1x: acima de 16.384 px de altura o Chrome repete o topo na imagem.
      deviceScaleFactor: movel && !c.paginaInteira ? 2 : 1,
      isMobile: movel,
      hasTouch: movel,
      reducedMotion: c.movimento ? 'no-preference' : 'reduce',
    });
    // O WhatsApp de verdade não abre durante as capturas.
    await contexto.route('https://wa.me/**', (rota) => rota.fulfill({ contentType: 'text/plain', body: 'wa.me interceptado' }));
    if (c.publico) await contexto.addInitScript((p) => localStorage.setItem('9vee:publico', p), c.publico);
    const pagina = await contexto.newPage();
    await pagina.goto(base + c.rota, { waitUntil: 'networkidle' });
    await pagina.evaluate(() => document.fonts.ready);
    if (c.antes) {
      await c.antes(pagina);
      await pagina.waitForTimeout(400);
    }
    await pagina.screenshot({
      path: fileURLToPath(new URL(`${c.nome}.png`, saida)),
      fullPage: c.paginaInteira ?? false,
    });
    await contexto.close();
    console.log(`ok ${c.nome}`);
  }
} finally {
  await navegador.close();
  await servidor.stop();
}
