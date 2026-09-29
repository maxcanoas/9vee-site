import { describe, expect, it } from 'vitest';
import { listaDeCursos, servico, telefoneInternacional, trilhaDeNavegacao } from '../../src/lib/jsonld';

describe('telefoneInternacional', () => {
  it('escreve o número do WhatsApp no padrão internacional', () => {
    expect(telefoneInternacional('5511934661917')).toBe('+55 11 93466-1917');
  });

  it('também serve para telefone fixo, com 8 dígitos', () => {
    expect(telefoneInternacional('551134661917')).toBe('+55 11 3466-1917');
  });
});

describe('servico', () => {
  const no = servico(new URL('https://exemplo.9vee.com.br/'), {
    nome: 'Treinamento de NR-1',
    tipo: 'Treinamento corporativo',
    caminho: '/treinamento-nr-1/',
    descricao: 'Treinamento de NR-1 [CONFIRMAR COM A DANIELLA: carga horária] para RH e SESMT.',
  });

  it('usa endereços absolutos e liga o serviço à organização', () => {
    expect(no['@id']).toBe('https://exemplo.9vee.com.br/treinamento-nr-1/#servico');
    expect(no.url).toBe('https://exemplo.9vee.com.br/treinamento-nr-1/');
    expect(no.provider).toEqual({ '@id': 'https://exemplo.9vee.com.br/#organizacao' });
  });

  it('tira a pendência da descrição que o Google lê', () => {
    expect(no.description).toBe('Treinamento de NR-1 para RH e SESMT.');
  });
});

describe('listaDeCursos', () => {
  const lista = listaDeCursos(new URL('https://exemplo.9vee.com.br/'), {
    caminho: '/curso-de-idiomas/',
    modelos: { nome: 'Curso de {idioma}', descricao: '{idioma} com a 9vee [CONFIRMAR COM A DANIELLA: preço].' },
    idiomas: [{ slug: 'ingles', nome: 'Inglês' }],
  });
  const curso = lista.itemListElement[0].item;

  it('aponta cada curso para a âncora do idioma', () => {
    expect(curso.url).toBe('https://exemplo.9vee.com.br/curso-de-idiomas/#ingles');
    expect(curso.name).toBe('Curso de Inglês');
  });

  it('tira a pendência da descrição que o Google lê', () => {
    expect(curso.description).toBe('Inglês com a 9vee.');
  });
});

describe('trilhaDeNavegacao', () => {
  const trilha = trilhaDeNavegacao(new URL('https://exemplo.9vee.com.br/'), [
    { nome: 'Início', caminho: '/' },
    { nome: 'Cursos de Idiomas', caminho: '/curso-de-idiomas/' },
    { nome: 'Inglês [CONFIRMAR COM O ARTHUR: nome do curso]', caminho: '/curso-de-idiomas/ingles/' },
  ]);

  it('numera os passos a partir de 1, com o endereço absoluto de cada um', () => {
    expect(trilha['@type']).toBe('BreadcrumbList');
    expect(trilha.itemListElement.map((passo) => [passo.position, passo.item])).toEqual([
      [1, 'https://exemplo.9vee.com.br/'],
      [2, 'https://exemplo.9vee.com.br/curso-de-idiomas/'],
      [3, 'https://exemplo.9vee.com.br/curso-de-idiomas/ingles/'],
    ]);
  });

  it('tira a pendência do nome que o Google lê', () => {
    expect(trilha.itemListElement[2].name).toBe('Inglês');
  });
});
