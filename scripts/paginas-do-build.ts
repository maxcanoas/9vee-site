// Leitura de uma pasta de build (dist/ ou dist-producao/): as páginas, o texto que a pessoa vê e o arquivo
// de cada rota. Os testes do HTML gerado e a trava de produção leem o build do mesmo jeito.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { parse, type HTMLElement } from 'node-html-parser';

export interface Pagina {
  arquivo: string;
  rota: string;
  html: string;
  raiz: HTMLElement;
}

function listarHtml(pasta: string): string[] {
  return readdirSync(pasta).flatMap((nome) => {
    const caminho = join(pasta, nome);
    if (statSync(caminho).isDirectory()) return listarHtml(caminho);
    return nome.endsWith('.html') ? [caminho] : [];
  });
}

export function carregarPaginas(pasta: string): Pagina[] {
  return listarHtml(pasta).map((arquivo) => {
    const html = readFileSync(arquivo, 'utf8');
    const relativo = relative(pasta, arquivo).split(sep).join('/');
    const rota = `/${relativo.replace(/index\.html$/, '').replace(/\.html$/, '')}`;
    return { arquivo, rota, html, raiz: parse(html) };
  });
}

/** Texto que a pessoa vê ou que o leitor de tela lê: sem script, style e template. */
export function textoVisivel(raiz: HTMLElement): string {
  const copia = parse(raiz.toString());
  copia.querySelectorAll('script, style, template, noscript').forEach((no) => no.remove());
  return (copia.querySelector('body')?.text ?? '').replace(/\s+/g, ' ');
}

/** O arquivo que responde a um caminho do site: a pasta com index.html, ou o próprio arquivo. */
export function arquivoDaRota(pasta: string, caminho: string): string {
  return caminho.endsWith('/') ? join(pasta, caminho, 'index.html') : join(pasta, caminho);
}
