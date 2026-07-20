#!/usr/bin/env bash
set -euo pipefail

# Full teardown and rebuild of the demo project in /tmp/demo-todo-build.
# This proves the published CLI generator plus the demo overlay still produce a working app.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== SimpleWorkJS demo-todo full rebuild ==="
"$SCRIPT_DIR/clean.sh"
"$SCRIPT_DIR/generate.sh"
"$SCRIPT_DIR/install.sh"
"$SCRIPT_DIR/overlay.sh"
"$SCRIPT_DIR/test.sh"
echo "=== Full rebuild complete: /tmp/demo-todo-build is ready ==="
echo "Run ./ops/start.sh to smoke test it on port 3001."
