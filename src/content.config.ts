import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SERVICOS, formularioDe, marcadasValidas } from './lib/contato';
import { PUBLICOS } from './lib/publico';

const conteudo = './content';

const link = z.object({
  rotulo: z.string(),
  descricao: z.string().optional(),
  href: z.string(),
});

const seo = z.object({
  titulo: z.string().max(60),
  descricao: z.string().min(140).max(160),
});

const porPublico = z.object({ neutro: z.string(), empresa: z.string(), voce: z.string() });

const faq = z.object({
  titulo: z.string(),
  itens: z.array(z.object({ pergunta: z.string(), resposta: z.string() })).min(1),
});

const tituloETexto = z.object({ titulo: z.string(), texto: z.string() });
// O item de uma lista de definições: as provas de um idioma, os pontos de uma metodologia.
const nomeETexto = z.object({ nome: z.string(), texto: z.string() });

export const servicoId = z.enum(SERVICOS);

const condicao = z.object({ campo: z.string(), valores: z.array(z.string()).min(1) });
const campoBase = {
  id: z.string().regex(/^[a-z][a-zA-Z]*$/),
  rotulo: z.string(),
  rotuloCurto: z.string(),
  obrigatorio: z.boolean(),
  opcionalPara: z.enum(['empresa', 'voce']).optional(),
  mostrarSe: condicao.optional(),
  ocultarSe: condicao.optional(),
  minuscula: z.boolean().optional(),
  erro: z.string().optional(),
};
const campo = z.discriminatedUnion('tipo', [
  z.object({ ...campoBase, tipo: z.literal('texto'), autocomplete: z.string().optional() }),
  z.object({ ...campoBase, tipo: z.literal('escolha'), opcoes: z.array(z.string()).min(2) }),
  z.object({ ...campoBase, tipo: z.literal('multipla'), opcoes: z.array(z.string()).min(2) }),
  z.object({ ...campoBase, tipo: z.literal('data'), semData: z.string() }),
  z.object({ ...campoBase, tipo: z.literal('idioma') }),
]);
const formulario = z
  .array(campo)
  .min(1)
  .refine(
    (campos) =>
      campos.every((c) =>
        [c.mostrarSe, c.ocultarSe].every((cond) => !cond || campos.some((outro) => outro.id === cond.campo)),
      ),
    { error: 'condição aponta para um campo que não existe no formulário' },
  );

const site = defineCollection({
  loader: glob({ pattern: 'site.md', base: conteudo }),
  schema: z.object({
    marca: z.object({
      nome: z.literal('9vee'),
      nomeAlternativo: z.string(),
      resumo: z.string(),
    }),
    contato: z.object({
      whatsapp: z.string().regex(/^55\d{10,11}$/),
      whatsappExibicao: z.string(),
      email: z.email(),
    }),
    cidades: z.array(z.string()).min(1),
    familias: z.array(z.object({ id: z.string(), nome: z.string(), descricao: z.string() })).min(1),
    idiomas: z
      .array(
        z.object({
          slug: z.string().regex(/^[a-z]+$/),
          nome: z.string(),
          saudacao: z.string(),
          lang: z.string(),
          dir: z.enum(['rtl']).optional(),
          familia: z.string(),
        }),
      )
      .length(14),
    redes: z.array(
      z.object({
        nome: z.string(),
        icone: z.enum(['instagram', 'linkedin', 'youtube', 'tiktok', 'facebook', 'x']),
        url: z.url(),
      }),
    ),
    menu: z.object({
      pularParaConteudo: z.string(),
      rotuloNavegacao: z.string(),
      abrir: z.string(),
      fechar: z.string(),
      inicio: z.string(),
      grupos: z.array(
        z.object({
          id: z.string(),
          rotulo: z.string(),
          itens: z.array(link).min(1),
        }),
      ),
      quemSomos: link,
    }),
    trilha: z.object({ rotulo: z.string(), inicio: z.string() }),
    cta: porPublico,
    servicos: z
      .array(
        z.object({
          id: servicoId,
          nome: z.string(),
          descricao: z.string(),
          ordemEmpresa: z.number().int().min(1).max(4),
          ordemVoce: z.number().int().min(1).max(4),
        }),
      )
      .length(4)
      .refine((lista) => new Set(lista.map((s) => s.id)).size === 4, { error: 'serviço repetido' })
      .refine(
        (lista) => [lista.map((s) => s.ordemEmpresa), lista.map((s) => s.ordemVoce)].every((o) => new Set(o).size === 4),
        { error: 'cada público precisa de uma ordem de 1 a 4, sem repetir' },
      ),
    paginas: z
      .record(
        z.enum([
          'home',
          'nr1',
          'idiomas',
          'idioma',
          'traducao',
          'interpretacaoDeMandarim',
          'lms',
          'quemSomos',
          'privacidade',
          'erro404',
        ]),
        z.object({
          nome: z.string(),
          servico: servicoId.optional(),
          // O que o pedido do serviço da página já traz marcado: de cada pergunta de várias respostas para as opções
          // dela, escritas como no formulário.
          marcadas: z.record(z.string(), z.array(z.string()).min(1)).optional(),
          // O prazo de resposta que a página promete, abaixo do botão do pedido e na confirmação dele.
          prazo: z.string().optional(),
          assunto: porPublico,
        }),
      )
      .refine(({ idioma }) => [idioma.nome, ...Object.values(idioma.assunto)].every((texto) => texto.includes('{idioma}')), {
        error: 'o modelo das páginas de idioma precisa de {idioma} no nome e em cada assunto',
      }),
    // O aviso das páginas de idioma ainda não publicadas, que só o local e o preview mostram.
    naoPublicada: z.string(),
    drawer: z.object({
      titulo: z.object({ orcamento: z.string(), aulas: z.string() }),
      fechar: z.string(),
      voltar: z.string(),
      continuar: z.string(),
      opcional: z.string(),
      passo: z.string().includes('{n}').includes('{total}'),
      alterar: z.object({ rotulo: z.string(), publico: z.string(), servico: z.string(), detalhes: z.string() }),
      botaoFlutuante: z.string(),
      publico: z.object({ titulo: z.string(), opcoes: z.object({ empresa: z.string(), voce: z.string() }) }),
      servico: z.object({ titulo: z.string() }),
      detalhes: z.object({
        titulos: z.object({
          nr1: z.string(),
          traducao: z.string(),
          lms: z.string(),
          idiomasEmpresa: z.string(),
          idiomasVoce: z.string(),
        }),
      }),
      final: z.object({
        titulo: z.string(),
        rotuloNome: z.string(),
        tituloPedido: z.string(),
        whatsapp: z.string(),
        receber: z.string(),
        rotuloContato: z.string(),
        // A frase do aceite, com o link para a política no meio dela.
        consentimento: z.object({ legenda: z.string(), antes: z.string(), link: z.string(), depois: z.string() }),
        isca: z.string(),
        enviar: z.string(),
        enviando: z.string(),
      }),
      aberto: z.object({ titulo: z.string(), texto: z.string(), link: z.string() }),
      confirmacao: z.object({
        titulo: z.string(),
        texto: z.string(),
        resumo: z.string(),
        rotuloServico: z.string(),
        rotuloNome: z.string(),
        rotulosContato: z.object({ telefone: z.string(), email: z.string() }),
      }),
      falha: z.object({ titulo: z.string(), texto: z.string(), whatsapp: z.string(), tentar: z.string() }),
      // O e-mail que o pedido vira: o remetente, o assunto que o comercial filtra e os rótulos das linhas dele.
      envio: z.object({
        remetente: z.string(),
        assunto: z.string().includes('{servico}').includes('{publico}').includes('{quem}'),
        servicos: z.object({ nr1: z.string(), traducao: z.string(), idiomas: z.string(), lms: z.string() }),
        publicos: z.object({ empresa: z.string(), voce: z.string() }),
        rotulos: z.object({ publico: z.string(), pagina: z.string(), consentimento: z.string(), aceitoEm: z.string() }),
      }),
      erros: z.object({
        escolha: z.string(),
        multipla: z.string(),
        texto: z.string(),
        data: z.string(),
        nome: z.string(),
        contato: z.string(),
        consentimento: z.string(),
      }),
      mensagens: z.object({
        abertura: z.string().includes('{pagina}'),
        publico: z.object({ empresa: z.string(), voce: z.string() }),
        pedido: z.object({ nr1: z.string(), traducao: z.string(), idiomas: z.string(), lms: z.string() }),
        nome: z.string().includes('{nome}'),
        flutuante: z.string().includes('{pagina}').includes('{assunto}'),
      }),
    }),
    formularios: z.object({
      nr1: formulario,
      traducao: formulario,
      lms: formulario,
      idiomasEmpresa: formulario,
      idiomasVoce: formulario,
    }),
    pendencia: z.object({
      etiqueta: z.string(),
      detalhe: z.string().includes('{nota}').includes('{quem}'),
      quem: z.object({ daniella: z.string(), arthur: z.string() }),
    }),
    rodape: z.object({
      frase: z.string(),
      pronuncia: z.string(),
      atendimento: z.string(),
      tituloContato: z.string(),
      rotuloWhatsapp: z.string(),
      tituloRedes: z.string(),
      rotuloRede: z.string().includes('{rede}'),
      rotuloNavegacao: z.string(),
      privacidade: link,
      direitos: z.string(),
    }),
    erro404: z.object({
      titulo: seo.shape.titulo,
      descricao: seo.shape.descricao,
      h1: z.string(),
      texto: z.string(),
      // O nome, para o leitor de tela, da lista de caminhos: os grupos do menu, com os serviços de cada público.
      rotuloCaminhos: z.string(),
      voltar: z.string(),
    }),
  })
    // O pedido só marca o que o formulário do serviço da página tem. Os idiomas têm um formulário por público.
    .refine(
      ({ paginas, formularios }) =>
        Object.values(paginas).every(
          ({ servico, marcadas }) =>
            !marcadas ||
            (servico !== undefined &&
              PUBLICOS.every((publico) => marcadasValidas(marcadas, formularios[formularioDe(servico, publico)]))),
        ),
      { error: 'página com resposta marcada que o pedido do serviço dela não tem' },
    ),
});

const imagem = z.object({
  id: z.string().regex(/^IMG-[A-Z0-9-]+$/),
  arquivo: z.string().regex(/^[a-z0-9-]+$/),
  alt: z.string().min(10),
});

/** A imagem do Gemini de uma seção: o ID do documento de prompts, o nome do arquivo e o texto alternativo. */
export type Imagem = z.infer<typeof imagem>;

// O que as páginas de serviço têm em comum: o tipo do Service que o Google lê e o hero com o botão do pedido.
const tipoDoServico = z.object({ tipo: z.string() });
const heroDeServico = z.object({
  rotulo: z.string(),
  h1: z.string(),
  apoio: z.string(),
  cta: z.string(),
  imagem,
});
// O fechamento da página de um serviço, com o rótulo fixo do botão.
const fechamentoDeServico = z.object({ titulo: z.string(), texto: z.string(), rotulo: z.string() });
// As seções que mais de uma página de serviço tem: o texto corrido ao lado da imagem e a lista de definições.
const textoComImagem = z.object({ titulo: z.string(), paragrafos: z.array(z.string()).min(1), imagem });
const definicoes = z.object({ titulo: z.string(), apoio: z.string(), itens: z.array(nomeETexto).min(2) });
// O que sustenta a frase em tipo de mostra, logo abaixo dela: o apoio e os itens, com a marca no item que é um
// número. O título muda de página para página: em linhas curtas ou numa frase só.
const sustentacaoDaMostra = {
  apoio: z.string(),
  itens: z.array(tituloETexto.extend({ numero: z.boolean().optional() })).min(1),
};
// A frase em tipo de mostra que quebra onde couber, com o grifo no meio dela.
const fraseComGrifo = z.object({ antes: z.string(), grifo: z.string(), depois: z.string() });

const home = defineCollection({
  loader: glob({ pattern: 'home.md', base: conteudo }),
  schema: z.object({
    seo,
    hero: z.object({
      h1: z.string(),
      apoio: z.string(),
      legendaPublico: z.string(),
      opcoes: z.object({ empresa: z.string(), voce: z.string() }),
      imagemFundo: imagem,
      imagemFrente: imagem,
    }),
    prova: z.object({
      titulo: z.string(),
      itens: z
        .array(
          z.object({
            valor: z.number().int().positive(),
            prefixo: z.string().optional(),
            rotulo: z.string(),
            pendencia: z.string().optional(),
          }),
        )
        .min(1),
      aviso: z.string(),
    }),
    servicos: z.object({
      titulo: z.string(),
      itens: z
        .array(
          z.object({
            id: servicoId,
            titulo: z.string(),
            publico: z.string(),
            texto: z.string(),
            link,
          }),
        )
        .length(4),
    }),
    destaqueNr1: z.object({
      rotulo: z.string(),
      data: z.string(),
      titulo: z.string(),
      pontos: z.array(z.string()).min(1),
      fonte: z.string(),
      link,
      cta: z.string(),
    }),
    // Os três diferenciais do site atual: o nome em tipo grande e o que ele quer dizer.
    diferenciais: z.object({ titulo: z.string(), itens: z.array(nomeETexto).length(3) }),
    como: z.object({
      titulo: z.string(),
      etapas: z.array(z.object({ titulo: z.string(), texto: z.string(), imagem })).min(3).max(4),
    }),
    idiomas: z.object({ titulo: z.string(), apoio: z.string() }),
    depoimentos: z.object({
      titulo: z.string(),
      rotuloAutorizacao: z.string(),
      itens: z
        .array(
          z.object({
            trecho: z.string(),
            nome: z.string(),
            cargo: z.string(),
            empresa: z.string(),
            /** Nome do arquivo em src/assets/logos/, sem o .svg. */
            logo: z.string().regex(/^[a-z-]+$/).optional(),
            servico: z.string(),
            pendencia: z.string().optional(),
          }),
        )
        .min(1),
    }),
    faq,
    ctaFinal: z.object({ titulo: z.string(), texto: z.string() }),
  }),
});

const nr1 = defineCollection({
  loader: glob({ pattern: 'treinamento-nr-1.md', base: conteudo }),
  schema: z.object({
    seo,
    servico: tipoDoServico,
    hero: heroDeServico,
    porQue: z.object({
      titulo: z.string(),
      apoio: z.string(),
      marcos: z
        .array(tituloETexto.extend({ data: z.string(), agora: z.boolean().optional() }))
        .min(2)
        .refine((lista) => lista.filter((marco) => marco.agora).length <= 1, { error: 'só um marco é o de agora' }),
      notas: z.array(z.string()).min(1),
      fonte: z.string(),
    }),
    entrega: z.object({
      titulo: z.string(),
      apoio: z.string(),
      itens: z.array(tituloETexto).min(2),
      nota: z.string(),
    }),
    // O objetivo do treinamento, no apoio, e os temas que ele aborda.
    temas: definicoes,
    modulos: z.object({
      titulo: z.string(),
      apoio: z.string(),
      itens: z.array(tituloETexto).length(3),
    }),
    // Os dois blocos de benefícios do site atual, lado a lado: os do treinamento e os de quem investe nele.
    beneficios: z.object({
      titulo: z.string(),
      apoio: z.string(),
      grupos: z.array(z.object({ rotulo: z.string(), itens: z.array(z.string()).min(2) })).length(2),
    }),
    formato: z.object({
      titulo: z.string(),
      itens: z.array(z.object({ rotulo: z.string(), valor: z.string() })).min(1),
      texto: z.string(),
      cta: z.string(),
    }),
    abordagem: z.object({
      titulo: z.string(),
      apoio: z.string(),
      etapas: z.array(tituloETexto).length(4),
    }),
    faq,
    ctaFinal: fechamentoDeServico,
  }),
});

const idiomas = defineCollection({
  loader: glob({ pattern: 'curso-de-idiomas.md', base: conteudo }),
  schema: z.object({
    seo,
    curso: z.object({
      nome: z.string().includes('{idioma}'),
      descricao: z.string().includes('{idioma}'),
    }),
    hero: z.object({ rotulo: z.string(), h1: z.string(), apoio: z.string(), imagem }),
    idiomas: z.object({ titulo: z.string(), apoio: z.string(), rotuloPedido: z.string() }),
    niveis: z.object({
      titulo: z.string(),
      apoio: z.string(),
      itens: z
        .array(z.object({ codigo: z.string().regex(/^[ABC][12]$/), rotulo: z.string(), texto: z.string() }))
        .length(6),
    }),
    formatos: z.object({
      titulo: z.string(),
      apoio: z.string(),
      itens: z.array(tituloETexto.extend({ id: z.string().regex(/^[a-z]+$/) })).min(2),
      nota: z.string(),
      cta: z.string(),
    }),
    // Cada exame abre o texto completo dele: a linha curta fica à vista, e o detalhe vem em parágrafos.
    provas: z.object({
      titulo: z.string(),
      apoio: z.string(),
      itens: z.array(nomeETexto.extend({ detalhe: z.array(z.string()).min(1) })).min(1),
    }),
    equipe: z.object({
      titulo: z.string(),
      apoio: z.string(),
      itens: z.array(tituloETexto).min(2),
      nota: z.string(),
      cta: z.string(),
    }),
    // A realocação de funcionários, que a página de português para estrangeiros também mostra, e a ponte para o LMS.
    realocacao: tituloETexto.extend({ pontos: z.array(z.string()).min(2) }),
    lms: tituloETexto.extend({ link }),
    como: z.object({
      titulo: z.string(),
      apoio: z.string(),
      etapas: z.array(tituloETexto).length(3),
      imagem,
    }),
    faq,
    ctaFinal: z.object({ titulo: z.string(), texto: z.string() }),
  }),
});

// Uma página por idioma, em content/idiomas/. O nome do arquivo é o endereço; a saudação, o lang e a família
// vêm do idioma em content/site.md. As seções são opcionais: cada página tem as que o conteúdo dela pede.
const paginasDeIdioma = defineCollection({
  loader: glob({ pattern: '*.md', base: `${conteudo}/idiomas` }),
  schema: z
    .object({
      idioma: z.string(),
      publicada: z.boolean(),
      // O idioma sem fato nenhum: só as perguntas, e uma descrição do Google provisória, sem marca de pendência.
      esqueleto: z.boolean().optional(),
      // A página que mostra o bloco de realocação de funcionários, com o texto da página de cursos.
      realocacao: z.boolean().optional(),
      seo,
      topo: z.object({ h1: z.string(), apoio: z.string(), cta: porPublico, imagem }),
      paraQuem: z
        .object({ titulo: z.string(), apoio: z.string(), itens: z.array(tituloETexto).min(2), nota: z.string() })
        .optional(),
      // Os níveis que aquele idioma oferece, na escala dele: do A1 ao C2 ou a da prova do idioma (HSK, JLPT).
      niveis: z
        .object({
          titulo: z.string(),
          apoio: z.string(),
          itens: z.array(z.object({ codigo: z.string(), rotulo: z.string(), texto: z.string() })).min(2).max(6),
        })
        .optional(),
      formatos: z
        .object({ titulo: z.string(), apoio: z.string(), itens: z.array(tituloETexto).min(2), nota: z.string() })
        .optional(),
      provas: z
        .object({ titulo: z.string(), apoio: z.string(), itens: z.array(nomeETexto).min(1) })
        .optional(),
      destaque: z
        .object({
          id: z.string().regex(/^[a-z-]+$/),
          titulo: z.string(),
          apoio: z.string(),
          itens: z.array(tituloETexto).min(2),
          nota: z.string(),
        })
        .optional(),
      faq: faq.optional(),
      ctaFinal: z.object({ titulo: z.string(), texto: z.string() }),
    })
    // A trava não enxerga a descrição provisória do esqueleto, que não tem marca: o esqueleto só vai ao ar
    // depois de reescrito com os fatos e sem a marca.
    .refine(({ esqueleto, publicada }) => !(esqueleto && publicada), {
      error: 'esqueleto não pode ser publicado: escreva a página com os fatos, título e descrição inclusive, e tire o esqueleto',
    }),
});

// O LMS com o que o site atual diz da plataforma. A EdApp, as telas e o que só existe no Canva ficam fora do texto.
const lms = defineCollection({
  loader: glob({ pattern: 'lms.md', base: conteudo }),
  schema: z.object({
    seo,
    servico: tipoDoServico,
    hero: heroDeServico,
    // Os benefícios do site atual, cada um levando à seção da página que o explica.
    motivos: z.object({
      titulo: z.string(),
      itens: z
        .array(z.object({ rotulo: z.string(), descricao: z.string(), href: z.string().regex(/^#[a-z-]+$/) }))
        .min(2),
    }),
    oQueE: textoComImagem,
    // O título da seção é a frase em tipo grande, uma linha por item, com o grifo no começo de cada uma.
    plataforma: z.object({
      linhas: z.array(z.object({ grifo: z.string(), texto: z.string() })).min(1),
      ...sustentacaoDaMostra,
    }),
    // Só o nome de cada relatório: o site atual não diz o que cada um mostra.
    relatorios: z.object({
      titulo: z.string(),
      apoio: z.string(),
      itens: z.array(z.object({ titulo: z.string() })).min(2),
      nota: z.string(),
    }),
    chamada: z.object({
      titulo: z.string(),
      texto: z.string(),
      pontos: z.array(z.string()).min(2),
      cta: z.string(),
    }),
    metodologia: definicoes,
    setores: z.object({
      titulo: z.string(),
      apoio: z.string(),
      itens: z.array(z.string()).min(2),
      nota: z.string(),
    }),
    // As perguntas do pedido de LMS, na ordem do formulário.
    ctaFinal: fechamentoDeServico.extend({ itens: z.array(tituloETexto).min(1) }),
  }),
});

// A Tradução Simultânea com o que o site atual diz dos três formatos, do equipamento, dos idiomas e das cidades.
// O que só existe no Canva (a remota, os idiomas a mais, o revezamento e os casos) entra com pendência.
const traducao = defineCollection({
  loader: glob({ pattern: 'traducao-simultanea.md', base: conteudo }),
  schema: z.object({
    seo,
    servico: tipoDoServico,
    hero: heroDeServico,
    // Os formatos lado a lado, com as mesmas duas perguntas para cada um.
    formatos: z.object({
      titulo: z.string(),
      apoio: z.string(),
      rotulos: z.object({ quando: z.string(), como: z.string() }),
      itens: z.array(z.object({ nome: z.string(), quando: z.string(), como: z.string() })).min(2),
    }),
    comoFunciona: textoComImagem,
    // Só o nome de cada tipo de evento, como o site atual lista.
    eventos: z.object({
      titulo: z.string(),
      apoio: z.string(),
      itens: z.array(z.object({ titulo: z.string() })).min(2),
      nota: z.string(),
      cta: z.string(),
    }),
    // Os idiomas ficam aqui; as cidades vêm de content/site.md, e aqui fica só o rótulo delas.
    atendimento: z.object({
      titulo: z.string(),
      apoio: z.string(),
      idiomas: z.object({ rotulo: z.string(), itens: z.array(z.string()).min(2) }),
      cidades: z.object({ rotulo: z.string() }),
      nota: z.string(),
    }),
    interpretes: definicoes,
    // O bloco curto que apresenta a interpretação de mandarim e leva à página dela.
    mandarim: tituloETexto.extend({ link }),
    faq,
    ctaFinal: fechamentoDeServico,
  }),
});

// A interpretação de mandarim para o mercado financeiro, filha da Tradução Simultânea, com o que a landing do site
// atual diz. Fica fora de content/idiomas/: não é a página do curso, e vai para a produção desde o lançamento.
const interpretacaoDeMandarim = defineCollection({
  loader: glob({ pattern: 'interpretacao-de-mandarim.md', base: conteudo }),
  schema: z.object({
    // O idioma em content/site.md: dele saem o lang da assinatura, a cor do grifo e o endereço do curso.
    idioma: z.string(),
    seo,
    // A página não está no menu nem no rodapé: o nome dela na trilha vem daqui.
    nomeNaTrilha: z.string(),
    servico: tipoDoServico.extend({ nome: z.string() }),
    hero: heroDeServico,
    servicos: z.object({ titulo: z.string(), itens: z.array(nomeETexto).min(2) }),
    // O título da seção é a frase em tipo grande, com o grifo no meio dela e a assinatura na escrita do idioma.
    tese: z.object({
      frase: fraseComGrifo,
      assinatura: z.string(),
      ...sustentacaoDaMostra,
    }),
    // A ponte para o curso de mandarim. O endereço do link sai do código: aqui fica só o rótulo dele.
    curso: tituloETexto.extend({ rotuloDoLink: z.string() }),
    ctaFinal: fechamentoDeServico,
  }),
});

// O Quem Somos com o que o site atual conta: a história, a missão e os três princípios. Sem sede: a 9vee não tem
// endereço aberto ao público. Os números que a página mostra são os da home.
const quemSomos = defineCollection({
  loader: glob({ pattern: 'quem-somos.md', base: conteudo }),
  schema: z.object({
    seo,
    hero: z.object({ rotulo: z.string(), h1: z.string(), apoio: z.string(), imagem }),
    // As quatro frentes de hoje, cada uma levando à página dela.
    frentes: z.object({
      titulo: z.string(),
      itens: z.array(z.object({ rotulo: z.string(), descricao: z.string(), href: z.string() })).min(2),
    }),
    historia: textoComImagem,
    missao: z.object({ frase: fraseComGrifo, ...sustentacaoDaMostra }),
    // O id de cada princípio dá a cor do grifo dele, pelo mapa [data-grupo] do base.css.
    principios: z.object({
      titulo: z.string(),
      apoio: z.string(),
      itens: z
        .array(nomeETexto.extend({ id: z.enum(['proposito', 'coragem', 'parceria']), itens: z.array(tituloETexto).min(2) }))
        .min(2),
    }),
    ctaFinal: z.object({ titulo: z.string(), texto: z.string() }),
  }),
});

// A política de privacidade é texto corrido: parágrafos e listas se alternam na ordem do arquivo, por isso cada
// seção tem uma lista só de blocos.
const privacidade = defineCollection({
  loader: glob({ pattern: 'politica-de-privacidade.md', base: conteudo }),
  schema: z.object({
    seo,
    h1: z.string(),
    apoio: z.string(),
    secoes: z
      .array(
        z.object({
          id: z.string().regex(/^[a-z-]+$/),
          titulo: z.string(),
          blocos: z.array(z.union([z.string(), z.object({ itens: z.array(z.string()).min(2) })])).min(1),
        }),
      )
      .min(1),
    versao: z.string(),
  }),
});

export const collections = {
  site,
  home,
  nr1,
  idiomas,
  paginasDeIdioma,
  lms,
  traducao,
  interpretacaoDeMandarim,
  quemSomos,
  privacidade,
};
