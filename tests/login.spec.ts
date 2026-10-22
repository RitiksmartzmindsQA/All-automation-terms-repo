import { test, expect } from '@playwright/test';
import { loginData, negativeLoginScenarios } from '../test-data/loginData';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('LOGIN-001: Verify user can login with valid credentials', async ({ page }) => {
    await page.locator('[data-test="username"]').fill(loginData.validUser);
    await page.locator('[data-test="password"]').fill(loginData.validPassword);

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  for (const scenario of negativeLoginScenarios) {
    test(`${scenario.testId}: Verify login fails with ${scenario.scenario}`, async ({ page }) => {
      await page.locator('[data-test="username"]').fill(scenario.username);
      await page.locator('[data-test="password"]').fill(scenario.password);

      await page.getByRole('button', { name: 'Login' }).click();

      await expect(page.locator('[data-test="error"]')).toBeVisible();
    });
  }
});
