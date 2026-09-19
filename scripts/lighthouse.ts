// Lighthouse mobile nas 3 páginas completas, nos dois builds, com a mediana de 3 rodadas.
// O pacote não fica no package.json: instale antes com `npm install --no-save lighthouse`.
// Uso: npm run build && node scripts/build-indexavel.ts && node scripts/lighthouse.ts
import { createServer, type Server } from 'node:http';
import { readFile } from 'node:fs/promises';
import { mkdir, writeFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const RODADAS = 3;
const PAGINAS = [
  { nome: 'Home', rota: '/' },
  { nome: 'Treinamento de NR-1', rota: '/treinamento-nr-1/' },
  { nome: 'Cursos de Idiomas', rota: '/curso-de-idiomas/' },
];
const BUILDS = [
  { nome: 'padrão (com noindex)', pasta: 'dist', porta: 4500 },
  { nome: 'indexável', pasta: 'dist-indexavel', porta: 4501 },
];

const TIPOS: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

// Comprime o que a Cloudflare comprime. Sem isso a medida castiga 130 KB de HTML que a produção
// nunca manda, e o LCP sai quase um segundo pior do que o real.
const COMPRIME = new Set(['.html', '.css', '.js', '.json', '.svg', '.txt']);

function servir(pasta: string, porta: number): Promise<Server> {
  const raiz = fileURLToPath(new URL(`../${pasta}/`, import.meta.url));
  const servidor = createServer(async (req, res) => {
    const caminho = decodeURIComponent((req.url ?? '/').split('?')[0]);
    // Sem ".." no caminho: o servidor é local, mas não serve nada fora da pasta do build.
    const dentro = normalize(caminho).replaceAll('..', '');
    const alvo = join(raiz, dentro, caminho.endsWith('/') ? 'index.html' : '');
    try {
      const arquivo = await readFile(alvo);
      const tipo = TIPOS[extname(alvo)] ?? 'application/octet-stream';
      const aceita = String(req.headers['accept-encoding'] ?? '').includes('gzip');
      if (aceita && COMPRIME.has(extname(alvo))) {
        const comprimido = gzipSync(arquivo);
        res.writeHead(200, { 'content-type': tipo, 'content-encoding': 'gzip', 'content-length': comprimido.length });
        res.end(comprimido);
        return;
      }
      res.writeHead(200, { 'content-type': tipo });
      res.end(arquivo);
    } catch {
      res.writeHead(404).end('não encontrado');
    }
  });
  return new Promise((ok) => servidor.listen(porta, () => ok(servidor)));
}

const mediana = (valores: number[]) => [...valores].sort((a, b) => a - b)[Math.floor(valores.length / 2)];

interface Medida {
  performance: number;
  acessibilidade: number;
  praticas: number;
  seo: number;
  lcp: number;
  cls: number;
  tbt: number;
}

async function medir(url: string, porta: number): Promise<Medida> {
  const { lhr } = (await lighthouse(url, { port: porta, output: 'json', logLevel: 'error' }))!;
  const nota = (id: string) => Math.round((lhr.categories[id].score ?? 0) * 100);
  const valor = (id: string) => lhr.audits[id].numericValue ?? 0;
  return {
    performance: nota('performance'),
    acessibilidade: nota('accessibility'),
    praticas: nota('best-practices'),
    seo: nota('seo'),
    lcp: valor('largest-contentful-paint'),
    cls: valor('cumulative-layout-shift'),
    tbt: valor('total-blocking-time'),
  };
}

const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });
const linhas: string[] = [
  '# Lighthouse mobile do MVP',
  '',
  `Medido em ${new Date().toLocaleDateString('pt-BR')}, mediana de ${RODADAS} rodadas por página, com o Chrome instalado.`,
  '',
  'Metas da spec: Performance ≥ 95, Acessibilidade ≥ 95, SEO 100 no build indexável, LCP < 2,0 s e CLS < 0,05.',
  '',
  'O servidor da medida manda HTML, CSS e JS com gzip, como a Cloudflare faz. Sem isso a medida castiga uns 130 KB por página que a produção nunca envia.',
  '',
];

try {
  for (const build of BUILDS) {
    const servidor = await servir(build.pasta, build.porta);
    linhas.push(`## Build ${build.nome}`, '', '| Página | Perf. | Acess. | Práticas | SEO | LCP | CLS | TBT |', '|---|---|---|---|---|---|---|---|');
    for (const pagina of PAGINAS) {
      const medidas: Medida[] = [];
      for (let i = 0; i < RODADAS; i++) {
        medidas.push(await medir(`http://localhost:${build.porta}${pagina.rota}`, chrome.port));
      }
      const m = (campo: keyof Medida) => mediana(medidas.map((medida) => medida[campo]));
      linhas.push(
        `| ${pagina.nome} | ${m('performance')} | ${m('acessibilidade')} | ${m('praticas')} | ${m('seo')} | ` +
          `${(m('lcp') / 1000).toFixed(2)} s | ${m('cls').toFixed(3)} | ${Math.round(m('tbt'))} ms |`,
      );
      console.log(`ok ${build.pasta}${pagina.rota}`);
    }
    linhas.push('');
    await new Promise((ok) => servidor.close(ok));
  }
} finally {
  await chrome.kill();
}

const saida = new URL('../relatorios/etapa-7/', import.meta.url);
await mkdir(saida, { recursive: true });
await writeFile(new URL('lighthouse.md', saida), linhas.join('\n'), 'utf8');
console.log(linhas.join('\n'));
