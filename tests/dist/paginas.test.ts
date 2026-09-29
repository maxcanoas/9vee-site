import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { FileSystemConfigLoader, HtmlValidate } from 'html-validate';
import { describe, expect, it } from 'vitest';
import { linksQuebrados } from '../../scripts/trava-producao.ts';
import {
  DIST,
  DOMINIO,
  carregarPaginas,
  conferirEnderecos,
  conferirRobotsLiberado,
  jsonLd,
  tamanhoDoJs,
  textoComoNoJsonLd,
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

// Toda página tem trilha, menos a home, que é o começo dela, e a 404, que não tem lugar no site.
const temTrilha = (rota: string) => rota !== '/' && rota !== '/404';
const COM_FAQ = new Set(['/', '/treinamento-nr-1/', '/curso-de-idiomas/']);

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
    conferirRobotsLiberado(readFileSync(join(DIST, 'robots.txt'), 'utf8'));
  });

  it('não aponta sitemap no robots.txt do preview', () => {
    expect(readFileSync(join(DIST, 'robots.txt'), 'utf8')).not.toMatch(/^Sitemap:/im);
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

  it('aponta canonical e Open Graph para o domínio definitivo', () => {
    conferirEnderecos({ arquivo, rota, html, raiz });
  });

  it('descreve a organização em JSON-LD, com Novee como nome alternativo', () => {
    const organizacao = jsonLd(raiz).find((no) => no['@type'] === 'EducationalOrganization');
    expect(organizacao).toBeDefined();
    expect(organizacao?.name).toBe('9vee');
    expect(organizacao?.alternateName).toBe('Novee');
  });

  // A 9vee não tem sede aberta ao público: a área atendida, o contato e as redes dizem onde encontrá-la.
  it('não dá endereço à organização, e diz onde ela atende e como falar com ela', () => {
    const nos = jsonLd(raiz);
    const organizacao = nos.find((no) => no['@type'] === 'EducationalOrganization');
    expect(JSON.stringify(nos)).not.toMatch(/PostalAddress|LocalBusiness|"address"/);
    expect(organizacao?.areaServed).toContainEqual({ '@type': 'Country', name: 'Brasil' });
    expect(organizacao?.contactPoint).toMatchObject({ '@type': 'ContactPoint', email: expect.stringContaining('@') });
    expect(organizacao?.sameAs).toEqual(expect.arrayContaining([expect.stringMatching(/^https:\/\//)]));
  });

  it('repete no FAQPage o mesmo FAQ que a página mostra', () => {
    const faqs = jsonLd(raiz).filter((no) => no['@type'] === 'FAQPage');
    expect(faqs.length, 'mais de um FAQPage').toBeLessThanOrEqual(1);
    const doJson = (faqs[0]?.mainEntity ?? []) as { name: string; acceptedAnswer: { text: string } }[];
    const daPagina = raiz.querySelectorAll('.faq details').map((item) => ({
      pergunta: textoComoNoJsonLd(item.querySelector('summary')!),
      resposta: textoComoNoJsonLd(item.querySelector('.faq__resposta')!),
    }));
    if (COM_FAQ.has(rota)) expect(daPagina.length, `${rota} sem FAQ`).toBeGreaterThanOrEqual(4);
    expect(doJson.map((q) => ({ pergunta: q.name, resposta: q.acceptedAnswer.text }))).toEqual(daPagina);
  });

  it('mostra a trilha em toda página interna, igual ao BreadcrumbList', () => {
    const trilha = raiz.querySelector('nav.trilha');
    const trilhas = jsonLd(raiz).filter((no) => no['@type'] === 'BreadcrumbList');
    if (!temTrilha(rota)) {
      expect(trilha, rota).toBeNull();
      expect(trilhas, rota).toEqual([]);
      return;
    }
    expect(trilha, `${rota} sem trilha na tela`).not.toBeNull();
    expect(trilhas, `${rota} precisa de um BreadcrumbList, e só um`).toHaveLength(1);
    const itens = trilhas[0].itemListElement as { position: number; name: string; item: string }[];
    const passos = trilha!.querySelectorAll('li');
    expect(itens.map((i) => i.position)).toEqual(itens.map((_, i) => i + 1));
    expect(itens.map((i) => i.name)).toEqual(passos.map((li) => textoComoNoJsonLd(li)));
    expect(itens[0].item).toBe(`${DOMINIO}/`);
    expect(itens.at(-1)?.item).toBe(`${DOMINIO}${rota}`);
    // Os passos antes do último são links para o endereço do JSON-LD. O último é a página: sem link.
    passos.slice(0, -1).forEach((li, i) => {
      const href = li.querySelector('a')?.getAttribute('href');
      expect(href, `o passo ${i + 1} da trilha não é link`).toBeTruthy();
      expect(new URL(href!, `${DOMINIO}${rota}`).href).toBe(itens[i].item);
    });
    expect(passos.at(-1)?.querySelector('a')).toBeNull();
    expect(passos.at(-1)?.querySelector('[aria-current="page"]')).not.toBeNull();
  });

  // O nome vem do menu, e não do trecho da mensagem do WhatsApp, que tem outra caixa e muda por outro motivo.
  it('dá à página, na trilha, o mesmo nome que ela tem no menu', () => {
    if (!temTrilha(rota)) return;
    const noMenu = raiz.querySelectorAll('header a').find((link) => link.getAttribute('href') === rota);
    expect(noMenu, `${rota} fora do menu`).toBeDefined();
    const nome = (noMenu!.querySelector('.painel__item') ?? noMenu!).text.trim();
    expect(textoComoNoJsonLd(raiz.querySelector('nav.trilha [aria-current="page"]')!)).toBe(nome);
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

  it('usa o círculo da marca no topo e no fechamento, como enfeite (com o logo só no fim da home)', () => {
    const blocos = raiz.querySelectorAll('.hero__visual, .hero-pagina__visual, .cta-final');
    if (rota !== '/404') expect(blocos.length, `${rota} sem hero`).toBeGreaterThan(0);
    for (const bloco of blocos) {
      const circulo = bloco.querySelector('[aria-hidden="true"] img');
      expect(circulo, rota).not.toBeNull();
      expect(circulo?.getAttribute('alt')).toBe('');
      const comLogo = rota === '/' && bloco.matches('.cta-final');
      expect(circulo?.getAttribute('src')).toMatch(comLogo ? /\/circulo-marca-logo\./ : /\/circulo-marca\./);
    }
  });

  it('tem width, height e alt em toda imagem', () => {
    for (const img of raiz.querySelectorAll('img')) {
      expect(img.getAttribute('width'), img.toString()).toBeTruthy();
      expect(img.getAttribute('height'), img.toString()).toBeTruthy();
      expect(img.hasAttribute('alt'), img.toString()).toBe(true);
    }
  });

  // A mesma regra da trava: o preview não pode ter link que a produção barraria.
  it('resolve todos os links internos e âncoras', () => {
    expect(linksQuebrados({ arquivo, rota, html, raiz }, DIST)).toEqual([]);
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

  // As cores do grifo (--grifo-*) e a cor do grupo (--cor-grupo) são magenta e violeta com outro nome.
  it('não usa magenta nem violeta como cor de texto (a paleta reserva as duas para forma e foco)', () => {
    const css = raiz.querySelectorAll('style').map((s) => s.textContent).join('\n');
    expect(css).not.toMatch(/(?<![\w-])color:\s*var\(--(?:magenta|violeta|cor-grupo|grifo-[\w-]+)\)/);
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
