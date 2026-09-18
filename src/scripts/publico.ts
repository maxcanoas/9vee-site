import { gravarPublico, lerPublico, ordenarPorPublico, publicoValido, type Publico } from '../lib/publico';

const armazenamento = (() => {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
})();

function aplicar(publico: Publico | null) {
  const raiz = document.documentElement;
  if (publico) raiz.dataset.publico = publico;
  else delete raiz.dataset.publico;

  for (const radio of document.querySelectorAll<HTMLInputElement>('input[name="publico"]')) {
    radio.checked = radio.value === publico;
  }

  // O CSS já mostra a ordem certa; mover o DOM faz a ordem do Tab e do leitor de tela bater com a da tela.
  for (const lista of document.querySelectorAll<HTMLElement>('[data-ordenavel]')) {
    const itens = [...lista.children]
      .filter((filho): filho is HTMLElement => filho instanceof HTMLElement)
      .map((el) => ({ el, ordemEmpresa: Number(el.dataset.ordemEmpresa), ordemVoce: Number(el.dataset.ordemVoce) }));
    for (const { el } of ordenarPorPublico(itens, publico)) lista.append(el);
  }
}

function aoEscolher(evento: Event) {
  const alvo = evento.target;
  if (!(alvo instanceof HTMLInputElement) || alvo.name !== 'publico') return;
  const publico = publicoValido(alvo.value);
  gravarPublico(armazenamento, publico);
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduzido && 'startViewTransition' in document) document.startViewTransition(() => aplicar(publico));
  else aplicar(publico);
}

aplicar(lerPublico(armazenamento));
document.addEventListener('change', aoEscolher);

// Página restaurada do cache (voltar) ou pré-renderizada antes da escolha: reaplica o que está salvo.
addEventListener('pageshow', (evento) => {
  if (evento.persisted) aplicar(lerPublico(armazenamento));
});
document.addEventListener('prerenderingchange', () => aplicar(lerPublico(armazenamento)));
