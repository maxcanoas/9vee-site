import { jsonParaScript, textoPuro } from './texto';
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

/** Serializa para <script type="application/ld+json"> sem permitir fechar a tag. */
export function serializarJsonLd(nos: Record<string, unknown>[]): string {
  const documento =
    nos.length === 1
      ? { '@context': 'https://schema.org', ...nos[0] }
      : { '@context': 'https://schema.org', '@graph': nos };
  return jsonParaScript(documento);
}
