# Retrato do antes: o site atual no Wix

Registrado em 29/09/2026 para o relatório de entrega com o antes e o depois de cada item, que a proposta promete (Frente 6). Depois do cancelamento do Wix, nada disto dá para medir de novo. O depois sai dos mesmos comandos e das mesmas fontes, logo depois do lançamento.

## Velocidade e qualidade (Lighthouse mobile)

Medido em 29/09/2026, das 11h50 às 12h08.

| Página | Perf. | Acess. | Práticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| / | 32 | 93 | 96 | 100 | 8.43 s | 0.003 | 3074 ms |
| /curso-de-idiomas | 31 | 92 | 96 | 100 | 17.18 s | 0.000 | 3218 ms |
| /traducao-simultanea | 32 | 92 | 96 | 100 | 17.40 s | 0.000 | 2354 ms |
| /treinamentos | 48 | 92 | 96 | 100 | 5.54 s | 0.000 | 1949 ms |
| /lms | 50 | 92 | 96 | 100 | 5.08 s | 0.000 | 1748 ms |
| /quem-somos | 37 | 92 | 96 | 100 | 16.23 s | 0.000 | 2309 ms |

- A Performance fica entre 31 e 50. No celular simulado, o maior bloco da primeira tela (LCP) leva de 5 a 17 segundos para aparecer, e o navegador fica travado de 1,7 a 3,2 segundos (TBT) rodando script.
- O SEO 100 do Lighthouse só confere o básico: a página tem título e descrição e pode ser rastreada. O que o Google de fato lê está na seção abaixo.
- Lighthouse 13.5, perfil mobile padrão, Chrome instalado, mediana de 3 rodadas por página, na página publicada do Wix. Cada página mede num processo próprio.
- Cada rodada conta como visita no GA4 e no Twipla da 9vee. Em 29/09/2026 foram cerca de 53 rodadas, em cinco janelas. Na comparação de visitas desse dia, é preciso descontar:
  - das 10h37 às 10h58, a primeira medida das 6 páginas (18 rodadas), descartada: o script contava como zero a nota que o Lighthouse deixava em branco, e a home saiu com Boas práticas 0;
  - por volta das 11h00, uma rodada na home, só de Boas práticas, para achar o defeito;
  - das 11h02 às 11h06, a home de novo (3 rodadas);
  - das 11h11 às 11h25, uma segunda medida das 6 páginas, que parou na quinta por falta de memória, sem imprimir nada (de 12 a 14 rodadas);
  - das 11h50 às 12h08, a medida desta tabela (18 rodadas).
- Comando: `node scripts/lighthouse-no-ar.ts` com os 6 endereços da tabela. No depois, os endereços novos: `/`, `/curso-de-idiomas/`, `/traducao-simultanea/`, `/treinamento-nr-1/`, `/lms/` e `/quem-somos/`.

## O que o Google lê em cada página

Lido do HTML publicado em 29/09/2026, sem rodar script.

| Página | Título | Descrição | H1 | Dados estruturados | Imagens sem texto alternativo |
|---|---|---|---|---|---|
| `/` | 84 caracteres | 183 caracteres | "SOLUÇÕES EDUCACIONAIS QUE PREPARAM PARA O PRESENTE E CONSTROEM O FUTURO" | só `WebSite` | 3 de 24 |
| `/curso-de-idiomas` | 23 | 265 | "CURSO DE IDIOMAS" | nenhum | 5 de 30 |
| `/traducao-simultanea` | 26 | 250 | nenhum | nenhum | 5 de 22 |
| `/treinamentos` (onde está o NR-1) | 45, igual ao do LMS | 346, igual à do LMS | "Treinamento" | nenhum | 3 de 9 |
| `/lms` | 45, igual ao de Treinamentos | 346, igual à de Treinamentos | "LMS - LEARNING MANAGEMENT SYSTEM" | nenhum | 3 de 6 |
| `/quem-somos` | 17 | 427 | "QUEM SOMOS - NOVEE SOLUÇÕES EDUCACIONAIS" | nenhum | 0 de 3 |

O Google mostra uns 60 caracteres de título e uns 160 de descrição. O site novo segue esses limites, com um H1 por página e dados estruturados de organização, serviço, curso, perguntas frequentes e trilha. As imagens contadas são as que o HTML traz; o Wix pode carregar outras depois.

## Números de hoje

| Medida | Valor | Fonte |
|---|---|---|
| Sessões, 31/08 a 29/09 | 241, 63% a menos que nos 30 dias anteriores | painel do Wix |
| Visitantes únicos, no mesmo período | 161, 91% novos | painel do Wix |
| Dispositivo | 70% desktop, 30% celular | painel do Wix |
| Origem das sessões | direto 123, Google orgânico 81, painel do Wix 9, Bing 7, Yahoo 5 | painel do Wix |
| Cliques para entrar em contato, 30 dias | 1 | painel do Wix |
| Envios de formulário, de fevereiro a setembro de 2026 | 24: 16 no Contato Principal, 7 no Contato Inicial e 1 no Orçamento Chinês Português | painel do Wix |
| Search Console, 7 dias até 25/09 | 227 impressões e 11 cliques | painel do Wix, ligado ao Search Console |
| Consultas que aparecem | "9vee" e "novee" | painel do Wix |
| Google Analytics | `G-Y04K0CN1F9`, na conta Google da 9vee; ainda sem acesso para tirar os números de lá | `docs/wix-inventario.md` |

## O que o site atual não tem

Cada item é uma linha do depois.

1. **Página de NR-1:** o treinamento fica dentro de `/treinamentos`, que divide título e descrição com `/lms`, e a sigla não aparece em menu, título nem endereço.
2. **Páginas de idioma:** os 14 idiomas são figuras na home, sem link e sem página própria.
3. **Pedido de orçamento na página:** o botão leva de volta à home, segundo o diagnóstico da proposta.
4. **Conversões no GA4:** nenhuma configurada, segundo o diagnóstico da proposta. Não conferi, porque ainda não temos acesso ao GA4.
5. **Aviso de cookies:** não existe. O GA4 e o Twipla (gravação de sessão, com um script de fingerprint) rodam sem aviso nem escolha do visitante.
6. **Dados estruturados:** só o `WebSite` que o Wix põe na home; nada de organização, serviço, curso ou perguntas frequentes.
7. **Marca escrita de um jeito só:** aparecem "9vee" e "Novee", inclusive em título ("TERMOS DE USO - Novee") e em H1.
8. **Limpeza do que o Google indexa:** 505 posts de blog em molde de cidade, 6 programas de modelo e a lista deles (`/challenges`), todos indexáveis.
9. **Texto alternativo nas imagens:** 19 imagens sem ele nas 6 páginas principais.
