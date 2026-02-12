import { NextRequest, NextResponse } from 'next/server';
import { LLMService } from '@/lib/api/services/llmService';

// POST /api/llm/enhance-bullet
export async function POST(request: NextRequest) {
    try {
        const { bulletPoint, context } = await request.json();

        if (!bulletPoint || !context) {
            return NextResponse.json(
                { error: 'bulletPoint and context are required' },
                { status: 400 }
            );
        }

        const enhanced = await LLMService.enhanceBulletPoint(bulletPoint, context);
        return NextResponse.json({ enhanced });
    } catch (error) {
        console.error('Error enhancing bullet:', error);
        return NextResponse.json({ error: 'Failed to enhance bullet point' }, { status: 500 });
    }
}
