# Contributing

- Keep pull requests focused and explain the user journey or API contract being tested.
- Add or update tests when behaviour changes.
- Keep selectors in page objects and assertions in test specs.
- Prefer role, label, placeholder and test-id locators.
- Do not add fixed sleeps.
- Never commit credentials, tokens, personal data or generated traces.
- Keep booking mutation tests opt-in and use dedicated test data.
- Run `npm run typecheck`, `npm run test:ui` and `npm run test:api` before submitting.
