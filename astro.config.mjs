// @ts-check
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig, envField, fontProviders } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { tirarImagensOrfas } from './scripts/imagens-orfas.ts';
import { escreverSitemap } from './scripts/sitemap.ts';
import { gerarPrevias } from './scripts/compartilhamento.ts';
import { lerCsv } from './scripts/csv.ts';
import { montarHtaccess } from './scripts/htaccess.ts';

// Canonical, Open Graph e sitemap sempre no domínio definitivo, em todos os modos, nunca no do preview.
const DOMINIO = 'https://www.9vee.com.br';

// O modo vem do comando: `astro dev` é o local, e o scripts/build.ts marca o preview e a produção.
const MODOS = /** @type {const} */ (['local', 'preview', 'producao']);
const modo = process.env.MODO ?? 'local';
if (!MODOS.some((valido) => valido === modo)) throw new Error(`MODO desconhecido: "${modo}". Use local, preview ou producao.`);
// O `--mode` sozinho leria o .env de um modo e construiria outro: a chave da produção poderia ir para o preview.
if (!process.env.MODO && process.argv.some((argumento) => argumento.startsWith('--mode'))) {
  throw new Error('Use npm run build:preview ou npm run build:producao, que escolhem o modo e o .env juntos.');
}

/**
 * Cabeçalho X-Robots-Tag para a Cloudflare. Só a produção sai sem ele.
 * @type {import('astro').AstroIntegration}
 */
const cabecalhoNoindex = {
  name: 'cabecalho-noindex',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      if (modo === 'producao') return;
      await writeFile(new URL('_headers', dir), '/*\n  X-Robots-Tag: noindex, nofollow\n');
    },
  },
};

/**
 * Tira de _astro/ as imagens que nenhum arquivo do build cita, como as fotos das páginas não publicadas na produção.
 * @type {import('astro').AstroIntegration}
 */
const semImagensOrfas = {
  name: 'sem-imagens-orfas',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      const tiradas = tirarImagensOrfas(fileURLToPath(dir));
      if (tiradas.length > 0) logger.info(`${tiradas.length} imagens sem página saíram do build: ${tiradas.join(', ')}`);
    },
  },
};

/**
 * O sitemap.xml, só na produção: o robots.txt do preview não aponta sitemap, e o preview não vai para o Google.
 * @type {import('astro').AstroIntegration}
 */
const sitemapDaProducao = {
  name: 'sitemap-da-producao',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      if (modo !== 'producao') return;
      logger.info(`sitemap.xml com ${escreverSitemap(fileURLToPath(dir), DOMINIO)} páginas`);
    },
  },
};

/**
 * O .htaccess da HostGator, só na produção (ticket 19): o mapa de redirecionamentos aprovado (docs/redirects.csv),
 * o domínio canônico, a barra no fim, a compressão e o cache. A trava confere que cada 301 leva a uma página do build.
 * @type {import('astro').AstroIntegration}
 */
const htaccessDaProducao = {
  name: 'htaccess-da-producao',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      if (modo !== 'producao') return;
      const mapa = lerCsv(await readFile(new URL('./docs/redirects.csv', import.meta.url), 'utf8'));
      await writeFile(new URL('.htaccess', dir), montarHtaccess(mapa.map(({ origem, destino, tipo }) => ({ origem, destino, tipo }))));
    },
  },
};

/**
 * A imagem de prévia de cada página, com o título dela, em todos os modos (ticket 18).
 * @type {import('astro').AstroIntegration}
 */
const previasDasPaginas = {
  name: 'previas-das-paginas',
  hooks: {
    'astro:build:done': async ({ dir, logger }) => {
      logger.info(`${await gerarPrevias(fileURLToPath(dir))} imagens de prévia`);
    },
  },
};

export default defineConfig({
  integrations: [cabecalhoNoindex, semImagensOrfas, sitemapDaProducao, htaccessDaProducao, previasDasPaginas],
  site: DOMINIO,
  // A produção sai numa pasta própria: o dist/ é o que o wrangler publica, e ele não pode receber um build indexável.
  outDir: modo === 'producao' ? './dist-producao' : './dist',
  trailingSlash: 'always',
  // O padrão do Astro 7 ('jsx') come o espaço entre elementos inline no meio do texto.
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
  markdown: {
    processor: satteri({
      features: {
        // Sem conversão de hífens: travessão é proibido no texto do site.
        smartPunctuation: { quotes: true, dashes: false, ellipses: true },
      },
    }),
  },
  env: {
    schema: {
      MODO: envField.enum({ values: [...MODOS], context: 'server', access: 'public', default: 'local' }),
      // A chave do serviço de formulário, do .env do modo. Vai para o HTML, com os dados do pedido: o envio sai do
      // navegador, e a chave só permite mandar para o e-mail dela. Sem ela, o pedido oferece o WhatsApp.
      FORMULARIO_CHAVE: envField.string({ context: 'server', access: 'public', default: '' }),
      // O ID do GA4, do .env do modo: a propriedade de teste no local e a da 9vee na produção. O preview sai sem GA4,
      // com ou sem ID (src/layouts/Base.astro). O ID vai para o HTML, no aviso de cookies, e só vale depois do aceite.
      GA4_ID: envField.string({ context: 'server', access: 'public', default: '' }),
    },
  },
  vite: {
    build: {
      // O Lightning CSS (padrão do Vite 8) funde animation-timeline no atalho
      // animation e quebra o parallax no build: parcel-bundler/lightningcss#1283.
      cssMinify: 'esbuild',
    },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Readex Pro',
      cssVariable: '--fonte-titulo',
      weights: [600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext', 'arabic'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Source Sans 3',
      cssVariable: '--fonte-texto',
      weights: [400, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['sans-serif'],
    },
  ],
});
