// O sitemap da produção: as páginas que o build gerou. A página de idioma não publicada não chega ao build de
// produção, então também não chega aqui. O endereço é /sitemap.xml, o que o Search Console já conhece do Wix.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { listarArquivos, rotaDoArquivo } from './paginas-do-build.ts';

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' };

/**
 * O XML do sitemap, com um endereço por página, no domínio definitivo. Só entram as rotas com barra no fim: a
 * página de erro (/404) responde por qualquer endereço que não existe e não tem endereço próprio.
 */
export function montarSitemap(rotas: readonly string[], dominio: string): string {
  const enderecos = rotas
    .filter((rota) => rota.endsWith('/'))
    .sort()
    .map((rota) => `  <url><loc>${new URL(rota, dominio).href.replace(/[&<>"']/g, (c) => ESCAPES[c])}</loc></url>`);
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...enderecos,
    '</urlset>',
    '',
  ].join('\n');
}

/** Escreve o sitemap.xml na pasta do build e devolve quantos endereços ele tem. */
export function escreverSitemap(pasta: string, dominio: string): number {
  const xml = montarSitemap(
    listarArquivos(pasta, '.html').map((arquivo) => rotaDoArquivo(pasta, arquivo)),
    dominio,
  );
  writeFileSync(join(pasta, 'sitemap.xml'), xml);
  return xml.match(/<url>/g)?.length ?? 0;
}
