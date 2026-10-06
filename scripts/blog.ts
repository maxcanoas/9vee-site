// O post do blog do Wix lido da página pública: título, datas, descrição e imagens do JSON-LD, e o texto da seção do
// post convertido em Markdown (ticket 14). Fica de fora o bloco "MAIS VISITADOS", que fecha todos os posts com uma
// lista de links para os outros.
import { parse, type HTMLElement, type Node } from 'node-html-parser';

export interface PostDoBlog {
  titulo: string;
  url: string;
  publicado: string;
  atualizado: string;
  descricao: string;
  imagens: string[];
  corpo: string;
}

const FIM_DO_POST = 'MAIS VISITADOS';

/** O endereço da imagem original no Wix, sem o recorte e o desfoque da versão que a página carrega primeiro. */
export function imagemOriginal(endereco: string): string {
  return endereco.replace(/^(https:\/\/static\.wixstatic\.com\/media\/[^/]+)\/v1\/.*$/, '$1');
}

/** O nome do arquivo do post: o fim do endereço, sem acento. */
export function nomeDoArquivo(url: string): string {
  const fim = decodeURIComponent(new URL(url).pathname.replace(/^\/post\//, '').replace(/\/$/, ''));
  return `${fim.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()}.md`;
}

const ehElemento = (no: Node): no is HTMLElement => no.nodeType === 1;
const semEspacoDuro = (texto: string) => texto.replace(/ /g, ' ');

/** Põe as marcas do Markdown em volta do texto, com o espaço das pontas do lado de fora: "**9vee** oferece". */
function envolver(texto: string, antes: string, depois: string): string {
  const [, inicio, miolo, fim] = /^(\s*)([\s\S]*?)(\s*)$/.exec(texto)!;
  return miolo ? `${inicio}${antes}${miolo}${depois}${fim}` : texto;
}

/** O texto de um trecho, com os links, o negrito e o itálico em Markdown. */
function emLinha(no: Node): string {
  if (!ehElemento(no)) return semEspacoDuro(no.text);
  const dentro = () => no.childNodes.map(emLinha).join('');
  switch (no.rawTagName?.toLowerCase()) {
    case 'br':
      return '\n';
    case 'a': {
      const href = no.getAttribute('href');
      return href ? envolver(dentro(), '[', `](${href})`) : dentro();
    }
    case 'strong':
    case 'b':
      return envolver(dentro(), '**', '**');
    case 'em':
    case 'i':
      return envolver(dentro(), '*', '*');
    case 'svg':
    case 'style':
    case 'script':
      return '';
    default:
      return dentro();
  }
}

const limparLinha = (texto: string) =>
  texto
    .split('\n')
    .map((linha) => linha.replace(/[ \t]+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');

/** Os blocos de Markdown de um trecho da página, na ordem. Devolve `true` em `fim` quando chega ao "MAIS VISITADOS". */
function emBlocos(no: Node, blocos: string[], imagens: string[]): boolean {
  if (!ehElemento(no)) {
    const texto = limparLinha(semEspacoDuro(no.text));
    if (texto) blocos.push(texto);
    return false;
  }
  const tag = no.rawTagName?.toLowerCase();
  if (tag === 'p' || /^h[1-6]$/.test(tag ?? '')) {
    const texto = limparLinha(emLinha(no));
    if (no.text.trim().toUpperCase() === FIM_DO_POST) return true;
    if (!texto) return false;
    // O título do post é o único h1 da página: um título no meio do texto desce um nível.
    blocos.push(tag === 'p' ? texto : `${'#'.repeat(Math.min(Number(tag![1]) + 1, 6))} ${texto.replace(/\n/g, ' ')}`);
    return false;
  }
  if (tag === 'ul' || tag === 'ol') {
    const filhos = no.childNodes.filter(ehElemento).filter((filho) => filho.rawTagName.toLowerCase() === 'li');
    const itens = filhos.map((item, i) => {
      const marcador = tag === 'ol' ? `${i + 1}.` : '-';
      return `${marcador} ${limparLinha(emLinha(item)).replace(/\n/g, ' ')}`;
    });
    if (itens.length > 0) blocos.push(itens.join('\n'));
    return false;
  }
  if (tag === 'figure' || tag === 'img') {
    const imagem = tag === 'img' ? no : no.querySelector('img');
    const src = imagem?.getAttribute('src');
    if (src) {
      const endereco = imagemOriginal(src);
      const legenda = (no.querySelector('figcaption')?.text ?? imagem?.getAttribute('alt') ?? '').trim();
      imagens.push(endereco);
      blocos.push(`![${legenda}](${endereco})`);
    }
    return false;
  }
  if (tag === 'blockquote') {
    const texto = limparLinha(emLinha(no));
    if (texto) blocos.push(texto.split('\n').map((linha) => `> ${linha}`).join('\n'));
    return false;
  }
  if (tag === 'hr') {
    blocos.push('---');
    return false;
  }
  if (tag === 'svg' || tag === 'style' || tag === 'script') return false;
  for (const filho of no.childNodes) if (emBlocos(filho, blocos, imagens)) return true;
  return false;
}

const soData = (iso: unknown) => (typeof iso === 'string' ? iso.slice(0, 10) : '');

/** O post lido do HTML da página pública dele. */
export function postDoHtml(html: string, url: string): PostDoBlog {
  const raiz = parse(html);
  const dados = raiz
    .querySelectorAll('script[type="application/ld+json"]')
    .flatMap((script) => {
      try {
        // A descrição de alguns posts traz a quebra de linha crua, que o JSON não aceita dentro do texto.
        return [JSON.parse(script.text.replace(/[\u0000-\u001f]/g, ' '))];
      } catch {
        return [];
      }
    })
    .find((no) => no['@type'] === 'BlogPosting');
  const secao = raiz.querySelector('section[data-hook="post-description"]');
  if (!secao) throw new Error(`${url}: a página não tem o texto do post`);
  const titulo = raiz.querySelector('h1[data-hook="post-title"]')?.text.trim() ?? dados?.headline ?? '';
  if (!titulo) throw new Error(`${url}: a página não tem o título do post`);
  const blocos: string[] = [];
  const imagensDoTexto: string[] = [];
  emBlocos(secao, blocos, imagensDoTexto);
  // As metatags trazem o mesmo que o JSON-LD, e valem quando ele não dá para ler: o de alguns posts tem uma aspa sem
  // escape na descrição.
  const meta = (propriedade: string) => raiz.querySelector(`meta[property="${propriedade}"]`)?.getAttribute('content');
  const capaDoPost = dados?.image?.url ?? meta('og:image');
  const capa = typeof capaDoPost === 'string' ? [imagemOriginal(capaDoPost)] : [];
  const descricao = dados?.description ?? meta('og:description');
  return {
    titulo,
    url,
    publicado: soData(dados?.datePublished ?? meta('article:published_time')),
    atualizado: soData(dados?.dateModified ?? meta('article:modified_time')),
    descricao: typeof descricao === 'string' ? descricao.trim() : '',
    imagens: [...new Set([...capa, ...imagensDoTexto])],
    corpo: blocos.join('\n\n'),
  };
}

/** O arquivo Markdown do post: os dados no cabeçalho, entre as linhas de três hífens, e o texto depois do título. */
export function markdownDoPost(post: PostDoBlog): string {
  const texto = (valor: string) => JSON.stringify(valor);
  return [
    '---',
    `titulo: ${texto(post.titulo)}`,
    `url: ${texto(post.url)}`,
    `publicado: ${texto(post.publicado)}`,
    `atualizado: ${texto(post.atualizado)}`,
    `descricao: ${texto(post.descricao)}`,
    post.imagens.length > 0 ? `imagens:\n${post.imagens.map((imagem) => `  - ${texto(imagem)}`).join('\n')}` : 'imagens: []',
    '---',
    '',
    `# ${post.titulo}`,
    '',
    post.corpo,
    '',
  ].join('\n');
}
