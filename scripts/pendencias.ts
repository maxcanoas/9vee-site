// A lista de pendências dos textos, separada por quem responde: a Daniella ou o Arthur.
// Uso: node scripts/pendencias.ts  (escreve relatorios/pendencias.md e imprime na tela)
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { pendenciasDoArquivo, type Pendencia, type Responsavel } from '../src/lib/texto.ts';

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
  'politica-de-privacidade.md': 'Política de privacidade',
};

const arquivos = (await readdir(conteudo)).filter((nome) => nome.endsWith('.md'));
const desconhecidos = arquivos.filter((nome) => !(nome in PAGINAS));
if (desconhecidos.length) throw new Error(`arquivo sem nome de página: ${desconhecidos.join(', ')}`);

const PESSOAS: Record<Responsavel, string> = { daniella: 'Para a Daniella', arthur: 'Para o Arthur' };

const porArquivo = new Map<string, Pendencia[]>();
for (const arquivo of Object.keys(PAGINAS)) {
  if (arquivos.includes(arquivo)) porArquivo.set(arquivo, pendenciasDoArquivo(await readFile(new URL(arquivo, conteudo), 'utf8')));
}

const linhas = ['# Pendências para a Daniella e o Arthur', ''];
let total = 0;

for (const [responsavel, titulo] of Object.entries(PESSOAS) as [Responsavel, string][]) {
  const blocos: string[] = [];
  for (const [arquivo, pagina] of Object.entries(PAGINAS)) {
    const daPessoa = (porArquivo.get(arquivo) ?? []).filter((pendencia) => pendencia.responsavel === responsavel);
    const notas = [...new Set(daPessoa.map((pendencia) => pendencia.nota))];
    if (!notas.length) continue;
    total += notas.length;
    blocos.push(`### ${pagina}`, '', ...notas.map((nota) => `- [ ] ${nota}`), '');
  }
  if (blocos.length) linhas.push(`## ${titulo}`, '', ...blocos);
}

linhas.splice(1, 0, '', `${total} pendências nos textos, geradas de content/ em ${new Date().toLocaleDateString('pt-BR')}.`);

const saida = new URL('../relatorios/', import.meta.url);
await mkdir(saida, { recursive: true });
await writeFile(new URL('pendencias.md', saida), linhas.join('\n'), 'utf8');
console.log(linhas.join('\n'));
console.log(`\nescrito em ${fileURLToPath(new URL('pendencias.md', saida))}`);
