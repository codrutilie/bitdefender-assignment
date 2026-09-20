import { expect, test } from '../utils/fixtures';

test.describe('Books Application Store Tests', () => {
    test.beforeEach(async ({ booksStorePage }) => {
        await booksStorePage.navigateTo('https://demoqa.com/books');
    });

    test('TC-11 Browse the Books Store page without logging in', async ({ booksStorePage }) => {
        await expect(booksStorePage.booksHeader).toHaveText([
            'Image',
            'Title',
            'Author',
            'Publisher',
        ]);

        await expect(booksStorePage.loginButton).toBeVisible();
    });

    test('TC-05 Successful login', async ({ booksStorePage, booksLoginPage }) => {
        await booksStorePage.clickLoginButton();
        await booksLoginPage.login('test_user', 'pass123456aA!');

        await expect(booksStorePage.loginUser).toHaveText('test_user');

        await booksStorePage.clickLogoutButton();
    });

    test('TC-06 Invalid credentials', async ({ booksStorePage, booksLoginPage }) => {
        await booksStorePage.clickLoginButton();

        await booksLoginPage.login('test_user', 'pass123456aA');
        await expect(booksLoginPage.loginErrorText).toHaveText('Invalid username or password!');
    });

    test('TC-08 Add book to collection', async ({ booksStorePage, booksLoginPage, profilePage }) => {
        await booksStorePage.clickLoginButton();
        await booksLoginPage.login('test_user', 'pass123456aA!');
        await profilePage.clickGoToStoreButton();

        const bookTitle = await booksStorePage.clickRandomBookAndGetText();

        await booksStorePage.addBookToCollection();

        await profilePage.goToProfilePage();
        await expect(await profilePage.getBookText(bookTitle)).toContain(bookTitle);
        await profilePage.clickDeleteBookButton();
        await profilePage.pressOKBtnOnDeleteModal();
        await profilePage.clickLogoutButton();
    });
})