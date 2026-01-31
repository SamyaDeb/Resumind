import express from 'express';
import { LLMService } from '../services/llmService';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Enhance bullet point
router.post('/enhance-bullet',
    body('bulletPoint').isString().notEmpty(),
    body('context').isObject(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { bulletPoint, context } = req.body;
            const enhanced = await LLMService.enhanceBulletPoint(bulletPoint, context);
            res.json({ enhanced });
        } catch (error) {
            console.error('Error enhancing bullet:', error);
            res.status(500).json({ error: 'Failed to enhance bullet point' });
        }
    }
);

// Generate summary
router.post('/generate-summary',
    body('userInfo').isObject(),
    async (req, res) => {
        try {
            const { userInfo } = req.body;
            const summary = await LLMService.generateSummary(userInfo);
            res.json({ summary });
        } catch (error) {
            console.error('Error generating summary:', error);
            res.status(500).json({ error: 'Failed to generate summary' });
        }
    }
);

// Improve section
router.post('/improve-section',
    body('content').isString().notEmpty(),
    body('sectionType').isString(),
    body('userRequest').isString(),
    async (req, res) => {
        try {
            const { content, sectionType, userRequest } = req.body;
            const improved = await LLMService.improveSection(content, sectionType, userRequest);
            res.json({ improved });
        } catch (error) {
            console.error('Error improving section:', error);
            res.status(500).json({ error: 'Failed to improve section' });
        }
    }
);

// Suggest skills
router.post('/suggest-skills',
    body('position').isString(),
    body('currentSkills').isArray(),
    async (req, res) => {
        try {
            const { position, currentSkills } = req.body;
            const skills = await LLMService.suggestSkills(position, currentSkills);
            res.json({ skills });
        } catch (error) {
            console.error('Error suggesting skills:', error);
            res.status(500).json({ error: 'Failed to suggest skills' });
        }
    }
);

// Analyze job description
router.post('/analyze-job',
    body('jobDescription').isString().notEmpty(),
    async (req, res) => {
        try {
            const { jobDescription } = req.body;
            const analysis = await LLMService.analyzeJobDescription(jobDescription);
            res.json(analysis);
        } catch (error) {
            console.error('Error analyzing job:', error);
            res.status(500).json({ error: 'Failed to analyze job description' });
        }
    }
);

export default router;
