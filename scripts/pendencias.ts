// A lista de pendências dos textos, separada por quem responde: a Daniella ou o Arthur.
// Uso: node scripts/pendencias.ts  (escreve relatorios/pendencias.md e imprime na tela)
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { partesDoArquivo, pendenciasDoArquivo, type Pendencia, type Responsavel } from '../src/lib/texto.ts';

const conteudo = new URL('../content/', import.meta.url);

/** Nome das páginas da raiz de content/, na ordem em que elas aparecem no site. */
const PAGINAS_DA_RAIZ: Record<string, string> = {
  'site.md': 'Textos compartilhados (menu, rodapé e drawer)',
  'home.md': 'Home',
  'treinamento-nr-1.md': 'Treinamento de NR-1',
  'curso-de-idiomas.md': 'Cursos de Idiomas',
  'traducao-simultanea.md': 'Tradução Simultânea',
  'interpretacao-de-mandarim.md': 'Interpretação de Mandarim',
  'lms.md': 'LMS',
  'quem-somos.md': 'Quem Somos',
  'politica-de-privacidade.md': 'Política de Privacidade',
};

const arquivos = (await readdir(conteudo)).filter((nome) => nome.endsWith('.md'));
const desconhecidos = arquivos.filter((nome) => !(nome in PAGINAS_DA_RAIZ));
if (desconhecidos.length) throw new Error(`arquivo sem nome de página: ${desconhecidos.join(', ')}`);

// As páginas de idioma e de cidade vêm depois, das pastas delas, com o nome tirado do frontmatter.
const campo = (texto: string, nome: string) =>
  new RegExp(`^${nome}:\\s*"([^"]+)"`, 'm').exec(partesDoArquivo(texto).frontmatter)?.[1];
const site = await readFile(new URL('site.md', conteudo), 'utf8');
const nomesDosIdiomas = new Map([...site.matchAll(/slug: "([a-z]+)", nome: "([^"]+)"/g)].map(([, slug, nome]) => [slug, nome]));
const NOMES_DAS_PASTAS: Record<string, (texto: string) => string | undefined> = {
  idiomas: (texto) => {
    const nome = nomesDosIdiomas.get(campo(texto, 'idioma') ?? '');
    return nome && `Curso de ${nome}`;
  },
  cidades: (texto) => {
    const cidade = campo(texto, 'cidade');
    return cidade && (campo(texto, 'tipo') === 'traducao' ? `Tradução simultânea ${campo(texto, 'naCidade')}` : cidade);
  },
};
const PAGINAS: Record<string, string> = { ...PAGINAS_DA_RAIZ };
const textos = new Map<string, string>();
for (const [pasta, nomeDaPagina] of Object.entries(NOMES_DAS_PASTAS)) {
  for (const nome of (await readdir(new URL(`${pasta}/`, conteudo))).filter((nome) => nome.endsWith('.md')).sort()) {
    const caminho = `${pasta}/${nome}`;
    const texto = await readFile(new URL(caminho, conteudo), 'utf8');
    const pagina = nomeDaPagina(texto);
    if (!pagina) throw new Error(`content/${caminho} sem o nome da página no frontmatter`);
    PAGINAS[caminho] = pagina;
    textos.set(caminho, texto);
  }
}

const PESSOAS: Record<Responsavel, string> = { daniella: 'Para a Daniella', arthur: 'Para o Arthur' };

const porArquivo = new Map<string, Pendencia[]>();
for (const arquivo of Object.keys(PAGINAS)) {
  const texto = textos.get(arquivo) ?? (arquivos.includes(arquivo) ? await readFile(new URL(arquivo, conteudo), 'utf8') : undefined);
  if (texto !== undefined) porArquivo.set(arquivo, pendenciasDoArquivo(texto));
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
