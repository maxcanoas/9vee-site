// A regra de publicação das páginas de idioma: a página existe no local e no preview, com as pendências à
// vista, e só vai para a produção quando o conteúdo dela está confirmado.
// Com a extensão, o Node carrega este módulo sem o Vite: a trava de produção usa o publicadaNoArquivo.
import { partesDoArquivo } from './texto.ts';

export type Modo = 'local' | 'preview' | 'producao';

export function entraNoBuild({ publicada }: { publicada: boolean }, modo: Modo): boolean {
  return publicada || modo !== 'producao';
}

/**
 * A marca lida direto do arquivo, porque a trava lê content/ sem o Astro. Arquivo sem a marca é de página que
 * está sempre no ar, como as do menu.
 */
export function publicadaNoArquivo(arquivo: string): boolean {
  return !/^publicada:\s*false\s*(?:#.*)?$/m.test(partesDoArquivo(arquivo).frontmatter);
}
