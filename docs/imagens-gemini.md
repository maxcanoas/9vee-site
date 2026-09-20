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
