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

# Step 3: Run the new container
echo "🏃 Starting new container..."
docker run -d --name shoolin-website \
  -p 3000:3000 \
  --restart unless-stopped \
  shoolin-website:latest

# Step 4: Clean up old images (optional)
echo "🧹 Cleaning up old images..."
docker image prune -f

echo "✅ Deployment complete! Website is now running at http://localhost:3000"
