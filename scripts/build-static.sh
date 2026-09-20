#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
API_BACKUP="$(mktemp -d)"
trap 'if [ -d "$API_BACKUP/api" ]; then rm -rf src/app/api; mv "$API_BACKUP/api" src/app/api; fi; rmdir "$API_BACKUP" 2>/dev/null || true' EXIT
mv src/app/api "$API_BACKUP/api"
STATIC_EXPORT=1 npx next build
