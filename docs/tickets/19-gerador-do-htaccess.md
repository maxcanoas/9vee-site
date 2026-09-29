# 19: Gerador do .htaccess

**O que construir:** o script que transforma o mapa de redirecionamentos aprovado nas regras do Apache da HostGator, pronto e testado para o lançamento.

**Depende de:** 14 (com o CSV aprovado pelo Maxwell).

**Horas:** 1,5. **Semana:** 8.

**Situação:** ready-for-agent

- [ ] O script gera o `.htaccess` a partir do `docs/redirects.csv` aprovado: os 301 e os 410 do mapa, HTTPS forçado, domínio com www, barra no fim, compressão, cache e as páginas de erro 404 e 410.
- [ ] Testes unitários a partir de um CSV de exemplo.
- [ ] O `.htaccess` entra só no build de produção, e não no preview publicado no Cloudflare.
