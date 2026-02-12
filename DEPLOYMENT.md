# Deployment Guide

This guide will help you deploy the Resumind application to production.

## Architecture Overview

- **Frontend**: Next.js app → Deploy to Vercel
- **Backend**: Express.js API → Deploy to Railway/Render or convert to Vercel Serverless Functions

## Option 1: Deploy Frontend to Vercel + Backend to Railway (Recommended)

### Step 1: Deploy Backend to Railway

1. **Create a Railway account** at [railway.app](https://railway.app)

2. **Create a new project** and select "Deploy from GitHub repo"

3. **Select the backend folder** or create a separate repo for backend

4. **Add Environment Variables** in Railway Dashboard:
   ```
   NODE_ENV=production
   OPENAI_API_KEY=your-openai-api-key
   FIREBASE_PROJECT_ID=resumind-dff9e
   FIREBASE_PRIVATE_KEY=your-private-key-with-escaped-newlines
   FIREBASE_CLIENT_EMAIL=your-firebase-admin-email
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

5. **Note the Railway URL** (e.g., `https://your-app.railway.app`)

### Step 2: Deploy Frontend to Vercel

1. **Push your code to GitHub** (already done!)

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` folder as the root directory

3. **Configure Environment Variables** in Vercel Dashboard:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD5berK9QiIcWyuFk-uuRZ8Yi-88KIbqn8
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=resumind-dff9e.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=resumind-dff9e
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=resumind-dff9e.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=124978184815
   NEXT_PUBLIC_FIREBASE_APP_ID=1:124978184815:web:d379f6c9c7b53ed0ef439a
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app
   ```

4. **Deploy** - Vercel will automatically build and deploy your app

### Step 3: Update CORS Settings

Update the `FRONTEND_URL` in your Railway backend to match your Vercel URL.

## Option 2: Full Vercel Deployment (Advanced)

### Convert Backend to Vercel Serverless Functions

This requires restructuring the backend to work with Vercel's serverless architecture.

1. **Create an `api` folder in the frontend**

2. **Move backend routes to serverless functions**

3. **Update imports and configuration**

This option requires more work but keeps everything in one deployment.

## Post-Deployment Checklist

- [ ] Test user authentication
- [ ] Test resume creation and PDF generation
- [ ] Test ATS score analysis
- [ ] Verify Firebase connection
- [ ] Check API rate limits
- [ ] Monitor error logs
- [ ] Set up custom domain (optional)

## Environment Variables Reference

### Frontend (Vercel)
All variables must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser.

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase web API key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |

### Backend (Railway/Render)

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (production) | Yes |
| `PORT` | Server port (auto-set by Railway) | No |
| `OPENAI_API_KEY` | OpenAI API key | Yes |
| `FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `FIREBASE_PRIVATE_KEY` | Firebase admin private key | Yes |
| `FIREBASE_CLIENT_EMAIL` | Firebase admin email | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |

## Troubleshooting

### Firebase Private Key Issues
If you get Firebase authentication errors, ensure the private key is properly formatted with escaped newlines (`\\n`).

### CORS Errors
Make sure `FRONTEND_URL` in backend matches your Vercel deployment URL exactly.

### API URL Not Working
Double-check that `NEXT_PUBLIC_API_URL` points to your deployed backend URL.

### LaTeX/PDF Generation Issues
Some platforms may not have LaTeX installed. Consider using a Docker container or a service that supports LaTeX.

## Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Railway Deployment Guide](https://docs.railway.app/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
