// A trilha de navegação das páginas internas, tirada do endereço. O nome de cada passo é o que o menu (ou, na
// política de privacidade, o rodapé) dá à página, e não o da mensagem do WhatsApp: a trilha visível e o
// BreadcrumbList mudam junto com o link.

export interface PassoDaTrilha {
  nome: string;
  caminho: string;
}

export interface LinkDePagina {
  rotulo: string;
  href: string;
}

/** O que a trilha lê de content/site.md. */
export interface DadosDaTrilha {
  trilha: { inicio: string };
  menu: { grupos: readonly { itens: readonly LinkDePagina[] }[]; quemSomos: LinkDePagina };
  rodape: { privacidade: LinkDePagina };
}

// Os links do menu e do rodapé que levam a uma página inteira, sem âncora, do endereço para o rótulo.
function rotulosDoSite({ menu, rodape }: DadosDaTrilha): [string, string][] {
  const links = [...menu.grupos.flatMap((grupo) => grupo.itens), menu.quemSomos, rodape.privacidade];
  return links.filter(({ href }) => !href.includes('#')).map(({ href, rotulo }) => [href, rotulo]);
}

/**
 * O Início e um passo para cada nível do endereço: /curso-de-idiomas/ingles/ passa por /curso-de-idiomas/.
 * As páginas que não estão no menu nem no rodapé, como as de idioma, trazem o próprio nome; se a página também está
 * num deles, vale o nome do link.
 */
export function trilhaDoCaminho(
  site: DadosDaTrilha,
  caminho: string,
  comNomeProprio: readonly LinkDePagina[] = [],
): PassoDaTrilha[] {
  const rotulos = new Map([...comNomeProprio.map(({ href, rotulo }): [string, string] => [href, rotulo]), ...rotulosDoSite(site)]);
  const niveis = caminho.split('/').filter(Boolean);
  return [
    { nome: site.trilha.inicio, caminho: '/' },
    ...niveis.map((_, i) => {
      const nivel = `/${niveis.slice(0, i + 1).join('/')}/`;
      const nome = rotulos.get(nivel);
      if (!nome) {
        throw new Error(
          `A trilha não tem nome para ${nivel}: o nome de cada passo vem do menu ou do rodapé de content/site.md ou, nas páginas fora deles, da própria página.`,
        );
      }
      return { nome, caminho: nivel };
    }),
  ];
}
