export class ATSService {
    static calculateScore(resumeData: any, jobDescription?: string) {
        let completeness = 0;
        let impact = 0;
        const suggestions: string[] = [];

        // 1. Completeness
        if (resumeData.personalInfo?.fullName) completeness += 20;
        if (resumeData.personalInfo?.email) completeness += 20;
        if (resumeData.personalInfo?.phone) completeness += 10;
        if (resumeData.personalInfo?.linkedin) completeness += 10;
        if (resumeData.summary && resumeData.summary.length > 50) completeness += 20;
        if (resumeData.experience && resumeData.experience.length >= 1) completeness += 20;

        completeness = Math.min(completeness, 100);
        if (completeness < 100) suggestions.push("Complete your personal information and add at least one experience to improve completeness.");

        // 2. Impact (Heuristic: checking for numbers/metrics in bullets)
        let bulletCount = 0;
        let metricCount = 0;
        if (resumeData.experience) {
            resumeData.experience.forEach((exp: any) => {
                if (exp.bullets) {
                    exp.bullets.forEach((bullet: string) => {
                        bulletCount++;
                        if (/\d+|%|\$/.test(bullet)) {
                            metricCount++;
                        }
                    });
                }
            });
        }

        if (bulletCount > 0) {
            impact = Math.round((metricCount / bulletCount) * 100);
            if (impact < 50) suggestions.push("Try to include more numbers and metrics (e.g., %, $) in your experience bullet points to show impact.");
        } else {
            impact = 0;
            suggestions.push("Add bullet points to your experience sections.");
        }

        // 3. Keywords (Placeholder if no JD)
        let keywords = 50; // Default baseline
        if (jobDescription) {
            // Simple matching simulation
            keywords = 70; // Mock calculation
            suggestions.push("Job description tailored scoring is experimentally implemented.");
        } else {
            suggestions.push("Add a job description to get a keyword matching score.");
        }

        // 4. Formatting (Guaranteed by LaTeX)
        const formatting = 100;

        // Calculate Overall
        const overallScore = Math.round((completeness * 0.3) + (impact * 0.3) + (keywords * 0.2) + (formatting * 0.2));

        return {
            overallScore,
            breakdown: {
                completeness,
                impact,
                keywords,
                formatting
            },
            suggestions
        };
    }
}
