import type { APIRoute } from 'astro';
import { MODO } from 'astro:env/server';

// O robots libera em todos os modos. Fora da produção, o site sai do Google pelo noindex da meta e do
// cabeçalho, e não por aqui: com o rastreador bloqueado, ele nunca chegaria a ler o noindex.
export const GET: APIRoute = ({ site }) => {
  const linhas = ['User-agent: *', 'Allow: /'];
  if (MODO === 'producao') linhas.push('', `Sitemap: ${new URL('/sitemap.xml', site).href}`);
  return new Response(`${linhas.join('\n')}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
