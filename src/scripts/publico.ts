import { gravarPublico, lerPublico, ordenarPorPublico, publicoValido, type Publico } from '../lib/publico';

const armazenamento = (() => {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
})();

const ouvintes = new Set<(publico: Publico | null) => void>();

export function publicoAtual(): Publico | null {
  return publicoValido(document.documentElement.dataset.publico);
}

/** Avisa quem depende do público (o drawer e o atalho do WhatsApp) a cada troca. */
export function aoMudarPublico(ouvinte: (publico: Publico | null) => void): void {
  ouvintes.add(ouvinte);
}

function aplicar(publico: Publico | null) {
  const raiz = document.documentElement;
  if (publico) raiz.dataset.publico = publico;
  else delete raiz.dataset.publico;

  for (const radio of document.querySelectorAll<HTMLInputElement>('input[name="publico"]')) {
    radio.checked = radio.value === publico;
  }

  // O CSS já mostra a ordem certa; mover o DOM faz a ordem do Tab e do leitor de tela bater com a da tela.
  // `data-ordenavel="voce"` diz que, sem escolha, a lista abre na ordem de quem estuda por conta própria.
  for (const lista of document.querySelectorAll<HTMLElement>('[data-ordenavel]')) {
    const semEscolha = publicoValido(lista.dataset.ordenavel);
    const itens = [...lista.children]
      .filter((filho): filho is HTMLElement => filho instanceof HTMLElement)
      .map((el) => ({ el, ordemEmpresa: Number(el.dataset.ordemEmpresa), ordemVoce: Number(el.dataset.ordemVoce) }));
    for (const { el } of ordenarPorPublico(itens, publico ?? semEscolha)) lista.append(el);
  }

  for (const ouvinte of ouvintes) ouvinte(publico);
}

/** Grava e aplica a escolha. Na home, a troca roda numa View Transition (se a ordem mudar, os cartões deslizam); dentro do drawer, é seca. */
export function escolherPublico(publico: Publico | null, animar = false): void {
  gravarPublico(armazenamento, publico);
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (animar && !reduzido && 'startViewTransition' in document) document.startViewTransition(() => aplicar(publico));
  else aplicar(publico);
}

function aoEscolher(evento: Event) {
  const alvo = evento.target;
  if (!(alvo instanceof HTMLInputElement) || alvo.name !== 'publico') return;
  escolherPublico(publicoValido(alvo.value), true);
}

aplicar(lerPublico(armazenamento));
document.addEventListener('change', aoEscolher);

// Página restaurada do cache (voltar) ou pré-renderizada antes da escolha: reaplica o que está salvo.
addEventListener('pageshow', (evento) => {
  if (evento.persisted) aplicar(lerPublico(armazenamento));
});
document.addEventListener('prerenderingchange', () => aplicar(lerPublico(armazenamento)));
