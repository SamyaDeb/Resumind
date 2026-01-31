import axios from 'axios';
import puppeteer from 'puppeteer';

export class PdfService {
    static async compileLatex(latexCode: string, data?: any): Promise<Buffer> {
        const COMPILER_API = process.env.LATEX_COMPILER_URL || 'https://latex.ytotech.com/builds/sync';

        try {
            // Try external LaTeX service first with proper API format
            const response = await axios.post(COMPILER_API, {
                compiler: 'pdflatex',
                resources: [
                    {
                        main: true,
                        content: latexCode
                    }
                ]
            }, {
                responseType: 'arraybuffer',
                timeout: 30000, // 30s timeout for LaTeX compilation
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Check if response is a PDF (starts with %PDF)
            const pdfCheck = Buffer.from(response.data).slice(0, 4).toString();
            if (pdfCheck === '%PDF') {
                console.log('LaTeX compilation successful!');
                return Buffer.from(response.data);
            } else {
                // Response might be an error message
                console.warn('LaTeX compilation returned non-PDF response, falling back to HTML.');
                throw new Error('Invalid PDF response');
            }
        } catch (error: any) {
            console.warn('External LaTeX service unavailable or failed:', error.message || error);
            console.warn('Falling back to local HTML-to-PDF generation.');

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

        try {
            const browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            const page = await browser.newPage();

            // Helper to format date range
            const formatDateRange = (start: string, end: string, current?: boolean): string => {
                const formatDate = (dateStr: string): string => {
                    if (!dateStr) return '';
                    if (/^\d{4}$/.test(dateStr.trim())) return dateStr.trim();
                    try {
                        const date = new Date(dateStr);
                        if (isNaN(date.getTime())) return dateStr;
                        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                    } catch { return dateStr; }
                };
                const startFormatted = formatDate(start);
                if (current) return `${startFormatted} – Present`;
                return `${startFormatted} – ${formatDate(end)}`;
            };

            // Format graduation year
            const formatGradYear = (dateStr: string): string => {
                if (!dateStr) return '';
                if (/^\d{4}$/.test(dateStr.trim())) return dateStr.trim();
                try {
                    const date = new Date(dateStr);
                    if (isNaN(date.getTime())) return dateStr;
                    return date.getFullYear().toString();
                } catch { return dateStr; }
            };

            const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    body {
                        font-family: 'EB Garamond', 'Times New Roman', Times, serif;
                        color: #000;
                        font-size: 10.5pt;
                        line-height: 1.3;
                        padding: 0.4in 0.5in;
                    }
                    
                    /* Header Styles */
                    .header {
                        text-align: center;
                        margin-bottom: 8px;
                    }
                    .header .name {
                        font-size: 22pt;
                        font-weight: 400;
                        letter-spacing: 3px;
                        text-transform: uppercase;
                        font-variant: small-caps;
                        margin-bottom: 2px;
                    }
                    .header .title {
                        font-size: 14pt;
                        font-weight: 700;
                        margin-bottom: 6px;
                    }
                    .header .contact {
                        font-size: 9.5pt;
                        display: flex;
                        justify-content: center;
                        gap: 12px;
                        flex-wrap: wrap;
                    }
                    .header .contact a {
                        color: #000;
                        text-decoration: underline;
                    }
                    .header .contact span {
                        display: inline-flex;
                        align-items: center;
                        gap: 4px;
                    }
                    
                    /* Section Styles */
                    .section {
                        margin-bottom: 10px;
                    }
                    .section-title {
                        font-size: 11.5pt;
                        font-weight: 600;
                        border-bottom: 1px solid #000;
                        padding-bottom: 2px;
                        margin-bottom: 6px;
                    }
                    
                    /* Summary */
                    .summary-text {
                        text-align: justify;
                        font-size: 10.5pt;
                    }
                    
                    /* Skills */
                    .skills-row {
                        margin-bottom: 2px;
                        font-size: 10.5pt;
                    }
                    .skills-row strong {
                        font-weight: 700;
                    }
                    
                    /* Certifications/Awards */
                    .cert-list {
                        list-style: disc;
                        margin-left: 18px;
                    }
                    .cert-list li {
                        margin-bottom: 4px;
                        font-size: 10.5pt;
                        text-align: justify;
                    }
                    .cert-list li strong {
                        font-weight: 700;
                    }
                    
                    /* Experience */
                    .exp-item {
                        margin-bottom: 10px;
                    }
                    .exp-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: baseline;
                        font-size: 10.5pt;
                    }
                    .exp-header .position {
                        font-weight: 700;
                    }
                    .exp-header .date {
                        font-weight: 700;
                    }
                    .exp-sub {
                        display: flex;
                        justify-content: space-between;
                        font-style: italic;
                        font-size: 10pt;
                        margin-bottom: 3px;
                    }
                    .exp-bullets {
                        margin-left: 12px;
                    }
                    .exp-bullets li {
                        list-style: none;
                        position: relative;
                        padding-left: 12px;
                        margin-bottom: 1px;
                        font-size: 10pt;
                        text-align: justify;
                    }
                    .exp-bullets li::before {
                        content: "–";
                        position: absolute;
                        left: 0;
                    }
                    
                    /* Projects */
                    .proj-item {
                        margin-bottom: 8px;
                    }
                    .proj-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: baseline;
                        font-size: 10.5pt;
                    }
                    .proj-header .proj-name {
                        font-weight: 700;
                    }
                    .proj-header .proj-tech {
                        font-style: italic;
                        font-weight: 400;
                    }
                    .proj-header .proj-year {
                        font-weight: 700;
                    }
                    
                    /* Education */
                    .edu-item {
                        margin-bottom: 4px;
                    }
                    .edu-header {
                        display: flex;
                        justify-content: space-between;
                        font-size: 10.5pt;
                    }
                    .edu-header .degree {
                        font-weight: 700;
                    }
                    .edu-sub {
                        display: flex;
                        justify-content: space-between;
                        font-style: italic;
                        font-size: 10pt;
                    }
                </style>
            </head>
            <body>
                <!-- HEADER -->
                <div class="header">
                    <div class="name">${data.personalInfo?.fullName || 'Your Name'}</div>
                    ${data.personalInfo?.title ? `<div class="title">${data.personalInfo.title}</div>` : ''}
                    <div class="contact">
                        ${data.personalInfo?.phone ? `<span><i class="fa-solid fa-phone"></i> ${data.personalInfo.phone}</span>` : ''}
                        ${data.personalInfo?.email ? `<span><i class="fa-solid fa-envelope"></i> <a href="mailto:${data.personalInfo.email}">${data.personalInfo.email}</a></span>` : ''}
                        ${data.personalInfo?.linkedin ? `<span><i class="fa-brands fa-linkedin"></i> <a href="${data.personalInfo.linkedin}">linkedin.com/in/${data.personalInfo.linkedin.split('/').pop()}</a></span>` : ''}
                        ${data.personalInfo?.github ? `<span><i class="fa-brands fa-github"></i> <a href="${data.personalInfo.github}">github.com/${data.personalInfo.github.split('/').pop()}</a></span>` : ''}
                    </div>
                </div>

                <!-- SUMMARY -->
                ${data.summary ? `
                <div class="section">
                    <div class="section-title">Summary</div>
                    <p class="summary-text">${data.summary}</p>
                </div>` : ''}

                <!-- SKILLS -->
                ${Array.isArray(data.skills) && data.skills.length > 0 ? `
                <div class="section">
                    <div class="section-title">Skills</div>
                    ${data.skills.map((s: any) => {
                const items = s.items || s.skillsList || [];
                const skillsText = Array.isArray(items) ? items.join(',') : items;
                return `<div class="skills-row"><strong>${s.category}:</strong> ${skillsText}</div>`;
            }).join('')}
                </div>` : ''}

                <!-- AWARDS & CERTIFICATIONS -->
                ${Array.isArray(data.certifications) && data.certifications.length > 0 ? `
                <div class="section">
                    <div class="section-title">Awards & Certifications</div>
                    <ul class="cert-list">
                        ${data.certifications.map((cert: any) =>
                `<li><strong>${cert.name}${cert.date ? ` (${cert.date})` : ''}:</strong> ${cert.description || ''}</li>`
            ).join('')}
                    </ul>
                </div>` : ''}

                <!-- EXPERIENCE -->
                ${Array.isArray(data.experience) && data.experience.length > 0 ? `
                <div class="section">
                    <div class="section-title">Experience</div>
                    ${data.experience.map((exp: any) => {
                const techList = exp.technologies || '';
                return `
                        <div class="exp-item">
                            <div class="exp-header">
                                <span class="position">${exp.position || ''}</span>
                                <span class="date">${formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                            </div>
                            <div class="exp-sub">
                                <span>${exp.company || ''} ${exp.location ? `(${exp.location})` : ''}</span>
                                ${techList ? `<span>${techList}</span>` : ''}
                            </div>
                            ${Array.isArray(exp.bullets) && exp.bullets.filter((b: string) => b && b.trim()).length > 0 ? `
                            <ul class="exp-bullets">
                                ${exp.bullets.filter((b: string) => b && b.trim()).map((b: string) => `<li>${b}</li>`).join('')}
                            </ul>` : ''}
                        </div>`;
            }).join('')}
                </div>` : ''}

                <!-- PROJECTS -->
                ${Array.isArray(data.projects) && data.projects.length > 0 ? `
                <div class="section">
                    <div class="section-title">Projects</div>
                    ${data.projects.map((p: any) => {
                const techs = Array.isArray(p.technologies) ? p.technologies.join(', ') : (p.technologies || '');
                return `
                        <div class="proj-item">
                            <div class="proj-header">
                                <span><span class="proj-name">${p.title || ''}</span>${techs ? ` | <span class="proj-tech">${techs}</span>` : ''}</span>
                                <span class="proj-year">${p.year || ''}</span>
                            </div>
                            ${p.description ? `
                            <ul class="exp-bullets">
                                <li>${p.description}</li>
                            </ul>` : ''}
                        </div>`;
            }).join('')}
                </div>` : ''}

                <!-- EDUCATION -->
                ${Array.isArray(data.education) && data.education.length > 0 ? `
                <div class="section">
                    <div class="section-title">Education</div>
                    ${data.education.map((edu: any) => {
                const gradYear = formatGradYear(edu.graduationYear || edu.endDate || '');
                return `
                        <div class="edu-item">
                            <div class="edu-header">
                                <span class="degree">${edu.degree || ''}${edu.field ? `. ${edu.field}` : ''}</span>
                                <span>Graduated: ${gradYear}</span>
                            </div>
                            <div class="edu-sub">
                                <span>${edu.school || ''}</span>
                                <span>${edu.gpa ? `CGPA: ${edu.gpa}` : ''}</span>
                            </div>
                        </div>`;
            }).join('')}
                </div>` : ''}

            </body>
            </html>
            `;

            await page.setContent(html, { waitUntil: 'networkidle0' });
            const pdf = await page.pdf({
                format: 'Letter',
                printBackground: true,
                margin: { top: '0.4in', right: '0.5in', bottom: '0.4in', left: '0.5in' }
            });
            await browser.close();

            return Buffer.from(pdf);

        } catch (error) {
            console.error('Puppeteer generation failed:', error);
            throw error;
        }
    }
}
