# 07: Quem Somos completa

**O que construir:** a página completa de Quem Somos, sem a etiqueta de obra, com o conteúdo do site atual (`docs/textos-site-atual.md`, seção 3.2) e sem sede.

**Depende de:** 04.

**Horas:** 3,5 (eram 2). **Semana:** 3.

**Situação:** feito em 02/10/2026, adiantado da semana 3, no processo mais curto que o Maxwell pediu no mesmo dia: os textos e o layout, com os testes automáticos, sem as medições e sem a rodada de `code-review`. Reescrito em 30/09/2026 pela decisão do reaproveitamento do site atual (spec, "Reaproveitamento do site atual"): a página não espera mais a resposta da Daniella. O preview não foi publicado: o Maxwell publica depois de ver as capturas.

**Do site atual, como fato:**

- [x] A história: a 9vee nasceu do sonho dos fundadores de mudar o jeito de aprender idiomas, virou uma empresa de educação com base tecnológica e já ensinou milhares de alunos.
- [x] "Atendemos comunidades, empresas e órgãos públicos em todo o Brasil."
- [x] O portfólio do site atual, cursos de idiomas e serviços de tradução e interpretação, junto das quatro frentes de hoje, cada uma com o link para a própria página.
- [x] Os três princípios, Propósito, Coragem e Parceria, cada um com os seus três itens, enxutos: uma frase por item.
- [x] A missão, "transformar conhecimento em confiança e ação", com o texto que a explica.
- [x] Os números, na mesma faixa da home e com as mesmas pendências. A faixa lê os números de `content/home.md`, para não haver dois lugares com o mesmo dado.

**O que continua pendente e o que fica fora:**

- [x] O tempo de casa continua com a pendência de conflito: 19 anos nos números e "mais de 20" no texto.
- [x] Nada de sede física, endereço, mapa ou "venha nos visitar". Sai "sede em São Paulo" do apoio do hero e da descrição do Google.
- [x] As pessoas à frente da empresa (pergunta 22) e os nomes de clientes de "Histórias construídas com grandes parceiros" (pergunta 17) ficam fora até a autorização.
- [x] O que só existe no Canva (os três pilares do portfólio e os dois jeitos de atender empresa) fica fora do texto: decisão do Maxwell em 30/09/2026.

**O resto da página:**

- [x] `humanizar` com atenção aos princípios e à missão: o texto original é quase todo de palavra proibida ("excelência", "inovação", "alavancas", "jornada"). Entra o conteúdo, e não a redação.
- [x] A página sai da coleção `parciais` e ganha esquema próprio. Como é a última das três, saem junto a coleção `parciais`, a etiqueta de obra (`etiquetaMvp`) e o `tests/dist/parciais.test.ts`.
- [x] A trilha na tela e o `BreadcrumbList` já saem do hero e do `Base` desde o ticket 04: não acrescentar outro.

**Desenho e fechamento** (os oito passos da spec, em "Como cada ticket do reaproveitamento fecha"):

- [x] Seções desenhadas com a skill `frontend-design`, com `docs/padroes.md` acima dela, sem repetir a estrutura das outras páginas. Previsto: a história em texto ao lado de imagem, os três princípios em três colunas com a cor de grupo, a missão como citação em destaque e a faixa de números.
- [x] `humanizar` nos textos; os prompts das imagens novas em `docs/imagens-gemini.md`. O `humanizar-ui` formal ficou de fora, pelo processo curto.
- [x] Testes do HTML gerado e o de larguras da página; `npm test` passando. A suíte de navegador inteira ficou de fora, pelo processo curto.
- [x] Capturas no roteiro `ticket-07`, em 390 e 1280 px.
- [ ] Lighthouse no build de produção: ficou de fora, pelo processo curto. Volta na revisão final (ticket 17).
- [ ] `code-review` nos dois eixos: ficou de fora, pelo processo curto. Volta na revisão final (ticket 17).
- [x] "Como ficou" aqui, o texto para o cliente em `docs/novidades-preview.md` e `docs/andamento.md` atualizado. O preview não é publicado: o Maxwell publica depois de ver as capturas.

**Como ficou:**

- **Conteúdo:** `content/quem-somos.md`, numa coleção própria (`quemSomos`), com o que a seção 3.2 de `docs/textos-site-atual.md` traz. Uma pendência só, a do tempo de casa (pergunta 2): são 107 marcações em `content/`, como antes. Saíram a coleção `parciais`, a etiqueta de obra e o teste das parciais.
- **As sete seções, na ordem da tela:**
  1. o hero, sem a sede: a 9vee atende comunidades, empresas e órgãos públicos em todo o Brasil;
  2. a faixa de números, a mesma da home, lida de `content/home.md`;
  3. as quatro frentes (`#frentes`), cada uma levando à página dela;
  4. a história (`#historia`), em texto ao lado de imagem;
  5. a missão (`#missao`), em tipo de mostra, com o grifo em "confiança e ação";
  6. os três princípios (`#principios`), em três colunas, cada um com o grifo na cor dele e os três itens;
  7. o fechamento (`#contato`).
- **Textos:** entrou o conteúdo do site atual, e não a redação. A história perdeu "soluções educacionais", "inovação" e "jornada"; os nove itens dos princípios viraram uma frase cada; a missão ficou com a frase do site e duas ideias do texto que a explica. "Novee" virou "9vee".
- **Componente novo:** `Principios`, os princípios lado a lado, com o nome, a frase que o define e os itens. Os ids `proposito`, `coragem` e `parceria` entraram no mapa de cores do `base.css` (violeta, magenta e menta).
- **Componentes reaproveitados:** `HeroPagina` (que perdeu a etiqueta de obra), `FaixaProva`, `FaixaDeAtalhos`, `TextoComImagem`, `Mostra` (com o título de uma frase só, feito no ticket 21) e `CtaFinal`.
- **Imagem nova:** IMG-QUEM-SOMOS-HISTORIA, com o prompt em `docs/imagens-gemini.md`. Até ela ser gerada, a seção da história mostra o Placeholder.
- **Testes:** `tests/dist/quem-somos.test.ts` (as seções na ordem, a falta de sede, os números iguais aos da home, as quatro frentes com os links, a história, a pendência do tempo de casa, a missão, os princípios e os botões). `npm test`: 151 unitários e 1.089 do HTML gerado. No navegador, só o teste de larguras desta página, que passou nas cinco.
- **Capturas:** `relatorios/ticket-07/`, por `node scripts/screenshots.ts ticket-07`: a página inteira, o topo, cada seção e o fechamento em 390 e 1280 px. São 14.
- **O que ficou de fora, a pedido do Maxwell em 02/10:** o Lighthouse, a suíte de navegador inteira, a comparação de capturas das outras páginas e o `code-review` nos dois eixos. Entram na revisão final (ticket 17).
