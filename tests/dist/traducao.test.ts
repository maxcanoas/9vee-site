import { describe, expect, it } from 'vitest';
import { abrirPagina, conferirFiguraEmArco, conferirServico } from './apoio';

const traducao = abrirPagina('traducao-simultanea');
const texto = (seletor: string) => traducao.querySelector(seletor)?.text.replace(/\s+/g, ' ').trim() ?? '';
const textos = (seletor: string) => traducao.querySelectorAll(seletor).map((no) => no.text.replace(/\s+/g, ' ').trim());

interface Ilha {
  formularios: Record<string, { id: string; tipo: string; opcoes?: string[] }[]>;
}

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
    for (const fato of ['sem pausa', 'anotações', 'contato visual', 'visitas institucionais', 'rodadas de negócios']) {
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
    const ilha = JSON.parse(traducao.querySelector('#dados-contato')!.textContent) as Ilha;
    const doPedido = ilha.formularios.traducao.find((campo) => campo.id === 'idiomas')?.opcoes ?? [];
    const daPagina = traducao.querySelectorAll('#idiomas-e-cidades ul')[0].querySelectorAll('li').map((item) => item.text.trim());
    expect(doPedido.filter((opcao) => opcao !== 'Outro')).toEqual(daPagina);
  });

  it('diz quem são os intérpretes: a formação e os seis setores de experiência', () => {
    const interpretes = texto('#interpretes').toLowerCase();
    expect(interpretes).toContain('centros especializados');
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

  it('fala da interpretação de mandarim para o mercado financeiro num bloco curto', () => {
    expect(texto('#mandarim h2')).toBe('Quando o negócio fala mandarim, precisão não é opcional.');
    expect(texto('#mandarim')).toContain('mercado financeiro');
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
    const ilha = JSON.parse(traducao.querySelector('#dados-contato')!.textContent) as Ilha;
    const campos = ilha.formularios.traducao;
    expect(campos.map((campo) => campo.id)).toEqual([
      'empresa',
      'idiomas',
      'data',
      'duracao',
      'formato',
      'participantes',
      'cidade',
      'cidadeOutra',
    ]);
    expect(campos.find((campo) => campo.id === 'duracao')).toMatchObject({
      tipo: 'escolha',
      opcoes: ['Até 1 hora', 'Meio período', 'Dia inteiro', 'Mais de um dia'],
    });
    const opcoes = traducao
      .querySelectorAll('[data-formulario="traducao"] [data-campo="duracao"] label')
      .map((opcao) => opcao.text.trim());
    expect(opcoes).toEqual(['Até 1 hora', 'Meio período', 'Dia inteiro', 'Mais de um dia']);
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

  it('traz as duas figuras em arco, com o texto alternativo definitivo', () => {
    const figuras = traducao.querySelectorAll('main .figura');
    expect(figuras).toHaveLength(2);
    for (const figura of figuras) conferirFiguraEmArco(figura, /^IMG-TRADUCAO-[A-Z-]+$/);
  });
});
