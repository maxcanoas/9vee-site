import { getEntry } from 'astro:content';

export async function paginaHome() {
  return exigir(await getEntry('home', 'home'), 'content/home.md');
}

export async function paginaNr1() {
  return exigir(await getEntry('nr1', 'treinamento-nr-1'), 'content/treinamento-nr-1.md');
}

export async function paginaIdiomas() {
  return exigir(await getEntry('idiomas', 'curso-de-idiomas'), 'content/curso-de-idiomas.md');
}

export async function paginaParcial(id: 'traducao-simultanea' | 'lms' | 'quem-somos') {
  return exigir(await getEntry('parciais', id), `content/${id}.md`);
}

function exigir<T>(entrada: T | undefined, arquivo: string): T {
  if (!entrada) throw new Error(`${arquivo} não encontrado`);
  return entrada;
}
