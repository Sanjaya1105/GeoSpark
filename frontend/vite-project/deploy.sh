#!/bin/bash

echo "===== Starting GeoSpark Frontend Deployment ====="

# Ensure we're in the frontend/vite-project directory
cd "$(dirname "$0")"

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Create or update .env.production
echo "Creating production environment variables..."
echo "VITE_API_URL=https://geo-spark-sanjaya1105s-projects.vercel.app" > .env.production

# Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel --prod

echo "===== Deployment Complete ====="
echo "Check the Vercel dashboard for deployment status and URL."
echo "If you encounter a 404 error, try visiting the deployed URL with /test.html appended to test static file serving." 