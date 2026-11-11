import { test } from '../../src/fixtures/test';
import { BookingsPage } from '../../src/pages/bookings.page';

test('My Bookings page loads for an authenticated user', async ({ authenticatedPage }) => {
  const bookings = new BookingsPage(authenticatedPage);
  await bookings.goto();
  await bookings.expectBookingsArea();
});
