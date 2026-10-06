import type { APIRoute } from 'astro';
import { dadosDoSite } from '../lib/site';

// O manifesto: o nome e o ícone que o Android usa quando a pessoa põe o site na tela inicial. O site abre no
// navegador, como qualquer página: não é um aplicativo. Os ícones saem do scripts/gerar-ativos.ts, e o de 512 também
// serve recortado em círculo (maskable), porque o "9" fica dentro da área que o Android preserva.
export const GET: APIRoute = async () => {
  const { marca } = await dadosDoSite();
  const manifesto = {
    name: marca.nome,
    short_name: marca.nome,
    lang: 'pt-BR',
    start_url: '/',
    display: 'browser',
    background_color: '#f9f9f9',
    theme_color: '#f9f9f9',
    icons: [
      { src: '/icone-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icone-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icone-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
  return new Response(`${JSON.stringify(manifesto, null, 2)}\n`, {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
};
