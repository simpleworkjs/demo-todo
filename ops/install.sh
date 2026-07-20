#!/usr/bin/env bash
set -euo pipefail

# Install dependencies in the generated build directory.
BUILD_DIR="/tmp/demo-todo-build"

echo "Installing dependencies in $BUILD_DIR ..."
cd "$BUILD_DIR"
npm install
echo "Install complete."
