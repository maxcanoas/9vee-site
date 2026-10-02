import { parse, type HTMLElement } from 'node-html-parser';
import { describe, expect, it } from 'vitest';
import { carregarPaginas, ilhaDoPedido } from './apoio';

const paginas = carregarPaginas();
const SERVICOS = ['nr1', 'traducao', 'idiomas', 'lms'];
// O nome que o serviço de formulário dá à caixa que só robô marca.
const ISCA = 'botcheck';
const LINK_WHATSAPP = /^https:\/\/wa\.me\/5511934661917(\?text=[^\s]+)?$/;

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
    const ilha = ilhaDoPedido(raiz);
    expect(ilha.numero).toBe('5511934661917');
    expect(ilha.pagina.length).toBeGreaterThan(0);
    expect(Object.keys(ilha.formularios).sort()).toEqual(['idiomasEmpresa', 'idiomasVoce', 'lms', 'nr1', 'traducao']);
  });

  it('desenha no HTML cada campo que os dados descrevem', () => {
    for (const [formulario, campos] of Object.entries(ilhaDoPedido(raiz).formularios)) {
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

  // A isca fica de fora: não é campo para gente, e não tem grupo nem legenda.
  it('agrupa rádios e checkboxes com uma legenda', () => {
    const escolhas = raiz
      .querySelectorAll('#drawer-contato input[type="radio"], #drawer-contato input[type="checkbox"]')
      .filter((entrada) => entrada.getAttribute('name') !== ISCA);
    for (const entrada of escolhas) {
      expect(entrada.closest('fieldset')?.querySelector('legend')?.text.trim(), entrada.toString()).toBeTruthy();
    }
  });

  it('pede o consentimento numa caixa desmarcada, com a frase que vai no e-mail e o link para a política', () => {
    const caixa = raiz.querySelector('#drawer-receber input[name="final-consentimento"]')!;
    expect(caixa.getAttribute('type')).toBe('checkbox');
    expect(caixa.hasAttribute('checked')).toBe(false);
    const rotulo = caixa.closest('label')!;
    const link = rotulo.querySelector('a')!;
    // O texto só para leitor de tela (o aviso de nova aba) não faz parte da frase aceita.
    const frase = parse(rotulo.toString());
    frase.querySelectorAll('.visualmente-oculto').forEach((no) => no.remove());
    expect(frase.text.replace(/\s+/g, ' ').trim()).toBe(ilhaDoPedido(raiz).envio.consentimento);
    expect(link.getAttribute('href')).toBe('/politica-de-privacidade/#pedido');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
  });

  it('esconde a isca de quem é gente: fora da leitura de tela e fora do Tab', () => {
    const isca = raiz.querySelector(`#drawer-receber input[name="${ISCA}"]`)!;
    expect(isca.getAttribute('tabindex')).toBe('-1');
    expect(isca.closest('.isca')?.getAttribute('aria-hidden')).toBe('true');
    expect(isca.hasAttribute('checked')).toBe(false);
  });

  it('entrega ao script o que o envio precisa, sem o aviso de envio simulado do MVP', () => {
    const { envio, erros } = ilhaDoPedido(raiz);
    expect(typeof envio.chave).toBe('string');
    expect(envio.textos.assunto).toBe('[Lead site] {servico} | {publico} | {quem}');
    expect(Object.keys(envio.textos.servicos).sort()).toEqual([...SERVICOS].sort());
    expect(envio.enviando).toBe('Enviando');
    expect(erros.consentimento).toBeTruthy();
    expect(raiz.querySelector('.drawer__simulado')).toBeNull();
    expect(raiz.querySelector('#drawer-contato')?.text).not.toMatch(/MVP|simulado/i);
  });

  it('tem a tela de quando o pedido não chega, com a saída pelo WhatsApp e o botão de tentar de novo', () => {
    const tela = raiz.querySelector('#drawer-contato [data-etapa="falhou"]')!;
    expect(tela.hasAttribute('hidden')).toBe(true);
    expect(tela.querySelector('h3')?.text.trim()).toBeTruthy();
    expect(tela.querySelector('a[data-falha-whatsapp]')?.getAttribute('href')).toMatch(LINK_WHATSAPP);
    expect(tela.querySelector('button[data-ir-para="final"]')?.getAttribute('type')).toBe('button');
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
    const pagina = ilhaDoPedido(raiz).pagina;
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
