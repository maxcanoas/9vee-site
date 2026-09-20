import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { FileSystemConfigLoader, HtmlValidate } from 'html-validate';
import { parse } from 'node-html-parser';
import { describe, expect, it } from 'vitest';
import {
  DIST,
  arquivoDaRota,
  carregarPaginas,
  jsonLd,
  tamanhoDoJs,
  textoVisivel,
  textosDeAtributo,
  textosDoJsonLd,
} from './apoio';

// Brief do MVP (seção 9) e marcadores do comando humanizar. Radicais pegam as flexões.
const PROIBIDAS: [string, RegExp][] = [
  ['jornada', /(?<!\p{L})jornadas?(?!\p{L})/iu],
  ['alavancar', /(?<!\p{L})alavanc\p{L}*/iu],
  ['potencializar', /(?<!\p{L})potencializ\p{L}*/iu],
  ['robusto', /(?<!\p{L})robust[oa]s?(?!\p{L})/iu],
  ['revolucionar', /(?<!\p{L})revolucion\p{L}*/iu],
  ['desbloquear', /(?<!\p{L})desbloque\p{L}*/iu],
  ['no cenário atual', /no cenário atual/iu],
  ['mergulhe', /(?<!\p{L})mergulh\p{L}*/iu],
  ['transformador', /(?<!\p{L})transformador(?:a|es|as)?(?!\p{L})/iu],
  ['sinergia', /(?<!\p{L})sinergi\p{L}*/iu],
  ['de forma fluida', /de forma fluida/iu],
  ['soluções', /(?<!\p{L})soluç(?:ão|ões)(?!\p{L})/iu],
  ['excelência', /(?<!\p{L})excelência(?!\p{L})/iu],
  ['inovação', /(?<!\p{L})inovaç(?:ão|ões)(?!\p{L})/iu],
  ['ecossistema', /(?<!\p{L})ecossistemas?(?!\p{L})/iu],
  ['sob medida', /sob medida/iu],
  ['vale ressaltar', /vale ressaltar/iu],
  ['é importante destacar', /é importante destacar/iu],
];

// Lighthouse (auditoria link-text) e padrões do projeto.
const LINKS_GENERICOS = new Set([
  'mais',
  'veja mais',
  'clique aqui',
  'ir',
  'mais informação',
  'mais informações',
  'saiba mais',
  'leia mais',
  'aqui',
]);

const paginas = carregarPaginas();
const validador = new HtmlValidate(new FileSystemConfigLoader());

describe('build', () => {
  it('gera as páginas do menu', () => {
    const rotas = paginas.map((p) => p.rota);
    for (const rota of ['/', '/treinamento-nr-1/', '/curso-de-idiomas/', '/traducao-simultanea/', '/lms/', '/quem-somos/']) {
      expect(rotas).toContain(rota);
    }
  });

  it('manda o cabeçalho de noindex para a Cloudflare', () => {
    const cabecalhos = readFileSync(join(DIST, '_headers'), 'utf8');
    expect(cabecalhos).toMatch(/^\/\*\s*\n\s+X-Robots-Tag: noindex/m);
  });

  it('não bloqueia rastreador no robots.txt (senão ele não lê o noindex)', () => {
    expect(readFileSync(join(DIST, 'robots.txt'), 'utf8')).not.toMatch(/^Disallow:\s*\//m);
  });
});

describe.each(paginas)('página $rota', ({ arquivo, html, raiz, rota }) => {
  it('declara o idioma pt-BR', () => {
    expect(raiz.querySelector('html')?.getAttribute('lang')).toBe('pt-BR');
  });

  it('tem um único H1', () => {
    expect(raiz.querySelectorAll('h1')).toHaveLength(1);
  });

  it('não pula nível de título', () => {
    const niveis = raiz.querySelectorAll('h1, h2, h3, h4, h5, h6').map((h) => Number(h.tagName[1]));
    niveis.forEach((nivel, i) => {
      if (i > 0) expect(nivel, `h${niveis[i - 1]} seguido de h${nivel}`).toBeLessThanOrEqual(niveis[i - 1] + 1);
    });
  });

  it('tem title de até 60 caracteres e description de 140 a 160', () => {
    const titulo = raiz.querySelector('title')?.text ?? '';
    const descricao = raiz.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
    expect([...titulo].length).toBeLessThanOrEqual(60);
    expect([...descricao].length).toBeGreaterThanOrEqual(140);
    expect([...descricao].length).toBeLessThanOrEqual(160);
  });

  it('fica fora do Google (noindex)', () => {
    expect(raiz.querySelector('meta[name="robots"]')?.getAttribute('content')).toContain('noindex');
  });

  it('descreve a organização em JSON-LD, com Novee como nome alternativo', () => {
    const organizacao = jsonLd(raiz).find((no) => no['@type'] === 'EducationalOrganization');
    expect(organizacao).toBeDefined();
    expect(organizacao?.name).toBe('9vee');
    expect(organizacao?.alternateName).toBe('Novee');
  });

  // Tirar a pendência de uma frase pode deixar sobra ("no fim do curso:."). O visitante não vê, o Google vê.
  it('não deixa sobra de pontuação no texto do JSON-LD', () => {
    for (const texto of textosDoJsonLd(jsonLd(raiz))) {
      if (/^https?:\/\//.test(texto)) continue;
      expect(texto, texto).not.toMatch(/[:,;]\s*[.:,;]|\s[.,;:]|[:,;]$/);
    }
  });

  it('não tem travessão nem meia-risca', () => {
    expect(html).not.toMatch(/[—–]/);
  });

  it('não usa palavra proibida', () => {
    const copy = [textoVisivel(raiz), ...textosDeAtributo(raiz)].join(' \n ');
    for (const [palavra, padrao] of PROIBIDAS) {
      expect(copy, `"${palavra}" encontrada em ${rota}`).not.toMatch(padrao);
    }
  });

  it('não tem link com texto genérico', () => {
    for (const link of raiz.querySelectorAll('a')) {
      const texto = link.text.replace(/\s+/g, ' ').trim().toLowerCase();
      expect(LINKS_GENERICOS.has(texto), `link genérico: "${texto}"`).toBe(false);
    }
  });

  it('escreve "Novee" só uma vez, no rodapé', () => {
    const texto = textoVisivel(raiz);
    expect(texto.match(/Novee/g)).toHaveLength(1);
    expect(raiz.querySelector('footer')?.text).toContain('Novee');
  });

  it('não deixa marcador de pendência cru', () => {
    expect(html).not.toContain('[CONFIRMAR');
  });

  it('abre nova aba sempre com noopener', () => {
    for (const link of raiz.querySelectorAll('a[target="_blank"]')) {
      expect(link.getAttribute('rel') ?? '', link.getAttribute('href')).toContain('noopener');
    }
  });

  it('tem width, height e alt em toda imagem', () => {
    for (const img of raiz.querySelectorAll('img')) {
      expect(img.getAttribute('width'), img.toString()).toBeTruthy();
      expect(img.getAttribute('height'), img.toString()).toBeTruthy();
      expect(img.hasAttribute('alt'), img.toString()).toBe(true);
    }
  });

  it('resolve todos os links internos e âncoras', () => {
    for (const link of raiz.querySelectorAll('a[href]')) {
      const href = link.getAttribute('href') ?? '';
      if (!href.startsWith('/') && !href.startsWith('#')) continue;
      const [caminho, ancora] = href.split('#');
      const destino = caminho ? arquivoDaRota(caminho) : arquivo;
      expect(existsSync(destino), `link quebrado: ${href}`).toBe(true);
      if (caminho && !caminho.includes('.')) expect(caminho, `sem barra final: ${href}`).toMatch(/\/$/);
      if (ancora) {
        const alvo = parse(readFileSync(destino, 'utf8'));
        expect(alvo.getElementById(ancora), `âncora inexistente: ${href}`).not.toBeNull();
      }
    }
  });

  it('é HTML válido (html-validate)', async () => {
    const relatorio = await validador.validateFile(arquivo);
    const erros = relatorio.results.flatMap((r) =>
      r.messages.map((m) => `${m.ruleId} (${m.line}:${m.column}): ${m.message}`),
    );
    expect(erros).toEqual([]);
  });

  it('carrega menos de 30 KB de JavaScript, e menos de 10 KB com gzip', () => {
    const { bruto, gzip } = tamanhoDoJs(raiz);
    expect(bruto).toBeLessThan(30 * 1024);
    expect(gzip).toBeLessThan(10 * 1024);
  });

  it('não usa magenta nem violeta como cor de texto (a paleta reserva as duas para forma e foco)', () => {
    const css = raiz.querySelectorAll('style').map((s) => s.textContent).join('\n');
    expect(css).not.toMatch(/(?<![\w-])color:\s*var\(--(?:magenta|violeta)\)/);
  });

  it('só faz a transição entre páginas para quem não pediu menos movimento', () => {
    const css = raiz.querySelectorAll('style').map((s) => s.textContent).join('\n');
    const todas = css.split('@view-transition').length - 1;
    const protegidas = css.split('@media(prefers-reduced-motion:no-preference){@view-transition').length - 1;
    expect(todas).toBeGreaterThan(0);
    expect(protegidas).toBe(todas);
  });

  it('mantém as animações por rolagem escritas por extenso no CSS', () => {
    const css = raiz.querySelectorAll('style').map((s) => s.textContent).join('\n');
    expect(css).toContain('animation-timeline');
    expect(css).not.toMatch(/animation:[^;}]*(?:view|scroll)\(/);
  });
});
