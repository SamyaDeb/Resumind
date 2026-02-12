import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/api/auth';
import { getFirestore } from '@/lib/api/firebase-admin';

// POST /api/resume/save - Save resume
export async function POST(request: NextRequest) {
    try {
        const user = await verifyAuthToken(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data } = await request.json();
        const db = getFirestore();

        await db.collection('users').doc(user.uid).collection('resumes').doc('current').set({
            ...data,
            updatedAt: new Date().toISOString()
        });

        return NextResponse.json({ success: true, message: 'Resume saved successfully' });
    } catch (error) {
        console.error('Save Error:', error);
        return NextResponse.json({ error: 'Failed to save resume' }, { status: 500 });
    }
}
