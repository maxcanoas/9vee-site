// Lighthouse mobile de páginas que estão no ar, com a mediana de 3 rodadas: o site do Wix no retrato do antes,
// e o site novo no depois, com os endereços novos. Imprime a tabela em Markdown, uma linha por página.
// Cada rodada conta como uma visita no GA4 do site medido: anote o dia no documento que usar a tabela.
// Uso: node scripts/lighthouse-no-ar.ts https://www.9vee.com.br/ https://www.9vee.com.br/lms ...
import { CABECALHO_DA_TABELA, RODADAS, linhaDaTabela, medirPagina } from './medida-lighthouse.ts';

const enderecos = process.argv.slice(2);
if (enderecos.length === 0 || !enderecos.every((endereco) => /^https?:\/\//.test(endereco))) {
  console.error('Uso: node scripts/lighthouse-no-ar.ts <endereço completo> [outros endereços]');
  process.exit(1);
}

const quando = new Date().toLocaleString('pt-BR');
console.log(`Medido em ${quando}, mediana de ${RODADAS} rodadas por página.`);
console.log(['', ...CABECALHO_DA_TABELA].join('\n'));
const versoes = new Set<string>();
// A linha sai assim que a página termina: se uma página falhar, as de antes já estão impressas.
for (const endereco of enderecos) {
  const medida = await medirPagina(endereco);
  versoes.add(medida.versoes);
  console.log(linhaDaTabela(new URL(endereco).pathname, medida));
  console.error(`ok ${endereco}`);
}
console.log(`\nMedido com ${[...versoes].join('; ')}.`);
