import { NextRequest, NextResponse } from 'next/server';
import { LLMService } from '@/lib/api/services/llmService';

// POST /api/llm/suggest-skills
export async function POST(request: NextRequest) {
    try {
        const { position, currentSkills } = await request.json();

        if (!position || !currentSkills) {
            return NextResponse.json(
                { error: 'position and currentSkills are required' },
                { status: 400 }
            );
        }

        const skills = await LLMService.suggestSkills(position, currentSkills);
        return NextResponse.json({ skills });
    } catch (error) {
        console.error('Error suggesting skills:', error);
        return NextResponse.json({ error: 'Failed to suggest skills' }, { status: 500 });
    }
}
