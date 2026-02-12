import { NextRequest, NextResponse } from 'next/server';
import { LatexService } from '@/lib/api/services/latexService';
import { PdfService } from '@/lib/api/services/pdfService';

// POST /api/resume/download - Generate and download PDF
export async function POST(request: NextRequest) {
    try {
        const { templateId, data } = await request.json();
        console.log('Download request received:', JSON.stringify({ templateId, dataKeys: Object.keys(data || {}) }));

        if (!templateId || !data) {
            return NextResponse.json({ error: 'Missing templateId or data' }, { status: 400 });
        }

        const latexCode = LatexService.generateLatex(templateId, data);
        const pdfBuffer = await PdfService.compileLatex(latexCode, data);

        return new NextResponse(new Uint8Array(pdfBuffer), {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="resume.pdf"',
            },
        });
    } catch (error: any) {
        console.error('Download error:', error.message);
        return NextResponse.json(
            { error: 'Download failed', details: error.message },
            { status: 500 }
        );
    }
}
