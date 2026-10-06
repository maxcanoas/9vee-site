// As imagens de prévia das páginas (ticket 18), geradas no fim de cada build: para cada página que aponta uma imagem em
// /compartilhar/, o texto do og:image:alt sobre o fundo da marca (src/assets/marca/compartilhar-fundo.png, do
// scripts/gerar-ativos.ts), na Readex Pro, a fonte dos títulos do site. Como o texto sai do HTML pronto, a imagem
// acompanha o título quando ele muda.
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';
import sharp from 'sharp';
import { listarArquivos } from './paginas-do-build.ts';

const FUNDO = fileURLToPath(new URL('../src/assets/marca/compartilhar-fundo.png', import.meta.url));
const FONTE = fileURLToPath(new URL('../src/assets/fontes/ReadexPro-SemiBold.ttf', import.meta.url));
const PAPEL = '#f9f9f9';
const MARGEM = 88;
const ALTURA = 630;
// A área livre à esquerda do círculo da marca (que começa em x = 692 no meio da altura), e quantas linhas o título
// pode ocupar nela.
const LARGURA_DO_TEXTO = 590;
const MAXIMO_DE_LINHAS = 3;
// Do maior para o menor: o título curto sai grande, e o longo diminui até caber em três linhas.
const TAMANHOS = [68, 60, 52];

const escapar = (texto: string) => texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** O título desenhado em PNG transparente, no maior tamanho em que cabe nas três linhas. */
async function desenharTitulo(texto: string): Promise<{ png: Buffer; altura: number }> {
  for (const tamanho of TAMANHOS) {
    const png = await sharp({
      text: {
        text: `<span foreground="${PAPEL}">${escapar(texto)}</span>`,
        font: `Readex Pro SemiBold ${tamanho}`,
        fontfile: FONTE,
        width: LARGURA_DO_TEXTO,
        wrap: 'word',
        spacing: Math.round(tamanho * 0.12),
        rgba: true,
        dpi: 72,
      },
    })
      .png()
      .toBuffer();
    const { height: altura = 0 } = await sharp(png).metadata();
    if (altura <= tamanho * 1.25 * MAXIMO_DE_LINHAS) return { png, altura };
  }
  throw new Error(`"${texto}" não cabe em ${MAXIMO_DE_LINHAS} linhas na imagem de prévia`);
}

/** A imagem de prévia com o texto dado, em JPEG. */
export async function imagemDePrevia(texto: string): Promise<Buffer> {
  const titulo = await desenharTitulo(texto);
  return sharp(FUNDO)
    // O título fica no meio da altura, um pouco abaixo, por causa do logo no alto.
    .composite([{ input: titulo.png, left: MARGEM, top: Math.round((ALTURA - titulo.altura) / 2) + 30 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();
}

/** Gera na pasta do build a imagem de cada página que aponta uma em /compartilhar/, e devolve quantas gerou. */
export async function gerarPrevias(pasta: string): Promise<number> {
  const previas = new Map<string, string>();
  for (const arquivo of listarArquivos(pasta, '.html')) {
    const raiz = parse(readFileSync(arquivo, 'utf8'));
    const endereco = raiz.querySelector('meta[property="og:image"]')?.getAttribute('content');
    const caminho = endereco ? new URL(endereco).pathname : '';
    if (!caminho.startsWith('/compartilhar/')) continue;
    const texto = raiz.querySelector('meta[property="og:image:alt"]')?.getAttribute('content')?.trim();
    if (!texto) throw new Error(`${arquivo}: imagem de prévia sem o texto no og:image:alt`);
    if (previas.has(caminho) && previas.get(caminho) !== texto) throw new Error(`${caminho} serve a duas páginas com textos diferentes`);
    previas.set(caminho, texto);
  }
  for (const [caminho, texto] of previas) {
    const destino = join(pasta, caminho);
    mkdirSync(dirname(destino), { recursive: true });
    await sharp(await imagemDePrevia(texto)).toFile(destino);
  }
  return previas.size;
}
