// O carrossel dos depoimentos: as setas andam um cartão por vez, e os pontos mostram em que parada a faixa está.
// A rolagem é a da própria faixa (scroll-snap no CSS), então o dedo, o mouse e o teclado continuam valendo. Nada
// anda sozinho. Na ponta, a seta fica com aria-disabled, e não disabled, para o foco não cair no corpo da página.
const menosMovimento = matchMedia('(prefers-reduced-motion: reduce)');

function iniciar(carrossel: HTMLElement) {
  const trilho = carrossel.querySelector<HTMLElement>('[data-carrossel-trilho]');
  const anterior = carrossel.querySelector<HTMLButtonElement>('[data-carrossel-anterior]');
  const proximo = carrossel.querySelector<HTMLButtonElement>('[data-carrossel-proximo]');
  const pontos = carrossel.querySelector<HTMLElement>('[data-carrossel-pontos]');
  if (!trilho || !anterior || !proximo || !pontos) return;
  const cartoes = [...trilho.children] as HTMLElement[];

  // A distância de um cartão ao seguinte, com o espaço entre eles: é o tamanho de um passo.
  const passo = () => (cartoes.length > 1 ? cartoes[1].offsetLeft - cartoes[0].offsetLeft : trilho.clientWidth);
  const fim = () => trilho.scrollWidth - trilho.clientWidth;

  const andar = (botao: HTMLButtonElement, sentido: 1 | -1) => {
    if (botao.getAttribute('aria-disabled') === 'true') return;
    trilho.scrollBy({ left: sentido * passo(), behavior: menosMovimento.matches ? 'auto' : 'smooth' });
  };
  anterior.addEventListener('click', () => andar(anterior, -1));
  proximo.addEventListener('click', () => andar(proximo, 1));

  const atualizar = () => {
    const maximo = fim();
    // Um pixel de folga: com zoom no navegador, a rolagem para em frações.
    const cabe = maximo <= 1;
    carrossel.toggleAttribute('data-cabe', cabe);
    anterior.setAttribute('aria-disabled', String(trilho.scrollLeft <= 1));
    proximo.setAttribute('aria-disabled', String(trilho.scrollLeft >= maximo - 1));

    const paradas = cabe ? 1 : Math.round(maximo / passo()) + 1;
    if (pontos.children.length !== paradas) pontos.replaceChildren(...Array.from({ length: paradas }, () => document.createElement('span')));
    const atual = trilho.scrollLeft >= maximo - 1 ? paradas - 1 : Math.round(trilho.scrollLeft / passo());
    [...pontos.children].forEach((ponto, i) => ponto.toggleAttribute('data-atual', i === atual));
  };

  let pedido = 0;
  trilho.addEventListener(
    'scroll',
    () => {
      cancelAnimationFrame(pedido);
      pedido = requestAnimationFrame(atualizar);
    },
    { passive: true },
  );
  new ResizeObserver(atualizar).observe(trilho);
  atualizar();
}

for (const carrossel of document.querySelectorAll<HTMLElement>('[data-carrossel]')) iniciar(carrossel);
