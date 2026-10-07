// A regra de publicação das páginas de idioma e de cidade: a página existe no local e no preview, com as pendências
// à vista, e só vai para a produção quando o conteúdo dela está confirmado.
// Com a extensão, o Node carrega este módulo sem o Vite: a trava de produção usa o publicadaNoArquivo.
import { partesDoArquivo } from './texto.ts';

export type Modo = 'local' | 'preview' | 'producao';

// As pastas de content/ cujas páginas podem ficar fora da produção. Nas outras, a marca não vale: uma página do
// menu vai ao ar de qualquer jeito, e a marca esquecida nela esconderia uma pendência da trava.
export const PASTAS_COM_PUBLICACAO = ['idiomas', 'cidades'];

export function entraNoBuild({ publicada }: { publicada: boolean }, modo: Modo): boolean {
  return publicada || modo !== 'producao';
}

/** A âncora de um idioma na lista da página de cursos: é o endereço do curso dele enquanto a página não é publicada. */
export const ancoraDoIdioma = (slug: string) => `/curso-de-idiomas/#${slug}`;

/** Para onde leva o link do curso de um idioma, de fora da página de cursos: a página dele, se publicada, ou a âncora. */
export function enderecoDoCurso(publicados: ReadonlyMap<string, string>, slug: string): string {
  return publicados.get(slug) ?? ancoraDoIdioma(slug);
}

/**
 * A marca lida direto do arquivo, porque a trava lê content/ sem o Astro. Arquivo sem a marca é de página que
 * está sempre no ar, como as do menu.
 */
export function publicadaNoArquivo(arquivo: string): boolean {
  return !/^publicada:\s*false\s*(?:#.*)?$/m.test(partesDoArquivo(arquivo).frontmatter);
}
