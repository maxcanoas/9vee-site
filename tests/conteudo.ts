// O que os testes do HTML e os do navegador leem do conteúdo: as páginas de texto e as de idioma, lidas da fonte,
// em content/idiomas/. Fica fora de tests/dist porque o teste de larguras, no Playwright, também usa: aqui não
// entra nada do Vitest.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { publicadaNoArquivo } from '../src/lib/publicacao.ts';
import { partesDoArquivo } from '../src/lib/texto.ts';

/** As páginas de texto, sem hero e sem o círculo da marca. */
export const PAGINAS_DE_TEXTO = ['/politica-de-privacidade/'];

/** A página de interpretação de mandarim, filha da Tradução Simultânea e fora do menu. */
export const INTERPRETACAO_DE_MANDARIM = '/traducao-simultanea/mandarim/';

export interface PaginaDeIdiomaNoConteudo {
  rota: string;
  /** O nome do arquivo em content/idiomas/: o fim do endereço e o da foto do topo (`idioma-<pagina>`). */
  pagina: string;
  /** O slug do idioma em content/site.md, que é também a âncora dele na página de cursos. */
  idioma: string;
  publicada: boolean;
}

/** Com a mesma regra da trava. O preview tem todas; a produção, só as publicadas. */
export function paginasDeIdiomaNoConteudo(): PaginaDeIdiomaNoConteudo[] {
  const pasta = fileURLToPath(new URL('../content/idiomas/', import.meta.url));
  return readdirSync(pasta)
    .filter((nome) => nome.endsWith('.md'))
    .map((nome) => {
      const arquivo = readFileSync(join(pasta, nome), 'utf8');
      const idioma = /^idioma:\s*"([^"]+)"/m.exec(partesDoArquivo(arquivo).frontmatter)?.[1];
      if (!idioma) throw new Error(`content/idiomas/${nome} sem o idioma no frontmatter`);
      const pagina = nome.replace(/\.md$/, '');
      return { rota: `/curso-de-idiomas/${pagina}/`, pagina, idioma, publicada: publicadaNoArquivo(arquivo) };
    });
}
