import { test, expect } from '../../src/fixtures/test';
import { env } from '../../src/config/env';

test.describe('Authentication', () => {
  test('login screen exposes email and password fields', async ({ loginPage }) => {
    await loginPage.goto();
    await expect(loginPage.email).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.submit).toBeVisible();
  });

  test('valid sandbox user can log in', async ({ loginPage }) => {
    test.skip(!env.hasUiCredentials, 'Set EVENTHUB_EMAIL and EVENTHUB_PASSWORD.');
    await loginPage.goto();
    await loginPage.signIn(env.email, env.password);
    await loginPage.expectAuthenticated();
  });

  test('invalid credentials are not authenticated', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.signIn('invalid.user@example.com', 'IncorrectPassword!123');
    await loginPage.expectLoginRejected();
  });
});
