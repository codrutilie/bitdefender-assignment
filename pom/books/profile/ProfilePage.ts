import { BasePage } from '../../BasePage';
import { Locator, Page } from '@playwright/test';

export class ProfilePage extends BasePage {
    readonly logoutBtn: Locator;
    readonly deleteBookBtn: Locator;
    readonly goToStoreBtn: Locator;
    readonly deleteModal: Locator;

    constructor(page: Page) {
        super(page);
        this.logoutBtn = page.getByRole('button', { name: 'Logout', exact: true });
        this.deleteBookBtn = page.locator('span[id^="delete-record-"][title="Delete"]');
        this.goToStoreBtn = page.locator('id=gotoStore');
        this.deleteModal = page.locator('[role="dialog"]');
    }

    async goToProfilePage(): Promise<void> {
        await this.navigateTo('https://demoqa.com/profile');
        await this.reloadPage();
        await this.reloadPage();
    }

    async getBookText(bookName: string): Promise<string> {
        const bookLocator = this.page.locator(`id=see-book-${bookName}`);
        return (await bookLocator.textContent()) ?? '';
    }

    async clickLogoutButton(): Promise<void> {
        await this.clickElement(this.logoutBtn);
    }

    async clickDeleteBookButton(): Promise<void> {
        await this.clickElement(this.deleteBookBtn);
    }

    async clickGoToStoreButton(): Promise<void> {
        await this.clickElement(this.goToStoreBtn);
    }

    async pressOKBtnOnDeleteModal(): Promise<void> {
        const dialogPromise = this.page.waitForEvent('dialog');

        await this.deleteModal.getByRole('button', { name: 'OK' }).click();

        const dialog = await dialogPromise;
        const dialogMessage = dialog.message();
        console.log('Dialog delete message:', dialogMessage);
        await dialog.accept();
    }
}