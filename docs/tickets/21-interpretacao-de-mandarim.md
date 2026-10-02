# 21: Interpretação de mandarim

**O que construir:** a página `/traducao-simultanea/mandarim/`, filha da Tradução Simultânea, com o conteúdo da landing `/mandarim-portugues` do site atual (`docs/textos-site-atual.md`, seção 3.5): interpretação mandarim-português para o mercado financeiro. Não é a página do curso. Publicada desde o lançamento.

**Depende de:** 05.

**Horas:** 4. **Semana:** 2.

**Situação:** feito em 02/10/2026, adiantado da semana 2, logo depois do 05, com o `code-review` nos dois eixos aplicado e a foto do topo no lugar, e aprovado pelo Maxwell no mesmo dia. Criado em 30/09/2026 pela decisão do reaproveitamento do site atual (spec, "Reaproveitamento do site atual", decisão 5). O preview não foi publicado: o Maxwell publica depois de ver as capturas.

**Do site atual, como fato:**

- [x] A frase "Quando o negócio fala mandarim, precisão não é opcional.", que passa nos padrões e fica como está.
- [x] Os três serviços:
  - investor meetings: reuniões bilaterais, revisões de portfólio e apresentações para LPs;
  - visitas: due diligence e inspeção em plantas industriais, com o intérprete no local;
  - eventos corporativos: conferências, roadshows, reuniões de conselho e apresentações de gestão.
- [x] As modalidades: interpretação simultânea e consecutiva, e a de acompanhamento, que o formulário da landing oferece.
- [x] Mais de 10 anos de experiência nesse mercado, com gestores de fundos de private equity, bancos de investimento e empresas do portfólio, em visitas de investidores e tours em fábricas e escritórios no Brasil.
- [x] "Retornaremos em até um dia útil", perto do pedido. Só nesta página: nas outras, o prazo continua na pergunta 6.

**O que fica fora:**

- [x] Nome de empresa: Santander e Itaú só aparecem nos one-pagers do Canva e esperam a autorização (pergunta 17).
- [x] As versões em inglês e em chinês.

**A página:**

- [x] O 我们是 pode entrar como detalhe visual, com `lang="zh"` e o nome "9vee". "Novee" continua só no rodapé e no `alternateName`.
- [x] Pedido e WhatsApp abrem com Tradução simultânea e mandarim marcados, pelo botão da página e pelo do cabeçalho. A mensagem do botão do WhatsApp diz a página e o pedido de intérprete de mandarim. A regra do que vem marcado fica em `src/lib/contato.ts`, com teste unitário escrito antes.
- [x] `Service` e `FAQPage` (se houver FAQ) no JSON-LD.
- [x] Trilha "Início › Tradução simultânea › Mandarim", na tela e no `BreadcrumbList`. O `trilhaDoCaminho` recebe o nome da página, que não está no menu. O nome vem da própria página e continua valendo depois que o rodapé ganhar o link dela, no ticket 15.
- [x] Título do Google com até 60 caracteres, focado em "interpretação mandarim português", e descrição de 140 a 160.
- [x] Links: a Tradução (o bloco curto do ticket 05) e a página do curso de mandarim levam a ela, e ela leva ao curso. Enquanto a página do curso não estiver publicada, o link vai para a âncora do mandarim na página de cursos, como a home faz.
- [x] O conteúdo fica num arquivo próprio em `content/`, fora de `content/idiomas/`: a página vai sempre para a produção, e a trava lê as pendências dela. O `scripts/pendencias.ts` passa a conhecer o arquivo.

**Desenho e fechamento** (os oito passos da spec, em "Como cada ticket do reaproveitamento fecha"):

- [x] Seções desenhadas com a skill `frontend-design`, com `docs/padroes.md` acima dela. Previsto: a frase em destaque com o 我们是 9vee, os três serviços em lista grande, "mais de 10 anos" como número e o prazo de um dia útil junto do botão.
- [x] `humanizar` nos textos e `humanizar-ui` na página; o prompt do hero em `docs/imagens-gemini.md`. Até a imagem chegar, a página mostra o Placeholder.
- [x] Testes do HTML gerado e do navegador da página (o pedido aberto com Tradução e mandarim marcados, pelos dois botões), o de larguras e o de JSON-LD; `npm test` e `npm run e2e` passando.
- [x] Capturas no roteiro `ticket-21`, em 390 e 1280 px.
- [x] Lighthouse no build de produção: Performance 95 ou mais, Acessibilidade 100, LCP abaixo de 2,0 s e CLS abaixo de 0,05.
- [x] `code-review` nos dois eixos, com as correções em commits próprios.
- [x] "Como ficou" aqui, o texto para o cliente em `docs/novidades-preview.md` e `docs/andamento.md` atualizado. O preview não é publicado: o Maxwell publica depois de ver as capturas.

**Como ficou:**

- **Conteúdo:** `content/interpretacao-de-mandarim.md`, numa coleção própria (`interpretacaoDeMandarim`), com o que a seção 3.5 de `docs/textos-site-atual.md` traz. A landing foi baixada de novo em 02/10, só para leitura, e os fatos batem: os três serviços, a frase, o 我们是, os mais de 10 anos, o prazo e as opções do campo "tipo de serviço". Nenhuma pendência: são 107 marcações em `content/`, as mesmas de depois do ticket 05. O que o pedido já traz marcado e o prazo de resposta ficam em `content/site.md`, em `paginas.interpretacaoDeMandarim`, com o nome da página na mensagem do WhatsApp.
- **As cinco seções, na ordem da tela:**
  1. o hero: a trilha, para quem é ("fundos de private equity, bancos de investimento e empresas do portfólio"), o título com o serviço, o botão e, logo abaixo dele, o prazo de um dia útil;
  2. onde o intérprete entra (`#servicos`): os três serviços em lista grande, cada um com as ocasiões dele;
  3. a frase da landing (`#precisao`), em tipo de mostra, com o grifo em "mandarim" e a assinatura 我们是 9vee. Embaixo, as três modalidades, "Mais de 10 anos" em tipo de número, com quem e onde;
  4. a ponte para o curso de mandarim (`#curso`);
  5. o fechamento (`#contato`), que diz o que o pedido já traz marcado e o que falta responder, com o prazo de novo abaixo do botão.
- **Decisões de desenho:**
  - o H1 diz o serviço ("Interpretação de mandarim para o mercado financeiro"), como nas outras páginas de serviço, e a frase da landing é o título em destaque da terceira seção. O mapa de `docs/textos-site-atual.md` dava as duas saídas. Quem vem do bloco da Tradução encontra no H1 o mesmo nome do link, e a frase volta como a peça grande da página;
  - a frase é a única peça em tipo de mostra. O grifo fica em "mandarim", a palavra que a landing escreve em caixa alta, e sai na cor da família do idioma (a menta de "De outras famílias"), a mesma que o mandarim tem na home e na página de cursos, e não na violeta do grupo Empresas;
  - o 我们是 9vee assina a frase do lado direito, como numa carta, com o `lang` do mandarim de `content/site.md` (`zh-Hans`). A primeira versão tinha a meia-lua da saudação das páginas de idioma depois dele: no canto da página ela parecia um ponto cortado, e saiu;
  - "Mais de 10 anos" sai em tipo de número, no tamanho dos números da home, e abre a lista de provas, acima de "Com quem" e "Onde". A primeira versão trazia esse item em tipo menor, por receio de ele disputar com a frase. A revisão de spec cobrou o que o ticket previa, e a simulação na tela mostrou que o número cabe sem disputar. As duas capturas da versão menor ficaram em `relatorios/ticket-21/`, com o nome `alternativa-sem-numero`, para comparar;
  - as três modalidades entram no texto de apoio da frase, como a landing faz logo abaixo dela, e são o link para os formatos da página de Tradução. A landing só dá o nome das três: a página não explica nenhuma;
  - o primeiro serviço se chama "Reuniões com investidores", e não "Investor meetings": é como o formulário da landing escreve;
  - sem FAQ, porque a landing não tem perguntas, e sem botão no meio, porque a página é curta: o pedido está no topo e no fim, além do cabeçalho;
  - os serviços vêm antes da frase, na ordem da landing. Assim nenhuma seção fica encostada em outra de mesma cor, e os dois títulos grandes (o H1 e a frase) não ficam um em cima do outro.
- **O pedido** abre com a tradução simultânea e o mandarim marcados, pelo botão da página e pelo do cabeçalho:
  - a página declara em `content/site.md` o serviço dela e o que o pedido já traz marcado (`marcadas: { idiomas: ["Mandarim"] }`), com a opção escrita como no formulário. O esquema recusa a pergunta que o formulário do serviço não tem, a que não é de várias respostas e a opção que não existe;
  - a regra é a `opcoesIniciais`, em `src/lib/contato.ts`, com o teste unitário escrito antes: numa pergunta de várias respostas, vale o que a pessoa já marcou e, sem nada marcado, o que a página traz. Quem troca o idioma e reabre o pedido encontra a própria escolha. A `marcadasValidas`, no mesmo arquivo, é a conferência que o esquema usa;
  - só esta página traz resposta marcada: nas páginas dos cursos, o pedido de tradução continua abrindo sem idioma;
  - a mensagem do pedido sai com "Idiomas: mandarim", e a do botão do WhatsApp diz "Vim pela página Interpretação de Mandarim do site e quero um intérprete de mandarim".
- **O prazo** de um dia útil aparece em três lugares, de uma frase só (`prazo`, em `content/site.md`): abaixo do botão do topo, abaixo do botão do fim e na confirmação do pedido enviado por esta página, no lugar do texto com a pendência da pergunta 6. Sem JavaScript o botão some, e a frase continua à vista.
- **Componente novo:** `ListaGrande`, a lista de poucos itens em tipo grande, um por linha, com o nome de um lado e o que ele cobre do outro. O título da seção é só o rótulo: quem aparece são os nomes.
- **Componentes reaproveitados:**
  - `HeroPagina` e `CtaFinal`, que passaram a aceitar a nota do botão;
  - `BotaoContato`, que ganhou a nota: a linha pequena logo abaixo do botão;
  - `Mostra`, que passou a aceitar o título de uma frase só, com o grifo no meio dela, a assinatura e o item em tipo de número. A página de LMS continua com o título em duas linhas;
  - `Chamada`, que ganhou o link. O bloco do mandarim da Tradução e a ponte para o curso são ela. A ponte para o LMS do ticket 22 usa o mesmo;
  - o link de texto em negrito dos cartões de serviço da home, do destaque de NR-1 e da `Chamada` virou a classe `.link-forte`, do `base.css`.
- **Links:**
  - o bloco do mandarim da página de Tradução leva à página nova ("Ver a interpretação de mandarim");
  - a nota "Para quem é" da página do curso de mandarim leva a ela, e não mais à Tradução;
  - a página nova leva ao curso: hoje, à âncora do mandarim na página de cursos, porque a página do curso ainda não está publicada. O endereço sai de `enderecoDoCurso`, em `src/lib/publicacao.ts`, que a home e a lista de cursos do JSON-LD também usam;
  - as três modalidades levam aos formatos da página de Tradução (`/traducao-simultanea/#formatos`). O link não estava na lista do ticket: entrou porque a página dá o nome das modalidades sem explicar nenhuma, e a explicação está lá.
- **Trilha:** "Início, Tradução simultânea, Mandarim", na tela e no `BreadcrumbList`. O nome do último passo é o campo `nomeNaTrilha` do arquivo da página, que o `trilhaDaPagina` passa ao `trilhaDoCaminho` junto com os das páginas de idioma.
- **Dados para o Google:** `Service` com o nome "Interpretação de mandarim" e o Brasil como área atendida, porque a landing fala de fábricas e escritórios no Brasil. Sem `FAQPage`. Título com 53 caracteres ("Interpretação mandarim-português para negócios | 9vee") e descrição com 155.
- **Imagem nova:** IMG-INTERPRETACAO-MANDARIM-HERO, com o prompt em `docs/imagens-gemini.md`. O Maxwell gerou a foto em 02/10, às 9h00, enquanto as revisões rodavam: o intérprete entre uma gestora brasileira e um investidor chinês, numa mesa de reunião, como o prompt e o texto alternativo dizem. Entrou como veio, sem recorte.
- **`humanizar`:** os textos já saíram sem as palavras da lista, sem conector de redação e sem adjetivo no lugar de fato. A landing fala em "histórico comprovado" e em "alto impacto": no lugar entraram os mais de 10 anos, com quem e onde. Nenhum trecho precisou ser reescrito depois.
- **`humanizar-ui`:** nenhum marcador da lista. A página não tem cartão com ícone, grade de três colunas, barra de números nem FAQ, e o topo tem um botão só. Saíram duas coisas na revisão: a meia-lua da assinatura e a nota das modalidades no pé da lista, que foi para o apoio da frase. Achados que dependem do cliente: a página não cita nenhum trabalho feito, porque os nomes esperam a pergunta 17, e não fala de preço (pergunta 7).
- **Testes:**
  - `tests/unit/contato.test.ts`: a `opcoesIniciais` e a `marcadasValidas`;
  - `tests/unit/publicacao.test.ts`: o endereço do curso de um idioma, com a página publicada e sem ela;
  - `tests/dist/interpretacao-de-mandarim.test.ts`: as cinco seções na ordem, a trilha, os fatos de cada seção, a frase com o grifo e a vírgula colada, a assinatura com o `lang` do idioma, o número, o prazo abaixo dos dois botões e na confirmação, e só nesta página, o serviço e a resposta marcada que a página entrega ao pedido, e só ela, a mensagem do WhatsApp, o fechamento com cada pergunta do pedido, os links de ida e de volta, o que fica fora e o `Service`;
  - `tests/e2e/interpretacao-de-mandarim.spec.ts`: o pedido aberto pelos dois botões com a tradução e o mandarim marcados e a mensagem do WhatsApp já com "Idiomas: mandarim", a escolha da pessoa mantida ao reabrir, o contraste do texto sobre o grifo e, sem JavaScript, o prazo à vista e o WhatsApp alcançável;
  - `tests/dist/traducao.test.ts`: o bloco do mandarim agora leva à página;
  - `tests/e2e/larguras.spec.ts`: a página nova nas cinco larguras e, no teste da primeira tela em 1280 x 800, o botão com a nota do prazo;
  - `tests/dist/apoio.ts` ganhou o `conferirPerguntasDoFechamento`, que a Tradução e a página nova usam, e a ilha do pedido passou a trazer o serviço, o idioma e as respostas marcadas da página;
  - `npm test`: 151 unitários e 1.084 do HTML gerado. `npm run e2e`: 277 passaram, nos três perfis.
- **Lighthouse** no build de produção, mediana de 3 rodadas (Lighthouse 13.5.0 e Chrome 154.0.8037.97), já com a foto do topo: Performance 100, Acessibilidade 100, Boas práticas 100, SEO 100, LCP 1,66 s, CLS 0,000 e TBT 0 ms. Com o Placeholder no lugar da foto, antes de ela chegar, o LCP tinha dado 1,51 s. O relatório sai em `relatorios/ticket-21/lighthouse.md`, por `node scripts/lighthouse.ts ticket-21`.
- **Capturas:** `relatorios/ticket-21/`, por `node scripts/screenshots.ts ticket-21`: a página inteira, o topo, cada seção e o fechamento em 390 e 1280 px, o pedido aberto pelo botão da página e pelo do cabeçalho, o bloco da Tradução com o link e a nota da página do curso. São 17 capturas, mais as duas da versão sem o número.
- **`code-review` nos dois eixos,** sobre o `956cd86`, com a página em `1353a9d` e as correções em `e00cc81` (a classe `.link-forte`) e `9800ed4`. As correções de spec e de padrões foram num commit só, porque as duas revisões pediram a mesma mudança no pedido, cada uma por um motivo. A foto está em `53116e1`.
  - **spec, corrigido:**
    - a regra do pedido valia em toda página que diz um idioma: nas páginas dos cursos de inglês, espanhol, mandarim, francês e italiano, o pedido de tradução passaria a abrir com o idioma marcado, sem ninguém ter pedido. Agora a página declara o que traz marcado, e só ela declara;
    - a confirmação do pedido enviado por esta página dizia "responde em [a confirmar]", ao lado de dois botões que prometem um dia útil. Ela passou a repetir a promessa;
    - "mais de 10 anos" tinha virado título de item em tipo pequeno, e o ticket previa número;
    - duas frases se afastavam da landing: "com intérprete do começo ao fim" voltou a ser "com cobertura completa de interpretação", e "Para fundos" voltou a ser "Para fundos de private equity";
    - o texto das novidades dizia que a página não tinha nenhum "a confirmar", e o do rodapé está em todas as páginas;
  - **padrões, corrigido:**
    - sem JavaScript, a nota do prazo sumia com o botão. O prazo é conteúdo da página e fica à vista;
    - a regra comparava o slug do idioma com o valor da opção do formulário, que só coincidiam pelo formato, e varria todos os formulários por causa de um caso. Saiu, com a mudança acima;
    - três trechos repetidos nos testes (o cenário do WhatsApp, o fechamento com as perguntas do pedido e a medida da primeira tela) e um teste que refazia a varredura do script em vez de conferir o que a página entrega;
    - os esquemas repetidos da `Mostra` e da `Chamada` com link, que ganharam nome, e a "página do curso ou âncora", que estava em três lugares e virou uma função com teste;
    - o link de texto em negrito, copiado pela terceira vez, que virou a classe `.link-forte`;
    - os nomes `link` (que guardava só o rótulo), `nome` (o nome na trilha), `INTERPRETACAO_DE_MANDARIM` (um endereço) e `idiomaDaPagina` (função e campo com o mesmo nome);
  - **conferido, sem mudança na tela:** as 23 capturas do roteiro `ticket-06` e as duas da home inteira saíram idênticas, byte a byte, às de antes. No `ticket-05`, mudaram só as capturas em que o bloco do mandarim aparece ou empurra o que vem depois, porque ele ganhou a linha do link;
  - **ficou como estava, com o porquê:**
    - a `nota` passa pelo `HeroPagina` e pelo `CtaFinal` até o `BotaoContato`. É uma prop opcional repassada: a saída sem repasse seria um contexto escondido entre o layout e o botão;
    - página fora do menu ainda pede mexer em cinco lugares (a lista de `paginas` do esquema, o `trilhaDaPagina`, o `scripts/pendencias.ts`, o teste de larguras e o desvio do teste da trilha). Juntar isso fica para o ticket 11, que traz as páginas de cidade e volta a mexer na trilha;
    - a trilha continua "Mandarim" depois que o rodapé ganhar o link porque o `trilhaDoCaminho` só lê do rodapé o link da política. Quem segura isso é o teste do HTML gerado desta página: se o ticket 15 puser o link novo entre os nomes da trilha, o teste acusa;
    - o link das modalidades para os formatos da Tradução, que não estava na lista do ticket, fica: o porquê está em "Links";
  - **decidido pelo Maxwell em 02/10:** o H1 fica com o nome do serviço, e a frase da landing, em destaque na terceira seção; o "Mais de 10 anos" fica em tipo de número. O ticket foi para o GitHub no mesmo dia.
