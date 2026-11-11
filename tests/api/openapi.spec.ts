import { test, expect } from '@playwright/test';
import { loadOpenApiDocument, documentedOperations } from '../../src/api/openapi';

test.describe('EventHub OpenAPI contract', () => {
  test('serves a valid OpenAPI document with API operations', async ({ request }) => {
    const document = await loadOpenApiDocument(request);
    const operations = documentedOperations(document);

    expect(operations.length).toBeGreaterThan(0);
    expect(document.info?.title ?? '').not.toBe('');
    console.log(`OpenAPI: ${document.info?.title ?? 'Untitled'} v${document.info?.version ?? 'unknown'}`);
    console.log(`Documented operations: ${operations.length}`);
  });

  test('documents at least one read operation', async ({ request }) => {
    const document = await loadOpenApiDocument(request);
    const getOperations = documentedOperations(document).filter((item) => item.method === 'GET');
    expect(getOperations.length).toBeGreaterThan(0);
  });
});
