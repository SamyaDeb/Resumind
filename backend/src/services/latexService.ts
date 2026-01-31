import Handlebars from 'handlebars';
import { TemplateService } from './templateService';

export class LatexService {
    /**
     * Generates LaTeX code by merging data with the selected template.
     */
    /**
     * Generates LaTeX code by merging data with the selected template.
     */
    static generateLatex(templateId: string, data: any): string {
        // 1. Transform data to match template requirements
        const transformedData = LatexService.transformDataForTemplate(data);

        // 2. Get raw template content
        const source = TemplateService.getTemplateContent(templateId);

        // 3. Compile with Handlebars
        try {
            const template = Handlebars.compile(source); // Revert to defaults

            // 4. Helper to escape special LaTeX characters
            Handlebars.registerHelper('escapeLatex', (text) => {
                if (!text || typeof text !== 'string') return text;
                return text
                    .replace(/\\/g, '\\textbackslash{}')
                    .replace(/([&%$#_{}])/g, '\\$1')
                    .replace(/~/g, '\\textasciitilde{}')
                    .replace(/\^/g, '\\textasciicircum{}');
            });

            // Helper to safe-print LaTeX parameters like #1 without confusing Handlebars
            Handlebars.registerHelper('latexParam', (n) => '#' + n);

            // 5. Fill template
            return template(transformedData);
        } catch (e) {
            console.error("Handlebars Compilation Error:", e);
            throw e;
        }
    }

    private static transformDataForTemplate(data: any): any {
        // Deep copy to avoid mutating original
        const d = JSON.parse(JSON.stringify(data));

        // 1. Format Skills
        if (d.skills && Array.isArray(d.skills)) {
            d.skills = d.skills.map((s: any) => {
                const items = s.items || s.skills || []; // Handle potential field naming mismatch
                return {
                    category: s.category,
                    skillsList: Array.isArray(items) ? items.join(', ') : items
                };
            });
        }

        // 2. Format Experience Dates
        if (d.experience && Array.isArray(d.experience)) {
            d.experience = d.experience.map((exp: any) => ({
                ...exp,
                duration: LatexService.formatDateRange(exp.startDate, exp.endDate, exp.current)
            }));
        }

        // 3. Format Education Dates
        if (d.education && Array.isArray(d.education)) {
            d.education = d.education.map((edu: any) => ({
                ...edu,
                graduationYear: LatexService.formatDate(edu.endDate)
            }));
        }

        // 4. Format Projects
        if (d.projects && Array.isArray(d.projects)) {
            d.projects = d.projects.map((proj: any) => ({
                ...proj,
                technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies,
                // Split description into bullets if it contains newlines, or maintain as single item
                bullets: proj.description ? proj.description.split('\n').filter((l: string) => l.trim().length > 0) : [],
                description: null // We use bullets now
            }));
        }

        // 5. Format Certifications
        if (d.certifications && Array.isArray(d.certifications)) {
            d.certifications = d.certifications.map((cert: any) => ({
                ...cert,
                date: LatexService.formatDate(cert.date)
            }));
        }

        return d;
    }

    private static formatDate(dateStr: string): string {
        if (!dateStr) return '';
        // Check if strictly a year (e.g. "2025")
        if (/^\d{4}$/.test(dateStr.trim())) {
            return dateStr.trim();
        }
        try {
            const date = new Date(dateStr);
            // Verify valid date
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        } catch (e) {
            return dateStr;
        }
    }

    private static formatDateRange(start: string, end: string, current: boolean): string {
        const startDate = LatexService.formatDate(start);
        if (current) return `${startDate} -- Present`;
        const endDate = LatexService.formatDate(end);
        return `${startDate} -- ${endDate}`;
    }
}
