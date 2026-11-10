import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://eventhub.rahulshettyacademy.com/login',
  apiBaseUrl: (process.env.API_BASE_URL ?? 'https://eventhub.rahulshettyacademy.com/api').replace(/\/$/, ''),
  eventHubEmail: () => required('EVENTHUB_EMAIL'),
  eventHubPassword: () => required('EVENTHUB_PASSWORD'),
};
