// Lógica do pedido de contato, sem tela: campos por serviço, validação e mensagem do WhatsApp.
// As perguntas, as opções, os erros e os modelos de mensagem vêm de content/site.md.
import type { Publico } from './publico';
import { preencher } from './texto';

/** Os quatro serviços, na ordem do site. O esquema do conteúdo e os componentes partem desta lista. */
export const SERVICOS = ['nr1', 'traducao', 'idiomas', 'lms'] as const;
export type ServicoId = (typeof SERVICOS)[number];
export type Etapa = 'publico' | 'servico' | 'detalhes' | 'final';
export const ETAPAS: readonly Etapa[] = ['publico', 'servico', 'detalhes', 'final'];
export type FormularioId = 'nr1' | 'traducao' | 'lms' | 'idiomasEmpresa' | 'idiomasVoce';

export interface Condicao {
  campo: string;
  valores: string[];
}

interface CampoBase {
  id: string;
  rotulo: string;
  rotuloCurto: string;
  obrigatorio: boolean;
  opcionalPara?: Publico;
  mostrarSe?: Condicao;
  ocultarSe?: Condicao;
  minuscula?: boolean;
  /** Erro próprio do campo; sem ele, vale o erro do tipo. */
  erro?: string;
}

export type Campo =
  | (CampoBase & { tipo: 'texto'; autocomplete?: string })
  | (CampoBase & { tipo: 'escolha' | 'multipla'; opcoes: string[] })
  | (CampoBase & { tipo: 'data'; semData: string })
  | (CampoBase & { tipo: 'idioma' });

export type Respostas = Record<string, string | string[] | undefined>;

export interface TextosDeErro {
  escolha: string;
  multipla: string;
  texto: string;
  data: string;
}

export interface ModelosDeMensagem {
  abertura: string;
  publico: Record<Publico, string>;
  pedido: Record<ServicoId, string>;
  nome: string;
  flutuante: string;
}

export interface IdiomaCurto {
  slug: string;
  nome: string;
}

/** O que o HTML entrega ao script do drawer, num <script type="application/json">. */
export interface DadosDoDrawer {
  numero: string;
  pagina: string;
  servicoDaPagina: ServicoId | null;
  servicos: Record<ServicoId, string>;
  formularios: Record<FormularioId, Campo[]>;
  idiomas: IdiomaCurto[];
  modelos: ModelosDeMensagem;
  erros: TextosDeErro & { nome: string; contato: string };
  passo: string;
  titulosDetalhes: Record<FormularioId, string>;
  publicos: Record<Publico, string>;
  confirmacao: { servico: string; nome: string; contato: Record<'telefone' | 'email', string> };
}

export const SEM_DATA = 'sem-data';

export function valorDaOpcao(rotulo: string): string {
  return rotulo
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replaceAll('.', '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function formularioDe(servico: ServicoId, publico: Publico | null): FormularioId {
  if (servico === 'idiomas') return publico === 'voce' ? 'idiomasVoce' : 'idiomasEmpresa';
  return servico;
}

const temValor = (valor: Respostas[string]) =>
  Array.isArray(valor) ? valor.length > 0 : typeof valor === 'string' && valor.trim() !== '';

const combina = (valor: Respostas[string], valores: string[]) =>
  Array.isArray(valor) ? valor.some((v) => valores.includes(v)) : valor !== undefined && valores.includes(valor);

/** As condições só enxergam campos visíveis: uma resposta antiga de um campo escondido não reabre nada. */
export function camposVisiveis(campos: Campo[], respostas: Respostas): Campo[] {
  const visiveis: Campo[] = [];
  const valorVisivel = (id: string) => (visiveis.some((c) => c.id === id) ? respostas[id] : undefined);
  for (const campo of campos) {
    if (campo.mostrarSe && !combina(valorVisivel(campo.mostrarSe.campo), campo.mostrarSe.valores)) continue;
    if (campo.ocultarSe && combina(valorVisivel(campo.ocultarSe.campo), campo.ocultarSe.valores)) continue;
    visiveis.push(campo);
  }
  return visiveis;
}

export function ehObrigatorio(campo: Campo, publico: Publico | null): boolean {
  return campo.obrigatorio && campo.opcionalPara !== publico;
}

export function validarCampos(
  campos: Campo[],
  respostas: Respostas,
  publico: Publico | null,
  hoje: string,
  erros: TextosDeErro,
): Record<string, string> {
  const encontrados: Record<string, string> = {};
  for (const campo of camposVisiveis(campos, respostas)) {
    const valor = respostas[campo.id];
    const obrigatorio = ehObrigatorio(campo, publico);
    if (campo.tipo === 'data') {
      const dataValida = typeof valor === 'string' && (valor === SEM_DATA || (/^\d{4}-\d{2}-\d{2}$/.test(valor) && valor >= hoje));
      if ((obrigatorio || temValor(valor)) && !dataValida) encontrados[campo.id] = campo.erro ?? erros.data;
      continue;
    }
    if (!obrigatorio || temValor(valor)) continue;
    encontrados[campo.id] =
      campo.erro ??
      (campo.tipo === 'texto' ? erros.texto : campo.tipo === 'multipla' ? erros.multipla : erros.escolha);
  }
  return encontrados;
}

export function tipoDeContato(valor: string): 'telefone' | 'email' | null {
  const texto = valor.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(texto)) return 'email';
  if (!/^[\d\s()+.-]+$/.test(texto)) return null;
  const digitos = texto.replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '');
  return digitos.length === 10 || digitos.length === 11 ? 'telefone' : null;
}

const minuscula = (texto: string) => texto.charAt(0).toLocaleLowerCase('pt-BR') + texto.slice(1);

function juntar(itens: string[]): string {
  return itens.length <= 1 ? itens.join('') : `${itens.slice(0, -1).join(', ')} e ${itens.at(-1)}`;
}

function valorLegivel(campo: Campo, valor: string | string[], idiomas: IdiomaCurto[]): string {
  const ajustar = (texto: string) => (campo.minuscula ? minuscula(texto) : texto);
  switch (campo.tipo) {
    case 'texto':
      return String(valor).trim();
    case 'idioma':
      return ajustar(idiomas.find((i) => i.slug === valor)?.nome ?? String(valor));
    case 'data':
      return valor === SEM_DATA ? minuscula(campo.semData) : String(valor).split('-').reverse().join('/');
    case 'escolha':
    case 'multipla': {
      const rotuloDe = (v: string) => ajustar(campo.opcoes.find((o) => valorDaOpcao(o) === v) ?? v);
      return Array.isArray(valor) ? juntar(valor.map(rotuloDe)) : rotuloDe(valor);
    }
  }
}

export interface LinhaDoPedido {
  rotulo: string;
  valor: string;
}

/** A linha como ela vai na mensagem do WhatsApp: "Rótulo: valor". */
export const linhaEmTexto = ({ rotulo, valor }: LinhaDoPedido) => `${rotulo}: ${valor}`;

/**
 * Rótulo curto e valor de cada campo visível respondido, na ordem do formulário.
 * Quando um campo só aparece para detalhar outro de mesmo rótulo (a cidade "Outra" e qual cidade),
 * a resposta digitada substitui a opção.
 */
export function linhasDoPedido(campos: Campo[], respostas: Respostas, idiomas: IdiomaCurto[]): LinhaDoPedido[] {
  const respondidos = camposVisiveis(campos, respostas).filter((campo) => temValor(respostas[campo.id]));
  const detalhados = new Set(
    respondidos.flatMap((campo) => {
      const pai = respondidos.find((outro) => outro.id === campo.mostrarSe?.campo);
      return pai && pai.rotuloCurto === campo.rotuloCurto ? [pai.id] : [];
    }),
  );
  return respondidos
    .filter((campo) => !detalhados.has(campo.id))
    .map((campo) => ({ rotulo: campo.rotuloCurto, valor: valorLegivel(campo, respostas[campo.id]!, idiomas) }));
}

export function montarMensagem(
  pedido: {
    pagina: string;
    publico: Publico | null;
    servico: ServicoId;
    campos: Campo[];
    respostas: Respostas;
    nome: string;
    idiomas: IdiomaCurto[];
  },
  modelos: ModelosDeMensagem,
): string {
  const nome = pedido.nome.trim();
  return [
    preencher(modelos.abertura, {
      pagina: pedido.pagina,
      publico: pedido.publico ? modelos.publico[pedido.publico] : '',
    }),
    modelos.pedido[pedido.servico],
    ...linhasDoPedido(pedido.campos, pedido.respostas, pedido.idiomas).map(linhaEmTexto),
    ...(nome ? [preencher(modelos.nome, { nome })] : []),
  ].join('\n');
}

export function mensagemFlutuante(pagina: string, assunto: string, modelos: ModelosDeMensagem): string {
  return preencher(modelos.flutuante, { pagina, assunto });
}

export function linkWhatsApp(numero: string, mensagem?: string): string {
  const base = `https://wa.me/${numero}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

const doisDigitos = (numero: number) => String(numero).padStart(2, '0');

/** A data de hoje no fuso de quem está no site, no formato do <input type="date">. */
export function hojeLocal(agora: Date): string {
  return `${agora.getFullYear()}-${doisDigitos(agora.getMonth() + 1)}-${doisDigitos(agora.getDate())}`;
}

/**
 * O serviço já marcado ao abrir o drawer: o do botão, o que a pessoa escolheu antes, o da página
 * e, para quem escolheu "Para você", os idiomas, porque o botão dela diz "Quero estudar".
 */
/**
 * Os atributos que ligam um controle ao drawer. Ficam num lugar só porque o script de contato
 * depende deles, e o botão de idioma da página de cursos não é o BotaoContato.
 */
export function atributosDoContato(dados: { servico?: ServicoId; idioma?: string } = {}) {
  return {
    type: 'button' as const,
    'aria-haspopup': 'dialog' as const,
    'data-abre-contato': true,
    'data-servico': dados.servico,
    'data-idioma': dados.idioma,
  };
}

export function servicoInicial(pistas: {
  doBotao: string | undefined;
  anterior: ServicoId | null;
  daPagina: ServicoId | null;
  publico: Publico | null;
}): ServicoId | null {
  const doBotao = SERVICOS.find((servico) => servico === pistas.doBotao);
  return doBotao ?? pistas.anterior ?? pistas.daPagina ?? (pistas.publico === 'voce' ? 'idiomas' : null);
}

export function primeiraEtapaPendente(estado: {
  publico: Publico | null;
  servico: ServicoId | null;
  detalhesCompletos: boolean;
}): Etapa {
  if (!estado.publico) return 'publico';
  if (!estado.servico) return 'servico';
  return estado.detalhesCompletos ? 'final' : 'detalhes';
}

export function modoDoDrawer(publico: Publico | null, servico: ServicoId | null): 'aulas' | 'orcamento' {
  return publico === 'voce' && servico === 'idiomas' ? 'aulas' : 'orcamento';
}

export function linhasDaConfirmacao(
  pedido: {
    servico: string;
    campos: Campo[];
    respostas: Respostas;
    idiomas: IdiomaCurto[];
    nome: string;
    contato: string;
  },
  rotulos: { servico: string; nome: string; contato: Record<'telefone' | 'email', string> },
): LinhaDoPedido[] {
  const contato = pedido.contato.trim();
  return [
    { rotulo: rotulos.servico, valor: pedido.servico },
    ...linhasDoPedido(pedido.campos, pedido.respostas, pedido.idiomas),
    { rotulo: rotulos.nome, valor: pedido.nome.trim() },
    { rotulo: rotulos.contato[tipoDeContato(contato) ?? 'email'], valor: contato },
  ];
}
