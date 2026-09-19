# Andamento do MVP da 9vee

Atualizado em 18/09/2026, ao fim da etapa 3. Para retomar, vá direto para "Próxima etapa".

## Onde estamos

| Etapa | Situação | Commit |
|---|---|---|
| 0. Spec, padrões e ativos da cliente | feita e aprovada | `5673eec` (tag `mvp-base`) |
| 1. Base visual | feita e aprovada | `453c5f2` |
| 2. Home | feita e aprovada | `e375d5a` |
| 3. Drawer de contato e WhatsApp | entregue; as decisões abaixo esperam a sua revisão | `be20fd3` e `d2c50d2` |
| 4. Treinamento de NR-1 | **próxima** | |
| 5. Cursos de Idiomas | a fazer | |
| 6. Páginas parciais | a fazer | |
| 7. Verificação e revisão | a fazer | |
| 8. Publicação e reunião | a fazer | |

Os commits das etapas 1, 2 e 3 ainda não estão no GitHub. Para enviar: `! git push`.

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

Arquivos principais: `src/components/Drawer.astro`, `CampoContato.astro`, `BotaoWhatsApp.astro`, `src/scripts/contato.ts`, `src/lib/contato.ts` e `src/styles/formulario.css`.

## Decisões da etapa 3 para você revisar

Nenhuma bloqueia a etapa 4. Todas mudam em poucos minutos.

1. **Nome obrigatório nas duas saídas.** O comercial chama a pessoa pelo nome, e o do perfil do WhatsApp nem sempre é o nome dela.
2. **No toque, escolher o público ou o serviço já avança.** No teclado, as setas só marcam e o Enter avança.
3. **Quem escolheu "Para você" chega com "Cursos de idiomas" marcado, e o título vira "Montar suas aulas".** O botão dessa pessoa diz "Quero estudar".
4. **O público escolhido no drawer vale para o site todo.** É a mesma pergunta do hero.
5. **No passo final, as saídas vêm logo abaixo do nome, e o "Confira o pedido" vem depois.** Assim as duas saídas aparecem no celular sem rolar.
6. **Desvio do brief:** a pergunta do passo 1 ficou "É para sua empresa ou para você?", na ordem dos botões. O brief escreve "É para você ou para sua empresa?". Recomendo manter, porque a ordem empresa e depois você é a mesma do hero e do menu.
7. **Texto novo:** a descrição curta de cada serviço no passo 2 (em `servicos`, no `content/site.md`).

## Pendências técnicas

- **JavaScript:** 13,2 KB sem compressão e 5,1 KB com gzip por página. O teto de 30 KB está longe; a meta interna de 10 KB só é cumprida com gzip. Recomendo manter. Se quiser os 10 KB sem compressão, a etapa 7 pode carregar o drawer só no primeiro clique.
- **Etapa 7:** Lighthouse nas 3 páginas completas, o CLS da troca de fonte num Android de verdade e o teste manual do link do WhatsApp e do teclado virtual no Android e no iPhone.
- **Etapa 8:** tirar a página `/especime/` antes de publicar e criar o script que lista as pendências para o roteiro da reunião.

## Pendências de conteúdo para a Daniella

Já marcadas no site com a etiqueta "a confirmar":

- ano de fundação: 19 anos nos números ou "mais de 20" no Quem Somos;
- quantidade de idiomas: 14 na home ou "inglês e mais 11" na página de cursos;
- número de clientes e de profissionais;
- autorização por escrito dos depoimentos de Eduardo Martins (Nissan), Bruno Teixeira (GM) e Pedro Cavalcante (Embraer), e confirmação de que as falas são deles;
- prazo de resposta do comercial e em quanto tempo a proposta costuma sair;
- se o comercial responde com valor já no primeiro contato;
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
- a imagem do hero como Placeholder, com o prompt em `docs/imagens-gemini.md`;
- testes do HTML e roteiro de capturas `etapa-4`.

Antes de escrever, confirmar se o regulamento da Lei 14.831 já saiu.

## Como retomar

- `npm test`: testes de lógica, build e testes do HTML gerado.
- `npm run e2e`: build e testes no navegador (Android e desktop no Chrome instalado, iPhone no WebKit do Playwright).
- `node scripts/screenshots.ts etapa-3`: capturas em `relatorios/etapa-3/`, fora do git.
- `npm run dev:rede`: o site na rede local, para abrir no celular.
- `npx astro check`: tipos.

Na última rodada, os 67 testes de lógica, os 212 do HTML e os 75 do navegador passaram (6 pulados de propósito: os de teclado físico só rodam no desktop).

Notas do ambiente:

- o `.npmrc` com `legacy-peer-deps=true` é necessário para o `npm install`;
- no Astro 7 o `astro preview` vai para segundo plano sozinho, então os testes usam `scripts/servidor-preview.ts`;
- no WebKit o rastro do Playwright fica desligado, porque trava os testes em paralelo no Windows.
