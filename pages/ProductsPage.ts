import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly products: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('[data-test="inventory-item"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async sortProducts(value: string) {
    await this.sortDropdown.selectOption(value);
  }
}
