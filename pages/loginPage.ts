import { Locator, Page } from '@playwright/test';

interface Login {
  page: Page;
  loginLogo: Locator;
  userNameInput: Locator;
  userPasswordInput: Locator;
  loginButton: Locator;
  logInAs: object;
}

export class LoginPage implements Login {
  readonly page: Page;
  readonly loginLogo: Locator;
  readonly userNameInput: Locator;
  readonly userPasswordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLogo = page.locator('.login_logo');
    this.userNameInput = page.locator('[data-test="username"]');
    this.userPasswordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async logInAs(userName: string, userPassword: string) {
    await this.loginLogo.waitFor({ state: 'visible', timeout: 55000 });
    await this.userNameInput.type(userName);
    await this.userPasswordInput.type(userPassword);
    await this.loginButton.click();
  }
}
