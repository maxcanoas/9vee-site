# Andamento do MVP da 9vee

Atualizado em 19/09/2026, depois da revisão das etapas 1 a 3. Para retomar, vá direto para "Próxima etapa".

## Onde estamos

| Etapa | Situação | Commits |
|---|---|---|
| 0. Spec, padrões e ativos da cliente | feita e aprovada | `5673eec` (tag `mvp-base`) |
| 1. Base visual | feita e aprovada | `453c5f2` |
| 2. Home | feita e aprovada | `e375d5a` |
| 3. Drawer de contato e WhatsApp | feita e aprovada, com as 7 decisões abaixo | `be20fd3` e `d2c50d2` |
| Revisão das etapas 1 a 3: humanizar e code-review | feita e aprovada | de `4608dd0` ao commit deste arquivo |
| 4. Treinamento de NR-1 | **próxima** | |
| 5. Cursos de Idiomas | a fazer | |
| 6. Páginas parciais | a fazer | |
| 7. Verificação e revisão final | a fazer | |
| 8. Publicação e reunião | a fazer | |

Os commits da revisão ainda não estão no GitHub. Para enviar: `! git push`.

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

**Revisão das etapas 1 a 3.** O `humanizar` na home e nos textos compartilhados, e o `code-review` desde `mvp-base`, nos dois eixos (padrões e spec). Correções:

- **textos:** saiu o que o site atual não diz (atendimento presencial para tudo, "no horário que você escolhe", "relatórios de frequência", cabine em visita); o botão flutuante cita o público em toda página; o passo 3 do drawer tem título por serviço, e os campos de texto, erro próprio;
- **defeitos:** transição entre páginas e giro dos indicadores só sem pedido de menos movimento; imagem da frente do hero sem `lazy`; números do "Como funciona" sem magenta; o texto da etiqueta de pendência veio para o `content/`;
- **testes novos:** movimento reduzido, build indexável sem noindex, tamanho do JavaScript, magenta e violeta fora do texto, rolagem horizontal em todas as páginas e no drawer, e unitários que faltavam;
- **tokens:** tamanhos, o fio entre as metades, o anel de foco, a duração lenta, as misturas de cor e a sombra do atalho;
- **refatoração:** tipos e listas únicas para públicos e serviços, e as linhas do pedido em pares de rótulo e valor;
- **documentação:** exceções no `padroes.md` e, na spec, os tons derivados, a página 404 e a navegação entre páginas.

## Decisões da etapa 3, aprovadas em 19/09/2026

1. Nome obrigatório nas duas saídas.
2. No toque, escolher o público ou o serviço já avança; no teclado, só o Enter avança.
3. Quem escolheu "Para você" chega com "Cursos de idiomas" marcado, e o título vira "Montar suas aulas".
4. O público escolhido no drawer vale para o site todo.
5. No passo final, as saídas vêm logo abaixo do nome, e o "Confira o pedido" vem depois.
6. A pergunta do passo 1 é "É para sua empresa ou para você?", na ordem dos botões (o brief escrevia "É para você ou para sua empresa?"). A legenda do hero usa a mesma pergunta.
7. Cada serviço tem uma descrição curta no passo 2.

## Pendências técnicas

- **JavaScript:** 13,7 KB sem compressão e 5,3 KB com gzip por página, dentro do teto (30 KB) e da meta interna (10 KB com gzip). O teste de build confere.
- **Etapa 7:** Lighthouse nas 3 páginas completas, o CLS da troca de fonte num Android de verdade e o teste manual do link do WhatsApp e do teclado virtual no Android e no iPhone.
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

A etapa 4 vai somar as do NR-1: carga horária, formato, tamanho de turma, o que a empresa recebe e certificado.

## Próxima etapa: 4, Treinamento de NR-1

**Seções, na ordem do brief:**

1. Hero para quem decide (RH, SESMT, diretoria).
2. Por que agora: fiscalização desde maio de 2026, risco jurídico e o certificado da Lei 14.831/2024, com as fontes oficiais citadas.
3. O que a empresa recebe no final.
4. Os 3 módulos.
5. Formato e carga horária, ou pendência se não houver a informação.
6. Abordagem.
7. FAQ.
8. Contato no meio e no fim da página.

**Regras de conteúdo** (da spec):

- O texto trata o treinamento como uma das medidas do PGR, sem prometer conformidade.
- A autuação vale desde 26/05/2026, pela Portaria MTE nº 1.419/2024.
- O "ações até 2046" do site atual não entra, porque não tem fonte.
- As fontes oficiais estão no fim da spec.

**Material do site atual:** 3 módulos.

- Módulo 1: NR-1, Saúde Mental e Riscos Psicossociais (marco legal, conceitos e diagnóstico).
- Módulo 2: Liderança Preventiva, Comunicação e Mudança de Mindset.
- Módulo 3: Aplicação Prática, Estudos de Caso e Plano de Ação.

A abordagem tem quatro etapas: conceituação, experimentação prática, reflexão, e aprendizado e resultado.

**Trabalho técnico:**

- trocar o esquema provisório da coleção `nr1` por um esquema próprio e escrever `content/treinamento-nr-1.md`;
- JSON-LD `Service`;
- os botões de contato com `data-servico="nr1"`;
- a imagem do hero como Placeholder, com o prompt em `docs/imagens-gemini.md` (se precisar de outra proporção, ela volta ao tipo da `Figura`);
- testes do HTML e roteiro de capturas `etapa-4`;
- rodar o `humanizar` nos textos novos antes de entregar a etapa.

Antes de escrever, confirmar se o regulamento da Lei 14.831 já saiu.

## Como retomar

- `npm test`: testes de lógica, os dois builds (o padrão e o indexável, em `dist-indexavel/`) e os testes do HTML gerado.
- `npm run e2e`: build e testes no navegador (Android e desktop no Chrome instalado, iPhone no WebKit do Playwright).
- `node scripts/screenshots.ts etapa-3`: capturas em `relatorios/etapa-3/`, fora do git.
- `npm run dev:rede`: o site na rede local, para abrir no celular.
- `npx astro check`: tipos.

Na última rodada: 73 testes de lógica, 245 do HTML (1 pulado de propósito: a regra de cor não vale para a página de espécime) e 101 no navegador (79 pulados de propósito: teclado físico e larguras rodam só no desktop, e o movimento só no Chromium).

Notas do ambiente:

- o `.npmrc` com `legacy-peer-deps=true` é necessário para o `npm install`;
- no Astro 7 o `astro preview` vai para segundo plano sozinho, então os testes usam `scripts/servidor-preview.ts`;
- no WebKit o rastro do Playwright fica desligado, porque trava os testes em paralelo no Windows;
- com a máquina muito ocupada, testes de navegador podem estourar o tempo; rodar de novo antes de caçar defeito.
