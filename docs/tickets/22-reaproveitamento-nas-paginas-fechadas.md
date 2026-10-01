# 22: Reaproveitamento nas páginas fechadas

**O que construir:** o que o mapa de `docs/textos-site-atual.md` marca como "fora" ou "parcial" nas páginas que já estavam fechadas: a home, o Treinamento de NR-1, Cursos de Idiomas e as páginas de idioma. O H1 da home aprovado no MVP fica.

**Depende de:** 04, 06, 09 e 10. A ponte para o LMS leva à página completa, e a realocação entra em duas páginas.

**Horas:** 7,5. **Semana:** 3.

**Situação:** ready-for-agent. Criado em 30/09/2026 pela decisão do reaproveitamento do site atual (spec, "Reaproveitamento do site atual"). Fecha o item que ficou aberto no ticket 04, a realocação.

**Home** (`docs/textos-site-atual.md`, seção 3.1):

- [ ] Os três diferenciais, numa seção nova, abaixo da primeira dobra:
  - aulas que vão além do ensino tradicional, com a comunicação real que dá autonomia a famílias imigrantes;
  - professores qualificados, no presencial e no remoto, com tecnologia educacional;
  - o diagnóstico do perfil de cada aluno e o programa montado a partir dele.
- [ ] A frase do contato ("grandes resultados começam com uma boa conversa") no CTA do fim.
- [ ] "Seu próximo capítulo de sucesso começa agora" no rodapé, em caixa normal. O rodapé é o de todas as páginas.
- [ ] As seis redes no rodapé e no `sameAs`: já estão. Entra o teste que exige as seis.
- [ ] Nada novo na primeira dobra: a home está no limite do LCP.

**Treinamento de NR-1** (seção 3.7):

- [ ] O objetivo do treinamento.
- [ ] Os seis temas, com a Comunicação Não Violenta (CNV).
- [ ] Os dois blocos de benefícios:
  - os do treinamento: menos riscos psicossociais, relações mais saudáveis e colaborativas, clima e cooperação entre áreas;
  - os de quem investe: segurança psicológica, prevenção de estresse crônico, ansiedade e burnout, cultura de cuidado, diálogo e responsabilidade compartilhada.
- [ ] O subtítulo do módulo 2: liderança, comunicação com equipes comerciais e cultura da empresa.

**Cursos de Idiomas** (seção 3.3):

- [ ] Professores e metodologia: aulas dinâmicas, interativas e personalizadas, com prática de conversação.
- [ ] Flexibilidade: você escolhe o dia e o horário.
- [ ] Desenvolvimento contínuo, com cada etapa planejada.
- [ ] Empresas e in company: novos mercados e negociação internacional. Os "cursos online em 12 idiomas" entram com a pendência de conflito do número de idiomas.
- [ ] Aulas individuais para executivos, completas: reuniões, conference calls, negociações e apresentações; diagnóstico; plano personalizado; horários flexíveis.
- [ ] A ponte para o LMS (reduzir custo, centralizar a gestão, acompanhar em tempo real), com link para `/lms/`.
- [ ] Realocação de funcionários, como bloco na parte de empresas: idioma, legislação, documentação e adaptação cultural, para o colaborador e a família.
- [ ] Crianças e adolescentes, em resumo, com o texto completo na página de inglês.
- [ ] A introdução dos preparatórios (imigração, trabalho no exterior, universidades, mestrado e MBA) e o texto completo de cada prova, em acordeão.
- [ ] A aula presencial existe: o site atual afirma, no segundo diferencial da home e na metodologia do LMS. As cidades continuam com o Arthur (pergunta 3).

**Páginas de idioma:**

- [ ] Inglês: crianças e adolescentes completo. Crianças num ambiente acolhedor, pela interação, pela curiosidade e pela experimentação; adolescentes com temas atuais, conversação e pensamento crítico; material da Cambridge University Press.
- [ ] Português para estrangeiros: o material didático, o ritmo das aulas e o "também para brasileiros", como o site atual diz. Mais o bloco de realocação.
- [ ] Francês: os professores nativos do TCF, que já estão na página; conferir.
- [ ] Cada prova com o texto completo na página do idioma dela: TOEFL no inglês, CELPE-Bras no português, DELE no espanhol, DELF, DALF e TCF no francês e Inburgering no holandês.
- [ ] Os três fatos do carrossel do site atual (crianças, português e preparatórios) conferidos nas páginas.

**O que fica fora, por decisão de 30/09/2026:**

- [ ] O texto completo dos depoimentos. A fala literal traz "Novee" e palavra proibida, que os testes barram. Os trechos ficam.
- [ ] A pendência do "lê-se Novee" continua no rodapé.
- [ ] Os números de clientes e de profissionais continuam pendentes.

**O que fica fora, por decisão de 01/10/2026:**

- [ ] As duas frases jurídicas da página de treinamentos: o PGR mal elaborado como prova em ação trabalhista ajuizada até 2046 (o "risco jurídico direto"), e o certificado da Lei 14.831 como prova de boas práticas em disputa judicial. Elas entravam com pendência e com a pergunta 37, que saiu da mensagem. O certificado continua na página como já está, sem a frase da prova.

**Desenho e fechamento** (os oito passos da spec, em "Como cada ticket do reaproveitamento fecha"):

- [ ] Seções desenhadas com a skill `frontend-design`, com `docs/padroes.md` acima dela. Previsto: os diferenciais da home abaixo da dobra, os seis temas do NR-1 em lista numerada grande e o acordeão das provas em Cursos.
- [ ] `humanizar` nos textos e `humanizar-ui` nas páginas; os prompts das imagens novas em `docs/imagens-gemini.md`.
- [ ] Testes do HTML gerado e do navegador de cada página mexida, o de larguras e o de JSON-LD; `npm test` e `npm run e2e` passando.
- [ ] Capturas no roteiro `ticket-22`, em 390 e 1280 px.
- [ ] Lighthouse: home, NR-1 e Cursos no build de produção; as páginas de idioma no build de preview, porque as não publicadas não entram na produção. Performance 95 ou mais, Acessibilidade 100, LCP abaixo de 2,0 s e CLS abaixo de 0,05.
- [ ] `code-review` nos dois eixos, com as correções em commits próprios.
- [ ] "Como ficou" aqui, o texto para o cliente em `docs/novidades-preview.md` e `docs/andamento.md` atualizado. Os lotes 1 e 3 são gerados de novo no fechamento do reaproveitamento. O preview não é publicado: o Maxwell publica depois de ver as capturas.
