import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { parse, type HTMLElement } from 'node-html-parser';
import { expect } from 'vitest';
import { carregarPaginas as lerPaginas, type Pagina } from '../../scripts/paginas-do-build.ts';
import type { Campo, DadosDoDrawer } from '../../src/lib/contato.ts';

/** O build de preview, o que vai para o Cloudflare. A maior parte dos testes lê este. */
export const DIST = fileURLToPath(new URL('../../dist/', import.meta.url));
/** O build de produção, sem noindex: o que confere o SEO e o que a trava de produção lê. */
export const DIST_PRODUCAO = fileURLToPath(new URL('../../dist-producao/', import.meta.url));

export const DOMINIO = 'https://www.9vee.com.br';

// As seções da política que o site escreveu, na mescla com o texto do Wix. O resto é texto do cliente.
export const ESCRITAS_PELO_SITE = ['quem-cuida', 'pedido', 'whatsapp', 'estatistica', 'navegador', 'hospedagem', 'direitos'];

export function carregarPaginas(pasta = DIST): Pagina[] {
  if (!existsSync(pasta)) throw new Error(`${pasta} não existe: rode "npm test", que faz os builds antes dos testes`);
  return lerPaginas(pasta);
}

export {
  INTERPRETACAO_DE_MANDARIM,
  PAGINAS_DE_TEXTO,
  paginasComPublicacaoNoConteudo,
  paginasDeCidadeNoConteudo,
  paginasDeIdiomaNoConteudo,
  type PaginaDeIdiomaNoConteudo,
} from '../conteudo.ts';

/** A página de uma rota do build de preview, já lida: "lms" é o dist/lms/index.html. */
export function abrirPagina(rota: string): HTMLElement {
  return parse(readFileSync(join(DIST, rota, 'index.html'), 'utf8'));
}

const emUmaLinha = (texto: string) => texto.replace(/\s+/g, ' ').trim();

/** O texto de um trecho da página, com os espaços e as quebras de linha reduzidos a um espaço. */
export const textoDe = (raiz: HTMLElement, seletor: string) => emUmaLinha(raiz.querySelector(seletor)?.text ?? '');

/** O texto de cada elemento que o seletor acha, na ordem da página. */
export const textosDe = (raiz: HTMLElement, seletor: string) =>
  raiz.querySelectorAll(seletor).map((no) => emUmaLinha(no.text));

/**
 * Os dados do pedido que a página entrega ao script: o número, o nome da página, o que ela já traz marcado (o
 * serviço, o idioma e as opções de cada pergunta de várias respostas), os campos de cada formulário e o que o envio
 * por e-mail precisa.
 */
export interface IlhaDoPedido {
  numero: string;
  pagina: string;
  servicoDaPagina: string | null;
  idiomaDaPagina: string | null;
  marcadasDaPagina: Record<string, string[]>;
  formularios: Record<string, Campo[]>;
  erros: Record<string, string>;
  envio: DadosDoDrawer['envio'];
}

export const ilhaDoPedido = (raiz: HTMLElement) =>
  JSON.parse(raiz.querySelector('#dados-contato')!.textContent) as IlhaDoPedido;

/**
 * O fechamento da página de um serviço diz em prosa o que o pedido pergunta. Cada pergunta do formulário tem a
 * palavra dela: campo novo sem palavra derruba o teste, e o texto muda junto. Ficam fora da conta o nome da empresa,
 * as perguntas que só detalham outra e as que a página já traz marcadas.
 */
export function conferirPerguntasDoFechamento(
  raiz: HTMLElement,
  campos: Campo[],
  palavraDoCampo: Record<string, string>,
  jaMarcadas: string[] = [],
) {
  const perguntas = campos
    .filter((campo) => campo.id !== 'empresa' && !campo.mostrarSe && !jaMarcadas.includes(campo.id))
    .map((campo) => campo.id);
  expect(perguntas).toEqual(Object.keys(palavraDoCampo));
  const fechamento = textoDe(raiz, '#contato');
  for (const palavra of Object.values(palavraDoCampo)) expect(fechamento).toContain(palavra);
}

/** O Service da página de um serviço: o nome dele, o endereço da página e a organização como quem presta. */
export function conferirServico(raiz: HTMLElement, { nome, caminho }: { nome: string; caminho: string }) {
  const servico = jsonLd(raiz).find((no) => no['@type'] === 'Service');
  expect(servico).toBeDefined();
  expect(servico?.name).toBe(nome);
  expect(servico?.provider).toEqual({ '@id': expect.stringContaining('/#organizacao') });
  expect(servico?.url).toEqual(expect.stringContaining(caminho));
}

/**
 * A figura em arco de uma seção, com o texto alternativo definitivo: a imagem do Gemini se o arquivo já está em
 * src/assets/imagens/, e senão o Placeholder com o ID à vista.
 */
export function conferirFiguraEmArco(figura: HTMLElement | null, idDoPlaceholder: RegExp) {
  const alternativo = figura?.getAttribute('alt') ?? figura?.getAttribute('aria-label') ?? '';
  expect(alternativo.length).toBeGreaterThanOrEqual(10);
  expect(figura?.getAttribute('class')).toContain('figura--arco');
  if (figura?.classList.contains('placeholder')) {
    expect(figura.querySelector('.placeholder__id')?.text).toMatch(idDoPlaceholder);
  }
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
