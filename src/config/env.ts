import 'dotenv/config';

function optional(name: string, fallback = ''): string {
  return (process.env[name] ?? fallback).trim();
}

function parseJsonEnv<T>(name: string): T | undefined {
  const raw = optional(name);
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new Error(`${name} must contain valid JSON.`);
  }
}

export const env = {
  appUrl: optional('BASE_URL', 'https://eventhub.rahulshettyacademy.com/login'),
  apiBaseUrl: optional('API_BASE_URL', 'https://api.eventhub.rahulshettyacademy.com').replace(/\/$/, ''),
  openApiSpecUrl: optional(
    'OPENAPI_SPEC_URL',
    'https://api.eventhub.rahulshettyacademy.com/api/docs-json',
  ),
  email: optional('EVENTHUB_EMAIL'),
  password: optional('EVENTHUB_PASSWORD'),
  apiToken: optional('API_TOKEN'),
  publicGetPath: optional('API_PUBLIC_GET_PATH'),
  authLoginPath: optional('AUTH_LOGIN_PATH'),
  authLoginPayload: parseJsonEnv<Record<string, unknown>>('AUTH_LOGIN_PAYLOAD_JSON'),
  authTokenJsonPath: optional('AUTH_TOKEN_JSON_PATH', 'access_token'),
  bookingPath: optional('API_BOOKING_PATH'),
  bookingPayload: parseJsonEnv<Record<string, unknown>>('API_BOOKING_PAYLOAD_JSON'),
  runMutatingTests: optional('RUN_MUTATING_TESTS').toLowerCase() === 'true',
  hasUiCredentials: Boolean(optional('EVENTHUB_EMAIL') && optional('EVENTHUB_PASSWORD')),
};
