// Movimento que o CSS não resolve sozinho: contadores e, onde não há animação por rolagem
// (Firefox) ou o sistema pede menos movimento, as revelações e a troca de etapa do "Como funciona".
const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
const temTimeline = CSS.supports('animation-timeline: view()');
const temObservador = 'IntersectionObserver' in window;

function contar(elemento: HTMLElement) {
  const alvo = Number(elemento.dataset.contador);
  const inicio = performance.now();
  const duracao = 1200;
  const passo = (agora: number) => {
    const progresso = Math.min(1, (agora - inicio) / duracao);
    elemento.textContent = String(Math.round(alvo * (1 - (1 - progresso) ** 3)));
    if (progresso < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

if (!reduzido && temObservador) {
  const contadores = document.querySelectorAll<HTMLElement>('[data-contador]');
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        observador.unobserve(entrada.target);
        contar(entrada.target as HTMLElement);
      }
    },
    { threshold: 0.6 },
  );
  // O HTML traz o número final (vale sem JS e para o Google); a contagem parte do zero.
  for (const contador of contadores) {
    contador.textContent = '0';
    observador.observe(contador);
  }
}

if (!reduzido && !temTimeline && temObservador) {
  const pendentes = [...document.querySelectorAll<HTMLElement>('.revela')].filter(
    (el) => el.getBoundingClientRect().top > innerHeight,
  );
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.remove('revela--espera');
        observador.unobserve(entrada.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  for (const el of pendentes) {
    el.classList.add('revela--espera');
    observador.observe(el);
  }
}

if ((reduzido || !temTimeline) && temObservador) {
  for (const secao of document.querySelectorAll<HTMLElement>('[data-como]')) {
    secao.dataset.ativa = '1';
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) secao.dataset.ativa = (entrada.target as HTMLElement).dataset.etapa;
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    for (const etapa of secao.querySelectorAll('.como__etapa')) observador.observe(etapa);
  }
}
