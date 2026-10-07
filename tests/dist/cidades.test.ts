import { describe, expect, it } from 'vitest';
import {
  abrirPagina,
  conferirFiguraEmArco,
  jsonLd,
  paginasDeCidadeNoConteudo,
  textosDe,
} from './apoio';

// As páginas de cidade (ticket 11): a de São Paulo e a do Rio na raiz, com os três serviços presenciais, e as de
// Curitiba e Brasília dentro da Tradução Simultânea. Ficam fora da produção até o tipo de evento de cada cidade.
const cidades = paginasDeCidadeNoConteudo();
const servicosDe = (raiz: ReturnType<typeof abrirPagina>) => jsonLd(raiz).filter((no) => no['@type'] === 'Service');
const PAGINA_DO_SERVICO: Record<string, string> = {
  traducao: '/traducao-simultanea/',
  idiomas: '/curso-de-idiomas/#empresas',
  nr1: '/treinamento-nr-1/',
};

describe('páginas de cidade', () => {
  it('tem as quatro cidades do presencial, cada uma no tipo decidido em 07/10/2026', () => {
    expect(cidades.map(({ cidade, rota }) => [cidade, rota]).sort()).toEqual([
      ['Brasília', '/traducao-simultanea/brasilia/'],
      ['Curitiba', '/traducao-simultanea/curitiba/'],
      ['Rio de Janeiro', '/rio-de-janeiro/'],
      ['São Paulo', '/sao-paulo/'],
    ]);
  });

  describe.each(cidades.map((pagina) => [pagina.rota, pagina] as const))('%s', (rota, { cidade, tipo, pagina, publicada }) => {
    const raiz = abrirPagina(rota);

    it('mostra o aviso de fora do site só enquanto não está publicada', () => {
      expect(raiz.querySelector('.hero-pagina .aviso-nao-publicada') !== null).toBe(!publicada);
    });

    it('termina a trilha no nome da cidade', () => {
      const passos = textosDe(raiz, 'nav.trilha li');
      expect(passos).toEqual(tipo === 'traducao' ? ['Início', 'Tradução simultânea', cidade] : ['Início', cidade]);
    });

    it('põe a foto da cidade no arco do topo', () => {
      conferirFiguraEmArco(raiz.querySelector('.hero-pagina .figura'), new RegExp(`^IMG-CIDADE-${pagina.toUpperCase()}$`));
    });

    // Cada serviço presencial na cidade é uma seção que leva à página dele, com o Service que atende a cidade.
    it('leva de cada serviço à página dele, com o Service da cidade', () => {
      const secoes = raiz.querySelectorAll('main > section.chamada');
      const servicos = servicosDe(raiz);
      expect(secoes.length).toBeGreaterThan(0);
      expect(servicos.map((servico) => String(servico['@id']).split('#')[1])).toEqual(secoes.map((secao) => secao.id));
      for (const secao of secoes) {
        expect(secao.querySelector('a.link-forte')?.getAttribute('href')).toBe(PAGINA_DO_SERVICO[secao.id]);
      }
      for (const servico of servicos) expect(servico.areaServed).toEqual([{ '@type': 'City', name: cidade }]);
    });

    it('não deixa dois blocos escuros encostados', () => {
      const escuras = raiz.querySelectorAll('main > section').map((secao) => secao.classList.contains('escuro'));
      escuras.slice(1).forEach((escura, i) => expect(escura && escuras[i], `seções ${i} e ${i + 1}`).toBe(false));
    });

    it('abre o pedido no serviço da página e diz a cidade na mensagem do WhatsApp', () => {
      const servicosDoBotao = raiz.querySelectorAll('main [data-abre-contato]').map((botao) => botao.getAttribute('data-servico'));
      expect(new Set(servicosDoBotao)).toEqual(new Set([tipo === 'traducao' ? 'traducao' : undefined]));
      const mensagem = decodeURIComponent(raiz.querySelector('.whatsapp-flutuante')?.getAttribute('href') ?? '');
      expect(mensagem).toContain(cidade);
    });
  });

  it('leva das páginas de São Paulo e do Rio aos três idiomas com aula na empresa', () => {
    for (const rota of ['/sao-paulo/', '/rio-de-janeiro/']) {
      const links = abrirPagina(rota)
        .querySelectorAll('#idiomas .chamada__ponto a')
        .map((link) => link.getAttribute('href'));
      expect(links).toEqual([
        '/curso-de-idiomas/ingles/',
        '/curso-de-idiomas/espanhol/',
        '/curso-de-idiomas/portugues-para-estrangeiros/',
      ]);
    }
  });

  // Enquanto nenhuma está publicada, a Tradução e os idiomas só citam as cidades, sem link.
  it('só leva da Tradução, de Cursos e dos idiomas à cidade publicada', () => {
    const rotas = cidades.map(({ rota }) => rota);
    const publicadas = cidades.filter(({ publicada }) => publicada).map(({ rota }) => rota);
    for (const origem of ['traducao-simultanea', 'curso-de-idiomas', '/curso-de-idiomas/ingles/']) {
      const links = abrirPagina(origem)
        .querySelectorAll('main a')
        .map((link) => link.getAttribute('href') ?? '')
        .filter((href) => rotas.includes(href));
      for (const href of links) expect(publicadas).toContain(href);
    }
  });
});
