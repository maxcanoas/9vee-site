import { describe, expect, it } from 'vitest';
import { montarLote, textoDaPagina, textosCompartilhados } from '../../scripts/revisao.ts';

const whatsapp = (mensagem: string) => `https://wa.me/5511934661917?text=${encodeURIComponent(mensagem)}`;

const PAGINA = `<!doctype html><html lang="pt-BR"><head>
<title>Cursos de idiomas | 9vee</title>
<meta name="description" content="Aulas de inglês e outras línguas, online ou para a equipe.">
<link rel="canonical" href="https://www.9vee.com.br/curso-de-idiomas/">
</head><body>
<header><nav><a href="/">Página inicial</a></nav></header>
<main id="conteudo">
<section><nav class="trilha" aria-label="Você está aqui"><ol> <li><a href="/">Início</a></li> <li><span aria-current="page">Cursos de idiomas</span></li> </ol></nav>
<p class="rotulo">Para você e para a sua equipe</p><h1>Cursos de idiomas</h1>
<p>Do inglês ao japonês, com <strong>aula particular</strong> ou <a href="/lms/">pela plataforma</a>.</p>
<button type="button" data-abre-contato><span><span data-publico-texto="neutro">Pedir orçamento</span><span data-publico-texto="empresa">Pedir orçamento</span><span data-publico-texto="voce">Quero estudar</span></span></button>
<picture><img src="/a.avif" alt="Aluna numa aula de idioma, sorrindo." width="1" height="1"></picture>
<div class="saudacoes" aria-hidden="true">Hello Hola</div>
</section>
<section><h2>Perguntas</h2>
<details><summary><h3>Quanto custa?</h3></summary><div><p>Depende do formato <mark class="confirmar" title="A confirmar com a Daniella: faixa de preço">a confirmar<span class="visualmente-oculto"> com a Daniella: faixa de preço</span></mark>.</p></div></details>
<ul><li><p>Para empresas</p><h3>Tradução simultânea</h3><p>Intérpretes em cabine.</p><a href="/traducao-simultanea/">Ver a tradução simultânea</a></li></ul>
<noscript><p>Lista sem JavaScript</p></noscript>
<a href="https://www.gov.br/x" target="_blank" rel="noopener">Portaria<span class="visualmente-oculto"> (abre em nova aba)</span></a>
</section>
<section><figure><blockquote><p>Equipe pontual.</p></blockquote><figcaption> <span class="logo"><svg aria-hidden="true"></svg></span> <span>Eduardo Martins</span> <span>Diretor de Vendas, Nissan</span> <span>Autorização de uso: <mark class="confirmar" title="A confirmar com a Daniella: autorização por escrito">a confirmar<span class="visualmente-oculto"> com a Daniella: autorização por escrito</span></mark></span> </figcaption></figure>
<details class="prova__notas"><summary> <span>a confirmar</span> <span>Números do site atual</span> </summary><ul><li>com a Daniella: ano de fundação</li></ul></details>
</section></main>
<footer><p>© 2026 9vee</p></footer>
<a class="whatsapp-flutuante" href="${whatsapp('Olá, 9vee. Vim pela página Cursos de Idiomas do site e quero saber dos cursos.')}" data-whatsapp-flutuante data-href-empresa="${whatsapp('Olá, 9vee. Quero aulas para a minha equipe.')}" data-href-voce="${whatsapp('Olá, 9vee. Quero aulas para mim.')}"><span class="visualmente-oculto">Conversar no WhatsApp</span></a>
</body></html>`;

describe('textoDaPagina', () => {
  const texto = textoDaPagina({ nome: 'Cursos de Idiomas', html: PAGINA });

  it('abre com o endereço, o título e a descrição que o Google mostra', () => {
    expect(texto).toContain('## Cursos de Idiomas');
    expect(texto).toContain('- Endereço: https://www.9vee.com.br/curso-de-idiomas/');
    expect(texto).toContain('- Título no Google: Cursos de idiomas | 9vee');
    expect(texto).toContain('- Descrição no Google: Aulas de inglês e outras línguas, online ou para a equipe.');
  });

  it('traz a mensagem do botão do WhatsApp, a neutra e a de cada público', () => {
    expect(texto).toContain('- Mensagem do botão do WhatsApp: "Olá, 9vee. Vim pela página Cursos de Idiomas do site e quero saber dos cursos."');
    expect(texto).toContain('  - Para quem escolheu "Para sua empresa": "Olá, 9vee. Quero aulas para a minha equipe."');
    expect(texto).toContain('  - Para quem escolheu "Para você": "Olá, 9vee. Quero aulas para mim."');
  });

  it('põe o texto da página na ordem da tela, com os títulos em nível', () => {
    const ordem = [
      '[Caminho: Início > Cursos de idiomas]',
      'Para você e para a sua equipe',
      '### Cursos de idiomas',
      'Do inglês ao japonês, com aula particular ou pela plataforma.',
      '[Botão: Pedir orçamento (para você: Quero estudar)]',
      '[Imagem: Aluna numa aula de idioma, sorrindo.]',
      '#### Perguntas',
      '##### Quanto custa?',
      'Depende do formato [A confirmar com a Daniella: faixa de preço].',
      'Para empresas',
      '##### Tradução simultânea',
      'Intérpretes em cabine.',
      '[Link: Ver a tradução simultânea]',
      '[Link: Portaria]',
    ];
    const posicoes = ordem.map((trecho) => texto.indexOf(trecho));
    expect(posicoes.every((posicao) => posicao >= 0), JSON.stringify(ordem.filter((_, i) => posicoes[i] < 0))).toBe(true);
    expect(posicoes).toEqual([...posicoes].sort((a, b) => a - b));
  });

  // Em itens soltos, o Markdown juntaria os passos à lista do endereço e do título, logo acima.
  it('põe a trilha numa linha só, e não como itens de lista', () => {
    expect(texto).not.toContain('- [Link: Início]');
  });

  // No HTML, as partes vêm lado a lado, sem texto entre elas; na tela, cada uma tem a sua linha.
  it('separa o que a tela mostra em linhas, como o nome e o cargo de um depoimento', () => {
    expect(texto).toContain(
      'Eduardo Martins · Diretor de Vendas, Nissan · Autorização de uso: [A confirmar com a Daniella: autorização por escrito]',
    );
    expect(texto).toContain('a confirmar · Números do site atual');
    expect(texto).toContain('- com a Daniella: ano de fundação');
  });

  it('deixa de fora código, enfeite, texto só do leitor de tela e o menu e o rodapé', () => {
    for (const trecho of ['<', 'Hello Hola', 'Lista sem JavaScript', 'abre em nova aba', 'Página inicial', '© 2026']) {
      expect(texto).not.toContain(trecho);
    }
  });
});

const COMPARTILHADOS = `<!doctype html><html lang="pt-BR"><head><title>9vee</title></head><body>
<header><a class="pular" href="#conteudo">Pular para o conteúdo</a>
<nav class="nav-larga"><button type="button">Empresas</button><div class="painel"><a href="/lms/"><span>LMS</span> <span>Plataforma de cursos</span></a></div></nav>
<div class="menu-movel"><a href="/lms/">LMS repetido no celular</a></div></header>
<main><h1>Home</h1><p>Texto da home</p></main>
<footer><p>A 9vee ensina idiomas.</p><ul><li><a href="https://www.instagram.com/9veeoficial" aria-label="9vee no Instagram"><svg></svg></a></li></ul><p>© 2026 9vee</p></footer>
<dialog class="drawer"><h2><span data-modo-texto="orcamento">Pedir orçamento</span><span data-modo-texto="aulas">Montar suas aulas</span></h2><section data-etapa="publico"><fieldset><legend><h3>É para sua empresa ou para você?</h3></legend><label><input class="visualmente-oculto" type="radio"><span>Para a minha empresa</span></label><label><input class="visualmente-oculto" type="radio"><span>Para mim</span></label></fieldset></section>
<section data-etapa="detalhes" hidden><h3 data-titulo-detalhes>Sobre o treinamento</h3><div data-formulario="traducao" hidden><div class="campo"><label for="c1">Nome da empresa</label><input type="text" id="c1"></div></div></section>
<section data-etapa="confirmado" hidden><h3>Pedido anotado.</h3><p>A equipe responde logo.</p></section></dialog>
<script type="application/json" id="dados-contato">${JSON.stringify({
  pagina: 'inicial',
  titulosDetalhes: { traducao: 'Sobre o evento' },
  modelos: {
    abertura: 'Olá, 9vee. Vim pela página {pagina} do site{publico}.',
    publico: { empresa: ' e falo pela minha empresa', voce: ' e é para mim' },
    pedido: {
      nr1: 'Quero um orçamento de treinamento de NR-1.',
      traducao: 'Quero um orçamento de tradução simultânea.',
      idiomas: 'Quero um orçamento de aulas de idioma.',
      lms: 'Quero um orçamento do LMS.',
    },
    nome: 'Meu nome é {nome}.',
    flutuante: 'Olá, 9vee. Vim pela página {pagina} do site e {assunto}.',
  },
  erros: { escolha: 'Escolha uma das opções.', nome: 'Escreva como podemos te chamar.' },
})}</script>
</body></html>`;

describe('textosCompartilhados', () => {
  const texto = textosCompartilhados(COMPARTILHADOS);

  it('traz o menu uma vez só, o rodapé e o pedido inteiro, também os passos escondidos', () => {
    for (const trecho of [
      '### Menu',
      'Empresas',
      '[Link: LMS · Plataforma de cursos]',
      '### Rodapé',
      'A 9vee ensina idiomas.',
      '### Pedido de orçamento',
      'É para sua empresa ou para você?',
      '- Para a minha empresa',
      '- Para mim',
      'Pedido anotado.',
    ]) {
      expect(texto, trecho).toContain(trecho);
    }
    expect(texto).not.toContain('LMS repetido no celular');
    expect(texto).not.toContain('Texto da home');
  });

  it('mostra as duas versões do título do pedido, o link de ícone pelo rótulo e o campo de texto como campo', () => {
    expect(texto).toContain('#### Pedir orçamento / Montar suas aulas');
    expect(texto).toContain('[Link: 9vee no Instagram]');
    expect(texto).toContain('[Campo: Nome da empresa]');
  });

  it('dá a cada bloco de campos o nome do serviço, no lugar do título que só vale para um', () => {
    expect(texto).toContain('###### Sobre o evento');
    expect(texto).not.toContain('Sobre o treinamento');
  });

  it('mostra a mensagem do WhatsApp já montada, como a pessoa manda, e os avisos de erro do pedido', () => {
    for (const trecho of [
      '> Olá, 9vee. Vim pela página inicial do site e falo pela minha empresa.',
      '> Quero um orçamento de treinamento de NR-1.',
      '> Meu nome é (nome da pessoa).',
      '> Olá, 9vee. Vim pela página inicial do site e é para mim.',
      '> Quero um orçamento de aulas de idioma.',
      '- Quero um orçamento de tradução simultânea.',
      '- Quero um orçamento do LMS.',
      '- Escreva como podemos te chamar.',
    ]) {
      expect(texto, trecho).toContain(trecho);
    }
  });

  // A mensagem do botão flutuante já sai montada em cada página; aqui entra só o que o pedido monta.
  it('não mostra modelo com chave para preencher', () => {
    expect(texto).not.toMatch(/\{\w+\}/);
  });
});

describe('montarLote', () => {
  it('junta as páginas na ordem pedida, com o cabeçalho do lote e a data', () => {
    const lote = montarLote({
      numero: 1,
      titulo: 'Páginas principais',
      paginas: [
        { nome: 'Cursos de Idiomas', html: PAGINA },
        { nome: 'Outra', html: PAGINA.replace('Cursos de idiomas | 9vee', 'Outra | 9vee') },
      ],
      htmlDosCompartilhados: COMPARTILHADOS,
      data: new Date(2026, 8, 29),
    });
    expect(lote.startsWith('# Lote 1: Páginas principais')).toBe(true);
    expect(lote).toContain('29/09/2026');
    // A ordem do lote é a do HTML: a da tela do computador, antes de a pessoa escolher o público.
    expect(lote).toContain('na ordem da tela do computador');
    expect(lote.indexOf('## Cursos de Idiomas')).toBeLessThan(lote.indexOf('## Outra'));
    expect(lote.indexOf('## Outra')).toBeLessThan(lote.indexOf('## Textos que aparecem em todas as páginas'));
    expect(lote).not.toMatch(/[—–]/);
  });
});
