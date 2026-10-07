// O teste que abre o ticket 12: o serviço de formulário aceita um envio que sai do navegador, a partir do localhost e
// do endereço do preview? Abre cada endereço no Chrome e manda dali um envio de teste, com a chave do .env.preview.
// Cada envio aceito vira um e-mail na caixa da chave: são dois, e podem ser apagados.
// Uso: npm run build:preview && node scripts/teste-do-envio.ts
import { fileURLToPath } from 'node:url';
import { preview } from 'astro';
import { chromium } from '@playwright/test';
import { lerDoEnv } from './ler-env.ts';

const SERVICO = 'https://api.web3forms.com/submit';
const PREVIEW_NO_AR = 'https://9vee-preview.9vee-site.workers.dev/';

const raiz = new URL('../', import.meta.url);
const chave = lerDoEnv('.env.preview', 'FORMULARIO_CHAVE');
if (!chave) {
  console.error('Falta a FORMULARIO_CHAVE no .env.preview (veja o .env.example). Nada foi enviado.');
  process.exit(1);
}

process.env.MODO = 'preview';
const servidor = await preview({ root: fileURLToPath(raiz), logLevel: 'warn' });
// Com a janela aberta: o serviço trata o Chrome sem janela como uso pelo servidor, que o plano grátis não aceita, e
// responde 403 sem os cabeçalhos de CORS. No navegador isso aparece como "Failed to fetch", e não como recusa.
const navegador = await chromium.launch({ channel: 'chrome', headless: false });
let recusas = 0;

try {
  for (const endereco of [`http://localhost:${servidor.port}/`, PREVIEW_NO_AR]) {
    const pagina = await navegador.newPage();
    await pagina.goto(endereco, { waitUntil: 'domcontentloaded' });
    // O envio sai da própria página, como sairá do pedido: o serviço vê a origem de verdade.
    const resposta = await pagina.evaluate(
      async ([servico, acesso]) => {
        try {
          const retorno = await fetch(servico, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              access_key: acesso,
              subject: `[Teste 9vee] envio a partir de ${location.origin}`,
              from_name: 'Site 9vee (teste)',
              Origem: location.origin,
              Mensagem: 'Envio de teste do ticket 12, para saber se o serviço aceita este endereço. Pode apagar.',
            }),
          });
          return { status: retorno.status, corpo: await retorno.text() };
        } catch (erro) {
          return { status: 0, corpo: String(erro) };
        }
      },
      [SERVICO, chave],
    );
    await pagina.close();
    const aceito = resposta.status === 200 && /"success"\s*:\s*true/.test(resposta.corpo);
    if (!aceito) recusas += 1;
    // A resposta repete os dados do envio, e com eles a chave: sai da tela.
    console.log(`${aceito ? 'aceito ' : 'RECUSADO'} ${endereco} (HTTP ${resposta.status}) ${resposta.corpo.replaceAll(chave, '<chave>').slice(0, 300)}`);
  }
} finally {
  await navegador.close();
  await servidor.stop();
}

process.exit(recusas > 0 ? 1 : 0);
