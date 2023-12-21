import { test } from '../helpers/pagesFactory';
import { expect } from '@playwright/test';

test.describe('Web Automation', () => {
  test.beforeEach(async ({ basePage, loginPage, userData }) => {
    await basePage.goToPage('login page');
    await loginPage.logInAs(
      userData.getData().standardUserName,
      userData.getData().standardUserPassword
    );
  });

  test('Buy a product @smoke', async ({
    userData,
    inventoryPage,
    cartPage,
    orderCompletePage
  }) => {
    const item1 = 'Sauce Labs Backpack';
    const item2 = 'Sauce Labs Onesie';
    let item1Price: string;

    await test.step(`1). Find an item "${item1}" by name, then add it to the cart`, async () => {
      await inventoryPage.addProductToCart(item1);
      item1Price = await inventoryPage.getItemPrice(item1);
    });

    await test.step(`2). Find a second item "${item2}" by name, and add it to the cart as well`, async () => {
      await inventoryPage.addProductToCart(item2);
    });

    await test.step(`3). Go to the cart`, async () => {
      await inventoryPage.goToCart();
    });

    await test.step(`4). Find an item ${item1} by name, then remove it from the cart`, async () => {
      await cartPage.removeItem(item2);
    });

    await test.step(`5). Validate in the Checkout Overview`, async () => {
      await expect(cartPage.inventoryName).toContainText([item1]);
      await expect(cartPage.inventoryName).not.toContainText([item2]);
      await cartPage.proceedOrder(
        userData.getData().firstName,
        userData.getData().lastName,
        userData.getData().postalCode
      );
      await expect(cartPage.itemTotal).toContainText(item1Price);
    });

    await test.step('6). Finish purchase and validate', async () => {
      await cartPage.finishOrder();
      await expect(orderCompletePage.successMessage).toHaveText(
        'Thank you for your order!'
      );
    });
  });

  test('Sort by name and verify @smoke', async ({ inventoryPage }) => {
    let sortAlphabetically: string;

    await test.step(`1). Get "az" sorted items`, async () => {
      sortAlphabetically = await inventoryPage.sortAlphabetically();
    });

    await test.step(`2). Sort by "za" and verify`, async () => {
      const currentSort = await inventoryPage.sortBy('za');
      expect(currentSort).not.toEqual(sortAlphabetically);
    });

    await test.step(`3). Sort by "az" and verify`, async () => {
      const currentSort = await inventoryPage.sortBy('az');
      expect(currentSort).toEqual(sortAlphabetically);
    });
  });
});
