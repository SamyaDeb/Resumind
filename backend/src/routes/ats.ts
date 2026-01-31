import express from 'express';
import { ATSService } from '../services/atsService';

const router = express.Router();

router.post('/score', (req, res) => {
    try {
        const { resumeData, jobDescription } = req.body;
        if (!resumeData) {
            return res.status(400).json({ error: 'Resume data is required' });
        }
        const result = ATSService.calculateScore(resumeData, jobDescription);
        res.json(result);
    } catch (error) {
        console.error('ATS Scoring failed:', error);
        res.status(500).json({ error: 'Failed to calculate ATS score' });
    }
});

export default router;
