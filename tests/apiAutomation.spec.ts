import { test } from '../helpers/pagesFactory';
import { expect } from '@playwright/test';

test.describe('API Automation', () => {
  test('POST user @smoke', async ({ usersAPI, userData }) => {
    const user = await usersAPI.postUser(
      '/users',
      userData.getData().firstName
    );
    expect(user.status()).toBe(201);
    const userJson = await user.json();
    const todaysDate = new Date().toJSON().slice(0, 10);
    expect(userJson.createdAt).toContain(todaysDate);
  });

  test('GET 10 users and verify response statuses @smoke', async ({
    usersAPI
  }) => {
    await Promise.all(
      usersAPI.urls.map((url) =>
        usersAPI.request
          .fetch(url)
          .then((res) => expect(res.status()).toBe(200))
      )
    );
  });
});
