import { test, expect } from '@playwright/test';
import { EventHubApiClient } from '../../src/api/api-client';
import { loadOpenApiDocument, documentedOperations } from '../../src/api/openapi';
import { env } from '../../src/config/env';

test('configured public GET endpoint responds successfully', async ({ request }) => {
  test.skip(!env.publicGetPath, 'Set API_PUBLIC_GET_PATH to a public GET path copied from Swagger.');

  const document = await loadOpenApiDocument(request);
  const documented = documentedOperations(document).some(
    (operation) => operation.method === 'GET' && operation.path === env.publicGetPath,
  );
  expect(documented, `${env.publicGetPath} must exist as a GET operation in OpenAPI`).toBeTruthy();

  const api = new EventHubApiClient(request);
  const response = await api.get(env.publicGetPath);
  expect(response.status(), await response.text()).toBeGreaterThanOrEqual(200);
  expect(response.status(), await response.text()).toBeLessThan(300);
});
