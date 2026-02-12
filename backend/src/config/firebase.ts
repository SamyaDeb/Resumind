import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Option 1: Try to load from local file (best for local dev)
import fs from 'fs';
import path from 'path';

let serviceAccount: any;
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

if (fs.existsSync(serviceAccountPath)) {
    try {
        serviceAccount = require(serviceAccountPath);
        console.log('✅ Loaded Firebase credentials from serviceAccountKey.json');
    } catch (e) {
        console.error('Failed to load serviceAccountKey.json', e);
    }
} else {
    // Option 2: Using environment variables
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
        serviceAccount = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        };
        console.log('✅ Loaded Firebase credentials from environment variables');
    }
}

let app;
try {
    if (serviceAccount) {
        app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    } else {
        throw new Error('No credentials found');
    }
} catch (error) {
    console.log('⚠️  No valid Firebase Admin credentials found (File or Env)');
    console.log('✅  Starting in text-only/mock mode. (Auth & DB will be simulated)');
}

export const db = app ? admin.firestore() : {
    collection: () => ({
        doc: () => ({
            set: async () => { },
            get: async () => ({ exists: false, data: () => ({}) }),
            collection: () => ({ doc: () => ({ set: async () => { }, get: async () => ({ exists: false, data: () => ({}) }) }) })
        })
    })
} as any;
export const auth = app ? admin.auth() : { verifyIdToken: async (token: string) => ({ uid: 'test-user-id', email: 'test@example.com' }) } as any;
export const storage = app ? admin.storage() : {} as any;

export default admin;
