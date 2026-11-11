import { test, expect } from '@playwright/test';
import { EventHubApiClient } from '../../src/api/api-client';
import { documentedOperations, loadOpenApiDocument, resolveJsonPath } from '../../src/api/openapi';
import { env } from '../../src/config/env';

test('documented login endpoint accepts configured credentials payload', async ({ request }) => {
  test.skip(
    !env.authLoginPath || !env.authLoginPayload,
    'Set AUTH_LOGIN_PATH and AUTH_LOGIN_PAYLOAD_JSON from the live Swagger contract.',
  );

  const document = await loadOpenApiDocument(request);
  const loginOperation = documentedOperations(document).find(
    (item) => item.path === env.authLoginPath && item.method === 'POST',
  );
  expect(loginOperation, 'Configured login operation must exist in OpenAPI').toBeTruthy();

  const api = new EventHubApiClient(request);
  const response = await api.post(env.authLoginPath, env.authLoginPayload);
  expect(response.status(), await response.text()).toBeGreaterThanOrEqual(200);
  expect(response.status(), await response.text()).toBeLessThan(300);

  const body = await response.json();
  const token = resolveJsonPath(body, env.authTokenJsonPath);
  expect(token, `Expected token at JSON path "${env.authTokenJsonPath}"`).toBeTruthy();
});
