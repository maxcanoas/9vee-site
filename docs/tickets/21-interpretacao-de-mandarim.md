# 21: Interpretação de mandarim

**O que construir:** a página `/traducao-simultanea/mandarim/`, filha da Tradução Simultânea, com o conteúdo da landing `/mandarim-portugues` do site atual (`docs/textos-site-atual.md`, seção 3.5): interpretação mandarim-português para o mercado financeiro. Não é a página do curso. Publicada desde o lançamento.

**Depende de:** 05.

**Horas:** 4. **Semana:** 2.

**Situação:** ready-for-agent. Criado em 30/09/2026 pela decisão do reaproveitamento do site atual (spec, "Reaproveitamento do site atual", decisão 5).

**Do site atual, como fato:**

- [ ] A frase "Quando o negócio fala mandarim, precisão não é opcional.", que passa nos padrões e fica como está.
- [ ] Os três serviços:
  - investor meetings: reuniões bilaterais, revisões de portfólio e apresentações para LPs;
  - visitas: due diligence e inspeção em plantas industriais, com o intérprete no local;
  - eventos corporativos: conferências, roadshows, reuniões de conselho e apresentações de gestão.
- [ ] As modalidades: interpretação simultânea e consecutiva, e a de acompanhamento, que o formulário da landing oferece.
- [ ] Mais de 10 anos de experiência nesse mercado, com gestores de fundos de private equity, bancos de investimento e empresas do portfólio, em visitas de investidores e tours em fábricas e escritórios no Brasil.
- [ ] "Retornaremos em até um dia útil", perto do pedido. Só nesta página: nas outras, o prazo continua na pergunta 6.

**O que fica fora:**

- [ ] Nome de empresa: Santander e Itaú só aparecem nos one-pagers do Canva e esperam a autorização (pergunta 17).
- [ ] As versões em inglês e em chinês.

**A página:**

- [ ] O 我们是 pode entrar como detalhe visual, com `lang="zh"` e o nome "9vee". "Novee" continua só no rodapé e no `alternateName`.
- [ ] Pedido e WhatsApp abrem com Tradução simultânea e mandarim marcados, pelo botão da página e pelo do cabeçalho. A mensagem do botão do WhatsApp diz a página e o pedido de intérprete de mandarim. A regra do que vem marcado fica em `src/lib/contato.ts`, com teste unitário escrito antes.
- [ ] `Service` e `FAQPage` (se houver FAQ) no JSON-LD.
- [ ] Trilha "Início › Tradução simultânea › Mandarim", na tela e no `BreadcrumbList`. O `trilhaDoCaminho` recebe o nome da página, que não está no menu. O nome vem da própria página e continua valendo depois que o rodapé ganhar o link dela, no ticket 15.
- [ ] Título do Google com até 60 caracteres, focado em "interpretação mandarim português", e descrição de 140 a 160.
- [ ] Links: a Tradução (o bloco curto do ticket 05) e a página do curso de mandarim levam a ela, e ela leva ao curso. Enquanto a página do curso não estiver publicada, o link vai para a âncora do mandarim na página de cursos, como a home faz.
- [ ] O conteúdo fica num arquivo próprio em `content/`, fora de `content/idiomas/`: a página vai sempre para a produção, e a trava lê as pendências dela. O `scripts/pendencias.ts` passa a conhecer o arquivo.

**Desenho e fechamento** (os oito passos da spec, em "Como cada ticket do reaproveitamento fecha"):

- [ ] Seções desenhadas com a skill `frontend-design`, com `docs/padroes.md` acima dela. Previsto: a frase em destaque com o 我们是 9vee, os três serviços em lista grande, "mais de 10 anos" como número e o prazo de um dia útil junto do botão.
- [ ] `humanizar` nos textos e `humanizar-ui` na página; o prompt do hero em `docs/imagens-gemini.md`. Até a imagem chegar, a página mostra o Placeholder.
- [ ] Testes do HTML gerado e do navegador da página (o pedido aberto com Tradução e mandarim marcados, pelos dois botões), o de larguras e o de JSON-LD; `npm test` e `npm run e2e` passando.
- [ ] Capturas no roteiro `ticket-21`, em 390 e 1280 px.
- [ ] Lighthouse no build de produção: Performance 95 ou mais, Acessibilidade 100, LCP abaixo de 2,0 s e CLS abaixo de 0,05.
- [ ] `code-review` nos dois eixos, com as correções em commits próprios.
- [ ] "Como ficou" aqui, o texto para o cliente em `docs/novidades-preview.md` e `docs/andamento.md` atualizado. O preview não é publicado: o Maxwell publica depois de ver as capturas.
