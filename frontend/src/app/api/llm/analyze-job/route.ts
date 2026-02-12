import { NextRequest, NextResponse } from 'next/server';
import { LLMService } from '@/lib/api/services/llmService';

// POST /api/llm/analyze-job
export async function POST(request: NextRequest) {
    try {
        const { jobDescription } = await request.json();

        if (!jobDescription) {
            return NextResponse.json(
                { error: 'jobDescription is required' },
                { status: 400 }
            );
        }

        const analysis = await LLMService.analyzeJobDescription(jobDescription);
        return NextResponse.json(analysis);
    } catch (error) {
        console.error('Error analyzing job:', error);
        return NextResponse.json({ error: 'Failed to analyze job description' }, { status: 500 });
    }
}
