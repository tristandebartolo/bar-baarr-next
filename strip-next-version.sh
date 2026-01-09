#!/bin/bash
set -e

echo "[postbuild] Stripping Next.js version from .next artifacts for security…"

# Get the actual installed Next.js version
NEXT_VERSION=$(node -p "require('./node_modules/next/package.json').version" 2>/dev/null || echo "")

if [ -z "$NEXT_VERSION" ]; then
  echo "[postbuild] ⚠️ Could not detect Next.js version. Skipping strip step."
  exit 0
fi

# Find all TEXT files containing the version (exclude binaries)
FILES=$(grep -rlIF "$NEXT_VERSION" .next 2>/dev/null || true)

if [ -z "$FILES" ]; then
  echo "[postbuild] ✅ No occurrences of $NEXT_VERSION found in .next."
  exit 0
fi

# Replace version with empty string (macOS compatible)
if [ "$(uname)" = "Darwin" ]; then
  # macOS (BSD sed) requires empty string after -i
  # Process each file individually to handle encoding issues
  echo "$FILES" | while IFS= read -r file; do
    if [ -f "$file" ]; then
      LC_ALL=C sed -i '' "s/$NEXT_VERSION//g" "$file" 2>/dev/null || true
    fi
  done
else
  # Linux (GNU sed)
  echo "$FILES" | xargs sed -i "s/$NEXT_VERSION//g"
fi

# BUILD_DIR=".next"
# grep -rl "$NEXT_VERSION" "$BUILD_DIR" | xargs sed -i  "s/$NEXT_VERSION//g"

echo "[postbuild] ✅ Removed Next.js version $NEXT_VERSION from $(echo "$FILES" | wc -l) files."