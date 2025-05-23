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

echo "=== Checking Generated Files ==="
ls -la .next/standalone/.prisma/client || echo "Prisma client not found in standalone output"

echo "=== Deployment Complete ==="
