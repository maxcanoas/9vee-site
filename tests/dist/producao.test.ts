import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { linksQuebrados } from '../../scripts/trava-producao.ts';
import {
  DIST_PRODUCAO,
  DOMINIO,
  carregarPaginas,
  conferirEnderecos,
  conferirRobotsLiberado,
  paginasDeIdioma,
} from './apoio';

// O build de produção é o que vai ao ar e o que o Lighthouse mede para o SEO 100: sem noindex em lugar nenhum.
describe('build de produção', () => {
  const paginas = carregarPaginas(DIST_PRODUCAO);
  const preview = carregarPaginas();
  const naoPublicadas = paginasDeIdioma().filter((pagina) => !pagina.publicada).map((pagina) => pagina.rota);

  it('gera as páginas do preview, menos as de idioma não publicadas', () => {
    const esperadas = preview.map((p) => p.rota).filter((rota) => !naoPublicadas.includes(rota));
    expect(paginas.map((p) => p.rota).sort()).toEqual(esperadas.sort());
  });

  it('deixa cada página de idioma não publicada só no preview', () => {
    for (const { rota, publicada } of paginasDeIdioma()) {
      expect(preview.some((p) => p.rota === rota), `${rota} no preview`).toBe(true);
      expect(paginas.some((p) => p.rota === rota), `${rota} na produção`).toBe(publicada);
    }
  });

  // A página que ficou fora também sai dos links: a home e a página de cursos levam à âncora do idioma.
  it.each(paginas.map((p) => [p.rota, p] as const))('%s só liga para páginas da produção', (_rota, pagina) => {
    expect(linksQuebrados(pagina, DIST_PRODUCAO)).toEqual([]);
  });

  it.each(paginas.map((p) => [p.rota, p] as const))('%s sai sem noindex', (_rota, { raiz }) => {
    expect(raiz.querySelector('meta[name="robots"]')).toBeNull();
  });

  it.each(paginas.map((p) => [p.rota, p] as const))('%s aponta canonical e Open Graph para o domínio definitivo', (_rota, pagina) => {
    conferirEnderecos(pagina);
  });

  it('não manda o cabeçalho de noindex para a Cloudflare', () => {
    const arquivo = join(DIST_PRODUCAO, '_headers');
    const cabecalhos = existsSync(arquivo) ? readFileSync(arquivo, 'utf8') : '';
    expect(cabecalhos).not.toMatch(/X-Robots-Tag/i);
  });

  it('libera o robots.txt e aponta o sitemap do domínio definitivo', () => {
    const robots = readFileSync(join(DIST_PRODUCAO, 'robots.txt'), 'utf8');
    conferirRobotsLiberado(robots);
    expect(robots).toContain(`\nSitemap: ${DOMINIO}/sitemap.xml\n`);
  });
});
