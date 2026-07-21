# Changelog

## Unreleased

### Fixed

- **`npm test` was silently skipping root-level test files.** The app's test
  script ran `node --test test/**/*.test.js`; without `bash` globstar enabled,
  that pattern dropped any `*.test.js` directly under `test/`. Changed to
  `node --test` so Node's test runner discovers all test files.
