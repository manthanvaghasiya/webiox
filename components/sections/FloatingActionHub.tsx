'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Server,
  LayoutTemplate,
  Terminal,
  Database,
  Zap,
  ShieldCheck,
  Globe2,
  Code2,
  Activity,
  Star,
  ArrowUpRight,
  ChevronRight,
  Layers,
  ArrowRight,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   DUAL-LAYER ARCHITECTURE PROTOCOLS (TECH SPEC + BUSINESS OUTCOME)
   ═══════════════════════════════════════════════════════════════════════════ */
export const ACTION_PILLARS = [
  {
    id: 'ai',
    number: '01',
    title: 'AI Workflows',
    icon: Cpu,
    badge: 'AUTONOMOUS AI',
    accentColor: '#D97706',
    stat: '12x Faster Operations',
    statSub: 'Zero manual data entry',
    pipeline: [
      {
        step: '01',
        title: 'Data Ingestion',
        tech: 'APIs, Webhooks & ERP',
        outcome: 'Zero Manual Entry',
        desc: 'Auto-syncs EHR, warehouse stock, and WhatsApp inquiries.',
        icon: Terminal,
      },
      {
        step: '02',
        title: 'Agent Swarm',
        tech: 'Gemini 1.5 & Claude 3.5',
        outcome: '24/7 Smart Triaging',
        desc: 'Autonomous multi-agent checks flag errors before billing.',
        icon: Cpu,
      },
      {
        step: '03',
        title: 'Neural RAG',
        tech: 'Vector DB & Embeddings',
        outcome: '100% Fact Accuracy',
        desc: 'Grounded in your clinic SOPs or product catalog. Zero hallucinations.',
        icon: Database,
      },
      {
        step: '04',
        title: 'Edge Action',
        tech: 'Sub-140ms Serverless',
        outcome: 'Instant Resolution',
        desc: 'Instantly confirms bookings, dispatches orders & alerts staff.',
        icon: Zap,
      },
    ],
  },
  {
    id: 'software',
    number: '02',
    title: 'Custom Software',
    icon: Server,
    badge: 'CLOUD NATIVE',
    accentColor: '#0E7490',
    stat: '99.99% Availability',
    statSub: 'Zero technical debt',
    pipeline: [
      {
        step: '01',
        title: 'Custom UI Engine',
        tech: 'Next.js 16 + React 19',
        outcome: 'Tailored Workflows',
        desc: 'Built around your exact factory floor or practice operations.',
        icon: LayoutTemplate,
      },
      {
        step: '02',
        title: 'Microservices',
        tech: 'Docker, Go & Node.js',
        outcome: 'Infinite Scaling',
        desc: 'Handles sudden peak traffic without slowdowns or server crashes.',
        icon: Server,
      },
      {
        step: '03',
        title: 'ACID Database',
        tech: 'PostgreSQL + Redis',
        outcome: 'Bulletproof Records',
        desc: 'Bank-grade transactional consistency — never lose an invoice.',
        icon: Database,
      },
      {
        step: '04',
        title: 'Cloud Security',
        tech: 'OAuth 2.0 + TLS 1.3',
        outcome: 'HIPAA & SOC-2 Ready',
        desc: 'Enterprise role-based permissions and strict encryption.',
        icon: ShieldCheck,
      },
    ],
  },
  {
    id: 'platforms',
    number: '03',
    title: 'Digital Platforms',
    icon: LayoutTemplate,
    badge: 'ULTRA VELOCITY',
    accentColor: '#1A7097',
    stat: 'Sub-0.7s Page Load',
    statSub: '100/100 Core Web Vitals',
    pipeline: [
      {
        step: '01',
        title: 'Global Edge CDN',
        tech: 'Anycast Distributed Cache',
        outcome: 'Instant Open Times',
        desc: 'Loads instantly for local and international visitors alike.',
        icon: Globe2,
      },
      {
        step: '02',
        title: 'Conversion UX',
        tech: 'Framer Motion + Tailwind',
        outcome: 'Higher Booking Rates',
        desc: 'Friction-free checkout and scheduling flows optimized for revenue.',
        icon: Code2,
      },
      {
        step: '03',
        title: 'Core Web Vitals',
        tech: 'Perfect 100/100 Score',
        outcome: 'Top Google Rankings',
        desc: 'Maximum SEO ranking advantage over slower local competitors.',
        icon: Activity,
      },
      {
        step: '04',
        title: 'Bank-Grade TLS',
        tech: 'Automated SSL & DDoS Shield',
        outcome: 'Zero Customer Drops',
        desc: 'Always-on reliability with automated failover protection.',
        icon: ShieldCheck,
      },
    ],
  },
] as const;

export type PillarId = (typeof ACTION_PILLARS)[number]['id'];

interface FloatingActionHubProps {
  activePillarId: PillarId;
  onSelectPillar: (id: PillarId) => void;
  onHoverStateChange?: (isHovered: boolean) => void;
}

export default function FloatingActionHub({
  activePillarId,
  onSelectPillar,
  onHoverStateChange,
}: FloatingActionHubProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentPillar =
    ACTION_PILLARS.find((p) => p.id === activePillarId) || ACTION_PILLARS[0];

  // Sequential data flow packet animation: cycles through 0 -> 1 -> 2 -> 3
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(timer);
  }, [isHovered, activePillarId]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverStateChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverStateChange?.(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-4xl mx-auto select-none"
    >
      {/* ── Outer Frosted Physical Glass Console Shell ── */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-white/92 border border-white/80 ring-1 ring-slate-900/10 p-3.5 sm:p-4 md:p-5 shadow-[0_28px_65px_-12px_rgba(15,23,42,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)] backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_32px_75px_-12px_rgba(15,23,42,0.16)] overflow-hidden">
        
        {/* Shimmer Light Beam scanning along the top rim */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#1a7097]/60 to-transparent animate-beam pointer-events-none" />

        {/* ── 1. Top Engine Segment Switcher Row ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-100">
          
          {/* Segmented Tactile Mode Buttons */}
          <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-100/90 border border-slate-200/70 w-full sm:w-auto">
            {ACTION_PILLARS.map((pillar) => {
              const isSelected = activePillarId === pillar.id;
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => {
                    onSelectPillar(pillar.id as PillarId);
                    setActiveStepIndex(0);
                  }}
                  className={`relative py-1.5 px-2.5 sm:px-3.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                    isSelected
                      ? 'bg-[#090D15] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#E7B900]' : 'text-slate-400'}`} />
                  <span className="truncate">{pillar.title}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Live Metric & Engine Status Tag */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end px-1">
            <div className="flex items-center gap-1.5 text-xs text-left">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-900 font-mono text-[11px]">
                {currentPillar.stat}
              </span>
              <span className="text-slate-400 text-[10px] hidden md:inline">
                ({currentPillar.statSub})
              </span>
            </div>
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-[#1A7097] bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100 shadow-2xs">
              {currentPillar.badge}
            </span>
          </div>

        </div>

        {/* ── 2. The Living Visual Architecture Pipeline Deck ── */}
        <div className="pt-3 pb-2 text-left">
          
          {/* Section Header with Live Pulse Label */}
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2.5 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A7097] animate-ping" />
              <span>ACTIVE ARCHITECTURE PIPELINE // {currentPillar.title}</span>
            </span>
            <span className="text-slate-500 font-medium">
              Step {activeStepIndex + 1} of 4: Processing
            </span>
          </div>

          {/* Connected 4-Node Flow with Animated Travel Particles */}
          <div className="relative">
            
            {/* Desktop Connector Track Line behind cards */}
            <div className="hidden sm:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-slate-200/70 z-0 pointer-events-none" />

            {/* Traveling Data Packet Light Pulse along the rail */}
            <motion.div
              className="hidden sm:block absolute top-[27px] w-3 h-1 rounded-full bg-gradient-to-r from-[#1A7097] to-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.8)] z-10 pointer-events-none"
              animate={{
                left: `${12 + activeStepIndex * 25}%`,
              }}
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 24,
              }}
            />

            {/* The 4 Pipeline Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-2.5 relative z-10">
              <AnimatePresence mode="wait">
                {currentPillar.pipeline.map((node, index) => {
                  const NodeIcon = node.icon;
                  const isCurrent = activeStepIndex === index;

                  return (
                    <motion.div
                      key={node.step + currentPillar.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                      onClick={() => setActiveStepIndex(index)}
                      className={`relative p-2.5 sm:p-3 rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between text-left ${
                        isCurrent
                          ? 'bg-white border-2 border-[#1A7097] shadow-[0_8px_20px_rgba(26,112,151,0.14)] ring-2 ring-sky-100'
                          : 'bg-white/80 hover:bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300'
                      }`}
                    >
                      {/* Top Row: Step Tag + Icon */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                            isCurrent
                              ? 'bg-[#090D15] text-white'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          STEP {node.step}
                        </span>

                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                            isCurrent
                              ? 'bg-[#1A7097] text-white'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <NodeIcon className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Technical Spec Name */}
                      <div className="mb-1">
                        <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wide font-medium truncate">
                          {node.tech}
                        </span>
                        {/* High-Impact Business Outcome */}
                        <span className="block font-black text-slate-900 text-xs sm:text-[13px] leading-snug mt-0.5">
                          {node.outcome}
                        </span>
                      </div>

                      {/* Plain-English Business Value Micro-Copy */}
                      <p className="text-[10px] text-slate-500 leading-relaxed mt-1">
                        {node.desc}
                      </p>

                      {/* Subtle Active Indicator Dot */}
                      {isCurrent && (
                        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center gap-1.5 text-[9.5px] font-mono text-[#1A7097] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Active Stage</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* ── 3. Bottom Action Gateway & Authentic Credibility ── */}
        <div className="pt-3 mt-1 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Trust Badge: 5.0 Google Verified */}
          <div className="flex items-center gap-2.5 text-left">
            <div className="w-8 h-8 rounded-xl bg-amber-50/90 border border-amber-200/90 flex items-center justify-center text-amber-600 shrink-0 shadow-2xs">
              <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#F59E0B] leading-none">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-[#F59E0B]" />
                ))}
                <span className="text-[11px] font-black text-slate-900 ml-1 font-mono">5.0 Star</span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500 mt-0.5">
                100% Principal Access • Strict Mutual NDA
              </p>
            </div>
          </div>

          {/* Dual Strategic Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link href="/contact" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto relative group overflow-hidden bg-[#090D15] hover:bg-[#1A7097] text-white px-5 py-2.5 rounded-full font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm tracking-wide shadow-[0_6px_18px_rgba(9,13,21,0.16)] transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#E7B900] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </Link>

            <Link href="/portfolio" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-[#090D15] font-bold text-xs sm:text-sm shadow-2xs transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Systems</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </motion.button>
            </Link>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
