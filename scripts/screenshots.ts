// Capturas para revisão de cada etapa, em relatorios/<etapa>/ (fora do git).
// Uso: npm run build && node scripts/screenshots.ts <etapa>
// Página inteira sai sempre com movimento reduzido: a captura não rola a tela, então o que depende de
// rolagem ficaria no estado inicial. O movimento é conferido em capturas de tela rolada.
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { preview } from 'astro';
import { chromium, type Page } from '@playwright/test';
import { paginasDeCidadeNoConteudo, paginasDeIdiomaNoConteudo } from '../tests/conteudo.ts';
import { TEMPO_MINIMO_DO_PEDIDO } from '../src/lib/envio.ts';
import {
  SERVICO_DE_FORMULARIO,
  opcao,
  responderComoServico,
  salvarCookies,
  salvarPublico,
  semEnvioDeVerdade,
  semGoogleDeVerdade,
  semWhatsAppDeVerdade,
} from '../tests/e2e/pedido.ts';

interface Captura {
  nome: string;
  rota: string;
  largura: number;
  altura: number;
  paginaInteira?: boolean;
  /** Só este trecho da página, inteiro, no lugar da tela. */
  recorte?: string;
  movimento?: boolean;
  /** Público já salvo no localStorage antes de a página carregar. */
  publico?: 'empresa' | 'voce';
  /** Sem a resposta ao aviso de cookies: ele aparece no pé da tela. Sem isto, a captura é de quem já respondeu. */
  avisoDeCookies?: boolean;
  antes?: (pagina: Page) => Promise<void>;
}

const rolarAte = (seletor: string, deslocamento = 0) => async (pagina: Page) => {
  await pagina.evaluate(
    ([sel, extra]) => {
      const alvo = document.querySelector(sel as string);
      if (alvo) window.scrollTo({ top: alvo.getBoundingClientRect().top + window.scrollY + (extra as number), behavior: 'instant' });
    },
    [seletor, deslocamento],
  );
};

const rolarPara = (topo: number) => async (pagina: Page) => {
  await pagina.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), topo);
};

// Rola até o bloco e espera a imagem dele decodificar: fora da primeira tela, ela só carrega perto da vista.
const rolarAteImagem = (seletor: string, deslocamento = 0) => async (pagina: Page) => {
  await rolarAte(seletor, deslocamento)(pagina);
  await pagina.locator(`${seletor} img`).first().evaluate((imagem) => (imagem as HTMLImageElement).decode());
};

// Rola até as famílias e deixa o mouse sobre a primeira língua da família pedida.
const passarMouseNaLingua = (familia: string) => async (pagina: Page) => {
  await rolarAte('.familias', -160)(pagina);
  await pagina.locator(`.familia[data-grupo="${familia}"] a.idioma`).first().hover();
};

const preencherNr1 = async (p: Page) => {
  await p.locator('.cabecalho__cta').click();
  await p.fill('#campo-nr1-empresa', 'Metalúrgica Exemplo');
  await opcao(p, 'nr1', '51 a 200').click();
  await opcao(p, 'nr1', 'Até 3 meses').click();
  await opcao(p, 'nr1', 'Online ao vivo').click();
  await opcao(p, 'nr1', 'Em construção').click();
  await p.locator('[data-continuar]').click();
  await p.fill('#campo-final-nome', 'Maria');
};

// O pedido de NR-1 pronto para sair por e-mail: o contato preenchido e, se a captura pedir, a caixa do
// consentimento marcada. A espera é o tempo mínimo que o envio exige desde a abertura do pedido.
const prepararEnvio = (contato: string, aceitar = true) => async (p: Page) => {
  await preencherNr1(p);
  await p.locator('[data-abre-receber]').click();
  await p.fill('#campo-final-contato', contato);
  if (aceitar) await p.locator('input[name="final-consentimento"]').check();
  await p.waitForTimeout(TEMPO_MINIMO_DO_PEDIDO);
};

const enviarPedido = (contato: string, aceitar = true) => async (p: Page) => {
  await prepararEnvio(contato, aceitar)(p);
  await p.locator('[data-enviar-pedido]').click();
};

// O serviço de formulário respondendo com erro, para a captura da tela de quando o pedido não chega.
const comServicoForaDoAr = (p: Page) =>
  p.route(SERVICO_DE_FORMULARIO, (rota) => responderComoServico(rota, 500, { success: false }));

// Abre tudo o que abre numa seção: fechado, o texto de dentro não aparece na captura.
const abrirDetalhesDe = (secao: string) => (pagina: Page) =>
  pagina.locator(`${secao} details`).evaluateAll((itens) => itens.forEach((item) => item.setAttribute('open', '')));

// As respostas das perguntas frequentes: fechadas, as que levam pendência não aparecem na captura.
const abrirRespostas = abrirDetalhesDe('#perguntas');

// Abre o pedido pelo hero e responde que é para a empresa: o drawer para no passo do serviço.
const abrirServicoComoEmpresa = async (p: Page) => {
  await p.locator('.hero__cta').click();
  await p.locator('.metade--esquerda').click();
};

// As capturas de uma página completa do reaproveitamento: inteira, o topo, cada seção nas duas larguras de
// revisão, com o nome da âncora dela, e o fechamento.
const capturasDaPagina = (prefixo: string, rota: string, secoes: string[]): Captura[] => [
  { nome: `${prefixo}-inteira-390`, rota, largura: 390, altura: 844, paginaInteira: true },
  { nome: `${prefixo}-inteira-1280`, rota, largura: 1280, altura: 800, paginaInteira: true },
  { nome: `${prefixo}-topo-360`, rota, largura: 360, altura: 780 },
  { nome: `${prefixo}-topo-1280`, rota, largura: 1280, altura: 800 },
  ...secoes.flatMap((secao): Captura[] => [
    { nome: `${prefixo}-${secao}-390`, rota, largura: 390, altura: 844, antes: rolarAte(`#${secao}`, -60) },
    { nome: `${prefixo}-${secao}-1280`, rota, largura: 1280, altura: 800, antes: rolarAte(`#${secao}`, -80) },
  ]),
  { nome: `${prefixo}-fecho-390`, rota, largura: 390, altura: 844, antes: rolarAteImagem('#contato', -60) },
  { nome: `${prefixo}-fecho-1280`, rota, largura: 1280, altura: 800, antes: rolarAteImagem('#contato', -80) },
];

const roteiros: Record<string, Captura[]> = {
  'etapa-1': [
    { nome: 'cabecalho-390', rota: '/', largura: 390, altura: 844 },
    { nome: 'cabecalho-1280', rota: '/', largura: 1280, altura: 800 },
    { nome: 'menu-aberto-390', rota: '/', largura: 390, altura: 844, antes: (p) => p.getByRole('button', { name: 'Menu', exact: true }).click() },
    { nome: 'painel-empresas-1280', rota: '/', largura: 1280, altura: 800, antes: (p) => p.getByRole('button', { name: 'Empresas' }).click() },
  ],
  'etapa-2': [
    { nome: 'home-390', rota: '/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'home-1280', rota: '/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'hero-390', rota: '/', largura: 390, altura: 844, movimento: true },
    { nome: 'hero-1280', rota: '/', largura: 1280, altura: 800, movimento: true },
    { nome: 'hero-rolado-390', rota: '/', largura: 390, altura: 844, movimento: true, antes: rolarPara(420) },
    {
      nome: 'publico-voce-390',
      rota: '/',
      largura: 390,
      altura: 844,
      movimento: true,
      antes: async (p) => {
        await p.locator('.duas-metades__metade--voce').click();
        await p.waitForTimeout(600);
        await rolarAte('#servicos', -60)(p);
      },
    },
    {
      nome: 'publico-voce-1280',
      rota: '/',
      largura: 1280,
      altura: 800,
      movimento: true,
      antes: async (p) => {
        await p.locator('.duas-metades__metade--voce').click();
        await p.waitForTimeout(600);
        await rolarAte('#servicos', -80)(p);
      },
    },
    { nome: 'como-etapa2-390', rota: '/', largura: 390, altura: 844, movimento: true, antes: rolarAte('.como__etapa[data-etapa="2"]', -300) },
    { nome: 'como-etapa3-1280', rota: '/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('.como__etapa[data-etapa="3"]', -200) },
    { nome: 'saudacoes-1280', rota: '/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('.saudacoes', -250) },
  ],
  'etapa-3': [
    { nome: 'flutuante-390', rota: '/', largura: 390, altura: 844 },
    { nome: 'rodape-fim-390', rota: '/', largura: 390, altura: 844, antes: async (p) => {
      await p.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
      await p.evaluate(() => window.scrollBy({ top: -40, behavior: 'instant' }));
    } },
    { nome: 'drawer-publico-390', rota: '/', largura: 390, altura: 844, antes: (p) => p.locator('.hero__cta').click() },
    { nome: 'drawer-servico-390', rota: '/', largura: 390, altura: 844, antes: abrirServicoComoEmpresa },
    { nome: 'drawer-servico-1280', rota: '/', largura: 1280, altura: 800, antes: abrirServicoComoEmpresa },
    { nome: 'drawer-nr1-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: (p) => p.locator('.cabecalho__cta').click() },
    { nome: 'drawer-nr1-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, publico: 'empresa', antes: (p) => p.locator('.cabecalho__cta').click() },
    { nome: 'drawer-erros-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: async (p) => {
      await p.locator('.cabecalho__cta').click();
      await p.locator('[data-continuar]').click();
    } },
    { nome: 'drawer-final-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: preencherNr1 },
    { nome: 'drawer-receber-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: enviarPedido('maria@exemplo') },
    { nome: 'drawer-confirmado-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: enviarPedido('maria@exemplo.com.br') },
    { nome: 'drawer-aberto-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: async (p) => {
      await preencherNr1(p);
      const aba = p.context().waitForEvent('page');
      await p.locator('[data-saida-whatsapp]').click();
      await (await aba).close();
    } },
    { nome: 'drawer-aulas-390', rota: '/', largura: 390, altura: 844, publico: 'voce', antes: (p) => p.locator('.hero__cta').click() },
    { nome: 'drawer-traducao-390', rota: '/traducao-simultanea/', largura: 390, altura: 844, publico: 'empresa', antes: async (p) => {
      await p.locator('.cabecalho__cta').click();
      await opcao(p, 'traducao', 'Presencial').click();
      await opcao(p, 'traducao', 'Outra').click();
      await p.locator('#campo-traducao-cidadeOutra').scrollIntoViewIfNeeded();
    } },
  ],
  'etapa-4': [
    { nome: 'nr1-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'nr1-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'nr1-hero-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, movimento: true },
    { nome: 'nr1-hero-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, movimento: true },
    { nome: 'nr1-hero-rolado-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, movimento: true, antes: rolarPara(420) },
    { nome: 'nr1-por-que-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, movimento: true, antes: rolarAte('#por-que-agora') },
    { nome: 'nr1-por-que-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#por-que-agora') },
    { nome: 'nr1-recebe-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#o-que-recebe') },
    { nome: 'nr1-modulos-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, movimento: true, antes: rolarAte('#modulos') },
    { nome: 'nr1-modulos-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#modulos') },
    { nome: 'nr1-formato-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, movimento: true, antes: rolarAte('#formato') },
    { nome: 'nr1-abordagem-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#abordagem') },
    { nome: 'nr1-drawer-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: (p) => p.locator('#formato [data-abre-contato]').click() },
  ],
  'etapa-5': [
    { nome: 'idiomas-390', rota: '/curso-de-idiomas/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'idiomas-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'idiomas-hero-390', rota: '/curso-de-idiomas/', largura: 390, altura: 844, movimento: true },
    { nome: 'idiomas-hero-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, movimento: true },
    { nome: 'idiomas-familias-390', rota: '/curso-de-idiomas/', largura: 390, altura: 844, movimento: true, antes: rolarAte('#idiomas') },
    { nome: 'idiomas-familias-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#idiomas') },
    { nome: 'idiomas-alvo-1280', rota: '/curso-de-idiomas/#japones', largura: 1280, altura: 800, movimento: true },
    { nome: 'idiomas-niveis-390', rota: '/curso-de-idiomas/', largura: 390, altura: 844, movimento: true, antes: rolarAte('#niveis') },
    { nome: 'idiomas-niveis-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#niveis') },
    { nome: 'idiomas-aulas-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#formatos') },
    { nome: 'idiomas-provas-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#provas') },
    { nome: 'idiomas-equipe-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#empresas') },
    { nome: 'idiomas-comeca-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#como-comeca') },
    { nome: 'idiomas-drawer-390', rota: '/curso-de-idiomas/', largura: 390, altura: 844, publico: 'voce', antes: (p) => p.locator('#japones button').click() },
  ],
  'etapa-6': [
    { nome: 'traducao-390', rota: '/traducao-simultanea/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'traducao-1280', rota: '/traducao-simultanea/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'traducao-hero-1280', rota: '/traducao-simultanea/', largura: 1280, altura: 800, movimento: true },
    { nome: 'lms-390', rota: '/lms/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'lms-1280', rota: '/lms/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'quem-somos-390', rota: '/quem-somos/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'quem-somos-1280', rota: '/quem-somos/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'quem-somos-hero-1280', rota: '/quem-somos/', largura: 1280, altura: 800, movimento: true },
    { nome: 'traducao-drawer-390', rota: '/traducao-simultanea/', largura: 390, altura: 844, publico: 'empresa', antes: (p) => p.locator('#eventos [data-abre-contato]').click() },
  ],
  'ticket-04': [
    { nome: 'nr1-hero-360', rota: '/treinamento-nr-1/', largura: 360, altura: 780 },
    { nome: 'nr1-hero-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800 },
    { nome: 'idiomas-hero-390', rota: '/curso-de-idiomas/', largura: 390, altura: 844 },
    { nome: 'traducao-hero-390', rota: '/traducao-simultanea/', largura: 390, altura: 844 },
    { nome: 'traducao-hero-1280', rota: '/traducao-simultanea/', largura: 1280, altura: 800 },
    { nome: 'trilha-foco-1280', rota: '/lms/', largura: 1280, altura: 800, antes: (p) => p.locator('.trilha a').focus() },
    { nome: 'trilha-mouse-1280', rota: '/quem-somos/', largura: 1280, altura: 800, antes: (p) => p.locator('.trilha a').hover() },
  ],
  'ticket-09': [
    { nome: 'ingles-topo-360', rota: '/curso-de-idiomas/ingles/', largura: 360, altura: 780 },
    { nome: 'ingles-topo-1280', rota: '/curso-de-idiomas/ingles/', largura: 1280, altura: 800 },
    { nome: 'ingles-inteira-390', rota: '/curso-de-idiomas/ingles/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'ingles-inteira-1280', rota: '/curso-de-idiomas/ingles/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'mandarim-topo-390', rota: '/curso-de-idiomas/mandarim/', largura: 390, altura: 844 },
    { nome: 'mandarim-topo-1280', rota: '/curso-de-idiomas/mandarim/', largura: 1280, altura: 800 },
    { nome: 'mandarim-inteira-1280', rota: '/curso-de-idiomas/mandarim/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'espanhol-inteira-390', rota: '/curso-de-idiomas/espanhol/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'cursos-familias-390', rota: '/curso-de-idiomas/', largura: 390, altura: 844, antes: rolarAte('.familias', -120) },
    // O pedido aberto pelo cabeçalho, sem idioma no botão, já sai com o idioma da página marcado.
    { nome: 'ingles-pedido-cabecalho-390', rota: '/curso-de-idiomas/ingles/', largura: 390, altura: 844, publico: 'voce', antes: (p) => p.locator('.cabecalho__cta').click() },
  ],
  'ticket-10': [
    // O árabe corre da direita para a esquerda; o japonês tem a saudação mais longa; o português, o título mais longo.
    { nome: 'arabe-topo-390', rota: '/curso-de-idiomas/arabe/', largura: 390, altura: 844 },
    { nome: 'arabe-topo-1280', rota: '/curso-de-idiomas/arabe/', largura: 1280, altura: 800 },
    { nome: 'japones-topo-360', rota: '/curso-de-idiomas/japones/', largura: 360, altura: 780 },
    { nome: 'portugues-topo-360', rota: '/curso-de-idiomas/portugues-para-estrangeiros/', largura: 360, altura: 780 },
    { nome: 'portugues-inteira-1280', rota: '/curso-de-idiomas/portugues-para-estrangeiros/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'holandes-inteira-390', rota: '/curso-de-idiomas/holandes/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'frances-inteira-1280', rota: '/curso-de-idiomas/frances/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'alemao-esqueleto-390', rota: '/curso-de-idiomas/alemao/', largura: 390, altura: 844, paginaInteira: true },
  ],
  'ticket-08': [
    { nome: 'privacidade-topo-360', rota: '/politica-de-privacidade/', largura: 360, altura: 780 },
    { nome: 'privacidade-inteira-390', rota: '/politica-de-privacidade/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'privacidade-inteira-1280', rota: '/politica-de-privacidade/', largura: 1280, altura: 800, paginaInteira: true },
    // A trilha no fundo claro, com o foco no link; e no hero escuro, que não pode ter mudado.
    { nome: 'privacidade-trilha-foco-1280', rota: '/politica-de-privacidade/', largura: 1280, altura: 800, antes: (p) => p.locator('.trilha a').focus() },
    { nome: 'lms-trilha-1280', rota: '/lms/', largura: 1280, altura: 800 },
    { nome: 'erro-390', rota: '/pagina-que-nao-existe/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'erro-1280', rota: '/pagina-que-nao-existe/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'rodape-1280', rota: '/', largura: 1280, altura: 800, antes: rolarAte('footer') },
    // Os links do menu saem do mesmo componente da 404: o painel e o menu do celular não podem ter mudado.
    { nome: 'painel-empresas-1280', rota: '/lms/', largura: 1280, altura: 800, antes: (p) => p.getByRole('button', { name: 'Empresas' }).click() },
    { nome: 'menu-aberto-390', rota: '/lms/', largura: 390, altura: 844, antes: (p) => p.getByRole('button', { name: 'Menu', exact: true }).click() },
  ],
  // O topo de cada página de idioma, com a foto do lugar, e o do NR-1, que usa o mesmo arco e não pode ter mudado.
  'fotos-idiomas': [
    ...paginasDeIdiomaNoConteudo().flatMap(({ rota, pagina }): Captura[] => [
      { nome: `${pagina}-topo-390`, rota, largura: 390, altura: 844 },
      { nome: `${pagina}-topo-1280`, rota, largura: 1280, altura: 800 },
    ]),
    { nome: 'nr1-topo-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844 },
    { nome: 'nr1-topo-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800 },
  ],
  // A cidade embaixo da foto de cada idioma. No celular a foto fica abaixo do texto: sai o topo inteiro.
  'legendas-idiomas': paginasDeIdiomaNoConteudo().flatMap(({ rota, pagina }): Captura[] => [
    { nome: `${pagina}-topo-390`, rota, largura: 390, altura: 844, recorte: '.topo-idioma' },
    { nome: `${pagina}-topo-1280`, rota, largura: 1280, altura: 800 },
  ]),
  // A página de LMS completa, o pedido aberto pela chamada do meio e o card do LMS na home.
  'ticket-06': [
    ...capturasDaPagina('lms', '/lms/', ['motivos', 'o-que-e', 'plataforma', 'relatorios', 'chamada', 'metodologia', 'setores']),
    { nome: 'lms-pedido-390', rota: '/lms/', largura: 390, altura: 844, publico: 'empresa', antes: (p) => p.locator('#chamada [data-abre-contato]').click() },
    { nome: 'home-card-lms-390', rota: '/', largura: 390, altura: 844, antes: rolarAte('.servico[data-servico="lms"]', -120) },
    { nome: 'home-card-lms-1280', rota: '/', largura: 1280, altura: 800, antes: rolarAte('.servico[data-servico="lms"]', -160) },
  ],
  // A Tradução Simultânea completa, as respostas das perguntas abertas e o pedido com a pergunta nova, a da
  // duração do evento.
  'ticket-05': [
    ...capturasDaPagina('traducao', '/traducao-simultanea/', [
      'formatos',
      'como-funciona',
      'eventos',
      'idiomas-e-cidades',
      'interpretes',
      'mandarim',
      'perguntas',
    ]),
    { nome: 'traducao-respostas-390', rota: '/traducao-simultanea/', largura: 390, altura: 844, recorte: '#perguntas', antes: abrirRespostas },
    { nome: 'traducao-respostas-1280', rota: '/traducao-simultanea/', largura: 1280, altura: 800, recorte: '#perguntas', antes: abrirRespostas },
    {
      nome: 'traducao-pedido-duracao-390',
      rota: '/traducao-simultanea/',
      largura: 390,
      altura: 844,
      publico: 'empresa',
      antes: async (p) => {
        await p.locator('#eventos [data-abre-contato]').click();
        await p.locator('[data-formulario="traducao"] [data-campo="duracao"]').scrollIntoViewIfNeeded();
      },
    },
  ],
  // A página de interpretação de mandarim, o pedido que ela abre, pelo botão dela e pelo do cabeçalho, com a
  // tradução e o mandarim marcados, e as duas páginas que passaram a levar a ela.
  'ticket-21': [
    ...capturasDaPagina('mandarim', '/traducao-simultanea/mandarim/', ['servicos', 'precisao', 'curso']),
    { nome: 'mandarim-pedido-pagina-390', rota: '/traducao-simultanea/mandarim/', largura: 390, altura: 844, publico: 'empresa', antes: (p) => p.locator('.hero-pagina [data-abre-contato]').click() },
    { nome: 'mandarim-pedido-cabecalho-1280', rota: '/traducao-simultanea/mandarim/', largura: 1280, altura: 800, publico: 'empresa', antes: (p) => p.locator('.cabecalho__cta').click() },
    { nome: 'traducao-bloco-mandarim-390', rota: '/traducao-simultanea/', largura: 390, altura: 844, antes: rolarAte('#mandarim', -60) },
    { nome: 'traducao-bloco-mandarim-1280', rota: '/traducao-simultanea/', largura: 1280, altura: 800, antes: rolarAte('#mandarim', -80) },
    { nome: 'curso-de-mandarim-para-quem-390', rota: '/curso-de-idiomas/mandarim/', largura: 390, altura: 844, antes: rolarAte('#para-quem', -60) },
  ],
  // O Quem Somos completo: a página inteira, o topo e cada seção.
  'ticket-07': capturasDaPagina('quem-somos', '/quem-somos/', ['frentes', 'historia', 'missao', 'principios']),
  // As páginas de cidade, uma de cada tipo: São Paulo, com os três serviços presenciais, e Curitiba, a de tradução.
  'ticket-11': [
    ...capturasDaPagina('sao-paulo', '/sao-paulo/', ['traducao', 'idiomas', 'nr1']),
    ...capturasDaPagina('curitiba', '/traducao-simultanea/curitiba/', ['traducao', 'nr1']),
  ],
  // O que o code-review do grupo 3 (ticket 17) mudou na tela: a etiqueta "Novo" sem cara de botão, o alfinete da
  // legenda pintado pelo fill, a faixa de números sem estilo inline e o rodapé com o atendimento novo.
  'code-review-17': [
    { nome: 'politica-novo-1280', rota: '/politica-de-privacidade/', largura: 1280, altura: 800, recorte: '.politica__secao--nova >> nth=0' },
    { nome: 'legenda-alemao-390', rota: '/curso-de-idiomas/alemao/', largura: 390, altura: 844, recorte: '.topo-idioma' },
    { nome: 'faixa-numeros-1280', rota: '/', largura: 1280, altura: 800, recorte: '.prova' },
    { nome: 'faixa-numeros-390', rota: '/', largura: 390, altura: 844, recorte: '.prova' },
    { nome: 'rodape-1280', rota: '/', largura: 1280, altura: 800, antes: rolarAte('footer') },
  ],
  // A foto de cada cidade no arco do topo, no celular e no computador.
  'fotos-cidades': paginasDeCidadeNoConteudo().flatMap(({ rota, pagina }): Captura[] => [
    { nome: `${pagina}-topo-390`, rota, largura: 390, altura: 844, recorte: '.hero-pagina' },
    { nome: `${pagina}-topo-1280`, rota, largura: 1280, altura: 800 },
  ]),
  // O envio de verdade do pedido: o campo do contato com a caixa do consentimento, o erro de quem não a marcou, a
  // confirmação e a tela de quando o pedido não chega. O serviço de formulário nunca recebe nada daqui.
  'ticket-12': [
    { nome: 'pedido-consentimento-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: prepararEnvio('maria@exemplo.com.br') },
    { nome: 'pedido-consentimento-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, publico: 'empresa', antes: prepararEnvio('maria@exemplo.com.br') },
    { nome: 'pedido-sem-consentimento-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: enviarPedido('maria@exemplo.com.br', false) },
    { nome: 'pedido-confirmado-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: enviarPedido('maria@exemplo.com.br') },
    { nome: 'pedido-confirmado-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, publico: 'empresa', antes: enviarPedido('maria@exemplo.com.br') },
    { nome: 'pedido-falhou-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, publico: 'empresa', antes: async (p) => {
      await comServicoForaDoAr(p);
      await enviarPedido('(11) 91234-5678')(p);
    } },
    { nome: 'pedido-falhou-1280', rota: '/treinamento-nr-1/', largura: 1280, altura: 800, publico: 'empresa', antes: async (p) => {
      await comServicoForaDoAr(p);
      await enviarPedido('(11) 91234-5678')(p);
    } },
  ],
  // O reaproveitamento nas páginas fechadas: as seções novas da home, do NR-1 e de Cursos, o rodapé com a frase do
  // site atual, os exames abertos, a página de cursos como a empresa a vê e as páginas de idioma que mudaram.
  'ticket-22': [
    ...capturasDaPagina('home', '/', ['diferenciais']),
    { nome: 'rodape-390', rota: '/', largura: 390, altura: 844, antes: rolarAte('footer') },
    { nome: 'rodape-fim-390', rota: '/', largura: 390, altura: 844, antes: rolarAte('.rodape__base', -500) },
    { nome: 'rodape-1280', rota: '/', largura: 1280, altura: 800, antes: rolarAte('footer') },
    ...capturasDaPagina('nr1', '/treinamento-nr-1/', ['temas', 'modulos', 'beneficios']),
    ...capturasDaPagina('cursos', '/curso-de-idiomas/', ['provas', 'formatos', 'empresas', 'realocacao', 'plataforma', 'como-comeca']),
    { nome: 'cursos-provas-abertas-390', rota: '/curso-de-idiomas/', largura: 390, altura: 844, recorte: '#provas', antes: abrirDetalhesDe('#provas') },
    { nome: 'cursos-provas-abertas-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, recorte: '#provas', antes: abrirDetalhesDe('#provas') },
    { nome: 'cursos-empresa-inteira-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, paginaInteira: true, publico: 'empresa' },
    { nome: 'cursos-empresas-768', rota: '/curso-de-idiomas/', largura: 768, altura: 1024, antes: rolarAte('#empresas', -80) },
    ...['ingles', 'portugues-para-estrangeiros', 'frances', 'espanhol', 'holandes'].flatMap((pagina): Captura[] => [
      { nome: `${pagina}-inteira-390`, rota: `/curso-de-idiomas/${pagina}/`, largura: 390, altura: 844, paginaInteira: true },
      { nome: `${pagina}-inteira-1280`, rota: `/curso-de-idiomas/${pagina}/`, largura: 1280, altura: 800, paginaInteira: true },
    ]),
  ],
  'ajustes-cliente': [
    { nome: 'home-390', rota: '/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'home-1280', rota: '/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'servicos-390', rota: '/', largura: 390, altura: 844, movimento: true, antes: rolarAte('#servicos', -60) },
    { nome: 'servicos-1280', rota: '/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('#servicos', -80) },
    { nome: 'menu-aberto-390', rota: '/', largura: 390, altura: 844, antes: (p) => p.getByRole('button', { name: 'Menu', exact: true }).click() },
    { nome: 'painel-empresas-1280', rota: '/', largura: 1280, altura: 800, antes: (p) => p.getByRole('button', { name: 'Empresas' }).click() },
    { nome: 'drawer-servico-390', rota: '/', largura: 390, altura: 844, antes: abrirServicoComoEmpresa },
    { nome: 'hero-390', rota: '/', largura: 390, altura: 844, movimento: true },
    { nome: 'hero-rolado-390', rota: '/', largura: 390, altura: 844, movimento: true, antes: rolarPara(200) },
    { nome: 'hero-1280', rota: '/', largura: 1280, altura: 800, movimento: true },
    { nome: 'hero-rolado-1280', rota: '/', largura: 1280, altura: 800, movimento: true, antes: rolarPara(250) },
    { nome: 'hero-parado-1280', rota: '/', largura: 1280, altura: 800 },
    { nome: 'escolha-empresa-390', rota: '/', largura: 390, altura: 844, publico: 'empresa', antes: rolarAte('.duas-metades', -320) },
    { nome: 'escolha-voce-390', rota: '/', largura: 390, altura: 844, publico: 'voce', antes: rolarAte('.duas-metades', -320) },
    { nome: 'escolha-empresa-1280', rota: '/', largura: 1280, altura: 800, publico: 'empresa' },
    { nome: 'escolha-voce-1280', rota: '/', largura: 1280, altura: 800, publico: 'voce' },
    { nome: 'nr1-hero-390', rota: '/treinamento-nr-1/', largura: 390, altura: 844, movimento: true },
    { nome: 'idiomas-hero-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, movimento: true },
    { nome: 'cta-final-390', rota: '/', largura: 390, altura: 844, movimento: true, antes: rolarAteImagem('#contato', -80) },
    { nome: 'cta-final-1280', rota: '/', largura: 1280, altura: 800, movimento: true, antes: rolarAteImagem('#contato', -120) },
    { nome: 'painel-para-voce-1280', rota: '/', largura: 1280, altura: 800, antes: (p) => p.getByRole('button', { name: 'Para você' }).first().click() },
    { nome: 'rodape-390', rota: '/', largura: 390, altura: 844, antes: rolarAte('footer') },
    { nome: 'rodape-1280', rota: '/', largura: 1280, altura: 800, antes: rolarAte('footer') },
    { nome: 'familias-home-390', rota: '/', largura: 390, altura: 844, movimento: true, antes: rolarAte('.familias', -120) },
    { nome: 'familias-home-1280', rota: '/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('.familias', -160) },
    { nome: 'familias-cursos-390', rota: '/curso-de-idiomas/', largura: 390, altura: 844, movimento: true, antes: rolarAte('.familias', -120) },
    // A faixa anda com a rolagem: cada posição mostra outra família passando.
    { nome: 'saudacoes-inicio-1280', rota: '/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('.saudacoes', -620) },
    { nome: 'saudacoes-meio-1280', rota: '/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('.saudacoes', -250) },
    { nome: 'saudacoes-fim-1280', rota: '/', largura: 1280, altura: 800, movimento: true, antes: rolarAte('.saudacoes', -80) },
    { nome: 'saudacoes-meio-390', rota: '/', largura: 390, altura: 844, movimento: true, antes: rolarAte('.saudacoes', -300) },
    { nome: 'familias-hover-germanicas-1280', rota: '/', largura: 1280, altura: 800, antes: passarMouseNaLingua('germanicas') },
    { nome: 'familias-hover-outras-1280', rota: '/', largura: 1280, altura: 800, antes: passarMouseNaLingua('outras') },
    { nome: 'idioma-destino-1280', rota: '/curso-de-idiomas/#japones', largura: 1280, altura: 800 },
    { nome: 'depoimentos-390', rota: '/', largura: 390, altura: 844, antes: rolarAte('#depoimentos', -60) },
    { nome: 'depoimentos-1280', rota: '/', largura: 1280, altura: 800, antes: rolarAte('#depoimentos', -80) },
    { nome: 'depoimento-largo-390', rota: '/', largura: 390, altura: 844, antes: rolarAte('.depoimento:nth-child(3)', -80) },
    { nome: 'depoimentos-baixo-1280', rota: '/', largura: 1280, altura: 800, antes: rolarAte('.depoimento:nth-child(2)', -120) },
  ],
  // O parecer de UX: o hero de cada público, a grade de idiomas, o ritmo dos fundos da home, o atalho do WhatsApp
  // sobre as perguntas, o botão do topo num notebook de 1366 x 657, os cartões e a ordem da página de cursos.
  'ux-parecer': [
    { nome: 'home-inteira-1280', rota: '/', largura: 1280, altura: 800, paginaInteira: true },
    { nome: 'home-inteira-390', rota: '/', largura: 390, altura: 844, paginaInteira: true },
    { nome: 'hero-neutro-1280', rota: '/', largura: 1280, altura: 800 },
    { nome: 'hero-voce-1280', rota: '/', largura: 1280, altura: 800, publico: 'voce' },
    { nome: 'hero-voce-390', rota: '/', largura: 390, altura: 844, publico: 'voce' },
    { nome: 'hero-neutro-1366x657', rota: '/', largura: 1366, altura: 657 },
    { nome: 'cabecalho-neutro-360', rota: '/', largura: 360, altura: 780 },
    { nome: 'familias-1280', rota: '/', largura: 1280, altura: 800, antes: rolarAte('.familias', -160) },
    { nome: 'familias-hover-romanicas-1280', rota: '/', largura: 1280, altura: 800, antes: passarMouseNaLingua('romanicas') },
    { nome: 'familias-foco-outras-1280', rota: '/', largura: 1280, altura: 800, antes: async (p) => {
      await rolarAte('.familias', -160)(p);
      await p.locator('.familia[data-grupo="outras"] a.idioma').first().focus();
    } },
    { nome: 'familias-390', rota: '/', largura: 390, altura: 844, antes: rolarAte('.familias', -120) },
    { nome: 'familias-cursos-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, antes: rolarAte('.familias', -160) },
    { nome: 'diferenciais-1280', rota: '/', largura: 1280, altura: 800, antes: rolarAte('#diferenciais', -80) },
    { nome: 'diferenciais-390', rota: '/', largura: 390, altura: 844, antes: rolarAte('#diferenciais', -60) },
    { nome: 'como-etapas-390', rota: '/', largura: 390, altura: 844, movimento: true, antes: rolarAte('.como__etapa[data-etapa="1"]', -360) },
    { nome: 'faq-whatsapp-1280', rota: '/', largura: 1280, altura: 800, antes: rolarAte('#perguntas .faq__item:nth-child(4)', -730) },
    { nome: 'faq-whatsapp-1366', rota: '/', largura: 1366, altura: 768, antes: rolarAte('#perguntas .faq__item:nth-child(4)', -700) },
    { nome: 'provas-whatsapp-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, antes: rolarAte('#provas .acordeao__item:nth-child(5)', -730) },
    { nome: 'cursos-topo-1366x657', rota: '/curso-de-idiomas/', largura: 1366, altura: 657 },
    { nome: 'cursos-topo-1536x730', rota: '/curso-de-idiomas/', largura: 1536, altura: 730 },
    { nome: 'lms-topo-1366x657', rota: '/lms/', largura: 1366, altura: 657 },
    { nome: 'cursos-topo-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800 },
    { nome: 'cursos-formatos-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, antes: rolarAte('#formatos', -80) },
    { nome: 'cursos-formatos-390', rota: '/curso-de-idiomas/', largura: 390, altura: 844, antes: rolarAte('#formatos', -60) },
    { nome: 'cursos-voce-inteira-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, paginaInteira: true, publico: 'voce' },
    { nome: 'cursos-empresa-inteira-1280', rota: '/curso-de-idiomas/', largura: 1280, altura: 800, paginaInteira: true, publico: 'empresa' },
    { nome: 'ingles-para-quem-1280', rota: '/curso-de-idiomas/ingles/', largura: 1280, altura: 800, antes: rolarAte('#para-quem', -80) },
  ],
  // O aviso de cookies do ticket 13: na primeira visita, com as preferências abertas e reaberto pelo rodapé.
  'ticket-13': [
    { nome: 'aviso-360', rota: '/', largura: 360, altura: 780, avisoDeCookies: true },
    { nome: 'aviso-390', rota: '/curso-de-idiomas/', largura: 390, altura: 844, avisoDeCookies: true },
    { nome: 'aviso-768', rota: '/', largura: 768, altura: 1024, avisoDeCookies: true },
    { nome: 'aviso-1280', rota: '/', largura: 1280, altura: 800, avisoDeCookies: true },
    { nome: 'aviso-1366x657', rota: '/treinamento-nr-1/', largura: 1366, altura: 657, avisoDeCookies: true },
    { nome: 'preferencias-360', rota: '/', largura: 360, altura: 780, avisoDeCookies: true, antes: async (p) => {
      await p.locator('[data-cookies="preferencias"]').click();
    } },
    { nome: 'preferencias-1280', rota: '/', largura: 1280, altura: 800, avisoDeCookies: true, antes: async (p) => {
      await p.locator('[data-cookies="preferencias"]').click();
    } },
    { nome: 'rodape-1280', rota: '/', largura: 1280, altura: 800, recorte: 'footer' },
    { nome: 'reaberto-390', rota: '/', largura: 390, altura: 844, antes: async (p) => {
      await p.locator('footer [data-preferencias-cookies]').click();
    } },
  ],
  // O rodapé com a interpretação de mandarim no fim do grupo Empresas (ticket 15).
  'ticket-15': [
    { nome: 'rodape-360', rota: '/', largura: 360, altura: 780, recorte: 'footer' },
    { nome: 'rodape-768', rota: '/', largura: 768, altura: 1024, recorte: 'footer' },
    { nome: 'rodape-1280', rota: '/', largura: 1280, altura: 800, recorte: 'footer' },
  ],
};

const etapa = process.argv[2] ?? 'etapa-1';
const capturas = roteiros[etapa];
if (!capturas) throw new Error(`Roteiro desconhecido: ${etapa}. Opções: ${Object.keys(roteiros).join(', ')}`);

const saida = new URL(`../relatorios/${etapa}/`, import.meta.url);
await mkdir(saida, { recursive: true });

const servidor = await preview({ root: fileURLToPath(new URL('../', import.meta.url)), logLevel: 'warn' });
const base = `http://localhost:${servidor.port}`;
const navegador = await chromium.launch({ channel: 'chrome' });

try {
  for (const c of capturas) {
    const movel = c.largura < 768;
    const contexto = await navegador.newContext({
      viewport: { width: c.largura, height: c.altura },
      // Página inteira em 1x: acima de 16.384 px de altura o Chrome repete o topo na imagem. O recorte sai dela.
      deviceScaleFactor: movel && !c.paginaInteira && !c.recorte ? 2 : 1,
      isMobile: movel,
      hasTouch: movel,
      reducedMotion: c.movimento ? 'no-preference' : 'reduce',
    });
    await semWhatsAppDeVerdade(contexto);
    await semEnvioDeVerdade(contexto);
    await semGoogleDeVerdade(contexto);
    if (!c.avisoDeCookies) await salvarCookies(contexto, false);
    if (c.publico) await salvarPublico(contexto, c.publico);
    const pagina = await contexto.newPage();
    await pagina.goto(base + c.rota, { waitUntil: 'networkidle' });
    await pagina.evaluate(() => document.fonts.ready);
    if (c.antes) {
      await c.antes(pagina);
      await pagina.waitForTimeout(400);
    }
    // O recorte é um pedaço da página inteira, com a tela no alto: a captura do elemento rolaria até ele, e o
    // cabeçalho fixo sairia por cima.
    const clip = c.recorte
      ? await pagina.locator(c.recorte).evaluate((trecho) => {
          const { left, top, width, height } = trecho.getBoundingClientRect();
          return { x: left + window.scrollX, y: top + window.scrollY, width, height };
        })
      : undefined;
    await pagina.screenshot({
      path: fileURLToPath(new URL(`${c.nome}.png`, saida)),
      fullPage: c.paginaInteira ?? Boolean(clip),
      clip,
    });
    await contexto.close();
    console.log(`ok ${c.nome}`);
  }
} finally {
  await navegador.close();
  await servidor.stop();
}
