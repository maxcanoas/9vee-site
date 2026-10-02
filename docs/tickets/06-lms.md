# 06: LMS completa

**O que construir:** a página completa de LMS, sem a etiqueta de obra, com todo o conteúdo do site atual (`docs/textos-site-atual.md`, seção 3.8).

**Depende de:** 04.

**Horas:** 4 (eram 2,5). **Semana:** 1.

**Situação:** feito em 01/10/2026, com o ok do Maxwell para a Fase 2 do reaproveitamento no mesmo dia. Reescrito em 30/09/2026 pela decisão do reaproveitamento do site atual (spec, "Reaproveitamento do site atual"): a página não espera mais a resposta da Daniella. É o primeiro ticket da ordem nova. O preview não foi publicado: o Maxwell publica depois de ver as capturas.

**Do site atual, como fato:**

- [x] O que é o LMS: uma plataforma digital para organizar, acompanhar e otimizar o treinamento na empresa, com cursos online, conteúdos interativos e trilhas de aprendizagem personalizadas. Cada colaborador estuda no horário e no ritmo dele.
- [x] A plataforma fica disponível 24 horas por dia, 7 dias por semana.
- [x] O acompanhamento contínuo de professores.
- [x] Os relatórios de desempenho, frequência e progresso, para gestores e para o RH.
- [x] A metodologia: comunicação real no trabalho; simulações de reunião, de apresentação e de negociação; vocabulário de negócios; conteúdo customizado para o cliente; feedback constante dos professores.
- [x] Os setores atendidos: indústria, tecnologia, farmacêutica, financeiro, marketing, logística e recursos humanos.
- [x] A chamada do meio ("Quer melhorar a comunicação internacional da sua equipe?"), com os três pontos: cursos customizados, professores especializados e a plataforma.
- [x] Os benefícios para empresas: relatórios para o RH, flexibilidade de horários e foco em comunicação profissional.

**O que continua e o que fica fora:**

- [x] As três perguntas que dimensionam o pedido continuam.
- [x] A EdApp e as telas continuam como pergunta (21), fora do texto. O que só existe no Canva (sala de aula invertida, IA e plantão de dúvidas pelo WhatsApp) também fica fora do texto: decisão do Maxwell em 30/09/2026.
- [x] Da descrição do Google do site atual só entra o que o corpo da página diz: "empresas e escolas" fica fora. Confirmado pelo Maxwell em 01/10/2026.

**O resto da página:**

- [x] O card do LMS na home (`content/home.md`) perde a pendência e passa a dizer o que o site atual afirma. A descrição do serviço no pedido (`content/site.md`) acompanha, se o texto mudar.
- [x] Título e descrição próprios, sem disputar a busca com o Treinamento de NR-1.
- [x] `Service` e `FAQPage`, se houver FAQ. A trilha na tela e o `BreadcrumbList` já saem do hero e do `Base` desde o ticket 04: não acrescentar outro.
- [x] Botões de pedido no meio e no fim, com o serviço já marcado.
- [x] A página sai da coleção `parciais` e ganha esquema próprio. A etiqueta de obra some dela.

**Desenho e fechamento** (os oito passos da spec, em "Como cada ticket do reaproveitamento fecha"):

- [x] Seções desenhadas com a skill `frontend-design`, com `docs/padroes.md` acima dela, sem repetir a estrutura das outras páginas. Previsto: o que é o LMS em texto ao lado de imagem, "24 horas por dia, 7 dias por semana" em tipo grande, a faixa escura com o que o RH acompanha, os setores em pílulas e as três perguntas do pedido.
- [x] `humanizar` nos textos e `humanizar-ui` na página; os prompts das imagens novas em `docs/imagens-gemini.md`.
- [x] Testes do HTML gerado e do navegador (a página sai de `tests/dist/parciais.test.ts` e ganha o teste dela), o de larguras e o de JSON-LD; `npm test` e `npm run e2e` passando.
- [x] O `scripts/lighthouse.ts` passa a medir a página do ticket, e não só as três do MVP.
- [x] Capturas no roteiro `ticket-06`, em 390 e 1280 px.
- [x] Lighthouse no build de produção: Performance 95 ou mais, Acessibilidade 100, LCP abaixo de 2,0 s e CLS abaixo de 0,05.
- [x] `code-review` nos dois eixos, com as correções em commits próprios.
- [x] "Como ficou" aqui, o texto para o cliente em `docs/novidades-preview.md` e `docs/andamento.md` atualizado. O preview não é publicado: o Maxwell publica depois de ver as capturas.

**Como ficou:**

- **Conteúdo:** `content/lms.md`, numa coleção própria (`lms`), com o que a seção 3.8 de `docs/textos-site-atual.md` traz e nenhuma pendência. A pergunta 21 virou confirmação: saiu da página e do card da home. São 102 marcações em `content/`, contra as 104 de 30/09.
- **As nove seções, na ordem da tela:**
  1. o hero, com o parágrafo do topo do site atual (conteúdo digital organizado, acompanhamento pedagógico e relatórios de evolução, frequência e resultados);
  2. os atalhos (`#motivos`): os três benefícios do site atual, cada um levando à seção que o explica;
  3. o que é o LMS (`#o-que-e`), em texto ao lado de imagem, com a sigla por extenso;
  4. a plataforma (`#plataforma`): "24 horas por dia, 7 dias por semana." em tipo de mostra, com o acompanhamento contínuo dos professores e as trilhas personalizadas;
  5. o que o RH acompanha (`#relatorios`), na faixa escura: desempenho, frequência e progresso;
  6. a chamada do meio (`#chamada`), com os três pontos e o botão;
  7. como são as aulas (`#metodologia`): as simulações, o vocabulário de negócios, o conteúdo customizado e o feedback constante;
  8. os sete setores (`#setores`);
  9. o fechamento (`#contato`), com as três perguntas do pedido numeradas e o botão.
- **Decisões de desenho:**
  - a assinatura da página é a frase das 24 horas, a maior da tela, com o grifo do grupo Empresas (violeta) no começo de cada linha. No celular ela quebra só depois do grifo: "24 horas", "por dia,", "7 dias" e "por semana.";
  - os setores não saíram em pílulas, como o ticket previa. Pela regra de forma do site (o comentário "Forma" de `src/styles/tokens.css`), pílula é o que se toca, e setor não é botão. Saíram em tipo grande, um depois do outro, com a meia-lua da marca entre eles, como na faixa de saudações da home;
  - os três benefícios viraram atalhos no alto, e não uma seção: como seção, repetiriam o que os relatórios, a plataforma e a metodologia já dizem. Assim eles servem de resumo e de caminho;
  - as três perguntas foram para o fechamento escuro, numeradas, porque a ordem é a do formulário. Um teste confere que a página anuncia tantas perguntas quantas o pedido de LMS faz;
  - a chamada do meio vem depois dos relatórios, e não depois dos setores, como no site atual. Depois dos setores, o botão dela encostaria no do fechamento;
  - o texto de cada relatório (desempenho, frequência e progresso) só explica a palavra. O que cada tela mostra continua na pergunta 21.
- **Sem FAQ:** o site atual não tem perguntas do LMS, e as respostas possíveis repetiriam as seções. O preço fica sem resposta nesta página. Se o Maxwell quiser, entra um "Quanto custa?" com pendência (pergunta 7), como no NR-1 e em Cursos.
- **Componentes novos,** feitos para as próximas páginas do reaproveitamento:
  - `FaixaDeAtalhos`: os atalhos do alto, com o desenho do link do menu (`LinkDoMenu`);
  - `TextoComImagem`: texto corrido ao lado da imagem em arco, com o texto antes da imagem no celular;
  - `Mostra`: a frase em tipo de mostra, com o grifo;
  - `Chamada`: a faixa da chamada do meio;
  - `ListaCorrida`: os nomes em tipo grande, com a meia-lua entre eles.
- **Componentes reaproveitados:**
  - `HeroPagina` e `Pontos`, como estavam;
  - `Definicoes`, que era o `Provas`: ganhou o id da seção e serve à metodologia. Lado a lado, o item mais curto não estica mais o espaço entre o nome e o texto;
  - `CtaFinal`, que ganhou a lista numerada, opcional, das perguntas do pedido.
- **Dados para o Google:** `Service` com o nome "LMS", ligado à organização. Título com 50 caracteres e descrição com 156.
- **Home:** o card do LMS diz "com acompanhamento de professores e relatórios de desempenho, frequência e progresso para o RH", sem pendência. A descrição do serviço no pedido não mudou.
- **Imagem nova:** IMG-LMS-O-QUE-E, com o prompt em `docs/imagens-gemini.md`. Até ela ser gerada, a seção mostra o Placeholder, que a trava de produção acusa, como as outras pendências.
- **`humanizar`:** três trechos reescritos (o argumento de que o modelo virou padrão, a nota dos relatórios e a dos setores, que tinha conector de redação).
- **`humanizar-ui`:** nenhum marcador da lista (sem ícone em caixinha, sem cartões iguais, sem barra de números, sem FAQ). Dois achados que dependem do cliente: a página não tem prova (tela da plataforma ou caso de cliente, perguntas 21 e 17) e não fala de preço (pergunta 7).
- **Testes:**
  - `tests/dist/lms.test.ts`: as nove seções na ordem, os fatos de cada uma, os três botões com o LMS marcado, o `Service`, e o que fica fora (EdApp, sala de aula invertida, IA, plantão e "escolas");
  - `tests/e2e/lms.spec.ts`: os atalhos param abaixo do cabeçalho fixo e têm 44 px de altura, a chamada abre o pedido em "Sobre a plataforma", o texto dá 4,5:1 sobre o grifo e o título quebra em quatro linhas no celular;
  - o LMS saiu de `tests/dist/parciais.test.ts`, e a home confere o card;
  - `npm test`: 140 unitários e 1.010 do HTML gerado. `npm run e2e`: 250 passaram, nos três perfis.
- **Lighthouse** no build de produção, mediana de 3 rodadas (Lighthouse 13.5.0 e Chrome 154.0.8037.93): Performance 100, Acessibilidade 100, Boas práticas 100, SEO 100, LCP 1,58 s, CLS 0,000 e TBT 0 ms. A medida é com o Placeholder no lugar da imagem nova, que fica abaixo da primeira tela. O relatório sai em `relatorios/ticket-06/lighthouse.md`, por `node scripts/lighthouse.ts ticket-06`.
- **Capturas:** `relatorios/ticket-06/`, por `node scripts/screenshots.ts ticket-06`: a página inteira e cada seção em 390 e 1280 px, o topo em 360 px, o pedido aberto pela chamada e o card da home.
