import { test, expect } from '../../src/fixtures/test.fixture';
import { env } from '../../src/config/env';

test.describe('EventHub authentication', () => {
  test('displays the sign-in form', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.expectLoginFormVisible();
  });

  test('allows a sandbox user to sign in', async ({ loginPage, page }) => {
    test.skip(
      !process.env.EVENTHUB_EMAIL || !process.env.EVENTHUB_PASSWORD,
      'Sandbox credentials are required for this scenario.',
    );

    await loginPage.goto();
    await loginPage.signIn(env.eventHubEmail(), env.eventHubPassword());

    // Successful authentication should move away from the login route.
    await expect(page).not.toHaveURL(/\/login(?:[/?#]|$)/);
  });
});
