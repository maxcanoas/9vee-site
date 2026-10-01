# 05: Tradução Simultânea completa

**O que construir:** a página completa de Tradução Simultânea, sem a etiqueta de obra, com todo o conteúdo do site atual (`docs/textos-site-atual.md`, seção 3.6) e o material do Canva que o ticket já previa (`docs/adequacao-concorrentes-e-canva.md`, seção 4), este com pendência onde o Canva não for o site.

**Depende de:** 04.

**Horas:** 5 (eram 3). **Semana:** 2.

**Situação:** ready-for-agent. Reescrito em 30/09/2026 pela decisão do reaproveitamento do site atual (spec, "Reaproveitamento do site atual"): a página não espera mais a resposta da Daniella.

**Do site atual, como fato:**

- [ ] O que é a interpretação simultânea: a tradução acontece em tempo real, sem pausa, com intérpretes profissionais e equipamento especializado.
- [ ] Como funciona: o intérprete domina a terminologia da área do evento, e a 9vee usa cabine acústica e sistema de áudio dedicado.
- [ ] Para que serve, com os cinco tipos de evento: reuniões bilaterais e encontros diplomáticos; eventos corporativos e assembleias de acionistas; congressos, seminários e conferências; eventos internacionais com participantes de vários países; conferências técnicas, científicas ou médicas.
- [ ] Os três formatos completos:
  - simultânea, para evento que não pode parar;
  - consecutiva: o intérprete fica perto de quem fala, com contato visual, atento aos gestos e à intenção; quem fala faz uma pausa, e o intérprete termina as anotações e traduz; serve a reunião, negociação e entrevista;
  - acompanhamento: o intérprete ao lado de executivos e equipes em reuniões, visitas institucionais, eventos e rodadas de negócios, com sensibilidade cultural e discrição.
- [ ] Os sete idiomas: inglês e mais seis (espanhol, mandarim, francês, italiano, crioulo haitiano e coreano).
- [ ] O presencial em São Paulo, Rio de Janeiro, Curitiba e Brasília.
- [ ] Intérpretes especializados: formados em centros especializados, com experiência em administração, engenharia, medicina, vendas, tecnologia e negócios internacionais.

**Do Canva, com `[CONFIRMAR COM A DANIELLA: ...]`:**

- [ ] Interpretação remota, pelo Zoom e por telefone (pergunta 34).
- [ ] Árabe, Libras e ASL, além dos sete idiomas do site (pergunta 33).
- [ ] O revezamento: o intérprete trabalha até 1 hora seguida e, acima disso, entram dois (pergunta 16).
- [ ] Os casos atendidos, sem nome de empresa até a autorização (pergunta 17).
- [ ] Se o equipamento é da 9vee ou alugado continua como pergunta (16), fora do texto.

**O resto da página:**

- [ ] Interpretação de mandarim para o mercado financeiro: aqui fica um bloco curto, que leva à página nova (ticket 21). O bloco é desenhado neste ticket e ganha o link no 21, quando a página existir: link interno quebrado não passa nos testes.
- [ ] Perguntas frequentes próprias. Com resposta do site atual: simultânea ou consecutiva, equipamento, idiomas, cidades e discrição. Com pendência: a remota, a duração e o prazo de resposta (pergunta 6).
- [ ] O pedido de tradução (`formularios.traducao`, em `content/site.md`) ganha o campo de duração ("Até 1 hora", "Meio período", "Dia inteiro", "Mais de um dia"), que decide se vai um intérprete ou dois. A lista de idiomas do pedido continua a do site atual. Teste unitário escrito antes.
- [ ] Botões de pedido no meio e no fim, com o serviço já marcado.
- [ ] `Service` e `FAQPage` no JSON-LD. A trilha na tela e o `BreadcrumbList` já saem do hero e do `Base` desde o ticket 04: não acrescentar outro.
- [ ] Da descrição do Google do site atual só entra o que o corpo da página diz: "tecnologia de ponta" fica fora.
- [ ] A página sai da coleção `parciais` e ganha esquema próprio. A etiqueta de obra some dela.

**Desenho e fechamento** (os oito passos da spec, em "Como cada ticket do reaproveitamento fecha"):

- [ ] Seções desenhadas com a skill `frontend-design`, com `docs/padroes.md` acima dela, sem repetir a estrutura das outras páginas. Previsto: os três formatos lado a lado, a cabine e o áudio em texto ao lado de imagem, os cinco tipos de evento em lista grande, a faixa das quatro cidades e o bloco escuro do mandarim.
- [ ] `humanizar` nos textos e `humanizar-ui` na página; os prompts das imagens novas em `docs/imagens-gemini.md`.
- [ ] Testes do HTML gerado e do navegador (a página sai de `tests/dist/parciais.test.ts` e ganha o teste dela), o de larguras e o de JSON-LD; `npm test` e `npm run e2e` passando.
- [ ] Capturas no roteiro `ticket-05`, em 390 e 1280 px.
- [ ] Lighthouse no build de produção: Performance 95 ou mais, Acessibilidade 100, LCP abaixo de 2,0 s e CLS abaixo de 0,05.
- [ ] `code-review` nos dois eixos, com as correções em commits próprios.
- [ ] "Como ficou" aqui, o texto para o cliente em `docs/novidades-preview.md` e `docs/andamento.md` atualizado. O preview não é publicado: o Maxwell publica depois de ver as capturas.
