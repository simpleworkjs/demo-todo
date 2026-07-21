#!/usr/bin/env bash
set -euo pipefail

# Run the test suite in the generated build directory.
APP_DIR="/tmp/demo-todo-build/app"

echo "Running tests in $APP_DIR ..."
cd "$APP_DIR"
npm test
echo "Tests passed."
