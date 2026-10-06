// Leitura de uma pasta de build (dist/ ou dist-producao/): as páginas e o arquivo de cada rota.
// Os testes do HTML gerado e a trava de produção leem o build do mesmo jeito.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { parse, type HTMLElement } from 'node-html-parser';

export interface Pagina {
  arquivo: string;
  rota: string;
  html: string;
  raiz: HTMLElement;
}

/** Os arquivos com a extensão, na pasta e nas subpastas. */
export function listarArquivos(pasta: string, extensao: string): string[] {
  return readdirSync(pasta).flatMap((nome) => {
    const caminho = join(pasta, nome);
    if (statSync(caminho).isDirectory()) return listarArquivos(caminho, extensao);
    return nome.endsWith(extensao) ? [caminho] : [];
  });
}

/** O caminho do site que um arquivo HTML do build responde: /lms/index.html é /lms/, e 404.html é /404. */
export function rotaDoArquivo(pasta: string, arquivo: string): string {
  const relativo = relative(pasta, arquivo).split(sep).join('/');
  return `/${relativo.replace(/index\.html$/, '').replace(/\.html$/, '')}`;
}

export function carregarPaginas(pasta: string): Pagina[] {
  return listarArquivos(pasta, '.html').map((arquivo) => {
    const html = readFileSync(arquivo, 'utf8');
    return { arquivo, rota: rotaDoArquivo(pasta, arquivo), html, raiz: parse(html) };
  });
}

/** O arquivo que responde a um caminho do site: a pasta com index.html, ou o próprio arquivo. */
export function arquivoDaRota(pasta: string, caminho: string): string {
  return caminho.endsWith('/') ? join(pasta, caminho, 'index.html') : join(pasta, caminho);
}
