# Medição do site da 9vee

O site mede os leads com o mesmo Google Analytics 4 que a 9vee já tem (`G-Y04K0CN1F9`), para o antes e o depois saírem do mesmo relatório. Ticket 13, feito em 05/10/2026.

## Quando o site mede

- O GA4 só carrega depois que a pessoa aceita a estatística no aviso de cookies. Quem recusa, ou não responde, não manda nada: o script do Google nem chega a ser pedido.
- O Consent Mode v2 nasce com tudo negado e o aceite libera só a estatística (`analytics_storage`). Os consentimentos de anúncio continuam negados, porque o site não faz anúncio.
- Quem aceita e depois recusa, pelo "Preferências de cookies" do rodapé, fica sem os cookies do Google (`_ga` e `_ga_...`), e o GA4 para naquela página.
- A resposta fica no navegador, com a data e a versão do aviso (`content/site.md`, `cookies.versao`). Mudou o texto do aviso ou o que o site mede, suba a versão: todo mundo vê o aviso de novo.
- Por isso o GA4 do site novo conta menos visitas que o do Wix, que contava todo visitante (`docs/antes.md`). Os leads não mudam de régua: eles vêm do e-mail e do WhatsApp, e não só do GA4.

## O ID por modo

| Modo | GA4 | De onde vem |
|---|---|---|
| Local (`npm run dev`) | a propriedade de teste do Maxwell, com o modo de depuração, para o DebugView | `GA4_ID` no `.env.development` |
| Preview (Cloudflare) | desligado, com ou sem ID | nenhum |
| Produção | a propriedade da 9vee | `GA4_ID` no `.env.producao` |

A trava de produção barra o build definitivo sem o ID e com o ID da propriedade de teste.

## Os três eventos

Todos levam só o serviço, o público e a página. O nome e o contato de quem pede nunca vão para o Google: a política de privacidade promete.

| Evento | O que quer dizer | Onde dispara | Parâmetros |
|---|---|---|---|
| `whatsapp_click` | Uma conversa aberta no WhatsApp | no atalho flutuante, em toda página; na saída "Falar agora no WhatsApp" do pedido; e na saída da tela de falha do envio. O "Abrir o WhatsApp de novo" não conta, porque é a mesma conversa | `servico`, `publico`, `pagina` |
| `lead_form_submit` | Um pedido que chegou à 9vee pelo "Prefiro receber contato" | só quando o serviço de formulário confirma a entrega. O envio que falha e o da isca contra robô não contam | `servico`, `publico`, `pagina` |
| `drawer_open` | Um pedido aberto na tela | quando o drawer abre, por qualquer botão | `servico`, `pagina` |

Os valores:

- `servico`: `idiomas`, `traducao`, `nr1` ou `lms`. No atalho flutuante é o serviço da página; na home, no Quem Somos e na política, onde a página não tem serviço, é `nenhum`.
- `publico`: `empresa` ou `voce`. Quem ainda não escolheu vai como `sem_escolha`.
- `pagina`: o nome da página, como a mensagem do WhatsApp diz: `inicial`, `Treinamento de NR-1`, `Cursos de Idiomas`, `Curso de inglês`, `Tradução Simultânea` e assim por diante.

`whatsapp_click` e `lead_form_submit` são os leads. `drawer_open` mostra quantos começam o pedido: comparado com os dois, diz onde o pedido perde gente.

## O que o Maxwell configura na propriedade

Com o acesso de editor ao GA4 da 9vee (pergunta 53 da segunda rodada). Os mesmos passos valem para a propriedade de teste.

1. **Desligar o clique de saída.** Em Administrador, Fluxos de dados, o fluxo da web, Medição otimizada, engrenagem: desligar "Cliques de saída" (Outbound clicks). Sem isso, o GA4 mandaria o endereço inteiro do link do WhatsApp, que leva o nome e a empresa no texto da mensagem. O gtag não tem como desligar isso pelo código.
2. **Segunda proteção, opcional.** No mesmo fluxo, em Redação de dados (Data redaction), incluir o parâmetro de consulta `text`. Se o clique de saída voltar a ser ligado por engano, a mensagem sai apagada.
3. **Marcar os leads.** Em Administrador, Exibição de dados, Eventos: marcar `whatsapp_click` e `lead_form_submit` como eventos principais (Key events). Os eventos só aparecem nessa lista depois do primeiro disparo.
4. **Criar as dimensões.** Em Administrador, Definições personalizadas, criar três dimensões personalizadas com escopo de evento: `servico`, `publico` e `pagina`, cada uma com o parâmetro de mesmo nome. Sem elas, os relatórios não mostram os parâmetros.

## Conferir no DebugView

1. Pôr o ID da propriedade de teste em `GA4_ID`, no `.env.development`.
2. `npm run dev`, abrir o site local e aceitar a estatística no aviso.
3. Em Administrador, DebugView, da propriedade de teste, conferir:
   - o `drawer_open` ao abrir o pedido, com o serviço e a página;
   - o `whatsapp_click` no atalho flutuante e na saída do pedido;
   - o `lead_form_submit` só no envio que chega (o envio local vai para o e-mail de teste);
   - nenhum evento `click` com o endereço do WhatsApp (`link_url` com `wa.me`). Se aparecer, o passo 1 da configuração não pegou.
4. Recusar pelo "Preferências de cookies" e conferir que nada mais chega.

## O relatório mensal de leads, por serviço e por público

Em Explorar, uma exploração livre:

- Técnica: tabela.
- Dimensões: Mês, Nome do evento, `servico` e `publico`.
- Métrica: Contagem de eventos.
- Linhas: `servico`. Colunas: `publico`.
- Filtro: Nome do evento é exatamente `whatsapp_click` ou `lead_form_submit` (dá para duplicar a aba, uma para cada).
- Intervalo: o mês fechado.

O mesmo quadro com `pagina` no lugar de `servico` mostra que páginas trazem os leads, inclusive as de idioma. Para comparar com o antes, use o mesmo intervalo do ano anterior, com a ressalva do aceite, acima.
