// Build de conferência do SEO, sem noindex, em dist-indexavel/. É o que o Lighthouse mede para o SEO 100;
// o preview publicado usa o build padrão, com noindex. Pela API, para a variável valer também no Windows.
import { fileURLToPath } from 'node:url';
import { build } from 'astro';

process.env.INDEXAVEL = 'true';
await build({
  root: fileURLToPath(new URL('../', import.meta.url)),
  outDir: './dist-indexavel',
  logLevel: 'warn',
});
