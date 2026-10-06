# 15: SEO final

**O que construir:** o que falta do SEO técnico depois que as páginas novas existem: sitemap, favicon completo, verificação do Search Console e os links cruzados entre serviço, idioma e cidade.

**Depende de:** 09, 11, 21.

**Horas:** 2,5 (eram 2). **Semana:** 6.

**Situação:** feito e aprovado pelo Maxwell em 06/10/2026, adiantado da semana 6, no processo curto. O 11 (cidades) ainda não existe: os dois links cruzados que dependem dele ficam para o 11, que já pede página de cidade ligada a serviço e a idioma.

- [x] `/sitemap.xml` gerado a cada build de produção, só com as páginas publicadas. A página de interpretação de mandarim (`/traducao-simultanea/mandarim/`) entra desde o lançamento.
- [x] Favicon completo: SVG, ICO, os PNG de 32, 180, 192 e 512 e o manifesto.
- [x] A meta tag de verificação do Search Console no build de produção.
- [ ] Menu e rodapé com as páginas novas publicadas; links cruzados de serviço para idioma, de idioma para cidade e de cidade para serviço. **Feito:** menu e rodapé, e serviço para idioma (a home e Cursos levam a cada página de idioma publicada, desde o ticket 09). **Fica para o 11:** idioma para cidade e cidade para serviço, porque ainda não há página de cidade.
- [x] A página de interpretação de mandarim no rodapé, no grupo Empresas, e fora do menu. Hoje o rodapé mostra os mesmos grupos do menu (`menu.grupos`, em `content/site.md`): o link só do rodapé pede um campo próprio. A trilha da página continua "Mandarim", o nome que ela mesma dá, e não o rótulo do rodapé.
- [x] Os links cruzados da página de interpretação de mandarim, conferidos: a Tradução e o curso de mandarim levam a ela, e ela leva ao curso (ticket 21).
- [x] Testes do HTML gerado cobrem o sitemap, o favicon, a verificação e os links.

## Como ficou

- **O sitemap** (`scripts/sitemap.ts`, ligado no `astro.config.mjs`): sai só no build de produção, em `dist-producao/sitemap.xml`, com as páginas que o build gerou. Como a página não publicada não chega ao build de produção, ela também não chega ao sitemap, sem lista à parte. A página de erro fica de fora. Hoje são 21 endereços, com a interpretação de mandarim e sem o cantonês. O preview continua sem sitemap, e o robots.txt da produção já apontava para ele. Quando o blog (ticket 14) criar páginas, elas entram sozinhas.
- **O favicon** (`scripts/gerar-ativos.ts`): o `favicon-32.png` e o `favicon.ico` (com os PNG de 16, 32 e 48 dentro) saem do mesmo desenho do `favicon.svg`, o "9" no círculo navy. O `icone-192.png` e o `icone-512.png` repetem o ícone do iPhone, quadrado navy com o "9", que cabe no recorte em círculo do Android. O manifesto (`src/pages/manifest.webmanifest.ts`) leva o nome da marca de `content/site.md`. O site continua abrindo no navegador: não é aplicativo. Os ativos que já existiam saíram iguais.
- **A verificação do Search Console** (`src/layouts/Base.astro`): a mesma meta tag que o Wix usa, conferida no ar em 06/10, em todas as páginas da produção e em nenhuma do preview.
- **O rodapé** (`rodape.soNoRodape`, em `content/site.md`): a interpretação de mandarim entra no fim do grupo Empresas, com o rótulo "Interpretação de mandarim". O menu, a página de erro e a trilha não leem este campo. O esquema recusa link num grupo que o menu não tem.
- **Os testes:** 3 de lógica (`tests/unit/sitemap.test.ts`) e 58 do HTML (`tests/dist/seo.test.ts`). O teste da home que conferia a ordem do grupo Empresas no rodapé ganhou o link novo no fim. `npm test` com 203 testes de lógica e 1.511 do HTML.
- **Capturas** do rodapé em 360, 768 e 1280 em `relatorios/ticket-15/` (roteiro `ticket-15`). Em 1280 o rótulo quebra em duas linhas, como os outros quebrariam numa coluna estreita.
- **Ficou de fora,** pelo processo curto: o Lighthouse e a rodada de `code-review`, que voltam no ticket 17.
