# 13: Aviso de cookies, GA4 e eventos

**O que construir:** o aviso de cookies com "Aceitar", "Recusar" e "Preferências", o mesmo GA4 da 9vee com Consent Mode v2, e os três eventos que medem os leads.

**Depende de:** 01, 08, 12.

**Horas:** 6,5. **Semana:** 6.

**Situação:** ready-for-agent

- [ ] Aviso com "Aceitar", "Recusar" e "Preferências", com o mesmo peso visual; preferências com necessários (sempre ligados) e estatística; a escolha fica no navegador, com data e versão; um link no rodapé reabre.
- [ ] Teclado e leitor de tela: foco visível, ordem certa, rótulos claros, sem prender o foco da página.
- [ ] Consent Mode v2 com tudo negado por padrão. O GA4 só carrega depois do aceite, e o aceite libera só a estatística. Quem recusa não manda nada.
- [ ] ID do GA4 por variável: a produção usa o da 9vee, o local usa a propriedade de teste, o preview fica sem GA4.
- [ ] `whatsapp_click`, `lead_form_submit` (só no envio certo) e `drawer_open`, com os parâmetros certos, testados no navegador com o GA4 interceptado.
- [ ] O JavaScript inicial continua abaixo do teto, sem contar o GA4.
- [ ] Eventos conferidos no DebugView, com a propriedade de teste.
- [ ] `docs/medicao.md`: o que cada evento significa, onde dispara, como marcar os dois principais no GA4 e como montar o relatório mensal por serviço e por público.
- [ ] A política de privacidade descreve o aviso e o GA4 como ficaram.
