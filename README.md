# Site da 9vee

O site da 9vee (www.9vee.com.br): cursos de idiomas, tradução simultânea, treinamento de NR-1 e LMS. É um site estático feito em [Astro](https://astro.build): o build gera páginas HTML prontas, sem servidor e sem banco de dados, que funcionam em qualquer hospedagem. Hoje o preview está no Cloudflare, e o site definitivo vai para a HostGator.

## Para rodar no computador

Precisa do Node.js 22.12 ou mais novo.

```
npm install
npm run dev
```

O site abre em http://localhost:4321 e se atualiza sozinho a cada arquivo salvo. Para abrir no celular, na mesma rede Wi-Fi: `npm run dev:rede`.

## Os três modos do site

| Modo | Comando | Sai em | Para quê |
|---|---|---|---|
| Local | `npm run dev` | (na memória) | Trabalhar no site. O GA4 manda para a propriedade de teste, com depuração |
| Preview | `npm run build:preview` | `dist/` | O que a 9vee vê no Cloudflare. Tem `noindex` em todas as páginas, mostra as pendências como etiqueta "a confirmar" e não mede nada |
| Produção | `npm run build:producao` | `dist-producao/` | O site definitivo. Só sai se passar na trava (abaixo). Leva o sitemap, o `.htaccess` e a verificação do Search Console |

Para ver o build de produção rodando: `npm run preview`. Ele usa a porta 4321, a mesma do `npm run dev`; com os dois abertos, use outra porta: `PORTA=4502 npm run preview`.

## Como publicar o preview

```
npm run deploy
```

Ele gera o build de preview e manda o `dist/` para o Cloudflare (o Worker `9vee-preview`, em https://9vee-preview.9vee-site.workers.dev). Na primeira vez, `npx wrangler login` liga o computador à conta do Cloudflare. O build de produção nunca vai para o Cloudflare.

Depois de publicar, o que mudou para o cliente entra no topo de `docs/novidades-preview.md`, em linguagem de cliente.

## Como trocar um texto

Todo texto do site está em `content/`, um arquivo por página, no formato Markdown com um cabeçalho YAML:

- `content/home.md`, `content/curso-de-idiomas.md`, `content/treinamento-nr-1.md`, `content/traducao-simultanea.md`, `content/lms.md`, `content/quem-somos.md`, `content/interpretacao-de-mandarim.md` e `content/politica-de-privacidade.md`: uma página cada;
- `content/idiomas/`: uma página por idioma. A página só entra no site definitivo com `publicada: true`;
- `content/cidades/`: as páginas de São Paulo, do Rio, de Curitiba e de Brasília;
- `content/site.md`: o que aparece em todas as páginas (menu, rodapé, contato, pedido, aviso de cookies) e os depoimentos, que ficam num lugar só e aparecem na home e nas páginas de idioma que eles citam.

Basta mudar o texto entre aspas e salvar. Alguns cuidados:

- link: `[texto do link](/endereco/)`. Endereço que começa com `https://` abre em nova aba;
- o que ainda falta confirmar vai entre colchetes, com quem responde: `[CONFIRMAR COM A DANIELLA: a pergunta]`. No preview isso vira a etiqueta "a confirmar", e a trava não deixa o site definitivo sair com ela;
- o site não usa travessão nem meia-risca: a trava barra os dois;
- se o arquivo ficar com o formato errado, o build para e diz o campo e o arquivo.

## Como trocar uma imagem

As fotos ficam em `src/assets/imagens/`. O nome do arquivo é o do campo `arquivo` do conteúdo da página (por exemplo, `arquivo: "idioma-frances"` usa `src/assets/imagens/idioma-frances.jpg`), e o texto alternativo, para quem não vê a imagem, é o campo `alt`, logo abaixo.

Para trocar uma foto, salve a nova com o mesmo nome, por cima da antiga. O build gera sozinho os tamanhos e os formatos de cada imagem. A lista de todas as imagens, com os prompts com que foram geradas, está em `docs/imagens-gemini.md`. Imagem que falta vira um quadro com o ID dela no lugar da foto, e a trava não deixa o site definitivo sair assim.

## Variáveis de ambiente

Ficam em três arquivos, um por modo, que não vão para o Git: `.env.development` (local), `.env.preview` e `.env.producao`. Cada um é uma cópia do `.env.example`, preenchida. São duas variáveis:

- `GA4_ID`: o ID do Google Analytics. Na produção, o da 9vee; no local, o de uma propriedade de teste;
- `FORMULARIO_CHAVE`: a chave da Web3Forms, o serviço que manda o pedido do site por e-mail. Na produção, a chave criada com o contato@9vee.com.br; no local e no preview, a de teste.

O `.env.example` explica cada uma. Não crie `.env` nem `.env.local`: eles valeriam para todos os modos, e o build recusa os dois.

## O que a trava de produção barra

O `npm run build:producao` termina com o `check:producao`, que lê o site pronto e recusa o build se achar:

- **pendência sem resposta:** o `[CONFIRMAR ...]` de algum texto;
- **imagem que falta:** o quadro com o ID no lugar da foto;
- **marca do MVP:** a etiqueta de obra ou o envio simulado;
- **marca de revisão:** os trechos `[NOVO: ...]` e `[SAI: ...]` de um texto do cliente ainda não aprovado;
- **noindex:** o site definitivo precisa aparecer no Google;
- **travessão ou meia-risca;**
- **link interno quebrado;**
- **pedido sem destino:** a produção sem a chave da Web3Forms, ou com a chave de teste;
- **medição sem destino:** a produção sem o GA4 da 9vee, ou com outro ID;
- **redirecionamento para página que não existe:** uma linha do `.htaccess` levando a um endereço que não está no site.

Cada achado sai com a regra, a página e o trecho.

## Os testes

- `npm test`: os testes de lógica, os dois builds e os testes do HTML de todas as páginas (textos, links, dados para o Google, acessibilidade básica). Leva uns 3 minutos.
- `npm run e2e`: os testes no navegador, em computador, celular Android e iPhone (pedido, aviso de cookies, carrossel, larguras de tela, cores, movimento). Leva de 3 a 6 minutos.
- `npm run check`: confere os tipos do TypeScript.

## Outros comandos úteis

- `npm run lote -- 1`: monta o lote 1 de textos para a revisão da Daniella, em `docs/revisao-daniella/` (os lotes vão de 1 a 4).
- `node scripts/pendencias.ts`: lista o que ainda falta confirmar, por página e por pessoa.
- `node scripts/screenshots.ts <roteiro>`: tira as capturas de um roteiro, em `relatorios/`.
- `node scripts/lighthouse.ts <roteiro>`: mede as páginas com o Lighthouse.
- `node scripts/arquivo-do-blog.ts`: copia os posts novos do blog do Wix para `docs/blog-arquivo/`.
- `node scripts/mapa-de-redirecionamentos.ts`: gera de novo o mapa de redirecionamentos (`docs/redirects.csv`), depois de um build de produção.
- `node scripts/teste-do-envio.ts`: confere se a chave do formulário do preview funciona.

## Onde fica cada coisa

| Pasta | O que tem |
|---|---|
| `content/` | Os textos |
| `src/assets/` | As fotos, os logos dos clientes, as fontes e a marca |
| `src/components/` | As peças de cada página (topo, cartões, FAQ, pedido, carrossel...) |
| `src/pages/` | As páginas e os endereços delas |
| `src/styles/` | As cores, os tamanhos e o estilo geral |
| `src/scripts/` | O que roda no navegador: o pedido, o aviso de cookies, o carrossel, a escolha de público |
| `public/` | Arquivos que vão como estão: ícones e imagem de compartilhamento |
| `scripts/` | Os builds, a trava, o sitemap, o `.htaccess`, os lotes, as capturas e as medições |
| `tests/` | Os testes |
| `docs/` | A spec, os tickets, o cronograma, as pendências, o mapa de redirecionamentos e o checklist de lançamento |

## O que ficou para o lançamento, para a Fase 2 e para depois

- **Lançamento:** a troca do Wix pela HostGator, passo a passo, em `docs/checklist-lancamento.md`. Ela depende do acesso à HostGator. Inclui o Search Console e o Bing do site novo, a publicação automática e a transferência deste repositório para a 9vee.
- **Fase 2:** o sistema de agendamento de aulas.
- **Depois:** a volta do blog, num formato novo, depois das métricas; o painel de edição do blog (opcional); o pagamento online; a integração com o LMS; as versões do site em outros idiomas. Os pedidos que chegaram fora do escopo estão em `docs/pedidos-fora-do-escopo.md`, com a estimativa de cada um.
