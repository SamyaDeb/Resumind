# AI-Powered Resume Builder - Complete Implementation Guide
## From Scratch to Production

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Phase 0: Prerequisites & Setup](#phase-0-prerequisites--setup)
3. [Phase 1: Project Initialization](#phase-1-project-initialization)
4. [Phase 2: Firebase Setup](#phase-2-firebase-setup)
5. [Phase 3: Frontend - Form Builder](#phase-3-frontend---form-builder)
6. [Phase 4: Backend - API & LLM Integration](#phase-4-backend---api--llm-integration)
7. [Phase 5: Resume Template & Preview](#phase-5-resume-template--preview)
8. [Phase 6: Manual Editing with AI Prompts](#phase-6-manual-editing-with-ai-prompts)
9. [Phase 7: PDF Generation & Export](#phase-7-pdf-generation--export)
10. [Phase 8: ATS Scoring System](#phase-8-ats-scoring-system)
11. [Phase 9: Testing & Quality Assurance](#phase-9-testing--quality-assurance)
12. [Phase 10: Deployment to Production](#phase-10-deployment-to-production)
13. [Phase 11: Post-Launch & Optimization](#phase-11-post-launch--optimization)

---

## Project Overview

### What We're Building
An AI-powered resume builder where users:
- Fill out forms (skills, experience, education, etc.)
- Get AI-enhanced content optimized for ATS
- Manually edit sections with AI prompts
- Download professional PDF resumes
- Achieve 90-100 ATS scores

### Tech Stack
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: Firebase (Firestore + Storage)
- **Authentication**: Firebase Auth
- **LLM**: OpenAI GPT-4 / Claude / Gemini
- **PDF Generation**: Puppeteer / html2pdf
- **Deployment**: Vercel (frontend) + Railway/Render (backend)

---

## Phase 0: Prerequisites & Setup

### Required Tools & Accounts

**1. Install Development Tools**
```bash
# Node.js (v18+)
node --version
npm --version

# Git
git --version

# VS Code (recommended)
code --version
```

**2. Create Accounts**
- [ ] GitHub account (for version control)
- [ ] Firebase account (database & auth)
- [ ] OpenAI account (LLM API) - https://platform.openai.com
- [ ] Vercel account (frontend deployment)
- [ ] Railway/Render account (backend deployment)

**3. Get API Keys**
- [ ] OpenAI APIKey-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
- [ ] Firebase credentials
- [ ] Vercel deployment token

**4. Install Global Dependencies**
```bash
npm install -g vercel
npm install -g firebase-tools
```

---

## Phase 1: Project Initialization

### Timeline: Day 1-2

### Step 1.1: Create Project Structure

```bash
# Navigate to your workspace
cd /Users/samya/Downloads/Running\ Project/AI\ Powered\ Resume\ Builder

# Initialize monorepo structure
mkdir frontend backend shared
cd frontend
npx create-next-app@latest . --typescript --tailwind --app --eslint
cd ../backend
npm init -y
cd ..
```

### Step 1.2: Frontend Setup (Next.js)

```bash
cd frontend

# Install dependencies
npm install react-hook-form zod @hookform/resolvers
npm install firebase
npm install @radix-ui/react-dialog @radix-ui/react-select
npm install lucide-react
npm install axios
npm install html2pdf.js
npm install @monaco-editor/react
npm install react-hot-toast
```

**Create folder structure:**
```bash
mkdir -p src/components/form
mkdir -p src/components/editor
mkdir -p src/components/resume
mkdir -p src/components/ui
mkdir -p src/lib
mkdir -p src/services
mkdir -p src/hooks
mkdir -p src/types
mkdir -p src/styles
```

### Step 1.3: Backend Setup (Express.js)

```bash
cd ../backend

# Install dependencies
npm install express cors dotenv
npm install firebase-admin
npm install openai
npm install puppeteer
npm install express-rate-limit
npm install helmet
npm install express-validator

# Install dev dependencies
npm install --save-dev nodemon typescript @types/node @types/express
npm install --save-dev ts-node
```

**Create folder structure:**
```bash
mkdir -p src/routes
mkdir -p src/controllers
mkdir -p src/services
mkdir -p src/middleware
mkdir -p src/utils
mkdir -p src/config
mkdir -p src/templates
```

### Step 1.4: Initialize TypeScript (Backend)

```bash
cd backend
npx tsc --init
```

**Edit `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

**Update `package.json`:**
```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

### Step 1.5: Environment Variables

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Backend `.env`:**
```env
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=your_openai_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
FRONTEND_URL=http://localhost:3000
```

### Step 1.6: Git Setup

```bash
cd ..
git init
```

**Create `.gitignore`:**
```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/

# Production
dist/

# Misc
.DS_Store
*.pem

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

```bash
git add .
git commit -m "Initial project setup"
```

---

## Phase 2: Firebase Setup

### Timeline: Day 2

### Step 2.1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Name: "ai-resume-builder"
4. Create project

### Step 2.2: Enable Firebase Services

**Authentication:**
1. Go to Authentication → Get Started
2. Enable Email/Password

**Firestore Database:**
1. Go to Firestore Database → Create Database
2. Start in production mode
3. Choose region (closest to users)

**Storage (Troubleshooting):**
1. Go to Storage → Get Started
2. If the button is disabled or you see errors, check your Google Cloud Console billing status.
3. **Alternately**: You can skip enabling Storage if you only need text data for now. We can store image URLs from external sources instead.
4. If enabled, start in production mode.

### Step 2.3: Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User documents
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Resumes collection
      match /resumes/{resumeId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

### Step 2.4: Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /resumes/{userId}/{resumeId}/{fileName} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Step 2.5: Create Firestore Collections Structure

```
users/
  └── {userId}/
      ├── email: string
      ├── displayName: string
      ├── createdAt: timestamp
      └── resumes/
          └── {resumeId}/
              ├── ...resume data...
```

### Step 2.6: Get Firebase Config

1. Project Settings → General
2. Scroll to "Your apps"
3. Click Web icon (</>)
4. Register app: "resume-builder-web"
5. Copy config keys to `frontend/.env.local`

### Step 2.7: Download Service Account Key (Backend)

1. Project Settings → Service Accounts
2. Click "Generate new private key"
3. Save as `serviceAccountKey.json` in `backend/src/config/`
4. **NEVER commit this file!**

---

## Phase 3: Frontend - Form Builder

### Timeline: Day 3-5

### Step 3.1: Create Type Definitions

**`frontend/src/types/resume.ts`:**
```typescript
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface ResumeData {
  id?: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  atsScore?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
```

### Step 3.2: Firebase Configuration

**`frontend/src/lib/firebase.ts`:**
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### Step 3.3: Create Form Components

**`frontend/src/components/form/PersonalInfoForm.tsx`:**
```typescript
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PersonalInfo } from '@/types/resume';

const schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  location: z.string().min(2, 'Location is required'),
  linkedin: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  portfolio: z.string().url().optional().or(z.literal('')),
});

interface Props {
  initialData?: PersonalInfo;
  onSubmit: (data: PersonalInfo) => void;
  onNext: () => void;
}

export default function PersonalInfoForm({ initialData, onSubmit, onNext }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfo>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const handleFormSubmit = (data: PersonalInfo) => {
    onSubmit(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <input
            {...register('fullName')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone *</label>
          <input
            {...register('phone')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="+1 234 567 8900"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Location *</label>
          <input
            {...register('location')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="New York, NY"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">LinkedIn</label>
          <input
            {...register('linkedin')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">GitHub</label>
          <input
            {...register('github')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://github.com/yourusername"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Portfolio</label>
          <input
            {...register('portfolio')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://yourportfolio.com"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Next: Experience
      </button>
    </form>
  );
}
```

**`frontend/src/components/form/ExperienceForm.tsx`:**
```typescript
"use client";

import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Experience } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  initialData?: Experience[];
  onSubmit: (data: Experience[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ExperienceForm({ initialData = [], onSubmit, onNext, onBack }: Props) {
  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: {
      experiences: initialData.length > 0 ? initialData : [{
        id: crypto.randomUUID(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        bullets: ['']
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experiences'
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data.experiences);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold">Work Experience</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="border rounded-lg p-6 space-y-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Experience {index + 1}</h3>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Company *</label>
              <input
                {...register(`experiences.${index}.company`)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Google"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Position *</label>
              <input
                {...register(`experiences.${index}.position`)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                {...register(`experiences.${index}.location`)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="San Francisco, CA"
              />
            </div>

            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <input
                  {...register(`experiences.${index}.startDate`)}
                  type="month"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  {...register(`experiences.${index}.endDate`)}
                  type="month"
                  disabled={watch(`experiences.${index}.current`)}
                  className="w-full px-4 py-2 border rounded-lg disabled:bg-gray-200"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  {...register(`experiences.${index}.current`)}
                  type="checkbox"
                  className="w-4 h-4"
                />
                <span className="text-sm">Currently working here</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Responsibilities & Achievements</label>
            <BulletPointsInput
              experienceIndex={index}
              register={register}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({
          id: crypto.randomUUID(),
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          bullets: ['']
        })}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <Plus size={20} />
        Add Another Experience
      </button>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Next: Education
        </button>
      </div>
    </form>
  );
}

function BulletPointsInput({ experienceIndex, register }: any) {
  const [bullets, setBullets] = useState(['', '', '']);

  return (
    <div className="space-y-2">
      {bullets.map((_, bulletIndex) => (
        <textarea
          key={bulletIndex}
          {...register(`experiences.${experienceIndex}.bullets.${bulletIndex}`)}
          className="w-full px-4 py-2 border rounded-lg"
          rows={2}
          placeholder={`• Achievement or responsibility ${bulletIndex + 1}`}
        />
      ))}
      <button
        type="button"
        onClick={() => setBullets([...bullets, ''])}
        className="text-sm text-blue-600 hover:text-blue-800"
      >
        + Add bullet point
      </button>
    </div>
  );
}
```

### Step 3.4: Create Multi-Step Form Container

**`frontend/src/components/form/ResumeFormWizard.tsx`:**
```typescript
"use client";

import { useState } from 'react';
import { ResumeData } from '@/types/resume';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import SummaryForm from './SummaryForm';

const STEPS = [
  'Personal Info',
  'Experience',
  'Education',
  'Skills',
  'Summary'
];

export default function ResumeFormWizard({ onComplete }: { onComplete: (data: ResumeData) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<Partial<ResumeData>>({});

  const updateData = (key: string, value: any) => {
    setResumeData(prev => ({ ...prev, [key]: value }));
  };

  const handleComplete = () => {
    onComplete(resumeData as ResumeData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {STEPS.map((step, index) => (
            <div
              key={step}
              className={`flex-1 text-center ${
                index <= currentStep ? 'text-blue-600 font-semibold' : 'text-gray-400'
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Steps */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {currentStep === 0 && (
          <PersonalInfoForm
            initialData={resumeData.personalInfo}
            onSubmit={(data) => updateData('personalInfo', data)}
            onNext={() => setCurrentStep(1)}
          />
        )}
        {currentStep === 1 && (
          <ExperienceForm
            initialData={resumeData.experience}
            onSubmit={(data) => updateData('experience', data)}
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        )}
        {/* Add remaining steps: Education, Skills, Summary */}
      </div>
    </div>
  );
}
```

---

## Phase 4: Backend - API & LLM Integration

### Timeline: Day 6-8

### Step 4.1: Server Setup

**`backend/src/server.ts`:**
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
import resumeRoutes from './routes/resume';
import llmRoutes from './routes/llm';
import pdfRoutes from './routes/pdf';

app.use('/api/resume', resumeRoutes);
app.use('/api/llm', llmRoutes);
app.use('/api/pdf', pdfRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Step 4.2: Firebase Admin Setup

**`backend/src/config/firebase.ts`:**
```typescript
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Option 1: Using service account file
// const serviceAccount = require('./serviceAccountKey.json');

// Option 2: Using environment variables (better for production)
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();

export default admin;
```

### Step 4.3: LLM Service (OpenAI)

**`backend/src/services/llmService.ts`:**
```typescript
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class LLMService {
  /**
   * Enhance a single bullet point
   */
  static async enhanceBulletPoint(
    bulletPoint: string,
    context: { position: string; company: string; keywords?: string[] }
  ): Promise<string> {
    const prompt = `
You are a professional resume writer specializing in ATS optimization.

Enhance this resume bullet point for maximum ATS score:
"${bulletPoint}"

Context:
- Position: ${context.position}
- Company: ${context.company}
${context.keywords ? `- Keywords to include: ${context.keywords.join(', ')}` : ''}

Requirements:
1. Start with a strong action verb
2. Add quantifiable metrics/impact where possible
3. Include relevant keywords naturally
4. Keep it concise (1-2 lines, max 150 characters)
5. Use professional language
6. Make it ATS-friendly (no special characters)

Return ONLY the enhanced bullet point, no quotes or explanations.
    `.trim();

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 200,
    });

    return response.choices[0].message.content?.trim() || bulletPoint;
  }

  /**
   * Generate professional summary
   */
  static async generateSummary(userInfo: {
    position: string;
    yearsOfExperience: number;
    skills: string[];
    achievements: string[];
  }): Promise<string> {
    const prompt = `
Create a professional resume summary (2-3 sentences) for:

Position: ${userInfo.position}
Experience: ${userInfo.yearsOfExperience} years
Top Skills: ${userInfo.skills.slice(0, 5).join(', ')}
Key Achievements: ${userInfo.achievements.join('; ')}

Requirements:
- Concise and impactful
- ATS-optimized with relevant keywords
- Professional tone
- Highlight value proposition
- 50-80 words

Return only the summary, no quotes or title.
    `.trim();

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 250,
    });

    return response.choices[0].message.content?.trim() || '';
  }

  /**
   * Improve any section with custom prompt
   */
  static async improveSection(
    content: string,
    sectionType: string,
    userRequest: string
  ): Promise<string> {
    const prompt = `
You are editing the ${sectionType} section of a resume.

Current content:
${content}

User request: ${userRequest}

Improve the content based on the user's request while maintaining ATS optimization.
Keep it professional and concise.

Return only the improved content, no explanations.
    `.trim();

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content?.trim() || content;
  }

  /**
   * Suggest skills based on job position
   */
  static async suggestSkills(
    position: string,
    currentSkills: string[]
  ): Promise<string[]> {
    const prompt = `
Suggest 10 relevant technical skills for a ${position} that are commonly found in job descriptions.

Current skills: ${currentSkills.join(', ')}

Return only the skill names as a comma-separated list, no explanations.
Focus on high-demand, ATS-friendly keywords.
    `.trim();

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
      max_tokens: 200,
    });

    const skills = response.choices[0].message.content
      ?.split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0) || [];

    return skills;
  }

  /**
   * Analyze job description and extract keywords
   */
  static async analyzeJobDescription(jobDescription: string): Promise<{
    keywords: string[];
    requiredSkills: string[];
    preferredSkills: string[];
  }> {
    const prompt = `
Analyze this job description and extract:
1. Key technical keywords
2. Required skills
3. Preferred/nice-to-have skills

Job Description:
${jobDescription}

Return as JSON:
{
  "keywords": ["keyword1", "keyword2", ...],
  "requiredSkills": ["skill1", "skill2", ...],
  "preferredSkills": ["skill1", "skill2", ...]
}
    `.trim();

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 500,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result;
  }
}
```

### Step 4.4: LLM Routes

**`backend/src/routes/llm.ts`:**
```typescript
import express from 'express';
import { LLMService } from '../services/llmService';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Enhance bullet point
router.post('/enhance-bullet',
  body('bulletPoint').isString().notEmpty(),
  body('context').isObject(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { bulletPoint, context } = req.body;
      const enhanced = await LLMService.enhanceBulletPoint(bulletPoint, context);
      res.json({ enhanced });
    } catch (error) {
      console.error('Error enhancing bullet:', error);
      res.status(500).json({ error: 'Failed to enhance bullet point' });
    }
  }
);

// Generate summary
router.post('/generate-summary',
  body('userInfo').isObject(),
  async (req, res) => {
    try {
      const { userInfo } = req.body;
      const summary = await LLMService.generateSummary(userInfo);
      res.json({ summary });
    } catch (error) {
      console.error('Error generating summary:', error);
      res.status(500).json({ error: 'Failed to generate summary' });
    }
  }
);

// Improve section
router.post('/improve-section',
  body('content').isString().notEmpty(),
  body('sectionType').isString(),
  body('userRequest').isString(),
  async (req, res) => {
    try {
      const { content, sectionType, userRequest } = req.body;
      const improved = await LLMService.improveSection(content, sectionType, userRequest);
      res.json({ improved });
    } catch (error) {
      console.error('Error improving section:', error);
      res.status(500).json({ error: 'Failed to improve section' });
    }
  }
);

// Suggest skills
router.post('/suggest-skills',
  body('position').isString(),
  body('currentSkills').isArray(),
  async (req, res) => {
    try {
      const { position, currentSkills } = req.body;
      const skills = await LLMService.suggestSkills(position, currentSkills);
      res.json({ skills });
    } catch (error) {
      console.error('Error suggesting skills:', error);
      res.status(500).json({ error: 'Failed to suggest skills' });
    }
  }
);

// Analyze job description
router.post('/analyze-job',
  body('jobDescription').isString().notEmpty(),
  async (req, res) => {
    try {
      const { jobDescription } = req.body;
      const analysis = await LLMService.analyzeJobDescription(jobDescription);
      res.json(analysis);
    } catch (error) {
      console.error('Error analyzing job:', error);
      res.status(500).json({ error: 'Failed to analyze job description' });
    }
  }
);

export default router;
```

---

## Phase 5: Resume Template & Preview

### Timeline: Day 9-11

### Step 5.1: Create HTML Resume Template

**`frontend/src/components/resume/ResumeTemplate.tsx`:**
```typescript
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export default function ResumeTemplate({ data }: Props) {
  return (
    <div id="resume-preview" className="resume-template bg-white p-12 shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <header className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-4xl font-bold uppercase mb-2">
          {data.personalInfo.fullName}
        </h1>
        <div className="text-sm text-gray-700 flex flex-wrap gap-x-4">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
          {data.personalInfo.linkedin && (
            <span>{data.personalInfo.linkedin}</span>
          )}
          {data.personalInfo.github && (
            <span>{data.personalInfo.github}</span>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase mb-3 border-b border-gray-400">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase mb-3 border-b border-gray-400">
            Professional Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={exp.id || index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-base">{exp.position}</h3>
                <span className="text-sm text-gray-600">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                {exp.company} | {exp.location}
              </div>
              <ul className="list-disc list-inside text-sm space-y-1">
                {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                  <li key={i} className="leading-relaxed">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase mb-3 border-b border-gray-400">
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={edu.id || index} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-base">{edu.degree} in {edu.field}</h3>
                <span className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <div className="text-sm text-gray-700">
                {edu.school} | {edu.location}
                {edu.gpa && <span> | GPA: {edu.gpa}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase mb-3 border-b border-gray-400">
            Technical Skills
          </h2>
          <div className="text-sm">
            {data.skills.join(' • ')}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase mb-3 border-b border-gray-400">
            Projects
          </h2>
          {data.projects.map((project, index) => (
            <div key={project.id || index} className="mb-3">
              <h3 className="font-bold text-base">{project.title}</h3>
              <p className="text-sm mb-1">{project.description}</p>
              <div className="text-sm text-gray-700">
                Technologies: {project.technologies.join(', ')}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase mb-3 border-b border-gray-400">
            Certifications
          </h2>
          {data.certifications.map((cert, index) => (
            <div key={cert.id || index} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm">{cert.name}</h3>
                <span className="text-sm text-gray-600">{cert.date}</span>
              </div>
              <div className="text-sm text-gray-700">{cert.issuer}</div>
            </div>
          ))}
        </section>
      )}

      <style jsx>{`
        @media print {
          .resume-template {
            padding: 0;
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
}
```

### Step 5.2: Resume CSS Styling

**`frontend/src/styles/resume.css`:**
```css
/* ATS-Friendly Resume Styles */

.resume-template {
  font-family: 'Arial', 'Helvetica', sans-serif;
  font-size: 11pt;
  line-height: 1.4;
  color: #000;
}

.resume-template h1 {
  font-size: 24pt;
  margin-bottom: 8pt;
}

.resume-template h2 {
  font-size: 14pt;
  margin-bottom: 6pt;
  padding-bottom: 2pt;
}

.resume-template h3 {
  font-size: 11pt;
  margin-bottom: 4pt;
}

/* Ensure proper spacing for ATS parsing */
.resume-template section {
  margin-bottom: 12pt;
}

.resume-template ul {
  margin-left: 20pt;
  margin-top: 4pt;
}

.resume-template li {
  margin-bottom: 2pt;
}

/* Print-specific styles */
@media print {
  .resume-template {
    margin: 0;
    padding: 0.5in;
  }
  
  @page {
    margin: 0.5in;
    size: letter;
  }
}

/* No graphics, tables, or columns for ATS compatibility */
.resume-template * {
  background: none !important;
  box-shadow: none !important;
}
```

---

## Phase 6: Manual Editing with AI Prompts

### Timeline: Day 12-14

### Step 6.1: Section Editor Component

**`frontend/src/components/editor/SectionEditor.tsx`:**
```typescript
"use client";

import { useState } from 'react';
import { Wand2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface AIPrompt {
  label: string;
  action: string;
  description: string;
}

const AI_PROMPTS: Record<string, AIPrompt[]> = {
  experience: [
    { label: 'Make More Impactful', action: 'impact', description: 'Add metrics and achievements' },
    { label: 'Add Metrics', action: 'metrics', description: 'Include quantifiable results' },
    { label: 'Improve Clarity', action: 'clarity', description: 'Simplify and clarify language' },
    { label: 'Optimize for ATS', action: 'ats', description: 'Add relevant keywords' },
  ],
  summary: [
    { label: 'Make Concise', action: 'concise', description: 'Reduce to 2-3 sentences' },
    { label: 'Add Impact', action: 'impact', description: 'Highlight achievements' },
    { label: 'Optimize Keywords', action: 'keywords', description: 'Add industry terms' },
  ],
  skills: [
    { label: 'Organize by Category', action: 'organize', description: 'Group related skills' },
    { label: 'Add Missing Keywords', action: 'keywords', description: 'Suggest relevant skills' },
  ],
};

interface Props {
  sectionType: string;
  content: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}

export default function SectionEditor({ sectionType, content, onSave, onCancel }: Props) {
  const [editedContent, setEditedContent] = useState(content);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleAIEnhance = async (action: string) => {
    setIsEnhancing(true);
    const loadingToast = toast.loading('Enhancing with AI...');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/llm/improve-section`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: editedContent,
          sectionType,
          userRequest: action,
        }),
      });

      if (!response.ok) throw new Error('Failed to enhance');

      const { improved } = await response.json();
      setEditedContent(improved);
      toast.success('Content enhanced!', { id: loadingToast });
    } catch (error) {
      console.error('Error enhancing:', error);
      toast.error('Failed to enhance content', { id: loadingToast });
    } finally {
      setIsEnhancing(false);
    }
  };

  const prompts = AI_PROMPTS[sectionType] || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-2xl font-bold capitalize">Edit {sectionType}</h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Editor */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-64 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="Enter content..."
              />
            </div>

            {/* AI Prompts */}
            <div>
              <label className="block text-sm font-medium mb-2">
                <Wand2 className="inline mr-2" size={16} />
                AI Enhancements
              </label>
              <div className="space-y-2">
                {prompts.map((prompt) => (
                  <button
                    key={prompt.action}
                    onClick={() => handleAIEnhance(prompt.action)}
                    disabled={isEnhancing}
                    className="w-full text-left p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="font-semibold text-sm">{prompt.label}</div>
                    <div className="text-xs text-gray-600 mt-1">{prompt.description}</div>
                  </button>
                ))}
              </div>

              {/* Custom Prompt */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Custom Request</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g., Make it more technical"
                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value) {
                        handleAIEnhance(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(editedContent)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Step 6.2: Editable Resume Preview

**`frontend/src/components/resume/EditableResume.tsx`:**
```typescript
"use client";

import { useState } from 'react';
import { ResumeData } from '@/types/resume';
import ResumeTemplate from './ResumeTemplate';
import SectionEditor from '../editor/SectionEditor';
import { Edit2 } from 'lucide-react';

interface Props {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

export default function EditableResume({ data, onUpdate }: Props) {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState(data);

  const handleSectionSave = (sectionType: string, content: string) => {
    const updated = { ...resumeData, [sectionType]: content };
    setResumeData(updated);
    onUpdate(updated);
    setEditingSection(null);
  };

  return (
    <div className="relative">
      {/* Edit Buttons Overlay */}
      <div className="absolute top-0 right-0 p-4 space-y-2">
        <button
          onClick={() => setEditingSection('summary')}
          className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
        >
          <Edit2 size={16} />
          Edit Summary
        </button>
        <button
          onClick={() => setEditingSection('experience')}
          className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
        >
          <Edit2 size={16} />
          Edit Experience
        </button>
        {/* Add more edit buttons for other sections */}
      </div>

      {/* Resume Preview */}
      <ResumeTemplate data={resumeData} />

      {/* Section Editor Modal */}
      {editingSection && (
        <SectionEditor
          sectionType={editingSection}
          content={JSON.stringify(resumeData[editingSection as keyof ResumeData], null, 2)}
          onSave={(content) => handleSectionSave(editingSection, content)}
          onCancel={() => setEditingSection(null)}
        />
      )}
    </div>
  );
}
```

---

## Phase 7: PDF Generation & Export

### Timeline: Day 15-16

### Step 7.1: Backend PDF Service (Puppeteer)

**`backend/src/services/pdfService.ts`:**
```typescript
import puppeteer from 'puppeteer';

export class PDFService {
  /**
   * Generate PDF from HTML content
   */
  static async generatePDF(htmlContent: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();
      
      // Set content
      await page.setContent(htmlContent, {
        waitUntil: 'networkidle0',
      });

      // Generate PDF
      const pdf = await page.pdf({
        format: 'Letter',
        printBackground: true,
        margin: {
          top: '0.5in',
          right: '0.5in',
          bottom: '0.5in',
          left: '0.5in',
        },
      });

      return pdf;
    } finally {
      await browser.close();
    }
  }

  /**
   * Generate PDF with custom styling
   */
  static async generateStyledPDF(
    htmlContent: string,
    cssContent: string
  ): Promise<Buffer> {
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            ${cssContent}
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    return this.generatePDF(fullHtml);
  }
}
```

### Step 7.2: PDF Routes

**`backend/src/routes/pdf.ts`:**
```typescript
import express from 'express';
import { PDFService } from '../services/pdfService';
import { storage } from '../config/firebase';

const router = express.Router();

// Generate and download PDF
router.post('/generate', async (req, res) => {
  try {
    const { htmlContent, cssContent } = req.body;

    if (!htmlContent) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    const pdf = await PDFService.generateStyledPDF(htmlContent, cssContent || '');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.send(pdf);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

// Save PDF to Firebase Storage
router.post('/save', async (req, res) => {
  try {
    const { htmlContent, cssContent, userId, resumeId } = req.body;

    const pdf = await PDFService.generateStyledPDF(htmlContent, cssContent || '');

    // Upload to Firebase Storage
    const fileName = `resumes/${userId}/${resumeId}/resume.pdf`;
    const bucket = storage.bucket();
    const file = bucket.file(fileName);

    await file.save(pdf, {
      metadata: {
        contentType: 'application/pdf',
      },
    });

    // Get download URL
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ url, fileName });
  } catch (error) {
    console.error('Error saving PDF:', error);
    res.status(500).json({ error: 'Failed to save PDF' });
  }
});

export default router;
```

### Step 7.3: Frontend Export Component

**`frontend/src/components/resume/ExportOptions.tsx`:**
```typescript
"use client";

import { useState } from 'react';
import { Download, FileText, Code } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  resumeId: string;
  htmlContent: string;
}

export default function ExportOptions({ resumeId, htmlContent }: Props) {
  const [isExporting, setIsExporting] = useState(false);

  const downloadPDF = async () => {
    setIsExporting(true);
    const loadingToast = toast.loading('Generating PDF...');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pdf/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ htmlContent }),
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-${resumeId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success('PDF downloaded!', { id: loadingToast });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download PDF', { id: loadingToast });
    } finally {
      setIsExporting(false);
    }
  };

  const downloadHTML = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-${resumeId}.html`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('HTML downloaded!');
  };

  const copyHTML = () => {
    navigator.clipboard.writeText(htmlContent);
    toast.success('HTML copied to clipboard!');
  };

  return (
    <div className="flex gap-4 p-6 bg-white rounded-lg shadow">
      <button
        onClick={downloadPDF}
        disabled={isExporting}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        <Download size={20} />
        Download PDF
      </button>

      <button
        onClick={downloadHTML}
        className="flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-50"
      >
        <FileText size={20} />
        Download HTML
      </button>

      <button
        onClick={copyHTML}
        className="flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-50"
      >
        <Code size={20} />
        Copy HTML
      </button>
    </div>
  );
}
```

---

## Phase 8: ATS Scoring System

### Timeline: Day 17-18

### Step 8.1: ATS Scoring Service

**`backend/src/services/atsService.ts`:**
```typescript
export interface ATSScore {
  overallScore: number;
  breakdown: {
    formatting: number;
    keywords: number;
    sections: number;
    readability: number;
    length: number;
  };
  suggestions: string[];
}

export class ATSService {
  /**
   * Calculate ATS score for resume
   */
  static calculateScore(resumeData: any, jobKeywords: string[] = []): ATSScore {
    const breakdown = {
      formatting: this.scoreFormatting(resumeData),
      keywords: this.scoreKeywords(resumeData, jobKeywords),
      sections: this.scoreSections(resumeData),
      readability: this.scoreReadability(resumeData),
      length: this.scoreLength(resumeData),
    };

    const overallScore = Math.round(
      (breakdown.formatting * 0.15 +
       breakdown.keywords * 0.35 +
       breakdown.sections * 0.20 +
       breakdown.readability * 0.20 +
       breakdown.length * 0.10)
    );

    const suggestions = this.generateSuggestions(breakdown, resumeData);

    return { overallScore, breakdown, suggestions };
  }

  /**
   * Score formatting (15%)
   */
  private static scoreFormatting(data: any): number {
    let score = 100;

    // Check for standard font (simulated)
    // Check for consistent spacing
    // Check for no special characters in headers
    // Check for bullet points in experience

    if (!data.experience?.some((exp: any) => exp.bullets?.length > 0)) {
      score -= 20;
    }

    return Math.max(0, score);
  }

  /**
   * Score keywords (35%)
   */
  private static scoreKeywords(data: any, jobKeywords: string[]): number {
    if (jobKeywords.length === 0) return 85; // Default if no job keywords

    const resumeText = JSON.stringify(data).toLowerCase();
    const matchedKeywords = jobKeywords.filter(keyword =>
      resumeText.includes(keyword.toLowerCase())
    );

    const matchRate = matchedKeywords.length / jobKeywords.length;
    return Math.round(matchRate * 100);
  }

  /**
   * Score sections (20%)
   */
  private static scoreSections(data: any): number {
    const requiredSections = ['personalInfo', 'experience', 'education', 'skills'];
    const optionalSections = ['summary', 'projects', 'certifications'];

    let score = 0;

    // Required sections (70 points)
    requiredSections.forEach(section => {
      if (data[section] && this.hasContent(data[section])) {
        score += 17.5;
      }
    });

    // Optional sections (30 points)
    optionalSections.forEach(section => {
      if (data[section] && this.hasContent(data[section])) {
        score += 10;
      }
    });

    return Math.min(100, Math.round(score));
  }

  /**
   * Score readability (20%)
   */
  private static scoreReadability(data: any): number {
    let score = 100;

    // Check summary length (50-100 words ideal)
    if (data.summary) {
      const wordCount = data.summary.split(/\s+/).length;
      if (wordCount < 30 || wordCount > 120) score -= 20;
    }

    // Check bullet point length (not too long)
    data.experience?.forEach((exp: any) => {
      exp.bullets?.forEach((bullet: string) => {
        if (bullet.length > 200) score -= 5;
      });
    });

    return Math.max(0, score);
  }

  /**
   * Score length (10%)
   */
  private static scoreLength(data: any): number {
    const experienceCount = data.experience?.length || 0;
    const totalBullets = data.experience?.reduce(
      (sum: number, exp: any) => sum + (exp.bullets?.length || 0),
      0
    ) || 0;

    // Ideal: 2-4 jobs, 3-5 bullets each
    let score = 100;

    if (experienceCount < 2) score -= 20;
    if (experienceCount > 5) score -= 10;
    if (totalBullets < 6) score -= 20;
    if (totalBullets > 20) score -= 10;

    return Math.max(0, score);
  }

  /**
   * Check if section has content
   */
  private static hasContent(section: any): boolean {
    if (typeof section === 'string') return section.trim().length > 0;
    if (Array.isArray(section)) return section.length > 0;
    if (typeof section === 'object') return Object.keys(section).length > 0;
    return false;
  }

  /**
   * Generate improvement suggestions
   */
  private static generateSuggestions(breakdown: any, data: any): string[] {
    const suggestions: string[] = [];

    if (breakdown.formatting < 90) {
      suggestions.push('Use bullet points for all experience items');
      suggestions.push('Ensure consistent formatting throughout');
    }

    if (breakdown.keywords < 70) {
      suggestions.push('Add more relevant keywords from the job description');
      suggestions.push('Include industry-standard technical terms');
    }

    if (breakdown.sections < 80) {
      if (!data.summary) suggestions.push('Add a professional summary');
      if (!data.projects || data.projects.length === 0) {
        suggestions.push('Add relevant projects to showcase skills');
      }
    }

    if (breakdown.readability < 85) {
      suggestions.push('Keep bullet points concise (under 150 characters)');
      suggestions.push('Use action verbs at the start of each bullet');
    }

    if (breakdown.length < 80) {
      suggestions.push('Add 3-5 bullet points per job position');
      suggestions.push('Include at least 2-3 relevant work experiences');
    }

    return suggestions;
  }
}
```

### Step 8.2: ATS Score Display Component

**`frontend/src/components/resume/ATSScoreCard.tsx`:**
```typescript
"use client";

import { ATSScore } from '@/types/resume';

interface Props {
  score: ATSScore;
}

export default function ATSScoreCard({ score }: Props) {
  const getScoreColor = (value: number) => {
    if (value >= 90) return 'text-green-600';
    if (value >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (value: number) => {
    if (value >= 90) return 'Excellent';
    if (value >= 80) return 'Very Good';
    if (value >= 70) return 'Good';
    if (value >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">ATS Score</h3>

      {/* Overall Score */}
      <div className="text-center mb-6">
        <div className={`text-6xl font-bold ${getScoreColor(score.overallScore)}`}>
          {score.overallScore}
        </div>
        <div className="text-gray-600 text-lg mt-2">
          {getScoreLabel(score.overallScore)}
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        <h4 className="font-semibold mb-2">Score Breakdown</h4>
        {Object.entries(score.breakdown).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1">
              <span className="capitalize">{key}</span>
              <span className={getScoreColor(value)}>{value}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  value >= 90 ? 'bg-green-600' :
                  value >= 70 ? 'bg-yellow-600' :
                  'bg-red-600'
                }`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      {score.suggestions.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Suggestions</h4>
          <ul className="space-y-2">
            {score.suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="mr-2">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

---

## Phase 9: Testing & Quality Assurance

### Timeline: Day 19-21

### Step 9.1: Unit Tests (Backend)

```bash
cd backend
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

**`backend/jest.config.js`:**
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
};
```

**Example test: `backend/src/services/__tests__/llmService.test.ts`:**
```typescript
import { LLMService } from '../llmService';

describe('LLMService', () => {
  it('should enhance bullet point', async () => {
    const bullet = 'Managed team';
    const context = { position: 'Manager', company: 'ABC Corp' };
    
    const enhanced = await LLMService.enhanceBulletPoint(bullet, context);
    
    expect(enhanced).toBeTruthy();
    expect(enhanced.length).toBeGreaterThan(bullet.length);
  });
});
```

### Step 9.2: Integration Tests

Test critical flows:
- [ ] User registration and login
- [ ] Form submission and data storage
- [ ] LLM enhancement calls
- [ ] PDF generation
- [ ] ATS scoring

### Step 9.3: Manual Testing Checklist

- [ ] Form validation works correctly
- [ ] All AI prompts enhance content appropriately
- [ ] PDF exports match preview
- [ ] ATS score calculates accurately
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari)
- [ ] Error handling (network failures, API errors)
- [ ] Loading states display correctly
- [ ] Data persists in Firebase

---

## Phase 10: Deployment to Production

### Timeline: Day 22-25

### Step 10.1: Frontend Deployment (Vercel)

```bash
cd frontend

# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Set environment variables in Vercel:**
1. Go to Vercel Dashboard
2. Select project → Settings → Environment Variables
3. Add all `.env.local` variables

### Step 10.2: Backend Deployment (Railway)

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your backend repository
4. Configure:
   - Root Directory: `backend`
   - Build Command: `npm run build`
   - Start Command: `npm start`

**Set environment variables:**
- Add all `.env` variables in Railway dashboard

**Alternative: Render**
1. Go to https://render.com
2. New Web Service → Connect repository
3. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

### Step 10.3: Firebase Production Setup

**Security Rules (Production):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /resumes/{resumeId} {
        allow read: if request.auth != null && request.auth.uid == userId;
        allow write: if request.auth != null && 
                        request.auth.uid == userId &&
                        request.resource.data.keys().hasAll(['personalInfo', 'experience']);
      }
    }
  }
}
```

### Step 10.4: Domain Setup

**Frontend:**
1. Purchase domain (Namecheap, GoDaddy, etc.)
2. In Vercel: Settings → Domains → Add domain
3. Update DNS records

**Backend:**
1. Use Railway/Render provided domain
2. Or configure custom domain in platform

### Step 10.5: SSL & Security

- [x] Vercel auto-provisions SSL
- [x] Railway/Render auto-provisions SSL
- [ ] Configure CORS for production domain
- [ ] Set up rate limiting
- [ ] Enable Firebase App Check

### Step 10.6: Monitoring & Analytics

**Backend Monitoring:**
```bash
npm install @sentry/node
```

**Frontend Analytics:**
```bash
npm install @vercel/analytics
```

**Add to `frontend/src/app/layout.tsx`:**
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Phase 11: Post-Launch & Optimization

### Timeline: Ongoing

### Step 11.1: Performance Optimization

**Frontend:**
- [ ] Enable Next.js image optimization
- [ ] Implement lazy loading for heavy components
- [ ] Code splitting for large dependencies
- [ ] Optimize bundle size (analyze with `next build --analyze`)

**Backend:**
- [ ] Implement caching for LLM responses
- [ ] Optimize database queries
- [ ] Set up CDN for static assets

### Step 11.2: SEO & Marketing

```typescript
// frontend/src/app/page.tsx
export const metadata = {
  title: 'AI Resume Builder - Create ATS-Optimized Resumes',
  description: 'Build professional resumes with AI assistance. Get 90+ ATS scores.',
  keywords: 'resume builder, ATS optimization, AI resume, job application',
};
```

### Step 11.3: User Feedback & Iteration

- [ ] Add feedback form
- [ ] Monitor user behavior (Hotjar, Google Analytics)
- [ ] A/B test key features
- [ ] Collect resume quality metrics

### Step 11.4: Advanced Features (Future)

- [ ] Multiple resume templates
- [ ] Cover letter generator
- [ ] LinkedIn profile optimizer
- [ ] Job description matcher
- [ ] Interview question generator
- [ ] Resume tailoring for specific jobs
- [ ] Team/recruiter dashboard
- [ ] API for integrations

---

## Maintenance Checklist

### Daily
- [ ] Monitor error logs (Sentry)
- [ ] Check API usage limits
- [ ] Review user feedback

### Weekly
- [ ] Database backup verification
- [ ] Performance metrics review
- [ ] Security updates

### Monthly
- [ ] Dependency updates
- [ ] Cost analysis (Firebase, OpenAI API)
- [ ] Feature usage analytics
- [ ] User growth metrics

---

## Cost Estimates (Monthly)

| Service | Tier | Cost |
|---------|------|------|
| Vercel | Hobby | Free (or $20 for Pro) |
| Railway/Render | Starter | $5-20 |
| Firebase | Spark/Blaze | $0-50 (based on usage) |
| OpenAI API | Usage-based | $20-200 (varies) |
| Domain | Annual | ~$12/year |
| **Total** | | **~$50-300/month** |

---

## Resources & Documentation

### Official Docs
- Next.js: https://nextjs.org/docs
- Firebase: https://firebase.google.com/docs
- OpenAI: https://platform.openai.com/docs
- Puppeteer: https://pptr.dev/

### Learning Resources
- React Hook Form: https://react-hook-form.com/
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

---

## Troubleshooting Common Issues

### Issue: PDF generation fails
**Solution:** Check Puppeteer installation, ensure correct Chrome/Chromium path

### Issue: LLM responses too slow
**Solution:** Implement caching, use streaming responses, optimize prompts

### Issue: Firebase quota exceeded
**Solution:** Upgrade plan, implement rate limiting, optimize queries

### Issue: Build fails on deployment
**Solution:** Check Node version, verify environment variables, review build logs

---

## Support & Community

- GitHub Issues: (your-repo-url)
- Discord: (optional community server)
- Email: support@yourapp.com

---

**Congratulations! You now have a complete roadmap to build and deploy your AI-powered resume builder from scratch to production.**

Good luck with your project! 🚀
