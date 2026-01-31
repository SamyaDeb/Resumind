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
