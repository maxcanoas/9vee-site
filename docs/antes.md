# Retrato do antes: o site atual no Wix

Registrado em 29/09/2026 para o relatório de entrega com o antes e o depois de cada item, que a proposta promete (Frente 6). Depois do cancelamento do Wix, nada disto dá para medir de novo. O depois se mede logo após o lançamento, e nem toda fonte continua a mesma:

- a velocidade usa o mesmo comando, com o Lighthouse fixo na versão 13.5.0;
- o que o Google lê vem da mesma leitura do HTML publicado;
- o Search Console é o mesmo, lido hoje pelo painel do Wix e depois direto nele;
- as visitas, a origem e os cliques mudam de fonte. Hoje vêm do painel do Wix, que conta as visitas sem pedir aceite. No site novo vêm do GA4, que só conta quem aceita os cookies de estatística. O depois vai mostrar menos visitas do que o site recebe de fato, e a comparação precisa dizer isso;
- os envios de formulário passam a ser contados pelos pedidos que chegam em contato@9vee.com.br. Ali chegam todos, com ou sem o aceite dos cookies.

## Velocidade e qualidade (Lighthouse mobile)

Medido em 29/09/2026, das 20h29 às 20h48, com o Lighthouse 13.5.0 e o Chrome 154.0.8037.92.

| Página | Perf. | Acess. | Práticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| / | 29 | 93 | 96 | 100 | 8.50 s | 0.003 | 3938 ms |
| /curso-de-idiomas | 30 | 92 | 96 | 100 | 18.20 s | 0.000 | 5300 ms |
| /traducao-simultanea | 31 | 92 | 96 | 100 | 17.33 s | 0.000 | 4172 ms |
| /treinamentos | 47 | 92 | 96 | 100 | 5.57 s | 0.000 | 2066 ms |
| /lms | 48 | 92 | 96 | 100 | 5.19 s | 0.000 | 1889 ms |
| /quem-somos | 39 (2 de 3) | 92 (2 de 3) | 96 (2 de 3) | 100 (2 de 3) | 16.54 s (2 de 3) | 0.000 (2 de 3) | 3219 ms (2 de 3) |

- A Performance fica entre 29 e 48. No celular simulado, o maior bloco da primeira tela (LCP) leva de 5 a 18 segundos para aparecer, e o navegador fica travado de 1,9 a 5,3 segundos (TBT) rodando script.
- O SEO 100 do Lighthouse só confere o básico: a página tem título e descrição e pode ser rastreada. O que o Google de fato lê está na seção abaixo.
- Perfil mobile padrão, mediana de 3 rodadas por página, na página publicada do Wix. Cada página mede num processo próprio. Rodada em que a página não carrega fica de fora, e a célula diz de quantas rodadas o valor saiu: no `/quem-somos`, uma rodada terminou sem nada na tela (`NO_FCP`).
- O mesmo endereço dá números diferentes em horas diferentes, e o depois precisa se comparar com a faixa:
  - a home deu Performance 27 e CLS 0,131 às 11h02, 32 e 0,003 às 11h50, e 29 e 0,003 nesta medida;
  - entre esta medida e a das 11h50, a Performance mudou até 3 pontos e o LCP até 1,02 s. Às 11h50, a Performance tinha dado 32 em `/`, 31 em `/curso-de-idiomas`, 32 em `/traducao-simultanea`, 48 em `/treinamentos`, 50 em `/lms` e 37 em `/quem-somos`;
  - o TBT subiu em todas as páginas, até 2,1 s. É o valor que mais sente a máquina ocupada, e o depois precisa ser medido com ela livre.
- Cada rodada conta como visita no GA4 e no Twipla da 9vee. Em 29/09/2026 foram cerca de 71 rodadas, em seis janelas. Na comparação de visitas desse dia, é preciso descontar:
  - das 10h37 às 10h58, a primeira medida das 6 páginas (18 rodadas), descartada: o script contava como zero a nota que o Lighthouse deixava em branco, e a home saiu com Boas práticas 0;
  - por volta das 11h00, uma rodada na home, só de Boas práticas, para achar o defeito;
  - das 11h02 às 11h06, a home de novo (3 rodadas);
  - das 11h11 às 11h25, uma segunda medida das 6 páginas, que parou na quinta por falta de memória, sem imprimir nada (de 12 a 14 rodadas);
  - das 11h50 às 12h08, a terceira medida das 6 páginas (18 rodadas), a da comparação acima;
  - das 20h29 às 20h48, a medida desta tabela (18 rodadas), já com o script que registra as versões.
- Comando: `npm install --no-save lighthouse@13.5.0` e depois `node scripts/lighthouse-no-ar.ts` com os 6 endereços da tabela. No depois, os endereços novos: `/`, `/curso-de-idiomas/`, `/traducao-simultanea/`, `/treinamento-nr-1/`, `/lms/` e `/quem-somos/`.

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
| Origem das sessões (as cinco maiores) | direto 123, Google orgânico 81, painel do Wix 9, Bing 7, Yahoo 5 | painel do Wix |
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
10. **Título e descrição próprios:** `/treinamentos` e `/lms` dividem o mesmo título e a mesma descrição. O título da home tem 84 caracteres, e as seis descrições têm de 183 a 427, mais do que o Google mostra.
