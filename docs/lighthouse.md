# Lighthouse do site

A medida que o ticket 20 pede (brief, item 14): Lighthouse mobile em todas as páginas, no build de produção rodando local, mediana de 3 rodadas por página. Gerado por `node scripts/build.ts producao && node scripts/lighthouse.ts ticket-20`; o relatório de cada rodada fica em `relatorios/ticket-20/`.

**Medido em 09/10/2026,** com Lighthouse 13.5.0 e Chrome 154.0.8037.99, depois das páginas de cidade, do cantonês, do carrossel dos depoimentos e do humanizar.

Metas: Performance 95 ou mais, Acessibilidade 100, Boas práticas 95 ou mais, SEO 100, LCP abaixo de 2,0 s e CLS abaixo de 0,05. **As 26 páginas batem todas as metas.**

O servidor da medida manda HTML, CSS e JS com gzip, como a Cloudflare e o `.htaccess` da HostGator fazem. Sem isso, a medida castiga uns 130 KB por página que a produção nunca envia.

| Página | Perf. | Acess. | Práticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| / | 97 | 100 | 100 | 100 | 1.82 s | 0.000 | 115 ms |
| /curso-de-idiomas/ | 100 | 100 | 100 | 100 | 1.66 s | 0.017 | 17 ms |
| /curso-de-idiomas/alemao/ | 100 | 100 | 100 | 100 | 1.73 s | 0.017 | 0 ms |
| /curso-de-idiomas/arabe/ | 100 | 100 | 100 | 100 | 1.73 s | 0.018 | 0 ms |
| /curso-de-idiomas/cantones/ | 99 | 100 | 100 | 100 | 1.81 s | 0.017 | 13 ms |
| /curso-de-idiomas/espanhol/ | 100 | 100 | 100 | 100 | 1.81 s | 0.017 | 0 ms |
| /curso-de-idiomas/frances/ | 100 | 100 | 100 | 100 | 1.88 s | 0.017 | 0 ms |
| /curso-de-idiomas/holandes/ | 99 | 100 | 100 | 100 | 1.81 s | 0.017 | 4 ms |
| /curso-de-idiomas/ingles/ | 100 | 100 | 100 | 100 | 1.66 s | 0.017 | 0 ms |
| /curso-de-idiomas/italiano/ | 99 | 100 | 100 | 100 | 1.81 s | 0.017 | 2 ms |
| /curso-de-idiomas/japones/ | 99 | 100 | 100 | 100 | 1.96 s | 0.017 | 0 ms |
| /curso-de-idiomas/mandarim/ | 99 | 100 | 100 | 100 | 1.96 s | 0.017 | 0 ms |
| /curso-de-idiomas/noruegues/ | 100 | 100 | 100 | 100 | 1.81 s | 0.017 | 0 ms |
| /curso-de-idiomas/portugues-para-estrangeiros/ | 100 | 100 | 100 | 100 | 1.81 s | 0.017 | 0 ms |
| /curso-de-idiomas/russo/ | 99 | 100 | 100 | 100 | 1.81 s | 0.017 | 0 ms |
| /curso-de-idiomas/sueco/ | 99 | 100 | 100 | 100 | 1.81 s | 0.017 | 0 ms |
| /lms/ | 100 | 100 | 100 | 100 | 1.66 s | 0.017 | 6 ms |
| /politica-de-privacidade/ | 100 | 100 | 100 | 100 | 1.36 s | 0.017 | 0 ms |
| /quem-somos/ | 100 | 100 | 100 | 100 | 1.66 s | 0.017 | 9 ms |
| /rio-de-janeiro/ | 100 | 100 | 100 | 100 | 1.74 s | 0.017 | 0 ms |
| /sao-paulo/ | 100 | 100 | 100 | 100 | 1.73 s | 0.017 | 0 ms |
| /traducao-simultanea/ | 100 | 100 | 100 | 100 | 1.51 s | 0.017 | 20 ms |
| /traducao-simultanea/brasilia/ | 100 | 100 | 100 | 100 | 1.66 s | 0.017 | 0 ms |
| /traducao-simultanea/curitiba/ | 100 | 100 | 100 | 100 | 1.88 s | 0.017 | 0 ms |
| /traducao-simultanea/mandarim/ | 100 | 100 | 100 | 100 | 1.66 s | 0.017 | 0 ms |
| /treinamento-nr-1/ | 100 | 100 | 100 | 100 | 1.66 s | 0.017 | 0 ms |

## Notas

- **A home:** na medida de todas as páginas, ela deu Performance 97, com TBT de 115 ms (em 06/10 tinha sido 99, com 3 ms). Medida de novo, sozinha (`node scripts/lighthouse.ts ticket-20-home`), deu 99 e 16 ms. Foi variação da máquina, e não o carrossel: a página de holandês, que também tem o carrossel, deu 4 ms. O TBT é o número que mais varia com o computador ocupado.
- **O CLS de 0,017** é o atalho do WhatsApp subindo quando o aviso de cookies aparece no celular, o mesmo de 06/10.
- **O LCP mais alto** é o do japonês e do mandarim, 1,96 s, perto da meta de 2,0 s. É a foto do topo; se passar da meta no servidor de verdade, ela é a primeira a olhar.
- **Medir de novo no lançamento,** já na HostGator, com o PageSpeed Insights do Google, que mede o servidor real.
