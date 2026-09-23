import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';
import { describe, expect, it } from 'vitest';
import { DIST } from './apoio';

const pagina = (pasta: string) => parse(readFileSync(join(DIST, pasta, 'index.html'), 'utf8'));
const home = pagina('');
const cursos = pagina('curso-de-idiomas');

// A cliente pediu uma cor por público no menu e uma por família de idiomas (23/09/2026).
describe('código de cor', () => {
  it.each([
    ['no menu do computador', '.nav-larga [data-grupo]'],
    ['no menu do celular', '#menu-movel [data-grupo]'],
    ['no rodapé', 'footer [data-grupo]'],
  ])('marca os dois públicos %s, cada um com o título grifado', (_onde, seletor) => {
    const grupos = home.querySelectorAll(seletor);
    expect(grupos.map((grupo) => grupo.getAttribute('data-grupo'))).toEqual(['empresas', 'para-voce']);
    for (const grupo of grupos) expect(grupo.querySelector('.grifo')).not.toBeNull();
  });

  // As metades da escolha pegam a cor pelo id do grupo do menu: um id trocado no content/site.md apagaria a cor.
  it('liga as duas metades da escolha de público aos grupos do menu', () => {
    const doMenu = home.querySelectorAll('#menu-movel [data-grupo]').map((grupo) => grupo.getAttribute('data-grupo'));
    const daEscolha = home.querySelectorAll('.duas-metades [data-grupo]').map((metade) => metade.getAttribute('data-grupo'));
    expect(daEscolha).toEqual(doMenu);
  });

  it.each([
    ['na home', home],
    ['na página de cursos', cursos],
  ])('grifa o título de cada família de idiomas %s', (_onde, raiz) => {
    const familias = raiz.querySelectorAll('.familia');
    expect(familias.map((familia) => familia.getAttribute('data-grupo'))).toEqual(['germanicas', 'romanicas', 'outras']);
    for (const familia of familias) expect(familia.querySelector('h3 .grifo')).not.toBeNull();
  });
});
