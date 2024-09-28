import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://onliner-ui-stage283.voicespin.info/#/realm?customer_id=9796615507&token=Mq8BiwptUZyQrM8Gz8tAb35DBpS2xoAG'); 
  }

  async fillUsername(username: string) {
    await this.page.fill('input[name="username"]', username);
  }

  async fillPassword(password: string) {
    await this.page.fill('input[name="password"]', password);
  }

  async submit() {
    const button = this.page.locator('button[type="submit"]');
}

}
