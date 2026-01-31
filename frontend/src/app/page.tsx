import Link from 'next/link';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';
import MarketingCard from '@/components/landing/MarketingCard';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import HeroCard from '@/components/landing/HeroCard';

export default function Home() {
  return (
    <main className="w-full h-screen text-white overflow-hidden font-sans relative">

      <div className="relative z-10 w-full h-full">
        <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center bg-transparent pointer-events-none mix-blend-difference text-white">
          <h1 className="text-2xl font-bold tracking-tighter">Resumind.AI</h1>
          <Link
            href="/builder"
            className="bg-white text-black px-6 py-2 rounded-full font-medium pointer-events-auto hover:bg-neutral-200 transition-colors"
          >
            Get Started
          </Link>
        </nav>

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
