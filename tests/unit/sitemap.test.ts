import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { escreverSitemap, montarSitemap } from '../../scripts/sitemap.ts';
import { montarBuild } from './build-de-mentira.ts';

const DOMINIO = 'https://www.9vee.com.br';

describe('montarSitemap', () => {
  it('lista cada página no domínio definitivo, a home primeiro, sem a página de erro', () => {
    const xml = montarSitemap(['/lms/', '/404', '/', '/curso-de-idiomas/ingles/'], DOMINIO);
    expect([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, endereco]) => endereco)).toEqual([
      `${DOMINIO}/`,
      `${DOMINIO}/curso-de-idiomas/ingles/`,
      `${DOMINIO}/lms/`,
    ]);
    expect(xml).toMatch(/^<\?xml version="1.0" encoding="UTF-8"\?>\n<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
  });

  it('escapa o que o XML não aceita cru no endereço', () => {
    expect(montarSitemap(["/a&b'/"], DOMINIO)).toContain(`<loc>${DOMINIO}/a&amp;b&apos;/</loc>`);
  });
});

describe('escreverSitemap', () => {
  it('lê as páginas da pasta do build e grava o sitemap.xml nela', () => {
    const pasta = montarBuild({
      'index.html': '',
      '404.html': '',
      'lms/index.html': '',
      'traducao-simultanea/mandarim/index.html': '',
      '_astro/estilo.css': '',
    });
    expect(escreverSitemap(pasta, DOMINIO)).toBe(3);
    expect(readFileSync(join(pasta, 'sitemap.xml'), 'utf8')).toContain(`<loc>${DOMINIO}/traducao-simultanea/mandarim/</loc>`);
  });
});
