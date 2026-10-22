import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/loginData';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Product Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill(loginData.validUser);
    await page.locator('[data-test="password"]').fill(loginData.validPassword);

    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('PROD-001: Verify products are displayed', async ({ page }) => {
    const products = page.locator('[data-test="inventory-item"]');

    await expect(products.first()).toBeVisible();
    await expect(products).toHaveCount(6);
  });

  test('PROD-002: Verify every product has a name and price', async ({ page }) => {
    const products = page.locator('[data-test="inventory-item"]');

    const productCount = await products.count();

    for (let i = 0; i < productCount; i++) {
      const product = products.nth(i);

      await expect(product.locator('[data-test="inventory-item-name"]')).toBeVisible();

      await expect(product.locator('[data-test="inventory-item-price"]')).toBeVisible();
    }
  });

  test('PROD-003: Verify products are sorted A to Z', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortProducts('az');

    const actualProductNames = await productsPage.productNames.allTextContents();
    const expectedProductNames = [...actualProductNames].sort();

    expect(actualProductNames).toEqual(expectedProductNames);
  });

  test('PROD-004: Verify products are sorted Z to A', async ({ page }) => {
    const sortDropdown = page.locator('[data-test="product-sort-container"]');
    const products = page.locator('[data-test="inventory-item-name"]');

    await sortDropdown.selectOption('za');

    const actualProductNames = await products.allTextContents();

    const expectedProductNames = [...actualProductNames].sort().reverse();

    expect(actualProductNames).toEqual(expectedProductNames);
  });

  test('PROD-005: Verify products are sorted by price low to high', async ({ page }) => {
    const sortDropdown = page.locator('[data-test="product-sort-container"]');
    const prices = page.locator('[data-test="inventory-item-price"]');

    await sortDropdown.selectOption('lohi');

    const actualPrices = await prices.allTextContents();

    const actualPriceNumbers = actualPrices.map((price) => Number(price.replace('$', '')));

    const expectedPrices = [...actualPriceNumbers].sort((a, b) => a - b);

    expect(actualPriceNumbers).toEqual(expectedPrices);
  });

  test('PROD-006: Verify products are sorted by price high to low', async ({ page }) => {
    const sortDropdown = page.locator('[data-test="product-sort-container"]');
    const prices = page.locator('[data-test="inventory-item-price"]');

    await sortDropdown.selectOption('hilo');

    const actualPrices = await prices.allTextContents();

    const actualPriceNumbers = actualPrices.map((price) => Number(price.replace('$', '')));

    const expectedPrices = [...actualPriceNumbers].sort((a, b) => b - a);

    expect(actualPriceNumbers).toEqual(expectedPrices);
  });

  test('PROD-007: Verify product details match the product listing', async ({ page }) => {
    const product = page.locator('[data-test="inventory-item"]').first();

    const productName = await product.locator('[data-test="inventory-item-name"]').textContent();
    const productPrice = await product.locator('[data-test="inventory-item-price"]').textContent();

    await product.locator('[data-test="inventory-item-name"]').click();

    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(productName!);
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText(productPrice!);
  });
});
