import { test as base } from '@playwright/test';
import { BooksStorePage } from '../pom/books/BooksStorePage';
import { BooksLoginPage } from '../pom/books/login/BooksLoginPage';
import { ProfilePage } from '../pom/books/profile/ProfilePage';

type PageObjects = {
    booksStorePage: BooksStorePage;
    booksLoginPage: BooksLoginPage;
    profilePage: ProfilePage;
};

export const test = base.extend<PageObjects>({
    booksStorePage: async ({ page }, use) => {
        await use(new BooksStorePage(page));
    },
    booksLoginPage: async ({ page }, use) => {
        await use(new BooksLoginPage(page));
    },
    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page));
    },
});

export { expect } from '@playwright/test';