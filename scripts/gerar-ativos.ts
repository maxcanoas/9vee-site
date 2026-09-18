// Gera em public/ os ícones, a imagem de prévia do link e o logo em PNG, a partir do kit da cliente.
// Rodar de novo só se o kit mudar: node scripts/gerar-ativos.ts
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { lerSvgDoKit, type Forma } from '../src/lib/svg-do-kit.ts';

const raiz = new URL('../', import.meta.url);
const doKit = (arquivo: string) => readFile(new URL(`assets-cliente/${arquivo}`, raiz), 'utf8');
const emPublic = (arquivo: string) => new URL(`public/${arquivo}`, raiz);

const NAVY = '#212d4d';
const PAPEL = '#f9f9f9';

const desenhar = (formas: Forma[], cor: string) =>
  formas
    .map((f) => (f.tipo === 'path' ? `<path fill="${cor}" d="${f.d}"/>` : `<polygon fill="${cor}" points="${f.points}"/>`))
    .join('');

// Favicon: o "9" off-white no círculo navy do kit (Vectors/Profile Pic.svg). Legível em aba clara e escura.
const perfilBruto = await doKit('Vectors/Profile Pic.svg');
const perfil = lerSvgDoKit(perfilBruto);
const circulo = /<circle[^>]*\bcx="([^"]+)"[^>]*\bcy="([^"]+)"[^>]*\br="([^"]+)"/.exec(perfilBruto);
if (!circulo) throw new Error('Profile Pic.svg sem o círculo');
const favicon =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${perfil.viewBox}">` +
  `<circle cx="${circulo[1]}" cy="${circulo[2]}" r="${circulo[3]}" fill="${NAVY}"/>` +
  desenhar(perfil.formas, PAPEL) +
  '</svg>\n';
await writeFile(emPublic('favicon.svg'), favicon);

// Ícone do iPhone: quadrado navy (o iOS arredonda os cantos e pinta transparência de preto).
const nove = lerSvgDoKit(await doKit('Vectors/Stamp.svg'));
const [, , largura9, altura9] = nove.viewBox.split(/\s+/).map(Number);
const lado = 180;
const escala = (lado * 0.6) / altura9;
const deslocX = (lado - largura9 * escala) / 2;
const deslocY = (lado - altura9 * escala) / 2;
const icone =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${lado} ${lado}">` +
  `<rect width="${lado}" height="${lado}" fill="${NAVY}"/>` +
  `<g transform="translate(${deslocX.toFixed(2)} ${deslocY.toFixed(2)}) scale(${escala.toFixed(5)})">` +
  desenhar(nove.formas, PAPEL) +
  '</g></svg>';
await sharp(Buffer.from(icone)).png().toFile(fileURLToPath(emPublic('apple-touch-icon.png')));

// Prévia do link (og:image): o banner do kit recortado em 1200 × 630, com o logo no centro.
await sharp(fileURLToPath(new URL('assets-cliente/PP & Banner/Banner.png', raiz)))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(fileURLToPath(emPublic('og.jpg')));

// Logo em PNG para o JSON-LD (o Google pede imagem, não SVG).
const logo = lerSvgDoKit(await doKit('Vectors/Logo_5.svg'));
const [, , larguraLogo, alturaLogo] = logo.viewBox.split(/\s+/).map(Number);
const larguraPng = 600;
const alturaPng = Math.round((larguraPng * alturaLogo) / larguraLogo);
const logoSvg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${logo.viewBox}" width="${larguraPng}" height="${alturaPng}">` +
  desenhar(logo.formas, NAVY) +
  '</svg>';
await sharp(Buffer.from(logoSvg)).png().toFile(fileURLToPath(emPublic('logo-9vee.png')));

// Textura dos Placeholders: os meios-círculos do padrão do kit (Vectors/Pattern_4.svg), em branco.
const padrao = lerSvgDoKit(await doKit('Vectors/Pattern_4.svg'));
await mkdir(emPublic('texturas/'), { recursive: true });
await writeFile(
  emPublic('texturas/meias-luas.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${padrao.viewBox}">${desenhar(padrao.formas, '#ffffff')}</svg>\n`,
);

console.log('ativos gerados em public/: favicon.svg, apple-touch-icon.png, og.jpg, logo-9vee.png, texturas/meias-luas.svg');
