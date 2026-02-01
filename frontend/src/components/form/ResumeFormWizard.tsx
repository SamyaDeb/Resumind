"use client";

import { useState, useEffect } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import AchievementsForm from './AchievementsForm';
import SummaryForm from './SummaryForm';
import { ResumeData } from '@/types/resume';
import ProjectsForm from './ProjectsForm';
import { Beaker } from 'lucide-react';

const STEPS = [
    'Personal Info',
    'Experience',
    'Projects',
    'Education',
    'Skills',
    'Achievements',
    'Summary'
];

const DUMMY_DATA: ResumeData = {
    personalInfo: {
        fullName: "Samya Deb Biswas",
        title: "Blockchain Developer",
        email: "sammodeb28@gmail.com",
        phone: "+91-7384221106",
        location: "Kolkata, India",
        linkedin: "https://linkedin.com/in/samya",
        github: "https://github.com/SamyaDeb",
        portfolio: ""
    },
    summary: "Full-stack Blockchain Developer experienced in building dApps and smart contracts using Solidity on Ethereum/Polygon. Skilled in React, Next.js, TypeScript, and Node.js, delivering secure, scalable, and user-friendly web3 applications. Strong focus on clean, efficient code and practical blockchain solutions.",
    experience: [
        {
            id: "1",
            company: "Uplers",
            position: "Blockchain Developer Intern",
            location: "Remote",
            startDate: "2025-10",
            endDate: "2025-12",
            current: false,
            bullets: [
                "Developed and audited Solidity smart contracts, optimizing logic and reducing gas usage by 15%.",
                "Integrated smart contracts with a React.js frontend using ethers.js for real-time dApp interactions.",
                "Implemented wallet authentication, transaction signing, and reusable UI components to improve UX.",
                "Collaborated with senior developers to debug and deliver scalable smart contract–frontend architecture."
            ]
        }
    ],
    education: [
        {
            id: "1",
            school: "Government College Of Engineering And Leather Technology",
            degree: "B.Tech. Computer Science & Engineering",
            field: "Computer Science",
            location: "Kolkata, India",
            startDate: "2024-06",
            endDate: "2028-06",
            gpa: "7.0 / 10"
        }
    ],
    skills: [
        {
            category: "Programming Languages",
            items: ["JavaScript", "TypeScript", "Solidity", "C", "C++", "Python", "HTML", "Rust"]
        },
        {
            category: "Frameworks",
            items: ["React.js", "Next.js", "Node.js", "Express.js", "Tailwind CSS", "Bootstrap", "ShadCN"]
        },
        {
            category: "Tools",
            items: ["Git", "GitHub", "Docker", "VS Code", "Cursor", "Recoil", "Hardhat", "RainbowKit"]
        },
        {
            category: "Databases",
            items: ["MongoDB", "MySQL", "PostgreSQL", "Prisma", "Firebase", "SuperBase"]
        }
    ],
    projects: [
        {
            id: "1",
            title: "Zentra – Microlending dApp",
            description: "Built a full-stack decentralized microlending platform with on-chain loan creation, approval, and repayment workflows. Implemented a circle-based collateral model inspired by Grameen Bank to reduce default risk using smart contracts.",
            technologies: ["Solidity", "Polygon", "Web3.js"],
            year: "2025",
            link: ""
        },
        {
            id: "2",
            title: "Relifo – Decentralized Relief & Donation Platform",
            description: "Developed a transparent blockchain-based donation system ensuring traceable and tamper-proof fund distribution. Designed smart contracts to eliminate intermediaries and improve trust in disaster relief contributions.",
            technologies: ["Blockchain", "Smart Contracts"],
            year: "2026",
            link: ""
        },
        {
            id: "3",
            title: "OnMint – NFT Minting Platform",
            description: "Built an NFT minting and management platform with wallet-based authentication and metadata storage on IPFS. Enabled creators to mint, view, and manage NFTs through a user-friendly decentralized interface.",
            technologies: ["Solidity", "IPFS", "Web3"],
            year: "2026",
            link: ""
        },
        {
            id: "4",
            title: "ZenPay – Web3 Payment Solution",
            description: "Created a decentralized payment system enabling peer-to-peer crypto transactions with minimal user friction. Focused on simplifying Web3 payments for everyday transactions using secure on-chain logic.",
            technologies: ["Blockchain", "Smart Contracts"],
            year: "2026",
            link: ""
        }
    ],
    certifications: [
        {
            id: "1",
            name: "JGEC Sristi Techfest Hackathon Winner",
            issuer: "JGEC",
            date: "2025",
            description: "Winner recognized for building an innovative full-stack blockchain solution."
        },
        {
            id: "2",
            name: "East India Blockchain Summit 2.0 Hackathon",
            issuer: "EIBS",
            date: "2025",
            description: "Selected among 2,000+ participants and made Stablecoin based Disaster Relief Solution."
        },
        {
            id: "3",
            name: "On Block 2026 Hackathon",
            issuer: "IIT Kharagpur",
            date: "2026",
            description: "Secured a position in the Top 15 teams."
        },
        {
            id: "4",
            name: "TMSL Educathon 2.0 Hackathon Finalist",
            issuer: "TMSL",
            date: "2025",
            description: "Selected among 1400+ participants across 200+ colleges."
        }
    ]
};

export default function ResumeFormWizard({ onComplete, initialData }: { onComplete: (data: ResumeData) => void, initialData?: Partial<ResumeData> }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [resumeData, setResumeData] = useState<Partial<ResumeData>>(initialData || {});

    // Save to localStorage whenever resumeData changes
    const updateData = (key: string, value: any) => {
        setResumeData(prev => {
            const newData = { ...prev, [key]: value };
            // Save to localStorage
            localStorage.setItem('resumeDraft', JSON.stringify(newData));
            return newData;
        });
    };

    const finalComplete = (summary: string) => {
        const finalData = { ...resumeData, summary } as ResumeData;
        setResumeData(finalData);
        onComplete(finalData);
    }

    const fillDemoData = () => {
        if (confirm("This will overwrite your current progress with demo data. Are you sure?")) {
            setResumeData(DUMMY_DATA);
            localStorage.setItem('resumeDraft', JSON.stringify(DUMMY_DATA));
            // Optional: Move to the last step or verify step to show it's filled
            // setCurrentStep(STEPS.length - 1); 
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-8">
            {/* Progress Bar */}
            <div className="mb-12 relative">
                <div className="flex justify-between mb-4 px-2">
                    {STEPS.map((step, index) => (
                        <div
                            key={step}
                            className={`text-lg font-bold font-['Poppins'] transition-colors duration-300 hidden md:block ${index <= currentStep ? 'text-purple-400' : 'text-neutral-600'
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
                <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
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
