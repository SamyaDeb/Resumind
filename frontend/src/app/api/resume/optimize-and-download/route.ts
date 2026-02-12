import { NextRequest, NextResponse } from 'next/server';
import { LatexService } from '@/lib/api/services/latexService';
import { LLMService } from '@/lib/api/services/llmService';
import { PdfService } from '@/lib/api/services/pdfService';

// POST /api/resume/optimize-and-download - AI optimize then generate PDF
export async function POST(request: NextRequest) {
    try {
        const { templateId, data } = await request.json();

        if (!templateId || !data) {
            return NextResponse.json({ error: 'Missing templateId or data' }, { status: 400 });
        }

        // 1. Optimize Data with AI
        console.log('Optimizing resume data...');
        const optimizedData = await LLMService.optimizeResume(data);

        // 2. Generate LaTeX
        const latexCode = LatexService.generateLatex(templateId, optimizedData);

        // 3. Compile PDF
        const pdfBuffer = await PdfService.compileLatex(latexCode, optimizedData);

        // 4. Return PDF with optimized data in header
        return new NextResponse(new Uint8Array(pdfBuffer), {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="optimized_resume.pdf"',
                'X-Optimized-Data': JSON.stringify(optimizedData),
            },
        });
    } catch (error: any) {
        console.error('Optimization/Download failed:', error);
        return NextResponse.json(
            { error: 'Failed to optimize and download resume' },
            { status: 500 }
        );
    }
}
