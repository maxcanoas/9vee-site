# Cronograma da Fase 1: 8 semanas

Montado em 29/09/2026, com os 20 tickets de `docs/tickets/` e as decisões de `docs/fase-1-spec.md`.

- **Ritmo:** 11 a 12 horas suas por semana, como você decidiu. As horas contam a sessão comigo, a revisão, os testes, o Gemini e o cliente, e não o meu tempo de execução.
- **Toda semana, 0,75 hora:** publicar o preview (`npm run build:preview` e `npx wrangler deploy`), mandar o `docs/novidades-preview.md` para a Daniella e o Arthur e fazer o contato semanal que a proposta promete.
- **Cada ticket termina com commit e parada** para o seu ok.
- **Fim da Fase 1:** 22/11/2026, com o site pronto para ir ao ar. A publicação vem quando o cliente der o acesso à HostGator.

## Semana a semana

| Semana | Datas | Tickets | Horas | O que o cliente vê no preview |
|---|---|---|---|---|
| 1 | 28/09 a 04/10 | Fase A (5 h), 01 Modos de build e trava, 02 Retrato do antes, 03 Pendência com responsável e lotes, mensagem de pendências ao cliente (1 h) | 11,75 | O MVP como está; o preview passa a sair pelo build novo |
| 2 | 05/10 a 11/10 | 04 Páginas principais fechadas e lote 1 | 9,25 | Home, NR-1 e Cursos com as respostas, trilha de navegação; o lote 1 vai para a Daniella |
| 3 | 12/10 a 18/10 (feriado dia 12) | 05 Tradução Simultânea, 06 LMS, 07 Quem Somos, 08 Privacidade, 404 e lote 2 | 11,25 | As três páginas completas, sem etiqueta de obra, e a política nova |
| 4 | 19/10 a 25/10 | 09 Página de idioma (modelo, inglês, espanhol, mandarim), 10 Demais idiomas e lote 3 | 10,75 | As páginas de idioma, com as pendências à vista |
| 5 | 26/10 a 01/11 | 11 Páginas por cidade e lote 4, 12 Envio real do pedido | 11,25 | As cidades com fato local e o pedido chegando de verdade (no e-mail de teste) |
| 6 | 02/11 a 08/11 (feriado dia 2) | 13 Aviso de cookies, GA4 e eventos, 14 Arquivo do blog e mapa de redirecionamentos | 10,75 | O aviso de cookies; o mapa de redirecionamentos vai para a sua revisão |
| 7 | 09/11 a 15/11 | 15 SEO final, 16 Imagens finais, 17 Revisão final | 11,75 | O site completo, para a Daniella e o Arthur aprovarem |
| 8 | 16/11 a 22/11 (feriado dia 20) | 18 Imagem de compartilhamento, 19 Gerador do `.htaccess`, 20 Produção pronta | 11,5 | A prévia de cada página no WhatsApp; a versão final |

Total: cerca de 88 horas.

## O que depende do cliente, e até quando

| Até | Quem | O quê | Trava |
|---|---|---|---|
| Semana 2 | Daniella | As 8 primeiras perguntas da mensagem (margem e prioridade, anos, idiomas, números, depoimentos, prazo de resposta, preço, caixa do e-mail) | Ticket 04 |
| Semana 3 | Daniella | NR-1, tradução, LMS, quem somos, privacidade (razão social, CNPJ e canal) e realocação | Tickets 04 a 08 |
| Semana 4 | Arthur | A lista dos idiomas e o questionário de cada um | Tickets 09 e 10 |
| Semana 4 | Daniella | A revisão do lote 1 | Ticket 17 |
| Semana 5 | Daniella e Arthur | Os fatos de cada cidade | Ticket 11 |
| Semana 5 | Daniella | A revisão do lote 2 | Ticket 17 |
| Semana 6 | Arthur | O acesso de editor ao GA4 e de usuário completo ao Search Console | Ticket 13 |
| Semana 6 | Daniella | A revisão dos lotes 3 e 4 | Ticket 17 |
| Semana 7 | Daniella e Arthur | A aprovação do preview e, da Daniella, a aprovação dos textos por escrito | Tickets 17 e 20 |

## Se algo atrasar

- **Se os fatos dos idiomas ou das cidades atrasarem,** o 12 (envio) e o 13 (cookies e GA4) sobem uma semana, porque não dependem do cliente. Os idiomas e as cidades descem para o lugar deles.
- **Página sem fato confirmado não trava o lançamento:** ela fica não publicada, e os posts dela apontam para a página do serviço ou para a de cursos.
- **Se uma revisão da Daniella não voltar a tempo,** o lote segue para a semana 7, e o que continuar aberto entra na decisão caso a caso da semana 8.
- **Se a Web3Forms recusar o endereço do preview ou o localhost,** paro no começo do ticket 12 e peço o seu ok para a Formspark.
- **Se você precisar cair para 10 horas numa semana,** saem primeiro a imagem de compartilhamento por página (vira uma por tipo de página) e o acabamento da 404.

## Folga

A semana 2 tem umas 2 horas de folga, para as respostas do cliente que chegarem atrasadas. As outras semanas ficam entre 10,75 e 11,75 horas. Não sobra folga para pedido novo: pedido fora do escopo vai para `docs/pedidos-fora-do-escopo.md`, com estimativa.
