// A lista de pendências dos textos, para o roteiro da reunião com a Daniella e o Arthur.
// Uso: node scripts/pendencias.ts  (escreve relatorios/pendencias.md e imprime na tela)
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { extrairPendencias } from '../src/lib/texto.ts';

const conteudo = new URL('../content/', import.meta.url);

/** Nome da página, na ordem em que ela aparece no site. */
const PAGINAS: Record<string, string> = {
  'site.md': 'Textos compartilhados (menu, rodapé e drawer)',
  'home.md': 'Home',
  'treinamento-nr-1.md': 'Treinamento de NR-1',
  'curso-de-idiomas.md': 'Cursos de Idiomas',
  'traducao-simultanea.md': 'Tradução Simultânea',
  'lms.md': 'LMS',
  'quem-somos.md': 'Quem Somos',
};

// Comentário de YAML também cita o formato da pendência, e não é texto do site.
const semComentarios = (texto: string) =>
  texto
    .split('\n')
    .filter((linha) => !linha.trimStart().startsWith('#'))
    .join('\n');

const arquivos = (await readdir(conteudo)).filter((nome) => nome.endsWith('.md'));
const desconhecidos = arquivos.filter((nome) => !(nome in PAGINAS));
if (desconhecidos.length) throw new Error(`arquivo sem nome de página: ${desconhecidos.join(', ')}`);

const linhas = ['# Pendências para confirmar com a Daniella', ''];
let total = 0;

for (const [arquivo, pagina] of Object.entries(PAGINAS)) {
  if (!arquivos.includes(arquivo)) continue;
  const texto = semComentarios(await readFile(new URL(arquivo, conteudo), 'utf8'));
  const pendencias = [...new Set(extrairPendencias(texto))];
  if (!pendencias.length) continue;
  total += pendencias.length;
  linhas.push(`## ${pagina}`, '');
  for (const pendencia of pendencias) linhas.push(`- [ ] ${pendencia}`);
  linhas.push('');
}

linhas.splice(1, 0, '', `${total} pendências nos textos, geradas de content/ em ${new Date().toLocaleDateString('pt-BR')}.`);

const saida = new URL('../relatorios/', import.meta.url);
await mkdir(saida, { recursive: true });
await writeFile(new URL('pendencias.md', saida), linhas.join('\n'), 'utf8');
console.log(linhas.join('\n'));
console.log(`\nescrito em ${fileURLToPath(new URL('pendencias.md', saida))}`);
