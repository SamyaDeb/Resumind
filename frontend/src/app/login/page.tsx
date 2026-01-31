"use client";

import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

export default function LoginPage() {
    const { signInWithGoogle, loading } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center relative z-20">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-neutral-200 mb-8">Sign in to continue building your resume</p>

                <button
                    onClick={signInWithGoogle}
                    disabled={loading}
                    className="w-full bg-white text-gray-800 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-3 shadow-md"
                >
                    {loading ? (
                        <span>Loading...</span>
                    ) : (
                        <>
                            <Image
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google"
                                width={20}
                                height={20}
                            />
                            <span>Sign in with Google</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
