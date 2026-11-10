import { test } from '../../src/fixtures/test.fixture';

test.describe('Event discovery', () => {
  test('loads the authenticated events experience', async ({ authenticatedPage, eventsPage }) => {
    await eventsPage.expectEventsAreaLoaded();
    // A count is captured for useful diagnostics without assuming seeded event data.
    const count = await eventsPage.visibleEventCount();
    test.info().annotations.push({
      type: 'observed-event-cards',
      description: String(count),
    });
  });
});
