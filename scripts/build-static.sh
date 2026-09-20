#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
API_BACKUP="$(mktemp -d)"
trap 'if [ -d "$API_BACKUP/api" ]; then rm -rf src/app/api; mv "$API_BACKUP/api" src/app/api; fi; rmdir "$API_BACKUP" 2>/dev/null || true' EXIT
mv src/app/api "$API_BACKUP/api"
STATIC_EXPORT=1 npx next build
# Next export uses about.html; copy to about/index.html so Surge serves /about
python3 - <<'PY'
from pathlib import Path
root = Path("out")
for html in root.rglob("*.html"):
    if html.name in {"index.html", "404.html"}:
        continue
    dest_dir = html.with_suffix("")
    dest = dest_dir / "index.html"
    if dest.exists():
        continue
    dest_dir.mkdir(parents=True, exist_ok=True)
    if not dest.exists():
        dest.write_bytes(html.read_bytes())
PY

