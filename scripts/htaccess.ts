// O .htaccess do site na HostGator (Apache), gerado a partir do mapa de redirecionamentos aprovado (ticket 19). Só o
// build de produção leva este arquivo: o preview fica no Cloudflare, que não lê .htaccess.
//
// A ordem importa. Primeiro o mapa, com o destino já em https e www, para a URL antiga chegar à nova num salto só, de
// qualquer endereço (http, sem www). Depois o domínio canônico, e por fim a barra no fim do endereço.
import { escaparRegex } from '../src/lib/texto.ts';

export interface LinhaDoHtaccess {
  origem: string;
  destino: string;
  tipo: string;
}

const DOMINIO = 'https://www.9vee.com.br';

/** O caminho como o Apache compara no .htaccess: sem a barra do começo, decodificado e com os sinais da regex escapados. */
export function padraoDaOrigem(origem: string): string {
  const caminho = decodeURIComponent(origem).replace(/^\//, '');
  // O Apache separa a regra nos espaços: a linha sairia inválida, e o site inteiro responderia com erro 500.
  if (/\s/.test(caminho)) throw new Error(`${origem}: origem com espaço, que o .htaccess não aceita como regra`);
  return `^${escaparRegex(caminho)}$`;
}

/** As regras do mapa: 301 com destino completo e 410 com a flag G. O 200 (a mesma página) não pede regra. */
export function regrasDoMapa(linhas: readonly LinhaDoHtaccess[]): string[] {
  return linhas.flatMap(({ origem, destino, tipo }) => {
    if (tipo === '200') return [];
    if (tipo === '410') return [`RewriteRule ${padraoDaOrigem(origem)} - [G,L]`];
    if (tipo !== '301' || !destino.startsWith('/')) throw new Error(`${origem}: linha do mapa sem destino válido (${tipo} ${destino})`);
    return [`RewriteRule ${padraoDaOrigem(origem)} ${DOMINIO}${destino} [R=301,L]`];
  });
}

export function montarHtaccess(linhas: readonly LinhaDoHtaccess[]): string {
  return `# Gerado pelo build de produção (scripts/htaccess.ts) a partir de docs/redirects.csv. Não editar à mão: mude o
# mapa e gere o build de novo.

Options -MultiViews -Indexes
DirectoryIndex index.html
AddDefaultCharset utf-8
AddType application/manifest+json .webmanifest

# A página de erro do site serve também para o endereço que saiu de vez (410): ela diz que a página não existe ou
# mudou de lugar, e leva aos serviços.
ErrorDocument 404 /404.html
ErrorDocument 410 /404.html

RewriteEngine On

# O mapa de redirecionamentos: ${linhas.filter((l) => l.tipo === '301').length} endereços em 301 e ${linhas.filter((l) => l.tipo === '410').length} em 410.
${regrasDoMapa(linhas).join('\n')}

# HTTPS e www num salto só.
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} !^www\\.9vee\\.com\\.br$ [NC]
RewriteRule ^ ${DOMINIO}%{REQUEST_URI} [R=301,L]

# Barra no fim: /lms vai para /lms/ quando a pasta tem a página.
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}/index.html -f
RewriteRule ^(.+[^/])$ ${DOMINIO}/$1/ [R=301,L]

# Compressão do texto (HTML, CSS, JavaScript, SVG e os arquivos de dados).
<IfModule mod_brotli.c>
  AddOutputFilterByType BROTLI_COMPRESS text/html text/css text/plain text/xml application/javascript application/json application/xml application/manifest+json image/svg+xml
</IfModule>
<IfModule !mod_brotli.c>
  <IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json application/xml application/manifest+json image/svg+xml
  </IfModule>
</IfModule>

<IfModule mod_headers.c>
  # Cache: o que está em /_astro/ tem o conteúdo no nome do arquivo e nunca muda; a página é conferida a cada visita;
  # o resto (ícones, prévias, robots e sitemap) vale por um dia.
  <If "%{REQUEST_URI} =~ m#^/_astro/#">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </If>
  <ElseIf "%{REQUEST_URI} =~ m#(/|\\.html)$#">
    Header set Cache-Control "no-cache"
  </ElseIf>
  <Else>
    Header set Cache-Control "public, max-age=86400"
  </Else>

  # O Wix manda o HSTS de um ano: o site novo mantém, só no HTTPS.
  Header always set Strict-Transport-Security "max-age=31536000" env=HTTPS
</IfModule>
`;
}
