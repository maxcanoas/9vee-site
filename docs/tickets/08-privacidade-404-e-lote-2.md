# 08: Política de privacidade, 404 e lote 2

**O que construir:** a política de privacidade nova, curta e só sobre o site, a 404 que leva aos serviços, e o lote 2 para a Daniella.

**Depende de:** 04 (e 05, 06 e 07 para o lote).

**Horas:** 3. **Semana:** 3.

**Situação:** ready-for-agent

- [ ] `/politica-de-privacidade/` explica o que o formulário coleta e o registro do consentimento, o GA4 só depois do aceite, o que fica no navegador, quem recebe os dados (o serviço de formulário, o Google, a hospedagem e o WhatsApp), por quanto tempo, os direitos e o canal do titular.
- [ ] Razão social, CNPJ e canal ficam como pendência até a Daniella responder. A entrega avisa que a política passa pelo advogado da 9vee.
- [ ] O rodapé aponta para a política nova, na mesma aba.
- [ ] A política tem trilha, como toda página interna (o teste do HTML exige). O `Base` monta o `BreadcrumbList` pelo endereço, e o `trilhaDoCaminho` (`src/lib/trilha.ts`) tira o nome do menu, onde a política não está: ele passa a ler também os links do rodapé. A trilha de hoje só tem cores para o hero escuro; numa página de texto, ela precisa das cores do fundo claro.
- [ ] A 404 mostra os caminhos para os serviços e não tem canonical.
- [ ] `docs/revisao-daniella/lote-2.md` com Tradução, LMS, Quem Somos, privacidade e 404.
