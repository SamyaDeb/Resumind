"use client";

import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link';

export default function MarketingCard() {
    return (
        <div className="flex flex-col h-full w-full p-8 md:p-12 bg-white text-black rounded-lg overflow-y-auto">
            {/* Top Section: Heading + Arrow + CTA */}
            <div className="flex flex-col items-center text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-neutral-900 leading-tight">
                    Create a resume that <span className="text-violet-600">gets results</span>
                </h2>

                <div className="w-full max-w-xs h-16 md:h-24 relative mb-6">
                    <Player
                        autoplay
                        loop
                        src="https://assets.resume-now.com/sem-blobcontent/rna/lotties/arrowCtaAnimation.json"
                        speed={0.4}
                        style={{ height: '100%', width: '100%' }}
                    />
                </div>

                <Link
                    href="/builder"
                    className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-transform hover:scale-105 shadow-lg shadow-violet-600/30"
                >
                    Choose a template
                </Link>
            </div>

            {/* Bottom Section: 3 Columns of Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-auto">

                {/* Item 1 */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-4">
                        <Player
                            autoplay
                            loop
                            src="https://assets.resume-now.com/sem-blobcontent/rna/lotties/icon1Animation.json"
                            speed={0.25}
                            style={{ height: '100%', width: '100%' }}
                        />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-neutral-800">Recruiter-Approved Resume</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                        We work with recruiters to design resume templates that format automatically.
                    </p>
                </div>

                {/* Item 2 */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-4">
                        <Player
                            autoplay
                            loop
                            src="https://assets.resume-now.com/sem-blobcontent/rna/lotties/icon3Animation.json"
                            speed={0.25}
                            style={{ height: '100%', width: '100%' }}
                        />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-neutral-800">Finish Your Resume in 15 Minutes</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                        Resume Now helps you tackle your work experience by reminding you what you did at your job.
                    </p>
                </div>

                {/* Item 3 */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-4">
                        <Player
                            autoplay
                            loop
                            src="https://assets.resume-now.com/sem-blobcontent/rna/lotties/icon2Animation.json"
                            speed={0.25}
                            style={{ height: '100%', width: '100%' }}
                        />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-neutral-800">Land an Interview</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                        We suggest the skills you should add. It helped over a million people get interviews.
                    </p>
                </div>

            </div>
        </div>
    );
}
