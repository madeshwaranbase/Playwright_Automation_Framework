import { test, expect } from '../../src/fixtures/test';
import { env } from '../../src/config/env';
import { EventsPage } from '../../src/pages/events.page';
import { EventDetailsPage } from '../../src/pages/event-details.page';
import { BookingsPage } from '../../src/pages/bookings.page';
import { uniqueCustomer } from '../../src/utils/test-data';

test.describe('Ticket booking', () => {
  test('ticket quantity control updates displayed count', async ({ authenticatedPage }) => {
    const events = new EventsPage(authenticatedPage);
    await events.goto();
    await events.openFirstEvent();

    const details = new EventDetailsPage(authenticatedPage);
    await details.expectLoaded();
    await expect(details.ticketCount).toHaveText('1');
    await details.incrementTicketCount(1);
    await expect(details.ticketCount).toHaveText('2');
  });

  test('customer can create a booking (mutates shared practice data)', async ({ authenticatedPage }) => {
    test.skip(!env.runMutatingTests, 'Set RUN_MUTATING_TESTS=true to create a real practice booking.');

    const events = new EventsPage(authenticatedPage);
    await events.goto();
    await events.openFirstEvent();

    const details = new EventDetailsPage(authenticatedPage);
    await details.expectLoaded();
    const customer = uniqueCustomer();
    await details.setCustomerDetails(customer.name, customer.email, customer.phone);
    await details.submitBooking();

    // The app may show a toast or navigate to the booking list after success.
    await expect(authenticatedPage).toHaveURL(/\/(bookings|events)(?:\/|$|\?)/);
    const bookings = new BookingsPage(authenticatedPage);
    await bookings.goto();
    await bookings.expectBookingsArea();
  });
});
