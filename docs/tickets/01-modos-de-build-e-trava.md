# 01: Modos de build e trava de produção

**O que construir:** três modos de build, cada um com o seu comando: local, preview e produção. Mais a trava que impede o build de produção de sair com pendência. O Maxwell continua testando local com `npm run dev` e publicando o preview no mesmo endereço do Cloudflare.

**Depende de:** nenhum (pode começar já).

**Horas:** 3,5. **Semana:** 1.

**Situação:** ready-for-agent

- [ ] `npm run dev` (com `-- --host` para o celular), `npm run build:preview` e `npm run build:producao` existem e geram cada modo.
- [ ] Canonical e Open Graph usam sempre `https://www.9vee.com.br`, com barra no fim, em qualquer modo. A 404 não tem canonical.
- [ ] Local e preview saem com noindex na meta; o preview também no cabeçalho do Cloudflare. A produção sai sem noindex em lugar nenhum.
- [ ] O robots.txt do preview libera e não cita sitemap; o da produção libera e cita `https://www.9vee.com.br/sitemap.xml`.
- [ ] As pendências aparecem marcadas no local e no preview.
- [ ] `npm run check:producao` falha, listando o que achou, se o build de produção tiver `[CONFIRMAR`, Placeholder, a etiqueta de obra, noindex, travessão no texto visível ou link interno quebrado. Nesta semana ele falha, porque as pendências do MVP ainda existem: é o esperado.
- [ ] `.env.example` lista as variáveis (modo, ID do GA4, chave do formulário) sem valores; o `.gitignore` esconde os `.env` e deixa o exemplo.
- [ ] O build de conferência do SEO (`INDEXAVEL`) dá lugar ao modo produção nos testes e no script do Lighthouse.
- [ ] O comando de publicação do preview, em `docs/andamento.md`, passa a usar o `build:preview`.
- [ ] Os testes do MVP passam, com os testes de noindex e de robots por modo.
- [ ] `docs/novidades-preview.md` criado.
