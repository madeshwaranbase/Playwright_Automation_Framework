# EventHub — Playwright UI & API Automation Framework

A TypeScript automation framework for the EventHub practice application, designed around maintainable test architecture, contract-aware API testing, cross-browser execution and CI diagnostics.

- Application: https://eventhub.rahulshettyacademy.com/login
- API documentation: https://api.eventhub.rahulshettyacademy.com/api/docs/

## Coverage

### UI
- Login form and authenticated navigation
- Invalid-login behaviour (environment credentials required)
- Event listing, search and category/city filters
- Event detail and booking form validation
- Ticket quantity and total display
- Booking creation (opt-in; mutates shared practice data)
- My Bookings page and empty-state behaviour

### API
- Retrieve and validate the OpenAPI document
- Verify the document exposes paths and HTTP operations
- Optional public GET smoke test against a path selected from the OpenAPI document
- Optional login/token test using the actual documented route and payload
- Optional booking API test using the actual documented route and payload
- Reusable API client with bearer-token support

**Important contract boundary:** The Swagger UI page was not readable by the documentation retrieval environment when this starter was prepared. The API suite therefore reads the OpenAPI JSON at runtime and does not invent EventHub endpoint paths or request schemas. Confirm the API JSON URL in Swagger's `Download` / `openapi.json` option. The common NestJS default is `/api/docs-json`, but verify it against the live docs and override `OPENAPI_SPEC_URL` if needed. Configure mutation and login paths from the live contract, not guesses.

## Requirements
- Node.js 20+
- npm 10+
- EventHub sandbox account for authenticated UI scenarios

## Install
```bash
npm install
npx playwright install
cp .env.example .env
```

Populate `.env` locally. Do not commit it.

## Run commands
```bash
# All non-destructive tests
npm test

# UI tests
npm run test:ui

# API contract tests
npm run test:api

# Chromium only
npm run test:chromium

# Cross-browser UI tests
npm run test:browsers

# Headed browser
npm run test:headed

# Booking tests (creates real practice bookings)
RUN_MUTATING_TESTS=true npm run test:booking

# TypeScript validation
npm run typecheck

# HTML report
npm run report
```

## Environment variables

| Variable | Description |
|---|---|
| `BASE_URL` | App login URL |
| `EVENTHUB_EMAIL` | Sandbox account email |
| `EVENTHUB_PASSWORD` | Sandbox account password |
| `API_BASE_URL` | API origin / base URL |
| `OPENAPI_SPEC_URL` | Actual OpenAPI JSON URL copied from Swagger |
| `API_TOKEN` | Optional bearer token for protected API checks |
| `AUTH_LOGIN_PATH` | Optional login route from OpenAPI |
| `AUTH_LOGIN_PAYLOAD_JSON` | Login JSON payload matching the documented schema |
| `AUTH_TOKEN_JSON_PATH` | Dot path to token in login response, e.g. `data.accessToken` |
| `API_PUBLIC_GET_PATH` | Optional public GET route selected from the live spec |
| `API_BOOKING_PATH` | Optional booking route from OpenAPI |
| `API_BOOKING_PAYLOAD_JSON` | Booking payload matching the live schema |
| `RUN_MUTATING_TESTS` | Must be `true` to create bookings |
| `CI` | Enables retries and CI worker settings |

## Architecture

```text
src/
  config/       Environment and runtime configuration
  fixtures/     Extended Playwright fixtures
  api/          API client, OpenAPI document loader and helpers
  pages/        Page Object Model
  utils/        Test data and reusable helpers
tests/
  ui/           Login, events, event details and booking UI
  api/          OpenAPI, public GET, login and booking API tests
```

## Test design
- Locators prefer role, label, placeholder and supplied `data-testid` attributes.
- Page objects own navigation and interaction; tests own assertions.
- No fixed sleeps.
- Each test gets an isolated browser context.
- Authentication is performed through the UI for UI scenarios.
- API tests use Playwright `APIRequestContext`.
- Booking mutations are disabled by default.
- Screenshots, video and traces are retained for failed tests.

## API setup workflow
1. Open the API docs URL.
2. Use Swagger's download/export action to obtain the OpenAPI JSON URL.
3. Set `OPENAPI_SPEC_URL` to that exact URL.
4. Run `npm run test:api` to validate the contract document.
5. Select a real, documented public GET path and set `API_PUBLIC_GET_PATH`.
6. For login, copy the request body schema from Swagger and set `AUTH_LOGIN_PATH` and `AUTH_LOGIN_PAYLOAD_JSON`.
7. For booking, copy the documented route and schema; set `API_BOOKING_PATH` and `API_BOOKING_PAYLOAD_JSON`.
8. Enable booking mutations only against your own practice account and test data.

The framework intentionally does not assume that `/auth/login`, `/events`, `/bookings` or any particular payload is the actual API contract.

## CI secrets
For authenticated CI, configure repository secrets:
- `EVENTHUB_EMAIL`
- `EVENTHUB_PASSWORD`
- Optional API secrets as needed

Do not put secrets in source files, test data, screenshots, traces or README examples.

## Repository quality
Use pull requests, required CI checks, dependency updates and a protected default branch. Review practice-app changes when selectors or API contracts evolve.
