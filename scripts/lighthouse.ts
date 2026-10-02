// Lighthouse mobile nas páginas de um roteiro, no build de produção, com a mediana de 3 rodadas. O roteiro é a
// etapa ou o ticket que pede a medida, e o relatório sai em relatorios/<roteiro>/lighthouse.md.
// O pacote não fica no package.json: instale antes com `npm install --no-save lighthouse@13.5.0`.
// Uso: node scripts/build.ts producao && node scripts/lighthouse.ts <roteiro>
import { createServer, type Server } from 'node:http';
import { readFile } from 'node:fs/promises';
import { mkdir, writeFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { RODADAS, medirTabela } from './medida-lighthouse.ts';

interface Roteiro {
  paginas: { nome: string; rota: string }[];
  /** A meta de acessibilidade, a única que muda de um roteiro para o outro. */
  acessibilidade: string;
}

// A spec pede 95 ou mais em todas as páginas, e 100 nos tickets do reaproveitamento ("Como cada ticket do
// reaproveitamento fecha").
const ACESSIBILIDADE_GERAL = '≥ 95';
const ACESSIBILIDADE_DO_REAPROVEITAMENTO = '100';

// Cada ticket que fecha uma página acrescenta o roteiro dele aqui.
const ROTEIROS: Record<string, Roteiro> = {
  'etapa-7': {
    paginas: [
      { nome: 'Home', rota: '/' },
      { nome: 'Treinamento de NR-1', rota: '/treinamento-nr-1/' },
      { nome: 'Cursos de Idiomas', rota: '/curso-de-idiomas/' },
    ],
    acessibilidade: ACESSIBILIDADE_GERAL,
  },
  'ticket-06': { paginas: [{ nome: 'LMS', rota: '/lms/' }], acessibilidade: ACESSIBILIDADE_DO_REAPROVEITAMENTO },
  'ticket-05': {
    paginas: [{ nome: 'Tradução Simultânea', rota: '/traducao-simultanea/' }],
    acessibilidade: ACESSIBILIDADE_DO_REAPROVEITAMENTO,
  },
};

const nomeDoRoteiro = process.argv[2] ?? 'etapa-7';
const roteiro = ROTEIROS[nomeDoRoteiro];
if (!roteiro) throw new Error(`Roteiro desconhecido: ${nomeDoRoteiro}. Opções: ${Object.keys(ROTEIROS).join(', ')}`);

// A medida é no build de produção: é o que vai ao ar, e o único sem noindex, que derrubaria o SEO.
const PASTA = 'dist-producao';
const PORTA = 4501;

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

const linhas: string[] = [
  '# Lighthouse mobile',
  '',
  `Medido em ${new Date().toLocaleDateString('pt-BR')} no build de produção (${PASTA}/), mediana de ${RODADAS} rodadas por página.`,
  '',
  `Metas: Performance ≥ 95, Acessibilidade ${roteiro.acessibilidade}, Boas práticas ≥ 95, SEO 100, LCP < 2,0 s e CLS < 0,05.`,
  '',
  'O servidor da medida manda HTML, CSS e JS com gzip, como a Cloudflare faz. Sem isso a medida castiga uns 130 KB por página que a produção nunca envia.',
  '',
];

const servidor = await servir(PASTA, PORTA);
try {
  const paginas = roteiro.paginas.map(({ nome, rota }) => ({ nome, url: `http://localhost:${PORTA}${rota}` }));
  linhas.push(...(await medirTabela(paginas, (linha) => console.log(linha))), '');
} finally {
  await new Promise((ok) => servidor.close(ok));
}

const saida = new URL(`../relatorios/${nomeDoRoteiro}/`, import.meta.url);
await mkdir(saida, { recursive: true });
await writeFile(new URL('lighthouse.md', saida), linhas.join('\n'), 'utf8');
console.log(linhas.join('\n'));
