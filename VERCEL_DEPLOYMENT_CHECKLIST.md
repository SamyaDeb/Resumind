# Vercel Deployment Checklist

## ✅ Pre-Deployment Setup

### 1. Environment Files Ready
- [x] `backend/.env` - Updated with production placeholders
- [x] `backend/.env.example` - Template created
- [x] `frontend/.env.local` - Updated with production comments
- [x] `frontend/.env.example` - Template created

### 2. Required Accounts
- [ ] Vercel account created (https://vercel.com)
- [ ] Railway account created (https://railway.app) OR Render account
- [ ] OpenAI API key obtained (https://platform.openai.com)
- [ ] Firebase project configured

### 3. Firebase Setup
- [ ] Firebase project created
- [ ] Authentication enabled (Email/Password, Google)
- [ ] Firestore database created
- [ ] Service account key downloaded
- [ ] Firebase web config copied

## 🚀 Deployment Steps

### Step 1: Deploy Backend

#### Option A: Railway (Recommended)
1. [ ] Sign in to Railway
2. [ ] Create new project
3. [ ] Connect GitHub repository
4. [ ] Select backend folder or create backend-only repo
5. [ ] Add environment variables:
   - [ ] `NODE_ENV=production`
   - [ ] `OPENAI_API_KEY=<your-key>`
   - [ ] `FIREBASE_PROJECT_ID=<your-project-id>`
   - [ ] `FIREBASE_PRIVATE_KEY=<your-private-key>`
   - [ ] `FIREBASE_CLIENT_EMAIL=<your-client-email>`
   - [ ] `FRONTEND_URL=<will-add-after-frontend-deployment>`
6. [ ] Deploy backend
7. [ ] Copy Railway URL (e.g., `https://your-app.railway.app`)

#### Option B: Render
1. [ ] Sign in to Render
2. [ ] Create new Web Service
3. [ ] Connect GitHub repository
4. [ ] Configure:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
5. [ ] Add environment variables (same as Railway)
6. [ ] Deploy and copy Render URL

### Step 2: Deploy Frontend to Vercel

1. [ ] Sign in to Vercel
2. [ ] Click "New Project"
3. [ ] Import GitHub repository
4. [ ] Configure project:
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. [ ] Add environment variables in Vercel dashboard:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD5berK9QiIcWyuFk-uuRZ8Yi-88KIbqn8
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=resumind-dff9e.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=resumind-dff9e
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=resumind-dff9e.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=124978184815
   NEXT_PUBLIC_FIREBASE_APP_ID=1:124978184815:web:d379f6c9c7b53ed0ef439a
   NEXT_PUBLIC_API_URL=<your-railway-or-render-url>
   ```
6. [ ] Deploy frontend
7. [ ] Copy Vercel URL (e.g., `https://your-app.vercel.app`)

### Step 3: Update CORS Settings

1. [ ] Go back to Railway/Render dashboard
2. [ ] Update `FRONTEND_URL` environment variable with your Vercel URL
3. [ ] Redeploy backend if needed

### Step 4: Firebase Configuration

1. [ ] Go to Firebase Console
2. [ ] Navigate to Authentication > Settings
3. [ ] Add authorized domain: `<your-vercel-url>`
4. [ ] Update any OAuth redirect URIs if using Google Auth

## 🧪 Testing

### Test Frontend
- [ ] Visit your Vercel URL
- [ ] Check that page loads correctly
- [ ] Verify no console errors

### Test Authentication
- [ ] Try to sign up
- [ ] Try to log in
- [ ] Check Firebase console for new user

### Test Backend Integration
- [ ] Create a new resume
- [ ] Generate AI content
- [ ] Check ATS score
- [ ] Download PDF
- [ ] Save resume to database

### Test Database
- [ ] Check Firestore for saved resumes
- [ ] Verify data structure is correct

## 🔧 Common Issues & Fixes

### Issue: CORS Error
**Fix**: Make sure `FRONTEND_URL` in backend matches your Vercel URL exactly (including https://)

### Issue: Firebase Auth Error
**Fix**: Add your Vercel domain to Firebase authorized domains

### Issue: Environment Variables Not Working
**Fix**: 
- Ensure frontend vars start with `NEXT_PUBLIC_`
- Redeploy after adding/changing env vars in Vercel

### Issue: API Not Found (404)
**Fix**: Check that `NEXT_PUBLIC_API_URL` points to your backend URL

### Issue: PDF Generation Fails
**Fix**: Some platforms don't support LaTeX. Consider:
- Using Docker container with LaTeX
- Using a dedicated PDF generation service
- Switching to a different deployment platform

## 📊 Monitoring

- [ ] Set up Vercel Analytics
- [ ] Monitor Railway/Render logs
- [ ] Set up error tracking (Sentry)
- [ ] Configure uptime monitoring

## 🎯 Optional Enhancements

- [ ] Add custom domain to Vercel
- [ ] Set up SSL certificate
- [ ] Configure CDN settings
- [ ] Add API rate limiting
- [ ] Set up automated backups
- [ ] Configure monitoring alerts

## 📝 Important URLs

- Frontend URL: `_______________________`
- Backend URL: `_______________________`
- Firebase Console: https://console.firebase.google.com
- Vercel Dashboard: https://vercel.com/dashboard
- Railway Dashboard: https://railway.app/dashboard

## ✅ Deployment Complete!

Once all checks are complete:
1. [ ] Test all features thoroughly
2. [ ] Share URL with beta testers
3. [ ] Monitor for any errors
4. [ ] Celebrate! 🎉
