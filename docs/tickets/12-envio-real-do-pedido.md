# 12: Envio real do pedido

**O que construir:** a saída "Prefiro receber contato" passa a enviar de verdade, pela Web3Forms, com consentimento da LGPD, proteção contra robôs, assunto fácil de filtrar e o WhatsApp de reserva quando o envio falha.

**Depende de:** 01, 08.

**Horas:** 6,5. **Semana:** 4 (era a 5; subiu em 30/09/2026, depois dos tickets do reaproveitamento do site atual).

**Situação:** feito em 02/10/2026, adiantado da semana 4. Espera o ok do Maxwell e o teste à mão no preview publicado, que depende dele: publicar e conferir os e-mails na caixa de teste. Como é ticket de funcionalidade, os testes vieram antes do código e a suíte de navegador inteira rodou. Ficaram de fora o Lighthouse e a rodada de `code-review`, pelo processo curto de 02/10.

- [x] Antes de tudo: um envio de teste confirma que a Web3Forms aceita o endereço do preview (`workers.dev`) e o `localhost`. Aceitou os dois. O plano B (Formspark) não entrou.
- [x] O envio fica num módulo só; trocar de serviço é trocar esse módulo e as variáveis de ambiente.
- [x] Chave de teste no local e no preview (o e-mail do Maxwell) e chave de produção só no build de produção (contato@9vee.com.br). Nenhuma chave no Git. A chave de produção ainda não existe: criar a chave é item do ticket 20, e até lá a trava barra o build de produção.
- [x] Caixa de consentimento não marcada e obrigatória, com link para a política. O envio registra o texto aceito, a data e a hora com fuso e a página de origem.
- [x] Campo isca e tempo mínimo desde a abertura do pedido: envio de robô não chega.
- [x] Assunto `[Lead site] <Serviço> | <Empresa ou Pessoa física> | <nome>` e corpo com as respostas, o público, a página, o nome, o contato e o consentimento.
- [x] "Enviando", confirmação na tela sem o aviso de envio simulado e, na falha, uma mensagem clara com a saída pelo WhatsApp e a mensagem pronta.
- [x] Testes unitários do módulo, com o serviço simulado, e do navegador (certo, com erro e pela isca), escritos antes.
- [ ] Envio real no preview publicado: certo, com erro e pela isca, conferido no e-mail de teste. Falta a parte que depende do Maxwell: publicar o preview e conferir a caixa. O envio certo já saiu de verdade pelo site local, em 02/10 (ver "Como ficou").
- [x] A política de privacidade descreve o envio como ficou: o serviço (a Web3Forms), o que ele guarda e por quanto tempo. O link da caixa de consentimento leva a `/politica-de-privacidade/#pedido`.

**Como ficou:**

- **O teste do começo:** `scripts/teste-do-envio.ts` abre o `localhost` e o preview publicado no Chrome e manda um envio de cada um, com a chave do `.env.preview`. Os dois foram aceitos em 02/10 (HTTP 200).
  - O serviço recusa o Chrome sem janela: responde 403, sem os cabeçalhos que o navegador exige, e na página isso aparece como falha de rede. O script abre o Chrome com janela.
  - Fatos da documentação conferidos no mesmo dia: o envio pelo servidor e a restrição por domínio são do plano pago, e o plano grátis tem 250 envios por mês.
- **O módulo do serviço:** `src/lib/servico-de-formulario.ts`. Recebe o pedido pronto (assunto, remetente, linhas e o e-mail de resposta) e devolve se chegou. É o único arquivo que conhece a Web3Forms. Erro do serviço, rede caída, resposta que não é JSON, espera de mais de 15 segundos e build sem chave contam como "não chegou".
- **A montagem do e-mail:** `src/lib/envio.ts`, sem tela e sem rede.
  - O assunto sai do modelo de `content/site.md`: `[Lead site] NR-1 | Empresa | Metalúrgica Exemplo`. Quem fecha o assunto é a empresa, quando o pedido é dela, ou a pessoa.
  - O corpo vai um campo por linha, na ordem: público, serviço, as respostas, nome, WhatsApp ou e-mail, página de origem (o nome e o endereço), a frase do consentimento e a hora do aceite, em ISO com o fuso de quem enviou (`2026-10-02T11:11:37-03:00`).
  - Quando o contato é um e-mail, ele vai também como endereço de resposta: o comercial responde direto para a pessoa.
- **A chave:** `FORMULARIO_CHAVE`, lida do `.env` do modo e entregue ao script junto com os dados do pedido, no HTML. Os arquivos `.env.development` e `.env.preview` existem na máquina do Maxwell, fora do Git, com a chave de teste.
- **Na tela, dentro de "Prefiro receber contato":**
  - a caixa do consentimento, desmarcada: "Li a política de privacidade e concordo que a 9vee use estes dados para responder ao meu pedido.". O link abre a política em outra aba, no trecho do pedido, para a pessoa não perder o que preencheu. Sem a caixa marcada, o pedido não sai e o erro aparece nela;
  - cada abertura do pedido pede o consentimento de novo;
  - o botão vira "Enviando" enquanto o pedido sai. Um segundo toque não manda outro, e o drawer não fecha nesse intervalo;
  - a confirmação, "Pedido anotado.", com o resumo e sem o aviso de envio simulado;
  - a tela nova de quando o pedido não chega, "Não deu para enviar.", com "Mandar pelo WhatsApp" (a mesma mensagem pronta da outra saída) e "Tentar de novo", que volta ao pedido como a pessoa o deixou.
- **Contra robô, sem CAPTCHA:**
  - a isca é uma caixa que pessoa não vê nem alcança (`botcheck`, o nome que o serviço usa). Pedido com ela marcada não é enviado, e o robô vê a confirmação;
  - o tempo mínimo é de 3 segundos desde a abertura do pedido. Antes disso nada é enviado, e a tela mostra "Não deu para enviar.". Quem for gente toca em "Tentar de novo" e o pedido sai;
  - o filtro de spam do próprio serviço continua valendo.
- **Trava de produção:** regra nova, "Pedido sem destino". Ela barra o build de produção sem a chave, em que nenhum pedido chegaria, e o build com a chave de teste do `.env.preview`, em que os pedidos iriam para o e-mail do Maxwell. Hoje ela acusa, como esperado: a chave de produção entra no ticket 20. A regra das marcas do MVP ficou sem o que procurar, e o ticket 20 decide se ela sai.
- **Nenhum teste manda pedido de verdade:** o `test` de `tests/e2e/pedido.ts` responde no lugar do serviço em todo teste de navegador, e o roteiro de capturas faz o mesmo. Um teste unitário confere que nenhum arquivo de teste usa o `test` do Playwright direto.
- **Política de privacidade:** a seção "Quando você pede contato" já descrevia o envio como ele ficou (a caixa, a prova do consentimento, a Web3Forms, o que ela guarda e os filtros de spam). Não mudou.
- **Testes:**
  - unitários: 183 (eram 151), com a montagem do envio, o serviço simulado, a barreira contra robô e a regra nova da trava;
  - do HTML gerado: 1.242 (eram 1.150), com a caixa, a isca, a tela de falha e os dados do envio em toda página;
  - de navegador: a suíte inteira, 307 passaram. O arquivo novo, `tests/e2e/envio.spec.ts`, cobre o envio certo, o erro do serviço, a rede caída, a isca, a pressa, o "Enviando" e o consentimento, nos três perfis.
- **Envio de verdade, à mão:** um pedido completo saiu pelo site local em 02/10, com o Chrome de janela, e o serviço respondeu que chegou. O assunto foi `[Lead site] NR-1 | Empresa | Teste do site (pode apagar)`. Com os dois envios do teste do começo, são três e-mails de teste na caixa do Maxwell.
- **Capturas:** `relatorios/ticket-12/`, por `node scripts/screenshots.ts ticket-12`. São 7: a caixa do consentimento, o erro de quem não a marcou, a confirmação e a tela de falha.
- **Para o ticket 13:** o evento `lead_form_submit` dispara só quando o serviço responde que o pedido chegou, e não no caso da isca, que também mostra a confirmação.
- **O que falta, e depende do Maxwell:**
  - conferir na caixa de teste os três e-mails de 02/10, em especial o do pedido completo: se as linhas chegaram na ordem e legíveis;
  - publicar o preview e repetir à mão o envio certo, o com erro (com o aparelho sem rede, a tela de falha tem de aparecer) e o da isca.
- **O que ficou de fora, pelo processo curto de 02/10:** o Lighthouse e o `code-review` nos dois eixos. Entram na revisão final (ticket 17).
