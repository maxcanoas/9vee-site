import { ancoraDoIdioma } from './publicacao';
import { jsonParaScript, minuscula, preencher, textoPuro } from './texto';
import type { DadosDoSite } from './site';
import type { PassoDaTrilha } from './trilha';

/** "5511934661917" vira "+55 11 93466-1917". */
export function telefoneInternacional(numero: string): string {
  return `+${numero.slice(0, 2)} ${numero.slice(2, 4)} ${numero.slice(4, -4)}-${numero.slice(-4)}`;
}

export function organizacao(site: DadosDoSite, base: URL) {
  const telefone = telefoneInternacional(site.contato.whatsapp);
  const { endereco } = site.contato;
  return {
    '@type': 'EducationalOrganization',
    '@id': new URL('/#organizacao', base).href,
    name: site.marca.nome,
    alternateName: [site.marca.nomeAlternativo, site.marca.nomeComercial],
    legalName: site.marca.razaoSocial,
    description: textoPuro(site.marca.resumo),
    url: new URL('/', base).href,
    logo: new URL('/logo-9vee.png', base).href,
    email: site.contato.email,
    telephone: telefone,
    // A cidade do Perfil da Empresa no Google, sem a rua. A área atendida diz onde ela trabalha.
    address: {
      '@type': 'PostalAddress',
      addressLocality: endereco.cidade,
      addressRegion: endereco.uf,
      addressCountry: 'BR',
    },
    areaServed: [
      ...site.cidades.map((cidade) => ({ '@type': 'City', name: cidade })),
      { '@type': 'Country', name: 'Brasil' },
    ],
    sameAs: [...site.redes.map((rede) => rede.url), site.contato.perfilGoogle],
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
 * Um serviço da 9vee, ligado à organização pelo @id. A área atendida é o país nos serviços online, que alcançam
 * qualquer cidade. O serviço que a 9vee só afirma presencial passa as cidades, e a área atendida são elas. A página
 * com mais de um serviço dá a cada um a âncora da seção dele.
 */
export function servico(
  base: URL,
  dados: { nome: string; tipo: string; caminho: string; descricao: string; cidades?: readonly string[]; ancora?: string },
) {
  return {
    '@type': 'Service',
    '@id': new URL(`${dados.caminho}#${dados.ancora ?? 'servico'}`, base).href,
    name: dados.nome,
    serviceType: dados.tipo,
    description: textoPuro(dados.descricao),
    url: new URL(dados.caminho, base).href,
    provider: { '@id': new URL('/#organizacao', base).href },
    areaServed: dados.cidades
      ? dados.cidades.map((cidade) => ({ '@type': 'City', name: cidade }))
      : { '@type': 'Country', name: 'Brasil' },
    audience: { '@type': 'BusinessAudience' },
  };
}

/** "Curso de inglês": o nome que a lista de cursos e a página do idioma dão ao curso, como o título da página. */
export function nomeDoCurso(modelo: string, idioma: string): string {
  return preencher(modelo, { idioma: minuscula(idioma) });
}

/** Um Course por idioma, apontando para a página do idioma quando ela existe, e senão para a âncora dele aqui. */
export function listaDeCursos(
  base: URL,
  dados: {
    caminho: string;
    modelos: { nome: string; descricao: string };
    idiomas: readonly { slug: string; nome: string; pagina?: string }[];
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
        name: textoPuro(nomeDoCurso(dados.modelos.nome, idioma.nome)),
        description: textoPuro(preencher(dados.modelos.descricao, { idioma: idioma.nome })),
        url: new URL(idioma.pagina ?? ancoraDoIdioma(idioma.slug), base).href,
        provider: { '@id': new URL('/#organizacao', base).href },
      },
    })),
  };
}

/** O curso da página de um idioma, ligado à organização pelo @id. */
export function curso(base: URL, dados: { nome: string; descricao: string; caminho: string }) {
  return {
    '@type': 'Course',
    '@id': new URL(`${dados.caminho}#curso`, base).href,
    name: textoPuro(dados.nome),
    description: textoPuro(dados.descricao),
    url: new URL(dados.caminho, base).href,
    provider: { '@id': new URL('/#organizacao', base).href },
  };
}

/** A trilha que o Google mostra no resultado (Início > Cursos de idiomas), igual à trilha visível da página. */
export function trilhaDeNavegacao(base: URL, passos: readonly PassoDaTrilha[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: passos.map((passo, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: textoPuro(passo.nome),
      item: new URL(passo.caminho, base).href,
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
