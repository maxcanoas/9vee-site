import { describe, expect, it } from 'vitest';
import { abrirPagina } from './apoio';

// O LMS saiu daqui no ticket 06 e a Tradução Simultânea, no 05: as páginas completas têm o teste delas, em
// lms.test.ts e em traducao.test.ts. Sobra o Quem Somos, até o ticket 07.
const PARCIAIS = [{ nome: 'Quem Somos', rota: 'quem-somos', servico: null }] as const;

describe.each(PARCIAIS)('página parcial: $nome', ({ rota, servico }) => {
  const pagina = abrirPagina(rota);

  it('avisa no hero que a página está em construção', () => {
    const etiqueta = pagina.querySelector('main section:first-of-type .hero-pagina__etiqueta');
    expect(etiqueta?.text.trim()).toBe('Página em construção no MVP');
  });

  it('fica com o hero e um bloco curto, e nada mais', () => {
    expect(pagina.querySelectorAll('main > section')).toHaveLength(2);
  });

  it('abre o pedido com o serviço da própria página', () => {
    const botoes = pagina.querySelectorAll('main [data-abre-contato]');
    expect(botoes.length).toBeGreaterThanOrEqual(1);
    for (const botao of botoes) {
      expect(botao.getAttribute('data-servico') ?? null).toBe(servico);
      expect(botao.getAttribute('aria-haspopup')).toBe('dialog');
    }
  });

  it('traz a figura do hero com o texto alternativo definitivo', () => {
    const figura = pagina.querySelector('main .figura');
    const alternativo = figura?.getAttribute('alt') ?? figura?.getAttribute('aria-label') ?? '';
    expect(alternativo.length).toBeGreaterThanOrEqual(10);
  });
});

describe('Quem Somos', () => {
  it('marca como pendência o que o site atual não conta', () => {
    expect(abrirPagina('quem-somos').querySelector('main mark.confirmar')).not.toBeNull();
  });

  it('mostra as quatro frentes da empresa', () => {
    const frentes = abrirPagina('quem-somos').querySelectorAll('#frentes .cartao__titulo').map((no) => no.text.trim());
    expect(frentes).toEqual(['Cursos de idiomas', 'Tradução simultânea', 'Treinamento de NR-1', 'LMS']);
  });
});
