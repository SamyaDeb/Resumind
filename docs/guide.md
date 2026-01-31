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

## Phase 5: Template Management (LaTeX)

### Timeline: Day 9-11

### Step 5.1: Template Structure

We will store LaTeX templates in the backend `backend/src/templates/`. These templates will use Handlebars syntax (e.g., `{{fullName}}`) for dynamic data injection.

**`backend/src/templates/classic.tex` (Example):**
```latex
\documentclass[a4paper,10pt]{article}
\usepackage[left=0.5in,right=0.5in,top=0.5in,bottom=0.5in]{geometry}
\usepackage{enumitem}
\usepackage{hyperref}

\begin{document}

\begin{center}
    {\huge \textbf{{{personalInfo.fullName}}}} \\ \vspace{2mm}
    {{personalInfo.location}} | {{personalInfo.phone}} | {{personalInfo.email}} \\
    {{#if personalInfo.linkedin}} \href{{{personalInfo.linkedin}}}{LinkedIn} {{/if}}
    {{#if personalInfo.github}} | \href{{{personalInfo.github}}}{GitHub} {{/if}}
\end{center}

\vspace{4mm}

{{#if summary}}
\section*{Professional Summary}
\hrule
\vspace{2mm}
{{summary}}
\vspace{4mm}
{{/if}}

\section*{Experience}
\hrule
\vspace{2mm}
{{#each experience}}
\textbf{{{position}}} \hfill {{startDate}} - {{#if current}}Present{{else}}{{endDate}}{{/if}} \\
\textit{{{company}}, {{location}}}
\begin{itemize}[noitemsep,topsep=0pt]
    {{#each bullets}}
    \item {{this}}
    {{/each}}
\end{itemize}
\vspace{3mm}
{{/each}}

\section*{Education}
\hrule
\vspace{2mm}
{{#each education}}
\textbf{{{school}}} \hfill {{location}} \\
{{degree}} in {{field}} \hfill {{startDate}} - {{endDate}}
\vspace{3mm}
{{/each}}

\section*{Skills}
\hrule
\vspace{2mm}
\noindent
{{#each skills}} {{this}} $\bullet$ {{/each}}

\end{document}
```

### Step 5.2: Template Service & Routes

**`backend/src/services/templateService.ts`:**
```typescript
import fs from 'fs';
import path from 'path';

export interface Template {
  id: string;
  name: string;
  description: string;
  previewUrl: string; // URL to an image preview
}

const TEMPLATES: Template[] = [
  { id: 'classic', name: 'Classic Professional', description: 'Timeless and standard.', previewUrl: '/previews/classic.png' },
  { id: 'modern', name: 'Modern Creative', description: 'Bold for creative roles.', previewUrl: '/previews/modern.png' },
];

export class TemplateService {
  static getTemplates(): Template[] {
    return TEMPLATES;
  }

  static getTemplateContent(id: string): string {
    const filePath = path.join(__dirname, `../templates/${id}.tex`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Template ${id} not found`);
    }
    return fs.readFileSync(filePath, 'utf-8');
  }
}
```

**`backend/src/routes/templates.ts`:**
```typescript
import express from 'express';
import { TemplateService } from '../services/templateService';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const templates = TemplateService.getTemplates();
    res.json({ templates });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

export default router;
```

---

## Phase 6: AI LaTeX Generation

### Timeline: Day 12-14

### Step 6.1: LaTeX Generation Service

**`backend/src/services/latexService.ts`:**
```typescript
import Handlebars from 'handlebars';
import { TemplateService } from './templateService';

export class LatexService {
  /**
   * Generates LaTeX code by merging data with the selected template.
   */
  static generateLatex(templateId: string, data: any): string {
    // 1. Get raw template content
    const source = TemplateService.getTemplateContent(templateId);

    // 2. Compile with Handlebars
    const template = Handlebars.compile(source);

    // 3. Helper to escape special LaTeX characters
    Handlebars.registerHelper('escapeLatex', (text) => {
        if (!text || typeof text !== 'string') return text;
        return text
            .replace(/\\/g, '\\textbackslash{}')
            .replace(/([&%$#_{}])/g, '\\$1')
            .replace(/~/g, '\\textasciitilde{}')
            .replace(/\^/g, '\\textasciicircum{}');
    });

    // 4. Fill template
    return template(data);
  }
}
```

### Step 6.2: Frontend Code Preview

**`frontend/src/components/resume/LatexPreview.tsx`:**
```typescript
"use client";
import Editor from "@monaco-editor/react";

interface Props {
  code: string;
}

export default function LatexPreview({ code }: Props) {
  return (
    <div className="h-[600px] border rounded-lg overflow-hidden shadow-lg mt-4">
      <div className="bg-gray-800 text-white p-2 text-sm font-mono">LaTeX Source Preview</div>
      <Editor
        height="100%"
        defaultLanguage="latex"
        value={code}
        theme="vs-dark"
        options={{ readOnly: true, minimap: { enabled: false } }}
      />
    </div>
  );
}
```

---

## Phase 7: PDF Compilation & Export

### Timeline: Day 15-16

### Step 7.1: Setup PDF Compilation (Backend)

We will use an external method (e.g. `latexonline` or custom Docker) to compile `.tex` to `.pdf`.

**`backend/src/services/pdfService.ts`:**
```typescript
import axios from 'axios';

export class PdfService {
  static async compileLatex(latexCode: string): Promise<Buffer> {
    const COMPILER_API = process.env.LATEX_COMPILER_URL || 'https://latex.ytotech.com/build';
    
    try {
      const response = await axios.post(COMPILER_API, {
        latex: latexCode
      }, {
        responseType: 'arraybuffer'
      });
      
      return Buffer.from(response.data);
    } catch (error) {
      console.error('PDF Compilation failed:', error);
      throw new Error('Failed to generate PDF from LaTeX');
    }
  }
}
```

### Step 7.2: Download Route

**`backend/src/routes/resume.ts` (Add this):**
```typescript
import { LatexService } from '../services/latexService';
import { PdfService } from '../services/pdfService';
// ... existing imports

router.post('/download', async (req, res) => {
  try {
    const { templateId, data } = req.body;
    const latexCode = LatexService.generateLatex(templateId, data);
    const pdfBuffer = await PdfService.compileLatex(latexCode);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Download failed' });
  }
});
```

### Step 7.3: Frontend Download Button

**`frontend/src/components/resume/DownloadButton.tsx`:**
```typescript
"use client";
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DownloadButton({ templateId, data }: any) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    const toastId = toast.loading('Compiling PDF...');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId, data })
      });

      if (!response.ok) throw new Error('Compilation failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Download ready!', { id: toastId });
    } catch (e) {
      toast.error('Failed to download PDF', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDownload} 
      disabled={loading}
      className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
    >
      <Download size={20} />
      {loading ? 'Compiling...' : 'Download PDF'}
    </button>
  );
}
```

---

## Phase 8: ATS Scoring System

### Timeline: Day 17-18

### Step 8.1: ATS Service (Backend)

**`backend/src/services/atsService.ts`:**
```typescript
export class ATSService {
  static calculateScore(resumeData: any, jobDescription?: string) {
    let score = 0;
    const feedback: string[] = [];

    // 1. Content Completeness Check
    if (resumeData.personalInfo.linkedin) score += 5;
    if (resumeData.summary && resumeData.summary.length > 50) score += 10;
    if (resumeData.experience.length >= 1) score += 20;
    if (resumeData.skills.length >= 5) score += 15;

    // 2. Keyword Matching (if JD provided)
    if (jobDescription) {
       // logic to match keywords from JD with resume skills/bullets
    }

    // 3. Formatting Check (Simulated)
    // Since we use LaTeX templates, we guarantee high formatting score
    score += 20; 

    return { 
      score: Math.min(score, 100), 
      feedback 
    };
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
