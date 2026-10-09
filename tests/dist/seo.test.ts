import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  DIST,
  DIST_PRODUCAO,
  DOMINIO,
  INTERPRETACAO_DE_MANDARIM,
  abrirPagina,
  carregarPaginas,
  paginasComPublicacaoNoConteudo,
} from './apoio';

// O SEO final (ticket 15): o sitemap da produção, o favicon completo, a verificação do Search Console e o link da
// interpretação de mandarim só no rodapé. E a imagem de compartilhamento de cada página (ticket 18).
const producao = carregarPaginas(DIST_PRODUCAO);
const preview = carregarPaginas();
const VERIFICACAO = 'pn_hIzMzIKPctgmpkHXWDAaBlJQPbNxFKKO6s8ZyvCg';

describe('sitemap', () => {
  const xml = readFileSync(join(DIST_PRODUCAO, 'sitemap.xml'), 'utf8');
  const enderecos = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, endereco]) => endereco);

  it('lista cada página da produção, no domínio definitivo, sem a página de erro', () => {
    const esperados = producao.filter(({ rota }) => rota !== '/404').map(({ rota }) => `${DOMINIO}${rota}`);
    expect(enderecos.sort()).toEqual(esperados.sort());
  });

  it('traz a interpretação de mandarim desde o lançamento', () => {
    expect(enderecos).toContain(`${DOMINIO}${INTERPRETACAO_DE_MANDARIM}`);
  });

  // Desde 09/10/2026 (respostas 5 e 17 da segunda rodada v2), as páginas de idioma e de cidade estão todas publicadas.
  // A regra continua valendo para a próxima que entrar sem texto.
  it('traz a página de idioma ou de cidade publicada, e deixa fora a não publicada', () => {
    for (const { rota, publicada } of paginasComPublicacaoNoConteudo()) {
      if (publicada) expect(enderecos).toContain(`${DOMINIO}${rota}`);
      else expect(enderecos).not.toContain(`${DOMINIO}${rota}`);
    }
  });

  it('não existe no preview, que não vai para o Google', () => {
    expect(existsSync(join(DIST, 'sitemap.xml'))).toBe(false);
  });
});

describe('favicon', () => {
  // Cada arquivo do favicon e o lado que ele tem que ter.
  it.each([
    ['favicon-32.png', 32],
    ['apple-touch-icon.png', 180],
    ['icone-192.png', 192],
    ['icone-512.png', 512],
  ])('%s tem %i px de lado', async (arquivo, lado) => {
    const { width, height, format } = await sharp(join(DIST_PRODUCAO, arquivo)).metadata();
    expect([format, width, height]).toEqual(['png', lado, lado]);
  });

  it('tem o favicon.ico na raiz, com os PNG de 16, 32 e 48 dentro', () => {
    const ico = readFileSync(join(DIST_PRODUCAO, 'favicon.ico'));
    expect([ico.readUInt16LE(0), ico.readUInt16LE(2)]).toEqual([0, 1]);
    const lados = Array.from({ length: ico.readUInt16LE(4) }, (_, i) => {
      const entrada = 6 + 16 * i;
      const inicio = ico.readUInt32LE(entrada + 12);
      expect(ico.subarray(inicio, inicio + 4).toString('latin1')).toBe('\x89PNG');
      return ico.readUInt8(entrada);
    });
    expect(lados).toEqual([16, 32, 48]);
  });

  it('tem o manifesto com o nome da marca e os ícones de 192 e 512', () => {
    const manifesto = JSON.parse(readFileSync(join(DIST_PRODUCAO, 'manifest.webmanifest'), 'utf8'));
    expect(manifesto).toMatchObject({ name: '9vee', lang: 'pt-BR', start_url: '/', display: 'browser' });
    for (const { src } of manifesto.icons) expect(existsSync(join(DIST_PRODUCAO, src))).toBe(true);
    expect(manifesto.icons.map(({ sizes }: { sizes: string }) => sizes)).toEqual(['192x192', '512x512', '512x512']);
  });

  it.each(preview.map((p) => [p.rota, p] as const))('%s aponta o SVG, o PNG de 32, o ícone do iPhone e o manifesto', (_rota, { raiz }) => {
    const links = raiz.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"], link[rel="manifest"]');
    expect(links.map((link) => `${link.getAttribute('rel')} ${link.getAttribute('href')}`)).toEqual([
      'icon /favicon-32.png',
      'icon /favicon.svg',
      'apple-touch-icon /apple-touch-icon.png',
      'manifest /manifest.webmanifest',
    ]);
    for (const link of links) expect(existsSync(join(DIST, link.getAttribute('href')!))).toBe(true);
  });
});

describe('verificação do Search Console', () => {
  it.each(producao.map((p) => [p.rota, p] as const))('%s leva a meta tag que o Wix usa hoje', (_rota, { raiz }) => {
    expect(raiz.querySelector('meta[name="google-site-verification"]')?.getAttribute('content')).toBe(VERIFICACAO);
  });

  it('fica fora do preview', () => {
    for (const { rota, raiz } of preview) {
      expect(raiz.querySelector('meta[name="google-site-verification"]'), rota).toBeNull();
    }
  });
});

// A prévia de cada página (ticket 18): a imagem com o título dela, gerada no build, nos dois builds.
describe.each([
  ['preview', DIST, preview],
  ['produção', DIST_PRODUCAO, producao],
] as const)('imagem de compartilhamento no build de %s', (_build, pasta, paginas) => {
  const internas = paginas.filter(({ rota }) => rota !== '/404');

  it.each(internas.map((p) => [p.rota, p] as const))('%s aponta a própria imagem, com o título sem a marca no texto', async (rota, { raiz }) => {
    const nome = rota.split('/').filter(Boolean).join('-') || 'inicio';
    expect(raiz.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(`${DOMINIO}/compartilhar/${nome}.jpg`);
    const titulo = raiz.querySelector('title')!.text;
    const texto = raiz.querySelector('meta[property="og:image:alt"]')?.getAttribute('content');
    expect(texto).toBe(titulo.split(' | ').filter((parte) => parte !== '9vee').join(' | '));
    const { format, width, height } = await sharp(join(pasta, 'compartilhar', `${nome}.jpg`)).metadata();
    expect([format, width, height]).toEqual(['jpeg', 1200, 630]);
  });

  it('deixa a página de erro com a prévia geral, e não gera imagem que nenhuma página aponta', () => {
    const erro = paginas.find(({ rota }) => rota === '/404')!.raiz;
    expect(erro.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(`${DOMINIO}/og.jpg`);
    expect(erro.querySelector('meta[property="og:image:alt"]')?.getAttribute('content')).toBe('9vee');
    expect(readdirSync(join(pasta, 'compartilhar')).length).toBe(internas.length);
  });
});

describe('interpretação de mandarim no rodapé', () => {
  const home = abrirPagina('');

  it('aparece no fim do grupo Empresas do rodapé', () => {
    const empresas = home.querySelectorAll('footer [aria-labelledby="rodape-empresas"] a');
    expect(empresas.at(-1)?.getAttribute('href')).toBe(INTERPRETACAO_DE_MANDARIM);
    expect(empresas.at(-1)?.text.trim()).toBe('Interpretação de mandarim');
  });

  it('fica fora do menu e dos caminhos da página de erro', () => {
    const erro = carregarPaginas().find(({ rota }) => rota === '/404')!.raiz;
    expect(home.querySelector(`header a[href="${INTERPRETACAO_DE_MANDARIM}"]`)).toBeNull();
    expect(erro.querySelector(`main a[href="${INTERPRETACAO_DE_MANDARIM}"]`)).toBeNull();
  });
});
