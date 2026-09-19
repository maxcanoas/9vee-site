import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse, type HTMLElement } from 'node-html-parser';
import { describe, expect, it } from 'vitest';
import { DIST } from './apoio';

const abrir = (rota: string) => parse(readFileSync(join(DIST, rota, 'index.html'), 'utf8'));

const PARCIAIS = [
  { nome: 'Tradução Simultânea', rota: 'traducao-simultanea', servico: 'traducao' },
  { nome: 'LMS', rota: 'lms', servico: 'lms' },
  { nome: 'Quem Somos', rota: 'quem-somos', servico: null },
] as const;

describe.each(PARCIAIS)('página parcial: $nome', ({ rota, servico }) => {
  const pagina: HTMLElement = abrir(rota);

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

describe('tradução simultânea', () => {
  const pagina = abrir('traducao-simultanea');
  const texto = pagina.querySelector('main')?.text.replace(/\s+/g, ' ') ?? '';

  it('diz onde há atendimento presencial, que é o único que o site atual afirma', () => {
    for (const cidade of ['São Paulo', 'Rio de Janeiro', 'Curitiba', 'Brasília']) {
      expect(texto).toContain(cidade);
    }
  });

  it('lista os sete idiomas com intérprete', () => {
    for (const idioma of ['inglês', 'espanhol', 'mandarim', 'francês', 'italiano', 'crioulo haitiano', 'coreano']) {
      expect(texto).toContain(idioma);
    }
  });
});

describe('LMS e Quem Somos', () => {
  it('marcam como pendência o que o site atual não conta', () => {
    expect(abrir('lms').querySelector('main mark.confirmar'), 'LMS').not.toBeNull();
    expect(abrir('quem-somos').querySelector('main mark.confirmar'), 'Quem Somos').not.toBeNull();
  });

  it('o Quem Somos mostra as quatro frentes da empresa', () => {
    const frentes = abrir('quem-somos').querySelectorAll('#frentes .cartao__titulo').map((no) => no.text.trim());
    expect(frentes).toEqual(['Cursos de idiomas', 'Tradução simultânea', 'Treinamento de NR-1', 'LMS']);
  });
});
