import express from 'express';
import { LatexService } from '../services/latexService';
import { LLMService } from '../services/llmService';
import { PdfService } from '../services/pdfService';
import { db, auth } from '../config/firebase'; // Import firebase admin
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Middleware to check auth
const verifyAuth = async (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decodedToken = await auth.verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Auth Error:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Save Resume
router.post('/save', verifyAuth, async (req: any, res: any) => {
    try {
        const { data } = req.body;
        const userId = req.user.uid;

        // Save to Firestore under users/{userId}/resumes/current (single resume for now)
        await db.collection('users').doc(userId).collection('resumes').doc('current').set({
            ...data,
            updatedAt: new Date().toISOString()
        });

        res.json({ success: true, message: 'Resume saved successfully' });
    } catch (error) {
        console.error('Save Error:', error);
        res.status(500).json({ error: 'Failed to save resume' });
    }
});

// Get Resume
router.get('/', verifyAuth, async (req: any, res: any) => {
    try {
        const userId = req.user.uid;
        const doc = await db.collection('users').doc(userId).collection('resumes').doc('current').get();

        if (!doc.exists) {
            return res.json({ exists: false });
        }

        res.json({ exists: true, data: doc.data() });
    } catch (error) {
        console.error('Fetch Error:', error);
        res.status(500).json({ error: 'Failed to fetch resume' });
    }
});

router.post('/download', async (req: any, res: any) => {
    try {
        const { templateId, data } = req.body;
        console.log('Download request received:', JSON.stringify({ templateId, dataKeys: Object.keys(data || {}) }));

        if (!templateId || !data) {
            return res.status(400).json({ error: 'Missing templateId or data' });
        }

        const latexCode = LatexService.generateLatex(templateId, data);
        const pdfBuffer = await PdfService.compileLatex(latexCode, data);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
        res.send(pdfBuffer);
    } catch (error: any) {
        console.error('Download error:', error.message);
        console.error('Stack:', error.stack);
        res.status(500).json({ error: 'Download failed', details: error.message });
    }
});

router.post('/optimize-and-download', async (req: any, res: any) => {
    try {
        const { templateId, data } = req.body;
        if (!templateId || !data) {
            return res.status(400).json({ error: 'Missing templateId or data' });
        }

        // 1. Optimize Data with AI
        console.log('Optimizing resume data...');
        const optimizedData = await LLMService.optimizeResume(data);

        // 2. Generate Latex
        const latexCode = LatexService.generateLatex(templateId, optimizedData);

        // 3. Compile PDF
        const pdfBuffer = await PdfService.compileLatex(latexCode, optimizedData);

        // 4. Return PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="optimized_resume.pdf"');
        res.setHeader('X-Optimized-Data', JSON.stringify(optimizedData)); // Optional: return optimized data in header if needed by frontend
        res.send(pdfBuffer);

    } catch (error) {
        console.error('Optimization/Download failed:', error);
        res.status(500).json({ error: 'Failed to optimize and download resume' });
    }
});

export default router;
