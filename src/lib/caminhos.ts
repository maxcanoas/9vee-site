// Os endereços de página que o site monta e que o mapa de redirecionamentos e os testes também conhecem. Sem o
// Astro, para o Node carregar.

/** A página de um idioma: o nome do arquivo em content/idiomas/ é o fim do endereço. */
export const caminhoDoIdioma = (pagina: string) => `/curso-de-idiomas/${pagina}/`;

/** A interpretação de mandarim, filha da Tradução Simultânea e fora do menu. */
export const CAMINHO_DA_INTERPRETACAO_DE_MANDARIM = '/traducao-simultanea/mandarim/';
