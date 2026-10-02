# 22: Reaproveitamento nas páginas fechadas

**O que construir:** o que o mapa de `docs/textos-site-atual.md` marca como "fora" ou "parcial" nas páginas que já estavam fechadas: a home, o Treinamento de NR-1, Cursos de Idiomas e as páginas de idioma. O H1 da home aprovado no MVP fica.

**Depende de:** 04, 06, 09 e 10. A ponte para o LMS leva à página completa, e a realocação entra em duas páginas.

**Horas:** 7,5. **Semana:** 3.

**Situação:** feito e aprovado pelo Maxwell em 02/10/2026, adiantado da semana 3, no processo mais curto que ele pediu no mesmo dia: os textos e o layout, com os testes automáticos, sem as medições e sem a rodada de `code-review`. Na aprovação ele manteve os seis temas do NR-1 sem número. Os lotes 1, 2 e 3 saíram em seguida. Criado em 30/09/2026 pela decisão do reaproveitamento do site atual (spec, "Reaproveitamento do site atual"). Fecha o item que ficou aberto no ticket 04, a realocação. O preview não foi publicado: o Maxwell publica depois de ver as capturas.

**Home** (`docs/textos-site-atual.md`, seção 3.1):

- [x] Os três diferenciais, numa seção nova, abaixo da primeira dobra:
  - aulas que vão além do ensino tradicional, com a comunicação real que dá autonomia a famílias imigrantes;
  - professores qualificados, no presencial e no remoto, com tecnologia educacional;
  - o diagnóstico do perfil de cada aluno e o programa montado a partir dele.
- [x] A frase do contato ("grandes resultados começam com uma boa conversa") no CTA do fim.
- [x] "Seu próximo capítulo de sucesso começa agora" no rodapé, em caixa normal. O rodapé é o de todas as páginas.
- [x] As seis redes no rodapé e no `sameAs`: já estavam. Entrou o teste que exige as seis, em toda página.
- [x] Nada novo na primeira dobra: a home está no limite do LCP.

**Treinamento de NR-1** (seção 3.7):

- [x] O objetivo do treinamento.
- [x] Os seis temas, com a Comunicação Não Violenta (CNV).
- [x] Os dois blocos de benefícios:
  - os do treinamento: menos riscos psicossociais, relações mais saudáveis e colaborativas, clima e cooperação entre áreas;
  - os de quem investe: segurança psicológica, prevenção de estresse crônico, ansiedade e burnout, cultura de cuidado, diálogo e responsabilidade compartilhada.
- [x] O subtítulo do módulo 2: liderança, comunicação com equipes comerciais e cultura da empresa.

**Cursos de Idiomas** (seção 3.3):

- [x] Professores e metodologia: aulas dinâmicas, interativas e personalizadas, com prática de conversação.
- [x] Flexibilidade: você escolhe o dia e o horário.
- [x] Desenvolvimento contínuo, com cada etapa planejada.
- [x] Empresas e in company: novos mercados e negociação internacional. Os "cursos online em 12 idiomas" entraram com a pendência de conflito do número de idiomas.
- [x] Aulas individuais para executivos, completas: reuniões, conference calls, negociações e apresentações; diagnóstico; plano personalizado; horários flexíveis.
- [x] A ponte para o LMS (reduzir custo, centralizar a gestão, acompanhar em tempo real), com link para `/lms/`.
- [x] Realocação de funcionários, como bloco na parte de empresas: idioma, legislação, documentação e adaptação cultural, para o colaborador e a família.
- [x] Crianças e adolescentes, em resumo, com o texto completo na página de inglês.
- [x] A introdução dos preparatórios (imigração, trabalho no exterior, universidades, mestrado e MBA) e o texto completo de cada prova, em acordeão.
- [x] A aula presencial existe: o site atual afirma, no segundo diferencial da home e na metodologia do LMS. As cidades continuam com o Arthur (pergunta 3).

**Páginas de idioma:**

- [x] Inglês: crianças e adolescentes completo. Crianças num ambiente acolhedor, pela interação, pela curiosidade e pela experimentação; adolescentes com temas atuais, conversação e pensamento crítico; material da Cambridge University Press.
- [x] Português para estrangeiros: o material didático, o ritmo das aulas e o "também para brasileiros", como o site atual diz. Mais o bloco de realocação.
- [x] Francês: os professores nativos do TCF, que já estavam na página; conferido.
- [x] Cada prova com o texto completo na página do idioma dela: TOEFL no inglês, CELPE-Bras no português, DELE no espanhol, DELF, DALF e TCF no francês e Inburgering no holandês.
- [x] Os três fatos do carrossel do site atual (crianças, português e preparatórios) conferidos nas páginas.

**O que fica fora, por decisão de 30/09/2026:**

- [x] O texto completo dos depoimentos. A fala literal traz "Novee" e palavra proibida, que os testes barram. Os trechos ficam.
- [x] A pendência do "lê-se Novee" continua no rodapé.
- [x] Os números de clientes e de profissionais continuam pendentes.

**O que fica fora, por decisão de 01/10/2026:**

- [x] As duas frases jurídicas da página de treinamentos: o PGR mal elaborado como prova em ação trabalhista ajuizada até 2046 (o "risco jurídico direto"), e o certificado da Lei 14.831 como prova de boas práticas em disputa judicial. Elas entravam com pendência e com a pergunta 37, que saiu da mensagem. O certificado continua na página como já estava, sem a frase da prova. Um teste confere que as duas não voltam.

**Desenho e fechamento** (os oito passos da spec, em "Como cada ticket do reaproveitamento fecha"):

- [x] Seções desenhadas com `docs/padroes.md` e os componentes que já existiam, mais dois novos. A rodada formal da skill `frontend-design` ficou de fora, pelo processo curto. Mudou em relação ao previsto: os seis temas do NR-1 saíram sem número, para não brigar com os três módulos numerados logo abaixo.
- [x] Textos reescritos sem travessão e sem o vocabulário proibido, que o teste automático confere. O `humanizar-ui` formal ficou de fora, pelo processo curto. Nenhuma imagem nova: as seções deste ticket são de texto.
- [x] Testes do HTML gerado de cada página mexida e `npm test` passando. No navegador, só o teste de larguras, em todas as páginas, e o da troca de público. A suíte inteira ficou de fora, pelo processo curto.
- [x] Capturas no roteiro `ticket-22`, em 390 e 1280 px.
- [ ] Lighthouse: ficou de fora, pelo processo curto. Volta na revisão final (ticket 17).
- [ ] `code-review` nos dois eixos: ficou de fora, pelo processo curto. Volta na revisão final (ticket 17).
- [x] "Como ficou" aqui, o texto para o cliente em `docs/novidades-preview.md` e `docs/andamento.md` atualizado. Os lotes 1 e 3 foram gerados de novo, e o lote 2 saiu pela primeira vez, depois do ok do Maxwell. O preview não é publicado: o Maxwell publica depois de ver as capturas.

**Como ficou:**

- **Home:**
  - seção nova, "O que faz a 9vee diferente" (`#diferenciais`), logo depois do destaque de NR-1 e antes do "Como funciona", com os três diferenciais em tipo grande, um por linha;
  - o fechamento abre com "Grandes resultados começam com uma boa conversa.";
  - a primeira dobra não mudou.
- **Rodapé, em todas as páginas:** "Seu próximo capítulo de sucesso começa agora.", em tipo de título, acima dos direitos e do link da política. Um teste exige as seis redes do site atual no rodapé, iguais às do `sameAs`.
- **Treinamento de NR-1,** de oito para dez seções:
  - "O que o treinamento aborda" (`#temas`), depois de "O que a sua empresa recebe": o objetivo no apoio e os seis temas, com a Comunicação Não Violenta;
  - "O que muda na empresa" (`#beneficios`), depois dos módulos: os dois blocos de benefícios lado a lado, "Com o treinamento" e "Para quem investe em NR-1";
  - o módulo 2 diz "Liderança, comunicação com equipes comerciais e cultura da empresa.";
  - nenhuma pendência nova, e as duas frases jurídicas fora.
- **Cursos de Idiomas,** de oito para dez seções:
  - "Preparação para provas" virou acordeão: o nome de cada exame e uma linha ficam à vista, e o texto completo do site atual abre ao tocar, sem JavaScript. O apoio da seção é a introdução dos preparatórios;
  - "Como são as aulas" abre com os professores, a prática de conversação e a escolha do dia e do horário. O cartão de criança e adolescente resume o curso de inglês, e a nota diz "Também há aula presencial", com a pendência só das cidades;
  - "Para a sua equipe" fala de novos mercados e de negociação com outros países, e traz os "12 idiomas" com pendência. A aula para executivos ficou completa;
  - dois blocos novos dentro da parte de empresas, que trocam de lugar junto com ela quando o público muda: "Realocação de funcionários" (`#realocacao`) e a ponte para o LMS (`#plataforma`), com o link "Conhecer o LMS";
  - "Como começa" diz que cada etapa do curso é planejada.
- **Páginas de idioma:**
  - inglês: o curso de crianças e adolescentes completo, em três pontos (crianças, adolescentes e material da Cambridge);
  - português para estrangeiros: as quatro habilidades, o material didático e o ritmo das aulas, com o "também para brasileiros", e o bloco de realocação, que repete o texto da página de cursos (`realocacao: true` no arquivo da página);
  - francês: o DELF e o DALF com o nome por extenso, e o TCF com o CIEP. Saiu "usado em imigração e em universidade", que o site atual não diz do TCF;
  - inglês, português, espanhol e holandês: a seção da prova passou a ter dois itens, o exame e o preparatório;
  - os três fatos do carrossel do site atual estão nas páginas: as atividades lúdicas, no inglês; "do nível básico ao avançado", a gramática com a cultura e "estudar, trabalhar ou viver no Brasil", no português; e o foco nos critérios de cada prova, no francês e em Cursos.
- **Pendências:** uma marcação a mais, a dos "12 idiomas" (pergunta 3 da Daniella). São 108 em `content/`. A da aula presencial ficou só com as cidades (pergunta 3 do Arthur).
- **Componentes novos:**
  - `Acordeao`: nomes que abrem, em `<details>`, com uma linha à vista e o texto inteiro dentro. Fica fora do `.faq`, que o `FAQPage` repete;
  - `GruposDePontos`: listas de pontos lado a lado, cada uma com o rótulo dela. A `ListaCorrida` não serviu: com nomes de três ou quatro palavras, ela quebrava um por linha e deixava a meia-lua solta no fim.
- **Componentes reaproveitados:** `ListaGrande` (os diferenciais), `Definicoes` (os temas) e `Chamada` (a realocação, com os pontos, e a ponte para o LMS, com o link).
- **Testes:** `npm test` com 151 unitários e 1.150 do HTML gerado (eram 1.089). No navegador, o de larguras em todas as páginas, por causa do rodapé, e o da troca de público: 156 passaram.
- **Capturas:** `relatorios/ticket-22/`, por `node scripts/screenshots.ts ticket-22`. São 55: a home, o NR-1 e Cursos inteiros e por seção, os exames abertos, o rodapé, Cursos como a empresa vê e as cinco páginas de idioma inteiras.
- **Lotes de revisão,** em `docs/revisao-daniella/`, gerados em 02/10 depois do ok: o lote 1 (home, NR-1, Cursos e os textos de todas as páginas) e o lote 3 (os seis idiomas com texto) saíram de novo, com o que este ticket mudou. O lote 2 é novo: Tradução Simultânea, Interpretação de Mandarim, LMS, Quem Somos, Política de Privacidade e a página de erro. Ele entrou em `scripts/lote-revisao.ts`, e fecha o item que estava aberto no ticket 08.
- **O que ficou de fora, a pedido do Maxwell em 02/10:** o Lighthouse, a suíte de navegador inteira, a comparação de capturas das outras páginas, o `code-review` nos dois eixos e as rodadas formais do `frontend-design` e do `humanizar-ui`. Entram na revisão final (ticket 17), junto com duas repetições de CSS que este ticket deixou: o abre e fecha do `Acordeao`, igual ao do `Faq`, e mais uma cópia do marcador de meia-pílula.
