# 02: Retrato do antes

**O que construir:** o registro do site atual para o relatório de entrega com o antes e o depois, que a proposta promete. Ele precisa existir antes de o Wix sair do ar.

**Depende de:** nenhum (pode começar já).

**Horas:** 0,5. **Semana:** 1 ou 2.

**Situação:** feito em 29/09/2026.

- [x] Lighthouse mobile das páginas principais do Wix (home, cursos, tradução, treinamentos, LMS e quem somos): Performance, Acessibilidade, Boas práticas, SEO, LCP e CLS.
- [x] As rodadas contam como visita no GA4 do site atual: o documento anota o dia, para descontar depois.
- [x] Os números do inventário, com data: sessões, visitantes, origem, envios de formulário e Search Console.
- [x] O que o site atual não tem, para o antes e o depois: aviso de cookies, conversões no GA4, página de NR-1, páginas de idioma, títulos próprios.
- [x] Tudo num documento em `docs/`, versionado.

**Como ficou:** tudo em `docs/antes.md`, com o que o Google lê em cada página (título, descrição, H1, dados estruturados e imagens sem texto alternativo) além do pedido. A medida do site no ar é `scripts/lighthouse-no-ar.ts`, que divide com o `scripts/lighthouse.ts` a mediana e a tabela (`scripts/medida-lighthouse.ts`). Duas lições da medida, já corrigidas no script: nota em branco do Lighthouse não pode contar como zero (deu Boas práticas 0 na home), e cada página mede num processo próprio, porque o Lighthouse não devolve a memória entre as rodadas. O documento anota as cinco janelas de medição do dia, cerca de 53 visitas a descontar no GA4 e no Twipla.
