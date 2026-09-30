// Lighthouse mobile de páginas que estão no ar, com a mediana de 3 rodadas: o site do Wix no retrato do antes,
// e o site novo no depois, com os endereços novos. Imprime a tabela em Markdown, uma linha por página.
// No Wix, cada rodada conta como visita no GA4 e no Twipla: anote o dia no documento que usar a tabela. No site
// novo, não, porque o GA4 só carrega depois do aceite dos cookies, e o Lighthouse não aceita.
// Uso: node scripts/lighthouse-no-ar.ts https://www.9vee.com.br/ https://www.9vee.com.br/lms ...
import { RODADAS, medirTabela } from './medida-lighthouse.ts';

const enderecos = process.argv.slice(2);
if (enderecos.length === 0 || !enderecos.every((endereco) => /^https?:\/\//.test(endereco))) {
  console.error('Uso: node scripts/lighthouse-no-ar.ts <endereço completo> [outros endereços]');
  process.exit(1);
}

console.log(`Medido em ${new Date().toLocaleString('pt-BR')}, mediana de ${RODADAS} rodadas por página.\n`);
const paginas = enderecos.map((url) => ({ nome: new URL(url).pathname, url }));
await medirTabela(paginas, (linha) => console.log(linha));
