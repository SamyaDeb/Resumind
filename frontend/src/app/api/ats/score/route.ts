import { NextRequest, NextResponse } from 'next/server';
import { ATSService } from '@/lib/api/services/atsService';

// POST /api/ats/score - Calculate ATS score
export async function POST(request: NextRequest) {
    try {
        const { resumeData, jobDescription } = await request.json();

        if (!resumeData) {
            return NextResponse.json({ error: 'Resume data is required' }, { status: 400 });
        }

        const result = ATSService.calculateScore(resumeData, jobDescription);
        return NextResponse.json(result);
    } catch (error) {
        console.error('ATS Scoring failed:', error);
        return NextResponse.json({ error: 'Failed to calculate ATS score' }, { status: 500 });
    }
}
