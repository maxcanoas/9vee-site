# Inventário do Wix

Levantado em 29/09/2026, só leitura. Primeiro pelo lado público (sitemap, páginas, cabeçalhos HTTP, DNS e o registro do domínio), depois pelo painel do Wix, na extensão do Claude no Chrome, só nas telas de consulta. Nada foi salvo, publicado, conectado ou alterado.

Telas do painel abertas: Início, SEO e GEO, Gerenciador de Redirecionamento de URL, Configurações de SEO (a página de entrada, sem abrir o editor de cada tipo), Formulários e envios, Automações (lista, resumo, visualização e log de execução), Gerenciar apps, Integrações de marketing (visualização da Tag do Google), Código personalizado, Conformidade, privacidade e cookies, Domínios, Posts do blog (as cinco abas), Tags do blog, Programas online e Visão geral do tráfego.

Não abri: o editor do site, o editor de SEO de cada tipo de página, o editor da automação e o botão "Alternar contas do Google", que leva ao login do Google. Onde a informação só aparece nessas telas, ela ficou como pergunta para o cliente.

## 1. Plano, domínio e e-mail

| O quê | Como está |
|---|---|
| Plano do Wix | Core (site Premium) |
| Colaboradores no site | 4 |
| Domínio | 9vee.com.br, primário, "gerenciado por terceiros" e "conectado por apontamento" |
| Registro | .com.br pela Newfold (HostGator), criado em 27/01/2026, vence em 27/01/2029. Titular: Arthur El Reda Martins da Silva. Contato técnico: Daniella Verburg |
| DNS | Na HostGator: nspro104 e nspro105.hostgator.com.br |
| Registros do site (os que vão mudar na troca) | `9vee.com.br` A 185.230.63.107 (Wix) e `www` CNAME pointing.wixdns.net (Wix) |
| E-mail (não mexer) | MX `mail.9vee.com.br` → 162.241.63.45 (HostGator); `autodiscover` A 162.241.63.45; SPF `v=spf1 +a +mx +ip4:162.241.63.41 +include:websitewelcome.com ~all`; DKIM `default._domainkey`; DMARC `p=none` com relatório para vali.email |
| Endereço canônico hoje | `https://www.9vee.com.br`, sem barra no fim. `http://` e `9vee.com.br` levam para o www com 301 |
| HSTS | `max-age=31556952` (1 ano) nos dois nomes, com e sem www |

Quatro observações para o checklist de lançamento:

- O SPF usa `+a`. Quando o A do domínio sair do Wix e for para a HostGator, o `+a` passa a autorizar o IP da HostGator, e não mais o do Wix. Isso não atrapalha o e-mail; só registro para ninguém estranhar.
- `webmail`, `cpanel` e `ftp.9vee.com.br` apontam hoje para o IP do Wix (185.230.63.107), ou seja, não funcionam. Não são registros de e-mail. Na troca, vale decidir se voltam para a HostGator.
- O serial da zona é `2026092900`: alguém, ou alguma rotina da HostGator, mexeu na zona DNS hoje, 29/09/2026. Vale perguntar quem foi antes de mexermos em qualquer coisa.
- Com HSTS nos dois nomes, o certificado da HostGator precisa cobrir `9vee.com.br` e `www.9vee.com.br` antes da troca, senão quem já visitou o site vê erro sem opção de seguir. Como o DNS já está na HostGator, o AutoSSL pode validar pelo DNS antes do apontamento mudar.

## 2. Redirecionamentos já configurados (9)

| Endereço antigo | Hoje vai para |
|---|---|
| `/accessibility-statement` | `/lms` |
| `/blank-1` | `/mandarim` |
| `/mandarim-portugues-1` | `/mandarim-chines` |
| `/mandarim-pt` | `/mandarim-portugues` |
| `/our-team` | `/traducao-simultanea` |
| `/privacy-policy` | `/politica-de-privacidade` |
| `/programs` | `/curso-de-idiomas` |
| `/terms-and-conditions` | `/termo-de-uso` |
| `/who-we-are` | `/quem-somos` |

Os nove entram no `redirects.csv` apontando direto para o destino final no site novo, sem corrente de dois saltos.

## 3. SEO

- **Indexação:** ligada. Nenhuma página pública tem `noindex`, nem os 505 textos do blog, nem os 6 programas online.
- **robots.txt:** o padrão do Wix, que libera tudo, bloqueia o PetalBot e aponta para o sitemap.
- **Sitemap:** índice com 5 filhos (páginas, posts do blog, categorias do blog, programas online e perfis de membros, este vazio). O Wix recusa o pedido quando o agente do navegador é curto demais; com um agente de navegador comum, todos respondem.
- **Tipos de página com SEO próprio:** páginas principais, posts do blog, categorias do blog, tags do blog, páginas de arquivo do blog e programas online. O blog tem 0 tags e uma categoria só (`/blog`).
- **Títulos e descrições:** estão no `urls-site-atual.csv`. Os posts seguem o modelo "Título - 9vee". Treinamentos e LMS dividem o mesmo título e a mesma descrição, como a proposta apontou.
- **Verificação do Google:** por meta tag, `google-site-verification` = `pn_hIzMzIKPctgmpkHXWDAaBlJQPbNxFKKO6s8ZyvCg`, em todas as páginas. **Na troca, essa verificação some junto com o Wix.** O site novo precisa levar a mesma meta tag, ou a propriedade precisa ser verificada por DNS antes.
- **Search Console:** existe e está ligado ao painel do Wix por uma conta Google que a tela não mostra. Dados até 25/09/2026, últimos 7 dias: 227 impressões e 11 cliques. Consultas que aparecem: "9vee" e "novee".
- **Perfil da empresa no Google:** o painel oferece o atalho; não abri. Vale perguntar se a 9vee tem perfil e com qual endereço.

## 4. Formulários e para onde enviam

| Formulário | Envios | Criado | Última atualização | Status |
|---|---|---|---|---|
| Contato Principal | 16 | 25/02/2026 | 23/07/2026 | Ativo |
| Contato Inicial | 7 | 25/02/2026 | 11/03/2026 | Ativo |
| Orçamento Chinês Português | 1 | 30/04/2026 | 07/05/2026 | Ativo |
| Orçamento Chinês Chinês | 0 | 07/05/2026 | 19/06/2026 | Ativo |
| Orçamento Chinês Inglês | 0 | 19/06/2026 | 19/06/2026 | Ativo |
| Request a call | 0 | 26/02/2026 | 26/02/2026 | Ativo |
| Contact us 8 | 0 | 26/02/2026 | 26/02/2026 | Ativo |

São 24 envios em sete meses, uns 3 por mês. É a base do "antes" para leads por formulário.

O aviso de cada envio sai por uma automação só, "Get an Email when a form is submitted": ativa, criada pela conta "Novee" em 10/03/2026, acionada 16 vezes, a última em 21/09/2026. **O destinatário não aparece nas telas de consulta** (o log mostra só os dados do lead, que não anotei). Fica a pergunta: qual caixa recebe hoje?

A landing de Mandarim promete "Retornaremos em até um dia útil". É o único prazo de resposta publicado no site atual, e responde em parte à pendência do prazo do comercial.

## 5. Aplicativos e códigos de rastreamento

Apps instalados (13 no painel):

- Área de Membros Wix (com Minha carteira, Informações da conta, Notificações, Cartão de perfil e Sobre)
- Whatsapp Chat (o botão usa `api.whatsapp.com/send?phone=5511934661917`, sem mensagem)
- Programas Online Wix
- Twipla Session Recordings
- Formulários Wix
- Wix Blog
- Number Counter by Pb (com atualização pendente no painel; não mexi)
- Wix Gallery e ShoutOut (Legacy), que aparecem no HTML público

Rastreamento:

| Ferramenta | Situação |
|---|---|
| Google Analytics 4 | `G-Y04K0CN1F9`, pela "Tag do Google" das Integrações de marketing, que vira o código personalizado "Google Tag (Basic Consent Mode)" no cabeçalho de todas as páginas |
| Consentimento | Sem aviso de cookies (o Usercentrics para Wix não foi adicionado). O GA4 manda os dados com consentimento concedido por padrão (`gcs=G111`) |
| Twipla (visitor-analytics.io) | Ativo em toda página, com gravação de sessão e um script `fingerprint.js`, sem aviso ao visitante |
| Gerenciador de Tags do Google | Não conectado |
| Pixel da Meta, Pixel do TikTok, Yandex | Não conectados |
| Outros códigos personalizados | Nenhum além da Tag do Google |

Para a LGPD, o "antes" é este: GA4 e gravação de sessão rodando sem aviso nem escolha do visitante.

## 6. Blog

- 505 posts publicados, de 12/03/2026 a 05/09/2026. Março teve 147 e setembro, 3. **O blog ainda recebe textos**, então a lista de URLs precisa ser conferida de novo perto do lançamento.
- 0 rascunhos, 0 aguardando revisão, 0 agendados.
- 2 posts na lixeira, excluídos em 10/03/2026, de outro conteúdo ("Redação UFPR - Dicas e Desafios" e "Inscrições começam na próxima segunda (26)"). Já dão 404 hoje.
- Os posts são assinados pela conta "Novee" (noveecloud9@gmail.com), a mesma que criou a automação dos formulários. Pode ser a dona das contas Google.

## 7. Programas online

6 programas publicados, todos gratuitos e sem participantes, com conteúdo de modelo em inglês sobre consultoria de negócios (Business Analysis, Business Strategy and Consulting, Business Consulting for Professionals, Consulting Methods, Principles of France e Business Consulting - The Full Course). A lista deles é a `/challenges`, a "Program List" da proposta. Tudo indexável.

## 8. Números de hoje, para o "antes"

| Medida | Valor |
|---|---|
| Sessões, últimos 30 dias (até 29/09) | 241, 63% a menos que o período anterior |
| Visitantes únicos, 30 dias | 161 (91% novos) |
| Dispositivo | 70% desktop, 30% celular |
| Origem das sessões | direto 123, Google orgânico 81, painel do Wix 9, Bing 7, Yahoo 5 |
| Cliques para entrar em contato, 30 dias | 1 |
| Search Console, 7 dias até 25/09 | 227 impressões, 11 cliques |
| Envios de formulário desde fev/2026 | 24 |

## 9. O que isso muda no plano

1. Os 9 redirecionamentos do Wix entram no mapa, direto para o destino final.
2. As três páginas `mandarim-*` são uma landing de interpretação mandarim-português para o mercado financeiro, em português, inglês e chinês. A `/mandarim` ("Mandarim -Old") é a página do curso. Os destinos são diferentes.
3. A `/termo-de-uso` existe e o brief não fala dela. O texto é um modelo de plataforma que cita exames de ingresso no ensino superior.
4. A verificação do Search Console por meta tag precisa sobreviver à troca.
5. O GA4 `G-Y04K0CN1F9` já existe. Usar a mesma propriedade no site novo mantém o histórico para o antes e depois.
6. O blog ainda recebe posts: vale pedir para parar agora, porque cada texto novo vira mais um endereço para redirecionar.
7. A política de privacidade atual é um modelo genérico: não nomeia encarregado nem CNPJ, cita uma "Política de Cookies" que não existe e elege o foro de Arapoti (PR).
