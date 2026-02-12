"use client";
import React, { useState } from 'react';
import { Download, Wand2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DownloadButton({ templateId, data, onOptimize }: any) {
    const [loading, setLoading] = useState(false);
    const [optimizing, setOptimizing] = useState(false);

    const handleDownload = async (optimize: boolean = false) => {
        if (optimize) setOptimizing(true);
        else setLoading(true);

        const toastId = toast.loading(optimize ? 'Optimizing & Compiling PDF...' : 'Compiling PDF...');

        try {
            const endpoint = optimize ? '/api/resume/optimize-and-download' : '/api/resume/download';
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
            const response = await fetch(`${apiUrl}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ templateId, data })
            });

            if (!response.ok) throw new Error('Compilation failed');

            // Check for optimized data in headers if we optimized
            if (optimize) {
                const optimizedDataHeader = response.headers.get('X-Optimized-Data');
                if (optimizedDataHeader && onOptimize) {
                    try {
                        const optimizedData = JSON.parse(optimizedDataHeader);
                        onOptimize(optimizedData);
                    } catch (e) { console.error('Failed to parse optimized data', e); }
                }
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = optimize ? `resume_optimized.pdf` : `resume.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast.success(optimize ? 'Resume Optimized & Downloaded!' : 'Download ready!', { id: toastId });
        } catch (e) {
            toast.error('Failed to process PDF', { id: toastId });
        } finally {
            if (optimize) setOptimizing(false);
            else setLoading(false);
        }
    };

    return (
        <div className="flex gap-4">
            <button
                onClick={() => handleDownload(false)}
                disabled={loading || optimizing}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium disabled:opacity-50"
            >
                <Download size={20} />
                {loading ? 'Compiling...' : 'Download PDF'}
            </button>

            <button
                onClick={() => handleDownload(true)}
                disabled={loading || optimizing}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 shadow-lg"
            >
                <Wand2 size={20} />
                {optimizing ? 'AI Magic Working...' : 'AI Optimize & Download'}
            </button>
        </div>
    );
}
