import { expect, Locator, Page } from '@playwright/test';

export class EventsPage {
  readonly heading: Locator;
  readonly cards: Locator;
  readonly search: Locator;
  readonly category: Locator;
  readonly city: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: /upcoming events/i });
    this.cards = page.getByTestId('event-card');
    this.search = page.getByPlaceholder(/search events, venues/i);
    this.category = page.locator('select').nth(0);
    this.city = page.locator('select').nth(1);
  }

  async goto(): Promise<void> {
    await this.page.goto('/events');
    await expect(this.heading).toBeVisible();
  }

  async searchEvents(query: string): Promise<void> {
    await this.search.fill(query);
  }

  async selectCategory(category: string): Promise<void> {
    await this.category.selectOption(category);
  }

  async selectCity(city: string): Promise<void> {
    await this.city.selectOption({ label: city });
  }

  async openFirstEvent(): Promise<void> {
    await expect(this.cards.first()).toBeVisible();
    await this.cards.first().getByTestId('book-now-btn').click();
  }

  async eventTitles(): Promise<string[]> {
    return this.cards.locator('h3').allTextContents();
  }
}
