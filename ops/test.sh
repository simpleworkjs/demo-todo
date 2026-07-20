#!/usr/bin/env bash
set -euo pipefail

# Run the test suite in the generated build directory.
BUILD_DIR="/tmp/demo-todo-build"

echo "Running tests in $BUILD_DIR ..."
cd "$BUILD_DIR"
npm test
echo "Tests passed."
