// Um valor do .env de um modo, lido sem o Astro, pela trava de produção e pelo teste do envio.
import { existsSync, readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';

/** O valor, ou nada quando o arquivo não existe nesta máquina ou o valor está vazio. */
export function lerDoEnv(arquivo: string, nome: string): string | undefined {
  const caminho = new URL(`../${arquivo}`, import.meta.url);
  if (!existsSync(caminho)) return undefined;
  return parseEnv(readFileSync(caminho, 'utf8'))[nome] || undefined;
}
