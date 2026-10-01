# 14: Arquivo do blog e mapa de redirecionamentos

**O que construir:** a cópia de todos os posts do blog atual, de onde o blog pode voltar depois, e o mapa de redirecionamentos de todas as URLs do site atual, para o Maxwell revisar.

**Depende de:** 09, 11, 21.

**Horas:** 3,5. **Semana:** 6.

**Situação:** ready-for-agent

- [ ] Um script lê as páginas públicas dos 505 posts, com pausa entre os pedidos, e grava em `docs/blog-arquivo/` o título, a URL, a data, o texto e o endereço das imagens de cada post.
- [ ] `docs/redirects.csv` com todas as URLs de `docs/urls-site-atual.csv`, cada uma com destino, tipo (301 ou 410) e motivo, pelas regras da spec, mais uma coluna de exceção à mão.
- [ ] Os redirecionamentos de mandarim, pela decisão de 30/09/2026 (spec, "Reaproveitamento do site atual", decisão 5):
  - `/mandarim-portugues`, `/mandarim-english` e `/mandarim-chines`, as três landings de interpretação, vão para `/traducao-simultanea/mandarim/`, e não mais para `/traducao-simultanea/`;
  - `/mandarim-pt` e `/mandarim-portugues-1`, que hoje o Wix leva a duas dessas landings, vão direto para `/traducao-simultanea/mandarim/`, sem corrente;
  - `/mandarim`, que é o curso, e `/blank-1` continuam indo para `/curso-de-idiomas/mandarim/`, se a página estiver publicada; senão, para a página de cursos.
- [ ] Nenhuma URL sem destino ou 410; nenhum destino que seja página não publicada; nenhuma corrente de redirecionamento.
- [ ] `docs/remocoes-search-console.txt` com as URLs 410.
- [ ] Teste unitário das regras, com URLs de exemplo, entre elas as sete de mandarim.
- [ ] O script roda de novo perto do lançamento, porque o blog ainda recebe posts e as páginas publicadas mudam.
- [ ] Parada para a revisão do CSV pelo Maxwell.
