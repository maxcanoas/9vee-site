import { jsonParaScript, preencher, textoPuro } from './texto';
import type { DadosDoSite } from './site';

/** "5511934661917" vira "+55 11 93466-1917". */
export function telefoneInternacional(numero: string): string {
  return `+${numero.slice(0, 2)} ${numero.slice(2, 4)} ${numero.slice(4, -4)}-${numero.slice(-4)}`;
}

export function organizacao(site: DadosDoSite, base: URL) {
  const telefone = telefoneInternacional(site.contato.whatsapp);
  return {
    '@type': 'EducationalOrganization',
    '@id': new URL('/#organizacao', base).href,
    name: site.marca.nome,
    alternateName: site.marca.nomeAlternativo,
    description: textoPuro(site.marca.resumo),
    url: new URL('/', base).href,
    logo: new URL('/logo-9vee.png', base).href,
    email: site.contato.email,
    telephone: telefone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.marca.sede,
      addressRegion: site.marca.sedeUf,
      addressCountry: 'BR',
    },
    areaServed: [
      ...site.cidades.map((cidade) => ({ '@type': 'City', name: cidade })),
      { '@type': 'Country', name: 'Brasil' },
    ],
    sameAs: site.redes.map((rede) => rede.url),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: telefone,
      email: site.contato.email,
      availableLanguage: ['Portuguese'],
    },
  };
}

/**
 * Um serviço da 9vee, ligado à organização pelo @id. A área atendida é o país, porque o treinamento
 * online alcança qualquer cidade e o presencial ainda depende da confirmação da Daniella.
 */
export function servico(base: URL, dados: { nome: string; tipo: string; caminho: string; descricao: string }) {
  return {
    '@type': 'Service',
    '@id': new URL(`${dados.caminho}#servico`, base).href,
    name: dados.nome,
    serviceType: dados.tipo,
    description: textoPuro(dados.descricao),
    url: new URL(dados.caminho, base).href,
    provider: { '@id': new URL('/#organizacao', base).href },
    areaServed: { '@type': 'Country', name: 'Brasil' },
    audience: { '@type': 'BusinessAudience' },
  };
}

/** Um Course por idioma, cada um apontando para a própria âncora na página de cursos. */
export function listaDeCursos(
  base: URL,
  dados: {
    caminho: string;
    modelos: { nome: string; descricao: string };
    idiomas: readonly { slug: string; nome: string }[];
  },
) {
  return {
    '@type': 'ItemList',
    '@id': new URL(`${dados.caminho}#cursos`, base).href,
    itemListElement: dados.idiomas.map((idioma, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: preencher(dados.modelos.nome, { idioma: idioma.nome }),
        description: preencher(dados.modelos.descricao, { idioma: idioma.nome }),
        url: new URL(`${dados.caminho}#${idioma.slug}`, base).href,
        provider: { '@id': new URL('/#organizacao', base).href },
      },
    })),
  };
}

/** O FAQPage repete, sem marcação, as mesmas perguntas que a página mostra. */
export function faqPage(itens: readonly { pergunta: string; resposta: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: itens.map((item) => ({
      '@type': 'Question',
      name: textoPuro(item.pergunta),
      acceptedAnswer: { '@type': 'Answer', text: textoPuro(item.resposta) },
    })),
  };
}

/** Serializa para <script type="application/ld+json"> sem permitir fechar a tag. */
export function serializarJsonLd(nos: Record<string, unknown>[]): string {
  const documento =
    nos.length === 1
      ? { '@context': 'https://schema.org', ...nos[0] }
      : { '@context': 'https://schema.org', '@graph': nos };
  return jsonParaScript(documento);
}
