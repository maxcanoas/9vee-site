// Serve um build já feito: `preview` (dist/, para os testes de navegador) ou `producao` (dist-producao/,
// o `npm run preview`, para conferir e medir o site definitivo). O `astro preview` do Astro 7 vai para segundo
// plano quando roda sem terminal interativo e o Playwright perde o controle dele; pela API, o processo é nosso.
// Uso: node scripts/servidor-preview.ts preview   ou   node scripts/servidor-preview.ts producao
import { fileURLToPath } from 'node:url';
import { preview } from 'astro';
import { modoDoComando } from './modo.ts';

const modo = modoDoComando(process.argv[2] ?? 'preview', 'servidor-preview.ts');
// O modo decide a pasta que o astro.config aponta.
process.env.MODO = modo;

const porta = Number(process.env.PORTA ?? (modo === 'producao' ? 4321 : 4400));
const servidor = await preview({
  root: fileURLToPath(new URL('../', import.meta.url)),
  server: { port: porta },
  logLevel: 'warn',
});
console.log(`${modo} em http://localhost:${servidor.port}`);

const encerrar = async () => {
  await servidor.stop();
  process.exit(0);
};
process.on('SIGINT', encerrar);
process.on('SIGTERM', encerrar);
