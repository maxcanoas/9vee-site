import { defineConfig, devices } from '@playwright/test';

// O Chrome instalado na máquina (channel 'chrome') roda o celular Android e o desktop.
// O WebKit do Playwright faz as vezes do iPhone. Não é o Safari: animação e teclado virtual ficam para o
// teste no aparelho de verdade.
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4400',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node scripts/servidor-preview.ts',
    url: 'http://localhost:4400',
    reuseExistingServer: false,
    timeout: 60_000,
  },
  projects: [
    { name: 'celular', use: { ...devices['Pixel 7'], channel: 'chrome' } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    // Sem rastro no WebKit: no Windows, com vários workers, a gravação de telas do rastro trava os quadros
    // da página e os cliques ficam esperando o elemento "parar". Com o rastro desligado, 8 de 8 passam.
    { name: 'iphone', use: { ...devices['iPhone 15'], trace: 'off' } },
  ],
});
