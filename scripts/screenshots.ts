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

const roteiros: Record<string, Captura[]> = {
  'etapa-1': [
    { nome: 'especime-390', rota: '/especime/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'especime-1280', rota: '/especime/', largura: 1280, altura: 800, paginaInteira: true },
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
