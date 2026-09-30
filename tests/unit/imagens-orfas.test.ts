import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { tirarImagensOrfas } from '../../scripts/imagens-orfas.ts';
import { montarBuild } from './build-de-mentira.ts';

describe('tirarImagensOrfas', () => {
  it('apaga de _astro/ a imagem que nenhum arquivo cita, e deixa a citada no HTML e a citada no CSS', () => {
    const pasta = montarBuild({
      'index.html': '<picture><source srcset="/_astro/foto.Ab1_x.avif 400w"><img src="/_astro/foto.Ab1_y.webp"></picture>',
      '_astro/fundo.css': 'body { background: url(/_astro/textura.Cd2.png) }',
      '_astro/foto.Ab1_x.avif': '',
      '_astro/foto.Ab1_y.webp': '',
      '_astro/textura.Cd2.png': '',
      // O original que o Astro deixou e a foto de uma página que não foi para o build.
      '_astro/foto.Ab1.jpg': '',
      '_astro/idioma-alemao.Ef3.jpg': '',
    });
    expect(tirarImagensOrfas(pasta).sort()).toEqual(['foto.Ab1.jpg', 'idioma-alemao.Ef3.jpg']);
    for (const arquivo of ['foto.Ab1_x.avif', 'foto.Ab1_y.webp', 'textura.Cd2.png']) {
      expect(existsSync(join(pasta, '_astro', arquivo)), arquivo).toBe(true);
    }
    expect(existsSync(join(pasta, '_astro', 'foto.Ab1.jpg'))).toBe(false);
  });

  it('não mexe em imagem fora de _astro/ nem em arquivo que não é imagem', () => {
    const pasta = montarBuild({
      'index.html': '<p>Sem imagem.</p>',
      'og.jpg': '',
      '_astro/script.Gh4.js': 'console.log(1)',
    });
    expect(tirarImagensOrfas(pasta)).toEqual([]);
    expect(existsSync(join(pasta, 'og.jpg'))).toBe(true);
    expect(existsSync(join(pasta, '_astro', 'script.Gh4.js'))).toBe(true);
  });

  it('não falha num build sem _astro/', () => {
    expect(tirarImagensOrfas(montarBuild({ 'index.html': '<p>Oi</p>' }))).toEqual([]);
  });
});
