#!/usr/bin/env bash
set -euo pipefail

# Overlay the demo-specific files from this repo onto the generated project.
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_DIR="/tmp/demo-todo-build"

if [[ ! -d "$BUILD_DIR" ]]; then
  echo "Build directory $BUILD_DIR does not exist. Run ops/generate.sh first."
  exit 1
fi

echo "Overlaying demo files from $REPO_ROOT onto $BUILD_DIR ..."
rsync -av \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='ops' \
  --exclude='data*.sqlite' \
  --exclude='*.log' \
  --exclude='package-lock.json' \
  "$REPO_ROOT/" "$BUILD_DIR/"

echo "Overlay complete."
