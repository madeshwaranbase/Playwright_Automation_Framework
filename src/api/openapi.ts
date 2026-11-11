import { APIRequestContext, expect } from '@playwright/test';
import { env } from '../config/env';

export interface OpenApiOperation {
  operationId?: string;
  summary?: string;
  tags?: string[];
  security?: unknown[];
  responses?: Record<string, unknown>;
  requestBody?: unknown;
}

export interface OpenApiDocument {
  openapi?: string;
  swagger?: string;
  info?: { title?: string; version?: string };
  servers?: Array<{ url: string }>;
  paths?: Record<string, Record<string, OpenApiOperation | unknown>>;
}

const HTTP_METHODS = new Set(['get', 'post', 'put', 'patch', 'delete', 'options', 'head']);

export async function loadOpenApiDocument(
  request: APIRequestContext,
): Promise<OpenApiDocument> {
  const response = await request.get(env.openApiSpecUrl, {
    headers: { Accept: 'application/json' },
  });

  expect(
    response.ok(),
    `OpenAPI document request failed (${response.status()}) at ${env.openApiSpecUrl}. ` +
      'Verify OPENAPI_SPEC_URL in Swagger UI.',
  ).toBeTruthy();

  const document = (await response.json()) as OpenApiDocument;
  expect(Boolean(document.openapi || document.swagger)).toBeTruthy();
  expect(document.paths && Object.keys(document.paths).length > 0).toBeTruthy();
  return document;
}

export function documentedOperations(document: OpenApiDocument) {
  const operations: Array<{ method: string; path: string; operation: OpenApiOperation }> = [];

  for (const [path, pathItem] of Object.entries(document.paths ?? {})) {
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!HTTP_METHODS.has(method.toLowerCase())) continue;
      if (!operation || typeof operation !== 'object') continue;
      operations.push({
        method: method.toUpperCase(),
        path,
        operation: operation as OpenApiOperation,
      });
    }
  }
  return operations;
}

export function resolveJsonPath(source: unknown, dotPath: string): unknown {
  return dotPath.split('.').filter(Boolean).reduce<unknown>((value, key) => {
    if (!value || typeof value !== 'object') return undefined;
    return (value as Record<string, unknown>)[key];
  }, source);
}
