# 05: Tradução Simultânea completa

**O que construir:** a página completa de Tradução Simultânea, sem a etiqueta de obra, com todo o conteúdo do site atual (`docs/textos-site-atual.md`, seção 3.6) e o material do Canva que o ticket já previa (`docs/adequacao-concorrentes-e-canva.md`, seção 4), este com pendência onde o Canva não for o site.

**Depende de:** 04.

**Horas:** 5 (eram 3). **Semana:** 2.

**Situação:** feito em 01/10/2026, adiantado da semana 2, logo depois do 06. Espera o ok do Maxwell. Reescrito em 30/09/2026 pela decisão do reaproveitamento do site atual (spec, "Reaproveitamento do site atual"): a página não espera mais a resposta da Daniella. O preview não foi publicado: o Maxwell publica depois de ver as capturas.

**Do site atual, como fato:**

- [x] O que é a interpretação simultânea: a tradução acontece em tempo real, sem pausa, com intérpretes profissionais e equipamento especializado.
- [x] Como funciona: o intérprete domina a terminologia da área do evento, e a 9vee usa cabine acústica e sistema de áudio dedicado.
- [x] Para que serve, com os cinco tipos de evento: reuniões bilaterais e encontros diplomáticos; eventos corporativos e assembleias de acionistas; congressos, seminários e conferências; eventos internacionais com participantes de vários países; conferências técnicas, científicas ou médicas.
- [x] Os três formatos completos:
  - simultânea, para evento que não pode parar;
  - consecutiva: o intérprete fica perto de quem fala, com contato visual, atento aos gestos e à intenção; quem fala faz uma pausa, e o intérprete termina as anotações e traduz; serve a reunião, negociação e entrevista;
  - acompanhamento: o intérprete ao lado de executivos e equipes em reuniões, visitas institucionais, eventos e rodadas de negócios, com sensibilidade cultural e discrição.
- [x] Os sete idiomas: inglês e mais seis (espanhol, mandarim, francês, italiano, crioulo haitiano e coreano).
- [x] O presencial em São Paulo, Rio de Janeiro, Curitiba e Brasília.
- [x] Intérpretes especializados: formados em centros especializados, com experiência em administração, engenharia, medicina, vendas, tecnologia e negócios internacionais.

**Do Canva, com `[CONFIRMAR COM A DANIELLA: ...]`:**

- [x] Interpretação remota, pelo Zoom e por telefone (pergunta 34).
- [x] Árabe, Libras e ASL, além dos sete idiomas do site (pergunta 33).
- [x] O revezamento: o intérprete trabalha até 1 hora seguida e, acima disso, entram dois (pergunta 16).
- [x] Os casos atendidos, sem nome de empresa até a autorização (pergunta 17).
- [x] Se o equipamento é da 9vee ou alugado continua como pergunta (16), fora do texto.

**O resto da página:**

- [x] Interpretação de mandarim para o mercado financeiro: aqui fica um bloco curto, que leva à página nova (ticket 21). O bloco é desenhado neste ticket e ganha o link no 21, quando a página existir: link interno quebrado não passa nos testes.
- [x] Perguntas frequentes próprias. Com resposta do site atual: simultânea ou consecutiva, equipamento, idiomas, cidades e discrição. Com pendência: a remota, a duração e o prazo de resposta (pergunta 6).
- [x] O pedido de tradução (`formularios.traducao`, em `content/site.md`) ganha o campo de duração ("Até 1 hora", "Meio período", "Dia inteiro", "Mais de um dia"), que decide se vai um intérprete ou dois. A lista de idiomas do pedido continua a do site atual. Teste unitário escrito antes.
- [x] Botões de pedido no meio e no fim, com o serviço já marcado.
- [x] `Service` e `FAQPage` no JSON-LD. A trilha na tela e o `BreadcrumbList` já saem do hero e do `Base` desde o ticket 04: não acrescentar outro.
- [x] Da descrição do Google do site atual só entra o que o corpo da página diz: "tecnologia de ponta" fica fora. Confirmado pelo Maxwell em 01/10/2026.
- [x] A página sai da coleção `parciais` e ganha esquema próprio. A etiqueta de obra some dela.

**Desenho e fechamento** (os oito passos da spec, em "Como cada ticket do reaproveitamento fecha"):

- [x] Seções desenhadas com a skill `frontend-design`, com `docs/padroes.md` acima dela, sem repetir a estrutura das outras páginas. Previsto: os três formatos lado a lado, a cabine e o áudio em texto ao lado de imagem, os cinco tipos de evento em lista grande, a faixa das quatro cidades e o bloco escuro do mandarim.
- [x] `humanizar` nos textos e `humanizar-ui` na página; os prompts das imagens novas em `docs/imagens-gemini.md`.
- [x] Testes do HTML gerado e do navegador (a página sai de `tests/dist/parciais.test.ts` e ganha o teste dela), o de larguras e o de JSON-LD; `npm test` e `npm run e2e` passando.
- [x] Capturas no roteiro `ticket-05`, em 390 e 1280 px.
- [x] Lighthouse no build de produção: Performance 95 ou mais, Acessibilidade 100, LCP abaixo de 2,0 s e CLS abaixo de 0,05.
- [ ] `code-review` nos dois eixos, com as correções em commits próprios.
- [x] "Como ficou" aqui, o texto para o cliente em `docs/novidades-preview.md` e `docs/andamento.md` atualizado. O preview não é publicado: o Maxwell publica depois de ver as capturas.

**Como ficou:**

- **Conteúdo:** `content/traducao-simultanea.md`, numa coleção própria (`traducao`). O que é fato vem da seção 3.6 de `docs/textos-site-atual.md`. O que só existe no Canva entrou com pendência, uma marcação de cada: a remota (34), os idiomas a mais (33), o revezamento (16), os casos (17) e, do que o site não diz, o prazo de resposta (6). São 107 marcações em `content/`, contra 102 depois do ticket 06.
- **As nove seções, na ordem da tela:**
  1. o hero, como no MVP aprovado;
  2. os três formatos lado a lado (`#formatos`), cada um com "Quando usar" e "Como funciona";
  3. como funciona a simultânea (`#como-funciona`), em texto ao lado de imagem: o tempo real, a terminologia da área, as cabines acústicas e os sistemas de áudio;
  4. para que tipo de evento (`#eventos`), na faixa escura, com os cinco tipos em tipo grande e o botão do meio;
  5. sete idiomas, quatro cidades (`#idiomas-e-cidades`), em duas listas em tipo grande;
  6. quem são os intérpretes (`#interpretes`): a formação, a experiência por área e os casos atendidos, estes só com a pendência;
  7. o bloco escuro do mandarim (`#mandarim`), com a frase da landing e sem link até o ticket 21;
  8. oito perguntas (`#perguntas`): cinco com resposta do site atual e três com pendência;
  9. o fechamento (`#contato`), que diz o que o pedido pergunta.
- **Decisões de desenho:**
  - os três formatos não são cartões: são três colunas com o fio em cima, e as linhas "Quando usar" e "Como funciona" começam na mesma altura nas três, para a pessoa comparar pela linha. No celular fica um embaixo do outro;
  - a "faixa das quatro cidades" virou uma lista em tipo grande, junto com a dos sete idiomas, na mesma seção, cada uma com o rótulo dela. Duas faixas seguidas com o mesmo desenho pesariam mais do que informam;
  - os cinco tipos de evento saem só com o nome, como o site atual lista: a página não explica o que é cada evento;
  - os casos atendidos aparecem só como "a confirmar". O material que cita as empresas não está no repositório, e nome de empresa só entra com autorização (pergunta 17);
  - a foto nova mostra a sala com a cabine ao fundo, e não o público de fone: o site atual não diz que aparelho o público usa.
- **O pedido de tradução** pergunta a duração logo depois da data, com as quatro opções do ticket. A resposta vai para a mensagem do WhatsApp ("Duração: meio período"), e o pedido não avança sem ela.
- **Componentes novos:**
  - `Comparacao`: os formatos lado a lado, com as mesmas perguntas para cada um;
  - `Ponte`: o bloco escuro que apresenta outra página, com o link quando ela existe. Serve também à ponte para o LMS que o ticket 22 prevê em Cursos.
- **Componentes reaproveitados:** `HeroPagina`, `TextoComImagem`, `Pontos` (só com os nomes), `Definicoes`, `Faq` e `CtaFinal`. O `ListaCorrida` passou a aceitar mais de uma lista, cada uma com o rótulo dela; a página de LMS continua com uma só.
- **Uma fonte só:** as quatro cidades vêm de `content/site.md`, as mesmas do rodapé e dos dados para o Google. Um teste confere que os idiomas da página são os do pedido, fora o "Outro".
- **Dados para o Google:** `Service` com o nome "Tradução simultânea" e `FAQPage` com as oito perguntas. O título e a descrição são os do MVP, que já diziam os sete idiomas e as quatro cidades.
- **Imagem nova:** IMG-TRADUCAO-COMO, com o prompt em `docs/imagens-gemini.md`. Até ela ser gerada, a seção mostra o Placeholder.
- **`humanizar`:** uma frase na voz passiva reescrita. O resto já saiu com frases curtas, sem as palavras da lista e sem conector de redação.
- **`humanizar-ui`:** nenhum marcador da lista. A página não tem cartão com ícone, barra de números nem grade de três colunas repetida. Achados que dependem do cliente: a página não tem prova, porque os casos esperam a pergunta 17, e não fala de preço (pergunta 7).
- **Testes:**
  - `tests/dist/traducao.test.ts`: as nove seções na ordem, os fatos de cada uma, as cinco pendências e de onde vêm, os três botões com a tradução marcada, o campo de duração no pedido, o `Service`, e o que fica fora ("tecnologia de ponta" e os nomes de empresa);
  - `tests/unit/contato.test.ts`: a duração entra no pedido entre a data e o formato, e o pedido cobra a resposta;
  - `tests/e2e/traducao.spec.ts`: o botão do meio abre o pedido em "Sobre o evento", o pedido não avança sem a duração e a mensagem do WhatsApp leva a resposta;
  - `tests/e2e/pedido.ts`: os atalhos do pedido, que o teste do contato, o do LMS e o da tradução dividem;
  - a Tradução saiu de `tests/dist/parciais.test.ts`, que ficou só com o Quem Somos, e entrou na lista das páginas com FAQ;
  - `npm test`: 143 unitários e 1.020 do HTML gerado. `npm run e2e`: 256 passaram, nos três perfis.
- **Lighthouse** no build de produção, mediana de 3 rodadas (Lighthouse 13.5.0 e Chrome 154.0.8037.93): Performance 100, Acessibilidade 100, Boas práticas 100, SEO 100, LCP 1,51 s, CLS 0,000 e TBT 0 ms. A medida é com o Placeholder no lugar da imagem nova. O relatório sai em `relatorios/ticket-05/lighthouse.md`, por `node scripts/lighthouse.ts ticket-05`.
- **Capturas:** `relatorios/ticket-05/`, por `node scripts/screenshots.ts ticket-05`: a página inteira, o topo, cada seção e o fechamento em 390 e 1280 px, e o pedido com a pergunta da duração. São 21 capturas.
