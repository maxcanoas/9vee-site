import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { lerCsv } from '../../scripts/csv.ts';
import { linksQuebrados, redirecionamentosQuebrados } from '../../scripts/trava-producao.ts';
import {
  DIST,
  DIST_PRODUCAO,
  DOMINIO,
  carregarPaginas,
  conferirEnderecos,
  conferirRobotsLiberado,
  paginasDeIdiomaNoConteudo,
} from './apoio';

// O build de produção é o que vai ao ar e o que o Lighthouse mede para o SEO 100: sem noindex em lugar nenhum.
describe('build de produção', () => {
  const paginas = carregarPaginas(DIST_PRODUCAO);
  const preview = carregarPaginas();
  const naoPublicadas = paginasDeIdiomaNoConteudo().filter((pagina) => !pagina.publicada).map((pagina) => pagina.rota);

  it('gera as páginas do preview, menos as de idioma não publicadas', () => {
    const esperadas = preview.map((p) => p.rota).filter((rota) => !naoPublicadas.includes(rota));
    expect(paginas.map((p) => p.rota).sort()).toEqual(esperadas.sort());
  });

  it('deixa cada página de idioma não publicada só no preview', () => {
    for (const { rota, publicada } of paginasDeIdiomaNoConteudo()) {
      expect(preview.some((p) => p.rota === rota), `${rota} no preview`).toBe(true);
      expect(paginas.some((p) => p.rota === rota), `${rota} na produção`).toBe(publicada);
    }
  });

  // A home e a página de cursos só levam à página de idioma publicada: a que ficou fora nunca vira link quebrado.
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

  // O .htaccess da HostGator (ticket 19): uma regra para cada 301 e 410 do mapa aprovado, e todo 301 numa página do build.
  it('leva o .htaccess com o mapa de redirecionamentos, sem destino fora do build', () => {
    const htaccess = readFileSync(join(DIST_PRODUCAO, '.htaccess'), 'utf8');
    const mapa = lerCsv(readFileSync(new URL('../../docs/redirects.csv', import.meta.url), 'utf8'));
    // Só as do mapa: as regras gerais (https, www e a barra no fim) têm %{REQUEST_URI} ou $1 no destino.
    expect(htaccess.match(/^RewriteRule \^\S+\$ https:\/\/www\.9vee\.com\.br\/[^\s$%]* \[R=301,L\]$/gm)).toHaveLength(mapa.filter(({ tipo }) => tipo === '301').length);
    expect(htaccess.match(/^RewriteRule \S+ - \[G,L\]$/gm)).toHaveLength(mapa.filter(({ tipo }) => tipo === '410').length);
    expect(redirecionamentosQuebrados(DIST_PRODUCAO)).toEqual([]);
  });

  it('deixa o .htaccess fora do preview, que vai para o Cloudflare', () => {
    expect(existsSync(join(DIST, '.htaccess'))).toBe(false);
  });

  it('libera o robots.txt e aponta o sitemap do domínio definitivo', () => {
    const robots = readFileSync(join(DIST_PRODUCAO, 'robots.txt'), 'utf8');
    conferirRobotsLiberado(robots);
    expect(robots).toContain(`\nSitemap: ${DOMINIO}/sitemap.xml\n`);
  });
});
