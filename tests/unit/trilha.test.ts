import { describe, expect, it } from 'vitest';
import { trilhaDoCaminho } from '../../src/lib/trilha';

// O menu de content/site.md, só com o que a trilha usa.
const site = {
  trilha: { inicio: 'Início' },
  menu: {
    grupos: [
      {
        itens: [
          { rotulo: 'Idiomas para equipes', href: '/curso-de-idiomas/#empresas' },
          { rotulo: 'Cursos de idiomas', href: '/curso-de-idiomas/' },
        ],
      },
    ],
    quemSomos: { rotulo: 'Quem somos', href: '/quem-somos/' },
  },
};

// As páginas que não estão no menu, como as de idioma, trazem o próprio nome.
const foraDoMenu = [{ rotulo: 'Inglês', href: '/curso-de-idiomas/ingles/' }];

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

  it('faz um passo para cada nível do endereço, com o nome das páginas fora do menu', () => {
    expect(trilhaDoCaminho(site, '/curso-de-idiomas/ingles/', foraDoMenu)).toEqual([
      { nome: 'Início', caminho: '/' },
      { nome: 'Cursos de idiomas', caminho: '/curso-de-idiomas/' },
      { nome: 'Inglês', caminho: '/curso-de-idiomas/ingles/' },
    ]);
  });

  it('fica com o nome do menu quando a página também está nele', () => {
    const outroNome = [{ rotulo: 'Idiomas', href: '/curso-de-idiomas/' }];
    expect(trilhaDoCaminho(site, '/curso-de-idiomas/', outroNome).at(-1)?.nome).toBe('Cursos de idiomas');
  });

  it('para o build quando um nível do endereço não tem nome', () => {
    expect(() => trilhaDoCaminho(site, '/politica-de-privacidade/')).toThrow('/politica-de-privacidade/');
    expect(() => trilhaDoCaminho(site, '/curso-de-idiomas/espanhol/', foraDoMenu)).toThrow('/curso-de-idiomas/espanhol/');
  });
});
