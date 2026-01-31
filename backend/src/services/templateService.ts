import fs from 'fs';
import path from 'path';

export interface Template {
    id: string;
    name: string;
    description: string;
    previewUrl: string;
    category: string;
}

const TEMPLATES: Template[] = [
    {
        id: 'professional',
        name: 'Professional',
        description: 'ATS Score: 95+ | Perfect for blockchain and tech professionals. Clean structure with bold headers.',
        previewUrl: '/previews/professional.png',
        category: 'Technical'
    },
    {
        id: 'modern',
        name: 'Modern Clean',
        description: 'ATS Score: 93+ | Contemporary single-column design. Ideal for modern tech roles and startups.',
        previewUrl: '/previews/modern.png',
        category: 'Modern'
    },
    {
        id: 'classic',
        name: 'Classic',
        description: 'ATS Score: 94+ | Traditional format with education first. Best for academic and research positions.',
        previewUrl: '/previews/classic.png',
        category: 'Traditional'
    },
    {
        id: 'creative',
        name: 'Simple Professional',
        description: 'ATS Score: 96+ | Ultra-clean layout with maximum ATS compatibility. Works for all industries.',
        previewUrl: '/previews/creative.png',
        category: 'Creative'
    },
    {
        id: 'compact',
        name: 'Tech Focused',
        description: 'ATS Score: 95+ | Optimized for software engineers. Emphasizes technical skills and projects.',
        previewUrl: '/previews/compact.png',
        category: 'Technical'
    }
];

export class TemplateService {
    /**
     * Get all available templates
     */
    static getTemplates(): Template[] {
        return TEMPLATES;
    }

    /**
     * Get a specific template by ID
     */
    static getTemplate(id: string): Template | undefined {
        return TEMPLATES.find(template => template.id === id);
    }

    /**
     * Get template content (LaTeX source code)
     */
    static getTemplateContent(id: string): string {
        const filePath = path.join(__dirname, `../templates/${id}.tex`);

        if (!fs.existsSync(filePath)) {
            throw new Error(`Template ${id} not found`);
        }

        return fs.readFileSync(filePath, 'utf-8');
    }

    /**
     * Get templates by category
     */
    static getTemplatesByCategory(category: string): Template[] {
        return TEMPLATES.filter(template => template.category === category);
    }

    /**
     * Validate template ID
     */
    static isValidTemplate(id: string): boolean {
        return TEMPLATES.some(template => template.id === id);
    }
}
