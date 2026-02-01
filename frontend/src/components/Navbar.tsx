"use client";

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { user, loading, signOut } = useAuth();

  return (
    <nav className="absolute top-0 left-0 w-full p-8 z-50 flex justify-between items-center bg-transparent pointer-events-none mix-blend-difference text-white">
      <Link href="/" className="pointer-events-auto hover:opacity-80 transition-opacity">
        <h1 className="text-2xl font-bold tracking-tighter">Resumind.AI</h1>
      </Link>

      {!loading && (
        user ? (
          <div className="flex gap-4 pointer-events-auto">
            <button
              onClick={signOut}
              style={{
                '--spread': '90deg',
                '--shimmer-color': '#ffffff',
                '--radius': '100px',
                '--speed': '3s',
                '--cut': '0.05em',
                '--bg': 'rgba(0, 0, 0, 1)'
              } as React.CSSProperties}
              className="group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px"
            >
              <div className="-z-30 blur-[2px] absolute inset-0 overflow-visible [container-type:size]">
                <div className="absolute inset-0 h-[100cqh] [aspect-ratio:1] [border-radius:0] [mask:none]">
                  <div className="absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]"></div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
                <div className="absolute aspect-square bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent animate-border-beam" style={{ width: '40px', offsetPath: 'rect(0px auto auto 0px round 40px)', '--color-from': '#8b5cf6', '--color-to': '#7c3aed', offsetDistance: '0%' } as React.CSSProperties}></div>
              </div>
              Logout
              <div className="insert-0 absolute size-full rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f] transform-gpu transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"></div>
              <div className="absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]"></div>
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="pointer-events-auto"
          >
            <button
              style={{
                '--spread': '90deg',
                '--shimmer-color': '#ffffff',
                '--radius': '100px',
                '--speed': '3s',
                '--cut': '0.05em',
                '--bg': 'rgba(0, 0, 0, 1)'
              } as React.CSSProperties}
              className="group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px"
            >
              <div className="-z-30 blur-[2px] absolute inset-0 overflow-visible [container-type:size]">
                <div className="absolute inset-0 h-[100cqh] [aspect-ratio:1] [border-radius:0] [mask:none]">
                  <div className="absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]"></div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
                <div className="absolute aspect-square bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent animate-border-beam" style={{ width: '40px', offsetPath: 'rect(0px auto auto 0px round 40px)', '--color-from': '#8b5cf6', '--color-to': '#7c3aed', offsetDistance: '0%' } as React.CSSProperties}></div>
              </div>
              Login/Signup
              <div className="insert-0 absolute size-full rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f] transform-gpu transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"></div>
              <div className="absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]"></div>
            </button>
          </Link>
        )
      )}
    </nav>
  );
}
