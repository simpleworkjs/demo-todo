'use strict';

/**
 * Base configuration shared across all environments.
 *
 * The backend package ships with bundled EJS views and static assets, so we
 * intentionally leave `static` and `views` unset here. That lets the framework
 * fall back to its own defaults. If you want to override templates, set those
 * keys to your own paths.
 */

module.exports = {
  app: {
    name: 'SimpleWorkJS Demo Todo',
    port: 3000,
  },

  database: {
    dialect: 'sqlite',
    storage: 'data.sqlite',
    logging: false,
  },

  redis: {
    enabled: false,
    prefix: 'demo_todo:',
  },

  ldap: {
    enabled: false,
  },

  pubsub: {
    enabled: true,
  },

  models: {
    path: 'models',
  },

  // static and views intentionally omitted to use bundled defaults.
};
