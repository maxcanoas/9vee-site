# 03: Pendência com responsável e lotes de revisão

**O que construir:** a pendência passa a dizer quem responde, a Daniella ou o Arthur. E um comando monta os lotes de revisão da Daniella a partir dos textos, sem cópia à mão.

**Depende de:** nenhum (pode começar já).

**Horas:** 1. **Semana:** 1.

**Situação:** ready-for-agent

- [ ] `[CONFIRMAR COM O ARTHUR: ...]` funciona como `[CONFIRMAR COM A DANIELLA: ...]`: etiqueta no preview, fora do texto puro (título, descrição e JSON-LD) e barrada pela trava.
- [ ] A lista de pendências separa as duas pessoas.
- [ ] Um comando gera `docs/revisao-daniella/lote-N.md` para um grupo de páginas: o texto limpo, sem código, na ordem em que aparece na página, com título, descrição e a mensagem do WhatsApp de cada página. As pendências aparecem legíveis.
- [ ] Teste unitário do gerador, escrito antes, com um conteúdo de exemplo.
