import { describe, expect, it } from 'vitest';
import {
  INTERPRETACAO_DE_MANDARIM,
  abrirPagina,
  carregarPaginas,
  conferirFiguraEmArco,
  conferirPerguntasDoFechamento,
  conferirServico,
  ilhaDoPedido,
  jsonLd,
  paginasDeIdiomaNoConteudo,
  textoDe,
  textosDe,
} from './apoio';

const mandarim = abrirPagina(INTERPRETACAO_DE_MANDARIM);
const texto = (seletor: string) => textoDe(mandarim, seletor);
const textos = (seletor: string) => textosDe(mandarim, seletor);
const ilha = ilhaDoPedido(mandarim);
// O curso de mandarim, na lista da página de cursos e na página dele.
const curso = paginasDeIdiomaNoConteudo().find((pagina) => pagina.idioma === 'mandarim')!;
const CONFIRMACAO_DO_PEDIDO = '[data-etapa="confirmado"]';

describe('interpretação de mandarim', () => {
  it('traz as cinco seções, na ordem', () => {
    // O hero é a única seção sem id: nada aponta para ele.
    const secoes = mandarim.querySelectorAll('main > section').map((secao) => secao.getAttribute('id') ?? 'hero');
    expect(secoes).toEqual(['hero', 'servicos', 'precisao', 'curso', 'contato']);
  });

  it('é uma página completa: sem a etiqueta de obra e sem pendência', () => {
    expect(mandarim.querySelector('.hero-pagina__etiqueta')).toBeNull();
    expect(mandarim.querySelectorAll('main mark.confirmar')).toEqual([]);
  });

  // A página não está no menu nem no rodapé: o último passo é o nome que ela mesma dá, em content/.
  it('mostra a trilha "Início, Tradução simultânea, Mandarim", com a Tradução como link', () => {
    expect(textos('nav.trilha li')).toEqual(['Início', 'Tradução simultânea', 'Mandarim']);
    expect(mandarim.querySelectorAll('nav.trilha a').map((link) => link.getAttribute('href'))).toEqual([
      '/',
      '/traducao-simultanea/',
    ]);
  });

  it('diz o serviço no título e para quem ele é', () => {
    expect(texto('h1')).toBe('Interpretação de mandarim para o mercado financeiro');
    for (const publico of ['fundos de private equity', 'bancos de investimento', 'empresas do portfólio']) {
      expect(texto('.hero-pagina')).toContain(publico);
    }
  });

  it('lista os três serviços da landing do site atual, com as ocasiões de cada um', () => {
    expect(textos('#servicos h3')).toEqual(['Reuniões com investidores', 'Visitas', 'Eventos corporativos']);
    const [reunioes, visitas, eventos] = textos('#servicos li p');
    for (const ocasiao of ['Reuniões bilaterais', 'revisões de portfólio', 'apresentações para LPs', 'cobertura completa']) {
      expect(reunioes).toContain(ocasiao);
    }
    for (const ocasiao of ['Due diligence', 'plantas industriais', 'no local']) expect(visitas).toContain(ocasiao);
    for (const ocasiao of ['Conferências', 'roadshows', 'reuniões de conselho', 'apresentações de gestão']) {
      expect(eventos).toContain(ocasiao);
    }
  });

  // A landing escreve "mandarim" em caixa alta: aqui a palavra leva o grifo, e a vírgula fica colada nela.
  it('põe a frase da landing em destaque, com o grifo em "mandarim"', () => {
    expect(texto('#precisao h2')).toBe('Quando o negócio fala mandarim, precisão não é opcional.');
    expect(textos('#precisao h2 .grifo')).toEqual(['mandarim']);
  });

  // O lang é o do idioma em content/site.md, o mesmo da saudação na lista da página de cursos.
  it('assina a frase em mandarim, com o lang do idioma e o nome 9vee', () => {
    const assinatura = mandarim.querySelector('#precisao [lang]');
    const saudacao = abrirPagina('curso-de-idiomas').querySelector(`#${curso.idioma} .idioma__saudacao`);
    expect(assinatura?.text.trim()).toBe('我们是 9vee');
    expect(assinatura?.getAttribute('lang')).toMatch(/^zh/);
    expect(assinatura?.getAttribute('lang')).toBe(saudacao?.getAttribute('lang'));
  });

  it('diz as três modalidades e leva aos formatos da página de Tradução', () => {
    const modalidades = mandarim.querySelector('#precisao a');
    expect(modalidades?.text.trim()).toBe('simultânea, consecutiva e de acompanhamento');
    expect(modalidades?.getAttribute('href')).toBe('/traducao-simultanea/#formatos');
  });

  it('prova com os mais de 10 anos, em tipo de número, com quem e onde', () => {
    expect(textos('#precisao h3')).toEqual(['Mais de 10 anos', 'Com quem', 'Onde']);
    expect(textos('#precisao .mostra__item--numero h3')).toEqual(['Mais de 10 anos']);
    const prova = texto('#precisao ul');
    for (const fato of [
      'setor financeiro',
      'fundos de private equity',
      'bancos de investimento',
      'empresas do portfólio',
      'visitas de investidores',
      'fábricas e escritórios no Brasil',
    ]) {
      expect(prova).toContain(fato);
    }
  });

  it('promete a resposta em até um dia útil abaixo dos dois botões do pedido e na confirmação dele', () => {
    for (const onde of ['.hero-pagina', '#contato']) {
      const caixa = mandarim.querySelector(`${onde} .botao-com-nota`);
      expect(caixa?.querySelector('[data-abre-contato]'), `sem botão em ${onde}`).not.toBeNull();
      expect(caixa?.text).toContain('em até um dia útil');
    }
    expect(texto(CONFIRMACAO_DO_PEDIDO)).toContain('em até um dia útil');
  });

  // Nas outras páginas o prazo continua na pergunta 6 da Daniella: o botão sai sem a nota, e a confirmação do
  // pedido, com a pendência.
  it('é a única página que promete um prazo', () => {
    const comPrazo = carregarPaginas().filter(
      ({ raiz }) => raiz.querySelector('.botao-com-nota') || !raiz.querySelector(`${CONFIRMACAO_DO_PEDIDO} mark.confirmar`),
    );
    expect(comPrazo.map(({ rota }) => rota)).toEqual([INTERPRETACAO_DE_MANDARIM]);
  });

  it('abre o pedido com a tradução simultânea, no começo e no fim', () => {
    const botoes = mandarim.querySelectorAll('main [data-abre-contato]');
    expect(botoes).toHaveLength(2);
    for (const botao of botoes) {
      expect(botao.getAttribute('data-servico')).toBe('traducao');
      expect(botao.getAttribute('aria-haspopup')).toBe('dialog');
    }
  });

  // O botão do cabeçalho não diz o serviço: o pedido que ele abre sai com o que a página entrega ao script. A opção
  // marcada precisa existir no formulário que a página desenha, com o mesmo valor.
  it('entrega ao pedido o serviço da página e o mandarim marcado nos idiomas do evento', () => {
    expect(ilha.servicoDaPagina).toBe('traducao');
    expect(ilha.marcadasDaPagina).toEqual({ idiomas: ['mandarim'] });
    expect(mandarim.querySelector('input[type="checkbox"][name="traducao-idiomas"][value="mandarim"]')).not.toBeNull();
  });

  // Nas páginas dos cursos, o pedido de tradução continua abrindo sem idioma marcado.
  it('é a única página que traz resposta marcada no pedido', () => {
    const comMarcadas = carregarPaginas().filter(({ raiz }) => Object.keys(ilhaDoPedido(raiz).marcadasDaPagina).length > 0);
    expect(comMarcadas.map(({ rota }) => rota)).toEqual([INTERPRETACAO_DE_MANDARIM]);
  });

  it('diz a página e o pedido de intérprete de mandarim na mensagem do botão do WhatsApp', () => {
    const atalho = mandarim.querySelector('[data-whatsapp-flutuante]')!;
    for (const atributo of ['href', 'data-href-empresa', 'data-href-voce']) {
      const mensagem = new URL(atalho.getAttribute(atributo)!).searchParams.get('text');
      expect(mensagem, atributo).toContain('Vim pela página Interpretação de Mandarim do site');
      expect(mensagem, atributo).toContain('quero um intérprete de mandarim');
    }
  });

  it('diz no fechamento o que o pedido já traz marcado e cada pergunta que falta responder', () => {
    const fechamento = texto('#contato');
    for (const marcado of ['tradução simultânea', 'mandarim']) expect(fechamento).toContain(marcado);
    conferirPerguntasDoFechamento(
      mandarim,
      ilha.formularios.traducao,
      { data: 'data', duracao: 'duração', formato: 'formato', participantes: 'quantas pessoas', cidade: 'cidade' },
      Object.keys(ilha.marcadasDaPagina),
    );
  });

  // Enquanto a página do curso não está publicada, o link vai para a âncora do mandarim na página de cursos, como
  // a home faz.
  it('leva ao curso de mandarim: à página dele, se publicada, e senão à âncora dele na página de cursos', () => {
    const destino = curso.publicada ? curso.rota : `/curso-de-idiomas/#${curso.idioma}`;
    expect(mandarim.querySelector('#curso a')?.getAttribute('href')).toBe(destino);
  });

  it('recebe o link do bloco de mandarim da Tradução e da página do curso de mandarim', () => {
    const traducao = abrirPagina('traducao-simultanea');
    expect(traducao.querySelector('#mandarim a')?.getAttribute('href')).toBe(INTERPRETACAO_DE_MANDARIM);
    expect(abrirPagina(curso.rota).querySelector(`main a[href="${INTERPRETACAO_DE_MANDARIM}"]`)).not.toBeNull();
  });

  // Santander e Itaú só aparecem nos one-pagers do Canva e esperam a autorização (pergunta 17). As versões da
  // landing em inglês e em chinês não entram no site novo.
  it('deixa fora os nomes de empresa cliente e as versões em outros idiomas', () => {
    const pagina = [texto('main'), mandarim.querySelector('meta[name="description"]')?.getAttribute('content')].join(' ');
    for (const fora of [/Santander/i, /Ita[uú]/, /(?<!\p{L})English(?!\p{L})/u, /廣東話/]) {
      expect(pagina, String(fora)).not.toMatch(fora);
    }
    expect(mandarim.querySelectorAll('a[href*="mandarim-english"], a[href*="mandarim-chines"], link[hreflang]')).toEqual([]);
  });

  // A landing fala de visitas e de tours em fábricas e escritórios no Brasil: a área atendida é o país.
  it('descreve o serviço em JSON-LD, ligado à organização e atendendo o Brasil, e não tem FAQPage', () => {
    conferirServico(mandarim, { nome: 'Interpretação de mandarim', caminho: INTERPRETACAO_DE_MANDARIM });
    const nos = jsonLd(mandarim);
    expect(nos.find((no) => no['@type'] === 'Service')?.areaServed).toEqual({ '@type': 'Country', name: 'Brasil' });
    expect(nos.filter((no) => no['@type'] === 'FAQPage')).toEqual([]);
  });

  it('foca o título do Google na interpretação entre mandarim e português', () => {
    expect(texto('title')).toMatch(/^Interpretação mandarim-português/);
  });

  it('traz a figura do topo em arco, com o texto alternativo definitivo', () => {
    const figuras = mandarim.querySelectorAll('main .figura');
    expect(figuras).toHaveLength(1);
    conferirFiguraEmArco(figuras[0], /^IMG-INTERPRETACAO-MANDARIM-HERO$/);
  });
});
