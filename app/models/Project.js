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

  // Exposed methods can be instance *or* static — auto-detected. `stats` exists
  // on the class, so it mounts at the model root; `archive` is an instance
  // method, so it mounts under /:pk.
  static exposedMethods = [
    // GET /api/Project/stats   (static; get -> requires read)
    {method: 'stats', verb: 'get', description: 'Total and active project counts'},
    // POST /api/Project/:id/archive   (instance; post -> requires update)
    {method: 'archive', verb: 'post', description: 'Mark this project inactive'},
  ];

  static async stats() {
    const all = await this.list({});
    return {total: all.length, active: all.filter(p => p.active).length};
  }

  async archive() {
    await this.update({active: false});
    return this;
  }
}

module.exports = Project;
