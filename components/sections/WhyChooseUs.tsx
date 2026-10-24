'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Clock,
  Shield,
  ShieldCheck,
  MessageSquare,
  MessageCircle,
  AlertTriangle,
  XCircle,
  Check,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  Terminal,
  Activity,
  Globe,
  KeyRound,
  FileCode2,
} from 'lucide-react';

type PerspectiveMode = 'contrast' | 'webiox' | 'traditional';

interface SprintGate {
  num: string;
  name: string;
  duration: string;
  status: string;
  deliverables: string[];
  hash: string;
  signOff: string;
}

const POPS = [
  { id: 'surat', label: 'Surat (HQ)', ttfb: '28ms', region: 'India Primary Edge', status: 'Optimal' },
  { id: 'frankfurt', label: 'Frankfurt', ttfb: '42ms', region: 'Europe Central PoP', status: 'Optimal' },
  { id: 'singapore', label: 'Singapore', ttfb: '36ms', region: 'APAC Anycast PoP', status: 'Optimal' },
  { id: 'london', label: 'London', ttfb: '48ms', region: 'UK Anycast PoP', status: 'Optimal' },
] as const;

const TRADITIONAL_POPS = [
  { id: 'surat', label: 'Surat (HQ)', ttfb: '850ms', region: 'Single Origin Host', status: 'Bottleneck' },
  { id: 'frankfurt', label: 'Frankfurt', ttfb: '1,240ms', region: 'Uncached Overseas', status: 'High Latency' },
  { id: 'singapore', label: 'Singapore', ttfb: '980ms', region: 'Cold DB Roundtrip', status: 'Lag' },
  { id: 'london', label: 'London', ttfb: '1,150ms', region: 'No CDN Caching', status: 'Slow' },
] as const;

const SPRINT_GATES: SprintGate[] = [
  {
    num: '01',
    name: 'Architecture & UX Spec',
    duration: 'Sprint 01 (Day 1–14)',
    status: 'Verified Gate ✓',
    deliverables: ['Tokenized Figma Design System', 'PostgreSQL / Prisma Schema Contracts'],
    hash: '0x8F4A...92C1',
    signOff: 'Specification Signed Off',
  },
  {
    num: '02',
    name: 'Fullstack Next.js Engine',
    duration: 'Sprint 02 (Day 15–28)',
    status: 'Verified Gate ✓',
    deliverables: ['Next.js 16 Server Components', 'Edge Redis Cache Invalidation Tier'],
    hash: '0x3E1B...78A0',
    signOff: 'Core Engine Approved',
  },
  {
    num: '03',
    name: 'Security & Edge Staging',
    duration: 'Sprint 03 (Day 29–42)',
    status: 'Active Review ⚡',
    deliverables: ['Cloudflare Enterprise WAF Rules', 'Live Client Staging QA Deployment'],
    hash: '0x99C2...44F1',
    signOff: 'Active QA Review Gate',
  },
  {
    num: '04',
    name: 'Zero-Downtime Launch',
    duration: 'Sprint 04 (Day 43–56)',
    status: 'SLA Release ✓',
    deliverables: ['DNS Cutover TLS 1.3', 'Core Web Vitals 98+ SLA Handover'],
    hash: '0x5D8E...11B9',
    signOff: 'Guaranteed Handover SLA',
  },
];

const TRADITIONAL_GATES: SprintGate[] = [
  {
    num: '01',
    name: 'Vague Scope & PDF Slides',
    duration: 'Month 01–02 (Delayed)',
    status: 'Scope Drift ✕',
    deliverables: ['Generic 60-page PDF slide deck', 'No clickable interactive prototypes'],
    hash: 'NO_HASH // UNLOCKED',
    signOff: 'Endless Discovery Loop',
  },
  {
    num: '02',
    name: 'Hourly Billing Drain',
    duration: 'Month 03–04 (+35% Cost)',
    status: 'Surprise Fees ✕',
    deliverables: ['Junior devs learning on your dime', 'Spaghetti PHP / jQuery plugins'],
    hash: 'INVOICE: +$3,800',
    signOff: 'Unmonitored Hourly Dev',
  },
  {
    num: '03',
    name: 'Broken Staging & Ghosting',
    duration: 'Month 05 (+60 Days)',
    status: 'QA Abandoned ✕',
    deliverables: ['Staging site broken on mobile Safari', 'Account manager takes 4 days to reply'],
    hash: 'STATUS: 18 BUGS',
    signOff: 'Stalled Testing',
  },
  {
    num: '04',
    name: 'Hostage Handover Fees',
    duration: 'Month 06+ (No Warranty)',
    status: 'No SLA / Risk ✕',
    deliverables: ['No architectural documentation', 'Hidden release fees before code handover'],
    hash: 'SLA: NONE // CLIENT RISK',
    signOff: 'Buggy Handover',
  },
];

const COMMAND_BAYS = [
  {
    id: 'edge',
    index: 0,
    num: '01',
    title: 'Edge Velocity',
    icon: Zap,
  },
  {
    id: 'milestones',
    index: 1,
    num: '02',
    title: 'Milestone Escrow',
    icon: Clock,
  },
  {
    id: 'security',
    index: 2,
    num: '03',
    title: 'Zero-Trust Core',
    icon: Shield,
  },
  {
    id: 'squad',
    index: 3,
    num: '04',
    title: 'Direct Squad',
    icon: MessageSquare,
  },
];

export default function WhyChooseUs() {
  const [mode, setMode] = useState<PerspectiveMode>('contrast');
  const [activeBay, setActiveBay] = useState<number>(0);

  // Interactive states for live simulation consoles
  const [selectedPoP, setSelectedPoP] = useState<'surat' | 'frankfurt' | 'singapore' | 'london'>('surat');
  const [isPinging, setIsPinging] = useState(false);
  const [selectedGate, setSelectedGate] = useState(2); // Sprint 03
  const [qaApproved, setQaApproved] = useState(false);
  const [securityTab, setSecurityTab] = useState<'waf' | 'auth' | 'cicd'>('waf');
  const [chatChannel, setChatChannel] = useState<'slack' | 'whatsapp'>('slack');

  const isTraditional = mode === 'traditional';

  const handlePingTest = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
    }, 600);
  };

  const activePops = isTraditional ? TRADITIONAL_POPS : POPS;
  const currentPoP = activePops.find((p) => p.id === selectedPoP) || activePops[0];

  const activeGates = isTraditional ? TRADITIONAL_GATES : SPRINT_GATES;
  const currentGate = activeGates[selectedGate] || activeGates[0];

  const securityData = {
    waf: {
      title: 'Layer 7 Cloudflare Edge WAF',
      subtitle: 'Enterprise DDoS mitigation & bot screening under 100k req/s',
      status: isTraditional ? 'No DDoS Mitigation' : 'Active Edge Shield',
      metric: isTraditional ? 'Crashes > 400 req/s' : '< 100k req/s Screened',
      rules: isTraditional
        ? [
            'Shared Apache host with zero rate limiting',
            'Vulnerable to brute-force credential stuffing',
            'Origin IP exposed in DNS records without proxy',
          ]
        : [
            'Automated Layer 7 challenge for malicious bots',
            'Global Anycast DNS routed to nearest edge PoP',
            'Origin IP masked behind Cloudflare Enterprise proxy',
          ],
    },
    auth: {
      title: 'Zero-Knowledge JWT & RBAC',
      subtitle: 'Stateless session encryption with WebAuthn & passkey support',
      status: isTraditional ? 'Exposed Plaintext' : 'Cryptographically Hardened',
      metric: isTraditional ? 'Plaintext in .env' : 'AES-256 KMS Vault',
      rules: isTraditional
        ? [
            'Hardcoded database credentials in git commits',
            'Plaintext session cookies vulnerable to XSS',
            'Zero role-based route protection middleware',
          ]
        : [
            'HMAC SHA-256 stateless session signatures',
            'Role-based access control (RBAC) middleware',
            'AES-256 automated key rotation in AWS/Cloudflare KMS',
          ],
    },
    cicd: {
      title: 'OWASP Automated CI/CD Audits',
      subtitle: 'Continuous vulnerability screening on every GitHub pull request',
      status: isTraditional ? '12 Known Exploits' : '0 CVE Vulnerabilities',
      metric: isTraditional ? '38 Unpatched Plugins' : '100% Tree-Shaken',
      rules: isTraditional
        ? [
            '38 unpatched third-party plugins with known CVEs',
            'No automated dependency scanners in deploy pipeline',
            'Manual unencrypted FTP uploads with zero audit trail',
          ]
        : [
            'Automated Dependabot & Snyk security scans',
            'Zero vulnerable third-party dependencies',
            'Deterministic lockfile verification before build',
          ],
    },
  };

  const currentSec = securityData[securityTab];

  return (
    <section
      id="why-choose-us"
      className="relative bg-[#FCFCFD] text-[#0F172A] pt-20 sm:pt-28 lg:pt-32 pb-14 sm:pb-20 lg:pb-24 overflow-hidden selection:bg-[#377a9b] selection:text-white"
    >
      {/* ── Ambient Background Lighting ── */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-section-pattern" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#377a9b]/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-[#ffc312]/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-[11px] font-mono font-bold text-[#377a9b] mb-3 sm:mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#ffc312]" />
            <span className="tracking-wider uppercase">THE WEBIOX ADVANTAGE</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">COMMAND TELEMETRY</span>
          </div>

          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-[-0.03em] leading-[1.15] mb-3 sm:mb-4 [text-wrap:balance]">
            <span>Why Ambitious Enterprises </span>
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#377a9b] via-[#0284c7] to-[#38bdf8] bg-clip-text text-transparent">
              Choose Webiox.
            </span>
          </h2>

          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm lg:text-base text-slate-500 font-normal leading-relaxed max-w-2xl mb-6 sm:mb-8">
            We engineered out every friction point of traditional agencies — from open-ended hourly billing to sluggish server renders. Explore our verified engineering standards below.
          </p>

          {/* ── Global Perspective Mode Switcher ── */}
          <div className="w-full max-w-full overflow-x-auto no-scrollbar py-1 flex justify-center">
            <div className="inline-flex items-center p-1 sm:p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/90 shadow-2xs whitespace-nowrap">
              <button
                type="button"
                onClick={() => setMode('contrast')}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
                  mode === 'contrast'
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
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  mode === 'webiox'
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
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  mode === 'traditional'
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
            UNIFIED ENGINEERING COMMAND DECK (ZERO CARD GRID / APPLE & LINEAR STYLE)
            A single, expansive interactive studio eliminating generic card layouts.
           ════════════════════════════════════════════════════════════════════ */}
        <div
          className={`w-full rounded-3xl bg-gradient-to-b from-white/95 via-slate-50/70 to-white/95 backdrop-blur-xl border ${
            isTraditional
              ? 'border-rose-200/90 shadow-[0_25px_70px_-20px_rgba(225,29,72,0.12)]'
              : 'border-slate-200/90 shadow-[0_25px_70px_-20px_rgba(55,122,155,0.14)] hover:border-[#377a9b]/50'
          } p-5 sm:p-7 lg:p-9 relative overflow-hidden transition-all duration-500`}
        >
          {/* Subtle Ambient Studio Glows */}
          <div
            className={`absolute top-0 right-0 w-[32rem] h-[32rem] ${
              isTraditional ? 'bg-rose-500/8' : 'bg-[#377a9b]/8'
            } rounded-full blur-3xl pointer-events-none`}
          />
          <div
            className={`absolute bottom-0 left-0 w-96 h-96 ${
              isTraditional ? 'bg-rose-500/5' : 'bg-[#ffc312]/6'
            } rounded-full blur-3xl pointer-events-none`}
          />

          {/* Studio Header Telemetry Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-slate-200/80 mb-6 lg:mb-8">
            <div className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${isTraditional ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}`} />
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-slate-700">
                <span className="uppercase tracking-wider">
                  {isTraditional ? 'LEGACY MONOLITH AUDIT' : 'COMMAND COCKPIT // WEBIOX ACTIVE'}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500 font-semibold">
                  {isTraditional ? 'UNOPTIMIZED ORIGIN' : 'SURAT_HQ • 21.17°N 72.83°E'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-slate-400 uppercase hidden sm:inline">
                TELEMETRY STATUS:
              </span>
              <span
                className={`px-2.5 py-1 rounded-full font-mono text-[10.5px] font-bold border ${
                  isTraditional
                    ? 'bg-rose-50 border-rose-200 text-rose-700'
                    : 'bg-emerald-50 border-emerald-200/90 text-emerald-800'
                }`}
              >
                {isTraditional ? '3 CRITICAL BOTTLENECKS' : 'ALL SYSTEMS VERIFIED SLA ✓'}
              </span>
            </div>
          </div>

          {/* ── TOP ARCHITECTURAL CONTROLLER DOCK (4 BAYS) ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 p-1 sm:p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 mb-5 lg:mb-6 shadow-2xs">
            {COMMAND_BAYS.map((bay) => {
              const Icon = bay.icon;
              const isActive = activeBay === bay.index;

              return (
                <button
                  key={bay.id}
                  type="button"
                  onClick={() => setActiveBay(bay.index)}
                  className={`relative py-2 px-3 sm:py-2.5 sm:px-3.5 rounded-xl text-left transition-all duration-200 cursor-pointer flex items-center gap-2 sm:gap-2.5 active:scale-[0.99] ${
                    isActive
                      ? isTraditional
                        ? 'bg-white text-rose-900 shadow-sm border border-rose-200 ring-2 ring-rose-400/20'
                        : 'bg-white text-[#0F172A] shadow-sm border border-slate-200/90 ring-2 ring-[#377a9b]/20'
                      : 'text-slate-600 hover:text-[#0F172A] hover:bg-white/60'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                      isActive
                        ? isTraditional
                          ? 'bg-rose-600 text-white'
                          : 'bg-[#377a9b] text-white shadow-2xs'
                        : 'bg-slate-200/70 text-slate-600'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                  </div>
                  <span className="font-mono text-[10.5px] font-black text-slate-400 shrink-0">
                    {bay.num}
                  </span>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-[13px] truncate text-[#0F172A]">
                    {bay.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── WIDESCREEN LIVE SIMULATION STAGE (2-COLUMN ARCHITECTURAL CONSOLE) ── */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {/* ─────────────────────────────────────────────────────────────
                  BAY 01: SUB-SECOND EDGE VELOCITY & INFRASTRUCTURE
                 ───────────────────────────────────────────────────────────── */}
              {activeBay === 0 && (
                <motion.div
                  key={`bay-01-${mode}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start"
                >
                  {/* Left Column (5 Cols): Narrative, Speed Metrics & Tech Specs */}
                  <div className="lg:col-span-5 flex flex-col gap-3.5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold ${
                            isTraditional
                              ? 'bg-rose-50 border border-rose-200 text-rose-700'
                              : 'bg-[#377a9b]/10 border border-[#377a9b]/25 text-[#377a9b]'
                          }`}
                        >
                          {isTraditional ? <AlertTriangle className="w-3 h-3 text-rose-600" /> : <Zap className="w-3 h-3 text-[#377a9b]" />}
                          <span>{isTraditional ? 'MONOLITHIC ORIGIN LAG' : 'EDGE INFRASTRUCTURE ENGINE'}</span>
                        </div>

                        <div
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-mono font-bold ${
                            isTraditional
                              ? 'bg-rose-50 border border-rose-200 text-rose-700'
                              : 'bg-emerald-50 border border-emerald-200/90 text-emerald-800'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isTraditional ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}`} />
                          <span>{isTraditional ? '850MS ORIGIN DELAY' : 'SUB-SECOND EDGE ACTIVE'}</span>
                        </div>
                      </div>

                      <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl text-[#0F172A] tracking-tight mb-1.5">
                        {isTraditional ? 'Monolithic Infrastructure Lag.' : 'Sub-Second Edge Infrastructure.'}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                        {isTraditional
                          ? 'Legacy WordPress and PHP monoliths with 30+ unpatched plugins. Uncached database queries create 850ms TTFB bottlenecks and sluggish page transitions that hurt search rankings.'
                          : 'Next.js 16 App Router paired with multi-region Edge Redis caching. Zero cold starts, instant client transitions, and verified sub-400ms LCP on every device.'}
                      </p>
                    </div>

                    {/* Production Speed Hero Metrics Bar */}
                    <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                          {isTraditional ? 'Largest Contentful Paint (LCP)' : 'Production LCP Content Paint'}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                            isTraditional ? 'bg-rose-100 text-rose-800' : 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                          }`}
                        >
                          {isTraditional ? 'Fails CWV Audits ✕' : 'Passes Core Web Vitals ✓'}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between">
                        <span
                          className={`font-['Plus_Jakarta_Sans',sans-serif] font-black text-3xl sm:text-4xl tracking-tight ${
                            isTraditional ? 'text-rose-600' : 'text-[#377a9b]'
                          }`}
                        >
                          {isTraditional ? '3.8s' : '0.38s'}
                        </span>

                        <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                          <div className="px-2 py-1 rounded-lg bg-slate-50 border border-slate-200/60">
                            <div className="text-[8px] font-mono text-slate-400 uppercase">TTFB</div>
                            <div className={`font-mono font-bold text-[11.5px] ${isTraditional ? 'text-rose-600' : 'text-slate-900'}`}>
                              {currentPoP.ttfb}
                            </div>
                          </div>
                          <div className="px-2 py-1 rounded-lg bg-slate-50 border border-slate-200/60">
                            <div className="text-[8px] font-mono text-slate-400 uppercase">Bundle</div>
                            <div className={`font-mono font-bold text-[11.5px] ${isTraditional ? 'text-rose-600' : 'text-slate-900'}`}>
                              {isTraditional ? '2.4 MB' : '~78 KB'}
                            </div>
                          </div>
                          <div className="px-2 py-1 rounded-lg bg-slate-50 border border-slate-200/60">
                            <div className="text-[8px] font-mono text-slate-400 uppercase">CWV</div>
                            <div className={`font-mono font-bold text-[11.5px] ${isTraditional ? 'text-rose-600' : 'text-emerald-700'}`}>
                              {isTraditional ? '48' : '99'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom 3-Pill Tech Badges */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(isTraditional
                        ? ['Uncached Apache / PHP', 'Blocking Scripts', 'Single Origin Host']
                        : ['Next.js 16 Partial Prerendering', 'Edge Redis Invalidation', 'Cloudflare Enterprise CDN']
                      ).map((item, idx) => (
                        <span
                          key={idx}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold border ${
                            isTraditional
                              ? 'bg-rose-50/80 border-rose-200/80 text-rose-800'
                              : 'bg-white border-slate-200/90 text-slate-700 shadow-2xs'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isTraditional ? 'bg-rose-500' : 'bg-[#377a9b]'}`} />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (7 Cols): Global PoP Selector & Live Route Tracer HUD */}
                  <div className="lg:col-span-7 flex flex-col gap-3">
                    {/* Global PoP Selector Bar */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-[10.5px] font-mono font-bold text-slate-600 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-[#377a9b]" />
                          <span>Simulate Global Edge PoP</span>
                        </span>
                        <span className="text-[#377a9b]">{currentPoP.region}</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-2xl bg-slate-100/90 border border-slate-200/90">
                        {activePops.map((pop) => (
                          <button
                            key={pop.id}
                            type="button"
                            onClick={() => setSelectedPoP(pop.id as any)}
                            className={`py-1.5 px-2 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                              selectedPoP === pop.id
                                ? isTraditional
                                  ? 'bg-rose-500 text-white shadow-xs font-bold'
                                  : 'bg-white text-[#377a9b] shadow-xs border border-slate-200 font-bold'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11.5px] font-bold leading-tight">
                              {pop.label}
                            </span>
                            <span className="font-mono text-[9.5px] opacity-80 mt-0.5">
                              {pop.ttfb}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dark Obsidian Route Tracer HUD */}
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] border border-slate-800 text-white shadow-lg space-y-2.5">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <div className="flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-sky-400" />
                          <span className="font-mono text-[11px] font-bold text-slate-200">
                            LIVE PACKET ROUTE TRACER
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={handlePingTest}
                          disabled={isPinging}
                          className="px-2 py-0.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 disabled:opacity-50"
                        >
                          <Activity className={`w-3 h-3 ${isPinging ? 'animate-spin' : ''}`} />
                          <span>{isPinging ? 'Pinging PoP...' : 'Ping PoP ⚡'}</span>
                        </button>
                      </div>

                      {/* Route Path Flow Visualization */}
                      <div className="space-y-1.5 font-mono text-[11.5px]">
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>Client Location:</span>
                          </span>
                          <span className="text-white font-bold">{currentPoP.label}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${isTraditional ? 'bg-rose-400' : 'bg-emerald-400'}`} />
                            <span>{isTraditional ? 'Remote Origin:' : 'Nearest Anycast Edge PoP:'}</span>
                          </span>
                          <span className={isTraditional ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                            {isTraditional ? 'Single Apache Origin (850ms Delay)' : `${currentPoP.region} (${currentPoP.ttfb})`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                            <span>Cache Hierarchy:</span>
                          </span>
                          <span className="text-sky-300 font-bold">
                            {isTraditional ? 'COLD MISS (Origin Parse)' : 'HIT: Edge Redis Tier (Instant)'}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Protocol Readout */}
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-slate-400">
                        <span>PROTOCOL: HTTP/3 (QUIC)</span>
                        <span className={isTraditional ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                          {isTraditional ? 'Origin Bottleneck Detected ✕' : 'Zero Cold Starts Guarantee ✓'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  BAY 02: MILESTONE LOCK PROTOCOL & ESCROW VAULT
                 ───────────────────────────────────────────────────────────── */}
              {activeBay === 1 && (
                <motion.div
                  key={`bay-02-${mode}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start"
                >
                  {/* Left Column (5 Cols): Narrative & Escrow Sign-Off Console */}
                  <div className="lg:col-span-5 flex flex-col gap-3.5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold ${
                            isTraditional
                              ? 'bg-rose-50 border border-rose-200 text-rose-700'
                              : 'bg-amber-50 border border-amber-200/80 text-amber-800'
                          }`}
                        >
                          <Clock className={`w-3 h-3 ${isTraditional ? 'text-rose-600' : 'text-amber-600'}`} />
                          <span>{isTraditional ? 'HOURLY BILLING DRAIN' : 'MILESTONE ESCROW PROTOCOL'}</span>
                        </div>

                        <div
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-mono font-bold ${
                            isTraditional
                              ? 'bg-rose-50 border border-rose-200 text-rose-700'
                              : 'bg-amber-50 border border-amber-200/80 text-amber-800'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isTraditional ? 'bg-rose-500' : 'bg-amber-500'}`} />
                          <span>{isTraditional ? 'UNCAPPED SCOPE DRIFT' : '100% ESCROW SLA LOCK'}</span>
                        </div>
                      </div>

                      <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl text-[#0F172A] tracking-tight mb-1.5">
                        {isTraditional ? 'The Hourly Billing Trap.' : 'Sprint Milestone Vault.'}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                        {isTraditional
                          ? 'Agencies drag projects for months with open-ended hourly billing. Scope creeps continuously, deadlines slip, and unexpected change-order invoices pile up without verified deliverables.'
                          : 'Delivery locked into verified 14-day sprint cycles. Milestones unlock strictly after staging QA sign-off — 0% scope creep and zero surprise fees guaranteed.'}
                      </p>
                    </div>

                    {/* Interactive Cryptographic Escrow Vault Status Bar */}
                    <div
                      className={`p-3.5 rounded-2xl border transition-all space-y-2.5 ${
                        isTraditional
                          ? 'bg-rose-50 border-rose-200'
                          : qaApproved
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-sm'
                          : 'bg-slate-100/90 border-slate-200/90 text-slate-800'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isTraditional
                                ? 'bg-rose-500'
                                : qaApproved
                                ? 'bg-emerald-500 animate-ping'
                                : 'bg-amber-500'
                            }`}
                          />
                          <span className="font-mono text-[10.5px] font-bold">
                            {isTraditional
                              ? 'HOURLY DRIFT RISK: UNLOCKED'
                              : qaApproved
                              ? 'ESCROW RELEASED: STAGING APPROVED ✓'
                              : 'ESCROW STATUS: 100% LOCKED IN STAGING QA'}
                          </span>
                        </div>

                        {!isTraditional && (
                          <button
                            type="button"
                            onClick={() => setQaApproved((prev) => !prev)}
                            className={`px-2.5 py-0.5 rounded-lg font-mono text-[10px] font-bold transition-all cursor-pointer shadow-2xs ${
                              qaApproved
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                : 'bg-amber-500 hover:bg-amber-600 text-white'
                            }`}
                          >
                            {qaApproved ? 'Sign-Off Verified ✓' : 'Simulate QA Sign-Off ⚡'}
                          </button>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-500 pt-1.5 border-t border-slate-200/60">
                        <span>SIGN_HASH: {currentGate.hash}</span>
                        <span className="font-bold text-[#0F172A]">{currentGate.signOff}</span>
                      </div>
                    </div>

                    {/* Bottom 3-Pill Tech Badges */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(isTraditional
                        ? ['No Formal Staging SLA', 'Uncapped Scope Overruns', 'Junior Dev Billable Hours']
                        : ['14-Day Sprint Gates', 'Client Staging Sign-Off', '0% Scope Drift Guarantee']
                      ).map((item, idx) => (
                        <span
                          key={idx}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold border ${
                            isTraditional
                              ? 'bg-rose-50/80 border-rose-200/80 text-rose-800'
                              : 'bg-white border-slate-200/90 text-slate-700 shadow-2xs'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isTraditional ? 'bg-rose-500' : 'bg-amber-500'}`} />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (7 Cols): 4-Stage Clickable Sprint Stepper */}
                  <div className="lg:col-span-7 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between text-[10.5px] font-mono font-bold text-slate-600 uppercase tracking-wider">
                      <span>Click Sprint Gate to Audit Deliverables:</span>
                      <span className="text-amber-600">Strict 14-Day Velocity</span>
                    </div>

                    <div className="space-y-2">
                      {activeGates.map((gate, gIdx) => {
                        const isSelected = selectedGate === gIdx;
                        return (
                          <button
                            key={gIdx}
                            type="button"
                            onClick={() => setSelectedGate(gIdx)}
                            className={`w-full p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                              isSelected
                                ? isTraditional
                                  ? 'bg-rose-100/80 border-rose-300 ring-2 ring-rose-400/20'
                                  : 'bg-white border-[#377a9b]/50 shadow-xs ring-2 ring-[#377a9b]/15'
                                : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/80'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span
                                className={`w-6 h-6 rounded-lg font-mono text-[10.5px] font-black flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? isTraditional
                                      ? 'bg-rose-600 text-white'
                                      : 'bg-[#377a9b] text-white shadow-2xs'
                                    : isTraditional
                                    ? 'bg-rose-100 text-rose-700'
                                    : 'bg-white text-slate-700 border border-slate-200'
                                }`}
                              >
                                {gate.num}
                              </span>
                              <div className="min-w-0">
                                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-[13px] text-[#0F172A] truncate">
                                  {gate.name}
                                </div>
                                <div className="font-mono text-[9.5px] text-slate-500 truncate mt-0.5">
                                  {gate.duration} &bull; {gate.deliverables[0]}
                                </div>
                              </div>
                            </div>

                            <span
                              className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold shrink-0 ${
                                isTraditional
                                  ? 'bg-rose-100 text-rose-700 border border-rose-200/60'
                                  : isSelected
                                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold'
                                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                              }`}
                            >
                              {gate.status}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500 text-[10.5px]">
                        {isTraditional ? 'Uncapped Scope Overruns' : '0% Scope Drift Guarantee'}
                      </span>
                      <span className={`font-bold text-[10.5px] ${isTraditional ? 'text-rose-600' : 'text-[#377a9b]'}`}>
                        {isTraditional ? 'Surprise Change-Orders ✕' : 'QA Staging Sign-Off Required ✓'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  BAY 03: ZERO-TRUST DEFENSE CORE & RADAR HUD
                 ───────────────────────────────────────────────────────────── */}
              {activeBay === 2 && (
                <motion.div
                  key={`bay-03-${mode}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start"
                >
                  {/* Left Column (5 Cols): Narrative & Security Metrics */}
                  <div className="lg:col-span-5 flex flex-col gap-3.5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold ${
                            isTraditional
                              ? 'bg-rose-50 border border-rose-200 text-rose-700'
                              : 'bg-emerald-50 border border-emerald-200/80 text-emerald-800'
                          }`}
                        >
                          <Shield className={`w-3 h-3 ${isTraditional ? 'text-rose-600' : 'text-emerald-600'}`} />
                          <span>{isTraditional ? 'VULNERABLE SHARED HOSTING' : 'ZERO-TRUST DEFENSE HUD'}</span>
                        </div>

                        <div
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-mono font-bold ${
                            isTraditional
                              ? 'bg-rose-50 border border-rose-200 text-rose-700'
                              : 'bg-emerald-50 border border-emerald-200/80 text-emerald-800'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isTraditional ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                          <span>{isTraditional ? '12 KNOWN EXPLOITS' : '0 CVE VULNERABILITIES'}</span>
                        </div>
                      </div>

                      <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl text-[#0F172A] tracking-tight mb-1.5">
                        {isTraditional ? 'Zero-Trust Neglected.' : 'Hardened Zero-Trust Core.'}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                        {isTraditional
                          ? 'Outdated CMS setups running unpatched third-party plugins on shared hosts. Secrets stored in plaintext and zero DDoS edge protection leave sensitive business data exposed.'
                          : 'Hardened TypeScript architectures with automated CI/CD audits, cryptographic session encryption, and enterprise Layer 7 Cloudflare edge firewalls.'}
                      </p>
                    </div>

                    {/* Metric Cockpit */}
                    <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                          Security Posture & Compliance
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                            isTraditional ? 'bg-rose-100 text-rose-800' : 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                          }`}
                        >
                          {isTraditional ? 'High Risk Surface ✕' : 'SOC-2 Ready Architecture ✓'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                          <div className="text-[8.5px] font-mono text-slate-400 uppercase">DDoS Challenge</div>
                          <div className={`font-mono font-bold text-xs sm:text-[13px] ${isTraditional ? 'text-rose-600' : 'text-slate-900'}`}>
                            {isTraditional ? 'Unprotected' : '< 100k req/s'}
                          </div>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                          <div className="text-[8.5px] font-mono text-slate-400 uppercase">Vulnerability Surface</div>
                          <div className={`font-mono font-bold text-xs sm:text-[13px] ${isTraditional ? 'text-rose-600' : 'text-emerald-700'}`}>
                            {isTraditional ? '12+ Unpatched' : '0 CVEs'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom 3-Pill Tech Badges */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(isTraditional
                        ? ['No WAF Rate Limiting', 'Plaintext Session Keys', 'Manual FTP Uploads']
                        : ['Cloudflare Enterprise WAF', 'Stateless JWT & KMS Vault', 'OWASP CI/CD Scans']
                      ).map((item, idx) => (
                        <span
                          key={idx}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold border ${
                            isTraditional
                              ? 'bg-rose-50/80 border-rose-200/80 text-rose-800'
                              : 'bg-white border-slate-200/90 text-slate-700 shadow-2xs'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isTraditional ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (7 Cols): Layer Switcher & Dark Threat HUD Terminal */}
                  <div className="lg:col-span-7 flex flex-col gap-3">
                    {/* Layer Switcher Tabs */}
                    <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-slate-100/90 border border-slate-200/90">
                      {[
                        { id: 'waf', label: '01 Edge WAF', icon: Shield },
                        { id: 'auth', label: '02 Zero-Trust Auth', icon: KeyRound },
                        { id: 'cicd', label: '03 CI/CD Audit', icon: FileCode2 },
                      ].map((tab) => {
                        const Icon = tab.icon;
                        const isTabActive = securityTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setSecurityTab(tab.id as any)}
                            className={`py-1.5 px-1 rounded-xl text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                              isTabActive
                                ? isTraditional
                                  ? 'bg-rose-500 text-white shadow-xs font-bold'
                                  : 'bg-white text-emerald-800 shadow-xs border border-slate-200 font-bold'
                                : 'text-slate-500 hover:text-slate-900'
                            }`}
                          >
                            <Icon className={`w-3 h-3 ${isTabActive ? (isTraditional ? 'text-white' : 'text-emerald-600') : 'text-slate-400'}`} />
                            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11.5px] truncate">{tab.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Dark Obsidian Threat Mitigation Telemetry HUD */}
                    <div
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                        isTraditional
                          ? 'bg-rose-50 border-rose-200 text-rose-950'
                          : 'bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] border-slate-800 text-white shadow-lg'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 pb-2 mb-2 border-b border-white/10">
                        <div>
                          <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-[13px] text-white">
                            {currentSec.title}
                          </div>
                          <div className="font-mono text-[9.5px] text-slate-400 truncate mt-0.5">
                            {currentSec.subtitle}
                          </div>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold shrink-0 ${
                            isTraditional
                              ? 'bg-rose-200 text-rose-800'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {currentSec.status}
                        </span>
                      </div>

                      {/* Active Rules List */}
                      <div className="space-y-1.5">
                        {currentSec.rules.map((rule, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-2">
                            <div
                              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                isTraditional ? 'bg-rose-200 text-rose-700' : 'bg-emerald-500/20 text-emerald-400'
                              }`}
                            >
                              {isTraditional ? <XCircle className="w-2.5 h-2.5" /> : <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                            <span className="font-mono text-[10.5px] text-slate-300 leading-snug">
                              {rule}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between font-mono text-[9.5px] text-slate-400">
                        <span>METRIC AUDIT: {currentSec.metric}</span>
                        <span className={isTraditional ? 'text-rose-400' : 'text-emerald-400'}>
                          {isTraditional ? 'Exploit Risk: HIGH' : 'Exploit Risk: ZERO'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  BAY 04: DIRECT SQUAD ACCESS & WAR-ROOM UPLINK
                 ───────────────────────────────────────────────────────────── */}
              {activeBay === 3 && (
                <motion.div
                  key={`bay-04-${mode}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start"
                >
                  {/* Left Column (5 Cols): Narrative & Lead Architect Card */}
                  <div className="lg:col-span-5 flex flex-col gap-3.5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold ${
                            isTraditional
                              ? 'bg-rose-50 border border-rose-200 text-rose-700'
                              : 'bg-[#377a9b]/10 border border-[#377a9b]/25 text-[#377a9b]'
                          }`}
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>{isTraditional ? 'MIDDLEMAN TELEPHONE GAME' : 'DIRECT SQUAD WAR-ROOM'}</span>
                        </div>

                        <div
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-mono font-bold ${
                            isTraditional
                              ? 'bg-rose-50 border border-rose-200 text-rose-700'
                              : 'bg-[#377a9b]/10 border border-[#377a9b]/25 text-[#377a9b]'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isTraditional ? 'bg-rose-500' : 'bg-[#377a9b] animate-pulse'}`} />
                          <span>{isTraditional ? '48H–72H EMAIL LAG' : '< 12M ARCHITECT REPLY'}</span>
                        </div>
                      </div>

                      <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl text-[#0F172A] tracking-tight mb-1.5">
                        {isTraditional ? 'The Middleman Telephone Game.' : 'Direct Senior Engineers.'}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                        {isTraditional
                          ? 'Non-technical account managers sit between you and developers. Simple bug fixes take days to translate through tickets and surprise change invoices follow every minor tweak.'
                          : 'Zero non-technical account managers. You collaborate directly with Lead Architect Manthan Vaghasiya in a dedicated engineering war-room.'}
                      </p>
                    </div>

                    {/* Senior Architect Live Status Card */}
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100/90 border border-slate-200/90">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#377a9b] to-[#0284c7] text-white flex items-center justify-center font-bold font-mono text-xs shadow-xs">
                          MV
                        </div>
                        <div>
                          <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#0F172A]">
                            Manthan Vaghasiya
                          </div>
                          <div className="font-mono text-[9.5px] text-slate-500">
                            Lead Architect &bull; Surat Headquarters
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 font-mono text-[9.5px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Available Now</span>
                      </div>
                    </div>

                    {/* Direct Action Uplink Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href="https://wa.me/919664736245?text=Hi%20Manthan%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20Webiox."
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 font-mono text-[10.5px] font-bold transition-all cursor-pointer shadow-2xs"
                      >
                        <MessageCircle className="w-3 h-3 text-emerald-600" />
                        <span>WhatsApp VIP Direct</span>
                      </a>
                      <a
                        href="/contact"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-mono text-[10.5px] font-bold transition-all cursor-pointer"
                      >
                        <span>Request Slack War-Room</span>
                        <ArrowRight className="w-3 h-3 text-[#377a9b]" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column (7 Cols): Interactive War-Room Chat Stream Preview */}
                  <div className="lg:col-span-7 flex flex-col gap-2.5">
                    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
                      {/* Channel Selector Header */}
                      <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200/80">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setChatChannel('slack')}
                            className={`px-2.5 py-0.5 rounded-lg font-mono text-[10.5px] font-bold transition-all cursor-pointer ${
                              chatChannel === 'slack'
                                ? 'bg-[#377a9b] text-white shadow-2xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            #slack-war-room
                          </button>
                          <button
                            type="button"
                            onClick={() => setChatChannel('whatsapp')}
                            className={`px-2.5 py-0.5 rounded-lg font-mono text-[10.5px] font-bold transition-all cursor-pointer ${
                              chatChannel === 'whatsapp'
                                ? 'bg-emerald-600 text-white shadow-2xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            WhatsApp VIP Squad
                          </button>
                        </div>

                        <span className="font-mono text-[9.5px] text-slate-400">
                          {chatChannel === 'slack' ? '2 Senior Engineers' : 'Direct VIP Uplink'}
                        </span>
                      </div>

                      {/* Chat Messages Log */}
                      <div className="p-3 space-y-2 font-['Plus_Jakarta_Sans',sans-serif]">
                        {chatChannel === 'slack' ? (
                          <>
                            <div className="flex items-start gap-2">
                              <span className="w-5 h-5 rounded-md bg-[#377a9b] text-white font-mono text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                MV
                              </span>
                              <div>
                                <div className="flex items-baseline gap-1.5">
                                  <span className="font-bold text-[11.5px] text-[#0F172A]">Manthan Vaghasiya</span>
                                  <span className="font-mono text-[9px] text-slate-400">10:42 AM</span>
                                </div>
                                <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                                  PR #142 deployed to edge staging. Cache invalidation verified, TTFB 28ms across all regions.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <span className="w-5 h-5 rounded-md bg-slate-200 text-slate-700 font-mono text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                YOU
                              </span>
                              <div>
                                <div className="flex items-baseline gap-1.5">
                                  <span className="font-bold text-[11.5px] text-[#0F172A]">Founder / Partner</span>
                                  <span className="font-mono text-[9px] text-slate-400">10:45 AM</span>
                                </div>
                                <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                                  Tested on mobile Safari — instantaneous navigation! Approving sprint gate.
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[11.5px] text-emerald-800">Manthan Vaghasiya (WhatsApp VIP)</span>
                              <span className="font-mono text-[9px] text-slate-400">09:26 AM</span>
                            </div>
                            <p className="text-[11px] text-slate-700 leading-relaxed">
                              "Good morning! Staging database schema updated with Redis idempotency keys. Live staging preview ready for review."
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500 text-[10.5px]">
                        {isTraditional ? 'Average Response: 48h–72h' : 'Direct Architect Response SLA'}
                      </span>
                      <span className={`font-bold text-[10.5px] ${isTraditional ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {isTraditional ? 'Delayed Support Tickets ✕' : '< 12m Average Reply Time ✓'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── PERSISTENT REAL-TIME BENCHMARK MATRIX (BOTTOM TELEMETRY STRIP) ── */}
          <div className="mt-6 pt-4 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-2.5 text-center">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="text-[9px] font-mono text-slate-400 uppercase font-semibold">LCP Speed</div>
              <div className="font-mono font-bold text-xs sm:text-[12.5px] text-[#0F172A] mt-0.5">
                0.38s <span className="text-slate-400 font-normal">vs 3.8s</span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="text-[9px] font-mono text-slate-400 uppercase font-semibold">Scope Integrity</div>
              <div className="font-mono font-bold text-xs sm:text-[12.5px] text-emerald-700 mt-0.5">
                100% Escrow <span className="text-slate-400 font-normal">vs Drift</span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="text-[9px] font-mono text-slate-400 uppercase font-semibold">Vulnerabilities</div>
              <div className="font-mono font-bold text-xs sm:text-[12.5px] text-[#377a9b] mt-0.5">
                0 CVEs <span className="text-slate-400 font-normal">vs 12+ Bugs</span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="text-[9px] font-mono text-slate-400 uppercase font-semibold">Squad Uplink</div>
              <div className="font-mono font-bold text-xs sm:text-[12.5px] text-[#0F172A] mt-0.5">
                Direct MV <span className="text-slate-400 font-normal">vs Middlemen</span>
              </div>
            </div>
          </div>

        </div>

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
