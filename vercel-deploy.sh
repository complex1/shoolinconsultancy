#!/bin/bash

# Vercel deployment helper script
echo "=== Node Version ==="
node -v

echo "=== NPM Version ==="
npm -v

echo "=== Running Build ==="
npm run build

echo "=== Checking Generated Files ==="
if [ -d ".next/standalone" ]; then
  echo "✅ Build files found and appear correct"
else
  echo "⚠️ WARNING: Build files may not be set up correctly"
  echo "This could cause runtime errors in your application"
fi

echo "=== Deployment Complete ==="
