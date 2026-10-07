---
marca:
  nome: "9vee"
  nomeAlternativo: "Novee"
  # O nome do Perfil da Empresa no Google e a razão social (perguntas 17, 18 e 19, respondidas em 05/10/2026).
  nomeComercial: "Novee Learning Solutions"
  razaoSocial: "CLOUD9 LEARNING LTDA"
  resumo: "A 9vee ensina idiomas, leva intérpretes a eventos e dá treinamento de NR-1 sobre saúde mental no trabalho."

contato:
  whatsapp: "5511934661917"
  whatsappExibicao: "(11) 93466-1917"
  email: "contato@9vee.com.br"
  # O endereço do Perfil da Empresa no Google, igual a ele, no rodapé e no JSON-LD. Sem "venha nos visitar".
  endereco:
    rua: "R. Dona Teresa Margarida, 66"
    bairro: "Vila Clementino"
    cidade: "São Paulo"
    uf: "SP"
    cep: "04037-040"

cidades:
  - "São Paulo"
  - "Rio de Janeiro"
  - "Curitiba"
  - "Brasília"

# Os 14 idiomas, por família, na ordem de procura que a proposta aponta (inglês, espanhol, mandarim). Desde
# 05/10/2026, sem o romeno e com o cantonês (Idiomas 1).
familias:
  - id: "germanicas"
    nome: "Germânicas"
    descricao: "O inglês e as línguas do centro e do norte da Europa."
  - id: "romanicas"
    nome: "Românicas"
    descricao: "Vieram do latim, como o português."
  - id: "outras"
    nome: "De outras famílias"
    descricao: "Cada uma com a sua escrita."

idiomas:
  - { slug: "ingles", nome: "Inglês", saudacao: "Hello", lang: "en", familia: "germanicas" }
  - { slug: "alemao", nome: "Alemão", saudacao: "Hallo", lang: "de", familia: "germanicas" }
  - { slug: "holandes", nome: "Holandês", saudacao: "Hoi", lang: "nl", familia: "germanicas" }
  - { slug: "sueco", nome: "Sueco", saudacao: "Hej", lang: "sv", familia: "germanicas" }
  - { slug: "noruegues", nome: "Norueguês", saudacao: "Hei", lang: "nb", familia: "germanicas" }
  - { slug: "espanhol", nome: "Espanhol", saudacao: "Hola", lang: "es", familia: "romanicas" }
  - { slug: "frances", nome: "Francês", saudacao: "Bonjour", lang: "fr", familia: "romanicas" }
  - { slug: "italiano", nome: "Italiano", saudacao: "Ciao", lang: "it", familia: "romanicas" }
  - { slug: "portugues", nome: "Português para estrangeiros", saudacao: "Olá", lang: "pt", familia: "romanicas" }
  - { slug: "mandarim", nome: "Mandarim", saudacao: "你好", lang: "zh-Hans", familia: "outras" }
  # O olá de Hong Kong, em caracteres tradicionais: o 你好 do mandarim seria a mesma saudação na tela.
  - { slug: "cantones", nome: "Cantonês", saudacao: "哈囉", lang: "zh-Hant-HK", familia: "outras" }
  - { slug: "japones", nome: "Japonês", saudacao: "こんにちは", lang: "ja", familia: "outras" }
  - { slug: "arabe", nome: "Árabe", saudacao: "مرحبا", lang: "ar", dir: "rtl", familia: "outras" }
  - { slug: "russo", nome: "Russo", saudacao: "Привет", lang: "ru", familia: "outras" }

redes:
  - nome: "Instagram"
    icone: "instagram"
    url: "https://www.instagram.com/9veeoficial"
  - nome: "LinkedIn"
    icone: "linkedin"
    url: "https://www.linkedin.com/company/9vee-learning-solutions"
  - nome: "YouTube"
    icone: "youtube"
    url: "https://www.youtube.com/@9veeoficial"
  - nome: "TikTok"
    icone: "tiktok"
    url: "https://www.tiktok.com/@9veeoficial"
  - nome: "Facebook"
    icone: "facebook"
    url: "https://www.facebook.com/9veeoficial"
  - nome: "X"
    icone: "x"
    url: "https://x.com/9veeoficial"

menu:
  pularParaConteudo: "Pular para o conteúdo"
  rotuloNavegacao: "Principal"
  abrir: "Menu"
  fechar: "Fechar menu"
  inicio: "Página inicial da 9vee"
  grupos:
    - id: "empresas"
      rotulo: "Empresas"
      itens:
        - rotulo: "Idiomas para equipes"
          descricao: "Aulas in company e online"
          href: "/curso-de-idiomas/#empresas"
        - rotulo: "Tradução simultânea"
          descricao: "Intérpretes para eventos e reuniões"
          href: "/traducao-simultanea/"
        - rotulo: "Treinamento de NR-1"
          descricao: "Saúde mental e riscos psicossociais no trabalho"
          href: "/treinamento-nr-1/"
        - rotulo: "LMS"
          descricao: "Plataforma de cursos para a sua equipe"
          href: "/lms/"
    - id: "para-voce"
      rotulo: "Para você"
      itens:
        - rotulo: "Cursos de idiomas"
          descricao: "Inglês, espanhol, mandarim e outras línguas"
          href: "/curso-de-idiomas/"
        - rotulo: "Aulas particulares"
          descricao: "Um professor só para você"
          href: "/curso-de-idiomas/#particular"
        - rotulo: "Preparação para provas"
          descricao: "TOEFL, DELE, DELF, CELPE-Bras e outras"
          href: "/curso-de-idiomas/#provas"
  quemSomos:
    rotulo: "Quem somos"
    href: "/quem-somos/"

# A trilha de navegação no alto das páginas internas: Início, e cada nível do endereço até a página, com o
# nome que ele tem no menu acima. O rótulo é o que o leitor de tela anuncia antes da trilha.
trilha:
  rotulo: "Você está aqui"
  inicio: "Início"

# Sem escolha de público, o botão serve aos dois: "orçamento" é palavra de quem compra para a empresa. O neutro
# cabe no cabeçalho de 360 px numa linha só, como os outros dois.
cta:
  neutro: "Quero conversar"
  empresa: "Pedir orçamento"
  voce: "Quero estudar"

# Ordem dos serviços por público, na home e no drawer. Sem escolha, vale a de empresa.
# Desde 23/09/2026 é a mesma para os dois públicos, a que a cliente pediu: idiomas, tradução, NR-1 e LMS.
servicos:
  - { id: "idiomas", nome: "Cursos de idiomas", descricao: "Aula online, particular ou em grupo, e turmas na empresa", ordemEmpresa: 1, ordemVoce: 1 }
  - { id: "traducao", nome: "Tradução simultânea", descricao: "Intérpretes em cabine ou ao lado de executivos", ordemEmpresa: 2, ordemVoce: 2 }
  - { id: "nr1", nome: "Treinamento de NR-1", descricao: "Saúde mental e riscos psicossociais para RH, SESMT e liderança", ordemEmpresa: 3, ordemVoce: 3 }
  - { id: "lms", nome: "LMS", descricao: "Plataforma de estudo para a equipe da empresa", ordemEmpresa: 4, ordemVoce: 4 }

# Nome de cada página na mensagem do WhatsApp ("Vim pela página ... do site") e o pedido do botão flutuante, por público.
# O pedido geral (&pedidoGeral) vale para as páginas que não são de um serviço: a home, o Quem Somos, a política e a 404.
paginas:
  home:
    nome: "inicial"
    assunto: &pedidoGeral { neutro: "quero pedir um orçamento", empresa: "quero um orçamento para a minha empresa", voce: "quero saber das aulas de idioma para mim" }
  nr1:
    nome: "Treinamento de NR-1"
    servico: "nr1"
    assunto: { neutro: "quero saber do treinamento de NR-1", empresa: "quero um orçamento do treinamento de NR-1 para a minha empresa", voce: "quero saber do treinamento de NR-1 para mim" }
  idiomas:
    nome: "Cursos de Idiomas"
    servico: "idiomas"
    assunto: { neutro: "quero saber dos cursos de idiomas", empresa: "quero aulas de idioma para a minha equipe", voce: "quero aulas de idioma para mim" }
  # Modelo das páginas de idioma: o {idioma} vira o nome dele, em minúscula no meio da frase.
  idioma:
    nome: "Curso de {idioma}"
    servico: "idiomas"
    assunto: { neutro: "quero saber das aulas de {idioma}", empresa: "quero aulas de {idioma} para a minha equipe", voce: "quero aulas de {idioma} para mim" }
  traducao:
    nome: "Tradução Simultânea"
    servico: "traducao"
    assunto: { neutro: "quero tradução simultânea para um evento", empresa: "quero tradução simultânea para um evento da minha empresa", voce: "quero tradução simultânea para um evento particular" }
  # O pedido aberto na página de interpretação de mandarim já traz a tradução simultânea e, nos idiomas do evento, o
  # mandarim. Ela promete o prazo da landing do site atual, abaixo dos botões. Nas outras, o prazo fica só na
  # confirmação do pedido (drawer.confirmacao), com a resposta da pergunta 6.
  interpretacaoDeMandarim:
    nome: "Interpretação de Mandarim"
    servico: "traducao"
    marcadas: { idiomas: ["Mandarim"] }
    prazo: "A 9vee responde em até um dia útil."
    assunto: { neutro: "quero um intérprete de mandarim", empresa: "quero um intérprete de mandarim para a minha empresa", voce: "quero um intérprete de mandarim para um evento particular" }
  # Modelos das páginas de cidade: o {naCidade} vira o nome dela com a preposição ("em São Paulo", "no Rio de
  # Janeiro"). A página da cidade tem mais de um serviço, então o pedido dela começa pela escolha do serviço.
  cidade:
    nome: "Atendimento {naCidade}"
    assunto: { neutro: "quero um orçamento {naCidade}", empresa: "quero um orçamento para a minha empresa {naCidade}", voce: "quero um orçamento para mim {naCidade}" }
  traducaoNaCidade:
    nome: "Tradução simultânea {naCidade}"
    servico: "traducao"
    assunto: { neutro: "quero tradução simultânea para um evento {naCidade}", empresa: "quero tradução simultânea para um evento da minha empresa {naCidade}", voce: "quero tradução simultânea para um evento particular {naCidade}" }
  lms:
    nome: "LMS"
    servico: "lms"
    assunto: { neutro: "quero saber do LMS", empresa: "quero o LMS para a minha equipe", voce: "quero saber do LMS para mim" }
  quemSomos:
    nome: "Quem Somos"
    assunto: *pedidoGeral
  privacidade:
    nome: "Política de Privacidade"
    assunto: *pedidoGeral
  erro404:
    nome: "de erro"
    assunto: *pedidoGeral

# Textos do pedido de contato (o drawer). O título muda quando a pessoa monta as próprias aulas.
drawer:
  titulo: { orcamento: "Pedir orçamento", aulas: "Montar suas aulas" }
  fechar: "Fechar"
  voltar: "Voltar"
  continuar: "Continuar"
  opcional: "(opcional)"
  passo: "Passo {n} de {total}"
  alterar: { rotulo: "Alterar", publico: "para quem é o pedido", servico: "o serviço", detalhes: "os detalhes" }
  botaoFlutuante: "Conversar no WhatsApp"
  publico:
    titulo: "É para sua empresa ou para você?"
    opcoes: { empresa: "Para a minha empresa", voce: "Para mim" }
  servico:
    titulo: "Qual serviço você procura?"
  detalhes:
    titulos: { nr1: "Sobre o treinamento", traducao: "Sobre o evento", lms: "Sobre a plataforma", idiomasEmpresa: "Sobre a turma", idiomasVoce: "Sobre as suas aulas" }
  final:
    titulo: "Como podemos te chamar?"
    rotuloNome: "Seu nome"
    tituloPedido: "Confira o pedido"
    whatsapp: "Falar agora no WhatsApp"
    receber: "Prefiro receber contato"
    rotuloContato: "Seu WhatsApp com DDD ou seu e-mail"
    # A caixa que a pessoa marca antes de enviar. O link fica no meio da frase e leva à política, no trecho do
    # pedido. A frase inteira vai no e-mail, como prova do que foi aceito.
    consentimento:
      legenda: "Privacidade"
      antes: "Li a"
      link: "política de privacidade"
      depois: "e concordo que a 9vee use estes dados para responder ao meu pedido."
    # A caixa que só robô marca. Pessoa não vê: o texto é para quem abrir o site sem o desenho.
    isca: "Não marque esta caixa"
    enviar: "Pedir contato"
    enviando: "Enviando"
  aberto:
    titulo: "Abrimos a conversa no WhatsApp."
    texto: "A mensagem já vai escrita com as suas respostas. Confira e envie por lá. Se o WhatsApp não abriu, use o link abaixo."
    link: "Abrir o WhatsApp de novo"
  confirmacao:
    titulo: "Pedido anotado."
    texto: "A proposta costuma sair no mesmo dia. Se o pedido chega no fim do dia, ela sai no dia seguinte."
    resumo: "O que você pediu:"
    rotuloServico: "Serviço"
    rotuloNome: "Nome"
    rotulosContato: { telefone: "WhatsApp", email: "E-mail" }
  # Quando o pedido não chega à 9vee: a tela diz e oferece o WhatsApp, com a mensagem já escrita.
  falha:
    titulo: "Não deu para enviar."
    texto: "O pedido não chegou à 9vee. Mande agora pelo WhatsApp, com a mensagem já escrita com as suas respostas, ou tente de novo."
    whatsapp: "Mandar pelo WhatsApp"
    tentar: "Tentar de novo"
  # O e-mail que o pedido vira. O assunto segue o formato que o comercial filtra:
  # "[Lead site] NR-1 | Empresa | Metalúrgica Exemplo".
  envio:
    remetente: "Site 9vee"
    assunto: "[Lead site] {servico} | {publico} | {quem}"
    servicos: { nr1: "NR-1", traducao: "Tradução simultânea", idiomas: "Idiomas", lms: "LMS" }
    publicos: { empresa: "Empresa", voce: "Pessoa física" }
    rotulos: { publico: "Público", pagina: "Página de origem", consentimento: "Consentimento", aceitoEm: "Aceito em" }
  erros:
    escolha: "Escolha uma das opções."
    multipla: "Escolha pelo menos uma opção."
    texto: "Preencha este campo."
    data: "Escolha uma data a partir de hoje ou marque que ainda não tem data."
    nome: "Escreva como podemos te chamar."
    contato: "Informe um WhatsApp com DDD ou um e-mail."
    consentimento: "Marque a caixa para enviar o pedido."
  mensagens:
    abertura: "Olá, 9vee. Vim pela página {pagina} do site{publico}."
    publico: { empresa: " e falo pela minha empresa", voce: " e é para mim" }
    pedido:
      nr1: "Quero um orçamento de treinamento de NR-1."
      traducao: "Quero um orçamento de tradução simultânea."
      idiomas: "Quero um orçamento de aulas de idioma."
      lms: "Quero um orçamento do LMS."
    nome: "Meu nome é {nome}."
    flutuante: "Olá, 9vee. Vim pela página {pagina} do site e {assunto}."

# Campos por serviço (seção 5 da proposta), com botões de escolha sempre que dá.
formularios:
  nr1:
    - { id: "empresa", tipo: "texto", rotulo: "Nome da empresa", rotuloCurto: "Empresa", erro: "Escreva o nome da empresa.", obrigatorio: true, autocomplete: "organization" }
    - { id: "colaboradores", tipo: "escolha", rotulo: "Quantos colaboradores a empresa tem?", rotuloCurto: "Colaboradores", obrigatorio: true, minuscula: true, opcoes: ["Até 50", "51 a 200", "201 a 1.000", "Mais de 1.000"] }
    - { id: "prazo", tipo: "escolha", rotulo: "Qual é o prazo para se adequar?", rotuloCurto: "Prazo de adequação", obrigatorio: true, minuscula: true, opcoes: ["O quanto antes", "Até 3 meses", "De 3 a 6 meses", "Ainda sem prazo"] }
    - { id: "formato", tipo: "escolha", rotulo: "Em que formato?", rotuloCurto: "Formato", obrigatorio: true, minuscula: true, opcoes: ["Presencial", "Online ao vivo", "Híbrido"] }
    - { id: "programa", tipo: "escolha", rotulo: "Já existe um programa de saúde mental ou de adequação à NR-1?", rotuloCurto: "Programa em andamento", obrigatorio: true, minuscula: true, opcoes: ["Sim", "Não", "Em construção"] }
  traducao:
    - { id: "empresa", tipo: "texto", rotulo: "Nome da empresa", rotuloCurto: "Empresa", erro: "Escreva o nome da empresa.", obrigatorio: true, opcionalPara: "voce", autocomplete: "organization" }
    - { id: "idiomas", tipo: "multipla", rotulo: "Quais idiomas o evento precisa?", rotuloCurto: "Idiomas", obrigatorio: true, minuscula: true, opcoes: ["Inglês", "Espanhol", "Mandarim", "Cantonês", "Francês", "Italiano", "Alemão", "Holandês", "Japonês", "Coreano", "Árabe", "Libras", "Outro"] }
    - { id: "data", tipo: "data", rotulo: "Quando é o evento?", rotuloCurto: "Data do evento", obrigatorio: true, semData: "Ainda sem data" }
    # A duração decide se vai um intérprete ou dois (o revezamento, pergunta 16 da Daniella).
    - { id: "duracao", tipo: "escolha", rotulo: "Quanto tempo dura o evento?", rotuloCurto: "Duração", obrigatorio: true, minuscula: true, opcoes: ["Até 1 hora", "Meio período", "Dia inteiro", "Mais de um dia"] }
    - { id: "formato", tipo: "escolha", rotulo: "Presencial ou online?", rotuloCurto: "Formato", obrigatorio: true, minuscula: true, opcoes: ["Presencial", "Online", "Híbrido"] }
    - { id: "participantes", tipo: "escolha", rotulo: "Quantas pessoas vão participar?", rotuloCurto: "Participantes", obrigatorio: true, minuscula: true, opcoes: ["Até 50", "51 a 200", "201 a 500", "Mais de 500"] }
    - { id: "cidade", tipo: "escolha", rotulo: "Em que cidade?", rotuloCurto: "Cidade", obrigatorio: true, opcoes: ["São Paulo", "Rio de Janeiro", "Curitiba", "Brasília", "Outra"], ocultarSe: { campo: "formato", valores: ["online"] } }
    - { id: "cidadeOutra", tipo: "texto", rotulo: "Qual cidade?", rotuloCurto: "Cidade", erro: "Escreva o nome da cidade.", obrigatorio: true, mostrarSe: { campo: "cidade", valores: ["outra"] }, autocomplete: "address-level2" }
  lms:
    - { id: "empresa", tipo: "texto", rotulo: "Nome da empresa", rotuloCurto: "Empresa", erro: "Escreva o nome da empresa.", obrigatorio: true, autocomplete: "organization" }
    - { id: "usuarios", tipo: "escolha", rotulo: "Quantas pessoas vão usar a plataforma?", rotuloCurto: "Usuários previstos", obrigatorio: true, minuscula: true, opcoes: ["Até 50", "51 a 200", "201 a 1.000", "Mais de 1.000"] }
    - { id: "plataforma", tipo: "escolha", rotulo: "A empresa já usa alguma plataforma de cursos?", rotuloCurto: "Plataforma atual", obrigatorio: true, minuscula: true, opcoes: ["Não usamos", "Já usamos uma", "Não sei"] }
    - { id: "conteudo", tipo: "multipla", rotulo: "Que conteúdo vai para a plataforma?", rotuloCurto: "Conteúdo", obrigatorio: true, minuscula: true, opcoes: ["Idiomas", "Treinamentos internos", "Integração de novos colaboradores", "Outro"] }
  idiomasEmpresa:
    - { id: "empresa", tipo: "texto", rotulo: "Nome da empresa", rotuloCurto: "Empresa", erro: "Escreva o nome da empresa.", obrigatorio: true, autocomplete: "organization" }
    - { id: "idioma", tipo: "idioma", rotulo: "Qual idioma?", rotuloCurto: "Idioma", obrigatorio: true, minuscula: true }
    - { id: "alunos", tipo: "escolha", rotulo: "Quantas pessoas vão estudar?", rotuloCurto: "Alunos", obrigatorio: true, minuscula: true, opcoes: ["1", "2 a 10", "11 a 50", "Mais de 50"] }
    - { id: "nivel", tipo: "escolha", rotulo: "Qual é o nível da turma?", rotuloCurto: "Nível", obrigatorio: true, minuscula: true, opcoes: ["Iniciante", "Intermediário", "Avançado", "Misto ou não sei"] }
    - { id: "formato", tipo: "escolha", rotulo: "Em que formato?", rotuloCurto: "Formato", obrigatorio: true, minuscula: true, opcoes: ["Presencial", "Online", "Híbrido"] }
  # Sem formato nem cidade: para quem estuda por conta própria, a aula é online. A presencial só acontece dentro de
  # empresas, em São Paulo e no Rio de Janeiro (Idiomas 3, respondida em 05/10/2026).
  idiomasVoce:
    - { id: "idioma", tipo: "idioma", rotulo: "Qual idioma você quer estudar?", rotuloCurto: "Idioma", obrigatorio: true, minuscula: true }
    - { id: "objetivo", tipo: "escolha", rotulo: "Para quê?", rotuloCurto: "Objetivo", obrigatorio: true, minuscula: true, opcoes: ["Carreira", "Viagem", "Prova de proficiência", "Mudança de país"] }
    - { id: "nivel", tipo: "escolha", rotulo: "Qual é o seu nível hoje?", rotuloCurto: "Nível atual", obrigatorio: true, minuscula: true, opcoes: ["Nunca estudei", "Básico", "Intermediário", "Avançado", "Não sei"] }

# O aviso das páginas de idioma e de cidade que ainda não vão para o site. Só aparece no local e no preview, porque
# a produção sai sem elas.
naoPublicada: "Fora do site até vocês responderem"

# Pendências: o [CONFIRMAR COM A DANIELLA: ...] ou o [CONFIRMAR COM O ARTHUR: ...] dos textos vira esta etiqueta.
pendencia:
  etiqueta: "a confirmar"
  detalhe: "com {quem}: {nota}"
  quem:
    daniella: "a Daniella"
    arthur: "o Arthur"

rodape:
  # A frase que fecha o rodapé do site atual, em caixa normal.
  frase: "Seu próximo capítulo de sucesso começa agora."
  pronuncia: "9vee, lê-se Novee."
  atendimento: "Aulas online para todo o Brasil. Tradução presencial em São Paulo, Rio de Janeiro, Curitiba e Brasília."
  tituloContato: "Contato"
  rotuloWhatsapp: "WhatsApp"
  tituloRedes: "A 9vee nas redes"
  rotuloRede: "9vee no {rede}"
  rotuloNavegacao: "Rodapé"
  # Links que só o rodapé tem, no fim do grupo do menu indicado. A interpretação de mandarim fica fora do menu, e a
  # trilha dela continua com o nome que a própria página dá ("Mandarim"), e não com este rótulo.
  soNoRodape:
    - grupo: "empresas"
      rotulo: "Interpretação de mandarim"
      href: "/traducao-simultanea/mandarim/"
  # A política também dá o nome do último passo da trilha dela, porque não está no menu.
  privacidade:
    rotulo: "Política de privacidade"
    href: "/politica-de-privacidade/"
  direitos: "© 2026 9vee"

# O aviso de cookies (ticket 13): aparece até a pessoa responder, e de novo quando a versão sobe. Mudou o texto do
# aviso ou o que o site mede, suba a versão: a resposta antiga deixa de valer. "Aceitar" e "Recusar" têm o mesmo
# peso na tela. O rótulo do rodapé é o que a política cita, entre aspas.
cookies:
  versao: 1
  rotulo: "Aviso de cookies"
  titulo: "Cookies de estatística"
  texto: "Se você aceitar, o site usa o Google Analytics para contar as visitas e os pedidos, sem o seu nome e o seu contato. Se recusar, nada é medido. Os detalhes estão na [política de privacidade](/politica-de-privacidade/#estatistica)."
  aceitar: "Aceitar"
  recusar: "Recusar"
  preferencias: "Preferências"
  salvar: "Salvar escolha"
  categorias:
    legenda: "O que o site pode usar"
    necessarios:
      nome: "Necessários"
      texto: "Guardam no seu navegador a escolha entre empresa e você e a resposta a este aviso. Ficam sempre ligados."
    estatistica:
      nome: "Estatística"
      texto: "O Google Analytics conta as visitas, os pedidos e as conversas pelo WhatsApp, por serviço e por página."
  rodape: "Preferências de cookies"

erro404:
  titulo: "Página não encontrada | 9vee"
  descricao: "O endereço que você abriu não existe no site da 9vee. Volte para a página inicial ou use o menu para achar idiomas, tradução simultânea, NR-1 e LMS."
  h1: "Esta página não existe"
  texto: "O link pode estar quebrado ou a página mudou de lugar. Os serviços da 9vee estão logo abaixo."
  rotuloCaminhos: "Serviços da 9vee"
  voltar: "Voltar para a página inicial"
---
