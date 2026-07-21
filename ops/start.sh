#!/usr/bin/env bash
set -euo pipefail

# Start the generated build directory app on a non-default port for smoke testing.
APP_DIR="/tmp/demo-todo-build/app"
PORT="${DEMO_TODO_PORT:-3001}"

echo "Starting demo app from $APP_DIR on port $PORT ..."
cd "$APP_DIR"
NODE_ENV=development PORT="$PORT" node app.js
