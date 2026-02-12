import Handlebars from 'handlebars';
import { TemplateService } from './templateService';

export class LatexService {
    static generateLatex(templateId: string, data: any): string {
        const transformedData = LatexService.transformDataForTemplate(data);
        const source = TemplateService.getTemplateContent(templateId);

        try {
            const template = Handlebars.compile(source);

            Handlebars.registerHelper('escapeLatex', (text) => {
                if (!text || typeof text !== 'string') return text;
                return text
                    .replace(/\\/g, '\\textbackslash{}')
                    .replace(/([&%$#_{}])/g, '\\$1')
                    .replace(/~/g, '\\textasciitilde{}')
                    .replace(/\^/g, '\\textasciicircum{}');
            });

            Handlebars.registerHelper('latexParam', (n) => '#' + n);

            return template(transformedData);
        } catch (e) {
            console.error("Handlebars Compilation Error:", e);
            throw e;
        }
    }

    private static transformDataForTemplate(data: any): any {
        const d = JSON.parse(JSON.stringify(data));

        if (d.skills && Array.isArray(d.skills)) {
            d.skills = d.skills.map((s: any) => {
                const items = s.items || s.skills || [];
                return {
                    category: s.category,
                    skillsList: Array.isArray(items) ? items.join(', ') : items
                };
            });
        }

        if (d.experience && Array.isArray(d.experience)) {
            d.experience = d.experience.map((exp: any) => ({
                ...exp,
                duration: LatexService.formatDateRange(exp.startDate, exp.endDate, exp.current)
            }));
        }

        if (d.education && Array.isArray(d.education)) {
            d.education = d.education.map((edu: any) => ({
                ...edu,
                graduationYear: LatexService.formatDate(edu.endDate)
            }));
        }

        if (d.projects && Array.isArray(d.projects)) {
            d.projects = d.projects.map((proj: any) => ({
                ...proj,
                technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies,
                bullets: proj.description ? proj.description.split('\n').filter((l: string) => l.trim().length > 0) : [],
                description: null
            }));
        }

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
        if (/^\d{4}$/.test(dateStr.trim())) return dateStr.trim();
        try {
            const date = new Date(dateStr);
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
