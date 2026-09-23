# Roteiro da apresentação do MVP

Para a Daniella e o Arthur. Primeiro no celular do Maxwell, depois com o link aberto no celular deles.
Quinze minutos de demonstração, e o resto da conversa para as respostas que faltam.

Não fale de preço nesta reunião. A proposta já está com eles.

## Antes de abrir a reunião

- [ ] `node scripts/pendencias.ts`, e leia `relatorios/pendencias.md`. São as perguntas da segunda metade da reunião.
- [ ] Abra o link do preview no seu Android e no seu iPhone, e passe pelo checklist do fim deste roteiro.
- [ ] Deixe o link pronto para mandar no WhatsApp. A prévia mostra o banner da marca.
- [ ] Limpe a escolha de público do navegador que vai apresentar, para a home abrir no estado inicial.

## A demonstração, na ordem

### 1. A home, sem tocar em nada (30 segundos)

Deixe a primeira tela parada e role devagar até a faixa de números. O que mostra sozinho: o visual novo, o movimento por rolagem e o nome da empresa escrito de um jeito só.

Diga que o site inteiro foi montado a partir do kit de marca deles, sem foto de banco.

### 2. A escolha de público (1 minuto)

Toque em "Para você". Os serviços se reordenam na hora, os idiomas sobem para o primeiro lugar e o botão vira "Quero estudar".

Volte para "Para sua empresa" e mostre o NR-1 voltando ao topo.

Essa é a resposta ao site que fala igual com o RH de uma indústria e com quem quer espanhol para viajar.

### 3. Treinamento de NR-1 (3 minutos)

Abra pelo menu, no grupo Empresas. É a página que hoje não existe.

Pare em três pontos:

- a linha do tempo: 27 de agosto de 2024, 26 de maio de 2025 e 26 de maio de 2026, com as fontes oficiais do Ministério do Trabalho no fim da seção;
- "O que a sua empresa recebe", e principalmente a ressalva: o treinamento não deixa a empresa em dia sozinho, a avaliação dos riscos continua com a empresa e o SESMT;
- as etiquetas "a confirmar" em formato e carga horária. Diga que elas são de propósito, e que a segunda metade da reunião é sobre elas.

### 4. O pedido, até o WhatsApp (3 minutos)

Ainda na página de NR-1, toque em "Pedir orçamento do treinamento".

- O passo do serviço já vem respondido, porque o pedido sabe de qual página você veio.
- Responda os cinco campos tocando nas opções. Digite só o nome da empresa e o seu.
- Toque em "Falar agora no WhatsApp". A mensagem abre escrita, com a página de origem, o público, as respostas e o nome.

Esse é o ponto alto. Pare aqui e deixe eles lerem a mensagem que o comercial receberia.

Volte e mostre a outra saída, "Prefiro receber contato", com a etiqueta "MVP: envio simulado". Explique que o envio de verdade entra depois da aprovação.

### 5. Cursos de Idiomas (2 minutos)

Volte para a home, role até os idiomas e toque em japonês. A página de cursos abre no japonês.

Toque no idioma de novo: o pedido abre com japonês já marcado.

Mostre a régua do A1 ao C2 e a preparação para provas. Se estiver com "Para sua empresa" escolhido, mostre que o bloco da equipe vem antes dos formatos.

### 6. As três páginas parciais (30 segundos)

Abra a Tradução Simultânea. Mostre a etiqueta "Página em construção no MVP" e diga que nenhum link do menu quebra: as três têm hero, um bloco curto e o pedido funcionando.

## O antes e o depois

| O que a proposta apontou no site atual | O que o MVP faz |
|---|---|
| Quem procura treinamento de NR-1 não acha a 9vee: o assunto não aparece em menu, título nem endereço | Página própria em `/treinamento-nr-1/`, no menu, com título, descrição e dados estruturados para o Google |
| Os 14 idiomas da home são figuras sem link | Cada idioma é um link na home e um botão na página de cursos, que já abre o pedido com ele marcado |
| Quem quer orçamento é mandado de volta para a home e perde a página que estava lendo | O pedido abre por cima da página, com o serviço já escolhido, e termina no WhatsApp com a mensagem pronta |
| O site fala do mesmo jeito com a empresa e com a pessoa física | A escolha de público muda a ordem, o texto dos botões e a mensagem do WhatsApp, e vale no site inteiro |
| A marca aparece escrita de dois jeitos | "9vee" em todo lugar, e "Novee" só no rodapé e nos dados estruturados, para quem procura pelo nome que ouviu |

A medição e a limpeza do blog ficam para depois da aprovação, como a proposta já previa.

## Os números que dá para mostrar

O Lighthouse no celular, nas três páginas completas: Performance de 98 a 100, Acessibilidade 100, Boas práticas 100 e SEO 100. O relatório está em `relatorios/etapa-7/lighthouse.md`.

O SEO do link que você vai mandar aparece como 66 a 69, e isso é de propósito: o preview está escondido do Google. O 100 é medido no mesmo site sem esse bloqueio.

## O que ainda não está no MVP

- O envio de verdade do formulário, por e-mail ou para o CRM.
- As versões completas de Tradução Simultânea, LMS e Quem Somos.
- Páginas por idioma e por cidade, a limpeza do blog e a tabela de redirecionamentos.
- A medição com GA4, as conversões e o aviso de cookies.
- A troca do domínio e a saída do Wix.

## A segunda metade: o que perguntar

Abra `relatorios/pendencias.md`. São 29 perguntas, agrupadas por página. Quatro valem mais que as outras, porque travam texto que já está no ar:

1. **Ano de fundação e quantidade de idiomas.** O site atual se contradiz nos dois.
2. **Os três depoimentos.** Precisa de autorização por escrito, e de confirmar que as falas são das pessoas.
3. **Onde há atendimento presencial,** por serviço. Hoje o site só afirma presencial para a tradução.
4. **Carga horária e formato do treinamento de NR-1,** que é a pergunta que todo RH faz primeiro.

Peça também um caso real de treinamento de NR-1 já dado. A página não tem nenhuma prova, e é a maior fraqueza dela para quem decide.

## Checklist do teste em aparelho de verdade

Faça antes da reunião, no seu Android e no seu iPhone.

- [ ] A home abre sem pulo enquanto as fontes carregam.
- [ ] O movimento por rolagem roda liso, sem travar.
- [ ] O botão do WhatsApp não cobre texto nem o fim do rodapé.
- [ ] O pedido abre, o teclado virtual não cobre o campo que está sendo preenchido, e dá para fechar com o toque fora.
- [ ] A saída pelo WhatsApp abre o aplicativo de verdade, com a mensagem escrita e os acentos certos.
- [ ] A escolha de público continua valendo depois de trocar de página e de fechar e abrir o navegador.
- [ ] Com o sistema em "menos movimento", as animações somem e a página continua legível.
