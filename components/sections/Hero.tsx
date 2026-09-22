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
    <section className="relative w-full min-h-[calc(100vh-76px)] bg-[#FCFCFD] text-[#090D15] flex flex-col justify-between overflow-hidden selection:bg-[#1a7097] selection:text-white">

      {/* ═══════════════════════════════════════════════════════════════════════════
          LAYER 1: LIVING BACKGROUND MESH, AURORA ORBS, CONCENTRIC RINGS & GRAIN
         ═══════════════════════════════════════════════════════════════════════════ */}
      <HeroBackground />

      {/* ═══════════════════════════════════════════════════════════════════════════
          MAIN STAGE: LAYER 2 (TYPOGRAPHY) + LAYER 3 (ARCHITECTURE CANVAS)
         ═══════════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[110px] sm:pt-[126px] md:pt-[134px] pb-2 sm:pb-3 flex-1 flex flex-col items-center justify-start text-center">

        {/* ── Dynamic Kinetic Heading (Smooth Vertical Word Rotator) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="w-full max-w-5xl mx-auto mb-4 px-2"
        >
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] leading-[1.18] tracking-[-0.025em] text-[#0F172A] text-center [text-wrap:balance]">
            <span className="inline-block">Developing</span>{' '}
            <span className="inline-flex relative h-[1.22em] overflow-hidden align-top text-[#1a7097] min-w-[210px] sm:min-w-[280px] md:min-w-[360px] lg:min-w-[420px] justify-center text-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ y: 40, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -40, opacity: 0, filter: 'blur(4px)' }}
                  transition={{
                    y: { type: 'spring', stiffness: 320, damping: 26 },
                    opacity: { duration: 0.22 },
                    filter: { duration: 0.18 },
                  }}
                  className="inline-block whitespace-nowrap bg-gradient-to-r from-[#1a7097] via-[#1f82af] to-[#0ea5e9] bg-clip-text text-transparent"
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
                  className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-2 text-[#E7B900]"
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
        </motion.div>

        {/* ── 3. Two-Tier Strategic Subheadline (Punchy Bold + Supporting Context) ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="max-w-2xl mx-auto mb-7 sm:mb-8 text-center px-2"
        >
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-base sm:text-lg md:text-[19px] text-[#1E293B] leading-snug mb-2">
            Engineering high-performance web development platforms, mobile apps, and custom software.
          </h2>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-xs sm:text-[14.5px] text-[#64748B] leading-relaxed">
            Full-cycle engineering squads that take products from zero to production at startup speed — with fixed-scope milestone deliverables and zero scope creep.
          </p>
        </motion.div>

        {/* ── 4. High-Converting CTA Area: Get a Free Consultation + Doodle Arrow + Badge (Exact Image 1 & 2 Match) ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-9 w-full"
        >
          {/* Main Action Button */}
          <Link href="/contact" className="group">
            <motion.button
              whileHover={{ scale: 1.025, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#1a7097] hover:bg-[#145b7c] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-[15px] tracking-wide shadow-[0_10px_30px_-5px_rgba(26,112,151,0.45)] hover:shadow-[0_14px_38px_-4px_rgba(26,112,151,0.55)] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Get a Free Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </Link>

          {/* Curved Doodle Arrow (from Reference Image 1) */}
          <div className="hidden sm:flex items-center text-slate-400">
            <svg
              width="44"
              height="24"
              viewBox="0 0 44 24"
              fill="none"
              className="text-[#1a7097]/50"
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

          {/* Trust Reassurance Pill Badge (from Reference Image 1 & 2) */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50/90 border border-emerald-300/80 text-emerald-800 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-semibold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Takes just 2-3 minutes</span>
            <span className="text-emerald-400">•</span>
            <span className="text-emerald-700 font-bold">100% Free</span>
          </div>
        </motion.div>

        {/* ── 5. Velocity Metrics Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-2 sm:mb-3 text-left"
        >
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/95 border border-slate-200/90 shadow-2xs backdrop-blur-xs hover:border-[#1a7097]/50 transition-colors">
            <Zap className="w-4 h-4 text-[#1a7097]" />
            <div>
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-sm text-[#0F172A]">3–6 Weeks</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">MVP Delivery</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/95 border border-slate-200/90 shadow-2xs backdrop-blur-xs hover:border-[#E7B900]/70 transition-colors">
            <ShieldCheck className="w-4 h-4 text-[#E7B900]" />
            <div>
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-sm text-[#E7B900]">100%</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Milestone Lock</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/95 border border-slate-200/90 shadow-2xs backdrop-blur-xs hover:border-[#1a7097]/50 transition-colors">
            <Activity className="w-4 h-4 text-[#1a7097]" />
            <div>
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-sm text-[#1a7097]">99+</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Core Web Vitals</div>
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
