import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTitle: Locator;
  readonly inventoryName: Locator;
  readonly checkoutButton: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly itemTotal: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTitle = page.locator('//span[text()="Your Cart"]');
    this.inventoryName = page.locator('.inventory_item_name');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameField = page.locator('[data-test="firstName"]');
    this.lastNameField = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async removeItem(productTitle: string) {
    await this.page
      .locator(
        `//div[text()="${productTitle}"]//ancestor::div[@class="cart_item_label"]//button[text()="Remove"]`
      )
      .click();
  }

  async proceedOrder(firstName: string, lastName: string, postalCode: string) {
    await this.checkoutButton.click();
    await this.firstNameField.type(firstName);
    await this.lastNameField.type(lastName);
    await this.postalCode.type(postalCode);
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}
