import { test, expect } from '@playwright/test';
import { env } from '../../src/config/env';

test.describe('EventHub public events API', () => {
  test('returns an events collection response', async ({ request }) => {
    const response = await request.get(`${env.apiBaseUrl}/events`, {
      headers: { Accept: 'application/json' },
    });

    expect(
      response.ok(),
      `GET /events returned ${response.status()}: ${await response.text()}`,
    ).toBeTruthy();

    const body = await response.json();
    // Accept either a top-level array or a common envelope shape.
    const collection = Array.isArray(body)
      ? body
      : body.events ?? body.data ?? body.results;

    expect(Array.isArray(collection), 'API should return an event collection').toBeTruthy();
  });
});
