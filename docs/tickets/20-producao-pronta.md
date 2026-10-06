# 20: Produção pronta

**O que construir:** o build de produção passando na trava, medido, testado em aparelho de verdade e documentado, pronto para ir ao ar quando o acesso à HostGator chegar.

**Depende de:** todos os anteriores.

**Horas:** 7,75. **Semana:** 8.

**Situação:** ready-for-agent

- [ ] As pendências abertas decididas pelo Maxwell e aplicadas.
- [ ] `npm run build:producao` passa no `check:producao`.
- [ ] A chave de produção do pedido: criada na Web3Forms com o contato@9vee.com.br (quem recebe o e-mail com a chave é a 9vee) e gravada no `.env.producao`, em `FORMULARIO_CHAVE`. Sem ela, a trava barra o build, e ela também barra a chave de teste. Depois, um pedido de verdade pelo build de produção, conferido na caixa da 9vee.
- [ ] A regra da trava para as marcas do MVP (`obra`) ficou sem o que procurar: a etiqueta de obra saiu no ticket 07, e o aviso de envio simulado, no 12. Decidir se ela sai da trava e da spec.
- [ ] Lighthouse mobile de todas as páginas, no build de produção rodando local, com os números em `docs/lighthouse.md` e as metas batidas.
- [ ] Teclado e leitor de tela conferidos no drawer e no aviso de cookies.
- [ ] Teste em Android e iPhone de verdade pelo preview: WhatsApp, drawer e formulário.
- [ ] A prévia de cada página conferida no WhatsApp, já no domínio (ticket 18): no preview ela não aparece, porque o Open Graph aponta sempre para www.9vee.com.br.
- [ ] O `.htaccess` testado na HostGator (ticket 19): uma amostra do mapa com `curl -I` (301 num salto, 410), http e sem www, a barra no fim, a compressão e o cache. Se o `Options` der erro 500, a linha sai do `scripts/htaccess.ts`.
- [ ] `docs/checklist-lancamento.md` com os passos do brief e os da spec.
- [ ] Conferir em que país fica o servidor do site na HostGator. A política de privacidade só diz "fora do Brasil" da Web3Forms e do Google porque o servidor de e-mail da 9vee fica em Vinhedo (SP); se o do site ficar fora, a seção da hospedagem muda.
- [ ] `README.md` de entrega.
