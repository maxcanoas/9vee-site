# Adequação aos apontamentos de concorrentes e do Canva

Montado em 30/09/2026, cruzando o documento "9vee: concorrentes e material do Canva" com o código da branch `fase-1`, a spec (`docs/fase-1-spec.md`), os tickets e a mensagem de pendências.

**Resumo:** quase tudo cabe nos tickets que já existem, sem hora nova. O maior ganho é mexer na mensagem de pendências antes de mandar: o material do Canva já responde, ao menos em parte, nove perguntas. Só três coisas são trabalho novo, e uma delas, o teste de nivelamento, não está no contrato.

## 1. O que o site já cobre

Não precisa mexer:

- separação Empresas e Para você, no menu, no rodapé e no pedido;
- pedido em quatro passos, com saída pelo WhatsApp e pelo formulário (o envio real é o ticket 12);
- faixa de números com o valor escrito no HTML (`FaixaProva.astro`). O contador animado não esconde o número, então o erro visto na Fala Company ("+0" sem JavaScript) não acontece aqui;
- depoimentos com nome, cargo, empresa e logo, e FAQ na home, no NR-1 e em Cursos;
- as 14 páginas de idioma, já no preview e fora da produção até o Arthur responder (tickets 09 e 10). Elas são a resposta ao "uma página por busca" da Linguae;
- as páginas por cidade (ticket 11), os links cruzados e o sitemap (ticket 15) e o mapa de redirecionamentos (ticket 14).

## 2. Duas correções no documento de apontamentos

1. **O teste de nivelamento não está na Fase 1.** O documento diz que já estava no escopo. Ele entrou numa versão antiga da proposta, mas a v2 fechada não tem, e a spec não cita. Ele vai para a seção 5, como pedido fora do escopo.
2. **A lista de idiomas não foi copiada da Linguae.** Os 14 idiomas vêm do site atual da própria 9vee (`docs/mvp-spec.md`, linha 248), e o agrupamento por família foi decisão do MVP. A semelhança continua, porque a Linguae tem a mesma lista e também agrupa por família. A pergunta para a Daniella fica (seção 3, pergunta nova N8), mas mexer no componente `Familias` só se ela disser que as empresas não têm relação e que a semelhança incomoda.

## 3. Antes de mandar a mensagem de pendências

Se a mensagem de `docs/pendencias-cliente.md` ainda não foi, vale ajustar. Pergunta aberta vira confirmação, que a Daniella responde mais rápido.

**Perguntas que o Canva já responde, ao menos em parte:**

| Pergunta | O que o Canva diz | Como fica a pergunta |
|---|---|---|
| D12 (plano de ação do NR-1) | O workshop do Sicredi termina num compromisso individual ("One Thing") e tem um roteiro de acompanhamento de 90 dias (check-in aos 30, termômetro psicossocial aos 60, indicadores e PGR aos 90) | "O roteiro de 90 dias que vocês fizeram para o Sicredi é padrão do treinamento? Posso descrever no site?" |
| D14 (turma inteira ou liderança) | O material do Sicredi é para gerentes de agência | "O treinamento do Sicredi foi só para gerentes. Vocês também fazem turma com a equipe inteira?" |
| D15 (caso real de NR-1) | Programa de capacitação executiva para o Sicredi, com dois workshops e o roteiro de 90 dias | "Posso citar o Sicredi como caso, com nome e logo? Se não, sem o nome?" |
| D16 (equipamento) | A apresentação de interpretação diz que a simultânea usa rádio e fone e que o custo é maior por causa do equipamento, sem dizer de quem é | Continua aberta |
| D17 (eventos e empresas citáveis) | Itaú, Santander, TOTVS, Unicef e Array, cada um com o trabalho feito; Bradesco, Pirelli e FGV em idiomas | "Posso citar estas empresas e estes trabalhos? E usar o logo de quais?" (com a lista) |
| D18 (mandarim no mercado financeiro) | Os one-pagers de interpretação confirmam: investor meetings, due diligence, visitas a fábrica, roadshows, fundos de private equity, Santander e Itaú | "Os one-pagers dizem X. Posso usar na página de tradução?" |
| D21 (LMS) | Sala de aula invertida, trilhas no app, relatório por colaborador para o RH, IA embutida e plantão de dúvidas 24 horas pelo WhatsApp com a professora embaixadora em IA. O print mostra a plataforma EdApp | "A plataforma é a EdApp, com a camada de vocês por cima? Posso descrever assim e mostrar telas?" |
| D22 (história e pessoas) | A apresentação de interpretação é assinada por Arthur Martins; o portfólio conta "mais de 20 anos" em educação e idiomas | Continua aberta, com o dado de apoio |
| D24 (pronúncia) | Todos os materiais escrevem "Novee Learning Solutions" | "Posso tirar o 'a confirmar' do 'lê-se Novee'? O nome 'Novee Learning Solutions' entra no rodapé?" |

**Perguntas novas, que o Canva levantou:**

- **N1.** Números que não batem: o Canva diz "desde 2012", "mais de 10", "mais de 15" e "mais de 20 anos"; "mais de 15 idiomas"; "+37 clientes" e "+30 empresas parceiras". Juntar com D2, D3 e D4, citando esses números.
- **N2.** Os materiais usam também o telefone (11) 95333-9965. O site usa o (11) 93466-1917 (`content/site.md`). Qual vale?
- **N3.** Um flyer de NR-1 diz que a 9vee faz "elaboração de PGR". O site diz que o PGR fica com a empresa e o SESMT (home, FAQ e página de NR-1). A 9vee elabora PGR? Se sim, muda o texto em quatro lugares.
- **N4.** Idiomas de interpretação: o site atual diz inglês, espanhol, mandarim, francês, italiano, crioulo haitiano e coreano (`content/traducao-simultanea.md`). O Canva cita árabe, e intérpretes de Libras e de ASL, que o site não menciona. Qual é a lista de hoje?
- **N5.** Interpretação remota pelo Zoom e por telefone (OPI) aparecem na apresentação. Posso oferecer as duas na página?
- **N6.** O flyer "Inglês Acessível" atende faculdades e órgãos públicos. Esse público ainda é atendido? Se sim, é um bloco na página de cursos, não uma página.
- **N7.** Os one-pagers trazem o endereço da Rua Dona Teresa Margarida. Só para registro: o site continua sem endereço, como a spec decidiu.
- **N8.** A Linguae e a Lenguae têm alguma relação com a 9vee? A lista de idiomas e o tempo de mercado são quase iguais.

As novas N1 a N8 ficam com a Daniella. Nenhuma trava ticket da semana 3 que já não estivesse travado.

## 4. O que entra nos tickets que já existem

Sem hora nova: é o conteúdo que o ticket já previa, agora com fonte. Tudo continua com `[CONFIRMAR COM A DANIELLA: ...]` até ela responder, pela regra de `docs/padroes.md`.

### Ticket 05, Tradução Simultânea

Arquivos: `content/traducao-simultanea.md`, `src/pages/traducao-simultanea.astro`, o esquema `parciais` (ou um próprio) em `src/content.config.ts`, `src/lib/jsonld.ts`.

- **Formatos:** manter simultânea, consecutiva e acompanhamento, e acrescentar remota (Zoom, com um canal de áudio por idioma) e por telefone, se N5 confirmar. Libras e ASL, se N4 confirmar.
- **"Como montar o pedido":** idiomas, formato, duração e presencial ou online. A regra do revezamento vira FAQ ("o intérprete trabalha até 1 hora seguida; acima disso, entram dois").
- **O pedido de tradução** (`formularios.traducao`, em `content/site.md`) pergunta idiomas, data, formato, pessoas e cidade, mas não a duração, que é o que decide se vai um intérprete ou dois. Vale acrescentar um campo de escolha ("Até 1 hora", "Meio período", "Dia inteiro", "Mais de um dia"). A lista de idiomas do mesmo passo segue a resposta de N4.
- **Seção de mandarim no mercado financeiro,** que o ticket já prevê, com o texto dos one-pagers. Título pronto: "Quando o negócio fala mandarim, precisão não é opcional."
- **Cases:** Itaú, Santander, TOTVS, Unicef e Array, uma linha cada, conforme D17. Os logos, só com autorização, pelo `LogoEmpresa`.
- **FAQ próprio,** no estilo da UP: simultânea ou consecutiva, online, equipamento, duração, confidencialidade, prazo. `FAQPage` no JSON-LD, como o ticket pede.

### Ticket 06, LMS

Arquivos: `content/lms.md`, `src/pages/lms.astro`.

- **Como funciona:** sala de aula invertida, trilhas no app, estudo no ritmo de cada um e aula ao vivo quando contratada.
- **"O que o RH recebe":** relatório por colaborador, com tempo de estudo e desempenho. É a seção que a Fala Company usa melhor.
- **IA e WhatsApp:** o plantão de dúvidas 24 horas.
- As três perguntas que dimensionam o pedido continuam, como o ticket pede.
- Telas da plataforma, só se D21 liberar a EdApp.
- De quebra, a pendência do card de LMS em `content/home.md` sai com o mesmo texto.

### Ticket 07, Quem Somos

Arquivo: `content/quem-somos.md`.

- **Os 3 pilares do portfólio:** customização, professores especialistas e conteúdo afunilado, com a ideia de fundo ("o erro do mercado é ser genérico; a 9vee faz diagnóstico por cliente").
- **Dois jeitos de atender empresa:** contratada direto, ou como benefício para os colaboradores (o caso da FGV).
- **Nomes de clientes,** conforme D17.
- A descrição do SEO e o apoio do hero ainda dizem "sede em São Paulo". O ticket já manda tirar; fica registrado aqui para não passar.

### Aplicação das respostas nas páginas fechadas (tickets 04 e 17)

- **NR-1** (`content/treinamento-nr-1.md`): se D12 confirmar, "O que a sua empresa recebe" ganha o roteiro de 90 dias, que nenhum dos três concorrentes mostra. Se D15 confirmar, a página ganha o caso do Sicredi, que resolve a maior fraqueza anotada em `docs/andamento.md` ("a página de NR-1 não tem nenhuma prova"). Os temas do workshop (os 6 riscos do modelo HSE, a ferramenta ROC, o compromisso "One Thing") podem detalhar os módulos 2 e 3, se forem do programa padrão e não só do Sicredi.
- **Home:** o card de LMS (D21), a faixa de números (N1) e o "Como funciona", etapa 3, com o prazo da proposta (D6).
- **Tempo de resposta perto do pedido:** quando D6 responder, a frase entra também na confirmação do drawer e no `ctaFinal` (`content/site.md` e `content/home.md`). É texto, não componente.

### Ticket 11, cidades, e ticket 15, SEO final

Nada muda. Os concorrentes só confirmam a decisão: a Berlitz tem página por cidade com FAQ local, e a Linguae tem uma página antiga de tradução em 404, o erro que o ticket 14 evita.

## 5. Trabalho novo, fora do escopo

Vão para `docs/pedidos-fora-do-escopo.md`, com data e estimativa, como a regra da Fase 1 manda. Não há folga no cronograma para eles.

| Pedido | O que é | Estimativa | Depende de |
|---|---|---|---|
| Faixa de logos na home | Uma linha de logos de clientes logo depois dos números, reaproveitando o `LogoEmpresa`, com a lista em `content/home.md` e o esquema em `src/content.config.ts` | 2 h (mais os SVGs de cada marca) | Autorização de cada empresa (D17) |
| Teste de nivelamento online | Perguntas por nível, resultado na escala do A1 ao C2 e o pedido aberto com o nível marcado | 10 a 14 h | O banco de perguntas, com o Arthur |
| Segundo botão, mais leve | "Conversar sem compromisso" ao lado do "Pedir orçamento", abrindo o mesmo drawer com outro título | 1,5 h | A Daniella querer |

A faixa de logos é o de maior impacto por hora: é a prova social que mais pesa nos concorrentes e custa pouco, porque o componente já existe. O teste de nivelamento é o de maior impacto em leads, mas é um produto: dá para orçar como aditivo ou dentro do acompanhamento mensal.

Ficam para o acompanhamento mensal, e não para o site agora: preço "a partir de" (depende de D7), nota das avaliações do Google (depende do Perfil da Empresa) e nivelamento para seleção de candidatos (é serviço novo da 9vee, não página).

## 6. O que não fazer

- **Não usar as fotos do Canva.** São de banco de imagens, não mostram a equipe, e a licença do Canva cobre o uso dentro do design, não a foto solta no site. As imagens continuam do Gemini (ticket 16).
- **Não usar os valores de multa do flyer** (de R$ 670 a mais de R$ 40.000 por item) sem fonte oficial. A página de NR-1 só cita o gov.br e o Planalto.
- **Não publicar endereço,** mesmo que os one-pagers tragam.
- **Não fazer as versões em inglês, espanhol e chinês** agora, mesmo com os one-pagers prontos. A spec deixa fora da Fase 1.
- **Não usar o material do Sicredi** (workshops e roteiro) com o nome do cliente sem a autorização de D15.

## 7. Ordem sugerida

1. Ajustar `docs/pendencias-cliente.md` com a seção 3 e mandar a mensagem.
2. Registrar os três pedidos da seção 5 em `docs/pedidos-fora-do-escopo.md` e oferecer a faixa de logos à Daniella junto com a mensagem.
3. Seguir o cronograma: 12 e 13 enquanto as respostas não chegam; 05, 06 e 07 na semana 3, já com o material do Canva no texto e as pendências marcadas.
