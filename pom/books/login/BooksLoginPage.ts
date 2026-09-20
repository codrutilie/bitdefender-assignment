import { BasePage } from '../../BasePage';
import { Locator, Page } from '@playwright/test';

export class BooksLoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginErrorText: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('id=userName');
        this.passwordInput = page.locator('id=password');
        this.loginButton = page.locator('id=login');
        this.loginErrorText = page.locator('id=name');
    }

    async login(username: string, password: string): Promise<void> {
        await this.fillInput(this.usernameInput, username);
        await this.fillInput(this.passwordInput, password);
        await this.clickElement(this.loginButton);
    }

}