# 13: Aviso de cookies, GA4 e eventos

**O que construir:** o aviso de cookies com "Aceitar", "Recusar" e "Preferências", o mesmo GA4 da 9vee com Consent Mode v2, e os três eventos que medem os leads.

**Depende de:** 01, 08, 12.

**Horas:** 6,5. **Semana:** 5 (era a 6; subiu em 30/09/2026, junto com o 12).

**Situação:** feito e aprovado pelo Maxwell em 05/10/2026, adiantado da semana 5, no processo curto. Como é ticket de funcionalidade, os testes de lógica vieram antes do código e a suíte de navegador inteira rodou. Faltam dois itens que são do Maxwell, na propriedade do GA4: a conferência no DebugView, com a propriedade de teste, e o clique de saída desligado (veja `docs/medicao.md`).

- [x] Aviso com "Aceitar", "Recusar" e "Preferências", com o mesmo peso visual; preferências com necessários (sempre ligados) e estatística; a escolha fica no navegador, com data e versão; um link no rodapé reabre.
- [x] Teclado e leitor de tela: foco visível, ordem certa, rótulos claros, sem prender o foco da página.
- [x] Consent Mode v2 com tudo negado por padrão. O GA4 só carrega depois do aceite, e o aceite libera só a estatística. Quem recusa não manda nada.
- [x] ID do GA4 por variável: a produção usa o da 9vee, o local usa a propriedade de teste, o preview fica sem GA4.
- [x] `whatsapp_click`, `lead_form_submit` (só no envio certo) e `drawer_open`, com os parâmetros certos, testados no navegador com o GA4 interceptado.
- [x] O JavaScript inicial continua abaixo do teto, sem contar o GA4.
- [ ] Eventos conferidos no DebugView, com a propriedade de teste. **Do Maxwell:** falta o ID da propriedade de teste no `.env.development`.
- [x] `docs/medicao.md`: o que cada evento significa, onde dispara, como marcar os dois principais no GA4 e como montar o relatório mensal por serviço e por público.
- [x] A política de privacidade descreve o aviso e o GA4 como ficaram.
- [ ] O clique de saída da medição otimizada do GA4 fica desligado (na propriedade ou pelo gtag), e o DebugView confirma que nenhum evento leva o endereço do link do WhatsApp: ele traz o nome e a empresa no texto da mensagem, e a política promete que o nome e o contato não vão para o Google. **Do Maxwell:** o gtag não tem chave para isso, então é na propriedade (passo 1 de "O que o Maxwell configura na propriedade", em `docs/medicao.md`), e nas duas: a de teste e a da 9vee.
- [x] O link do rodapé que reabre as preferências se chama "Preferências de cookies", o nome que a política cita. Se o nome mudar, a política muda junto, e o rótulo sai de `ROTULOS_AINDA_SEM_TELA` em `tests/dist/privacidade-e-404.test.ts`.

## Como ficou

- **O aviso** (`src/components/AvisoCookies.astro`, textos em `content/site.md`, `cookies`): um cartão no pé da tela, por cima da página, sem empurrar o conteúdo. No computador fica à esquerda, longe do atalho do WhatsApp; no celular ocupa a largura, e o atalho sobe acima dele. "Aceitar" e "Recusar" são o mesmo botão de contorno, lado a lado, em partes iguais; "Preferências" é texto sublinhado e abre as duas categorias, com "Salvar escolha". O aviso é o primeiro elemento do corpo: enquanto está na tela, é a primeira parada do Tab. Não é modal e não prende o foco. A resposta devolve o foco ao conteúdo, ou ao botão do rodapé, quando foi ele que abriu. Esc fecha o aviso reaberto, sem mudar a escolha. Sem JavaScript, o aviso e o botão do rodapé não aparecem: sem o script, o GA4 não carrega.
- **A escolha** (`src/lib/cookies.ts`): no localStorage, em `9vee:cookies`, com a data e a versão do aviso (`cookies.versao`). A resposta de outra versão não vale, e o aviso aparece de novo.
- **O GA4** (`src/scripts/cookies.ts`): o script do Google só é pedido depois do aceite. A fila do gtag começa com tudo negado e a atualização libera só o `analytics_storage`. Quem volta atrás pelo rodapé fica com o GA4 desligado na página (`ga-disable-<ID>`) e sem os cookies `_ga` e `_ga_...`, apagados em cada domínio onde o Google pode ter gravado. No local, o `config` sai com o modo de depuração, para o DebugView.
- **O ID por modo:** `GA4_ID` no `.env` de cada modo (`astro.config.mjs`). O preview sai sem ID, com ou sem variável (`src/layouts/Base.astro`). A trava de produção ganhou a regra "Medição sem destino": barra o build sem o ID e com o ID do `.env.development`.
- **Os eventos** (`src/lib/medicao.ts` e `src/scripts/contato.ts`): `drawer_open` ao abrir o pedido, com o serviço e a página; `whatsapp_click` no atalho flutuante, na saída do pedido e na saída da tela de falha (o "Abrir o WhatsApp de novo" não conta); `lead_form_submit` só quando o serviço confirma a entrega, e não na falha nem na isca. O que a pessoa ainda não escolheu vai como `nenhum` e `sem_escolha`, e não vazio.
- **A política:** a seção da estatística cita os três botões do aviso e diz que quem recusa depois de aceitar fica sem os cookies do Google e para de ser medido.
- **Os testes:** 9 de lógica (`tests/unit/cookies.test.ts` e `tests/unit/medicao.test.ts`), 3 da trava, 161 do HTML (`tests/dist/cookies.test.ts`, em todas as páginas) e 13 de navegador (`tests/e2e/cookies.spec.ts`). O `test` comum de `tests/e2e/pedido.ts` passou a barrar qualquer chamada ao Google (o script do GA4 vira um arquivo vazio) e a entrar com a resposta ao aviso já dada, para ele não cobrir botões nos testes que já existiam; o teste do aviso desliga isso com `test.use({ cookiesRespondidos: false })`. Como o preview sai sem GA4, o teste põe um ID no aviso de cada página que abre, e lê a fila do gtag como o site a montou. `npm test` com 200 testes de lógica e 1.453 do HTML; a suíte de navegador inteira passou, com 368.
- **O JavaScript inicial** subiu de 17,1 KB para 21,2 KB (7,9 KB com gzip; o teto é 30 KB e 10 KB), sem contar o GA4, que só vem depois do aceite.
- **Capturas** em `relatorios/ticket-13/` (roteiro `ticket-13`). O roteiro de capturas também entra com a resposta ao aviso já dada, salvo nas capturas marcadas com `avisoDeCookies`.
- **Ficou de fora,** pelo processo curto: o Lighthouse e a rodada de `code-review`, que voltam no ticket 17.
