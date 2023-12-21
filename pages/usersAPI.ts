import { APIRequestContext, Page } from '@playwright/test';

export class UsersAPI {
  readonly page: Page;
  readonly request: APIRequestContext;
  readonly baseUrl: string;
  readonly urls: Array<string>;
  readonly auth: string;

  constructor(page: Page, request: APIRequestContext) {
    this.page = page;
    this.request = request;
    this.baseUrl = 'https://reqres.in/api';
    this.urls = [
      `${this.baseUrl}/user/1`,
      `${this.baseUrl}/user/2`,
      `${this.baseUrl}/user/3`,
      `${this.baseUrl}/user/4`,
      `${this.baseUrl}/user/5`,
      `${this.baseUrl}/user/6`,
      `${this.baseUrl}/user/7`,
      `${this.baseUrl}/user/8`,
      `${this.baseUrl}/user/9`,
      `${this.baseUrl}/user/10`
    ];
    this.auth = `Bearer ${process.env.TOKEN}`;
  }

  postUser(url: string, name: string) {
    return this.request.post(`${this.baseUrl}${url}`, {
      // headers: {
      //   Authorization: this.auth,
      // },
      data: {
        name: `${name}`,
        job: 'leader'
      }
    });
  }
}
