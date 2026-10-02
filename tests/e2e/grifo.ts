// O contraste do texto sobre a faixa do grifo, medido no navegador. A faixa passa por trás da parte de baixo das
// letras, então ali o texto precisa dos mesmos 4,5:1 do resto da página. A função roda dentro da página, pelo
// evaluateAll: por isso não usa nada de fora dela.
export function contrasteSobreOGrifo(grifos: Element[]) {
  // O canvas converte qualquer cor CSS (oklab, color-mix resolvido) para RGB.
  const tela = document.createElement('canvas').getContext('2d')!;
  const rgb = (cor: string) => {
    tela.clearRect(0, 0, 1, 1);
    tela.fillStyle = cor;
    tela.fillRect(0, 0, 1, 1);
    return [...tela.getImageData(0, 0, 1, 1).data.slice(0, 3)];
  };
  const luminancia = (cor: string) => {
    const [r, g, b] = rgb(cor).map((v) => (v / 255 <= 0.04045 ? v / 255 / 12.92 : ((v / 255 + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  return grifos.map((grifo) => {
    const estilo = getComputedStyle(grifo);
    const faixa = /^(\w+\([^)]*\)|#\w+|\w+)/.exec(estilo.boxShadow)?.[1] ?? '';
    const [a, b] = [luminancia(estilo.color), luminancia(faixa)];
    return { texto: grifo.textContent?.trim(), razao: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) };
  });
}
