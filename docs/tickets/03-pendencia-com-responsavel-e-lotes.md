# 03: Pendência com responsável e lotes de revisão

**O que construir:** a pendência passa a dizer quem responde, a Daniella ou o Arthur. E um comando monta os lotes de revisão da Daniella a partir dos textos, sem cópia à mão.

**Depende de:** nenhum (pode começar já).

**Horas:** 1. **Semana:** 1.

**Situação:** feito em 29/09/2026.

- [x] `[CONFIRMAR COM O ARTHUR: ...]` funciona como `[CONFIRMAR COM A DANIELLA: ...]`: etiqueta no preview ("a confirmar com o Arthur"), fora do texto puro (título, descrição e JSON-LD) e barrada pela trava. Os nomes vêm do `content/site.md`.
- [x] A lista de pendências separa as duas pessoas. As três pendências de aula que a mensagem ao cliente manda para o Arthur (aula presencial, horas por nível e certificado) passaram a levar o nome dele.
- [x] Um comando gera `docs/revisao-daniella/lote-N.md` para um grupo de páginas (`npm run lote -- N`): o texto limpo, sem código, na ordem em que aparece na página, com título, descrição e a mensagem do WhatsApp de cada página. As pendências aparecem por extenso, com quem responde. O menu, o rodapé e o pedido de contato entram uma vez, no lote 1.
- [x] Teste unitário do gerador, escrito antes, com um conteúdo de exemplo.

**Como ficou:** o gerador lê o build de preview, e não o `content/`, porque só a página montada tem a ordem da tela e os textos que vêm de outros arquivos. Por enquanto só o lote 1 existe; os tickets 08, 10 e 11 acrescentam os outros. O lote 1 de verdade sai no ticket 04, depois das páginas fechadas.
