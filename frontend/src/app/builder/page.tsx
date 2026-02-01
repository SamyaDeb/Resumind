"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ResumeData } from '@/types/resume';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from '@/components/Navbar';

// Lazy load the sensitive/heavy form wizard
const ResumeFormWizard = dynamic(() => import('@/components/form/ResumeFormWizard'), {
    loading: () => <div className="text-white text-center p-10">Loading builder...</div>
});
import { auth } from '@/lib/firebase';
import DownloadButton from '@/components/resume/DownloadButton';
import LatexPreview from '@/components/resume/LatexPreview'; // Optional if we want to show it

// Sample data that matches the LaTeX template structure
const SAMPLE_RESUME_DATA: Partial<ResumeData> = {
    personalInfo: {
        fullName: "John Anderson",
        title: "Senior Software Engineer",
        email: "john.anderson@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        linkedin: "https://linkedin.com/in/johnanderson",
        github: "https://github.com/johnanderson",
        portfolio: "https://johnanderson.dev"
    },
    summary: "Experienced Software Engineer with 5+ years of expertise in full-stack development, cloud architecture, and AI/ML integration. Proven track record of building scalable applications that serve millions of users. Passionate about creating innovative solutions and mentoring junior developers.",
    experience: [
        {
            id: "exp1",
            company: "Tech Innovations Inc.",
            position: "Senior Software Engineer",
            location: "San Francisco, CA",
            startDate: "2021-06",
            endDate: "",
            current: true,
            bullets: [
                "Led development of microservices architecture serving 5M+ daily active users, improving system reliability by 40%",
                "Architected and implemented AI-powered recommendation engine using Python and TensorFlow, increasing user engagement by 35%",
                "Mentored team of 5 junior engineers, establishing code review processes and best practices",
                "Reduced cloud infrastructure costs by 25% through optimization of AWS services and containerization with Docker"
            ]
        },
        {
            id: "exp2",
            company: "StartupXYZ",
            position: "Full Stack Developer",
            location: "Remote",
            startDate: "2019-03",
            endDate: "2021-05",
            current: false,
            bullets: [
                "Built responsive web applications using React, Node.js, and MongoDB, serving 100K+ users",
                "Implemented CI/CD pipelines with GitHub Actions, reducing deployment time by 60%",
                "Developed RESTful APIs and integrated third-party services including Stripe, SendGrid, and AWS S3",
                "Collaborated with design team to create pixel-perfect UI components and improve user experience"
            ]
        }
    ],
    education: [
        {
            id: "edu1",
            school: "University of California, Berkeley",
            degree: "Bachelor of Science",
            field: "Computer Science",
            location: "Berkeley, CA",
            startDate: "2015-09",
            endDate: "2019-05",
            gpa: "3.8/4.0"
        }
    ],
    skills: [
        {
            category: "Languages",
            items: ["JavaScript", "TypeScript", "Python", "Java", "SQL", "HTML/CSS"]
        },
        {
            category: "Frameworks & Libraries",
            items: ["React", "Next.js", "Node.js", "Express", "Django", "TensorFlow", "PyTorch"]
        },
        {
            category: "Tools & Technologies",
            items: ["AWS", "Docker", "Kubernetes", "Git", "MongoDB", "PostgreSQL", "Redis", "GraphQL"]
        },
        {
            category: "Soft Skills",
            items: ["Team Leadership", "Agile/Scrum", "Technical Writing", "Code Review", "Mentoring"]
        }
    ],
    projects: [
        {
            id: "proj1",
            title: "AI Resume Builder",
            description: "Full-stack web application that uses AI to generate ATS-optimized resumes with LaTeX templates",
            technologies: ["Next.js", "TypeScript", "Node.js", "OpenAI API", "LaTeX", "Firebase"],
            year: "2024",
            link: "https://github.com/johnanderson/ai-resume-builder"
        },
        {
            id: "proj2",
            title: "Real-time Chat Platform",
            description: "Scalable chat application with WebSocket support, file sharing, and end-to-end encryption",
            technologies: ["React", "Socket.io", "Redis", "MongoDB", "AWS S3"],
            year: "2023",
            link: "https://github.com/johnanderson/chat-platform"
        },
        {
            id: "proj3",
            title: "E-commerce Analytics Dashboard",
            description: "Interactive dashboard for tracking sales metrics, customer behavior, and inventory management",
            technologies: ["Vue.js", "D3.js", "Python", "FastAPI", "PostgreSQL"],
            year: "2022",
            link: "https://github.com/johnanderson/analytics-dashboard"
        }
    ],
    certifications: [
        {
            id: "cert1",
            name: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            date: "2023",
            description: "Professional level certification demonstrating expertise in designing distributed systems on AWS",
            credentialId: "AWS-CSA-123456"
        },
        {
            id: "cert2",
            name: "Google Cloud Professional Developer",
            issuer: "Google Cloud",
            date: "2022",
            description: "Certification in building scalable applications using Google Cloud Platform services"
        }
    ]
};

export default function BuilderPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [initialData, setInitialData] = useState<Partial<ResumeData> | null>(null);
    const [loadingData, setLoadingData] = useState(true);
    const [finalData, setFinalData] = useState<ResumeData | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        } else if (user) {
            fetchResumeData();
        }
    }, [user, authLoading, router]);

    const fetchResumeData = async () => {
        try {
            // First check localStorage for draft data
            const savedDraft = localStorage.getItem('resumeDraft');
            if (savedDraft) {
                const draftData = JSON.parse(savedDraft);
                setInitialData(draftData);
                toast.success('Loaded your draft');
                setLoadingData(false);
                return;
            }

            // Then try to fetch from server
            const token = await user?.getIdToken();
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/resume`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.exists && response.data.data) {
                setInitialData(response.data.data);
                toast.success('Loaded your saved resume');
            } else {
                // No saved data, start with empty form
                setInitialData({});
            }
        } catch (error) {
            console.error('Failed to fetch resume', error);
            // On error, start with empty form
            setInitialData({});
        } finally {
            setLoadingData(false);
        }
    };

    const handleComplete = async (data: ResumeData) => {
        console.log('Resume Data Completed:', data);
        const toastId = toast.loading('Saving resume...');

        try {
            const token = await user?.getIdToken();
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/save`, { data }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Clear draft from localStorage after successful save
            localStorage.removeItem('resumeDraft');
            toast.success('Resume saved successfully!', { id: toastId });
            setFinalData(data); // Switch view to download/preview
        } catch (error) {
            console.error(error);
            toast.error('Failed to save data', { id: toastId });
        }
    };

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const generatePreview = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/download`, {
                templateId: 'modern',
                data: finalData
            }, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            setPreviewUrl(url);
        } catch (error) {
            console.error('Failed to generate preview', error);
        }
    };

    useEffect(() => {
        if (finalData) {
            generatePreview();
        }
    }, [finalData]);

    if (authLoading || loadingData) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

    if (finalData) {
        return (
            <div className="relative min-h-screen overflow-hidden font-sans py-10 px-4">
                <Navbar />
                <div className="max-w-6xl mx-auto bg-white rounded-lg p-8 shadow-2xl mt-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Resume is Ready!</h2>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Preview Section */}
                        <div className="flex-1 w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200 h-[600px]">
                            {previewUrl ? (
                                <iframe src={previewUrl} className="w-full h-full" title="Resume Preview" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                                        <p>Generating Preview...</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions Section */}
                        <div className="flex flex-col gap-6 items-center justify-center lg:w-1/3">
                            <p className="text-gray-600 text-center">
                                Your resume has been saved. You can now download it as a PDF or optimize it further with AI.
                            </p>

                            <div className="flex flex-col gap-4 w-full">
                                <button
                                    onClick={() => setFinalData(null)}
                                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium w-full"
                                >
                                    Edit Content
                                </button>
                                <DownloadButton
                                    templateId="modern"
                                    data={finalData}
                                    onOptimize={(newData: ResumeData) => {
                                        setFinalData(newData);
                                        setInitialData(newData);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen font-sans">
            <Navbar />
            <div className="relative z-10 py-10 pt-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white tracking-tighter mb-2">Build Your Resume</h1>
                        <p className="text-lg text-neutral-300">Follow the steps to create your professional resume.</p>
                    </div>

                    <ResumeFormWizard
                        onComplete={handleComplete}
                        initialData={initialData || {}}
                    />
                </div>
            </div>
        </div>
    );
}
