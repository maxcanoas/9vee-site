import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';
import { describe, expect, it } from 'vitest';
import { DIST } from './apoio';

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

  it('põe o bloco dos idiomas logo depois da lista, antes do destaque de NR-1', () => {
    const secoes = home.querySelectorAll('main > section[id]').map((secao) => secao.id);
    const inicio = secoes.indexOf('servicos');
    expect(secoes.slice(inicio, inicio + 3)).toEqual(['servicos', 'idiomas', 'nr-1']);
  });

  // O grupo Empresas aparece três vezes: no painel do computador, no menu do celular e no rodapé.
  it.each([
    ['no painel do computador', '#painel-empresas .painel__lista a'],
    ['no menu do celular', '#menu-movel [aria-labelledby="movel-empresas"] a'],
    ['no rodapé', 'footer [aria-labelledby="rodape-empresas"] a'],
  ])('lista o grupo Empresas %s na mesma ordem', (_onde, seletor) => {
    const hrefs = home.querySelectorAll(seletor).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['/curso-de-idiomas/#empresas', '/traducao-simultanea/', '/treinamento-nr-1/', '/lms/']);
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

  it('liga os 14 idiomas à página de cursos, cada um com a saudação no próprio idioma', () => {
    const links = home.querySelectorAll('a.idioma');
    expect(links).toHaveLength(14);
    for (const link of links) {
      expect(link.getAttribute('href')).toMatch(/^\/curso-de-idiomas\/#[a-z]+$/);
      expect(link.querySelector('[lang]')?.getAttribute('lang')).toBeTruthy();
    }
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

  it('cita as fontes oficiais no destaque do NR-1', () => {
    const hrefs = home.querySelectorAll('#nr-1 a[target="_blank"]').map((a) => a.getAttribute('href') ?? '');
    expect(hrefs.some((h) => h.startsWith('https://www.gov.br/trabalho-e-emprego/'))).toBe(true);
    expect(hrefs.some((h) => h.startsWith('https://www.planalto.gov.br/'))).toBe(true);
  });

  it('marca cada depoimento com a autorização a confirmar', () => {
    for (const depoimento of home.querySelectorAll('.depoimento')) {
      expect(depoimento.querySelector('mark.confirmar')).not.toBeNull();
    }
  });

  // O leitor de tela já ouve o nome da empresa na linha do cargo: o logo repetiria.
  it('põe o logo da empresa ao lado do nome em cada depoimento, escondido do leitor de tela', () => {
    for (const depoimento of home.querySelectorAll('.depoimento')) {
      const logo = depoimento.querySelector('figcaption .depoimento__logo svg');
      expect(logo, depoimento.querySelector('.depoimento__nome')?.text.trim()).not.toBeNull();
      expect(logo?.getAttribute('aria-hidden')).toBe('true');
      expect(logo?.querySelector('path')).not.toBeNull();
    }
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
