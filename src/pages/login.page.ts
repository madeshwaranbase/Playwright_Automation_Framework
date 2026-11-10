import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByLabel(/email/i).or(page.getByPlaceholder(/email/i));
    this.password = page.getByLabel(/password/i).or(page.getByPlaceholder(/password/i));
    this.submitButton = page.getByRole('button', { name: /sign in|login|log in/i });
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submitButton.click();
  }

  async expectLoginFormVisible(): Promise<void> {
    await expect(this.email).toBeVisible();
    await expect(this.password).toBeVisible();
  }
}
