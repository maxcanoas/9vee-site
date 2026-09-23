import { expect, test } from '@playwright/test';

// As animações por rolagem são conferidas só no Chromium: o WebKit do Playwright não é o Safari.
test.skip(({ browserName }) => browserName !== 'chromium', 'animação por rolagem conferida só no Chromium');

test.describe('sem preferência de movimento', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('o hero anima com a rolagem', async ({ page }) => {
    await page.goto('/');
    const animacao = await page.locator('.hero__circulo').evaluate((el) => getComputedStyle(el).animationName);
    expect(animacao).not.toBe('none');
  });
});

test.describe('com movimento reduzido', () => {
  test.use({ reducedMotion: 'reduce' });

  test('nada anima na home, nem rolando', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() =>
      window.scrollTo({ top: document.documentElement.scrollHeight / 2, behavior: 'instant' }),
    );
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  });

  test('os contadores mostram o número final, sem contar', async ({ page }) => {
    await page.goto('/');
    await page.locator('.prova').scrollIntoViewIfNeeded();
    for (const contador of await page.locator('[data-contador]').all()) {
      await expect(contador).toHaveText((await contador.getAttribute('data-contador'))!);
    }
  });
});
