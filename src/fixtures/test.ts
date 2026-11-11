import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { EventsPage } from '../pages/events.page';
import { EventHubApiClient } from '../api/api-client';

type Fixtures = {
  loginPage: LoginPage;
  eventsPage: EventsPage;
  api: EventHubApiClient;
  authenticatedPage: Page;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  eventsPage: async ({ page }, use) => {
    await use(new EventsPage(page));
  },
  api: async ({ request }, use) => {
    await use(new EventHubApiClient(request));
  },
  authenticatedPage: async ({ page }, use) => {
    const email = process.env.EVENTHUB_EMAIL;
    const password = process.env.EVENTHUB_PASSWORD;
    if (!email || !password) {
      throw new Error('Set EVENTHUB_EMAIL and EVENTHUB_PASSWORD in .env.');
    }

    const login = new LoginPage(page);
    await login.goto();
    await login.signIn(email, password);
    await login.expectAuthenticated();
    await use(page);
  },
});

export { expect };
