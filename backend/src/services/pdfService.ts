import axios from 'axios';
import puppeteer from 'puppeteer';

export class PdfService {
    static async compileLatex(latexCode: string, data?: any): Promise<Buffer> {
        const COMPILER_API = process.env.LATEX_COMPILER_URL || 'https://latex.ytotech.com/build';

        try {
            // Try external service first
            const response = await axios.post(COMPILER_API, {
                latex: latexCode
            }, {
                responseType: 'arraybuffer',
                timeout: 5000 // 5s timeout
            });

            return Buffer.from(response.data);
        } catch (error: any) {
            console.warn('External LaTeX service unavailable, falling back to local HTML-to-PDF generation.');

            if (!data) {
                throw new Error('Cannot fallback to HTML generation: missing resume data.');
            }

            try {
                return await PdfService.generateHtmlPdf(data);
            } catch (fallbackError) {
                console.error('Fallback generation failed:', fallbackError);
                throw new Error('Failed to generate PDF');
            }
        }
    }

    private static async generateHtmlPdf(data: any): Promise<Buffer> {
        console.log('Launching Puppeteer for HTML generation...');
        console.log('Data received:', JSON.stringify(data, null, 2));

        try {
            const browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            const page = await browser.newPage();

            // Safe map helper
            const safeMap = (arr: any, fn: (item: any) => string): string => {
                if (!Array.isArray(arr)) return '';
                try {
                    return arr.map(fn).join('');
                } catch (e) {
                    console.error('Error in safeMap:', e);
                    return '';
                }
            };

            const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: 'Times New Roman', Times, serif;
                        color: #333;
                        font-size: 11pt;
                        line-height: 1.4;
                        padding: 0.5in;
                        max-width: 8.5in;
                        margin: 0 auto;
                    }
                    .header { text-align: center; margin-bottom: 20px; }
                    .header h1 { font-size: 24pt; margin: 0; text-transform: uppercase; }
                    .header .role { font-size: 14pt; font-weight: bold; margin: 5px 0; }
                    .section { margin-bottom: 15px; }
                    .section-title {
                        font-size: 14pt;
                        font-weight: bold;
                        text-transform: uppercase;
                        border-bottom: 1px solid #000;
                        margin-bottom: 10px;
                        padding-bottom: 2px;
                    }
                    .exp-header {
                        display: flex;
                        justify-content: space-between;
                        font-weight: bold;
                        font-size: 11pt;
                    }
                    .exp-sub {
                        display: flex;
                        justify-content: space-between;
                        font-style: italic;
                        font-size: 11pt;
                        margin-bottom: 4px;
                    }
                    ul { margin: 2px 0 10px 20px; padding: 0; }
                    li { margin-bottom: 2px; font-size: 10.5pt; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>${data.personalInfo?.fullName || 'Resume'}</h1>
                    ${data.personalInfo?.title ? `<div class="role">${data.personalInfo.title}</div>` : ''}
                    <div>${data.personalInfo?.email || ''} | ${data.personalInfo?.phone || ''}</div>
                </div>

                ${data.summary ? `<div class="section"><div class="section-title">Summary</div><p>${data.summary}</p></div>` : ''}

                ${Array.isArray(data.skills) && data.skills.length > 0 ? `
                <div class="section">
                    <div class="section-title">Skills</div>
                    ${safeMap(data.skills, (s: any) => `<div><strong>${s.category || ''}:</strong> ${s.skillsList || ''}</div>`)}
                </div>` : ''}

                ${Array.isArray(data.experience) && data.experience.length > 0 ? `
                <div class="section">
                    <div class="section-title">Experience</div>
                    ${safeMap(data.experience, (exp: any) => `
                        <div style="margin-bottom: 12px;">
                            <div class="exp-header"><span>${exp.position || ''}</span><span>${exp.duration || ''}</span></div>
                            <div class="exp-sub"><span>${exp.company || ''}</span><span>${exp.location || ''}</span></div>
                            <ul>${safeMap(exp.responsibilities, (r: string) => `<li>${r}</li>`)}</ul>
                        </div>
                    `)}
                </div>` : ''}

                ${Array.isArray(data.projects) && data.projects.length > 0 ? `
                <div class="section">
                    <div class="section-title">Projects</div>
                    ${safeMap(data.projects, (p: any) => `
                        <div style="margin-bottom: 12px;">
                            <div class="exp-header"><span><strong>${p.name || ''}</strong> | ${p.technologies || ''}</span><span>${p.year || ''}</span></div>
                            <ul>${safeMap(p.description, (d: string) => `<li>${d}</li>`)}</ul>
                        </div>
                    `)}
                </div>` : ''}

                ${Array.isArray(data.education) && data.education.length > 0 ? `
                <div class="section">
                    <div class="section-title">Education</div>
                    ${safeMap(data.education, (edu: any) => `
                        <div class="exp-header"><span>${edu.degree || ''}</span><span>${edu.graduationYear || ''}</span></div>
                        <div class="exp-sub"><span>${edu.institution || ''}</span><span>CGPA: ${edu.gpa || ''}</span></div>
                    `)}
                </div>` : ''}

            </body>
            </html>
            `;

            await page.setContent(html);
            const pdf = await page.pdf({
                format: 'Letter',
                printBackground: true,
                margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' }
            });
            await browser.close();

            return Buffer.from(pdf);

        } catch (error) {
            console.error('Puppeteer generation failed:', error);
            throw error;
        }
    }
}
