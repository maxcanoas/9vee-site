import { describe, expect, it } from 'vitest';
import {
  extrairPendencias,
  formatarInline,
  marcarPendencias,
  textoPuro,
} from '../../src/lib/texto';

// Os textos da etiqueta vêm de content/site.md; aqui, os mesmos do conteúdo.
const pendencia = { etiqueta: 'a confirmar', detalhe: 'com a Daniella: {nota}' };
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

  it('não gera link para esquemas perigosos', () => {
    const html = formatar('[clique](javascript:alert(1))');
    expect(html).not.toContain('<a');
    expect(html).toContain('clique');
  });

  it('usa o texto da etiqueta que vem do conteúdo', () => {
    expect(formatarInline('[CONFIRMAR: prazo]', { etiqueta: 'pendente', detalhe: 'de aprovação: {nota}' })).toBe(
      '<mark class="confirmar" title="Pendente de aprovação: prazo">pendente<span class="visualmente-oculto"> de aprovação: prazo</span></mark>',
    );
  });

  it('marca pendência com valor ao lado como etiqueta discreta', () => {
    const html = formatar('19 anos [CONFIRMAR COM A DANIELLA: ano de fundação]');
    expect(html).toBe(
      '19 anos <mark class="confirmar" title="A confirmar com a Daniella: ano de fundação">a confirmar<span class="visualmente-oculto"> com a Daniella: ano de fundação</span></mark>',
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

describe('extrairPendencias', () => {
  it('lista as notas na ordem em que aparecem', () => {
    const texto =
      '19 anos [CONFIRMAR COM A DANIELLA: ano de fundação] e +160 clientes [CONFIRMAR: número de clientes]';
    expect(extrairPendencias(texto)).toEqual(['ano de fundação', 'número de clientes']);
  });

  it('devolve lista vazia quando não há pendência', () => {
    expect(extrairPendencias('texto confirmado')).toEqual([]);
  });
});

describe('textoPuro', () => {
  it('tira marcação e pendências para title, description e JSON-LD', () => {
    expect(
      textoPuro('Aulas **online** na [9vee](/) desde 2007 [CONFIRMAR: ano de fundação].'),
    ).toBe('Aulas online na 9vee desde 2007.');
  });
});
