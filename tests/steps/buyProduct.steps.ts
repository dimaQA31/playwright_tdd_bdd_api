import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { OrderCompletePage } from '../../pages/orderCompletePage';
import { LoginPage } from '../../pages/loginPage';
import { UserData } from '../../dataToUse/userData';
import { InventoryPage } from '../../pages/inventoryPage';
import { CartPage } from '../../pages/cartPage';
import { page } from './world';

let itemPrice;

Given('User logs in', async () => {
  const loginPage = new LoginPage(page);
  const userData = new UserData();
  await loginPage.logInAs(
    userData.getData().standardUserName,
    userData.getData().standardUserPassword
  );
});

When(
  'Find an item {string} by name, then add it to the cart',
  async (item1) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart(item1);
    itemPrice = await inventoryPage.getItemPrice(item1);
    console.log('Our item price is:', await itemPrice);
  }
);

When('Validate the Checkout Overview has a {string} item', async (item1) => {
  const cartPage = new CartPage(page);
  const userData = new UserData();
  await expect(cartPage.inventoryName).toContainText([item1]);
  await cartPage.proceedOrder(
    userData.getData().firstName,
    userData.getData().lastName,
    userData.getData().postalCode
  );
  await expect(cartPage.itemTotal).toContainText(itemPrice);
});

Then('Go to cart', async () => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.goToCart();
});

Then('Finish purchase and verify', async () => {
  const orderCompletePage = new OrderCompletePage(page);
  const cartPage = new CartPage(page);
  await cartPage.finishOrder();
  await expect(orderCompletePage.successMessage).toHaveText(
    'Thank you for your order!'
  );
});
