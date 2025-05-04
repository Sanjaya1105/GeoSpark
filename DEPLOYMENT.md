# Deploying GeoSpark to Vercel

This document provides step-by-step instructions for deploying both the frontend and backend of GeoSpark to Vercel for free.

## Prerequisites

1. Create a Vercel account at https://vercel.com/signup if you don't have one already
2. Install Vercel CLI (optional but recommended):
   ```
   npm install -g vercel
   ```
3. Install Git if not already installed: https://git-scm.com/downloads

## Step 1: Deploy the Backend

1. Log in to Vercel in your terminal:
   ```
   vercel login
   ```

2. Navigate to the backend directory:
   ```
   cd backend
   ```

3. Deploy to Vercel:
   ```
   vercel
   ```
   - When prompted, select "Y" to link to an existing project, or "N" to create a new one
   - Follow the interactive prompts
   - Make note of the deployment URL that Vercel provides (e.g., https://geo-spark-sanjaya1105s-projects.vercel.app)

4. Set environment variables in the Vercel dashboard:
   - Go to https://vercel.com/dashboard
   - Select your backend project
   - Go to "Settings" > "Environment Variables"
   - Add your MongoDB connection string as `MONGODB_URI`
   - Add any other required environment variables (JWT_SECRET, etc.)

## Step 2: Deploy the Frontend

1. Update the backend API URL:
   - Create a `.env.production` file in the frontend/vite-project directory
   - Add the following line, replacing with your actual backend URL (do NOT add /api at the end):
     ```
     VITE_API_URL=https://geo-spark-sanjaya1105s-projects.vercel.app
     ```

2. Navigate to the frontend directory:
   ```
   cd ../frontend/vite-project
   ```

3. Deploy to Vercel:
   ```
   vercel
   ```
   - Follow the interactive prompts
   - When asked about build settings, Vercel should automatically detect the Vite configuration

4. Alternatively, set the environment variable directly in Vercel:
   - In the Vercel dashboard, select your frontend project
   - Go to "Settings" > "Environment Variables"
   - Add a new variable:
     - Name: `VITE_API_URL`
     - Value: `https://geo-spark-sanjaya1105s-projects.vercel.app`

5. Once deployed, your frontend will be available at the URL provided by Vercel.

## Important: API Endpoints in Your Code

Make sure your frontend code appends the correct API paths when making requests:

```javascript
import { API_URL } from './config';

// Example of a correct API call
fetch(`${API_URL}/api/users/login`, {
  method: 'POST',
  // other options
});
```

## Alternative: Deploy directly from GitHub

1. Push your repository to GitHub
2. Log in to https://vercel.com/dashboard
3. Click "Add New" > "Project"
4. Import your GitHub repository
5. Configure both the frontend and backend as separate projects:
   - For the frontend, select the `frontend/vite-project` directory as the root
   - For the backend, select the `backend` directory as the root
6. Configure environment variables for each deployment
7. Deploy!

## Troubleshooting

- If you encounter CORS errors, ensure your backend CORS configuration allows requests from your frontend domain
- If environment variables aren't working, check that they're correctly set in the Vercel dashboard
- For MongoDB connection issues, ensure your IP address is whitelisted in MongoDB Atlas 