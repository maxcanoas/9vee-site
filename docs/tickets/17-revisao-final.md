# 17: Revisão final

**O que construir:** o site inteiro revisado, com os ajustes da Daniella, as revisões de código, de interface e de texto, e o preview completo para a Daniella e o Arthur aprovarem.

**Depende de:** 04 a 16.

**Horas:** 6. **Semana:** 7.

**Situação:** parte técnica em andamento desde 06/10/2026, adiantada da semana 7, a pedido do Maxwell: suíte de navegador e Lighthouse feitos; falta o `code-review`. A parte da Daniella espera a revisão dela.

- [ ] Ajustes da revisão da Daniella aplicados nos quatro lotes, com a aprovação dela por escrito registrada.
- [ ] `code-review` desde a tag `mvp-aprovado`, nos dois eixos, com as correções em commits próprios.
- [ ] Se sobrar hora: levar as três formas da meia-pílula (marcador, marca de ação e separador) para o `base.css`. A proposta vem do `code-review` do ticket 06, mexe em doze componentes e não muda nada na tela. O Maxwell decidiu em 01/10/2026 que ela espera esta revisão. A prova é a mesma do ticket 05: as capturas de antes e de depois idênticas, byte a byte.
- [ ] O que os tickets feitos no processo curto deixaram de fora, a pedido do Maxwell em 02/10/2026: o Lighthouse de cada página, a suíte de navegador inteira e o `code-review` do ticket. Começa pelo 07 (Quem Somos) e segue com o 22 (home, NR-1, Cursos e cinco páginas de idioma) e o 12 (o envio do pedido, que rodou a suíte de navegador inteira e ficou sem o Lighthouse e o `code-review`); cada ticket diz no "Como ficou" dele o que ficou de fora.
- [ ] Duas repetições de CSS que o 22 deixou, para o `code-review` decidir: o abre e fecha do `Acordeao` é igual ao do `Faq` (a chamada, o meio-círculo que gira e o texto de dentro), e o `GruposDePontos` traz mais uma cópia do marcador de meia-pílula, que entra na proposta do item acima.
- [ ] `humanizar-ui` e `humanizar` rodados, com as correções aplicadas.
- [x] Nenhuma rolagem horizontal em 360, 390, 768, 1280 e 1920 px, em todas as páginas (teste de larguras, na suíte inteira de 06/10).
- [ ] A lista das pendências ainda abertas, com uma sugestão para cada uma, para o Maxwell decidir caso a caso.
- [ ] Preview completo publicado para a aprovação da Daniella e do Arthur.

## Andamento

**Parte técnica, 06/10/2026:**

- **Suíte de navegador inteira:** 368 testes passaram, nenhuma falha, nos três perfis (celular, computador e iPhone), em 6,6 minutos. O teste de larguras não achou rolagem horizontal em nenhuma página.
- **Lighthouse de cada página** (roteiro `ticket-17` em `scripts/lighthouse.ts`, relatório em `relatorios/ticket-17/lighthouse.md`), mobile, no build de produção, mediana de 3 rodadas:
  - primeira medida: Performance entre 95 e 100, Acessibilidade, Boas práticas e SEO em 100, LCP abaixo de 2,0 s em todas, mas o CLS passou da meta em três páginas: inglês (0,109), Quem Somos (0,103) e NR-1 (0,057);
  - a causa: com a fonte reserva, o texto do topo quebra numa linha a mais (o título do NR-1, o apoio do Quem Somos e do inglês) e empurra o que vem abaixo quando a fonte chega. Só a fonte dos títulos era carregada antes da primeira pintura; a do texto passou a ser também (commit `bc1a384`);
  - segunda medida: as 21 páginas com Performance 99 ou 100, as outras três notas em 100, LCP entre 1,36 s e 1,96 s (japonês e mandarim, os mais altos) e CLS 0,017. O 0,017 de todas é o atalho do WhatsApp subindo quando o aviso de cookies aparece no celular.
- **Teste intermitente:** o teste que desenha a imagem de prévia passou dos 5 s uma vez, com a suíte inteira em paralelo; ganhou 30 s (commit `e161688`).
- **Falta:** o `code-review` nos dois eixos, em quatro grupos (07 e 22; 12 e 13; o parecer de UX e as respostas da 9vee; 15, 14, 18 e 19). Em 07/10/2026, o 11 entrou no último grupo.

**Code-review, grupo 1 (07 e 22), 07/10/2026:** um revisor de padrões e um de spec, sobre os commits `3d56b16`, `c2ddd59`, `709ccb8` e `baa4989`, julgando o estado de HEAD. Nada grave. O Maxwell escolheu, pelas perguntas de escolha, aplicar os padrões 1 a 5 e 8 e as nove correções de spec:

- padrões: o comentário fora de lugar no teste do Quem Somos; os quatro testes que procuravam a etiqueta de obra, que não existe mais, agora conferem que a página publicada não mostra o aviso de fora do site; o `ctaFinal` e as frentes usam os tipos que já existiam (`tituloETexto` e `link`); `detalhe` virou `paragrafos` no Acordeao, e os itens de dentro de cada princípio viraram `detalhes`; duas frases longas partidas (CELPE-Bras em Cursos e o objetivo do NR-1); e um teste que exige os mesmos fatos do DELE e do CELPE-Bras em Cursos e na página do idioma;
- spec: o bloco "Histórias construídas com grandes parceiros" no Quem Somos, com os seis nomes liberados na resposta 14, sem logo; "segurança, clareza e autoridade" nos executivos, em Cursos e no inglês; no francês, o foco nos critérios de cada prova, a prática direcionada do TCF e o Quadro Europeu no DELF e DALF; no holandês, o exame prévio de quem vive no exterior; no NR-1, sem o "É o módulo 2 inteiro"; o diagnóstico nas primeiras aulas, com os objetivos e o nível (em Cursos, no "Como começa" e no FAQ, e na home, que dizia que o curso começava por ele); "professores qualificados" em Cursos, como o site atual, enquanto o cantonês não responde; os princípios com uma frase por item e "clientes"; a home com "comunicação real" e "novas oportunidades"; e o título do lote 2 com a interpretação de mandarim;
- ficaram para o item "se sobrar hora", como já estava: as duas extrações de CSS (o abre e fecha do Acordeao e do Faq, e o marcador de meia-pílula em três componentes). Também não entrou o juízo de montar as frentes do Quem Somos a partir dos serviços do `site.md`;
- `npm test` inteiro passou (1.805 testes do HTML), e os lotes 1, 2 e 3 foram gerados de novo, já com as legendas das fotos dos idiomas de 06/10.

**Code-review, grupo 2 (12 e 13), 07/10/2026:** os mesmos dois revisores, sobre `7bce2a8` (envio do pedido) e `b8f9da4` (cookies, GA4 e eventos), julgando HEAD. O Maxwell escolheu aplicar as três de spec e os padrões 1 a 7:

- **defeito:** a recusa nem sempre desligava o GA4. A página que já media, ao voltar do cache do navegador (ou ativada da pré-renderização) depois de uma recusa feita noutra página, ou aberta noutra aba, seguia medindo. Agora a resposta guardada desliga o GA4 quando não é o aceite, e a página ouve a resposta dada noutra aba (evento `storage`). Dois testes de navegador novos refazem os dois caminhos e falhavam antes da correção;
- spec: a trava de produção exige o ID da 9vee (`G-Y04K0CN1F9`) e barra qualquer outro, o que dispensa a leitura do ID de teste no `.env.development`; o ticket 20 ganhou, como bloqueio, o clique de saída desligado e o `text` na redação de dados da propriedade, conferidos no DebugView;
- padrões: a caixa de marcar do pedido e do aviso com um token só (`--caixa-de-marcar`), sem a margem solta, e a altura de linha do consentimento com o token; o envio do pedido num `try/finally`, e a tela parada enquanto o pedido sai; o aviso da trava quando falta o `.env.preview`; o `localStorage` num módulo só (`src/scripts/armazenamento.ts`), a leitura do `.env` também (`scripts/ler-env.ts`), e a chave `ga-disable` e a caixa da estatística em constantes; os eventos do pedido por um `medirPedido`; `doServico` virou `daAbertura`;
- ficaram de fora, por escolha: reorganizar as regras da trava e a função `textoDaEscolha`, que só repassa;
- `npm test` inteiro passou, e os testes de navegador do pedido, do envio, dos cookies e das cores também. Um teste de cor falhou uma vez no perfil do iPhone com a suíte em paralelo e passou nas nove vezes seguintes: é intermitente, como o da prévia em 06/10.
