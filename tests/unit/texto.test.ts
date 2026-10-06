import { describe, expect, it } from 'vitest';
import {
  comEspacoFixo,
  detalheDaPendencia,
  formatarInline,
  jsonParaScript,
  lerPendencias,
  marcarPendencias,
  pendenciasDoArquivo,
  textoPuro,
} from '../../src/lib/texto';

// Os textos da etiqueta vêm de content/site.md; aqui, os mesmos do conteúdo.
const quem = { daniella: 'a Daniella', arthur: 'o Arthur' };
const pendencia = { etiqueta: 'a confirmar', detalhe: 'com {quem}: {nota}', quem };
const formatar = (texto: string) => formatarInline(texto, pendencia);
const marcar = (html: string) => marcarPendencias(html, pendencia);

describe('formatarInline', () => {
  it('escapa HTML antes de qualquer marcação', () => {
    expect(formatar('<script>alert("x")</script> & cia')).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; cia',
    );
  });

  it('transforma **negrito** em <strong>', () => {
    expect(formatar('aula **online** ou presencial')).toBe(
      'aula <strong>online</strong> ou presencial',
    );
  });

  it('transforma link interno sem abrir nova aba', () => {
    expect(formatar('veja a [página de NR-1](/treinamento-nr-1/)')).toBe(
      'veja a <a href="/treinamento-nr-1/">página de <span class="sem-quebra">NR-1</span></a>',
    );
  });

  it('abre link externo em nova aba, com noopener e aviso para leitor de tela', () => {
    expect(formatar('[Portaria](https://www.gov.br/x?a=1&b=2)')).toBe(
      '<a href="https://www.gov.br/x?a=1&amp;b=2" target="_blank" rel="noopener">Portaria<span class="visualmente-oculto"> (abre em nova aba)</span></a>',
    );
  });

  // A revisão de um texto que era do cliente: o trecho que entrou fica com fundo de destaque, e o que sai, riscado.
  it('marca o trecho novo e o que sai, com link e pendência dentro', () => {
    expect(formatar('canais oficiais[NOVO: , como o [e-mail](mailto:a@b.com)][SAI: no item 6].')).toBe(
      'canais oficiais<ins class="revisao">, como o <a href="mailto:a@b.com">e-mail</a></ins><del class="revisao">no item 6</del>.',
    );
    expect(formatar('[NOVO: Prazo de [CONFIRMAR: prazo]]')).toMatch(/^<ins class="revisao">Prazo de <mark class="confirmar"[^>]*>.*<\/mark><\/ins>$/);
  });

  it('não gera link para esquemas perigosos', () => {
    const html = formatar('[clique](javascript:alert(1))');
    expect(html).not.toContain('<a');
    expect(html).toContain('clique');
  });

  it('usa o texto da etiqueta que vem do conteúdo', () => {
    expect(formatarInline('[CONFIRMAR: prazo]', { etiqueta: 'pendente', detalhe: 'de aprovação: {nota}', quem })).toBe(
      '<mark class="confirmar" title="Pendente de aprovação: prazo">pendente<span class="visualmente-oculto"> de aprovação: prazo</span></mark>',
    );
  });

  it('marca pendência com valor ao lado como etiqueta discreta', () => {
    const html = formatar('19 anos [CONFIRMAR COM A DANIELLA: ano de fundação]');
    expect(html).toBe(
      '19 anos <mark class="confirmar" title="A confirmar com a Daniella: ano de fundação">a confirmar<span class="visualmente-oculto"> com a Daniella: ano de fundação</span></mark>',
    );
  });

  it('diz quem responde a pendência: a Daniella ou o Arthur', () => {
    expect(formatar('Aulas [CONFIRMAR COM O ARTHUR: níveis oferecidos]')).toBe(
      'Aulas <mark class="confirmar" title="A confirmar com o Arthur: níveis oferecidos">a confirmar<span class="visualmente-oculto"> com o Arthur: níveis oferecidos</span></mark>',
    );
  });

  it('aceita a forma curta [CONFIRMAR: ...]', () => {
    expect(formatar('Carga horária: [CONFIRMAR: carga horária]')).toContain(
      '<mark class="confirmar" title="A confirmar com a Daniella: carga horária">',
    );
  });

  it('escapa aspas dentro da nota da pendência', () => {
    expect(formatar('[CONFIRMAR: o site diz "mais de 20"]')).toContain(
      'title="A confirmar com a Daniella: o site diz &quot;mais de 20&quot;"',
    );
  });

  it('impede que siglas com hífen quebrem no fim da linha', () => {
    expect(formatar('Treinamento de NR-1 e preparação para CELPE-Bras')).toBe(
      'Treinamento de <span class="sem-quebra">NR-1</span> e preparação para <span class="sem-quebra">CELPE-Bras</span>',
    );
  });

  it('mantém o title da pendência sem tags mesmo com sigla protegida na nota', () => {
    const html = formatar('[CONFIRMAR: carga horária do NR-1]');
    expect(html).toContain('title="A confirmar com a Daniella: carga horária do NR-1"');
    expect(html).toContain('com a Daniella: carga horária do <span class="sem-quebra">NR-1</span>');
  });

  it('não mexe em endereço de link com a sigla em minúsculas', () => {
    expect(formatar('[a página](/treinamento-nr-1/)')).toBe('<a href="/treinamento-nr-1/">a página</a>');
  });

  it('trata pendência e link na mesma frase sem misturar os dois', () => {
    const html = formatar('[Lei 14.831](https://planalto.gov.br) [CONFIRMAR: regulamento]');
    expect(html).toContain('<a href="https://planalto.gov.br"');
    expect(html).toContain('<mark class="confirmar"');
  });
});

describe('marcarPendencias', () => {
  it('troca os marcadores em HTML já renderizado sem mexer nas tags', () => {
    expect(marcar('<p>Turmas de <em>até</em> [CONFIRMAR: tamanho da turma].</p>')).toBe(
      '<p>Turmas de <em>até</em> <mark class="confirmar" title="A confirmar com a Daniella: tamanho da turma">a confirmar<span class="visualmente-oculto"> com a Daniella: tamanho da turma</span></mark>.</p>',
    );
  });
});

describe('lerPendencias', () => {
  it('lista as notas na ordem em que aparecem', () => {
    const texto =
      '19 anos [CONFIRMAR COM A DANIELLA: ano de fundação] e +160 clientes [CONFIRMAR: número de clientes]';
    expect(lerPendencias(texto).map(({ nota }) => nota)).toEqual(['ano de fundação', 'número de clientes']);
  });

  it('devolve lista vazia quando não há pendência', () => {
    expect(lerPendencias('texto confirmado')).toEqual([]);
  });

  it('diz quem responde cada pendência; a forma curta fica com a Daniella', () => {
    const texto = '[CONFIRMAR COM O ARTHUR: níveis] e [CONFIRMAR COM A DANIELLA: preço] e [CONFIRMAR: prazo]';
    expect(lerPendencias(texto)).toEqual([
      { responsavel: 'arthur', nota: 'níveis' },
      { responsavel: 'daniella', nota: 'preço' },
      { responsavel: 'daniella', nota: 'prazo' },
    ]);
  });
});

describe('detalheDaPendencia', () => {
  it('diz com quem está a pendência, em texto puro, pelo modelo do content/', () => {
    expect(detalheDaPendencia({ responsavel: 'arthur', nota: 'horas por nível' }, pendencia)).toBe(
      'com o Arthur: horas por nível',
    );
    expect(detalheDaPendencia({ responsavel: 'daniella', nota: 'R$ <10>' }, pendencia)).toBe('com a Daniella: R$ <10>');
  });
});

describe('pendenciasDoArquivo', () => {
  it('lê as pendências de um arquivo de content/, no frontmatter e no corpo', () => {
    const arquivo = [
      '---',
      'prova:',
      '  - valor: 19',
      '    pendencia: "[CONFIRMAR COM A DANIELLA: ano de fundação]"',
      '---',
      '# Título do corpo [CONFIRMAR COM A DANIELLA: nome da seção]',
    ].join('\n');
    expect(pendenciasDoArquivo(arquivo)).toEqual([
      { responsavel: 'daniella', nota: 'ano de fundação' },
      { responsavel: 'daniella', nota: 'nome da seção' },
    ]);
  });

  it('ignora o comentário do YAML, que cita o formato sem ser texto do site', () => {
    const arquivo = [
      '---',
      '# Pendências para a reunião: o [CONFIRMAR COM A DANIELLA: ...] dos textos vira esta etiqueta.',
      'pendencia:',
      '  etiqueta: "a confirmar"',
      '---',
    ].join('\n');
    expect(pendenciasDoArquivo(arquivo)).toEqual([]);
  });
});

describe('textoPuro', () => {
  it('tira marcação e pendências para title, description e JSON-LD', () => {
    expect(
      textoPuro('Aulas **online** na [9vee](/) desde 2007 [CONFIRMAR: ano de fundação].'),
    ).toBe('Aulas online na 9vee desde 2007.');
  });

  it('tira também a pendência do Arthur', () => {
    expect(textoPuro('Turmas do A1 ao C2 [CONFIRMAR COM O ARTHUR: níveis oferecidos].')).toBe('Turmas do A1 ao C2.');
  });

  it('fica com o texto revisado: o trecho novo entra, e o que sai some', () => {
    expect(textoPuro('Fale pelos canais [SAI: do item 6][NOVO: do [e-mail](mailto:a@b.com)].')).toBe('Fale pelos canais do e-mail.');
  });
});

describe('comEspacoFixo', () => {
  it('troca cada espaço pelo espaço que não quebra, para o trecho descer inteiro para a linha de baixo', () => {
    expect(comEspacoFixo('por semana.')).toBe('por\u00a0semana.');
    expect(comEspacoFixo('24 horas por dia,')).toBe('24\u00a0horas\u00a0por\u00a0dia,');
  });

  it('deixa como está o trecho de uma palavra só', () => {
    expect(comEspacoFixo('semana.')).toBe('semana.');
  });

  // Dentro dos colchetes o espaço fica como está: a marca de pendência e o rótulo do link precisam dele para o
  // formatador reconhecer.
  it('não mexe no espaço de dentro da marca de pendência nem do rótulo de um link', () => {
    expect(comEspacoFixo('7 dias [CONFIRMAR COM A DANIELLA: se vale no fim de semana]')).toBe(
      '7\u00a0dias\u00a0[CONFIRMAR COM A DANIELLA: se vale no fim de semana]',
    );
    expect(comEspacoFixo('veja o [plano de ação](/treinamento-nr-1/) hoje')).toBe(
      'veja\u00a0o\u00a0[plano de ação](/treinamento-nr-1/)\u00a0hoje',
    );
  });

  it('deixa a pendência virar etiqueta no formatador', () => {
    expect(formatar(comEspacoFixo('7 dias [CONFIRMAR: fim de semana]'))).toContain('<mark class="confirmar"');
  });
  // O espaço fixo é texto comum: passa pelo formatador sem virar entidade nem perder a marcação em volta.
  it('convive com o formatador de texto', () => {
    expect(formatar(comEspacoFixo('7 dias'))).toBe('7\u00a0dias');
  });
});

describe('jsonParaScript', () => {
  it('escapa o "<" para nenhum texto fechar a tag <script>', () => {
    const dados = { texto: '</script><script>alert(1)</script>' };
    const json = jsonParaScript(dados);
    expect(json).not.toContain('<');
    expect(JSON.parse(json)).toEqual(dados);
  });
});
