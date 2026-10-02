import { describe, expect, it } from 'vitest';
import { enderecoDoCurso, entraNoBuild, publicadaNoArquivo } from '../../src/lib/publicacao';

describe('entraNoBuild', () => {
  it('põe a página no local e no preview, publicada ou não', () => {
    for (const modo of ['local', 'preview'] as const) {
      expect(entraNoBuild({ publicada: false }, modo)).toBe(true);
      expect(entraNoBuild({ publicada: true }, modo)).toBe(true);
    }
  });

  it('deixa a página não publicada fora da produção', () => {
    expect(entraNoBuild({ publicada: false }, 'producao')).toBe(false);
    expect(entraNoBuild({ publicada: true }, 'producao')).toBe(true);
  });
});

// A home e a página de interpretação de mandarim levam ao curso de um idioma por este endereço.
describe('enderecoDoCurso', () => {
  const publicados = new Map([['ingles', '/curso-de-idiomas/ingles/']]);

  it('leva à página do idioma quando ela está publicada', () => {
    expect(enderecoDoCurso(publicados, 'ingles')).toBe('/curso-de-idiomas/ingles/');
  });

  it('sem página publicada, leva à âncora do idioma na página de cursos', () => {
    expect(enderecoDoCurso(publicados, 'mandarim')).toBe('/curso-de-idiomas/#mandarim');
  });
});

// A trava de produção lê os arquivos de content/ direto, sem o Astro: ela precisa da marca sem o esquema.
describe('publicadaNoArquivo', () => {
  it('lê a marca do frontmatter', () => {
    expect(publicadaNoArquivo('---\nidioma: "ingles"\npublicada: false\n---\n')).toBe(false);
    expect(publicadaNoArquivo('---\npublicada: true\nidioma: "ingles"\n---\n')).toBe(true);
  });

  it('conta como publicada a página sem a marca, como as do menu', () => {
    expect(publicadaNoArquivo('---\nseo:\n  titulo: "LMS | 9vee"\n---\n')).toBe(true);
  });

  it('só lê a marca do primeiro nível do frontmatter, fora de comentário e do corpo', () => {
    const arquivo = '---\n# publicada: false até o Arthur responder\nfaq:\n  publicada: false\n---\npublicada: false\n';
    expect(publicadaNoArquivo(arquivo)).toBe(true);
  });

  it('aceita o fim de linha do Windows', () => {
    expect(publicadaNoArquivo('---\r\npublicada: false\r\n---\r\n')).toBe(false);
  });
});
