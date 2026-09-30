// As imagens de _astro/ que nenhum arquivo do build cita. O glob do Figura importa a pasta de imagens inteira, o Vite
// emite cada arquivo, e o Astro só apaga depois o original das imagens que ele otimizou. Na produção, as fotos das
// páginas de idioma não publicadas sobravam assim, sem página nenhuma que as mostrasse.
import { existsSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { extname, join } from 'node:path';

const IMAGEM = /\.(jpe?g|png|webp|avif)$/;
/** Onde o build cita uma imagem: no HTML (src e srcset), no CSS (url) e no JavaScript. */
const QUEM_CITA = new Set(['.html', '.css', '.js']);

/** Apaga as imagens órfãs de <pasta>/_astro/ e devolve o nome de cada uma. */
export function tirarImagensOrfas(pasta: string): string[] {
  const pastaAstro = join(pasta, '_astro');
  if (!existsSync(pastaAstro)) return [];
  const textoDoBuild = readdirSync(pasta, { recursive: true, encoding: 'utf8' })
    .filter((caminho) => QUEM_CITA.has(extname(caminho)))
    .map((caminho) => readFileSync(join(pasta, caminho), 'utf8'))
    .join('\n');
  const orfas = readdirSync(pastaAstro).filter((nome) => IMAGEM.test(nome) && !textoDoBuild.includes(nome));
  for (const nome of orfas) rmSync(join(pastaAstro, nome));
  return orfas;
}
