import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { parse, type HTMLElement } from 'node-html-parser';

export const DIST = fileURLToPath(new URL('../../dist/', import.meta.url));
/** Build sem noindex (scripts/build-indexavel.ts), só para conferir o SEO. */
export const DIST_INDEXAVEL = fileURLToPath(new URL('../../dist-indexavel/', import.meta.url));

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

export function carregarPaginas(pasta = DIST): Pagina[] {
  if (!existsSync(pasta)) throw new Error(`${pasta} não existe: rode "npm test", que faz os builds antes dos testes`);
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

// Import estático no código minificado: import{a}from"./x.js" ou import"./x.js". O import("...") fica de fora.
const IMPORTACAO = /(?:\bfrom|\bimport)\s*["']([^"']+\.js)["']/g;

/**
 * JavaScript que a página carrega de saída: os módulos dos <script type="module">, o que eles importam
 * sem ser por import() dinâmico e os scripts inline. JSON e speculation rules não contam.
 */
export function tamanhoDoJs(raiz: HTMLElement, pasta = DIST): { bruto: number; gzip: number } {
  const modulos = new Set<string>();
  const visitar = (caminho: string) => {
    if (modulos.has(caminho)) return;
    modulos.add(caminho);
    const codigo = readFileSync(caminho, 'utf8');
    for (const [, alvo] of codigo.matchAll(IMPORTACAO)) {
      visitar(alvo.startsWith('/') ? join(pasta, alvo) : join(dirname(caminho), alvo));
    }
  };
  for (const script of raiz.querySelectorAll('script[type="module"][src]')) {
    visitar(join(pasta, script.getAttribute('src')!));
  }
  const trechos = [...modulos].map((caminho) => readFileSync(caminho));
  for (const script of raiz.querySelectorAll('script:not([src])')) {
    const tipo = script.getAttribute('type');
    if (!tipo || tipo === 'module' || tipo === 'text/javascript') trechos.push(Buffer.from(script.textContent));
  }
  return {
    bruto: trechos.reduce((soma, trecho) => soma + trecho.length, 0),
    gzip: trechos.reduce((soma, trecho) => soma + gzipSync(trecho).length, 0),
  };
}
