import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/api/auth';
import { getFirestore } from '@/lib/api/firebase-admin';

// GET /api/resume - Get saved resume
export async function GET(request: NextRequest) {
    try {
        const user = await verifyAuthToken(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const db = getFirestore();
        const doc = await db.collection('users').doc(user.uid).collection('resumes').doc('current').get();

        if (!doc.exists) {
            return NextResponse.json({ exists: false });
        }

        return NextResponse.json({ exists: true, data: doc.data() });
    } catch (error) {
        console.error('Fetch Error:', error);
        return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 });
    }
}
