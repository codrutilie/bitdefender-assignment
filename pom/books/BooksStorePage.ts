import { BasePage } from '../BasePage';
import { Locator, Page } from '@playwright/test';

export class BooksStorePage extends BasePage {
    readonly booksHeader: Locator;
    readonly loginButton: Locator;
    readonly loginUser: Locator;
    readonly logoutButton: Locator;
    readonly books: Locator;
    readonly addToYourCollectionButton: Locator;

    constructor(page: Page) {
        super(page);
        this.booksHeader = page.locator('thead tr th ');
        this.loginButton = page.locator('id=login');
        this.loginUser = page.locator('id=userName-value');
        this.logoutButton = page.getByRole('button', { name: 'Logout', exact: true });
        this.books = page.locator('table tbody tr td div span a');
        this.addToYourCollectionButton = page.getByRole('button', { name: 'Add To Your Collection', exact: true });
    }

    async clickLoginButton(): Promise<void> {
        await this.clickElement(this.loginButton);
    }

    async clickLogoutButton(): Promise<void> {
        await this.clickElement(this.logoutButton);
    }

    async clickRandomBookAndGetText(): Promise<string> {
        const bookCount = await this.books.count();
        const randomBookIndex = Math.floor(Math.random() * bookCount);
        const randomBook = this.books.nth(randomBookIndex);

        await this.clickElement(randomBook);
        return await this.getElementText(randomBook);
    }

    async addBookToCollection(): Promise<void> {
        const dialogPromise = this.page.waitForEvent('dialog');

        await this.addToYourCollectionButton.click();

        const dialog = await dialogPromise;
        const message = dialog.message();
        // console.log(`Dialog add book message: ${message}`);
        await dialog.accept();
    }
}