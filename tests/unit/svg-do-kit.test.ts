import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { lerCirculo, lerSvgDoKit } from '../../src/lib/svg-do-kit';

const kit = (arquivo: string) =>
  readFileSync(new URL(`../../assets-cliente/Vectors/${arquivo}`, import.meta.url), 'utf8');

describe('lerSvgDoKit', () => {
  it('extrai viewBox, os três paths e o polígono do logo', () => {
    const logo = lerSvgDoKit(kit('Logo_5.svg'));
    expect(logo.viewBox).toBe('0 0 1195.44 497.29');
    expect(logo.formas.filter((f) => f.tipo === 'path')).toHaveLength(3);
    expect(logo.formas.filter((f) => f.tipo === 'polygon')).toHaveLength(1);
  });

  it('ignora o retângulo de recorte dos ícones sociais', () => {
    const tiktok = lerSvgDoKit(kit('Social_1.svg'));
    expect(tiktok.viewBox).toBe('0 0 212.04 212.04');
    expect(tiktok.formas).toHaveLength(1);
    expect(tiktok.formas[0].tipo).toBe('path');
  });

  it('preserva o preenchimento evenodd do ícone do Facebook', () => {
    expect(lerSvgDoKit(kit('Social_3.svg')).evenodd).toBe(true);
    expect(lerSvgDoKit(kit('Social_2.svg')).evenodd).toBe(false);
  });

  it('entrega os desenhos sem cor fixa, para herdarem a cor do contexto', () => {
    const logo = lerSvgDoKit(kit('Logo_5.svg'));
    expect(JSON.stringify(logo)).not.toMatch(/#[0-9a-f]{6}/i);
  });
});

describe('lerCirculo', () => {
  it('lê o círculo de fundo do Profile Pic, que vira o favicon', () => {
    expect(lerCirculo(kit('Profile Pic.svg'))).toEqual({ cx: '492.71', cy: '492.71', r: '492.71' });
  });

  it('lê o recorte do degradê do Profile Pic_1, e não os retângulos dos outros recortes', () => {
    expect(lerCirculo(kit('Profile Pic_1.svg'))).toEqual({ cx: '492.71', cy: '492.71', r: '492.71' });
  });

  it('avisa quando o SVG não tem círculo', () => {
    expect(() => lerCirculo(kit('Logo_5.svg'))).toThrow('SVG do kit sem círculo');
  });
});
