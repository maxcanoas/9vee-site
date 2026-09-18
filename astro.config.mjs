// @ts-check
import { writeFile } from 'node:fs/promises';
import { defineConfig, envField, fontProviders } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

const indexavel = process.env.INDEXAVEL === 'true';

/**
 * Cabeçalho X-Robots-Tag para a Cloudflare. Só o build com INDEXAVEL=true sai sem ele.
 * @type {import('astro').AstroIntegration}
 */
const cabecalhoNoindex = {
  name: 'cabecalho-noindex',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      if (indexavel) return;
      await writeFile(new URL('_headers', dir), '/*\n  X-Robots-Tag: noindex, nofollow\n');
    },
  },
};

export default defineConfig({
  integrations: [cabecalhoNoindex],
  // No deploy, SITE_URL recebe o endereço do preview (canonical e og:image absolutos).
  site: process.env.SITE_URL ?? 'http://localhost:4321',
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
      INDEXAVEL: envField.boolean({ context: 'server', access: 'public', default: false }),
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
