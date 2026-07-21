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

test('exposed methods: instance and static endpoints work over HTTP', async () => {
  const app = backend({conf, models});
  await app.init();
  const port = await new Promise((resolve, reject) => {
    app.http.listen(0, err => (err ? reject(err) : resolve(app.http.address().port)));
  });
  const base = `http://localhost:${port}`;

  try {
    const user = await login(app.models, 'admin', 'Changeme1!');
    const token = await ormIdentity.auth.issueAuthToken(user, app.models, 'test');
    const headers = {Authorization: `Bearer ${token.token}`, 'Content-Type': 'application/json'};

    const task = await app.models.Task.create({title: 'exposed-demo', createdById: user.id});

    // Instance method: POST /api/Task/:id/complete
    const done = await fetch(`${base}/api/Task/${task.id}/complete`, {method: 'POST', headers});
    assert.equal(done.status, 200);
    assert.equal((await done.json()).data.done, true);

    // Instance method with a path-param arg: PUT /api/Task/:id/priority/:level
    const prio = await fetch(`${base}/api/Task/${task.id}/priority/4`, {method: 'PUT', headers});
    assert.equal((await prio.json()).data.priority, 4);

    // Static method: GET /api/Project/stats
    const stats = await fetch(`${base}/api/Project/stats`, {headers});
    assert.equal(stats.status, 200);
    assert.equal(typeof (await stats.json()).data.total, 'number');

    // Exposed methods are discoverable through OPTIONS.
    const opts = await fetch(`${base}/api/Task`, {method: 'OPTIONS', headers});
    const methodNames = (await opts.json()).paths.methods.map(m => m.method);
    assert.ok(methodNames.includes('complete'), 'complete advertised in OPTIONS');
  } finally {
    await app.close();
  }
});
