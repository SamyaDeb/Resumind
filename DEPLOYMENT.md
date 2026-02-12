# Deployment Guide — Full Vercel Deployment

The entire Resumind application (frontend + API) is deployed as a **single Next.js project** on Vercel.

## Architecture

- **Frontend**: Next.js pages (SSR + static)
- **Backend API**: Next.js API Routes (Vercel Serverless Functions)

All Express.js backend routes have been converted to Next.js App Router API routes under `frontend/src/app/api/`.

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/resume` | GET | Fetch saved resume (auth required) |
| `/api/resume/save` | POST | Save resume data (auth required) |
| `/api/resume/download` | POST | Generate PDF from resume |
| `/api/resume/optimize-and-download` | POST | AI optimize + generate PDF |
| `/api/ats/score` | POST | Calculate ATS score |
| `/api/llm/enhance-bullet` | POST | AI enhance bullet point |
| `/api/llm/generate-summary` | POST | AI generate summary |
| `/api/llm/improve-section` | POST | AI improve section |
| `/api/llm/suggest-skills` | POST | AI suggest skills |
| `/api/llm/analyze-job` | POST | AI analyze job description |
| `/api/templates` | GET | Get all templates |

## Deploy to Vercel

### Step 1: Import to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your GitHub repo: `SamyaDeb/Resumind`
4. Set **Root Directory** to `frontend`
5. Framework Preset: **Next.js** (auto-detected)

### Step 2: Add Environment Variables
Add these in the Vercel dashboard under **Settings > Environment Variables**:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD5berK9QiIcWyuFk-uuRZ8Yi-88KIbqn8
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=resumind-dff9e.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=resumind-dff9e
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=resumind-dff9e.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=124978184815
NEXT_PUBLIC_FIREBASE_APP_ID=1:124978184815:web:d379f6c9c7b53ed0ef439a
NEXT_PUBLIC_API_URL=
OPENAI_API_KEY=your-openai-api-key
FIREBASE_PROJECT_ID=resumind-dff9e
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@resumind-dff9e.iam.gserviceaccount.com
```

### Step 3: Deploy & Update Firebase
1. Click **Deploy**
2. Add your Vercel domain to Firebase Console > Authentication > Authorized Domains

## Troubleshooting

- **Firebase Auth Error**: Add Vercel domain to Firebase authorized domains
- **API 500 errors**: Check Vercel Function Logs for details
- **PDF fails**: External LaTeX service may be down; falls back to HTML-to-PDF
- **Env vars not working**: `NEXT_PUBLIC_*` vars require redeploy after changes
