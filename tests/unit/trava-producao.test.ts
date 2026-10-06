import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { pendenciasNoConteudo, verificarBuild, type Achado } from '../../scripts/trava-producao.ts';
import { montarBuild } from './build-de-mentira.ts';

const pagina = (corpo: string, cabeca = '') =>
  `<!doctype html><html lang="pt-BR"><head><title>9vee</title>${cabeca}</head><body><main id="topo">${corpo}</main></body></html>`;

const LIMPA = pagina('<h1>Cursos</h1><p>Texto certo.</p><a href="/sobre/">Sobre</a><a href="#topo">Topo</a>');

const regras = (achados: Achado[]) => achados.map((achado) => achado.regra);

describe('verificarBuild', () => {
  it('deixa passar um build limpo', () => {
    const pasta = montarBuild({ 'index.html': LIMPA, 'sobre/index.html': pagina('<h1>Sobre</h1>') });
    expect(verificarBuild(pasta)).toEqual([]);
  });

  it('barra a pendência marcada na tela e a que escapou crua', () => {
    const pasta = montarBuild({
      'index.html': pagina(
        '<p>São <mark class="confirmar" title="A confirmar com a Daniella: ano de fundação">a confirmar</mark> anos.</p>' +
          '<p>Turma de [CONFIRMAR COM O ARTHUR: tamanho da turma] pessoas.</p>',
      ),
    });
    const achados = verificarBuild(pasta);
    expect(regras(achados)).toEqual(['pendencia', 'pendencia']);
    expect(achados.map((achado) => achado.detalhe).join(' ')).toMatch(/ano de fundação.*tamanho da turma/);
  });

  it('barra o Placeholder de imagem, dizendo qual é', () => {
    const pasta = montarBuild({
      'index.html': pagina(
        '<div class="figura placeholder placeholder--a" role="img" aria-label="Auditório"><span class="placeholder__id">IMG-HOME-HERO-FUNDO</span></div>',
      ),
    });
    expect(verificarBuild(pasta)).toEqual([{ regra: 'placeholder', onde: '/', detalhe: 'IMG-HOME-HERO-FUNDO' }]);
  });

  it('barra a etiqueta de obra e o aviso de envio simulado do MVP', () => {
    const pasta = montarBuild({
      'lms/index.html': pagina(
        '<p class="hero-pagina__etiqueta">Página em construção no MVP</p>' +
          '<p class="drawer__simulado">MVP: envio simulado. No site final, este pedido chega à equipe por e-mail.</p>',
      ),
    });
    const achados = verificarBuild(pasta);
    expect(regras(achados)).toEqual(['obra', 'obra']);
    expect(achados.every((achado) => achado.onde === '/lms/')).toBe(true);
  });

  it('não confunde a resposta "Em construção" do formulário com a etiqueta de obra', () => {
    const pasta = montarBuild({
      'index.html': pagina(
        '<fieldset><legend>Já existe um programa?</legend><label><input type="radio" name="programa" value="em-construcao"><span>Em construção</span></label></fieldset>',
      ),
    });
    expect(verificarBuild(pasta)).toEqual([]);
  });

  // A revisão de um texto que era do cliente (a política de privacidade) só vai ao ar depois da aprovação, sem marcas.
  it('barra as marcas de revisão: a legenda, a seção nova, o trecho novo, o que sai e a marca crua', () => {
    const pasta = montarBuild({
      'politica/index.html': pagina(
        '<aside class="politica__legenda revisao"><p>Para a revisão de vocês</p></aside>' +
          '<section class="politica__secao revisao"><h2>Quem cuida</h2></section>' +
          '<p>Fale <ins class="revisao">pelo e-mail</ins><del class="revisao">no item 6</del>.</p>' +
          '<p>Prazo [NOVO: de 6 meses].</p>',
      ),
    });
    const achados = verificarBuild(pasta);
    expect(regras(achados)).toEqual(['revisao', 'revisao', 'revisao', 'revisao', 'revisao']);
    expect(achados.map((achado) => achado.detalhe)).toEqual([
      'Para a revisão de vocês',
      'Quem cuida',
      'pelo e-mail',
      'no item 6',
      '[NOVO: de 6 meses]',
    ]);
  });

  it('barra o noindex na meta e no cabeçalho da Cloudflare', () => {
    const pasta = montarBuild({
      'index.html': pagina('<h1>Cursos</h1>', '<meta name="robots" content="noindex, nofollow">'),
      _headers: '/*\n  X-Robots-Tag: noindex, nofollow\n',
    });
    expect(verificarBuild(pasta)).toEqual([
      { regra: 'noindex', onde: '/', detalhe: 'meta robots "noindex, nofollow"' },
      { regra: 'noindex', onde: '_headers', detalhe: 'X-Robots-Tag: noindex, nofollow' },
    ]);
  });

  it('barra o travessão e a meia-risca, com o trecho em volta', () => {
    const pasta = montarBuild({
      'index.html': pagina('<p>Aulas de inglês — online ou presencial.</p><img src="/a.png" alt="De A1 – C2" width="1" height="1">'),
      'a.png': '',
    });
    const achados = verificarBuild(pasta);
    expect(regras(achados)).toEqual(['travessao', 'travessao']);
    expect(achados[0].detalhe).toContain('inglês — online');
  });

  it('barra link interno quebrado, sem barra no fim ou com âncora que não existe', () => {
    const pasta = montarBuild({
      'index.html': pagina(
        '<a href="/nao-existe/">A</a><a href="/sobre">B</a><a href="#fantasma">C</a><a href="/sobre/#fantasma">D</a>',
      ),
      'sobre/index.html': pagina('<h1>Sobre</h1>'),
    });
    expect(verificarBuild(pasta).map((achado) => achado.detalhe)).toEqual([
      'link quebrado: /nao-existe/',
      'sem barra no fim: /sobre',
      'âncora que não existe: #fantasma',
      'âncora que não existe: /sobre/#fantasma',
    ]);
  });

  // A chave do serviço de formulário vai no HTML, com os dados do pedido, e é a mesma em todas as páginas.
  describe('chave do pedido', () => {
    const comPedido = (chave: string) =>
      pagina(`<h1>Cursos</h1><script type="application/json" id="dados-contato">${JSON.stringify({ envio: { chave } })}</script>`);
    const doPedido = (achados: Achado[]) => achados.filter((achado) => achado.regra === 'formulario');

    it('barra o build que saiu sem a chave: nenhum pedido chegaria', () => {
      const pasta = montarBuild({ 'index.html': comPedido(''), 'sobre/index.html': comPedido('') });
      const achados = verificarBuild(pasta);
      // Uma vez só, e não em cada página.
      expect(achados).toHaveLength(1);
      expect(achados[0]).toMatchObject({ regra: 'formulario', onde: 'pedido de contato' });
      expect(achados[0].detalhe).toMatch(/sem a FORMULARIO_CHAVE/);
    });

    it('barra o build com a chave de teste do preview: os pedidos iriam para o e-mail de teste', () => {
      const pasta = montarBuild({ 'index.html': comPedido('chave-de-teste') });
      const achados = doPedido(verificarBuild(pasta, { chaveDeTeste: 'chave-de-teste' }));
      expect(achados).toHaveLength(1);
      expect(achados[0].detalhe).toMatch(/chave de teste/);
    });

    it('deixa passar o build com a chave própria da produção', () => {
      const pasta = montarBuild({ 'index.html': comPedido('chave-da-9vee') });
      expect(verificarBuild(pasta, { chaveDeTeste: 'chave-de-teste' })).toEqual([]);
      expect(verificarBuild(pasta)).toEqual([]);
    });

    it('não confunde a falta da chave de teste com chave repetida', () => {
      const pasta = montarBuild({ 'index.html': comPedido('chave-da-9vee') });
      expect(verificarBuild(pasta, { chaveDeTeste: '' })).toEqual([]);
    });
  });

  it('confere arquivo sem exigir barra, e ignora link externo, e-mail e telefone', () => {
    const pasta = montarBuild({
      'index.html': pagina(
        '<a href="/og.jpg">imagem</a><a href="/logo.png">logo</a>' +
          '<a href="https://wa.me/5511934661917">WhatsApp</a><a href="mailto:contato@9vee.com.br">e-mail</a><a href="tel:+5511934661917">telefone</a>',
      ),
      'og.jpg': '',
    });
    expect(verificarBuild(pasta).map((achado) => achado.detalhe)).toEqual(['link quebrado: /logo.png']);
  });
});

// A página nem sempre mostra a pendência como marca: a faixa de números da home tira a nota do texto, e o
// título, a descrição e o JSON-LD saem sem ela. Por isso a trava também lê a fonte, em content/.
describe('pendenciasNoConteudo', () => {
  it('acha a pendência em qualquer arquivo de content/, também nas subpastas', () => {
    const raiz = montarBuild({
      'content/home.md': '---\nprova:\n  - valor: 19\n    pendencia: "[CONFIRMAR COM A DANIELLA: ano de fundação]"\n---\n',
      'content/idiomas/ingles.md': '---\nseo:\n  descricao: "Inglês com [CONFIRMAR COM A DANIELLA: níveis]"\n---\n',
      'content/lms.md': '---\n# O [CONFIRMAR: ...] vira etiqueta na tela.\nhero:\n  h1: "LMS"\n---\n',
    });
    expect(pendenciasNoConteudo(join(raiz, 'content'))).toEqual([
      { regra: 'pendencia', onde: 'content/home.md', detalhe: 'ano de fundação' },
      { regra: 'pendencia', onde: 'content/idiomas/ingles.md', detalhe: 'níveis' },
    ]);
  });

  // A página não publicada fica fora do build de produção: a pendência dela não vai ao ar.
  it('pula o arquivo da página não publicada', () => {
    const raiz = montarBuild({
      'content/idiomas/espanhol.md': '---\nidioma: "espanhol"\npublicada: true\nseo:\n  titulo: "[CONFIRMAR COM O ARTHUR: níveis]"\n---\n',
      'content/idiomas/ingles.md': '---\nidioma: "ingles"\npublicada: false\nseo:\n  titulo: "[CONFIRMAR COM O ARTHUR: provas]"\n---\n',
    });
    expect(pendenciasNoConteudo(join(raiz, 'content'))).toEqual([
      { regra: 'pendencia', onde: 'content/idiomas/espanhol.md', detalhe: 'níveis' },
    ]);
  });

  // A marca só vale na pasta das páginas que podem ficar fora. Esquecida numa página do menu, que vai ao ar de
  // qualquer jeito, ela não pode esconder uma pendência.
  it('lê a pendência da página do menu mesmo com a marca de não publicada', () => {
    const raiz = montarBuild({
      'content/lms.md': '---\npublicada: false\nhero:\n  h1: "[CONFIRMAR COM A DANIELLA: nome da plataforma]"\n---\n',
    });
    expect(pendenciasNoConteudo(join(raiz, 'content'))).toEqual([
      { regra: 'pendencia', onde: 'content/lms.md', detalhe: 'nome da plataforma' },
    ]);
  });
});
