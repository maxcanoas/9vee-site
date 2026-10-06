import { describe, expect, it } from 'vitest';
import {
  CURSOS,
  INTERPRETACAO_DE_MANDARIM,
  comExcecao,
  destinoDe,
  problemasDoMapa,
  type SiteNovo,
  type UrlAntiga,
} from '../../scripts/redirecionamentos.ts';

// O site novo de mentira: as páginas principais e algumas de idioma publicadas (o sueco não).
const site: SiteNovo = {
  paginas: new Set([
    '/',
    '/quem-somos/',
    '/lms/',
    '/curso-de-idiomas/',
    '/traducao-simultanea/',
    INTERPRETACAO_DE_MANDARIM,
    '/treinamento-nr-1/',
    '/politica-de-privacidade/',
    '/curso-de-idiomas/ingles/',
    '/curso-de-idiomas/holandes/',
    '/curso-de-idiomas/mandarim/',
    '/curso-de-idiomas/alemao/',
  ]),
  cidades: [],
};
const semMandarim: SiteNovo = { ...site, paginas: new Set([...site.paginas].filter((p) => p !== '/curso-de-idiomas/mandarim/')) };

const pagina = (caminho: string): UrlAntiga => ({ caminho, tipo: 'pagina' });
const post = (fim: string): UrlAntiga => ({ caminho: `/post/${fim}`, tipo: 'post-do-blog' });
const doWix = (caminho: string, alvo: string): UrlAntiga => ({
  caminho,
  tipo: 'redirecionamento-no-wix',
  observacao: `Hoje o Wix redireciona para ${alvo}`,
});
const destino = (url: UrlAntiga, noSite = site) => {
  const { destino: para, tipo } = destinoDe(url, noSite);
  return `${tipo} ${para}`.trim();
};

describe('as sete URLs de mandarim', () => {
  it.each(['/mandarim-portugues', '/mandarim-english', '/mandarim-chines'])('%s, a landing de interpretação, vai para a página dela', (caminho) => {
    expect(destino(pagina(caminho))).toBe(`301 ${INTERPRETACAO_DE_MANDARIM}`);
  });

  it.each([
    ['/mandarim-pt', '/mandarim-portugues'],
    ['/mandarim-portugues-1', '/mandarim-chines'],
  ])('%s, que o Wix leva à landing, vai direto para a interpretação, sem corrente', (caminho, alvo) => {
    expect(destino(doWix(caminho, alvo))).toBe(`301 ${INTERPRETACAO_DE_MANDARIM}`);
  });

  it('leva /mandarim, o curso, e /blank-1, que o Wix leva a ele, à página do curso de mandarim publicada', () => {
    expect(destino(pagina('/mandarim'))).toBe('301 /curso-de-idiomas/mandarim/');
    expect(destino(doWix('/blank-1', '/mandarim'))).toBe('301 /curso-de-idiomas/mandarim/');
  });

  it('leva os dois à página de cursos quando a do mandarim não está publicada', () => {
    expect(destino(pagina('/mandarim'), semMandarim)).toBe(`301 ${CURSOS}`);
    expect(destino(doWix('/blank-1', '/mandarim'), semMandarim)).toBe(`301 ${CURSOS}`);
  });
});

describe('as páginas e os redirecionamentos do Wix', () => {
  it('mantém a home e o sitemap no mesmo endereço', () => {
    expect(destino(pagina('/'))).toBe('200 /');
    expect(destino({ caminho: '/sitemap.xml', tipo: 'sitemap' })).toBe('200 /sitemap.xml');
  });

  it('leva cada página ao equivalente com a barra no fim, e os treinamentos ao NR-1', () => {
    expect(destino(pagina('/lms'))).toBe('301 /lms/');
    expect(destino(pagina('/politica-de-privacidade'))).toBe('301 /politica-de-privacidade/');
    expect(destino(pagina('/treinamentos'))).toBe('301 /treinamento-nr-1/');
  });

  it('dá 410 ao termo de uso, ao blog, aos programas online e aos sitemaps do Wix', () => {
    expect(destino(pagina('/termo-de-uso'))).toBe('410');
    expect(destino(pagina('/blog'))).toBe('410');
    expect(destino({ caminho: '/challenges', tipo: 'lista-de-programas' })).toBe('410');
    expect(destino({ caminho: '/challenge-page/abc', tipo: 'programa-online' })).toBe('410');
    expect(destino({ caminho: '/blog-posts-sitemap.xml', tipo: 'sitemap' })).toBe('410');
  });

  it('segue o redirecionamento do Wix até o destino final', () => {
    expect(destino(doWix('/who-we-are', '/quem-somos'))).toBe('301 /quem-somos/');
    expect(destino(doWix('/terms-and-conditions', '/termo-de-uso'))).toBe('410');
  });

  it('recusa página ou tipo sem regra, e redirecionamento do Wix sem alvo', () => {
    expect(() => destinoDe(pagina('/pagina-nova'), site)).toThrow(/sem regra/);
    expect(() => destinoDe({ caminho: '/x', tipo: 'outro' }, site)).toThrow(/sem regra/);
    expect(() => destinoDe({ caminho: '/x', tipo: 'redirecionamento-no-wix' }, site)).toThrow(/sem o alvo/);
  });
});

describe('os posts do blog', () => {
  it.each([
    ['curso-de-ingles-em-curitiba', '301 /curso-de-idiomas/ingles/'],
    ['curso-preparatorio-para-toefl', '301 /curso-de-idiomas/ingles/'],
    ['curso-preparatorio-inburgering-em-recife', '301 /curso-de-idiomas/holandes/'],
    ['aulas-particulares-de-chines-em-sao-paulo', '301 /curso-de-idiomas/mandarim/'],
    ['curso-de-alem%C3%A3o-em-porto-alegre', '301 /curso-de-idiomas/alemao/'],
    ['curso-particular-de-sueco-em-sao-paulo', `301 ${CURSOS}`],
    ['aula-de-ingles-ou-espanhol-em-empresas', `301 ${CURSOS}`],
    ['melhor-escola-de-idiomas-em-sao-paulo', `301 ${CURSOS}`],
    ['traducao-simultanea-de-eventos-em-belem', '301 /traducao-simultanea/'],
    ['servico-de-interpretacao-simultanea-para-conferencias-em-natal', '301 /traducao-simultanea/'],
    ['lms-learning-management-system-em-curitiba', '301 /lms/'],
    ['professores-nativos', '410'],
  ])('%s: %s', (fim, esperado) => {
    expect(destino(post(fim))).toBe(esperado);
  });

  it('não confunde palavra dentro de outra: "russo" não está em "curso"', () => {
    expect(destino(post('curso-de-espanhol-em-maringa'))).toBe('301 /curso-de-idiomas/');
  });

  it('leva o post da cidade à página dela quando ela está publicada e cobre o serviço do post', () => {
    const comCuritiba: SiteNovo = {
      paginas: new Set([...site.paginas, '/cidades/curitiba/']),
      cidades: [{ caminho: '/cidades/curitiba/', termos: ['curitiba'], servicos: ['traducao'] }],
    };
    expect(destino(post('traducao-simultanea-de-eventos-em-curitiba'), comCuritiba)).toBe('301 /cidades/curitiba/');
    expect(destino(post('curso-de-ingles-em-curitiba'), comCuritiba)).toBe('301 /curso-de-idiomas/ingles/');
  });
});

describe('a exceção e a conferência do mapa', () => {
  const regra = destinoDe(post('professores-nativos'), site);

  it('troca a regra pela exceção escrita à mão', () => {
    expect(comExcecao(regra, '')).toEqual({ destino: '', tipo: '410' });
    expect(comExcecao(regra, ' /curso-de-idiomas/ ')).toEqual({ destino: CURSOS, tipo: '301' });
    expect(comExcecao(destinoDe(pagina('/lms'), site), '410')).toEqual({ destino: '', tipo: '410' });
  });

  it('acusa destino fora do site novo, corrente e 301 sem destino', () => {
    expect(
      problemasDoMapa(
        [
          { origem: '/a', destino: '/curso-de-idiomas/sueco/', tipo: '301', excecao: '' },
          { origem: '/b', destino: '/c', tipo: '301', excecao: '' },
          { origem: '/c', destino: '/lms/', tipo: '301', excecao: '' },
          { origem: '/d', destino: '', tipo: '301', excecao: '' },
          { origem: '/', destino: '/', tipo: '200', excecao: '' },
          { origem: '/e', destino: '', tipo: '410', excecao: '' },
        ],
        site,
      ),
    ).toEqual([
      '/a: /curso-de-idiomas/sueco/ não é página do build de produção',
      '/b: corrente, /c também redireciona',
      '/d: 301 sem destino',
    ]);
  });
});
