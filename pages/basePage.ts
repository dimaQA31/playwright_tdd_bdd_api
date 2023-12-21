import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToPage(pageName: string) {
    switch (pageName.toLowerCase()) {
      case 'login page':
        await this.page.goto('/');
        break;
      default:
        throw new Error(
          'Unsupported page passed in, please extend the step definition!'
        );
    }
    await this.page.waitForLoadState();
  }
}
