/** O localStorage, ou nada quando o navegador o bloqueia (cookies desligados, alguns modos privados). */
export const armazenamento: Storage | undefined = (() => {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
})();
