# 03: Pendência com responsável e lotes de revisão

**O que construir:** a pendência passa a dizer quem responde, a Daniella ou o Arthur. E um comando monta os lotes de revisão da Daniella a partir dos textos, sem cópia à mão.

**Depende de:** nenhum (pode começar já).

**Horas:** 1. **Semana:** 1.

**Situação:** feito em 29/09/2026.

- [x] `[CONFIRMAR COM O ARTHUR: ...]` funciona como `[CONFIRMAR COM A DANIELLA: ...]`: etiqueta "a confirmar" no preview, com o nome de quem responde na dica do mouse e no texto do leitor de tela, fora do texto puro (título, descrição e JSON-LD) e barrada pela trava. Os nomes vêm do `content/site.md`.
- [x] A lista de pendências separa as duas pessoas. As três pendências de aula que a mensagem ao cliente manda para o Arthur (aula presencial, horas por nível e certificado) passaram a levar o nome dele.
- [x] Um comando gera `docs/revisao-daniella/lote-N.md` para um grupo de páginas (`npm run lote -- N`): o texto limpo, sem código, na ordem em que aparece na página, com título, descrição e a mensagem do WhatsApp de cada página. As pendências aparecem por extenso, com quem responde, também as da faixa de números da home. O menu, o rodapé e o pedido de contato entram uma vez, no lote 1, com a mensagem do WhatsApp já montada e os avisos de erro.
- [x] Teste unitário do gerador, com um conteúdo de exemplo que tem depoimento e faixa de números. Nas correções da revisão, o teste veio antes do código.

**Como ficou:** o gerador lê o build de preview, e não o `content/`, porque só a página montada tem a ordem da tela e os textos que vêm de outros arquivos. O `npm run lote` faz o build antes, para o lote nunca sair de um build velho. A ordem é a da tela do computador, para quem ainda não escolheu o público, e o lote diz isso no começo. Por enquanto só o lote 1 existe; os tickets 08, 10 e 11 acrescentam os outros. O lote 1 de verdade sai no ticket 04, depois das páginas fechadas.

**Revisão pela spec (29/09/2026):** corrigido em commit próprio o que ela apontou. As notas da faixa de números agora dizem com quem está cada pendência. As mensagens do pedido saem montadas, sem `{pagina}` nem `{nome}`. O que a tela mostra em linhas separadas (o nome e o cargo de um depoimento, o título e a descrição de um link do menu) sai separado por "·". Fica como no MVP aprovado: a etiqueta na tela diz só "a confirmar", e o nome aparece no lote, na lista de pendências, na dica do mouse e no leitor de tela.
