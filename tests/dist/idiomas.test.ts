import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';
import { describe, expect, it } from 'vitest';
import { DIST, jsonLd } from './apoio';

const idiomas = parse(readFileSync(join(DIST, 'curso-de-idiomas', 'index.html'), 'utf8'));

/** Mesma limpeza que o textoPuro faz do lado do JSON-LD, para os dois textos ficarem comparáveis. */
const normalizar = (texto: string) =>
  texto
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:!?])/g, '$1')
    .trim();

describe('cursos de idiomas', () => {
  it('traz as seções na ordem do brief', () => {
    const secoes = idiomas.querySelectorAll('main > section').map((secao) => secao.getAttribute('id') ?? 'hero');
    expect(secoes).toEqual([
      'hero',
      'idiomas',
      'niveis',
      'formatos',
      'provas',
      'empresas',
      'como-comeca',
      'perguntas',
      'contato',
    ]);
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

  it('repete no FAQPage o mesmo FAQ que a página mostra', () => {
    const faq = jsonLd(idiomas).find((no) => no['@type'] === 'FAQPage');
    const doJson = faq?.mainEntity as { name: string; acceptedAnswer: { text: string } }[];
    const daPagina = idiomas.querySelectorAll('#perguntas details').map((item) => {
      const copia = parse(item.toString());
      // A etiqueta de pendência não entra no JSON-LD, então também sai daqui antes de comparar.
      copia.querySelectorAll('mark.confirmar').forEach((marca) => marca.remove());
      return {
        pergunta: normalizar(copia.querySelector('summary')?.text ?? ''),
        resposta: normalizar(copia.querySelector('.faq__resposta')?.text ?? ''),
      };
    });
    expect(daPagina.length).toBeGreaterThanOrEqual(4);
    expect(doJson.map((q) => ({ pergunta: q.name, resposta: q.acceptedAnswer.text }))).toEqual(daPagina);
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
    const fora = idiomas.querySelectorAll('main > section:not(#idiomas) [data-abre-contato]');
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
