# 17: Revisão final

**O que construir:** o site inteiro revisado, com os ajustes da Daniella, as revisões de código, de interface e de texto, e o preview completo para a Daniella e o Arthur aprovarem.

**Depende de:** 04 a 16.

**Horas:** 6. **Semana:** 7.

**Situação:** parte técnica em andamento desde 06/10/2026, adiantada da semana 7, a pedido do Maxwell: suíte de navegador e Lighthouse feitos; falta o `code-review`. A parte da Daniella espera a revisão dela.

- [ ] Ajustes da revisão da Daniella aplicados nos quatro lotes, com a aprovação dela por escrito registrada.
- [ ] `code-review` desde a tag `mvp-aprovado`, nos dois eixos, com as correções em commits próprios.
- [ ] Se sobrar hora: levar as três formas da meia-pílula (marcador, marca de ação e separador) para o `base.css`. A proposta vem do `code-review` do ticket 06, mexe em doze componentes e não muda nada na tela. O Maxwell decidiu em 01/10/2026 que ela espera esta revisão. A prova é a mesma do ticket 05: as capturas de antes e de depois idênticas, byte a byte.
- [ ] O que os tickets feitos no processo curto deixaram de fora, a pedido do Maxwell em 02/10/2026: o Lighthouse de cada página, a suíte de navegador inteira e o `code-review` do ticket. Começa pelo 07 (Quem Somos) e segue com o 22 (home, NR-1, Cursos e cinco páginas de idioma) e o 12 (o envio do pedido, que rodou a suíte de navegador inteira e ficou sem o Lighthouse e o `code-review`); cada ticket diz no "Como ficou" dele o que ficou de fora.
- [ ] Duas repetições de CSS que o 22 deixou, para o `code-review` decidir: o abre e fecha do `Acordeao` é igual ao do `Faq` (a chamada, o meio-círculo que gira e o texto de dentro), e o `GruposDePontos` traz mais uma cópia do marcador de meia-pílula, que entra na proposta do item acima.
- [ ] `humanizar-ui` e `humanizar` rodados, com as correções aplicadas.
- [x] Nenhuma rolagem horizontal em 360, 390, 768, 1280 e 1920 px, em todas as páginas (teste de larguras, na suíte inteira de 06/10).
- [ ] A lista das pendências ainda abertas, com uma sugestão para cada uma, para o Maxwell decidir caso a caso.
- [ ] Preview completo publicado para a aprovação da Daniella e do Arthur.

## Andamento

**Parte técnica, 06/10/2026:**

- **Suíte de navegador inteira:** 368 testes passaram, nenhuma falha, nos três perfis (celular, computador e iPhone), em 6,6 minutos. O teste de larguras não achou rolagem horizontal em nenhuma página.
- **Lighthouse de cada página** (roteiro `ticket-17` em `scripts/lighthouse.ts`, relatório em `relatorios/ticket-17/lighthouse.md`), mobile, no build de produção, mediana de 3 rodadas:
  - primeira medida: Performance entre 95 e 100, Acessibilidade, Boas práticas e SEO em 100, LCP abaixo de 2,0 s em todas, mas o CLS passou da meta em três páginas: inglês (0,109), Quem Somos (0,103) e NR-1 (0,057);
  - a causa: com a fonte reserva, o texto do topo quebra numa linha a mais (o título do NR-1, o apoio do Quem Somos e do inglês) e empurra o que vem abaixo quando a fonte chega. Só a fonte dos títulos era carregada antes da primeira pintura; a do texto passou a ser também (commit `bc1a384`);
  - segunda medida: as 21 páginas com Performance 99 ou 100, as outras três notas em 100, LCP entre 1,36 s e 1,96 s (japonês e mandarim, os mais altos) e CLS 0,017. O 0,017 de todas é o atalho do WhatsApp subindo quando o aviso de cookies aparece no celular.
- **Teste intermitente:** o teste que desenha a imagem de prévia passou dos 5 s uma vez, com a suíte inteira em paralelo; ganhou 30 s (commit `e161688`).
- **Falta:** o `code-review` nos dois eixos, em quatro grupos (07 e 22; 12 e 13; o parecer de UX e as respostas da 9vee; 15, 14, 18 e 19).
