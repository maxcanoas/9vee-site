import { describe, expect, it } from 'vitest';
import { curso, listaDeCursos, nomeDoCurso, servico, telefoneInternacional, trilhaDeNavegacao } from '../../src/lib/jsonld';

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
    idiomas: [
      { slug: 'alemao', nome: 'Alemão' },
      { slug: 'ingles', nome: 'Inglês', pagina: '/curso-de-idiomas/ingles/' },
    ],
  });
  const [alemao, ingles] = lista.itemListElement.map((elemento) => elemento.item);

  it('aponta o curso sem página própria para a âncora do idioma', () => {
    expect(alemao.url).toBe('https://exemplo.9vee.com.br/curso-de-idiomas/#alemao');
    expect(alemao.name).toBe('Curso de alemão');
  });

  it('aponta o curso com página própria para ela', () => {
    expect(ingles.url).toBe('https://exemplo.9vee.com.br/curso-de-idiomas/ingles/');
  });

  it('tira a pendência da descrição que o Google lê', () => {
    expect(alemao.description).toBe('Alemão com a 9vee.');
  });
});

// O mesmo nome na lista de cursos, na página do idioma e na mensagem: o idioma em minúscula no meio da frase.
describe('nomeDoCurso', () => {
  it('põe o idioma no modelo, em minúscula', () => {
    expect(nomeDoCurso('Curso de {idioma}', 'Português para estrangeiros')).toBe('Curso de português para estrangeiros');
  });
});

describe('curso', () => {
  const no = curso(new URL('https://exemplo.9vee.com.br/'), {
    nome: 'Curso de inglês',
    descricao: 'Inglês para adultos [CONFIRMAR COM O ARTHUR: níveis] e para crianças.',
    caminho: '/curso-de-idiomas/ingles/',
  });

  it('usa endereços absolutos e liga o curso à organização', () => {
    expect(no['@type']).toBe('Course');
    expect(no['@id']).toBe('https://exemplo.9vee.com.br/curso-de-idiomas/ingles/#curso');
    expect(no.url).toBe('https://exemplo.9vee.com.br/curso-de-idiomas/ingles/');
    expect(no.provider).toEqual({ '@id': 'https://exemplo.9vee.com.br/#organizacao' });
  });

  it('tira a pendência do que o Google lê', () => {
    expect(no.name).toBe('Curso de inglês');
    expect(no.description).toBe('Inglês para adultos e para crianças.');
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
