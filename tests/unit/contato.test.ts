import { describe, expect, it } from 'vitest';
import {
  camposVisiveis,
  formularioDe,
  hojeLocal,
  linhasDaConfirmacao,
  linkWhatsApp,
  linhasDoPedido,
  mensagemFlutuante,
  modoDoDrawer,
  montarMensagem,
  primeiraEtapaPendente,
  servicoInicial,
  tipoDeContato,
  validarCampos,
  valorDaOpcao,
  type Campo,
  type ModelosDeMensagem,
  type TextosDeErro,
} from '../../src/lib/contato';

const erros: TextosDeErro = {
  escolha: 'Escolha uma das opções.',
  multipla: 'Escolha pelo menos uma opção.',
  texto: 'Preencha este campo.',
  data: 'Escolha uma data a partir de hoje ou marque que ainda não tem data.',
};

const modelos: ModelosDeMensagem = {
  abertura: 'Olá, 9vee. Vim pela página {pagina} do site{publico}.',
  publico: { empresa: ' e falo pela minha empresa', voce: ' e é para mim' },
  pedido: {
    nr1: 'Quero um orçamento de treinamento de NR-1.',
    traducao: 'Quero um orçamento de tradução simultânea.',
    idiomas: 'Quero um orçamento de aulas de idioma.',
    lms: 'Quero um orçamento do LMS.',
  },
  nome: 'Meu nome é {nome}.',
  flutuante: 'Olá, 9vee. Vim pela página {pagina} do site e quero falar sobre {assunto}.',
};

const idiomas = [
  { slug: 'ingles', nome: 'Inglês' },
  { slug: 'espanhol', nome: 'Espanhol' },
];

const nr1: Campo[] = [
  { id: 'empresa', tipo: 'texto', rotulo: 'Nome da empresa', rotuloCurto: 'Empresa', obrigatorio: true },
  {
    id: 'colaboradores',
    tipo: 'escolha',
    rotulo: 'Quantos colaboradores a empresa tem?',
    rotuloCurto: 'Colaboradores',
    obrigatorio: true,
    minuscula: true,
    opcoes: ['Até 50', '51 a 200', '201 a 1.000', 'Mais de 1.000'],
  },
  {
    id: 'prazo',
    tipo: 'escolha',
    rotulo: 'Qual é o prazo para se adequar?',
    rotuloCurto: 'Prazo de adequação',
    obrigatorio: true,
    minuscula: true,
    opcoes: ['O quanto antes', 'Até 3 meses', 'De 3 a 6 meses', 'Ainda sem prazo'],
  },
];

const traducao: Campo[] = [
  { id: 'empresa', tipo: 'texto', rotulo: 'Nome da empresa', rotuloCurto: 'Empresa', obrigatorio: true, opcionalPara: 'voce' },
  {
    id: 'idiomas',
    tipo: 'multipla',
    rotulo: 'Quais idiomas o evento precisa?',
    rotuloCurto: 'Idiomas',
    obrigatorio: true,
    minuscula: true,
    opcoes: ['Inglês', 'Espanhol', 'Francês'],
  },
  { id: 'data', tipo: 'data', rotulo: 'Quando é o evento?', rotuloCurto: 'Data do evento', obrigatorio: true, semData: 'Ainda sem data' },
  {
    id: 'formato',
    tipo: 'escolha',
    rotulo: 'Presencial ou online?',
    rotuloCurto: 'Formato',
    obrigatorio: true,
    minuscula: true,
    opcoes: ['Presencial', 'Online', 'Híbrido'],
  },
  {
    id: 'cidade',
    tipo: 'escolha',
    rotulo: 'Em que cidade?',
    rotuloCurto: 'Cidade',
    obrigatorio: true,
    opcoes: ['São Paulo', 'Rio de Janeiro', 'Outra'],
    ocultarSe: { campo: 'formato', valores: ['online'] },
  },
  {
    id: 'cidadeOutra',
    tipo: 'texto',
    rotulo: 'Qual cidade?',
    rotuloCurto: 'Cidade',
    obrigatorio: true,
    mostrarSe: { campo: 'cidade', valores: ['outra'] },
  },
];

const idiomasVoce: Campo[] = [
  { id: 'idioma', tipo: 'idioma', rotulo: 'Qual idioma?', rotuloCurto: 'Idioma', obrigatorio: true, minuscula: true },
  {
    id: 'objetivo',
    tipo: 'escolha',
    rotulo: 'Para quê?',
    rotuloCurto: 'Objetivo',
    obrigatorio: true,
    minuscula: true,
    opcoes: ['Carreira', 'Viagem', 'Prova de proficiência', 'Mudança de país'],
  },
];

describe('valorDaOpcao', () => {
  it('vira identificador sem acento, espaço nem pontuação', () => {
    expect(valorDaOpcao('Até 50')).toBe('ate-50');
    expect(valorDaOpcao('201 a 1.000')).toBe('201-a-1000');
    expect(valorDaOpcao('São Paulo')).toBe('sao-paulo');
    expect(valorDaOpcao('Prova de proficiência')).toBe('prova-de-proficiencia');
  });
});

describe('formularioDe', () => {
  it('separa idiomas para empresa e para pessoa física', () => {
    expect(formularioDe('idiomas', 'empresa')).toBe('idiomasEmpresa');
    expect(formularioDe('idiomas', 'voce')).toBe('idiomasVoce');
    expect(formularioDe('idiomas', null)).toBe('idiomasEmpresa');
  });

  it('usa um formulário só para NR-1, tradução e LMS', () => {
    expect(formularioDe('nr1', 'voce')).toBe('nr1');
    expect(formularioDe('traducao', 'empresa')).toBe('traducao');
    expect(formularioDe('lms', null)).toBe('lms');
  });
});

describe('camposVisiveis', () => {
  it('esconde a cidade quando o evento é online', () => {
    const ids = camposVisiveis(traducao, { formato: 'online' }).map((c) => c.id);
    expect(ids).not.toContain('cidade');
    expect(ids).not.toContain('cidadeOutra');
  });

  it('mostra o campo de outra cidade só quando a cidade é "Outra"', () => {
    expect(camposVisiveis(traducao, { formato: 'presencial', cidade: 'sao-paulo' }).map((c) => c.id)).not.toContain('cidadeOutra');
    expect(camposVisiveis(traducao, { formato: 'presencial', cidade: 'outra' }).map((c) => c.id)).toContain('cidadeOutra');
  });
});

describe('validarCampos', () => {
  const hoje = '2026-09-18';

  it('aponta cada campo obrigatório vazio com a mensagem do tipo', () => {
    expect(validarCampos(nr1, {}, 'empresa', hoje, erros)).toEqual({
      empresa: erros.texto,
      colaboradores: erros.escolha,
      prazo: erros.escolha,
    });
  });

  it('aceita o formulário completo', () => {
    const respostas = { empresa: 'Metalúrgica Exemplo', colaboradores: '201-a-1000', prazo: 'ate-3-meses' };
    expect(validarCampos(nr1, respostas, 'empresa', hoje, erros)).toEqual({});
  });

  it('deixa a empresa opcional para quem pede tradução como pessoa física', () => {
    const respostas = { idiomas: ['ingles'], data: 'sem-data', formato: 'online' };
    expect(validarCampos(traducao, respostas, 'voce', hoje, erros)).toEqual({});
    expect(validarCampos(traducao, respostas, 'empresa', hoje, erros)).toEqual({ empresa: erros.texto });
  });

  it('exige pelo menos um idioma na escolha múltipla', () => {
    const respostas = { empresa: 'X', idiomas: [], data: 'sem-data', formato: 'online' };
    expect(validarCampos(traducao, respostas, 'empresa', hoje, erros)).toEqual({ idiomas: erros.multipla });
  });

  it('recusa data no passado e aceita "ainda sem data"', () => {
    const base = { empresa: 'X', idiomas: ['ingles'], formato: 'online' };
    expect(validarCampos(traducao, { ...base, data: '2026-09-17' }, 'empresa', hoje, erros)).toEqual({ data: erros.data });
    expect(validarCampos(traducao, { ...base, data: '2026-09-18' }, 'empresa', hoje, erros)).toEqual({});
    expect(validarCampos(traducao, { ...base, data: 'sem-data' }, 'empresa', hoje, erros)).toEqual({});
  });

  it('não cobra campo escondido', () => {
    const respostas = { empresa: 'X', idiomas: ['ingles'], data: 'sem-data', formato: 'online' };
    expect(validarCampos(traducao, respostas, 'empresa', hoje, erros)).not.toHaveProperty('cidade');
  });

  it('não aceita texto só com espaços', () => {
    expect(validarCampos(nr1, { empresa: '   ', colaboradores: 'ate-50', prazo: 'ate-3-meses' }, 'empresa', hoje, erros)).toEqual({
      empresa: erros.texto,
    });
  });
});

describe('tipoDeContato', () => {
  it('reconhece WhatsApp com DDD, com ou sem máscara e com ou sem 55', () => {
    expect(tipoDeContato('(11) 93466-1917')).toBe('telefone');
    expect(tipoDeContato('11934661917')).toBe('telefone');
    expect(tipoDeContato('+55 11 93466-1917')).toBe('telefone');
    expect(tipoDeContato('(11) 3466-1917')).toBe('telefone');
  });

  it('reconhece e-mail', () => {
    expect(tipoDeContato('ana@empresa.com.br')).toBe('email');
  });

  it('recusa o que não é nenhum dos dois', () => {
    expect(tipoDeContato('93466-1917')).toBeNull();
    expect(tipoDeContato('ana@empresa')).toBeNull();
    expect(tipoDeContato('')).toBeNull();
  });
});

describe('linhasDoPedido', () => {
  it('lista rótulo curto e valor legível, na ordem dos campos visíveis', () => {
    const respostas = {
      empresa: 'Hotel Exemplo',
      idiomas: ['ingles', 'espanhol', 'frances'],
      data: '2026-11-12',
      formato: 'presencial',
      cidade: 'outra',
      cidadeOutra: 'Florianópolis',
    };
    expect(linhasDoPedido(traducao, respostas, idiomas)).toEqual([
      'Empresa: Hotel Exemplo',
      'Idiomas: inglês, espanhol e francês',
      'Data do evento: 12/11/2026',
      'Formato: presencial',
      'Cidade: Florianópolis',
    ]);
  });

  it('mantém a opção quando o campo que a detalha ficou vazio', () => {
    const respostas = { idiomas: ['ingles'], data: 'sem-data', formato: 'presencial', cidade: 'outra' };
    expect(linhasDoPedido(traducao, respostas, idiomas)).toContain('Cidade: Outra');
  });

  it('escreve "ainda sem data" e pula campo opcional vazio', () => {
    const respostas = { idiomas: ['ingles'], data: 'sem-data', formato: 'online' };
    expect(linhasDoPedido(traducao, respostas, idiomas)).toEqual([
      'Idiomas: inglês',
      'Data do evento: ainda sem data',
      'Formato: online',
    ]);
  });

  it('usa o nome do idioma no campo de idioma', () => {
    expect(linhasDoPedido(idiomasVoce, { idioma: 'espanhol', objetivo: 'viagem' }, idiomas)).toEqual([
      'Idioma: espanhol',
      'Objetivo: viagem',
    ]);
  });
});

describe('montarMensagem', () => {
  it('escreve na voz do visitante, com a página de origem, o público, as respostas e o nome', () => {
    const mensagem = montarMensagem(
      {
        pagina: 'Treinamento de NR-1',
        publico: 'empresa',
        servico: 'nr1',
        campos: nr1,
        respostas: { empresa: 'Metalúrgica Exemplo', colaboradores: '201-a-1000', prazo: 'ate-3-meses' },
        nome: '  Ana Souza ',
        idiomas,
      },
      modelos,
    );
    expect(mensagem).toBe(
      [
        'Olá, 9vee. Vim pela página Treinamento de NR-1 do site e falo pela minha empresa.',
        'Quero um orçamento de treinamento de NR-1.',
        'Empresa: Metalúrgica Exemplo',
        'Colaboradores: 201 a 1.000',
        'Prazo de adequação: até 3 meses',
        'Meu nome é Ana Souza.',
      ].join('\n'),
    );
  });

  it('não fala de público quando o visitante não escolheu', () => {
    const mensagem = montarMensagem(
      { pagina: 'inicial', publico: null, servico: 'lms', campos: [], respostas: {}, nome: 'Bia', idiomas },
      modelos,
    );
    expect(mensagem.split('\n')[0]).toBe('Olá, 9vee. Vim pela página inicial do site.');
  });
});

describe('mensagemFlutuante', () => {
  it('diz a página e o assunto, na voz do visitante', () => {
    expect(mensagemFlutuante('Cursos de Idiomas', 'aulas de idioma para mim', modelos)).toBe(
      'Olá, 9vee. Vim pela página Cursos de Idiomas do site e quero falar sobre aulas de idioma para mim.',
    );
  });
});

describe('linkWhatsApp', () => {
  it('monta o wa.me com acentos e quebras de linha codificados', () => {
    expect(linkWhatsApp('5511934661917', 'Olá, 9vee.\nÉ para mim.')).toBe(
      'https://wa.me/5511934661917?text=Ol%C3%A1%2C%209vee.%0A%C3%89%20para%20mim.',
    );
  });

  it('sai sem texto quando não há mensagem', () => {
    expect(linkWhatsApp('5511934661917')).toBe('https://wa.me/5511934661917');
  });
});

describe('hojeLocal', () => {
  it('usa a data do fuso da pessoa, no formato do campo de data', () => {
    expect(hojeLocal(new Date(2026, 0, 5, 23, 59))).toBe('2026-01-05');
    expect(hojeLocal(new Date(2026, 10, 30, 0, 1))).toBe('2026-11-30');
  });
});

describe('servicoInicial', () => {
  const vazio = { doBotao: undefined, anterior: null, daPagina: null, publico: null } as const;

  it('prefere o serviço do botão que abriu o drawer', () => {
    expect(servicoInicial({ ...vazio, doBotao: 'traducao', anterior: 'nr1', daPagina: 'lms' })).toBe('traducao');
  });

  it('sem serviço no botão, mantém o que a pessoa escolheu antes', () => {
    expect(servicoInicial({ ...vazio, anterior: 'idiomas', daPagina: 'nr1' })).toBe('idiomas');
  });

  it('depois, usa o serviço da página', () => {
    expect(servicoInicial({ ...vazio, daPagina: 'nr1', publico: 'voce' })).toBe('nr1');
  });

  it('quem escolheu "Para você" e não tem outra pista começa pelos idiomas', () => {
    expect(servicoInicial({ ...vazio, publico: 'voce' })).toBe('idiomas');
  });

  it('ignora um serviço desconhecido no botão', () => {
    expect(servicoInicial({ ...vazio, doBotao: 'cafe', daPagina: 'lms' })).toBe('lms');
  });

  it('sem nenhuma pista, deixa a pessoa escolher', () => {
    expect(servicoInicial({ ...vazio, publico: 'empresa' })).toBeNull();
  });
});

describe('primeiraEtapaPendente', () => {
  it('começa pelo público quando ninguém escolheu', () => {
    expect(primeiraEtapaPendente({ publico: null, servico: 'nr1', detalhesCompletos: true })).toBe('publico');
  });

  it('pula o que já tem resposta', () => {
    expect(primeiraEtapaPendente({ publico: 'empresa', servico: null, detalhesCompletos: false })).toBe('servico');
    expect(primeiraEtapaPendente({ publico: 'empresa', servico: 'nr1', detalhesCompletos: false })).toBe('detalhes');
  });

  it('vai direto ao nome quando os detalhes já estão completos', () => {
    expect(primeiraEtapaPendente({ publico: 'voce', servico: 'idiomas', detalhesCompletos: true })).toBe('final');
  });
});

describe('modoDoDrawer', () => {
  it('vira "aulas" só quando é para a pessoa e o serviço é idiomas', () => {
    expect(modoDoDrawer('voce', 'idiomas')).toBe('aulas');
    expect(modoDoDrawer('empresa', 'idiomas')).toBe('orcamento');
    expect(modoDoDrawer('voce', 'traducao')).toBe('orcamento');
    expect(modoDoDrawer(null, null)).toBe('orcamento');
  });
});

describe('linhasDaConfirmacao', () => {
  const rotulos = { servico: 'Serviço', nome: 'Nome', contato: { telefone: 'WhatsApp', email: 'E-mail' } };

  it('lista o serviço, as respostas, o nome e o contato com o rótulo do tipo', () => {
    const linhas = linhasDaConfirmacao(
      {
        servico: 'Treinamento de NR-1',
        campos: nr1,
        respostas: { empresa: 'Metalúrgica Exemplo', colaboradores: '51-a-200', prazo: 'ate-3-meses' },
        idiomas,
        nome: ' Maria ',
        contato: 'maria@exemplo.com.br',
      },
      rotulos,
    );
    expect(linhas).toEqual([
      'Serviço: Treinamento de NR-1',
      'Empresa: Metalúrgica Exemplo',
      'Colaboradores: 51 a 200',
      'Prazo de adequação: até 3 meses',
      'Nome: Maria',
      'E-mail: maria@exemplo.com.br',
    ]);
  });

  it('chama o telefone de WhatsApp', () => {
    const linhas = linhasDaConfirmacao(
      { servico: 'LMS', campos: [], respostas: {}, idiomas, nome: 'Ana', contato: '(11) 91234-5678' },
      rotulos,
    );
    expect(linhas.at(-1)).toBe('WhatsApp: (11) 91234-5678');
  });
});
