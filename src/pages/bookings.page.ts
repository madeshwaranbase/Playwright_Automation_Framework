import { expect, Page } from '@playwright/test';

export class BookingsPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/bookings');
    await expect(this.page.getByRole('heading', { name: /my bookings/i })).toBeVisible();
  }

  async expectEmptyState(): Promise<void> {
    await expect(this.page.getByText(/no bookings yet/i)).toBeVisible();
  }

  async expectBookingsArea(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: /my bookings/i })).toBeVisible();
  }
}
