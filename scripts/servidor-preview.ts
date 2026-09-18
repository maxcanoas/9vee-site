// Servidor do dist/ para os testes de navegador. O `astro preview` do Astro 7 vai para segundo plano
// quando roda sem terminal interativo e o Playwright perde o controle dele; pela API, o processo é nosso.
import { fileURLToPath } from 'node:url';
import { preview } from 'astro';

const porta = Number(process.env.PORTA ?? 4400);
const servidor = await preview({
  root: fileURLToPath(new URL('../', import.meta.url)),
  server: { port: porta },
  logLevel: 'warn',
});
console.log(`preview em http://localhost:${servidor.port}`);

const encerrar = async () => {
  await servidor.stop();
  process.exit(0);
};
process.on('SIGINT', encerrar);
process.on('SIGTERM', encerrar);
