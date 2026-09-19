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

  > Editorial photography, natural soft light, shallow depth of field, modern Brazilian corporate and educational settings, diverse Brazilian people, warm and confident mood, color grading aligned to deep navy blue (#212D4D) shadows, soft off-white (#F9F9F9) highlights and subtle mint green (#16DF97) and magenta (#FE19D6) accents, clean composition with negative space on the right for text, photorealistic, no text, no logos, no watermarks, no flags. Scene: waist-up portrait of a Brazilian woman in her thirties working as a simultaneous interpreter, wearing a light headset with a small boom microphone, three-quarter view looking slightly to the left towards an unseen stage, calm and focused expression, navy blazer over a light top. Plain solid mint green (#16DF97) studio background, even lighting, crisp edges around hair and shoulders so the subject can be cut out cleanly. Aspect ratio 4:5. Avoid: stock photo poses, handshake clichés, exaggerated smiles, distorted hands, visible brand names.

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

## Próximas etapas

O hero de Idiomas, o "Como funciona" de Idiomas e os heros das três páginas parciais entram aqui nas etapas 5 e 6.
