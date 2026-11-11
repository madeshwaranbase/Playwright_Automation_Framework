import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { env } from '../config/env';

export class EventHubApiClient {
  constructor(private readonly request: APIRequestContext) {}

  private headers(extra: Record<string, string> = {}): Record<string, string> {
    return {
      Accept: 'application/json',
      ...(env.apiToken ? { Authorization: `Bearer ${env.apiToken}` } : {}),
      ...extra,
    };
  }

  async get(path: string): Promise<APIResponse> {
    return this.request.get(this.absoluteUrl(path), { headers: this.headers() });
  }

  async post(path: string, payload: unknown): Promise<APIResponse> {
    return this.request.post(this.absoluteUrl(path), {
      headers: this.headers({ 'Content-Type': 'application/json' }),
      data: payload,
    });
  }

  absoluteUrl(path: string): string {
    if (/^https?:\/\//i.test(path)) return path;
    return `${env.apiBaseUrl}/${path.replace(/^\/+/, '')}`;
  }

  async expectJson(response: APIResponse): Promise<unknown> {
    expect(response.headers()['content-type'] ?? '').toContain('application/json');
    return response.json();
  }
}
