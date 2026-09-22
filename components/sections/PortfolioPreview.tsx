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
  const stackTopOffset = index * 12; // 12px visible header peek per stacked card

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full will-change-transform"
      style={{
        y,
        scale,
        filter,
        top: `${stackTopOffset}px`,
        height: `calc(100% - ${(totalCards - 1) * 12}px)`,
        zIndex: index + 1,
      }}
    >
      <div className="relative w-full h-full rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-7 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12)] hover:border-[#1a7097]/40 transition-colors overflow-hidden flex flex-col justify-between">
        
        {/* Subtle Darkening Overlay when buried underneath */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-slate-900 pointer-events-none z-30 rounded-3xl"
        />

        {/* Top Metadata Strip */}
        <div className="flex items-center justify-between gap-3 mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#1a7097]/10 border border-[#1a7097]/20 text-[#1a7097] text-[11px] font-mono font-bold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-400 font-medium">
              // {project.year}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10.5px] font-mono font-bold text-emerald-700">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>{metrics?.badge || '100% Milestone Lock'}</span>
          </div>
        </div>

        {/* ── Flawless High-Res Showcase Canvas (No Duplicate Browser Bars) ── */}
        <div className="relative w-full flex-1 rounded-2xl border border-slate-200/80 bg-slate-950 overflow-hidden mb-4 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.15)] group/device">
          
          {/* Full High-Resolution Showcase Image */}
          <div className="relative w-full h-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority={index === 0}
              className="object-cover object-center group-hover/device:scale-[1.025] transition-transform duration-700 select-none"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
            {/* Subtle Specular Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />

            {/* Live Web Link Pill on Top-Left */}
            {project.liveLink && project.liveLink !== '#' && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white flex items-center gap-1.5 transition-all shadow-md z-10 cursor-pointer"
              >
                <Lock className="w-2.5 h-2.5 text-emerald-400" />
                <span>{project.liveLink.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>
            )}

            {/* Floating Metric 1 (Bottom Left) */}
            {metrics?.pill1 && (
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg flex items-center gap-2 z-10">
                <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[10px]">
                  ↑
                </div>
                <div>
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-xs text-[#0F172A] leading-tight">
                    {metrics.pill1.value}
                  </div>
                  <div className="text-[8.5px] font-mono text-slate-400 leading-tight">
                    {metrics.pill1.label}
                  </div>
                </div>
              </div>
            )}

            {/* Floating Metric 2 (Top Right) */}
            {metrics?.pill2 && (
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg flex items-center gap-1.5 z-10">
                <Zap className="w-3 h-3 text-[#1a7097]" />
                <div>
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-xs text-[#0F172A] leading-tight">
                    {metrics.pill2.value}
                  </div>
                  <div className="text-[8.5px] font-mono text-slate-400 leading-tight">
                    {metrics.pill2.label}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer: Info, Tech Stack & Action Buttons */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div>
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl text-[#0F172A] tracking-tight leading-snug">
              {project.title}
            </h3>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed line-clamp-1 max-w-xl">
              {project.shortDescription}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Tech Stack Chips */}
            <div className="hidden md:flex items-center gap-1">
              {project.tech.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/70 text-[9.5px] font-mono text-slate-600"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <Link
              href={`/portfolio/${project.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1a7097] hover:bg-[#145b7c] text-white text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold shadow-xs hover:shadow-md transition-all cursor-pointer group/link shrink-0"
            >
              <span>Explore Case Study</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function PortfolioPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

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

  return (
    <section
      ref={containerRef}
      className="relative h-[360vh] bg-[#FCFCFD] text-[#0F172A] selection:bg-[#1a7097] selection:text-white"
    >
      {/* ── Ambient Background Lighting (Curtain Glows & Subtle Fluting) ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              rgba(26, 112, 151, 0.035) 0px,
              rgba(26, 112, 151, 0.035) 1px,
              transparent 1px,
              transparent 48px
            )
          `,
        }}
      />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#1a7097]/8 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#E7B900]/8 blur-3xl pointer-events-none" />

      {/* ── Sticky Viewport Container (Locks in place while user scrolls through all 6 cards) ── */}
      <div className="sticky top-16 sm:top-20 h-[calc(100vh-80px)] min-h-[580px] max-h-[760px] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-6 lg:gap-8 pt-3 pb-6 overflow-hidden">
        
        {/* ════════════════════════════════════════════════════════════════════
            LEFT COLUMN: CONCEPT 3 - AWWWARDS MAGAZINE EDITORIAL
           ════════════════════════════════════════════════════════════════════ */}
        <div className="w-full lg:w-[42%] xl:w-[40%] flex flex-col justify-between text-left shrink-0 py-1">
          <div>
            {/* Top Eyebrow & Fraction Counter */}
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-[10.5px] font-mono font-semibold text-slate-600 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a7097] animate-pulse" />
                <span className="font-bold tracking-wider uppercase text-[#1a7097]">
                  SELECTED WORK
                </span>
                <span className="text-slate-300">•</span>
                <span>EDITORIAL ARCHIVE</span>
              </div>

              {/* Minimalist Fraction Indicator */}
              <div className="font-mono text-xs tracking-tight text-slate-400">
                <span className="font-bold text-[#0F172A] text-sm">
                  0{activeStep + 1}
                </span>
                <span className="mx-1 text-slate-300">/</span>
                <span>0{STACK_PROJECTS.length}</span>
              </div>
            </div>

            {/* Laser Progress Line */}
            <div className="w-full h-[2px] bg-slate-200/80 rounded-full mb-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#1a7097] via-[#0284c7] to-[#E7B900]"
                style={{
                  width: `${((activeStep + 1) / STACK_PROJECTS.length) * 100}%`,
                  transition: 'width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </div>

            {/* Headline */}
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] text-[#0F172A] tracking-[-0.03em] leading-[1.15] mb-2 [text-wrap:balance]">
              <span>Transforming </span>
              <span className="relative inline-block text-[#1a7097] underline decoration-[#E7B900] decoration-[3px] underline-offset-[5px]">
                Ideas
              </span>
              <span> into </span>
              <span className="bg-gradient-to-r from-[#1a7097] via-[#0284c7] to-[#38bdf8] bg-clip-text text-transparent">
                Production Reality.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed mb-4 max-w-md">
              A curated digital retrospective of flagship web platforms, bespoke SaaS ecosystems, and user-first digital products.
            </p>

            {/* ── Editorial Plate Card (Active Project Spotlight) ── */}
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
                    transition={{ duration: 0.24, ease: 'easeOut' }}
                    className="relative rounded-2xl bg-white/95 border border-slate-200/90 p-5 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.08)] overflow-hidden"
                  >
                    {/* Giant Watermark Numeral */}
                    <span className="absolute -top-4 right-2 font-mono font-black text-[100px] sm:text-[115px] text-slate-100/90 leading-none select-none pointer-events-none z-0">
                      {editorial.indexStr}
                    </span>

                    {/* Sector & Location Metadata */}
                    <div className="relative z-10 font-mono text-[10px] font-bold uppercase tracking-wider text-[#1a7097] mb-1.5 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#1a7097]" />
                      <span>{editorial.sector}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400">{editorial.location}</span>
                    </div>

                    {/* Project Title */}
                    <div className="relative z-10 mb-2">
                      <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl text-[#0F172A] tracking-tight">
                        {activeProject.title}
                      </h3>
                    </div>

                    {/* Editorial Thesis / Problem Statement */}
                    <p className="relative z-10 text-[12px] sm:text-[12.5px] text-slate-600 font-normal leading-relaxed mb-4 max-w-sm">
                      {editorial.thesis}
                    </p>

                    {/* Editorial Stat Strip */}
                    <div className="relative z-10 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl text-[#1a7097] leading-none">
                          {editorial.stat.value}
                        </div>
                        <div className="font-mono text-[9.5px] uppercase tracking-wider text-slate-400 mt-1">
                          {editorial.stat.label}
                        </div>
                      </div>

                      <Link
                        href={`/portfolio/${activeProject.id}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0F172A] hover:bg-[#1a7097] text-white text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold shadow-xs hover:shadow-md transition-all cursor-pointer group"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* ── Minimalist Scrubber Dashes ── */}
            <div className="flex items-center gap-1.5 mt-3.5 px-1">
              {STACK_PROJECTS.map((proj, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => scrollToProject(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'w-10 bg-[#1a7097]'
                        : 'w-3 bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Jump to project 0${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Bottom Archive Link & Stats */}
          <div className="pt-2.5 border-t border-slate-200/70 flex items-center justify-between gap-3 mt-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span className="font-mono font-bold text-[#1a7097]">06</span>
              <span>Curated Case Studies</span>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold border border-slate-200/80 transition-all cursor-pointer group"
            >
              <span>View Full Archive</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            RIGHT COLUMN: STREAMLINED STACKING CARDS VIEWPORT (~58% lg)
           ════════════════════════════════════════════════════════════════════ */}
        <div className="w-full lg:w-[58%] xl:w-[60%] h-full relative">
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
    </section>
  );
}


