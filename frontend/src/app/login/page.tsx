"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Navbar from '@/components/Navbar';

type AuthMode = 'signin' | 'signup' | 'magiclink';

export default function LoginPage() {
    const { signInWithGoogle, signInWithEmail, signUpWithEmail, sendMagicLink, signInWithMagicLink, loading, user } = useAuth();
    const router = useRouter();

    const [mode, setMode] = useState<AuthMode>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        if (!loading && user) {
            router.push('/builder');
        }
    }, [user, loading, router]);

    // Check for magic link finish
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const emailForSignIn = window.localStorage.getItem('emailForSignIn');
            if (emailForSignIn && window.location.href.includes('apiKey')) {
                // Verify magic link
                const finishMagicLink = async () => {
                    setIsLoading(true);
                    try {
                        await signInWithMagicLink(emailForSignIn, window.location.href);
                        toast.success("Successfully verified!");
                    } catch (err: any) {
                        toast.error(err.message || "Failed to verify magic link");
                    } finally {
                        setIsLoading(false);
                    }
                };
                finishMagicLink();
            }
        }
    }, [signInWithMagicLink]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (mode === 'signin') {
                await signInWithEmail(email, password);
                toast.success("Welcome back!");
            } else if (mode === 'signup') {
                await signUpWithEmail(email, password);
                toast.success("Account created successfully!");
            } else if (mode === 'magiclink') {
                await sendMagicLink(email);
                toast.success("Login link sent to your email!");
            }
        } catch (error: any) {
            console.error(error);
            let msg = "Authentication failed";
            if (error.code === 'auth/invalid-email') msg = "Invalid email address";
            if (error.code === 'auth/user-not-found') msg = "No account found with this email";
            if (error.code === 'auth/wrong-password') msg = "Incorrect password";
            if (error.code === 'auth/email-already-in-use') msg = "Email already in use";
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative z-20 px-4">
            <Navbar />
            {/* Background elements if any are handled by layout */}

            <div className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-700/50 p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                        {mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Magic Link'}
                    </h1>
                    <p className="text-neutral-400">
                        {mode === 'signin' ? 'Sign in to access your dashboard' :
                            mode === 'signup' ? 'Start building your professional resume' :
                                'We\'ll email you a link to sign in instantly'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-neutral-300 ml-1">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-neutral-500 group-focus-within:text-purple-400 transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full bg-neutral-800/50 border border-neutral-700 text-white pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all placeholder:text-neutral-600"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input (Hidden for Magic Link) */}
                    {mode !== 'magiclink' && (
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-neutral-300 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-neutral-500 group-focus-within:text-purple-400 transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-neutral-800/50 border border-neutral-700 text-white pl-10 pr-10 py-2.5 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all placeholder:text-neutral-600"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-neutral-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading || loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-2.5 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                        {isLoading ? (
                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Link'}
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-neutral-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-3 bg-[#111] text-neutral-400 uppercase tracking-widest text-xs font-semibold">Or continue with</span>
                    </div>
                </div>

                {/* Google Sign In */}
                <button
                    onClick={signInWithGoogle}
                    disabled={loading || isLoading}
                    className="w-full bg-white text-gray-900 hover:bg-neutral-100 font-semibold py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-3 shadow-md mb-6"
                >
                    <Image
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        width={20}
                        height={20}
                    />
                    <span>Google</span>
                </button>

                {/* Footer Links */}
                <div className="text-center space-y-3">
                    {mode === 'signin' && (
                        <>
                            <p className="text-neutral-400 text-sm">
                                Don't have an account?{' '}
                                <button onClick={() => setMode('signup')} className="text-purple-400 hover:text-purple-300 font-medium hover:underline">
                                    Sign up
                                </button>
                            </p>
                            <button onClick={() => setMode('magiclink')} className="text-neutral-500 hover:text-white text-xs transition-colors">
                                Forgot password? Login with Magic Link
                            </button>
                        </>
                    )}

                    {mode === 'signup' && (
                        <p className="text-neutral-400 text-sm">
                            Already have an account?{' '}
                            <button onClick={() => setMode('signin')} className="text-purple-400 hover:text-purple-300 font-medium hover:underline">
                                Sign in
                            </button>
                        </p>
                    )}

                    {mode === 'magiclink' && (
                        <button onClick={() => setMode('signin')} className="text-purple-400 hover:text-purple-300 font-medium text-sm hover:underline">
                            Back to Sign In
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
