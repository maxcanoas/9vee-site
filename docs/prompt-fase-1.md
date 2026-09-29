# Prompt: Fase 1 do site novo da 9vee (do MVP aprovado ao site pronto para lançar)

Cole tudo abaixo no Claude Code, rodando dentro da pasta `D:\Freelas\9vee`.

Antes de rodar:
- Confirme que a proposta aceita pela 9vee está em `D:\Freelas\9vee\docs\Proposta9vee-v2.pdf`.
- Confirme que a proposta antiga, com o diagnóstico do site atual, está em `D:\Freelas\9vee\docs\PropostaNovee.pdf`.
- Deixe o Chrome aberto com a extensão do Claude conectada e o painel do Wix já logado.

---

## 1. Contexto desta rodada

O MVP foi apresentado à Daniella e ao Arthur e aprovado. A proposta v2 foi fechada. Agora começa a **Fase 1**: transformar o MVP no site completo da 9vee, deixando tudo pronto para substituir o site atual no Wix.

- **Prazo:** 8 semanas.
- **Minha disponibilidade:** 10 a 12 horas por semana. Planeje as tarefas dentro disso.
- **Onde o site vive nesta fase:**
  - **Local, na minha máquina.** Todo o desenvolvimento acontece aqui.
  - **Preview no Cloudflare,** o mesmo endereço onde o MVP está. É por ali que a Daniella e o Arthur acompanham o desenvolvimento. **Quem publica no Cloudflare sou eu, quando eu quiser.**
  - **O site oficial continua no Wix** até o lançamento. Nesta rodada não existe migração.
  - **A hospedagem final será a HostGator,** mas eu ainda não tenho acesso a ela nem ao cPanel. Nada de HostGator nesta rodada.
- **Textos:** eu escrevo (com você), a Daniella revisa e aprova antes de ir ao ar.
- **Foco dos decisores:** a Daniella quer leads e o site bem posicionado no Google. O Arthur quer o sistema de agendamento, que é a Fase 2 e **não entra agora**.

Eu sou o Maxwell (DEVMRMORAES). Trabalhe por fases. No fim de cada fase, pare, mostre o que fez e espere meu "ok".

**A proposta aceita (`docs/Proposta9vee-v2.pdf`) manda.** Se algo deste prompt não estiver na proposta, ou se a proposta tiver algo que este prompt não cobre, me avise antes de fazer.

**Exceção já decidida por mim:** na proposta, parte das páginas por idioma aparece nos meses 1 e 2 do acompanhamento, e as páginas por cidade nos meses 3 e 4. Nesta rodada, **as duas entram na Fase 1** (itens 3 e 4 do escopo). Não trate isso como conflito.

## 2. Regras que não se quebram

1. **Wix: só leitura.** O acesso ao painel é pela extensão do Claude no Chrome, neste link:
   `https://manage.wix.com/dashboard/578cbfa7-edce-4cc3-ab34-53a9af387e87/home?referralInfo=sidebar`
   - **JAMAIS altere nada no Wix sem a minha permissão.** Isso inclui salvar, publicar, excluir, desconectar, trocar configuração, instalar ou remover aplicativo, mexer em domínio, em SEO, em redirecionamento ou em formulário.
   - Se precisar de alguma alteração no Wix, pare e me peça no chat, dizendo exatamente o que quer mudar e por quê. Cada alteração precisa de um "sim" meu, uma de cada vez. Um "sim" anterior não vale para a próxima.
   - Prefira sempre as páginas públicas e o `sitemap.xml` do site. Use o painel só para o que não aparece do lado de fora.
   - Se o painel pedir login, verificação ou qualquer confirmação, pare e me chame. Não digite senha nem aceite termos.
   - Não clique em botões de "Salvar", "Publicar", "Excluir", "Conectar", "Atualizar" ou "Upgrade", nem para testar.
2. **Cloudflare: você não publica.** Não rode deploy, não faça push para o Cloudflare e não altere configurações lá. Deixe o build de preview pronto e me avise quando valer a pena publicar.
3. **Git:** commits locais à vontade. Push para qualquer repositório remoto só quando eu pedir.
4. **Nenhuma migração nesta rodada:** não mexa em DNS, domínio, e-mail, Wix ou HostGator. Tudo que envolve a troca fica documentado para depois (item 12).
5. **Credenciais nunca vão para o Git.** Use arquivos `.env` no `.gitignore` e deixe um `.env.example` sem valores reais.

## 3. Antes de qualquer código

1. Faça commit de qualquer alteração pendente, crie a tag `mvp-aprovado` e trabalhe numa branch `fase-1`. Assim o MVP apresentado fica guardado do jeito que o cliente viu.
2. Leia estes arquivos inteiros:
   - `docs/Proposta9vee-v2.pdf` (proposta aceita: escopo fechado, o que fica fora, redirecionamentos e acompanhamento).
   - `docs/PropostaNovee.pdf` (diagnóstico do site atual, campos dos formulários na seção 5).
   - `docs/mvp-spec.md`, `docs/padroes.md`, `docs/andamento.md`, `docs/roteiro-apresentacao.md`, `docs/imagens-gemini.md` e `docs/gap-site-completo.md`, se existir.
   - Todo o código do projeto, incluindo a configuração atual de deploy do Cloudflare, para entender como eu publico o preview.
3. Ferramentas:
   - Skills em `D:\Freelas\.claude\skills`: `grilling`, `to-spec`, `to-tickets`, `implement`, `code-review`, `frontend-design` (leia o `SKILL.md` de cada uma). A `to-tickets` entra agora, porque o escopo cresceu.
   - Comandos em `D:\Freelas\devmrmoraes\.claude\commands`: `humanizar.md`, `humanizar-ui.md`, `nivel-agencia.md`. Se eles não estiverem em `D:\Freelas\9vee\.claude\commands`, leia direto da pasta original.
   - `nivel-agencia` é a régua visual. `humanizar` roda em todo texto. `humanizar-ui` roda na revisão final.
   - Extensão do Claude no Chrome, só para ler o painel do Wix, seguindo o item 2.

## 4. Escopo da Fase 1

**Entra:**

1. **Páginas que já existem no MVP**, finalizadas: Home, Treinamento de NR-1 e Cursos de Idiomas. Revise o que ficou `[CONFIRMAR]` e o que o cliente pediu de ajuste.
2. **Páginas parciais do MVP**, completas: Tradução Simultânea, LMS e Quem Somos. Remova a etiqueta "página em construção".
3. **Páginas por idioma**: uma para cada um dos 14 idiomas, com conteúdo completo. Entra agora, mesmo com parte delas prevista no acompanhamento (ver exceção no item 1).
4. **Páginas por cidade**: São Paulo, Rio de Janeiro, Curitiba e Brasília (atendimento presencial), com conteúdo completo. Entra agora, mesmo estando prevista nos meses 3 e 4 do acompanhamento (ver exceção no item 1).
5. **Política de privacidade** e **página 404** personalizada.
6. **Formulários com envio real**, proteção contra spam e registro do consentimento da LGPD.
7. **Medição:** GA4 com Consent Mode e aviso de cookies.
8. **SEO técnico completo** em todas as páginas.
9. **Preparação da migração, sem executar nada:** inventário do Wix, arquivo do blog, mapa de redirecionamentos e checklist de lançamento.
10. **README** de entrega.

**Fica fora (não construa nada disso, nem "já deixando pronto"):**

- Sistema de agendamento de aulas (Fase 2, por aditivo).
- Painel de edição do blog (opcional, por aditivo).
- Pagamento online e integração com o LMS.
- O blog antigo. O site novo sai sem blog. Primeiro acompanhamos as métricas, depois o blog volta.
- Publicação definitiva, troca de domínio e qualquer configuração na HostGator. Isso acontece depois, quando eu tiver o acesso.

Se durante o trabalho eu ou o cliente pedirmos algo fora do escopo, registre em `docs/pedidos-fora-do-escopo.md` com data, quem pediu e uma estimativa de horas. Não implemente.

## 5. Fase A: diagnóstico e plano (sem código)

1. **Lacunas:** compare o MVP com a proposta aceita e gere `docs/gap-fase-1.md`, com uma linha por item: o que é, se existe, está parcial ou falta, onde está no código, horas estimadas e prioridade. Agrupe por: páginas, conteúdo, formulários, medição, SEO técnico, preparação da migração, testes e entrega.
2. **URLs do site atual:** use o `sitemap.xml` público do Wix e as páginas públicas para gerar `docs/urls-site-atual.csv` com todas as URLs (páginas, os 505 textos do blog, "Mandarim -Old", "Program List" e o que mais aparecer).
3. **Inventário do Wix (só leitura, pelo Chrome):** gere `docs/wix-inventario.md` com o que o painel mostra e o lado público não mostra:
   - redirecionamentos já configurados;
   - configurações de SEO das páginas e do blog;
   - formulários ativos e para onde enviam;
   - aplicativos instalados e códigos de rastreamento (Google Analytics, Tag Manager, pixels);
   - como o domínio está conectado;
   - posts em rascunho ou agendados.

   Não abra nenhuma tela de edição se a informação estiver disponível numa tela de consulta.
4. **Pendências:** liste todos os `[CONFIRMAR]` do código em `docs/pendencias-cliente.md`, separados por quem responde (Daniella ou Arthur), para eu mandar numa mensagem só.
5. **Perguntas:** use a skill `grilling` para me fazer só as perguntas que bloqueiam a Fase 1. **Toda pergunta vem com a resposta que você recomenda e o porquê.** No mínimo:
   - Quais são os 14 idiomas e que informação real existe de cada um (níveis, formatos, professores nativos)?
   - O que existe de conteúdo real para cada cidade? (Página de cidade sem conteúdo próprio vira página de porta, e o Google pune.)
   - Como o formulário vai enviar os leads? (Ver item 7 e a recomendação que está lá.)
   - Qual e-mail recebe os leads no site publicado? Só contato@9vee.com.br ou também os e-mails da Daniella e do Arthur?
   - A 9vee já tem conta no GA4 e no Search Console? Em nome de quem? (Recomendação: pedir acesso de leitura ao Search Console agora, para eu ter os números do site atual como base de comparação antes da troca.)
   - Os depoimentos da Nissan, da GM e da Embraer têm autorização por escrito?
   - A 9vee já tem política de privacidade? Quem é o responsável pelos dados (encarregado) a informar?
   - Domínio canônico: `www.9vee.com.br` ou `9vee.com.br`? (Recomendação provável: manter com www, que é o que o Google já conhece.)
6. Registre as decisões com a skill `to-spec` em `docs/fase-1-spec.md`.
7. Quebre o trabalho com a skill `to-tickets` em `docs/tickets/`, com horas estimadas, e monte `docs/cronograma-8-semanas.md` respeitando as 10 a 12 horas por semana. Se não couber, me diga o que sobra antes de começar.

Pare aqui.

## 6. Ambientes e decisões técnicas

**Três modos de build, controlados por variáveis de ambiente:**

| Modo | Comando | Para quê | Regras |
|---|---|---|---|
| Local | `npm run dev` (e `npm run dev -- --host` para ver no celular) | Meu desenvolvimento | Tudo liberado |
| Preview | `npm run build:preview` | O que eu publico no Cloudflare para a Daniella e o Arthur acompanharem | `noindex` em todas as páginas; `[CONFIRMAR]` visível com destaque discreto, para o cliente enxergar as pendências; GA4 desligado; formulário enviando para o meu e-mail de teste |
| Produção | `npm run build:producao` | O site definitivo, que só vai ao ar no lançamento | Precisa passar no `check:producao`; ainda **não é publicado** nesta rodada |

- **Stack:** a mesma do MVP. Astro com saída estática, CSS com custom properties, TypeScript só nas partes interativas. GSAP só com justificativa escrita.
- **Nada que dependa de servidor.** O site precisa funcionar igual no Cloudflare agora e na HostGator depois. Não use recursos exclusivos do Cloudflare (Workers, KV, Functions) no código do site.
- **Metas (Lighthouse mobile, em todas as páginas):** Performance 95+, SEO 100, Acessibilidade 95+, Boas práticas 95+. LCP abaixo de 2,0 s, CLS abaixo de 0,05, JavaScript inicial abaixo de 30 KB (sem contar o GA4, que só carrega depois do consentimento).
- **Trava de produção:** crie `npm run check:producao`, que falha o build de produção se encontrar qualquer um destes itens: `[CONFIRMAR`, o componente `Placeholder`, a etiqueta "em construção", `noindex`, travessão (—) nos textos ou links internos quebrados.
- **Novidades para o cliente:** cada vez que houver algo novo para eles verem, atualize `docs/novidades-preview.md` com um resumo curto, em linguagem de cliente, do que mudou desde a última publicação. É o texto que eu mando para a Daniella e o Arthur quando publicar.

## 7. Formulários de verdade

O drawer e o botão de WhatsApp continuam como no MVP. O que muda é o envio:

- **O envio fica isolado num único módulo**, com o endereço de destino vindo de variável de ambiente. Se um dia trocarmos o serviço, muda um arquivo só.
- **Minha recomendação para você confirmar na Fase A:** usar um serviço de formulário feito para site estático (como Web3Forms ou Formspree). Ele funciona igual no Cloudflare agora e na HostGator depois, sem servidor e sem retrabalho na migração. Compare os planos gratuitos e os limites atuais antes de me recomendar um.
- **Destino por ambiente:** no preview, os envios chegam no meu e-mail de teste; na produção, no e-mail definido pela 9vee. Nenhum lead de teste pode cair na caixa da 9vee.
- Validação no navegador e, se o serviço permitir, também do lado dele.
- Proteção contra spam sem CAPTCHA chato: campo isca invisível e tempo mínimo de preenchimento, além do que o serviço oferecer.
- **LGPD:** caixa de consentimento com link para a política de privacidade. O envio registra o texto aceito, a data e a hora, e a página de origem. Se usarmos um serviço de terceiros, ele precisa ser citado na política de privacidade.
- O e-mail que chega tem um assunto fácil de filtrar, por exemplo `[Lead site] NR-1 | Empresa | Nome da empresa`, e traz todas as respostas do drawer organizadas.
- A confirmação aparece na tela, sem trocar de página.
- Se o envio falhar, o drawer mostra o botão do WhatsApp com a mensagem já montada, para o lead não se perder.

## 8. Medição

A mensalidade depende de eu provar que o site traz leads. A medição precisa ser impecável.

- GA4 com **Consent Mode v2**, tudo negado por padrão até o visitante aceitar.
- O ID do GA4 vem de variável de ambiente. **No preview, o GA4 fica desligado**, para os acessos de teste não sujarem os dados da 9vee. Para testar os eventos, use o modo local com uma propriedade ou fluxo de teste e o DebugView.
- Aviso de cookies com "Aceitar", "Recusar" e "Preferências", com o mesmo peso visual para aceitar e recusar.
- Eventos:
  - `whatsapp_click`, com os parâmetros `servico`, `publico` e `pagina`;
  - `lead_form_submit`, com os mesmos parâmetros;
  - `drawer_open`, com `servico` e `pagina`.
- `whatsapp_click` e `lead_form_submit` marcados como eventos principais.
- Search Console e Bing Webmaster do site novo ficam para o lançamento. Deixe os passos no checklist do item 12.
- Documente em `docs/medicao.md`: o que cada evento significa, onde ele dispara e como montar o relatório mensal de leads por serviço e por público.

## 9. Conteúdo

- Textos em `content/`, um `.md` por página, separados do código.
- Português do Brasil, frases curtas, voz ativa, segunda pessoa.
- **Sem travessões (—).** Também ficam de fora: "jornada", "alavancar", "potencializar", "robusto", "revolucionar", "desbloquear", "no cenário atual", "mergulhe", "transformador", "sinergia", "de forma fluida".
- Rode o `humanizar` em tudo antes de me entregar.
- Não invente números, clientes, carga horária, certificações nem endereço. O que não estiver confirmado vira `[CONFIRMAR COM A DANIELLA: ...]`.
- **Páginas por idioma:** cada uma com conteúdo próprio (para quem é, níveis, formatos, perguntas frequentes daquele idioma). Nada de modelo com só o nome do idioma trocado.
- **Páginas por cidade:** falam do atendimento presencial naquela cidade. A 9vee não tem sede física, então nada de endereço, mapa ou "venha nos visitar".
- **Revisão da Daniella:** para cada lote de páginas, gere `docs/revisao-daniella/lote-N.md` com os textos limpos, sem código, na ordem em que aparecem na página, para eu enviar a ela. Mande o primeiro lote (páginas principais) cedo, porque a revisão dela leva tempo.

## 10. Imagens

- Mesma regra do MVP: nada de banco de imagens.
- Acrescente em `docs/imagens-gemini.md` os prompts das páginas novas, no mesmo padrão (em inglês, com o estilo base e a linha `avoid`).
- Conforme eu for gerando as imagens e salvando em `public/images/` com o nome esperado, troque os placeholders.
- Imagem de compartilhamento (Open Graph) para cada página.

## 11. SEO técnico

- Title e description únicos, canonical, um H1 só e hierarquia correta de headings em todas as páginas.
- Canonical, sitemap e Open Graph sempre com o domínio definitivo (`https://www.9vee.com.br`, ou o que for decidido na Fase A), nunca com o endereço do preview.
- JSON-LD:
  - `EducationalOrganization` sem endereço físico, com `areaServed`, `contactPoint` e `sameAs` com as redes;
  - `Service` nas páginas de serviço;
  - `Course` nas páginas de idioma;
  - `FAQPage` onde houver FAQ;
  - `BreadcrumbList` em todas as páginas internas.
- Nada de `LocalBusiness` com endereço, porque a empresa não tem sede.
- `sitemap.xml`, `robots.txt` e favicon completo. No preview, o `robots.txt` bloqueia tudo.
- Links internos entre as páginas: serviço para idioma, idioma para cidade, cidade para serviço.

## 12. Preparação da migração (documentar, não executar)

1. **Arquivo do blog:** salve uma cópia de todos os textos do blog atual (título, URL, data e texto) em `docs/blog-arquivo/`, lendo as páginas públicas. É daqui que o blog volta depois.
2. **Mapa de redirecionamentos:** gere `docs/redirects.csv` com todas as URLs de `docs/urls-site-atual.csv`, cada uma com destino, tipo e motivo:
   - Páginas antigas: 301 para a página nova equivalente.
   - Texto do blog com relação clara a um serviço, idioma ou cidade: 301 para essa página.
   - Texto do blog sem relação: 410.
   - "Mandarim -Old" e "Program List": 301 para o destino mais próximo.
   - Leve em conta os redirecionamentos que já existem no Wix, anotados no inventário.
3. **Eu reviso o CSV.** Depois da minha aprovação, crie um script que gera as regras de `.htaccess` a partir do CSV (a HostGator usa Apache). O script fica pronto e testado com o CSV, mas o `.htaccess` só é usado no lançamento.
4. Gere `docs/remocoes-search-console.txt` com as URLs que ficaram 410, para eu pedir a remoção temporária no Search Console depois da troca.
5. **Checklist de lançamento:** monte `docs/checklist-lancamento.md` com os passos que **eu** vou executar quando tiver acesso à HostGator:
   1. Exportar ou fotografar a zona DNS atual antes de mexer em qualquer coisa.
   2. Baixar o TTL dos registros do site 24 a 48 horas antes da troca.
   3. Subir o build de produção na HostGator, com o `.htaccess` gerado pelo script (HTTPS forçado, domínio canônico, compressão, cache, 301, 410 e 404).
   4. Alterar **só** os registros do site (o apontamento do domínio e do www que hoje vai para o Wix).
   5. **Não tocar** em MX, `mail`, SPF e outros TXT, DKIM nem autodiscover. É isso que mantém o e-mail da 9vee funcionando.
   6. Conferir o SSL ativo no domínio.
   7. Trocar o destino do formulário e ligar o GA4 de produção.
   8. Testar: uma amostra dos redirecionamentos e dos 410, o formulário chegando na caixa certa, o WhatsApp, e um e-mail entrando e saindo de contato@9vee.com.br.
   9. Enviar o sitemap no Search Console e no Bing. Pedir as remoções temporárias.
   10. Acompanhar cobertura e erros 404 por duas semanas.
   11. Só então, **com a minha autorização**, desconectar o domínio do Wix e cancelar o plano.

## 13. Ordem de construção

Implemente com a skill `implement`, um commit por etapa, parando no fim de cada uma. Ajuste as semanas ao cronograma aprovado na Fase A. Ao fim de cada semana, deixe o build de preview pronto e o `novidades-preview.md` atualizado, para eu publicar no Cloudflare se quiser.

1. **Semana 1:** Fase A completa. Os três modos de build e a trava `check:producao` funcionando.
2. **Semana 2:** fechamento das 3 páginas principais, lote 1 de textos para a Daniella.
3. **Semana 3:** Tradução Simultânea, LMS, Quem Somos, política de privacidade e 404. Lote 2 de textos.
4. **Semana 4:** páginas por idioma. Lote 3 de textos.
5. **Semana 5:** páginas por cidade, formulários reais e testes de envio no preview. Lote 4 de textos.
6. **Semana 6:** medição, aviso de cookies, SEO técnico completo, arquivo do blog e mapa de redirecionamentos para minha revisão.
7. **Semana 7:** imagens finais, ajustes da revisão da Daniella, revisão com `code-review`, `humanizar-ui` e `humanizar`. Preview completo para a Daniella e o Arthur aprovarem.
8. **Semana 8:** build de produção passando no `check:producao`, script do `.htaccess`, checklist de lançamento e README. O site fica pronto para ir ao ar assim que eu tiver acesso à HostGator.

## 14. Testes

- Lighthouse mobile em todas as páginas, no build de produção rodando local (`npm run preview`), com os números num relatório em `docs/lighthouse.md`.
- Larguras de 360, 390, 768, 1280 e 1920 px.
- Teclado e leitor de tela no drawer e no aviso de cookies.
- Android e iPhone reais, pelo preview que eu publicar: WhatsApp, drawer e formulário.
- Formulário: envio certo, envio com erro e isca de spam.

## 15. README de entrega

`README.md` em linguagem simples, com:

- Como rodar o projeto local e como gerar os builds de preview e de produção.
- Como eu publico o preview no Cloudflare.
- Como trocar um texto e uma imagem.
- Onde ficam as variáveis de ambiente (sem mostrar nenhum valor).
- O que o `check:producao` bloqueia e por quê.
- O que ficou para o lançamento, para a Fase 2 e para depois (booking, painel do blog, volta do blog).

## 16. Critérios de pronto

- Todas as páginas batem as metas do item 6.
- O build de produção passa no `check:producao`: nenhum `[CONFIRMAR]`, nenhum placeholder, nenhum "em construção", nenhum `noindex`, nenhum travessão.
- O preview sai sempre com `noindex` e `robots.txt` bloqueando tudo.
- O formulário funciona no preview, com os envios chegando no meu e-mail de teste.
- Os eventos aparecem no DebugView do GA4 com os parâmetros certos.
- Todas as URLs do site atual têm destino ou 410 no `redirects.csv`, e eu aprovei o arquivo.
- O checklist de lançamento e o script do `.htaccess` estão prontos.
- A Daniella e o Arthur aprovaram o preview, e a Daniella aprovou os textos por escrito.
- Nada foi alterado no Wix sem a minha autorização.
- O README está entregue.

Comece pela Fase A.
