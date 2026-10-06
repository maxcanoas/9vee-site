import { describe, expect, it } from 'vitest';
import { lerCsv } from '../../scripts/csv.ts';
import { montarHtaccess, padraoDaOrigem, regrasDoMapa } from '../../scripts/htaccess.ts';
import { redirecionamentosQuebrados } from '../../scripts/trava-producao.ts';
import { montarBuild } from './build-de-mentira.ts';

// Um pedaço do docs/redirects.csv, com as colunas que o gerador lê.
const MAPA = lerCsv(
  [
    'origem,tipo_antigo,motivo,excecao,destino,tipo',
    '/,pagina,o mesmo endereço,,/,200',
    '/lms,pagina,a página equivalente,,/lms/,301',
    '/mandarim-pt,redirecionamento-no-wix,"o Wix leva a /mandarim-portugues; a página equivalente",,/traducao-simultanea/mandarim/,301',
    '/post/curso-de-alem%C3%A3o-em-porto-alegre,post-do-blog,post sobre curso de alemao,,/curso-de-idiomas/alemao/,301',
    '/blog-posts-sitemap.xml,sitemap,sitemap do Wix,,,410',
    '/sitemap.xml,sitemap,o sitemap do site novo,,/sitemap.xml,200',
  ].join('\n'),
).map(({ origem, destino, tipo }) => ({ origem, destino, tipo }));

describe('padraoDaOrigem', () => {
  it('compara o caminho inteiro, sem a barra do começo, decodificado e com o ponto escapado', () => {
    expect(padraoDaOrigem('/lms')).toBe('^lms$');
    expect(padraoDaOrigem('/post/curso-de-alem%C3%A3o-em-porto-alegre')).toBe('^post/curso-de-alemão-em-porto-alegre$');
    expect(padraoDaOrigem('/blog-posts-sitemap.xml')).toBe('^blog-posts-sitemap\\.xml$');
  });
});

describe('regrasDoMapa', () => {
  it('leva o 301 ao destino completo, dá 410 com a flag G e não escreve regra para o 200', () => {
    expect(regrasDoMapa(MAPA)).toEqual([
      'RewriteRule ^lms$ https://www.9vee.com.br/lms/ [R=301,L]',
      'RewriteRule ^mandarim-pt$ https://www.9vee.com.br/traducao-simultanea/mandarim/ [R=301,L]',
      'RewriteRule ^post/curso-de-alemão-em-porto-alegre$ https://www.9vee.com.br/curso-de-idiomas/alemao/ [R=301,L]',
      'RewriteRule ^blog-posts-sitemap\\.xml$ - [G,L]',
    ]);
  });

  it('recusa o 301 sem destino', () => {
    expect(() => regrasDoMapa([{ origem: '/x', destino: '', tipo: '301' }])).toThrow(/sem destino válido/);
  });
});

describe('montarHtaccess', () => {
  const htaccess = montarHtaccess(MAPA);
  const posicao = (trecho: string) => htaccess.indexOf(trecho);

  it('põe o mapa antes do domínio canônico e da barra no fim, para a URL antiga chegar num salto só', () => {
    expect(posicao('RewriteRule ^lms$')).toBeGreaterThan(posicao('RewriteEngine On'));
    expect(posicao('RewriteRule ^lms$')).toBeLessThan(posicao('RewriteCond %{HTTPS} off [OR]'));
    expect(posicao('RewriteCond %{HTTPS} off [OR]')).toBeLessThan(posicao('RewriteRule ^(.+[^/])$'));
  });

  it('força https e www, e põe a barra no fim só quando a pasta tem a página', () => {
    expect(htaccess).toContain('RewriteCond %{HTTP_HOST} !^www\\.9vee\\.com\\.br$ [NC]\nRewriteRule ^ https://www.9vee.com.br%{REQUEST_URI} [R=301,L]');
    expect(htaccess).toContain('RewriteCond %{REQUEST_FILENAME}/index.html -f\nRewriteRule ^(.+[^/])$ https://www.9vee.com.br/$1/ [R=301,L]');
  });

  it('usa a página de erro do site no 404 e no 410, comprime o texto e dá cache longo só ao /_astro/', () => {
    expect(htaccess).toContain('ErrorDocument 404 /404.html\nErrorDocument 410 /404.html');
    expect(htaccess).toMatch(/AddOutputFilterByType DEFLATE text\/html text\/css/);
    expect(htaccess).toContain('<If "%{REQUEST_URI} =~ m#^/_astro/#">\n    Header set Cache-Control "public, max-age=31536000, immutable"');
    expect(htaccess).toContain('# O mapa de redirecionamentos: 3 endereços em 301 e 1 em 410.');
  });
});

describe('redirecionamentosQuebrados', () => {
  it('acusa o 301 que leva a uma página fora do build, e deixa as regras gerais de fora', () => {
    const pasta = montarBuild({
      'lms/index.html': '',
      '.htaccess': montarHtaccess([
        { origem: '/lms', destino: '/lms/', tipo: '301' },
        { origem: '/post/x', destino: '/curso-de-idiomas/sueco/', tipo: '301' },
        { origem: '/blog', destino: '', tipo: '410' },
      ]),
    });
    expect(redirecionamentosQuebrados(pasta)).toEqual(['^post/x$ leva a /curso-de-idiomas/sueco/, que não está no build']);
  });

  it('não acusa nada no build sem .htaccess, como o de preview', () => {
    expect(redirecionamentosQuebrados(montarBuild({ 'index.html': '' }))).toEqual([]);
  });
});
