import { test as base } from '@playwright/test';
import { UserData } from '../dataToUse/userData';
import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { OrderCompletePage } from '../pages/orderCompletePage';
import { UsersAPI } from '../pages/usersAPI';

export const test = base.extend({
  // eslint-disable-next-line no-empty-pattern
  userData: async ({},use) => {
    const userData = new UserData();
    await use(userData);
  },
  usersAPI: async ({ page, request }, use) => {
    const usersAPI = new UsersAPI(page, request);
    await use(usersAPI);
  },
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  orderCompletePage: async ({ page }, use) => {
    const orderCompletePage = new OrderCompletePage(page);
    await use(orderCompletePage);
  }
});
