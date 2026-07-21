#!/usr/bin/env bash
set -euo pipefail

# Install dependencies in the generated build directory.
APP_DIR="/tmp/demo-todo-build/app"

echo "Installing dependencies in $APP_DIR ..."
cd "$APP_DIR"
npm install
echo "Install complete."
