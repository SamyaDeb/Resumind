"use client";

import Image from 'next/image';

const FEATURES = [
    {
        title: "35+ Template Designs",
        description: "Build confidently with thousands of potential design combinations that help you stand out to hiring managers.",
        image: "https://assets.resume-now.com/sem-blobimages/rna/images/feature1.png",
        width: 248,
        height: 146
    },
    {
        title: "Enhance with AI",
        description: "Get suggested improvements to tune your resume and level up with just a few clicks.",
        image: "https://assets.resume-now.com/sem-blobimages/rna/images/feature2.png",
        width: 252,
        height: 181
    },
    {
        title: "Resume Review",
        description: "Submit your resume for review and get detailed feedback in 2-3 business days.",
        image: "https://assets.resume-now.com/sem-blobimages/rna/images/feature3.png",
        width: 215,
        height: 240
    },
    {
        title: "AI Cover Letter Builder",
        description: "AI-enhanced to generate industry-specific phrases tailored to match your resume and desired writing style.",
        image: "https://assets.resume-now.com/sem-blobimages/rna/images/feature4.png",
        width: 229,
        height: 206
    },
    {
        title: "Resume Website",
        description: "Turn your resume into a digital resume website in a few clicks and know when hiring managers are interested in you.",
        image: "https://assets.resume-now.com/sem-blobimages/rna/images/feature5.png",
        width: 217,
        height: 152
    },
    {
        title: "Resume Tracking",
        description: "Know when employers are interested in you and track your resume for every job.",
        image: "https://assets.resume-now.com/sem-blobimages/rna/images/feature6.png",
        width: 252,
        height: 238
    }
];

export default function FeaturesGrid() {
    return (
        <div className="flex flex-col h-full w-full p-6 bg-white text-black overflow-hidden">
            <div className="text-center mb-6 shrink-0">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                    6 features to boost your job search
                </h2>
            </div>

            <div className="grid grid-cols-3 gap-6 auto-rows-min">
                {FEATURES.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center group">
                        {/* Image Card: 16:9 Ratio, Bordered */}
                        <div className="w-full aspect-video relative flex items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 shadow-sm overflow-hidden group-hover:shadow-md transition-all">
                            <div className="relative w-[90%] h-[90%]">
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                        </div>

                        {/* Title Outside */}
                        <h3 className="font-bold text-sm mt-3 text-neutral-800 text-center leading-tight">
                            {feature.title}
                        </h3>
                    </div>
                ))}
            </div>

        </div>
    );
}
