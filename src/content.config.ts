import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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
    cta: z.object({
      neutro: z.string(),
      empresa: z.string(),
      voce: z.string(),
    }),
    rodape: z.object({
      pronuncia: z.string(),
      atendimento: z.string(),
      tituloContato: z.string(),
      rotuloWhatsapp: z.string(),
      rotuloEmail: z.string(),
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

export const servicoId = z.enum(['nr1', 'traducao', 'idiomas', 'lms']);

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
            ordemEmpresa: z.number().int().min(1).max(4),
            ordemVoce: z.number().int().min(1).max(4),
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
    faq: z.object({
      titulo: z.string(),
      itens: z.array(z.object({ pergunta: z.string(), resposta: z.string() })).min(1),
    }),
    ctaFinal: z.object({ titulo: z.string(), texto: z.string() }),
  }),
});

// Esquema provisório: cada página ganha o próprio esquema na etapa em que é construída.
const paginaEmConstrucao = z.object({
  seo,
  h1: z.string(),
  aviso: z.string(),
  tituloIdiomas: z.string().optional(),
  secoes: z.array(z.object({ id: z.string(), titulo: z.string() })).default([]),
});

const pagina = (arquivo: string) =>
  defineCollection({
    loader: glob({ pattern: arquivo, base: conteudo }),
    schema: paginaEmConstrucao,
  });

export const collections = {
  site,
  home,
  nr1: pagina('treinamento-nr-1.md'),
  idiomas: pagina('curso-de-idiomas.md'),
  parciais: pagina('{traducao-simultanea,lms,quem-somos}.md'),
};
