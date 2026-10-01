# Prompt: reaproveitar os textos do site atual no site novo da 9vee

Cole tudo o que está abaixo da linha no Claude Code, aberto em `D:\Freelas\9vee`, na branch `fase-1`.

---

Vamos mudar uma regra da Fase 1 e reaproveitar no site novo todo o conteúdo do site atual da 9vee (o Wix). Antes de mexer em qualquer arquivo, leia o contexto e me mostre o plano.

## Contexto que você precisa ler primeiro

1. `docs/textos-site-atual.md`: os textos de oito páginas do site atual, extraídos em 30/09/2026, e o mapa de onde cada bloco entra no site novo. É a base deste trabalho.
2. `docs/andamento.md`, `docs/fase-1-spec.md`, `docs/padroes.md` e `docs/cronograma-8-semanas.md`.
3. Os tickets 04 a 11 e 14 a 17 em `docs/tickets/`.
4. `docs/pendencias-cliente.md` e `docs/adequacao-concorrentes-e-canva.md`.
5. O conteúdo atual em `content/` (home, NR-1, cursos, LMS, tradução, quem somos, `site.md` e `idiomas/`).

Os textos de `docs/textos-site-atual.md` saíram de uma ferramenta de leitura de página. Antes de usar uma frase literal, abra a página no ar (https://www.9vee.com.br e as páginas `/quem-somos`, `/curso-de-idiomas`, `/mandarim`, `/mandarim-portugues`, `/traducao-simultanea`, `/treinamentos` e `/lms`) e confira. Se achar diferença, corrija o arquivo e anote no fim dele.

## As decisões que mudam (minhas, de 30/09/2026)

1. **O site atual é fonte de fato.** O que a 9vee publica no próprio site conta como confirmado por ela. Todo conteúdo do site atual entra no site novo, e a Daniella e o Arthur corrigem depois, na revisão dos lotes. Isso substitui a regra antiga de cortar o que "o site atual não sustenta" e a de deixar páginas parciais esperando resposta.
2. **Reaproveitar é levar o conteúdo, não copiar a redação.** Todo fato, lista, argumento, exemplo e seção do site atual entra. A redação passa pelas regras de `docs/padroes.md`, que continuam valendo e são testadas: sem as palavras proibidas (soluções, excelência, inovação, jornada, alavancar, potencializar, "sob medida" e as outras), sem travessão, sem caixa alta em parágrafo, frases curtas, segunda pessoa e "9vee" no lugar de "Novee". Rode o `/humanizar` em todo texto novo. Quando a frase original for boa e passar nas regras, mantenha (exemplo: "Quando o negócio fala mandarim, precisão não é opcional.").
3. **Pendência só onde o site atual não resolve:**
   - quando o próprio site se contradiz (anos de mercado, quantidade de idiomas), a pendência continua;
   - quando o site não fala do assunto (preço, carga horária, cidades do presencial das aulas, dados da política), a pendência continua;
   - afirmação jurídica com data, como o "risco jurídico direto" do NR-1 (PGR como prova em ação "até 2046"), entra com `[CONFIRMAR COM A DANIELLA: leitura do advogado sobre esta afirmação]`;
   - o resto sai da pendência e entra como fato. A seção 2 de `docs/textos-site-atual.md` lista as que o site atual já responde.
4. **Continua fora:** endereço, "sede em São Paulo" e "venha nos visitar"; nome de empresa cliente sem autorização; foto do Canva; versões em inglês e chinês.
5. **Página nova: interpretação de mandarim.** A landing `/mandarim-portugues` não é o curso. É interpretação mandarim-português para o mercado financeiro. Ela vira `/traducao-simultanea/mandarim/`, filha da Tradução Simultânea, publicada desde o lançamento. As landings `/mandarim-portugues`, `/mandarim-english`, `/mandarim-chines` e os redirecionamentos antigos que levam a elas (`/mandarim-pt` e `/mandarim-portugues-1`) passam a apontar para essa página no mapa do ticket 14. A `/mandarim` (curso) e a `/blank-1` continuam indo para `/curso-de-idiomas/mandarim/`.

## Fase 1: documentos (pare no fim para o meu ok)

1. **Spec:** acrescente a `docs/fase-1-spec.md` uma seção "Reaproveitamento do site atual (30/09/2026)" com as cinco decisões acima. Marque como substituídos os trechos que elas mudam, sem apagar o histórico.
2. **Tickets:**
   - **05 Tradução Simultânea:** o conteúdo vem do site atual: o que é, como funciona (terminologia, cabine acústica e áudio dedicado), para que serve (os cinco tipos de evento), os três formatos completos, idiomas, presencial e intérpretes especializados (os seis setores). Some com o material do Canva que o ticket já previa, com pendência onde o Canva não for o site. A seção de mandarim do mercado financeiro sai daqui e vai para o 21: aqui fica um bloco curto que leva à página nova. Revise as horas.
   - **06 LMS:** o conteúdo vem do site atual: o que é, a plataforma 24 horas por dia, trilhas personalizadas, acompanhamento de professores, relatórios de desempenho, frequência e progresso, metodologia, setores atendidos e benefícios. As três perguntas que dimensionam o pedido continuam. A EdApp e as telas continuam como pergunta. O card do LMS na home perde a pendência pelo mesmo motivo.
   - **07 Quem Somos:** história, "atendemos comunidades, empresas e órgãos públicos em todo o Brasil", os três princípios (Propósito, Coragem e Parceria, cada um com os seus três itens, enxutos), a missão e os números. Sem sede.
   - **21 (novo) Interpretação de mandarim:** a página `/traducao-simultanea/mandarim/`, com o conteúdo de `/mandarim-portugues` (os três serviços, simultânea e consecutiva, mais de 10 anos, private equity, bancos de investimento e empresas do portfólio, visitas e tours em fábricas e escritórios, "retornaremos em até um dia útil" perto do pedido). Pedido e WhatsApp abrem com Tradução e mandarim marcados. `Service` e `FAQPage` (se houver FAQ) no JSON-LD. Trilha "Início › Tradução simultânea › Mandarim": o `trilhaDoCaminho` precisa conhecer o nome. Título do Google com até 60 caracteres, focado em "interpretação mandarim português". O 我们是 pode entrar como detalhe visual, com `lang="zh"` e o nome "9vee". Links: a Tradução e a página do curso de mandarim levam a ela, e ela leva ao curso. Depende do 05.
   - **22 (novo) Reaproveitamento nas páginas fechadas:** o que o mapa marca como "fora" ou "parcial" na home (os três diferenciais, a frase do contato, "seu próximo capítulo de sucesso começa agora" no rodapé, as seis redes no rodapé e no `sameAs`), no NR-1 (objetivo, os seis temas com a Comunicação Não Violenta, os dois blocos de benefícios, o subtítulo do módulo 2 e o risco jurídico com pendência), em Cursos (professores e metodologia, flexibilidade, desenvolvimento contínuo, empresas e in company, aulas para executivos completas, a ponte para o LMS, realocação de funcionários, crianças e adolescentes, introdução dos preparatórios e o texto completo de cada prova) e nas páginas de idioma (inglês com crianças e adolescentes completo, português com material, ritmo e "também para brasileiros", francês com os professores nativos do TCF, e cada prova com o texto completo na página do idioma dela). O H1 da home aprovado no MVP fica. Fecha o item aberto do ticket 04 (realocação).
   - **08:** o lote 2 sai quando o 05, o 06, o 07 e o 21 ficarem prontos, e passa a incluir o 21.
   - **14:** os redirecionamentos de mandarim da decisão 5.
   - **15:** a página nova no sitemap, no rodapé (grupo Empresas) e nos links cruzados.
   - **16:** os prompts das imagens novas, inclusive o hero da página de mandarim.
3. **Cronograma:** encaixe o 21 e o 22 e as horas novas do 05, do 06 e do 07. Minha sugestão: fazer agora o 06, o 05, o 21, o 07 e o 22, nessa ordem, porque deixaram de depender do cliente, e depois voltar ao 12 e ao 13. Se a conta passar das 8 semanas, me mostre onde aperta antes de decidir.
4. **Pendências:** atualize `docs/pendencias-cliente.md` sem mudar a numeração (1 a 30 da Daniella e 1 a 8 do Arthur são citados no site e no Word). As perguntas que o site atual responde viram confirmação ("o site atual diz X; continua valendo?"), e as que ele responde por inteiro saem da lista de "trava". Acrescente as perguntas 31 a 36 da Daniella que já estão no `docs/Perguntas-9vee-Daniella-e-Arthur.docx` (telefone, PGR, idiomas de interpretação, interpretação remota, Inglês Acessível e Linguae). No fim, liste para mim o que mudou em cada pergunta, para eu atualizar o Word.

Pare aqui e me mostre: o resumo da spec, os tickets novos e os ajustados com as horas, o cronograma novo e a lista do que mudou nas perguntas.

## Fase 2: implementação (um ticket por vez, com parada no fim de cada um)

Para cada ticket, nesta ordem:

1. **Conteúdo primeiro**, em `content/`, a partir do site atual e das regras acima. Nenhum dado inventado.
2. **Desenho das seções com a skill `frontend-design`.** Carregue a skill antes de desenhar qualquer seção nova. As páginas vão ficar bem maiores do que as parciais de hoje, e o objetivo é que o site fique profissional, moderno e chamativo, sem perder a cara da 9vee:
   - nada de parede de texto nem da mesma grade de cartões repetida página após página. Varie o tipo de seção conforme o conteúdo pede: linha do tempo, texto ao lado de imagem, lista numerada grande, comparação de formatos lado a lado, faixa escura de destaque, faixa de números, citação em destaque, acordeão para o texto longo das provas, e assim por diante;
   - reaproveite os componentes que já existem (`HeroPagina`, `Pontos`, `Cartoes`, `LinhaDoTempo`, `Modulos`, `Abordagem`, `Faq`, `FaixaProva`, `ArcoComCirculo`, `CabecaDeSecao`) e crie componente novo só quando o conteúdo pedir uma forma que não existe;
   - a identidade fica: navy, papel, menta como única cor de ação, violeta e magenta para grupo e escolha (nunca botão e nunca texto), o grifo pela classe `.grifo`, o círculo da marca, Readex Pro nos títulos e Source Sans 3 no texto;
   - `docs/padroes.md` vale acima da skill. Se a skill sugerir algo que os padrões proíbem (gradiente em botão, `backdrop-filter`, sombra sem motivo, cor nova fora dos tokens), fica o padrão. Se você achar que um padrão deveria mudar, pare e me pergunte;
   - celular primeiro, com 360 e 390 px no mesmo nível de cuidado que 1280 px.
3. **`/humanizar` nos textos e `/humanizar-ui` na página**, com as correções aplicadas.
4. **Testes:** os testes do HTML gerado e do navegador da página (crie os que faltarem, como `tests/dist/parciais.test.ts` já faz), o teste de larguras e o de JSON-LD. `npm test` e `npm run e2e` passando.
5. **Capturas** num roteiro novo (`ticket-05`, `ticket-06`, `ticket-21`, `ticket-07` e `ticket-22`) em 390 e 1280 px, para eu ver.
6. **Lighthouse** da página no build de produção: Performance de no mínimo 95, Acessibilidade 100, LCP abaixo de 2,0 s e CLS abaixo de 0,1. A home já está no limite do LCP: o que entrar nela não pode ir para a primeira dobra.
7. **`code-review`** nos dois eixos (padrões e spec), com as correções em commits próprios.
8. **Fechamento:** "Como ficou" no ticket, `docs/novidades-preview.md` com o texto para o cliente, e `docs/andamento.md` atualizado. Pare e me mostre as capturas.

Não publique o preview. Eu publico com `npm run deploy` depois de ver.

## Fase 3: fechamento

1. Gere o lote 2 (Tradução, LMS, Quem Somos, interpretação de mandarim, privacidade e 404) e gere de novo os lotes 1 e 3, porque as páginas fechadas mudaram.
2. Rode `node scripts/pendencias.ts` e me diga quantas pendências sobraram, comparando com as 104 de hoje.
3. Atualize o "Onde estamos" do `docs/andamento.md` e a data no topo dele.
