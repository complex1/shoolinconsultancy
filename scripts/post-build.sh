#!/bin/bash

# This script handles post-build tasks to ensure Prisma works correctly in production

echo "Starting post-build tasks for Prisma..."

# Create directory structure
echo "Creating directory structure..."
mkdir -p .next/standalone/.prisma/client

# Check if the Prisma client exists in node_modules
if [ ! -d "node_modules/.prisma/client" ]; then
  echo "Prisma client not found in node_modules! Running prisma generate..."
  npx prisma generate
fi

# Copy Prisma client files
echo "Copying Prisma client files to standalone output..."
cp -r node_modules/.prisma/client/* .next/standalone/.prisma/client/

# Verify the files were copied correctly
if [ -f ".next/standalone/.prisma/client/index.js" ]; then
  echo "Prisma client files successfully copied!"
else
  echo "WARNING: Prisma client files may not have been copied correctly!"
  echo "Contents of .next/standalone/.prisma/client:"
  ls -la .next/standalone/.prisma/client || echo "(empty or non-existent)"
fi

echo "Post-build tasks completed!"
