// Gera a partir do kit da cliente os ícones, a imagem de prévia do link e o logo em PNG (em public/)
// e o círculo da marca (em src/assets/marca/, onde o Astro otimiza a imagem).
// Rodar de novo só se o kit mudar: node scripts/gerar-ativos.ts
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { lerCirculo, lerSvgDoKit, type Forma } from '../src/lib/svg-do-kit.ts';

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
const fundo = lerCirculo(perfilBruto);
const favicon =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${perfil.viewBox}">` +
  `<circle cx="${fundo.cx}" cy="${fundo.cy}" r="${fundo.r}" fill="${NAVY}"/>` +
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

// Círculo da marca (o "círculo Novee" do kit, Vectors/Profile Pic_1.svg): só a camada de degradê, com o recorte em círculo do próprio kit.
// As letras ficam de fora, porque no site a intérprete e as imagens cobrem o miolo do círculo.
const perfilMarca = await doKit('Vectors/Profile Pic_1.svg');
const recorteMarca = lerCirculo(perfilMarca);
const degradeMarca = /<image\b[^>]*\/>/.exec(perfilMarca)?.[0];
if (!degradeMarca) throw new Error('Profile Pic_1.svg sem a camada de degradê');
const ladoCirculo = 1200;
const circuloMarca =
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${lerSvgDoKit(perfilMarca).viewBox}" width="${ladoCirculo}" height="${ladoCirculo}">` +
  `<clipPath id="c"><circle cx="${recorteMarca.cx}" cy="${recorteMarca.cy}" r="${recorteMarca.r}"/></clipPath>` +
  `<g clip-path="url(#c)">${degradeMarca}</g></svg>`;
await mkdir(new URL('src/assets/marca/', raiz), { recursive: true });
await sharp(Buffer.from(circuloMarca))
  .png({ compressionLevel: 9 })
  .toFile(fileURLToPath(new URL('src/assets/marca/circulo-marca.png', raiz)));

// O mesmo círculo com o logo empilhado no miolo (o PNG do kit, PP & Banner/Profile Pic_1.png), para o fim da home.
await sharp(fileURLToPath(new URL('assets-cliente/PP & Banner/Profile Pic_1.png', raiz)))
  .resize(ladoCirculo, ladoCirculo)
  .png({ compressionLevel: 9 })
  .toFile(fileURLToPath(new URL('src/assets/marca/circulo-marca-logo.png', raiz)));

console.log('ativos gerados em public/: favicon.svg, apple-touch-icon.png, og.jpg, logo-9vee.png, texturas/meias-luas.svg');
console.log('e em src/assets/marca/: circulo-marca.png, circulo-marca-logo.png');
