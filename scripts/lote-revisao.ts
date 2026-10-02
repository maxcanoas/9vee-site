// npm run lote -- <número>: faz o build de preview e monta docs/revisao-daniella/lote-N.md a partir dele (dist/).
// O build vem junto para o lote nunca sair de um dist/ velho. Cada ticket que fecha um lote acrescenta as
// páginas dele aqui.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { arquivoDaRota } from './paginas-do-build.ts';
import { montarLote } from './revisao.ts';

interface Lote {
  titulo: string;
  paginas: [nome: string, rota: string][];
  comTextosCompartilhados?: boolean;
}

const LOTES: Record<number, Lote> = {
  1: {
    titulo: 'páginas principais',
    paginas: [
      ['Home', '/'],
      ['Treinamento de NR-1', '/treinamento-nr-1/'],
      ['Cursos de Idiomas', '/curso-de-idiomas/'],
    ],
    // O menu, o rodapé e o pedido vão no primeiro lote, que a Daniella lê primeiro.
    comTextosCompartilhados: true,
  },
  // As páginas que o reaproveitamento do site atual completou, a política e a página de erro, que não tem endereço
  // próprio: o arquivo dela responde por todo endereço que não existe.
  2: {
    titulo: 'tradução, LMS, Quem Somos, privacidade e página de erro',
    paginas: [
      ['Tradução Simultânea', '/traducao-simultanea/'],
      ['Interpretação de Mandarim', '/traducao-simultanea/mandarim/'],
      ['LMS', '/lms/'],
      ['Quem Somos', '/quem-somos/'],
      ['Política de Privacidade', '/politica-de-privacidade/'],
      ['Página de erro', '/404.html'],
    ],
  },
  // Os idiomas com texto próprio. Os esqueletos, que só têm as perguntas ao cliente, entram quando ganharem texto.
  3: {
    titulo: 'páginas de idioma',
    paginas: [
      ['Inglês', '/curso-de-idiomas/ingles/'],
      ['Espanhol', '/curso-de-idiomas/espanhol/'],
      ['Mandarim', '/curso-de-idiomas/mandarim/'],
      ['Holandês', '/curso-de-idiomas/holandes/'],
      ['Francês', '/curso-de-idiomas/frances/'],
      ['Português para estrangeiros', '/curso-de-idiomas/portugues-para-estrangeiros/'],
    ],
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
  console.error('Não existe dist/. Rode pelo npm run lote, que faz o build antes.');
  process.exit(1);
}
const html = (rota: string) => readFileSync(arquivoDaRota(dist, rota), 'utf8');

const texto = montarLote({
  numero,
  titulo: lote.titulo,
  paginas: lote.paginas.map(([nome, rota]) => ({ nome, html: html(rota) })),
  htmlDosCompartilhados: lote.comTextosCompartilhados ? html('/') : undefined,
  data: new Date(),
});

const pasta = new URL('../docs/revisao-daniella/', import.meta.url);
mkdirSync(pasta, { recursive: true });
const arquivo = new URL(`lote-${numero}.md`, pasta);
writeFileSync(arquivo, texto, 'utf8');
console.log(`escrito em ${fileURLToPath(arquivo)}`);
