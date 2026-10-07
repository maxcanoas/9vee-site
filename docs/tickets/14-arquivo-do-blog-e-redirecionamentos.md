# 14: Arquivo do blog e mapa de redirecionamentos

**O que construir:** a cópia de todos os posts do blog atual, de onde o blog pode voltar depois, e o mapa de redirecionamentos de todas as URLs do site atual, para o Maxwell revisar.

**Depende de:** 09, 11, 21.

**Horas:** 3,5. **Semana:** 6.

**Situação:** feito e aprovado pelo Maxwell em 06/10/2026, adiantado da semana 6, no processo curto. O 11 (cidades) ainda não existe: a regra das cidades está pronta e testada, e o 11 liga as páginas dele no mapa (item novo no ticket 11).

- [x] Um script lê as páginas públicas dos 505 posts, com pausa entre os pedidos, e grava em `docs/blog-arquivo/` o título, a URL, a data, o texto e o endereço das imagens de cada post.
- [x] `docs/redirects.csv` com todas as URLs de `docs/urls-site-atual.csv`, cada uma com destino, tipo (301 ou 410) e motivo, pelas regras da spec, mais uma coluna de exceção à mão.
- [x] Os redirecionamentos de mandarim, pela decisão de 30/09/2026 (spec, "Reaproveitamento do site atual", decisão 5):
  - `/mandarim-portugues`, `/mandarim-english` e `/mandarim-chines`, as três landings de interpretação, vão para `/traducao-simultanea/mandarim/`, e não mais para `/traducao-simultanea/`;
  - `/mandarim-pt` e `/mandarim-portugues-1`, que hoje o Wix leva a duas dessas landings, vão direto para `/traducao-simultanea/mandarim/`, sem corrente;
  - `/mandarim`, que é o curso, e `/blank-1` continuam indo para `/curso-de-idiomas/mandarim/`, se a página estiver publicada; senão, para a página de cursos.
- [x] Nenhuma URL sem destino ou 410; nenhum destino que seja página não publicada; nenhuma corrente de redirecionamento.
- [x] `docs/remocoes-search-console.txt` com as URLs 410.
- [x] Teste unitário das regras, com URLs de exemplo, entre elas as sete de mandarim.
- [ ] O script roda de novo perto do lançamento, porque o blog ainda recebe posts e as páginas publicadas mudam. **Pronto para rodar:** os dois comandos estão em "Como ficou"; fica para o ticket 20.
- [x] Parada para a revisão do CSV pelo Maxwell. Ele aprovou em 06/10 com uma exceção: o `/post/professores-nativos` vai para `/curso-de-idiomas/`. Os destinos do Wix para `/accessibility-statement` e `/our-team` ficam.

## Como ficou

- **A cópia do blog** (`scripts/arquivo-do-blog.ts`, com a conversão em `scripts/blog.ts`): os 505 posts em `docs/blog-arquivo/posts/`, um Markdown por post, com o índice em `docs/blog-arquivo/indice.csv` e um README. São 3,3 MB; o texto do post mais curto tem 1.800 caracteres, e o do mais longo, 15.400. Todos têm data, descrição e ao menos uma imagem. A lista de posts é a do CSV mais a do sitemap do blog no ar, que em 06/10 não trazia post novo. O bloco "MAIS VISITADOS", com uns 230 links para os outros posts, ficou fora de todos. Só leitura, sem rodar o JavaScript do Wix, com 2 segundos entre os pedidos: a rodada levou pouco mais de uma hora.
- **O que o Wix complicou:** três posts vieram sem o texto, porque o cache do Wix guardava a página quebrada; a nova tentativa leva um parâmetro no endereço, que passa por fora desse cache. Em quatro posts o JSON-LD do Wix não é JSON válido (três com quebra de linha crua, um com aspa sem escape): as datas, a descrição e a capa vêm das metatags, que trazem o mesmo.
- **As regras do mapa** (`scripts/redirecionamentos.ts`): as páginas antigas numa tabela, com o destino de cada uma; os redirecionamentos do Wix seguidos até o destino final; os posts pelo idioma ou pelo serviço que o endereço cita (com "chinês" no mandarim, "inburgering" no holandês e "toefl" no inglês), o post de mais de um idioma e o de idiomas em geral na página de cursos; e a regra das cidades, que espera o 11. Página ou tipo novo sem regra para o script, em vez de ganhar um destino por acaso.
- **O mapa** (`scripts/mapa-de-redirecionamentos.ts`): lê o build de produção, então só a página publicada vira destino. Das 540 URLs, 2 ficam no mesmo endereço (a home e o `/sitemap.xml`), 523 vão em 301 e 15 ficam 410 (o termo de uso nos dois endereços, o `/blog`, o `/challenges`, os 6 programas online e os 5 sitemaps do Wix). Os posts vão para 13 páginas de idioma (135 para o inglês, 80 para o espanhol, 66 para o holandês, 37 para o mandarim), 60 para a Tradução, 10 para o LMS e 12 para Cursos, com a exceção. A coluna `excecao` (um caminho do site novo, ou 410) passa de uma rodada para a outra, e as colunas `destino` e `tipo` dizem o que vale, para o gerador do `.htaccess` (ticket 19).
- **Para revisar no CSV:**
  - `/post/professores-nativos`, o único post 410, porque o endereço não cita idioma nem serviço. Virou a exceção `/curso-de-idiomas/`, com o ok do Maxwell.
  - `/accessibility-statement` vai para `/lms/` e `/our-team` para `/traducao-simultanea/`, porque é para lá que o Wix leva hoje.
  - os 11 posts de idiomas em geral ou de mais de um idioma, que vão para `/curso-de-idiomas/`.
  - 136 posts citam São Paulo, Rio, Curitiba, Brasília ou um bairro de São Paulo. Por enquanto vão para o idioma ou o serviço. **Mudou em 07/10/2026 (ticket 11):** só os de tradução vão para a cidade, quando a página dela for publicada (14 posts: 5 de São Paulo, com a Faria Lima e a Paulista, e 3 de cada uma das outras); os de idioma ficam no idioma, porque a aula de quem estuda por conta própria é online. A regra e os termos de cada cidade estão em `scripts/redirecionamentos.ts` (`cidadesPublicadas`), com teste.
- **Rodar de novo perto do lançamento:** `node scripts/arquivo-do-blog.ts` (só pede os posts que faltam) e `node scripts/build.ts producao && node scripts/mapa-de-redirecionamentos.ts` (traz os posts novos da cópia).
- **Os testes:** 36 de lógica novos (`tests/unit/redirecionamentos.test.ts` e `tests/unit/blog.test.ts`). `npm test` com 239 testes de lógica e 1.511 do HTML.
- **Ficou de fora,** pelo processo curto: a rodada de `code-review`, que volta no ticket 17.
