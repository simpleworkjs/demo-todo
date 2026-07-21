'use strict';

/**
 * Seed sample demo data.
 */

module.exports = {
  name: '002-demo',

  up: async function(models) {
    const existing = await models.Project.list({limit: 1});
    if (existing.length) return;

    const adminUsers = await models.User.list({where: {userName: 'admin'}, limit: 1});
    const adminUser = adminUsers[0];
    if (!adminUser) throw new Error('001-identity seed must run before 002-demo');

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
  },
};
