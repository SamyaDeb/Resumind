"use client";

import HeroResumePreview from './HeroResumePreview';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroCard() {
    return (
        <div className="flex flex-row h-full w-full bg-white text-black rounded-lg overflow-hidden relative" style={{ containerType: 'size' }}>

            {/* Left Content - Scales proportionally with container */}
            <div className="flex-1 flex flex-col justify-center z-10 pl-[5cqw] pr-[2cqw] py-[3cqh]">
                <h1 className="text-[5.5cqw] font-extrabold tracking-tight text-neutral-900 mb-[2.5cqh] leading-[1.1]">
                    India's Top <br />
                    <span className="text-violet-600">Resume Templates</span>
                </h1>

                <p className="text-[1.8cqw] text-neutral-600 mb-[4cqh] max-w-[45cqw] leading-relaxed">
                    Get the job 2x as fast. Use recruiter-approved templates and step-by-step content recommendations to create a new resume or optimize your current one.
                </p>

                <div className="flex flex-row gap-[1.5cqw] mb-[4cqh]">
                    <Link
                        href="/login"
                        className="bg-violet-600 hover:bg-violet-700 text-white font-['Poppins'] font-bold py-[1.5cqw] px-[3.5cqw] rounded-full text-center transition-transform hover:scale-105 shadow-lg shadow-violet-600/30 text-[1.4cqw] tracking-wide"
                    >
                        Create new resume
                    </Link>
                    <Link
                        href="/upload"
                        className="bg-white hover:bg-neutral-50 text-violet-600 border-[0.2cqw] border-violet-600 font-['Poppins'] font-bold py-[1.5cqw] px-[3.5cqw] rounded-full text-center transition-transform hover:scale-105 text-[1.4cqw] tracking-wide"
                    >
                        Optimize my resume
                    </Link>
                </div>


            </div>

            {/* Right Image/Animation */}
            <div className="flex-1 relative flex items-center justify-center">
                <div className="w-[85%] aspect-square relative">
                    <HeroResumePreview />
                </div>
            </div>

        </div>
    );
}
