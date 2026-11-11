import { expect, Locator, Page } from '@playwright/test';

export class EventDetailsPage {
  readonly title: Locator;
  readonly ticketCount: Locator;
  readonly fullName: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly confirmBooking: Locator;
  readonly incrementTickets: Locator;
  readonly decrementTickets: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('main h1').first();
    this.ticketCount = page.locator('#ticket-count');
    this.fullName = page.locator('#customerName');
    this.email = page.getByTestId('customer-email');
    this.phone = page.locator('#phone');
    this.confirmBooking = page.locator('#confirm-booking');
    const form = page.locator('form').filter({ has: this.confirmBooking });
    this.incrementTickets = form.getByRole('button', { name: '+' });
    this.decrementTickets = form.getByRole('button', { name: '−' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toBeVisible();
    await expect(this.page.getByRole('heading', { name: /book tickets/i })).toBeVisible();
    await expect(this.confirmBooking).toBeVisible();
  }

  async setCustomerDetails(name: string, email: string, phone: string): Promise<void> {
    await this.fullName.fill(name);
    await this.email.fill(email);
    await this.phone.fill(phone);
  }

  async incrementTicketCount(times: number): Promise<void> {
    for (let i = 0; i < times; i += 1) {
      await this.incrementTickets.click();
    }
  }

  async expectRequiredFields(): Promise<void> {
    await expect(this.fullName).toHaveAttribute('required', '');
    await expect(this.email).toHaveAttribute('required', '');
    await expect(this.phone).toHaveAttribute('required', '');
  }

  async submitBooking(): Promise<void> {
    await this.confirmBooking.click();
  }
}
