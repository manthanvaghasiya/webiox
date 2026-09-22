'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Code2,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  GitBranch,
  Terminal,
  Activity,
  Check,
  ChevronRight,
  ExternalLink,
  LucideIcon,
} from 'lucide-react';

interface Stage {
  id: string;
  number: string;
  title: string;
  tagline: string;
  duration: string;
  icon: LucideIcon;
  overview: string;
  deliverables: { title: string; desc: string }[];
  stack: string[];
  qaGate: string;
  artifactCode: string;
}

const STAGES: Stage[] = [
  {
    id: 'stage-1',
    number: '01',
    title: 'Architectural Blueprint & UX Spec',
    tagline: 'System Foundation & Design System',
    duration: 'Sprint 01 // Day 1–14',
    icon: Compass,
    overview:
      'We never write code in the dark. We map your complete domain model, design tokenized Figma design systems, and define strict API contracts before engineering begins.',
    deliverables: [
      {
        title: 'Tokenized Figma Design System',
        desc: 'Production-ready component library, responsive layouts, and micro-interactions.',
      },
      {
        title: 'Prisma & PostgreSQL Schema',
        desc: 'Relational data models, indexing strategies, and database ERDs.',
      },
      {
        title: 'API & Domain Contracts',
        desc: 'Strict TypeScript interfaces and REST/GraphQL endpoint specifications.',
      },
    ],
    stack: ['Figma', 'TypeScript', 'Prisma', 'PostgreSQL', 'Next.js 15'],
    qaGate: 'Architecture & UX Sign-off ✓',
    artifactCode: 'schema.prisma // 14 models verified • 0 circular dependencies',
  },
  {
    id: 'stage-2',
    number: '02',
    title: 'Fullstack Core Engine & CI/CD',
    tagline: 'High-Velocity Engineering',
    duration: 'Sprint 02 // Day 15–28',
    icon: Code2,
    overview:
      'Our senior architects construct your core application on Next.js 15 App Router with server actions, stateless JWT auth, and automated GitHub Actions deployment pipelines.',
    deliverables: [
      {
        title: 'Next.js 15 Server Components',
        desc: 'Sub-second rendering with streaming SSR and granular data caching.',
      },
      {
        title: 'Zero-Trust Stateless Auth',
        desc: 'Cryptographic JWT session management with role-based access control (RBAC).',
      },
      {
        title: 'Automated CI/CD Pipelines',
        desc: 'Continuous linting, type-checking, and automatic PR staging preview environments.',
      },
    ],
    stack: ['Next.js 15', 'React 19', 'Tailwind CSS', 'Docker', 'GitHub Actions'],
    qaGate: 'Core Engine CI/CD Passed ✓',
    artifactCode: 'git commit -m "feat(core): sub-second streaming engine active" [PASS]',
  },
  {
    id: 'stage-3',
    number: '03',
    title: 'Penetration QA & Edge Hardening',
    tagline: 'Security & Core Web Vitals',
    duration: 'Sprint 03 // Day 29–42',
    icon: ShieldCheck,
    overview:
      'We put every build through rigorous OWASP vulnerability audits, automated penetration screening, and Core Web Vitals optimization to guarantee sub-400ms load times.',
    deliverables: [
      {
        title: 'Cloudflare Enterprise Edge WAF',
        desc: 'Layer 7 DDoS shield, automated rate-limiting, and bot-traffic mitigation.',
      },
      {
        title: 'OWASP Top 10 Security Audit',
        desc: 'Zero CVE vulnerabilities across all third-party libraries and server endpoints.',
      },
      {
        title: '98+ Core Web Vitals Benchmark',
        desc: 'Sub-400ms LCP, 0.00 CLS layout stability, and instant page transitions.',
      },
    ],
    stack: ['Cloudflare WAF', 'OWASP ZAP', 'Playwright', 'Redis Edge', 'Lighthouse'],
    qaGate: 'Zero CVE & 98+ Speed Verified ✓',
    artifactCode: 'audit_report.json // 0 vulnerabilities detected • 99/100 Mobile Score',
  },
  {
    id: 'stage-4',
    number: '04',
    title: 'Zero-Downtime Launch & Hypercare',
    tagline: 'Production Cutover & 30D SLA',
    duration: 'Sprint 04 // Day 43–56',
    icon: Rocket,
    overview:
      'We orchestrate zero-downtime DNS cutovers with pre-warmed Edge caches, followed by 30 days of direct senior developer hypercare and SLA monitoring.',
    deliverables: [
      {
        title: 'Zero-Downtime DNS Cutover',
        desc: 'Seamless traffic migration with instant SSL TLS 1.3 certificate provisioning.',
      },
      {
        title: 'Edge Cache Pre-Warming',
        desc: 'Static asset propagation across 300+ global Edge points of presence.',
      },
      {
        title: '30-Day Direct Hypercare',
        desc: 'Direct Slack and WhatsApp channel with the architects who built your codebase.',
      },
    ],
    stack: ['Edge CDN', 'Datadog', 'Sentry', 'Slack VIP', 'WhatsApp VIP'],
    qaGate: 'Production Handover & 100% Escrow Release ✓',
    artifactCode: 'deployment: live at https://production.domain.com [UPTIME 100%]',
  },
];

export default function Process() {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const activeStage = STAGES[activeStageIndex];

  return (
    <section
      id="process"
      className="relative bg-[#FCFCFD] text-[#0F172A] py-24 sm:py-32 overflow-hidden selection:bg-[#1a7097] selection:text-white"
    >
      {/* ── Ambient Background Lighting ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 10%, rgba(26, 112, 151, 0.07) 0%, transparent 60%),
            radial-gradient(circle at 80% 80%, rgba(231, 185, 0, 0.05) 0%, transparent 50%),
            repeating-linear-gradient(
              90deg,
              rgba(26, 112, 151, 0.03) 0px,
              rgba(26, 112, 151, 0.03) 1px,
              transparent 1px,
              transparent 48px
            )
          `,
        }}
      />
      <div className="absolute top-1/3 -right-48 w-96 h-96 rounded-full bg-[#1a7097]/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-48 w-96 h-96 rounded-full bg-[#E7B900]/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-[11px] font-mono font-bold text-[#1a7097] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E7B900]" />
            <span className="tracking-wider uppercase">EXECUTION PROTOCOL</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">4-STAGE SPRINT LIFECYCLE</span>
          </div>

          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-[-0.03em] leading-[1.12] mb-4 [text-wrap:balance]">
            <span>How We Build </span>
            <span className="bg-gradient-to-r from-[#1a7097] via-[#0284c7] to-[#38bdf8] bg-clip-text text-transparent">
              Great Software.
            </span>
          </h2>

          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base text-slate-500 font-normal leading-relaxed max-w-2xl">
            A structured, transparent engineering lifecycle from architecture blueprint to zero-downtime production cutover. Every milestone is verifiable with zero scope creep.
          </p>
        </div>

        {/* ── Interactive 4-Stage Delivery Pipeline ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive 4-Stage Stepper Navigation (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Select Phase to Inspect:
            </div>

            {STAGES.map((stage, idx) => {
              const IconComp = stage.icon;
              const isActive = activeStageIndex === idx;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStageIndex(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative group flex items-start gap-4 ${
                    isActive
                      ? 'bg-white border-[#1a7097] shadow-[0_15px_35px_-10px_rgba(26,112,151,0.18)] ring-1 ring-[#1a7097]/40'
                      : 'bg-white/70 hover:bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  {/* Left Indicator Pill */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive
                        ? 'bg-[#1a7097] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-[#1a7097]/10 group-hover:text-[#1a7097]'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>

                  {/* Stage Text */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-[10.5px] font-bold text-[#1a7097]">
                        STAGE_{stage.number}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        {stage.duration}
                      </span>
                    </div>

                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base text-[#0F172A] truncate">
                      {stage.title}
                    </h3>
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-slate-500 truncate mt-0.5">
                      {stage.tagline}
                    </p>
                  </div>

                  {/* Active Indicator Chevron */}
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform duration-300 mt-3 ${
                      isActive ? 'text-[#1a7097] translate-x-1' : 'text-slate-300 group-hover:text-slate-400'
                    }`}
                  />
                </button>
              );
            })}

            {/* SLA Reassurance Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-[#E7B900]/30 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E7B900]/20 flex items-center justify-center shrink-0 text-[#E7B900]">
                <Activity className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#0F172A] block">
                  100% Escrow Milestone Guarantee
                </span>
                <span className="text-slate-500 text-[11.5px]">
                  Invoices are released only when each staging QA gate passes your sign-off.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Active Stage Telemetry Inspector (7 Cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 relative overflow-hidden shadow-[0_20px_50px_-15px_rgba(26,112,151,0.12)]"
              >
                {/* Specular Ambient Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#1a7097]/8 rounded-full blur-3xl pointer-events-none" />
                
                {/* Corner Crosshairs */}
                <div className="absolute top-3 left-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
                <div className="absolute top-3 right-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>

                {/* Stage Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a7097]/10 border border-[#1a7097]/20 text-[11px] font-mono font-bold text-[#1a7097]">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>INSPECTING STAGE {activeStage.number}</span>
                  </div>

                  <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80">
                    {activeStage.qaGate}
                  </span>
                </div>

                {/* Overview Paragraph */}
                <div className="mb-6">
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl text-[#0F172A] tracking-tight mb-2">
                    {activeStage.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
                    {activeStage.overview}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="mb-6">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-3">
                    Verified Deliverables for this Phase:
                  </span>
                  <div className="space-y-2.5">
                    {activeStage.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/70 flex items-start gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-[13px] text-[#0F172A]">
                            {item.title}
                          </div>
                          <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Stack Tags */}
                <div className="mb-6">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                    Engineering Stack Deployed:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeStage.stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-[#0F172A] text-xs font-mono font-bold shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live Simulated Console Terminal Output */}
                <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] flex items-center justify-between gap-3 shadow-inner">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-emerald-400">➜</span>
                    <span className="text-slate-400 truncate">{activeStage.artifactCode}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#E7B900] shrink-0">
                    STAGE QA LOCK
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
