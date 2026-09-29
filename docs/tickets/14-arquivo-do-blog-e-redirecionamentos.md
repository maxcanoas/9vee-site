# 14: Arquivo do blog e mapa de redirecionamentos

**O que construir:** a cópia de todos os posts do blog atual, de onde o blog pode voltar depois, e o mapa de redirecionamentos de todas as URLs do site atual, para o Maxwell revisar.

**Depende de:** 09, 11.

**Horas:** 3,5. **Semana:** 6.

**Situação:** ready-for-agent

- [ ] Um script lê as páginas públicas dos 505 posts, com pausa entre os pedidos, e grava em `docs/blog-arquivo/` o título, a URL, a data, o texto e o endereço das imagens de cada post.
- [ ] `docs/redirects.csv` com todas as URLs de `docs/urls-site-atual.csv`, cada uma com destino, tipo (301 ou 410) e motivo, pelas regras da spec, mais uma coluna de exceção à mão.
- [ ] Nenhuma URL sem destino ou 410; nenhum destino que seja página não publicada; nenhuma corrente de redirecionamento.
- [ ] `docs/remocoes-search-console.txt` com as URLs 410.
- [ ] Teste unitário das regras, com URLs de exemplo.
- [ ] O script roda de novo perto do lançamento, porque o blog ainda recebe posts e as páginas publicadas mudam.
- [ ] Parada para a revisão do CSV pelo Maxwell.
