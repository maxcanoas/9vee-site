---
marca:
  nome: "9vee"
  nomeAlternativo: "Novee"
  resumo: "Idiomas, intérpretes e treinamento de NR-1 para empresas e para você."
  sede: "São Paulo"
  sedeUf: "SP"

contato:
  whatsapp: "5511934661917"
  whatsappExibicao: "(11) 93466-1917"
  email: "contato@9vee.com.br"

cidades:
  - "São Paulo"
  - "Rio de Janeiro"
  - "Curitiba"
  - "Brasília"

# Os 14 idiomas do site atual, por família, na ordem de procura que a proposta aponta (inglês, espanhol, mandarim).
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
  - { slug: "romeno", nome: "Romeno", saudacao: "Bună", lang: "ro", familia: "romanicas" }
  - { slug: "mandarim", nome: "Mandarim", saudacao: "你好", lang: "zh-Hans", familia: "outras" }
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
        - rotulo: "Treinamento de NR-1"
          descricao: "Saúde mental e riscos psicossociais no trabalho"
          href: "/treinamento-nr-1/"
        - rotulo: "Tradução simultânea"
          descricao: "Intérpretes para eventos e reuniões"
          href: "/traducao-simultanea/"
        - rotulo: "LMS"
          descricao: "Plataforma de cursos para a sua equipe"
          href: "/lms/"
        - rotulo: "Idiomas para equipes"
          descricao: "Aulas in company e online"
          href: "/curso-de-idiomas/#empresas"
    - id: "para-voce"
      rotulo: "Para você"
      itens:
        - rotulo: "Cursos de idiomas"
          descricao: "Inglês, espanhol, mandarim e outras línguas"
          href: "/curso-de-idiomas/"
        - rotulo: "Aulas particulares"
          descricao: "Aula individual, no horário que você escolhe"
          href: "/curso-de-idiomas/#particular"
        - rotulo: "Preparação para provas"
          descricao: "TOEFL, DELE, DELF, CELPE-Bras e outras"
          href: "/curso-de-idiomas/#provas"
  quemSomos:
    rotulo: "Quem somos"
    href: "/quem-somos/"

cta:
  neutro: "Pedir orçamento"
  empresa: "Pedir orçamento"
  voce: "Quero estudar"

# Ordem dos serviços por público, na home e no drawer. Sem escolha, vale a de empresa.
servicos:
  - { id: "nr1", nome: "Treinamento de NR-1", descricao: "Saúde mental e riscos psicossociais para RH, SESMT e liderança", ordemEmpresa: 1, ordemVoce: 3 }
  - { id: "traducao", nome: "Tradução simultânea", descricao: "Intérpretes para congressos, reuniões e visitas", ordemEmpresa: 2, ordemVoce: 2 }
  - { id: "idiomas", nome: "Cursos de idiomas", descricao: "Aula particular, online ou para a equipe inteira", ordemEmpresa: 3, ordemVoce: 1 }
  - { id: "lms", nome: "LMS", descricao: "Plataforma de estudo com trilhas e relatórios para o RH", ordemEmpresa: 4, ordemVoce: 4 }

# Nome de cada página na mensagem do WhatsApp ("Vim pela página ... do site") e assunto do botão flutuante.
paginas:
  home:
    nome: "inicial"
    assunto: { neutro: "os serviços da 9vee", empresa: "um serviço para a minha empresa", voce: "aulas de idioma para mim" }
  nr1:
    nome: "Treinamento de NR-1"
    servico: "nr1"
    assunto: { neutro: "o treinamento de NR-1", empresa: "o treinamento de NR-1 para a minha empresa", voce: "o treinamento de NR-1" }
  idiomas:
    nome: "Cursos de Idiomas"
    servico: "idiomas"
    assunto: { neutro: "os cursos de idiomas", empresa: "aulas de idioma para a minha equipe", voce: "aulas de idioma para mim" }
  traducao:
    nome: "Tradução Simultânea"
    servico: "traducao"
    assunto: { neutro: "tradução simultânea para um evento", empresa: "tradução simultânea para um evento da minha empresa", voce: "tradução simultânea para um evento" }
  lms:
    nome: "LMS"
    servico: "lms"
    assunto: { neutro: "o LMS", empresa: "o LMS para a minha equipe", voce: "o LMS" }
  quemSomos:
    nome: "Quem Somos"
    assunto: { neutro: "os serviços da 9vee", empresa: "um serviço para a minha empresa", voce: "aulas de idioma para mim" }
  especime:
    nome: "de espécime visual"
    assunto: { neutro: "os serviços da 9vee", empresa: "um serviço para a minha empresa", voce: "aulas de idioma para mim" }
  erro404:
    nome: "de erro"
    assunto: { neutro: "os serviços da 9vee", empresa: "um serviço para a minha empresa", voce: "aulas de idioma para mim" }

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
    titulo: "Conte um pouco mais"
  final:
    titulo: "Como podemos te chamar?"
    rotuloNome: "Seu nome"
    tituloPedido: "Confira o pedido"
    whatsapp: "Falar agora no WhatsApp"
    receber: "Prefiro receber contato"
    rotuloContato: "Seu WhatsApp com DDD ou seu e-mail"
    enviar: "Pedir contato"
  aberto:
    titulo: "Abrimos a conversa no WhatsApp."
    texto: "A mensagem já vai escrita com as suas respostas. Confira e envie por lá. Se o WhatsApp não abriu, use o link abaixo."
    link: "Abrir o WhatsApp de novo"
  confirmacao:
    titulo: "Pedido anotado."
    texto: "A equipe da 9vee responde em [CONFIRMAR COM A DANIELLA: prazo de resposta do comercial]."
    resumo: "O que você pediu:"
    rotuloServico: "Serviço"
    rotuloNome: "Nome"
    rotulosContato: { telefone: "WhatsApp", email: "E-mail" }
    simulado: "MVP: envio simulado. No site final, este pedido chega à equipe por e-mail."
  erros:
    escolha: "Escolha uma das opções."
    multipla: "Escolha pelo menos uma opção."
    texto: "Preencha este campo."
    data: "Escolha uma data a partir de hoje ou marque que ainda não tem data."
    nome: "Escreva como podemos te chamar."
    contato: "Informe um WhatsApp com DDD ou um e-mail."
  mensagens:
    abertura: "Olá, 9vee. Vim pela página {pagina} do site{publico}."
    publico: { empresa: " e falo pela minha empresa", voce: " e é para mim" }
    pedido:
      nr1: "Quero um orçamento de treinamento de NR-1."
      traducao: "Quero um orçamento de tradução simultânea."
      idiomas: "Quero um orçamento de aulas de idioma."
      lms: "Quero um orçamento do LMS."
    nome: "Meu nome é {nome}."
    flutuante: "Olá, 9vee. Vim pela página {pagina} do site e quero falar sobre {assunto}."

# Campos por serviço (seção 5 da proposta), com botões de escolha sempre que dá.
formularios:
  nr1:
    - { id: "empresa", tipo: "texto", rotulo: "Nome da empresa", rotuloCurto: "Empresa", obrigatorio: true, autocomplete: "organization" }
    - { id: "colaboradores", tipo: "escolha", rotulo: "Quantos colaboradores a empresa tem?", rotuloCurto: "Colaboradores", obrigatorio: true, minuscula: true, opcoes: ["Até 50", "51 a 200", "201 a 1.000", "Mais de 1.000"] }
    - { id: "prazo", tipo: "escolha", rotulo: "Qual é o prazo para se adequar?", rotuloCurto: "Prazo de adequação", obrigatorio: true, minuscula: true, opcoes: ["O quanto antes", "Até 3 meses", "De 3 a 6 meses", "Ainda sem prazo"] }
    - { id: "formato", tipo: "escolha", rotulo: "Em que formato?", rotuloCurto: "Formato", obrigatorio: true, minuscula: true, opcoes: ["Presencial", "Online ao vivo", "Híbrido"] }
    - { id: "programa", tipo: "escolha", rotulo: "Já existe um programa de saúde mental ou de adequação à NR-1?", rotuloCurto: "Programa em andamento", obrigatorio: true, minuscula: true, opcoes: ["Sim", "Não", "Em construção"] }
  traducao:
    - { id: "empresa", tipo: "texto", rotulo: "Nome da empresa", rotuloCurto: "Empresa", obrigatorio: true, opcionalPara: "voce", autocomplete: "organization" }
    - { id: "idiomas", tipo: "multipla", rotulo: "Quais idiomas o evento precisa?", rotuloCurto: "Idiomas", obrigatorio: true, minuscula: true, opcoes: ["Inglês", "Espanhol", "Mandarim", "Francês", "Italiano", "Crioulo haitiano", "Coreano", "Outro"] }
    - { id: "data", tipo: "data", rotulo: "Quando é o evento?", rotuloCurto: "Data do evento", obrigatorio: true, semData: "Ainda sem data" }
    - { id: "formato", tipo: "escolha", rotulo: "Presencial ou online?", rotuloCurto: "Formato", obrigatorio: true, minuscula: true, opcoes: ["Presencial", "Online", "Híbrido"] }
    - { id: "participantes", tipo: "escolha", rotulo: "Quantas pessoas vão participar?", rotuloCurto: "Participantes", obrigatorio: true, minuscula: true, opcoes: ["Até 50", "51 a 200", "201 a 500", "Mais de 500"] }
    - { id: "cidade", tipo: "escolha", rotulo: "Em que cidade?", rotuloCurto: "Cidade", obrigatorio: true, opcoes: ["São Paulo", "Rio de Janeiro", "Curitiba", "Brasília", "Outra"], ocultarSe: { campo: "formato", valores: ["online"] } }
    - { id: "cidadeOutra", tipo: "texto", rotulo: "Qual cidade?", rotuloCurto: "Cidade", obrigatorio: true, mostrarSe: { campo: "cidade", valores: ["outra"] }, autocomplete: "address-level2" }
  lms:
    - { id: "empresa", tipo: "texto", rotulo: "Nome da empresa", rotuloCurto: "Empresa", obrigatorio: true, autocomplete: "organization" }
    - { id: "usuarios", tipo: "escolha", rotulo: "Quantas pessoas vão usar a plataforma?", rotuloCurto: "Usuários previstos", obrigatorio: true, minuscula: true, opcoes: ["Até 50", "51 a 200", "201 a 1.000", "Mais de 1.000"] }
    - { id: "plataforma", tipo: "escolha", rotulo: "A empresa já usa alguma plataforma de cursos?", rotuloCurto: "Plataforma atual", obrigatorio: true, minuscula: true, opcoes: ["Não usamos", "Já usamos uma", "Não sei"] }
    - { id: "conteudo", tipo: "multipla", rotulo: "Que conteúdo vai para a plataforma?", rotuloCurto: "Conteúdo", obrigatorio: true, minuscula: true, opcoes: ["Idiomas", "Treinamentos internos", "Integração de novos colaboradores", "Outro"] }
  idiomasEmpresa:
    - { id: "empresa", tipo: "texto", rotulo: "Nome da empresa", rotuloCurto: "Empresa", obrigatorio: true, autocomplete: "organization" }
    - { id: "idioma", tipo: "idioma", rotulo: "Qual idioma?", rotuloCurto: "Idioma", obrigatorio: true, minuscula: true }
    - { id: "alunos", tipo: "escolha", rotulo: "Quantas pessoas vão estudar?", rotuloCurto: "Alunos", obrigatorio: true, minuscula: true, opcoes: ["1", "2 a 10", "11 a 50", "Mais de 50"] }
    - { id: "nivel", tipo: "escolha", rotulo: "Qual é o nível da turma?", rotuloCurto: "Nível", obrigatorio: true, minuscula: true, opcoes: ["Iniciante", "Intermediário", "Avançado", "Misto ou não sei"] }
    - { id: "formato", tipo: "escolha", rotulo: "Em que formato?", rotuloCurto: "Formato", obrigatorio: true, minuscula: true, opcoes: ["Presencial", "Online", "Híbrido"] }
  idiomasVoce:
    - { id: "idioma", tipo: "idioma", rotulo: "Qual idioma você quer estudar?", rotuloCurto: "Idioma", obrigatorio: true, minuscula: true }
    - { id: "objetivo", tipo: "escolha", rotulo: "Para quê?", rotuloCurto: "Objetivo", obrigatorio: true, minuscula: true, opcoes: ["Carreira", "Viagem", "Prova de proficiência", "Mudança de país"] }
    - { id: "nivel", tipo: "escolha", rotulo: "Qual é o seu nível hoje?", rotuloCurto: "Nível atual", obrigatorio: true, minuscula: true, opcoes: ["Nunca estudei", "Básico", "Intermediário", "Avançado", "Não sei"] }
    - { id: "formato", tipo: "escolha", rotulo: "Presencial ou online?", rotuloCurto: "Formato", obrigatorio: true, minuscula: true, opcoes: ["Presencial", "Online"] }
    - { id: "cidade", tipo: "escolha", rotulo: "Em que cidade?", rotuloCurto: "Cidade", obrigatorio: true, opcoes: ["São Paulo", "Rio de Janeiro", "Curitiba", "Brasília", "Outra"], mostrarSe: { campo: "formato", valores: ["presencial"] } }
    - { id: "cidadeOutra", tipo: "texto", rotulo: "Qual cidade?", rotuloCurto: "Cidade", obrigatorio: true, mostrarSe: { campo: "cidade", valores: ["outra"] }, autocomplete: "address-level2" }

rodape:
  pronuncia: "9vee, lê-se Novee [CONFIRMAR COM A DANIELLA: a pronúncia certa da marca]."
  atendimento: "Presencial em São Paulo, Rio de Janeiro, Curitiba e Brasília. Online em todo o Brasil."
  tituloContato: "Fale com a gente"
  rotuloWhatsapp: "WhatsApp"
  rotuloEmail: "E-mail"
  tituloRedes: "A 9vee nas redes"
  rotuloRede: "9vee no {rede}"
  rotuloNavegacao: "Rodapé"
  etiquetaMvp: "Página em construção no MVP"
  privacidade:
    rotulo: "Política de privacidade"
    href: "https://www.9vee.com.br/politica-de-privacidade"
  direitos: "© 2026 9vee"

erro404:
  titulo: "Página não encontrada | 9vee"
  descricao: "O endereço que você abriu não existe no site da 9vee. Volte para a página inicial ou use o menu para achar idiomas, tradução simultânea, NR-1 e LMS."
  h1: "Esta página não existe"
  texto: "O link pode estar quebrado ou a página mudou de lugar. Use o menu ou volte para a página inicial."
  voltar: "Voltar para a página inicial"
---
