// A pendência diz quem responde: [CONFIRMAR COM A DANIELLA: ...] ou [CONFIRMAR COM O ARTHUR: ...].
// A forma curta, [CONFIRMAR: ...], fica com a Daniella, que aprova os textos.
const PENDENCIA = /\[CONFIRMAR(?: COM (A DANIELLA|O ARTHUR))?:\s*([^\]]+?)\s*\]/g;
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const NEGRITO = /\*\*(.+?)\*\*/g;
// Siglas com hífen que o navegador quebraria no meio ("NR-" numa linha, "1" na outra).
const SEM_QUEBRA = /(?<![\p{L}\d-])(NR-1|CELPE-Bras)(?![\p{L}\d-])/gu;

export type Responsavel = 'daniella' | 'arthur';

export interface Pendencia {
  responsavel: Responsavel;
  nota: string;
}

/** Textos da etiqueta de pendência, vindos de content/site.md. O detalhe traz {quem} e {nota}. */
export interface TextosDePendencia {
  etiqueta: string;
  detalhe: string;
  quem: Record<Responsavel, string>;
}

const responsavelDa = (marca: string | undefined): Responsavel => (marca === 'O ARTHUR' ? 'arthur' : 'daniella');

/** Troca cada {chave} do modelo pelo valor correspondente. */
export const preencher = (modelo: string, dados: Record<string, string>) =>
  modelo.replace(/\{(\w+)\}/g, (_, chave: string) => dados[chave] ?? '');

const maiuscula = (texto: string) => texto.charAt(0).toLocaleUpperCase('pt-BR') + texto.slice(1);
export const minuscula = (texto: string) => texto.charAt(0).toLocaleLowerCase('pt-BR') + texto.slice(1);

/** Aviso para o leitor de tela em todo link que abre outra aba. */
export const AVISO_NOVA_ABA = ' (abre em nova aba)';

export function escaparHtml(texto: string): string {
  return texto
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function etiquetaPendencia(notaHtml: string, responsavel: Responsavel, textos: TextosDePendencia): string {
  const etiqueta = escaparHtml(textos.etiqueta);
  const detalhe = preencher(escaparHtml(textos.detalhe), { nota: notaHtml, quem: escaparHtml(textos.quem[responsavel]) });
  // O title não aceita tags nem aspas cruas; o texto para leitor de tela aceita.
  const titulo = `${maiuscula(etiqueta)} ${detalhe}`.replace(/<[^>]+>/g, '').replaceAll('"', '&quot;');
  return `<mark class="confirmar" title="${titulo}">${etiqueta}<span class="visualmente-oculto"> ${detalhe}</span></mark>`;
}

function linkHtml(rotulo: string, urlEscapada: string): string {
  const url = urlEscapada.replaceAll('&amp;', '&');
  if (/^https?:\/\//i.test(url)) {
    return (
      `<a href="${urlEscapada}" target="_blank" rel="noopener">${rotulo}` +
      `<span class="visualmente-oculto">${AVISO_NOVA_ABA}</span></a>`
    );
  }
  if (/^(\/|#|mailto:|tel:)/i.test(url)) {
    return `<a href="${urlEscapada}">${rotulo}</a>`;
  }
  return rotulo;
}

/** Texto de uma linha vindo do content/: escapa o HTML e aplica pendência, link e negrito. */
export function formatarInline(texto: string, pendencia: TextosDePendencia): string {
  return escaparHtml(texto)
    .replace(SEM_QUEBRA, '<span class="sem-quebra">$1</span>')
    .replace(PENDENCIA, (_, marca: string | undefined, nota: string) =>
      etiquetaPendencia(nota, responsavelDa(marca), pendencia),
    )
    .replace(LINK, (_, rotulo: string, url: string) => linkHtml(rotulo, url))
    .replace(NEGRITO, '<strong>$1</strong>');
}

/** Corpo em Markdown já renderizado: só troca os marcadores de pendência. */
export function marcarPendencias(html: string, pendencia: TextosDePendencia): string {
  return html.replace(PENDENCIA, (_, marca: string | undefined, nota: string) =>
    etiquetaPendencia(nota, responsavelDa(marca), pendencia),
  );
}

/** "com a Daniella: faixa de preço": o detalhe da pendência em texto puro, para onde ela aparece fora da etiqueta. */
export function detalheDaPendencia({ responsavel, nota }: Pendencia, textos: TextosDePendencia): string {
  return preencher(textos.detalhe, { nota, quem: textos.quem[responsavel] });
}

export function lerPendencias(texto: string): Pendencia[] {
  return [...texto.matchAll(PENDENCIA)].map(([, marca, nota]) => ({ responsavel: responsavelDa(marca), nota: nota.trim() }));
}

/** O frontmatter e o corpo de um arquivo de content/. Sem frontmatter, o arquivo inteiro é corpo. */
export function partesDoArquivo(arquivo: string): { frontmatter: string; corpo: string } {
  const partes = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/.exec(arquivo);
  return partes ? { frontmatter: partes[1], corpo: partes[2] } : { frontmatter: '', corpo: arquivo };
}

/**
 * As pendências de um arquivo inteiro de content/. Os comentários do YAML ficam de fora: eles também
 * citam o formato da pendência, e não são texto do site. O corpo em Markdown entra inteiro.
 */
export function pendenciasDoArquivo(arquivo: string): Pendencia[] {
  const { frontmatter, corpo } = partesDoArquivo(arquivo);
  const semComentarios = frontmatter
    .split(/\r?\n/)
    .filter((linha) => !linha.trimStart().startsWith('#'))
    .join('\n');
  return lerPendencias(`${semComentarios}\n${corpo}`);
}

/** Versão sem marcação, para title, description, aria-label e JSON-LD. */
export function textoPuro(texto: string): string {
  return texto
    .replace(PENDENCIA, '')
    .replace(LINK, '$1')
    .replace(NEGRITO, '$1')
    .replace(/\s+([.,;:!?])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** JSON para dentro de <script>: com o "<" escapado, nenhum texto consegue fechar a tag. */
export function jsonParaScript(valor: unknown): string {
  return JSON.stringify(valor).replaceAll('<', '\\u003c');
}
