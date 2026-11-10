import { expect, Locator, Page } from '@playwright/test';

export class EventsPage {
  readonly pageHeading: Locator;
  readonly eventCards: Locator;

  constructor(private readonly page: Page) {
    this.pageHeading = page.getByRole('heading').first();
    this.eventCards = page.locator('[data-testid="event-card"], article').filter({
      has: page.locator('h2, h3, [data-testid="event-title"]'),
    });
  }

  async expectEventsAreaLoaded(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
    // The page shell is the stable smoke-test contract. Card selectors are
    // intentionally tolerant because the practice application may evolve.
  }

  async visibleEventCount(): Promise<number> {
    return this.eventCards.count();
  }
}
