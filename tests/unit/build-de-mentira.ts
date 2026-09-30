// Um build de mentira numa pasta temporária, para testar o que lê o dist/ e o dist-producao/. As pastas somem
// depois de cada teste.
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach } from 'vitest';

const pastas: string[] = [];

afterEach(() => {
  for (const pasta of pastas.splice(0)) rmSync(pasta, { recursive: true, force: true });
});

/** Cada chave é o caminho do arquivo dentro da pasta, e o valor é o conteúdo. */
export function montarBuild(arquivos: Record<string, string>): string {
  const pasta = mkdtempSync(join(tmpdir(), 'build-'));
  pastas.push(pasta);
  for (const [caminho, conteudo] of Object.entries(arquivos)) {
    const alvo = join(pasta, caminho);
    mkdirSync(dirname(alvo), { recursive: true });
    writeFileSync(alvo, conteudo, 'utf8');
  }
  return pasta;
}
