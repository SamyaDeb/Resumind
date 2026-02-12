import { NextRequest } from 'next/server';
import { getAuth } from './firebase-admin';

export async function verifyAuthToken(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split('Bearer ')[1];

    if (!token) {
        return null;
    }

    try {
        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        console.error('Auth verification failed:', error);
        return null;
    }
}
