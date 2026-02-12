import { NextResponse } from 'next/server';
import { TemplateService } from '@/lib/api/services/templateService';

// GET /api/templates - Get all templates
export async function GET() {
    try {
        const templates = TemplateService.getTemplates();
        return NextResponse.json({ templates });
    } catch (error) {
        console.error('Error fetching templates:', error);
        return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
    }
}
