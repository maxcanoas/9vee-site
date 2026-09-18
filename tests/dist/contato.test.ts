import type { HTMLElement } from 'node-html-parser';
import { describe, expect, it } from 'vitest';
import { carregarPaginas } from './apoio';

const paginas = carregarPaginas();
const SERVICOS = ['nr1', 'traducao', 'idiomas', 'lms'];
const LINK_WHATSAPP = /^https:\/\/wa\.me\/5511934661917(\?text=[^\s]+)?$/;

interface Ilha {
  numero: string;
  pagina: string;
  formularios: Record<string, { id: string; tipo: string }[]>;
}

const ilhaDe = (raiz: HTMLElement) => JSON.parse(raiz.querySelector('#dados-contato')!.textContent) as Ilha;

/** Nome acessível mínimo: label ligado, label em volta, aria-label ou aria-labelledby que resolve. */
function temNome(entrada: HTMLElement, raiz: HTMLElement): boolean {
  const id = entrada.getAttribute('id');
  if (id && raiz.querySelector(`label[for="${id}"]`)) return true;
  if (entrada.closest('label')) return true;
  if (entrada.getAttribute('aria-label')?.trim()) return true;
  const referencias = entrada.getAttribute('aria-labelledby')?.split(/\s+/) ?? [];
  return referencias.length > 0 && referencias.every((ref) => raiz.querySelector(`#${ref}`)?.text.trim());
}

describe.each(paginas.map((p) => [p.rota, p] as const))('contato em %s', (_rota, { raiz }) => {
  it('tem um único drawer, com título', () => {
    const dialogos = raiz.querySelectorAll('dialog');
    expect(dialogos).toHaveLength(1);
    const titulo = raiz.querySelector(`#${dialogos[0].getAttribute('aria-labelledby')}`);
    expect(titulo?.tagName).toBe('H2');
  });

  it('entrega ao script os dados do pedido, com o número e os cinco formulários', () => {
    const ilha = ilhaDe(raiz);
    expect(ilha.numero).toBe('5511934661917');
    expect(ilha.pagina.length).toBeGreaterThan(0);
    expect(Object.keys(ilha.formularios).sort()).toEqual(['idiomasEmpresa', 'idiomasVoce', 'lms', 'nr1', 'traducao']);
  });

  it('desenha no HTML cada campo que os dados descrevem', () => {
    for (const [formulario, campos] of Object.entries(ilhaDe(raiz).formularios)) {
      for (const campo of campos) {
        expect(raiz.querySelector(`[data-formulario="${formulario}"] [data-campo="${campo.id}"]`)).not.toBeNull();
      }
    }
  });

  it('não deixa dois formulários dividirem um grupo de opções', () => {
    const donos = new Map<string, string>();
    for (const bloco of raiz.querySelectorAll('[data-formulario]')) {
      for (const entrada of bloco.querySelectorAll('input[name]')) {
        const nome = entrada.getAttribute('name')!;
        const dono = bloco.getAttribute('data-formulario')!;
        expect(donos.get(nome) ?? dono).toBe(dono);
        donos.set(nome, dono);
      }
    }
  });

  it('dá nome a todo campo do drawer', () => {
    for (const entrada of raiz.querySelectorAll('#drawer-contato input')) {
      expect(temNome(entrada, raiz), entrada.toString()).toBe(true);
    }
  });

  it('agrupa rádios e checkboxes com uma legenda', () => {
    for (const entrada of raiz.querySelectorAll('#drawer-contato input[type="radio"], #drawer-contato input[type="checkbox"]')) {
      expect(entrada.closest('fieldset')?.querySelector('legend')?.text.trim(), entrada.toString()).toBeTruthy();
    }
  });

  it('faz todo botão de ação abrir o drawer, com um serviço conhecido', () => {
    for (const botao of raiz.querySelectorAll('[data-abre-contato]')) {
      expect(botao.tagName).toBe('BUTTON');
      expect(botao.getAttribute('type')).toBe('button');
      expect(botao.getAttribute('aria-haspopup')).toBe('dialog');
      const servico = botao.getAttribute('data-servico');
      if (servico) expect(SERVICOS).toContain(servico);
    }
  });

  it('só fala com o WhatsApp pelo wa.me, em nova aba', () => {
    expect(raiz.toString()).not.toContain('api.whatsapp.com');
    const links = raiz.querySelectorAll('a[href*="wa.me"]');
    expect(links.length).toBeGreaterThanOrEqual(3);
    for (const link of links) {
      expect(link.getAttribute('href')).toMatch(LINK_WHATSAPP);
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    }
  });

  it('tem o atalho do WhatsApp com a página na mensagem e as versões por público', () => {
    const atalho = raiz.querySelector('[data-whatsapp-flutuante]')!;
    const mensagem = (href: string) => new URL(href).searchParams.get('text') ?? '';
    const pagina = ilhaDe(raiz).pagina;
    for (const href of [
      atalho.getAttribute('href'),
      atalho.getAttribute('data-href-empresa'),
      atalho.getAttribute('data-href-voce'),
    ]) {
      expect(href).toMatch(LINK_WHATSAPP);
      expect(mensagem(href!)).toContain(`Vim pela página ${pagina} do site`);
    }
    expect(atalho.querySelector('.visualmente-oculto')?.text.trim()).toBeTruthy();
  });
});
