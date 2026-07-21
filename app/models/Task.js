'use strict';

const {Model} = require('@simpleworkjs/orm-identity');

/**
 * A task belongs to a project and tracks completion.
 */
class Task extends Model {
  static fields = {
    id: {type: 'uuid', primaryKey: true},
    title: {type: 'string', isRequired: true, max: 200, display: {searchable: true}},
    description: {type: 'text'},
    done: {type: 'boolean', default: false},
    priority: {type: 'integer', default: 1, min: 1, max: 5},
    project: {type: 'hasOne', model: 'Project'},
    createdBy: {type: 'hasOne', model: 'User'},
  };

  static display = {
    name: 'Task',
    titleField: 'title',
  };

  static permissions = {
    read: ['user'],
    create: ['admin'],
    update: ['admin', 'owner'],
    delete: ['admin'],
  };
}

module.exports = Task;
