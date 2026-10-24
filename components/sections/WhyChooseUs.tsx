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
} from 'lucide-react';

type PerspectiveMode = 'contrast' | 'webiox' | 'traditional';

interface SprintGate {
  id: string;
  num: string;
  name: string;
  phase: string;
  status: string;
  duration: string;
  deliverables: string[];
  verification: string;
}

const SPRINT_GATES: SprintGate[] = [
  {
    id: 's1',
    num: '01',
    name: 'Architecture & UX Spec',
    phase: 'System Foundation',
    status: 'Verified & Signed Off',
    duration: 'Sprint 01 (Day 1–14)',
    deliverables: ['Figma Design System & Tokens', 'PostgreSQL / Prisma Schema', 'API Route Contracts & Wireframes'],
    verification: 'SIGN_HASH: 0x8F4A...92C1',
  },
  {
    id: 's2',
    num: '02',
    name: 'Fullstack Core Engine',
    phase: 'Core Development',
    status: 'Verified & Signed Off',
    duration: 'Sprint 02 (Day 15–28)',
    deliverables: ['Next.js 16 Server Components', 'Zero-Trust JWT Auth & RBAC', 'Edge Redis Cache Invalidation'],
    verification: 'SIGN_HASH: 0x3E1B...78A0',
  },
  {
    id: 's3',
    num: '03',
    name: 'Security & Edge Staging',
    phase: 'Hardening & QA',
    status: 'Active Staging Gate',
    duration: 'Sprint 03 (Day 29–42)',
    deliverables: ['Cloudflare Enterprise WAF Rules', 'OWASP Top 10 Penetration Audit', 'Client Staging URL with Live Data'],
    verification: 'STATUS: ACTIVE_REVIEW',
  },
  {
    id: 's4',
    num: '04',
    name: 'Zero-Downtime Launch',
    phase: 'Production & Care',
    status: 'Guaranteed Handover',
    duration: 'Sprint 04 (Day 43–56)',
    deliverables: ['DNS Cutover & SSL TLS 1.3', 'Core Web Vitals 98+ Guarantee', '30-Day Hypercare & Direct SLA'],
    verification: 'SLA: 100% ESCROW_RELEASE',
  },
];

const TRADITIONAL_GATES: SprintGate[] = [
  {
    id: 'tg1',
    num: '01',
    name: 'Vague Scope & Discovery',
    phase: 'Endless Planning',
    status: 'Scope Drift Risk',
    duration: 'Month 01–02 (Delayed)',
    deliverables: ['Generic 60-page PDF slide decks', 'No clickable prototypes or UI tokens', 'Vague contract with hidden change fees'],
    verification: 'RISK: UNLOCKED SCOPE DRIFT',
  },
  {
    id: 'tg2',
    num: '02',
    name: 'Hourly Billing Drain',
    phase: 'Unmonitored Dev',
    status: 'Surprise Invoices',
    duration: 'Month 03–04 (+35% Cost)',
    deliverables: ['Junior devs learning on your dime', 'Spaghetti PHP & jQuery plugins', 'Unoptimized shared server hosting'],
    verification: 'INVOICE: +$3,800 OVERAGE BILL',
  },
  {
    id: 'tg3',
    num: '03',
    name: 'Broken Staging & Ghosting',
    phase: 'Stalled Testing',
    status: 'QA Abandoned',
    duration: 'Month 05 (+60 Days)',
    deliverables: ['Staging site broken on mobile Safari', 'Account manager takes 4 days to reply', 'Zero automated test coverage'],
    verification: 'STATUS: 18 UNRESOLVED BUGS',
  },
  {
    id: 'tg4',
    num: '04',
    name: 'Hostage Handover',
    phase: 'Buggy Handover',
    status: 'Zero Warranty',
    duration: 'Month 06 (Delayed)',
    deliverables: ['No architectural docs or setup guide', 'Hostage code release handover fees', 'Zero post-launch bug warranty'],
    verification: 'SLA: NONE // CLIENT RISK',
  },
];

const WEBIOX_DEFENSE_ITEMS = [
  {
    title: 'Layer 7 Cloudflare Edge WAF',
    desc: 'DDoS mitigation & bot screening (< 100k req/s)',
    status: 'Active',
  },
  {
    title: 'Zero-Knowledge JWT & RBAC',
    desc: 'Stateless session encryption with WebAuthn',
    status: 'Hardened',
  },
  {
    title: 'OWASP Automated CI/CD Audit',
    desc: 'Zero 3rd-party unpatched dependencies',
    status: '0 CVE',
  },
  {
    title: 'TLS 1.3 & KMS Secret Vault',
    desc: 'AES-256 encrypted env variables & key rotation',
    status: 'Encrypted',
  },
];

const TRADITIONAL_VULNERABILITIES = [
  {
    title: 'Shared Apache Server (No WAF)',
    desc: 'Zero DDoS mitigation; crashes under 400 req/s',
    status: 'Vulnerable',
  },
  {
    title: 'Plaintext Cookies & Hardcoded Passwords',
    desc: 'API keys & database secrets stored in repo root',
    status: 'Exposed',
  },
  {
    title: '38 Unpatched Third-Party Plugins',
    desc: '12 known high-severity CVE exploits in outdated code',
    status: '12 CVEs',
  },
  {
    title: 'Manual Unencrypted FTP Deploys',
    desc: 'No git deployment pipeline; no rollback or backups',
    status: 'No Backup',
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

    const metrics = isTraditional
      ? [
          { label: 'TTFB Latency', value: '850ms', sub: 'Cold origin parse', warn: true },
          { label: 'LCP Paint', value: '3.8s', sub: 'Sluggish render & bounce', warn: true },
          { label: 'Bundle Size', value: '2.4 MB', sub: 'Unminified plugins', warn: true },
          { label: 'Core Vitals', value: '48 / 100', sub: 'Fails mobile audits', warn: true },
        ]
      : [
          { label: 'TTFB Latency', value: '38ms', sub: 'Sub-50ms global edge', warn: false },
          { label: 'LCP Paint', value: '0.38s', sub: 'Instant content paint', warn: false },
          { label: 'Bundle Size', value: '~78 KB', sub: 'Tree-shaken Next.js', warn: false },
          { label: 'Core Vitals', value: '99 / 100', sub: 'All audits green', warn: false },
        ];

    const specs = isTraditional
      ? [
          'Uncached Apache / PHP Monolith with zero autoscaling',
          'Sluggish database roundtrips on every page hit',
          '30+ unpatched plugins blocking main browser thread',
          'No global CDN caching for users outside origin region',
        ]
      : [
          'Next.js 16 App Router with Partial Prerendering (PPR)',
          'Edge Redis Caching Tier with instant cache invalidation',
          'Multi-Region Cloudflare CDN routed to nearest edge PoP',
          'Zero bloated plugins — 100% tree-shaken TypeScript',
        ];

    return (
      <div className={`w-full h-full rounded-3xl bg-white border ${
        isTraditional ? 'border-rose-200/90 shadow-[0_20px_50px_-15px_rgba(225,29,72,0.12)]' : 'border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(55,122,155,0.12)]'
      } ${isMobile ? 'p-5' : 'p-6 sm:p-7'} relative overflow-hidden transition-all duration-500 flex flex-col justify-between gap-5`}>
        <div className={`absolute top-0 right-0 w-80 h-80 ${isTraditional ? 'bg-rose-500/8' : 'bg-[#377a9b]/8'} rounded-full blur-3xl pointer-events-none`} />
        <div aria-hidden="true" className="absolute top-3 left-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute top-3 right-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute bottom-3 right-3 text-slate-400 font-mono text-[9px] select-none pointer-events-none">
          {isTraditional ? 'LEGACY_MONOLITH // UNCACHED' : 'SURAT_EDGE // 21.17°N 72.83°E'}
        </div>

        {/* Header Block */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10.5px] font-mono font-bold ${
              isTraditional ? 'bg-rose-50 border border-rose-200 text-rose-700' : 'bg-[#377a9b]/10 border border-[#377a9b]/20 text-[#377a9b]'
            }`}>
              {isTraditional ? <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> : <Gauge className="w-3.5 h-3.5 text-[#377a9b]" />}
              <span>{isTraditional ? '✕ 01 // MONOLITHIC DEBT & BOTTLENECK' : '01 // VELOCITY & INFRASTRUCTURE'}</span>
            </div>

            <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold ${
              isTraditional
                ? 'bg-rose-50 border border-rose-200/80 text-rose-700'
                : 'bg-emerald-50 border border-emerald-200/80 text-emerald-800'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isTraditional ? 'bg-rose-500' : 'bg-emerald-500 animate-ping'}`} />
              <span>{isTraditional ? '850MS ORIGIN BOTTLENECK' : 'SUB-SECOND EDGE ACTIVE'}</span>
            </div>
          </div>

          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl lg:text-3xl text-[#0F172A] tracking-tight mb-1.5">
            {isTraditional ? 'Monolithic Infrastructure Lag.' : 'Sub-Second Edge Infrastructure.'}
          </h3>
          <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed max-w-2xl">
            {isTraditional
              ? 'Legacy WordPress/PHP monoliths with 30+ unpatched plugins, uncached origin bottlenecks, and sluggish database queries. 850ms TTFB, 3.8s LCP paint, and failed Core Web Vitals.'
              : 'Next.js 16 App Router with Incremental Static Regeneration (ISR) and Edge Redis caching. Zero cold starts, sub-400ms LCP, and instant page transitions with sub-second edge delivery.'}
          </p>
        </div>

        {/* Production Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border transition-all ${
                m.warn
                  ? 'bg-rose-50/50 border-rose-200/80 text-rose-950'
                  : 'bg-slate-50/80 border-slate-200/90 text-slate-900'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1 font-semibold truncate">
                {m.label}
              </div>
              <div className={`font-mono font-black text-xl sm:text-2xl tracking-tight ${
                m.warn ? 'text-rose-600' : 'text-[#377a9b]'
              }`}>
                {m.value}
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-0.5 truncate">
                {m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Highlights Checklist */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200/90">
          <div className="text-[10.5px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <span>{isTraditional ? 'Monolith Bottleneck Architecture' : 'Production Edge Architecture'}</span>
            <span className={isTraditional ? 'text-rose-600' : 'text-emerald-700 font-bold'}>
              {isTraditional ? 'Legacy Debt' : 'Verified Production SLA'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {specs.map((spec, sIdx) => (
              <div key={sIdx} className="flex items-start gap-2">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  isTraditional ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {isTraditional ? <XCircle className="w-2.5 h-2.5 text-rose-600" /> : <Check className="w-2.5 h-2.5 stroke-[3] text-emerald-700" />}
                </div>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-slate-600 text-[11.5px] leading-tight">
                  {spec}
                </span>
              </div>
            ))}
          </div>
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
      <div className={`w-full h-full rounded-3xl bg-white border ${
        isTraditional ? 'border-rose-200/90 shadow-[0_20px_50px_-15px_rgba(225,29,72,0.12)]' : 'border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(55,122,155,0.12)]'
      } ${isMobile ? 'p-5' : 'p-6 sm:p-7'} relative overflow-hidden transition-all duration-500 flex flex-col justify-between gap-5`}>
        <div className={`absolute top-0 right-0 w-80 h-80 ${isTraditional ? 'bg-rose-500/8' : 'bg-[#ffc312]/8'} rounded-full blur-3xl pointer-events-none`} />
        <div aria-hidden="true" className="absolute top-3 left-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute top-3 right-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute bottom-3 right-3 text-slate-400 font-mono text-[9px] select-none pointer-events-none">
          {isTraditional ? 'DRIFT_RISK // HOURLY_DRAIN' : 'SLA_PROTOCOL // ZERO_DRIFT'}
        </div>

        {/* Header Block */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10.5px] font-mono font-bold ${
              isTraditional ? 'bg-rose-50 border border-rose-200/80 text-rose-700' : 'bg-amber-50 border border-amber-200/80 text-amber-700'
            }`}>
              <Clock className={`w-3.5 h-3.5 ${isTraditional ? 'text-rose-600' : 'text-amber-600'}`} />
              <span>{isTraditional ? '✕ 02 // SCOPE DRIFT & HOURLY TRAPS' : '02 // MILESTONE LOCK PROTOCOL'}</span>
            </div>

            <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md border ${
              isTraditional ? 'text-rose-700 bg-rose-50 border-rose-200/60' : 'text-amber-700 bg-amber-50 border-amber-200/60'
            }`}>
              {isTraditional ? '0% SLA LOCK' : '100% SLA LOCK'}
            </span>
          </div>

          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl lg:text-3xl text-[#0F172A] tracking-tight mb-1.5">
            {isTraditional ? 'The Hourly Billing Trap.' : 'Sprint Milestone Vault.'}
          </h3>
          <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
            {isTraditional
              ? 'Traditional agencies drag projects out for months with vague specs and open-ended hourly billing. Scope creep and surprise invoices pile up while deadlines slide.'
              : 'Traditional agencies drag projects for months with hourly billing. Webiox locks delivery into verified 14-day sprint gates: payments unlock strictly after staging QA sign-off.'}
          </p>
        </div>

        {/* 4-Stage Delivery Pipeline */}
        <div className="space-y-2">
          {activeGates.map((gate) => (
            <div
              key={gate.id}
              className={`p-2.5 sm:p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                isTraditional
                  ? 'bg-rose-50/40 border-rose-200/80'
                  : 'bg-slate-50/80 border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`w-7 h-7 rounded-xl font-mono text-[11px] font-black flex items-center justify-center shrink-0 ${
                  isTraditional ? 'bg-rose-100 text-rose-700' : 'bg-white text-[#377a9b] border border-slate-200 shadow-2xs'
                }`}>
                  {gate.num}
                </span>
                <div className="min-w-0">
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#0F172A] truncate">
                    {gate.name}
                  </div>
                  <div className="font-mono text-[10px] text-slate-500 truncate">
                    {gate.duration} • {gate.deliverables[0]}
                  </div>
                </div>
              </div>

              <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold shrink-0 ${
                isTraditional
                  ? 'bg-rose-100/80 text-rose-700'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
              }`}>
                {isTraditional ? gate.status : 'Verified Gate'}
              </span>
            </div>
          ))}
        </div>

        {/* SLA Commitment Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500 text-[10.5px]">
            {isTraditional ? 'Uncapped Scope Creep' : '0% Scope Drift Guarantee'}
          </span>
          <span className={`font-bold text-[10.5px] ${isTraditional ? 'text-rose-600' : 'text-[#377a9b]'}`}>
            {isTraditional ? 'Hourly Billing Overages ✕' : 'QA Staging Sign-Off Required ✓'}
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
      <div className={`w-full h-full rounded-3xl bg-white border ${
        isTraditional ? 'border-rose-200/90 shadow-[0_20px_50px_-15px_rgba(225,29,72,0.12)]' : 'border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(55,122,155,0.12)]'
      } ${isMobile ? 'p-5' : 'p-6 sm:p-7'} relative overflow-hidden transition-all duration-500 flex flex-col justify-between gap-5`}>
        <div className={`absolute top-0 right-0 w-80 h-80 ${isTraditional ? 'bg-rose-500/8' : 'bg-emerald-500/8'} rounded-full blur-3xl pointer-events-none`} />
        <div aria-hidden="true" className="absolute top-3 left-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute top-3 right-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute bottom-3 right-3 text-slate-400 font-mono text-[9px] select-none pointer-events-none">
          {isTraditional ? 'EXPLOIT_SURFACE // ZERO_WAF' : 'DEFENSE_CORE // SOC_2_READY'}
        </div>

        {/* Header Block */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10.5px] font-mono font-bold ${
              isTraditional ? 'bg-rose-50 border border-rose-200/80 text-rose-700' : 'bg-emerald-50 border border-emerald-200/80 text-emerald-700'
            }`}>
              <Lock className={`w-3.5 h-3.5 ${isTraditional ? 'text-rose-600' : 'text-emerald-600'}`} />
              <span>{isTraditional ? '✕ 03 // VULNERABLE SHARED HOSTING' : '03 // DEFENSIVE SECURITY CORE'}</span>
            </div>

            <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md border ${
              isTraditional ? 'text-rose-700 bg-rose-50 border-rose-200/60' : 'text-emerald-700 bg-emerald-50 border-emerald-200/60'
            }`}>
              {isTraditional ? '12 CVE VULNERABILITIES' : '0 CVE VULNERABILITIES'}
            </span>
          </div>

          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl lg:text-3xl text-[#0F172A] tracking-tight mb-1.5">
            {isTraditional ? 'Zero-Trust Neglected.' : 'Hardened Zero-Trust.'}
          </h3>
          <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
            {isTraditional
              ? 'Generic agencies deploy on cheap shared hosting with dozens of unpatched third-party plugins, plain-text credentials in repositories, and zero DDoS protection.'
              : 'Generic agencies install dozens of vulnerable plugins that invite exploits. We build custom hardened TypeScript architectures with cryptographic authentication and automated CI/CD audits.'}
          </p>
        </div>

        {/* 4-Layer Defense Stack */}
        <div className="space-y-2">
          {activeDefenseItems.map((item, idx) => (
            <div
              key={idx}
              className={`p-2.5 sm:p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                isTraditional
                  ? 'bg-rose-50/40 border-rose-200/80'
                  : 'bg-slate-50/80 border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                isTraditional ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {isTraditional ? <XCircle className="w-3 h-3 text-rose-600" /> : <CheckCircle2 className="w-3 h-3 text-emerald-700" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#0F172A]">
                    {item.title}
                  </span>
                  <span className={`font-mono text-[9.5px] font-bold shrink-0 ${
                    isTraditional ? 'text-rose-700' : 'text-emerald-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="font-mono text-[10px] text-slate-500 truncate mt-0.5">
                  {item.desc}
                </p>
              </div>
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

    const pillars = isTraditional
      ? [
          {
            title: 'Multiple Middleman Layers',
            desc: 'Non-technical account managers sit between you and developers.',
            metric: '3 Buffer Layers',
          },
          {
            title: '48h–72h Email Response Delay',
            desc: 'Simple bug reports take days to translate into offshore tickets.',
            metric: '3 Days Lag',
          },
          {
            title: 'Surprise Change-Order Invoices',
            desc: 'Every minor tweak is billed as an expensive out-of-scope addition.',
            metric: '+$1,600 / Change',
          },
        ]
      : [
          {
            title: 'Direct Senior Architect Access',
            desc: 'Collaborate directly with Lead Architect Manthan Vaghasiya & senior fullstack engineers.',
            metric: 'Zero Middlemen',
          },
          {
            title: 'Dedicated Engineering War-Room',
            desc: 'Private Slack channel or WhatsApp VIP squad with real-time PR & deployment updates.',
            metric: 'Direct Squad',
          },
          {
            title: '< 12-Minute Average Reply Time',
            desc: 'Instant architectural guidance, rapid staging deployments, and proactive async walkthroughs.',
            metric: '< 12m Turnaround',
          },
        ];

    return (
      <div className={`w-full h-full rounded-3xl bg-white border ${
        isTraditional ? 'border-rose-200/90 shadow-[0_20px_50px_-15px_rgba(225,29,72,0.12)]' : 'border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(55,122,155,0.12)]'
      } ${isMobile ? 'p-5' : 'p-6 sm:p-7'} relative overflow-hidden transition-all duration-500 flex flex-col justify-between gap-5`}>
        <div className={`absolute top-0 right-0 w-80 h-80 ${isTraditional ? 'bg-rose-500/8' : 'bg-[#377a9b]/8'} rounded-full blur-3xl pointer-events-none`} />
        <div aria-hidden="true" className="absolute top-3 left-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute top-3 right-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute bottom-3 right-3 text-slate-400 font-mono text-[9px] select-none pointer-events-none">
          {isTraditional ? 'MIDDLEMEN_CHAIN // 48H_LAG' : 'SQUAD_UPLINK // SURAT_DIRECT'}
        </div>

        {/* Header Block */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10.5px] font-mono font-bold ${
              isTraditional ? 'bg-rose-50 border border-rose-200/80 text-rose-700' : 'bg-[#377a9b]/10 border border-[#377a9b]/20 text-[#377a9b]'
            }`}>
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{isTraditional ? '✕ 04 // LAYERS OF NON-TECHNICAL MIDDLEMEN' : '04 // AGILITY & DIRECT COLLABORATION'}</span>
            </div>

            <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold ${
              isTraditional ? 'bg-rose-50 border border-rose-200/80 text-rose-700' : 'bg-[#377a9b]/10 border border-[#377a9b]/20 text-[#377a9b]'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isTraditional ? 'bg-rose-500' : 'bg-[#377a9b] animate-pulse'}`} />
              <span>{isTraditional ? '48H–72H EMAIL DELAY' : '12M AVG ARCHITECT REPLY'}</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3 mb-1.5">
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl lg:text-3xl text-[#0F172A] tracking-tight">
              {isTraditional ? 'The Middleman Telephone Game.' : 'Direct Senior Engineers.'}
            </h3>
            <span className={`font-mono text-xs font-bold ${isTraditional ? 'text-rose-600' : 'text-slate-600 font-semibold'}`}>
              {isTraditional ? '3 Layers of Middlemen' : 'Zero Middlemen'}
            </span>
          </div>
          <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed max-w-xl">
            {isTraditional
              ? 'Non-technical account managers who do not write code sit between you and developers. Simple bug reports take 3 days to translate, and surprise change orders are billed for every tweak.'
              : 'No non-technical account managers playing telephone. You get a direct, dedicated engineering war-room on Slack or WhatsApp with the senior architects writing and shipping your code.'}
          </p>
        </div>

        {/* 3 Collaboration Protocol Rows */}
        <div className="space-y-2.5">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                isTraditional
                  ? 'bg-rose-50/40 border-rose-200/80'
                  : 'bg-slate-50/80 border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  isTraditional ? 'bg-rose-100 text-rose-700' : 'bg-[#377a9b]/10 text-[#377a9b]'
                }`}>
                  {isTraditional ? <XCircle className="w-3 h-3 text-rose-600" /> : <CheckCircle2 className="w-3 h-3 text-[#377a9b]" />}
                </div>
                <div className="min-w-0">
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#0F172A]">
                    {item.title}
                  </div>
                  <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>

              <span className={`px-2 py-0.5 rounded-md font-mono text-[9.5px] font-bold shrink-0 ${
                isTraditional ? 'bg-rose-100 text-rose-700' : 'bg-[#377a9b]/10 text-[#377a9b]'
              }`}>
                {item.metric}
              </span>
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 font-mono text-[11px] font-bold transition-all cursor-pointer"
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
              <span className="font-mono text-[10px] text-slate-500">
                Direct to Lead Architect
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
            DESKTOP: THE ARCHITECTURAL ENGINEERING CONSOLE (12-COL GRID)
           ════════════════════════════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`desktop-grid-${mode}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="hidden lg:grid grid-cols-12 gap-7"
          >
            <div className="lg:col-span-7">{renderModule01(false)}</div>
            <div className="lg:col-span-5">{renderModule02(false)}</div>
            <div className="lg:col-span-5">{renderModule03(false)}</div>
            <div className="lg:col-span-7">{renderModule04(false)}</div>
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

