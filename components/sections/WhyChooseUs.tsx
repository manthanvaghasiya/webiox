'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gauge,
  Clock,
  Lock,
  MessageSquare,
  AlertTriangle,
  XCircle,
  Check,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

type PerspectiveMode = 'contrast' | 'webiox' | 'traditional';

interface SprintGate {
  num: string;
  name: string;
  duration: string;
  status: string;
}

const SPRINT_GATES: SprintGate[] = [
  {
    num: '01',
    name: 'Architecture & UX Spec',
    duration: 'Sprint 01 (Day 1–14)',
    status: 'Verified Gate ✓',
  },
  {
    num: '02',
    name: 'Fullstack Next.js Engine',
    duration: 'Sprint 02 (Day 15–28)',
    status: 'Verified Gate ✓',
  },
  {
    num: '03',
    name: 'Security & Edge Staging',
    duration: 'Sprint 03 (Day 29–42)',
    status: 'Active Review ⚡',
  },
  {
    num: '04',
    name: 'Zero-Downtime Launch',
    duration: 'Sprint 04 (Day 43–56)',
    status: 'SLA Release ✓',
  },
];

const TRADITIONAL_GATES: SprintGate[] = [
  {
    num: '01',
    name: 'Vague Scope & PDF Slides',
    duration: 'Month 01–02 (Delayed)',
    status: 'Scope Drift ✕',
  },
  {
    num: '02',
    name: 'Hourly Billing Drain',
    duration: 'Month 03–04 (+35% Cost)',
    status: 'Surprise Fees ✕',
  },
  {
    num: '03',
    name: 'Broken Staging & Ghosting',
    duration: 'Month 05 (+60 Days)',
    status: 'QA Abandoned ✕',
  },
  {
    num: '04',
    name: 'Hostage Handover Fees',
    duration: 'Month 06+ (No Warranty)',
    status: 'No SLA / Risk ✕',
  },
];

const WEBIOX_DEFENSE_ITEMS = [
  {
    title: 'Layer 7 Cloudflare Edge WAF',
    desc: 'DDoS mitigation & bot screening (< 100k req/s)',
    status: 'Active Shield',
  },
  {
    title: 'Zero-Knowledge JWT & RBAC',
    desc: 'Stateless session encryption with WebAuthn',
    status: 'Hardened',
  },
  {
    title: 'OWASP Automated CI/CD Audits',
    desc: 'Zero 3rd-party unpatched dependencies',
    status: '0 CVE',
  },
];

const TRADITIONAL_VULNERABILITIES = [
  {
    title: 'Shared Apache Server (No WAF)',
    desc: 'Zero DDoS mitigation; crashes under 400 req/s',
    status: 'Vulnerable',
  },
  {
    title: 'Plaintext Cookies & Secrets',
    desc: 'Hardcoded keys & database passwords in repo',
    status: 'Exposed',
  },
  {
    title: '38 Unpatched 3rd-Party Plugins',
    desc: '12 known high-severity CVE exploits in outdated code',
    status: '12 CVEs',
  },
];

const SQUAD_PILLARS = [
  {
    category: 'Engineering Access',
    title: 'Lead Architect Direct',
    desc: 'Direct line to Lead Architect Manthan Vaghasiya & senior fullstack engineers.',
    metric: 'Zero Middlemen',
  },
  {
    category: 'War-Room Channel',
    title: 'Slack & WhatsApp VIP',
    desc: 'Private dedicated squad channel with real-time PR & deployment updates.',
    metric: 'Instant Sync',
  },
  {
    category: 'Turnaround SLA',
    title: '< 12-Minute Average Reply',
    desc: 'Rapid architectural decisions, staging deployments, and proactive async walkthroughs.',
    metric: '< 12m Turnaround',
  },
];

const TRADITIONAL_SQUAD = [
  {
    category: 'Engineering Access',
    title: 'Non-Technical Middlemen',
    desc: 'Account managers sit between you and offshore development teams.',
    metric: '3 Buffer Layers',
  },
  {
    category: 'Support Channel',
    title: 'Slow Email Ticket Queue',
    desc: 'Every question is funneled through generic ticket queues with long delays.',
    metric: 'Days of Delay',
  },
  {
    category: 'Response SLA',
    title: '48h–72h Turnaround',
    desc: 'Simple bug fixes take days to translate into overseas Jira tickets.',
    metric: '48h–72h Lag',
  },
];

const PILLARS = [
  { id: 'velocity', num: '01', title: 'Velocity', subtitle: 'Edge SLA', icon: Gauge },
  { id: 'milestones', num: '02', title: 'Milestones', subtitle: '100% Lock', icon: Clock },
  { id: 'security', num: '03', title: 'Security', subtitle: 'Zero-Trust', icon: Lock },
  { id: 'squad', num: '04', title: 'Direct Squad', subtitle: 'Zero Middlemen', icon: MessageSquare },
];

export default function WhyChooseUs() {
  const [mode, setMode] = useState<PerspectiveMode>('contrast');
  const [mobilePillar, setMobilePillar] = useState<number>(0);

  /* ──────────────────────────────────────────────────────────────────
      MODULE 01: VELOCITY & INFRASTRUCTURE
     ────────────────────────────────────────────────────────────────── */
  const renderModule01 = (isMobile?: boolean) => {
    const isTraditional = mode === 'traditional';

    return (
      <div
        className={`w-full h-full rounded-3xl bg-gradient-to-b from-white via-slate-50/30 to-slate-50/70 border ${
          isTraditional
            ? 'border-rose-200/90 shadow-[0_20px_50px_-15px_rgba(225,29,72,0.12)]'
            : 'border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(55,122,155,0.1)]'
        } ${isMobile ? 'p-5' : 'p-6 sm:p-7 lg:p-8'} relative overflow-hidden transition-all duration-500 flex flex-col justify-between gap-5 sm:gap-6`}
      >
        <div
          className={`absolute top-0 right-0 w-80 h-80 ${
            isTraditional ? 'bg-rose-500/8' : 'bg-[#377a9b]/8'
          } rounded-full blur-3xl pointer-events-none`}
        />
        <div aria-hidden="true" className="absolute top-3 left-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute top-3 right-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute bottom-3 right-3 text-slate-400 font-mono text-[9px] select-none pointer-events-none">
          {isTraditional ? 'LEGACY_MONOLITH // UNCACHED' : 'SURAT_EDGE // 21.17°N 72.83°E'}
        </div>

        {/* Header Block */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold ${
                isTraditional
                  ? 'bg-rose-50 border border-rose-200 text-rose-700'
                  : 'bg-[#377a9b]/10 border border-[#377a9b]/25 text-[#377a9b]'
              }`}
            >
              {isTraditional ? <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> : <Zap className="w-3.5 h-3.5 text-[#377a9b]" />}
              <span>{isTraditional ? '01 // MONOLITHIC BOTTLENECK' : '01 // VELOCITY & INFRASTRUCTURE'}</span>
            </div>

            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold ${
                isTraditional
                  ? 'bg-rose-50 border border-rose-200 text-rose-700'
                  : 'bg-emerald-50 border border-emerald-200/90 text-emerald-800'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isTraditional ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}`} />
              <span>{isTraditional ? '850MS ORIGIN DELAY' : 'SUB-SECOND EDGE ACTIVE'}</span>
            </div>
          </div>

          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl text-[#0F172A] tracking-tight mb-2">
            {isTraditional ? 'Monolithic Infrastructure Lag.' : 'Sub-Second Edge Infrastructure.'}
          </h3>
          <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
            {isTraditional
              ? 'Legacy WordPress/PHP stacks with 30+ unpatched plugins. Uncached database queries create 850ms TTFB bottlenecks and sluggish page renders.'
              : 'Next.js 16 App Router paired with multi-region Edge Redis caching. Zero cold starts, instant client transitions, and verified sub-400ms LCP.'}
          </p>
        </div>

        {/* Hero Speed Benchmark Box */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border transition-all ${
            isTraditional
              ? 'bg-rose-50/50 border-rose-200/90'
              : 'bg-gradient-to-br from-slate-50 via-white to-sky-50/40 border-slate-200/90 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-200/70">
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                {isTraditional ? 'Largest Contentful Paint (LCP)' : 'Verified Production LCP Paint'}
              </div>
              <div className="flex items-baseline gap-2.5 mt-0.5">
                <span
                  className={`font-mono font-black text-3xl sm:text-4xl tracking-tight ${
                    isTraditional ? 'text-rose-600' : 'text-[#377a9b]'
                  }`}
                >
                  {isTraditional ? '3.8s' : '0.38s'}
                </span>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    isTraditional ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {isTraditional ? 'High Bounce Risk' : 'Instant Render (<400ms)'}
                </span>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Architecture SLA</div>
              <div className={`text-xs font-mono font-bold ${isTraditional ? 'text-rose-600' : 'text-slate-700'}`}>
                {isTraditional ? 'Origin Uncached' : 'Multi-Region Edge PoP'}
              </div>
            </div>
          </div>

          {/* 3 Companion Telemetry Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 border border-slate-200/70 shadow-2xs">
              <div className="text-[9.5px] font-mono text-slate-500 uppercase truncate">TTFB Latency</div>
              <div className={`font-mono font-bold text-sm sm:text-base ${isTraditional ? 'text-rose-600' : 'text-slate-900'}`}>
                {isTraditional ? '850ms' : '38ms'}
              </div>
              <div className="text-[9px] font-mono text-slate-400 truncate">{isTraditional ? 'Origin delay' : 'Global edge'}</div>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 border border-slate-200/70 shadow-2xs">
              <div className="text-[9.5px] font-mono text-slate-500 uppercase truncate">Bundle Size</div>
              <div className={`font-mono font-bold text-sm sm:text-base ${isTraditional ? 'text-rose-600' : 'text-slate-900'}`}>
                {isTraditional ? '2.4 MB' : '~78 KB'}
              </div>
              <div className="text-[9px] font-mono text-slate-400 truncate">{isTraditional ? 'Unminified' : 'Tree-shaken'}</div>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 border border-slate-200/70 shadow-2xs">
              <div className="text-[9.5px] font-mono text-slate-500 uppercase truncate">Core Vitals</div>
              <div className={`font-mono font-bold text-sm sm:text-base ${isTraditional ? 'text-rose-600' : 'text-emerald-700'}`}>
                {isTraditional ? '48 / 100' : '99 / 100'}
              </div>
              <div className="text-[9px] font-mono text-slate-400 truncate">{isTraditional ? 'Fails CWV' : 'Green audits'}</div>
            </div>
          </div>
        </div>

        {/* Bottom 3-Pill Tech Specs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {(isTraditional
            ? ['Uncached Apache / PHP', 'Blocking 3rd-Party Scripts', 'Single Origin Host']
            : ['Next.js 16 Partial Prerendering', 'Edge Redis Invalidation', 'Cloudflare Enterprise CDN']
          ).map((item, idx) => (
            <span
              key={idx}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] font-mono font-semibold border ${
                isTraditional
                  ? 'bg-rose-50/80 border-rose-200/80 text-rose-800'
                  : 'bg-slate-100/90 border-slate-200/80 text-slate-700'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isTraditional ? 'bg-rose-500' : 'bg-[#377a9b]'}`} />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    );
  };

  /* ──────────────────────────────────────────────────────────────────
      MODULE 02: MILESTONE LOCK PROTOCOL
     ────────────────────────────────────────────────────────────────── */
  const renderModule02 = (isMobile?: boolean) => {
    const isTraditional = mode === 'traditional';
    const activeGates = isTraditional ? TRADITIONAL_GATES : SPRINT_GATES;

    return (
      <div
        className={`w-full h-full rounded-3xl bg-gradient-to-b from-white via-slate-50/30 to-slate-50/70 border ${
          isTraditional
            ? 'border-rose-200/90 shadow-[0_20px_50px_-15px_rgba(225,29,72,0.12)]'
            : 'border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(55,122,155,0.1)]'
        } ${isMobile ? 'p-5' : 'p-6 sm:p-7 lg:p-8'} relative overflow-hidden transition-all duration-500 flex flex-col justify-between gap-5 sm:gap-6`}
      >
        <div
          className={`absolute top-0 right-0 w-80 h-80 ${
            isTraditional ? 'bg-rose-500/8' : 'bg-amber-500/8'
          } rounded-full blur-3xl pointer-events-none`}
        />
        <div aria-hidden="true" className="absolute top-3 left-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute top-3 right-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute bottom-3 right-3 text-slate-400 font-mono text-[9px] select-none pointer-events-none">
          {isTraditional ? 'DRIFT_RISK // HOURLY_DRAIN' : 'SLA_PROTOCOL // ZERO_DRIFT'}
        </div>

        {/* Header Block */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold ${
                isTraditional
                  ? 'bg-rose-50 border border-rose-200/80 text-rose-700'
                  : 'bg-amber-50 border border-amber-200/80 text-amber-800'
              }`}
            >
              <Clock className={`w-3.5 h-3.5 ${isTraditional ? 'text-rose-600' : 'text-amber-600'}`} />
              <span>{isTraditional ? '02 // SCOPE DRIFT & BILLING TRAPS' : '02 // MILESTONE LOCK PROTOCOL'}</span>
            </div>

            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold ${
                isTraditional
                  ? 'bg-rose-50 border border-rose-200 text-rose-700'
                  : 'bg-amber-50 border border-amber-200/80 text-amber-800'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isTraditional ? 'bg-rose-500' : 'bg-amber-500'}`} />
              <span>{isTraditional ? 'UNCAPPED HOURLY DRIFT' : '100% SLA ESCROW LOCK'}</span>
            </div>
          </div>

          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl text-[#0F172A] tracking-tight mb-2">
            {isTraditional ? 'The Hourly Billing Trap.' : 'Sprint Milestone Vault.'}
          </h3>
          <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
            {isTraditional
              ? 'Agencies drag projects for months with open-ended hourly billing. Scope creeps continuously, deadlines slip, and unexpected invoices pile up.'
              : 'Delivery locked into verified 14-day sprint cycles. Milestones unlock strictly after staging QA sign-off — 0% scope creep guaranteed.'}
          </p>
        </div>

        {/* 4 Connected Sprint Gates */}
        <div className="space-y-2">
          {activeGates.map((gate, gIdx) => (
            <div
              key={gIdx}
              className={`p-2.5 sm:p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                isTraditional
                  ? 'bg-rose-50/40 border-rose-200/70 hover:bg-rose-50/70'
                  : 'bg-slate-50/80 border-slate-200/70 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`w-6 h-6 rounded-lg font-mono text-[11px] font-black flex items-center justify-center shrink-0 ${
                    isTraditional ? 'bg-rose-100 text-rose-700' : 'bg-white text-[#377a9b] border border-slate-200 shadow-2xs'
                  }`}
                >
                  {gate.num}
                </span>
                <div className="min-w-0">
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-[13px] text-[#0F172A] truncate">
                    {gate.name}
                  </div>
                  <div className="font-mono text-[10px] text-slate-500 truncate">
                    {gate.duration}
                  </div>
                </div>
              </div>

              <span
                className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold shrink-0 ${
                  isTraditional
                    ? 'bg-rose-100/90 text-rose-700 border border-rose-200/60'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                }`}
              >
                {gate.status}
              </span>
            </div>
          ))}
        </div>

        {/* SLA Commitment Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500 text-[10.5px]">
            {isTraditional ? 'Uncapped Scope Overruns' : '0% Scope Drift Guarantee'}
          </span>
          <span className={`font-bold text-[10.5px] ${isTraditional ? 'text-rose-600' : 'text-[#377a9b]'}`}>
            {isTraditional ? 'Surprise Change-Orders ✕' : 'QA Staging Sign-Off Required ✓'}
          </span>
        </div>
      </div>
    );
  };

  /* ──────────────────────────────────────────────────────────────────
      MODULE 03: DEFENSIVE SECURITY CORE
     ────────────────────────────────────────────────────────────────── */
  const renderModule03 = (isMobile?: boolean) => {
    const isTraditional = mode === 'traditional';
    const activeDefenseItems = isTraditional ? TRADITIONAL_VULNERABILITIES : WEBIOX_DEFENSE_ITEMS;

    return (
      <div
        className={`w-full h-full rounded-3xl bg-gradient-to-b from-white via-slate-50/30 to-slate-50/70 border ${
          isTraditional
            ? 'border-rose-200/90 shadow-[0_20px_50px_-15px_rgba(225,29,72,0.12)]'
            : 'border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(55,122,155,0.1)]'
        } ${isMobile ? 'p-5' : 'p-6 sm:p-7 lg:p-8'} relative overflow-hidden transition-all duration-500 flex flex-col justify-between gap-5 sm:gap-6`}
      >
        <div
          className={`absolute top-0 right-0 w-80 h-80 ${
            isTraditional ? 'bg-rose-500/8' : 'bg-emerald-500/8'
          } rounded-full blur-3xl pointer-events-none`}
        />
        <div aria-hidden="true" className="absolute top-3 left-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute top-3 right-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute bottom-3 right-3 text-slate-400 font-mono text-[9px] select-none pointer-events-none">
          {isTraditional ? 'EXPLOIT_SURFACE // ZERO_WAF' : 'DEFENSE_CORE // SOC_2_READY'}
        </div>

        {/* Header Block */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold ${
                isTraditional
                  ? 'bg-rose-50 border border-rose-200/80 text-rose-700'
                  : 'bg-emerald-50 border border-emerald-200/80 text-emerald-800'
              }`}
            >
              <Lock className={`w-3.5 h-3.5 ${isTraditional ? 'text-rose-600' : 'text-emerald-600'}`} />
              <span>{isTraditional ? '03 // VULNERABLE SHARED HOSTING' : '03 // DEFENSIVE SECURITY CORE'}</span>
            </div>

            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold ${
                isTraditional
                  ? 'bg-rose-50 border border-rose-200 text-rose-700'
                  : 'bg-emerald-50 border border-emerald-200/80 text-emerald-800'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isTraditional ? 'bg-rose-500' : 'bg-emerald-500'}`} />
              <span>{isTraditional ? '12 KNOWN EXPLOITS' : '0 CVE VULNERABILITIES'}</span>
            </div>
          </div>

          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl text-[#0F172A] tracking-tight mb-2">
            {isTraditional ? 'Zero-Trust Neglected.' : 'Hardened Zero-Trust Core.'}
          </h3>
          <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
            {isTraditional
              ? 'Outdated CMS setups running unpatched third-party plugins on shared hosting. Secrets stored in plaintext and zero DDoS edge protection.'
              : 'Hardened TypeScript architectures with automated CI/CD audits, cryptographic session encryption, and enterprise Layer 7 edge firewalls.'}
          </p>
        </div>

        {/* 3 Streamlined Security Pillars */}
        <div className="space-y-2.5">
          {activeDefenseItems.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                isTraditional
                  ? 'bg-rose-50/40 border-rose-200/70 hover:bg-rose-50/70'
                  : 'bg-slate-50/80 border-slate-200/70 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                    isTraditional ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {isTraditional ? <XCircle className="w-3.5 h-3.5 text-rose-600" /> : <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-700" />}
                </div>
                <div className="min-w-0">
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-[13px] text-[#0F172A] truncate">
                    {item.title}
                  </div>
                  <div className="font-mono text-[10px] text-slate-500 truncate mt-0.5">
                    {item.desc}
                  </div>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold shrink-0 ${
                  isTraditional
                    ? 'bg-rose-100/90 text-rose-700 border border-rose-200/60'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>

        {/* Security Standard Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500 text-[10.5px]">
            {isTraditional ? 'Exploit Surface: Unmonitored' : 'SOC-2 Ready Architecture'}
          </span>
          <span className={`font-bold text-[10.5px] ${isTraditional ? 'text-rose-600' : 'text-emerald-700'}`}>
            {isTraditional ? 'High Risk Surface ✕' : 'Zero 3rd-Party Vulnerabilities ✓'}
          </span>
        </div>
      </div>
    );
  };

  /* ──────────────────────────────────────────────────────────────────
      MODULE 04: AGILITY & DIRECT COLLABORATION
     ────────────────────────────────────────────────────────────────── */
  const renderModule04 = (isMobile?: boolean) => {
    const isTraditional = mode === 'traditional';
    const pillars = isTraditional ? TRADITIONAL_SQUAD : SQUAD_PILLARS;

    return (
      <div
        className={`w-full h-full rounded-3xl bg-gradient-to-b from-white via-slate-50/30 to-slate-50/70 border ${
          isTraditional
            ? 'border-rose-200/90 shadow-[0_20px_50px_-15px_rgba(225,29,72,0.12)]'
            : 'border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(55,122,155,0.1)]'
        } ${isMobile ? 'p-5' : 'p-6 sm:p-7 lg:p-8'} relative overflow-hidden transition-all duration-500 flex flex-col justify-between gap-5 sm:gap-6`}
      >
        <div
          className={`absolute top-0 right-0 w-80 h-80 ${
            isTraditional ? 'bg-rose-500/8' : 'bg-[#377a9b]/8'
          } rounded-full blur-3xl pointer-events-none`}
        />
        <div aria-hidden="true" className="absolute top-3 left-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute top-3 right-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute bottom-3 right-3 text-slate-400 font-mono text-[9px] select-none pointer-events-none">
          {isTraditional ? 'MIDDLEMEN_CHAIN // 48H_LAG' : 'SQUAD_UPLINK // SURAT_DIRECT'}
        </div>

        {/* Header Block */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold ${
                isTraditional
                  ? 'bg-rose-50 border border-rose-200/80 text-rose-700'
                  : 'bg-[#377a9b]/10 border border-[#377a9b]/25 text-[#377a9b]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{isTraditional ? '04 // MIDDLEMAN TELEPHONE GAME' : '04 // AGILITY & DIRECT SQUAD'}</span>
            </div>

            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold ${
                isTraditional
                  ? 'bg-rose-50 border border-rose-200 text-rose-700'
                  : 'bg-[#377a9b]/10 border border-[#377a9b]/25 text-[#377a9b]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isTraditional ? 'bg-rose-500' : 'bg-[#377a9b] animate-pulse'}`} />
              <span>{isTraditional ? '48H–72H EMAIL LAG' : '< 12M ARCHITECT REPLY'}</span>
            </div>
          </div>

          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl text-[#0F172A] tracking-tight mb-2">
            {isTraditional ? 'The Middleman Telephone Game.' : 'Direct Senior Engineers.'}
          </h3>
          <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
            {isTraditional
              ? 'Non-technical account managers sit between you and developers. Simple bug fixes take days to translate and invoices follow every request.'
              : 'Zero non-technical account managers. You collaborate directly with Lead Architect Manthan Vaghasiya in a dedicated engineering war-room.'}
          </p>
        </div>

        {/* 3 Crisp Engineering Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border transition-all ${
                isTraditional
                  ? 'bg-rose-50/40 border-rose-200/70'
                  : 'bg-slate-50/80 border-slate-200/70 hover:bg-slate-50'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold truncate">
                {item.category}
              </div>
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-[13px] text-[#0F172A] mt-1 truncate">
                {item.title}
              </div>
              <div
                className={`text-[10px] font-mono font-bold mt-1.5 inline-block px-1.5 py-0.5 rounded ${
                  isTraditional ? 'bg-rose-100 text-rose-700' : 'bg-[#377a9b]/10 text-[#377a9b]'
                }`}
              >
                {item.metric}
              </div>
            </div>
          ))}
        </div>

        {/* Action Connectors Strip */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          {isTraditional ? (
            <span className="font-mono text-[10.5px] text-rose-600 font-bold">
              Account Manager Queue: +3 Days Delay ✕
            </span>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/919664736245?text=Hi%20Manthan%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20Webiox."
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 font-mono text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp VIP Direct</span>
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-mono text-[11px] font-bold transition-all cursor-pointer"
                >
                  <span>Slack War-Room</span>
                  <ArrowRight className="w-3 h-3 text-[#377a9b]" />
                </a>
              </div>
              <span className="font-mono text-[10px] text-slate-500 font-semibold">
                Lead Architect: Manthan Vaghasiya
              </span>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      id="why-choose-us"
      className="relative bg-[#FCFCFD] text-[#0F172A] pt-20 sm:pt-28 lg:pt-32 pb-14 sm:pb-20 lg:pb-24 overflow-hidden selection:bg-[#377a9b] selection:text-white"
    >
      {/* ── Ambient Background Lighting (Curtain Glows & Micro-Grid) ── */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-section-pattern" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#377a9b]/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-[#ffc312]/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-[11px] font-mono font-bold text-[#377a9b] mb-3 sm:mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#ffc312]" />
            <span className="tracking-wider uppercase">THE WEBIOX ADVANTAGE</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">PROPRIETARY DELIVERY MODEL</span>
          </div>

          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-[-0.03em] leading-[1.15] mb-3 sm:mb-4 [text-wrap:balance]">
            <span>Why Ambitious Enterprises </span>
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#377a9b] via-[#0284c7] to-[#38bdf8] bg-clip-text text-transparent">
              Choose Webiox.
            </span>
          </h2>

          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm lg:text-base text-slate-500 font-normal leading-relaxed max-w-2xl mb-6 sm:mb-8">
            We don't build generic brochure templates. We engineer high-velocity digital products, cloud backends, and conversion-first platforms backed by verified milestone SLAs.
          </p>

          {/* ── Global Perspective Switcher ── */}
          <div className="w-full max-w-full overflow-x-auto no-scrollbar py-1 flex justify-center">
            <div className="inline-flex items-center p-1 sm:p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/90 shadow-2xs whitespace-nowrap">
              <button
                type="button"
                onClick={() => setMode('contrast')}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2 ${mode === 'contrast'
                    ? 'bg-white text-[#0F172A] shadow-xs border border-slate-200/80 ring-2 ring-[#377a9b]/20'
                    : 'text-slate-500 hover:text-[#0F172A]'
                  }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#377a9b]" />
                <span>Direct Contrast View</span>
                {mode === 'contrast' && (
                  <span className="ml-1 text-[9.5px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-[#377a9b] text-white">
                    Live
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMode('webiox')}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${mode === 'webiox'
                    ? 'bg-white text-[#0F172A] shadow-xs border border-slate-200/80 ring-2 ring-emerald-500/20'
                    : 'text-slate-500 hover:text-[#0F172A]'
                  }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>The Webiox Standard</span>
                {mode === 'webiox' && (
                  <span className="ml-1 text-[9.5px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-emerald-600 text-white">
                    Active
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMode('traditional')}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${mode === 'traditional'
                    ? 'bg-white text-[#0F172A] shadow-xs border border-slate-200/80 ring-2 ring-rose-500/20'
                    : 'text-slate-500 hover:text-[#0F172A]'
                  }`}
              >
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                <span>Traditional Agency Way</span>
                {mode === 'traditional' && (
                  <span className="ml-1 text-[9.5px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-rose-500 text-white">
                    Active
                  </span>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════════════
            MOBILE: EXECUTIVE CONTROL DECK (< 520px COMPACT AGENCY EXPERIENCE)
            Segmented 4-Pillar Control with Smooth Fluid Transitions
           ════════════════════════════════════════════════════════════════════ */}
        <div className="block lg:hidden mb-8">
          {/* Segmented Pillar Navigator Tabs (Touch targets >= 48px) */}
          <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-slate-100/90 border border-slate-200/90 mb-4 shadow-2xs">
            {PILLARS.map((p, idx) => {
              const Icon = p.icon;
              const isActive = mobilePillar === idx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setMobilePillar(idx)}
                  className={`min-h-[50px] py-2 px-1 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 active:scale-[0.98] ${isActive
                      ? 'bg-white text-[#377a9b] shadow-xs border border-slate-200/80 font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#377a9b]' : 'text-slate-500'}`} />
                  <span className="font-mono text-[9px] leading-none">{p.num}</span>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[9.5px] truncate max-w-full font-bold">
                    {p.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Card Stage */}
          <div className="relative min-h-[440px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-pillar-${mobilePillar}-${mode}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {mobilePillar === 0 && renderModule01(true)}
                {mobilePillar === 1 && renderModule02(true)}
                {mobilePillar === 2 && renderModule03(true)}
                {mobilePillar === 3 && renderModule04(true)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Pillar Navigation Bar (Touch targets >= 44px) */}
          <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-200/70">
            <button
              type="button"
              onClick={() => setMobilePillar((prev) => Math.max(0, prev - 1))}
              disabled={mobilePillar === 0}
              className="min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-all flex items-center gap-1 cursor-pointer active:scale-[0.98]"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            {/* 4 dots with active pill */}
            <div className="flex items-center gap-1">
              {PILLARS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMobilePillar(idx)}
                  className="p-2.5 flex items-center justify-center cursor-pointer -m-1"
                  aria-label={`Go to pillar 0${idx + 1}`}
                >
                  <span
                    className={`h-2 rounded-full transition-all duration-300 block ${mobilePillar === idx ? 'w-6 bg-[#377a9b]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                      }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMobilePillar((prev) => Math.min(PILLARS.length - 1, prev + 1))}
              disabled={mobilePillar === PILLARS.length - 1}
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#377a9b] text-white text-xs font-mono font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#2b6683] transition-all flex items-center gap-1 shadow-xs cursor-pointer active:scale-[0.98]"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            DESKTOP: BALANCED 2x2 EXECUTIVE BENTO GRID
           ════════════════════════════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`desktop-grid-${mode}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7 items-stretch"
          >
            <div className="w-full h-full">{renderModule01(false)}</div>
            <div className="w-full h-full">{renderModule02(false)}</div>
            <div className="w-full h-full">{renderModule03(false)}</div>
            <div className="w-full h-full">{renderModule04(false)}</div>
          </motion.div>
        </AnimatePresence>



        {/* ════════════════════════════════════════════════════════════════════
            BOTTOM TRUST GUARANTEE & ARCHITECTURAL DISCOVERY CTA
           ════════════════════════════════════════════════════════════════════ */}
        <div className="mt-12 sm:mt-14 rounded-3xl bg-gradient-to-r from-slate-50 via-white to-slate-50 border border-slate-200/90 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_15px_35px_-10px_rgba(55,122,155,0.1)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ffc312]/15 border border-[#ffc312]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#ffc312]" />
            </div>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-base sm:text-lg text-[#0F172A]">
                Guaranteed Milestone Delivery & 30-Day Hypercare
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-2xl">
                Every contract includes strict SLA milestones, zero hidden scope fees, and 30 days of direct post-launch developer support.
              </p>
            </div>
          </div>

          <a
            href="/contact"
            aria-label="Claim your Webiox advantage - Contact our engineering team"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#377a9b] hover:bg-[#2b6683] text-white text-xs sm:text-sm font-['Plus_Jakarta_Sans',sans-serif] font-bold shadow-lg shadow-[#377a9b]/20 hover:shadow-xl hover:shadow-[#377a9b]/30 transition-all shrink-0 cursor-pointer group"
          >
            <span>Claim Your Webiox Advantage</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}

