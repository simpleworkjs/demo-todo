#!/usr/bin/env bash
set -euo pipefail

# Start the generated build directory app on a non-default port for smoke testing.
BUILD_DIR="/tmp/demo-todo-build"
PORT="${DEMO_TODO_PORT:-3001}"

echo "Starting demo app from $BUILD_DIR on port $PORT ..."
cd "$BUILD_DIR"
NODE_ENV=development PORT="$PORT" node app.js
