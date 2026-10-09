import { describe, expect, it } from 'vitest';
import { DOMINIO, carregarPaginas, ilhaDoPedido, jsonLd, paginasDeIdiomaNoConteudo, textoDe, textosDe } from './apoio';

const preview = carregarPaginas();
const raizDa = (rota: string) => preview.find((pagina) => pagina.rota === rota)?.raiz;
const home = raizDa('/')!;
const cursos = raizDa('/curso-de-idiomas/')!;

describe('páginas de idioma', () => {
  // Os que não têm fato são esqueletos, fora do site até o cliente responder: mesmo assim cada idioma tem a sua.
  it('existem para os 14 idiomas da página de cursos, uma por idioma', () => {
    const daLista = cursos.querySelectorAll('#idiomas .familia__item').map((item) => item.getAttribute('id'));
    const comPagina = paginasDeIdiomaNoConteudo().map((pagina) => pagina.idioma);
    expect(comPagina).toHaveLength(14);
    expect([...comPagina].sort()).toEqual([...daLista].sort());
  });

  // O texto do bloco está num lugar só, o da página de cursos: a de português para estrangeiros o repete.
  it('mostram a realocação de funcionários só na de português, com o texto da página de cursos', () => {
    const comRealocacao = paginasDeIdiomaNoConteudo().filter(({ rota }) => raizDa(rota)?.querySelector('#realocacao'));
    expect(comRealocacao.map(({ pagina }) => pagina)).toEqual(['portugues-para-estrangeiros']);
    const daPagina = textoDe(raizDa(comRealocacao[0].rota)!, '#realocacao');
    expect(daPagina).toContain('Realocação de funcionários');
    expect(daPagina).toBe(textoDe(cursos, '#realocacao'));
  });

  // Cada prova na página do idioma dela: as da tabela do Arthur (05/10/2026) e, onde o site atual conta, como é o
  // preparatório. O APT do árabe, a prova de cidadania do norueguês e o COPE do cantonês vieram na segunda rodada v2.
  it.each([
    ['ingles', ['TOEFL iBT', 'IELTS', 'TOEIC', 'O preparatório do TOEFL']],
    ['portugues-para-estrangeiros', ['CELPE-Bras', 'O preparatório']],
    ['espanhol', ['DELE', 'SIELE', 'CELU', 'O preparatório do DELE']],
    ['frances', ['DELF e DALF', 'TCF', 'TEF', 'TFI']],
    ['holandes', ['Inburgering', 'NT2', 'O preparatório do Inburgering']],
    ['alemao', ['TestDaF', 'telc']],
    ['italiano', ['CELI', 'CILS', 'PLIDA', 'CERT.IT']],
    ['sueco', ['TISUS', 'Swedex', 'SFI e SVA']],
    ['noruegues', ['Norskprøven', 'Statsborgerprøven']],
    ['arabe', ['APT']],
    ['cantones', ['COPE']],
    ['mandarim', []],
    ['japones', ['JLPT']],
    ['russo', ['TORFL (TRKI)']],
  ])('trazem na página de %s as provas do idioma', (pagina, nomes) => {
    const raiz = raizDa(`/curso-de-idiomas/${pagina}/`)!;
    expect(textosDe(raiz, '#provas dt')).toEqual(nomes);
    expect(textoDe(raiz, 'main')).toMatch(/preparatório/i);
  });
});

// Os depoimentos que citam o idioma, de content/site.md (09/10/2026): hoje, só os dois de holandês.
describe('depoimentos nas páginas de idioma', () => {
  it('mostra no holandês os dois depoimentos de quem estudou holandês, logo depois das provas', () => {
    const holandes = raizDa('/curso-de-idiomas/holandes/')!;
    expect(textoDe(holandes, '#depoimentos-titulo')).toBe('Quem já estudou holandês com a 9vee');
    expect(textosDe(holandes, '#depoimentos .depoimento__nome')).toEqual(['Elian Ferreira', 'Fabrício']);
    const secoes = holandes.querySelectorAll('main > section[id]').map((secao) => secao.id);
    expect(secoes[secoes.indexOf('provas') + 1]).toBe('depoimentos');
  });

  it('não mostra a seção nos idiomas que nenhum depoimento cita', () => {
    for (const { rota } of paginasDeIdiomaNoConteudo().filter(({ idioma }) => idioma !== 'holandes')) {
      expect(raizDa(rota)?.querySelector('#depoimentos'), rota).toBeNull();
    }
  });
});

describe.each(paginasDeIdiomaNoConteudo())('página de idioma $rota', ({ rota, pagina, idioma, publicada }) => {
  const raiz = raizDa(rota);
  // O idioma como a página de cursos o mostra: a saudação, o lang e o nome vêm de content/site.md.
  const naLista = cursos.querySelector(`#${idioma}`);

  it('sai no preview, publicada ou não', () => {
    expect(raiz, `${rota} fora do preview`).toBeDefined();
  });

  it('abre com a saudação na escrita do idioma', () => {
    const saudacao = raiz!.querySelector('.topo-idioma__saudacao');
    const daLista = naLista?.querySelector('.idioma__saudacao');
    expect(saudacao?.text.trim()).toBe(daLista?.text.trim());
    expect(saudacao?.getAttribute('lang')).toBe(daLista?.getAttribute('lang'));
    expect(saudacao?.getAttribute('dir')).toBe(daLista?.getAttribute('dir'));
  });

  // O Figura cai calado no Placeholder quando não acha o arquivo: aqui a foto tem de existir, e ser a do idioma.
  // O círculo atrás dela tem teste em toda página, e o esquema já exige o texto alternativo.
  it('mostra a foto do próprio idioma em arco', () => {
    const foto = raiz!.querySelector('.topo-idioma .arco-com-circulo__quadro .figura');
    expect(foto?.tagName, 'Placeholder no lugar da foto').toBe('IMG');
    expect(foto?.getAttribute('class')).toContain('figura--arco');
    expect(foto?.getAttribute('src')).toContain(`/idioma-${pagina}.`);
  });

  // Nem todo mundo reconhece o lugar pelo marco. A legenda é da figura da foto, e a cidade dela é a do texto
  // alternativo: uma troca de foto que esqueça a legenda não passa.
  it('diz embaixo da foto a cidade dela', () => {
    const legenda = textoDe(raiz!, '.topo-idioma figure.arco-com-circulo__quadro > figcaption');
    expect(legenda).toMatch(/^[^,]+(, [^,]+)?$/);
    const alt = raiz!.querySelector('.topo-idioma .arco-com-circulo__quadro .figura')?.getAttribute('alt');
    expect(alt).toContain(legenda.split(',')[0]);
  });

  it('avisa no topo, só quando não está publicada, que fica fora do site', () => {
    expect(raiz!.querySelector('.aviso-nao-publicada') !== null).toBe(!publicada);
  });

  it('abre o pedido com os cursos de idiomas e o idioma da página marcados', () => {
    const botoes = raiz!.querySelectorAll('main [data-abre-contato]');
    expect(botoes.length).toBeGreaterThanOrEqual(2);
    for (const botao of botoes) {
      expect(botao.getAttribute('data-servico')).toBe('idiomas');
      expect(botao.getAttribute('data-idioma')).toBe(idioma);
    }
    // O botão do cabeçalho não traz idioma: o pedido que ele abre sai com o da página.
    const dados = ilhaDoPedido(raiz!);
    expect(dados.servicoDaPagina).toBe('idiomas');
    expect(dados.idiomaDaPagina).toBe(idioma);
  });

  it('diz o idioma na mensagem do WhatsApp', () => {
    const nome = naLista?.querySelector('.idioma__nome')?.text.trim() ?? '';
    const noMeioDaFrase = nome.charAt(0).toLocaleLowerCase('pt-BR') + nome.slice(1);
    const link = raiz!.querySelector('[data-whatsapp-flutuante]')!;
    for (const atributo of ['href', 'data-href-empresa', 'data-href-voce']) {
      const mensagem = new URL(link.getAttribute(atributo)!).searchParams.get('text');
      expect(mensagem, atributo).toContain(`Vim pela página Curso de ${noMeioDaFrase} do site`);
      expect(mensagem, atributo).toContain(`aulas de ${noMeioDaFrase}`);
    }
  });

  // Na lista da página de cursos, o curso aponta para a página só quando ela está publicada.
  it('descreve o curso em JSON-LD com o endereço da página, e com o nome da lista de cursos', () => {
    const curso = jsonLd(raiz!).find((no) => no['@type'] === 'Course');
    expect(curso?.url).toBe(`${DOMINIO}${rota}`);
    expect(curso?.provider).toEqual({ '@id': `${DOMINIO}/#organizacao` });
    const lista = jsonLd(cursos).find((no) => no['@type'] === 'ItemList');
    const itens = lista?.itemListElement as { item: Record<string, string> }[];
    const naListaDeCursos = publicada ? `${DOMINIO}${rota}` : `${DOMINIO}/curso-de-idiomas/#${idioma}`;
    expect(itens.find(({ item }) => item.url === naListaDeCursos)?.item.name).toBe(curso?.name);
  });

  // A não publicada aparece no preview só para quem tem o endereço: a home e a página de cursos não levam a ela.
  it('recebe o link da home e da página de cursos só quando está publicada', () => {
    expect(home.querySelector(`.familias a[href="${rota}"]`) !== null, 'home').toBe(publicada);
    expect(naLista?.querySelector(`a[href="${rota}"]`) !== null, 'cursos').toBe(publicada);
  });
});
