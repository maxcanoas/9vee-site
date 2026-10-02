import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';
import { describe, expect, it } from 'vitest';
import { DIST, jsonLd } from './apoio';

const lms = parse(readFileSync(join(DIST, 'lms', 'index.html'), 'utf8'));
const texto = (seletor: string) => lms.querySelector(seletor)?.text.replace(/\s+/g, ' ').trim() ?? '';
const textos = (seletor: string) => lms.querySelectorAll(seletor).map((no) => no.text.replace(/\s+/g, ' ').trim());

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

  it('saiu das páginas parciais: sem a etiqueta de obra e sem pendência', () => {
    expect(lms.querySelector('.hero-pagina__etiqueta')).toBeNull();
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

  // O site atual só dá o nome dos três relatórios. O que cada um mostra continua na pergunta 21: a página não explica.
  it('mostra os três relatórios que gestores e RH recebem, só com o nome de cada um', () => {
    expect(textos('#relatorios h3')).toEqual(['Desempenho', 'Frequência', 'Progresso']);
    expect(lms.querySelectorAll('#relatorios li p')).toEqual([]);
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
    const servico = jsonLd(lms).find((no) => no['@type'] === 'Service');
    expect(servico).toBeDefined();
    expect(servico?.name).toBe('LMS');
    expect(servico?.provider).toEqual({ '@id': expect.stringContaining('/#organizacao') });
    expect(servico?.url).toEqual(expect.stringContaining('/lms/'));
  });

  // Imagem do Gemini se o arquivo já está em src/assets/imagens/; Placeholder com o ID à vista se não.
  it('traz as duas figuras em arco, com o texto alternativo definitivo', () => {
    const figuras = lms.querySelectorAll('main .figura');
    expect(figuras).toHaveLength(2);
    for (const figura of figuras) {
      const alternativo = figura.getAttribute('alt') ?? figura.getAttribute('aria-label') ?? '';
      expect(alternativo.length).toBeGreaterThanOrEqual(10);
      expect(figura.getAttribute('class')).toContain('figura--arco');
      if (figura.classList.contains('placeholder')) {
        expect(figura.querySelector('.placeholder__id')?.text).toMatch(/^IMG-LMS-[A-Z-]+$/);
      }
    }
  });
});
