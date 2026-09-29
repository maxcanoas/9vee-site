// @ts-check
import { writeFile } from 'node:fs/promises';
import { defineConfig, envField, fontProviders } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

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

export default defineConfig({
  integrations: [cabecalhoNoindex],
  // Canonical, Open Graph e sitemap sempre no domínio definitivo, em todos os modos, nunca no do preview.
  site: 'https://www.9vee.com.br',
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
