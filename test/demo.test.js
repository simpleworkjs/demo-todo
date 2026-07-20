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
  const app = backend({
    conf,
    models,
    seed: async (models) => {
      const existing = await models.Project.list({limit: 1});
      if (existing.length) return;

      const user = await models.User.create({
        userName: 'admin',
        email: 'admin@example.com',
        password: 'Changeme1!',
        isAdmin: true,
      });

      const group = await models.Group.create({name: 'Administrators'});
      const role = await models.Role.create({name: 'Admin'});
      const permission = await models.Permission.create({name: 'admin'});

      await models.UserGroup.create({userId: user.id, groupId: group.id});
      await models.GroupRole.create({groupId: group.id, roleId: role.id});
      await models.RolePermission.create({roleId: role.id, permissionId: permission.id});

      const project = await models.Project.create({
        name: 'Test Project',
        active: true,
        createdById: user.id,
      });

      await models.Task.create({
        title: 'Test Task',
        projectId: project.id,
        createdById: user.id,
      });
    },
  });

  await app.init();

  const user = await login(app.models, 'admin', 'Changeme1!');
  assert.ok(user, 'admin login succeeds');

  const token = await ormIdentity.auth.issueAuthToken(user, app.models, 'test');
  assert.ok(token.token, 'auth token can be issued');

  const projects = await app.models.Project.list({limit: 10});
  assert.equal(projects.length, 1, 'seeded one project');

  const tasks = await app.models.Task.list({limit: 10});
  assert.equal(tasks.length, 1, 'seeded one task');

  await app.close();
});
