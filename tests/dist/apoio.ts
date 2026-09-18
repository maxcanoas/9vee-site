import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, type HTMLElement } from 'node-html-parser';

export const DIST = fileURLToPath(new URL('../../dist/', import.meta.url));

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

export function carregarPaginas(): Pagina[] {
  if (!existsSync(DIST)) throw new Error('dist/ não existe: rode "astro build" antes dos testes do HTML gerado');
  return listarHtml(DIST).map((arquivo) => {
    const html = readFileSync(arquivo, 'utf8');
    const relativo = relative(DIST, arquivo).split(sep).join('/');
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

/** Textos que também contam como copy: title, description e atributos lidos por pessoas. */
export function textosDeAtributo(raiz: HTMLElement): string[] {
  const textos = [raiz.querySelector('title')?.text ?? ''];
  for (const meta of raiz.querySelectorAll('meta[name="description"], meta[property^="og:"]')) {
    textos.push(meta.getAttribute('content') ?? '');
  }
  for (const no of raiz.querySelectorAll('[alt], [aria-label], [title], [placeholder]')) {
    for (const atributo of ['alt', 'aria-label', 'title', 'placeholder']) {
      const valor = no.getAttribute(atributo);
      if (valor) textos.push(valor);
    }
  }
  return textos;
}

export function jsonLd(raiz: HTMLElement): Record<string, unknown>[] {
  return raiz
    .querySelectorAll('script[type="application/ld+json"]')
    .map((script) => JSON.parse(script.textContent) as Record<string, unknown>)
    .flatMap((documento) =>
      Array.isArray(documento['@graph']) ? (documento['@graph'] as Record<string, unknown>[]) : [documento],
    );
}

export function arquivoDaRota(caminho: string): string {
  return caminho.endsWith('/') ? join(DIST, caminho, 'index.html') : join(DIST, caminho);
}
