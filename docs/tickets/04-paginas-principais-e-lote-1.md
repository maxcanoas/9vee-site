# 04: Páginas principais fechadas e lote 1

**O que construir:** Home, Treinamento de NR-1 e Cursos de Idiomas no estado mais final possível com as respostas que já chegaram, com o SEO técnico dessas páginas completo, e o lote 1 pronto para a Daniella.

**Depende de:** 01, 03.

**Horas:** 8. **Semana:** 2.

**Situação:** feito em 29/09/2026, sem resposta do cliente ainda.

- [x] As respostas do cliente que chegaram estão aplicadas. O que falta continua marcado, com o nome de quem responde. Nenhuma resposta chegou até aqui: as pendências seguem como estavam, e as da Daniella e do Arthur já levam o nome de quem responde (ticket 03).
- [x] `EducationalOrganization` sem endereço, com `areaServed`, `contactPoint` e `sameAs`. "Sede em São Paulo" sai dos textos compartilhados.
- [x] `FAQPage` na home e no NR-1, igual ao FAQ visível; `Service` no NR-1.
- [x] Trilha de navegação visível nas páginas internas, com o `BreadcrumbList` igual.
- [ ] Se a Daniella confirmar a realocação de funcionários, o bloco entra na parte de empresas da página de cursos. Ainda sem resposta (pergunta 29 da mensagem ao cliente).
- [x] `humanizar` rodado em todo texto alterado.
- [x] `docs/revisao-daniella/lote-1.md` gerado com as três páginas e os textos compartilhados (menu, rodapé e pedido), depois das correções que a revisão do ticket 03 pediu no gerador. Ele traz 23 pendências no texto (20 com a Daniella e 3 com o Arthur) e as 4 da faixa de números.
- [x] Testes do HTML gerado e do navegador passam; `docs/novidades-preview.md` atualizado.

**Como ficou:** a trilha tem dois passos, "Início" e a página, com o nome que o site já usa para ela em `content/site.md`. A mesma lista vira a trilha na tela e o `BreadcrumbList`, e um teste confere que os dois batem em toda página interna. As páginas parciais (Tradução, LMS e Quem Somos) também ganharam a trilha, porque o hero delas é o mesmo. Com a trilha no alto, o respiro de cima do hero ficou igual no celular e no computador; senão o botão sairia da primeira tela em 1280 x 800 (capturas em `relatorios/ticket-04/`). O "sede em São Paulo" que ainda aparece no texto de Quem Somos sai no ticket 07, que reescreve a página. O teste que comparava o FAQPage com o FAQ visível só em Idiomas passou a valer para toda página.
