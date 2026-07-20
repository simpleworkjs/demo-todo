# demo-todo

A runnable Todo/Project tracker built with [SimpleWorkJS](https://github.com/simpleworkjs).

This repo is three things in one:

1. **Demo** — shows what SimpleWorkJS does out of the box: auto-generated REST API, server-rendered Bootstrap UI, live WebSocket sync, and built-in RBAC.
2. **Golden path** — the simplest, recommended way to get a project going.
3. **Testing ground** — the `ops/` scripts rebuild the app from scratch using the CLI generator so you can verify the framework still produces a working project.

## Repos

- [`@simpleworkjs/orm-identity`](https://github.com/simpleworkjs/orm-identity) — model-first ORM with identity/RBAC.
- [`@simpleworkjs/backend`](https://github.com/simpleworkjs/backend) — Express/Socket.IO framework and `npx simpleworks generate` CLI.
- [`demo-todo`](https://github.com/simpleworkjs/demo-todo) — this starter app.

## Quick start

```bash
git clone git@github.com:simpleworkjs/demo-todo.git
cd demo-todo
npm install
npm start
# open http://localhost:3000
```

Demo login:

- Username: `admin`
- Password: `Changeme1!`

## What this demonstrates

- **Models** in `models/` extend `@simpleworkjs/orm-identity`'s `Model` base.
- **Auto REST API** at `/api/Project`, `/api/Task`, `/api/User`, etc.
- **OPTIONS schema endpoints** at the same paths for the UI to build forms.
- **Server-rendered pages** for list/create/edit/detail views.
- **RBAC** declared per model with `static permissions = {}`.
- **Built-in identity** (`User`, `Group`, `Role`, `Permission`, `AuthToken`) loaded automatically.
- **Live sync** — open two browsers and watch tasks update in real time.

## The golden path

These are the same steps the `ops/full-rebuild.sh` script runs automatically:

### 1. Generate a new project

```bash
npx simpleworks generate demo-todo /tmp/demo-todo-build
```

This creates the scaffold: `app.js`, `package.json`, `conf/`, `models/`, `routes/`, `views/`, `public/`.

### 2. Install dependencies

```bash
cd /tmp/demo-todo-build
npm install
```

### 3. Customize the scaffold

Replace the generated files with the demo-specific versions from this repo:

- `app.js` — add the seed function.
- `conf/base.js` — point to SQLite, disable Redis/LDAP, use bundled UI assets.
- `models/Project.js` and `models/Task.js` — add the demo models.
- `test/demo.test.js` — add smoke tests.

You can also do this by copying the files from this repo:

```bash
# from the demo-todo repo root
rsync -av \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='ops' \
  --exclude='data*.sqlite' \
  . /tmp/demo-todo-build/
```

### 4. Run tests

```bash
cd /tmp/demo-todo-build
npm test
```

### 5. Start the app

```bash
npm start
# open http://localhost:3000
```

## ops/ — automatic rebuild harness

The `ops/` folder exists to prove the golden path still works:

| Script | What it does |
|--------|--------------|
| `ops/clean.sh` | Removes `/tmp/demo-todo-build`. |
| `ops/generate.sh` | Runs `npx simpleworks generate`. |
| `ops/install.sh` | Installs dependencies in the build directory. |
| `ops/overlay.sh` | Copies this repo's app files into the build directory. |
| `ops/test.sh` | Runs `npm test` in the build directory. |
| `ops/start.sh` | Starts the build directory app on port 3001 for smoke testing. |
| `ops/full-rebuild.sh` | Orchestrates clean → generate → install → overlay → test. |

Run the full rebuild:

```bash
./ops/full-rebuild.sh
```

Then inspect `/tmp/demo-todo-build` or start it:

```bash
./ops/start.sh
```

## Add your own model

1. Create `models/MyModel.js` extending `Model`.
2. Add it to `models/index.js`.
3. Restart the app.

The framework will create the table, REST routes, and pages automatically.

## Tests

```bash
npm test
```

## License

MIT
