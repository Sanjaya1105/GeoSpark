# Vercel Deployment Troubleshooting

If you're encountering a `404: NOT_FOUND` error when deploying your GeoSpark frontend to Vercel, follow these steps to diagnose and fix the issue.

## Deployment Steps

1. **Make sure you're in the correct directory**
   ```bash
   cd frontend/vite-project
   ```

2. **Run the deployment script**
   ```bash
   bash deploy.sh
   ```
   Or manually:
   ```bash
   # Install dependencies
   npm install
   
   # Create .env.production
   echo "VITE_API_URL=https://geo-spark-sanjaya1105s-projects.vercel.app" > .env.production
   
   # Deploy
   npx vercel --prod
   ```

## If You Still See a 404 Error

1. **Test the static file serving**
   Visit `https://your-deployment-url.vercel.app/test.html`
   
   If this page loads, it confirms that your deployment is working, but there might be an issue with the SPA routing.

2. **Check the build output**
   In the Vercel dashboard, go to your deployment and check the build logs for any errors.

3. **Verify the build output directory**
   Make sure Vercel is correctly setting the output directory to `dist` (this should be handled by the vercel.json file)

4. **Try a fresh deployment**
   ```bash
   # Remove any existing Vercel link
   rm -rf .vercel
   
   # Deploy again
   npx vercel --prod
   ```

5. **Manual override in Vercel dashboard**
   If all else fails, try setting these values manually in the Vercel dashboard project settings:
   - Build Command: `npm run build`
   - Output Directory: `dist` 
   - Install Command: `npm install`
   - Development Command: `npm run dev`

## Common Issues and Solutions

1. **Issue**: Vercel is not detecting the correct framework
   **Solution**: Make sure vercel.json has `"framework": "vite"`

2. **Issue**: Static files not being served
   **Solution**: Check if `/test.html` loads to verify static file serving works

3. **Issue**: SPA routing issues
   **Solution**: Verify your vercel.json has the correct rewrites configuration:
   ```json
   "rewrites": [
     { "source": "/(.*)", "destination": "/index.html" }
   ]
   ```

4. **Issue**: Environment variables not set
   **Solution**: Check that your environment variables are correctly set either in .env.production or in the Vercel dashboard

5. **Issue**: Cache-related issues
   **Solution**: Add cache-control headers as shown in the vercel.json file

## After Successful Deployment

After successfully deploying, make sure to:

1. Test the connection to your backend API
2. Verify that environment variables are correctly loaded
3. Test the application functionality thoroughly 