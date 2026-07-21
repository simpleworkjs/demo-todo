#!/usr/bin/env bash
set -euo pipefail

# Overlay the demo-specific files from this repo onto the generated project.
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_DIR="/tmp/demo-todo-build"
APP_DIR="$BUILD_DIR/app"

if [[ ! -d "$BUILD_DIR" ]]; then
  echo "Build directory $BUILD_DIR does not exist. Run ops/generate.sh first."
  exit 1
fi

mkdir -p "$APP_DIR"

echo "Overlaying demo files from $REPO_ROOT/app onto $APP_DIR ..."
rsync -av \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='data*.sqlite' \
  --exclude='*.log' \
  --exclude='package-lock.json' \
  "$REPO_ROOT/app/" "$APP_DIR/"

echo "Overlay complete. App is at $APP_DIR."
