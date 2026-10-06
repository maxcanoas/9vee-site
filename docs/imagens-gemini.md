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

### IMG-HOME-HERO-FRENTE-VOCE

- **Onde:** home, hero, camada da frente quando a pessoa escolhe "Para você": entra no lugar da intérprete, na frente do círculo da marca.
- **Proporção e tamanho:** 4:5, 1200 × 1500. Recortar e salvar como PNG com fundo transparente, como a da intérprete.
- **Arquivo:** `home-hero-frente-voce.png`
- **Alt:** Aluna de fone de ouvido, sorrindo enquanto fala numa aula de idioma online.
- **Por quê:** veio do parecer de UX de 04/10/2026. Quem escolhe "Para você" quer aprender um idioma, e a intérprete no auditório fala com a empresa que contrata um evento. A aluna mostra a aula. Sem notebook nem tela no quadro: o recorte é só a pessoa, como o da intérprete.
- **Ao conferir:** mãos e rosto certos, o fone sem marca, o recorte limpo no cabelo e nos ombros. Se a cena vier diferente, o Alt muda junto, em `content/home.md`.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition, photorealistic, no text, no logos, no watermarks, no flags. Scene: waist-up portrait of a Brazilian woman in her twenties taking an online language class, wearing over-ear headphones with a small boom microphone, three-quarter view looking slightly to the left towards an unseen laptop, smiling naturally while she speaks, navy knit sweater over a white t-shirt. Plain solid mint green (#16DF97) studio background, even lighting, crisp edges around hair and shoulders so the subject can be cut out cleanly. Deliver a PNG with a transparent background if the tool supports it; otherwise keep the plain green background and remove it afterwards. The file the site reads must be a PNG with transparency. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, logos on the headphones, laptops, phones or screens in the frame.

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

#### IMG-IDIOMA-CANTONES

- **Onde:** página de cantonês (`/curso-de-idiomas/cantones/`), topo, moldura de arco com o círculo da marca atrás.
- **Lugar:** Hong Kong.
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `idioma-cantones.jpg`
- **Alt:** Duas pessoas conversando no calçadão de Tsim Sha Tsui, com a baía Vitória e os prédios da ilha de Hong Kong ao fundo.
- **Por quê:** o cantonês entrou em 05/10/2026, no lugar do romeno, e é a língua de Hong Kong. A baía com os prédios da ilha diz Hong Kong de longe, e separa a página da de mandarim, que mostra Xangai.
- **Prompt:**

  > Editorial documentary photography of everyday life abroad, late afternoon golden hour light, 50mm lens at eye level, moderate depth of field (around f/5.6) so the landmark in the background stays sharp enough to be recognized at a glance, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows and soft off-white (#F9F9F9) highlights without recoloring the architecture, photorealistic, no text, no readable signs, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges. The landmark sits in the upper half, centered, entirely in the picture with open sky around its top; two people in conversation fill the lower third, seen at mid distance from the knees or waist up, slightly off center; only sky or background in the top corners and at the side edges. Both people wear contemporary everyday or business clothes, caught mid-conversation: one speaking with a light gesture, the other listening with a natural smile. Scene: a Brazilian woman in her thirties and a colleague from Hong Kong talk on the Tsim Sha Tsui waterfront promenade in Hong Kong, both in business clothes; across Victoria Harbour behind them, the Hong Kong Island skyline with the tall towers of Central and the green slopes of Victoria Peak, and a green-and-white Star Ferry crossing the water. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, tourist clichés (selfies, maps, suitcases, souvenir stalls), traditional costumes, flags, fake or garbled lettering on signs and shop fronts, crowds covering the landmark, distorted or invented architecture, borders, frames or vignettes around the picture, archways or windows framing the whole view.

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
| `idioma-romeno.jpg` | azul-marinho, só nos cantos de cima | 8, 4, 912 × 1140 | 98% | inscrição no frontão do Ateneu, ilegível na tela. Saiu do site em 05/10/2026, com o romeno; a original continua em `imagens-originais/` |
| `idioma-russo.jpg` | azul-marinho, em volta | 94, 56, 740 × 925 | 80% | a cruz da torre central fica a uns 5 px do topo do arco. Na original, ela já ficava a 14 px do arco desenhado. O Maxwell decidiu manter, em 30/09 |
| `idioma-sueco.jpg` | creme, só nos cantos de cima | 8, 4, 912 × 1140 | 98% | |
| `idioma-arabe.jpg` | nenhuma | sem recorte (928 × 1152) | 100% | o arco é de pedra e faz parte da cena. Recortar por dentro dele poria o topo do arco do site na ponta do Burj Khalifa: a abertura começa em y≈30, e a ponta da torre fica em y≈45. O Maxwell decidiu manter o arco de pedra, em 30/09 |

## Páginas completas do reaproveitamento (desde 01/10/2026)

As páginas que saíram da versão parcial ganharam seções com imagem. Elas usam o estilo base do alto deste arquivo, com dois cuidados que vieram da primeira rodada das páginas de idioma: a foto vai até a borda, sem moldura nem arco desenhado, porque o arco é o site que faz, e o prompt pede 4:5 com as medidas. A frase do espaço vazio para texto fica fora: a foto vai no arco, ao lado do texto, e nada é escrito por cima dela.

### IMG-LMS-O-QUE-E

- **Onde:** LMS, seção "O que é o LMS" (moldura de arco, ao lado do texto; no celular, embaixo dele).
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `lms-o-que-e.jpg`
- **Alt:** Colaboradora estudando pelo notebook em casa, à noite, de fones de ouvido.
- **Por quê:** o hero já mostra a plataforma no escritório, de dia. Esta mostra o outro lado do que a seção diz, "cada um estuda no horário e no ritmo dele": fora do expediente, em casa. O aparelho é o notebook, como no hero: o site atual não diz em que aparelhos a plataforma roda, e isso é assunto da pergunta 21.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition, photorealistic, no text, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges, with no empty band, blank wall or plain margin on any side. Scene: a Brazilian woman in her forties studying a language lesson on a laptop at home in the evening, sitting at a small wooden table in the living room, small wireless earphones on, a paper notebook and a pen beside the laptop; a floor lamp gives warm light from the side, and the city lights are softly out of focus through a window behind her. The laptop is seen from behind, so the screen is not visible. Relaxed and focused, clearly outside working hours. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, readable text or interface on the screen, borders, frames or vignettes around the picture, archways or windows framing the whole view, blank walls, columns or empty bands at the sides of the frame.

### IMG-TRADUCAO-COMO

- **Onde:** Tradução Simultânea, seção "Como funciona a interpretação simultânea" (moldura de arco, ao lado do texto; no celular, embaixo dele).
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `traducao-como.jpg`
- **Alt:** Público de um congresso acompanhando a palestra, com a cabine de interpretação ao fundo.
- **Por quê:** o hero mostra a intérprete de perto, dentro da cabine. Esta mostra a sala inteira, com o que a seção descreve: a cabine acústica no fundo e o público que acompanha a tradução. O site atual não diz que aparelho o público usa, então a foto não depende de fone nem de receptor.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition, photorealistic, no text, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges, with no empty band, blank wall or plain margin on any side. Scene: an international conference in São Paulo seen from the side aisle, a few rows of attendees of different ages listening attentively towards an unseen stage on the left; at the back of the room, in the upper half of the picture, a glass simultaneous interpretation booth softly lit from inside, with an interpreter at work seen through the glass. The woman in the nearest row, in her forties, is in focus; the booth is recognizable but slightly soft. Calm and attentive, not posed. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, readable text on badges, screens or slides, borders, frames or vignettes around the picture, archways or windows framing the whole view, blank walls, columns or empty bands at the sides of the frame.

### IMG-INTERPRETACAO-MANDARIM-HERO

- **Onde:** Interpretação de mandarim (`/traducao-simultanea/mandarim/`), hero (moldura de arco, com o círculo da marca atrás; no celular, embaixo do texto).
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `interpretacao-mandarim-hero.jpg`
- **Alt:** Intérprete entre uma gestora brasileira e um investidor chinês, numa mesa de reunião.
- **Por quê:** não é a foto do curso de mandarim, que mostra dois executivos em Xangai, nem a do hero da Tradução, que mostra a cabine. Esta mostra o que a página vende: o intérprete ao lado de quem negocia, numa reunião no Brasil. Sem bandeira, sem tela e sem nada escrito em chinês, porque IA escreve mal os caracteres, e um nativo percebe na hora. O alto da foto fica só com a janela ou o teto: o arco do site corta os dois cantos de cima.
- **Ao conferir:** as três pessoas com mãos e rostos certos; nenhum caractere, crachá ou papel legível; a foto até as quatro bordas, sem moldura nem faixa lisa. Se a cena vier diferente (duas pessoas, ou o intérprete de costas), o Alt muda junto, em `content/interpretacao-de-mandarim.md`.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition, photorealistic, no text, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges, with no empty band, blank wall or plain margin on any side. Scene: a business meeting in a glass-walled meeting room of an investment firm in São Paulo. A Brazilian fund manager in her forties and a Chinese investor in his fifties sit on opposite sides of a light wood table, both in business clothes. Between them, at the head of the table, a Brazilian interpreter in his thirties leans slightly towards the investor and speaks in a low voice, one hand open in a small explaining gesture, a closed notebook and a pen in front of him. The manager is listening to him, the investor nods. The interpreter is the subject, in focus, in the middle of the frame; the three people sit in the lower two thirds of the picture, and the top of the frame shows only the window with the city softly out of focus. Calm and concentrated, an ordinary working moment, not posed. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, Chinese characters or any other lettering, readable text on papers, name cards, badges or screens, laptops or screens facing the camera, traditional costumes, red lanterns or other national symbols, borders, frames or vignettes around the picture, archways or windows framing the whole view, blank walls, columns or empty bands at the sides of the frame.

### IMG-QUEM-SOMOS-HISTORIA

- **Onde:** Quem Somos, seção "Como a 9vee começou" (moldura de arco, ao lado do texto; no celular, embaixo dele).
- **Proporção e tamanho:** 4:5, 1200 × 1500.
- **Arquivo:** `quem-somos-historia.jpg`
- **Alt:** Professora dando aula de idioma por vídeo, de fones de ouvido, com um caderno ao lado do notebook.
- **Por quê:** a seção conta que a 9vee junta educação e tecnologia desde o começo. O hero da página já mostra a equipe numa sala de reunião: esta mostra a aula, que é de onde a empresa veio. Sem tela legível e sem nada escrito.
- **Prompt:**

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition, photorealistic, no text, no logos, no watermarks, no flags. Full-bleed composition: the photograph fills the whole canvas and the scene runs out to all four edges, with no empty band, blank wall or plain margin on any side. Scene: a Brazilian language teacher in her forties giving an online lesson from a bright study room, seen in three-quarter view from the side, wearing a light headset, smiling slightly while she speaks and gestures with one hand towards a laptop; the laptop is seen from behind, so the screen is not visible; an open paper notebook with a pen and a mug beside it, bookshelves and a plant softly out of focus behind her. Warm, attentive, an ordinary working moment. Aspect ratio 4:5 portrait (1200 x 1500 pixels), not 3:4. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names, readable text on the screen, the notebook or the book spines, classroom blackboards, borders, frames or vignettes around the picture, archways or windows framing the whole view, blank walls, columns or empty bands at the sides of the frame.

## As duas rodadas das páginas completas (01/10/2026)

O Gemini entregou as duas fotos em 928 × 1152, sem arco nem moldura desenhados, e o Maxwell gerou as duas de novo no mesmo dia. No site estão as da segunda rodada.

- **Primeira rodada, por volta das 22h50:** a `traducao-como.jpg` veio com uma faixa lisa, quase branca, nos 22% da direita. O prompt ainda levava a frase do estilo base que pede espaço vazio à direita para texto, e o Gemini deixou esse espaço. No arco não vai texto por cima da foto, e a faixa tem quase a cor do fundo da página: a foto parecia cortada. A frase saiu dos dois prompts acima, e a linha Avoid ganhou as faixas lisas.
- **Segunda rodada, às 23h17:** a `traducao-como.jpg` veio com a cena até as quatro bordas, sem a faixa, e a `lms-o-que-e.jpg` veio com a mesma cena da primeira, agora com a mulher digitando. As duas entraram como vieram, sem recorte.

## A foto da aluna do topo da home (04/10/2026)

O Maxwell gerou a `home-hero-frente-voce.png` em 04/10, às 23h08, com o prompt da IMG-HOME-HERO-FRENTE-VOCE. O arquivo tem 1122 × 1402, as mesmas medidas do recorte da intérprete, com o fundo transparente, e entrou como veio.

- **A cena:** a aluna de fone com microfone, suéter navy sobre camiseta branca, sorrindo enquanto fala e olhando para a esquerda, com uma das mãos num gesto de quem conversa. O gesto não estava no prompt e ficou: a mão saiu certa, com os cinco dedos. O Alt continua valendo.
- **Conferido:** as mãos e o rosto, nenhuma marca no fone, nenhuma tela ou notebook, o recorte do cabelo sobre o navy sem halo claro e só 4 pixels esverdeados nos 5.440 da borda. No topo, ela fica no mesmo tamanho e na mesma altura da intérprete, no computador e no celular.

## A foto da interpretação de mandarim (02/10/2026)

O Maxwell gerou a `interpretacao-mandarim-hero.jpg` em 02/10, às 9h00, com o prompt da IMG-INTERPRETACAO-MANDARIM-HERO. O arquivo tem 928 × 1152 e entrou como veio, sem recorte.

- **A cena:** a gestora à esquerda, o intérprete no meio, de frente, com a mão aberta no gesto de quem explica, e o investidor à direita, de perfil, numa sala de vidro com a cidade ao fundo. É a cena do prompt, e o Alt descreve o que se vê.
- **Conferido:** as mãos e os rostos das três pessoas, nenhum caractere, crachá ou papel legível, nenhuma bandeira, e a foto até as quatro bordas, sem moldura nem faixa lisa. No alto ficam o teto e a janela, e é isso que o arco do site corta nos cantos.
