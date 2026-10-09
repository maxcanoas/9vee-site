# 11: Páginas por cidade e lote 4

**O que construir:** as páginas das cidades de atendimento presencial que tiverem fato local, e o lote 4 para a Daniella.

**Depende de:** 05, 09.

**Horas:** 4. **Semana:** 5 (adiantado: feito em 07/10/2026, na semana 2).

**Situação:** feito em 07/10/2026, no processo curto. As quatro páginas estão no preview e fora da produção até a resposta da pergunta 47. **Publicadas em 09/10/2026:** a 9vee respondeu a 47 (resposta 17 da segunda rodada v2), cada página ganhou o trabalho mais comum na cidade e o mapa de redirecionamentos leva os 14 posts de tradução por cidade a elas. O Rio ficou com o inglês e o espanhol na aula presencial (resposta 6).

- [x] Decisão registrada com o Maxwell, a partir da resposta do cliente: página de tradução por cidade ou página da cidade inteira, com o endereço de cada uma. **Decidido em 07/10/2026, pelas perguntas de escolha, com as respostas de 05/10:** São Paulo e Rio de Janeiro têm aula de idioma dentro da empresa além da tradução, e viram página da cidade (`/sao-paulo/` e `/rio-de-janeiro/`); em Curitiba e Brasília só a tradução é presencial, e elas viram "Tradução simultânea em <cidade>" (`/traducao-simultanea/curitiba/` e `/traducao-simultanea/brasilia/`). O NR-1 vai a qualquer cidade do Brasil, então não conta como fato local: entra nas quatro como um bloco que leva à página dele.
- [x] Modelo e as cidades com fato local; as sem fato ficam não publicadas, e os posts delas vão para a página do serviço. As quatro ficam com `publicada: false` até a 9vee responder que tipo de evento mais faz em cada cidade (pergunta 47 do Word de 05/10): sem isso, o texto da tradução seria o mesmo nas quatro, só com o nome da cidade trocado. Escolha do Maxwell em 07/10/2026.
- [x] Nada de endereço, mapa ou "venha nos visitar"; nada de `LocalBusiness`.
- [x] O JSON-LD do serviço que couber: um `Service` por bloco, com a âncora da seção no `@id` e a cidade na área atendida. A trilha leva o nome da cidade, pelo `trilhaDaPagina`; as páginas usam o `HeroPagina`, que já tem a trilha.
- [x] Antes de criar as páginas, juntar o que uma página fora do menu pede hoje em cinco lugares. Ficou assim: o esquema ganhou os modelos `cidade` e `traducaoNaCidade` (com `{naCidade}`, como o modelo de idioma tem `{idioma}`); o `trilhaDaPagina` lê as páginas de `content/cidades/`; o `scripts/pendencias.ts` passou a ler `content/idiomas/` e `content/cidades/` (antes só a raiz); e o teste de larguras e o da trilha leem as cidades de `tests/conteudo.ts`, que também dá a lista das páginas com publicação aos testes de produção e de SEO. Uma página nova de cidade entra sozinha em todos.
- [x] Links: cidade para serviço e para os idiomas com aula presencial ali; serviço e idioma para a cidade. A volta (a lista de cidades da Tradução, a nota da aula presencial em Cursos e nos formatos das páginas de idioma) liga só a cidade publicada, pelo `ligarCidades`: hoje nenhuma, então nada mudou nessas páginas.
- [x] O mapa de redirecionamentos recebe as cidades publicadas: `scripts/mapa-de-redirecionamentos.ts` tem as palavras do endereço dos posts de cada cidade, com os bairros de São Paulo que o blog cita, e a cidade entra quando a página dela está no build de produção. Só os posts de tradução vão para a cidade; os de idioma vão para a página do idioma (escolha do Maxwell em 07/10/2026: quem busca "aprender inglês em São Paulo" quase sempre é aluno, e a aula do aluno é online). Gerado de novo em 07/10: igual, porque nenhuma está publicada.
- [x] Prompt da foto de cada cidade (`docs/imagens-gemini.md`, "Páginas de cidade"); texto escrito sem os marcadores do `humanizar`; `docs/revisao-daniella/lote-4.md`.

**No processo curto (decisão de 02/10/2026), ficaram de fora:** o Lighthouse das páginas novas e a rodada de `code-review` em subagentes, que voltam no ticket 17. Rodaram o `npm test` inteiro e o teste de larguras das quatro páginas.
