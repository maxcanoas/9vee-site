# 01: Modos de build e trava de produção

**O que construir:** três modos de build, cada um com o seu comando: local, preview e produção. Mais a trava que impede o build de produção de sair com pendência. O Maxwell continua testando local com `npm run dev` e publicando o preview no mesmo endereço do Cloudflare.

**Depende de:** nenhum (pode começar já).

**Horas:** 3,5. **Semana:** 1.

**Situação:** feito em 29/09/2026 (`6546b07`), com as correções da revisão em `f4bfac0`, `9ffb1f8`, `6d13dcb` e `fef94f3`.

- [x] `npm run dev` (com `-- --host` para o celular), `npm run build:preview` e `npm run build:producao` existem e geram cada modo.
- [x] Canonical e Open Graph usam sempre `https://www.9vee.com.br`, com barra no fim, em qualquer modo. A 404 não tem canonical nem `og:url`.
- [x] Local e preview saem com noindex na meta; o preview também no cabeçalho do Cloudflare. A produção sai sem noindex em lugar nenhum.
- [x] O robots.txt do preview libera e não cita sitemap; o da produção libera e cita `https://www.9vee.com.br/sitemap.xml`.
- [x] As pendências aparecem marcadas no local e no preview.
- [x] `npm run check:producao` falha, listando o que achou, se o build de produção tiver pendência (no HTML ou em `content/`), Placeholder, marca do MVP (etiqueta de obra ou aviso de envio simulado), noindex, travessão ou meia-risca, ou link interno quebrado. Nesta semana ele falha, com 76 achados das pendências do MVP: é o esperado.
- [x] `.env.example` lista as variáveis (ID do GA4 e chave do formulário) sem valores e explica o modo, que vem do comando e não do arquivo. O `.gitignore` esconde os `.env` e deixa o exemplo.
- [x] O build de conferência do SEO (`INDEXAVEL`) deu lugar ao modo produção nos testes e no script do Lighthouse.
- [x] O comando de publicação do preview, em `docs/andamento.md`, usa o `build:preview`.
- [x] Os testes do MVP passam, com os testes de noindex e de robots por modo.
- [x] `docs/novidades-preview.md` criado.

**Além do pedido, registrado na spec:** o build recusa `.env`, `.env.local` e o `--mode` solto; `npm run build` é o mesmo que o `build:preview`; `npm run preview` serve a produção local. O modo local não tem teste automático: ele segue o preview por construção e foi conferido à mão.
