import { expect, test } from '../utils/fixtures';

test.describe('Books Application Store Tests', () => {
    test.beforeEach(async ({ booksStorePage }) => {
        await booksStorePage.navigateTo('https://demoqa.com/books');
    });

    test('Check Books Landing Page headers', async ({ booksStorePage }) => {
        await expect(booksStorePage.booksHeader).toHaveText([
            'Image',
            'Title',
            'Author',
            'Publisher',
        ]);
    });

    test('Negative test for login functionality on Books Landing Page ', async ({ booksStorePage, booksLoginPage }) => {
        await booksStorePage.clickLoginButton();

        await booksLoginPage.login('test_user', 'pass123456aA');
        await expect(booksLoginPage.loginErrorText).toHaveText('Invalid username or password!');
    });

    test('Check login functionality on Books Landing Page', async ({ booksStorePage, booksLoginPage }) => {
        await booksStorePage.clickLoginButton();
        await booksLoginPage.login('test_user', 'pass123456aA!');

        await expect(booksStorePage.loginUser).toHaveText('test_user');

        await booksStorePage.clickLogoutButton();
    });

    test('Add book to collection, delete book from collection and logout', async ({ booksStorePage, booksLoginPage, profilePage }) => {
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