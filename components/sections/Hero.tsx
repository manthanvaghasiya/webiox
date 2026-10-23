'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Zap, ShieldCheck, Activity } from 'lucide-react';
import HeroBackground from './HeroBackground';
import EcosystemBentoGrid from './EcosystemBentoGrid';

const ROTATING_SERVICES = [
  'Web Platforms',
  'Mobile Apps',
  'Custom Software',
  'AI Workflows',
];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % ROTATING_SERVICES.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[calc(100vh-76px)] bg-[#FCFCFD] text-[#090D15] flex flex-col justify-between overflow-hidden selection:bg-[#377a9b] selection:text-white">

      {/* ═══════════════════════════════════════════════════════════════════════════
          LAYER 1: LIVING BACKGROUND MESH, AURORA ORBS, CONCENTRIC RINGS & GRAIN
         ═══════════════════════════════════════════════════════════════════════════ */}
      <HeroBackground />

      {/* ═══════════════════════════════════════════════════════════════════════════
          MAIN STAGE: LAYER 2 (TYPOGRAPHY) + LAYER 3 (ARCHITECTURE CANVAS)
         ═══════════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[110px] sm:pt-[126px] md:pt-[134px] pb-2 sm:pb-3 flex-1 flex flex-col items-center justify-start text-center">

        {/* ── 0. Authority Status Eyebrow Badge ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/95 border border-slate-200/90 shadow-2xs text-[10px] sm:text-[11px] font-mono font-bold text-[#377a9b] mb-4 backdrop-blur-md hover:border-[#377a9b]/50 transition-colors max-w-full text-center"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="uppercase tracking-wider">TOP-TIER DIGITAL ENGINEERING STUDIO</span>
          <span className="text-slate-300 hidden xs:inline">•</span>
          <span className="text-slate-600 font-medium">Q4 SPRINT SLOTS OPEN</span>
        </motion.div>

        {/* ── Dynamic Kinetic Heading (Smooth Vertical Word Rotator - Painted instantly for LCP) ── */}
        <div className="w-full max-w-5xl mx-auto mb-4 px-2">
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[28px] xs:text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] leading-[1.18] tracking-[-0.025em] text-[#0F172A] text-center [text-wrap:balance]">
            <span className="inline-block">Developing</span>{' '}
            <span className="inline-flex justify-center min-w-[142px] xs:min-w-[170px] sm:min-w-[240px] md:min-w-[305px] relative h-[1.22em] overflow-hidden align-top text-[#377a9b]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={currentWordIndex}
                  initial={{ y: 32, opacity: 0, filter: 'blur(3px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -32, opacity: 0, filter: 'blur(3px)' }}
                  transition={{
                    y: { type: 'spring', stiffness: 320, damping: 26 },
                    opacity: { duration: 0.2 },
                    filter: { duration: 0.16 },
                  }}
                  className="inline-block whitespace-nowrap bg-gradient-to-r from-[#377a9b] via-[#377a9b] to-[#0ea5e9] bg-clip-text text-transparent px-1"
                >
                  {ROTATING_SERVICES[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            <span className="inline-block mt-0.5 sm:mt-1">
              for{' '}
              <span className="text-[#0F172A] relative inline-block">
                Industry Leaders.
                <svg
                  className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-2 text-[#ffc312]"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 0, 100 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
          </h1>
        </div>

        {/* ── 3. Two-Tier Strategic Subheadline (Punchy Bold + Supporting Context - Painted instantly for LCP) ── */}
        {/* ── 3. Two-Tier Strategic Subheadline (Punchy Bold + Supporting Context) ── */}
        <div className="max-w-2xl mx-auto mb-6 sm:mb-8 text-center px-2">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-sm xs:text-base sm:text-lg md:text-[19px] text-[#1E293B] leading-snug mb-2 sm:mb-3">
            Engineering high-performance web platforms, mobile apps & enterprise software.
          </h2>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-xs sm:text-[14.5px] text-[#64748B] leading-relaxed hidden sm:block">
            Whether you&apos;re already an industry leader or striving to become one — connect with us. We build high-impact web platforms, modernize your digital profile, and engineer the technology that turns your business into a market leader.
          </p>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-xs text-[#64748B] leading-relaxed sm:hidden">
            We partner with visionary founders to engineer custom digital flagships, native mobile apps, and autonomous AI systems designed to scale.
          </p>
        </div>

        {/* ── 4. High-Converting CTA Area: Get a Free Consultation + Doodle Arrow + Badge ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.14 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full max-w-sm sm:max-w-none"
        >
          {/* Main Action Button (Full width on tiny mobile, 48px min touch target) */}
          <Link href="/contact" className="group w-full xs:w-auto">
            <motion.button
              whileHover={{ scale: 1.025, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full xs:w-auto min-h-[50px] px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#377a9b] hover:bg-[#2b6683] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-[15px] tracking-wide shadow-[0_10px_30px_-5px_rgba(55,122,155,0.45)] hover:shadow-[0_14px_38px_-4px_rgba(55,122,155,0.55)] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98]"
            >
              <span>Get a Free Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </Link>

          {/* Curved Doodle Arrow (Hidden on mobile) */}
          <div aria-hidden="true" className="hidden sm:flex items-center text-slate-400 select-none pointer-events-none">
            <svg
              width="44"
              height="24"
              viewBox="0 0 44 24"
              fill="none"
              className="text-[#377a9b]/50"
            >
              <path
                d="M2 18 C 14 24, 28 20, 38 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeDasharray="3 3"
                strokeLinecap="round"
              />
              <path
                d="M32 5 L 39 6 L 37 13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Trust Reassurance Pill Badge */}
          <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50/90 border border-emerald-300/80 text-emerald-800 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-semibold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Takes just 2-3 minutes</span>
            <span className="text-emerald-400">•</span>
            <span className="text-emerald-700 font-bold">100% Free</span>
          </div>
        </motion.div>

        {/* ── 5. Velocity Metrics Strip (Native App Segmented Capsule on Mobile, Floating Pills on Desktop) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="w-full max-w-sm sm:max-w-none mb-3 sm:mb-4"
        >
          {/* Mobile: Integrated 3-Segment Capsule (Native iOS / Flutter widget aesthetics) */}
          <div className="sm:hidden grid grid-cols-3 divide-x divide-slate-200/80 rounded-2xl bg-white/95 border border-slate-200/90 shadow-xs py-2.5 px-1 text-center">
            <div className="flex flex-col items-center justify-center px-1">
              <div className="flex items-center gap-1 mb-0.5">
                <Zap className="w-3 h-3 text-[#377a9b]" />
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xs text-[#0F172A] leading-tight">3–6 Wks</span>
              </div>
              <span className="text-[8.5px] font-mono text-slate-500 uppercase tracking-wider">MVP Launch</span>
            </div>

            <div className="flex flex-col items-center justify-center px-1">
              <div className="flex items-center gap-1 mb-0.5">
                <ShieldCheck className="w-3 h-3 text-[#ffc312]" />
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xs text-[#ffc312] leading-tight">100%</span>
              </div>
              <span className="text-[8.5px] font-mono text-slate-500 uppercase tracking-wider">Escrow SLA</span>
            </div>

            <div className="flex flex-col items-center justify-center px-1">
              <div className="flex items-center gap-1 mb-0.5">
                <Activity className="w-3 h-3 text-[#377a9b]" />
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xs text-[#377a9b] leading-tight">99+</span>
              </div>
              <span className="text-[8.5px] font-mono text-slate-500 uppercase tracking-wider">Core Vitals</span>
            </div>
          </div>

          {/* Desktop & Tablet (>= 640px): Floating Specular Pills */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-4 text-left">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/95 border border-slate-200/90 shadow-2xs backdrop-blur-xs hover:border-[#377a9b]/50 transition-colors">
              <Zap className="w-4 h-4 text-[#377a9b] shrink-0" />
              <div>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-sm text-[#0F172A] leading-tight">3–6 Wks</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">MVP Launch</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/95 border border-slate-200/90 shadow-2xs backdrop-blur-xs hover:border-[#ffc312]/70 transition-colors">
              <ShieldCheck className="w-4 h-4 text-[#ffc312] shrink-0" />
              <div>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-sm text-[#ffc312] leading-tight">100%</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Milestone Lock</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/95 border border-slate-200/90 shadow-2xs backdrop-blur-xs hover:border-[#377a9b]/50 transition-colors">
              <Activity className="w-4 h-4 text-[#377a9b] shrink-0" />
              <div>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-sm text-[#377a9b] leading-tight">99+</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Core Vitals</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════════
          LAYER 3: THE FOREGROUND ECOSYSTEM BENTO GRID [ EXPANDED ULTRA-WIDE CANVAS ]
         ═══════════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
        <EcosystemBentoGrid />
      </div>

    </section>
  );
}
