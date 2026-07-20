#!/usr/bin/env bash
set -euo pipefail

# Generate a fresh SimpleWorkJS project using the published CLI.
BUILD_DIR="/tmp/demo-todo-build"

if [[ -d "$BUILD_DIR" ]] && [[ "$(ls -A "$BUILD_DIR")" ]]; then
  echo "Build directory $BUILD_DIR is not empty. Run ops/clean.sh first."
  exit 1
fi

echo "Generating fresh project at $BUILD_DIR ..."
npx simpleworks generate demo-todo "$BUILD_DIR"
echo "Generate complete."
