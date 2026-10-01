# 06: LMS completa

**O que construir:** a página completa de LMS, sem a etiqueta de obra, com todo o conteúdo do site atual (`docs/textos-site-atual.md`, seção 3.8).

**Depende de:** 04.

**Horas:** 4 (eram 2,5). **Semana:** 1.

**Situação:** ready-for-agent. Reescrito em 30/09/2026 pela decisão do reaproveitamento do site atual (spec, "Reaproveitamento do site atual"): a página não espera mais a resposta da Daniella. É o primeiro ticket da ordem nova.

**Do site atual, como fato:**

- [ ] O que é o LMS: uma plataforma digital para organizar, acompanhar e otimizar o treinamento na empresa, com cursos online, conteúdos interativos e trilhas de aprendizagem personalizadas. Cada colaborador estuda no horário e no ritmo dele.
- [ ] A plataforma fica disponível 24 horas por dia, 7 dias por semana.
- [ ] O acompanhamento contínuo de professores.
- [ ] Os relatórios de desempenho, frequência e progresso, para gestores e para o RH.
- [ ] A metodologia: comunicação real no trabalho; simulações de reunião, de apresentação e de negociação; vocabulário de negócios; conteúdo customizado para o cliente; feedback constante dos professores.
- [ ] Os setores atendidos: indústria, tecnologia, farmacêutica, financeiro, marketing, logística e recursos humanos.
- [ ] A chamada do meio ("Quer melhorar a comunicação internacional da sua equipe?"), com os três pontos: cursos customizados, professores especializados e a plataforma.
- [ ] Os benefícios para empresas: relatórios para o RH, flexibilidade de horários e foco em comunicação profissional.

**O que continua e o que fica fora:**

- [ ] As três perguntas que dimensionam o pedido continuam.
- [ ] A EdApp e as telas continuam como pergunta (21), fora do texto. O que só existe no Canva (sala de aula invertida, IA e plantão de dúvidas pelo WhatsApp) também fica fora do texto: decisão do Maxwell em 30/09/2026.
- [ ] Da descrição do Google do site atual só entra o que o corpo da página diz: "empresas e escolas" fica fora.

**O resto da página:**

- [ ] O card do LMS na home (`content/home.md`) perde a pendência e passa a dizer o que o site atual afirma. A descrição do serviço no pedido (`content/site.md`) acompanha, se o texto mudar.
- [ ] Título e descrição próprios, sem disputar a busca com o Treinamento de NR-1.
- [ ] `Service` e `FAQPage`, se houver FAQ. A trilha na tela e o `BreadcrumbList` já saem do hero e do `Base` desde o ticket 04: não acrescentar outro.
- [ ] Botões de pedido no meio e no fim, com o serviço já marcado.
- [ ] A página sai da coleção `parciais` e ganha esquema próprio. A etiqueta de obra some dela.

**Desenho e fechamento** (os oito passos da spec, em "Como cada ticket do reaproveitamento fecha"):

- [ ] Seções desenhadas com a skill `frontend-design`, com `docs/padroes.md` acima dela, sem repetir a estrutura das outras páginas. Previsto: o que é o LMS em texto ao lado de imagem, "24 horas por dia, 7 dias por semana" em tipo grande, a faixa escura com o que o RH acompanha, os setores em pílulas e as três perguntas do pedido.
- [ ] `humanizar` nos textos e `humanizar-ui` na página; os prompts das imagens novas em `docs/imagens-gemini.md`.
- [ ] Testes do HTML gerado e do navegador (a página sai de `tests/dist/parciais.test.ts` e ganha o teste dela), o de larguras e o de JSON-LD; `npm test` e `npm run e2e` passando.
- [ ] O `scripts/lighthouse.ts` passa a medir a página do ticket, e não só as três do MVP.
- [ ] Capturas no roteiro `ticket-06`, em 390 e 1280 px.
- [ ] Lighthouse no build de produção: Performance 95 ou mais, Acessibilidade 100, LCP abaixo de 2,0 s e CLS abaixo de 0,05.
- [ ] `code-review` nos dois eixos, com as correções em commits próprios.
- [ ] "Como ficou" aqui, o texto para o cliente em `docs/novidades-preview.md` e `docs/andamento.md` atualizado. O preview não é publicado: o Maxwell publica depois de ver as capturas.
