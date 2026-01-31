"use client";

import HeroResumePreview from './HeroResumePreview';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroCard() {
    return (
        <div className="flex flex-col md:flex-row h-full w-full p-8 md:p-12 bg-white text-black rounded-lg overflow-hidden relative">

            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-center z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 mb-6 leading-tight">
                    India's Top <br />
                    <span className="text-blue-600">Resume Templates</span>
                </h1>

                <p className="text-lg text-neutral-600 mb-8 max-w-md leading-relaxed">
                    Get the job 2x as fast. Use recruiter-approved templates and step-by-step content recommendations to create a new resume or optimize your current one.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Link
                        href="/builder"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-center transition-transform hover:scale-105 shadow-lg shadow-blue-600/30"
                    >
                        Create new resume
                    </Link>
                    <Link
                        href="/upload"
                        className="bg-white hover:bg-neutral-50 text-blue-600 border-2 border-blue-600 font-bold py-4 px-8 rounded-full text-center transition-transform hover:scale-105"
                    >
                        Optimize my resume
                    </Link>
                </div>

                {/* Trustpilot Widget */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-900">Excellent</span>
                        <div className="relative w-20 h-4">
                            <Image
                                src="https://assets.resume-now.com/sem-blobimages/rna/images/stars-4.5.svg"
                                alt="4.5 stars"
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <span>4.5 out of 5 based on 15,721 reviews</span>
                        <div className="relative w-20 h-5">
                            <Image
                                src="https://assets.resume-now.com/sem-blobimages/rna/images/trustpilot-logo.svg"
                                alt="Trustpilot"
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Image/Animation */}
            <div className="flex-1 relative mt-8 md:mt-0 flex items-center justify-center">
                <div className="w-full max-w-md aspect-square relative">
                    <HeroResumePreview />
                </div>
            </div>

        </div>
    );
}
