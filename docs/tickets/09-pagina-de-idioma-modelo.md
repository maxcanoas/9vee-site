# 09: Página de idioma: modelo, inglês, espanhol e mandarim

**O que construir:** a página de cada idioma, com endereço, topo tipográfico e dados estruturados próprios, e a regra de publicação que deixa fora da produção a página sem conteúdo confirmado. As três primeiras são inglês, espanhol e mandarim.

**Depende de:** 04.

**Horas:** 4. **Semana:** 4.

**Situação:** feito em 29/09/2026, adiantado da semana 4.

- [x] Endereço `/curso-de-idiomas/<idioma>/` para cada idioma com texto em `content/`.
- [x] Topo tipográfico: a saudação na escrita do idioma, com `lang` e direção certos, e o círculo da marca. Sem foto.
- [x] Seções escolhidas pelo conteúdo daquele idioma (para quem é, níveis, formatos, provas e FAQ), sem a mesma contagem de blocos entre páginas.
- [x] O pedido abre com "idiomas" e o idioma da página marcados.
- [x] `Course` e `FAQPage`. O `Base` já monta o `BreadcrumbList` de três passos pelo endereço (Início, Cursos de idiomas e o idioma), mas o `trilhaDoCaminho` só conhece os nomes do menu: ele precisa do nome de cada idioma. A página não usa o `HeroPagina`, então a trilha na tela entra no topo tipográfico.
- [x] Marca de publicada: a página não publicada aparece no preview e fica fora do build de produção, do menu, dos links e do sitemap.
- [x] Home e página de cursos levam à página de cada idioma publicado; os não publicados continuam na âncora da página de cursos.
- [x] Inglês, espanhol e mandarim escritos com os fatos do Arthur; o que faltar fica marcado, e a página fica não publicada. Os fatos dele ainda não chegaram: os textos saíram do site atual, e tudo o que depende dele ficou marcado.
- [x] Testes do HTML gerado cobrem a regra de publicação. O teste que compara as páginas da produção com as do preview passa a descontar as não publicadas.
- [x] A trava de produção deixa de ler, em `content/`, o conteúdo das páginas não publicadas, que não vão ao ar.

**Como ficou:**

- **Conteúdo:** um arquivo por página em `content/idiomas/`, e o nome do arquivo é o fim do endereço. O campo `idioma` aponta para o idioma de `content/site.md`, de onde vêm a saudação, o `lang`, a direção, a família e o nome. O topo e o fechamento são fixos. As outras seções são opcionais e saem na ordem da spec: `paraQuem`, `niveis` (na escala do idioma), `formatos`, `provas`, `destaque` e `faq`. Cada página tem as que o conteúdo pede: o inglês tem cinco, o espanhol duas e o mandarim três. Nenhuma usa níveis ainda, porque nenhuma tem os níveis confirmados.
- **Regra de publicação:** `entraNoBuild` (`src/lib/publicacao.ts`) põe toda página no local e no preview e só as publicadas na produção. A trava lê a mesma marca com o `publicadaNoArquivo` e pula o arquivo não publicado, só nas pastas com publicação (`PASTAS_COM_PUBLICACAO`, hoje `idiomas`): esquecida numa página do menu, a marca não esconde pendência. A home e a página de cursos só levam à página publicada, em todos os modos, como o ticket diz. No preview, a não publicada abre pelo endereço, e os três endereços vão no texto de novidades. O sitemap vem no ticket 15 e sai do build de produção, que já não tem as não publicadas.
- **Topo:** `TopoIdioma.astro`. A saudação sai no corpo da faixa de saudações, com a meia-lua da família, e o círculo da marca fica ao lado no computador e embaixo no celular, como o visual do hero das páginas internas. A página não publicada mostra no topo "Fora do site até vocês responderem", no mesmo tracejado das pendências: as três esperam o Arthur e, no preço, a Daniella.
- **Trilha:** o `trilhaDoCaminho` recebe o nome das páginas que não estão no menu. O `Base` e a `Trilha` pegam a trilha do mesmo lugar, o `trilhaDaPagina`.
- **Pedido e WhatsApp:**
  - os botões da página levam o idioma;
  - o pedido aberto pelo cabeçalho também sai com ele, e o idioma que a pessoa trocou continua marcado quando ela reabre (`idiomaInicial`, em `src/lib/contato.ts`, com teste unitário; o idioma viaja nos dados da página);
  - a mensagem diz "Vim pela página Curso de inglês do site e quero aulas de inglês", pelo modelo `paginas.idioma` de `content/site.md`.
- **Dados estruturados:** o `Course` da página tem o mesmo nome que a lista da página de cursos dá a ele, "Curso de inglês", com o idioma em minúscula como no título (`nomeDoCurso`). A lista aponta o curso para a página quando ela está publicada.
- **Links:** na página de cursos, o idioma com página publicada vira link, com a mesma meia-pílula dos botões. O botão perdeu o recuo padrão do navegador, uns 6 px, que o deixava fora do alinhamento com o título da família e desalinharia a lista na primeira publicação.
- **Textos:** saíram do site atual. No inglês, o curso de crianças e adolescentes com material da Cambridge, o preparatório do TOEFL iBT a partir do intermediário alto e os formatos (aula individual para executivos, online no horário que a pessoa escolhe e turma in company). No espanhol, o DELE. No mandarim, o curso focado na conversa desde as primeiras aulas, para carreira, viagem ou cultura, que vem da página antiga ("Mandarim -Old"), mais três fatos da própria língua (tons, escrita e verbo). A pergunta 2 do Arthur pede para ele confirmar os dois. O resto ficou marcado para o Arthur e, no preço, para a Daniella. As três páginas estão não publicadas.
- **Para quando a primeira página for publicada:** o apoio da lista na página de cursos diz "Escolha o seu para pedir informação com ele já marcado", e o idioma com página passa a levar a ela. A frase precisa mudar nessa hora.
