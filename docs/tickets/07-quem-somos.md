# 07: Quem Somos completa

**O que construir:** a página completa de Quem Somos, sem a etiqueta de obra, com o conteúdo do site atual (`docs/textos-site-atual.md`, seção 3.2) e sem sede.

**Depende de:** 04.

**Horas:** 3,5 (eram 2). **Semana:** 3.

**Situação:** ready-for-agent. Reescrito em 30/09/2026 pela decisão do reaproveitamento do site atual (spec, "Reaproveitamento do site atual"): a página não espera mais a resposta da Daniella.

**Do site atual, como fato:**

- [ ] A história: a 9vee nasceu do sonho dos fundadores de mudar o jeito de aprender idiomas, virou uma empresa de educação com base tecnológica e já ensinou milhares de alunos.
- [ ] "Atendemos comunidades, empresas e órgãos públicos em todo o Brasil."
- [ ] O portfólio do site atual, cursos de idiomas e serviços de tradução e interpretação, junto das quatro frentes de hoje, cada uma com o link para a própria página.
- [ ] Os três princípios, Propósito, Coragem e Parceria, cada um com os seus três itens, enxutos: uma frase por item.
- [ ] A missão, "transformar conhecimento em confiança e ação", com o texto que a explica.
- [ ] Os números, na mesma faixa da home e com as mesmas pendências. A faixa lê os números de `content/home.md`, para não haver dois lugares com o mesmo dado.

**O que continua pendente e o que fica fora:**

- [ ] O tempo de casa continua com a pendência de conflito: 19 anos nos números e "mais de 20" no texto.
- [ ] Nada de sede física, endereço, mapa ou "venha nos visitar". Sai "sede em São Paulo" do apoio do hero e da descrição do Google.
- [ ] As pessoas à frente da empresa (pergunta 22) e os nomes de clientes de "Histórias construídas com grandes parceiros" (pergunta 17) ficam fora até a autorização.
- [ ] O que só existe no Canva (os três pilares do portfólio e os dois jeitos de atender empresa) fica fora do texto: decisão do Maxwell em 30/09/2026.

**O resto da página:**

- [ ] `humanizar` com atenção aos princípios e à missão: o texto original é quase todo de palavra proibida ("excelência", "inovação", "alavancas", "jornada"). Entra o conteúdo, e não a redação.
- [ ] A página sai da coleção `parciais` e ganha esquema próprio. Como é a última das três, saem junto a coleção `parciais`, a etiqueta de obra (`etiquetaMvp`) e o `tests/dist/parciais.test.ts`.
- [ ] A trilha na tela e o `BreadcrumbList` já saem do hero e do `Base` desde o ticket 04: não acrescentar outro.

**Desenho e fechamento** (os oito passos da spec, em "Como cada ticket do reaproveitamento fecha"):

- [ ] Seções desenhadas com a skill `frontend-design`, com `docs/padroes.md` acima dela, sem repetir a estrutura das outras páginas. Previsto: a história em texto ao lado de imagem, os três princípios em três colunas com a cor de grupo, a missão como citação em destaque e a faixa de números.
- [ ] `humanizar` nos textos e `humanizar-ui` na página; os prompts das imagens novas em `docs/imagens-gemini.md`.
- [ ] Testes do HTML gerado e do navegador da página, o de larguras e o de JSON-LD; `npm test` e `npm run e2e` passando.
- [ ] Capturas no roteiro `ticket-07`, em 390 e 1280 px.
- [ ] Lighthouse no build de produção: Performance 95 ou mais, Acessibilidade 100, LCP abaixo de 2,0 s e CLS abaixo de 0,05.
- [ ] `code-review` nos dois eixos, com as correções em commits próprios.
- [ ] "Como ficou" aqui, o texto para o cliente em `docs/novidades-preview.md` e `docs/andamento.md` atualizado. O preview não é publicado: o Maxwell publica depois de ver as capturas.
