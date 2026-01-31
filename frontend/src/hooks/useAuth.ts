"use client";

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import {
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut as firebaseSignOut,
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

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            router.push('/');
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return { user, loading, signInWithGoogle, signOut };
}
