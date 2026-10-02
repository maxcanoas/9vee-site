import { describe, expect, it } from 'vitest';
import { linhaEmTexto, linhasDoPedido, validarCampos } from '../../src/lib/contato.ts';
import { abrirPagina, conferirFiguraEmArco, conferirServico, ilhaDoPedido, jsonLd, textoDe, textosDe } from './apoio';

const traducao = abrirPagina('traducao-simultanea');
const texto = (seletor: string) => textoDe(traducao, seletor);
const textos = (seletor: string) => textosDe(traducao, seletor);
// O pedido de tradução como a página o entrega ao script: é o formulário de verdade, de content/site.md.
const pedido = ilhaDoPedido(traducao).formularios.traducao;

describe('tradução simultânea', () => {
  it('traz as nove seções da página completa, na ordem', () => {
    // O hero é a única seção sem id: nada aponta para ele.
    const secoes = traducao.querySelectorAll('main > section').map((secao) => secao.getAttribute('id') ?? 'hero');
    expect(secoes).toEqual([
      'hero',
      'formatos',
      'como-funciona',
      'eventos',
      'idiomas-e-cidades',
      'interpretes',
      'mandarim',
      'perguntas',
      'contato',
    ]);
  });

  it('saiu das páginas parciais: sem a etiqueta de obra', () => {
    expect(traducao.querySelector('.hero-pagina__etiqueta')).toBeNull();
  });

  it('põe os três formatos lado a lado, cada um com quando usar e como funciona', () => {
    expect(textos('#formatos h3')).toEqual(['Simultânea', 'Consecutiva', 'Acompanhamento']);
    for (const formato of traducao.querySelectorAll('#formatos li')) {
      expect(formato.querySelectorAll('dt').map((dt) => dt.text.trim())).toEqual(['Quando usar', 'Como funciona']);
    }
    // O que distingue cada formato no site atual: sem pausa, com pausa e anotações, ao lado do executivo.
    const formatos = texto('#formatos');
    for (const fato of [
      'sem pausa',
      'anotações',
      'contato visual',
      'visitas institucionais',
      'rodadas de negócios',
      'apresentações corporativas',
      'parceiros internacionais',
    ]) {
      expect(formatos).toContain(fato);
    }
  });

  it('diz como a simultânea funciona: a terminologia da área, a cabine acústica e o sistema de áudio', () => {
    const comoFunciona = texto('#como-funciona');
    for (const fato of ['terminologia', 'cabines acústicas', 'sistemas de áudio']) expect(comoFunciona).toContain(fato);
  });

  it('lista os cinco tipos de evento do site atual', () => {
    expect(textos('#eventos h3')).toEqual([
      'Reuniões bilaterais e encontros diplomáticos',
      'Eventos corporativos e assembleias de acionistas',
      'Congressos, seminários e conferências',
      'Eventos internacionais, com participantes de vários países',
      'Conferências técnicas, científicas ou médicas',
    ]);
  });

  it('lista os sete idiomas com intérprete e as quatro cidades do atendimento presencial', () => {
    const [idiomas, cidades] = traducao
      .querySelectorAll('#idiomas-e-cidades ul')
      .map((lista) => lista.querySelectorAll('li').map((item) => item.text.trim()));
    expect(idiomas).toEqual(['Inglês', 'Espanhol', 'Mandarim', 'Francês', 'Italiano', 'Crioulo haitiano', 'Coreano']);
    expect(cidades).toEqual(['São Paulo', 'Rio de Janeiro', 'Curitiba', 'Brasília']);
  });

  // A lista da página e a do pedido são a mesma: quem vê o idioma na página encontra a opção dele no formulário.
  it('lista na página os mesmos idiomas que o pedido de tradução oferece, fora o "Outro"', () => {
    const idiomas = pedido.find((campo) => campo.id === 'idiomas');
    const doPedido = idiomas?.tipo === 'multipla' ? idiomas.opcoes : [];
    const daPagina = textosDe(traducao.querySelectorAll('#idiomas-e-cidades ul')[0], 'li');
    expect(doPedido.filter((opcao) => opcao !== 'Outro')).toEqual(daPagina);
  });

  it('diz quem são os intérpretes: a formação, os seis setores de experiência e onde atuam', () => {
    const interpretes = texto('#interpretes').toLowerCase();
    expect(interpretes).toContain('centros especializados');
    expect(interpretes).toContain('ambientes corporativos e institucionais');
    for (const setor of ['administração', 'engenharia', 'medicina', 'vendas', 'tecnologia', 'negócios internacionais']) {
      expect(interpretes).toContain(setor);
    }
  });

  // O que só existe no material do Canva entra com pendência (perguntas 16, 17, 33 e 34), e o prazo de resposta
  // continua na pergunta 6. O resto da página é fato do site atual.
  it('marca como pendência só o que veio do Canva e o prazo de resposta', () => {
    const pendencias = traducao.querySelectorAll('main mark.confirmar').map((marca) => marca.getAttribute('title') ?? '');
    expect(pendencias).toHaveLength(5);
    for (const assunto of [/Libras/, /Zoom/, /revezamento/, /trabalhos de interpretação/, /prazo de resposta/]) {
      expect(pendencias.some((pendencia) => assunto.test(pendencia)), String(assunto)).toBe(true);
    }
  });

  // O link para a página de interpretação de mandarim entra no ticket 21, quando ela existir.
  it('fala da interpretação de mandarim para o mercado financeiro num bloco curto, ainda sem link', () => {
    expect(texto('#mandarim h2')).toBe('Quando o negócio fala mandarim, precisão não é opcional.');
    expect(texto('#mandarim')).toContain('mercado financeiro');
    expect(traducao.querySelector('#mandarim a')).toBeNull();
  });

  it('responde oito perguntas próprias', () => {
    expect(traducao.querySelectorAll('.faq details')).toHaveLength(8);
    const perguntas = textos('.faq summary').join(' ');
    for (const assunto of [/consecutiva/, /equipamento/i, /idiomas/, /cidades/, /distância/, /Quantos intérpretes/, /discri/i, /responde/]) {
      expect(perguntas, String(assunto)).toMatch(assunto);
    }
  });

  it('abre o pedido com a tradução já escolhida, no começo, no meio e no fim', () => {
    for (const onde of ['.hero-pagina', '#eventos', '#contato']) {
      const botao = traducao.querySelector(`${onde} [data-abre-contato]`);
      expect(botao, `sem botão em ${onde}`).not.toBeNull();
      expect(botao?.getAttribute('aria-haspopup')).toBe('dialog');
    }
    for (const botao of traducao.querySelectorAll('main [data-abre-contato]')) {
      expect(botao.getAttribute('data-servico')).toBe('traducao');
    }
  });

  // A duração decide se vai um intérprete ou dois: o pedido pergunta logo depois da data.
  it('pergunta a duração do evento no pedido, depois da data, com quatro opções', () => {
    expect(pedido.map((campo) => campo.id)).toEqual([
      'empresa',
      'idiomas',
      'data',
      'duracao',
      'formato',
      'participantes',
      'cidade',
      'cidadeOutra',
    ]);
    expect(pedido.find((campo) => campo.id === 'duracao')).toMatchObject({
      tipo: 'escolha',
      obrigatorio: true,
      opcoes: ['Até 1 hora', 'Meio período', 'Dia inteiro', 'Mais de um dia'],
    });
    expect(textos('[data-formulario="traducao"] [data-campo="duracao"] label')).toEqual([
      'Até 1 hora',
      'Meio período',
      'Dia inteiro',
      'Mais de um dia',
    ]);
  });

  // Com o formulário de verdade e as funções de verdade: a resposta vai para a mensagem, e sem ela o pedido não anda.
  it('leva a duração para a mensagem do pedido, entre a data e o formato, e cobra a resposta', () => {
    const erros = { escolha: 'escolha', multipla: 'multipla', texto: 'texto', data: 'data' };
    const respostas = {
      empresa: 'Hotel Exemplo',
      idiomas: ['ingles'],
      data: 'sem-data',
      duracao: 'meio-periodo',
      formato: 'online',
      participantes: 'ate-50',
    };
    expect(linhasDoPedido(pedido, respostas, []).map(linhaEmTexto)).toEqual([
      'Empresa: Hotel Exemplo',
      'Idiomas: inglês',
      'Data do evento: ainda sem data',
      'Duração: meio período',
      'Formato: online',
      'Participantes: até 50',
    ]);
    const { duracao: _semResposta, ...semDuracao } = respostas;
    expect(validarCampos(pedido, semDuracao, 'empresa', '2026-10-01', erros)).toEqual({ duracao: 'escolha' });
  });

  // O fechamento diz em prosa o que o pedido pergunta. Cada pergunta do formulário tem a palavra dela aqui: campo
  // novo sem palavra derruba o teste, e o texto muda junto.
  it('diz no fechamento cada pergunta que o pedido de tradução faz, fora o nome da empresa', () => {
    const palavraDoCampo: Record<string, string> = {
      idiomas: 'idiomas',
      data: 'data',
      duracao: 'duração',
      formato: 'formato',
      participantes: 'quantas pessoas',
      cidade: 'cidade',
    };
    const perguntas = pedido.filter((campo) => campo.id !== 'empresa' && !campo.mostrarSe).map((campo) => campo.id);
    expect(perguntas).toEqual(Object.keys(palavraDoCampo));
    const fechamento = texto('#contato');
    for (const palavra of Object.values(palavraDoCampo)) expect(fechamento).toContain(palavra);
  });

  // "Tecnologia de ponta" só aparece na descrição do Google do site atual. Os nomes de empresa esperam a
  // autorização de cada uma (pergunta 17).
  it('deixa fora "tecnologia de ponta" e os nomes de empresa cliente', () => {
    const pagina = [texto('main'), traducao.querySelector('meta[name="description"]')?.getAttribute('content')].join(' ');
    for (const fora of [/tecnologia de ponta/i, /Ita[uú]/, /Santander/i, /TOTVS/i, /Unicef/i, /(?<!\p{L})Array(?!\p{L})/u]) {
      expect(pagina, String(fora)).not.toMatch(fora);
    }
  });

  it('descreve o serviço em JSON-LD, ligado à organização', () => {
    conferirServico(traducao, { nome: 'Tradução simultânea', caminho: '/traducao-simultanea/' });
  });

  // O site atual só afirma o atendimento presencial nas quatro cidades, e a remota é pendência: o serviço não
  // promete o país inteiro ao Google.
  it('diz ao Google que o serviço atende as quatro cidades, e não o país', () => {
    const servico = jsonLd(traducao).find((no) => no['@type'] === 'Service');
    expect(servico?.areaServed).toEqual(
      ['São Paulo', 'Rio de Janeiro', 'Curitiba', 'Brasília'].map((cidade) => ({ '@type': 'City', name: cidade })),
    );
  });

  it('traz as duas figuras em arco, com o texto alternativo definitivo', () => {
    const figuras = traducao.querySelectorAll('main .figura');
    expect(figuras).toHaveLength(2);
    for (const figura of figuras) conferirFiguraEmArco(figura, /^IMG-TRADUCAO-[A-Z-]+$/);
  });
});
