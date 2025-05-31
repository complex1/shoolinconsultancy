#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process for Shoolin Consultancy website"

# Step 1: Build the Docker image
echo "📦 Building Docker image..."
docker build -t shoolin-website:latest .

# Step 2: Stop and remove any existing container
echo "🛑 Stopping any existing containers..."
docker stop shoolin-website 2>/dev/null || true
docker rm shoolin-website 2>/dev/null || true

# Step 3: Create media directory if it doesn't exist
echo "📁 Setting up required directories..."
mkdir -p public/uploads/media

# Step 4: Set proper permissions for media uploads directory
echo "🔐 Setting permissions for media uploads directory..."
chmod -R 755 public/uploads/media

# Step 6: Run the new container
echo "🏃 Starting new container..."
docker run -d --name shoolin-website \
  -p 3000:3000 \
  -v "$(pwd)/data/shoolin.db:/app/data/shoolin.db" \
  -v "$(pwd)/public/uploads/media:/app/public/uploads/media" \
  -e DATABASE_URL=file:/app/data/shoolin.db \
  --restart unless-stopped \
  shoolin-website:latest

# Step 7: Clean up old images (optional)
echo "🧹 Cleaning up old images..."
docker image prune -f

echo "✅ Deployment complete! Website is now running at http://localhost:3000"
echo "📝 Deployed version: v1.0.0 - $(date +"%Y-%m-%d %H:%M:%S")"
