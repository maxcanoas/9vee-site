import { describe, expect, it } from 'vitest';
import {
  carregaGa4,
  consentimentoDoGoogle,
  cookiesDoGa4,
  dominiosDoCookie,
  lerEscolha,
  novaEscolha,
  textoDaEscolha,
} from '../../src/lib/cookies';

const VERSAO = 2;

describe('escolha de cookies', () => {
  it('guarda a resposta com a data e a versão do aviso', () => {
    const escolha = novaEscolha(true, new Date('2026-10-06T13:45:00.000Z'), VERSAO);
    expect(escolha).toEqual({ estatistica: true, versao: 2, em: '2026-10-06T13:45:00.000Z' });
    expect(lerEscolha(textoDaEscolha(escolha), VERSAO)).toEqual(escolha);
  });

  // Sem resposta, com resposta de outra versão do aviso ou com lixo no navegador, o aviso aparece de novo.
  it('pede a escolha de novo quando não há resposta válida da versão atual', () => {
    expect(lerEscolha(null, VERSAO)).toBeNull();
    expect(lerEscolha('', VERSAO)).toBeNull();
    expect(lerEscolha('{quebrado', VERSAO)).toBeNull();
    expect(lerEscolha(JSON.stringify({ estatistica: true, versao: 1, em: '2026-10-01T10:00:00.000Z' }), VERSAO)).toBeNull();
    expect(lerEscolha(JSON.stringify({ estatistica: 'sim', versao: 2, em: '2026-10-01T10:00:00.000Z' }), VERSAO)).toBeNull();
    expect(lerEscolha(JSON.stringify({ estatistica: true, versao: 2 }), VERSAO)).toBeNull();
  });
});

describe('o que cada escolha libera', () => {
  const aceitou = novaEscolha(true, new Date(), VERSAO);
  const recusou = novaEscolha(false, new Date(), VERSAO);

  // Consent Mode v2: o aceite libera só a estatística. Anúncio continua negado, porque o site não faz anúncio.
  it('libera só a estatística no aceite, e nega tudo no resto', () => {
    const negado = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
    expect(consentimentoDoGoogle(aceitou)).toEqual({ ...negado, analytics_storage: 'granted' });
    expect(consentimentoDoGoogle(recusou)).toEqual({ ...negado, analytics_storage: 'denied' });
    expect(consentimentoDoGoogle(null)).toEqual({ ...negado, analytics_storage: 'denied' });
  });

  // Quem recusa, ou ainda não respondeu, não manda nada: o script do Google nem carrega. Sem ID (o preview), também não.
  it('carrega o GA4 só com o aceite e com um ID', () => {
    expect(carregaGa4(aceitou, 'G-TESTE12345')).toBe(true);
    expect(carregaGa4(recusou, 'G-TESTE12345')).toBe(false);
    expect(carregaGa4(null, 'G-TESTE12345')).toBe(false);
    expect(carregaGa4(aceitou, '')).toBe(false);
    expect(carregaGa4(aceitou, undefined)).toBe(false);
  });
});

// Quem aceita e depois recusa fica sem os cookies do Google: o site apaga o _ga e o _ga_ do GA4, e só eles.
describe('cookies do GA4 na volta atrás', () => {
  it('acha os cookies do GA4 entre os do navegador', () => {
    const doNavegador = '_ga=GA1.1.123.456; _ga_ABC123=GS1.1.789; outro=1; _gat=1; ga=nao';
    expect(cookiesDoGa4(doNavegador)).toEqual(['_ga', '_ga_ABC123']);
    expect(cookiesDoGa4('')).toEqual([]);
  });

  it('lista os domínios onde o GA4 pode ter gravado, do endereço até o domínio principal', () => {
    expect(dominiosDoCookie('www.9vee.com.br')).toEqual(['www.9vee.com.br', '9vee.com.br', 'com.br']);
    expect(dominiosDoCookie('localhost')).toEqual(['localhost']);
  });
});
