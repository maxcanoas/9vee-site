# 08: Política de privacidade, 404 e lote 2

**O que construir:** a política de privacidade nova, curta e só sobre o site, a 404 que leva aos serviços, e o lote 2 para a Daniella.

**Depende de:** 04 (e 05, 06, 07 e 21 para o lote).

**Horas:** 3. **Semana:** 3 (o lote 2, na semana 4).

**Situação:** feito em 30/09/2026, adiantado da semana 3, sem o lote 2. O Maxwell decidiu em 30/09 que o lote sai quando o 05 a 07 ficarem prontos. Com o reaproveitamento do site atual, decidido no mesmo dia, o lote esperou também o 21 e passou a incluir a página de interpretação de mandarim. O lote 2 saiu em 02/10/2026, no fechamento do ticket 22.

- [x] `/politica-de-privacidade/` explica o que o formulário coleta e o registro do consentimento, o GA4 só depois do aceite, o que fica no navegador, quem recebe os dados (o serviço de formulário, o Google, a hospedagem e o WhatsApp), por quanto tempo, os direitos e o canal do titular.
- [x] Razão social, CNPJ e canal ficam como pendência até a Daniella responder. A entrega avisa que a política passa pelo advogado da 9vee.
- [x] O rodapé aponta para a política nova, na mesma aba.
- [x] A política tem trilha, como toda página interna (o teste do HTML exige). O `Base` monta o `BreadcrumbList` pelo endereço, e o `trilhaDoCaminho` (`src/lib/trilha.ts`) tira o nome do menu, onde a política não está: ele passa a ler também os links do rodapé. A trilha de hoje só tem cores para o hero escuro; numa página de texto, ela precisa das cores do fundo claro.
- [x] A 404 mostra os caminhos para os serviços e não tem canonical.
- [x] `docs/revisao-daniella/lote-2.md` com Tradução, LMS, Quem Somos, interpretação de mandarim, privacidade e 404. Saiu em 02/10/2026, com o 05, o 06, o 07 e o 21 prontos, no fechamento do reaproveitamento, junto com os lotes 1 e 3 gerados de novo.

**Como ficou:**

- **Conteúdo:** `content/politica-de-privacidade.md`, numa coleção própria (`privacidade`): título, apoio, as seções e a versão. Cada seção é uma sequência de parágrafos e listas, na ordem do arquivo. São sete: quem cuida dos dados, o pedido de contato, o WhatsApp, a estatística de visitas, o navegador, a hospedagem e os direitos. Os direitos são os do art. 18 da LGPD, um por item, com a ANPD para a reclamação.
- **Fatos conferidos em 30/09:**
  - a Web3Forms é da Web3Creative, que opera da Índia, com servidores na AWS, na Cloudflare e na Hetzner. Pela política dela, de 13/07/2026, ela guarda o envio por até 3 anos e passa o IP e o e-mail de quem envia ao CleanTalk e ao Akismet;
  - o Google Analytics grava o `_ga` e o `_ga_<id>`, que duram 2 anos. A propriedade padrão guarda os dados por 2 ou 14 meses, e a política diz "até 14 meses", que vale para as duas opções;
  - o e-mail da 9vee (MX `mail.9vee.com.br`) fica na HostGator, num servidor em Vinhedo (SP). Por isso a política só diz "fora do Brasil" da Web3Forms e do Google.
- **Pendências:** sete, todas da Daniella. A razão social, o CNPJ e o canal do titular são a pergunta 25. A data da versão, que sai depois da revisão do advogado, é a 26. Os prazos de guarda dos pedidos, das conversas do WhatsApp e dos registros de acesso são a 27, a única pergunta nova: a mensagem de pendências ganhou essa pergunta, e as seguintes andaram um número.
- **O que o 12, o 13 e o 20 revisam** (cada um ganhou o item no próprio ticket):
  - a política já descreve o envio pela Web3Forms e o aviso de cookies como a spec os define. O 12 confere o parágrafo do pedido, e troca a Web3Forms pela Formspark se o plano B entrar;
  - o 13 confere os parágrafos da estatística e do navegador e cria o link "Preferências de cookies" do rodapé, que o texto já cita. Ele também desliga o clique de saída da medição otimizada do GA4: o link do WhatsApp leva o nome e a empresa no texto da mensagem, e a política promete que o nome e o contato não vão para o Google;
  - o 20 confere em que país fica o servidor do site na HostGator. A política só diz "fora do Brasil" da Web3Forms e do Google porque o servidor de e-mail da 9vee fica em Vinhedo; o do site ainda não existe.
- **Sem foro:** a política atual do Wix elege o foro de Arapoti (PR). A nova trata só dos dados e não fala de foro; a pergunta 26 deixa com o advogado decidir se ele volta.
- **Página:** `src/pages/politica-de-privacidade.astro`, uma página de texto no fundo claro, sem hero, sem foto e sem o círculo da marca. O teste do círculo deixa a política de fora, como a 404. O título usa o `--t-2`, e o texto corre na medida de leitura (`--medida`). Cada seção tem âncora (`#pedido`, `#estatistica`...), para a caixa de consentimento do 12 e o aviso do 13 levarem direto ao trecho.
- **Trilha:** o `trilhaDoCaminho` lê também o link do rodapé, de onde vem o nome da política. A `Trilha` ganhou as cores do fundo claro; as do hero escuro valem dentro do `.escuro`.
- **Rodapé:** o link vai para `/politica-de-privacidade/`, na mesma aba, sem o aviso de nova aba.
- **404:** mostra os dois grupos do menu, cada um com o grifo da cor do público, e o nome e a descrição de cada link. O link sai do `LinkDoMenu`, o mesmo componente do painel do computador e do menu do celular, que a revisão pediu para não copiar o desenho uma terceira vez. Continua sem canonical e sem trilha.
- **WhatsApp:** o botão da política diz "Vim pela página Política de Privacidade do site", pelo `paginas.privacidade` de `content/site.md`.
- **Testes:** `tests/dist/privacidade-e-404.test.ts` confere quem recebe os dados, a ANPD, as três pendências da Daniella, os rótulos da interface que a política cita entre aspas, o link do rodapé em toda página e os caminhos da 404. O teste da trilha cobre o nome que vem do rodapé, e o de larguras passa pela política e pela 404 nas cinco larguras. As páginas de texto, sem hero, ficam numa lista só (`PAGINAS_DE_TEXTO`, em `tests/conteudo.ts`). O `scripts/pendencias.ts` conhece a página nova.
