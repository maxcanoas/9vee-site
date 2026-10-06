// A cópia do blog do site atual (ticket 14): lê a página pública de cada post no Wix, com pausa entre os pedidos, e
// grava em docs/blog-arquivo/posts/ um Markdown por post, e em docs/blog-arquivo/indice.csv a lista deles. Só leitura,
// sem o JavaScript do Wix, que é o que conta a visita. A lista de posts é a de docs/urls-site-atual.csv mais a do
// sitemap do blog no ar, que traz os posts novos. O post que já está na pasta não é baixado de novo; --de-novo baixa
// todos. Rodar de novo perto do lançamento, porque o blog ainda recebe posts.
// Uso: node scripts/arquivo-do-blog.ts [--de-novo]
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { setTimeout as esperar } from 'node:timers/promises';
import { escreverCsv, lerCsv } from './csv.ts';
import { markdownDoPost, nomeDoArquivo, postDoHtml } from './blog.ts';

const raiz = new URL('../', import.meta.url);
const pasta = fileURLToPath(new URL('docs/blog-arquivo/', raiz));
const pastaDosPosts = fileURLToPath(new URL('docs/blog-arquivo/posts/', raiz));
const deNovo = process.argv.includes('--de-novo');

// O Wix recusa o pedido de agente curto demais (docs/wix-inventario.md): vai o de um navegador comum.
const AGENTE =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36';
const PAUSA = 2_000;
const ESPERAS_DEPOIS_DA_FALHA = [10_000, 30_000];

// Também tenta de novo quando a leitura falha: às vezes o cache do Wix guarda a página do post sem o texto dele. A
// nova tentativa leva um parâmetro no endereço, que passa por fora desse cache.
async function baixar<T = string>(url: string, ler: (html: string) => T = (html) => html as T): Promise<T> {
  for (let tentativa = 0; ; tentativa++) {
    try {
      const endereco = tentativa === 0 ? url : `${url}?copia=${Date.now()}`;
      const resposta = await fetch(endereco, { headers: { 'User-Agent': AGENTE }, signal: AbortSignal.timeout(60_000) });
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      return ler(await resposta.text());
    } catch (erro) {
      const espera = ESPERAS_DEPOIS_DA_FALHA[tentativa];
      if (espera === undefined) throw erro;
      console.warn(`  ${url}: ${(erro as Error).message}; nova tentativa em ${espera / 1000} s`);
      await esperar(espera);
    }
  }
}

const doCsv = lerCsv(readFileSync(new URL('docs/urls-site-atual.csv', raiz), 'utf8'))
  .filter((linha) => linha.tipo === 'post-do-blog')
  .map((linha) => linha.url);

let doSitemap: string[] = [];
try {
  const xml = await baixar('https://www.9vee.com.br/blog-posts-sitemap.xml');
  doSitemap = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, endereco]) => endereco.trim());
} catch (erro) {
  console.warn(`O sitemap do blog não respondeu (${(erro as Error).message}): sigo só com a lista do CSV.`);
}
const novos = doSitemap.filter((url) => !doCsv.includes(url));
const posts = [...doCsv, ...novos];

const nomes = new Map<string, string>();
for (const url of posts) {
  const nome = nomeDoArquivo(url);
  if (nomes.has(nome)) throw new Error(`${url} e ${nomes.get(nome)} dariam o mesmo arquivo, ${nome}`);
  nomes.set(nome, url);
}

mkdirSync(pastaDosPosts, { recursive: true });
const falhas: string[] = [];
let baixados = 0;
for (const [i, url] of posts.entries()) {
  const arquivo = `${pastaDosPosts}${nomeDoArquivo(url)}`;
  if (!deNovo && existsSync(arquivo)) continue;
  if (baixados > 0) await esperar(PAUSA);
  baixados++;
  try {
    writeFileSync(arquivo, markdownDoPost(await baixar(url, (html) => postDoHtml(html, url))));
    console.log(`[${i + 1}/${posts.length}] ${nomeDoArquivo(url)}`);
  } catch (erro) {
    falhas.push(`${url}: ${(erro as Error).message}`);
    console.error(`[${i + 1}/${posts.length}] FALHOU ${url}: ${(erro as Error).message}`);
  }
}

// O índice sai dos arquivos da pasta, na ordem da lista: também traz os posts que vieram numa rodada anterior.
const valor = (md: string, campo: string) => {
  const linha = new RegExp(`^${campo}: (.*)$`, 'm').exec(md)?.[1];
  return linha ? (JSON.parse(linha) as string) : '';
};
const naPasta = new Set(readdirSync(pastaDosPosts));
const indice = posts
  .filter((url) => naPasta.has(nomeDoArquivo(url)))
  .map((url) => {
    const md = readFileSync(`${pastaDosPosts}${nomeDoArquivo(url)}`, 'utf8');
    return {
      arquivo: `posts/${nomeDoArquivo(url)}`,
      url,
      titulo: valor(md, 'titulo'),
      publicado: valor(md, 'publicado'),
      atualizado: valor(md, 'atualizado'),
      imagens: String(md.match(/^ {2}- "/gm)?.length ?? 0),
    };
  });
writeFileSync(`${pasta}indice.csv`, escreverCsv(['arquivo', 'url', 'titulo', 'publicado', 'atualizado', 'imagens'], indice));

console.log(`\n${indice.length} de ${posts.length} posts na pasta; ${baixados} pedidos nesta rodada.`);
if (novos.length > 0) console.log(`Posts no sitemap do blog que não estão em docs/urls-site-atual.csv:\n${novos.join('\n')}`);
if (falhas.length > 0) {
  console.error(`\n${falhas.length} posts falharam (rode de novo, que ele só pede os que faltam):\n${falhas.join('\n')}`);
  process.exit(1);
}
