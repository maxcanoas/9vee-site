import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';
import { describe, expect, it } from 'vitest';
import { DIST, jsonLd } from './apoio';

const idiomas = parse(readFileSync(join(DIST, 'curso-de-idiomas', 'index.html'), 'utf8'));

describe('cursos de idiomas', () => {
  it('traz as seções na ordem do brief', () => {
    // As famílias de idioma também são <section>, mas sem id: aqui entram só as seções da página.
    const secoes = idiomas.querySelectorAll('main section[id]').map((secao) => secao.getAttribute('id'));
    expect(secoes).toEqual([
      'idiomas',
      'niveis',
      'provas',
      'formatos',
      'empresas',
      'como-comeca',
      'perguntas',
      'contato',
    ]);
  });

  it('deixa os dois blocos de formato trocarem de lugar com o público', () => {
    const blocos = idiomas.querySelectorAll('.modalidades > *');
    expect(blocos).toHaveLength(2);
    for (const bloco of blocos) {
      expect(bloco.getAttribute('data-ordem-empresa')).toMatch(/^[12]$/);
      expect(bloco.getAttribute('data-ordem-voce')).toMatch(/^[12]$/);
    }
    // Sem escolha, esta página abre nos formatos: é a vitrine de quem estuda por conta própria.
    expect(blocos.map((b) => b.querySelector('section')?.getAttribute('id'))).toEqual(['formatos', 'empresas']);
  });

  it('tem as âncoras que o menu e a home usam', () => {
    for (const id of ['particular', 'provas', 'empresas', 'ingles', 'japones', 'portugues']) {
      expect(idiomas.getElementById(id), `âncora ${id} não existe`).not.toBeNull();
    }
  });

  it('dá a cada idioma um botão que já manda o idioma para o pedido', () => {
    const botoes = idiomas.querySelectorAll('#idiomas [data-abre-contato]');
    expect(botoes).toHaveLength(14);
    for (const botao of botoes) {
      expect(botao.tagName).toBe('BUTTON');
      expect(botao.getAttribute('data-servico')).toBe('idiomas');
      expect(botao.parentNode?.getAttribute('id')).toBe(botao.getAttribute('data-idioma'));
    }
  });

  it('mantém a lista de idiomas à vista sem JavaScript', () => {
    expect(idiomas.querySelectorAll('#idiomas noscript')).toHaveLength(14);
  });

  it('descreve os 14 cursos em JSON-LD, cada um na própria âncora', () => {
    const lista = jsonLd(idiomas).find((no) => no['@type'] === 'ItemList');
    const itens = lista?.itemListElement as { position: number; item: Record<string, string> }[];
    expect(itens).toHaveLength(14);
    expect(itens.map((i) => i.position)).toEqual(Array.from({ length: 14 }, (_, i) => i + 1));
    for (const { item } of itens) {
      expect(item['@type']).toBe('Course');
      expect(item.name).toMatch(/^Curso de .+/);
      const ancora = new URL(item.url).hash.slice(1);
      expect(idiomas.getElementById(ancora), `âncora ${ancora} do JSON-LD não existe`).not.toBeNull();
    }
  });

  it('lista os seis exames que o site atual prepara', () => {
    const nomes = idiomas.querySelectorAll('#provas dt').map((dt) => dt.text.trim());
    expect(nomes).toEqual(['TOEFL iBT', 'CELPE-Bras', 'DELE', 'DELF e DALF', 'TCF', 'Inburgering']);
  });

  it('mostra a régua do A1 ao C2', () => {
    const codigos = idiomas.querySelectorAll('#niveis .nivel__codigo').map((no) => no.text.trim());
    expect(codigos).toEqual(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
  });

  it('abre o pedido com os cursos escolhidos, no começo, no meio e no fim', () => {
    const fora = idiomas.querySelectorAll('main section:not(#idiomas) [data-abre-contato]');
    expect(fora.length).toBeGreaterThanOrEqual(3);
    for (const botao of fora) {
      expect(botao.getAttribute('data-servico')).toBe('idiomas');
      expect(botao.getAttribute('aria-haspopup')).toBe('dialog');
    }
  });

  it('mostra como pendência o que o site atual não afirma', () => {
    expect(idiomas.querySelector('#formatos mark.confirmar'), 'presencial').not.toBeNull();
    expect(idiomas.querySelector('#idiomas mark.confirmar'), 'quantidade de idiomas').not.toBeNull();
  });
});
