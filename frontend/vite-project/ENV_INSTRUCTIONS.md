# Environment Variable Setup

Before deploying the frontend to Vercel, you need to set up the environment variable for the API URL.

## Option 1: Create a .env.production file

Create a file named `.env.production` in the `frontend/vite-project` directory with the following content:

```
VITE_API_URL=https://geo-spark-sanjaya1105s-projects.vercel.app
```

## Option 2: Set environment variables in Vercel dashboard

When deploying to Vercel:

1. Go to your project settings in the Vercel dashboard
2. Navigate to "Environment Variables"
3. Add a new variable:
   - Name: `VITE_API_URL`
   - Value: `https://geo-spark-sanjaya1105s-projects.vercel.app`

## Notes

- Do not include `/api` at the end of the URL - the API endpoints in your code should include that part
- Make sure your API calls in the frontend code use the full path, e.g. `${API_URL}/api/users/login` 