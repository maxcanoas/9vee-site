# Padrões do projeto 9vee (MVP)

É a fonte do eixo "Standards" do code-review. As regras vêm do brief do MVP, da spec (`docs/mvp-spec.md`) e das réguas medíveis do comando nivel-agencia. As marcadas com **(teste)** são conferidas automaticamente.

## Texto

- Todo texto visível fica em `content/`: um arquivo por página, mais o de textos compartilhados. O código não carrega frase solta, com exceção de rótulos técnicos invisíveis.
- Português do Brasil, frases curtas, voz ativa e segunda pessoa.
- **(teste)** Nenhum travessão ("—") e nenhuma meia-risca ("–"). Para intervalos, use "de A1 a C2".
- **(teste)** Nenhuma destas palavras e expressões:
  - do brief: jornada, alavancar, potencializar, robusto, revolucionar, desbloquear, "no cenário atual", mergulhe, transformador, sinergia, "de forma fluida";
  - do humanizar: soluções (fora da razão social), excelência, inovação, ecossistema, "sob medida", "vale ressaltar", "é importante destacar".
- **(teste)** Nenhum link genérico: "mais", "veja mais", "clique aqui", "ir", "mais informação", "mais informações", "saiba mais".
- **(teste)** Marca: "9vee" em todo lugar. "Novee" só no rodapé ("lê-se Novee") e no `alternateName` do JSON-LD.
- Nenhum dado inventado. O que não foi confirmado vira `[CONFIRMAR COM A DANIELLA: ...]`.
- Sem caixa alta em parágrafo. Caixa alta só em rótulo de até 3 palavras.
- Zero emoji e zero exclamação em texto de venda.

## HTML e SEO

- **(teste)** Um único `<h1>` por página, e headings sem pular nível.
- **(teste)** `<title>` com até 60 caracteres e `meta description` entre 140 e 160 nas páginas completas.
- **(teste)** JSON-LD válido: `EducationalOrganization` em todas as páginas, `Service` no NR-1, `ItemList`/`Course` e `FAQPage` em Idiomas. O FAQ do JSON-LD é igual ao FAQ visível.
- **(teste)** Noindex (meta e cabeçalho) em todo build padrão. Só o build com `INDEXAVEL=true` sai sem ele.
- **(teste)** HTML válido pelo `html-validate`. Nada de `<a>` dentro de `<button>`, nem bloco dentro de `<p>`.
- **(teste)** Todo `target="_blank"` vem com `rel="noopener"`.
- **(teste)** Todo link interno resolve, com a barra final, e toda âncora existe.
- O WhatsApp usa só o formato `https://wa.me/5511934661917?text=`, nunca `api.whatsapp.com`.
- Botão que abre o drawer é `<button type="button" aria-haspopup="dialog">`, nunca `<a href="#">`.

## CSS

- Cores, tamanhos de texto, espaçamentos, raios, durações, o anel de foco e a sombra vêm de tokens. Nenhum valor solto fora do arquivo de tokens, a não ser proporção de imagem, posição de forma decorativa, o fio de 1 px e as cores da arte (véu do hero e Placeholders).
- **(teste)** Zero `!important`, zero `transition: all` e zero `overflow-x: hidden` no `body`.
- Transição sempre com a propriedade nomeada.
- Movimento anima só `transform` e `opacity`. Mudança de cor no hover pode ter transição curta (`--dur-rapida`), porque não desloca nada.
- **(teste)** Animação por rolagem sempre com as propriedades escritas por extenso (`animation-name`, `animation-timeline`, `animation-range`...), nunca pelo atalho `animation`. O teste confere que `animation-timeline` sobreviveu no CSS gerado.
- **(teste)** Todo movimento fica dentro de `@media (prefers-reduced-motion: no-preference)`, inclusive a transição entre páginas e o giro dos indicadores. O parallax fica também dentro de `@supports (animation-timeline: view())`.
- Nada na primeira tela começa invisível. O estado escondido das revelações só existe quando a melhoria está ativa.
- Para recortar, use `overflow: clip`. `overflow: hidden` em ancestral de elemento sticky é proibido. Exceção: no `html`, para travar a rolagem com o menu ou o drawer abertos; ali o valor vai para a janela e o sticky continua funcionando.
- Não use `@scope`, que quebra o minificador.
- Não use `backdrop-filter`, gradiente em texto ou gradiente em botão. Gradiente só na arte da marca, nos Placeholders e no véu do hero, que garante a leitura do texto sobre a imagem.
- Sombra só com motivo escrito em comentário. A profundidade vem de cor de fundo e de fio de 1 px.
- `:focus-visible` desenhado em todo elemento interativo, com os tokens `--foco` e `--foco-afastamento`.
- **(teste)** Magenta e violeta nunca como cor de texto: as duas ficam para forma, foco e arte.
- **(teste)** Contraste mínimo de 4,5:1 em texto normal e 3:1 em texto grande e indicador de foco, calculado.
- Alvo de toque de no mínimo 44 × 44 px. Campo de formulário com fonte de 16 px ou mais.
- Link ou botão com `display: flex` ou `grid` leva o rótulo inteiro dentro de um único `<span>`. Texto solto ao lado de um `<span>` vira item separado, e o espaço entre eles some ("deNR-1"). Em link de texto, use `inline-block` com padding calculado.
- Nada de `style` inline: o `html-validate` recusa. O que depende de um valor por item fica no CSS, com seletor de atributo.
- Nomes de classe e de componente em português, num idioma só.

## JavaScript

- TypeScript só nas partes interativas. Sem framework de interface, sem jQuery e sem GSAP.
- **(teste)** JavaScript inicial abaixo de 30 KB por página e abaixo de 10 KB com gzip (a meta interna é medida comprimida).
- Lógica sem tela (campos, validação, mensagem do WhatsApp, formatador de texto) fica em módulo puro, com teste unitário escrito antes.
- Todo acesso a `localStorage` fica dentro de `try/catch`.
- A página funciona sem JavaScript: conteúdo visível, links funcionando e o WhatsApp alcançável pelo botão flutuante.
- Nenhum request de terceiros: sem CDN, sem fonte externa, sem script de rastreamento no MVP.

## Imagens e fontes

- Toda imagem passa pelo componente de figura:
  - se o arquivo existe em `src/assets/imagens/`, sai em AVIF com fallback WebP, com srcset, sizes, width e height;
  - se não existe, sai o Placeholder com ID e alt.
- Lazy fora da primeira dobra. `priority` (fetchpriority alto) só na imagem do hero.
- No máximo 2 famílias de fonte, hospedadas no site pela Fonts API, com `font-display: swap`. Preload só do peso do H1.
- A fonte do logo (Neulis Sans) não entra no site.

## Comentários e commits

- Comentário só quando explica um porquê que não é óbvio. Nada de comentário-caixa, banner com nome do arquivo ou descrição do que a linha faz.
- Um commit por etapa (ou por mudança, nas revisões), com mensagem em português e no imperativo.
