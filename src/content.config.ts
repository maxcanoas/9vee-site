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

// Esquema provisório: cada página ganha o próprio esquema na etapa em que é construída.
const paginaEmConstrucao = z.object({
  seo,
  h1: z.string(),
  aviso: z.string(),
  secoes: z.array(z.object({ id: z.string(), titulo: z.string() })).default([]),
});

const pagina = (arquivo: string) =>
  defineCollection({
    loader: glob({ pattern: arquivo, base: conteudo }),
    schema: paginaEmConstrucao,
  });

export const collections = {
  site,
  home: pagina('home.md'),
  nr1: pagina('treinamento-nr-1.md'),
  idiomas: pagina('curso-de-idiomas.md'),
  parciais: pagina('{traducao-simultanea,lms,quem-somos}.md'),
};
