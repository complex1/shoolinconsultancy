#!/bin/bash

# Script to set up environment for the media library

# Create media uploads directory
echo "Creating media uploads directory..."
mkdir -p public/uploads/media
chmod 755 public/uploads/media

# Run database migrations to ensure the media table exists
echo "Running database migrations..."
npx prisma migrate deploy

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

echo "Setup complete!"
echo "You can now use the media library in the admin panel."
