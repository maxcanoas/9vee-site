import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DIST_PRODUCAO, DOMINIO, carregarPaginas } from './apoio';

// O build de produção é o que vai ao ar e o que o Lighthouse mede para o SEO 100: sem noindex em lugar nenhum.
describe('build de produção', () => {
  const paginas = carregarPaginas(DIST_PRODUCAO);
  const preview = carregarPaginas();

  it('gera as mesmas páginas do preview', () => {
    expect(paginas.map((p) => p.rota).sort()).toEqual(preview.map((p) => p.rota).sort());
  });

  it.each(paginas.map((p) => [p.rota, p] as const))('%s sai sem noindex', (_rota, { raiz }) => {
    expect(raiz.querySelector('meta[name="robots"]')).toBeNull();
  });

  it.each(paginas.map((p) => [p.rota, p] as const))(
    '%s aponta canonical e Open Graph para o domínio definitivo',
    (rota, { raiz }) => {
      const canonical = raiz.querySelector('link[rel="canonical"]')?.getAttribute('href');
      if (rota === '/404') expect(canonical).toBeUndefined();
      else expect(canonical).toBe(`${DOMINIO}${rota}`);
      expect(raiz.querySelector('meta[property="og:image"]')?.getAttribute('content')).toMatch(`${DOMINIO}/`);
    },
  );

  it('não manda o cabeçalho de noindex para a Cloudflare', () => {
    const arquivo = join(DIST_PRODUCAO, '_headers');
    const cabecalhos = existsSync(arquivo) ? readFileSync(arquivo, 'utf8') : '';
    expect(cabecalhos).not.toMatch(/X-Robots-Tag/i);
  });

  it('libera o robots.txt e aponta o sitemap do domínio definitivo', () => {
    const robots = readFileSync(join(DIST_PRODUCAO, 'robots.txt'), 'utf8');
    expect(robots).toMatch(/^Allow: \/$/m);
    expect(robots).not.toMatch(/^Disallow:\s*\/\s*$/m);
    expect(robots).toMatch(new RegExp(`^Sitemap: ${DOMINIO.replaceAll('.', '\\.')}/sitemap\\.xml$`, 'm'));
  });
});
