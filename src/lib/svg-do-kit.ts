export type Forma = { tipo: 'path'; d: string } | { tipo: 'polygon'; points: string };

export interface DesenhoSvg {
  viewBox: string;
  formas: Forma[];
  evenodd: boolean;
}

/**
 * Lê um SVG do kit de marca, ou o logo de uma empresa cliente, e devolve só a geometria: viewBox, path e polygon.
 * As cores ficam de fora porque o kit usa classes .cls-N em <style>, que colidiriam com vários SVGs na mesma
 * página, e porque o site pinta tudo com a cor do texto. Não lê transform, rect nem circle, e o evenodd só
 * quando vem no CSS do kit.
 */
export function lerSvgDoKit(bruto: string): DesenhoSvg {
  const viewBox = /viewBox="([^"]+)"/.exec(bruto)?.[1];
  if (!viewBox) throw new Error('SVG sem viewBox');

  const formas: Forma[] = [...bruto.matchAll(/<(path|polygon)\b[^>]*?\s(?:d|points)="([^"]+)"/g)].map(
    ([, tipo, valor]) => (tipo === 'path' ? { tipo: 'path', d: valor } : { tipo: 'polygon', points: valor }),
  );
  if (formas.length === 0) throw new Error('SVG sem desenho');

  return { viewBox, formas, evenodd: /fill-rule:\s*evenodd/.test(bruto) };
}

/** O primeiro círculo do SVG: o fundo do Profile Pic e o recorte do degradê do Profile Pic_1. */
export function lerCirculo(bruto: string): { cx: string; cy: string; r: string } {
  const circulo = /<circle\b[^>]*\bcx="([^"]+)"[^>]*\bcy="([^"]+)"[^>]*\br="([^"]+)"/.exec(bruto);
  if (!circulo) throw new Error('SVG do kit sem círculo');
  const [, cx, cy, r] = circulo;
  return { cx, cy, r };
}
