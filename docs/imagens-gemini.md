# Imagens para gerar no Gemini

Cada imagem do MVP é, por enquanto, um Placeholder com o ID visível. Para trocar:

1. Gere a imagem com o prompt da tabela.
2. Salve em `src/assets/imagens/` com o nome indicado.
3. Rode `npm run build`.

O site acha o arquivo pelo nome e passa a servir AVIF, WebP de reserva, srcset, width e height. Formatos aceitos: `.jpg`, `.jpeg`, `.png`, `.webp` e `.avif`. As camadas recortadas (a pessoa na frente do hero) vão em `.png`, com o fundo removido.

## Estilo base (início de todo prompt)

> Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition with negative space on the [left/right] for text, photorealistic, no text, no logos, no watermarks, no flags.

Todo prompt termina com a linha: `Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names.`

## Home

### IMG-HOME-HERO-FUNDO

- **Onde:** home, hero, camada de fundo (parallax).
- **Proporção e tamanho:** 16:9, 2400 × 1350.
- **Arquivo:** `home-hero-fundo.jpg`
- **Alt:** Auditório vazio antes de um evento internacional, com as cabines de tradução acesas ao fundo.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition with negative space on the left for text, photorealistic, no text, no logos, no watermarks, no flags. Scene: an empty modern conference auditorium in São Paulo minutes before an international event, seen from the side of the stage; rows of seats in soft focus, two glass simultaneous interpretation booths glowing with warm light at the back of the room, a tall window with the city at dusk. No people in the foreground; the room waits for the audience. Aspect ratio 16:9. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, text on screens.

### IMG-HOME-HERO-FRENTE

- **Onde:** home, hero, camada da frente (a pessoa recortada, na frente do círculo da marca).
- **Proporção e tamanho:** 4:5, 1200 × 1500. Recortar e salvar como PNG com fundo transparente.
- **Arquivo:** `home-hero-frente.png`
- **Alt:** Intérprete com fone e microfone, concentrada, olhando para o palco.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition with negative space on the right for text, photorealistic, no text, no logos, no watermarks, no flags. Scene: waist-up portrait of a Brazilian woman in her thirties working as a simultaneous interpreter, wearing a light headset with a small boom microphone, three-quarter view looking slightly to the left towards an unseen stage, calm and focused expression, navy blazer over a light top. Plain solid mint green (#16DF97) studio background, even lighting, crisp edges around hair and shoulders so the subject can be cut out cleanly. Deliver a PNG with a transparent background if the tool supports it; otherwise keep the plain green background and remove it afterwards. The file the site reads must be a PNG with transparency. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names.

### IMG-HOME-COMO-1

- **Onde:** home, "Como funciona", etapa 1 (você conta o que precisa).
- **Proporção e tamanho:** 4:5, 1200 × 1500 (aparece em moldura de arco).
- **Arquivo:** `home-como-1.jpg`
- **Alt:** Mãos segurando um celular numa mesa de café, escrevendo uma mensagem.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition with negative space on the right for text, photorealistic, no text, no logos, no watermarks, no flags. Scene: close-up of a Brazilian professional's hands holding a smartphone over a small café table, typing a message, a cup of coffee and a closed notebook beside it; the phone screen is turned slightly away and out of focus, nothing readable on it. Aspect ratio 4:5. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, readable text on the screen.

### IMG-HOME-COMO-2

- **Onde:** home, "Como funciona", etapa 2 (a equipe entende o seu caso).
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `home-como-2.jpg`
- **Alt:** Professora ouvindo um aluno adulto numa sala clara, com um caderno aberto na mesa.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition with negative space on the left for text, photorealistic, no text, no logos, no watermarks, no flags. Scene: a language teacher in her forties listening attentively to an adult student who is speaking, both seated at a round table in a bright meeting room, an open notebook and a pen between them, the student gesturing lightly while explaining a goal. Aspect ratio 4:5. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names.

### IMG-HOME-COMO-3

- **Onde:** home, "Como funciona", etapa 3 (você recebe a proposta).
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `home-como-3.jpg`
- **Alt:** Gestora de RH lendo uma proposta impressa na mesa do escritório.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition with negative space on the right for text, photorealistic, no text, no logos, no watermarks, no flags. Scene: a Brazilian HR manager in her fifties reading a printed proposal at her office desk by a window, pages slightly blurred so no text is readable, a tablet and a mug beside her, thoughtful and satisfied expression. Aspect ratio 4:5. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, readable text on paper or screens.

### IMG-HOME-COMO-4

- **Onde:** home, "Como funciona", etapa 4 (começa).
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `home-como-4.jpg`
- **Alt:** Pequeno grupo de colaboradores no começo de um treinamento, numa sala clara.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition with negative space on the left for text, photorealistic, no text, no logos, no watermarks, no flags. Scene: a small group of six diverse employees seated in a semicircle at the start of a workshop in a bright training room, a facilitator standing by a whiteboard that shows only simple abstract shapes, everyone relaxed and attentive, morning light. Aspect ratio 4:5. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, text on the whiteboard.

## Treinamento de NR-1

### IMG-NR1-HERO

- **Onde:** Treinamento de NR-1, hero (moldura de arco, ao lado do texto).
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `nr1-hero.jpg`
- **Alt:** Gestora de RH e técnico de segurança conversando numa sala de reunião, com a área de produção ao fundo.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition with negative space on the right for text, photorealistic, no text, no logos, no watermarks, no flags. Scene: a Brazilian HR manager in her forties and a workplace safety technician in his thirties talking across a small table in an industrial office, she is listening while he explains something, a closed laptop and a printed document face down between them; through the glass wall behind them, the factory floor is softly out of focus. Serious and respectful mood, not tense. Aspect ratio 4:5. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, safety helmets used as props, readable text on paper or screens.

## Cursos de Idiomas

### IMG-IDIOMAS-HERO

- **Onde:** Cursos de Idiomas, hero (moldura de arco, ao lado do texto).
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `idiomas-hero.jpg`
- **Alt:** Aluna adulta numa aula de idioma, sorrindo enquanto fala com a professora.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition with negative space on the right for text, photorealistic, no text, no logos, no watermarks, no flags. Scene: a Brazilian woman in her thirties in a one to one language lesson, caught mid-sentence with a relaxed smile, sitting at a small light wood table by a window with plants; her teacher is in the foreground, seen from behind and out of focus, so the student is clearly the subject. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, classroom blackboards, readable text on paper or screens.

### IMG-IDIOMAS-COMO

- **Onde:** Cursos de Idiomas, seção "Como começa" (moldura de arco, ao lado dos três passos).
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `idiomas-como.jpg`
- **Alt:** Aluno adulto na primeira aula online, com o caderno aberto ao lado do notebook.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition with negative space on the left for text, photorealistic, no text, no logos, no watermarks, no flags. Scene: a Brazilian man in his forties taking his first online language lesson at home, headphones on, looking at a laptop screen that is turned away from the camera, an open notebook and a pen beside the laptop, morning light from a window behind him. Attentive and comfortable, not tense. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, readable text on the screen or on the notebook.

## Páginas parciais

### IMG-TRADUCAO-HERO

- **Onde:** Tradução Simultânea, hero (moldura de arco, ao lado do texto).
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `traducao-hero.jpg`
- **Alt:** Intérprete na cabine de tradução, de fone, acompanhando o palco pelo vidro.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition with negative space on the right for text, photorealistic, no text, no logos, no watermarks, no flags. Scene: a Brazilian interpreter inside a glass simultaneous interpretation booth at a conference, wearing headphones and speaking into a small microphone, seen from inside the booth with the lit stage softly out of focus through the glass in front of her. Concentrated and calm. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, readable text on screens or slides.

### IMG-LMS-HERO

- **Onde:** LMS, hero (moldura de arco, ao lado do texto).
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `lms-hero.jpg`
- **Alt:** Colaborador estudando pela plataforma no notebook, numa mesa de escritório.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition with negative space on the left for text, photorealistic, no text, no logos, no watermarks, no flags. Scene: a Brazilian employee in his thirties studying on a laptop at his desk in a bright open office, headphones around his neck, a notebook and a mug beside the laptop, the screen turned away from the camera and out of focus; colleagues blurred in the background. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, readable text or interface on the screen.

### IMG-QUEM-SOMOS-HERO

- **Onde:** Quem Somos, hero (moldura de arco, ao lado do texto).
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `quem-somos-hero.jpg`
- **Alt:** Profissionais conversando numa sala de reunião clara, com a cidade na janela.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition with negative space on the right for text, photorealistic, no text, no logos, no watermarks, no flags. Scene: three Brazilian professionals of different ages talking in a bright meeting room in São Paulo, one leaning on the table and the others listening, the city skyline soft through a large window behind them. Everyday work moment, not a posed group portrait. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, team photo lineups, readable text on screens.

## Todas as imagens do MVP

Com a etapa 6, a lista fecha: as duas camadas do hero da home, as quatro do "Como funciona", o hero do NR-1, os dois de Idiomas e os três das páginas parciais.

## Páginas de idioma

Decidido em 30/09/2026, a pedido do Maxwell: o topo das páginas de idioma ganha uma foto, para o visitante reconhecer o país e o idioma logo de cara. Isso mudou a decisão "Topo tipográfico, sem foto" de `docs/fase-1-spec.md`, atualizada no mesmo dia.

**O conceito: a conversa no lugar.** Duas pessoas conversando numa cena do dia a dia de uma cidade onde se fala o idioma, com um marco que qualquer pessoa reconhece ao fundo. Uma delas é brasileira, a pessoa que estudou com a 9vee (no português, é o contrário: a estrangeira que veio para o Brasil). O marco diz o país; a conversa diz o que a 9vee entrega, na linha do "Para a conversa dar certo." da home. A saudação na escrita do idioma continua no topo, então a página se identifica duas vezes: pela palavra e pelo lugar.

**Por que não as outras saídas:**

- **Bandeira:** bandeira é de país, e não de idioma. O espanhol é língua de mais de vinte países; o árabe, também. No mandarim, a escolha da bandeira é assunto político. E o estilo base de todas as imagens do site já proíbe bandeira.
- **Cartão-postal (só o monumento):** reconhece rápido, mas a página vira agência de turismo, e as 14 ficariam iguais a banco de imagens.
- **Objeto típico (sombrero, quimono, matrioska):** é estereótipo, e ofende quem fala a língua.
- **Letreiro na língua:** seria o jeito mais direto de mostrar o idioma, mas IA escreve mal em japonês, árabe, chinês e russo, e um nativo percebe na hora. Por isso todo prompt pede letreiro fora de foco ou fora do quadro. Quem mostra a escrita é a saudação do topo, que é texto de verdade.

**Como a série fica coerente:**

- mesma hora do dia (fim de tarde), mesma lente, mesma distância e duas pessoas em todas, para as 14 parecerem uma série só;
- o marco na metade de cima e no centro, porque o site mostra a foto em arco, que corta os cantos de cima; as pessoas no terço de baixo;
- profundidade de campo moderada, e não rasa como no resto do site: o marco precisa ficar nítido o bastante para ser reconhecido;
- a gradação de cor do site nas sombras e nas luzes, sem pintar a arquitetura: o vermelho de Estocolmo e o terracota de Florença são o que identifica o lugar;
- quem aparece varia em gênero e idade de uma página para outra.

**Onde entra:** no `TopoIdioma`, pelo `ArcoComCirculo`, o mesmo arco com o círculo da marca atrás que o `HeroPagina` usa nas páginas internas. A saudação, o H1 e o botão não mudam. Cada arquivo em `content/idiomas/` tem o campo `imagem` (id, arquivo e alt) no `topo`, como os heroes das outras páginas.

**Ao conferir cada imagem:**

- a foto vai até a borda, sem moldura nem arco desenhado, porque o arco é o site que faz (na primeira rodada, 13 das 14 vieram com ele; veja o registro no fim);
- o marco está certo (IA às vezes inventa andares na Torre Eiffel, colunas no Ateneu ou cúpulas na igreja de São Petersburgo);
- nenhum letreiro com letra inventada, principalmente no japonês, no árabe, no mandarim e no russo;
- mãos, rostos e as duas pessoas de verdade conversando, e não posando;
- o marco inteiro dentro do quadro, com céu em cima dele, para sobreviver ao corte do arco;
- nenhuma bandeira, marca ou logo.

## Estilo base das páginas de idioma (início de todo prompt desta série)

> Editorial documentary photography of everyday life abroad, late afternoon golden hour light, 50mm lens at eye level, moderate depth of field (around f/5.6) so the landmark in the background stays sharp enough to be recognized at a glance, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows and soft off-white (#F9F9F9) highlights without recoloring the architecture, photorealistic, no text, no readable signs, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. The landmark sits in the upper half, centered, entirely in the picture with open sky around its top; two people in conversation fill the lower third, seen at mid distance from the knees or waist up, slightly off center; only sky or background in the top corners and at the side edges. Both people wear contemporary everyday or business clothes, caught mid-conversation: one speaking with a light gesture, the other listening with a natural smile.

Todo prompt desta série termina com a linha: `Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, tourist clichés (selfies, maps, suitcases, souvenir stalls), traditional costumes, flags, fake or garbled lettering on signs and shop fronts, crowds covering the landmark, distorted or invented architecture, borders, frames or vignettes around the picture, archways or windows framing the whole view.`

### Germânicas

#### IMG-IDIOMA-INGLES

- **Onde:** página de inglês (`/curso-de-idiomas/ingles/`), topo, moldura de arco com o círculo da marca atrás.
- **Lugar:** Londres, Reino Unido.
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `idioma-ingles.jpg`
- **Alt:** Dois colegas conversando na ponte de Westminster, em Londres, com o Big Ben ao fundo.
- **Por quê:** Inglês é língua de muitos países. Londres foi a versão gerada e escolhida em 30/09/2026, e a página também cita o material da Cambridge, que é britânico. A de Nova York, logo abaixo, fica como alternativa.
- **Prompt:**

  > Editorial documentary photography of everyday life abroad, late afternoon golden hour light, 50mm lens at eye level, moderate depth of field (around f/5.6) so the landmark in the background stays sharp enough to be recognized at a glance, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows and soft off-white (#F9F9F9) highlights without recoloring the architecture, photorealistic, no text, no readable signs, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. The landmark sits in the upper half, centered, entirely in the picture with open sky around its top; two people in conversation fill the lower third, seen at mid distance from the knees or waist up, slightly off center; only sky or background in the top corners and at the side edges. Both people wear contemporary everyday or business clothes, caught mid-conversation: one speaking with a light gesture, the other listening with a natural smile. Scene: a Brazilian woman in her thirties, in a navy coat, and a British colleague talk while walking along the Westminster Bridge pavement in London; behind them, the Elizabeth Tower (Big Ben) and the Houses of Parliament rise in the upper half of the picture, a red double-decker bus softly blurred on the road. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, tourist clichés (selfies, maps, suitcases, souvenir stalls), traditional costumes, flags, fake or garbled lettering on signs and shop fronts, crowds covering the landmark, distorted or invented architecture, borders, frames or vignettes around the picture, archways or windows framing the whole view.

#### IMG-IDIOMA-INGLES, alternativa de Nova York

- **Quando usar:** se o inglês da 9vee puxar mais para o americano, porque o inglês de trabalho e o TOEFL, que a página cita, são referência americana. Mesmo arquivo, `idioma-ingles.jpg`.
- **Alt:** Duas profissionais conversando numa calçada de Manhattan, com o Empire State Building ao fundo.
- **Prompt:**

  > Editorial documentary photography of everyday life abroad, late afternoon golden hour light, 50mm lens at eye level, moderate depth of field (around f/5.6) so the landmark in the background stays sharp enough to be recognized at a glance, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows and soft off-white (#F9F9F9) highlights without recoloring the architecture, photorealistic, no text, no readable signs, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. The landmark sits in the upper half, centered, entirely in the picture with open sky around its top; two people in conversation fill the lower third, seen at mid distance from the knees or waist up, slightly off center; only sky or background in the top corners and at the side edges. Both people wear contemporary everyday or business clothes, caught mid-conversation: one speaking with a light gesture, the other listening with a natural smile. Scene: a Brazilian woman in her thirties, in a navy coat, and an American colleague walk and talk on a Midtown Manhattan sidewalk in New York, each holding a paper coffee cup without any logo; the street runs straight away from the camera, with the Empire State Building rising at the end of the street canyon, a yellow taxi softly blurred at the curb. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, tourist clichés (selfies, maps, suitcases, souvenir stalls), traditional costumes, flags, fake or garbled lettering on signs and shop fronts, crowds covering the landmark, distorted or invented architecture, borders, frames or vignettes around the picture, archways or windows framing the whole view.

#### IMG-IDIOMA-ALEMAO

- **Onde:** página de alemão (`/curso-de-idiomas/alemao/`), topo, moldura de arco com o círculo da marca atrás.
- **Lugar:** Berlim, Alemanha.
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `idioma-alemao.jpg`
- **Alt:** Dois colegas atravessando a Pariser Platz em Berlim, com o Portão de Brandemburgo ao fundo.
- **Prompt:**

  > Editorial documentary photography of everyday life abroad, late afternoon golden hour light, 50mm lens at eye level, moderate depth of field (around f/5.6) so the landmark in the background stays sharp enough to be recognized at a glance, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows and soft off-white (#F9F9F9) highlights without recoloring the architecture, photorealistic, no text, no readable signs, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. The landmark sits in the upper half, centered, entirely in the picture with open sky around its top; two people in conversation fill the lower third, seen at mid distance from the knees or waist up, slightly off center; only sky or background in the top corners and at the side edges. Both people wear contemporary everyday or business clothes, caught mid-conversation: one speaking with a light gesture, the other listening with a natural smile. Scene: a Brazilian man in his forties with gray at the temples and a German colleague cross Pariser Platz in Berlin on foot, talking; the Brandenburg Gate stands behind them at mid distance, centered, with the Quadriga clearly visible on top and clear sky above it. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, tourist clichés (selfies, maps, suitcases, souvenir stalls), traditional costumes, flags, fake or garbled lettering on signs and shop fronts, crowds covering the landmark, distorted or invented architecture, borders, frames or vignettes around the picture, archways or windows framing the whole view.

#### IMG-IDIOMA-HOLANDES

- **Onde:** página de holandês (`/curso-de-idiomas/holandes/`), topo, moldura de arco com o círculo da marca atrás.
- **Lugar:** Amsterdã, Países Baixos.
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `idioma-holandes.jpg`
- **Alt:** Uma mulher empurrando a bicicleta e conversando com a vizinha numa ponte de canal em Amsterdã.
- **Por quê:** A cena é de vida cotidiana, e não de turismo, porque a página fala do Inburgering, a prova de quem vai morar nos Países Baixos.
- **Prompt:**

  > Editorial documentary photography of everyday life abroad, late afternoon golden hour light, 50mm lens at eye level, moderate depth of field (around f/5.6) so the landmark in the background stays sharp enough to be recognized at a glance, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows and soft off-white (#F9F9F9) highlights without recoloring the architecture, photorealistic, no text, no readable signs, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. The landmark sits in the upper half, centered, entirely in the picture with open sky around its top; two people in conversation fill the lower third, seen at mid distance from the knees or waist up, slightly off center; only sky or background in the top corners and at the side edges. Both people wear contemporary everyday or business clothes, caught mid-conversation: one speaking with a light gesture, the other listening with a natural smile. Scene: a Brazilian woman in her late twenties walks her bicycle across a small bridge over an Amsterdam canal while talking with a Dutch neighbor; behind them, the narrow gabled canal houses lean slightly along the water, with bicycles parked on the railing and trees along the quay. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, tourist clichés (selfies, maps, suitcases, souvenir stalls), traditional costumes, flags, fake or garbled lettering on signs and shop fronts, crowds covering the landmark, distorted or invented architecture, borders, frames or vignettes around the picture, archways or windows framing the whole view.

#### IMG-IDIOMA-SUECO

- **Onde:** página de sueco (`/curso-de-idiomas/sueco/`), topo, moldura de arco com o círculo da marca atrás.
- **Lugar:** Estocolmo, Suécia.
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `idioma-sueco.jpg`
- **Alt:** Duas pessoas conversando na praça Stortorget, em Estocolmo, com as fachadas coloridas ao fundo.
- **Prompt:**

  > Editorial documentary photography of everyday life abroad, late afternoon golden hour light, 50mm lens at eye level, moderate depth of field (around f/5.6) so the landmark in the background stays sharp enough to be recognized at a glance, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows and soft off-white (#F9F9F9) highlights without recoloring the architecture, photorealistic, no text, no readable signs, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. The landmark sits in the upper half, centered, entirely in the picture with open sky around its top; two people in conversation fill the lower third, seen at mid distance from the knees or waist up, slightly off center; only sky or background in the top corners and at the side edges. Both people wear contemporary everyday or business clothes, caught mid-conversation: one speaking with a light gesture, the other listening with a natural smile. Scene: a Brazilian man in his thirties and a Swedish colleague talk at a small outdoor café table in Stortorget square, in Gamla Stan, Stockholm; behind them, the famous tall narrow merchant houses in deep red and warm orange with white-trimmed windows and stepped gables fill the upper half of the picture. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, tourist clichés (selfies, maps, suitcases, souvenir stalls), traditional costumes, flags, fake or garbled lettering on signs and shop fronts, crowds covering the landmark, distorted or invented architecture, borders, frames or vignettes around the picture, archways or windows framing the whole view.

#### IMG-IDIOMA-NORUEGUES

- **Onde:** página de norueguês (`/curso-de-idiomas/noruegues/`), topo, moldura de arco com o círculo da marca atrás.
- **Lugar:** Bergen, Noruega.
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `idioma-noruegues.jpg`
- **Alt:** Duas pessoas conversando no cais de Bergen, com as casas de madeira coloridas de Bryggen ao fundo.
- **Por quê:** Oslo é a capital, mas Bryggen é a imagem que qualquer pessoa associa à Noruega.
- **Prompt:**

  > Editorial documentary photography of everyday life abroad, late afternoon golden hour light, 50mm lens at eye level, moderate depth of field (around f/5.6) so the landmark in the background stays sharp enough to be recognized at a glance, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows and soft off-white (#F9F9F9) highlights without recoloring the architecture, photorealistic, no text, no readable signs, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. The landmark sits in the upper half, centered, entirely in the picture with open sky around its top; two people in conversation fill the lower third, seen at mid distance from the knees or waist up, slightly off center; only sky or background in the top corners and at the side edges. Both people wear contemporary everyday or business clothes, caught mid-conversation: one speaking with a light gesture, the other listening with a natural smile. Scene: a Brazilian woman in her forties, wearing a light rain jacket, talks with a Norwegian colleague on the harbor quay in Bergen; behind them, the row of old wooden Hanseatic houses of Bryggen with steep gables in red, ochre and white, and a green hill rising behind the rooftops. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, tourist clichés (selfies, maps, suitcases, souvenir stalls), traditional costumes, flags, fake or garbled lettering on signs and shop fronts, crowds covering the landmark, distorted or invented architecture, borders, frames or vignettes around the picture, archways or windows framing the whole view.

### Românicas

#### IMG-IDIOMA-ESPANHOL

- **Onde:** página de espanhol (`/curso-de-idiomas/espanhol/`), topo, moldura de arco com o círculo da marca atrás.
- **Lugar:** Madri, Espanha.
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `idioma-espanhol.jpg`
- **Alt:** Dois colegas conversando numa mesa de café ao ar livre na Gran Vía, em Madri, com o edifício Metrópolis ao fundo.
- **Por quê:** Madri, porque a página fala do DELE, o diploma do Estado espanhol. Se o Arthur disser que quem procura espanhol na 9vee trabalha com a América Latina, troque a cidade por Buenos Aires, com o Obelisco ao fundo.
- **Prompt:**

  > Editorial documentary photography of everyday life abroad, late afternoon golden hour light, 50mm lens at eye level, moderate depth of field (around f/5.6) so the landmark in the background stays sharp enough to be recognized at a glance, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows and soft off-white (#F9F9F9) highlights without recoloring the architecture, photorealistic, no text, no readable signs, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. The landmark sits in the upper half, centered, entirely in the picture with open sky around its top; two people in conversation fill the lower third, seen at mid distance from the knees or waist up, slightly off center; only sky or background in the top corners and at the side edges. Both people wear contemporary everyday or business clothes, caught mid-conversation: one speaking with a light gesture, the other listening with a natural smile. Scene: a Brazilian woman in her thirties and a Spanish colleague talk at an outdoor café table at the start of Gran Vía in Madrid; behind them, the Metrópolis building with its dark slate dome topped by the golden winged statue, cream facade and ornate columns, lit by warm evening sun. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, tourist clichés (selfies, maps, suitcases, souvenir stalls), traditional costumes, flags, fake or garbled lettering on signs and shop fronts, crowds covering the landmark, distorted or invented architecture, borders, frames or vignettes around the picture, archways or windows framing the whole view.

#### IMG-IDIOMA-FRANCES

- **Onde:** página de francês (`/curso-de-idiomas/frances/`), topo, moldura de arco com o círculo da marca atrás.
- **Lugar:** Paris, França.
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `idioma-frances.jpg`
- **Alt:** Um estudante conversando com uma parisiense numa rua de Paris, com a Torre Eiffel ao fundo.
- **Por quê:** A torre sempre de dia. A iluminação noturna da Torre Eiffel tem direito autoral, e a foto à noite pode dar problema.
- **Prompt:**

  > Editorial documentary photography of everyday life abroad, late afternoon golden hour light, 50mm lens at eye level, moderate depth of field (around f/5.6) so the landmark in the background stays sharp enough to be recognized at a glance, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows and soft off-white (#F9F9F9) highlights without recoloring the architecture, photorealistic, no text, no readable signs, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. The landmark sits in the upper half, centered, entirely in the picture with open sky around its top; two people in conversation fill the lower third, seen at mid distance from the knees or waist up, slightly off center; only sky or background in the top corners and at the side edges. Both people wear contemporary everyday or business clothes, caught mid-conversation: one speaking with a light gesture, the other listening with a natural smile. Scene: a Brazilian student in his twenties with a canvas tote bag talks with a Parisian woman in front of a corner café on a quiet Haussmann-style street in Paris, with cream stone facades and wrought-iron balconies on both sides; the Eiffel Tower rises at the far end of the street, in daylight. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, tourist clichés (selfies, maps, suitcases, souvenir stalls), traditional costumes, flags, fake or garbled lettering on signs and shop fronts, crowds covering the landmark, distorted or invented architecture, borders, frames or vignettes around the picture, archways or windows framing the whole view.

#### IMG-IDIOMA-ITALIANO

- **Onde:** página de italiano (`/curso-de-idiomas/italiano/`), topo, moldura de arco com o círculo da marca atrás.
- **Lugar:** Florença, Itália.
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `idioma-italiano.jpg`
- **Alt:** Duas pessoas conversando numa rua de Florença, com a cúpula do Duomo ao fundo.
- **Prompt:**

  > Editorial documentary photography of everyday life abroad, late afternoon golden hour light, 50mm lens at eye level, moderate depth of field (around f/5.6) so the landmark in the background stays sharp enough to be recognized at a glance, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows and soft off-white (#F9F9F9) highlights without recoloring the architecture, photorealistic, no text, no readable signs, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. The landmark sits in the upper half, centered, entirely in the picture with open sky around its top; two people in conversation fill the lower third, seen at mid distance from the knees or waist up, slightly off center; only sky or background in the top corners and at the side edges. Both people wear contemporary everyday or business clothes, caught mid-conversation: one speaking with a light gesture, the other listening with a natural smile. Scene: a Brazilian man in his fifties and an Italian friend talk while walking down Via dei Servi in Florence; the terracotta dome of the Florence Cathedral by Brunelleschi rises at the end of the narrow street, between warm stone facades with green shutters. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, tourist clichés (selfies, maps, suitcases, souvenir stalls), traditional costumes, flags, fake or garbled lettering on signs and shop fronts, crowds covering the landmark, distorted or invented architecture, borders, frames or vignettes around the picture, archways or windows framing the whole view.

#### IMG-IDIOMA-PORTUGUES

- **Onde:** página de português para estrangeiros (`/curso-de-idiomas/portugues-para-estrangeiros/`), topo, moldura de arco com o círculo da marca atrás.
- **Lugar:** São Paulo, Brasil.
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `idioma-portugues-para-estrangeiros.jpg`
- **Alt:** Uma profissional estrangeira conversando com uma colega brasileira na Avenida Paulista, com o MASP ao fundo.
- **Por quê:** Aqui a lógica inverte: quem aprende é o estrangeiro, e o lugar é o Brasil. São Paulo, porque a página fala de quem veio trabalhar, e é onde a 9vee atua.
- **Prompt:**

  > Editorial documentary photography of everyday life abroad, late afternoon golden hour light, 50mm lens at eye level, moderate depth of field (around f/5.6) so the landmark in the background stays sharp enough to be recognized at a glance, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows and soft off-white (#F9F9F9) highlights without recoloring the architecture, photorealistic, no text, no readable signs, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. The landmark sits in the upper half, centered, entirely in the picture with open sky around its top; two people in conversation fill the lower third, seen at mid distance from the knees or waist up, slightly off center; only sky or background in the top corners and at the side edges. Both people wear contemporary everyday or business clothes, caught mid-conversation: one speaking with a light gesture, the other listening with a natural smile. Scene: an international professional woman in her thirties, recently moved to Brazil, talks with a Brazilian colleague on the wide sidewalk of Avenida Paulista in São Paulo; behind them, the MASP museum with its long red concrete beams suspended above an open plaza, and the green trees of the avenue. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, tourist clichés (selfies, maps, suitcases, souvenir stalls), traditional costumes, flags, fake or garbled lettering on signs and shop fronts, crowds covering the landmark, distorted or invented architecture, borders, frames or vignettes around the picture, archways or windows framing the whole view.

#### IMG-IDIOMA-ROMENO

- **Onde:** página de romeno (`/curso-de-idiomas/romeno/`), topo, moldura de arco com o círculo da marca atrás.
- **Lugar:** Bucareste, Romênia.
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `idioma-romeno.jpg`
- **Alt:** Duas pessoas conversando no jardim em frente ao Ateneu Romeno, em Bucareste.
- **Por quê:** O romeno é o idioma de identificação mais fraca: poucos brasileiros reconhecem um prédio de Bucareste. Aqui a saudação "Bună" e o nome do idioma, no topo da página, fazem a maior parte do trabalho.
- **Prompt:**

  > Editorial documentary photography of everyday life abroad, late afternoon golden hour light, 50mm lens at eye level, moderate depth of field (around f/5.6) so the landmark in the background stays sharp enough to be recognized at a glance, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows and soft off-white (#F9F9F9) highlights without recoloring the architecture, photorealistic, no text, no readable signs, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. The landmark sits in the upper half, centered, entirely in the picture with open sky around its top; two people in conversation fill the lower third, seen at mid distance from the knees or waist up, slightly off center; only sky or background in the top corners and at the side edges. Both people wear contemporary everyday or business clothes, caught mid-conversation: one speaking with a light gesture, the other listening with a natural smile. Scene: a Brazilian woman in her forties and a Romanian colleague talk while walking along the garden path in front of the Romanian Athenaeum in Bucharest; behind them, the round neoclassical concert hall with its domed roof and its portico of six Ionic columns, surrounded by trees. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, tourist clichés (selfies, maps, suitcases, souvenir stalls), traditional costumes, flags, fake or garbled lettering on signs and shop fronts, crowds covering the landmark, distorted or invented architecture, borders, frames or vignettes around the picture, archways or windows framing the whole view.

### De outras famílias

#### IMG-IDIOMA-MANDARIM

- **Onde:** página de mandarim (`/curso-de-idiomas/mandarim/`), topo, moldura de arco com o círculo da marca atrás.
- **Lugar:** Xangai, China.
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `idioma-mandarim.jpg`
- **Alt:** Dois executivos conversando no calçadão do Bund, em Xangai, com os prédios de Pudong ao fundo.
- **Por quê:** Xangai, e não uma cena de lanternas ou dragões: o mandarim da 9vee é também o do mercado financeiro, e a cidade diz negócio.
- **Prompt:**

  > Editorial documentary photography of everyday life abroad, late afternoon golden hour light, 50mm lens at eye level, moderate depth of field (around f/5.6) so the landmark in the background stays sharp enough to be recognized at a glance, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows and soft off-white (#F9F9F9) highlights without recoloring the architecture, photorealistic, no text, no readable signs, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. The landmark sits in the upper half, centered, entirely in the picture with open sky around its top; two people in conversation fill the lower third, seen at mid distance from the knees or waist up, slightly off center; only sky or background in the top corners and at the side edges. Both people wear contemporary everyday or business clothes, caught mid-conversation: one speaking with a light gesture, the other listening with a natural smile. Scene: a Brazilian businessman in his forties and a Chinese business partner talk on the Bund promenade in Shanghai, both in business clothes; across the Huangpu River behind them, the Pudong skyline with the Oriental Pearl Tower and its pink spheres in the center of the picture. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, tourist clichés (selfies, maps, suitcases, souvenir stalls), traditional costumes, flags, fake or garbled lettering on signs and shop fronts, crowds covering the landmark, distorted or invented architecture, borders, frames or vignettes around the picture, archways or windows framing the whole view.

#### IMG-IDIOMA-JAPONES

- **Onde:** página de japonês (`/curso-de-idiomas/japones/`), topo, moldura de arco com o círculo da marca atrás.
- **Lugar:** Tóquio, Japão.
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `idioma-japones.jpg`
- **Alt:** Dois colegas conversando numa rua tranquila, com a Torre de Tóquio ao fundo.
- **Por quê:** Letreiro em japonês gerado por IA costuma sair com caracteres inventados, e um japonês percebe na hora. Confira com atenção se sobrou algum.
- **Prompt:**

  > Editorial documentary photography of everyday life abroad, late afternoon golden hour light, 50mm lens at eye level, moderate depth of field (around f/5.6) so the landmark in the background stays sharp enough to be recognized at a glance, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows and soft off-white (#F9F9F9) highlights without recoloring the architecture, photorealistic, no text, no readable signs, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. The landmark sits in the upper half, centered, entirely in the picture with open sky around its top; two people in conversation fill the lower third, seen at mid distance from the knees or waist up, slightly off center; only sky or background in the top corners and at the side edges. Both people wear contemporary everyday or business clothes, caught mid-conversation: one speaking with a light gesture, the other listening with a natural smile. Scene: a Brazilian woman in her thirties and a Japanese colleague talk on a quiet, clean side street in the Minato district of Tokyo, lined with small trees; the red and white Tokyo Tower rises at the end of the street against a clear evening sky. Any shop signs are outside the picture or fully out of focus. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, tourist clichés (selfies, maps, suitcases, souvenir stalls), traditional costumes, flags, fake or garbled lettering on signs and shop fronts, crowds covering the landmark, distorted or invented architecture, borders, frames or vignettes around the picture, archways or windows framing the whole view.

#### IMG-IDIOMA-ARABE

- **Onde:** página de árabe (`/curso-de-idiomas/arabe/`), topo, moldura de arco com o círculo da marca atrás.
- **Lugar:** Dubai, Emirados Árabes Unidos.
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `idioma-arabe.jpg`
- **Alt:** Duas colegas conversando num terraço em Dubai, com o Burj Khalifa ao fundo.
- **Por quê:** Dubai, pelo peso nos negócios. O árabe é língua de mais de vinte países, e se a 9vee atender mais quem tem família libanesa ou síria, vale trocar. Letreiro em árabe gerado por IA quase sempre sai errado: confira.
- **Prompt:**

  > Editorial documentary photography of everyday life abroad, late afternoon golden hour light, 50mm lens at eye level, moderate depth of field (around f/5.6) so the landmark in the background stays sharp enough to be recognized at a glance, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows and soft off-white (#F9F9F9) highlights without recoloring the architecture, photorealistic, no text, no readable signs, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. The landmark sits in the upper half, centered, entirely in the picture with open sky around its top; two people in conversation fill the lower third, seen at mid distance from the knees or waist up, slightly off center; only sky or background in the top corners and at the side edges. Both people wear contemporary everyday or business clothes, caught mid-conversation: one speaking with a light gesture, the other listening with a natural smile. Scene: a Brazilian woman in her thirties and an Emirati colleague in contemporary modest business clothes talk on a shaded terrace in Downtown Dubai; behind them, the Burj Khalifa rises into a clear sky, with the low sand-colored buildings of the Souk Al Bahar area in the middle ground. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, tourist clichés (selfies, maps, suitcases, souvenir stalls), traditional costumes, flags, fake or garbled lettering on signs and shop fronts, crowds covering the landmark, distorted or invented architecture, borders, frames or vignettes around the picture, archways or windows framing the whole view.

#### IMG-IDIOMA-RUSSO

- **Onde:** página de russo (`/curso-de-idiomas/russo/`), topo, moldura de arco com o círculo da marca atrás.
- **Lugar:** São Petersburgo, Rússia.
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `idioma-russo.jpg`
- **Alt:** Duas pessoas conversando na beira de um canal de São Petersburgo, com a Igreja do Salvador sobre o Sangue Derramado ao fundo.
- **Por quê:** São Petersburgo, e não a Praça Vermelha: a igreja identifica a Rússia do mesmo jeito, sem o peso político do Kremlin.
- **Prompt:**

  > Editorial documentary photography of everyday life abroad, late afternoon golden hour light, 50mm lens at eye level, moderate depth of field (around f/5.6) so the landmark in the background stays sharp enough to be recognized at a glance, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows and soft off-white (#F9F9F9) highlights without recoloring the architecture, photorealistic, no text, no readable signs, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. The landmark sits in the upper half, centered, entirely in the picture with open sky around its top; two people in conversation fill the lower third, seen at mid distance from the knees or waist up, slightly off center; only sky or background in the top corners and at the side edges. Both people wear contemporary everyday or business clothes, caught mid-conversation: one speaking with a light gesture, the other listening with a natural smile. Scene: a Brazilian man in his thirties and a Russian friend talk leaning on the iron railing of the Griboyedov Canal in Saint Petersburg; behind them, the Church of the Savior on Spilled Blood with its colorful twisted onion domes, reflected in the calm water. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, tourist clichés (selfies, maps, suitcases, souvenir stalls), traditional costumes, flags, fake or garbled lettering on signs and shop fronts, crowds covering the landmark, distorted or invented architecture, borders, frames or vignettes around the picture, archways or windows framing the whole view.

## Todas as imagens das páginas de idioma

14 imagens, uma por idioma. O inglês usou a versão de Londres. Os nomes seguem o slug de cada página: `idioma-<slug>.jpg`.

## Primeira rodada das páginas de idioma (30/09/2026)

O Gemini entregou as 14 em 928 × 1152. Em 13 delas ele desenhou o arco dentro da imagem, com uma margem lisa em volta, por causa da frase antiga do estilo base ("Composition for an arch-shaped frame with a rounded top"). O site já recorta o arco sozinho, e essa margem apareceria como uma faixa dentro dele. A frase saiu dos prompts acima, e a linha Avoid ganhou as molduras.

As 13 foram recortadas por um script de uso único, que fica com as originais em `imagens-originais/`, fora do git:

- a borda do arco desenhado foi ajustada como um círculo, pelos pontos de contraste alto, com resíduo mediano abaixo de 2 px;
- a caixa 4:5 fica com o topo mais alto em que o arco do site cabe a 8 px ou mais da moldura, e é a mais larga entre as que ficam até 6 px abaixo desse topo. A mais larga de todas desceria até 75 px e cortaria a ponta da Torre Eiffel, a antena da Pérola do Oriente e a cruz da igreja de São Petersburgo;
- a conferência foi pela geometria e pelo olho, com cada foto montada no arco sobre o azul-marinho e a borda ampliada 5 vezes.

| Arquivo | Moldura desenhada | Recorte (x, y, largura × altura) | Largura que ficou | Observação |
|---|---|---|---|---|
| `idioma-alemao.jpg` | creme, em volta | 32, 22, 864 × 1080 | 93% | |
| `idioma-espanhol.jpg` | branca, em volta | 36, 4, 856 × 1070 | 92% | "METRÓPOLIS" escrito no prédio. Aceito, porque na tela fica com poucos pixels de altura |
| `idioma-frances.jpg` | creme, em volta | 72, 62, 784 × 980 | 84% | as pernas da mulher atravessavam a moldura de baixo; o corte fica nos joelhos |
| `idioma-holandes.jpg` | creme, só nos cantos de cima | 10, 4, 916 × 1145 | 99% | |
| `idioma-ingles.jpg` | branca, em volta | 80, 61, 768 × 960 | 83% | veio como `idioma-ingles-britanico.jpg` |
| `idioma-italiano.jpg` | creme, sem a de baixo | 54, 34, 820 × 1025 | 88% | |
| `idioma-japones.jpg` | branca, só nos cantos de cima | 10, 5, 908 × 1135 | 98% | |
| `idioma-mandarim.jpg` | azul-marinho, em volta | 65, 5, 800 × 1000 | 86% | |
| `idioma-noruegues.jpg` | creme, em volta | 72, 42, 784 × 980 | 84% | placa com letras num prédio de Bryggen, ilegível na tela |
| `idioma-portugues-para-estrangeiros.jpg` | creme, em volta | 47, 35, 836 × 1045 | 90% | veio como `idioma-portugues.jpg` |
| `idioma-romeno.jpg` | azul-marinho, só nos cantos de cima | 8, 4, 912 × 1140 | 98% | inscrição no frontão do Ateneu, ilegível na tela |
| `idioma-russo.jpg` | azul-marinho, em volta | 94, 56, 740 × 925 | 80% | a cruz da torre central fica a uns 5 px do topo do arco. Na original, ela já ficava a 14 px do arco desenhado. O Maxwell decidiu manter, em 30/09 |
| `idioma-sueco.jpg` | creme, só nos cantos de cima | 8, 4, 912 × 1140 | 98% | |
| `idioma-arabe.jpg` | nenhuma | sem recorte (928 × 1152) | 100% | o arco é de pedra e faz parte da cena. Recortar por dentro dele poria o topo do arco do site na ponta do Burj Khalifa: a abertura começa em y≈30, e a ponta da torre fica em y≈45. O Maxwell decidiu manter o arco de pedra, em 30/09 |

## Páginas completas do reaproveitamento (desde 01/10/2026)

As páginas que saíram da versão parcial ganharam seções com imagem. Elas usam o estilo base do alto deste arquivo, com dois cuidados que vieram da primeira rodada das páginas de idioma: a foto vai até a borda, sem moldura nem arco desenhado, porque o arco é o site que faz, e o prompt pede 4:5 com as medidas.

### IMG-LMS-O-QUE-E

- **Onde:** LMS, seção "O que é o LMS" (moldura de arco, ao lado do texto; no celular, embaixo dele).
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `lms-o-que-e.jpg`
- **Alt:** Colaboradora estudando pelo tablet em casa, à noite, de fones de ouvido.
- **Por quê:** o hero já mostra a plataforma no escritório, de dia. Esta mostra o outro lado do que a seção diz, "cada um estuda no horário e no ritmo dele": fora do expediente, em casa.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition with negative space on the right for text, photorealistic, no text, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. Scene: a Brazilian woman in her forties studying a language lesson on a tablet at home in the evening, sitting on a sofa with her legs tucked up, small wireless earphones on, a notebook and a pen on the armrest; a floor lamp gives warm light from the side, and the city lights are softly out of focus through a window behind her. The tablet is turned away from the camera, so the screen is not visible. Relaxed and focused, clearly outside working hours. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, readable text or interface on the screen, borders, frames or vignettes around the picture, archways or windows framing the whole view.
