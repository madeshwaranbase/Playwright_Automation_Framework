import { test } from '../../src/fixtures/test';
import { EventsPage } from '../../src/pages/events.page';
import { EventDetailsPage } from '../../src/pages/event-details.page';

test('event detail displays booking form and required fields', async ({ authenticatedPage }) => {
  const events = new EventsPage(authenticatedPage);
  await events.goto();
  await events.openFirstEvent();

  const details = new EventDetailsPage(authenticatedPage);
  await details.expectLoaded();
  await details.expectRequiredFields();
});
