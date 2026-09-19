# Spec: MVP navegável do novo site da 9vee

- **Data:** 18/09/2026
- **Autor:** Maxwell Rigo Moraes (DEVMRMORAES)
- **Decisores:** Daniella e Arthur, da 9vee
- **Origem:**
  - o brief do MVP;
  - a proposta comercial de 16/09/2026 (`docs/PropostaNovee.pdf`);
  - a leitura do site atual em 18/09/2026;
  - o kit de marca da cliente;
  - duas rodadas de perguntas (grilling), cujas decisões estão abaixo.

## Glossário

- **Público:** a escolha do visitante entre "Para sua empresa" (empresa) e "Para você" (pessoa física). Depois de feita, vale no site inteiro. Antes dela, o site está no estado "sem escolha".
- **Lead quente:** contato que já sabe do que precisa, tem data e tem quem assine (RH, SESMT, marketing de eventos, diretoria).
- **Drawer de contato:** o painel lateral, dentro da página, onde o visitante monta o pedido de orçamento em passos.
- **Saídas do drawer:** "Falar agora no WhatsApp" e "Prefiro receber contato".
- **Faixa de prova:** a linha de números logo abaixo do hero da home.
- **Pendência:** todo dado não confirmado. No texto, é escrito `[CONFIRMAR COM A DANIELLA: ...]`; na tela, aparece com destaque discreto.
- **Placeholder:** a imagem provisória na cor da marca, com o ID e o alt definitivo, trocada depois pela imagem gerada no Gemini.
- **Página completa:** Home, Treinamento de NR-1 e Cursos de Idiomas, com todas as seções.
- **Página parcial:** Tradução Simultânea, LMS e Quem Somos, com hero, texto curto e a etiqueta "página em construção no MVP".

## Problem Statement

**Do ponto de vista da Daniella e do Arthur,** o site atual traz visita, mas não traz pedido de orçamento de quem tem verba, prazo e decisão. Há quatro sintomas:

- Quem procura treinamento de NR-1 não acha a 9vee, porque o assunto não aparece em menu, título ou endereço.
- Quem já está no site e quer orçamento é mandado de volta para a home e perde a página que estava lendo.
- Os 14 idiomas da home são figuras sem link.
- O site fala do mesmo jeito com o RH de uma indústria e com a pessoa que quer aprender espanhol para viajar.
- A marca ainda aparece escrita de dois jeitos, "9vee" e "Novee".

**Do ponto de vista do visitante:**

- **A empresa** quer saber rápido se a 9vee resolve a obrigação da NR-1, um evento com intérprete ou a formação de uma equipe, e pedir orçamento sem explicar tudo duas vezes.
- **A pessoa física** quer saber se tem o idioma dela, em que formato e para qual objetivo, e falar com alguém sem sair da página.

**Do ponto de vista do Maxwell,** é preciso um MVP que convença em poucos minutos, no celular, sem prometer nada que a 9vee não confirmou.

## Solution

Um MVP navegável, publicado num link de preview escondido do Google, com:

- **Visual novo** derivado do kit de marca: calmo, sofisticado, com parallax leve feito em CSS e liso no celular.
- **Escolha de público na home.** Ela muda na hora a ordem dos serviços, o texto do botão de ação e a mensagem do WhatsApp, e fica lembrada nas outras páginas. O menu tem dois grupos: Empresas e Para você.
- **Três páginas completas:** Home; Treinamento de NR-1, página própria e vitrine do B2B; e Cursos de Idiomas, vitrine do B2C. Três páginas parciais garantem que nenhum link do menu quebre.
- **Contato sem sair da página.** Todo botão de ação abre o mesmo drawer, com o serviço da página já escolhido, perguntas por serviço em botões de escolha e duas saídas: o WhatsApp com a mensagem pronta, numa nova aba, ou a confirmação na própria tela. Há um botão flutuante de WhatsApp em todas as páginas.
- **SEO visível no código das três páginas completas** (título, descrição, um H1, hierarquia e dados estruturados), como argumento de venda.
- **Toda informação não confirmada marcada como pendência,** com a lista pronta para a reunião.

## User Stories

### Visitante empresa (RH, SESMT, diretoria, marketing de eventos)

1. Como gestora de RH, quero ver na home, sem rolar muito, que a 9vee faz treinamento de NR-1, para saber que estou no lugar certo.
2. Como técnico do SESMT, quero entender em um parágrafo por que o tema é urgente agora, com a fonte oficial, para levar o argumento à diretoria.
3. Como técnico do SESMT, quero ver os três módulos do treinamento, para avaliar se o conteúdo cobre riscos psicossociais.
4. Como diretor, quero saber o que a empresa recebe no final do treinamento, para justificar o investimento.
5. Como gestora de RH, quero saber o formato e a carga horária, para planejar a agenda da equipe.
6. Como gestora de RH, quero que a página não me prometa conformidade automática com a NR-1, para confiar no resto do que está escrito.
7. Como responsável por um evento, quero pedir intérprete informando idiomas, data, formato, número de participantes e cidade, para receber um orçamento já dimensionado.
8. Como responsável por treinamento, quero pedir um LMS informando número de usuários, plataforma atual e tipo de conteúdo, para receber uma proposta realista.
9. Como gestora de RH, quero pedir aulas de idioma para a equipe informando idioma, número de alunos, nível e formato.
10. Como visitante empresa, quero escolher "Para sua empresa" uma vez e ver o site inteiro falar comigo, para não precisar me identificar de novo em cada página.
11. Como visitante empresa, quero que o formulário já saiba de qual serviço eu vim, para não repetir a informação.
12. Como visitante empresa, quero escolher opções em vez de digitar, para terminar o pedido em menos de um minuto no celular.
13. Como visitante empresa, quero mandar tudo pelo WhatsApp com a mensagem pronta e continuar com o site aberto.
14. Como visitante empresa sem pressa, quero pedir que me contatem deixando telefone ou e-mail, e ver a confirmação na mesma tela.
15. Como visitante empresa, quero chegar ao serviço que procuro em até dois toques a partir da home.
16. Como visitante empresa, quero ver quem já contratou a 9vee, com nome, cargo e empresa, para ter prova.
17. Como visitante empresa, quero ver onde há atendimento presencial (São Paulo, Rio de Janeiro, Curitiba e Brasília) e saber que também há online.

### Visitante pessoa física

18. Como pessoa que quer aprender um idioma, quero escolher "Para você" e ver os cursos primeiro.
19. Como aluno em potencial, quero ver os 14 idiomas agrupados por família, com uma saudação em cada língua, para achar o meu rápido.
20. Como aluno em potencial, quero tocar no meu idioma e ir direto para ele na página de cursos.
21. Como aluno em potencial, quero entender a régua de A1 a C2 em palavras simples, para saber onde estou e aonde quero chegar.
22. Como aluno em potencial, quero saber se há aula presencial na minha cidade, online ou particular.
23. Como candidato a uma prova de proficiência, quero saber se a 9vee prepara para a prova que vou fazer.
24. Como aluno em potencial, quero pedir informação dizendo idioma, objetivo, nível e formato, sem digitar mais do que o meu nome.
25. Como aluno em potencial, quero que a mensagem do WhatsApp já diga o que eu quero, na minha voz, para não explicar tudo de novo.
26. Como pessoa que mudou de ideia, quero trocar entre "Para você" e "Para sua empresa" a qualquer momento.

### Todos os visitantes

27. Como visitante no celular, quero que a página carregue rápido no 4G e não pule enquanto carrega.
28. Como visitante no celular, quero que o botão do WhatsApp não fique em cima do texto nem dos botões.
29. Como visitante que prefere menos movimento, quero que o parallax desligue quando meu sistema pede menos movimento.
30. Como visitante que navega pelo teclado, quero abrir, preencher e fechar o drawer sem mouse, com o foco visível, preso no drawer enquanto ele está aberto e de volta ao botão que o abriu quando ele fecha.
31. Como usuário de leitor de tela, quero ouvir em que passo do pedido estou e qual campo falta.
32. Como visitante, quero que todo link diga para onde vai.
33. Como visitante que ouviu falar da "Novee", quero achar a 9vee buscando pelo nome do jeito que ouvi.

### Comercial da 9vee

34. Como atendente, quero receber no WhatsApp uma mensagem que já diga a página de origem, o público e as respostas, para priorizar sem perguntar o básico.
35. Como atendente, quero separar de cara o evento de 40 pessoas do de 400.

### Maxwell (apresentação e manutenção)

36. Como Maxwell, quero demonstrar tudo no meu celular e mandar um link que a Daniella e o Arthur abram no deles.
37. Como Maxwell, quero que o preview não apareça no Google nem dispute com o site atual.
38. Como Maxwell, quero mostrar os números do Lighthouse das três páginas completas, com o SEO 100 medido sem o bloqueio do preview.
39. Como Maxwell, quero trocar cada imagem provisória salvando o arquivo gerado no Gemini com o nome indicado, sem mexer em código.
40. Como Maxwell, quero ver no MVP, com destaque discreto, todo dado que falta confirmar, e ter a lista pronta para a reunião.
41. Como Maxwell, quero editar os textos em arquivos separados do código, um por página.
42. Como Maxwell, quero um roteiro curto da demonstração, com o antes e depois ligado aos quatro motivos da proposta.
43. Como Maxwell, quero que a prévia do link no WhatsApp mostre a marca da 9vee quando eu mandar o preview.

### Daniella e Arthur

44. Como decisora, quero ver a marca escrita de um jeito só.
45. Como decisora, quero reconhecer as cores e as formas da nossa marca, num tom calmo e sofisticado.
46. Como decisor, quero ver o NR-1 com página própria e lugar no menu.
47. Como decisor, quero testar o pedido de orçamento até o WhatsApp no meu próprio celular.

## Implementation Decisions

### Stack e organização

- Site estático em Astro 7 (versão atual: 7.3), CSS com custom properties e TypeScript só nas partes interativas. Sem framework de interface, sem jQuery e sem GSAP: todos os efeitos pedidos cabem em CSS.
- Os textos ficam separados do código: um arquivo Markdown por página (frontmatter estruturado e prosa no corpo) e mais um arquivo com os textos compartilhados (menu, rodapé, drawer, mensagens do WhatsApp e mensagens de erro).
- **Endereços:** mantêm os atuais onde a página continua (curso-de-idiomas, traducao-simultanea, lms, quem-somos), para ninguém perder link. A página nova de NR-1 fica em `treinamento-nr-1`. Todo endereço termina com barra.
- **Páginas além das seis:** a 404, que a Cloudflare serve para endereço inexistente, e a `/especime/`, página de trabalho da etapa 1 que sai antes da publicação.

### Marca e visual

- **Grafia:** "9vee" em todo texto. "Novee" aparece uma vez por página, no rodapé ("9vee, lê-se Novee"), e nos dados estruturados como nome alternativo. O logo secundário "NOVEE" não é usado.
- **Paleta derivada do kit,** com uma função para cada cor (contraste medido sobre o fundo indicado):

  | Papel | Cor | Origem | Regra |
  |---|---|---|---|
  | papel (fundo base) | #F9F9F9 | oficial | |
  | branco (drawer e campos) | #FFFFFF | | |
  | navy (texto e blocos escuros) | #212D4D | oficial | 12,9:1 sobre o papel |
  | navy-2 (texto secundário) | #525B75 | derivado | 6,4:1 sobre o papel |
  | névoa (fundo alternado) | #EEF0F6 | derivado | |
  | sobre-escuro (texto secundário no navy) | #B8BFD3 | derivado | 7,4:1 sobre o navy |
  | noite (rodapé e véus) | #161E33 | derivado | um tom abaixo do navy, para o rodapé fechar a página |
  | linha (fios e bordas) | #DCDFE8 | derivado | só em fio de 1 px, nunca como texto |
  | menta forte (hover do botão) | menta com 14% de navy | derivado | navy sobre ela segue acima de 7:1 |
  | menta (botões) | #16DF97 | oficial | sempre com texto navy (7,8:1); nunca como texto sobre fundo claro |
  | magenta (anel de foco e formas) | #FE19D6 | oficial | 3,2:1 no claro e 4,1:1 no navy, suficiente para indicador de foco; nunca como texto |
  | violeta (formas e gradientes) | #5C58F4 | oficial | não é usado em texto de interface |

- **Tipografia:** no máximo 2 famílias, hospedadas no próprio site, com `font-display: swap`. Readex Pro (600) nos títulos e Source Sans 3 (400 e 700) no texto, as duas com licença OFL. A Atkinson Hyperlegible Next, proposta no começo, saiu na etapa 1: o zero dela é cortado ("2Ø26"), sem alternativa na fonte, e isso pesa em datas, telefones e números de lei. A fonte do logo (Neulis Sans) não entra, porque a licença cobre só o logo.
- **Assinatura visual, "as duas metades":** os meios-círculos do padrão da marca, que se juntam num círculo conforme a rolagem. A escolha de público usa o mesmo desenho: duas metades de uma pílula.
- **Movimento:**
  - parallax do hero da home em camadas (fundo, plano médio e texto);
  - faixa de saudações nos 14 idiomas, que anda com a rolagem;
  - "Como funciona" em rolagem fixa, com as etapas trocando;
  - contadores na faixa de prova;
  - revelações suaves.
  - Anima só `transform` e `opacity`. Com `prefers-reduced-motion`, o parallax desliga por completo. Onde o navegador não tem animação por rolagem em CSS (hoje, o Firefox), um IntersectionObserver faz uma revelação simples.

### Público duplo

- O estado tem dois valores (empresa, você), além do estado inicial sem escolha. Fica guardado no navegador e é aplicado antes da primeira pintura, para a página não pular.
- **Efeitos da escolha:**
  - a ordem dos serviços: sem escolha ou empresa, NR-1, Tradução Simultânea, Idiomas e LMS; com "você", Idiomas vem primeiro;
  - o texto do botão de ação;
  - a mensagem do WhatsApp;
  - o passo 1 do drawer, que já vem respondido;
  - a ordem das modalidades na página de Idiomas.
- A ordem do documento acompanha a ordem visual, para teclado e leitor de tela.
- O tom e o visual são os mesmos para os dois públicos. Só o argumento muda: a empresa quer conformidade, previsibilidade e resultado; a pessoa quer carreira, viagem e confiança para falar.

### Drawer de contato

- Um único drawer por página, aberto por todo botão de ação. Cada botão informa o serviço da página; na home, alguns não informam nenhum.
- **Passos:**
  1. Para quem é.
  2. O serviço.
  3. Os campos do serviço.
  4. O nome e as duas saídas.

  O drawer abre no primeiro passo sem resposta, e os passos já respondidos aparecem como um resumo que dá para editar.
- **Serviço já escolhido ao abrir,** nesta ordem: o do botão, o que a pessoa escolheu antes na mesma página, o da página e, para quem escolheu "Para você", os cursos de idiomas (o botão dela diz "Quero estudar"). Sem nenhuma dessas pistas, a pessoa escolhe no passo 2.
- **Título:** "Pedir orçamento"; vira "Montar suas aulas" quando o pedido é de idiomas para a própria pessoa. O passo 3 tem título por serviço ("Sobre o treinamento", "Sobre o evento"...).
- **Avanço:** no toque, escolher o público ou o serviço já leva ao passo seguinte. No teclado, as setas só marcam a opção, e o Enter avança. Nos outros passos, o avanço é sempre pelo botão "Continuar".
- **Campos por serviço** (seção 5 da proposta, com botões de escolha sempre que possível):

  | Serviço | Campos e opções |
  |---|---|
  | Tradução Simultânea | Empresa (texto; opcional quando o público é "você"). Idiomas (várias escolhas: inglês, espanhol, mandarim, francês, italiano, crioulo haitiano, coreano, outro). Data do evento (a partir de hoje) ou "ainda sem data". Formato (presencial, online, híbrido). Participantes (até 50, 51 a 200, 201 a 500, mais de 500). Cidade (São Paulo, Rio de Janeiro, Curitiba, Brasília ou outra, com texto curto), fora quando o formato é online |
  | Treinamento de NR-1 | Empresa. Colaboradores (até 50, 51 a 200, 201 a 1.000, mais de 1.000). Prazo de adequação (o quanto antes, até 3 meses, de 3 a 6 meses, ainda sem prazo). Formato (presencial, online ao vivo, híbrido). Programa em andamento (sim, não, em construção) |
  | LMS | Empresa. Usuários previstos (até 50, 51 a 200, 201 a 1.000, mais de 1.000). Plataforma atual (não usamos, já usamos uma, não sei). Tipo de conteúdo (várias escolhas: idiomas, treinamentos internos, integração de novos colaboradores, outro) |
  | Idiomas, empresa | Empresa. Idioma (um dos 14). Alunos (1, 2 a 10, 11 a 50, mais de 50). Nível (iniciante, intermediário, avançado, misto ou não sei). Formato (presencial, online, híbrido) |
  | Idiomas, pessoa física | Idioma (um dos 14). Objetivo (carreira, viagem, prova de proficiência, mudança de país). Nível atual (nunca estudei, básico, intermediário, avançado, não sei). Formato (presencial, online). Cidade (as 4 ou outra), só quando o formato é presencial |

  No passo final, o nome é obrigatório. A saída "receber contato" pede também telefone ou e-mail; um dos dois basta, e ele é validado. Todo campo é obrigatório, a não ser quando marcado como opcional. Quando a cidade é "Outra", a mensagem leva só a cidade digitada.
- **Saída "Falar agora no WhatsApp":** um link para `wa.me/5511934661917` com a mensagem montada, aberto numa nova aba (`target="_blank" rel="noopener"`). A mensagem é escrita na voz do visitante: começa pela página de origem e pelo público, lista as respostas uma por linha e termina com o nome. Depois do toque, o drawer mostra que a conversa foi aberta, com um link de reserva. Exemplo:

  > Olá, 9vee. Vim pela página Treinamento de NR-1 do site e falo pela minha empresa.
  > Quero um orçamento de treinamento de NR-1.
  > Empresa: Metalúrgica Exemplo
  > Colaboradores: 201 a 1.000
  > Prazo de adequação: até 3 meses
  > Formato: presencial
  > Programa em andamento: não
  > Meu nome é Ana Souza.

- **Saída "Prefiro receber contato":** valida o telefone ou o e-mail e mostra na tela a confirmação, com o resumo do pedido e a etiqueta "MVP: envio simulado". Nada é enviado de verdade no MVP.
- **Acessibilidade:**
  - diálogo modal nativo, com o resto da página inerte;
  - foco preso no drawer, também no Safari;
  - Esc, o gesto de voltar do Android e o toque fora fecham o drawer;
  - o foco volta ao botão de origem;
  - o passo atual é anunciado, e o foco vai para o título de cada passo;
  - cada erro fica ligado ao campo e explica o que falta;
  - os campos têm 16 px ou mais, para não disparar o zoom do iPhone.
- **Interface do módulo de contato** (lógica pura, sem tela):
  - dados o serviço e o público, devolve a lista de campos com as opções;
  - dados o serviço, o público e as respostas, devolve os erros por campo;
  - dados o serviço, o público, as respostas, o nome e a página de origem, devolve a mensagem e o link do WhatsApp.

### Botão flutuante de WhatsApp

- Aparece em todas as páginas e vai direto ao WhatsApp, numa nova aba. A mensagem cita a página de origem e o público. Por exemplo: "Olá, 9vee. Vim pela página Cursos de Idiomas do site e quero aulas de idioma para mim."
- Usa a menta da marca, sem pulso, selo de notificação ou balão.
- Reserva espaço no fim da página, some quando o drawer ou o menu estão abertos e se recolhe ao rolar para baixo no celular.
- Na página, o WhatsApp tem só duas entradas: esse botão e a saída do drawer.

### Conteúdo e pendências

- **Faixa de prova:** 14 idiomas, 19 anos, +160 clientes e +65 profissionais, os números que o site atual publica. Os quatro são pendências, porque o próprio site se contradiz: o Quem Somos diz "mais de 20 anos", e a página de Idiomas fala em 12 idiomas.
- **Depoimentos** de Eduardo Martins (Nissan), Bruno Teixeira (GM) e Pedro Cavalcante (Embraer): trecho literal, sem reescrita e sem logo, com nome, cargo e empresa, marcados "a confirmar autorização". Os trechos escolhidos não citam a marca.
- **NR-1:**
  - fiscalização com autuação desde 26/05/2026, pela Portaria MTE nº 1.419/2024;
  - Certificado Empresa Promotora da Saúde Mental, criado pela Lei 14.831/2024, com o regulamento ainda pendente;
  - fontes oficiais citadas na página;
  - o texto trata o treinamento como uma das medidas do PGR, sem prometer conformidade;
  - o argumento "ações até 2046" do site atual não entra, porque não tem fonte;
  - carga horária, formato e o que a empresa recebe entram como pendências;
  - o presencial do treinamento também é pendência, porque o site atual só afirma presencial para tradução. Por isso o `Service` do JSON-LD atende "Brasil", e não as 4 cidades.
- **Idiomas:** os 14 idiomas do site atual agrupados por família, cada um com a saudação na própria língua e o `lang` correto.
  - Românicas: português, espanhol, francês, italiano e romeno.
  - Germânicas: inglês, alemão, holandês, sueco e norueguês.
  - Outras famílias: russo, árabe, mandarim e japonês.
  - A régua CEFR de A1 a C2 segue a escala global do Conselho da Europa.
  - As provas vêm do site atual: TOEFL iBT, CELPE-Bras, DELE, DELF/DALF, TCF e Inburgering.
  - A aula presencial de idiomas nas 4 cidades é pendência, porque o site atual só afirma presencial para tradução.
  - O site atual também afirma, e a página usa: aula online, aula individual para executivos, in company, turma de criança e adolescente com material da Cambridge, português para estrangeiros e diagnóstico de nível antes de começar.
- **Tradução simultânea,** do site atual: simultânea, consecutiva e acompanhamento; cabine e sistema de áudio; intérpretes em 7 idiomas (inglês, espanhol, mandarim, francês, italiano, crioulo haitiano e coreano); presencial em São Paulo, Rio de Janeiro, Curitiba e Brasília, o único presencial que o site atual afirma.
- **Regras de texto:**
  - português do Brasil, frases curtas, voz ativa e segunda pessoa;
  - nenhum travessão;
  - nenhuma destas palavras: jornada, alavancar, potencializar, robusto, revolucionar, desbloquear, "no cenário atual", mergulhe, transformador, sinergia, "de forma fluida";
  - nenhum marcador do comando humanizar;
  - nenhum link genérico ("mais", "veja mais", "clique aqui", "ir", "mais informações");
  - nenhum dado inventado.
- Uma rotina extrai todas as pendências dos textos para a lista da reunião.

### Imagens

- Nenhuma imagem de banco. O kit da cliente não tem foto nenhuma. Cada imagem do MVP é um Placeholder na proporção final: gradiente da marca, textura sutil do padrão, ID visível (por exemplo, IMG-HOME-HERO-FUNDO) e o alt definitivo.
- **Troca por nome de arquivo:** basta salvar a imagem do Gemini em `src/assets/imagens/`, com o nome indicado, e rodar o build. O site passa a servir AVIF com fallback WebP, srcset, width e height, lazy fora da primeira dobra e prioridade alta só no hero. A pasta é `src/assets/imagens/`, e não `public/images/`, porque o Astro só otimiza imagens dentro de `src/`.
- **Registro de cada imagem em `docs/imagens-gemini.md`:** ID, página e seção, proporção e tamanho final, nome do arquivo e prompt em inglês, sempre começando pelo estilo base do brief.
  - O hero da home sai em duas camadas: um prompt para o fundo, sem pessoas em primeiro plano, e outro para o elemento da frente, sobre fundo liso de cor única.
  - Cobre só o que o MVP usa: as camadas do hero da home, o hero do NR-1, o hero de Idiomas, as seções "Como funciona" e o hero das 3 páginas parciais.

### SEO, publicação e metas

- **Nas 3 páginas completas:**
  - título com até 60 caracteres e descrição entre 140 e 160;
  - um H1 e hierarquia correta;
  - canonical e Open Graph (a imagem de prévia é o banner do kit);
  - dados estruturados: `EducationalOrganization` em todas, com nome alternativo "Novee", redes e contato; `Service` no NR-1; `ItemList` de `Course` e `FAQPage` em Idiomas.
- **Preview na Cloudflare,** com Workers de arquivos estáticos, porque a Cloudflare hoje recomenda Workers no lugar do Pages para projeto novo.
  - O noindex vai por meta robots e por cabeçalho HTTP.
  - O robots.txt nunca bloqueia, senão o Google não chega a ler o noindex.
  - Um build com `INDEXAVEL=true` remove o noindex só para medir o SEO 100 localmente. Com noindex, o Lighthouse dá cerca de 66 a 69 em SEO, e isso é esperado.
- **Metas no Lighthouse mobile, nas 3 páginas completas:**
  - Performance ≥ 95, SEO 100 (no build indexável) e Acessibilidade ≥ 95;
  - LCP < 2,0 s e CLS < 0,05;
  - JavaScript inicial < 30 KB, com meta interna abaixo de 10 KB medida com gzip.
- **Navegação:** a próxima página é pré-renderizada quando o dedo ou o mouse chega no link (speculation rules, "moderate"; o Safari ignora), e a troca de página tem transição em CSS, só para quem não pediu menos movimento.
- **Ferramentas com risco conhecido:**
  - O CSS é minificado com esbuild, porque o minificador padrão do Vite 8 funde `animation-timeline` no atalho `animation` e quebra o parallax só no build. As animações são escritas por extenso, e `@scope` não é usado.
  - A pontuação automática do Markdown fica sem converter hífens em travessão.

## Testing Decisions

- **Um bom teste** verifica comportamento externo: o que o visitante vê, o que o comercial recebe e o que o Google lê. Não verifica detalhe de implementação.
- **Três seams, confirmados com o Maxwell na Fase 1:**
  1. **Lógica do contato e formatador de texto**, com testes unitários escritos antes do código:
     - campos por serviço e público;
     - validação;
     - mensagem e link do WhatsApp: página de origem, público, todas as respostas e acentos e quebras de linha codificados;
     - o formatador escapa HTML, transforma pendência em etiqueta e trata negrito e link.
  2. **HTML e CSS gerados**, testados depois do build:
     - um H1 por página e headings sem salto;
     - tamanhos de título e descrição;
     - JSON-LD válido e com os tipos certos por página, e FAQ do JSON-LD igual ao visível;
     - noindex presente, e ausente com `INDEXAVEL=true`;
     - nenhum travessão, palavra proibida ou link genérico;
     - "Novee" só nos dois lugares permitidos;
     - links e âncoras internos que resolvem;
     - `target="_blank"` sempre com `noopener`;
     - toda imagem com width, height e alt;
     - HTML válido (html-validate);
     - `animation-timeline` preservado no CSS;
     - JavaScript inicial somado por página.
  3. **Navegador** (Playwright, com Chromium e WebKit e perfis de iPhone e Pixel):
     - o drawer só pelo teclado, com foco preso, Esc, toque fora e retorno do foco;
     - o serviço já escolhido pela página;
     - o link do WhatsApp interceptado e conferido;
     - a confirmação de "receber contato";
     - a escolha de público reordenando e persistindo entre páginas;
     - o movimento reduzido desligando as animações (conferido só no Chromium);
     - nenhuma rolagem horizontal em 360, 390, 768, 1280 e 1920 px;
     - o botão flutuante sem cobrir o fim do rodapé.
- **Complementos:**
  - Lighthouse mobile, com a mediana de 3 rodadas, no build indexável e no preview publicado;
  - teste manual do WhatsApp num Android e num iPhone de verdade, feito pelo Maxwell. O WebKit no Windows não reproduz o Safari do iPhone.
- **Prior art:** não há; o repositório começa neste MVP.

## Out of Scope

- Páginas individuais por idioma e páginas por cidade.
- Limpeza dos 505 textos do blog e a tabela de redirects, inclusive `/treinamentos` para a nova página de NR-1 e a unificação das páginas de Mandarim.
- GA4, conversões, Search Console e aviso de cookies com Consent Mode.
- Envio real do formulário por e-mail ou para CRM.
- Versões completas de Tradução Simultânea, LMS e Quem Somos, que ficam parciais.
- Fotos reais e imagens geradas. O MVP usa Placeholders com os prompts prontos.
- Troca do domínio 9vee.com.br e saída do Wix.
- Versão do site em outros idiomas.

## Further Notes

### Pendências já conhecidas (vão para o roteiro da reunião)

- Ano de fundação (19 anos ou "mais de 20") e quantidade de idiomas (14 ou 12).
- Clientes (+160) e profissionais (+65).
- Autorização por escrito dos 3 depoimentos, e a confirmação de que as falas são reais: os textos têm marcas fortes de texto gerado.
- NR-1: carga horária, formato, tamanho de turma, entregáveis, certificado de participação e uma leitura jurídica do argumento de risco.
- Idiomas: aula presencial nas 4 cidades, faixa de preço, certificado e duração por nível.
- Prazo de resposta do comercial, para a tela de confirmação do drawer.
- Endereço e razão social para os dados estruturados.
- Pronúncia de "Novee".
- Situação do regulamento da Lei 14.831 na data da publicação.

### Fontes oficiais do NR-1

- Portaria MTE nº 1.419/2024: https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/sst-portarias/2024/portaria-mte-no-1-419-nr-01-gro-nova-redacao.pdf
- MTE, caráter educativo e autuação a partir de 26/05/2026: https://www.gov.br/trabalho-e-emprego/pt-br/noticias-e-conteudo/2025/abril/inclusao-de-fatores-de-risco-psicossociais-no-gro-comeca-em-carater-educativo-a-partir-de-maio
- Guia de fatores de riscos psicossociais (MTE): https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/guia-nr-01-revisado.pdf
- Manual do GRO/PGR da NR-1 (MTE, 2026): https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/manuais-e-publicacoes/2026/manual_gro_pgr_da_nr_1.pdf
- Lei 14.831/2024: https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/L14831.htm

### Ordem de construção

Cada etapa termina com um commit e uma parada para o "ok" do Maxwell.

1. Base visual: tokens, tipografia, menu e rodapé.
2. Home.
3. Drawer de contato e botão de WhatsApp.
4. Treinamento de NR-1.
5. Cursos de Idiomas.
6. Páginas parciais.
7. Verificação: Lighthouse, larguras, teclado, code-review, humanizar-ui e humanizar.
8. Publicação do preview e roteiro da apresentação.

O ponto fixo do code-review é a tag `mvp-base`.
