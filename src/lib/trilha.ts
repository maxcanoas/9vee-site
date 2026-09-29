// A trilha de navegação das páginas internas, tirada do endereço. O nome de cada passo é o que o menu dá à
// página, e não o da mensagem do WhatsApp: a trilha visível e o BreadcrumbList mudam junto com o menu.

export interface PassoDaTrilha {
  nome: string;
  caminho: string;
}

interface LinkDoMenu {
  rotulo: string;
  href: string;
}

/** O que a trilha lê de content/site.md. */
export interface DadosDaTrilha {
  trilha: { inicio: string };
  menu: { grupos: readonly { itens: readonly LinkDoMenu[] }[]; quemSomos: LinkDoMenu };
}

// Os links do menu que levam a uma página inteira, sem âncora, do endereço para o rótulo.
function rotulosDoMenu({ menu }: DadosDaTrilha): Map<string, string> {
  const links = [...menu.grupos.flatMap((grupo) => grupo.itens), menu.quemSomos];
  return new Map(links.filter(({ href }) => !href.includes('#')).map(({ href, rotulo }) => [href, rotulo]));
}

/** O Início e um passo para cada nível do endereço: /curso-de-idiomas/ingles/ passa por /curso-de-idiomas/. */
export function trilhaDoCaminho(site: DadosDaTrilha, caminho: string): PassoDaTrilha[] {
  const rotulos = rotulosDoMenu(site);
  const niveis = caminho.split('/').filter(Boolean);
  return [
    { nome: site.trilha.inicio, caminho: '/' },
    ...niveis.map((_, i) => {
      const nivel = `/${niveis.slice(0, i + 1).join('/')}/`;
      const nome = rotulos.get(nivel);
      if (!nome) throw new Error(`A trilha não tem nome para ${nivel}: o nome de cada passo vem do menu de content/site.md.`);
      return { nome, caminho: nivel };
    }),
  ];
}
