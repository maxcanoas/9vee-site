import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const pasta = fileURLToPath(new URL('../e2e/', import.meta.url));
const testes = readdirSync(pasta).filter((nome) => nome.endsWith('.spec.ts'));
// O import de valor do `test` do Playwright: `import { expect, test } from '@playwright/test'`. O de tipo não conta.
const TEST_DO_PLAYWRIGHT = /import\s*\{[^}]*(?<!type\s)\btest\b[^}]*\}\s*from\s*'@playwright\/test'/;

describe('testes de navegador', () => {
  // O `test` de tests/e2e/pedido.ts responde no lugar do serviço de formulário. Com o do Playwright, um teste que
  // chegasse ao "Pedir contato" mandaria um pedido de verdade para a caixa de quem recebe os leads.
  it.each(testes)('%s usa o test que nunca deixa um pedido sair de verdade', (nome) => {
    const codigo = readFileSync(`${pasta}${nome}`, 'utf8');
    expect(codigo).not.toMatch(TEST_DO_PLAYWRIGHT);
    expect(codigo).toMatch(/import\s*\{[^}]*\btest\b[^}]*\}\s*from\s*'\.\/pedido\.ts'/);
  });

  it('acha os arquivos de teste', () => {
    expect(testes.length).toBeGreaterThanOrEqual(9);
  });
});
