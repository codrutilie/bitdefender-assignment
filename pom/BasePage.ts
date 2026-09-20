import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async waitForElement(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async getElementText(locator: Locator): Promise<string> {
    await this.waitForElement(locator);
    return await locator.textContent() || '';
  }

  async clickElement(locator: Locator) {
    await this.waitForElement(locator);
    await locator.click();
  }

  async fillInput(locator: Locator, value: string) {
    await this.waitForElement(locator);
    await locator.fill(value);
  }

  async reloadPage() {
    await this.page.reload();
  }
}