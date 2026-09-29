import { describe, expect, it } from 'vitest';
import { trilhaDoCaminho } from '../../src/lib/trilha';

// O menu de content/site.md, só com o que a trilha usa. O "Inglês" antecipa as páginas de idioma.
const site = {
  trilha: { inicio: 'Início' },
  menu: {
    grupos: [
      {
        itens: [
          { rotulo: 'Idiomas para equipes', href: '/curso-de-idiomas/#empresas' },
          { rotulo: 'Cursos de idiomas', href: '/curso-de-idiomas/' },
          { rotulo: 'Inglês', href: '/curso-de-idiomas/ingles/' },
        ],
      },
    ],
    quemSomos: { rotulo: 'Quem somos', href: '/quem-somos/' },
  },
};

describe('trilhaDoCaminho', () => {
  it('começa no Início e dá à página o nome que ela tem no menu', () => {
    expect(trilhaDoCaminho(site, '/quem-somos/')).toEqual([
      { nome: 'Início', caminho: '/' },
      { nome: 'Quem somos', caminho: '/quem-somos/' },
    ]);
  });

  it('usa o link do menu que leva à página inteira, e não o que leva a uma âncora dela', () => {
    expect(trilhaDoCaminho(site, '/curso-de-idiomas/').at(-1)?.nome).toBe('Cursos de idiomas');
  });

  it('faz um passo para cada nível do endereço', () => {
    expect(trilhaDoCaminho(site, '/curso-de-idiomas/ingles/')).toEqual([
      { nome: 'Início', caminho: '/' },
      { nome: 'Cursos de idiomas', caminho: '/curso-de-idiomas/' },
      { nome: 'Inglês', caminho: '/curso-de-idiomas/ingles/' },
    ]);
  });

  it('para o build quando um nível do endereço não tem nome no menu', () => {
    expect(() => trilhaDoCaminho(site, '/politica-de-privacidade/')).toThrow('/politica-de-privacidade/');
  });
});
