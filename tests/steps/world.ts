import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, chromium, Page } from '@playwright/test';

let page: Page;
let browser: Browser;

setDefaultTimeout(60000);

Before(async () => {
  try {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://www.saucedemo.com/');
    await page.waitForLoadState();
  } catch (error) {
    throw new Error(`Chrome navigation error is: ${error}`);
  }
});

After(async () => {
  await browser.close();
});

export { page, browser };
