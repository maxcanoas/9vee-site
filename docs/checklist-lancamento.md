# Checklist de lançamento

Os passos para trocar o site do Wix pelo site novo, na ordem. Quem executa é o Maxwell, com o acesso à HostGator. Montado em 09/10/2026 (ticket 20), a partir do brief (item 12), da spec ("Checklist de lançamento") e do inventário do Wix (`docs/wix-inventario.md`).

Duas regras valem do começo ao fim:

- **O Wix só muda com a autorização do Maxwell,** um passo de cada vez. O plano do Wix fica ativo até o fim da lista: é ele que permite voltar atrás.
- **O e-mail da 9vee não pode cair.** Ele fica na HostGator, e os registros de e-mail não mudam em nenhum passo.

## 1. Antes do dia, com antecedência

### Acessos e respostas

- [ ] Acesso ao cPanel da HostGator.
- [ ] A chave de produção da Web3Forms, criada com o contato@9vee.com.br. O e-mail com a chave chega na caixa da 9vee.
- [x] Acesso de editor ao GA4 da 9vee (`G-Y04K0CN1F9`): o Arthur deu acesso de administrador em 09/10/2026.
- [ ] Acesso de usuário completo ao Search Console.
- [ ] A Daniella e o Arthur aprovaram o preview, e a Daniella aprovou os textos por escrito (os quatro lotes de `docs/revisao-daniella/`).
- [ ] O que a 9vee não respondeu foi decidido pela lista de `docs/pendencias-decisao.md` e aplicado.
- [ ] Perguntar quem mexeu na zona DNS em 29/09/2026 (o serial da zona mudou nesse dia).

### O build de produção

- [ ] O `.env.producao` existe, copiado do `.env.example`, com `GA4_ID=G-Y04K0CN1F9` e a chave de produção em `FORMULARIO_CHAVE`. Ele não vai para o Git.
- [ ] O regulamento da Lei 14.831 conferido no Diário Oficial. Se não saiu, a marca de `content/treinamento-nr-1.md` sai e a frase fica. Se saiu, a frase diz como pedir o certificado, com a fonte.
- [ ] O blog do Wix conferido de novo. Se o sitemap dele (`https://www.9vee.com.br/blog-posts-sitemap.xml`) tem post que não está em `docs/urls-site-atual.csv`:
  - `node scripts/arquivo-do-blog.ts` copia só os posts novos para `docs/blog-arquivo/`;
  - `node scripts/build.ts producao` e depois `node scripts/mapa-de-redirecionamentos.ts` geram o mapa de novo, com a coluna de exceção preservada;
  - o Maxwell revisa as linhas novas de `docs/redirects.csv`.
  - Em 09/10/2026 eram 505 posts, todos já copiados.
- [ ] `npm run build:producao` passa no `check:producao`, sem nenhum achado.
- [ ] O Lighthouse mobile de todas as páginas, no build de produção, com as metas batidas (`docs/lighthouse.md`).

### O GA4

- [x] O parâmetro `text` na redação de dados, a retenção dos dados de evento em 14 meses e as três dimensões (`servico`, `publico` e `pagina`). Feito em 09/10/2026 (`docs/medicao.md`).
- [ ] Os eventos conferidos no DebugView, com a propriedade de teste.

### A HostGator e o DNS

- [ ] Exportar a zona DNS inteira (cPanel, Zone Editor) ou fotografar cada registro, antes de mexer em qualquer coisa. A tabela do fim desta página é o retrato de 29/09/2026.
- [ ] Conferir em que país fica o servidor do site. A política de privacidade diz que o e-mail da 9vee fica em Vinhedo (SP); se o servidor do site ficar fora do Brasil, a seção da hospedagem muda.
- [ ] **O certificado SSL cobrindo `9vee.com.br` e `www.9vee.com.br` antes da troca.** O site novo, como o Wix, manda o HSTS de um ano: o navegador de quem já visitou o site só aceita HTTPS, e um certificado faltando vira um erro sem botão para seguir. Como o DNS já está na HostGator, o AutoSSL consegue validar os dois nomes pelo DNS antes de o site mudar.
- [ ] Baixar o TTL dos dois registros do site (o A de `9vee.com.br` e o CNAME de `www`) para 300 segundos, de 24 a 48 horas antes da troca. Assim a troca, e uma eventual volta, chegam a todo mundo em minutos.

## 2. No dia da troca

- [ ] Subir o conteúdo de `dist-producao/` para a pasta do domínio no cPanel (em geral, `public_html`). Conferir que o `.htaccess` subiu: ele começa com ponto e alguns programas de FTP escondem esse arquivo.
- [ ] **Testar o site novo antes de trocar o DNS,** apontando o endereço para o IP da HostGator só no teste: `curl -sI --resolve www.9vee.com.br:443:IP https://www.9vee.com.br/`, com o IP que o cPanel mostra. Tem que voltar 200.
  - Se voltar erro 500, a causa provável é a linha `Options -MultiViews -Indexes` do `.htaccess`, que alguns planos não aceitam. Ela sai de `scripts/htaccess.ts`, e o build de produção é gerado de novo.
- [ ] No GA4 da 9vee, logo antes de trocar o DNS: desligar os "Cliques de saída" da medição otimizada. **Sem isso, o site não vai ao ar:** o GA4 mandaria ao Google o link do WhatsApp, com o nome de quem escreveu, e a política promete que não manda. Fica para o dia porque o `click` desses cliques é hoje o evento principal com que a 9vee conta os cliques no WhatsApp do Wix. Recomendado no mesmo passo: desligar as "Interações com o formulário" e os Google Signals.
- [ ] Trocar **só** os dois registros do site:
  - `9vee.com.br`, tipo A: de `185.230.63.107` (o Wix) para o IP da HostGator;
  - `www`, tipo CNAME: de `pointing.wixdns.net` (o Wix) para `9vee.com.br`, ou para o que o cPanel indicar.
- [ ] **Não tocar** no MX (`mail.9vee.com.br`), no `mail`, no `autodiscover`, no SPF e nos outros TXT, no DKIM (`default._domainkey`) nem no DMARC. São eles que mantêm o e-mail da 9vee funcionando.
- [ ] Decidir o `webmail`, o `cpanel` e o `ftp`, que hoje apontam para o IP do Wix e por isso não funcionam. A recomendação é apontar os três para a HostGator.
- [ ] Conferir o cadeado do HTTPS em `https://9vee.com.br` e em `https://www.9vee.com.br`, em navegador e no celular.

## 3. Logo depois da troca

### O site

- [ ] Uma amostra do mapa com `curl -sI`, cada um num salto só, direto para o destino final:
  - `http://9vee.com.br/` e `https://9vee.com.br/` vão para `https://www.9vee.com.br/` (301);
  - `/quem-somos` vai para `/quem-somos/` (301);
  - `/mandarim-portugues` vai para `/traducao-simultanea/mandarim/` (301);
  - um post de cidade de tradução, como `/post/traducao-simultanea-de-eventos-em-curitiba`, vai para `/traducao-simultanea/curitiba/` (301);
  - `/termo-de-uso` responde 410;
  - um endereço inventado responde 404, com a página de erro do site.
- [ ] Os cabeçalhos: `content-encoding` (br ou gzip) no HTML, o cache imutável num arquivo de `/_astro/` e o `strict-transport-security` no HTTPS.
- [ ] Um pedido de verdade pelo formulário, chegando no contato@9vee.com.br, com o assunto `[Lead site]`.
- [ ] O atalho do WhatsApp e a saída "Falar agora no WhatsApp" do pedido, com a mensagem certa.
- [ ] Um e-mail entrando e outro saindo do contato@9vee.com.br.
- [ ] A prévia de algumas páginas colada no WhatsApp: a imagem de cada página aparece (no preview ela não aparecia, porque o Open Graph aponta sempre para o domínio).
- [ ] No GA4, aceitar os cookies no site e ver os eventos chegando no tempo real.

### O Google e o Bing

- [ ] O Search Console continua verificado: o site novo leva a mesma meta tag do Wix.
- [ ] Enviar o sitemap novo: `https://www.9vee.com.br/sitemap.xml`.
- [ ] Pedir a remoção temporária das 15 URLs que ficam 410 (`docs/remocoes-search-console.txt`).
- [ ] No Bing Webmaster, importar o site do Search Console e enviar o mesmo sitemap.
- [ ] No GA4, marcar `whatsapp_click` e `lead_form_submit` como eventos principais, assim que aparecerem na lista de eventos (`docs/medicao.md`, passo 3). Eles fazem o papel do `click`, que para de chegar.

## 4. Nas duas semanas seguintes

- [ ] Acompanhar a cobertura e os erros 404 no Search Console. Endereço antigo sem destino vira linha nova em `docs/redirects.csv`, e o build sobe de novo.
- [ ] Voltar o TTL dos dois registros do site para o valor de antes.

## 5. Só depois, com a autorização do Maxwell

- [ ] Baixar a biblioteca de mídia do Wix.
- [ ] Desconectar o domínio do Wix.
- [ ] Cancelar o plano do Wix.

## 6. Na entrega

- [ ] Montar a publicação automática na HostGator, que precisa do acesso a ela.
- [ ] Transferir o repositório para uma organização da 9vee no GitHub (pergunta 54).
- [ ] O `README.md` entregue.

## Se algo der errado

Enquanto o plano do Wix está ativo, a volta é desfazer a troca: o A de `9vee.com.br` volta para `185.230.63.107` e o CNAME de `www` volta para `pointing.wixdns.net`. Com o TTL baixo, ela chega a todo mundo em minutos. O e-mail não é afetado, porque os registros dele não mudaram.

## A zona DNS em 29/09/2026

Do inventário do Wix. O DNS está na HostGator (`nspro104` e `nspro105.hostgator.com.br`), e o domínio vence em 27/01/2029.

| Registro | Hoje | Na troca |
|---|---|---|
| `9vee.com.br`, A | `185.230.63.107` (Wix) | Muda para o IP da HostGator |
| `www`, CNAME | `pointing.wixdns.net` (Wix) | Muda para a HostGator |
| MX | `mail.9vee.com.br`, em `162.241.63.45` (HostGator) | Não muda |
| `autodiscover`, A | `162.241.63.45` | Não muda |
| SPF | `v=spf1 +a +mx +ip4:162.241.63.41 +include:websitewelcome.com ~all` | Não muda. O `+a` passa a autorizar o IP da HostGator no lugar do do Wix, e isso não atrapalha o e-mail |
| DKIM | `default._domainkey` | Não muda |
| DMARC | `p=none`, com relatório para vali.email | Não muda |
| `webmail`, `cpanel`, `ftp` | O IP do Wix, e por isso não funcionam | A decidir: a recomendação é a HostGator |
