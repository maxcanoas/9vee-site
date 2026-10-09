import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';
import { describe, expect, it } from 'vitest';
import { DIST, paginasDeIdiomaNoConteudo, textoDe } from './apoio';

const home = parse(readFileSync(join(DIST, 'index.html'), 'utf8'));

// A ordem que a cliente pediu em 23/09/2026, a mesma para os dois públicos.
const ORDEM = ['idiomas', 'traducao', 'nr1', 'lms'];

describe('ordem do conteúdo', () => {
  it('sai com os serviços na ordem da cliente: idiomas, tradução, NR-1 e LMS', () => {
    const ordem = home.querySelectorAll('[data-ordenavel] > li').map((li) => li.getAttribute('data-servico'));
    expect(ordem).toEqual(ORDEM);
  });

  it('dá a mesma ordem aos dois públicos, para a escolha não reordenar os serviços', () => {
    for (const li of home.querySelectorAll('[data-ordenavel] > li')) {
      expect(li.getAttribute('data-ordem-empresa')).toMatch(/^[1-4]$/);
      expect(li.getAttribute('data-ordem-voce')).toBe(li.getAttribute('data-ordem-empresa'));
    }
  });

  // Os diferenciais ficam abaixo da primeira dobra, que não ganha nada: a home está no limite do LCP. Os depoimentos
  // vêm logo depois dos serviços desde o humanizar-ui de 09/10/2026, para a prova de empresa real aparecer cedo.
  it('põe os depoimentos e os idiomas logo depois da lista, e os diferenciais antes do "como funciona"', () => {
    const secoes = home.querySelectorAll('main > section[id]').map((secao) => secao.id);
    const inicio = secoes.indexOf('servicos');
    expect(secoes.slice(inicio, inicio + 5)).toEqual(['servicos', 'depoimentos', 'idiomas', 'diferenciais', 'como-funciona']);
  });

  // A cliente pediu em 02/10/2026 para tirar da home o destaque de NR-1, o bloco azul com a data.
  it('não traz mais o destaque de NR-1', () => {
    expect(home.querySelector('#nr-1')).toBeNull();
  });

  // O grupo Empresas aparece três vezes: no painel do computador, no menu do celular e no rodapé, que no fim tem
  // também a interpretação de mandarim, fora do menu.
  it.each([
    ['no painel do computador', '#painel-empresas .painel__lista a', []],
    ['no menu do celular', '#menu-movel [aria-labelledby="movel-empresas"] a', []],
    ['no rodapé', 'footer [aria-labelledby="rodape-empresas"] a', ['/traducao-simultanea/mandarim/']],
  ])('lista o grupo Empresas %s na mesma ordem', (_onde, seletor, soNoRodape) => {
    const hrefs = home.querySelectorAll(seletor).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['/curso-de-idiomas/#empresas', '/traducao-simultanea/', '/treinamento-nr-1/', '/lms/', ...soNoRodape]);
  });

  it('lista os serviços do pedido na mesma ordem', () => {
    const valores = home.querySelectorAll('input[name="drawer-servico"]').map((opcao) => opcao.getAttribute('value'));
    expect(valores).toEqual(ORDEM);
  });
});

describe('home', () => {
  it('tem a escolha de público com as duas opções', () => {
    const valores = home.querySelectorAll('input[name="publico"]').map((r) => r.getAttribute('value'));
    expect(valores).toEqual(['empresa', 'voce']);
  });

  // O site atual afirma os relatórios e o acompanhamento de professores: a pendência do card saiu no ticket 06.
  it('diz no card do LMS o que o site atual afirma, sem pendência', () => {
    const card = home.querySelector('[data-ordenavel] > li[data-servico="lms"]');
    expect(card?.querySelector('mark.confirmar')).toBeNull();
    const texto = card?.querySelector('.servico__texto')?.text ?? '';
    for (const fato of ['professores', 'relatórios', 'frequência']) expect(texto).toContain(fato);
  });

  // Em todos os modos, a home só leva à página de idioma publicada. O idioma sem página publicada leva à âncora dele.
  it('liga os 14 idiomas à página publicada de cada um ou à página de cursos, com a saudação no próprio idioma', () => {
    const links = home.querySelectorAll('a.idioma');
    const hrefs = links.map((link) => link.getAttribute('href') ?? '');
    const paginas = paginasDeIdiomaNoConteudo().filter((pagina) => pagina.publicada);
    expect(links).toHaveLength(14);
    expect(hrefs.filter((href) => !href.includes('#')).sort()).toEqual(paginas.map((pagina) => pagina.rota).sort());
    for (const href of hrefs.filter((href) => href.includes('#'))) expect(href).toMatch(/^\/curso-de-idiomas\/#[a-z]+$/);
    for (const { idioma } of paginas) expect(hrefs).not.toContain(`/curso-de-idiomas/#${idioma}`);
    for (const link of links) expect(link.querySelector('[lang]')?.getAttribute('lang')).toBeTruthy();
  });

  it('traz no HTML o número final de cada contador (vale sem JS e para o Google)', () => {
    const contadores = home.querySelectorAll('[data-contador]');
    expect(contadores.length).toBeGreaterThan(0);
    for (const contador of contadores) {
      expect(contador.text.trim()).toBe(contador.getAttribute('data-contador'));
    }
  });

  it('faz todo botão de ação abrir o mesmo diálogo de contato', () => {
    const botoes = home.querySelectorAll('[data-abre-contato]');
    expect(botoes.length).toBeGreaterThanOrEqual(4);
    for (const botao of botoes) {
      expect(botao.tagName).toBe('BUTTON');
      expect(botao.getAttribute('aria-haspopup')).toBe('dialog');
    }
  });

  it('traz os três diferenciais do site atual: a comunicação real, os professores e o diagnóstico', () => {
    const itens = home.querySelectorAll('#diferenciais .lista-grande__item');
    expect(itens).toHaveLength(3);
    const texto = textoDe(home, '#diferenciais');
    for (const fato of ['família imigrante', 'presencial na empresa', 'diagnóstico do perfil de cada aluno']) {
      expect(texto).toContain(fato);
    }
  });

  // A frase do contato do site atual ("Grandes resultados começam com uma boa conversa.") saiu no humanizar de
  // 09/10/2026: era um chamado genérico. O fechamento diz o que acontece.
  it('fecha dizendo como o pedido funciona', () => {
    expect(textoDe(home, '#contato')).toContain('Você responde em quatro passos');
    expect(textoDe(home, '#contato')).not.toContain('Grandes resultados');
  });

  // Os cinco números que a Daniella confirmou em 05/10/2026: sem pendência, a faixa não tem a lista de notas.
  it('mostra os números confirmados, sem pendência, um por coluna no computador', () => {
    const itens = home.querySelectorAll('.prova__item').map((item) => item.text.replace(/\s+/g, ' ').trim());
    expect(itens).toEqual(['16 anos de experiência', '14 idiomas', '+65 profissionais', '+60 clientes', '+20 empresas parceiras']);
    expect(home.querySelector('.prova__notas')).toBeNull();
    expect(home.querySelector('.prova__numero--pendente')).toBeNull();
    expect(home.querySelector('.prova__lista')?.getAttribute('data-colunas')).toBe('5');
  });

  // Os seis depoimentos de content/site.md, no carrossel, na ordem de lá: empresa e aluno alternados. A 9vee confirmou
  // as autorizações dos três de empresa em 08/10/2026 (pergunta 30); os três de 09/10 vieram da Daniella.
  it('mostra os seis depoimentos no carrossel, sem a marca de autorização a confirmar', () => {
    const nomes = home.querySelectorAll('#depoimentos .depoimento__nome').map((nome) => nome.text.trim());
    expect(nomes).toEqual(['Eduardo Martins', 'Elian Ferreira', 'Bruno Teixeira', 'Fabrício', 'Pedro Cavalcante', 'Elian Ferreira']);
    for (const depoimento of home.querySelectorAll('.depoimento')) {
      expect(depoimento.querySelector('mark.confirmar')).toBeNull();
      expect(depoimento.querySelector('.depoimento__autorizacao')).toBeNull();
    }
  });

  // O leitor de tela já ouve o nome da empresa na linha do cargo: o logo repetiria. Os de 09/10 vão sem logo, porque o
  // site só usa os logos da Nissan, da General Motors e da Embraer (decisão do Maxwell em 09/10/2026).
  it('põe o logo da empresa ao lado do nome nos depoimentos autorizados, escondido do leitor de tela', () => {
    const comLogo = home.querySelectorAll('.depoimento').filter((depoimento) => depoimento.querySelector('.depoimento__logo'));
    expect(comLogo.map((depoimento) => depoimento.querySelector('.depoimento__nome')?.text.trim())).toEqual([
      'Eduardo Martins',
      'Bruno Teixeira',
      'Pedro Cavalcante',
    ]);
    for (const depoimento of comLogo) {
      const logo = depoimento.querySelector('figcaption .depoimento__logo svg');
      expect(logo?.getAttribute('aria-hidden')).toBe('true');
      expect(logo?.querySelector('path')).not.toBeNull();
    }
  });

  // A fala em inglês sai no original, com o lang dela, e a tradução logo abaixo (escolha do Maxwell em 09/10/2026).
  it('mostra a fala em inglês no original, marcada como inglês, com a tradução embaixo', () => {
    const emIngles = home.querySelectorAll('.depoimento__fala[lang="en"]');
    expect(emIngles).toHaveLength(2);
    for (const fala of emIngles) {
      const traducao = fala.closest('figure')?.querySelector('.depoimento__traducao');
      expect(traducao?.text.trim()).toMatch(/^Em português: “/);
      expect(traducao?.getAttribute('lang')).toBeUndefined();
    }
    expect(home.querySelectorAll('.depoimento__traducao')).toHaveLength(2);
  });

  // A faixa recebe o foco, para quem usa o teclado rolar com as setas, e as setas dizem o que controlam.
  it('dá à faixa o foco do teclado e o nome da seção, e liga as setas a ela', () => {
    const trilho = home.querySelector('#depoimentos-trilho');
    expect(trilho?.getAttribute('tabindex')).toBe('0');
    expect(trilho?.getAttribute('aria-labelledby')).toBe('depoimentos-titulo');
    const setas = home.querySelectorAll('#depoimentos .depoimentos__seta');
    expect(setas.map((seta) => seta.getAttribute('aria-label'))).toEqual(['Depoimento anterior', 'Próximo depoimento']);
    for (const seta of setas) expect(seta.getAttribute('aria-controls')).toBe('depoimentos-trilho');
    expect(home.querySelector('[data-carrossel-pontos]')?.getAttribute('aria-hidden')).toBe('true');
  });
});

// A figura sai como imagem se o arquivo do Gemini já está em src/assets/imagens/, e como Placeholder se não.
describe('imagens', () => {
  it('dão a toda figura o texto alternativo definitivo, e ao Placeholder o ID à vista', () => {
    const figuras = home.querySelectorAll('.figura');
    expect(figuras.length).toBeGreaterThanOrEqual(6);
    for (const figura of figuras) {
      const alternativo = figura.getAttribute('alt') ?? figura.getAttribute('aria-label') ?? '';
      expect(alternativo.length, figura.getAttribute('class') ?? '').toBeGreaterThanOrEqual(10);
      if (!figura.classList.contains('placeholder')) continue;
      expect(figura.getAttribute('role')).toBe('img');
      expect(figura.querySelector('.placeholder__id')?.text).toMatch(/^IMG-[A-Z0-9-]+$/);
    }
  });
});
