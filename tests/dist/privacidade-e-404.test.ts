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

  // Sem as respostas, a política não vai ao ar: a trava de produção pega a marca.
  it('deixa a razão social, o CNPJ e o canal do titular como pendência da Daniella', () => {
    const notas = principal.querySelectorAll('mark.confirmar').map((marca) => marca.getAttribute('title') ?? '');
    for (const dado of [/razão social/i, /CNPJ/, /encarregado/i]) {
      expect(notas.some((nota) => dado.test(nota) && nota.includes('Daniella')), String(dado)).toBe(true);
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
