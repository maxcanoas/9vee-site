import { defineConfig, devices } from '@playwright/test';

// Usa o Chrome instalado na máquina (channel 'chrome'), sem baixar outro navegador.
// O WebKit entra na etapa 3, com os testes do drawer.
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
  ],
});
