"use client";

import LiquidEther from '@/components/LiquidEther';

// Define colors outside component to prevent re-creation on every render
const COLORS = ['#5227FF', '#FF9FFC', '#B19EEF'];

export default function LiquidBackground() {
    // Static background, no need to track pathname
    const showBackground = true;

    if (!showBackground) return null;

    return (
        <div
            className="fixed top-0 left-0 z-0 pointer-events-none"
            style={{ width: '100vw', height: '100vh' }}
        >
            <LiquidEther
                colors={COLORS}
                mouseForce={20}
                autoIntensity={1.5}
            />
        </div>
    );
}
