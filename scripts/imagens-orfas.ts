// As imagens de _astro/ que nenhum arquivo do build cita. O glob do Figura importa a pasta de imagens inteira, o Vite
// emite cada arquivo, e o Astro só apaga depois o original das imagens que ele otimizou. Na produção, as fotos das
// páginas de idioma não publicadas sobravam assim, sem página nenhuma que as mostrasse.
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { listarArquivos } from './paginas-do-build.ts';

const IMAGEM = /\.(jpe?g|png|webp|avif|gif)$/;
const TEXTO = ['.html', '.css', '.js', '.json', '.xml', '.txt', '.webmanifest', '.svg'];

/** Apaga as imagens órfãs de <pasta>/_astro/ e devolve o caminho de cada uma, relativo à pasta. */
export function tirarImagensOrfas(pasta: string): string[] {
  const astro = join(pasta, '_astro');
  if (!existsSync(astro)) return [];
  const citado = TEXTO.flatMap((extensao) => listarArquivos(pasta, extensao))
    .map((arquivo) => readFileSync(arquivo, 'utf8'))
    .join('\n');
  const orfas = listarArquivos(astro, '').filter(
    (arquivo) => IMAGEM.test(arquivo) && !citado.includes(arquivo.split(sep).at(-1)!),
  );
  for (const arquivo of orfas) rmSync(arquivo);
  return orfas.map((arquivo) => relative(pasta, arquivo).split(sep).join('/'));
}
