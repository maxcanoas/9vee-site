// Capturas para revisão de cada etapa, em relatorios/<pasta>/ (fora do git).
// Uso: npm run build && node scripts/screenshots.ts [pasta]
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { preview } from 'astro';
import { chromium, type Page } from '@playwright/test';

const pasta = process.argv[2] ?? 'etapa-1';
const saida = new URL(`../relatorios/${pasta}/`, import.meta.url);
await mkdir(saida, { recursive: true });

interface Captura {
  nome: string;
  rota: string;
  largura: number;
  altura: number;
  paginaInteira?: boolean;
  antes?: (pagina: Page) => Promise<void>;
}

const capturas: Captura[] = [
  { nome: 'especime-390', rota: '/especime/', largura: 390, altura: 844, paginaInteira: true },
  { nome: 'especime-1280', rota: '/especime/', largura: 1280, altura: 800, paginaInteira: true },
  { nome: 'cabecalho-390', rota: '/', largura: 390, altura: 844 },
  { nome: 'cabecalho-1280', rota: '/', largura: 1280, altura: 800 },
  {
    nome: 'menu-aberto-390',
    rota: '/',
    largura: 390,
    altura: 844,
    antes: (p) => p.getByRole('button', { name: 'Menu', exact: true }).click(),
  },
  {
    nome: 'painel-empresas-1280',
    rota: '/',
    largura: 1280,
    altura: 800,
    antes: (p) => p.getByRole('button', { name: 'Empresas' }).click(),
  },
];

const servidor = await preview({ root: fileURLToPath(new URL('../', import.meta.url)), logLevel: 'warn' });
const base = `http://localhost:${servidor.port}`;
const navegador = await chromium.launch({ channel: 'chrome' });

try {
  for (const c of capturas) {
    const movel = c.largura < 768;
    const contexto = await navegador.newContext({
      viewport: { width: c.largura, height: c.altura },
      deviceScaleFactor: movel ? 2 : 1,
      isMobile: movel,
      hasTouch: movel,
      reducedMotion: 'reduce',
    });
    const pagina = await contexto.newPage();
    await pagina.goto(base + c.rota, { waitUntil: 'networkidle' });
    await pagina.evaluate(() => document.fonts.ready);
    if (c.antes) {
      await c.antes(pagina);
      await pagina.waitForTimeout(250);
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
