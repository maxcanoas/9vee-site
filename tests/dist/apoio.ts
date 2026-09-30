import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { parse, type HTMLElement } from 'node-html-parser';
import { expect } from 'vitest';
import { carregarPaginas as lerPaginas, type Pagina } from '../../scripts/paginas-do-build.ts';
import { publicadaNoArquivo } from '../../src/lib/publicacao.ts';
import { partesDoArquivo } from '../../src/lib/texto.ts';

/** O build de preview, o que vai para o Cloudflare. A maior parte dos testes lê este. */
export const DIST = fileURLToPath(new URL('../../dist/', import.meta.url));
/** O build de produção, sem noindex: o que confere o SEO e o que a trava de produção lê. */
export const DIST_PRODUCAO = fileURLToPath(new URL('../../dist-producao/', import.meta.url));

export const DOMINIO = 'https://www.9vee.com.br';

export function carregarPaginas(pasta = DIST): Pagina[] {
  if (!existsSync(pasta)) throw new Error(`${pasta} não existe: rode "npm test", que faz os builds antes dos testes`);
  return lerPaginas(pasta);
}

export interface PaginaDeIdioma {
  rota: string;
  /** O slug do idioma em content/site.md, que é também a âncora dele na página de cursos. */
  idioma: string;
  publicada: boolean;
}

/** As páginas de content/idiomas/, lidas da fonte com a mesma regra da trava: o preview tem todas. */
export function paginasDeIdioma(): PaginaDeIdioma[] {
  const pasta = fileURLToPath(new URL('../../content/idiomas/', import.meta.url));
  return readdirSync(pasta)
    .filter((nome) => nome.endsWith('.md'))
    .map((nome) => {
      const arquivo = readFileSync(join(pasta, nome), 'utf8');
      const idioma = /^idioma:\s*"([^"]+)"/m.exec(partesDoArquivo(arquivo).frontmatter)?.[1];
      if (!idioma) throw new Error(`content/idiomas/${nome} sem o idioma no frontmatter`);
      return { rota: `/curso-de-idiomas/${nome.replace(/\.md$/, '')}/`, idioma, publicada: publicadaNoArquivo(arquivo) };
    });
}

/** Texto que a pessoa vê ou que o leitor de tela lê: sem script, style e template. */
export function textoVisivel(raiz: HTMLElement): string {
  const copia = parse(raiz.toString());
  copia.querySelectorAll('script, style, template, noscript').forEach((no) => no.remove());
  return (copia.querySelector('body')?.text ?? '').replace(/\s+/g, ' ');
}

/**
 * Em qualquer modo, o endereço que o Google e as redes leem é o definitivo, nunca o do Cloudflare.
 * A 404 responde por qualquer endereço que não existe, então não tem canonical nem og:url.
 */
export function conferirEnderecos({ rota, raiz }: Pagina) {
  const canonical = raiz.querySelector('link[rel="canonical"]')?.getAttribute('href');
  const ogUrl = raiz.querySelector('meta[property="og:url"]')?.getAttribute('content');
  if (rota === '/404') {
    expect(canonical).toBeUndefined();
    expect(ogUrl).toBeUndefined();
  } else {
    expect(canonical).toBe(`${DOMINIO}${rota}`);
    expect(ogUrl).toBe(canonical);
  }
  expect(raiz.querySelector('meta[property="og:image"]')?.getAttribute('content')).toMatch(`${DOMINIO}/`);
}

/** O robots libera em todos os modos: com o rastreador bloqueado, o Google não leria o noindex do preview. */
export function conferirRobotsLiberado(robots: string) {
  expect(robots).toMatch(/^Allow: \/$/m);
  expect(robots).not.toMatch(/^Disallow:\s*\//m);
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

/**
 * O texto de um elemento limpo como o textoPuro limpa o do JSON-LD: sem a etiqueta de pendência, sem o texto
 * só para leitor de tela e sem espaço antes da pontuação. Assim os dois lados ficam comparáveis.
 */
export function textoComoNoJsonLd(elemento: HTMLElement): string {
  const copia = parse(elemento.toString());
  copia.querySelectorAll('mark.confirmar, .visualmente-oculto').forEach((no) => no.remove());
  return copia.text
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:!?])/g, '$1')
    .trim();
}

/** Todo texto que o JSON-LD leva, em qualquer profundidade. */
export function textosDoJsonLd(nos: Record<string, unknown>[]): string[] {
  const textos: string[] = [];
  const visitar = (valor: unknown) => {
    if (typeof valor === 'string') textos.push(valor);
    else if (Array.isArray(valor)) valor.forEach(visitar);
    else if (valor && typeof valor === 'object') Object.values(valor).forEach(visitar);
  };
  visitar(nos);
  return textos;
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
