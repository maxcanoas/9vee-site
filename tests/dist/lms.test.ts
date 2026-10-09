import { describe, expect, it } from 'vitest';
import { abrirPagina, conferirFiguraEmArco, conferirServico, textoDe, textosDe } from './apoio';

const lms = abrirPagina('lms');
const texto = (seletor: string) => textoDe(lms, seletor);
const textos = (seletor: string) => textosDe(lms, seletor);

describe('LMS', () => {
  it('traz as nove seções da página completa, na ordem', () => {
    // O hero é a única seção sem id: nada aponta para ele.
    const secoes = lms.querySelectorAll('main > section').map((secao) => secao.getAttribute('id') ?? 'hero');
    expect(secoes).toEqual([
      'hero',
      'motivos',
      'o-que-e',
      'plataforma',
      'relatorios',
      'chamada',
      'metodologia',
      'setores',
      'contato',
    ]);
  });

  it('está no site: sem o aviso de fora do site e sem pendência', () => {
    expect(lms.querySelector('.aviso-nao-publicada')).toBeNull();
    expect(lms.querySelectorAll('main mark.confirmar')).toEqual([]);
  });

  it('diz o que é o LMS, com a sigla por extenso', () => {
    const oQueE = texto('#o-que-e');
    expect(oQueE).toContain('Learning Management System');
    expect(oQueE).toContain('sistema de gestão de aprendizagem');
    for (const parte of ['cursos online', 'conteúdos interativos', 'trilhas de aprendizagem personalizadas']) {
      expect(oQueE).toContain(parte);
    }
  });

  it('diz que a plataforma fica disponível 24 horas por dia, 7 dias por semana, no título da seção', () => {
    expect(texto('#plataforma h2')).toBe('24 horas por dia, 7 dias por semana.');
    expect(texto('#plataforma')).toMatch(/acompanhamento dos professores é contínuo/i);
  });

  // Os nomes dos três relatórios são os do site atual. O que cada um mostra veio da resposta 20 da segunda rodada v2.
  it('mostra os três relatórios que gestores e RH recebem, e o que cada um mostra', () => {
    expect(textos('#relatorios h3')).toEqual(['Desempenho', 'Frequência', 'Progresso']);
    expect(textos('#relatorios li p')).toEqual([
      'O resultado dos nivelamentos de cada aluno.',
      'A data de cada acesso e quanto tempo durou a sessão.',
      'O que cada aluno aprendeu e que metas cumpriu.',
    ]);
    expect(texto('#relatorios')).toMatch(/gestores/);
    expect(texto('#relatorios')).toMatch(/RH/);
    expect(texto('#relatorios')).toContain('mais estratégico e mensurável');
  });

  it('faz a chamada do meio com os três pontos do site atual', () => {
    expect(texto('#chamada h2')).toBe('Quer melhorar a comunicação internacional da sua equipe?');
    expect(textos('#chamada li')).toEqual(['Cursos customizados', 'Professores especializados', 'Plataforma LMS']);
  });

  it('lista os quatro pontos da metodologia', () => {
    expect(textos('#metodologia dt')).toEqual([
      'Simulações',
      'Vocabulário de negócios',
      'Conteúdo customizado',
      'Feedback constante',
    ]);
    for (const simulacao of ['reuniões', 'apresentações', 'negociações']) expect(texto('#metodologia')).toContain(simulacao);
    // O site atual fala em curso "online ou presencial" na metodologia do LMS.
    expect(texto('#metodologia')).toMatch(/online ou no presencial/);
  });

  it('lista os sete setores atendidos', () => {
    expect(textos('#setores li')).toEqual([
      'Indústria',
      'Tecnologia',
      'Farmacêutica',
      'Financeiro',
      'Marketing',
      'Logística',
      'Recursos humanos',
    ]);
  });

  // Os três motivos são os benefícios do site atual. Cada um aponta a seção que o prova.
  it('leva cada motivo à seção que o explica', () => {
    const atalhos = lms.querySelectorAll('#motivos a').map((link) => ({
      motivo: link.querySelector('.link-do-menu__nome')?.text.trim(),
      destino: link.getAttribute('href'),
    }));
    expect(atalhos).toEqual([
      { motivo: 'Relatórios para o RH', destino: '#relatorios' },
      { motivo: 'Flexibilidade de horários', destino: '#plataforma' },
      { motivo: 'Foco em comunicação profissional', destino: '#metodologia' },
    ]);
  });

  it('mantém as três perguntas que dimensionam o pedido, na ordem do formulário', () => {
    expect(textos('#contato ol h3')).toEqual([
      'Quantas pessoas vão usar',
      'Se já existe uma plataforma',
      'Que conteúdo entra',
    ]);
  });

  // A página promete que o pedido faz três perguntas: se o formulário ganhar ou perder uma, o texto muda junto.
  it('anuncia tantas perguntas quantas o pedido de LMS faz, fora o nome da empresa', () => {
    const noPedido = lms.querySelectorAll('[data-formulario="lms"] fieldset legend');
    expect(noPedido.length).toBeGreaterThan(0);
    expect(lms.querySelectorAll('#contato ol > li')).toHaveLength(noPedido.length);
  });

  it('abre o pedido com o LMS já escolhido, no começo, no meio e no fim', () => {
    for (const onde of ['.hero-pagina', '#chamada', '#contato']) {
      const botao = lms.querySelector(`${onde} [data-abre-contato]`);
      expect(botao, `sem botão em ${onde}`).not.toBeNull();
      expect(botao?.getAttribute('data-servico')).toBe('lms');
      expect(botao?.getAttribute('aria-haspopup')).toBe('dialog');
    }
    for (const botao of lms.querySelectorAll('main [data-abre-contato]')) {
      expect(botao.getAttribute('data-servico')).toBe('lms');
    }
  });

  // A EdApp e o que só existe no Canva continuam como pergunta para a Daniella (21). "Escolas" só aparece na
  // descrição do Google do site atual.
  it('deixa fora o que só está no Canva ou na descrição do Google do site atual', () => {
    const pagina = [texto('main'), lms.querySelector('meta[name="description"]')?.getAttribute('content')].join(' ');
    for (const fora of [/EdApp/i, /sala de aula invertida/i, /inteligência artificial/i, /(?<!\p{L})IA(?!\p{L})/u, /plantão/i, /escolas?/i]) {
      expect(pagina, String(fora)).not.toMatch(fora);
    }
  });

  it('descreve o serviço em JSON-LD, ligado à organização', () => {
    conferirServico(lms, { nome: 'LMS', caminho: '/lms/' });
  });

  it('traz as duas figuras em arco, com o texto alternativo definitivo', () => {
    const figuras = lms.querySelectorAll('main .figura');
    expect(figuras).toHaveLength(2);
    for (const figura of figuras) conferirFiguraEmArco(figura, /^IMG-LMS-[A-Z-]+$/);
  });
});
