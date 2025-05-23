#!/bin/bash

# Vercel deployment helper script
echo "=== Node Version ==="
node -v

echo "=== NPM Version ==="
npm -v

echo "=== Running Prisma Generate ==="
npx prisma generate

echo "=== Running Build ==="
npm run build

echo "=== Ensuring Prisma Client Files Are Available ==="
# Create directory if it doesn't exist
mkdir -p .next/standalone/.prisma/client

# Copy Prisma client files if not already done by postbuild
if [ ! -f ".next/standalone/.prisma/client/index.js" ]; then
  echo "Copying Prisma client files manually..."
  cp -r node_modules/.prisma/client/* .next/standalone/.prisma/client/
fi

echo "=== Checking Generated Files ==="
if [ -f ".next/standalone/.prisma/client/index.js" ]; then
  echo "✅ Prisma client files found and appear correct"
  ls -la .next/standalone/.prisma/client
else
  echo "⚠️ WARNING: Prisma client files may not be set up correctly"
  echo "This could cause runtime errors in your application"
  echo "Attempting emergency recovery..."
  
  # Create directory if it doesn't exist
  mkdir -p .next/standalone/.prisma/client
  
  # Try to copy files again
  cp -r node_modules/.prisma/client/* .next/standalone/.prisma/client/ || echo "❌ Emergency recovery failed"
  
  # Check again
  if [ -f ".next/standalone/.prisma/client/index.js" ]; then
    echo "✅ Emergency recovery successful!"
  else
    echo "❌ Emergency recovery failed. Application may not work correctly."
  fi
fi

echo "=== Deployment Complete ==="
