import { getEntry } from 'astro:content';

export async function dadosDoSite() {
  const entrada = await getEntry('site', 'site');
  if (!entrada) throw new Error('content/site.md não encontrado');
  return entrada.data;
}

export type DadosDoSite = Awaited<ReturnType<typeof dadosDoSite>>;

export function linkWhatsApp(numero: string, mensagem?: string): string {
  const base = `https://wa.me/${numero}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}
