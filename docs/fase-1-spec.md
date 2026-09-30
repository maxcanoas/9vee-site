# Spec: Fase 1 do site da 9vee, do MVP aprovado ao site pronto para lançar

- **Data:** 29/09/2026
- **Autor:** Maxwell Rigo Moraes (DEVMRMORAES)
- **Decisores:** Daniella e Arthur, da 9vee
- **Origem:**
  - a proposta aceita de 23/09/2026 (`docs/Proposta9vee-v2.pdf`), que manda sobre o resto;
  - o brief da Fase 1 (`docs/prompt-fase-1.md`);
  - a spec do MVP (`docs/mvp-spec.md`) e os padrões (`docs/padroes.md`), que continuam valendo;
  - o diagnóstico de 29/09/2026: `docs/gap-fase-1.md`, `docs/wix-inventario.md` e `docs/urls-site-atual.csv`;
  - a rodada de perguntas de 29/09/2026, cujas decisões estão abaixo.

## Glossário

Os termos do MVP continuam: público, lead quente, drawer de contato, saídas do drawer, pendência e Placeholder. Entram estes:

- **Modo de build:** local (o desenvolvimento, com tudo liberado), preview (o que o Maxwell publica no Cloudflare para o cliente acompanhar) e produção (o site definitivo, que só sai se passar na trava).
- **Trava de produção:** o `check:producao`. Faz o build de produção falhar se encontrar pendência, Placeholder, etiqueta de obra, noindex, travessão no texto ou link interno quebrado.
- **Página de idioma:** uma página por idioma, dentro de Cursos de Idiomas, com conteúdo próprio daquele idioma.
- **Página de cidade:** uma página por cidade de atendimento presencial, feita só com fato local.
- **Publicada:** a marca de cada página de idioma e de cidade que diz se ela entra no build de produção. No preview, todas aparecem, publicadas ou não.
- **Lote de revisão:** o texto limpo de um grupo de páginas, sem código e na ordem da página, para a Daniella aprovar.
- **Retrato do antes:** o registro do site atual (Lighthouse e números do painel) para o relatório de entrega.
- **Mapa de redirecionamentos:** o `docs/redirects.csv`, com destino, tipo e motivo de cada URL do site atual.
- **Envio:** o módulo que manda o pedido de contato para o serviço de formulário.
- **Consentimento:** a caixa da LGPD no pedido e o registro do que foi aceito.
- **Aviso de cookies:** a faixa com "Aceitar", "Recusar" e "Preferências".
- **Evento principal:** o evento do GA4 que conta como conversão.

## Problem Statement

**Do ponto de vista da Daniella e do Arthur,** o MVP convenceu, mas ainda é demonstração:

- três páginas estão pela metade;
- o pedido de contato não envia nada;
- não há medição de lead;
- os idiomas que a 9vee ensina não têm página própria;
- o site oficial continua no Wix, com 505 posts de blog em molde de cidade, programas de modelo indexados e nenhuma conversão configurada.

A Daniella quer leads e o site bem posicionado no Google. O Arthur quer cada idioma bem apresentado, e o agendamento, que fica para a Fase 2. Os dois precisam que a troca de plataforma não derrube o que o domínio já tem no Google nem o e-mail da empresa.

**Do ponto de vista do visitante:**

- **A empresa** quer entender cada serviço a fundo e pedir orçamento com a certeza de que o pedido chegou.
- **A pessoa física** quer uma página do idioma dela, e não uma lista.
- **Quem chega por um link antigo** quer cair na página certa, e não num erro.

**Do ponto de vista do Maxwell,** em 8 semanas e com 11 a 12 horas por semana:

- entregar o site completo e pronto para ir ao ar, sem acesso à HostGator nesta rodada;
- provar leads com números, porque a mensalidade depende disso;
- mexer no Wix só para ler.

## Solution

O site em código, o mesmo do MVP (Astro com saída estática), completo e pronto para substituir o Wix:

- **Três modos de build, com a trava de produção.** O preview continua no mesmo endereço do Cloudflare, publicado pelo Maxwell, para a Daniella e o Arthur acompanharem.
- **As seis páginas completas:** Home, Treinamento de NR-1 e Cursos de Idiomas fechadas; Tradução Simultânea, LMS e Quem Somos terminadas, sem a etiqueta de obra. Mais a política de privacidade e a 404.
- **Páginas por idioma e por cidade,** cada uma só com conteúdo próprio. As que não tiverem fato confirmado ficam fora do build de produção, sem sumir do preview.
- **Pedido de contato com envio de verdade:**
  - pelo mesmo drawer, com o mesmo WhatsApp;
  - com consentimento da LGPD registrado e proteção contra robôs;
  - com assunto fácil de filtrar e confirmação na tela;
  - com o WhatsApp de reserva quando o envio falha.
- **Medição:** o mesmo GA4 que a 9vee já tem, com Consent Mode v2, aviso de cookies e três eventos.
- **SEO técnico completo em todas as páginas,** sempre com o domínio definitivo.
- **A troca preparada, sem executar nada:** o retrato do antes, o arquivo do blog, o mapa de redirecionamentos, o gerador do `.htaccess`, a lista de remoções e o checklist de lançamento.
- **Entrega:** textos revisados pela Daniella em lotes e o README de entrega.

## User Stories

### Visitante empresa

1. Como gestora de RH, quero pedir orçamento sem sair da página e ver que o pedido chegou, para não precisar ligar.
2. Como gestora de RH, quero ver na confirmação o resumo do que pedi, para guardar o que foi enviado.
3. Como visitante empresa, quero que, se o envio falhar, o site me ofereça o WhatsApp com a mensagem pronta, para o pedido não se perder.
4. Como responsável por um evento, quero ler na página de Tradução Simultânea os formatos, o equipamento, os idiomas e como funciona o presencial, para decidir se peço orçamento.
5. Como responsável por uma visita de investidores chineses, quero ver que a 9vee tem intérpretes de mandarim para o mercado financeiro, para saber que ela entende o meu caso.
6. Como responsável por treinamento, quero entender na página de LMS o que a plataforma entrega e o que o RH acompanha, para comparar com o que uso hoje.
7. Como diretor, quero saber na página Quem Somos quem está por trás da 9vee e há quanto tempo ela atua, para confiar.
8. Como organizador de evento em São Paulo, quero achar uma página que diga o que a 9vee faz presencialmente na minha cidade.
9. Como gestora de RH, quero pedir aulas de um idioma para a equipe a partir da página daquele idioma, com o idioma já marcado no pedido.
10. Como gestor de uma empresa que trouxe um profissional estrangeiro, quero achar o português para estrangeiros e, se a 9vee oferecer, o apoio à realocação.
11. Como visitante empresa que chegou por um link antigo de um post do blog, quero cair na página certa do serviço, e não num erro.

### Visitante pessoa física

12. Como pessoa que quer aprender japonês, quero uma página só do japonês, com níveis, formatos e as perguntas de quem estuda japonês.
13. Como aluno em potencial, quero ver no topo da página a saudação do idioma na escrita dele, para saber que estou no lugar certo.
14. Como candidato ao DELE, quero ver na página do espanhol que a 9vee prepara para essa prova.
15. Como estrangeiro que mora no Brasil, quero a página de português para estrangeiros, com a preparação para o CELPE-Bras.
16. Como pessoa que mora em Curitiba, quero saber se há atendimento presencial na minha cidade.
17. Como aluno em potencial, quero ir da página do idioma para o pedido com o idioma marcado, e para a página da minha cidade, se ela existir.
18. Como visitante que chegou por um post antigo sobre "curso de holandês em Recife", quero cair na página do holandês.

### Todos os visitantes

19. Como visitante, quero decidir se aceito os cookies de estatística, com "Recusar" tão fácil quanto "Aceitar".
20. Como visitante que recusou, quero que nenhum dado da minha navegação vá para o Google.
21. Como visitante, quero mudar a minha escolha de cookies depois, por um link no rodapé.
22. Como visitante que navega pelo teclado, quero usar o aviso de cookies e as preferências sem mouse, com o foco visível.
23. Como usuário de leitor de tela, quero que o aviso de cookies seja anunciado e que cada opção tenha um rótulo claro.
24. Como visitante que envia um pedido, quero saber que concordo com a política de privacidade, com o link para ela, antes de enviar.
25. Como titular de dados, quero uma política de privacidade curta que diga o que o site coleta, para quem vai, por quanto tempo e como pedir a exclusão.
26. Como visitante que digitou um endereço errado, quero uma página de erro que me leve aos serviços.
27. Como visitante no celular, quero que cada página carregue rápido no 4G e não pule enquanto carrega.
28. Como visitante, quero ver a trilha de onde estou, como "Início > Cursos de idiomas > Inglês".
29. Como visitante que compartilha uma página no WhatsApp, quero que a prévia mostre o título daquela página.

### Comercial da 9vee

30. Como atendente, quero receber cada pedido no contato@9vee.com.br com o assunto no formato "[Lead site] NR-1 | Empresa | Nome da empresa", para filtrar e priorizar.
31. Como atendente, quero que o e-mail traga todas as respostas organizadas, a página de origem, o público, o nome e o contato.
32. Como atendente, quero que nenhum envio de teste caia na caixa da 9vee.
33. Como atendente, quero que robôs não encham a caixa de pedidos falsos.
34. Como responsável pela LGPD, quero que cada pedido registre o texto aceito, a data e a hora e a página de origem, para provar o consentimento.

### Daniella

35. Como decisora, quero ver no GA4 quantos pedidos e quantas conversas no WhatsApp vieram de cada serviço e de cada público, por mês.
36. Como decisora, quero acompanhar o site novo pelo link do preview, com um resumo curto do que mudou a cada semana.
37. Como decisora, quero revisar e aprovar os textos em lotes, sem código, na ordem em que aparecem na página.
38. Como decisora, quero ver no preview, marcado, o que ainda falta confirmar, para responder.
39. Como decisora, quero que nenhum texto vá ao ar sem a minha aprovação por escrito.
40. Como decisora, quero o relatório de entrega com o antes e o depois de cada item da proposta.
41. Como decisora, quero que a troca do Wix não derrube o e-mail da 9vee.

### Arthur

42. Como decisor, quero que cada idioma que a 9vee ensina tenha uma página própria com a informação real das aulas.
43. Como titular do domínio, quero que a troca tenha um checklist claro, do DNS ao cancelamento do Wix, para autorizar cada passo.

### Maxwell: busca

44. Como Maxwell, quero canonical, sitemap e Open Graph sempre com `https://www.9vee.com.br`, nunca com o endereço do preview.
45. Como Maxwell, quero JSON-LD de organização sem endereço, de serviço, de curso, de FAQ e de trilha, conforme o tipo da página.
46. Como Maxwell, quero que o preview nunca seja indexado e que a produção nunca saia com noindex.
47. Como Maxwell, quero que o Search Console continue verificado depois da troca.
48. Como Maxwell, quero que o sitemap de produção liste só as páginas publicadas.

### Maxwell: desenvolvimento e publicação

49. Como Maxwell, quero um comando para cada modo de build.
50. Como Maxwell, quero que o build de produção falhe se sobrar pendência, Placeholder, etiqueta de obra, noindex, travessão ou link quebrado.
51. Como Maxwell, quero publicar o preview no mesmo endereço do Cloudflare com um build e um deploy.
52. Como Maxwell, quero que nenhuma credencial vá para o Git, com um `.env.example` sem valores.
53. Como Maxwell, quero trocar o serviço de formulário mexendo num arquivo só.
54. Como Maxwell, quero marcar uma página de idioma ou de cidade como não publicada e vê-la sumir do build de produção, do menu e do sitemap, sem apagar o texto.
55. Como Maxwell, quero testar os eventos localmente numa propriedade de teste, no DebugView, sem sujar os dados da 9vee.
56. Como Maxwell, quero o Lighthouse de todas as páginas num relatório versionado.
57. Como Maxwell, quero gerar os lotes de revisão da Daniella a partir dos textos, sem copiar à mão.
58. Como Maxwell, quero o retrato do antes guardado antes de o Wix sair.

### Maxwell: migração

59. Como Maxwell, quero um arquivo com título, URL, data e texto de cada post do blog, para o blog poder voltar depois.
60. Como Maxwell, quero o mapa de redirecionamentos para revisar antes de gerar as regras.
61. Como Maxwell, quero gerar as regras do `.htaccess` a partir do mapa aprovado, com teste, para usar no lançamento.
62. Como Maxwell, quero a lista das URLs que ficam 410 pronta para as remoções temporárias no Search Console.
63. Como Maxwell, quero um checklist de lançamento com cada passo da troca.
64. Como Maxwell, quero um README que explique como rodar, publicar, trocar texto e imagem, e o que ficou para depois.

## Implementation Decisions

### Stack, ambientes e modos de build

- A stack é a do MVP: Astro com saída estática, CSS com custom properties e TypeScript só nas partes interativas. Sem GSAP, sem framework de interface e sem nada que dependa de servidor. Nada exclusivo do Cloudflare no código do site: o site precisa rodar igual no Cloudflare, na HostGator e localmente.
- O fluxo de trabalho continua o do MVP: o Maxwell testa localmente com `npm run dev` (e `npm run dev -- --host` no celular), gera o build de preview, publica no Cloudflare e manda o link ao cliente.
- Uma variável de ambiente escolhe o modo, e cada modo tem o seu comando: `npm run dev`, `npm run build:preview` e `npm run build:producao`.

| | Local | Preview | Produção |
|---|---|---|---|
| Indexação | noindex | noindex na meta e no cabeçalho | sem noindex |
| robots.txt | libera | libera, sem sitemap | libera, com o sitemap |
| Pendências | visíveis | visíveis, com destaque discreto | barradas pela trava |
| Páginas não publicadas | aparecem | aparecem | ficam fora (menu, links, sitemap) |
| GA4 | propriedade de teste do Maxwell | desligado | a propriedade da 9vee |
| Envio do formulário | chave de teste | chave de teste (e-mail do Maxwell) | chave de produção (contato@9vee.com.br) |

- O robots do preview libera, e o noindex vai na meta e no cabeçalho, como no MVP. Decidido na rodada de 29/09: com o robots bloqueando, o Google não leria o noindex.
- Canonical, Open Graph e sitemap usam sempre `https://www.9vee.com.br`, em todos os modos. Todo endereço termina com barra. A página de erro não tem canonical nem `og:url`.
- As credenciais (a chave do serviço de formulário e o ID do GA4) vêm de arquivos `.env`, fora do Git, um por modo: `.env.development`, `.env.preview` e `.env.producao`. O `.env.example` lista as variáveis sem valores e explica que o modo vem do comando, e não do arquivo. A regra do `.gitignore` que escondia também o exemplo foi corrigida.
- O build recusa o `.env` e o `.env.local`, que valeriam para todos os modos e levariam a chave de um ambiente para o outro, e recusa o `--mode` solto, que leria o `.env` de um modo e construiria outro.
- A produção sai em `dist-producao/`, e o preview em `dist/`, que é a pasta que o `wrangler` publica. O `npm run build` é o mesmo que o `build:preview`, para um build solto nunca sair indexável nessa pasta. O `npm run preview` serve o `dist-producao/` localmente, que é o uso que o brief dá a ele: conferir e medir a produção.
- A chave do serviço de formulário acaba no JavaScript publicado, porque o envio sai do navegador. É assim que esses serviços funcionam: a chave só permite mandar para o e-mail dela.
- **Trava de produção:** o `check:producao` roda sobre o build de produção e falha se encontrar:
  - pendência, no HTML (a marca na tela ou o `[CONFIRMAR` cru) ou na fonte, em `content/`, porque a faixa de números e o texto puro do título, da descrição e do JSON-LD não deixam marca no HTML;
  - o Placeholder de imagem;
  - as marcas do MVP: a etiqueta de obra e o aviso "MVP: envio simulado" do pedido;
  - noindex, na meta ou no cabeçalho;
  - travessão ou meia-risca em qualquer parte do HTML (texto, atributos e JSON-LD);
  - link interno quebrado, sem barra no fim ou com âncora que não existe.
- As palavras proibidas e o resto dos padrões continuam nos testes do HTML gerado, como no MVP.

### Páginas

- **Home, NR-1 e Cursos de Idiomas** são fechadas com as respostas do cliente. Na home, os 14 idiomas passam a levar à página de cada idioma publicado; os não publicados levam à âncora na página de cursos. Não houve pedido de ajuste do cliente além da rodada de 23/09, já aplicada.
- **Tradução Simultânea** ganha a página completa: formatos, equipamento, idiomas, como funciona o presencial, perguntas frequentes e prova. Também ganha uma seção sobre interpretação de mandarim para o mercado financeiro, se a Daniella confirmar os fatos da landing atual. É para essa página que as três landings `mandarim-*` redirecionam.
- **LMS e Quem Somos** ficam completas, com o que o cliente confirmar. Quem Somos não fala em sede física: a 9vee não tem endereço aberto ao público. Sai "sede em São Paulo".
- **Política de privacidade:** nova, curta e só sobre o site.
  - Trata do formulário e do registro do consentimento, do GA4 depois do aceite, do que fica no navegador (a escolha de público e a de cookies), de quem recebe os dados (o serviço de formulário, o Google, a hospedagem e o WhatsApp, quando a pessoa escolhe), por quanto tempo, dos direitos do titular e do canal de contato.
  - Leva razão social, CNPJ e o encarregado ou o canal do titular. Pela Resolução CD/ANPD nº 2/2022, empresa de pequeno porte pode ter um canal no lugar do encarregado.
  - A Daniella aprova, com revisão do advogado da 9vee.
  - O endereço é `/politica-de-privacidade/`, o mesmo de hoje com a barra.
- **404:** mostra os caminhos para os serviços e não tem canonical.
- **Realocação de funcionários:** se a Daniella confirmar que o serviço continua, ele entra como um bloco na parte de empresas da página de cursos e na página de português para estrangeiros. Não vira página própria.

### Páginas por idioma

- O endereço é `/curso-de-idiomas/<idioma>/`, com o slug que o MVP já usa (`ingles`, `espanhol`, `mandarim`, `portugues`...). O português para estrangeiros usa `portugues-para-estrangeiros`.
- **Regra de publicação:** uma página de idioma só vai para produção com conteúdo próprio confirmado pelo Arthur: para quem é, níveis, formatos, provas (se houver) e perguntas frequentes daquele idioma. Até lá, ela fica marcada como não publicada: aparece no preview, com as pendências à vista, e fica fora do build de produção. O idioma continua na página de cursos.
- **Ordem de escrita:** inglês, espanhol e mandarim (a ordem da proposta), depois holandês e francês, que já têm material e prova no site atual, depois os demais, conforme as respostas chegarem.
- **Topo com a saudação e a foto do lugar** (mudou em 30/09/2026, a pedido do Maxwell; antes era só tipográfico): a saudação na escrita do idioma, com o `lang` e a direção certos, como na faixa de saudações da home, e a foto de duas pessoas conversando numa cidade onde se fala o idioma, com um marco ao fundo. A foto fica em arco, com o círculo da marca atrás, como nas páginas internas. O conceito, os prompts e o recorte estão em `docs/imagens-gemini.md`.
- Cada página tem as seções que o conteúdo pede. Duas páginas não precisam ter a mesma contagem de blocos, pela régua do `nivel-agencia`: regularidade entre páginas é assinatura de gerador.
- O pedido abre com o serviço "idiomas" e o idioma da página já marcados.
- Cada página liga para o serviço (a página de cursos e, quando fizer sentido, a de empresas) e para as páginas de cidade publicadas onde aquele idioma tem aula presencial.

### Páginas por cidade

- **Regra de publicação:** a página de uma cidade só vai para produção com fato local real: que serviços são presenciais ali, que tipo de evento ou turma, como a equipe atende. Sem isso até a semana 5, a página não entra, e os posts daquela cidade apontam para a página do serviço, como a proposta previa.
- Não há endereço, mapa nem "venha nos visitar".
- **Decisão que depende da resposta do cliente,** tomada na semana 4 ou 5:
  - se só a tradução for presencial, a página vira "Tradução simultânea em <cidade>", dentro de Tradução Simultânea;
  - se aulas ou NR-1 também forem presenciais, ela vira uma página da cidade, com todos os serviços presenciais de lá.
- Cada página liga para os serviços e para os idiomas com aula presencial naquela cidade.

### Conteúdo e revisão

- Os textos continuam em `content/`, um arquivo por página. As páginas de idioma e de cidade ficam numa pasta cada.
- Português do Brasil, frases curtas, voz ativa e segunda pessoa, sem travessão e sem as palavras proibidas. O `humanizar` roda em todo texto novo antes de cada lote.
- Nenhum dado inventado. A pendência passa a dizer quem responde: `[CONFIRMAR COM A DANIELLA: ...]` ou `[CONFIRMAR COM O ARTHUR: ...]`. O formatador e a lista de pendências aceitam os dois.
- **Lotes de revisão:** um script faz o build de preview e monta cada lote a partir dele, com o texto limpo na ordem da página, sem código. É o build, e não o `content/`, que tem a ordem da tela e os textos que vêm de outros arquivos (a lista de idiomas, os botões, o pedido).
  - Lote 1: Home, NR-1 e Cursos de Idiomas, mandado cedo.
  - Lote 2: Tradução, LMS, Quem Somos, privacidade e 404.
  - Lote 3: os idiomas.
  - Lote 4: as cidades.
- **Pendência sem resposta na semana 7:** o Maxwell decide caso a caso. A lista das abertas sai na semana 7, com a sugestão de cada uma: tirar a frase, tirar a seção ou esperar.
- **Novidades para o cliente:** cada build de preview que valer a pena publicar vem com o `docs/novidades-preview.md` atualizado, em linguagem de cliente.

### Pedido de contato com envio de verdade

- O drawer, os passos, as perguntas por serviço e o botão flutuante do WhatsApp continuam como no MVP. Muda a saída "Prefiro receber contato".
- **Serviço:** Web3Forms, no plano grátis (250 envios por mês, uma chave por destino, assunto por envio, campo isca e resposta JSON), porque a proposta promete custo zero de infraestrutura.
  - Antes de construir o resto, um envio de teste confere se o serviço aceita o endereço `workers.dev` do preview e o `localhost`.
  - Se recusar, o plano B é a Formspark (dados na União Europeia, US$ 25 pagos uma vez), com um novo ok do Maxwell.
- **Isolamento:** o envio fica num módulo só, que recebe o pedido pronto e devolve sucesso ou falha. Trocar de serviço é trocar esse módulo e as variáveis de ambiente.
- **Destino por modo:** no local e no preview, a chave de teste, com o e-mail do Maxwell; na produção, a chave do contato@9vee.com.br. Nenhum envio de teste chega à 9vee. As cópias para a Daniella e o Arthur, se eles quiserem, saem por encaminhamento na própria caixa.
- **Consentimento:** uma caixa não marcada, com o texto do aceite e o link para a política. Ela é obrigatória para enviar. O envio registra o texto aceito, a data e a hora (ISO, com fuso) e a página de origem. A saída pelo WhatsApp não passa pelo serviço: é a própria pessoa que manda a mensagem.
- **Antispam sem CAPTCHA:**
  - o campo isca do próprio serviço, invisível para pessoas;
  - um tempo mínimo de preenchimento, contado da abertura do pedido;
  - o filtro de spam do serviço.
- **Assunto:** `[Lead site] <Serviço> | <Empresa ou Pessoa física> | <nome da empresa ou da pessoa>`. Exemplo: `[Lead site] NR-1 | Empresa | Metalúrgica Exemplo`.
- **Corpo:** as mesmas linhas do pedido que vão para o WhatsApp (uma resposta por linha), mais o público, a página de origem, o nome, o contato e o registro do consentimento.
- **Validação:** a do navegador, que já existe. O plano grátis do serviço não valida do lado dele.
- **Na tela:**
  - "Enviando" enquanto espera;
  - a confirmação com o resumo, sem trocar de página e sem o aviso "MVP: envio simulado";
  - na falha, uma mensagem clara e a saída pelo WhatsApp com a mensagem pronta.

### Medição

- **GA4:** o mesmo ID da 9vee (`G-Y04K0CN1F9`) na produção, para o histórico continuar e o antes e o depois saírem do mesmo relatório. O ID vem de variável de ambiente. O preview fica sem GA4. O local usa uma propriedade de teste do Maxwell, para o DebugView.
- **Consent Mode v2:** tudo negado por padrão. O script do Google só carrega depois do aceite, então quem recusa não manda nada, e o JavaScript inicial fica abaixo de 30 KB. O aceite libera só a estatística (`analytics_storage`). Os consentimentos de anúncio continuam negados, porque o site não faz anúncio.
- **Aviso de cookies:**
  - uma faixa com "Aceitar", "Recusar" e "Preferências", com o mesmo peso visual para aceitar e recusar;
  - "Preferências" abre as categorias: necessários, sempre ligados, e estatística;
  - a escolha fica no navegador, com a data e a versão do texto, e um link no rodapé reabre as preferências;
  - funciona pelo teclado e pelo leitor de tela.
- **Eventos:**
  - `whatsapp_click`, com `servico`, `publico` e `pagina`, no botão flutuante e na saída do drawer;
  - `lead_form_submit`, com os mesmos parâmetros, só quando o envio dá certo;
  - `drawer_open`, com `servico` e `pagina`.
  - Os dois primeiros são marcados como eventos principais no GA4. Quem marca é o Maxwell, com acesso de editor.
- `docs/medicao.md` explica o que cada evento significa, onde dispara e como montar o relatório mensal de leads por serviço e por público.
- **Search Console:** o build de produção leva a meta tag de verificação que o Wix usa hoje, para a propriedade continuar verificada na troca. O Maxwell pede acesso de usuário completo, que envia sitemap e pede remoção. O Search Console e o Bing Webmaster do site novo ficam para o lançamento.

### SEO técnico

- Título e descrição únicos em cada página (até 60 e de 140 a 160 caracteres), um H1 por página e hierarquia de títulos sem salto, como no MVP.
- **JSON-LD:**
  - `EducationalOrganization` em todas as páginas, sem endereço: com `alternateName` "Novee", `areaServed` (as cidades de atendimento presencial e o Brasil), `contactPoint` e `sameAs` com as redes;
  - `Service` em NR-1, Tradução Simultânea e LMS;
  - `Course` em cada página de idioma;
  - `FAQPage` onde houver FAQ, igual ao que a página mostra;
  - `BreadcrumbList` em todas as páginas internas.
  - Nada de `LocalBusiness` com endereço.
- **Trilha de navegação visível** nas páginas internas, igual ao `BreadcrumbList`.
- **Sitemap** gerado a cada build de produção, só com as páginas publicadas, no endereço `/sitemap.xml`, que é o que o Search Console já conhece.
- **Favicon completo:** SVG, ICO, os PNG de 32, 180, 192 e 512 e o manifesto.
- **Imagem de compartilhamento por página,** gerada por script com o título da página sobre a arte da marca, em 1200 × 630.
- **Links internos cruzados:** serviço para idioma, idioma para cidade, cidade para serviço, e o menu e o rodapé com as páginas novas publicadas.

### Imagens

- Continua a regra do MVP: nada de banco de imagens. As fotos vêm do Gemini, com os prompts em `docs/imagens-gemini.md`, no mesmo padrão (em inglês, com o estilo base e a linha "Avoid").
- As imagens continuam em `src/assets/imagens/`, e não em `public/images/` como o brief sugere, porque o Astro só otimiza o que está em `src/`.
- As páginas de idioma não têm foto. Cada cidade publicada tem uma foto, e Tradução, LMS e Quem Somos ganham uma ou duas imagens novas para as seções novas.

### Preparação da migração (documentar, não executar)

- **Retrato do antes,** na semana 1 ou 2: Lighthouse mobile das páginas principais do Wix e os números do inventário, num documento em `docs/`.
- **Arquivo do blog:** título, URL, data e texto dos 505 posts, lidos das páginas públicas, em `docs/blog-arquivo/`, com o endereço das imagens de cada post.
- **Mapa de redirecionamentos** (`docs/redirects.csv`): todas as URLs de `docs/urls-site-atual.csv`, com destino, tipo e motivo. Sai de regras aplicadas por script, mais uma coluna de exceção à mão, e é gerado de novo perto do lançamento, porque o blog ainda recebe posts e porque a lista de páginas publicadas muda. As regras de partida, que o Maxwell revisa no CSV:
  - página antiga com equivalente: 301 para a página nova;
  - os 9 redirecionamentos do Wix: 301 direto para o destino final, sem corrente;
  - post com idioma: 301 para a página do idioma, se ela estiver publicada; senão, para a página de cursos;
  - post com serviço: 301 para a página do serviço;
  - post com uma das cidades do presencial: 301 para a página da cidade, se ela estiver publicada e cobrir aquele serviço; senão, vale a regra do idioma ou do serviço;
  - `/mandarim` e `/blank-1`: 301 para a página do curso de mandarim, se publicada; senão, para a página de cursos;
  - `/mandarim-portugues`, `/mandarim-english`, `/mandarim-chines`, `/mandarim-pt` e `/mandarim-portugues-1`: 301 para `/traducao-simultanea/`;
  - `/termo-de-uso` e `/terms-and-conditions`: 410;
  - `/challenges` e os 6 programas online: 410;
  - post sem relação com serviço, idioma ou cidade: 410;
  - `/blog` e os sitemaps antigos (menos o `/sitemap.xml`): 410, com a revisão do CSV podendo mudar.
- **Remoções:** `docs/remocoes-search-console.txt` lista as URLs que ficaram 410.
- **Gerador do `.htaccess`:** depois da aprovação do CSV, um script gera as regras para o Apache da HostGator:
  - 301 e 410 do mapa;
  - HTTPS forçado e domínio canônico com www;
  - barra no fim;
  - compressão e cache;
  - páginas de erro 404 e 410.
  - O script fica pronto e testado; o `.htaccess` só é usado no lançamento.
- **Checklist de lançamento** (`docs/checklist-lancamento.md`): os passos do brief, mais o que o diagnóstico mostrou:
  - o certificado precisa cobrir `9vee.com.br` e `www.9vee.com.br` antes da troca, por causa do HSTS de um ano (o AutoSSL pode validar pelo DNS, que já está na HostGator);
  - a meta tag de verificação no build de produção;
  - conferir de novo o sitemap do Wix e gerar o mapa de novo;
  - os registros `webmail`, `cpanel` e `ftp`, que hoje apontam para o Wix;
  - baixar a biblioteca de mídia do Wix antes do cancelamento;
  - montar a publicação automática, que precisa da HostGator;
  - transferir o repositório para uma conta da 9vee na entrega.

### Entrega

- **README de entrega,** em linguagem simples:
  - como rodar e gerar os builds de preview e de produção;
  - como publicar o preview no Cloudflare;
  - como trocar um texto e uma imagem;
  - onde ficam as variáveis de ambiente, sem valores;
  - o que a trava barra e por quê;
  - o que ficou para o lançamento, para a Fase 2 e para depois.
- **Pedidos fora do escopo** vão para `docs/pedidos-fora-do-escopo.md`, com data, quem pediu e estimativa, sem implementar.

## Testing Decisions

- **Um bom teste** verifica comportamento externo: o que o visitante vê, o que o comercial recebe, o que o Google lê e o que o build de produção deixa passar. Não verifica detalhe de implementação.
- **As mesmas práticas do MVP,** confirmadas pelo Maxwell em 29/09/2026: os três pontos de teste, mais o teste à mão local e no preview. Nada de Docker nem de Apache local.

1. **Lógica pura, com teste unitário escrito antes:**
   - a montagem do envio: assunto, corpo, registro do consentimento e o que vai para o serviço, com o serviço simulado;
   - o antispam: isca e tempo mínimo;
   - o estado do consentimento de cookies e o que cada escolha libera;
   - os marcadores de pendência com o nome de quem responde;
   - os construtores de JSON-LD novos (curso, serviço e trilha);
   - as regras do mapa de redirecionamentos e o gerador do `.htaccess` a partir de um CSV de exemplo;
   - o verificador da trava de produção, a partir de um HTML de exemplo;
   - o gerador dos lotes de revisão.
2. **HTML gerado,** depois de cada build:
   - o que o MVP já confere, em todas as páginas novas;
   - canonical sempre em `https://www.9vee.com.br`;
   - noindex só no preview;
   - robots por modo;
   - sitemap só com as páginas publicadas, e página não publicada fora do build de produção;
   - o tipo certo de JSON-LD em cada tipo de página, com o FAQ do JSON-LD igual ao visível;
   - trilha em toda página interna;
   - imagem de compartilhamento própria em cada página;
   - nenhum `[CONFIRMAR` no build de produção;
   - o JavaScript inicial dentro do teto.
3. **Navegador (Playwright, Chromium e WebKit, perfis de iPhone e Pixel):**
   - o pedido com a caixa de consentimento;
   - o envio com o serviço interceptado: certo, com erro (a saída pelo WhatsApp aparece) e pela isca (nada é enviado);
   - o aviso de cookies pelo teclado, a persistência da escolha e o GA4 carregando só depois do aceite;
   - os três eventos com os parâmetros certos, interceptados;
   - nenhuma rolagem horizontal em 360, 390, 768, 1280 e 1920 px em todas as páginas.

- **À mão, fora da suíte:**
  - o envio real no preview, chegando no e-mail de teste: certo, com erro e pela isca;
  - os eventos no DebugView, com a propriedade de teste;
  - o Lighthouse mobile de todas as páginas, no build de produção rodando local, com os números em `docs/lighthouse.md`;
  - o teste em Android e iPhone de verdade, pelo preview publicado.
- **Metas no Lighthouse mobile, em todas as páginas:** Performance 95 ou mais, SEO 100, Acessibilidade 95 ou mais e Boas práticas 95 ou mais; LCP abaixo de 2,0 s, CLS abaixo de 0,05 e JavaScript inicial abaixo de 30 KB, sem contar o GA4.
- **Prior art:** a suíte do MVP (lógica do contato, formatador de texto, JSON-LD, HTML gerado e navegador), que continua e cresce.

## Out of Scope

- O sistema de agendamento de aulas (Fase 2, por aditivo). Nada dele entra, nem "já deixando pronto".
- O painel de edição do blog (opcional, por aditivo).
- Pagamento online e integração com o LMS.
- O blog antigo: o site novo sai sem blog. O blog novo volta no acompanhamento, depois das métricas.
- A publicação definitiva, a troca de domínio, o DNS e qualquer coisa na HostGator. O acesso vem depois, pelo cliente.
- Montar a publicação automática e transferir o repositório para a 9vee: vão para o checklist de lançamento.
- Os três ajustes da loja do Redação 900+: ficam de fora por enquanto. O Maxwell decidiu em 29/09/2026 que o cliente não quer mexer nesse site agora.
- As versões em inglês e em chinês da landing de Mandarim, e qualquer versão do site em outro idioma.
- A página de termos de uso: `/termo-de-uso` fica 410.
- Página própria para a realocação de funcionários: no máximo um bloco, se o serviço continuar.
- O Search Console e o Bing Webmaster do site novo: ficam para o lançamento, com os passos no checklist.

## Further Notes

### Decisões que dependem do cliente

As perguntas estão em `docs/pendencias-cliente.md`, para o Maxwell mandar numa mensagem só.

- Quais páginas de idioma vão para produção, e com que conteúdo (Arthur).
- Quais cidades têm fato local, e se a página de cidade é de tradução ou da cidade inteira (Daniella e Arthur).
- A seção de mandarim no mercado financeiro (Daniella).
- O bloco de realocação de funcionários (Daniella).
- Os dados da política de privacidade: razão social, CNPJ e canal do titular (Daniella).
- As 26 pendências do MVP.

### Riscos

- **O tempo de resposta do cliente** é o maior risco do prazo: as páginas de idioma, de cidade, de LMS e de Quem Somos dependem de fatos que só a 9vee tem.
- **O serviço de formulário** pode recusar o endereço do preview ou o localhost. O teste vem antes de todo o resto do envio.
- **O blog do Wix ainda recebe posts.** A mensagem ao cliente pede para parar, e o mapa é gerado de novo perto do lançamento.
- **O HSTS de um ano** nos dois nomes exige o certificado pronto antes da troca do DNS.
- **O lançamento depende do acesso à HostGator,** que vem depois. A Fase 1 termina com o site pronto para ir ao ar, e a segunda metade do pagamento é na publicação.

### Horas e cronograma

A estimativa é de cerca de 89 horas do Maxwell, com 11 a 12 horas por semana. As horas contam a sessão comigo, a revisão, os testes, o Gemini e o cliente, e não o meu tempo de execução. A distribuição por semana fica em `docs/cronograma-8-semanas.md`, e a quebra do trabalho, em `docs/tickets/`.
