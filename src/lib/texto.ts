const PENDENCIA = /\[CONFIRMAR(?: COM A DANIELLA)?:\s*([^\]]+?)\s*\]/g;
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const NEGRITO = /\*\*(.+?)\*\*/g;
// Siglas com hífen que o navegador quebraria no meio ("NR-" numa linha, "1" na outra).
const SEM_QUEBRA = /(?<![\p{L}\d-])(NR-1|CELPE-Bras)(?![\p{L}\d-])/gu;

/** Textos da etiqueta de pendência, vindos de content/site.md. O detalhe traz {nota}. */
export interface TextosDePendencia {
  etiqueta: string;
  detalhe: string;
}

/** Troca cada {chave} do modelo pelo valor correspondente. */
export const preencher = (modelo: string, dados: Record<string, string>) =>
  modelo.replace(/\{(\w+)\}/g, (_, chave: string) => dados[chave] ?? '');

const maiuscula = (texto: string) => texto.charAt(0).toLocaleUpperCase('pt-BR') + texto.slice(1);

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

function etiquetaPendencia(notaHtml: string, textos: TextosDePendencia): string {
  const etiqueta = escaparHtml(textos.etiqueta);
  const detalhe = preencher(escaparHtml(textos.detalhe), { nota: notaHtml });
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
    .replace(PENDENCIA, (_, nota: string) => etiquetaPendencia(nota, pendencia))
    .replace(LINK, (_, rotulo: string, url: string) => linkHtml(rotulo, url))
    .replace(NEGRITO, '<strong>$1</strong>');
}

/** Corpo em Markdown já renderizado: só troca os marcadores de pendência. */
export function marcarPendencias(html: string, pendencia: TextosDePendencia): string {
  return html.replace(PENDENCIA, (_, nota: string) => etiquetaPendencia(nota, pendencia));
}

export function extrairPendencias(texto: string): string[] {
  return [...texto.matchAll(PENDENCIA)].map((m) => m[1].trim());
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
