"use client";

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import {
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut as firebaseSignOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
    User
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            router.push('/builder');
        } catch (error) {
            console.error("Error signing in with Google", error);
            throw error;
        }
    };

    const signInWithEmail = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/builder');
        } catch (error) {
            console.error("Error signing in with Email", error);
            throw error;
        }
    };

    const signUpWithEmail = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/builder');
        } catch (error) {
            console.error("Error signing up with Email", error);
            throw error;
        }
    };

    const sendMagicLink = async (email: string) => {
        try {
            const actionCodeSettings = {
                url: window.location.origin + '/login?finishSignUp=true',
                handleCodeInApp: true,
            };
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email);
        } catch (error) {
            console.error("Error sending magic link", error);
            throw error;
        }
    };

    const signInWithMagicLink = async (email: string, href: string) => {
        try {
            if (isSignInWithEmailLink(auth, href)) {
                await signInWithEmailLink(auth, email, href);
                window.localStorage.removeItem('emailForSignIn');
                router.push('/builder');
            }
        } catch (error) {
            console.error("Error signing in with magic link", error);
            throw error;
        }
    }

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            router.push('/');
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return {
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        sendMagicLink,
        signInWithMagicLink,
        signOut
    };
}
