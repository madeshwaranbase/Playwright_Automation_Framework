# EventHub End-to-End & API Automation

A TypeScript automation framework for the [EventHub practice application](https://eventhub.rahulshettyacademy.com/login), using Playwright Test.

## Coverage
- Login workflow using environment-provided sandbox credentials.
- Authenticated event-area smoke checks with resilient, user-facing locators.
- API checks using Playwright `APIRequestContext`.
- Chromium, Firefox and WebKit projects.
- Page Object Model, fixtures, traces, screenshots and HTML reports.
- GitHub Actions execution.

> EventHub is a live practice environment. Create/use your own sandbox account and supply credentials through environment variables. The exact post-login UI and API contract may evolve; page objects and API paths are isolated so they can be adjusted without rewriting test intent. The default API smoke test targets the documented `/api/events` collection route described by the practice hub. Confirm the current Swagger contract before enabling write/booking tests.

## Prerequisites
- Node.js 20+
- npm
- EventHub sandbox account

## Setup
```bash
npm install
npx playwright install --with-deps
cp .env.example .env
```

Set `EVENTHUB_EMAIL` and `EVENTHUB_PASSWORD` in `.env`. Do not commit `.env`.

## Run
```bash
# All configured browsers
npm test

# Chromium only
npm run test:chromium

# UI headed
npm run test:headed

# API suite
npm run test:api

# Open latest HTML report
npm run report
```

## Environment
| Variable | Purpose |
|---|---|
| `BASE_URL` | EventHub login URL |
| `EVENTHUB_EMAIL` | Sandbox user email |
| `EVENTHUB_PASSWORD` | Sandbox password |
| `API_BASE_URL` | EventHub API root |
| `CI` | Enables CI-friendly retries/workers |

## Design
- `pages/` contains UI page objects.
- `fixtures/` owns reusable browser and authenticated page setup.
- `tests/ui/` contains user journey tests.
- `tests/api/` contains APIRequestContext checks.
- `playwright.config.ts` centralizes browser projects and diagnostics.

## Debugging
Playwright traces are retained on first retry in CI and on failure locally. Use:
```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

## Notes on test data
Do not create/delete bookings in a shared sandbox without isolated test data and cleanup. The starter suite intentionally focuses on read-only event discovery plus login validation. Add booking scenarios only after confirming the current booking payload, authentication model and cleanup endpoint in the live API documentation.

## Quality gates
- Prefer role/label/text locators over brittle CSS.
- Keep assertions in tests and interaction details in page objects.
- Avoid fixed sleeps.
- Keep credentials in CI secrets.
- Review traces and report artifacts for failed runs.


## CI and repository governance
The included GitHub Actions workflow installs browser dependencies, executes the configured browser projects and uploads HTML reports and diagnostics. Add `EVENTHUB_EMAIL` and `EVENTHUB_PASSWORD` as GitHub Actions repository secrets only if authenticated CI runs are desired.

## Test evidence
This repository is a portfolio starter, not a claim of a verified live run. Confirm current EventHub selectors, routes and API response contract, then execute the suite locally before publishing performance or pass-rate metrics.
