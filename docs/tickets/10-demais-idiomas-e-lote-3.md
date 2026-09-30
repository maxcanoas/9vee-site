# 10: Demais idiomas e lote 3

**O que construir:** as outras 11 páginas de idioma, cada uma com conteúdo próprio, publicadas conforme os fatos do Arthur chegam, e o lote 3 para a Daniella.

**Depende de:** 09.

**Horas:** 6. **Semana:** 4, podendo seguir na 5 se os fatos atrasarem.

**Situação:** feito em 29/09/2026, adiantado da semana 4. As páginas entram no site conforme as respostas do Arthur chegarem.

- [x] Ordem: holandês e francês, depois os demais.
- [x] Cada página só com fatos daquele idioma; a que não tiver fato fica não publicada.
- [x] `humanizar`; `docs/revisao-daniella/lote-3.md` com os idiomas escritos.

**Como ficou:**

- **Com fatos do site atual (3):**
  - holandês: o Inburgering, o exame prévio de integração, com as duas partes que ele avalia (a língua e a cultura);
  - francês: o DELF, o DALF e o TCF, com simulados e professores nativos no preparatório do TCF;
  - português para estrangeiros: do básico ao avançado, as quatro habilidades, o CELPE-Bras e o profissional que veio de fora, no endereço `/curso-de-idiomas/portugues-para-estrangeiros/`, que a spec pede.
- **Esqueletos (8):** alemão, italiano, sueco, norueguês, romeno, japonês, árabe e russo, pela escolha do Maxwell em 29/09. O site atual só traz o nome deles, então cada página tem a saudação, o título e seis perguntas marcadas: cinco para o Arthur e o preço para a Daniella. Nenhum texto genérico no lugar do fato. Quando as respostas chegarem, cada pergunta vira resposta, e a página ganha as seções que os fatos pedirem.
- **Publicação:** as 14 páginas estão não publicadas. Aparecem no preview pelo endereço e ficam fora da produção, da home e da página de cursos.
- **Lote 3:** `docs/revisao-daniella/lote-3.md`, com os seis idiomas escritos (inglês, espanhol, mandarim, holandês, francês e português). Os esqueletos entram num lote quando ganharem texto.
- **Holandês:** usa a seção clara de prova, e não o bloco escuro. Logo depois do topo, as duas faixas azuis se fundiriam numa só.
- **Aviso do topo:** encurtou para "Fora do site até vocês responderem", que cabe numa linha no celular.
- **Título do português:** ficou "Português para estrangeiros", o nome da trilha. Com "Curso de...", ele ia a três linhas no computador e empurrava o botão para fora da primeira tela em 1280 × 800; o teste de larguras pegou. O título do Google, a mensagem do WhatsApp e o `Course` continuam "Curso de português para estrangeiros".
- **Testes:** os 14 idiomas têm página, uma por idioma. O teste de larguras lê a lista de `content/idiomas/`, e cada idioma novo entra nele sozinho.
- **Pendências em `content/`:** 107, 78 delas das páginas de idioma. A pergunta 2 do Arthur e as perguntas 7 e 29 da Daniella cobrem todas.
