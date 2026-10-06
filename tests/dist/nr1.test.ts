import { describe, expect, it } from 'vitest';
import { abrirPagina, conferirFiguraEmArco, conferirServico, textoDe, textosDe } from './apoio';

const nr1 = abrirPagina('treinamento-nr-1');

describe('treinamento de NR-1', () => {
  it('traz as seções do brief e as do site atual, na ordem', () => {
    // O hero é a única seção sem id: nada aponta para ele.
    const secoes = nr1.querySelectorAll('main section').map((secao) => secao.getAttribute('id') ?? 'hero');
    expect(secoes).toEqual([
      'hero',
      'por-que-agora',
      'o-que-recebe',
      'temas',
      'modulos',
      'beneficios',
      'formato',
      'abordagem',
      'perguntas',
      'contato',
    ]);
  });

  it('diz o objetivo do treinamento e lista os seis temas do site atual, com a Comunicação Não Violenta', () => {
    expect(textoDe(nr1, '#temas .cabeca__apoio')).toMatch(/^O objetivo é /);
    const temas = textosDe(nr1, '#temas dt');
    expect(temas).toHaveLength(6);
    expect(temas).toContain('Comunicação Não Violenta');
    expect(textoDe(nr1, '#temas')).toContain('CNV');
  });

  it('traz os dois blocos de benefícios, os do treinamento e os de quem investe', () => {
    const blocos = nr1.querySelectorAll('#beneficios .grupos__grupo');
    expect(blocos.map((bloco) => bloco.querySelector('h3')?.text.trim())).toEqual([
      'Com o treinamento',
      'Para quem investe em NR-1',
    ]);
    for (const bloco of blocos) expect(bloco.querySelectorAll('li')).toHaveLength(3);
    const texto = textoDe(nr1, '#beneficios');
    for (const fato of ['riscos psicossociais', 'cooperação entre as áreas', 'burnout', 'responsabilidade compartilhada']) {
      expect(texto).toContain(fato);
    }
  });

  it('diz no módulo 2 o que o site atual diz dele', () => {
    const modulos = textosDe(nr1, '#modulos .modulo');
    expect(modulos).toHaveLength(3);
    expect(modulos[1]).toContain('Liderança, comunicação com equipes comerciais e cultura da empresa.');
  });

  // As duas frases jurídicas da página atual ficaram fora por decisão de 01/10/2026.
  it('não repete as duas frases jurídicas do site atual', () => {
    const texto = textoDe(nr1, 'main');
    expect(texto).not.toMatch(/2046|aç(ão|ões) trabalhistas?|disputa judicial|prova de boas práticas/i);
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

  // O formato, a carga horária e a turma foram respondidos em 05/10/2026 (perguntas 9 a 11). Seguem como pendência
  // o plano de ação, o comprovante, a turma inteira e o regulamento da Lei 14.831, que ainda não foram à 9vee.
  it('mostra as pendências que restam como etiqueta, e não como texto cru', () => {
    expect(nr1.querySelector('#formato mark.confirmar')).toBeNull();
    expect(nr1.querySelectorAll('#o-que-recebe mark.confirmar')).toHaveLength(2);
    expect(nr1.querySelectorAll('main mark.confirmar')).toHaveLength(4);
  });

  it('descreve os dois treinamentos e o presencial em todo o Brasil', () => {
    const formato = nr1.querySelectorAll('#formato dt').map((dt) => dt.text.trim());
    expect(formato).toEqual(['Como acontece', 'Workshop normativo', 'Curso formativo']);
    const texto = nr1.querySelector('#formato')?.text.replace(/\s+/g, ' ') ?? '';
    for (const fato of ['em qualquer cidade do Brasil', 'para até 70 pessoas', 'Cerca de 9 horas', 'Até 35 pessoas']) {
      expect(texto, fato).toContain(fato);
    }
  });

  it('cita o Sicredi no FAQ, sem logo', () => {
    const faq = nr1.querySelector('.faq')?.text.replace(/\s+/g, ' ') ?? '';
    expect(faq).toContain('O Sicredi fez com a 9vee um programa de capacitação para gerentes de agência');
    expect(nr1.querySelector('.faq svg[aria-label*="Sicredi"], .faq img[alt*="Sicredi"]')).toBeNull();
  });

  it('traz a figura do hero com o texto alternativo definitivo', () => {
    conferirFiguraEmArco(nr1.querySelector('main .figura'), /^IMG-NR1-HERO$/);
  });
});
