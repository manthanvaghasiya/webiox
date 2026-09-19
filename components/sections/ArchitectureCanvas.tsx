'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Globe,
  Smartphone,
  Layers,
  Sparkles,
  CheckCircle2,
  Zap,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   ABSTRACT VECTOR VISUALS (Brand-Aligned & Tailored for Bento Box Hierarchy)
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * Block 1 Visual: Minimalist, abstract wireframe of a landing page
 * Uses --brand-blue tints, --accent-teal accents, and crisp architectural layout.
 */
function WebPlatformWireframe() {
  return (
    <div className="relative w-full rounded-xl bg-gradient-to-b from-[#F9FAFB] to-white border border-[rgba(26,112,151,0.14)] p-3 sm:p-3.5 overflow-hidden shadow-[inset_0_1px_3px_rgba(26,112,151,0.04)]">
      {/* Subtle Blueprint Mesh Lines */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1a7097 1px, transparent 1px), linear-gradient(to right, #1a7097 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />

      {/* Browser Chrome Header */}
      <div className="relative z-10 flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200/70">
        {/* 3 Micro Window Controls */}
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-300/80" />
          <span className="w-2 h-2 rounded-full bg-slate-200" />
          <span className="w-2 h-2 rounded-full bg-slate-200" />
        </div>

        {/* Minimalist URL / Search Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-slate-200/80 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0f7a81]" />
          <span className="text-[9px] font-mono font-medium text-slate-500 tracking-tight">
            webiox.tech/platform
          </span>
        </div>

        {/* Sub-Second Live Indicator */}
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#0f7a81]/10 text-[#0f7a81] text-[9px] font-mono font-semibold">
          <Zap className="w-2.5 h-2.5 text-[#0f7a81]" />
          <span>0.38s</span>
        </div>
      </div>

      {/* Landing Page Content Wireframe */}
      <div className="relative z-10 space-y-2.5">
        {/* Navigation Bar Skeleton */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-[#1a7097]/20 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-xs bg-[#1a7097]" />
            </span>
            <div className="w-10 h-1.5 rounded-full bg-slate-300/70" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1.5 rounded-full bg-slate-200 hidden sm:block" />
            <div className="w-8 h-1.5 rounded-full bg-slate-200 hidden sm:block" />
            <div className="w-12 h-3 rounded-full bg-[#1a7097]/15 border border-[#1a7097]/30 flex items-center justify-center">
              <div className="w-6 h-1 rounded-full bg-[#1a7097]" />
            </div>
          </div>
        </div>

        {/* Hero Section Wireframe: 2 Columns */}
        <div className="grid grid-cols-12 gap-2 pt-1">
          {/* Left Column: Headline Skeletons & CTAs */}
          <div className="col-span-7 space-y-1.5 self-center">
            <div className="w-full h-2.5 rounded bg-slate-800/80" />
            <div className="w-4/5 h-2 rounded bg-slate-300" />
            <div className="w-3/5 h-1.5 rounded bg-slate-200" />
            <div className="pt-1 flex items-center gap-1.5">
              <div className="w-14 h-3.5 rounded-full bg-[#1a7097] flex items-center justify-center shadow-xs">
                <div className="w-8 h-1 rounded-full bg-white/90" />
              </div>
              <div className="w-10 h-3.5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                <div className="w-6 h-1 rounded-full bg-slate-400" />
              </div>
            </div>
          </div>

          {/* Right Column: Speed & Telemetry Card */}
          <div className="col-span-5 rounded-lg bg-white border border-[#1a7097]/20 p-2 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono uppercase text-slate-400 font-semibold">
                TTFB
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0f7a81] animate-pulse" />
            </div>
            <div className="my-1">
              <div className="text-[13px] font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[#090D16] tracking-tight leading-none">
                78<span className="text-[9px] font-normal text-slate-500">ms</span>
              </div>
              <div className="text-[8px] font-mono text-[#0f7a81] font-semibold mt-0.5">
                99.9% Core Web Vital
              </div>
            </div>
            {/* Mini Progress Spark Wave */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[96%] h-full bg-gradient-to-r from-[#1a7097] to-[#0f7a81] rounded-full" />
            </div>
          </div>
        </div>

        {/* 3 Modular Feature Blocks Skeleton */}
        <div className="grid grid-cols-3 gap-1.5 pt-0.5">
          <div className="p-1.5 rounded-md bg-white border border-slate-200/70">
            <div className="w-2.5 h-2.5 rounded bg-[#1a7097]/15 mb-1" />
            <div className="w-full h-1 rounded bg-slate-300 mb-0.5" />
            <div className="w-2/3 h-1 rounded bg-slate-200" />
          </div>
          <div className="p-1.5 rounded-md bg-white border border-slate-200/70">
            <div className="w-2.5 h-2.5 rounded bg-[#0f7a81]/15 mb-1" />
            <div className="w-full h-1 rounded bg-slate-300 mb-0.5" />
            <div className="w-2/3 h-1 rounded bg-slate-200" />
          </div>
          <div className="p-1.5 rounded-md bg-white border border-slate-200/70">
            <div className="w-2.5 h-2.5 rounded bg-[#FFBF00]/20 mb-1" />
            <div className="w-full h-1 rounded bg-slate-300 mb-0.5" />
            <div className="w-2/3 h-1 rounded bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Block 2 Visual: Two overlapping, minimalist mobile device outlines
 * Uses crisp SVG contours with iOS & Android wireframe UI cues and accent teal dots.
 */
function MobileDevicesVisual() {
  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 flex items-center justify-center">
      {/* Ambient Backdrop Bloom */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0f7a81]/10 via-[#1a7097]/5 to-transparent rounded-full blur-xl pointer-events-none" />

      {/* Device 1: Back Phone (Android / Secondary) */}
      <div className="absolute right-0.5 top-0 w-14 h-22 sm:w-16 sm:h-24 rounded-[12px] bg-slate-50 border border-[rgba(26,112,151,0.22)] shadow-xs p-1 transform rotate-3 transition-transform duration-300 group-hover:rotate-6">
        <div className="w-full h-full rounded-[8px] bg-white border border-slate-100 p-1 flex flex-col justify-between">
          <div className="flex items-center justify-center">
            <div className="w-3.5 h-0.5 rounded-full bg-slate-300" />
          </div>
          <div className="space-y-1">
            <div className="w-full h-1.5 rounded bg-slate-200" />
            <div className="w-3/4 h-1.5 rounded bg-slate-100" />
          </div>
          <div className="w-3 h-3 rounded-full bg-[#1a7097]/15 self-end" />
        </div>
      </div>

      {/* Device 2: Front Phone (iOS / Primary) */}
      <div className="absolute left-0.5 bottom-0 w-14 h-22 sm:w-16 sm:h-24 rounded-[12px] bg-white border-2 border-[#1a7097] shadow-[0_8px_20px_-6px_rgba(26,112,151,0.18)] p-1 transform -rotate-2 transition-transform duration-300 group-hover:-rotate-4">
        <div className="w-full h-full rounded-[8px] bg-gradient-to-b from-[#F9FAFB] to-white p-1 flex flex-col justify-between">
          {/* Dynamic Island Notch Pill */}
          <div className="flex items-center justify-center">
            <div className="w-4 h-1 rounded-full bg-slate-800 flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-[#0f7a81]" />
            </div>
          </div>

          {/* Micro App Interface */}
          <div className="space-y-1 my-auto">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0f7a81]/25 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#0f7a81]" />
              </div>
              <div className="w-5 h-1 rounded-full bg-slate-400" />
            </div>
            <div className="w-full h-2 rounded bg-[#1a7097]/15 border border-[#1a7097]/25" />
            <div className="w-4/5 h-1.5 rounded bg-slate-200" />
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="flex items-center justify-center pt-0.5">
            <div className="w-5 h-0.5 rounded-full bg-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Block 3 Visual: A clean, abstract dashboard grid
 * Clean, structured enterprise architecture matrix with KPI metrics and trend lines.
 */
function DashboardGridVisual() {
  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 flex items-center justify-center">
      <div className="w-full h-full rounded-xl bg-gradient-to-b from-[#F9FAFB] to-white border border-[rgba(26,112,151,0.16)] p-2 shadow-xs flex flex-col justify-between">
        {/* Top Header Strip with Live Status */}
        <div className="flex items-center justify-between border-b border-slate-200/70 pb-1">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-xs bg-[#1a7097]" />
            <div className="w-8 h-1 rounded-full bg-slate-300" />
          </div>
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0f7a81] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0f7a81]" />
          </span>
        </div>

        {/* 2 Micro KPI Cards */}
        <div className="grid grid-cols-2 gap-1 my-1">
          <div className="rounded bg-white border border-slate-200/80 p-1 flex flex-col justify-between">
            <div className="w-4 h-1 rounded bg-slate-300" />
            <div className="text-[9px] font-mono font-bold text-[#090D16] mt-0.5">
              99.99%
            </div>
          </div>
          <div className="rounded bg-[#0f7a81]/10 border border-[#0f7a81]/25 p-1 flex flex-col justify-between">
            <div className="w-4 h-1 rounded bg-[#0f7a81]/60" />
            <div className="text-[9px] font-mono font-bold text-[#0f7a81] mt-0.5">
              SOC-2
            </div>
          </div>
        </div>

        {/* Mini Bar Chart / Data Grid Matrix */}
        <div className="flex items-end justify-between gap-1 h-5 pt-1 px-1 border-t border-slate-100">
          <div className="w-2 h-2 rounded-t-xs bg-[#1a7097]/25" />
          <div className="w-2 h-3.5 rounded-t-xs bg-[#1a7097]/40" />
          <div className="w-2 h-2.5 rounded-t-xs bg-[#1a7097]/60" />
          <div className="w-2 h-4.5 rounded-t-xs bg-[#1a7097]" />
          <div className="w-2 h-3 rounded-t-xs bg-[#0f7a81]" />
        </div>
      </div>
    </div>
  );
}

/**
 * Block 4 Visual: Subtle glowing spark & workflow connection line
 * Features --brand-yellow (#FFBF00) sparingly for the glowing spark.
 */
function AiWorkflowSparkVisual() {
  return (
    <div className="relative flex items-center justify-center flex-shrink-0 w-24 h-12 sm:w-28 sm:h-12">
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 110 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="workflowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f7a81" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#FFBF00" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1a7097" stopOpacity="0.5" />
          </linearGradient>
          <filter id="yellowGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Workflow Connection Line */}
        <path
          d="M 12 20 H 98"
          stroke="url(#workflowGrad)"
          strokeWidth="1.75"
          strokeDasharray="3 3"
        />

        {/* Source Ingestion Node */}
        <circle cx="12" cy="20" r="5" fill="#ffffff" stroke="#0f7a81" strokeWidth="1.5" />
        <circle cx="12" cy="20" r="2" fill="#0f7a81" />

        {/* Central Neural / Spark Hub Node */}
        <g filter="url(#yellowGlow)">
          <circle cx="55" cy="20" r="7" fill="#ffffff" stroke="#FFBF00" strokeWidth="1.5" />
          {/* Glowing 4-Point Star Spark in Brand Yellow */}
          <path
            d="M 55 14 Q 55 20 61 20 Q 55 20 55 26 Q 55 20 49 20 Q 55 20 55 14 Z"
            fill="#FFBF00"
          />
        </g>

        {/* Target Autonomous Execution Node */}
        <circle cx="98" cy="20" r="5" fill="#ffffff" stroke="#1a7097" strokeWidth="1.5" />
        <circle cx="98" cy="20" r="2" fill="#1a7097" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT: THE SERVICE ECOSYSTEM BENTO GRID
   ───────────────────────────────────────────────────────────────────────────── */

export default function ArchitectureCanvas() {
  return (
    <div className="w-full max-w-5xl mx-auto select-none">
      {/* ── Subtitle Label Above Grid ── */}
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.12em] text-slate-400 font-semibold mb-3 px-1">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1a7097] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1a7097]" />
          </span>
          <span className="text-slate-700 font-bold">SERVICE ECOSYSTEM</span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">CORE CAPABILITIES HIERARCHY</span>
        </span>
        <span className="text-[10px] font-mono text-[#0f7a81] font-semibold hidden sm:flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0f7a81]" />
          PRINCIPAL-LED DIRECT EXECUTION
        </span>
      </div>

      {/* ── The Bento Box Grid (Asymmetrical Hierarchy) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 w-full">
        {/* ═════════════════════════════════════════════════════════════════════
            BLOCK 1: HIGH-PERFORMANCE WEB PLATFORMS (THE ANCHOR - 50% WIDTH)
           ═════════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-6 flex flex-col">
          <Link href="/services/web-development" className="h-full block">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -2 }}
              className="relative group h-full bg-[var(--background)] border border-[rgba(26,112,151,0.12)] hover:border-[#1a7097]/50 rounded-2xl p-5 sm:p-6 text-left flex flex-col justify-between bento-card transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Subtle Ambient Brand Hover Glow */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-gradient-to-bl from-[#1a7097]/10 via-[#0f7a81]/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Card Top: Metric Tag & Pulsing Live Badge */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#64748B] font-semibold">
                    Sub-Second Load Times
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0f7a81]/10 border border-[#0f7a81]/25 text-[#0f7a81] text-[10px] font-mono font-semibold">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0f7a81] opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0f7a81]" />
                    </span>
                    Flagship Anchor
                  </span>
                </div>

                {/* Headline */}
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[var(--foreground)] text-lg sm:text-xl leading-snug mb-2 group-hover:text-[#1a7097] transition-colors duration-200">
                  High-Performance Web Platforms
                </h3>

                {/* Subtext */}
                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal mb-4">
                  Blazing fast, SEO-optimized web storefronts and digital platforms built to convert traffic into revenue.
                </p>

                {/* Abstract Landing Page Wireframe Graphic */}
                <div className="mt-2 mb-1">
                  <WebPlatformWireframe />
                </div>
              </div>

              {/* Card Bottom Edge Line */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-600 transition-colors">
                  <Globe className="w-3.5 h-3.5 text-[#1a7097]" />
                  <span>Next.js • React 19 • Edge CDN</span>
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#1a7097] font-semibold flex items-center gap-0.5">
                  Inspect Stack
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            RIGHT COLUMN: BLOCKS 2, 3, AND 4
           ═════════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-6 flex flex-col gap-3.5 sm:gap-4">
          {/* ─────────────────────────────────────────────────────────────────
              BLOCK 2: NATIVE APP DEVELOPMENT
             ───────────────────────────────────────────────────────────────── */}
          <Link href="/services" className="flex-1 block">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -2 }}
              className="relative group h-full bg-[var(--background)] border border-[rgba(26,112,151,0.12)] hover:border-[#1a7097]/50 rounded-2xl p-5 sm:p-5.5 text-left flex flex-col justify-between bento-card transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-bl from-[#0f7a81]/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Metric / Tag Row */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#64748B] font-semibold">
                    iOS & Android
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0f7a81]/10 border border-[#0f7a81]/25 text-[#0f7a81] text-[10px] font-mono font-semibold">
                    <Smartphone className="w-3 h-3 text-[#0f7a81]" />
                    Mobile First
                  </span>
                </div>

                {/* Content & Graphic Layout */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[var(--foreground)] text-base sm:text-[17px] leading-snug mb-1 group-hover:text-[#1a7097] transition-colors duration-200">
                      Native App Development
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal">
                      Intuitive, high-retention mobile experiences that keep your users engaged on the go.
                    </p>
                  </div>
                  <MobileDevicesVisual />
                </div>
              </div>

              {/* Bottom Edge */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-600 transition-colors">
                  <Smartphone className="w-3.5 h-3.5 text-[#0f7a81]" />
                  <span>React Native • Swift • Kotlin</span>
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#1a7097] font-semibold flex items-center gap-0.5">
                  Explore
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          </Link>

          {/* ─────────────────────────────────────────────────────────────────
              BLOCK 3: BESPOKE SOFTWARE & SAAS (EQUAL SIZE TO BLOCK 2)
             ───────────────────────────────────────────────────────────────── */}
          <Link href="/services/saas-development" className="flex-1 block">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -2 }}
              className="relative group h-full bg-[var(--background)] border border-[rgba(26,112,151,0.12)] hover:border-[#1a7097]/50 rounded-2xl p-5 sm:p-5.5 text-left flex flex-col justify-between bento-card transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-bl from-[#1a7097]/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Metric / Tag Row */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#64748B] font-semibold">
                    Enterprise Scale
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 text-[10px] font-mono font-bold">
                    <Layers className="w-3 h-3 text-[#1a7097]" />
                    SOC-2 Ready
                  </span>
                </div>

                {/* Content & Graphic Layout */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[var(--foreground)] text-base sm:text-[17px] leading-snug mb-1 group-hover:text-[#1a7097] transition-colors duration-200">
                      Bespoke Software & SaaS
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal">
                      Custom internal tools, partner portals, and scalable SaaS platforms to run your entire operation.
                    </p>
                  </div>
                  <DashboardGridVisual />
                </div>
              </div>

              {/* Bottom Edge */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-600 transition-colors">
                  <Layers className="w-3.5 h-3.5 text-[#0f7a81]" />
                  <span>Cloud Native • Multi-Tenant • ACID</span>
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#1a7097] font-semibold flex items-center gap-0.5">
                  Explore
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          </Link>

          {/* ─────────────────────────────────────────────────────────────────
              BLOCK 4: AI AGENTS & AUTOMATION (THE SMALLEST BLOCK - ADD-ON)
             ───────────────────────────────────────────────────────────────── */}
          <Link href="/services/ai-solutions" className="block">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -2 }}
              className="relative group bg-[var(--background)] border border-[rgba(26,112,151,0.12)] hover:border-[#1a7097]/50 rounded-2xl p-4 sm:p-4.5 text-left flex flex-col justify-between bento-card transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-bl from-[#FFBF00]/15 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Metric / Tag Row */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#64748B] font-semibold">
                    Zero Manual Data Entry
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFBF00]/15 border border-[#FFBF00]/40 text-amber-800 text-[10px] font-mono font-bold">
                    <Sparkles className="w-3 h-3 text-[#FFBF00] fill-[#FFBF00]" />
                    Autonomous Add-On
                  </span>
                </div>

                {/* Content & Graphic Layout */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[var(--foreground)] text-sm sm:text-base leading-snug mb-1 group-hover:text-[#1a7097] transition-colors duration-200">
                      AI Agents & Automation
                    </h3>
                    <p className="text-xs sm:text-[12.5px] text-slate-500 leading-relaxed font-normal">
                      Smart workflows that automate your most repetitive and complex business tasks.
                    </p>
                  </div>
                  <AiWorkflowSparkVisual />
                </div>
              </div>

              {/* Bottom Edge */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-600 transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0f7a81]" />
                  <span>Agentic Workflows • LLM Pipelines</span>
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#1a7097] font-semibold flex items-center gap-0.5">
                  Automate
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}
