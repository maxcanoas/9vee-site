// Os builds do site: `preview` (o que o Maxwell publica no Cloudflare, em dist/) e `producao` (o site
// definitivo, em dist-producao/). Pela API do Astro, para o MODO valer também no Windows. Cada modo lê o
// próprio .env.<modo>; o .env e o .env.local valeriam para todos os modos, então o build recusa os dois.
// Uso: node scripts/build.ts preview   ou   node scripts/build.ts producao
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { build } from 'astro';

const modo = process.argv[2];
if (modo !== 'preview' && modo !== 'producao') {
  console.error('Uso: node scripts/build.ts preview   ou   node scripts/build.ts producao');
  process.exit(1);
}

const raiz = new URL('../', import.meta.url);
const vazaria = ['.env', '.env.local'].filter((nome) => existsSync(new URL(nome, raiz)));
if (vazaria.length > 0) {
  console.error(
    `${vazaria.join(' e ')} vale para todos os modos, e a chave de um ambiente iria para o outro. ` +
      'Mova o conteúdo para .env.development, .env.preview ou .env.producao (veja o .env.example).',
  );
  process.exit(1);
}

process.env.MODO = modo;
await build({ root: fileURLToPath(raiz), mode: modo, logLevel: 'warn' });
