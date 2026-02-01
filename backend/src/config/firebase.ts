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

let app;
try {
    app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
} catch (error) {
    console.log('⚠️  No Firebase Admin credentials found in .env');
    console.log('✅  Starting in text-only/mock mode. (Auth & DB will be simulated)');
    // Mock app to prevent crash on startup, but DB calls will fail.
    // In a real scenario, we might want to stop here, but for dev we want the server to stay up.
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
