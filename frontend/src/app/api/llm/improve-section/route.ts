import { NextRequest, NextResponse } from 'next/server';
import { LLMService } from '@/lib/api/services/llmService';

// POST /api/llm/improve-section
export async function POST(request: NextRequest) {
    try {
        const { content, sectionType, userRequest } = await request.json();

        if (!content || !sectionType || !userRequest) {
            return NextResponse.json(
                { error: 'content, sectionType, and userRequest are required' },
                { status: 400 }
            );
        }

        const improved = await LLMService.improveSection(content, sectionType, userRequest);
        return NextResponse.json({ improved });
    } catch (error) {
        console.error('Error improving section:', error);
        return NextResponse.json({ error: 'Failed to improve section' }, { status: 500 });
    }
}
