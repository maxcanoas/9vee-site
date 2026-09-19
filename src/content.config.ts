import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SERVICOS } from './lib/contato';

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
      sede: z.string(),
      sedeUf: z.string().length(2),
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
    paginas: z.record(
      z.enum(['home', 'nr1', 'idiomas', 'traducao', 'lms', 'quemSomos', 'especime', 'erro404']),
      z.object({ nome: z.string(), servico: servicoId.optional(), assunto: porPublico }),
    ),
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
        enviar: z.string(),
      }),
      aberto: z.object({ titulo: z.string(), texto: z.string(), link: z.string() }),
      confirmacao: z.object({
        titulo: z.string(),
        texto: z.string(),
        resumo: z.string(),
        rotuloServico: z.string(),
        rotuloNome: z.string(),
        rotulosContato: z.object({ telefone: z.string(), email: z.string() }),
        simulado: z.string(),
      }),
      erros: z.object({
        escolha: z.string(),
        multipla: z.string(),
        texto: z.string(),
        data: z.string(),
        nome: z.string(),
        contato: z.string(),
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
    pendencia: z.object({ etiqueta: z.string(), detalhe: z.string().includes('{nota}') }),
    rodape: z.object({
      pronuncia: z.string(),
      atendimento: z.string(),
      tituloContato: z.string(),
      rotuloWhatsapp: z.string(),
      tituloRedes: z.string(),
      rotuloRede: z.string().includes('{rede}'),
      rotuloNavegacao: z.string(),
      etiquetaMvp: z.string(),
      privacidade: link,
      direitos: z.string(),
    }),
    erro404: z.object({
      titulo: seo.shape.titulo,
      descricao: seo.shape.descricao,
      h1: z.string(),
      texto: z.string(),
      voltar: z.string(),
    }),
  }),
});

const imagem = z.object({
  id: z.string().regex(/^IMG-[A-Z0-9-]+$/),
  arquivo: z.string().regex(/^[a-z0-9-]+$/),
  alt: z.string().min(10),
});

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
    servico: z.object({ tipo: z.string() }),
    hero: z.object({
      rotulo: z.string(),
      h1: z.string(),
      apoio: z.string(),
      cta: z.string(),
      imagem,
    }),
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
    modulos: z.object({
      titulo: z.string(),
      apoio: z.string(),
      itens: z.array(tituloETexto).length(3),
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
    ctaFinal: z.object({ titulo: z.string(), texto: z.string(), rotulo: z.string() }),
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
    provas: z.object({
      titulo: z.string(),
      apoio: z.string(),
      itens: z.array(z.object({ nome: z.string(), texto: z.string() })).min(1),
    }),
    equipe: z.object({
      titulo: z.string(),
      apoio: z.string(),
      itens: z.array(tituloETexto).min(2),
      nota: z.string(),
      cta: z.string(),
    }),
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

// As três páginas que ficam parciais no MVP: hero, um bloco curto e a etiqueta de obra.
const parciais = defineCollection({
  loader: glob({ pattern: '{traducao-simultanea,lms,quem-somos}.md', base: conteudo }),
  schema: z.object({
    seo,
    hero: z.object({
      rotulo: z.string(),
      h1: z.string(),
      apoio: z.string(),
      cta: z.string().optional(),
      imagem,
    }),
    bloco: z.object({
      titulo: z.string(),
      apoio: z.string(),
      itens: z.array(tituloETexto).min(2),
      nota: z.string(),
      cta: z.string().optional(),
    }),
  }),
});

export const collections = {
  site,
  home,
  nr1,
  idiomas,
  parciais,
};
