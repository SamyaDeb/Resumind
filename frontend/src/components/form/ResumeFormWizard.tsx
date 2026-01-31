"use client";

import { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import AchievementsForm from './AchievementsForm';
import SummaryForm from './SummaryForm';
import { ResumeData } from '@/types/resume';

import ProjectsForm from './ProjectsForm';

const STEPS = [
    'Personal Info',
    'Experience',
    'Projects',
    'Education',
    'Skills',
    'Achievements',
    'Summary'
];

export default function ResumeFormWizard({ onComplete }: { onComplete: (data: ResumeData) => void }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [resumeData, setResumeData] = useState<Partial<ResumeData>>({});

    const updateData = (key: string, value: any) => {
        setResumeData(prev => ({ ...prev, [key]: value }));
    };

    const finalComplete = (summary: string) => {
        const finalData = { ...resumeData, summary } as ResumeData;
        setResumeData(finalData);
        onComplete(finalData);
    }

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8">
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex justify-between mb-4 px-2">
                    {STEPS.map((step, index) => (
                        <div
                            key={step}
                            className={`text-sm font-medium transition-colors duration-300 hidden md:block ${index <= currentStep ? 'text-purple-400' : 'text-neutral-600'
                                }`}
                        >
                            {step}
                        </div>
                    ))}
                    {/* Mobile Step Indicator */}
                    <div className="md:hidden text-white font-medium text-lg">
                        Step {currentStep + 1}: <span className="text-purple-400">{STEPS[currentStep]}</span>
                    </div>
                </div>

                {/* Progress Track */}
                <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Form Container (Glassmorphism) */}
            <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl p-6 md:p-10 transition-all duration-500">
                {currentStep === 0 && (
                    <PersonalInfoForm
                        initialData={resumeData.personalInfo}
                        onSubmit={(data) => updateData('personalInfo', data)}
                        onNext={() => setCurrentStep(1)}
                    />
                )}
                {currentStep === 1 && (
                    <ExperienceForm
                        initialData={resumeData.experience}
                        onSubmit={(data) => updateData('experience', data)}
                        onNext={() => setCurrentStep(2)}
                        onBack={() => setCurrentStep(0)}
                    />
                )}
                {currentStep === 2 && (
                    <ProjectsForm
                        initialData={resumeData.projects}
                        onSubmit={(data) => updateData('projects', data)}
                        onNext={() => setCurrentStep(3)}
                        onBack={() => setCurrentStep(1)}
                    />
                )}
                {currentStep === 3 && (
                    <EducationForm
                        initialData={resumeData.education}
                        onSubmit={(data) => updateData('education', data)}
                        onNext={() => setCurrentStep(4)}
                        onBack={() => setCurrentStep(2)}
                    />
                )}
                {currentStep === 4 && (
                    <SkillsForm
                        initialData={resumeData.skills}
                        onSubmit={(data) => updateData('skills', data)}
                        onNext={() => setCurrentStep(5)}
                        onBack={() => setCurrentStep(3)}
                    />
                )}
                {currentStep === 5 && (
                    <AchievementsForm
                        initialData={resumeData.certifications}
                        onSubmit={(data) => updateData('certifications', data)}
                        onNext={() => setCurrentStep(6)}
                        onBack={() => setCurrentStep(4)}
                    />
                )}
                {currentStep === 6 && (
                    <SummaryForm
                        initialData={resumeData.summary}
                        onSubmit={(data) => finalComplete(data)}
                        onBack={() => setCurrentStep(5)}
                        onComplete={() => { }}
                    />
                )}
            </div>
        </div>
    );
}
