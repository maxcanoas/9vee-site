# Novidades do preview

Cada vez que valer a pena publicar o preview, entra aqui, no topo, um resumo curto do que mudou desde a publicação anterior, em linguagem de cliente. É o texto que o Maxwell manda para a Daniella e o Arthur junto com o link: https://9vee-preview.9vee-site.workers.dev

## Semana 1, sexta leva (01/10): a página de Tradução Simultânea completa

- A página de Tradução Simultânea deixou de ser "em construção". Ela agora conta o que o site atual de vocês diz do serviço: https://9vee-preview.9vee-site.workers.dev/traducao-simultanea/
  - os três formatos lado a lado (simultânea, consecutiva e acompanhamento), cada um com quando usar e como funciona;
  - como funciona a simultânea: a terminologia da área, as cabines acústicas e os sistemas de áudio;
  - os cinco tipos de evento;
  - os sete idiomas e as quatro cidades do atendimento presencial;
  - quem são os intérpretes: a formação, as áreas de experiência e onde atuam;
  - um bloco sobre a interpretação de mandarim para o mercado financeiro, que vai levar à página nova desse serviço;
  - oito perguntas de quem organiza um evento.
- O pedido de tradução ganhou uma pergunta: quanto tempo dura o evento. É ela que diz se vai um intérprete ou dois.
- O que aparece como "a confirmar" veio do material do Canva, e não do site atual: a interpretação remota (pergunta 34), árabe, Libras e ASL (33), o revezamento dos intérpretes (16) e os casos atendidos (17). O prazo de resposta é a pergunta 6.
- Na parte "Como funciona a interpretação simultânea" entrou uma foto nova: o público de um congresso, com a cabine de interpretação ao fundo.

Nota para o Maxwell, não para o cliente: veja as capturas em `relatorios/ticket-05/` e publique com `npm run deploy`. As perguntas 16, 33 e 34 da mensagem dizem que os itens "entraram na página": elas só ficam verdadeiras no preview depois desta publicação. A foto é a da sua segunda rodada no Gemini, de 01/10 às 23h17 (`docs/imagens-gemini.md`, "As duas rodadas das páginas completas"). Esta leva e a do LMS podem ir juntas.

## Semana 1, quinta leva (01/10): a página de LMS completa

- A página de LMS deixou de ser "em construção". Ela agora conta o que o site atual de vocês diz da plataforma: https://9vee-preview.9vee-site.workers.dev/lms/
  - o que é o LMS, com a sigla explicada;
  - a plataforma disponível 24 horas por dia, 7 dias por semana, com o acompanhamento dos professores e as trilhas de aprendizagem;
  - os relatórios de desempenho, frequência e progresso, que vão para os gestores e para o RH. A página só dá o nome dos três, como o site atual: o que cada um mostra entra quando a pergunta 21 voltar;
  - como são as aulas, no curso online ou no presencial: as simulações de reunião, de apresentação e de negociação, o vocabulário de negócios, o conteúdo customizado e o feedback dos professores;
  - os sete setores atendidos;
  - no fim, as três perguntas que o pedido faz.
- Logo abaixo do topo, três atalhos levam aos motivos que o site atual dá para escolher a 9vee: relatórios para o RH, flexibilidade de horários e foco em comunicação profissional.
- Na home, o texto do LMS na lista de serviços perdeu o "a confirmar".
- Na parte "O que é o LMS" entrou uma foto nova: uma colaboradora estudando pelo notebook em casa, à noite.
- Ficou fora de propósito o que só aparece no material do Canva: a EdApp, as telas da plataforma, a sala de aula invertida, a IA e o plantão pelo WhatsApp. Tudo isso continua na pergunta 21 da Daniella. O texto da página nova não tem nenhum "a confirmar": o único que aparece nela é o do rodapé, sobre a pronúncia da marca, que está em todas as páginas.

Nota para o Maxwell, não para o cliente: veja as capturas em `relatorios/ticket-06/` e publique com `npm run deploy`. A pergunta 21 da mensagem diz "a página nova de LMS repete isso": ela só fica verdadeira no preview depois desta publicação. A foto IMG-LMS-O-QUE-E já está em `src/assets/imagens/lms-o-que-e.jpg`, e entra na próxima publicação.

## Semana 1, quarta leva (30/09): uma foto no topo de cada página de idioma

- Cada página de idioma ganhou uma foto no topo, com duas pessoas conversando numa cidade onde se fala o idioma e um lugar conhecido ao fundo. No inglês é o Big Ben; no japonês, a Torre de Tóquio; no português para estrangeiros, o MASP. A saudação na escrita do idioma continua ao lado.
  - https://9vee-preview.9vee-site.workers.dev/curso-de-idiomas/ingles/
  - https://9vee-preview.9vee-site.workers.dev/curso-de-idiomas/japones/
  - https://9vee-preview.9vee-site.workers.dev/curso-de-idiomas/portugues-para-estrangeiros/
- A foto fica no mesmo arco das outras páginas, com o círculo da marca atrás.
- As páginas de idioma continuam fora do site até as respostas chegarem.

Nota para o Maxwell, não para o cliente: publique com `npm run deploy`. O lote 3 foi gerado de novo e agora traz a descrição de cada foto, que a Daniella também revisa. Se ele já foi para ela, a diferença são só as seis linhas "[Imagem: ...]" das páginas escritas.

## Semana 1, terceira leva (30/09): a política de privacidade e a página de erro

- O site novo tem a sua própria política de privacidade: https://9vee-preview.9vee-site.workers.dev/politica-de-privacidade/
  - Ela diz o que o site coleta, quem recebe os dados e por quanto tempo eles ficam guardados. Já descreve também o aviso de cookies, que chega ao preview mais adiante.
  - O link fica no rodapé de toda página e agora abre no próprio site, e não mais no site antigo.
  - O que aparece como "a confirmar" é a razão social, o CNPJ, o contato para pedidos sobre dados pessoais, os prazos de guarda e a data da versão (perguntas 25 a 27 da Daniella). Com as respostas, ela passa pelo advogado de vocês antes de ir ao ar.
- A página que aparece quando alguém abre um endereço que não existe agora mostra os serviços da 9vee, para a pessoa seguir dali: https://9vee-preview.9vee-site.workers.dev/pagina-que-nao-existe/

Nota para o Maxwell, não para o cliente: vale publicar (`npm run deploy`) antes de mandar a mensagem de pendências, porque as perguntas 25 a 27 falam da política nova, e a Daniella pode mandar o link ao advogado. As três levas podem ir juntas, com o lote 1, o lote 3 e a mensagem. A política entra no lote 2, que sai quando Tradução, LMS e Quem Somos ficarem prontas.

## Semana 1, segunda leva (29/09 a 04/10): uma página para cada idioma e o lote 3

- Agora os 14 idiomas têm página no preview. Holandês, francês e português para estrangeiros já trazem o que o site atual diz de cada um: o Inburgering, as provas de francês e o CELPE-Bras.
  - https://9vee-preview.9vee-site.workers.dev/curso-de-idiomas/holandes/
  - https://9vee-preview.9vee-site.workers.dev/curso-de-idiomas/frances/
  - https://9vee-preview.9vee-site.workers.dev/curso-de-idiomas/portugues-para-estrangeiros/
- Alemão, italiano, sueco, norueguês, romeno, japonês, árabe e russo ainda só têm as perguntas, porque o site atual só traz o nome deles. Arthur, cada resposta sua vira o texto da página. O endereço segue o mesmo padrão, como https://9vee-preview.9vee-site.workers.dev/curso-de-idiomas/alemao/.
- Como as primeiras, as páginas novas ficam fora do site até as respostas chegarem.
- Daniella: junto vai o lote 3, com o texto dos seis idiomas escritos (inglês, espanhol, mandarim, holandês, francês e português).

Nota para o Maxwell, não para o cliente: publique com `npm run deploy`. Se a mensagem da primeira leva ainda não foi, as duas podem ir juntas, com o lote 1, o lote 3 (`docs/revisao-daniella/lote-3.md`) e a mensagem de pendências.

## Semana 1 (29/09 a 04/10): o caminho no alto das páginas, as primeiras páginas de idioma e o primeiro lote de textos

- Três páginas novas, uma por idioma: inglês, espanhol e mandarim. Cada uma abre com o olá na escrita do idioma e leva ao pedido com o idioma já marcado:
  - https://9vee-preview.9vee-site.workers.dev/curso-de-idiomas/ingles/
  - https://9vee-preview.9vee-site.workers.dev/curso-de-idiomas/espanhol/
  - https://9vee-preview.9vee-site.workers.dev/curso-de-idiomas/mandarim/
- As três ainda não vão para o site, e por isso a home e a página de cursos ainda não levam a elas. No alto de cada uma aparece "Fora do site até vocês responderem". O que aparece como "a confirmar" são perguntas da mensagem de pendências: as de cada idioma são do Arthur, e o preço, da Daniella. Com as respostas, a página entra no site e passa a receber os links.
- No alto das páginas de NR-1, Cursos, Tradução, LMS e Quem Somos aparece o caminho até a página: "Início", e a página onde a pessoa está. Um toque em "Início" leva de volta para a home.
- As perguntas do fim da home e da página de NR-1 agora vão também para o Google, no formato que ele lê. A página de cursos já fazia isso.
- Os dados que o site passa ao Google não trazem mais um endereço de sede, porque a 9vee não recebe clientes num escritório. O texto da página Quem Somos ainda fala da sede em São Paulo: ele muda quando a página for reescrita, com as respostas de vocês.
- Daniella: junto com este link vai o lote 1 de textos, com a home, o NR-1, os cursos, o menu, o rodapé e o pedido de orçamento. É para você ler, corrigir o que quiser e aprovar. O que aparece como "a confirmar" ainda espera uma resposta de vocês.

Nota para o Maxwell, não para o cliente: vale publicar junto com o lote 1 (`docs/revisao-daniella/lote-1.md`), porque a trilha é a primeira mudança na tela desde a aprovação do MVP. A mesma publicação leva as páginas de idioma do ticket 09. Nenhuma resposta do cliente chegou ainda: a mensagem de `docs/pendencias-cliente.md` pode ir junto, e ela já pergunta o que as páginas de idioma marcaram.
