# 11: Páginas por cidade e lote 4

**O que construir:** as páginas das cidades de atendimento presencial que tiverem fato local, e o lote 4 para a Daniella.

**Depende de:** 05, 09.

**Horas:** 4. **Semana:** 5.

**Situação:** ready-for-agent

- [ ] Decisão registrada com o Maxwell, a partir da resposta do cliente: página de tradução por cidade ou página da cidade inteira, com o endereço de cada uma.
- [ ] Modelo e as cidades com fato local; as sem fato ficam não publicadas, e os posts delas vão para a página do serviço.
- [ ] Nada de endereço, mapa ou "venha nos visitar"; nada de `LocalBusiness`.
- [ ] O JSON-LD do serviço que couber. O `Base` já monta o `BreadcrumbList` pelo endereço; falta dar ao `trilhaDoCaminho` o nome de cada cidade, e pôr a trilha na tela se a página não usar o `HeroPagina`.
- [ ] Antes de criar as páginas, juntar o que uma página fora do menu pede hoje em cinco lugares: a lista de `paginas` do esquema de `content/site.md`, o `trilhaDaPagina`, o `scripts/pendencias.ts`, o teste de larguras e o desvio do teste da trilha. A revisão de padrões do ticket 21 apontou, e a interpretação de mandarim é o primeiro caso.
- [ ] Links: cidade para serviço e para os idiomas com aula presencial ali; serviço e idioma para a cidade.
- [ ] Prompt da foto de cada cidade publicada; `humanizar`; `docs/revisao-daniella/lote-4.md`.
