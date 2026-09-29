# 09: Página de idioma: modelo, inglês, espanhol e mandarim

**O que construir:** a página de cada idioma, com endereço, topo tipográfico e dados estruturados próprios, e a regra de publicação que deixa fora da produção a página sem conteúdo confirmado. As três primeiras são inglês, espanhol e mandarim.

**Depende de:** 04.

**Horas:** 4. **Semana:** 4.

**Situação:** ready-for-agent

- [ ] Endereço `/curso-de-idiomas/<idioma>/` para cada idioma com texto em `content/`.
- [ ] Topo tipográfico: a saudação na escrita do idioma, com `lang` e direção certos, e o círculo da marca. Sem foto.
- [ ] Seções escolhidas pelo conteúdo daquele idioma (para quem é, níveis, formatos, provas e FAQ), sem a mesma contagem de blocos entre páginas.
- [ ] O pedido abre com "idiomas" e o idioma da página marcados.
- [ ] `Course` e `FAQPage`. O `Base` já monta o `BreadcrumbList` de três passos pelo endereço (Início, Cursos de idiomas e o idioma), mas o `trilhaDoCaminho` só conhece os nomes do menu: ele precisa do nome de cada idioma. A página não usa o `HeroPagina`, então a trilha na tela entra no topo tipográfico.
- [ ] Marca de publicada: a página não publicada aparece no preview e fica fora do build de produção, do menu, dos links e do sitemap.
- [ ] Home e página de cursos levam à página de cada idioma publicado; os não publicados continuam na âncora da página de cursos.
- [ ] Inglês, espanhol e mandarim escritos com os fatos do Arthur; o que faltar fica marcado, e a página fica não publicada.
- [ ] Testes do HTML gerado cobrem a regra de publicação. O teste que compara as páginas da produção com as do preview passa a descontar as não publicadas.
- [ ] A trava de produção deixa de ler, em `content/`, o conteúdo das páginas não publicadas, que não vão ao ar.
