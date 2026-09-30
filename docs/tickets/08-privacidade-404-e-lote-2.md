# 08: Política de privacidade, 404 e lote 2

**O que construir:** a política de privacidade nova, curta e só sobre o site, a 404 que leva aos serviços, e o lote 2 para a Daniella.

**Depende de:** 04 (e 05, 06 e 07 para o lote).

**Horas:** 3. **Semana:** 3.

**Situação:** feito em 30/09/2026, adiantado da semana 3, sem o lote 2. O Maxwell decidiu em 30/09 que o lote sai quando o 05 a 07 ficarem prontos.

- [x] `/politica-de-privacidade/` explica o que o formulário coleta e o registro do consentimento, o GA4 só depois do aceite, o que fica no navegador, quem recebe os dados (o serviço de formulário, o Google, a hospedagem e o WhatsApp), por quanto tempo, os direitos e o canal do titular.
- [x] Razão social, CNPJ e canal ficam como pendência até a Daniella responder. A entrega avisa que a política passa pelo advogado da 9vee.
- [x] O rodapé aponta para a política nova, na mesma aba.
- [x] A política tem trilha, como toda página interna (o teste do HTML exige). O `Base` monta o `BreadcrumbList` pelo endereço, e o `trilhaDoCaminho` (`src/lib/trilha.ts`) tira o nome do menu, onde a política não está: ele passa a ler também os links do rodapé. A trilha de hoje só tem cores para o hero escuro; numa página de texto, ela precisa das cores do fundo claro.
- [x] A 404 mostra os caminhos para os serviços e não tem canonical.
- [ ] `docs/revisao-daniella/lote-2.md` com Tradução, LMS, Quem Somos, privacidade e 404. Fica para quando o 05 a 07 ficarem prontos.

**Como ficou:**

- **Conteúdo:** `content/politica-de-privacidade.md`, numa coleção própria (`privacidade`): título, apoio, as seções e a versão. Cada seção é uma sequência de parágrafos e listas, na ordem do arquivo. São sete: quem cuida dos dados, o pedido de contato, o WhatsApp, a estatística de visitas, o navegador, a hospedagem e os direitos. Os direitos são os do art. 18 da LGPD, um por item, com a ANPD para a reclamação.
- **Fatos conferidos em 30/09:**
  - a Web3Forms é da Web3Creative, que opera da Índia, com servidores na AWS, na Cloudflare e na Hetzner. Pela política dela, de 13/07/2026, ela guarda o envio por até 3 anos e passa o IP e o e-mail de quem envia ao CleanTalk e ao Akismet;
  - o Google Analytics grava o `_ga` e o `_ga_<id>`, que duram 2 anos. A propriedade padrão guarda os dados por 2 ou 14 meses, e a política diz "até 14 meses", que vale para as duas opções;
  - o e-mail da 9vee (MX `mail.9vee.com.br`) fica na HostGator, num servidor em Vinhedo (SP). Por isso a política só diz "fora do Brasil" da Web3Forms e do Google.
- **Pendências:** seis, todas da Daniella. A razão social, o CNPJ e o canal do titular são a pergunta 25. A data da versão, que sai depois da revisão do advogado, é a 26. Os prazos de guarda dos pedidos e dos registros de acesso são a 27, a única pergunta nova: a mensagem de pendências ganhou essa pergunta, e as seguintes andaram um número.
- **O que o 12 e o 13 revisam:** a política já descreve o envio pela Web3Forms e o aviso de cookies como a spec os define. O 12 confere o parágrafo do pedido, e troca a Web3Forms pela Formspark se o plano B entrar. O 13 confere os da estatística e do navegador e cria o link "Preferências de cookies" do rodapé, que o texto já cita.
- **Sem foro:** a política atual do Wix elege o foro de Arapoti (PR). A nova trata só dos dados e não fala de foro; a pergunta 26 deixa com o advogado decidir se ele volta.
- **Página:** `src/pages/politica-de-privacidade.astro`, uma página de texto no fundo claro, sem hero, sem foto e sem o círculo da marca. O teste do círculo deixa a política de fora, como a 404. O título usa o `--t-2`, e o texto corre na medida de leitura (`--medida`). Cada seção tem âncora (`#pedido`, `#estatistica`...), para a caixa de consentimento do 12 e o aviso do 13 levarem direto ao trecho.
- **Trilha:** o `trilhaDoCaminho` lê também o link do rodapé, de onde vem o nome da política. A `Trilha` ganhou as cores do fundo claro; as do hero escuro valem dentro do `.escuro`.
- **Rodapé:** o link vai para `/politica-de-privacidade/`, na mesma aba, sem o aviso de nova aba.
- **404:** mostra os dois grupos do menu, cada um com o grifo da cor do público, e o nome e a descrição de cada link, como no painel do cabeçalho. Continua sem canonical e sem trilha.
- **WhatsApp:** o botão da política diz "Vim pela página Política de Privacidade do site", pelo `paginas.privacidade` de `content/site.md`.
- **Testes:** `tests/dist/privacidade-e-404.test.ts` confere quem recebe os dados, a ANPD, as três pendências da Daniella, o link do rodapé em toda página e os caminhos da 404. O teste da trilha cobre o nome que vem do rodapé, e o de larguras passa pela política e pela 404 nas cinco larguras. O `scripts/pendencias.ts` conhece a página nova.
