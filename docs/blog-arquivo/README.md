# Cópia do blog do site atual

Os posts do blog do Wix, guardados para o blog poder voltar depois da troca do site (ticket 14). O site novo não tem blog: cada post antigo vai, em 301, para a página do idioma ou do serviço dele, pelo `docs/redirects.csv`.

- `posts/`: um arquivo por post, com o nome do fim do endereço, sem acento. No alto, entre as linhas de três hífens, vêm o título, o endereço, as datas de publicação e de atualização, a descrição e o endereço das imagens. Depois vem o texto em Markdown, com os links, o negrito, as listas e as imagens.
- `indice.csv`: a lista dos posts, com o arquivo, o endereço, o título, as datas e quantas imagens cada um tem.

## Como foi feita

O script `scripts/arquivo-do-blog.ts` lê a página pública de cada post, com uma pausa de 2 segundos entre os pedidos, sem rodar o JavaScript do Wix (a leitura não conta como visita). A lista de posts é a de `docs/urls-site-atual.csv` mais a do sitemap do blog no ar, que traz os posts publicados depois de 29/09/2026.

Rodar de novo perto do lançamento, porque o blog ainda recebe posts: `node scripts/arquivo-do-blog.ts`. Ele só baixa os posts que ainda não estão na pasta; `--de-novo` baixa todos.

## O que ficou de fora

- O bloco "MAIS VISITADOS", que fecha todos os posts com uma lista de uns 230 links para os outros posts.
- As imagens em si: fica só o endereço delas no Wix, em tamanho original. Elas precisam ser baixadas antes do cancelamento do Wix, junto com a biblioteca de mídia (checklist de lançamento).
- As cores, as fontes e o espaçamento da página.
