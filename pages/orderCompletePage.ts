import { Locator, Page } from '@playwright/test';

export class OrderCompletePage {
  readonly page: Page;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successMessage = page.locator('.complete-header');
  }
}
