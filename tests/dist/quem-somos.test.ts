import { describe, expect, it } from 'vitest';
import { abrirPagina, conferirFiguraEmArco, textoDe, textosDe } from './apoio';

const pagina = abrirPagina('quem-somos');
const home = abrirPagina('');
const texto = (seletor: string) => textoDe(pagina, seletor);
const textos = (seletor: string) => textosDe(pagina, seletor);

describe('Quem Somos', () => {
  it('traz as oito seções da página completa, na ordem', () => {
    // O hero e a faixa de números não têm id: nada aponta para eles.
    const secoes = pagina.querySelectorAll('main > section').map((secao) => secao.getAttribute('id') ?? secao.classNames.split(' ')[0]);
    expect(secoes).toEqual(['hero-pagina', 'prova', 'frentes', 'historia', 'missao', 'principios', 'parceiros', 'contato']);
  });

  it('está no site: sem o aviso de fora do site', () => {
    expect(pagina.querySelector('.aviso-nao-publicada')).toBeNull();
  });

  // A 9vee não tem sede aberta ao público: nada de sede, endereço ou convite para visita.
  it('não fala de sede nem de endereço', () => {
    const tudo = [texto('main'), pagina.querySelector('meta[name="description"]')?.getAttribute('content')].join(' ');
    for (const fora of [/(?<!\p{L})sede(?!\p{L})/iu, /endereço/i, /venha nos visitar/i]) expect(tudo, String(fora)).not.toMatch(fora);
  });

  // Um lugar só para o mesmo dado: a faixa é a da home, com as mesmas pendências.
  it('mostra os mesmos números da home', () => {
    expect(textos('.prova__item')).toEqual(textosDe(home, '.prova__item'));
    expect(textos('.prova__item').length).toBeGreaterThanOrEqual(4);
  });

  it('leva às quatro frentes, cada uma à página dela', () => {
    const frentes = pagina.querySelectorAll('#frentes a').map((link) => [
      link.querySelector('.link-do-menu__nome')?.text.trim(),
      link.getAttribute('href'),
    ]);
    expect(frentes).toEqual([
      ['Cursos de idiomas', '/curso-de-idiomas/'],
      ['Tradução simultânea', '/traducao-simultanea/'],
      ['Treinamento de NR-1', '/treinamento-nr-1/'],
      ['LMS', '/lms/'],
    ]);
  });

  // A história que a 9vee mandou em 05/10/2026, no lugar da do site atual, com os 16 anos dos números.
  it('conta a história que a 9vee mandou, com os 16 anos de trajetória e sem pendência', () => {
    const historia = texto('#historia');
    for (const fato of ['transformar conhecimento em resultado', 'profissionais, especialistas e professores', '16 anos de trajetória', 'Não existe um formato único']) {
      expect(historia).toContain(fato);
    }
    expect(historia).not.toMatch(/sonho dos fundadores|milhares de alunos|mais de 20 anos/);
    expect(pagina.querySelector('main mark.confirmar')).toBeNull();
  });

  it('diz de onde a 9vee atende, no topo', () => {
    expect(texto('.hero-pagina')).toContain('De São Paulo, atende comunidades, empresas e órgãos públicos em todo o Brasil');
  });

  it('põe a missão em destaque, com o grifo em "confiança e ação"', () => {
    expect(texto('#missao h2')).toBe('Transformar conhecimento em confiança e ação.');
    expect(textos('#missao h2 .grifo')).toEqual(['confiança e ação']);
  });

  it('mostra os três princípios, cada um com os três itens dele', () => {
    expect(textos('#principios h3')).toEqual(['Propósito', 'Coragem', 'Parceria']);
    for (const principio of pagina.querySelectorAll('#principios .principio')) {
      expect(principio.querySelectorAll('h4')).toHaveLength(3);
    }
  });

  it('abre o pedido no começo e no fim, sem serviço marcado', () => {
    for (const onde of ['.hero-pagina', '#contato']) {
      const botao = pagina.querySelector(`${onde} [data-abre-contato]`);
      expect(botao, `sem botão em ${onde}`).not.toBeNull();
      expect(botao?.getAttribute('data-servico') ?? null).toBeNull();
    }
  });

  it('traz as duas figuras em arco, com o texto alternativo definitivo', () => {
    const figuras = pagina.querySelectorAll('main .figura');
    expect(figuras).toHaveLength(2);
    for (const figura of figuras) conferirFiguraEmArco(figura, /^IMG-QUEM-SOMOS-[A-Z-]+$/);
  });
});
