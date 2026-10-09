import { HTMLElement } from 'node-html-parser';
import { describe, expect, it } from 'vitest';
import { carregarPaginas, tamanhoDoJs } from './apoio';

// O aviso de cookies do ticket 13, no build de preview: em toda página, escondido até o script decidir, antes do
// cabeçalho, sem GA4 (o preview sai sem ele) e sem o script do Google no HTML.
describe.each(carregarPaginas().map((pagina) => [pagina.rota, pagina] as const))('aviso de cookies em %s', (_rota, { raiz, html }) => {
  const aviso = raiz.querySelector('[data-aviso-cookies]');

  it('nasce escondido, como o primeiro elemento do corpo, com o nome dele para o leitor de tela', () => {
    expect(aviso).not.toBeNull();
    expect(aviso?.hasAttribute('hidden')).toBe(true);
    const primeiro = raiz.querySelector('body')!.childNodes.find((filho) => filho instanceof HTMLElement) as HTMLElement;
    expect(primeiro.getAttribute('id')).toBe('aviso-cookies');
    expect(aviso?.getAttribute('aria-label')).toBe('Aviso de cookies');
  });

  // "Aceitar" e "Recusar" com o mesmo peso: a mesma classe, lado a lado. "Preferências" abre as categorias.
  it('oferece Aceitar e Recusar com o mesmo peso, e Preferências', () => {
    const botoes = aviso!.querySelectorAll('button[data-cookies]');
    const porAcao = Object.fromEntries(botoes.map((botao) => [botao.getAttribute('data-cookies'), botao]));
    expect(porAcao.aceitar.text.trim()).toBe('Aceitar');
    expect(porAcao.recusar.text.trim()).toBe('Recusar');
    expect(porAcao.aceitar.getAttribute('class')).toBe(porAcao.recusar.getAttribute('class'));
    expect(porAcao.preferencias.text.trim()).toBe('Preferências');
    expect(porAcao.preferencias.getAttribute('aria-controls')).toBe('aviso-cookies-categorias');
    expect(porAcao.salvar.hasAttribute('hidden')).toBe(true);
  });

  it('tem as duas categorias, com os necessários sempre ligados e a estatística desligada', () => {
    const caixas = aviso!.querySelectorAll('#aviso-cookies-categorias input[type="checkbox"]');
    expect(caixas).toHaveLength(2);
    expect(caixas[0].hasAttribute('checked') && caixas[0].hasAttribute('disabled')).toBe(true);
    expect(caixas[1].getAttribute('name')).toBe('cookies-estatistica');
    expect(caixas[1].hasAttribute('checked')).toBe(false);
  });

  // O leitor de tela ouve o nome da categoria como nome da caixa, e a explicação como descrição (ticket 20, 09/10/2026).
  it('dá a cada caixa o nome da categoria e a explicação como descrição', () => {
    const caixas = aviso!.querySelectorAll('#aviso-cookies-categorias input[type="checkbox"]');
    const textoDo = (id: string | undefined) => aviso!.querySelector(`#${id}`)?.text.trim();
    expect(caixas.map((caixa) => textoDo(caixa.getAttribute('aria-labelledby')))).toEqual(['Necessários', 'Estatística']);
    for (const caixa of caixas) {
      expect(textoDo(caixa.getAttribute('aria-describedby'))?.length, caixa.getAttribute('aria-describedby')).toBeGreaterThan(20);
    }
  });

  it('leva à política, no trecho da estatística', () => {
    expect(aviso!.querySelector('a')?.getAttribute('href')).toBe('/politica-de-privacidade/#estatistica');
  });

  // O preview sai sem GA4: nenhum ID no aviso e nenhum script do Google no HTML, nem antes nem depois do aceite.
  it('sai sem GA4 no preview, e sem o script do Google no HTML', () => {
    expect(aviso?.hasAttribute('data-ga4')).toBe(false);
    expect(aviso?.hasAttribute('data-ga4-depurar')).toBe(false);
    expect(html).not.toContain('googletagmanager.com');
  });

  it('pode ser reaberto pelo botão "Preferências de cookies" do rodapé', () => {
    const botao = raiz.querySelector('footer button[data-preferencias-cookies]');
    expect(botao?.text.trim()).toBe('Preferências de cookies');
    expect(botao?.getAttribute('aria-controls')).toBe('aviso-cookies');
  });

  it('mantém o JavaScript inicial abaixo do teto, com o aviso', () => {
    expect(tamanhoDoJs(raiz).bruto).toBeLessThan(30 * 1024);
  });
});
