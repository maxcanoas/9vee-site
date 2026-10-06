import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { imagemDePrevia } from '../../scripts/compartilhamento.ts';
import { imagemDaPagina, textoDaImagem } from '../../src/lib/compartilhamento.ts';

describe('imagemDaPagina', () => {
  it('dá a cada página um arquivo em /compartilhar/, com o nome tirado do endereço', () => {
    expect(imagemDaPagina('/')).toBe('/compartilhar/inicio.jpg');
    expect(imagemDaPagina('/lms/')).toBe('/compartilhar/lms.jpg');
    expect(imagemDaPagina('/curso-de-idiomas/ingles/')).toBe('/compartilhar/curso-de-idiomas-ingles.jpg');
  });
});

describe('textoDaImagem', () => {
  it('tira o nome da marca do título, no fim ou no começo', () => {
    expect(textoDaImagem('Quem somos | 9vee', '9vee')).toBe('Quem somos');
    expect(textoDaImagem('9vee | Idiomas, tradução simultânea e treinamento de NR-1', '9vee')).toBe(
      'Idiomas, tradução simultânea e treinamento de NR-1',
    );
    expect(textoDaImagem('Treinamento de NR-1: saúde mental e riscos psicossociais', '9vee')).toBe(
      'Treinamento de NR-1: saúde mental e riscos psicossociais',
    );
  });
});

// A primeira chamada de texto do sharp carrega as fontes do sistema, e com a suíte inteira em paralelo isso já passou
// dos 5 s padrão uma vez em seis rodadas (06/10/2026).
describe('imagemDePrevia', { timeout: 30_000 }, () => {
  it('gera um JPEG de 1200 × 630, com o texto escapado para a marcação da fonte', async () => {
    const { format, width, height } = await sharp(await imagemDePrevia('Cursos & idiomas <para você>')).metadata();
    expect([format, width, height]).toEqual(['jpeg', 1200, 630]);
  });

  it('recusa o título que não cabe em três linhas nem no menor tamanho', async () => {
    await expect(imagemDePrevia('Um título comprido demais '.repeat(8))).rejects.toThrow(/não cabe em 3 linhas/);
  });
});
