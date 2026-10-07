# 16: Imagens finais

**O que construir:** as imagens das seções e páginas novas, geradas no Gemini pelo Maxwell, no lugar dos Placeholders.

**Depende de:** 05, 06, 07, 11, 21, 22.

**Horas:** 4 (eram 3). **Semanas:** 4 (as das páginas do reaproveitamento) e 6 (as das cidades).

**Situação:** feito nas páginas que existem; faltam as fotos das cidades, que esperam o ticket 11.

- [x] Os prompts das imagens novas em `docs/imagens-gemini.md`, no padrão do MVP: em inglês, com o estilo base e a linha "Avoid". Cada ticket do reaproveitamento (05, 06, 07, 21 e 22) escreve os prompts das seções que criar; aqui eles são conferidos e as imagens entram. Conferido em 07/10/2026: estão lá os da Tradução, do LMS, da interpretação de mandarim e do Quem Somos; o 22 não criou seção com imagem.
- [x] O hero da página de interpretação de mandarim (`/traducao-simultanea/mandarim/`), com prompt próprio, de interpretação numa reunião de negócios. Não é a foto da página do curso de mandarim. Feito em 02/10/2026, no ticket 21.
- [x] As imagens geradas e salvas em `src/assets/imagens/` com o nome esperado; nenhum Placeholder no build de produção. Conferido em 07/10/2026: as 31 imagens que as páginas pedem existem, e o `dist/` e o `dist-producao/` de 06/10 não têm nenhum Placeholder. A trava de produção barra o que aparecer depois (regra `placeholder`).
- [x] Recortes conferidos pela cor, e não só pelo alfa: a intérprete do topo da home no MVP (`docs/andamento.md`, "Nota sobre recorte") e a aluna em 04/10/2026 (`docs/imagens-gemini.md`).
- [ ] As fotos das cidades publicadas. O ticket 11 decide quais cidades entram e o tipo de cada página, e escreve o prompt de cada foto; aqui elas entram em `src/assets/imagens/`.

**Adiantado em 30/09/2026:** as 14 fotos das páginas de idioma (`idioma-<slug>.jpg`), geradas pelo Maxwell. Em 13 delas o Gemini desenhou o arco dentro da imagem, e um recorte tirou a moldura. Os prompts, o conceito e a tabela do recorte estão em `docs/imagens-gemini.md`.

**Adiantado em 01/10 e 02/10/2026:** as fotos das seções novas do LMS e da Tradução (`lms-o-que-e.jpg` e `traducao-como.jpg`, tickets 06 e 05) e o hero da interpretação de mandarim (`interpretacao-mandarim-hero.jpg`, ticket 21), geradas pelo Maxwell. Aqui ficam faltando as imagens das páginas dos tickets 07, 11 e 22.

**Adiantado em 02/10 e 04/10/2026:** a foto da história do Quem Somos (`quem-somos-historia.jpg`, ticket 07) e a da aluna do topo da home (`home-hero-frente-voce.png`). Desde 04/10, só faltam as fotos das cidades.
