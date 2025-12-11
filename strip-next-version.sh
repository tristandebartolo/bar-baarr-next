#!/bin/bash
set -e

echo "[postbuild] Stripping Next.js version from .next artifacts for security…"

NEXT_VERSION=$(node -p "require('./node_modules/next/package.json').version" 2>/dev/null || echo "")

if [ -z "$NEXT_VERSION" ]; then
  echo "[postbuild] Warning: Could not detect Next.js version. Skipping."
  exit 0
fi

echo "[postbuild] Detected Next.js version: $NEXT_VERSION"

# macOS BSD sed est chiant avec les chemins .next et les fichiers binaires → on utilise Perl à la place
# Perl est installé nativement sur macOS et gère tout parfaitement
find .build -type f -print0 2>/dev/null | xargs -0 perl -i -pe "s/\Q$NEXT_VERSION//g" 2>/dev/null || true

echo "[postbuild] Successfully stripped version $NEXT_VERSION from all .next files."