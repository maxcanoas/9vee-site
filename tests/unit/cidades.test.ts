import { describe, expect, it } from 'vitest';
import { caminhoDaCidade, ligarCidades } from '../../src/lib/cidades';

describe('caminhoDaCidade', () => {
  it('põe a página da cidade na raiz e a de tradução dentro da Tradução Simultânea', () => {
    expect(caminhoDaCidade('sao-paulo', 'cidade')).toBe('/sao-paulo/');
    expect(caminhoDaCidade('curitiba', 'traducao')).toBe('/traducao-simultanea/curitiba/');
  });
});

describe('ligarCidades', () => {
  const publicadas = new Map([
    ['São Paulo', '/sao-paulo/'],
    ['Rio de Janeiro', '/rio-de-janeiro/'],
  ]);

  it('liga o nome de cada cidade publicada à página dela', () => {
    expect(ligarCidades('Aula presencial em São Paulo e no Rio de Janeiro.', publicadas)).toBe(
      'Aula presencial em [São Paulo](/sao-paulo/) e no [Rio de Janeiro](/rio-de-janeiro/).',
    );
  });

  it('liga só a primeira vez que o nome aparece', () => {
    expect(ligarCidades('São Paulo, e de novo São Paulo.', publicadas)).toBe('[São Paulo](/sao-paulo/), e de novo São Paulo.');
  });

  it('não mexe no nome dentro de um link ou de uma pendência', () => {
    const texto = 'Veja [as turmas de São Paulo](#empresas). [CONFIRMAR: os eventos em São Paulo]';
    expect(ligarCidades(texto, publicadas)).toBe(texto);
  });

  it('não liga o nome dentro de outra palavra', () => {
    expect(ligarCidades('Na Grande São Paulono não existe.', publicadas)).toBe('Na Grande São Paulono não existe.');
  });

  it('deixa o texto como está sem cidade publicada', () => {
    expect(ligarCidades('Aula presencial em São Paulo.', new Map())).toBe('Aula presencial em São Paulo.');
  });
});
