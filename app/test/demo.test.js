'use strict';

const {test} = require('node:test');
const assert = require('node:assert/strict');

const backend = require('@simpleworkjs/backend');
const conf = require('@simpleworkjs/conf');
const ormIdentity = require('@simpleworkjs/orm-identity');
const models = require('../models');

const {login} = ormIdentity.auth;

test('demo app loads identity + app models', async () => {
  const app = backend({conf, models});
  await app.init();
  assert.ok(app.models.User, 'User model loaded');
  assert.ok(app.models.Project, 'Project model loaded');
  assert.ok(app.models.Task, 'Task model loaded');
  await app.close();
});

test('demo app seeds and can login as admin', async () => {
  const app = backend({conf, models});

  await app.init();

  const user = await login(app.models, 'admin', 'Changeme1!');
  assert.ok(user, 'admin login succeeds');

  const token = await ormIdentity.auth.issueAuthToken(user, app.models, 'test');
  assert.ok(token.token, 'auth token can be issued');

  const projects = await app.models.Project.list({limit: 10});
  assert.ok(projects.length >= 1, 'seeded at least one project');

  const tasks = await app.models.Task.list({limit: 10});
  assert.ok(tasks.length >= 1, 'seeded at least one task');

  await app.close();
});
