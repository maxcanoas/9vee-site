# Andamento do MVP da 9vee

Atualizado em 20/09/2026, com o preview no ar. Para retomar, vá direto para "Próxima etapa".

## Onde estamos

| Etapa | Situação | Commits |
|---|---|---|
| 0. Spec, padrões e ativos da cliente | feita e aprovada | `5673eec` (tag `mvp-base`) |
| 1. Base visual | feita e aprovada | `453c5f2` |
| 2. Home | feita e aprovada | `e375d5a` |
| 3. Drawer de contato e WhatsApp | feita e aprovada, com as 7 decisões registradas abaixo | `be20fd3` e `d2c50d2` |
| Revisão das etapas 1 a 3: humanizar e code-review | feita e aprovada | de `4608dd0` a `f772212` |
| 4. Treinamento de NR-1 | feita e aprovada | `f6dce38` |
| 5. Cursos de Idiomas | feita e aprovada | `69aa31b` |
| 6. Páginas parciais | feita e aprovada | `c0c8c96` |
| 7. Verificação e revisão final | feita e aprovada | de `9e8f11e` a `f9374b4` |
| 8. Publicação e reunião | **publicada**: falta o teste em aparelho e a reunião | `35c51c4` e o commit deste arquivo |

## O que cada etapa entregou

**Etapa 0.** `docs/mvp-spec.md` (a spec), `docs/padroes.md` (regras do code-review) e `assets-cliente/` (os 22 arquivos do kit da marca que o site usa; o `Archive` original não foi tocado).

**Etapa 1.** Astro 7 com saída estática, a paleta em tokens, Readex Pro nos títulos e Source Sans 3 no texto, o menu com os grupos "Empresas" e "Para você", o rodapé e a página de trabalho `/especime/`.

**Etapa 2.** A home com as 9 seções do brief, a escolha de público no hero (reordena os serviços, troca o texto dos botões e fica salva), o movimento por rolagem, os Placeholders das imagens e os 6 prompts da home em `docs/imagens-gemini.md`. H1 aprovado: "Para a conversa dar certo."

**Etapa 3.** O drawer de contato e o atalho do WhatsApp, em todas as páginas:

- quatro passos: para quem é, serviço, detalhes do serviço e nome, com resumo editável dos passos respondidos;
- os 5 formulários da proposta saem de `content/site.md`, com campos que aparecem conforme a resposta;
- a saída pelo WhatsApp abre o `wa.me` numa nova aba com a página, o público, as respostas e o nome; a saída "Prefiro receber contato" confere o telefone ou o e-mail e mostra a confirmação com "MVP: envio simulado";
- foco preso também no Safari, Esc, toque no véu e foco de volta ao botão;
- o atalho flutuante leva a mensagem da página e do público, some com o drawer aberto e não cobre o fim do rodapé.

**Revisão das etapas 1 a 3.** O `humanizar` na home e nos textos compartilhados, e o `code-review` desde `mvp-base`, nos dois eixos (padrões e spec): textos que o site atual não sustenta, defeitos de movimento e de imagem, testes novos, tokens, tipos e listas únicas, e a documentação.

**Etapa 4.** A página `/treinamento-nr-1/` completa, com as 8 seções do brief:

- hero para quem decide, com rótulo "Para RH, SESMT e diretoria", H1 "Treinamento de NR-1 e saúde mental no trabalho" e o botão de orçamento;
- "Por que agora" em linha do tempo, com os três marcos (27/08/2024, a Portaria 1.419 aprova a nova NR-1; 26/05/2025, o texto entra em vigor com um ano de orientação; 26/05/2026, a fiscalização pode autuar), a nota sobre o PGR, a nota sobre a Lei 14.831 e as 4 fontes oficiais;
- "O que a sua empresa recebe", com os três resultados e a ressalva do que o treinamento não faz;
- os três módulos do site atual, em cartões numerados;
- formato e carga horária, com as pendências à vista;
- a abordagem em quatro etapas;
- FAQ de quem decide, com 5 perguntas;
- contato no hero, no meio (seção de formato) e no fim, sempre com `data-servico="nr1"`.

Do lado técnico: esquema próprio da coleção `nr1` em `src/content.config.ts`, JSON-LD `Service` ligado à organização pelo `@id`, seis componentes novos (`HeroPagina`, `LinhaDoTempo`, `Pontos`, `Modulos`, `Formato`, `Abordagem`), o prompt `IMG-NR1-HERO` em `docs/imagens-gemini.md`, `tests/dist/nr1.test.ts` e o roteiro de capturas `etapa-4`. O `HeroPagina` foi escrito para servir também às etapas 5 e 6.

**Imagens do Gemini.** Durante a etapa 4 chegaram os 7 arquivos em `src/assets/imagens/`: os 6 da home e o `nr1-hero.jpg`. O site já serve AVIF com WebP de reserva, srcset, width e height. Duas observações:

- `home-hero-frente.jpg` é a camada recortada do hero da home. Ela precisa ser `.png` com fundo transparente, senão o retângulo da foto aparece por cima do círculo da marca;
- os arquivos ainda não estão no git.

**Etapa 5.** A página `/curso-de-idiomas/` completa, a vitrine do B2C:

- hero com o botão que muda de texto conforme o público ("Quero estudar" ou "Pedir orçamento");
- os 14 idiomas por família, cada um com âncora própria e com botão que abre o pedido já com o idioma marcado. É para essas âncoras que os 14 links da home apontam;
- a régua do A1 ao C2 em português claro, com a barra crescendo de um nível para o outro;
- "Como são as aulas", com a âncora `#particular` que o menu usa, e o presencial marcado como pendência;
- os 6 exames do site atual, com uma linha cada;
- "Para a sua equipe", o bloco B2B com âncora `#empresas`;
- "Como começa", com o diagnóstico de nível;
- FAQ de quem vai estudar e o contato no hero, no meio, no bloco da equipe e no fim.

Do lado técnico: esquema próprio da coleção `idiomas`, JSON-LD com `ItemList` de 14 `Course` (cada um apontando para a própria âncora) e `FAQPage` igual ao FAQ visível, quatro componentes novos (`Niveis`, `Aulas`, `Provas`, `ComoComeca`), o `Familias` com o modo de pedido, o `Entregas` da etapa 4 virou `Pontos` e serve às duas páginas, os prompts `IMG-IDIOMAS-HERO` e `IMG-IDIOMAS-COMO`, `tests/dist/idiomas.test.ts` e o roteiro de capturas `etapa-5`.

**Etapa 6.** As três páginas parciais, com hero, um bloco curto e a etiqueta "página em construção no MVP" no alto:

- **Tradução Simultânea:** os três formatos (simultânea, consecutiva e acompanhamento), os sete idiomas com intérprete e o presencial nas quatro cidades, que é o único presencial que o site atual afirma;
- **LMS:** as três perguntas que dimensionam a plataforma, que são as mesmas do pedido. O resto é pendência, porque o site atual não tem material de LMS;
- **Quem Somos:** as quatro frentes da empresa e a sede em São Paulo, com o tempo de casa como pendência.

Do lado técnico: a coleção `parciais` ganhou esquema próprio e o `EmConstrucao` saiu, o `Aulas` da etapa 5 virou `Cartoes` e serve às quatro páginas, o `HeroPagina` ganhou a etiqueta de obra, entraram os três prompts que faltavam em `docs/imagens-gemini.md`, `tests/dist/parciais.test.ts` e o roteiro de capturas `etapa-6`.

**Etapa 7.** A medição, a revisão e as correções.

- **Lighthouse mobile**, mediana de 3 rodadas, nas 3 páginas completas e nos dois builds: Performance de 98 a 100, Acessibilidade 100, Práticas 100, SEO 100 no build indexável (66 a 69 no padrão, pelo noindex, como a spec previa), LCP de 1,51 s a 1,96 s e CLS de 0,000 a 0,001. Todas as metas batidas. O script é o `scripts/lighthouse.ts` e o resultado fica em `relatorios/etapa-7/lighthouse.md`.
- **`code-review` de `mvp-base` até HEAD**, nos dois eixos, com o `humanizar` e o `humanizar-ui` por cima. Nove correções aplicadas, uma por commit:
  1. a ordem dos blocos de formato na página de Idiomas agora muda com o público, que era um efeito que a spec pedia e tinha ficado de fora;
  2. a resposta do FAQ que ia quebrada para o JSON-LD ("no fim do curso:."), com teste novo que pega esse rastro em qualquer página;
  3. os "relatórios para o RH" que sobraram na home e no drawer viraram pendência;
  4. o `line-height: 1.45` solto em 13 arquivos virou `--altura-apoio`;
  5. o cabeçalho de seção repetido em dez lugares virou o `CabecaDeSecao`;
  6. o selo numérico duplicado virou a classe `.selo-numero`;
  7. o contrato do drawer saiu de um lugar só (`atributosDoContato`);
  8. a descrição do curso no JSON-LD passa pelo `textoPuro`;
  9. a `etiquetaMvp` saiu de dentro do `rodape` no `site.md`.
- A spec passou a registrar de onde vêm os fatos do site atual sobre idiomas e tradução, e a página de NR-1 cita agora as 5 fontes oficiais.

**Etapa 8, o que já está pronto.** Tudo que não depende da conta da Cloudflare:

- a página `/especime/` saiu do repositório, como a spec previa. Com ela saiu a exceção da regra de cor nos testes, que agora valem para todas as páginas sem pular nenhuma;
- `wrangler.jsonc`: o `dist/` sobe como Worker de arquivos estáticos, com a 404 do próprio site para endereço inexistente. O `npm run deploy` faz o build e publica;
- `scripts/pendencias.ts`: junta as 29 pendências dos textos, agrupadas por página, ignorando os comentários do YAML. Escreve `relatorios/pendencias.md`;
- `docs/roteiro-apresentacao.md`: a ordem da demonstração, o antes e depois ligado ao que a proposta apontou, os números do Lighthouse, o que ainda não está no MVP, as quatro perguntas que mais importam e o checklist do teste em aparelho de verdade.

**Etapa 8, publicado em 20/09/2026.** O preview está em **https://9vee-preview.9vee-site.workers.dev**, na conta Cloudflare do Maxwell, como Worker de arquivos estáticos.

Conferido no ar: as 6 páginas do menu respondem 200, toda resposta traz `X-Robots-Tag: noindex, nofollow`, a meta robots está no HTML, o canonical e o Open Graph apontam para o endereço do preview, o `og.jpg` é servido (é o que faz a prévia do link no WhatsApp mostrar a marca), endereço inexistente cai na 404 do próprio site e o `robots.txt` não bloqueia.

Lighthouse no endereço publicado, mediana de 3 rodadas: Performance 96 a 99, Acessibilidade 100, Práticas 100, LCP de 1,55 s a 1,90 s e CLS até 0,001. O SEO aparece entre 66 e 69 porque o preview está com noindex, como a spec previa. O resultado está em `relatorios/etapa-8/lighthouse-publicado.md`.

Uma nota para a próxima publicação: o subdomínio novo da Cloudflare levou uns três minutos para o certificado sair. Até lá o endereço falha no aperto de mão TLS, no terminal e no navegador. É espera, não erro.

## Decisões da etapa 3, aprovadas em 19/09/2026

1. Nome obrigatório nas duas saídas.
2. No toque, escolher o público ou o serviço já avança; no teclado, só o Enter avança.
3. Quem escolheu "Para você" chega com "Cursos de idiomas" marcado, e o título vira "Montar suas aulas".
4. O público escolhido no drawer vale para o site todo.
5. No passo final, as saídas vêm logo abaixo do nome, e o "Confira o pedido" vem depois.
6. A pergunta do passo 1 é "É para sua empresa ou para você?", na ordem dos botões. A legenda do hero usa a mesma pergunta.
7. Cada serviço tem uma descrição curta no passo 2.

## Decisões da etapa 4

1. **O regulamento da Lei 14.831 ainda não saiu.** Confirmado na web em 19/09/2026: há notícia de grupo de trabalho para regulamentar, mas nenhum ato oficial no gov.br. A pendência continua no texto.
2. **Presencial do treinamento virou pendência.** O site atual só afirma atendimento presencial para tradução simultânea, então a página não promete cidade para o treinamento. A descrição da página perdeu o "Presencial ou online" que estava escrito desde a etapa 1.
3. **Os nomes dos três módulos ficaram como a cliente escreve**, inclusive "mudança de mindset" no módulo 2. É o nome do produto dela; trocar é decisão da Daniella.
4. **A seção "Por que agora" virou linha do tempo**, em vez de repetir o bloco que a home já tem. Quem vem da home encontra a informação aprofundada, e não a mesma peça duas vezes.
5. **O `Service` do JSON-LD atende "Brasil"**, e não as 4 cidades, porque o presencial do treinamento é pendência.

## Decisões da etapa 5

1. **O hero não repete a escolha de público da home.** O botão muda de texto conforme o público já escolhido, e quem ainda não escolheu responde isso no primeiro passo do drawer. A página serve os dois públicos por seções separadas, e não por um seletor a mais.
2. **Cada idioma é um botão, com o texto repetido dentro de um `<noscript>`.** Sem JavaScript o botão some, pela regra do `base.css`, e a lista continua à vista. A meia-pílula menta no canto é o que diz que a linha faz alguma coisa.
3. **"Para a sua equipe" reaproveita o bloco escuro da etapa 4**, que virou o componente `Pontos` e ganhou um botão de contato opcional.
4. **Os textos dos níveis são a escala global do Conselho da Europa em português claro.** Não é tradução literal: é o que a pessoa consegue fazer em cada nível.
5. **A preparação para provas descreve cada exame numa linha.** São os 6 que o site atual lista, e as descrições são fato público sobre o exame, não promessa da 9vee.

## Decisões da etapa 6

1. **A etiqueta de obra ficou no hero, acima do rótulo.** Quem abre a página lê antes de tudo que ela ainda não está completa, e o resto do texto é verdade sobre o serviço.
2. **O texto do LMS diz o que a 9vee precisa saber, não o que a plataforma faz.** O site atual não tem uma linha sobre o LMS, então a página mostra as três perguntas do pedido e marca o resto como pendência.
3. **Os dois blocos repetidos viraram componentes de verdade:** `Pontos` (escuro, com marcadores) e `Cartoes` (claro, com cartões). As quatro páginas novas usam os dois.
4. **A descrição do LMS perdeu os "relatórios de frequência"**, que tinham escapado da revisão das etapas 1 a 3. O site atual não afirma isso.

## Decisões da etapa 7

1. **A medida do Lighthouse é feita com gzip.** A primeira rodada deu LCP de 2,1 s a 2,5 s porque o servidor local mandava os 130 KB de HTML sem compressão. A Cloudflare comprime, então o servidor da medida também comprime. Sem isso, a medida castiga bytes que a produção nunca envia.
2. **Sem escolha, a página de Idiomas abre nos formatos**, e não na ordem de empresa das outras listas. É a vitrine de quem estuda por conta própria. Por isso o `data-ordenavel` agora aceita dizer qual ordem vale sem escolha.
3. **A revelação por rolagem fica como está**, em 11 a 17 elementos por página. A régua do `humanizar-ui` pede no máximo dois momentos de movimento, mas o modo de falha que ela teme, a tela em branco no celular, não acontece aqui: a animação roda quando o elemento entra e some inteira com movimento reduzido. É o mesmo movimento aprovado na home.
4. **As meias-pílulas decorativas continuam com medida em `rem` crua.** São forma, não tamanho de texto, e o `Faq` já fazia assim desde a etapa 2.

## Pendências técnicas

- **JavaScript:** dentro do teto (30 KB) e da meta interna (10 KB com gzip). O teste de build confere em todas as páginas.
- **Teste em aparelho de verdade,** que continua com o Maxwell: o link do WhatsApp, o teclado virtual no drawer e a troca de fonte num Android e num iPhone. No laboratório o CLS é 0,000, mas aparelho de verdade é aparelho de verdade.
- **Para a reunião:** a página de NR-1 não tem nenhuma prova, nenhum caso e nenhum número. É honesto, porque não há dado confirmado, mas é a maior fraqueza dela para quem decide. Vale pedir à Daniella um caso real de treinamento já dado.
- **Etapa 8:** tirar a página `/especime/` antes de publicar e criar o script que lista as pendências para o roteiro da reunião. O script deve ignorar os comentários do YAML, que também citam o formato `[CONFIRMAR ...]`.

## Pendências de conteúdo para a Daniella

Já marcadas no site com a etiqueta "a confirmar":

- ano de fundação: 19 anos nos números ou "mais de 20" no Quem Somos;
- quantidade de idiomas: 14 na home ou "inglês e mais 11" na página de cursos;
- número de clientes e de profissionais;
- autorização por escrito dos depoimentos de Eduardo Martins (Nissan), Bruno Teixeira (GM) e Pedro Cavalcante (Embraer), e confirmação de que as falas são deles;
- prazo de resposta do comercial e em quanto tempo a proposta costuma sair;
- se o comercial responde com valor já no primeiro contato, e uma faixa de preço por serviço para a FAQ;
- situação do regulamento da Lei 14.831 na data da publicação;
- a pronúncia certa da marca.

Do NR-1, da etapa 4:

- se o treinamento também é presencial e em que cidades;
- carga horária total e em quantos encontros ela é dividida;
- mínimo e máximo de pessoas por turma;
- como a 9vee entrega o plano de ação no fim do treinamento;
- que comprovante a empresa recebe e se cada participante ganha certificado;
- se há turma com a equipe inteira, e não só com a liderança;
- faixa de preço do treinamento.

Dos Idiomas, da etapa 5:

- se as aulas de idioma também acontecem presencialmente, e em que cidades;
- quantas horas de aula costumam levar de um nível para o outro;
- se a 9vee emite certificado no fim do curso, e de que tipo;
- faixa de preço das aulas.

Das parciais, da etapa 6:

- como é o LMS que a 9vee usa hoje, o que o RH acompanha nele e se há conteúdo próprio;
- ano de fundação, de novo, agora no Quem Somos.

Fora do site, para a reunião: uma leitura jurídica do argumento de risco da página de NR-1.

## O que falta na etapa 8

Com o Maxwell:

- [ ] abrir o preview no Android e no iPhone e passar pelo checklist do `docs/roteiro-apresentacao.md`, principalmente a saída pelo WhatsApp, o teclado virtual no pedido e a prévia do link;
- [ ] gerar as 5 imagens que faltam, ou pelo menos o hero de Cursos de Idiomas, que é a primeira tela de quem entra pela página de cursos;
- [ ] salvar a `home-hero-frente` como `.png` com fundo transparente;
- [ ] decidir se as 7 imagens do Gemini entram no git;
- [ ] mandar o link para a Daniella e o Arthur e levar `relatorios/pendencias.md` para a reunião.

Para publicar de novo, depois de qualquer mudança:

```
SITE_URL=https://9vee-preview.9vee-site.workers.dev npm run build && npx wrangler deploy
```

O endereço é sempre o mesmo, então o link que já foi mandado continua valendo.

## Como retomar

- `npm test`: testes de lógica, os dois builds (o padrão e o indexável, em `dist-indexavel/`) e os testes do HTML gerado.
- `npm run e2e`: build e testes no navegador (Android e desktop no Chrome instalado, iPhone no WebKit do Playwright).
- `node scripts/screenshots.ts etapa-6`: capturas em `relatorios/etapa-6/`, fora do git. Os roteiros vão de `etapa-1` a `etapa-6`.
- `npm install --no-save lighthouse && node scripts/lighthouse.ts`: a medição das 3 páginas completas nos dois builds.
- `node scripts/pendencias.ts`: a lista de pendências dos textos, em `relatorios/pendencias.md`.
- `npm run deploy`: build padrão e publicação na Cloudflare (precisa do `wrangler login` antes).
- `npm run dev:rede`: o site na rede local, para abrir no celular.
- `npx astro check`: tipos.

Na última rodada: 77 testes de lógica, 258 do HTML (nenhum pulado, depois que o espécime saiu) e 107 no navegador (79 pulados de propósito: teclado físico e larguras rodam só no desktop, e o movimento só no Chromium).

Notas do ambiente:

- o `.npmrc` com `legacy-peer-deps=true` é necessário para o `npm install`;
- no Astro 7 o `astro preview` vai para segundo plano sozinho, então os testes usam `scripts/servidor-preview.ts`;
- no WebKit o rastro do Playwright fica desligado, porque trava os testes em paralelo no Windows;
- com a máquina muito ocupada, testes de navegador podem estourar o tempo; rodar de novo antes de caçar defeito. Na etapa 4 isso aconteceu uma vez, no teste do WhatsApp no iPhone, e passou na repetição.
