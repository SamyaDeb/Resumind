import OpenAI from 'openai';
import dotenv from 'dotenv';

import NodeCache from 'node-cache';

dotenv.config();

// Cache TTL: 1 hour (3600 seconds)
const cache = new NodeCache({ stdTTL: 3600 });
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export class LLMService {
    /**
     * Enhance a single bullet point
     */
    static async enhanceBulletPoint(
        bulletPoint: string,
        context: { position: string; company: string; keywords?: string[] }
    ): Promise<string> {
        // Cache Key
        const cacheKey = `enhance_bullet_${bulletPoint}_${JSON.stringify(context)}`;
        const cached = cache.get<string>(cacheKey);
        if (cached) return cached;

        const prompt = `
You are a professional resume writer specializing in ATS optimization.

Enhance this resume bullet point for maximum ATS score:
"${bulletPoint}"

Context:
- Position: ${context.position}
- Company: ${context.company}
${context.keywords ? `- Keywords to include: ${context.keywords.join(', ')}` : ''}

Requirements:
1. Start with a strong action verb
2. Add quantifiable metrics/impact where possible
3. Include relevant keywords naturally
4. Keep it concise (1-2 lines, max 150 characters)
5. Use professional language
6. Make it ATS-friendly (no special characters)

Return ONLY the enhanced bullet point, no quotes or explanations.
    `.trim();

        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 200,
        });

        const result = response.choices[0].message.content?.trim() || bulletPoint;

        // Save to cache
        cache.set(cacheKey, result);
        return result;
    }

    /**
     * Generate professional summary
     */
    static async generateSummary(userInfo: {
        position: string;
        yearsOfExperience: number;
        skills: string[];
        achievements: string[];
    }): Promise<string> {
        const prompt = `
Create a professional resume summary (2-3 sentences) for:

Position: ${userInfo.position}
Experience: ${userInfo.yearsOfExperience} years
Top Skills: ${userInfo.skills.slice(0, 5).join(', ')}
Key Achievements: ${userInfo.achievements.join('; ')}

Requirements:
- Concise and impactful
- ATS-optimized with relevant keywords
- Professional tone
- Highlight value proposition
- 50-80 words

Return only the summary, no quotes or title.
    `.trim();

        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 250,
        });

        return response.choices[0].message.content?.trim() || '';
    }

    /**
     * Improve any section with custom prompt
     */
    static async improveSection(
        content: string,
        sectionType: string,
        userRequest: string
    ): Promise<string> {
        const prompt = `
You are editing the ${sectionType} section of a resume.

Current content:
${content}

User request: ${userRequest}

Improve the content based on the user's request while maintaining ATS optimization.
Keep it professional and concise.

Return only the improved content, no explanations.
    `.trim();

        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 500,
        });

        return response.choices[0].message.content?.trim() || content;
    }

    /**
     * Suggest skills based on job position
     */
    static async suggestSkills(
        position: string,
        currentSkills: string[]
    ): Promise<string[]> {
        const prompt = `
Suggest 10 relevant technical skills for a ${position} that are commonly found in job descriptions.

Current skills: ${currentSkills.join(', ')}

Return only the skill names as a comma-separated list, no explanations.
Focus on high-demand, ATS-friendly keywords.
    `.trim();

        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.5,
            max_tokens: 200,
        });

        const skills = response.choices[0].message.content
            ?.split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0) || [];

        return skills;
    }

    /**
     * Analyze job description and extract keywords
     */
    static async analyzeJobDescription(jobDescription: string): Promise<{
        keywords: string[];
        requiredSkills: string[];
        preferredSkills: string[];
    }> {
        const prompt = `
Analyze this job description and extract:
1. Key technical keywords
2. Required skills
3. Preferred/nice-to-have skills

Job Description:
${jobDescription}

Return as JSON:
{
  "keywords": ["keyword1", "keyword2", ...],
  "requiredSkills": ["skill1", "skill2", ...],
  "preferredSkills": ["skill1", "skill2", ...]
}
    `.trim();

        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3,
            max_tokens: 500,
            response_format: { type: 'json_object' }
        });

        const result = JSON.parse(response.choices[0].message.content || '{}');
        return result;
    }

    /**
     * Optimize entire resume content
     */
    static async optimizeResume(resumeData: any): Promise<any> {
        const prompt = `
            You are a professional resume writer and ATS optimization expert. 
            I will provide you with a resume data object. Your task is to enhance the content of the resume to make it more impactful, professional, and ATS-friendly.

            Focus on:
            1. Strengthening bullet points with action verbs and quantifiable results.
            2. Improving the professional summary.
            3. Refining skills to specific, high-value keywords.
            4. Ensuring consistency and professional tone throughout.

            Here is the resume data:
            ${JSON.stringify(resumeData)}

            Return the optimized resume data as a JSON object, maintaining the exact same structure as the input. 
            Do NOT add any new fields or change the structure. Only enhance the string values.
        `.trim();

        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            response_format: { type: 'json_object' }
        });

        return JSON.parse(response.choices[0].message.content || '{}');
    }
}
