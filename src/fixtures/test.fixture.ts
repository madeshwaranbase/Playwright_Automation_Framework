import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { EventsPage } from '../pages/events.page';

type AppFixtures = {
  loginPage: LoginPage;
  eventsPage: EventsPage;
  authenticatedPage: Page;
};

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  eventsPage: async ({ page }, use) => {
    await use(new EventsPage(page));
  },
  authenticatedPage: async ({ page }, use) => {
    const email = process.env.EVENTHUB_EMAIL;
    const password = process.env.EVENTHUB_PASSWORD;
    if (!email || !password) {
      throw new Error('Set EVENTHUB_EMAIL and EVENTHUB_PASSWORD to run authenticated tests.');
    }
    const login = new LoginPage(page);
    await login.goto();
    await login.signIn(email, password);
    await use(page);
  },
});

export { expect } from '@playwright/test';
