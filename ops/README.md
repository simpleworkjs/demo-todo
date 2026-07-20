# ops/ — rebuild harness

These scripts rebuild the `demo-todo` app from scratch to verify the published SimpleWorkJS CLI still produces a working project.

## One-shot rebuild

```bash
./ops/full-rebuild.sh
```

This runs:

1. `clean.sh` — deletes `/tmp/demo-todo-build`.
2. `generate.sh` — runs `npx simpleworks generate demo-todo /tmp/demo-todo-build`.
3. `install.sh` — installs dependencies in the build directory.
4. `overlay.sh` — copies the curated demo files from this repo into the build directory.
5. `test.sh` — runs `npm test` in the build directory.

## Smoke test the build

```bash
./ops/start.sh
```

Starts the generated app on port `3001` (override with `DEMO_TODO_PORT`).

## Individual steps

Each script is idempotent and can be run on its own during debugging:

```bash
./ops/clean.sh
./ops/generate.sh
./ops/install.sh
./ops/overlay.sh
./ops/test.sh
```

## Why /tmp?

The build target is intentionally outside the repo so the scripts can freely delete and recreate it without risking the source files you are editing.
