#!/bin/bash

# Script to set up environment for the media library

# Create media uploads directory
echo "Creating media uploads directory..."
mkdir -p public/uploads/media
chmod 755 public/uploads/media

echo "Setup complete!"
echo "Media upload directory is now ready to use."
