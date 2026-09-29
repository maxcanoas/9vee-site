# Lacunas da Fase 1: o MVP contra a proposta aceita

Levantado em 29/09/2026, na branch `fase-1`, a partir da tag `mvp-aprovado`. Compara o que o MVP tem com o que a proposta de 23/09/2026 (`docs/Proposta9vee-v2.pdf`) e o brief da Fase 1 pedem.

**Situação:** existe, parcial ou falta.

**Horas:** são horas suas, Maxwell. Contam o tempo de acompanhar a sessão comigo, revisar o que eu entregar, decidir, testar, gerar imagens e falar com o cliente. O meu tempo de execução não entra, mas nenhuma entrega avança sem a sua leitura. São estimativas para planejar, não compromisso.

**Prioridade:** alta quando trava o lançamento, os leads ou o SEO; média quando melhora o resultado; baixa quando é acabamento.

## Páginas

| # | Item | Situação | Onde está no código | Horas | Prioridade |
|---|---|---|---|---|---|
| P1 | Home: fechar as pendências (números, prazo da proposta, LMS, depoimentos), levar os 14 idiomas para as páginas próprias e aplicar os ajustes do cliente | parcial | `content/home.md`, `src/pages/index.astro`, `src/components/Familias.astro` (modo `links`) | 2 | alta |
| P2 | Treinamento de NR-1: fechar as 8 pendências (formato, carga horária, turma, plano de ação, comprovante, turma inteira, preço, Lei 14.831) e trazer um caso real, se vier | parcial | `content/treinamento-nr-1.md`, `src/pages/treinamento-nr-1.astro` | 1,5 | alta |
| P3 | Cursos de Idiomas: cada idioma passa a levar à própria página, sem perder o botão que abre o pedido; fechar 5 pendências | parcial | `content/curso-de-idiomas.md`, `src/pages/curso-de-idiomas.astro`, `Familias.astro` (modo `pedido`) | 2 | alta |
| P4 | Tradução Simultânea completa: formatos, equipamento, idiomas, mandarim para o mercado financeiro, como funciona, cidades, FAQ e prova | parcial: hero e um bloco | `content/traducao-simultanea.md`, `src/pages/traducao-simultanea.astro`, coleção `parciais` em `src/content.config.ts` | 3 | alta |
| P5 | LMS completa | parcial; o site atual não tem nada sobre o LMS além do título | `content/lms.md`, `src/pages/lms.astro` | 2,5 | média, depende do cliente |
| P6 | Quem Somos completa: história, equipe e números, sem falar em sede física | parcial; o texto de hoje diz "sede em São Paulo" | `content/quem-somos.md`, `src/pages/quem-somos.astro` | 2 | média |
| P7 | Política de privacidade própria do site | falta; o rodapé aponta para a página do Wix | `content/site.md` (`rodape.privacidade.href`) | 2 | alta, trava o formulário e o aviso de cookies |
| P8 | 404 personalizada, com os caminhos para os serviços, e sem canonical (hoje ela sai com canonical para `/404/`) | parcial; existe uma 404 simples | `src/pages/404.astro`, `content/site.md` (`erro404`) | 0,5 | baixa |
| P9 | Modelo da página por idioma: esquema do conteúdo, seções, JSON-LD `Course` e `FAQPage`, links para serviço e cidade | falta | novo, uma rota por idioma a partir de `content/` | 2 | alta |
| P10 | Os 14 textos por idioma, cada um com conteúdo próprio (para quem é, níveis, formatos, FAQ) | falta | `content/` | 7 | alta |
| P11 | Modelo da página por cidade | falta | novo | 1 | média |
| P12 | Os 4 textos por cidade, só com fato local de verdade | falta | `content/` | 2,5 | média, depende de haver conteúdo real |
| P13 | Menu e rodapé com as páginas novas, links cruzados (serviço para idioma, idioma para cidade, cidade para serviço) e trilha de navegação visível | falta | `src/components/Cabecalho.astro`, `src/components/Rodape.astro`, `content/site.md` | 1,5 | alta |
| P14 | Tirar a etiqueta "Página em construção no MVP" e o aviso "MVP: envio simulado" | falta | `content/site.md` (`etiquetaMvp`, `drawer.confirmacao.simulado`), `src/components/HeroPagina.astro` | 0,25 | alta |

## Conteúdo

| # | Item | Situação | Onde está no código | Horas | Prioridade |
|---|---|---|---|---|---|
| C1 | Resolver as 29 pendências `[CONFIRMAR]` do MVP | abertas | `content/*.md`; lista em `docs/pendencias-cliente.md` | 1 | alta |
| C2 | Levantar com o cliente os fatos das páginas novas (14 idiomas, cidades, LMS, tradução, Quem Somos) | falta | `docs/pendencias-cliente.md` | 1 | alta |
| C3 | Lote 1 para a Daniella: home, NR-1 e cursos | falta | `docs/revisao-daniella/lote-1.md` | 1 | alta |
| C4 | Lotes 2, 3 e 4: páginas de serviço e institucionais, idiomas e cidades | falta | `docs/revisao-daniella/` | 1,5 | alta |
| C5 | Script que monta cada lote a partir de `content/`, com o texto limpo na ordem da página | falta | `scripts/` | 1 | média |
| C6 | Ajustes da revisão da Daniella | falta | `content/` | 3 | alta |
| C7 | O que não for confirmado até a semana 7 sai do texto de produção: a frase inteira, não só a etiqueta | falta decidir a regra | `content/` | 1 | alta |
| C8 | `humanizar` em todo texto novo, lote a lote | contínuo | fora do código | já dentro de cada página | alta |

## Formulários

| # | Item | Situação | Onde está no código | Horas | Prioridade |
|---|---|---|---|---|---|
| F1 | Um módulo só para o envio, com o destino vindo de variável de ambiente (preview para o seu e-mail de teste, produção para o da 9vee) | falta; hoje o envio é simulado | `src/scripts/contato.ts` (`enviarPedido`); módulo novo em `src/lib/` | 1 | alta |
| F2 | Conta e chaves do serviço de formulário, de teste e de produção | falta | `.env`, `.env.example` | 0,5 | alta |
| F3 | Consentimento da LGPD: caixa com link para a política; o envio leva o texto aceito, a data e a hora e a página de origem | falta | `src/components/Drawer.astro`, `content/site.md`, `src/lib/contato.ts` | 1 | alta |
| F4 | Antispam: campo isca e tempo mínimo de preenchimento, mais o que o serviço oferecer | falta | `Drawer.astro`, `src/scripts/contato.ts` | 0,5 | alta |
| F5 | Assunto fácil de filtrar (`[Lead site] NR-1 \| Empresa \| Nome da empresa`) e corpo com todas as respostas | falta; as linhas do pedido já existem (`linhasDoPedido`) | `src/lib/contato.ts` | 0,5 | alta |
| F6 | Estados do envio: enviando, confirmação na tela e, na falha, o WhatsApp com a mensagem pronta | parcial; a confirmação existe, simulada | `Drawer.astro`, `src/scripts/contato.ts` | 1 | alta |
| F7 | Validação no navegador (existe) e no serviço, se ele tiver | parcial | `src/lib/contato.ts` | 0,25 | média |
| F8 | Testes: unitários do envio, navegador com o serviço simulado e envio real no preview (certo, com erro e pela isca) | falta | `tests/unit/`, `tests/e2e/` | 1,5 | alta |
| F9 | `.gitignore`: a regra `.env.*` também esconde o `.env.example` | ajuste | `.gitignore` | 0,1 | alta |

## Medição

| # | Item | Situação | Onde está no código | Horas | Prioridade |
|---|---|---|---|---|---|
| M1 | GA4 com Consent Mode v2, tudo negado por padrão, ID por variável de ambiente, desligado no preview | falta | `src/layouts/Base.astro`; módulo novo | 1,5 | alta |
| M2 | Aviso de cookies com "Aceitar", "Recusar" e "Preferências" de mesmo peso, pelo teclado e pelo leitor de tela, e um link no rodapé para reabrir | falta | componente novo | 2 | alta |
| M3 | Eventos `whatsapp_click` e `lead_form_submit` (com `servico`, `publico` e `pagina`) e `drawer_open` (com `servico` e `pagina`) | falta; os dados já existem no drawer e no botão flutuante | `src/scripts/contato.ts`, `src/components/BotaoWhatsApp.astro` | 1 | alta |
| M4 | Eventos principais marcados no GA4 e uma propriedade de teste para o DebugView | falta; é configuração no GA4 | painel do GA4 | 0,5 | alta |
| M5 | `docs/medicao.md`: o que cada evento significa, onde dispara e como montar o relatório mensal | falta | `docs/` | 1 | alta |
| M6 | Teste dos eventos no DebugView | falta | fora do código | 0,5 | alta |
| M7 | Manter a verificação do Search Console na troca (a meta tag de hoje ou verificação por DNS) | falta | `src/layouts/Base.astro` | 0,25 | alta |

## SEO técnico

| # | Item | Situação | Onde está no código | Horas | Prioridade |
|---|---|---|---|---|---|
| S1 | Três modos de build (local, preview e produção) e a trava `check:producao` | falta; hoje há o build padrão, com noindex, e o de conferência com `INDEXAVEL=true` | `astro.config.mjs`, `package.json`, `scripts/build-indexavel.ts` | 2,5 | alta |
| S2 | Canonical, Open Graph e sitemap sempre com o domínio definitivo | parcial; vêm do `SITE_URL`, que no preview é o endereço do workers.dev | `astro.config.mjs` (`site`), `src/layouts/Base.astro` | 0,5 | alta |
| S3 | `EducationalOrganization` sem endereço físico | parcial; hoje sai um `PostalAddress` de São Paulo | `src/lib/jsonld.ts` (`organizacao`), `content/site.md` (`sede`, `sedeUf`) | 0,25 | alta |
| S4 | `Service` em Tradução Simultânea e LMS | parcial; só o NR-1 tem | `src/lib/jsonld.ts`, páginas | 0,25 | alta |
| S5 | `Course` nas páginas de idioma | falta; hoje é um `ItemList` de 14 cursos com âncoras na página de cursos | `src/lib/jsonld.ts` | dentro de P9 | alta |
| S6 | `FAQPage` onde há FAQ | parcial; só Cursos tem, faltam Home e NR-1 | páginas | 0,25 | média |
| S7 | `BreadcrumbList` em todas as páginas internas | falta | `src/lib/jsonld.ts`, `src/layouts/Base.astro` | 0,5 | alta |
| S8 | `sitemap.xml` gerado a cada build, `robots.txt` por modo e favicon completo | falta; não há sitemap, o robots é um só, o favicon é SVG e o ícone da Apple | `public/`, `astro.config.mjs` | 1 | alta |
| S9 | Imagem de compartilhamento por página | falta; hoje é uma só, o banner do kit | `public/og.jpg`, `src/layouts/Base.astro` | 1,5 | média |
| S10 | Título e descrição únicos nas páginas novas | o esquema já limita 60 e 140 a 160 caracteres | `src/content.config.ts` (`seo`) | dentro de cada página | alta |
| S11 | Um H1 por página e hierarquia correta | existe, com teste | `tests/dist/paginas.test.ts` | 0 | não se aplica |

## Preparação da migração

| # | Item | Situação | Onde está no código | Horas | Prioridade |
|---|---|---|---|---|---|
| G1 | Todas as URLs do site atual | feito nesta fase: 540 endereços | `docs/urls-site-atual.csv` | 0 | alta |
| G2 | Inventário do painel do Wix | feito nesta fase | `docs/wix-inventario.md` | 0 | alta |
| G3 | Arquivo do blog: título, URL, data e texto dos 505 posts | falta | `scripts/`, `docs/blog-arquivo/` | 1 | alta |
| G4 | Mapa de redirecionamentos, com destino, tipo e motivo de cada URL, e a sua revisão | falta | `docs/redirects.csv` | 2,5 | alta |
| G5 | Lista das URLs que ficam 410, para a remoção temporária | falta | `docs/remocoes-search-console.txt` | 0,1 | média |
| G6 | Script que gera o `.htaccess` a partir do CSV, com testes | falta | `scripts/` | 1,5 | alta |
| G7 | Checklist de lançamento | falta | `docs/checklist-lancamento.md` | 1 | alta |
| G8 | Retrato do "antes" para o relatório de entrega (Lighthouse das páginas do Wix e os números de hoje) | falta; é item da proposta | `docs/` | 0,5 | média |
| G9 | Conferir o sitemap do Wix de novo perto do lançamento, porque o blog ainda recebe textos | falta | `scripts/` | 0,25 | média |

O que a lista de URLs já mostra sobre os 505 posts, lendo só o endereço de cada um:

- 425 citam um idioma. Inglês é o que mais aparece (138), depois espanhol (83), holandês (66, com o Inburgering), mandarim (37), francês e italiano (22 cada), japonês (18), alemão (16), sueco e norueguês (12 cada), português, árabe e russo.
- 70 citam um serviço: 60 de tradução ou interpretação e 10 de LMS.
- 138 citam uma das quatro cidades do presencial: São Paulo com os bairros (91), Brasília (17), Curitiba (16) e Rio de Janeiro (14).
- Só uns 10 são genéricos ("melhor escola de idiomas", "professores nativos"), e mesmo esses falam de curso de idiomas.

Pela regra do brief (relação clara com serviço, idioma ou cidade leva 301), quase todos os posts ganham 301 e a lista de 410 fica curta: a `/challenges`, os 6 programas online e o que mais não tiver relação. Isso é diferente do que a proposta imaginava ("o restante recebe remoção definitiva"), mas segue a mesma lógica, porque agora existem páginas por idioma e por cidade para receber os endereços. O critério fino fica para a revisão do CSV, na semana 6.

## Testes

| # | Item | Situação | Onde está no código | Horas | Prioridade |
|---|---|---|---|---|---|
| T1 | Lighthouse mobile em todas as páginas, no build de produção rodando local, com o relatório em `docs/lighthouse.md` | parcial; o script mede as 3 páginas completas e grava em `relatorios/`, fora do git | `scripts/lighthouse.ts` | 1 | alta |
| T2 | Larguras de 360, 390, 768, 1280 e 1920 px em todas as páginas | parcial; o teste cobre as 6 páginas do MVP | `tests/e2e/larguras.spec.ts` | 0,25 | alta |
| T3 | Teclado e leitor de tela no drawer (existe) e no aviso de cookies (novo) | parcial | `tests/e2e/contato.spec.ts` e um novo | 1 | alta |
| T4 | Android e iPhone de verdade, pelo preview: WhatsApp, drawer e formulário | falta; o do MVP também ficou por fazer | fora do código | 1 | alta |
| T5 | Testes do HTML gerado nas páginas novas: JSON-LD, links, pendências | parcial | `tests/dist/` | 1 | alta |
| T6 | Revisão final com `code-review`, `humanizar-ui` e `humanizar` | falta | fora do código | 2,5 | alta |

## Entrega

| # | Item | Situação | Onde está no código | Horas | Prioridade |
|---|---|---|---|---|---|
| E1 | README de entrega | falta; o projeto não tem README | `README.md` | 1,5 | alta |
| E2 | `docs/novidades-preview.md`, atualizado a cada semana | falta | `docs/` | 2 (0,25 por semana) | média |
| E3 | `docs/pedidos-fora-do-escopo.md` | criado nesta fase, vazio | `docs/` | 0,1 | média |
| E4 | Build de produção passando no `check:producao` | falta | `package.json` e a trava do S1 | 1 | alta |
| E5 | Publicação semanal do preview (você roda o `wrangler`) e o contato semanal com o cliente | contínuo | `wrangler.jsonc` | 4 (0,5 por semana) | alta |
| E6 | Imagens: gerar no Gemini as das páginas novas e trocar os Placeholders | falta | `docs/imagens-gemini.md`, `src/assets/imagens/` | 3 | média |

## Soma

| Grupo | Horas |
|---|---|
| Fase A (esta semana: ler, responder, aprovar spec, tickets e cronograma) | 5 |
| Páginas | 29,75 |
| Conteúdo | 9,5 |
| Formulários | 6,35 |
| Medição | 6,75 |
| SEO técnico | 6,75 |
| Preparação da migração | 6,85 |
| Testes | 6,75 |
| Entrega | 11,6 |
| **Total** | **cerca de 89** |

Se os ajustes do Redação 900+ entrarem (divergência 4, abaixo), são mais 2 horas: cerca de 91.

Com 10 a 12 horas por semana, as 8 semanas dão de 80 a 96 horas. Cabe só perto do teto, com pouca folga. Antes do cronograma, na próxima parada, eu digo o que sobra se as respostas do cliente atrasarem ou se você preferir trabalhar com 10 horas por semana. Os primeiros candidatos a sair ou encolher são a imagem de compartilhamento por página (S9), as páginas por cidade que não tiverem conteúdo real (P11 e P12) e o acabamento da 404 (P8).

O maior risco não são as horas: é o tempo de resposta do cliente. As páginas de idioma, de cidade, LMS e Quem Somos dependem de fatos que só a 9vee tem.

## Divergências entre a proposta e o brief

Resolvidas na rodada de perguntas de 29/09/2026 (detalhe em `docs/fase-1-spec.md`):

- 1, 3 e 6: vão para o checklist de lançamento.
- 2: o retrato do antes sai na semana 1 ou 2; o relatório, no lançamento.
- 4: o Redação 900+ fica de fora por enquanto; o cliente não quer mexer nele agora.
- 5: o mesmo GA4 e o mesmo Search Console, com acesso de editor e de usuário completo; o site novo e o Bing ficam para o lançamento.
- 7: a pergunta vai na mensagem para a Daniella.
- 8: nada de HostGator por enquanto; tudo pensado para funcionar localmente, e a publicação vem quando o cliente der o acesso.
- O robots.txt do preview continua liberado, com noindex na meta e no cabeçalho.

A soma sem o Redação 900+ fica em cerca de 89 horas, com 11 a 12 horas por semana.

Estão no cronograma da proposta e o brief não cobre:

1. **Publicação automática** (Frente 5): "cada alteração que eu fizer entra no ar sozinha, sem upload manual". Precisa da HostGator.
2. **Relatório de entrega com o antes e o depois** (Frente 6 e semana 8 da proposta). O brief pede só o README. O "antes" some quando o Wix for cancelado.
3. **Código num repositório em nome da 9vee** (seções 1 e 9). Hoje o repositório é `maxcanoas/9vee-site`.
4. **Os três ajustes da loja do Redação 900+** (seção 13), de cortesia, "feitos junto com a Fase 1", em menos de duas horas. É outro site no Wix: mexer nele pede a sua autorização, uma alteração por vez.
5. **Search Console configurado na semana 1** (seção 9). O brief deixa o Search Console do site novo para o lançamento. Ele já existe no domínio.
6. **Exportar as imagens do Wix antes do cancelamento** (seção 7). O brief cobre os endereços e os textos do blog, não as imagens.
7. **Conversa de 30 minutos com a Daniella sobre margem e prioridade dos serviços** (seção 14). A resposta dela decide a ordem das páginas de idioma e o peso de cada serviço.
8. **Publicação na semana 7 e acompanhamento na semana 8** (seção 9). Sem acesso à HostGator, a Fase 1 termina com o site pronto para ir ao ar, e não no ar. A segunda metade do pagamento é "na publicação".

Estão no brief e a proposta não cita, mas são pequenos e servem ao que ela promete: a política de privacidade própria, a 404 personalizada, a imagem de compartilhamento por página, o Bing Webmaster, as metas do Lighthouse, a trava de produção, o arquivo do blog e o registro de pedidos fora do escopo.

Um ponto do brief contraria uma decisão técnica do MVP: "no preview, o robots.txt bloqueia tudo". Com o robots bloqueando, o Google não lê o noindex das páginas.
