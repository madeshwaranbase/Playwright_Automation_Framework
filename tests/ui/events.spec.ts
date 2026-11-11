import { test, expect } from '../../src/fixtures/test';

test.describe('Event discovery', () => {
  test('authenticated user can view upcoming events', async ({ authenticatedPage, eventsPage }) => {
    await eventsPage.goto();
    await expect(eventsPage.cards.first()).toBeVisible();
    await expect(authenticatedPage.getByTestId('nav-events')).toBeVisible();
  });

  test('event search filters the visible list', async ({ authenticatedPage, eventsPage }) => {
    await eventsPage.goto();
    await eventsPage.searchEvents('Dilli Diwali Mela');
    await expect(eventsPage.cards.filter({ hasText: 'Dilli Diwali Mela' })).toBeVisible();
  });

  test('category filter can be selected', async ({ eventsPage, authenticatedPage }) => {
    await eventsPage.goto();
    await eventsPage.selectCategory('Festival');
    await expect(eventsPage.category).toHaveValue('Festival');
  });

  test('city filter can be selected', async ({ eventsPage, authenticatedPage }) => {
    await eventsPage.goto();
    await eventsPage.selectCity('Delhi');
    await expect(eventsPage.city).toHaveValue('Delhi');
  });
});
