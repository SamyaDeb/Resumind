import admin from 'firebase-admin';

let app: admin.app.App | undefined;

function getFirebaseAdmin() {
    if (app) return app;

    const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    let credential: admin.credential.Credential;

    if (serviceAccountStr) {
        try {
            const serviceAccount = JSON.parse(serviceAccountStr);
            credential = admin.credential.cert(serviceAccount);
            console.log('✅ Loaded Firebase credentials from FIREBASE_SERVICE_ACCOUNT_KEY');
        } catch (e) {
            console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY, falling back to env vars');
            credential = admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            } as admin.ServiceAccount);
        }
    } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
        credential = admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        } as admin.ServiceAccount);
        console.log('✅ Loaded Firebase credentials from environment variables');
    } else {
        console.warn('⚠️ No Firebase credentials found. Running in mock mode.');
        return undefined;
    }

    try {
        app = admin.initializeApp({ credential });
    } catch (error: any) {
        // App already initialized
        if (error.code === 'app/duplicate-app') {
            app = admin.app();
        } else {
            throw error;
        }
    }

    return app;
}

export function getFirestore() {
    const app = getFirebaseAdmin();
    if (!app) {
        // Return mock firestore for development
        return {
            collection: () => ({
                doc: () => ({
                    set: async () => { },
                    get: async () => ({ exists: false, data: () => ({}) }),
                    collection: () => ({
                        doc: () => ({
                            set: async () => { },
                            get: async () => ({ exists: false, data: () => ({}) }),
                        }),
                    }),
                }),
            }),
        } as any;
    }
    return admin.firestore();
}

export function getAuth() {
    const app = getFirebaseAdmin();
    if (!app) {
        return {
            verifyIdToken: async (token: string) => ({
                uid: 'mock-user-id',
                email: 'mock@example.com',
            }),
        } as any;
    }
    return admin.auth();
}

export default getFirebaseAdmin;
