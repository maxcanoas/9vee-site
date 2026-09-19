import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';
import { describe, expect, it } from 'vitest';
import { DIST } from './apoio';

const home = parse(readFileSync(join(DIST, 'index.html'), 'utf8'));

describe('home', () => {
  it('sai com os serviços na ordem de empresa, que vale antes de qualquer escolha', () => {
    const ordem = home.querySelectorAll('[data-ordenavel] > li').map((li) => li.getAttribute('data-servico'));
    expect(ordem).toEqual(['nr1', 'traducao', 'idiomas', 'lms']);
  });

  it('traz a ordem de cada público em todos os serviços', () => {
    for (const li of home.querySelectorAll('[data-ordenavel] > li')) {
      expect(li.getAttribute('data-ordem-empresa')).toMatch(/^[1-4]$/);
      expect(li.getAttribute('data-ordem-voce')).toMatch(/^[1-4]$/);
    }
  });

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
