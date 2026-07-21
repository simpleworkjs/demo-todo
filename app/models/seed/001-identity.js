'use strict';

/**
 * Seed the built-in RBAC identity system.
 *
 * Seeds run in name-sorted order once per database. They receive the loaded
 * `models` object and may create records, join rows, and permissions.
 */

module.exports = {
  name: '001-identity',

  up: async function(models) {
    const existing = await models.User.list({where: {userName: 'admin'}, limit: 1});
    if (existing.length) return;

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
  },
};
