import { BasePage } from '../../BasePage';
import { Locator, Page } from '@playwright/test';

export class ProfilePage extends BasePage {
    readonly logoutButton: Locator;
    readonly deleteBookButton: Locator;
    readonly goToStoreButton: Locator;
    readonly deleteModal: Locator;

    constructor(page: Page) {
        super(page);
        this.logoutButton = page.getByRole('button', { name: 'Logout', exact: true });
        this.deleteBookButton = page.locator('span[id^="delete-record-"][title="Delete"]');
        this.goToStoreButton = page.locator('id=gotoStore');
        this.deleteModal = page.locator('[role="dialog"]');
    }

    async goToProfilePage(): Promise<void> {
        await this.navigateTo('https://demoqa.com/profile');
        await this.reloadPage();
    }

    async getBookText(bookName: string): Promise<string> {
        const bookLocator = this.page.locator(`id=see-book-${bookName}`);
        return (await bookLocator.textContent()) ?? '';
    }

    async clickLogoutButton(): Promise<void> {
        await this.clickElement(this.logoutButton);
    }

    async clickDeleteBookButton(): Promise<void> {
        await this.clickElement(this.deleteBookButton);
    }

    async clickGoToStoreButton(): Promise<void> {
        await this.clickElement(this.goToStoreButton);
    }

    async pressOKBtnOnDeleteModal(): Promise<void> {
        const dialogPromise = this.page.waitForEvent('dialog');

        await this.deleteModal.getByRole('button', { name: 'OK' }).click();

        const dialog = await dialogPromise;
        const dialogMessage = dialog.message();
        // console.log('Dialog delete message:', dialogMessage);
        await dialog.accept();
    }
}