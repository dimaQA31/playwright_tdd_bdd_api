import { Locator, Page } from '@playwright/test';
import { CartPage } from './cartPage';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly inventoryItemName: Locator;
  readonly cartButton: Locator;
  readonly sortContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItemName = page.locator('.inventory_item_name');
    this.cartButton = page.locator('.shopping_cart_link');
    this.sortContainer = page.locator('[data-test="product_sort_container"]');
  }

  async addProductToCart(productTitle: string) {
    await this.inventoryList.waitFor({ state: 'visible', timeout: 55000 });
    await this.page
      .locator(
        `
      //div[text()="${productTitle}"]//ancestor::div[@class="inventory_item_description"]//button[text()="Add to cart"]`
      )
      .click();
    await this.page
      .locator(
        `
      //div[text()="${productTitle}"]//ancestor::div[@class="inventory_item_description"]//button[text()="Remove"]`
      )
      .waitFor({ state: 'visible', timeout: 30000 });
  }

  async getItemPrice(productTitle: string) {
    return this.page
      .locator(
        `
      //div[text()="${productTitle}"]//ancestor::div[@class="inventory_item_description"]//div[@class="inventory_item_price"]`
      )
      .textContent();
  }

  async goToCart() {
    const cartPage = new CartPage(this.page);
    await this.cartButton.click();
    await cartPage.cartTitle.waitFor({ state: 'visible', timeout: 30000 });
  }

  getCurrentSortArray() {
    return this.inventoryItemName.allTextContents();
  }

  async sortBy(option: string) {
    await this.sortContainer.selectOption(option);
    const currentSort = await this.getCurrentSortArray();
    return currentSort.join('');
  }

  async sortAlphabetically() {
    const itemsArray = await this.getCurrentSortArray();
    itemsArray.sort(function (a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
    return itemsArray.join('');
  }
}
