# 20: Produção pronta

**O que construir:** o build de produção passando na trava, medido, testado em aparelho de verdade e documentado, pronto para ir ao ar quando o acesso à HostGator chegar.

**Depende de:** todos os anteriores.

**Horas:** 7,75. **Semana:** 8.

**Situação:** em andamento desde 09/10/2026, adiantado da semana 8: o checklist de lançamento, o README, o teclado e o leitor de tela e o Lighthouse estão feitos. O resto espera os acessos e as respostas da 9vee, ou é medição e conferência que ficam para perto do lançamento.

- [ ] As pendências abertas decididas pelo Maxwell e aplicadas. **Decididas em 07/10/2026:** o que a 9vee não tiver respondido até a semana 8 segue a sugestão de `docs/pendencias-decisao.md`, que o Maxwell aprovou.
- [ ] `npm run build:producao` passa no `check:producao`.
- [ ] A chave de produção do pedido: criada na Web3Forms com o contato@9vee.com.br (quem recebe o e-mail com a chave é a 9vee) e gravada no `.env.producao`, em `FORMULARIO_CHAVE`. Sem ela, a trava barra o build, e ela também barra a chave de teste. Depois, um pedido de verdade pelo build de produção, conferido na caixa da 9vee.
- [ ] **Bloqueia a publicação:** na propriedade do GA4 da 9vee (`G-Y04K0CN1F9`), o clique de saída da medição otimizada desligado e o parâmetro `text` na redação de dados, como manda `docs/medicao.md` ("O que o Maxwell configura na propriedade", passos 1 e 2). Conferido no DebugView: o clique no atalho do WhatsApp não manda o endereço do link. Sem isso, o texto da mensagem, com o nome e a empresa, chega ao Google, e a política promete que não chega. A trava não enxerga a propriedade, então este passo é à mão (code-review do ticket 17, 07/10/2026).
- [ ] A regra da trava para as marcas do MVP (`obra`) ficou sem o que procurar: a etiqueta de obra saiu no ticket 07, e o aviso de envio simulado, no 12. Decidir se ela sai da trava e da spec.
- [x] Lighthouse mobile de todas as páginas, no build de produção rodando local, com os números em `docs/lighthouse.md` e as metas batidas. Feito em 09/10/2026: as 26 páginas batem as metas (Performance de 97 a 100, as outras três notas em 100, LCP até 1,96 s, CLS 0,017). Medir de novo no lançamento, na HostGator.
- [x] Teclado e leitor de tela conferidos no drawer e no aviso de cookies. Feito em 09/10/2026. Teclado: o pedido inteiro e o aviso pelas preferências, só com Tab, Espaço e Enter, viraram teste (`tests/e2e/teclado.spec.ts`); o que já havia de foco, Tab que dá a volta e Esc está em `contato.spec.ts` e `cookies.spec.ts`. Leitor de tela, pela árvore de acessibilidade que ele lê: o drawer é um diálogo com nome, cada grupo de opções tem o nome da pergunta e o erro ligado (`aria-describedby`), o campo errado sai marcado como inválido e recebe o foco, o "Passo X de Y" é anunciado sozinho, e o foco vai ao título da confirmação e da falha. Um ajuste: as duas caixas do aviso de cookies tinham a explicação inteira como nome; agora o nome é a categoria, e a explicação é a descrição. O leitor de tela de verdade fica no teste em aparelho, abaixo.
- [ ] Teste em Android e iPhone de verdade pelo preview: WhatsApp, drawer e formulário. Junto, um minuto do pedido com o TalkBack (Android) e o VoiceOver (iPhone) ligados, o leitor de tela de verdade.
- [ ] A prévia de cada página conferida no WhatsApp, já no domínio (ticket 18): no preview ela não aparece, porque o Open Graph aponta sempre para www.9vee.com.br.
- [ ] O `.htaccess` testado na HostGator (ticket 19): uma amostra do mapa com `curl -I` (301 num salto, 410), http e sem www, a barra no fim, a compressão e o cache. Se o `Options` der erro 500, a linha sai do `scripts/htaccess.ts`.
- [x] `docs/checklist-lancamento.md` com os passos do brief e os da spec. Feito em 09/10/2026, com a zona DNS de 29/09, o teste do site novo antes da troca do DNS (`curl --resolve`) e a volta para o Wix se algo der errado.
- [ ] Conferir em que país fica o servidor do site na HostGator. A política de privacidade só diz "fora do Brasil" da Web3Forms e do Google porque o servidor de e-mail da 9vee fica em Vinhedo (SP); se o do site ficar fora, a seção da hospedagem muda.
- [x] `README.md` de entrega. Feito em 09/10/2026, com os itens do brief (item 15) e da spec.
