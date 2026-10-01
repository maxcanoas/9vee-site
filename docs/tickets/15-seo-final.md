# 15: SEO final

**O que construir:** o que falta do SEO técnico depois que as páginas novas existem: sitemap, favicon completo, verificação do Search Console e os links cruzados entre serviço, idioma e cidade.

**Depende de:** 09, 11, 21.

**Horas:** 2,5 (eram 2). **Semana:** 6.

**Situação:** ready-for-agent

- [ ] `/sitemap.xml` gerado a cada build de produção, só com as páginas publicadas. A página de interpretação de mandarim (`/traducao-simultanea/mandarim/`) entra desde o lançamento.
- [ ] Favicon completo: SVG, ICO, os PNG de 32, 180, 192 e 512 e o manifesto.
- [ ] A meta tag de verificação do Search Console no build de produção.
- [ ] Menu e rodapé com as páginas novas publicadas; links cruzados de serviço para idioma, de idioma para cidade e de cidade para serviço.
- [ ] A página de interpretação de mandarim no rodapé, no grupo Empresas, e fora do menu. Hoje o rodapé mostra os mesmos grupos do menu (`menu.grupos`, em `content/site.md`): o link só do rodapé pede um campo próprio. A trilha da página continua "Mandarim", o nome que ela mesma dá, e não o rótulo do rodapé.
- [ ] Os links cruzados da página de interpretação de mandarim, conferidos: a Tradução e o curso de mandarim levam a ela, e ela leva ao curso (ticket 21).
- [ ] Testes do HTML gerado cobrem o sitemap, o favicon, a verificação e os links.
