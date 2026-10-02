# 16: Imagens finais

**O que construir:** as imagens das seções e páginas novas, geradas no Gemini pelo Maxwell, no lugar dos Placeholders.

**Depende de:** 05, 06, 07, 11, 21, 22.

**Horas:** 4 (eram 3). **Semanas:** 4 (as das páginas do reaproveitamento) e 6 (as das cidades).

**Situação:** ready-for-agent

- [ ] Os prompts das imagens novas em `docs/imagens-gemini.md`, no padrão do MVP: em inglês, com o estilo base e a linha "Avoid". Cada ticket do reaproveitamento (05, 06, 07, 21 e 22) escreve os prompts das seções que criar; aqui eles são conferidos e as imagens entram.
- [x] O hero da página de interpretação de mandarim (`/traducao-simultanea/mandarim/`), com prompt próprio, de interpretação numa reunião de negócios. Não é a foto da página do curso de mandarim. Feito em 02/10/2026, no ticket 21.
- [ ] As imagens geradas e salvas em `src/assets/imagens/` com o nome esperado; nenhum Placeholder no build de produção.
- [ ] Recortes conferidos pela cor, e não só pelo alfa.

**Adiantado em 30/09/2026:** as 14 fotos das páginas de idioma (`idioma-<slug>.jpg`), geradas pelo Maxwell. Em 13 delas o Gemini desenhou o arco dentro da imagem, e um recorte tirou a moldura. Os prompts, o conceito e a tabela do recorte estão em `docs/imagens-gemini.md`.

**Adiantado em 01/10 e 02/10/2026:** as fotos das seções novas do LMS e da Tradução (`lms-o-que-e.jpg` e `traducao-como.jpg`, tickets 06 e 05) e o hero da interpretação de mandarim (`interpretacao-mandarim-hero.jpg`, ticket 21), geradas pelo Maxwell. Aqui ficam faltando as imagens das páginas dos tickets 07, 11 e 22.
