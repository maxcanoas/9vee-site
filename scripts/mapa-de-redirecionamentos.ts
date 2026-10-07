// O mapa de redirecionamentos (ticket 14): docs/redirects.csv, com o destino de cada URL do site atual pelas regras
// de scripts/redirecionamentos.ts, e docs/remocoes-search-console.txt, com as que ficam 410. A coluna "excecao" é
// escrita à mão (um caminho do site novo, ou 410) e passa de uma rodada para a outra. As páginas do site novo vêm do
// build de produção, então só a página publicada vira destino.
// Uso: node scripts/build.ts producao && node scripts/mapa-de-redirecionamentos.ts
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { escreverCsv, lerCsv } from './csv.ts';
import { listarArquivos, rotaDoArquivo } from './paginas-do-build.ts';
import { cidadesPublicadas, comExcecao, destinoDe, problemasDoMapa, type SiteNovo } from './redirecionamentos.ts';

const raiz = new URL('../', import.meta.url);
const emDocs = (arquivo: string) => new URL(`docs/${arquivo}`, raiz);
const DOMINIO = 'https://www.9vee.com.br';

const build = fileURLToPath(new URL('dist-producao/', raiz));
if (!existsSync(build)) {
  console.error('Falta o build de produção: rode node scripts/build.ts producao antes.');
  process.exit(1);
}
const paginas = new Set(listarArquivos(build, '.html').map((arquivo) => rotaDoArquivo(build, arquivo)).filter((rota) => rota.endsWith('/')));
const site: SiteNovo = { paginas, cidades: cidadesPublicadas(paginas) };

const antigas = lerCsv(readFileSync(emDocs('urls-site-atual.csv'), 'utf8')).map(({ url, caminho, tipo, titulo, observacao }) => ({
  url,
  caminho,
  tipo,
  titulo,
  observacao,
}));
// Os posts que entraram no blog depois da lista de 29/09/2026 vêm da cópia do blog.
const indiceDoBlog = existsSync(emDocs('blog-arquivo/indice.csv'))
  ? lerCsv(readFileSync(emDocs('blog-arquivo/indice.csv'), 'utf8'))
  : [];
const conhecidas = new Set(antigas.map((linha) => linha.url));
const novas = indiceDoBlog
  .filter(({ url }) => !conhecidas.has(url))
  .map(({ url, titulo }) => ({ url, caminho: new URL(url).pathname, tipo: 'post-do-blog', titulo, observacao: '' }));

const excecoes = existsSync(emDocs('redirects.csv'))
  ? new Map(lerCsv(readFileSync(emDocs('redirects.csv'), 'utf8')).map((linha) => [linha.origem, linha.excecao ?? '']))
  : new Map<string, string>();

const linhas = [...antigas, ...novas].map((antiga) => {
  const regra = destinoDe(antiga, site);
  const excecao = excecoes.get(antiga.caminho) ?? '';
  return {
    origem: antiga.caminho,
    tipo_antigo: antiga.tipo,
    titulo_antigo: antiga.titulo,
    regra_destino: regra.destino,
    regra_tipo: regra.tipo,
    motivo: regra.motivo,
    excecao,
    ...comExcecao(regra, excecao),
  };
});

const problemas = problemasDoMapa(linhas, site);
if (problemas.length > 0) {
  console.error(`O mapa tem ${problemas.length} problemas:\n${problemas.join('\n')}`);
  process.exit(1);
}

const colunas = ['origem', 'tipo_antigo', 'titulo_antigo', 'regra_destino', 'regra_tipo', 'motivo', 'excecao', 'destino', 'tipo'];
writeFileSync(emDocs('redirects.csv'), escreverCsv(colunas, linhas));
const removidas = linhas.filter((linha) => linha.tipo === '410').map((linha) => `${DOMINIO}${linha.origem}`);
writeFileSync(emDocs('remocoes-search-console.txt'), `${removidas.join('\n')}\n`);

const contagem = (chave: (linha: (typeof linhas)[number]) => string) =>
  Object.entries(Object.groupBy(linhas, chave)).map(([valor, grupo]) => `  ${grupo!.length} ${valor}`).join('\n');
console.log(`${linhas.length} URLs (${novas.length} posts novos da cópia do blog), ${excecoes.size > 0 ? 'com' : 'sem'} mapa anterior.`);
console.log(`Por tipo:\n${contagem((linha) => linha.tipo)}`);
console.log(`Por destino:\n${contagem((linha) => linha.destino || '(410)')}`);
