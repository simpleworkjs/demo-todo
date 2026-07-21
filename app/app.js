'use strict';

/**
 * SimpleWorkJS demo app: Todo/Project tracker.
 *
 * This is the golden-path entry point. It shows how to:
 *   1. Import the backend factory and configuration loader.
 *   2. Import your app models.
 *   3. Let the framework run seed files from models/seed/ automatically.
 *   4. Start the server with auto-generated REST API and server-rendered pages.
 */

const backend = require('@simpleworkjs/backend');
const conf = require('@simpleworkjs/conf');
const models = require('./models');

backend({conf, models}).start();
