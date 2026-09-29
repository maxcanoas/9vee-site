// npm run lote -- <número>: monta docs/revisao-daniella/lote-N.md a partir do build de preview (dist/).
// Rode antes o npm run build:preview, para o lote sair com o texto de agora. Cada ticket que fecha um lote
// acrescenta as páginas dele aqui.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { arquivoDaRota } from './paginas-do-build.ts';
import { montarLote } from './revisao.ts';

const LOTES: Record<number, { titulo: string; paginas: [nome: string, rota: string][]; compartilhados?: boolean }> = {
  1: {
    titulo: 'páginas principais',
    paginas: [
      ['Home', '/'],
      ['Treinamento de NR-1', '/treinamento-nr-1/'],
      ['Cursos de Idiomas', '/curso-de-idiomas/'],
    ],
    // O menu, o rodapé e o pedido vão no primeiro lote, que a Daniella lê primeiro.
    compartilhados: true,
  },
};

const numero = Number(process.argv[2]);
const lote = LOTES[numero];
if (!lote) {
  console.error(`Uso: npm run lote -- <número>. Lotes que existem: ${Object.keys(LOTES).join(', ')}.`);
  process.exit(1);
}

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
if (!existsSync(dist)) {
  console.error('Não existe dist/. Rode antes o npm run build:preview.');
  process.exit(1);
}
const html = (rota: string) => readFileSync(arquivoDaRota(dist, rota), 'utf8');

const texto = montarLote({
  numero,
  titulo: lote.titulo,
  paginas: lote.paginas.map(([nome, rota]) => ({ nome, html: html(rota) })),
  compartilhados: lote.compartilhados ? html('/') : undefined,
  data: new Date(),
});

const pasta = new URL('../docs/revisao-daniella/', import.meta.url);
mkdirSync(pasta, { recursive: true });
const arquivo = new URL(`lote-${numero}.md`, pasta);
writeFileSync(arquivo, texto, 'utf8');
console.log(`escrito em ${fileURLToPath(arquivo)}`);
