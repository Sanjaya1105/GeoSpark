#!/bin/bash

echo "===== Starting GeoSpark Frontend Deployment ====="

# Ensure we're in the frontend/vite-project directory
cd "$(dirname "$0")"

# Clear previous build artifacts
echo "Cleaning previous builds..."
rm -rf dist
rm -rf node_modules/.vite

# Install dependencies
echo "Installing dependencies..."
npm install

# Create or update .env.production
echo "Creating production environment variables..."
echo "VITE_API_URL=https://geo-spark-sanjaya1105s-projects.vercel.app" > .env.production

# Build the project
echo "Building the project..."
npm run build

# Verify build output
if [ -d "dist" ]; then
  echo "✓ Build successful. 'dist' directory created."
  echo "Contents of dist directory:"
  ls -la dist
else
  echo "✗ Build failed. 'dist' directory not found."
  exit 1
fi

# Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel --prod

echo "===== Deployment Complete ====="
echo "Check the Vercel dashboard for deployment status and URL."
echo ""
echo "Debugging instructions:"
echo "1. Visit your-deployment-url/test.html to check static file serving"
echo "2. Visit your-deployment-url/debug.html for detailed diagnostics"
echo "3. Check browser console for JavaScript errors"
echo ""
echo "If you still encounter issues, you can manually deploy from the Vercel dashboard:"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Import your repository"
echo "3. Configure the project with these settings:"
echo "   - Framework preset: Vite"
echo "   - Root directory: frontend/vite-project"
echo "   - Build command: npm run build"
echo "   - Output directory: dist" 