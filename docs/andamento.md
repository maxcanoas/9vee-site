# Andamento do MVP da 9vee

Atualizado em 19/09/2026, no fim da etapa 5. Para retomar, vá direto para "Próxima etapa".

## Onde estamos

| Etapa | Situação | Commits |
|---|---|---|
| 0. Spec, padrões e ativos da cliente | feita e aprovada | `5673eec` (tag `mvp-base`) |
| 1. Base visual | feita e aprovada | `453c5f2` |
| 2. Home | feita e aprovada | `e375d5a` |
| 3. Drawer de contato e WhatsApp | feita e aprovada, com as 7 decisões registradas abaixo | `be20fd3` e `d2c50d2` |
| Revisão das etapas 1 a 3: humanizar e code-review | feita e aprovada | de `4608dd0` a `f772212` |
| 4. Treinamento de NR-1 | feita e aprovada | `f6dce38` |
| 5. Cursos de Idiomas | **feita, esperando o ok** | commit deste arquivo |
| 6. Páginas parciais | **próxima** | |
| 7. Verificação e revisão final | a fazer | |
| 8. Publicação e reunião | a fazer | |

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
- "Como são as aulas", com as âncoras `#particular` e `#online` que o menu usa, e o presencial marcado como pendência;
- os 6 exames do site atual, com uma linha cada;
- "Para a sua equipe", o bloco B2B com âncora `#empresas`;
- "Como começa", com o diagnóstico de nível;
- FAQ de quem vai estudar e o contato no hero, no meio, no bloco da equipe e no fim.

Do lado técnico: esquema próprio da coleção `idiomas`, JSON-LD com `ItemList` de 14 `Course` (cada um apontando para a própria âncora) e `FAQPage` igual ao FAQ visível, quatro componentes novos (`Niveis`, `Aulas`, `Provas`, `ComoComeca`), o `Familias` com o modo de pedido, o `Entregas` da etapa 4 virou `Pontos` e serve às duas páginas, os prompts `IMG-IDIOMAS-HERO` e `IMG-IDIOMAS-COMO`, `tests/dist/idiomas.test.ts` e o roteiro de capturas `etapa-5`.

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

## Pendências técnicas

- **JavaScript:** dentro do teto (30 KB) e da meta interna (10 KB com gzip). O teste de build confere em todas as páginas.
- **Etapa 7:** Lighthouse nas 3 páginas completas, o CLS da troca de fonte num Android de verdade e o teste manual do link do WhatsApp e do teclado virtual no Android e no iPhone. Agora com imagens de verdade, medir também o peso delas.
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

Fora do site, para a reunião: uma leitura jurídica do argumento de risco da página de NR-1.

## Próxima etapa: 6, Páginas parciais

São Tradução Simultânea, LMS e Quem Somos. Cada uma fica com hero, um bloco curto e a etiqueta "página em construção no MVP", para nenhum link do menu quebrar.

**O que cada uma leva:**

- **Tradução Simultânea:** simultânea, consecutiva e acompanhamento; cabines e sistema de áudio; intérpretes em 7 idiomas (inglês, espanhol, mandarim, francês, italiano, crioulo haitiano e coreano); presencial em São Paulo, Rio de Janeiro, Curitiba e Brasília, que é o único presencial que o site atual afirma.
- **LMS:** o site atual não tem material. O texto fica curto e o que faltar vira pendência.
- **Quem Somos:** sede em São Paulo e o tempo de casa, que é pendência (19 anos nos números ou mais de 20 no texto).

**Trabalho técnico:**

- trocar o esquema provisório da coleção `parciais` por um esquema próprio;
- reaproveitar o `HeroPagina`, com imagem por página, e manter a etiqueta do MVP;
- o drawer com o serviço da página já escolhido (`traducao` e `lms`; Quem Somos não tem serviço);
- os 3 prompts que faltam em `docs/imagens-gemini.md`;
- testes do HTML e roteiro de capturas `etapa-6`;
- rodar o `humanizar` nos textos novos antes de entregar a etapa.

## Como retomar

- `npm test`: testes de lógica, os dois builds (o padrão e o indexável, em `dist-indexavel/`) e os testes do HTML gerado.
- `npm run e2e`: build e testes no navegador (Android e desktop no Chrome instalado, iPhone no WebKit do Playwright).
- `node scripts/screenshots.ts etapa-5`: capturas em `relatorios/etapa-5/`, fora do git.
- `npm run dev:rede`: o site na rede local, para abrir no celular.
- `npx astro check`: tipos.

Na última rodada: 75 testes de lógica, 262 do HTML (1 pulado de propósito: a regra de cor não vale para a página de espécime) e 104 no navegador (79 pulados de propósito: teclado físico e larguras rodam só no desktop, e o movimento só no Chromium).

Notas do ambiente:

- o `.npmrc` com `legacy-peer-deps=true` é necessário para o `npm install`;
- no Astro 7 o `astro preview` vai para segundo plano sozinho, então os testes usam `scripts/servidor-preview.ts`;
- no WebKit o rastro do Playwright fica desligado, porque trava os testes em paralelo no Windows;
- com a máquina muito ocupada, testes de navegador podem estourar o tempo; rodar de novo antes de caçar defeito. Na etapa 4 isso aconteceu uma vez, no teste do WhatsApp no iPhone, e passou na repetição.
