# 12: Envio real do pedido

**O que construir:** a saída "Prefiro receber contato" passa a enviar de verdade, pela Web3Forms, com consentimento da LGPD, proteção contra robôs, assunto fácil de filtrar e o WhatsApp de reserva quando o envio falha.

**Depende de:** 01, 08.

**Horas:** 6,5. **Semana:** 5 (pode subir para a 4, porque não depende do cliente).

**Situação:** ready-for-agent

- [ ] Antes de tudo: um envio de teste confirma que a Web3Forms aceita o endereço do preview (`workers.dev`) e o `localhost`. Se recusar, parar e pedir ok para o plano B (Formspark).
- [ ] O envio fica num módulo só; trocar de serviço é trocar esse módulo e as variáveis de ambiente.
- [ ] Chave de teste no local e no preview (o e-mail do Maxwell) e chave de produção só no build de produção (contato@9vee.com.br). Nenhuma chave no Git.
- [ ] Caixa de consentimento não marcada e obrigatória, com link para a política. O envio registra o texto aceito, a data e a hora com fuso e a página de origem.
- [ ] Campo isca e tempo mínimo desde a abertura do pedido: envio de robô não chega.
- [ ] Assunto `[Lead site] <Serviço> | <Empresa ou Pessoa física> | <nome>` e corpo com as respostas, o público, a página, o nome, o contato e o consentimento.
- [ ] "Enviando", confirmação na tela sem o aviso de envio simulado e, na falha, uma mensagem clara com a saída pelo WhatsApp e a mensagem pronta.
- [ ] Testes unitários do módulo, com o serviço simulado, e do navegador (certo, com erro e pela isca), escritos antes.
- [ ] Envio real no preview publicado: certo, com erro e pela isca, conferido no e-mail de teste.
- [ ] A política de privacidade descreve o envio como ficou: o serviço (a Web3Forms, ou a Formspark se o plano B entrar), o que ele guarda e por quanto tempo. O link da caixa de consentimento leva a `/politica-de-privacidade/#pedido`.
