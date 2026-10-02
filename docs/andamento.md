# Andamento do MVP da 9vee

Atualizado em 23/09/2026, com a rodada de ajustes que a cliente pediu depois de ver o preview. Para retomar, vá direto para "Etapa 9" e "O que falta".

**Fase 1 (desde 29/09/2026):** o MVP foi aprovado e está guardado na tag `mvp-aprovado`. O trabalho segue na branch `fase-1`, com a spec em `docs/fase-1-spec.md`, os tickets em `docs/tickets/` e o cronograma em `docs/cronograma-8-semanas.md`. Desde o ticket 01, o preview se publica com `npm run build:preview && npx wrangler deploy` (ou `npm run deploy`, que faz os dois). O `SITE_URL` não existe mais: o canonical é sempre o `https://www.9vee.com.br`.

**Fase 1, onde estamos (02/10/2026):** tickets 01 a 04 feitos, o 09 e o 10 (as páginas dos 14 idiomas e o lote 3) adiantados da semana 4, porque o Maxwell pediu para começar pelas páginas que ainda não existiam, e o 08 (a política de privacidade e a 404) adiantado da semana 3, sem o lote 2. As fotos das páginas de idioma, parte do 16, vieram adiantadas da semana 7. Em 01/10 saíram o 06 (a página de LMS completa) e o 05 (a de Tradução Simultânea), os dois primeiros do reaproveitamento do site atual, e em 02/10, o 21 (a página nova de interpretação de mandarim). Cada um com o `code-review` nos dois eixos e as correções em commits próprios. O que cada um entregou está no próprio ticket, em "Como ficou". A branch `fase-1` está no GitHub desde 30/09. Para retomar:

- o preview foi publicado pelo Maxwell em 29/09 à noite (`npm run deploy`, versão `cd5a3dac`), com a trilha do ticket 04 e as páginas de idioma do 09, e conferido no ar: as nove páginas em 200, a 404, o noindex no cabeçalho e na meta, o canonical no domínio definitivo e os 14 idiomas da home ainda nas âncoras, porque nenhuma página de idioma está publicada;
- a segunda publicação, também feita pelo Maxwell em 29/09 à noite (versão `75f1e57f`), levou as 14 páginas de idioma do ticket 10, conferidas no ar: todas em 200, com o noindex e o aviso no topo, e a home ainda sem link para elas;
- o lote 1 de revisão (`docs/revisao-daniella/lote-1.md`), a mensagem de pendências (`docs/pendencias-cliente.md`) e o texto de `docs/novidades-preview.md`, com os links das três páginas de idioma, estão prontos para o Maxwell mandar à cliente;
- o retrato do antes está em `docs/antes.md`, com duas medidas completas do Wix (11h50 e 20h29 de 29/09). Na comparação vale o melhor número do Wix em cada página, e ele não precisa ser medido de novo;
- as 14 páginas de idioma estão no preview e fora da produção até o Arthur e a Daniella responderem (`publicada: false` em `content/idiomas/`). Seis têm texto do site atual (inglês, espanhol, mandarim, holandês, francês e português para estrangeiros), e oito são esqueletos com as perguntas do Arthur. No preview elas abrem pelo endereço: a home e a página de cursos só levam à página publicada;
- o lote 3 (`docs/revisao-daniella/lote-3.md`) traz os seis idiomas escritos, pronto para a Daniella;
- a política de privacidade (`/politica-de-privacidade/`, ticket 08) existe desde 30/09, com sete pendências da Daniella (perguntas 25 a 27), e passa pelo advogado da 9vee antes de ir ao ar. O rodapé leva a ela na mesma aba, e a 404 mostra os serviços;
- a terceira publicação, feita pelo Maxwell em 30/09 (versão `7b12ccec`), levou a política e a 404 nova, conferidas no ar: as páginas em 200 com o noindex no cabeçalho, o endereço que não existe em 404 com os sete caminhos e sem canonical, a política com o canonical no domínio definitivo, a trilha, as sete seções e as sete pendências, e o rodapé abrindo a política na mesma aba;
- em 30/09 as 14 páginas de idioma ganharam a foto do lugar no topo, no mesmo arco com o círculo da marca das páginas internas (`ArcoComCirculo`). O Gemini desenhou o arco dentro de 13 fotos, e um recorte tirou a moldura; a tabela está em `docs/imagens-gemini.md`. O `Figura` deixou de publicar o JPEG original das imagens, 9,3 MB a menos em cada build. O lote 3 saiu de novo, com a descrição das fotos. O árabe, com o arco de pedra da própria cena, e o russo, com a cruz da igreja a uns 5 px do topo do arco, ficam como estão, por decisão do Maxwell;
- a quarta publicação, feita pelo Maxwell em 30/09 (versão `13c054f4`), levou as fotos das 14 páginas de idioma, conferidas no ar: as 14 páginas em 200, com o noindex no cabeçalho e na meta, a foto de cada uma em WebP e em AVIF, o NR-1 com o mesmo arco, e o JPEG original antigo do NR-1 em 404, porque o build não publica mais os originais;
- a ordem mudou em 30/09, à noite, com a decisão do reaproveitamento do site atual (`docs/fase-1-spec.md`, "Reaproveitamento do site atual"): o que o site atual publica conta como confirmado e entra no site novo. A ordem agora é o 06 (LMS), o 05 (Tradução), o 21 (a página nova de interpretação de mandarim, em `/traducao-simultanea/mandarim/`), o 07 (Quem Somos) e o 22 (o que ficou de fora nas páginas fechadas), com parada e capturas em cada um. Depois vêm o 12 (envio real pela Web3Forms) e o 13 (aviso de cookies e GA4). O 12 começa pelo teste do endereço do preview e do localhost, com uma chave da Web3Forms criada com o e-mail do Maxwell;
- os documentos dessa decisão estão prontos desde 30/09: a spec, os tickets 05, 06, 07, 21 e 22 (e os ajustes no 04, no 08, no 14, no 15 e no 16), o cronograma, com 108 horas no lugar de 88, e a mensagem de pendências. A base é `docs/textos-site-atual.md`, conferido com o site no ar;
- em 01/10 o Maxwell deu o ok para a Fase 2 e fechou as quatro escolhas que tinham ficado para ele: o CLS abaixo de 0,05, o campo de duração no pedido de tradução e os dois trechos da descrição do Google fora ("empresas e escolas" e "tecnologia de ponta") ficam como estavam; as duas frases jurídicas da página de treinamentos (o PGR como prova em ação ajuizada até 2046, e o certificado como prova de boas práticas) ficam fora do site novo, e a pergunta 37 saiu da mensagem;
- o 06 está feito desde 01/10: a página de LMS saiu da versão parcial, com nove seções e nenhuma pendência, e o card do LMS na home perdeu a dele (102 marcações em `content/`, contra 104). As capturas estão em `relatorios/ticket-06/`, e o Lighthouse do build de produção deu 100 nas quatro notas, com LCP de 1,58 s e CLS de 0,000. A página nova foi para o preview na quinta publicação, em 01/10. A foto IMG-LMS-O-QUE-E entrou em 01/10, à noite, gerada pelo Maxwell. O Maxwell aprovou o 06 em 01/10 e decidiu: sem "Quanto custa?" na página por enquanto, e a pergunta 21 da Daniella ganhou duas perguntas (o que cada relatório mostra e se a plataforma recebe outro conteúdo além de idiomas), que ele leva para o Word. O 06 está no GitHub desde 01/10 (`584c2be`);
- o 05 está feito desde 01/10, adiantado da semana 2: a página de Tradução Simultânea saiu da versão parcial, com nove seções e cinco pendências, as quatro do material do Canva (perguntas 16, 17, 33 e 34) e o prazo de resposta (6). São 107 marcações em `content/`. O pedido de tradução pergunta a duração do evento. As 23 capturas estão em `relatorios/ticket-05/`, e o Lighthouse do build de produção deu 100 nas quatro notas, com LCP de 1,54 s e CLS de 0,000, já com a foto IMG-TRADUCAO-COMO, que o Maxwell gerou em 01/10 à noite. O `code-review` nos dois eixos saiu no mesmo dia, com as correções em três commits (`0f3f56d`, `c8c6e6f` e `0f94d2c`) e as fotos num quarto (`cf615f1`). A página nova foi para o preview na quinta publicação, em 01/10. O bloco de mandarim está sem link até o 21. O Maxwell aprovou o 05 em 01/10, à noite, e decidiu: o item "Casos atendidos" fica como está, só com a etiqueta "a confirmar", e a proposta das meias-pílulas no `base.css` espera a revisão final (ticket 17). O 05 está no GitHub desde 01/10;
- a quinta publicação, feita pelo Maxwell em 01/10, às 23h43 (versão `e4277f27`), levou as páginas de LMS e de Tradução Simultânea completas, com as duas fotos novas, conferidas no ar: dez páginas em 200 e idênticas, byte a byte, ao `dist/` local, com o noindex no cabeçalho e na meta e o canonical no domínio definitivo; o endereço que não existe em 404, sem canonical; os 14 arquivos das duas fotos, em AVIF e em WebP, com os mesmos bytes do build, e nenhum JPEG original publicado; o LMS e a Tradução sem a etiqueta de obra, que ficou só no Quem Somos; a Tradução com as cinco pendências, a pergunta da duração no pedido, o bloco do mandarim sem link, as quatro cidades como área atendida e as oito perguntas no `FAQPage`; e o card do LMS na home sem pendência. Falta o Maxwell mandar o `docs/novidades-preview.md` à Daniella e ao Arthur e levar para o Word as duas perguntas novas da 21;
- o 21 está feito desde 02/10, adiantado da semana 2: a página nova de interpretação de mandarim (`/traducao-simultanea/mandarim/`), filha da Tradução Simultânea, com o que a landing do site atual diz e nenhuma pendência (107 marcações em `content/`, como antes). São cinco seções: o topo, os três serviços em lista grande, a frase da landing com o 我们是 9vee, a ponte para o curso e o fechamento. O pedido aberto nela já vem com a tradução simultânea e o mandarim marcados, pelo botão da página e pelo do cabeçalho, e é a única página que promete o prazo de um dia útil, logo abaixo do botão e na confirmação do pedido. O bloco do mandarim da Tradução e a página do curso de mandarim levam a ela. A foto do topo (IMG-INTERPRETACAO-MANDARIM-HERO) entrou no mesmo dia, gerada pelo Maxwell às 9h00. As 17 capturas estão em `relatorios/ticket-21/`, e o Lighthouse do build de produção deu 100 nas quatro notas, com LCP de 1,66 s e CLS de 0,000, já com a foto. O `code-review` nos dois eixos saiu no mesmo dia: a página está em `1353a9d`, as correções em `e00cc81` e `9800ed4`, e a foto em `53116e1`. O preview não tem a página: o Maxwell publica depois de ver as capturas. O Maxwell aprovou o 21 em 02/10 e manteve o H1 com o nome do serviço e o "Mais de 10 anos" em tipo de número. O 21 está no GitHub desde 02/10;
- o 07 está feito desde 02/10, adiantado da semana 3 e já no processo curto: a página Quem Somos saiu da versão parcial, sem a sede, com os números da home, as quatro frentes com link, a história, a missão em destaque e os três princípios em três colunas. Uma pendência só, a do tempo de casa (107 marcações em `content/`, como antes). Saíram a coleção `parciais`, a etiqueta de obra e o teste das parciais: nenhuma página do site é mais "em construção". As 14 capturas estão em `relatorios/ticket-07/`. Ficaram de fora o Lighthouse, a suíte de navegador inteira e o `code-review`, que voltam no ticket 17. Falta a foto IMG-QUEM-SOMOS-HISTORIA, com o prompt em `docs/imagens-gemini.md`. O preview não tem a página nova: o Maxwell publica depois de ver as capturas. O Maxwell aprovou o 07 em 02/10, e ele está no GitHub desde o mesmo dia;
- o 22 está feito desde 02/10, adiantado da semana 3 e no processo curto: entrou o que faltava do site atual nas páginas que já estavam fechadas. Na home, os três diferenciais numa seção própria e a frase do contato no fechamento; no rodapé de todas as páginas, "Seu próximo capítulo de sucesso começa agora."; no NR-1, o objetivo, os seis temas com a Comunicação Não Violenta, os dois blocos de benefícios e o subtítulo do módulo 2; em Cursos, os exames em acordeão com o texto completo, a metodologia, a escolha do dia e do horário, a aula presencial como fato, a realocação de funcionários e a ponte para o LMS; nas páginas de idioma, o inglês de crianças e adolescentes completo, o português com o material, o ritmo, o "também para brasileiros" e a realocação, e cada prova com o exame e o preparatório. Uma pendência nova, os "12 idiomas" da parte de empresas (108 marcações em `content/`). As 55 capturas estão em `relatorios/ticket-22/`. `npm test` com 151 unitários e 1.150 do HTML gerado; no navegador, o teste de larguras em todas as páginas e o da troca de público. Ficaram de fora o Lighthouse, a suíte de navegador inteira e o `code-review`, que voltam no ticket 17. O preview não tem estas mudanças: o Maxwell publica depois de ver as capturas. O Maxwell aprovou o 22 em 02/10, manteve os seis temas do NR-1 sem número, e o 22 está no GitHub desde o mesmo dia (`709ccb8`);
- os três lotes de revisão saíram em 02/10, depois do ok do 22, em `docs/revisao-daniella/`: o lote 1 (home, NR-1, Cursos e os textos de todas as páginas) e o lote 3 (os seis idiomas com texto), gerados de novo, e o lote 2, novo, com Tradução Simultânea, Interpretação de Mandarim, LMS, Quem Somos, Política de Privacidade e a página de erro. Se o lote 1 antigo já foi para a Daniella, vale avisar que esta é a versão que conta. O reaproveitamento do site atual está fechado;
- o 12 está feito desde 02/10, adiantado da semana 4: o "Prefiro receber contato" envia de verdade, pela Web3Forms. O teste do começo confirmou que o serviço aceita o `localhost` e o `workers.dev` (`scripts/teste-do-envio.ts`, com a chave de teste do Maxwell nos arquivos `.env.preview` e `.env.development`, fora do Git). O envio fica num módulo só (`src/lib/servico-de-formulario.ts`), e a montagem do e-mail, em `src/lib/envio.ts`. Na tela: a caixa do consentimento, obrigatória, com link para a política no trecho do pedido; "Enviando"; a confirmação sem o aviso do MVP; e a tela de falha, com o WhatsApp e o "Tentar de novo". Contra robô: a isca e o tempo mínimo de 3 segundos. A trava de produção ganhou a regra "Pedido sem destino" (build sem a chave ou com a chave de teste), que hoje acusa, porque a chave de produção só entra no ticket 20. Nenhum teste manda pedido de verdade: o `test` de `tests/e2e/pedido.ts` responde no lugar do serviço. `npm test` com 183 unitários e 1.242 do HTML gerado; a suíte de navegador inteira passou, com 307. Um pedido completo saiu de verdade pelo site local, e o serviço respondeu que chegou. As 7 capturas estão em `relatorios/ticket-12/`. Ficaram de fora o Lighthouse e o `code-review`, que voltam no ticket 17. O Maxwell aprovou o 12 em 02/10, manteve o tempo mínimo como está (quem envia cedo demais vê "Não deu para enviar." e pode tentar de novo), e o 12 está no GitHub desde o mesmo dia. O teste no preview publicado fechou o ticket no mesmo dia: o Maxwell mandou um pedido de verdade pelo preview e confirmou que funcionou, e o envio sem rede e o da isca foram conferidos lá, sem mandar e-mail. **O próximo é o 13 (cookies e GA4), que vai precisar do ID de uma propriedade de teste do GA4 do Maxwell para a conferência no DebugView;**
- a sexta publicação, feita pelo Maxwell em 02/10, por volta das 11h20 (versão `475856f8`), levou de uma vez o 21, o 07, o 22 e o 12, conferidos no ar: as 22 páginas em 200, idênticas, byte a byte, ao `dist/` local, com o noindex no cabeçalho; o endereço que não existe em 404, com a página de erro do site; a interpretação de mandarim com a foto; o Quem Somos completo, com os princípios; a home com os diferenciais e o rodapé com a frase; o NR-1 com os temas e os benefícios; Cursos com o acordeão das provas, a realocação e a ponte para o LMS; a página de português para estrangeiros com a realocação; e o pedido com a caixa do consentimento, a tela de falha, a chave de teste e sem o aviso de envio simulado. O teste do envio no preview saiu no mesmo dia (está no ticket 12). Falta o Maxwell mandar o `docs/novidades-preview.md`, com as levas sete a dez, e os três lotes à Daniella;
- em 02/10 o Maxwell pediu um processo mais rápido, por enquanto: a partir do 07, cada ticket faz os textos e o layout da página, com os testes automáticos, e deixa de fora as medições (o Lighthouse e a comparação de capturas) e a rodada de `code-review`. O que ficar de fora entra no "Como ficou" do ticket, para voltar na revisão final (ticket 17);
- os seis componentes novos do 06 (`FaixaDeAtalhos`, `TextoComImagem`, `Mostra`, `Chamada`, `ListaCorrida` e `PassosNumerados`) foram feitos para as próximas páginas do reaproveitamento, e o 05 trouxe mais dois: o `Comparacao` (formatos lado a lado) e o `ComImagem` (a casca da seção com a imagem em arco ao lado do conteúdo, que o `TextoComImagem` e o `ComoComeca` usam). A `Chamada` aceita o fundo escuro e sai sem os pontos e sem o botão: o bloco do mandarim é ela. O 21 trouxe a `ListaGrande` (poucos itens em tipo grande, um por linha) e três acréscimos: a `Chamada` leva um link, a `Mostra` aceita o título de uma frase só, com a assinatura e um item em tipo de número, e o `BotaoContato` leva uma nota logo abaixo dele, que o `HeroPagina` e o `CtaFinal` repassam. A página que traz respostas marcadas no pedido, ou promete prazo, declara isso em `content/site.md` (`marcadas` e `prazo`, em `paginas`). O rótulo pequeno das listas é a classe `.rotulo`, do `base.css`, e o link de texto em negrito, a `.link-forte`. O `Provas` virou `Definicoes`, com o id da seção; o `Pontos` aceita o ponto só com o nome; e o `CtaFinal` tem um encaixe entre o texto e o botão. O 07 trouxe o `Principios`, e o 22, o `Acordeao` (nomes que abrem, em `<details>`, fora do `.faq`) e o `GruposDePontos` (listas de pontos lado a lado, cada uma com o rótulo dela). A página de idioma que mostra a realocação diz `realocacao: true`, e o texto do bloco fica só em `content/curso-de-idiomas.md`. O que o `code-review` de cada ticket deixou em aberto está no fim do "Como ficou" dele;
- das páginas que ainda não existem, faltam só as cidades (11), quando chegarem os fatos locais. Não há mais página parcial;
- `npm run lote -- N` faz o build de preview e gera o lote N; `npm run build:producao` termina na trava, que ainda acusa as pendências, a foto que falta no Quem Somos e o pedido sem a chave de produção, como esperado.

## Onde estamos

| Etapa | Situação | Commits |
|---|---|---|
| 0. Spec, padrões e ativos da cliente | feita e aprovada | `5673eec` (tag `mvp-base`) |
| 1. Base visual | feita e aprovada | `453c5f2` |
| 2. Home | feita e aprovada | `e375d5a` |
| 3. Drawer de contato e WhatsApp | feita e aprovada, com as 7 decisões registradas abaixo | `be20fd3` e `d2c50d2` |
| Revisão das etapas 1 a 3: humanizar e code-review | feita e aprovada | de `4608dd0` a `f772212` |
| 4. Treinamento de NR-1 | feita e aprovada | `f6dce38` |
| 5. Cursos de Idiomas | feita e aprovada | `69aa31b` |
| 6. Páginas parciais | feita e aprovada | `c0c8c96` |
| 7. Verificação e revisão final | feita e aprovada | de `9e8f11e` a `f9374b4` |
| 8. Publicação e reunião | **publicada**: falta o teste em aparelho e a reunião | `35c51c4` e o commit deste arquivo |
| 9. Ajustes pedidos pela cliente | **publicada** e no GitHub em 23/09, com os ajustes do Maxwell (última versão no ar: `1ec13e91`) | de `8107b6a` em diante |

## O que cada etapa entregou

**Etapa 0.** `docs/mvp-spec.md` (a spec), `docs/padroes.md` (regras do code-review) e `assets-cliente/` (os 22 arquivos do kit da marca que o site usa; o `Archive` original não foi tocado).

**Etapa 1.** Astro 7 com saída estática, a paleta em tokens, Readex Pro nos títulos e Source Sans 3 no texto, o menu com os grupos "Empresas" e "Para você", o rodapé e a página de trabalho `/especime/`.

**Etapa 2.** A home com as 9 seções do brief, a escolha de público no hero (reordena os serviços, troca o texto dos botões e fica salva), o movimento por rolagem, os Placeholders das imagens e os 6 prompts da home em `docs/imagens-gemini.md`. H1 aprovado: "Para a conversa dar certo."

**Etapa 3.** O drawer de contato e o atalho do WhatsApp, em todas as páginas:

- quatro passos: para quem é, serviço, detalhes do serviço e nome, com resumo editável dos passos respondidos;
- os 5 formulários da proposta saem de `content/site.md`, com campos que aparecem conforme a resposta;
- a saída pelo WhatsApp abre o `wa.me` numa nova aba com a página, o público, as respostas e o nome; a saída "Prefiro receber contato" confere o telefone ou o e-mail e mostra a confirmação com "MVP: envio simulado";
- foco preso também no Safari, Esc, toque no véu e foco de volta ao botão;
- o atalho flutuante leva a mensagem da página e do público, some com o drawer aberto e não cobre o fim do rodapé.

**Revisão das etapas 1 a 3.** O `humanizar` na home e nos textos compartilhados, e o `code-review` desde `mvp-base`, nos dois eixos (padrões e spec): textos que o site atual não sustenta, defeitos de movimento e de imagem, testes novos, tokens, tipos e listas únicas, e a documentação.

**Etapa 4.** A página `/treinamento-nr-1/` completa, com as 8 seções do brief:

- hero para quem decide, com rótulo "Para RH, SESMT e diretoria", H1 "Treinamento de NR-1 e saúde mental no trabalho" e o botão de orçamento;
- "Por que agora" em linha do tempo, com os três marcos (27/08/2024, a Portaria 1.419 aprova a nova NR-1; 26/05/2025, o texto entra em vigor com um ano de orientação; 26/05/2026, a fiscalização pode autuar), a nota sobre o PGR, a nota sobre a Lei 14.831 e as 4 fontes oficiais;
- "O que a sua empresa recebe", com os três resultados e a ressalva do que o treinamento não faz;
- os três módulos do site atual, em cartões numerados;
- formato e carga horária, com as pendências à vista;
- a abordagem em quatro etapas;
- FAQ de quem decide, com 5 perguntas;
- contato no hero, no meio (seção de formato) e no fim, sempre com `data-servico="nr1"`.

Do lado técnico: esquema próprio da coleção `nr1` em `src/content.config.ts`, JSON-LD `Service` ligado à organização pelo `@id`, seis componentes novos (`HeroPagina`, `LinhaDoTempo`, `Pontos`, `Modulos`, `Formato`, `Abordagem`), o prompt `IMG-NR1-HERO` em `docs/imagens-gemini.md`, `tests/dist/nr1.test.ts` e o roteiro de capturas `etapa-4`. O `HeroPagina` foi escrito para servir também às etapas 5 e 6.

**Imagens do Gemini.** Durante a etapa 4 chegaram os 7 arquivos em `src/assets/imagens/`: os 6 da home e o `nr1-hero.jpg`. O site já serve AVIF com WebP de reserva, srcset, width e height. Duas observações:

- `home-hero-frente.jpg` é a camada recortada do hero da home. Ela precisa ser `.png` com fundo transparente, senão o retângulo da foto aparece por cima do círculo da marca;
- os arquivos ainda não estão no git.

**Etapa 5.** A página `/curso-de-idiomas/` completa, a vitrine do B2C:

- hero com o botão que muda de texto conforme o público ("Quero estudar" ou "Pedir orçamento");
- os 14 idiomas por família, cada um com âncora própria e com botão que abre o pedido já com o idioma marcado. É para essas âncoras que os 14 links da home apontam;
- a régua do A1 ao C2 em português claro, com a barra crescendo de um nível para o outro;
- "Como são as aulas", com a âncora `#particular` que o menu usa, e o presencial marcado como pendência;
- os 6 exames do site atual, com uma linha cada;
- "Para a sua equipe", o bloco B2B com âncora `#empresas`;
- "Como começa", com o diagnóstico de nível;
- FAQ de quem vai estudar e o contato no hero, no meio, no bloco da equipe e no fim.

Do lado técnico: esquema próprio da coleção `idiomas`, JSON-LD com `ItemList` de 14 `Course` (cada um apontando para a própria âncora) e `FAQPage` igual ao FAQ visível, quatro componentes novos (`Niveis`, `Aulas`, `Provas`, `ComoComeca`), o `Familias` com o modo de pedido, o `Entregas` da etapa 4 virou `Pontos` e serve às duas páginas, os prompts `IMG-IDIOMAS-HERO` e `IMG-IDIOMAS-COMO`, `tests/dist/idiomas.test.ts` e o roteiro de capturas `etapa-5`.

**Etapa 6.** As três páginas parciais, com hero, um bloco curto e a etiqueta "página em construção no MVP" no alto:

- **Tradução Simultânea:** os três formatos (simultânea, consecutiva e acompanhamento), os sete idiomas com intérprete e o presencial nas quatro cidades, que é o único presencial que o site atual afirma;
- **LMS:** as três perguntas que dimensionam a plataforma, que são as mesmas do pedido. O resto é pendência, porque o site atual não tem material de LMS;
- **Quem Somos:** as quatro frentes da empresa e a sede em São Paulo, com o tempo de casa como pendência.

Do lado técnico: a coleção `parciais` ganhou esquema próprio e o `EmConstrucao` saiu, o `Aulas` da etapa 5 virou `Cartoes` e serve às quatro páginas, o `HeroPagina` ganhou a etiqueta de obra, entraram os três prompts que faltavam em `docs/imagens-gemini.md`, `tests/dist/parciais.test.ts` e o roteiro de capturas `etapa-6`.

**Etapa 7.** A medição, a revisão e as correções.

- **Lighthouse mobile**, mediana de 3 rodadas, nas 3 páginas completas e nos dois builds: Performance de 98 a 100, Acessibilidade 100, Práticas 100, SEO 100 no build indexável (66 a 69 no padrão, pelo noindex, como a spec previa), LCP de 1,51 s a 1,96 s e CLS de 0,000 a 0,001. Todas as metas batidas. O script é o `scripts/lighthouse.ts` e o resultado fica em `relatorios/etapa-7/lighthouse.md`.
- **`code-review` de `mvp-base` até HEAD**, nos dois eixos, com o `humanizar` e o `humanizar-ui` por cima. Nove correções aplicadas, uma por commit:
  1. a ordem dos blocos de formato na página de Idiomas agora muda com o público, que era um efeito que a spec pedia e tinha ficado de fora;
  2. a resposta do FAQ que ia quebrada para o JSON-LD ("no fim do curso:."), com teste novo que pega esse rastro em qualquer página;
  3. os "relatórios para o RH" que sobraram na home e no drawer viraram pendência;
  4. o `line-height: 1.45` solto em 13 arquivos virou `--altura-apoio`;
  5. o cabeçalho de seção repetido em dez lugares virou o `CabecaDeSecao`;
  6. o selo numérico duplicado virou a classe `.selo-numero`;
  7. o contrato do drawer saiu de um lugar só (`atributosDoContato`);
  8. a descrição do curso no JSON-LD passa pelo `textoPuro`;
  9. a `etiquetaMvp` saiu de dentro do `rodape` no `site.md`.
- A spec passou a registrar de onde vêm os fatos do site atual sobre idiomas e tradução, e a página de NR-1 cita agora as 5 fontes oficiais.

**Etapa 8, o que já está pronto.** Tudo que não depende da conta da Cloudflare:

- a página `/especime/` saiu do repositório, como a spec previa. Com ela saiu a exceção da regra de cor nos testes, que agora valem para todas as páginas sem pular nenhuma;
- `wrangler.jsonc`: o `dist/` sobe como Worker de arquivos estáticos, com a 404 do próprio site para endereço inexistente. O `npm run deploy` faz o build e publica;
- `scripts/pendencias.ts`: junta as 29 pendências dos textos, agrupadas por página, ignorando os comentários do YAML. Escreve `relatorios/pendencias.md`;
- `docs/roteiro-apresentacao.md`: a ordem da demonstração, o antes e depois ligado ao que a proposta apontou, os números do Lighthouse, o que ainda não está no MVP, as quatro perguntas que mais importam e o checklist do teste em aparelho de verdade.

**Etapa 8, publicado em 20/09/2026.** O preview está em **https://9vee-preview.9vee-site.workers.dev**, na conta Cloudflare do Maxwell, como Worker de arquivos estáticos.

Conferido no ar: as 6 páginas do menu respondem 200, toda resposta traz `X-Robots-Tag: noindex, nofollow`, a meta robots está no HTML, o canonical e o Open Graph apontam para o endereço do preview, o `og.jpg` é servido (é o que faz a prévia do link no WhatsApp mostrar a marca), endereço inexistente cai na 404 do próprio site e o `robots.txt` não bloqueia.

Lighthouse no endereço publicado, mediana de 3 rodadas: Performance 96 a 99, Acessibilidade 100, Práticas 100, LCP de 1,55 s a 1,90 s e CLS até 0,001. O SEO aparece entre 66 e 69 porque o preview está com noindex, como a spec previa. O resultado está em `relatorios/etapa-8/lighthouse-publicado.md`.

Uma nota para a próxima publicação: o subdomínio novo da Cloudflare levou uns três minutos para o certificado sair. Até lá o endereço falha no aperto de mão TLS, no terminal e no navegador. É espera, não erro.

## Decisões da etapa 3, aprovadas em 19/09/2026

1. Nome obrigatório nas duas saídas.
2. No toque, escolher o público ou o serviço já avança; no teclado, só o Enter avança.
3. Quem escolheu "Para você" chega com "Cursos de idiomas" marcado, e o título vira "Montar suas aulas".
4. O público escolhido no drawer vale para o site todo.
5. No passo final, as saídas vêm logo abaixo do nome, e o "Confira o pedido" vem depois.
6. A pergunta do passo 1 é "É para sua empresa ou para você?", na ordem dos botões. A legenda do hero usa a mesma pergunta.
7. Cada serviço tem uma descrição curta no passo 2.

## Decisões da etapa 4

1. **O regulamento da Lei 14.831 ainda não saiu.** Confirmado na web em 19/09/2026: há notícia de grupo de trabalho para regulamentar, mas nenhum ato oficial no gov.br. A pendência continua no texto.
2. **Presencial do treinamento virou pendência.** O site atual só afirma atendimento presencial para tradução simultânea, então a página não promete cidade para o treinamento. A descrição da página perdeu o "Presencial ou online" que estava escrito desde a etapa 1.
3. **Os nomes dos três módulos ficaram como a cliente escreve**, inclusive "mudança de mindset" no módulo 2. É o nome do produto dela; trocar é decisão da Daniella.
4. **A seção "Por que agora" virou linha do tempo**, em vez de repetir o bloco que a home já tem. Quem vem da home encontra a informação aprofundada, e não a mesma peça duas vezes.
5. **O `Service` do JSON-LD atende "Brasil"**, e não as 4 cidades, porque o presencial do treinamento é pendência.

## Decisões da etapa 5

1. **O hero não repete a escolha de público da home.** O botão muda de texto conforme o público já escolhido, e quem ainda não escolheu responde isso no primeiro passo do drawer. A página serve os dois públicos por seções separadas, e não por um seletor a mais.
2. **Cada idioma é um botão, com o texto repetido dentro de um `<noscript>`.** Sem JavaScript o botão some, pela regra do `base.css`, e a lista continua à vista. A meia-pílula menta no canto é o que diz que a linha faz alguma coisa.
3. **"Para a sua equipe" reaproveita o bloco escuro da etapa 4**, que virou o componente `Pontos` e ganhou um botão de contato opcional.
4. **Os textos dos níveis são a escala global do Conselho da Europa em português claro.** Não é tradução literal: é o que a pessoa consegue fazer em cada nível.
5. **A preparação para provas descreve cada exame numa linha.** São os 6 que o site atual lista, e as descrições são fato público sobre o exame, não promessa da 9vee.

## Decisões da etapa 6

1. **A etiqueta de obra ficou no hero, acima do rótulo.** Quem abre a página lê antes de tudo que ela ainda não está completa, e o resto do texto é verdade sobre o serviço.
2. **O texto do LMS diz o que a 9vee precisa saber, não o que a plataforma faz.** O site atual não tem uma linha sobre o LMS, então a página mostra as três perguntas do pedido e marca o resto como pendência.
3. **Os dois blocos repetidos viraram componentes de verdade:** `Pontos` (escuro, com marcadores) e `Cartoes` (claro, com cartões). As quatro páginas novas usam os dois.
4. **A descrição do LMS perdeu os "relatórios de frequência"**, que tinham escapado da revisão das etapas 1 a 3. O site atual não afirma isso.

## Decisões da etapa 7

1. **A medida do Lighthouse é feita com gzip.** A primeira rodada deu LCP de 2,1 s a 2,5 s porque o servidor local mandava os 130 KB de HTML sem compressão. A Cloudflare comprime, então o servidor da medida também comprime. Sem isso, a medida castiga bytes que a produção nunca envia.
2. **Sem escolha, a página de Idiomas abre nos formatos**, e não na ordem de empresa das outras listas. É a vitrine de quem estuda por conta própria. Por isso o `data-ordenavel` agora aceita dizer qual ordem vale sem escolha.
3. **A revelação por rolagem fica como está**, em 11 a 17 elementos por página. A régua do `humanizar-ui` pede no máximo dois momentos de movimento, mas o modo de falha que ela teme, a tela em branco no celular, não acontece aqui: a animação roda quando o elemento entra e some inteira com movimento reduzido. É o mesmo movimento aprovado na home.
4. **As meias-pílulas decorativas continuam com medida em `rem` crua.** São forma, não tamanho de texto, e o `Faq` já fazia assim desde a etapa 2.

## Etapa 9: ajustes pedidos pela cliente (23/09/2026)

A cliente viu o preview e mandou cinco apontamentos (os itens 1 a 4 abaixo cobrem os cinco; os itens 5 e 6 são ajustes do Maxwell, depois da publicação). O Maxwell aprovou o plano com as decisões abaixo, e a spec ganhou a seção "Ajustes pedidos pela cliente em 23/09/2026". Cada fase passou por humanizar, code-review nos dois eixos e capturas no roteiro `ajustes-cliente`, com as correções da revisão em commits próprios.

**O que entrou:**

1. **Ordem do conteúdo** (`22b842d`). Idiomas, Tradução simultânea, NR-1 e LMS, a mesma para os dois públicos, na lista da home, no grupo Empresas do menu e do rodapé e no passo do serviço do pedido. Na home, o bloco dos idiomas subiu para logo depois da lista, antes do destaque de NR-1. A lista da home e a do pedido saem ordenadas pelos números do `content/site.md` já no build.
2. **Círculo da marca** (`14f7949`, com as correções até `e447f1c`). O "círculo Novee" da cliente é o `Profile Pic_1` do kit. O `gerar-ativos` tira só a camada de degradê do SVG, sem as letras, e grava `src/assets/marca/circulo-marca.png`. Ele fica atrás da intérprete no hero da home, onde gira uns 30 graus com a rolagem, atrás da imagem nos heroes internos e no CTA do fim. As metades verde e rosa ficaram nos detalhes.
3. **Código de cor** (`fb7e2f3`, com a correção `237088d`). Marca-texto, pela classe `.grifo`. Empresas em violeta e Para você em magenta, no menu do celular, no rodapé e no menu do computador (meia-lua na cor do grupo; faixa no hover, no foco e com o painel aberto). Germânicas em violeta, Românicas em magenta e De outras famílias em menta. Um mapa só, pelo `data-grupo`, em `base.css`. Depois da publicação, o Maxwell notou que o hover das línguas continuava magenta em todas as famílias: o sublinhado do hover e o fio do idioma de destino passaram a usar a cor da família.
4. **Logos nos depoimentos** (`5a30392`, com a correção `a58d186`). Nissan e GM do Simple Icons, Embraer do Wikimedia Commons, em navy e escondidos do leitor de tela, pelo componente `LogoEmpresa`, que tira o tamanho do formato do `viewBox`. A pendência de cada depoimento pede também a autorização da empresa para o logo.
5. **Cor do público na escolha**, pedido do Maxwell depois da publicação (`a42ae96`). Na escolha do hero, a metade escolhida ganha a cor do público, a mesma do menu (violeta clara para empresa, magenta clara para você), com texto navy. Os botões de ação continuam menta.
6. **Saudações na cor da família**, pedido do Maxwell depois da publicação. A faixa de saudações da home alternava meias-luas menta e magenta pela posição ("Hallo", germânica, com meia-lua rosa). Agora a meia-lua de cada saudação tem a cor da família dela, no tom claro dos títulos. A faixa é escura, mas as meias-luas não levam texto em cima: a classe `.tons-claros`, a mesma da escolha de público, traz os tons claros, que contra o navy dão 4,7:1 e 4,6:1 (os escuros dariam 2,7:1 e 2,8:1). A revisão pegou um defeito antigo no árabe, que é da direita para a esquerda: a meia-lua ia para antes da palavra, e agora fica depois, como nas outras.

**Decisões:**

1. Uma ordem só para os dois públicos, como ela pediu. A escolha de público continua trocando o botão, o pedido, a mensagem do WhatsApp e a ordem dos blocos na página de Idiomas. O mecanismo de ordem por público ficou: se ela quiser de novo uma ordem de empresa, são os números do `site.md`.
2. O círculo entra inteiro desde a primeira tela e sem as letras, porque a intérprete cobre o miolo.
3. O grifo é marca-texto, e não caixa cheia. A faixa passa por trás da parte de baixo das letras, então o texto precisa de 4,5:1 sobre ela também. A primeira versão, com as cores puras, dava 2,7:1 no navy sobre violeta. Agora as faixas clareiam no fundo claro (violeta 70% e magenta 90% com papel) e, no rodapé, a magenta escurece (77% com noite). O teste do navegador mede o contraste de cada grifo. A altura foi medida na Readex Pro, que a própria classe traz.
4. Logos em uma cor só, porque as cores das marcas brigariam com a paleta.
5. Arquivo e componente do círculo se chamam `circulo-marca` e `CirculoMarca`: "novee" iria para a URL pública da imagem, contra a regra da marca.
6. O kit original agora está em `docs/Archive`, fora do git pelo `.gitignore`.
7. **Botão de ação continua menta.** O Maxwell propôs pintar também os botões com a cor do público. Simulei as opções na tela (`relatorios/analise-cores/`) e recomendei não pintar, e ele aprovou. Na cor do público, o botão viraria mais uma área colorida disputando com o círculo e as faixas, o atalho do WhatsApp continuaria verde ao lado de um botão rosa, e quem escolheu "Para você" veria a página de NR-1 com botões rosa. Na análise eu também citei contraste (a violeta pura dá 2,7:1 contra o navy, e o texto teria de trocar de cor por público), mas a revisão mostrou que isso só vale para a cor pura: no tom claro do grifo, o botão com texto navy daria 4,7:1. A decisão ficou pelos outros motivos. A cor de ação ficou uma só, e isso virou regra no `padroes.md`.

**Para mostrar à cliente:**

- no fundo navy (CTA do fim e heroes internos), o quadrante escuro do degradê se mistura com o fundo, e o círculo lê como um arco colorido. É o degradê do kit como ele é. Se ela estranhar, dá para girar o círculo nesses lugares;
- a escolha de público agora marca na cor do público, a mesma do menu. Ela não pediu isso: é um ajuste do Maxwell, então vale mostrar e ouvir;
- a faixa de saudações da home agora tem as meias-luas na cor da família de cada língua, também um ajuste do Maxwell;
- o círculo do fim da home agora leva o logo empilhado no miolo, a pedido do Maxwell: é o PNG do kit (`PP & Banner/Profile Pic_1.png`), que o `gerar-ativos` reduz para `src/assets/marca/circulo-marca-logo.png`. O topo da home e as outras páginas seguem com o círculo sem letras.

## Pendências técnicas

- **JavaScript:** dentro do teto (30 KB) e da meta interna (10 KB com gzip). O teste de build confere em todas as páginas.
- **Teste em aparelho de verdade,** que continua com o Maxwell: o link do WhatsApp, o teclado virtual no drawer e a troca de fonte num Android e num iPhone. No laboratório o CLS é 0,000, mas aparelho de verdade é aparelho de verdade.
- **Para a reunião:** a página de NR-1 não tem nenhuma prova, nenhum caso e nenhum número. É honesto, porque não há dado confirmado, mas é a maior fraqueza dela para quem decide. Vale pedir à Daniella um caso real de treinamento já dado.
- **Etapa 8:** tirar a página `/especime/` antes de publicar e criar o script que lista as pendências para o roteiro da reunião. O script deve ignorar os comentários do YAML, que também citam o formato `[CONFIRMAR ...]`.
- **Etapa 9:** os `.docx` em `docs/` (roteiro, colinha, relatório e propostas) são de antes dos ajustes e não foram atualizados. O roteiro que vale é o `docs/roteiro-apresentacao.md`.

## Pendências de conteúdo para a Daniella

Já marcadas no site com a etiqueta "a confirmar":

- ano de fundação: 19 anos nos números ou "mais de 20" no Quem Somos;
- quantidade de idiomas: 14 na home ou "inglês e mais 11" na página de cursos;
- número de clientes e de profissionais;
- autorização por escrito dos depoimentos de Eduardo Martins (Nissan), Bruno Teixeira (GM) e Pedro Cavalcante (Embraer), e das três empresas para os logos, e confirmação de que as falas são deles;
- prazo de resposta do comercial e em quanto tempo a proposta costuma sair;
- se o comercial responde com valor já no primeiro contato, e uma faixa de preço por serviço para a FAQ;
- situação do regulamento da Lei 14.831 na data da publicação;
- a pronúncia certa da marca.

Do NR-1, da etapa 4:

- se o treinamento também é presencial e em que cidades;
- carga horária total e em quantos encontros ela é dividida;
- mínimo e máximo de pessoas por turma;
- como a 9vee entrega o plano de ação no fim do treinamento;
- que comprovante a empresa recebe e se cada participante ganha certificado;
- se há turma com a equipe inteira, e não só com a liderança;
- faixa de preço do treinamento.

Dos Idiomas, da etapa 5:

- se as aulas de idioma também acontecem presencialmente, e em que cidades;
- quantas horas de aula costumam levar de um nível para o outro;
- se a 9vee emite certificado no fim do curso, e de que tipo;
- faixa de preço das aulas.

Das parciais, da etapa 6:

- como é o LMS que a 9vee usa hoje, o que o RH acompanha nele e se há conteúdo próprio;
- ano de fundação, de novo, agora no Quem Somos.

Fora do site, para a reunião: uma leitura jurídica do argumento de risco da página de NR-1.

## O que falta na etapa 8

**Imagens: fechadas em 20/09/2026.** As 12 estão no site e nenhuma página usa Placeholder. As cinco que faltavam vieram em 4:5, depois que o prompt passou a dizer "4:5 portrait (1200 x 1500 pixels), not 3:4", e a camada da frente do hero da home virou PNG com fundo transparente. Todas versionadas.

Com o Maxwell:

- [x] republicar o preview com a etapa 9: feito pelo Maxwell em 23/09 (`npx wrangler deploy`, versão `e5f7d05d`), porque o modo automático bloqueia a publicação feita por mim. Conferido no ar: as seis páginas em 200, a 404, o noindex, o canonical, a ordem nova, o círculo da marca, os 9 grifos e os 3 logos. Atenção para a próxima vez: o `npm run deploy` sozinho sai sem o `SITE_URL`, com o canonical em localhost; use o comando completo abaixo (isso valeu até o ticket 01 da Fase 1, que tirou o `SITE_URL`: hoje o canonical é sempre o domínio definitivo);
- [x] `git push` da etapa 9: feito em 23/09, até `440a6f6`;
- [x] republicar o que veio depois da primeira publicação: o hover dos idiomas na cor da família, o fio do idioma de destino e a cor do público na escolha. Feito pelo Maxwell em 23/09 (versão `714d209d`) e conferido no ar. O push vai junto com este registro;
- [x] republicar a faixa de saudações na cor da família: feito pelo Maxwell em 23/09 (versão `8bbc2c5c`) e conferido no ar;
- [x] republicar as correções da revisão das saudações (a classe `.tons-claros` e a meia-lua do árabe): feito pelo Maxwell em 23/09 (versão `1ec13e91`) e conferido no ar;
- [x] republicar o círculo com o logo no fim da home: feito pelo Maxwell em 23/09 (versão `fec46e54`) e conferido no ar, as 11 versões da imagem em 200;
- [ ] abrir o preview no Android e no iPhone e passar pelo checklist do `docs/roteiro-apresentacao.md`, principalmente a saída pelo WhatsApp, o teclado virtual no pedido e a prévia do link;
- [ ] mandar o link para a Daniella e o Arthur e levar `relatorios/pendencias.md` para a reunião.

Nota sobre recorte: ao conferir um PNG recortado, olhe a cor além do alfa. A área opaca larga na base da imagem era o blazer da intérprete, não sobra de fundo.

Para publicar de novo, depois de qualquer mudança (desde o ticket 01 da Fase 1):

```
npm run build:preview && npx wrangler deploy
```

O endereço é sempre o mesmo, então o link que já foi mandado continua valendo.

## Como retomar

- `npm run dev`: o site local, em modo local (noindex, pendências à vista). `npm run dev -- --host` ou `npm run dev:rede` abre na rede, para o celular.
- `npm run build:preview`: o build que vai para o Cloudflare, em `dist/`, com noindex na meta e no `_headers`.
- `npm run build:producao`: o site definitivo, em `dist-producao/`, sem noindex. Termina rodando a trava (`check:producao`), que falha enquanto sobrar pendência, Placeholder, marca do MVP, noindex, travessão ou link quebrado.
- `npm run check:producao`: só a trava, sobre um `dist-producao/` já construído.
- `npm run preview`: serve o `dist-producao/` em http://localhost:4321, para conferir e medir.
- `npm test`: testes de lógica, os dois builds (preview e produção) e os testes do HTML gerado.
- `npm run e2e`: build de preview e testes no navegador (Android e desktop no Chrome instalado, iPhone no WebKit do Playwright).
- `node scripts/screenshots.ts etapa-6`: capturas em `relatorios/etapa-6/`, fora do git. Os roteiros vão de `etapa-1` a `etapa-6`, mais o `ajustes-cliente` da etapa 9, o `fotos-idiomas` e os dos tickets `ticket-04`, `ticket-05`, `ticket-06`, `ticket-07`, `ticket-08`, `ticket-09`, `ticket-10` e `ticket-21`.
- `npm install --no-save lighthouse@13.5.0 && node scripts/build.ts producao && node scripts/lighthouse.ts <roteiro>`: a medição das páginas do roteiro, no build de produção, com o relatório em `relatorios/<roteiro>/lighthouse.md`. Sem roteiro, vale o `etapa-7`, com as 3 páginas completas do MVP; o `ticket-06` mede o LMS, o `ticket-05`, a Tradução Simultânea, e o `ticket-21`, a interpretação de mandarim, e cada ticket que fecha uma página acrescenta o dele. Os scripts só rodam com o Lighthouse 13.5.0, a régua do retrato do antes.
- `node scripts/lighthouse-no-ar.ts <endereços completos>`: a mesma medida num site no ar, o Wix no antes e o site novo no depois. No Wix, cada rodada conta como visita no GA4 e no Twipla; no site novo, não, porque o GA4 só carrega depois do aceite dos cookies.
- Medida longa pede a máquina acordada: em 29/09 o Windows entrou em suspensão por inatividade às 21h05, no meio de um teste, e o processo da página caiu.
- `node scripts/pendencias.ts`: a lista de pendências dos textos, separada entre a Daniella e o Arthur, em `relatorios/pendencias.md`.
- `npm run lote -- 1`: faz o build de preview e monta dele o lote 1 de revisão da Daniella, em `docs/revisao-daniella/lote-1.md`.
- `npm run deploy`: build de preview e publicação na Cloudflare (precisa do `wrangler login` antes).
- `npx astro check`: tipos.
- Variáveis de ambiente: um arquivo por modo (`.env.development`, `.env.preview` e `.env.producao`), copiado do `.env.example`. O build recusa `.env` e `.env.local`, que valeriam para todos os modos.

No ticket 07 (02/10/2026), no processo curto, rodaram 151 testes de lógica e 1.089 do HTML. Na última rodada completa (ticket 21, 02/10/2026): 151 testes de lógica, 1.084 do HTML e 277 no navegador (296 pulados de propósito: teclado físico e larguras rodam só no desktop, o menu em folha só no celular e o movimento só no Chromium). No ticket 10, um teste de persistência da escolha de público falhou uma vez no desktop, com a máquina ocupada, e passou 25 vezes seguidas na repetição.

Lighthouse local da etapa 9, mediana de 3 rodadas: Performance de 99 a 100, Acessibilidade 100, Práticas 100, SEO 100 no build indexável, LCP de 1,66 s a 1,97 s e CLS até 0,001. A home ficou perto do teto de 2,0 s de LCP, porque o círculo da marca é uma imagem a mais na primeira tela. Medido antes das correções das fases 3 e 4, que só mexem em CSS e em SVG abaixo da dobra.

Lighthouse local depois do ticket 04 (29/09/2026, duas medidas seguidas no build de produção, com o Lighthouse 13.5.0 e o Chrome 154.0.8037.92): Performance de 97 a 100, Acessibilidade 100, Práticas 100, SEO 100, LCP de 1,66 s a 1,99 s e CLS até 0,001. A home continua no limite dos 2,0 s de LCP (1,97 s e 1,99 s). O NR-1 deu TBT de 166 ms na primeira medida e 0 ms na segunda, sem mudança no código.

Notas do ambiente:

- o `.npmrc` com `legacy-peer-deps=true` é necessário para o `npm install`;
- no Astro 7 o `astro preview` vai para segundo plano sozinho, então os testes usam `scripts/servidor-preview.ts`;
- no WebKit o rastro do Playwright fica desligado, porque trava os testes em paralelo no Windows;
- com a máquina muito ocupada, testes de navegador podem estourar o tempo; rodar de novo antes de caçar defeito. Na etapa 4 isso aconteceu uma vez, no teste do WhatsApp no iPhone, e passou na repetição.
