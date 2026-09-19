import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DIST_INDEXAVEL, carregarPaginas } from './apoio';

// O build com INDEXAVEL=true é o que o Lighthouse mede para o SEO 100: sem meta robots nem cabeçalho.
describe('build indexável', () => {
  const paginas = carregarPaginas(DIST_INDEXAVEL);

  it('gera as mesmas páginas', () => {
    expect(paginas.map((p) => p.rota)).toContain('/treinamento-nr-1/');
  });

  it.each(paginas.map((p) => [p.rota, p] as const))('%s sai sem noindex', (_rota, { raiz }) => {
    expect(raiz.querySelector('meta[name="robots"]')).toBeNull();
  });

  it('não manda o cabeçalho de noindex para a Cloudflare', () => {
    const arquivo = join(DIST_INDEXAVEL, '_headers');
    const cabecalhos = existsSync(arquivo) ? readFileSync(arquivo, 'utf8') : '';
    expect(cabecalhos).not.toMatch(/X-Robots-Tag/i);
  });
});
