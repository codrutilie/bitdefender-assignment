import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class MenuItems extends BasePage {
    readonly profileButton: Locator;

    constructor(page: Page) {
        super(page);
        this.profileButton = page.locator('id=item-3');
    }

    async clickProfileButton(): Promise<void> {
        await this.clickElement(this.profileButton);
    }
}