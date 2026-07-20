'use strict';

/**
 * SimpleWorkJS demo app: Todo/Project tracker.
 *
 * This is the golden-path entry point. It shows how to:
 *   1. Import the backend factory and configuration loader.
 *   2. Import your app models.
 *   3. Seed built-in identity (admin user/group/role/permission) and demo data.
 *   4. Start the server with auto-generated REST API and server-rendered pages.
 */

const backend = require('@simpleworkjs/backend');
const conf = require('@simpleworkjs/conf');
const models = require('./models');

/**
 * Seed the built-in identity system and a few demo projects/tasks.
 * The backend runs this once after the ORM syncs.
 */
async function seedDemo(models) {
  try {
    // Only seed if we have not already.
    const existing = await models.Project.list({limit: 1});
    if (existing.length) return;

    // --- Built-in RBAC identity setup ---
    const adminUser = await models.User.create({
      userName: 'admin',
      email: 'admin@example.com',
      password: 'Changeme1!',
      isAdmin: true,
    });

    const adminGroup = await models.Group.create({
      name: 'Administrators',
      description: 'Full access to everything.',
    });

    const adminRole = await models.Role.create({
      name: 'Admin',
      description: 'Grants the global admin permission.',
    });

    const adminPermission = await models.Permission.create({
      name: 'admin',
      description: 'Global administrator permission.',
    });

    await models.UserGroup.create({userId: adminUser.id, groupId: adminGroup.id});
    await models.GroupRole.create({groupId: adminGroup.id, roleId: adminRole.id});
    await models.RolePermission.create({roleId: adminRole.id, permissionId: adminPermission.id});

    // --- App-specific demo data ---
    const project = await models.Project.create({
      name: 'SimpleWorkJS Onboarding',
      description: 'Learn the framework by building a small project tracker.',
      active: true,
      createdById: adminUser.id,
    });

    await models.Task.create({
      title: 'Explore the auto-generated UI',
      description: 'Visit http://localhost:3000 and log in as admin.',
      done: false,
      priority: 1,
      projectId: project.id,
      createdById: adminUser.id,
    });

    await models.Task.create({
      title: 'Add a custom model',
      description: 'Create a new file in models/ and restart the app.',
      done: false,
      priority: 2,
      projectId: project.id,
      createdById: adminUser.id,
    });

    console.log('Demo seed complete.');
  } catch (error) {
    console.error('Demo seed failed (non-fatal):', error.message);
  }
}

backend({conf, models, seed: seedDemo}).start();
