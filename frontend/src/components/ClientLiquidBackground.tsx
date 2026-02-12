"use client";

import dynamic from 'next/dynamic';

const LiquidBackground = dynamic(() => import('@/components/LiquidBackground'), {
  ssr: false,
});

export default function ClientLiquidBackground() {
  return <LiquidBackground />;
}
