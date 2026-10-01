# 04: Páginas principais fechadas e lote 1

**O que construir:** Home, Treinamento de NR-1 e Cursos de Idiomas no estado mais final possível com as respostas que já chegaram, com o SEO técnico dessas páginas completo, e o lote 1 pronto para a Daniella.

**Depende de:** 01, 03.

**Horas:** 8. **Semana:** 2.

**Situação:** feito em 29/09/2026, sem resposta do cliente ainda.

- [x] As respostas do cliente que chegaram estão aplicadas. O que falta continua marcado, com o nome de quem responde. Nenhuma resposta chegou até aqui: as pendências seguem como estavam, e as da Daniella e do Arthur já levam o nome de quem responde (ticket 03).
- [x] `EducationalOrganization` sem endereço, com `areaServed`, `contactPoint` e `sameAs`. "Sede em São Paulo" sai dos textos compartilhados.
- [x] `FAQPage` na home e no NR-1, igual ao FAQ visível; `Service` no NR-1.
- [x] Trilha de navegação visível nas páginas internas, com o `BreadcrumbList` igual.
- [ ] Se a Daniella confirmar a realocação de funcionários, o bloco entra na parte de empresas da página de cursos. Ainda sem resposta (pergunta 30 da mensagem ao cliente). **Passou para o ticket 22 em 30/09/2026:** o serviço está publicado no site atual, então o bloco entra como fato, sem esperar a resposta, e a pergunta 30 vira confirmação.
- [x] `humanizar` rodado em todo texto alterado.
- [x] `docs/revisao-daniella/lote-1.md` gerado com as três páginas e os textos compartilhados (menu, rodapé e pedido), depois das correções que a revisão do ticket 03 pediu no gerador. Ele traz 23 pendências no texto (20 com a Daniella e 3 com o Arthur) e as 4 da faixa de números.
- [x] Testes do HTML gerado e do navegador passam; `docs/novidades-preview.md` atualizado.

**Como ficou:** a trilha sai do endereço da página (`src/lib/trilha.ts`): o Início e um passo para cada nível, com o nome que o menu dá a ele. O `Base` monta o `BreadcrumbList` em toda página que não seja a home nem a 404, e o hero mostra a mesma trilha; nenhuma página liga nada à mão. Os testes conferem que a trilha na tela bate com o JSON-LD, que só há um `BreadcrumbList`, que os passos antes do último são links e que o nome da página é o do menu. As páginas parciais (Tradução, LMS e Quem Somos) também ganharam a trilha, porque o hero delas é o mesmo. O link "Início" tem a área de toque de 44 x 44 px num pseudo-elemento, e o respiro de cima do hero ficou igual no celular e no computador: um teste do navegador confere que o botão de cada hero cabe na primeira tela em 1280 x 800 (capturas em `relatorios/ticket-04/`). O "sede em São Paulo" que ainda aparece no texto de Quem Somos sai no ticket 07, que reescreve a página. O teste que comparava o FAQPage com o FAQ visível só em Idiomas passou a valer para toda página.

**Revisão de código (29/09/2026):** corrigido em commit próprio. A primeira versão tirava o nome da página do trecho da mensagem do WhatsApp ("Quem Somos", com outra caixa), ligava a trilha à mão em cada página, empurrava o botão da Tradução para fora da primeira tela com o padding do link e tinha um teste que só exigia trilha numa lista fixa de rotas.
