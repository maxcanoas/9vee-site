# 19: Gerador do .htaccess

**O que construir:** o script que transforma o mapa de redirecionamentos aprovado nas regras do Apache da HostGator, pronto e testado para o lançamento.

**Depende de:** 14 (com o CSV aprovado pelo Maxwell).

**Horas:** 1,5. **Semana:** 7 (era a 8; subiu em 30/09/2026, para a folga ficar na última semana).

**Situação:** feito e aprovado pelo Maxwell em 06/10/2026, adiantado da semana 7, no processo curto, com o HSTS. O teste num Apache de verdade só dá para fazer na HostGator, no lançamento: está no ticket 20.

- [x] O script gera o `.htaccess` a partir do `docs/redirects.csv` aprovado: os 301 e os 410 do mapa, HTTPS forçado, domínio com www, barra no fim, compressão, cache e as páginas de erro 404 e 410.
- [x] Testes unitários a partir de um CSV de exemplo.
- [x] O `.htaccess` entra só no build de produção, e não no preview publicado no Cloudflare.

## Como ficou

- **O gerador** (`scripts/htaccess.ts`) e o passo do build (`astro.config.mjs`): no fim do build de produção, o `docs/redirects.csv` vira o `dist-producao/.htaccess`. Mudou o mapa, basta gerar o build de novo. O preview continua sem o arquivo.
- **A ordem das regras:** primeiro o mapa, com o destino já em `https://www.9vee.com.br`, para a URL antiga chegar à nova num salto só, venha ela de http ou sem www; depois o domínio canônico (https e www num salto); por fim a barra no fim do endereço, só quando a pasta tem a página. O 301 compara o caminho inteiro (`^lms$`), sem barra opcional, para `/lms/` nunca cair na regra de `/lms`. O endereço com acento vai decodificado, em UTF-8, que é como o Apache compara.
- **No mapa:** 523 regras de 301 (`[R=301,L]`) e 15 de 410 (`[G,L]`). As duas linhas de 200 (a home e o `/sitemap.xml`) não pedem regra.
- **O resto:** a página de erro do site no 404 e no 410 (o texto dela, "Esta página não existe… mudou de lugar", serve aos dois); compressão Brotli, ou gzip quando o Brotli não está instalado; cache de um ano no `/_astro/`, cujo nome muda quando o conteúdo muda, `no-cache` nas páginas e um dia no resto; o tipo do manifesto.
- **Fora do ticket, por escolha minha:** o cabeçalho HSTS de um ano, só no HTTPS. O Wix manda o mesmo hoje (conferido em 06/10), e sem ele a proteção cairia na troca.
- **A trava de produção** ganhou a regra "Redirecionamento para página que não está no build": acusa o 301 que leva a uma página que deixou de ser publicada depois que o mapa foi gerado.
- **Os testes:** 8 de lógica (`tests/unit/htaccess.test.ts`: o padrão de cada origem, as regras do mapa, a ordem, as regras gerais e a regra da trava) e 2 do HTML (`tests/dist/producao.test.ts`: uma regra por 301 e 410 do mapa, nenhum destino fora do build, nenhum `.htaccess` no preview). `npm test` com 251 testes de lógica e 1.558 do HTML.
- **Riscos para o teste na HostGator:** o `Options -MultiViews -Indexes` dá erro 500 se a hospedagem não deixar o `.htaccess` mudar as opções (aí a linha sai); o `<If>` pede o Apache 2.4.
- **Ficou de fora,** pelo processo curto: a rodada de `code-review`, que volta no ticket 17.
