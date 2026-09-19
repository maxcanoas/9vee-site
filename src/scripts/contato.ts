// O pedido de contato: abre o drawer a partir de qualquer [data-abre-contato], conduz os passos,
// mantém o link do WhatsApp em dia com as respostas e simula o "receber contato".
// A lógica sem tela (campos, validação e mensagem) está em src/lib/contato.ts.
import {
  ETAPAS,
  SEM_DATA,
  camposVisiveis,
  ehObrigatorio,
  formularioDe,
  hojeLocal,
  linhasDaConfirmacao,
  linhasDoPedido,
  linkWhatsApp,
  modoDoDrawer,
  montarMensagem,
  preencher,
  primeiraEtapaPendente,
  servicoInicial,
  tipoDeContato,
  validarCampos,
  type Campo,
  type DadosDoDrawer,
  type Etapa,
  type Respostas,
  type ServicoId,
} from '../lib/contato';
import { publicoValido, type Publico } from '../lib/publico';
import { aoMudarPublico, escolherPublico, publicoAtual } from './publico';

type Tela = Etapa | 'aberto' | 'confirmado';

const FOCAVEIS = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
// Espera curta depois do toque numa opção, para a pessoa ver a escolha marcada antes do próximo passo.
const PAUSA_DO_TOQUE = 180;

const dialogo = document.querySelector<HTMLDialogElement>('dialog[data-drawer]');
const ilha = document.getElementById('dados-contato');
if (dialogo && ilha?.textContent) iniciarDrawer(dialogo, JSON.parse(ilha.textContent) as DadosDoDrawer);

const flutuante = document.querySelector<HTMLAnchorElement>('[data-whatsapp-flutuante]');
if (flutuante) iniciarBotaoFlutuante(flutuante);

function iniciarDrawer(dialogo: HTMLDialogElement, dados: DadosDoDrawer) {
  const um = <T extends Element = HTMLElement>(seletor: string): T => {
    const achado = dialogo.querySelector<T>(seletor);
    if (!achado) throw new Error(`drawer sem ${seletor}`);
    return achado;
  };
  const todos = <T extends Element = HTMLElement>(seletor: string, raiz: ParentNode = dialogo) => [
    ...raiz.querySelectorAll<T>(seletor),
  ];

  const form = um<HTMLFormElement>('form');
  const corpo = um('[data-corpo]');
  const textoDoPasso = um('[data-passo-texto]');
  const saidaWhatsApp = um<HTMLAnchorElement>('[data-saida-whatsapp]');
  const linkDeNovo = um<HTMLAnchorElement>('[data-link-whatsapp]');
  const botaoReceber = um<HTMLButtonElement>('[data-abre-receber]');
  const painelReceber = um('#drawer-receber');
  const campoNome = um<HTMLInputElement>('input[name="final-nome"]');
  const campoContato = um<HTMLInputElement>('input[name="final-contato"]');

  let tela: Tela = 'publico';
  let servico: ServicoId | null = null;
  let abridor: HTMLElement | null = null;
  let porPonteiro = false;
  let toqueNoFundo = false;
  let avanco: number | undefined;
  let hoje = hojeLocal(new Date());

  const formularioAtual = () => (servico ? formularioDe(servico, publicoAtual()) : null);
  const camposAtuais = (): Campo[] => {
    const id = formularioAtual();
    return id ? dados.formularios[id] : [];
  };
  const blocoDoCampo = (campoId: string) => um(`[data-formulario="${formularioAtual()}"] [data-campo="${campoId}"]`);
  const blocoDe = (entrada: HTMLElement) => entrada.closest<HTMLElement>('[data-campo]')!;
  const grupoDa = (etapa: 'publico' | 'servico') => um(`[data-etapa="${etapa}"] fieldset`);

  function lerRespostas(): Respostas {
    const id = formularioAtual();
    const respostas: Respostas = {};
    if (!id) return respostas;
    for (const campo of dados.formularios[id]) {
      const nome = `${id}-${campo.id}`;
      const entradas = todos<HTMLInputElement>(`input[name="${nome}"]`);
      if (campo.tipo === 'multipla') respostas[campo.id] = entradas.filter((e) => e.checked).map((e) => e.value);
      else if (campo.tipo === 'texto') respostas[campo.id] = entradas[0]?.value;
      else if (campo.tipo === 'data') {
        const semData = um<HTMLInputElement>(`input[name="${nome}-sem-data"]`);
        respostas[campo.id] = semData.checked ? SEM_DATA : entradas[0]?.value;
      } else respostas[campo.id] = entradas.find((e) => e.checked)?.value;
    }
    return respostas;
  }

  function mostrarErro(grupo: HTMLElement, mensagem: string | undefined) {
    const erro = grupo.querySelector<HTMLElement>('.campo__erro');
    if (erro) {
      erro.textContent = mensagem ?? '';
      erro.hidden = !mensagem;
    }
    for (const entrada of grupo.querySelectorAll('input')) {
      if (mensagem) entrada.setAttribute('aria-invalid', 'true');
      else entrada.removeAttribute('aria-invalid');
    }
  }

  function limparErros() {
    for (const erro of todos('.campo__erro')) {
      erro.textContent = '';
      erro.hidden = true;
    }
    for (const entrada of todos('[aria-invalid]')) entrada.removeAttribute('aria-invalid');
  }

  /** Mostra só os campos que valem para as respostas de agora e marca o que é opcional para este público. */
  function atualizarCampos() {
    const id = formularioAtual();
    if (!id) return;
    const publico = publicoAtual();
    const visiveis = new Set(camposVisiveis(dados.formularios[id], lerRespostas()).map((campo) => campo.id));
    for (const campo of dados.formularios[id]) {
      const bloco = blocoDoCampo(campo.id);
      bloco.hidden = !visiveis.has(campo.id);
      const obrigatorio = ehObrigatorio(campo, publico);
      const opcional = bloco.querySelector<HTMLElement>('[data-opcional]');
      if (opcional) opcional.hidden = obrigatorio;
      for (const entrada of todos<HTMLInputElement>('input[type="text"], input[type="date"]', bloco)) {
        entrada.setAttribute('aria-required', String(obrigatorio));
      }
      const data = bloco.querySelector<HTMLInputElement>('input[type="date"]');
      const semData = bloco.querySelector<HTMLInputElement>('[data-sem-data]');
      if (data && semData) data.disabled = semData.checked;
    }
  }

  function validar(etapa: Tela, mostrar: boolean): boolean {
    if (etapa === 'publico' || etapa === 'servico') {
      const ok = etapa === 'publico' ? publicoAtual() !== null : servico !== null;
      if (mostrar) mostrarErro(grupoDa(etapa), ok ? undefined : dados.erros.escolha);
      return ok;
    }
    if (etapa === 'detalhes') {
      const erros = validarCampos(camposAtuais(), lerRespostas(), publicoAtual(), hoje, dados.erros);
      if (mostrar) for (const campo of camposAtuais()) mostrarErro(blocoDoCampo(campo.id), erros[campo.id]);
      return Object.keys(erros).length === 0;
    }
    return true;
  }

  function validarNome(): boolean {
    const ok = campoNome.value.trim() !== '';
    mostrarErro(blocoDe(campoNome), ok ? undefined : dados.erros.nome);
    return ok;
  }

  /** Enquanto a pessoa corrige, o erro some do campo resolvido. Erro novo só aparece no "Continuar". */
  function revalidarErrosVisiveis() {
    if (tela === 'detalhes') {
      const erros = validarCampos(camposAtuais(), lerRespostas(), publicoAtual(), hoje, dados.erros);
      for (const campo of camposAtuais()) {
        const bloco = blocoDoCampo(campo.id);
        if (bloco.querySelector('[aria-invalid]') && !erros[campo.id]) mostrarErro(bloco, undefined);
      }
    }
    if (campoNome.hasAttribute('aria-invalid') && campoNome.value.trim()) mostrarErro(blocoDe(campoNome), undefined);
    if (campoContato.hasAttribute('aria-invalid') && tipoDeContato(campoContato.value)) {
      mostrarErro(blocoDe(campoContato), undefined);
    }
  }

  function marcar(nome: string, valor: string | null) {
    for (const radio of todos<HTMLInputElement>(`input[name="${nome}"]`)) radio.checked = radio.value === valor;
  }

  function marcarIdioma(slug: string) {
    for (const radio of todos<HTMLInputElement>('input[type="radio"][name$="-idioma"]')) {
      if (radio.value === slug) radio.checked = true;
    }
  }

  function atualizarModo() {
    dialogo.dataset.modo = modoDoDrawer(publicoAtual(), servico);
  }

  function atualizarLinks() {
    if (!servico) return;
    const mensagem = montarMensagem(
      {
        pagina: dados.pagina,
        publico: publicoAtual(),
        servico,
        campos: camposAtuais(),
        respostas: lerRespostas(),
        nome: campoNome.value,
        idiomas: dados.idiomas,
      },
      dados.modelos,
    );
    saidaWhatsApp.href = linkWhatsApp(dados.numero, mensagem);
    linkDeNovo.href = saidaWhatsApp.href;
  }

  function linhaDoPedido(texto: string) {
    const item = document.createElement('li');
    const divisa = texto.indexOf(': ');
    const rotulo = document.createElement('span');
    rotulo.className = 'pedido__rotulo';
    rotulo.textContent = texto.slice(0, divisa + 1);
    item.append(rotulo, ` ${texto.slice(divisa + 2)}`);
    return item;
  }

  function mostrarPedido() {
    if (!servico) return;
    const linhas = [
      `${dados.confirmacao.servico}: ${dados.servicos[servico]}`,
      ...linhasDoPedido(camposAtuais(), lerRespostas(), dados.idiomas),
    ];
    um('[data-linhas-pedido]').replaceChildren(...linhas.map(linhaDoPedido));
  }

  function atualizarResumo(indice: number) {
    const publico = publicoAtual();
    const valores: Record<string, string | null> = {
      publico: indice > 0 && publico ? dados.publicos[publico] : null,
      servico: indice > 1 && servico ? dados.servicos[servico] : null,
    };
    for (const item of todos('[data-resumo-de]')) {
      const valor = valores[item.dataset.resumoDe ?? ''];
      item.hidden = !valor;
      item.querySelector('[data-resumo-valor]')!.textContent = valor ?? '';
    }
    um('[data-resumo]').hidden = !valores.publico && !valores.servico;
  }

  function atualizarAcoes() {
    const perguntando = tela === 'publico' || tela === 'servico' || tela === 'detalhes';
    um('[data-voltar]').hidden = tela === 'publico' || tela === 'confirmado';
    um('[data-continuar]').hidden = !perguntando;
    um('[data-fechar-fim]').hidden = perguntando || tela === 'final';
  }

  function irPara(proxima: Tela) {
    window.clearTimeout(avanco);
    tela = proxima;
    const indice = ETAPAS.indexOf(proxima as Etapa);
    dialogo.dataset.passo = String(indice >= 0 ? indice + 1 : ETAPAS.length);
    textoDoPasso.textContent =
      indice >= 0 ? preencher(dados.passo, { n: String(indice + 1), total: String(ETAPAS.length) }) : '';

    for (const secao of todos('[data-etapa]')) secao.hidden = secao.dataset.etapa !== proxima;
    if (proxima === 'detalhes') {
      const id = formularioAtual();
      for (const bloco of todos('[data-formulario]')) bloco.hidden = bloco.dataset.formulario !== id;
      if (id) um('[data-titulo-detalhes]').textContent = dados.titulosDetalhes[id];
      atualizarCampos();
    }
    if (proxima === 'final') mostrarPedido();
    atualizarResumo(indice);
    atualizarAcoes();
    atualizarLinks();
    corpo.scrollTop = 0;
    um(`#etapa-${proxima}`).focus();
  }

  function continuar() {
    if (!(tela === 'publico' || tela === 'servico' || tela === 'detalhes')) return;
    if (!validar(tela, true)) {
      um(`[data-etapa="${tela}"]`).querySelector<HTMLElement>('[aria-invalid="true"]:not(:disabled)')?.focus();
      return;
    }
    irPara(primeiraEtapaPendente({ publico: publicoAtual(), servico, detalhesCompletos: validar('detalhes', false) }));
  }

  function voltar() {
    if (tela === 'aberto') return irPara('final');
    const indice = ETAPAS.indexOf(tela as Etapa);
    if (indice > 0) irPara(ETAPAS[indice - 1]);
  }

  function alternarReceber(abrir = painelReceber.hidden) {
    painelReceber.hidden = !abrir;
    botaoReceber.setAttribute('aria-expanded', String(abrir));
    if (abrir) campoContato.focus();
  }

  function enviarPedido() {
    const nomeOk = validarNome();
    const tipo = tipoDeContato(campoContato.value);
    mostrarErro(blocoDe(campoContato), tipo ? undefined : dados.erros.contato);
    if (!nomeOk) return campoNome.focus();
    if (!tipo || !servico) return campoContato.focus();
    const linhas = linhasDaConfirmacao(
      {
        servico: dados.servicos[servico],
        campos: camposAtuais(),
        respostas: lerRespostas(),
        idiomas: dados.idiomas,
        nome: campoNome.value,
        contato: campoContato.value,
      },
      dados.confirmacao,
    );
    um('[data-linhas-confirmacao]').replaceChildren(...linhas.map(linhaDoPedido));
    irPara('confirmado');
  }

  function fecharPaineis() {
    try {
      for (const painel of document.querySelectorAll<HTMLElement>(':popover-open')) painel.hidePopover();
    } catch {
      // Navegador sem popover: não há painel aberto para fechar.
    }
  }

  // No iPhone o teclado cobre a tela sem encolher a página: o drawer acompanha a área visível, com os
  // botões logo acima do teclado. Com zoom de pinça, ele volta ao tamanho da tela.
  const janela = window.visualViewport;
  function ajustarAoTeclado() {
    if (!janela || !dialogo.open) return;
    if (Math.abs(janela.scale - 1) > 0.01) {
      dialogo.style.removeProperty('--altura-visivel');
      dialogo.style.removeProperty('--topo-visivel');
      return;
    }
    dialogo.style.setProperty('--altura-visivel', `${janela.height}px`);
    dialogo.style.setProperty('--topo-visivel', `${janela.offsetTop}px`);
    // O drawer encolheu: o campo em foco pode ter saído da área que rola. Rola só o corpo, nunca a página.
    const foco = document.activeElement;
    if (!(foco instanceof HTMLElement) || !corpo.contains(foco)) return;
    const campo = foco.getBoundingClientRect();
    const area = corpo.getBoundingClientRect();
    const folga = 16;
    if (campo.bottom > area.bottom) corpo.scrollTop += campo.bottom - area.bottom + folga;
    else if (campo.top < area.top) corpo.scrollTop -= area.top - campo.top + folga;
  }
  janela?.addEventListener('resize', ajustarAoTeclado);
  janela?.addEventListener('scroll', ajustarAoTeclado);

  function abrir(origem: HTMLElement) {
    if (dialogo.open) return;
    abridor = origem;
    const publico = publicoAtual();
    marcar('drawer-publico', publico);
    servico = servicoInicial({ doBotao: origem.dataset.servico, anterior: servico, daPagina: dados.servicoDaPagina, publico });
    marcar('drawer-servico', servico);
    if (origem.dataset.idioma) marcarIdioma(origem.dataset.idioma);
    hoje = hojeLocal(new Date());
    for (const data of todos<HTMLInputElement>('input[type="date"]')) data.min = hoje;
    limparErros();
    alternarReceber(false);
    atualizarModo();
    fecharPaineis();
    dialogo.showModal();
    ajustarAoTeclado();
    irPara(primeiraEtapaPendente({ publico, servico, detalhesCompletos: validar('detalhes', false) }));
  }

  // Tab e Shift+Tab dão a volta dentro do drawer, também no Safari, que deixaria o foco sair para a barra.
  function prenderFoco(evento: KeyboardEvent) {
    const focaveis = todos<HTMLElement>(FOCAVEIS).filter(
      (el) => !el.matches(':disabled') && el.getClientRects().length > 0,
    );
    const primeiro = focaveis[0];
    const ultimo = focaveis.at(-1);
    if (!primeiro || !ultimo) return;
    const atual = document.activeElement;
    if (evento.shiftKey && (atual === primeiro || atual === dialogo)) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && atual === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    }
  }

  document.addEventListener('click', (evento) => {
    const origem = (evento.target as Element | null)?.closest?.<HTMLElement>('[data-abre-contato]');
    if (origem) abrir(origem);
  });

  dialogo.addEventListener('pointerdown', (evento) => {
    porPonteiro = true;
    toqueNoFundo = evento.target === dialogo;
  });

  dialogo.addEventListener('keydown', (evento) => {
    porPonteiro = false;
    if (evento.key === 'Tab') prenderFoco(evento);
  });

  dialogo.addEventListener('click', (evento) => {
    const alvo = evento.target as Element;
    // Toque no véu (fora do painel) fecha. O Safari não tem closedby, então a conta é feita aqui.
    if (alvo === dialogo) {
      if (toqueNoFundo) dialogo.close();
      return;
    }
    if (alvo.closest('[data-fecha-contato]')) return dialogo.close();
    const destino = alvo.closest<HTMLElement>('[data-ir-para]');
    if (destino) return irPara(destino.dataset.irPara as Etapa);
    if (alvo.closest('[data-voltar]')) return voltar();
    if (alvo.closest('[data-abre-receber]')) return alternarReceber();

    // No toque, escolher o público ou o serviço já avança. No teclado, as setas só marcam; o Enter avança.
    const escolhaDePasso = alvo instanceof HTMLInputElement && /^drawer-(publico|servico)$/.test(alvo.name);
    if (escolhaDePasso && porPonteiro) {
      const etapaDoToque = tela;
      window.clearTimeout(avanco);
      avanco = window.setTimeout(() => {
        if (tela === etapaDoToque) continuar();
      }, PAUSA_DO_TOQUE);
    }
  });

  dialogo.addEventListener('change', (evento) => {
    const alvo = evento.target;
    if (!(alvo instanceof HTMLInputElement)) return;
    if (alvo.name === 'drawer-publico') {
      escolherPublico(publicoValido(alvo.value));
      mostrarErro(grupoDa('publico'), undefined);
    } else if (alvo.name === 'drawer-servico') {
      servico = alvo.value as ServicoId;
      mostrarErro(grupoDa('servico'), undefined);
      atualizarModo();
    } else {
      atualizarCampos();
      revalidarErrosVisiveis();
    }
    atualizarLinks();
  });

  dialogo.addEventListener('input', (evento) => {
    const alvo = evento.target;
    if (!(alvo instanceof HTMLInputElement) || alvo.type !== 'text') return;
    revalidarErrosVisiveis();
    atualizarLinks();
  });

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    if (tela !== 'final') return continuar();
    if (!painelReceber.hidden) return enviarPedido();
    // Enter no nome: com o nome certo, o foco vai para a saída principal.
    if (validarNome()) saidaWhatsApp.focus();
    else campoNome.focus();
  });

  saidaWhatsApp.addEventListener('click', (evento) => {
    if (!validarNome()) {
      evento.preventDefault();
      campoNome.focus();
      return;
    }
    atualizarLinks();
    // Depois do clique, para a troca de tela não atrapalhar a abertura do link.
    window.setTimeout(() => irPara('aberto'));
  });

  dialogo.addEventListener('close', () => {
    window.clearTimeout(avanco);
    if (abridor?.isConnected) abridor.focus();
    abridor = null;
  });

  aoMudarPublico((publico: Publico | null) => {
    marcar('drawer-publico', publico);
    atualizarModo();
  });
}

function iniciarBotaoFlutuante(botao: HTMLAnchorElement) {
  const neutro = botao.href;
  const atualizar = (publico: Publico | null) => {
    const porPublico = publico === 'empresa' ? botao.dataset.hrefEmpresa : publico === 'voce' ? botao.dataset.hrefVoce : undefined;
    botao.href = porPublico ?? neutro;
  };
  atualizar(publicoAtual());
  aoMudarPublico(atualizar);

  let ultimoY = window.scrollY;
  addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      if (Math.abs(y - ultimoY) < 8) return;
      botao.toggleAttribute('data-recolhido', y > ultimoY && y > 160);
      ultimoY = y;
    },
    { passive: true },
  );
}
