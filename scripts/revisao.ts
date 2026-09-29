// O texto das páginas para a revisão da Daniella: o que a pessoa lê, na ordem da tela, sem código.
// Sai do HTML do build de preview, e não do content/, porque só a página montada tem a ordem da tela
// e os textos que vêm de outros arquivos (a lista de idiomas, os botões, o pedido).
import { HTMLElement, NodeType, parse, type Node } from 'node-html-parser';
import type { DadosDoDrawer, FormularioId } from '../src/lib/contato.ts';
import type { Publico } from '../src/lib/publico.ts';
import { escaparHtml } from '../src/lib/texto.ts';

export interface PaginaDoLote {
  nome: string;
  html: string;
}

const IGNORAR = new Set(['SCRIPT', 'STYLE', 'TEMPLATE', 'NOSCRIPT', 'SVG', 'INPUT', 'SELECT', 'TEXTAREA']);
// A página do lote é o "##"; o H1 dela desce para "###", e assim por diante.
const NIVEL_DO_TITULO: Record<string, number> = { H1: 3, H2: 4, H3: 5, H4: 6, H5: 6, H6: 6 };
// Blocos que viram uma linha de texto, a não ser que tenham outro bloco dentro.
const BLOCOS_DE_TEXTO = new Set(['P', 'LI', 'LABEL', 'LEGEND', 'SUMMARY', 'FIGCAPTION', 'BLOCKQUOTE', 'DT', 'DD', 'TD', 'TH']);
const CONTAINERS = new Set([
  'DIV', 'SECTION', 'ARTICLE', 'ASIDE', 'NAV', 'HEADER', 'FOOTER', 'MAIN', 'FORM', 'FIELDSET',
  'DETAILS', 'DIALOG', 'UL', 'OL', 'DL', 'FIGURE', 'PICTURE', 'TABLE', 'TBODY', 'THEAD', 'TR',
]);
const ITENS = new Set(['LI', 'LABEL']);
// Os nomes das duas metades da escolha de público, como a Daniella as vê na home.
const ROTULOS_DOS_PUBLICOS: Record<Publico, string> = { empresa: 'Para sua empresa', voce: 'Para você' };

type DadosDoPedido = Partial<Pick<DadosDoDrawer, 'titulosDetalhes' | 'modelos' | 'erros'>>;

const limpar = (texto: string) => texto.replace(/\s+/g, ' ').trim();
const minuscula = (texto: string) => texto.charAt(0).toLocaleLowerCase('pt-BR') + texto.slice(1);

const elementos = (no: HTMLElement) => no.childNodes.filter((filho): filho is HTMLElement => filho instanceof HTMLElement);

const ehPendencia = (elemento: HTMLElement) => elemento.tagName === 'MARK' && elemento.classList.contains('confirmar');

function ignorado(elemento: HTMLElement): boolean {
  return (
    IGNORAR.has(elemento.tagName) ||
    elemento.getAttribute('aria-hidden') === 'true' ||
    elemento.classList.contains('visualmente-oculto')
  );
}

// Os três textos do público estão no HTML e o CSS mostra um só. No lote, o neutro vem primeiro,
// e o que muda para cada público vem entre parênteses.
function textoPorPublico(variantes: HTMLElement[]): string {
  const texto = Object.fromEntries(variantes.map((variante) => [variante.getAttribute('data-publico-texto'), limpar(textoInline(variante))]));
  const diferentes = (Object.entries(ROTULOS_DOS_PUBLICOS) as [Publico, string][])
    .filter(([publico]) => texto[publico] && texto[publico] !== texto.neutro)
    .map(([publico, rotulo]) => `${minuscula(rotulo)}: ${texto[publico]}`);
  return diferentes.length ? `${texto.neutro} (${diferentes.join('; ')})` : texto.neutro;
}

function textoInline(no: Node): string {
  if (no.nodeType === NodeType.TEXT_NODE) return no.text;
  if (!(no instanceof HTMLElement)) return '';
  // A pendência aparece por extenso, com quem responde: é o que a Daniella precisa ver.
  if (ehPendencia(no)) return `[${no.getAttribute('title') ?? 'A confirmar'}]`;
  if (ignorado(no)) return '';
  if (no.tagName === 'BR') return ' ';
  const porPublico = elementos(no).filter((filho) => filho.hasAttribute('data-publico-texto'));
  if (porPublico.length > 0) return textoPorPublico(porPublico);
  // O título do pedido tem uma versão para orçamento e outra para quem monta as próprias aulas.
  const porModo = elementos(no).filter((filho) => filho.hasAttribute('data-modo-texto'));
  if (porModo.length > 0) return porModo.map((modo) => limpar(textoInline(modo))).join(' / ');
  return no.childNodes.map(textoInline).join('');
}

// Botão ou link de ícone não tem texto: fala pelo rótulo acessível.
const textoDaAcao = (elemento: HTMLElement) => limpar(textoInline(elemento)) || limpar(elemento.getAttribute('aria-label') ?? '');

const temBlocoDentro = (elemento: HTMLElement) =>
  elemento
    .querySelectorAll('*')
    .some(
      (dentro) =>
        dentro.tagName in NIVEL_DO_TITULO ||
        BLOCOS_DE_TEXTO.has(dentro.tagName) ||
        CONTAINERS.has(dentro.tagName) ||
        dentro.tagName === 'BUTTON' ||
        dentro.tagName === 'IMG',
    );

// Um item de lista que é só um link (a lista de idiomas da home) aparece como link, igual ao link solto.
function soUmLink(elemento: HTMLElement): HTMLElement | undefined {
  const conteudo = elemento.childNodes.filter((filho) => !(filho.nodeType === NodeType.TEXT_NODE && !filho.text.trim()));
  const [unico] = conteudo;
  return conteudo.length === 1 && unico instanceof HTMLElement && unico.tagName === 'A' ? unico : undefined;
}

function linhasDe(elemento: HTMLElement, saida: string[]): string[] {
  // Texto que corre fora de um bloco (entre links e spans) vira um parágrafo quando o próximo bloco começa.
  let textoCorrido = '';
  const fecharTextoCorrido = () => {
    const texto = limpar(textoCorrido);
    if (texto) saida.push(texto);
    textoCorrido = '';
  };
  const novaLinha = (linha: string) => {
    fecharTextoCorrido();
    saida.push(linha);
  };

  for (const filho of elemento.childNodes) {
    if (filho.nodeType === NodeType.TEXT_NODE) {
      textoCorrido += filho.text;
      continue;
    }
    if (!(filho instanceof HTMLElement)) continue;
    if (ehPendencia(filho)) {
      textoCorrido += textoInline(filho);
      continue;
    }
    if (ignorado(filho)) continue;
    const tag = filho.tagName;
    const texto = () => limpar(textoInline(filho));

    if (tag in NIVEL_DO_TITULO) {
      if (texto()) novaLinha(`${'#'.repeat(NIVEL_DO_TITULO[tag])} ${texto()}`);
    } else if (tag === 'IMG' || filho.getAttribute('role') === 'img') {
      const descricao = limpar(filho.getAttribute('alt') ?? filho.getAttribute('aria-label') ?? '');
      if (descricao) novaLinha(`[Imagem: ${descricao}]`);
    } else if (tag === 'BUTTON') {
      if (textoDaAcao(filho)) novaLinha(`[Botão: ${textoDaAcao(filho)}]`);
    } else if (tag === 'A' && !limpar(textoCorrido)) {
      if (textoDaAcao(filho)) novaLinha(`[Link: ${textoDaAcao(filho)}]`);
    } else if (tag === 'LABEL' && !filho.querySelector('input')) {
      // O rótulo de um campo de digitar; o que envolve um input é uma opção de escolher.
      if (texto()) novaLinha(`[Campo: ${texto()}]`);
    } else if (BLOCOS_DE_TEXTO.has(tag) && !temBlocoDentro(filho)) {
      const link = soUmLink(filho);
      const linha = link ? `[Link: ${textoDaAcao(link)}]` : texto();
      if (linha) novaLinha(ITENS.has(tag) ? `- ${linha}` : linha);
    } else if (BLOCOS_DE_TEXTO.has(tag) || CONTAINERS.has(tag)) {
      fecharTextoCorrido();
      linhasDe(filho, saida);
    } else {
      textoCorrido += textoInline(filho);
    }
  }
  fecharTextoCorrido();
  return saida;
}

// Itens seguidos ficam colados, para o Markdown montar uma lista só; o resto vai separado por linha em branco.
function markdownDasLinhas(linhas: string[]): string {
  return linhas
    .map((linha, i) => (i > 0 && linha.startsWith('- ') && linhas[i - 1].startsWith('- ') ? `\n${linha}` : `\n\n${linha}`))
    .join('')
    .trim();
}

function mensagemDoLink(href: string | undefined): string | null {
  if (!href) return null;
  try {
    return new URL(href).searchParams.get('text');
  } catch {
    return null;
  }
}

export function textoDaPagina({ nome, html }: PaginaDoLote): string {
  const raiz = parse(html);
  const cabeca = [
    `## ${nome}`,
    '',
    `- Endereço: ${raiz.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? 'nenhum (é a página de erro, que responde por endereço que não existe)'}`,
    `- Título no Google: ${limpar(raiz.querySelector('title')?.text ?? '')}`,
    `- Descrição no Google: ${raiz.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''}`,
  ];
  const botao = raiz.querySelector('[data-whatsapp-flutuante]');
  const neutra = mensagemDoLink(botao?.getAttribute('href'));
  if (neutra) {
    cabeca.push(`- Mensagem do botão do WhatsApp: "${neutra}"`);
    for (const [publico, rotulo] of Object.entries(ROTULOS_DOS_PUBLICOS) as [Publico, string][]) {
      const mensagem = mensagemDoLink(botao?.getAttribute(`data-href-${publico}`));
      if (mensagem) cabeca.push(`  - Para quem escolheu "${rotulo}": "${mensagem}"`);
    }
  }
  const principal = raiz.querySelector('main');
  return `${cabeca.join('\n')}\n\n${principal ? markdownDasLinhas(linhasDe(principal, [])) : ''}`;
}

function mensagensDoPedido({ modelos, erros }: DadosDoPedido): string[] {
  const linhas = [
    '### Mensagens do WhatsApp que o pedido monta',
    '',
    'O {pagina} vira o nome da página, o {publico} vira o trecho de cada público, o {assunto} vira o pedido de cada página e o {nome} vira o nome da pessoa.',
    '',
  ];
  if (modelos?.abertura) linhas.push(`- Abertura: "${modelos.abertura}"`);
  for (const [publico, trecho] of Object.entries(modelos?.publico ?? {}) as [Publico, string][]) {
    linhas.push(`- Trecho de "${ROTULOS_DOS_PUBLICOS[publico]}": "${trecho}"`);
  }
  for (const pedido of Object.values(modelos?.pedido ?? {})) linhas.push(`- Pedido: "${pedido}"`);
  if (modelos?.nome) linhas.push(`- Fecho: "${modelos.nome}"`);
  if (modelos?.flutuante) linhas.push(`- Botão flutuante: "${modelos.flutuante}"`);
  linhas.push('', '### Avisos de erro do pedido', '', ...Object.values(erros ?? {}).map((erro) => `- ${erro}`));
  return linhas;
}

/** Menu, rodapé e pedido de contato, que se repetem em toda página: entram uma vez, no lote que os traz. */
export function textosCompartilhados(html: string): string {
  const raiz = parse(html);
  const json = raiz.querySelector('#dados-contato')?.textContent;
  const dados = json ? (JSON.parse(json) as DadosDoPedido) : undefined;
  // O menu do celular repete o do computador.
  raiz.querySelectorAll('.menu-movel').forEach((duplicado) => duplicado.remove());
  // Os campos de cada serviço ficam no HTML um depois do outro, e o título da etapa troca pelo script conforme
  // o serviço. No lote, cada bloco de campos ganha o próprio título, e o título que só vale para um sai.
  raiz.querySelectorAll('[data-titulo-detalhes]').forEach((titulo) => titulo.remove());
  for (const bloco of raiz.querySelectorAll('[data-formulario]')) {
    const titulo = dados?.titulosDetalhes?.[bloco.getAttribute('data-formulario') as FormularioId];
    if (titulo) bloco.insertAdjacentHTML('afterbegin', `<h4>${escaparHtml(titulo)}</h4>`);
  }
  const secao = (titulo: string, seletor: string) => {
    const elemento = raiz.querySelector(seletor);
    return elemento ? [titulo, '', markdownDasLinhas(linhasDe(elemento, [])), ''] : [];
  };
  return [
    '## Textos que aparecem em todas as páginas',
    '',
    ...secao('### Menu', 'header'),
    ...secao('### Rodapé', 'footer'),
    ...secao('### Pedido de orçamento (o painel que abre por cima da página)', 'dialog'),
    ...(dados ? mensagensDoPedido(dados) : []),
  ]
    .join('\n')
    .trim();
}

export function montarLote(lote: {
  numero: number;
  titulo: string;
  paginas: PaginaDoLote[];
  /** O HTML de uma página qualquer, de onde saem o menu, o rodapé e o pedido. */
  htmlDosCompartilhados?: string;
  data: Date;
}): string {
  const partes = [
    `# Lote ${lote.numero}: ${lote.titulo}`,
    `Textos do site novo da 9vee para a revisão da Daniella, gerados em ${lote.data.toLocaleDateString('pt-BR')} a partir do preview. Cada página aparece na ordem da tela. Botões, links e imagens aparecem entre colchetes, com o texto que a pessoa lê. O que está entre colchetes com "A confirmar" ainda falta responder.`,
    ...lote.paginas.map(textoDaPagina),
    ...(lote.htmlDosCompartilhados ? [textosCompartilhados(lote.htmlDosCompartilhados)] : []),
  ];
  return `${partes.join('\n\n')}\n`;
}
