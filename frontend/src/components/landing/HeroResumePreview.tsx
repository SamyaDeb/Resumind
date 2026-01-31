import Image from 'next/image';

export default function HeroResumePreview() {
    return (
        <div className="relative w-full h-full flex items-center justify-center p-4 select-none pointer-events-none">
            {/* Background Decor: Green Squiggles */}
            <div className="absolute top-6 left-0 w-40 h-40 text-green-400 opacity-80 z-0">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 40 Q 50 10 90 40 T 160 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path d="M20 70 Q 50 40 90 70 T 160 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path d="M20 100 Q 50 70 90 100 T 160 100" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
            </div>

            {/* Floating Paper - Tilted */}
            <div className="relative z-10 w-[90%] max-w-[340px] aspect-[1/1.414] bg-white rounded-lg shadow-2xl flex flex-col p-6 md:p-8 transform rotate-[-3deg] border border-neutral-100 origin-center transition-transform hover:rotate-0 duration-500 will-change-transform">

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-[#FFD700] text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-20 animate-pulse">
                    <span className="text-sm">✨</span> Enhance with AI
                </div>

                {/* Resume Header */}
                <div className="flex gap-5 border-b border-neutral-100 pb-5 mb-5 items-center">
                    <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-white shadow-md ring-1 ring-neutral-100">
                        <Image
                            src="/images/samya-profile.jpg"
                            alt="Samya Deb Biswas"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-neutral-900 uppercase tracking-tight leading-tight">SAMYA DEB BISWAS</h3>
                        <div className="text-[10px] text-neutral-500 mt-1 space-y-0.5">
                            <p>New Delhi, India • +91 98765 43210</p>
                            <p>samya.biswas@example.com</p>
                        </div>
                    </div>
                </div>

                {/* Resume Body */}
                <div className="flex-1 space-y-5">

                    {/* Summary */}
                    <div className="space-y-1.5">
                        <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Professional Summary</h4>
                        <div className="space-y-1">
                            <div className="h-2 w-full bg-neutral-100 rounded-sm"></div>
                            <div className="h-2 w-[95%] bg-neutral-100 rounded-sm"></div>
                            <div className="h-2 w-[90%] bg-neutral-100 rounded-sm"></div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-2">
                        <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Skills</h4>
                        <div className="flex flex-wrap gap-1.5">
                            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'AI Integration'].map((skill, i) => (
                                <span key={i} className="px-2 py-0.5 bg-neutral-50 border border-neutral-100 text-[9px] text-neutral-600 rounded-md font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="space-y-3">
                        <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Work Experience</h4>

                        <div className="pl-2 border-l-2 border-blue-50 space-y-1">
                            <div className="flex justify-between items-baseline mb-1">
                                <div className="h-2.5 w-24 bg-neutral-200 rounded-sm"></div>
                                <div className="h-2 w-12 bg-neutral-100 rounded-sm"></div>
                            </div>
                            <div className="h-2 w-full bg-neutral-50 rounded-sm"></div>
                            <div className="h-2 w-full bg-neutral-50 rounded-sm"></div>
                            <div className="h-2 w-[80%] bg-neutral-50 rounded-sm"></div>
                        </div>

                        <div className="pl-2 border-l-2 border-blue-50 space-y-1">
                            <div className="flex justify-between items-baseline mb-1">
                                <div className="h-2.5 w-20 bg-neutral-200 rounded-sm"></div>
                                <div className="h-2 w-12 bg-neutral-100 rounded-sm"></div>
                            </div>
                            <div className="h-2 w-full bg-neutral-50 rounded-sm"></div>
                            <div className="h-2 w-[85%] bg-neutral-50 rounded-sm"></div>
                        </div>
                    </div>

                </div>

                {/* AI Suggestions Overlay Effect */}
                <div className="absolute top-1/2 right-[-10px] translate-x-0 space-y-2 pointer-events-none z-30">
                    <div className="bg-white px-3 py-2 rounded-lg shadow-xl border border-blue-100 flex items-center gap-2 animate-bounce">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] font-semibold text-neutral-700">Resume Score: 98/100</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
