'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowUpRight,
  Zap,
  ShieldCheck,
  Activity,
  ExternalLink,
  Layers,
  Sparkles,
  Lock,
  CheckCircle2,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { allProjects } from '@/data/projects';

// Display all 6 projects in the refined sticky stack
const STACK_PROJECTS = allProjects;

// Tailored live metrics & badges for all 6 projects
const PROJECT_METRICS: Record<
  number,
  {
    pill1: { label: string; value: string };
    pill2: { label: string; value: string };
    badge: string;
  }
> = {
  6: {
    pill1: { value: '+185% Inquiries', label: 'Organic Conversion' },
    pill2: { value: '0.38s LCP', label: 'Edge CDN Cached' },
    badge: '100% Milestone Lock',
  },
  5: {
    pill1: { value: '150+ Cars Live', label: 'Realtime Inventory' },
    pill2: { value: 'PWA Offline', label: 'Staff Portal Sync' },
    badge: 'Certified Dealership',
  },
  4: {
    pill1: { value: '60 FPS Sync', label: 'Zero Frame Drops' },
    pill2: { value: '10k+ Streaks', label: 'Habit Consistency' },
    badge: 'MERN Architecture',
  },
  3: {
    pill1: { value: 'Sub-50ms Search', label: 'Instant Querying' },
    pill2: { value: 'P2P Market', label: 'Student Exchange' },
    badge: 'RESTful API Flow',
  },
  2: {
    pill1: { value: '99.99% SLA', label: 'Enterprise Cloud' },
    pill2: { value: 'Zero Latency', label: 'POS & Udhaar Ledger' },
    badge: 'Enterprise SaaS',
  },
  1: {
    pill1: { value: 'Bank-Grade Auth', label: 'Zero-Knowledge Security' },
    pill2: { value: '100% Audit Trail', label: 'Cryptographic Verify' },
    badge: 'GovTech Compliance',
  },
};

// Editorial case data for Concept 3: Awwwards Magazine Editorial
interface EditorialProjectData {
  indexStr: string;
  sector: string;
  location: string;
  thesis: string;
  stat: { value: string; label: string };
}

const EDITORIAL_DATA: Record<number, EditorialProjectData> = {
  6: {
    indexStr: '01',
    sector: 'Automotive Discovery & Retail',
    location: 'Enterprise Web',
    thesis: 'Crafting a high-speed vehicle discovery portal with sub-second ISR edge caching and direct WhatsApp transaction flows.',
    stat: { value: '+185%', label: 'Organic Inquiries in 90 Days' },
  },
  5: {
    indexStr: '02',
    sector: 'Commercial Dealership & Fleet',
    location: 'Dealership OS',
    thesis: 'Unifying multi-lot vehicle inventories with real-time sync and an offline-capable staff PWA for floor sales agility.',
    stat: { value: '150+', label: 'Live Vehicles Synchronized' },
  },
  4: {
    indexStr: '03',
    sector: 'Fintech & Productivity SaaS',
    location: 'Cloud / Global',
    thesis: 'Synthesizing personal finance telemetry and habit streak dynamics into a unified, zero-latency reactive dashboard.',
    stat: { value: '60 FPS', label: 'Zero Frame Drops with 10k+ Streaks' },
  },
  3: {
    indexStr: '04',
    sector: 'EdTech & Circular Economy',
    location: 'Surat Academic Circuit',
    thesis: 'Eliminating textbook waste and friction through a peer-to-peer search engine and verified campus exchange protocol.',
    stat: { value: '< 50ms', label: 'Listing Discovery Latency' },
  },
  2: {
    indexStr: '05',
    sector: 'FMCG & Dairy Enterprise ERP',
    location: 'AgriTech Cloud',
    thesis: 'Digitizing multi-generational dairy trade with a 6 AM peak-hour POS terminal and automated ledger debt tracking.',
    stat: { value: '99.99%', label: 'Cloud Uptime SLA & Zero Lost Credit' },
  },
  1: {
    indexStr: '06',
    sector: 'Civic Tech & Public Compliance',
    location: 'India / Multi-Region',
    thesis: 'Automating high-stakes government application workflows with real-time compliance checking and low-bandwidth access.',
    stat: { value: '78%', label: 'Reduction in Application Errors' },
  },
};

interface CardProps {
  project: typeof allProjects[0];
  index: number;
  totalCards: number;
  progress: any;
}

function StackCard({ project, index, totalCards, progress }: CardProps) {
  const step = 1 / (totalCards - 1);
  const inStart = Math.max(0, (index - 1) * step);
  const inEnd = index * step;
  const outStart = index * step;
  const outEnd = 1;

  // Vertical entrance for cards 1..5 (card 0 is already in place)
  const yOffset = useTransform(progress, [inStart, inEnd], ['100%', '0%']);
  const y = index === 0 ? '0%' : yOffset;

  // Scale down cards underneath slightly as newer cards stack on top
  const targetScale = 1 - (totalCards - 1 - index) * 0.024;
  const scale = useTransform(progress, [outStart, outEnd], [1, targetScale]);

  // Subtle blur for background cards
  const filter = useTransform(
    progress,
    [outStart, outEnd],
    ['blur(0px)', `blur(${(totalCards - 1 - index) * 1.2}px)`]
  );

  // Subtle darkening overlay when buried in stack
  const overlayOpacity = useTransform(progress, [outStart, outEnd], [0, 0.22]);

  const metrics = PROJECT_METRICS[project.id];

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full will-change-transform"
      style={{
        y,
        scale,
        filter,
        top: `calc(var(--stack-offset, 8px) * ${index})`,
        height: `calc(100% - (var(--stack-offset, 8px) * ${totalCards - 1}))`,
        zIndex: index + 1,
      }}
    >
      <div className="relative w-full h-full rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-3 sm:p-5 lg:p-6 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.12)] hover:border-[#377a9b]/40 transition-colors overflow-hidden flex flex-col justify-between">

        {/* Subtle Darkening Overlay when buried underneath */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-slate-900 pointer-events-none z-30 rounded-2xl sm:rounded-3xl"
        />

        {/* Top Metadata Strip */}
        <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#377a9b]/10 border border-[#377a9b]/20 text-[#377a9b] text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider truncate">
              {project.category}
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-slate-500 font-medium shrink-0">
              // {project.year}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Mobile Metric Highlight */}
            {metrics?.pill1 && (
              <div className="sm:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] font-mono font-bold text-emerald-700">
                <TrendingUp className="w-2.5 h-2.5 text-emerald-600" />
                <span>{metrics.pill1.value}</span>
              </div>
            )}

            {/* Desktop Badge */}
            <div className="hidden sm:inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] sm:text-[10.5px] font-mono font-bold text-emerald-700">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>{metrics?.badge || '100% Milestone Lock'}</span>
            </div>
          </div>
        </div>

        {/* High-Res Showcase Canvas (Landscape Rectangle Top-Agency Presentation) */}
        <div className="relative w-full flex-1 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-slate-950 overflow-hidden my-2 sm:my-2.5 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.15)] group/device min-h-[220px]">
          <Link
            href={`/portfolio/${project.id}`}
            className="relative w-full h-full block cursor-pointer overflow-hidden"
            aria-label={`View ${project.title} case study`}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority={index <= 1}
              className="object-cover object-center group-hover/device:scale-[1.035] transition-transform duration-700 ease-out select-none"
              sizes="(max-width: 640px) 380px, (max-width: 1024px) 60vw, 720px"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/10 pointer-events-none" />
          </Link>

          {/* Live Web Link Pill on Top-Left */}
          {project.liveLink && project.liveLink !== '#' && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit live website for ${project.title}`}
              className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2.5 sm:px-3 py-1 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md border border-white/20 text-[9.5px] sm:text-[10px] font-mono text-white flex items-center gap-1 sm:gap-1.5 transition-all shadow-md z-10 cursor-pointer"
            >
              <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
              <span className="truncate max-w-[130px] sm:max-w-none">
                {project.liveLink.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </span>
              <ExternalLink className="w-2.5 h-2.5 opacity-70 shrink-0" />
            </a>
          )}

          {/* Floating Metric 1 (Bottom Left) - Desktop only */}
          {metrics?.pill1 && (
            <div className="hidden sm:flex absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg items-center gap-2 z-10">
              <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[10px]">
                ↑
              </div>
              <div>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-xs text-[#0F172A] leading-tight">
                  {metrics.pill1.value}
                </div>
                <div className="text-[8.5px] font-mono text-slate-600 leading-tight">
                  {metrics.pill1.label}
                </div>
              </div>
            </div>
          )}

          {/* Floating Metric 2 (Top Right) - Desktop only */}
          {metrics?.pill2 && (
            <div className="hidden sm:flex absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg items-center gap-1.5 z-10">
              <Zap className="w-3 h-3 text-[#377a9b]" />
              <div>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-xs text-[#0F172A] leading-tight">
                  {metrics.pill2.value}
                </div>
                <div className="text-[8.5px] font-mono text-slate-600 leading-tight">
                  {metrics.pill2.label}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card Footer: Info */}
        <div className="pt-2 border-t border-slate-100 shrink-0">
          <div className="min-w-0">
            <Link
              href={`/portfolio/${project.id}`}
              className="inline-block max-w-full group/title cursor-pointer"
            >
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-sm xs:text-base sm:text-xl lg:text-2xl text-[#0F172A] group-hover/title:text-[#377a9b] tracking-tight leading-snug truncate transition-colors">
                {project.title}
              </h3>
            </Link>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] xs:text-[11px] sm:text-xs lg:text-[13px] text-slate-600 font-normal leading-relaxed line-clamp-1 max-w-2xl">
              {project.shortDescription}
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function PortfolioPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Dedicated Mobile Showcase state
  const [mobileIndex, setMobileIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 45;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && mobileIndex < STACK_PROJECTS.length - 1) {
      setMobileIndex((prev) => prev + 1);
    } else if (isRightSwipe && mobileIndex > 0) {
      setMobileIndex((prev) => prev - 1);
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  // Track active project index for the left-hand editorial timeline
  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      const step = 1 / (STACK_PROJECTS.length - 1);
      const index = Math.min(
        Math.floor(latest / step + 0.35),
        STACK_PROJECTS.length - 1
      );
      setActiveStep(index);
    });
  }, [smoothProgress]);

  // Jump scroll to a specific card
  const scrollToProject = (index: number) => {
    if (containerRef.current) {
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
      const step = 1 / (STACK_PROJECTS.length - 1);
      const targetScroll = containerTop + index * step * containerHeight;

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  const activeMobileProj = STACK_PROJECTS[mobileIndex];
  const mobileMetrics = PROJECT_METRICS[activeMobileProj.id];
  const mobileEditorial = EDITORIAL_DATA[activeMobileProj.id];

  return (
    <section id="portfolio" className="relative bg-[#FCFCFD] text-[#0F172A] selection:bg-[#377a9b] selection:text-white">
      {/* ── Ambient Background Lighting (Curtain Glows & Subtle Fluting) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-fluted-grid" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#377a9b]/8 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#ffc312]/8 blur-3xl" />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          MOBILE SHOWCASE: ZERO-SCROLL-TRAP TOUCH DECK (block lg:hidden)
          Clean, high-end agency presentation with landscape rectangle card
         ════════════════════════════════════════════════════════════════════ */}
      <div className="block lg:hidden relative w-full py-8 px-3.5 xs:px-4 sm:px-6">
        {/* Mobile Header: Eyebrow & Headline */}
        <div className="mb-3.5">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#377a9b]/10 border border-[#377a9b]/20 text-[10.5px] font-mono font-bold text-[#377a9b]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#377a9b] animate-pulse" />
              <span className="tracking-wider uppercase">SELECTED WORK</span>
              <span className="text-slate-300">•</span>
              <span>0{mobileIndex + 1} / 0{STACK_PROJECTS.length}</span>
            </div>

            <span className="font-mono text-[10px] text-slate-600 font-semibold px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/80">
              SWIPE / TAP
            </span>
          </div>

          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl xs:text-3xl text-[#0F172A] tracking-[-0.03em] leading-[1.15] mb-1.5 [text-wrap:balance]">
            <span>Transforming </span>
            <span className="text-[#377a9b] underline decoration-[#ffc312] decoration-[3px] underline-offset-[4px]">
              Ideas
            </span>
            <span> into </span>
            <span className="bg-gradient-to-r from-[#377a9b] via-[#0284c7] to-[#38bdf8] bg-clip-text text-transparent">
              Production Reality.
            </span>
          </h2>
          <p className="text-xs text-slate-500 font-normal leading-relaxed">
            Curated digital retrospective of flagship web platforms & SaaS ecosystems.
          </p>
        </div>

        {/* Mobile Active Project Card (with smooth touch-drag & swipe) */}
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-3.5 xs:p-4 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.12)] overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-proj-${activeMobileProj.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {/* Top Metadata Strip */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#377a9b]/10 border border-[#377a9b]/20 text-[#377a9b] text-[10px] font-mono font-bold uppercase tracking-wider truncate">
                    {activeMobileProj.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-600 font-medium shrink-0">
                    // {activeMobileProj.year}
                  </span>
                </div>

                {mobileMetrics?.pill1 && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] font-mono font-bold text-emerald-700 shrink-0">
                    <TrendingUp className="w-2.5 h-2.5 text-emerald-600" />
                    <span>{mobileMetrics.pill1.value}</span>
                  </div>
                )}
              </div>

              {/* Landscape Rectangle Image Showcase (aspect-[16/9.5]) */}
              <div className="relative w-full aspect-[16/9.5] rounded-xl border border-slate-200/80 bg-slate-950 overflow-hidden mb-3 shadow-[0_8px_24px_-6px_rgba(15,23,42,0.12)] group">
                <Link
                  href={`/portfolio/${activeMobileProj.id}`}
                  className="relative w-full h-full block cursor-pointer overflow-hidden"
                  aria-label={`View ${activeMobileProj.title} case study`}
                >
                  <Image
                    src={activeMobileProj.image}
                    alt={activeMobileProj.title}
                    fill
                    priority
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out select-none"
                    sizes="(max-width: 640px) 380px, (max-width: 1024px) 50vw, 600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/10 pointer-events-none" />
                </Link>

                {/* Live link pill if available */}
                {activeMobileProj.liveLink && activeMobileProj.liveLink !== '#' && (
                  <a
                    href={activeMobileProj.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit live website for ${activeMobileProj.title}`}
                    className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/70 hover:bg-black/85 backdrop-blur-md border border-white/20 text-[9.5px] font-mono text-white flex items-center gap-1.5 transition-all shadow-md z-10"
                  >
                    <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                    <span className="truncate max-w-[140px]">
                      {activeMobileProj.liveLink.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-70 shrink-0" />
                  </a>
                )}
              </div>

              {/* Content Block */}
              <div className="mb-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <Link
                    href={`/portfolio/${activeMobileProj.id}`}
                    className="hover:text-[#377a9b] transition-colors cursor-pointer"
                  >
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-base xs:text-lg text-[#0F172A] hover:text-[#377a9b] tracking-tight leading-snug transition-colors">
                      {activeMobileProj.title}
                    </h3>
                  </Link>
                  <span className="font-mono text-[11px] font-extrabold text-[#377a9b] shrink-0">
                    0{mobileIndex + 1}
                  </span>
                </div>
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[11.5px] text-slate-600 font-normal leading-relaxed line-clamp-2 mb-2.5">
                  {activeMobileProj.shortDescription}
                </p>

                {/* Editorial Stat Strip on Mobile */}
                {mobileEditorial && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-sm text-[#377a9b] leading-none">
                        {mobileEditorial.stat.value}
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-wider text-slate-600 font-medium mt-0.5 truncate">
                        {mobileEditorial.stat.label}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[9.5px] font-mono text-slate-500 uppercase block truncate max-w-[130px]">
                        {mobileEditorial.sector}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Navigation Controls: Prev, 6 Scrubber dashes, Next (Touch targets >= 44px) */}
        <div className="flex items-center justify-between gap-3 mt-3 pt-1.5">
          <button
            type="button"
            onClick={() => setMobileIndex((prev) => Math.max(0, prev - 1))}
            disabled={mobileIndex === 0}
            className="w-11 h-11 rounded-xl border border-slate-200 bg-white text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 active:scale-95 shadow-2xs flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-4.5 h-4.5" />
          </button>

          {/* 6 Scrubber dashes (Touch-friendly 44px targets) */}
          <div className="flex items-center gap-1">
            {STACK_PROJECTS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMobileIndex(idx)}
                className="p-2.5 flex items-center justify-center cursor-pointer -m-1"
                aria-label={`Go to project 0${idx + 1}`}
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 block ${mobileIndex === idx
                      ? 'w-7 bg-[#377a9b]'
                      : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMobileIndex((prev) => Math.min(STACK_PROJECTS.length - 1, prev + 1))}
            disabled={mobileIndex === STACK_PROJECTS.length - 1}
            className="w-11 h-11 rounded-xl bg-[#377a9b] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#2b6683] active:scale-95 shadow-xs flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next project"
          >
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Mobile Archive Link */}
        <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            <span className="font-mono font-bold text-[#377a9b]">06</span> Curated Case Studies
          </div>
          <Link
            href="/portfolio"
            aria-label="View full portfolio archive of all 6 curated case studies"
            className="inline-flex items-center gap-1.5 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#377a9b] hover:underline"
          >
            <span>View Full Archive</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          DESKTOP: 360vh STICKY SCROLL MAGAZINE RETROSPECTIVE (hidden lg:block)
         ════════════════════════════════════════════════════════════════════ */}
      {/* ════════════════════════════════════════════════════════════════════
          DESKTOP: 320vh STICKY SCROLL MAGAZINE RETROSPECTIVE (hidden lg:block)
         ════════════════════════════════════════════════════════════════════ */}
      <div ref={containerRef} className="hidden lg:block relative h-[280vh]">
        {/* ── Sticky Viewport Container (Seamlessly anchors in viewport beneath navbar) ── */}
        <div className="sticky top-16 sm:top-20 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-stretch justify-between gap-6 lg:gap-8 xl:gap-10 py-3 sm:py-5 overflow-hidden">

          {/* ════════════════════════════════════════════════════════════════════
              LEFT COLUMN: CONCEPT 3 - AWWWARDS MAGAZINE EDITORIAL
             ════════════════════════════════════════════════════════════════════ */}
          <div className="w-full lg:w-[44%] xl:w-[42%] flex flex-col justify-between text-left shrink-0 h-full">

            {/* Top: Eyebrow + Headline + Subtitle (Tight, cohesive typographic block) */}
            <div className="shrink-0">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-[10.5px] font-mono font-semibold text-slate-700 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#377a9b] animate-pulse" />
                  <span className="font-bold tracking-wider uppercase text-[#377a9b]">
                    SELECTED WORK
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500">CURATED ARCHIVE</span>
                </div>

                <div className="inline-flex items-center gap-1 font-mono text-xs text-slate-600 font-semibold px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200/80">
                  <span className="text-[#377a9b] font-bold text-sm">
                    0{activeStep + 1}
                  </span>
                  <span className="text-slate-400" aria-hidden="true">/</span>
                  <span>0{STACK_PROJECTS.length}</span>
                </div>
              </div>

              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl sm:text-3xl lg:text-[32px] xl:text-[34px] text-[#0F172A] tracking-[-0.03em] leading-[1.14] mb-1.5 [text-wrap:balance]">
                <span>Transforming </span>
                <span className="relative inline-block text-[#377a9b] underline decoration-[#ffc312] decoration-[3px] underline-offset-[5px]">
                  Ideas
                </span>
                <span> into </span>
                <span className="bg-gradient-to-r from-[#377a9b] via-[#0284c7] to-[#38bdf8] bg-clip-text text-transparent">
                  Production Reality.
                </span>
              </h2>

              <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed max-w-md">
                A curated digital retrospective of flagship web platforms, bespoke SaaS ecosystems, and user-first digital products.
              </p>
            </div>

            {/* Middle: Editorial Plate Card (Active Project Spotlight - Fills vertical height cleanly) */}
            <div className="my-3 flex-1 flex flex-col min-h-0">
              <AnimatePresence mode="wait">
                {(() => {
                  const activeProject = STACK_PROJECTS[activeStep] || STACK_PROJECTS[0];
                  const editorial = EDITORIAL_DATA[activeProject.id] || EDITORIAL_DATA[6];

                  return (
                    <motion.div
                      key={activeProject.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="relative flex-1 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-[0_16px_36px_-12px_rgba(15,23,42,0.08)] overflow-hidden flex flex-col justify-between"
                    >
                      {/* Giant Watermark Numeral */}
                      <span className="absolute -top-4 right-3 font-mono font-black text-[105px] xl:text-[120px] text-slate-100/80 leading-none select-none pointer-events-none z-0">
                        {editorial.indexStr}
                      </span>
                      <div className="absolute top-0 right-0 w-36 h-36 bg-[#377a9b]/5 rounded-full blur-2xl pointer-events-none" />

                      {/* Top Metadata Strip */}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#377a9b]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#377a9b]" />
                            <span>{editorial.sector}</span>
                          </div>
                          <span className="font-mono text-[10px] text-slate-600 font-semibold px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/80">
                            // {activeProject.year}
                          </span>
                        </div>

                        {/* Project Title */}
                        <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl text-[#0F172A] tracking-tight mb-2">
                          {activeProject.title}
                        </h3>

                        {/* Editorial Thesis / Problem Statement */}
                        <p className="text-[12.5px] sm:text-[13px] text-slate-600 font-normal leading-relaxed mb-3.5 max-w-md">
                          {editorial.thesis}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-2">
                          {activeProject.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 rounded-lg bg-slate-50 border border-slate-200/80 text-[10px] font-mono font-medium text-slate-600"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Editorial Stat Strip & Actions */}
                      <div className="relative z-10 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                        <div>
                          <div className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl xl:text-3xl text-[#377a9b] leading-none">
                            {editorial.stat.value}
                          </div>
                          <div className="font-mono text-[10px] uppercase tracking-wider text-slate-600 font-medium mt-1">
                            {editorial.stat.label}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {activeProject.liveLink && activeProject.liveLink !== '#' && (
                            <a
                              href={activeProject.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all cursor-pointer hover:bg-slate-50"
                              aria-label={`Open ${activeProject.title} live website`}
                            >
                              <span>Live Site</span>
                              <ExternalLink className="w-3 h-3 text-slate-500" aria-hidden="true" />
                            </a>
                          )}

                          <Link
                            href={`/portfolio/${activeProject.id}`}
                            aria-label={`Explore ${activeProject.title} case study`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#377a9b] text-white text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold shadow-xs hover:shadow-md transition-all cursor-pointer group"
                          >
                            <span>Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>

            {/* Bottom: Scrubber Navigation + Full Archive Link */}
            <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {STACK_PROJECTS.map((proj, idx) => {
                    const isActive = activeStep === idx;
                    return (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => scrollToProject(idx)}
                        className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer -m-1"
                        aria-label={`Jump to project 0${idx + 1}`}
                      >
                        <span
                          className={`h-2.5 rounded-full transition-all duration-300 block ${isActive
                              ? 'w-9 bg-[#377a9b] shadow-xs'
                              : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                            }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="hidden sm:inline font-mono text-[10.5px] text-slate-600 font-medium">
                  SCROLL / CLICK
                </span>
              </div>

              <Link
                href="/portfolio"
                aria-label="View full portfolio archive of all 6 curated case studies"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold border border-slate-200/80 transition-all cursor-pointer group shadow-2xs"
              >
                <span>View Full Archive (06)</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════════════
              RIGHT COLUMN: STREAMLINED STACKING CARDS VIEWPORT (~56% lg)
             ════════════════════════════════════════════════════════════════════ */}
          <div className="w-full lg:w-[56%] xl:w-[58%] h-full relative [--stack-offset:8px] sm:[--stack-offset:14px]">
            <div className="relative w-full h-full">
              {STACK_PROJECTS.map((project, index) => (
                <StackCard
                  key={project.id}
                  project={project}
                  index={index}
                  totalCards={STACK_PROJECTS.length}
                  progress={smoothProgress}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}



