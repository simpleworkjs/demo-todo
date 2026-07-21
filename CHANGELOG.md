# Changelog

## Unreleased

### Changed

- Bumped `@simpleworkjs/backend` and `@simpleworkjs/orm-identity` to `^0.2.0`
  (dependency security updates: `bcrypt` 6, `sqlite3` 6, `uuid` 11) and added an
  `overrides` entry pinning `uuid` to `^11.1.1` so Sequelize's bundled copy is
  forced up in this app's install tree. Clears the `npm install` audit warnings.

### Fixed

- **`npm test` was silently skipping root-level test files.** The app's test
  script ran `node --test test/**/*.test.js`; without `bash` globstar enabled,
  that pattern dropped any `*.test.js` directly under `test/`. Changed to
  `node --test` so Node's test runner discovers all test files.
