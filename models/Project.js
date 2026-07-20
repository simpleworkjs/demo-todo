'use strict';

const {Model} = require('@simpleworkjs/orm-identity');

/**
 * A project groups related tasks.
 */
class Project extends Model {
  static fields = {
    id: {type: 'uuid', primaryKey: true},
    name: {type: 'string', isRequired: true, max: 200, display: {searchable: true}},
    description: {type: 'text'},
    active: {type: 'boolean', default: true},
    createdBy: {type: 'hasOne', model: 'User'},
  };

  static display = {
    name: 'Project',
    titleField: 'name',
  };

  static permissions = {
    read: ['user'],
    create: ['admin'],
    update: ['admin', 'owner'],
    delete: ['admin'],
  };
}

module.exports = Project;
