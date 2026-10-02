import { describe, expect, it, vi } from 'vitest';
import {
  TEMPO_MINIMO_DO_PEDIDO,
  assuntoDoPedido,
  barreiraContraRobo,
  linhasDoEnvio,
  momentoComFuso,
  quemPede,
  type TextosDoEnvio,
} from '../../src/lib/envio';
import { entregarPedido, type PedidoPronto } from '../../src/lib/servico-de-formulario';

const textos: TextosDoEnvio = {
  remetente: 'Site 9vee',
  assunto: '[Lead site] {servico} | {publico} | {quem}',
  servicos: { nr1: 'NR-1', traducao: 'Tradução simultânea', idiomas: 'Idiomas', lms: 'LMS' },
  publicos: { empresa: 'Empresa', voce: 'Pessoa física' },
  rotulos: { publico: 'Público', pagina: 'Página de origem', consentimento: 'Consentimento', aceitoEm: 'Aceito em' },
};

describe('quem pede', () => {
  it('é a empresa, quando o pedido é de empresa e ela disse o nome', () => {
    expect(quemPede({ publico: 'empresa', respostas: { empresa: ' Metalúrgica Exemplo ' }, nome: 'Maria' })).toBe('Metalúrgica Exemplo');
  });

  it('é a pessoa, quando o pedido é para ela, mesmo com o nome de uma empresa nas respostas', () => {
    expect(quemPede({ publico: 'voce', respostas: { empresa: 'Metalúrgica Exemplo' }, nome: ' Maria ' })).toBe('Maria');
  });

  it('é a pessoa, quando a empresa não disse o nome', () => {
    expect(quemPede({ publico: 'empresa', respostas: { empresa: '  ' }, nome: 'Maria' })).toBe('Maria');
    expect(quemPede({ publico: 'empresa', respostas: {}, nome: 'Maria' })).toBe('Maria');
  });
});

describe('assunto do pedido', () => {
  it('segue o formato que o comercial filtra: serviço, público e quem pede', () => {
    expect(assuntoDoPedido({ servico: 'nr1', publico: 'empresa', quem: 'Metalúrgica Exemplo' }, textos)).toBe(
      '[Lead site] NR-1 | Empresa | Metalúrgica Exemplo',
    );
    expect(assuntoDoPedido({ servico: 'idiomas', publico: 'voce', quem: 'Maria' }, textos)).toBe(
      '[Lead site] Idiomas | Pessoa física | Maria',
    );
  });
});

describe('momento do aceite', () => {
  // O segundo argumento é o que o Date dá em getTimezoneOffset: os minutos a somar à hora local para chegar ao UTC.
  it('sai em ISO, na hora de quem aceitou, com o fuso', () => {
    expect(momentoComFuso(new Date('2026-10-02T14:03:22Z'), 180)).toBe('2026-10-02T11:03:22-03:00');
  });

  it('acerta o fuso à frente do UTC, inclusive os de meia hora', () => {
    expect(momentoComFuso(new Date('2026-10-02T14:03:22Z'), -330)).toBe('2026-10-02T19:33:22+05:30');
    expect(momentoComFuso(new Date('2026-10-02T14:03:22Z'), 0)).toBe('2026-10-02T14:03:22+00:00');
  });

  it('vira o dia junto com a hora local', () => {
    expect(momentoComFuso(new Date('2026-10-03T01:30:00Z'), 180)).toBe('2026-10-02T22:30:00-03:00');
  });
});

describe('linhas do envio', () => {
  it('trazem o público, o pedido como a pessoa o conferiu, a página de origem e o registro do consentimento', () => {
    const linhas = linhasDoEnvio(
      {
        publico: 'empresa',
        linhas: [
          { rotulo: 'Serviço', valor: 'Treinamento de NR-1' },
          { rotulo: 'Empresa', valor: 'Metalúrgica Exemplo' },
          { rotulo: 'Nome', valor: 'Maria' },
          { rotulo: 'E-mail', valor: 'maria@exemplo.com.br' },
        ],
        pagina: { nome: 'Treinamento de NR-1', endereco: 'https://www.9vee.com.br/treinamento-nr-1/' },
        consentimento: { texto: 'Li a política de privacidade e concordo.', aceitoEm: '2026-10-02T11:03:22-03:00' },
      },
      textos,
    );
    expect(linhas).toEqual([
      { rotulo: 'Público', valor: 'Empresa' },
      { rotulo: 'Serviço', valor: 'Treinamento de NR-1' },
      { rotulo: 'Empresa', valor: 'Metalúrgica Exemplo' },
      { rotulo: 'Nome', valor: 'Maria' },
      { rotulo: 'E-mail', valor: 'maria@exemplo.com.br' },
      { rotulo: 'Página de origem', valor: 'Treinamento de NR-1 (https://www.9vee.com.br/treinamento-nr-1/)' },
      { rotulo: 'Consentimento', valor: 'Li a política de privacidade e concordo.' },
      { rotulo: 'Aceito em', valor: '2026-10-02T11:03:22-03:00' },
    ]);
  });
});

describe('barreira contra robô', () => {
  it('deixa passar quem não marcou a isca e levou o tempo mínimo', () => {
    expect(barreiraContraRobo({ isca: false, abertoHa: TEMPO_MINIMO_DO_PEDIDO })).toBeNull();
    expect(barreiraContraRobo({ isca: false, abertoHa: 60_000 })).toBeNull();
  });

  it('barra pela isca, que pessoa não vê', () => {
    expect(barreiraContraRobo({ isca: true, abertoHa: 60_000 })).toBe('isca');
  });

  it('barra pela pressa: o pedido enviado antes do tempo mínimo desde a abertura', () => {
    expect(barreiraContraRobo({ isca: false, abertoHa: TEMPO_MINIMO_DO_PEDIDO - 1 })).toBe('pressa');
    expect(barreiraContraRobo({ isca: false, abertoHa: 0 })).toBe('pressa');
  });

  // A isca é certeza, a pressa é suspeita: quem caiu nas duas é tratado como robô.
  it('diz que foi a isca quando o robô também teve pressa', () => {
    expect(barreiraContraRobo({ isca: true, abertoHa: 0 })).toBe('isca');
  });
});

describe('entrega do pedido ao serviço de formulário', () => {
  const pedido: PedidoPronto = {
    assunto: '[Lead site] NR-1 | Empresa | Metalúrgica Exemplo',
    remetente: 'Site 9vee',
    linhas: [
      { rotulo: 'Público', valor: 'Empresa' },
      { rotulo: 'Empresa', valor: 'Metalúrgica Exemplo' },
      { rotulo: 'E-mail', valor: 'maria@exemplo.com.br' },
    ],
    responderPara: 'maria@exemplo.com.br',
  };
  const resposta = (status: number, corpo: unknown) =>
    vi.fn(async () => new Response(typeof corpo === 'string' ? corpo : JSON.stringify(corpo), { status }));
  const aceito = () => resposta(200, { success: true, message: 'Form submitted successfully!' });
  const enviado = (buscar: ReturnType<typeof resposta>) => {
    const [endereco, opcoes] = buscar.mock.calls[0] as unknown as [string, RequestInit];
    return { endereco, opcoes, corpo: JSON.parse(String(opcoes.body)) as Record<string, string> };
  };

  it('manda a chave, o assunto, o remetente e uma linha do pedido por campo, na ordem', async () => {
    const buscar = aceito();
    expect(await entregarPedido(pedido, 'chave-de-teste', buscar)).toBe(true);

    const { endereco, opcoes, corpo } = enviado(buscar);
    expect(endereco).toBe('https://api.web3forms.com/submit');
    expect(opcoes.method).toBe('POST');
    expect(new Headers(opcoes.headers).get('Content-Type')).toBe('application/json');
    expect(Object.entries(corpo)).toEqual([
      ['access_key', 'chave-de-teste'],
      ['subject', '[Lead site] NR-1 | Empresa | Metalúrgica Exemplo'],
      ['from_name', 'Site 9vee'],
      ['replyto', 'maria@exemplo.com.br'],
      ['Público', 'Empresa'],
      ['Empresa', 'Metalúrgica Exemplo'],
      ['E-mail', 'maria@exemplo.com.br'],
    ]);
  });

  it('não manda endereço de resposta quando o contato é um telefone', async () => {
    const buscar = aceito();
    await entregarPedido({ ...pedido, responderPara: undefined }, 'chave-de-teste', buscar);
    expect(enviado(buscar).corpo).not.toHaveProperty('replyto');
  });

  // Dois campos com o mesmo rótulo virariam um só no JSON, e uma resposta sumiria do e-mail.
  it('não perde a linha que repete o rótulo de outra', async () => {
    const buscar = aceito();
    const linhas = [
      { rotulo: 'Cidade', valor: 'Outra' },
      { rotulo: 'Cidade', valor: 'Campinas' },
      { rotulo: 'Cidade', valor: 'Santos' },
    ];
    await entregarPedido({ ...pedido, linhas }, 'chave-de-teste', buscar);
    expect(Object.entries(enviado(buscar).corpo).slice(4)).toEqual([
      ['Cidade', 'Outra'],
      ['Cidade (2)', 'Campinas'],
      ['Cidade (3)', 'Santos'],
    ]);
  });

  it('diz que não chegou quando o serviço recusa, com erro no status ou no corpo', async () => {
    expect(await entregarPedido(pedido, 'chave-de-teste', resposta(400, { success: false, message: 'Invalid' }))).toBe(false);
    expect(await entregarPedido(pedido, 'chave-de-teste', resposta(200, { success: false }))).toBe(false);
    expect(await entregarPedido(pedido, 'chave-de-teste', resposta(429, { success: false }))).toBe(false);
    expect(await entregarPedido(pedido, 'chave-de-teste', resposta(500, 'Something went wrong'))).toBe(false);
  });

  it('diz que não chegou quando a rede cai ou a resposta não é JSON', async () => {
    const semRede = vi.fn(async () => {
      throw new TypeError('Failed to fetch');
    });
    expect(await entregarPedido(pedido, 'chave-de-teste', semRede)).toBe(false);
    expect(await entregarPedido(pedido, 'chave-de-teste', resposta(200, '<html>fora do ar</html>'))).toBe(false);
  });

  it('nem chama o serviço quando o build saiu sem a chave', async () => {
    const buscar = aceito();
    expect(await entregarPedido(pedido, '', buscar)).toBe(false);
    expect(buscar).not.toHaveBeenCalled();
  });
});
