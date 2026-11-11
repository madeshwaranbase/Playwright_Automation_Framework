import { expect, Locator, Page } from '@playwright/test';
import { env } from '../config/env';

export class LoginPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly form: Locator;

  constructor(private readonly page: Page) {
    this.form = page.locator('form').first();
    this.email = page.locator('input[type="email"]').first()
      .or(page.getByPlaceholder(/email/i).first());
    this.password = page.locator('input[type="password"]').first()
      .or(page.getByPlaceholder(/password/i).first());
    this.submit = page.locator('form button[type="submit"]').first()
      .or(page.getByRole('button', { name: /login|log in|sign in/i }).first());
  }

  async goto(): Promise<void> {
    await this.page.goto(env.appUrl);
    await expect(this.email).toBeVisible();
    await expect(this.password).toBeVisible();
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }

  async expectAuthenticated(): Promise<void> {
    await expect(this.page.getByTestId('logout-btn')).toBeVisible();
    await expect(this.page.getByTestId('user-email-display')).toBeVisible();
  }

  async expectLoginRejected(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login(?:[/?#]|$)/);
    await expect(this.password).toBeVisible();
  }
}
