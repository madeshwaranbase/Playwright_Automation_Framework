import { test, expect } from '@playwright/test';
import { EventHubApiClient } from '../../src/api/api-client';
import { documentedOperations, loadOpenApiDocument } from '../../src/api/openapi';
import { env } from '../../src/config/env';

test('documented booking endpoint accepts configured booking payload', async ({ request }) => {
  test.skip(
    !env.runMutatingTests || !env.bookingPath || !env.bookingPayload,
    'Booking API test requires RUN_MUTATING_TESTS=true and exact path/payload from Swagger.',
  );

  const document = await loadOpenApiDocument(request);
  const bookingOperation = documentedOperations(document).find(
    (item) => item.path === env.bookingPath && item.method === 'POST',
  );
  expect(bookingOperation, 'Configured booking operation must exist in OpenAPI').toBeTruthy();

  const api = new EventHubApiClient(request);
  const response = await api.post(env.bookingPath, env.bookingPayload);
  expect(response.status(), await response.text()).toBeGreaterThanOrEqual(200);
  expect(response.status(), await response.text()).toBeLessThan(300);
});
