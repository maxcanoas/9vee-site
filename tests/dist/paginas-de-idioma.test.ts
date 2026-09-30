import { describe, expect, it } from 'vitest';
import { DOMINIO, carregarPaginas, jsonLd, paginasDeIdiomaNoConteudo } from './apoio';

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
});

describe.each(paginasDeIdiomaNoConteudo())('página de idioma $rota', ({ rota, idioma, publicada }) => {
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
  it('mostra a foto do lugar em arco, com o círculo da marca atrás', () => {
    const foto = raiz!.querySelector('.topo-idioma .arco-com-circulo__quadro .figura');
    expect(foto?.tagName, 'Placeholder no lugar da foto').toBe('IMG');
    expect(foto?.getAttribute('class')).toContain('figura--arco');
    expect(foto?.getAttribute('alt')?.length ?? 0).toBeGreaterThanOrEqual(10);
    expect(foto?.getAttribute('src')).toContain(`/idioma-${rota.split('/').at(-2)}.`);
    const circulo = raiz!.querySelector('.topo-idioma [aria-hidden="true"] img');
    expect(circulo?.getAttribute('src')).toMatch(/\/circulo-marca\./);
    expect(circulo?.getAttribute('alt')).toBe('');
  });

  it('avisa no topo, só quando não está publicada, que fica fora do site', () => {
    expect(raiz!.querySelector('.topo-idioma__etiqueta') !== null).toBe(!publicada);
  });

  it('abre o pedido com os cursos de idiomas e o idioma da página marcados', () => {
    const botoes = raiz!.querySelectorAll('main [data-abre-contato]');
    expect(botoes.length).toBeGreaterThanOrEqual(2);
    for (const botao of botoes) {
      expect(botao.getAttribute('data-servico')).toBe('idiomas');
      expect(botao.getAttribute('data-idioma')).toBe(idioma);
    }
    // O botão do cabeçalho não traz idioma: o pedido que ele abre sai com o da página.
    const dados = JSON.parse(raiz!.querySelector('#dados-contato')!.textContent) as Record<string, string>;
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
