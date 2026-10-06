// npm run check:producao: roda a trava sobre o build de produção e falha se sobrar algo que não pode ir ao ar.
// O build:producao chama este script no fim, então o build de produção só "passa" com a trava limpa.
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseEnv } from 'node:util';
import { REGRAS, pendenciasNoConteudo, verificarBuild, type Regra } from './trava-producao.ts';

const pasta = fileURLToPath(new URL('../dist-producao/', import.meta.url));
if (!existsSync(pasta)) {
  console.error('check:producao: não existe dist-producao/. Rode antes o npm run build:producao.');
  process.exit(1);
}

// A chave de teste do pedido, que manda para o e-mail de teste: a produção não pode sair com ela.
const envDoPreview = new URL('../.env.preview', import.meta.url);
const chaveDeTeste = existsSync(envDoPreview) ? parseEnv(readFileSync(envDoPreview, 'utf8')).FORMULARIO_CHAVE : undefined;
// O ID do GA4 da propriedade de teste, a do local: a produção não pode medir com ele.
const envDoLocal = new URL('../.env.development', import.meta.url);
const ga4DeTeste = existsSync(envDoLocal) ? parseEnv(readFileSync(envDoLocal, 'utf8')).GA4_ID || undefined : undefined;

const achados = [
  ...pendenciasNoConteudo(fileURLToPath(new URL('../content/', import.meta.url))),
  ...verificarBuild(pasta, { chaveDeTeste, ga4DeTeste }),
];
if (achados.length === 0) {
  console.log('check:producao: nada a barrar. O build de produção pode ir ao ar.');
} else {
  console.error(`check:producao: ${achados.length} achados. O build de produção não pode ir ao ar assim.\n`);
  for (const [regra, { nome }] of Object.entries(REGRAS) as [Regra, (typeof REGRAS)[Regra]][]) {
    const daRegra = achados.filter((achado) => achado.regra === regra);
    if (daRegra.length === 0) continue;
    console.error(`${nome} (${daRegra.length})`);
    for (const achado of daRegra) console.error(`  ${achado.onde}  ${achado.detalhe}`);
    console.error('');
  }
  process.exitCode = 1;
}
