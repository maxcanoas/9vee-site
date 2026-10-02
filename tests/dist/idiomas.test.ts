import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';
import { describe, expect, it } from 'vitest';
import { DIST, jsonLd, paginasDeIdiomaNoConteudo, textoDe, textosDe } from './apoio';

const idiomas = parse(readFileSync(join(DIST, 'curso-de-idiomas', 'index.html'), 'utf8'));
// A lista só leva à página de idioma publicada.
const enderecoDoIdioma = new Map(
  paginasDeIdiomaNoConteudo()
    .filter((pagina) => pagina.publicada)
    .map((pagina) => [pagina.idioma, pagina.rota]),
);

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
      'realocacao',
      'plataforma',
      'como-comeca',
      'perguntas',
      'contato',
    ]);
  });

  // A realocação e a ponte para o LMS são da empresa: ficam no bloco dela, e trocam de lugar junto com ele.
  it('apresenta a realocação de funcionários e leva ao LMS dentro do bloco da empresa', () => {
    const daEmpresa = idiomas.querySelectorAll('.modalidades > *')[1];
    expect(daEmpresa.querySelectorAll('section').map((secao) => secao.getAttribute('id'))).toEqual([
      'empresas',
      'realocacao',
      'plataforma',
    ]);
    expect(textosDe(idiomas, '#realocacao .chamada__ponto')).toEqual([
      'Idioma',
      'Orientação sobre legislação',
      'Documentação',
      'Adaptação cultural',
    ]);
    expect(textoDe(idiomas, '#realocacao')).toContain('para o colaborador e a família');
    expect(idiomas.querySelector('#plataforma a')?.getAttribute('href')).toBe('/lms/');
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

  it('leva o idioma com página publicada a ela, e dá aos outros um botão que já manda o idioma para o pedido', () => {
    const itens = idiomas.querySelectorAll('#idiomas .familia__item');
    expect(itens).toHaveLength(14);
    for (const item of itens) {
      const slug = item.getAttribute('id');
      const pagina = enderecoDoIdioma.get(slug ?? '');
      if (pagina) {
        expect(item.querySelector('a.idioma')?.getAttribute('href'), slug ?? '').toBe(pagina);
        expect(item.querySelector('[data-abre-contato]'), slug ?? '').toBeNull();
        continue;
      }
      const botao = item.querySelector('[data-abre-contato]');
      expect(botao?.tagName, slug ?? '').toBe('BUTTON');
      expect(botao?.getAttribute('data-servico')).toBe('idiomas');
      expect(botao?.getAttribute('data-idioma')).toBe(slug);
    }
  });

  // O link para a página do idioma funciona sem JavaScript; o botão do pedido, não.
  it('mantém a lista de idiomas à vista sem JavaScript', () => {
    expect(idiomas.querySelectorAll('#idiomas noscript')).toHaveLength(14 - enderecoDoIdioma.size);
  });

  it('descreve os 14 cursos em JSON-LD, cada um na página dele ou na própria âncora', () => {
    const lista = jsonLd(idiomas).find((no) => no['@type'] === 'ItemList');
    const itens = lista?.itemListElement as { position: number; item: Record<string, string> }[];
    expect(itens).toHaveLength(14);
    expect(itens.map((i) => i.position)).toEqual(Array.from({ length: 14 }, (_, i) => i + 1));
    const rotas = [...enderecoDoIdioma.values()];
    for (const { item } of itens) {
      expect(item['@type']).toBe('Course');
      expect(item.name).toMatch(/^Curso de .+/);
      const { hash, pathname } = new URL(item.url);
      if (!hash) {
        expect(rotas, `${item.url} não é página de idioma`).toContain(pathname);
        continue;
      }
      expect(idiomas.getElementById(hash.slice(1)), `âncora ${hash} do JSON-LD não existe`).not.toBeNull();
    }
    expect(itens.filter(({ item }) => !new URL(item.url).hash)).toHaveLength(rotas.length);
  });

  it('lista os seis exames que o site atual prepara', () => {
    expect(textosDe(idiomas, '#provas .acordeao__nome')).toEqual([
      'TOEFL iBT',
      'CELPE-Bras',
      'DELE',
      'DELF e DALF',
      'TCF',
      'Inburgering',
    ]);
  });

  // O <details> abre sem JavaScript, e o texto de dentro está no HTML: o Google lê fechado mesmo. Não é pergunta
  // frequente: fica fora do .faq, que o FAQPage repete.
  it('abre em cada exame o texto completo dele, com o preparatório', () => {
    const exames = idiomas.querySelectorAll('#provas details');
    expect(exames).toHaveLength(6);
    for (const exame of exames) {
      const nome = exame.querySelector('.acordeao__nome')?.text.trim();
      expect(exame.querySelectorAll('.acordeao__detalhe p').length, nome).toBeGreaterThanOrEqual(2);
      expect(exame.querySelector('.acordeao__detalhe')?.text, nome).toContain('preparatório');
    }
    expect(idiomas.querySelectorAll('#provas .faq')).toHaveLength(0);
    expect(textoDe(idiomas, '#provas .cabeca__apoio')).toContain('imigração');
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

  // A aula presencial o site atual afirma: a pendência é só das cidades. A quantidade de idiomas tem dois números
  // no site atual, o da lista e o da parte de empresas.
  it('mostra como pendência o que o site atual não afirma', () => {
    expect(textoDe(idiomas, '#formatos .cartoes__nota')).toMatch(/^Também há aula presencial/);
    expect(idiomas.querySelector('#formatos mark.confirmar'), 'cidades da aula presencial').not.toBeNull();
    expect(idiomas.querySelector('#idiomas mark.confirmar'), 'quantidade de idiomas').not.toBeNull();
    expect(idiomas.querySelector('#empresas mark.confirmar'), 'os 12 idiomas da parte de empresas').not.toBeNull();
  });
});
