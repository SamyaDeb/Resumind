"use client";

import ResumeFormWizard from '@/components/form/ResumeFormWizard';
import { ResumeData } from '@/types/resume';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function BuilderPage() {
    const router = useRouter();

    const handleComplete = async (data: ResumeData) => {
        console.log('Resume Data Completed:', data);

        try {
            localStorage.setItem('resumeData', JSON.stringify(data));
            toast.success('Resume data saved locally!');
            // router.push('/preview'); // Uncomment when preview is ready
        } catch (error) {
            console.error(error);
            toast.error('Failed to save data');
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden font-sans">
            {/* Background Animation */}


            {/* Content */}
            <div className="relative z-10 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white tracking-tighter mb-2">Build Your Resume</h1>
                        <p className="text-lg text-neutral-300">Follow the steps to create your professional resume.</p>
                    </div>

                    <ResumeFormWizard onComplete={handleComplete} />
                </div>
            </div>
        </div>
    );
}
