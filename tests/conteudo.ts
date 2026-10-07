// O que os testes do HTML e os do navegador leem do conteúdo: as páginas de texto e as de idioma e de cidade, lidas
// da fonte, em content/idiomas/ e content/cidades/. Fica fora de tests/dist porque o teste de larguras, no Playwright, também usa: aqui não
// entra nada do Vitest.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { caminhoDaCidade, TIPOS_DE_CIDADE, type TipoDeCidade } from '../src/lib/cidades.ts';
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

export interface PaginaDeCidadeNoConteudo {
  rota: string;
  /** O nome do arquivo em content/cidades/: o fim do endereço e o da foto do topo (`cidade-<pagina>`). */
  pagina: string;
  /** A cidade como content/site.md a escreve: o nome dela na trilha. */
  cidade: string;
  tipo: TipoDeCidade;
  publicada: boolean;
}

/** As páginas de cidade, com a mesma regra de publicação das de idioma. */
export function paginasDeCidadeNoConteudo(): PaginaDeCidadeNoConteudo[] {
  const pasta = fileURLToPath(new URL('../content/cidades/', import.meta.url));
  return readdirSync(pasta)
    .filter((nome) => nome.endsWith('.md'))
    .map((nome) => {
      const arquivo = readFileSync(join(pasta, nome), 'utf8');
      const { frontmatter } = partesDoArquivo(arquivo);
      const cidade = /^cidade:\s*"([^"]+)"/m.exec(frontmatter)?.[1];
      const tipo = /^tipo:\s*"([^"]+)"/m.exec(frontmatter)?.[1] as TipoDeCidade | undefined;
      if (!cidade || !tipo || !TIPOS_DE_CIDADE.includes(tipo)) throw new Error(`content/cidades/${nome} sem a cidade ou o tipo no frontmatter`);
      const pagina = nome.replace(/\.md$/, '');
      return { rota: caminhoDaCidade(pagina, tipo), pagina, cidade, tipo, publicada: publicadaNoArquivo(arquivo) };
    });
}

/** As páginas que podem ficar fora da produção, as de idioma e as de cidade. */
export function paginasComPublicacaoNoConteudo(): { rota: string; publicada: boolean }[] {
  return [...paginasDeIdiomaNoConteudo(), ...paginasDeCidadeNoConteudo()];
}
