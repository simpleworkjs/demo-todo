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

  // Custom domain methods exposed as REST endpoints. See the framework's
  // "Exposed methods" docs. Instance methods mount under /:pk; the verb sets
  // the default permission (post -> update, get -> read), so these inherit the
  // model's `update` rule (admin or the task's owner).
  static exposedMethods = [
    // POST /api/Task/:id/complete
    {method: 'complete', verb: 'post', description: 'Mark this task done'},
    // POST /api/Task/:id/reopen
    {method: 'reopen', verb: 'post', description: 'Mark this task not done'},
    // PUT /api/Task/:id/priority/:level   (arg comes from the path)
    {method: 'setPriority', route: 'priority', verb: 'put',
      args: {from: 'params', names: ['level']},
      description: 'Set this task’s priority (1–5)'},
  ];

  async complete() {
    await this.update({done: true});
    return this; // `this.done` is now fresh after update()
  }

  async reopen() {
    await this.update({done: false});
    return this;
  }

  async setPriority(level) {
    const clamped = Math.max(1, Math.min(5, Number(level) || 1));
    await this.update({priority: clamped});
    return this;
  }
}

module.exports = Task;
