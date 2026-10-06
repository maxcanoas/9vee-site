import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';
import { describe, expect, it } from 'vitest';
import { DIST, carregarPaginas, textoVisivel } from './apoio';

const abrir = (arquivo: string) => parse(readFileSync(join(DIST, arquivo), 'utf8'));

// O link de preferências dos cookies chega com o aviso, no ticket 13.
const ROTULOS_AINDA_SEM_TELA = ['Preferências de cookies'];

describe('política de privacidade', () => {
  const principal = abrir('politica-de-privacidade/index.html').querySelector('main')!;
  const texto = principal.text.replace(/\s+/g, ' ');

  // A spec pede cada um pelo nome: o serviço de formulário, o Google, a hospedagem e o WhatsApp.
  it('diz quem recebe os dados', () => {
    for (const quem of ['Web3Forms', 'Google Analytics', 'HostGator', 'WhatsApp']) expect(texto).toContain(quem);
  });

  it('diz onde o titular reclama, além dos direitos dele', () => {
    expect(texto).toContain('ANPD');
  });

  // A política cita rótulos da interface entre aspas: se um deles mudar no site, ela precisa mudar junto.
  it('cita os rótulos da interface como o site os mostra', () => {
    const site = textoVisivel(abrir('index.html'));
    const citados = [...texto.matchAll(/"([^"]+)"/g)].map(([, rotulo]) => rotulo);
    expect(citados.length).toBeGreaterThan(0);
    for (const rotulo of citados.filter((citado) => !ROTULOS_AINDA_SEM_TELA.includes(citado))) {
      expect(site, rotulo).toContain(rotulo);
    }
  });

  // As perguntas 19 e 21, respondidas em 05/10/2026: quem cuida dos dados, o canal do titular e os três prazos.
  it('diz quem cuida dos dados, por onde pedir e por quanto tempo cada coisa fica guardada', () => {
    for (const fato of ['CLOUD9 LEARNING LTDA', '42.808.102/0001-88', '1 ano, quando não vira contrato', '6 meses, como pede o Marco Civil']) {
      expect(texto, fato).toContain(fato);
    }
    expect(principal.querySelector('#quem-cuida a[href="mailto:contato@9vee.com.br"]')).not.toBeNull();
  });

  // A política do Wix, que a 9vee mandou manter, com o que a política nova trazia de relevante, marcado para a 9vee
  // ver: a legenda, as seções inteiras novas, o trecho que entrou e o que saiu. A trava de produção barra as marcas.
  it('mostra a mescla com a política do Wix, com as marcas de revisão explicadas', () => {
    expect(principal.querySelector('.politica__legenda h2')?.text.trim()).toBe('Para a revisão de vocês');
    const novas = principal.querySelectorAll('.politica__secao--nova').map((secao) => secao.getAttribute('id'));
    expect(novas).toEqual(['quem-cuida', 'pedido', 'whatsapp', 'estatistica', 'navegador', 'hospedagem', 'direitos']);
    for (const secao of principal.querySelectorAll('.politica__secao--nova')) {
      expect(secao.querySelector('h2 .politica__etiqueta')?.text).toBe('Novo');
    }
    expect(principal.querySelectorAll('ins.revisao').length).toBeGreaterThan(0);
    expect(principal.querySelectorAll('del.revisao').map((trecho) => trecho.text)).toContain('nossa Política de Cookies');
    // O texto do Wix continua, do começo ao fim.
    for (const doWix of ['Apresentamos aqui nossa Política de Privacidade', 'Processamento de dados pessoais por IA', 'foro da Comarca de Arapoti']) {
      expect(texto, doWix).toContain(doWix);
    }
  });

  // O que a mescla levantou e só a 9vee responde: os dados de crianças, o foro e a data da versão aprovada.
  it('deixa como pendência da Daniella o que a mescla levantou', () => {
    const notas = principal.querySelectorAll('mark.confirmar').map((marca) => marca.getAttribute('title') ?? '');
    expect(notas).toHaveLength(3);
    for (const assunto of [/a partir de 9 anos/, /foro/, /data em que vocês aprovarem/]) {
      expect(notas.some((nota) => assunto.test(nota) && nota.includes('Daniella')), String(assunto)).toBe(true);
    }
  });
});

describe('link do rodapé para a política', () => {
  it.each(carregarPaginas().map((pagina) => [pagina.rota, pagina] as const))('%s leva à política nova, na mesma aba', (_rota, { raiz }) => {
    const link = raiz.querySelectorAll('footer a').find((a) => a.text.includes('Política de privacidade'));
    expect(link?.getAttribute('href')).toBe('/politica-de-privacidade/');
    expect(link?.hasAttribute('target')).toBe(false);
  });
});

describe('página de erro', () => {
  it('mostra o caminho para cada serviço', () => {
    const destinos = abrir('404.html')
      .querySelectorAll('main a')
      .map((link) => link.getAttribute('href'));
    for (const rota of ['/curso-de-idiomas/', '/traducao-simultanea/', '/treinamento-nr-1/', '/lms/']) {
      expect(destinos).toContain(rota);
    }
  });
});
