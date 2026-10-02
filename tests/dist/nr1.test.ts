import { describe, expect, it } from 'vitest';
import { abrirPagina, conferirFiguraEmArco, conferirServico } from './apoio';

const nr1 = abrirPagina('treinamento-nr-1');

describe('treinamento de NR-1', () => {
  it('traz as oito seções do brief, na ordem', () => {
    // O hero é a única seção sem id: nada aponta para ele.
    const secoes = nr1.querySelectorAll('main section').map((secao) => secao.getAttribute('id') ?? 'hero');
    expect(secoes).toEqual([
      'hero',
      'por-que-agora',
      'o-que-recebe',
      'modulos',
      'formato',
      'abordagem',
      'perguntas',
      'contato',
    ]);
  });

  it('cita as fontes oficiais no "por que agora"', () => {
    const hrefs = nr1.querySelectorAll('#por-que-agora a[target="_blank"]').map((a) => a.getAttribute('href') ?? '');
    expect(hrefs.filter((h) => h.startsWith('https://www.gov.br/trabalho-e-emprego/')).length).toBeGreaterThanOrEqual(2);
    expect(hrefs.some((h) => h.startsWith('https://www.planalto.gov.br/'))).toBe(true);
  });

  it('não promete conformidade com a norma', () => {
    const texto = nr1.querySelector('main')?.text.replace(/\s+/g, ' ') ?? '';
    expect(texto).toMatch(/A avaliação dos riscos e o PGR continuam com a empresa e o SESMT/);
    expect(texto).not.toMatch(/em conformidade|garante a conformidade|deixa a empresa em dia com a NR-1\./);
  });

  it('abre o pedido com o treinamento já escolhido, no começo, no meio e no fim', () => {
    const botoes = nr1.querySelectorAll('main [data-abre-contato]');
    expect(botoes.length).toBeGreaterThanOrEqual(3);
    for (const botao of botoes) {
      expect(botao.getAttribute('data-servico')).toBe('nr1');
      expect(botao.getAttribute('aria-haspopup')).toBe('dialog');
    }
  });

  it('descreve o serviço em JSON-LD, ligado à organização', () => {
    conferirServico(nr1, { nome: 'Treinamento de NR-1', caminho: '/treinamento-nr-1/' });
  });

  it('mostra as pendências do NR-1 como etiqueta, e não como texto cru', () => {
    const etiquetas = nr1.querySelectorAll('main mark.confirmar');
    expect(etiquetas.length).toBeGreaterThanOrEqual(5);
    for (const secao of ['#formato', '#o-que-recebe']) {
      expect(nr1.querySelector(`${secao} mark.confirmar`), `sem pendência em ${secao}`).not.toBeNull();
    }
  });

  it('traz a figura do hero com o texto alternativo definitivo', () => {
    conferirFiguraEmArco(nr1.querySelector('main .figura'), /^IMG-NR1-HERO$/);
  });
});
