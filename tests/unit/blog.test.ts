import { describe, expect, it } from 'vitest';
import { imagemOriginal, markdownDoPost, nomeDoArquivo, postDoHtml } from '../../scripts/blog.ts';
import { escreverCsv, lerCsv } from '../../scripts/csv.ts';

const URL_DO_POST = 'https://www.9vee.com.br/post/curso-de-holandes-em-curitiba';
const IMAGEM = 'https://static.wixstatic.com/media/nsplsh_34b3~mv2.jpg';

// O post como o Wix entrega: o JSON-LD, o título em h1 e o texto na seção do post, que termina no "MAIS VISITADOS".
const html = `<html><head>
<script type="application/ld+json">{"@type":"BlogPosting","datePublished":"2026-04-04T23:37:05.063Z",
"dateModified":"2026-04-16T21:54:43.984Z","headline":"Curso de Holandês","description":" Aprenda holandês.
",
"image":{"@type":"ImageObject","url":"${IMAGEM}/v1/fill/w_1000,h_667/foto.jpg"}}</script></head><body>
<h1 data-hook="post-title">Curso de Holandês em Curitiba - 9vee</h1>
<section data-hook="post-description"><div>
<figure><img src="${IMAGEM}/v1/fill/w_147,h_98,blur_2/foto.jpg" alt="x"><figcaption>Legenda</figcaption></figure>
<p><a href="https://www.9vee.com.br/#fale-conosco"><u><strong>FALE COM A GENTE -&gt;</strong></u></a></p>
<p>A <strong>9vee </strong>oferece&nbsp;aulas.<br>Segunda linha.</p>
<p><br></p>
<h2>Por que holandês</h2>
<ul><li><p>Trabalho;</p></li><li><p>Estudo.</p></li></ul>
<svg><line></line></svg>
<p>MAIS VISITADOS</p>
<p><a href="https://www.9vee.com.br/post/outro">Outro post</a></p>
</div></section></body></html>`;

describe('postDoHtml', () => {
  const post = postDoHtml(html, URL_DO_POST);

  it('lê o título, as datas, a descrição e as imagens em tamanho original', () => {
    expect(post).toMatchObject({
      titulo: 'Curso de Holandês em Curitiba - 9vee',
      url: URL_DO_POST,
      publicado: '2026-04-04',
      atualizado: '2026-04-16',
      descricao: 'Aprenda holandês.',
      imagens: [IMAGEM],
    });
  });

  it('converte o texto em Markdown e para no "MAIS VISITADOS"', () => {
    expect(post.corpo).toBe(
      [
        `![Legenda](${IMAGEM})`,
        '[**FALE COM A GENTE ->**](https://www.9vee.com.br/#fale-conosco)',
        'A **9vee** oferece aulas.\nSegunda linha.',
        '### Por que holandês',
        '- Trabalho;\n- Estudo.',
      ].join('\n\n'),
    );
  });

  it('lê as datas, a descrição e a capa das metatags quando o JSON-LD está quebrado', () => {
    const quebrado = html
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '<script type="application/ld+json">{"description":"a "b""}</script>')
      .replace(
        '</head>',
        `<meta property="og:description" content="Aprenda holandês."><meta property="og:image" content="${IMAGEM}/v1/fill/w_1000/foto.jpg">` +
          '<meta property="article:published_time" content="2026-07-03T15:35:46.552Z">' +
          '<meta property="article:modified_time" content="2026-07-04T10:00:00.000Z"></head>',
      );
    expect(postDoHtml(quebrado, URL_DO_POST)).toMatchObject({
      publicado: '2026-07-03',
      atualizado: '2026-07-04',
      descricao: 'Aprenda holandês.',
      imagens: [IMAGEM],
    });
  });

  it('recusa a página sem o texto do post', () => {
    expect(() => postDoHtml('<h1 data-hook="post-title">T</h1>', URL_DO_POST)).toThrow(/não tem o texto do post/);
  });

  it('grava os dados no cabeçalho do Markdown, que voltam iguais pelo JSON', () => {
    const md = markdownDoPost(post);
    expect(md).toMatch(/^---\ntitulo: "Curso de Holandês em Curitiba - 9vee"\n/);
    expect(md).toContain(`imagens:\n  - "${IMAGEM}"\n---\n\n# Curso de Holandês em Curitiba - 9vee\n\n![Legenda]`);
  });
});

describe('os nomes e os endereços', () => {
  it('dá ao arquivo o fim do endereço, sem acento', () => {
    expect(nomeDoArquivo('https://www.9vee.com.br/post/curso-de-alem%C3%A3o-em-porto-alegre')).toBe('curso-de-alemao-em-porto-alegre.md');
  });

  it('tira da imagem do Wix o recorte e o desfoque, e deixa outro endereço como está', () => {
    expect(imagemOriginal(`${IMAGEM}/v1/fill/w_147,blur_2/foto.jpg`)).toBe(IMAGEM);
    expect(imagemOriginal('https://exemplo.com/a.jpg')).toBe('https://exemplo.com/a.jpg');
  });
});

describe('CSV', () => {
  it('lê campo entre aspas com vírgula, aspa dobrada e quebra de linha, e escreve do mesmo jeito', () => {
    const texto = 'url,observacao\r\n/a,"É a ""Program List"", do Wix"\r\n/b,"duas\nlinhas"\r\n';
    const linhas = lerCsv(texto);
    expect(linhas).toEqual([
      { url: '/a', observacao: 'É a "Program List", do Wix' },
      { url: '/b', observacao: 'duas\nlinhas' },
    ]);
    expect(lerCsv(escreverCsv(['url', 'observacao'], linhas))).toEqual(linhas);
  });
});
