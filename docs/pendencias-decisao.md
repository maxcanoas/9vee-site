# Pendências abertas e o que fazer com cada uma

Montado em 07/10/2026 (ticket 17), com o site como está no preview da 14ª publicação. É a lista para a decisão caso a caso que a spec e o cronograma marcam para a semana 8 (16/11 a 22/11): o que a 9vee não responder até lá é decidido pelo Maxwell, e aplicado no ticket 20. A numeração é a do Word da segunda rodada (`docs/Perguntas-9vee-segunda-rodada.docx`, perguntas 27 a 55). O texto completo de cada pergunta está em `docs/pendencias-cliente.md`.

**Atualizado em 08/10/2026:** a 9vee respondeu a 30, a 31 e a 32, e o Maxwell tirou do Word a 43 e as de 51 a 55. O Word novo é o `docs/Perguntas-9vee-segunda-rodada-v2.docx`, com os mesmos números.

**Atualizado em 09/10/2026:** a 9vee respondeu as 20 perguntas do Word v2. O Word que foi numerou as perguntas de 1 a 20; o mapa para a numeração de 27 a 55 está em `docs/pendencias-cliente.md`, em "As respostas da segunda rodada v2". Todas foram para "Respondidas", no fim. Sobraram o aviso da Lei 14.831, os acessos e quatro pontos pequenos que as respostas abriram. Nenhum deles tem marca no site.

**Atualizado em 09/10/2026, à noite:** tudo o que ainda falta pedir (os grupos 2 e 3, menos a Graded e a nota do Google, que ficam fora sem pergunta) foi para o Word da terceira rodada, `docs/Perguntas-9vee-terceira-rodada.docx`, com as perguntas de 1 a 13. O mapa está em `docs/pendencias-cliente.md`, em "A terceira rodada". As sugestões daqui continuam valendo para o que não for respondido.

**Atualizado em 09/10/2026, mais tarde:** a 9vee respondeu 7 das 13 perguntas da terceira rodada (5 a 8 e 11 a 13), e nenhuma muda o que o site mostra. O Maxwell decidiu que o site só usa os logos que já tinha (Nissan, General Motors e Embraer), então os depoimentos novos continuam sem logo. As 6 que faltaram foram para `docs/Perguntas-9vee-terceira-rodada-v2.docx`, de 1 a 6. O mapa está em `docs/pendencias-cliente.md`, em "As respostas da terceira rodada".

**Aprovado pelo Maxwell em 07/10/2026:** na semana 8, o que a 9vee não tiver respondido é aplicado como está aqui, sem nova rodada de perguntas. O que ela responder vale sobre a sugestão.

Cada item diz o que o site mostra hoje, o que eu sugiro se a resposta não vier e por quê. Nenhuma sugestão inventa fato: quando falta a resposta, o trecho sai ou fica só com o que a 9vee já confirmou.

## 1. Trava a produção

Com as respostas de 09/10, a trava de produção só acusa esta marca, além da chave do formulário e do ID do GA4, que são do ticket 20.

### Lei 14.831 (aviso, sem pergunta)

- **Hoje:** o NR-1 diz que o regulamento do Certificado Empresa Promotora da Saúde Mental ainda não saiu.
- **Sugestão:** na semana do lançamento, eu confiro no Diário Oficial. Se continuar sem regulamento, a frase fica e a marca sai. Se sair, a frase diz como pedir, com a fonte.
- **Por quê:** é afirmação com data, que pode envelhecer entre hoje e o lançamento.

## 2. Abertas pelas respostas de 09/10, sem marca no site

O site já tem uma posição que não depende da resposta. A resposta só melhora o texto.

| Assunto | O site hoje | Sugestão, sem resposta |
|---|---|---|
| Cidade da aula presencial do cantonês (a linha diz "Online e Presencial", sem cidade) | "Também há aula presencial: conte no pedido a sua cidade." | Fica assim. A pergunta está no Word da terceira rodada v2 (a 5) |
| O programa na Graded, citado na resposta 2 | Não aparece | Fica fora. A resposta não diz se foi curso para os alunos ou treinamento da equipe da escola, e o nome não tem autorização |
| A nota do Google (parte da 33) | O link do Perfil no rodapé, sem nota | Fica sem a nota |
| Os órgãos públicos do Inglês Acessível (estavam no flyer) | Saíram do bloco, que segue a resposta 9: centros acadêmicos universitários | Ficam fora. Voltam se a 9vee disser que o programa também os atende. A pergunta está no Word da terceira rodada v2 (a 6) |

## 3. Acessos: sem eles, o site não vai ao ar

Estas não mudam texto, mas o lançamento depende delas.

**As três saíram do Word em 08/10/2026, a pedido do Maxwell.** Os acessos continuam necessários para o lançamento, e as sugestões abaixo continuam valendo.

### 53. Acesso ao Google Analytics e ao Search Console da 9vee

**O GA4 chegou em 09/10/2026:** o Arthur deu ao Maxwell acesso de administrador. O que foi feito e o que fica para o dia da troca está em `docs/medicao.md`. Falta o Search Console, que está no Word da terceira rodada v2 (a 2).

- **Por que importa:** na propriedade do GA4 da 9vee é preciso desligar os "Cliques de saída" e pôr o `text` na redação de dados (`docs/medicao.md`). Sem isso, o nome e a empresa do texto do WhatsApp chegam ao Google, e a política promete que não chegam. No Search Console vão o sitemap novo e as 15 URLs que saem do ar (`docs/remocoes-search-console.txt`).
- **Sugestão, sem resposta:** mandar ao Arthur os dois passos do GA4, com prints, para ele fazer, e pedir o print da tela depois. O Search Console continua verificado na troca, porque a meta tag é a mesma do Wix. O sitemap e as remoções podem esperar o acesso, alguns dias depois do lançamento.

### Acesso à HostGator (pergunta 1 do Word da terceira rodada v2)

- **Por que importa:** é onde o site vai morar. Sem ele, a Fase 1 termina com o site pronto para ir ao ar, mas não no ar. Com ele: testar o `.htaccess`, conferir o país do servidor (a política fala disso) e apontar o domínio.
- **Sugestão:** pedido na terceira rodada, sem resposta. Vai de novo como a primeira pergunta da versão 2, para chegar antes da semana 8.

### A chave da Web3Forms e a aprovação dos textos (perguntas 3 e 4 do Word da terceira rodada v2)

- **Por que importa:** sem a chave, a trava barra o build de produção; sem a aprovação dos quatro lotes e do preview, o site não vai ao ar (`docs/checklist-lancamento.md`).

## Respondidas

### As respostas da terceira rodada (09/10/2026)

| Pergunta | Resposta | No site |
|---|---|---|
| Autorização dos depoimentos de 09/10 | "Sim, tudo está autorizado" | A fala e o nome ficam. Os logos da PVH e da Embraer NL não entram: o Maxwell decidiu que o site só usa os logos que já tinha |
| Sobrenome do Fabrício | "Que apareça apenas como Fabrício" | Nada a mudar |
| Serviço do depoimento do Elian sobre a parceria | "Que fique com essa informação apenas" | Continua "Cursos de idiomas" |
| 41. Depoimento de aluno | Os depoimentos já foram enviados e estão no site | Os do Elian e do Fabrício são de aluno. A 41 fecha |
| A frase das crianças na política | "Perfeito, é isso mesmo." | Nada a mudar. A data da versão fica 9 de outubro de 2026 |
| 55. Zona DNS alterada em 29/09 | Foi o robô da HostGator | Nada. O checklist continua mandando exportar a zona antes de mexer |
| 54. GitHub | O Maxwell cria a conta da 9vee | Na entrega, o Maxwell cria a organização e transfere o repositório |

### 30. Autorização dos três depoimentos da home (respondida em 08/10/2026)

- **Resposta:** "Sim". A 9vee tem a autorização por escrito de Eduardo Martins, Bruno Teixeira e Pedro Cavalcante para a fala e da Nissan, da General Motors e da Embraer para o logo, e as falas são deles, como estão no site.
- **No site:** as três marcas saíram da home. A seção fica com fala, nome, cargo e logo, e não trava mais a produção.

### 31 e 32 (respondidas em 08/10/2026)

- **31:** as seis empresas autorizaram o nome, e nenhuma o logo. O site cita só os nomes.
- **32:** "16 anos de experiência" aprovado. A home fica como está.

### As respostas de 09/10/2026 (Word v2)

O detalhe de cada uma, com o número do Word que foi, está em `docs/pendencias-cliente.md`.

| Pergunta | Resposta | No site |
|---|---|---|
| 27. Política | Aprovada no formato da mescla | As marcas, a legenda e a etiqueta "Novo" saíram. Versão de 9 de outubro de 2026 |
| 28. Crianças | Quem assina o contrato é o pai ou o responsável; também há aulas dentro de escolas | A frase nova, que fala só do que a resposta diz (escolha do Maxwell) |
| 29. Foro | Fica Arapoti, o endereço fiscal | A marca saiu |
| 33. Perfil no Google | O endereço é a casa de uma funcionária, mantido pela busca em São Paulo; o link é `share.google/2l0jYMdugOo5em3DR` | Rodapé e JSON-LD com a cidade, sem a rua, e o link do Perfil (escolha do Maxwell) |
| 34. Cantonês | Todos os níveis, online e presencial, professor nativo, o COPE; executivos, importação e visitas a fábricas | Página escrita e publicada |
| 35. Aula na empresa | No Rio não há português presencial | O português presencial ficou só em São Paulo, em Cursos, no português e no Rio |
| 36. Árabe | É o APT | A página prepara para o APT, da Avant Assessment |
| 37. Norueguês | Incluir a prova de cidadania | A statsborgerprøven entrou nas provas |
| 38. Inglês Acessível | Aula presencial em grupo, de inglês e espanhol, dentro de faculdades, para centros acadêmicos, com foco em SP e RJ | O bloco diz isso |
| 39. Realocação | Continua | Nada a mudar |
| 40. Aula experimental | Nivelamento e aula experimental grátis, online, marcados pelo WhatsApp | Botão "Aula experimental grátis" no topo da home para quem escolhe "Para você" e uma pergunta nova no FAQ de Cursos e dos 14 idiomas (escolha do Maxwell) |
| 42. Fotos | As fotos geradas ficam | Nada a mudar |
| 44. Plano de ação | O roteiro de 90 dias é do curso formativo, e pode ir ao site | O NR-1 descreve o roteiro |
| 45. Comprovante | Certificado simples de participação e horas, quando pedem, em todos os cursos e workshops | "Certificado de participação" no NR-1, e "é só pedir" no certificado dos cursos |
| 46. Para quem | Os dois servem a qualquer pessoa; o formativo costuma ir para a liderança | O FAQ "Quem precisa participar?" diz isso |
| 47. Cidades | SP: dentro de empresas, reuniões periódicas e treinamentos de software em inglês. RJ: tours e visitas a empresas. Curitiba: visitas a fábricas e empresas. Brasília: eventos internacionais e diplomáticos, visitas institucionais e turismo | As quatro páginas publicadas, e o mapa de redirecionamentos leva os 14 posts de tradução por cidade a elas |
| 48. Mandarim | Continua valendo | Nada a mudar |
| 49. Versões em inglês e chinês | Só trouxeram cliente nas primeiras semanas | Ficam como a proposta prevê: os três endereços levam à página nova |
| 50. LMS | A plataforma é a LearnWorlds; sem professora embaixadora; o que cada relatório mostra; recebe idiomas, treinamentos internos e integração | Os relatórios com texto e a plataforma com os treinamentos internos. O nome da LearnWorlds e as telas ficam fora, porque a resposta não autoriza |
