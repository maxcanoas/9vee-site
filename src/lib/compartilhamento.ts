// A imagem de prévia de cada página (ticket 18), a que aparece quando alguém compartilha o link no WhatsApp ou nas
// redes. O Base põe o endereço dela no Open Graph, com o texto no og:image:alt, e o build gera a imagem com esse texto
// sobre o fundo da marca (scripts/compartilhamento.ts). A página de erro fica com a prévia geral, o /og.jpg.

/** O endereço da imagem de prévia da página: /curso-de-idiomas/ingles/ é /compartilhar/curso-de-idiomas-ingles.jpg. */
export function imagemDaPagina(caminho: string): string {
  const nome = caminho.split('/').filter(Boolean).join('-') || 'inicio';
  return `/compartilhar/${nome}.jpg`;
}

/** O texto da imagem: o título da página sem o nome da marca, que o logo da imagem já mostra. */
export function textoDaImagem(titulo: string, marca: string): string {
  return titulo
    .split(' | ')
    .filter((parte) => parte.trim() !== marca)
    .join(' | ')
    .trim();
}
