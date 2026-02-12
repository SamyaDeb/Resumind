import { NextRequest, NextResponse } from 'next/server';
import { LLMService } from '@/lib/api/services/llmService';

// POST /api/llm/generate-summary
export async function POST(request: NextRequest) {
    try {
        const { userInfo } = await request.json();

        if (!userInfo) {
            return NextResponse.json({ error: 'userInfo is required' }, { status: 400 });
        }

        const summary = await LLMService.generateSummary(userInfo);
        return NextResponse.json({ summary });
    } catch (error) {
        console.error('Error generating summary:', error);
        return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
    }
}
