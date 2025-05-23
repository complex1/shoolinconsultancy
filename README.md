# Shoolin Consultancy Website

This is the official website for Shoolin Consultancy, built with Next.js, TypeScript, and Tailwind CSS.

## Table of Contents
- [Getting Started](#getting-started)
- [Development](#development)
- [Project Structure](#project-structure)
- [Database](#database)
  - [Schema](#schema)
  - [Migrations](#migrations)
  - [Seeding](#seeding)
- [Deployment](#deployment)
  - [Docker Deployment](#docker-deployment)
  - [Manual Deployment](#manual-deployment)
  - [Vercel Deployment](#vercel-deployment)
- [Admin Panel](#admin-panel)
  - [Features](#features)
  - [Access and Security](#access-and-security)
  - [Usage](#usage)
  - [Media Library](#media-library)
  - [Admin User Management](#admin-user-management)
  - [Customizing the Admin Interface](#customizing-the-admin-interface)
- [CI/CD](#cicd)
  - [GitHub Actions Workflow](#github-actions-workflow)
  - [Configuration](#configuration)
  - [Docker Image Tags](#docker-image-tags)  
  - [Setting Up CI/CD](#setting-up-cicd)
  - [Manual Deployment with CI/CD](#manual-deployment-with-cicd)
  - [Rollback Process](#rollback-process)
- [Troubleshooting](#troubleshooting)
  - [Database Issues](#database-issues)
  - [Docker Deployment Issues](#docker-deployment-issues)
  - [Application Issues](#application-issues)
- [Troubleshooting](#troubleshooting)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

This project uses:
- **Next.js** (v15.3.2) - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React** (v19.0.0) - UI library
- **Framer Motion** - Animations

## Project Structure

```
src/
  app/               # App router pages and layouts
    components/      # Shared components
      layout/        # Layout components (Header, Footer)
      ui/            # UI components
    about/           # About page
    blog/            # Blog page
    contact/         # Contact page
    services/        # Services page
    admin/           # Admin panel for content management
  lib/               # Utility functions and shared code
  generated/         # Generated code (Prisma client)
public/              # Static assets
prisma/              # Database schema and migrations
```

## Database

This project uses SQLite with Prisma ORM for data management. The database file is located at `prisma/shoolin.db`.

### Schema

The database schema is defined in `prisma/schema.prisma` and includes the following models:

- `AdminUser`: Admin users who can access the content management system
- `BlogPost`: Blog articles with content, tags, and author relations
- `Tag`: Tags for categorizing blog posts
- `TeamMember`: Profiles of team members/attorneys
- `Testimonial`: Client testimonials
- `Service`: Company services
- `ContactSubmission`: Form submissions from the contact page

### Migrations

Database migrations are managed through Prisma. To create a new migration after schema changes:

```bash
npm run db:migrate
```

### Seeding

Seed data is provided for development environments:

```bash
npm run db:seed
```

## Deployment

### Docker Deployment

This project includes Docker configuration for easy deployment. The Docker setup uses a multi-stage build process to create a lightweight production image and preserves the database across container recreations.

#### Prerequisites
- Docker
- Docker Compose (optional)

#### Building and Running with Docker

To build the Docker image:

```bash
docker build -t shoolin-website .
```

To run the container with a persistent database:

```bash
# Create data directory if it doesn't exist
mkdir -p data

# Copy database file if it doesn't exist in data directory
[ -f "data/shoolin.db" ] || cp prisma/shoolin.db data/shoolin.db

# Run the container with volume mount for the database
docker run -p 3000:3000 \
  -v "$(pwd)/data/shoolin.db:/app/data/shoolin.db" \
  -e DATABASE_URL=file:/app/data/shoolin.db \
  shoolin-website
```

#### Using Docker Compose (Recommended)

For a more comprehensive setup, you can use Docker Compose:

```bash
docker-compose up -d
```

This will build the image if it doesn't exist and start the container in detached mode with the proper database configuration.

#### Automated Deployment Script

For convenience, you can use the included deployment script:

```bash
./deploy.sh
```

This script handles:
1. Building the Docker image
2. Setting up the database file
3. Stopping any existing container
4. Starting a new container with the latest build
5. Cleaning up old images

#### Docker Configuration

- The Dockerfile uses a multi-stage build process:
  1. Build Stage: Installs dependencies, generates the Prisma client, and builds the application
  2. Production Stage: Creates a lightweight production image with only necessary files

- Database persistence is managed through volume mounting
- The container runs as a non-root user for security
- The application is exposed on port 3000
- Health checks are configured to monitor the application status

### Manual Deployment

To deploy manually to a server:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shoolin-website.git
   cd shoolin-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Either use the existing database or run migrations to create a new one
   # Option 1: Use existing database
   cp prisma/shoolin.db ./shoolin.db

   # Option 2: Run migrations to create a new database
   npx prisma migrate deploy
   npx prisma db seed
   ```

4. Build the application:
   ```bash
   npm run build
   ```

5. Set environment variables:
   ```bash
   # Create .env.production file
   echo "DATABASE_URL=file:./shoolin.db" > .env.production
   ```

6. Start the production server:
   ```bash
   npm start
   ```

7. For production deployment, consider using a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start npm --name "shoolin-website" -- start

   # To ensure PM2 restarts the application on server reboot
   pm2 startup
   pm2 save
   ```

8. Set up NGINX as a reverse proxy (optional but recommended):
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com www.yourdomain.com;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

### Vercel Deployment

For the simplest deployment option, deploy directly to Vercel:

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Import the project to Vercel: https://vercel.com/new
3. Follow the deployment steps provided by Vercel

## Admin Panel

The website includes a secure admin panel for content management with authentication, enabling non-technical administrators to manage website content without coding knowledge.

### Features

- **Secure Authentication**: Role-based access with username/password authentication
- **Dashboard**: Overview with key statistics and system status
- **Content Management**: 
  - Blog posts with rich text editor, image uploads, and tag management
  - Team members profiles and photos
  - Services with detailed descriptions and icons
  - Testimonials management
  - Media library for file uploads with public URL sharing
  - Contact form submission review
  
### Access and Security

- Admin users are stored in the database with hashed passwords
- Session management through client-side storage with server validation
- Protected routes prevent unauthorized access to admin features

### Usage

1. **Access the Admin Panel**: Navigate to `/admin` in a browser
2. **Login**: Use admin credentials to authenticate
3. **Dashboard Navigation**: Use the sidebar to navigate between different content sections
4. **Content Operations**:
   - View lists of content items
   - Create new content items using forms
   - Edit existing content using pre-populated forms
   - Delete content items with confirmation
   - Toggle features like "published" or "featured" status

### Media Library

The admin panel includes a media library for uploading and managing files:

#### Features

- **File Upload**: Support for images, documents, PDFs, and other file types
- **Organization**: Files are stored in a centralized location with metadata
- **Public URLs**: Each uploaded file gets a public URL that can be copied and used on the website
- **Metadata Management**: Edit title, description, and alt text for better SEO and accessibility

#### Usage

1. **Uploading Media**:
   - Navigate to Media Library in the admin sidebar
   - Click "Upload New Media"
   - Drag and drop files or click to browse
   - Add title, description, and alt text
   - Save the upload

2. **Managing Media**:
   - View all media items in a grid layout
   - Search and filter by type or date
   - Copy public URLs with a single click
   - Edit metadata as needed

3. **Using Media in Content**:
   - Copy the URL of any media file
   - Use it in blog posts, service descriptions, or any content with image or file links

#### Storage Structure

Media files are stored in the `public/uploads/media` directory with unique filenames to prevent conflicts. File metadata is stored in the database `Media` table, including:

- Original filename
- Server filepath
- MIME type
- File size
- Title, description, and alt text

#### Docker Integration

The media library is configured to persist files when using Docker:

- The `public/uploads/media` directory is mounted as a volume in both docker-compose.yml and deploy.sh
- Permissions are automatically set to ensure write access
- Media files remain accessible across container rebuilds and restarts

#### Setup Script

For easy setup, run:

```bash
npm run setup:media
```

This script:
1. Creates the required media uploads directory
2. Sets proper directory permissions
3. Runs database migrations to ensure the media table exists
4. Generates the Prisma client

### Admin User Management

New admin users can be created through:

1. **Direct Database Access**: Add users to the `AdminUser` table with properly hashed passwords
2. **Command Line**: Use the provided user management script:
   ```bash
   npm run admin:create-user -- --username=admin --name="Admin User" --password=yourpassword
   ```

### Customizing the Admin Interface

The admin interface can be customized by editing the components in:

- `src/app/admin/components/` - Admin-specific UI components
- `src/app/components/layout/AdminLayout.tsx` - Admin layout wrapper

## CI/CD

The project includes a complete CI/CD pipeline using GitHub Actions for continuous integration and automated deployments.

### GitHub Actions Workflow

A GitHub Actions workflow (`docker-build-deploy.yml`) is configured to:

1. Trigger on pushes to the `main` branch and pull requests
2. Set up a Node.js environment
3. Install dependencies
4. Run linting checks
5. Build the application
6. Set up Docker Buildx for efficient Docker builds
7. Build and push Docker images to Docker Hub (on successful pushes to `main`)

### Configuration

The workflow uses the following GitHub secrets:
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub access token or password

### Docker Image Tags

Docker images are tagged with:
- `latest`: Always points to the most recent successful build
- Commit SHA (e.g., `abc123`): Unique version for each commit for rollback purposes

### Setting Up CI/CD

1. **GitHub Repository Settings**:
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Add the required secrets (`DOCKER_USERNAME` and `DOCKER_PASSWORD`)

2. **Customizing the Workflow**:
   - Edit `.github/workflows/docker-build-deploy.yml` to change:
     - Build triggers (branches, events)
     - Build steps
     - Testing requirements
     - Deployment targets
     - Notification settings

3. **Server-Side Deployment**:
   - Set up a webhook or cron job on your server to:
     - Pull the latest Docker image
     - Restart the container

### Manual Deployment with CI/CD

To manually trigger a deployment after CI/CD has built and pushed the image:

```bash
# SSH into your server
ssh user@your-server

# Pull the latest image
docker pull yourusername/shoolin-website:latest

# Stop the current container
docker stop shoolin-website

# Start a new container with the latest image
docker run -d --name shoolin-website \
  -p 3000:3000 \
  -v /path/to/data:/app/data \
  -e DATABASE_URL=file:/app/data/shoolin.db \
  yourusername/shoolin-website:latest
```

### Rollback Process

To rollback to a previous version:

```bash
# Pull a specific version by commit SHA
docker pull yourusername/shoolin-website:abc123def456

# Stop the current container
docker stop shoolin-website

# Start a container with the specific version
docker run -d --name shoolin-website \
  -p 3000:3000 \
  -v /path/to/data:/app/data \
  -e DATABASE_URL=file:/app/data/shoolin.db \
  yourusername/shoolin-website:abc123def456
```

## Troubleshooting

This section covers common issues that may arise during development, deployment, or operation of the website and their solutions.

### Database Issues

#### Database File Permission Problems

**Problem**: Unable to write to database or getting permission errors
**Solution**: 
```bash
# Set correct permissions for the database file
chmod 644 data/shoolin.db
# Ensure the directory has proper permissions
chmod 755 data/
```

#### Migration Errors

**Problem**: Database migration fails when upgrading
**Solution**: 
```bash
# Reset the database (Warning: This will delete all data!)
rm data/shoolin.db
cp prisma/shoolin.db data/shoolin.db

# Or apply migrations manually
npx prisma migrate resolve --applied "migration_name"
```

### Docker Deployment Issues

#### Container Cannot Access Database

**Problem**: Container starts but can't access the database
**Solution**: Check volume mounts and file permissions
```bash
# Verify the database file exists
ls -la data/shoolin.db

# Ensure Docker has permission to access the file
sudo chown -R 1000:1000 data/
```

#### Container Crashes on Startup

**Problem**: Docker container exits immediately after starting
**Solution**: Check logs and ensure environment variables are set
```bash
# Check container logs
docker logs shoolin-website

# Verify your .env file or environment variables
docker exec shoolin-website env
```

### Application Issues

#### Admin Authentication Problems

**Problem**: Unable to log into admin panel
**Solution**: 
```bash
# Reset admin password (requires database access)
npm run admin:reset-password -- --username=admin --password=newpassword
```

#### Image Upload Failures

**Problem**: Unable to upload images in the admin panel
**Solution**: 
```bash
# Check permissions on public/uploads directory
chmod -R 755 public/uploads

# Ensure the directory exists in production
mkdir -p public/uploads
```

#### Server-Side Render (SSR) Issues

**Problem**: Pages show "Error: Failed to load data"
**Solution**: This is typically caused by API errors. Check server logs or try:
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild the application
npm run build
```

For any other issues, please check the application logs or open a GitHub issue with detailed reproduction steps.

# shoolinconsultancy
