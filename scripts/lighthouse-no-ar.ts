// Lighthouse mobile de páginas que estão no ar, com a mediana de 3 rodadas: o site do Wix no retrato do antes,
// e o site novo no depois, com os endereços novos. Imprime a tabela em Markdown, uma linha por página.
// Cada rodada conta como uma visita no GA4 do site medido: anote o dia no documento que usar a tabela.
// Uso: node scripts/lighthouse-no-ar.ts https://www.9vee.com.br/ https://www.9vee.com.br/lms ...
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as chromeLauncher from 'chrome-launcher';
import { CABECALHO_DA_TABELA, RODADAS, linhaDaTabela, medirPagina } from './medida-lighthouse.ts';

// Cada página mede num processo próprio, que chama este mesmo script com --uma. O Lighthouse não devolve a
// memória entre as rodadas, e as páginas pesadas do Wix estouraram o limite do Node na quinta página.
const UMA = '--uma';

async function linhaDaPagina(endereco: string): Promise<string> {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });
  try {
    return linhaDaTabela(new URL(endereco).pathname, await medirPagina(endereco, chrome.port));
  } finally {
    await chrome.kill();
  }
}

const argumentos = process.argv.slice(2);
if (argumentos[0] === UMA) {
  console.log(await linhaDaPagina(argumentos[1]));
} else {
  if (argumentos.length === 0 || !argumentos.every((endereco) => /^https?:\/\//.test(endereco))) {
    console.error('Uso: node scripts/lighthouse-no-ar.ts <endereço completo> [outros endereços]');
    process.exit(1);
  }
  const quando = new Date().toLocaleString('pt-BR');
  console.log(`Medido em ${quando}, mediana de ${RODADAS} rodadas por página, com o Chrome instalado.`);
  console.log(['', ...CABECALHO_DA_TABELA].join('\n'));
  // A linha sai assim que a página termina: se uma página falhar, as de antes já estão impressas.
  for (const endereco of argumentos) {
    const argumentosDoFilho = [...process.execArgv, fileURLToPath(import.meta.url), UMA, endereco];
    const linha = execFileSync(process.execPath, argumentosDoFilho, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'inherit'],
    });
    console.log(linha.trim());
    console.error(`ok ${endereco}`);
  }
}
