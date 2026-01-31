import express, { Request, Response } from 'express';
import { TemplateService } from '../services/templateService';

const router = express.Router();

/**
 * GET /api/templates
 * Get all available resume templates
 */
router.get('/', (req: Request, res: Response) => {
    try {
        const templates = TemplateService.getTemplates();
        res.json({ templates });
    } catch (error) {
        console.error('Error fetching templates:', error);
        res.status(500).json({ error: 'Failed to fetch templates' });
    }
});

/**
 * GET /api/templates/category/:category
 * Get templates by category
 * NOTE: This must come BEFORE /:id route to avoid conflicts
 */
router.get('/category/:category', (req: Request, res: Response) => {
    try {
        const category = req.params.category as string;
        const templates = TemplateService.getTemplatesByCategory(category);
        res.json({
            category,
            templates,
            count: templates.length
        });
    } catch (error) {
        console.error('Error fetching templates by category:', error);
        res.status(500).json({ error: 'Failed to fetch templates by category' });
    }
});

/**
 * GET /api/templates/:id/content
 * Get the LaTeX source code for a template
 * NOTE: This must come BEFORE /:id route to avoid conflicts
 */
router.get('/:id/content', (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if (!TemplateService.isValidTemplate(id)) {
            return res.status(404).json({ error: 'Template not found' });
        }

        const content = TemplateService.getTemplateContent(id);
        res.json({
            templateId: id,
            content
        });
    } catch (error) {
        console.error('Error fetching template content:', error);
        res.status(500).json({ error: 'Failed to fetch template content' });
    }
});

/**
 * GET /api/templates/:id
 * Get a specific template by ID
 * NOTE: This must come LAST to avoid catching other routes
 */
router.get('/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const template = TemplateService.getTemplate(id);

        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }

        res.json({ template });
    } catch (error) {
        console.error('Error fetching template:', error);
        res.status(500).json({ error: 'Failed to fetch template' });
    }
});

export default router;
