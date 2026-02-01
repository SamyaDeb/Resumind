"use client";

import Link from 'next/link';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';
import MarketingCard from '@/components/landing/MarketingCard';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import HeroCard from '@/components/landing/HeroCard';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="w-full h-screen text-white overflow-hidden font-sans relative">
      <Navbar />
      <div className="relative z-10 w-full h-full">

        <ScrollStack
          itemDistance={50}
          itemScale={0}
          rotationAmount={0}
          stackPosition="25%"
          className="bg-transparent"
        >
          <ScrollStackItem itemClassName="w-[95%] md:w-[85%] mx-auto aspect-video bg-white text-black border border-neutral-200 !h-auto !p-0 overflow-hidden">
            <HeroCard />
          </ScrollStackItem>

          <ScrollStackItem itemClassName="w-[95%] md:w-[85%] mx-auto aspect-video bg-white text-black border border-neutral-200 !h-auto !p-0 overflow-hidden">
            <MarketingCard />
          </ScrollStackItem>

          <ScrollStackItem itemClassName="w-[95%] md:w-[85%] mx-auto aspect-video bg-white text-black border border-neutral-200 !h-auto !p-0 overflow-hidden">
            <FeaturesGrid />
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </main>
  );
}
