# Shoolin Consultancy Website

This is the official website for Shoolin Consultancy, built with Next.js, TypeScript, and Tailwind CSS.

## Table of Contents
- [Getting Started](#getting-started)
- [Development](#development)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
  - [Docker Deployment](#docker-deployment)
  - [Manual Deployment](#manual-deployment)
  - [Vercel Deployment](#vercel-deployment)
- [CI/CD](#cicd)

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
public/              # Static assets
```

## Deployment

### Docker Deployment

This project includes Docker configuration for easy deployment. The Docker setup uses a multi-stage build process to create a lightweight production image.

#### Prerequisites
- Docker
- Docker Compose (optional)

#### Building and Running with Docker

To build the Docker image:

```bash
docker build -t shoolin-website .
```

To run the container:

```bash
docker run -p 3000:3000 shoolin-website
```

#### Using Docker Compose

For a more comprehensive setup, you can use Docker Compose:

```bash
docker-compose up -d
```

This will build the image if it doesn't exist and start the container in detached mode.

#### Docker Configuration

- The Dockerfile uses a multi-stage build process:
  1. Build Stage: Installs dependencies and builds the application
  2. Production Stage: Creates a lightweight production image with only necessary files

- The container runs as a non-root user for security
- The application is exposed on port 3000
- Health checks are configured to monitor the application status

### Manual Deployment

To deploy manually to a server:

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. For production deployment, consider using a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start npm --name "shoolin-website" -- start
   ```

### Vercel Deployment

For the simplest deployment option, deploy directly to Vercel:

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Import the project to Vercel: https://vercel.com/new
3. Follow the deployment steps provided by Vercel

## CI/CD

For continuous integration and deployment, you can set up:

- **GitHub Actions**: For automated testing and building
- **Docker Hub**: For automated container building
- **Vercel Integrations**: For automatic deployments on push

A sample GitHub Actions workflow for Docker deployment is included in the `.github/workflows` directory.
# shoolinconsultancy
