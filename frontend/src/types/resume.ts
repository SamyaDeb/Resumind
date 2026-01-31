export interface PersonalInfo {
    fullName?: string;
    title?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    bullets: string[];
}

export interface Education {
    id: string;
    school: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    year?: string;
    link?: string;
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
    description?: string;
    credentialId?: string;
}

export interface SkillGroup {
    category: string;
    items: string[];
}

export interface ResumeData {
    id?: string;
    personalInfo: PersonalInfo;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: SkillGroup[];
    projects: Project[];
    certifications: Certification[];
    atsScore?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ATSScore {
    overallScore: number;
    breakdown: {
        completeness: number;
        keywords: number;
        formatting: number;
        impact: number;
    };
    suggestions: string[];
}
