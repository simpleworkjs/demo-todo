#!/usr/bin/env bash
set -euo pipefail

# Remove any previous build directory so we start from a clean slate.
BUILD_DIR="/tmp/demo-todo-build"

if [[ -d "$BUILD_DIR" ]]; then
  echo "Removing $BUILD_DIR ..."
  rm -rf "$BUILD_DIR"
fi

echo "Clean complete."
