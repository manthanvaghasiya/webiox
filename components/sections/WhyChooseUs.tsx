'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  MessageSquare,
  Lock,
  CheckCircle2,
  XCircle,
  Gauge,
  SlidersHorizontal,
  Activity,
  Terminal,
  Cpu,
  Server,
  Radio,
  Check,
  ChevronRight,
  ChevronLeft,
  Code2,
  Layers,
  ShieldAlert,
  Smartphone,
  ExternalLink,
  MessageCircle,
  AlertTriangle,
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

const COMPARISON_METRICS = [
  {
    metric: 'Initial Page Load (LCP)',
    webiox: '0.38s (Sub-second Edge CDN)',
    traditional: '3.2s – 4.5s (Sluggish server render)',
    impact: '8.4x Faster',
  },
  {
    metric: 'Core Web Vitals Score',
    webiox: '98–100 / 100 (Passes all audits)',
    traditional: '38–62 / 100 (Fails mobile CWV)',
    impact: '+52% SEO Rank Boost',
  },
  {
    metric: 'Production Bundle Weight',
    webiox: '~78 KB gzipped (Tree-shaken Next.js)',
    traditional: '2.5 MB – 4.8 MB (Unminified plugins)',
    impact: '96% Less Data Drain',
  },
  {
    metric: 'Security & CVE Surface',
    webiox: '0 Known CVEs (Stateless JWT, Cloudflare WAF)',
    traditional: 'High Risk (10–30 unpatched plugin exploits)',
    impact: 'Zero CVE Exploit Risk',
  },
  {
    metric: 'Maintenance Overhead',
    webiox: '< 1 hr / quarter (Automated CI/CD)',
    traditional: '15–20 hrs / month (Plugin breakages)',
    impact: '90% Cost Reduction',
  },
  {
    metric: 'Concurrent Concurrency',
    webiox: '100,000+ req/sec (Edge autoscaling)',
    traditional: 'Crashes above 1,500 users',
    impact: 'Enterprise Ready',
  },
  {
    metric: 'Source Code Ownership',
    webiox: '100% Client IP (Clean GitHub Repo Handover)',
    traditional: 'Proprietary theme & vendor lock-in',
    impact: 'Zero Platform Lock-in',
  },
];

export default function WhyChooseUs() {
  const [mode, setMode] = useState<PerspectiveMode>('contrast');
  const [activeSpeedStack, setActiveSpeedStack] = useState<'webiox' | 'traditional'>('webiox');
  const [selectedGate, setSelectedGate] = useState<number>(2); // Default to active Phase 03
  const [threatSimulating, setThreatSimulating] = useState<boolean>(false);
  const [threatMitigated, setThreatMitigated] = useState<boolean>(false);
  const [activeChatTab, setActiveChatTab] = useState<'slack' | 'whatsapp'>('slack');
  const [mobilePillar, setMobilePillar] = useState<number>(0);
  const [mobileCompareTab, setMobileCompareTab] = useState<'webiox' | 'traditional'>('webiox');

  const triggerThreatSimulation = () => {
    if (threatSimulating) return;
    setThreatSimulating(true);
    setThreatMitigated(false);
    setTimeout(() => {
      setThreatSimulating(false);
      setThreatMitigated(true);
      setTimeout(() => {
        setThreatMitigated(false);
      }, 5000);
    }, 1400);
  };

  /* ──────────────────────────────────────────────────────────────────
      MODULE 01: VELOCITY & INFRASTRUCTURE
     ────────────────────────────────────────────────────────────────── */
  const renderModule01 = (isMobile?: boolean) => {
    const isTraditional = mode === 'traditional';
    const effectiveSpeedStack = isTraditional ? 'traditional' : (mode === 'webiox' ? 'webiox' : activeSpeedStack);

    return (
      <div className={`w-full h-full rounded-3xl bg-white border ${
        isTraditional ? 'border-rose-200/90 shadow-[0_20px_50px_-15px_rgba(225,29,72,0.12)]' : 'border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(55,122,155,0.12)]'
      } ${isMobile ? 'p-5' : 'p-6 sm:p-7'} relative overflow-hidden transition-all duration-500 flex flex-col justify-start gap-4 sm:gap-5`}>
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

          <div>
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl lg:text-3xl text-[#0F172A] tracking-tight mb-1.5">
              {isTraditional ? 'Monolithic Infrastructure Lag.' : 'Sub-Second Edge Infrastructure.'}
            </h3>
            <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed max-w-2xl">
              {isTraditional
                ? 'Legacy WordPress/PHP monoliths with 30+ unpatched plugins, uncached origin bottlenecks, and sluggish database queries. 850ms TTFB, 3.8s LCP paint, and failed Core Web Vitals.'
                : 'Next.js 16 App Router with Incremental Static Regeneration (ISR) and Edge Redis caching. Zero cold starts, sub-400ms LCP, and instant page transitions with sub-second edge delivery.'}
            </p>
          </div>
        </div>

        {/* Live Route & Benchmark Profiler Console */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200/90 p-4 sm:p-5 relative overflow-hidden flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Radio className={`w-3.5 h-3.5 ${isTraditional ? 'text-rose-500' : 'text-[#377a9b] animate-pulse'}`} />
              <span className="text-slate-700 font-bold uppercase tracking-wider text-[10.5px]">
                {isTraditional ? 'Monolith Origin Benchmark' : 'Live Route & Benchmark Profiler'}
              </span>
            </div>

            {mode === 'contrast' && (
              <div className="inline-flex items-center p-1 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setActiveSpeedStack('webiox')}
                  className={`px-2.5 py-1 rounded-lg text-[10.5px] font-mono font-bold transition-all cursor-pointer ${
                    activeSpeedStack === 'webiox'
                      ? 'bg-[#377a9b] text-white shadow-xs'
                      : 'text-slate-500 hover:text-[#0F172A]'
                  }`}
                >
                  ⚡ Webiox Edge
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSpeedStack('traditional')}
                  className={`px-2.5 py-1 rounded-lg text-[10.5px] font-mono font-bold transition-all cursor-pointer ${
                    activeSpeedStack === 'traditional'
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-slate-500 hover:text-[#0F172A]'
                  }`}
                >
                  ✕ Monolith
                </button>
              </div>
            )}
          </div>

          {/* Interactive Hop Network Pipeline */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between gap-3 mb-2.5">
              {/* Hop 1: Client */}
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4 text-[#377a9b]" />
                </div>
                <div className="min-w-0">
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#0F172A] truncate">
                    Client Browser
                  </div>
                  <div className="font-mono text-[9px] text-slate-500 font-medium">SURAT_REQ</div>
                </div>
              </div>

              {/* Hop 2: Middle Pipe Arrow */}
              <div className="flex-1 flex flex-col items-center px-2">
                <div className="flex items-center gap-1 text-[9.5px] font-mono font-bold text-slate-500 mb-0.5">
                  <span className={effectiveSpeedStack === 'webiox' ? 'text-emerald-700' : 'text-rose-700'}>
                    {effectiveSpeedStack === 'webiox' ? '⚡ 38ms Edge Route' : '✕ 850ms Origin Delay'}
                  </span>
                </div>
                <div className="w-full h-1 rounded-full bg-slate-100 relative overflow-hidden">
                  <div className={`h-full rounded-full ${
                    effectiveSpeedStack === 'webiox' ? 'w-full bg-gradient-to-r from-[#377a9b] to-emerald-500 animate-pulse' : 'w-1/3 bg-rose-500'
                  }`} />
                </div>
              </div>

              {/* Hop 3: Edge Destination */}
              <div className="flex items-center gap-2 text-right shrink-0">
                <div className="min-w-0">
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#0F172A] truncate">
                    {effectiveSpeedStack === 'webiox' ? 'Mumbai Edge PoP' : 'Uncached Apache'}
                  </div>
                  <div className={`font-mono text-[9px] font-bold ${
                    effectiveSpeedStack === 'webiox' ? 'text-emerald-700' : 'text-rose-700'
                  }`}>
                    {effectiveSpeedStack === 'webiox' ? 'Hit (Redis ISR)' : 'Cold Origin Parse'}
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  effectiveSpeedStack === 'webiox'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                    : 'bg-rose-50 text-rose-700 border border-rose-200/80'
                }`}>
                  <Server className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Live HTTP Edge Request Ticker */}
            <div className="py-2 px-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-[10.5px] font-mono mb-2.5">
              <div className="flex items-center gap-2 truncate">
                <span className="px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700 font-bold text-[9px]">
                  GET
                </span>
                <span className="text-slate-600 truncate">
                  {effectiveSpeedStack === 'webiox' ? '/api/v1/catalog-index • 200 OK' : '/wp-admin/admin-ajax.php • 200 OK'}
                </span>
              </div>
              <span className={`font-bold shrink-0 text-[10px] ${
                effectiveSpeedStack === 'webiox' ? 'text-emerald-700' : 'text-rose-700'
              }`}>
                {effectiveSpeedStack === 'webiox' ? 'CACHE: HIT (4ms)' : 'CACHE: MISS (Cold)'}
              </span>
            </div>

            {/* 4 Technical Metric Indicators */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-4 gap-1.5 sm:gap-2 text-center">
              <div className="p-1.5 sm:p-2 rounded-lg bg-slate-50/70 border border-slate-100">
                <span className="text-[9px] font-mono text-slate-600 font-medium block mb-0.5 truncate">TTFB Latency</span>
                <span className={`font-mono font-black text-xs sm:text-base ${
                  effectiveSpeedStack === 'webiox' ? 'text-emerald-700' : 'text-rose-700'
                }`}>
                  {effectiveSpeedStack === 'webiox' ? '38ms' : '850ms'}
                </span>
              </div>

              <div className="p-1.5 sm:p-2 rounded-lg bg-slate-50/70 border border-slate-100">
                <span className="text-[9px] font-mono text-slate-600 font-medium block mb-0.5 truncate">LCP Paint</span>
                <span className={`font-mono font-black text-xs sm:text-base ${
                  effectiveSpeedStack === 'webiox' ? 'text-emerald-700' : 'text-rose-700'
                }`}>
                  {effectiveSpeedStack === 'webiox' ? '0.38s' : '3.8s'}
                </span>
              </div>

              <div className="p-1.5 sm:p-2 rounded-lg bg-slate-50/70 border border-slate-100">
                <span className="text-[9px] font-mono text-slate-600 font-medium block mb-0.5 truncate">Bundle Size</span>
                <span className={`font-mono font-black text-xs sm:text-base ${
                  effectiveSpeedStack === 'webiox' ? 'text-emerald-700' : 'text-rose-700'
                }`}>
                  {effectiveSpeedStack === 'webiox' ? '78 KB' : '2.4 MB'}
                </span>
              </div>

              <div className="p-1.5 sm:p-2 rounded-lg bg-slate-50/70 border border-slate-100">
                <span className="text-[9px] font-mono text-slate-600 font-medium block mb-0.5 truncate">Core Vitals</span>
                <span className={`font-mono font-black text-xs sm:text-base ${
                  effectiveSpeedStack === 'webiox' ? 'text-emerald-700' : 'text-rose-700'
                }`}>
                  {effectiveSpeedStack === 'webiox' ? '99 / 100' : '48 / 100'}
                </span>
              </div>
            </div>
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
    const currentGate = activeGates[selectedGate] || activeGates[0];

    return (
      <div className={`w-full h-full rounded-3xl bg-white border ${
        isTraditional ? 'border-rose-200/90 shadow-[0_20px_50px_-15px_rgba(225,29,72,0.12)]' : 'border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(55,122,155,0.12)]'
      } ${isMobile ? 'p-5' : 'p-6 sm:p-8'} relative overflow-hidden transition-all duration-500 flex flex-col justify-between`}>
        <div className={`absolute top-0 right-0 w-80 h-80 ${isTraditional ? 'bg-rose-500/8' : 'bg-[#ffc312]/8'} rounded-full blur-3xl pointer-events-none`} />
        <div aria-hidden="true" className="absolute top-3 left-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute top-3 right-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute bottom-3 right-3 text-slate-400 font-mono text-[9px] select-none pointer-events-none">
          {isTraditional ? 'DRIFT_RISK // HOURLY_DRAIN' : 'SLA_PROTOCOL // ZERO_DRIFT'}
        </div>

        <div>
          <div className="flex items-center justify-between gap-2 mb-4">
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

          <div className="mb-5">
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl lg:text-3xl text-[#0F172A] tracking-tight mb-1.5">
              {isTraditional ? 'The Hourly Billing Trap.' : 'Sprint Milestone Vault.'}
            </h3>
            <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
              {isTraditional
                ? 'Traditional agencies drag projects out for months with vague specs and open-ended hourly billing. Scope creep and surprise invoices pile up while deadlines slide.'
                : 'Traditional agencies drag projects for months with hourly billing. Webiox locks delivery into verified 14-day sprint gates: payments unlock strictly after staging QA sign-off.'}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200/90 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              {isTraditional ? 'Legacy Agency Timeline' : 'Interactive Sprint Gates'}
            </span>
            <span className={`font-bold text-[10.5px] ${isTraditional ? 'text-rose-700' : 'text-amber-700'}`}>
              {isTraditional ? '+35% Scope Overages' : '0% Scope Drift'}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {activeGates.map((gate, idx) => (
              <button
                key={gate.id}
                type="button"
                onClick={() => setSelectedGate(idx)}
                className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer border ${
                  selectedGate === idx
                    ? isTraditional
                      ? 'bg-white border-rose-500 text-[#0F172A] shadow-xs ring-1 ring-rose-500/30'
                      : 'bg-white border-[#377a9b] text-[#0F172A] shadow-xs ring-1 ring-[#377a9b]/30'
                    : isTraditional
                    ? 'bg-rose-50/50 border-rose-200/60 text-rose-700 hover:bg-rose-50'
                    : idx < selectedGate
                    ? 'bg-emerald-50/70 border-emerald-200/60 text-emerald-800'
                    : 'bg-white/60 border-slate-200/70 text-slate-500 hover:bg-white'
                }`}
              >
                <span className="block font-mono text-[10px] font-black">{gate.num}</span>
                <span className="block font-['Plus_Jakarta_Sans',sans-serif] text-[10px] font-bold truncate">
                  Phase {idx + 1}
                </span>
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#0F172A] block">
                  {currentGate.name}
                </span>
                <span className="font-mono text-[10px] text-slate-600 font-medium">
                  {currentGate.duration}
                </span>
              </div>

              <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                isTraditional
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : selectedGate === 2
                  ? 'bg-[#377a9b]/10 text-[#377a9b] border border-[#377a9b]/20'
                  : selectedGate < 2
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {currentGate.status}
              </span>
            </div>

            <div className="space-y-1.5 my-2.5">
              {currentGate.deliverables.map((item, dIdx) => (
                <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-600">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    isTraditional ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {isTraditional ? <XCircle className="w-2.5 h-2.5" /> : <Check className="w-2.5 h-2.5" />}
                  </div>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11.5px]">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
              <span className="text-slate-600 font-medium">{currentGate.verification}</span>
              <span className={`font-bold ${isTraditional ? 'text-rose-600' : 'text-[#377a9b]'}`}>
                {isTraditional ? 'Scope Drift Warning ✕' : 'QA Gate Verified ✓'}
              </span>
            </div>
          </div>
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
      } ${isMobile ? 'p-5' : 'p-6 sm:p-8'} relative overflow-hidden transition-all duration-500 flex flex-col justify-between`}>
        <div className={`absolute top-0 right-0 w-80 h-80 ${isTraditional ? 'bg-rose-500/8' : 'bg-emerald-500/8'} rounded-full blur-3xl pointer-events-none`} />
        <div aria-hidden="true" className="absolute top-3 left-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute top-3 right-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute bottom-3 right-3 text-slate-400 font-mono text-[9px] select-none pointer-events-none">
          {isTraditional ? 'EXPLOIT_SURFACE // ZERO_WAF' : 'DEFENSE_CORE // SOC_2_READY'}
        </div>

        <div>
          <div className="flex items-center justify-between gap-2 mb-4">
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

          <div className="mb-5">
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl lg:text-3xl text-[#0F172A] tracking-tight mb-1.5">
              {isTraditional ? 'Zero-Trust Neglected.' : 'Hardened Zero-Trust.'}
            </h3>
            <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
              {isTraditional
                ? 'Generic agencies deploy on cheap shared hosting with dozens of unpatched third-party plugins, plain-text credentials in repositories, and zero DDoS protection.'
                : 'Generic agencies install dozens of vulnerable plugins that invite exploits. We build custom hardened TypeScript architectures with cryptographic authentication and automated CI/CD audits.'}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200/90 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              {isTraditional ? 'Vulnerability Threat Profile' : '4-Layer Defense Perimeter'}
            </span>
            <button
              type="button"
              onClick={triggerThreatSimulation}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] font-mono font-bold transition-all cursor-pointer ${
                threatSimulating
                  ? 'bg-amber-500 text-white animate-pulse'
                  : threatMitigated
                  ? isTraditional
                    ? 'bg-rose-600 text-white'
                    : 'bg-emerald-600 text-white'
                  : 'bg-white border border-slate-200 text-[#377a9b] hover:bg-slate-50 shadow-2xs'
              }`}
            >
              <ShieldAlert className="w-3 h-3" />
              <span>
                {threatSimulating
                  ? isTraditional ? 'Simulating Exploit...' : 'Simulating Attack...'
                  : threatMitigated
                  ? isTraditional ? '12 Exploits Succeeded ✕' : 'Threat Mitigated in 3.4ms ✓'
                  : isTraditional ? 'Simulate Attack on Monolith' : 'Simulate Threat Scan'}
              </span>
            </button>
          </div>

          <div className="space-y-2">
            {activeDefenseItems.map((item, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border transition-all duration-300 flex items-start gap-2.5 ${
                  threatSimulating
                    ? 'bg-amber-50/70 border-amber-200'
                    : threatMitigated
                    ? isTraditional ? 'bg-rose-50/70 border-rose-200' : 'bg-emerald-50/70 border-emerald-200'
                    : 'bg-white border-slate-200/80 shadow-2xs'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                  isTraditional ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {isTraditional ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#0F172A]">
                      {item.title}
                    </span>
                    <span className={`font-mono text-[9.5px] font-bold ${
                      isTraditional ? 'text-rose-700' : 'text-emerald-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-slate-500 truncate">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  /* ──────────────────────────────────────────────────────────────────
      MODULE 04: AGILITY & DIRECT COLLABORATION
     ────────────────────────────────────────────────────────────────── */
  const renderModule04 = (isMobile?: boolean) => {
    const isTraditional = mode === 'traditional';

    return (
      <div className={`w-full h-full rounded-3xl bg-white border ${
        isTraditional ? 'border-rose-200/90 shadow-[0_20px_50px_-15px_rgba(225,29,72,0.12)]' : 'border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(55,122,155,0.12)]'
      } ${isMobile ? 'p-5' : 'p-6 sm:p-8'} relative overflow-hidden transition-all duration-500 flex flex-col justify-between`}>
        <div className={`absolute top-0 right-0 w-80 h-80 ${isTraditional ? 'bg-rose-500/8' : 'bg-[#377a9b]/8'} rounded-full blur-3xl pointer-events-none`} />
        <div aria-hidden="true" className="absolute top-3 left-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute top-3 right-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
        <div aria-hidden="true" className="absolute bottom-3 right-3 text-slate-400 font-mono text-[9px] select-none pointer-events-none">
          {isTraditional ? 'MIDDLEMEN_CHAIN // 48H_LAG' : 'SQUAD_UPLINK // SURAT_DIRECT'}
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
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

          <div className="mb-5">
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
        </div>

        <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200/90 p-4 sm:p-5">
          {isTraditional ? (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-600 pb-2 border-b border-slate-200">
                <span className="font-bold text-rose-700 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Traditional Agency Inbox Runaround</span>
                </span>
                <span className="text-[10px] text-slate-600 font-medium">Response Delay: 3 Days</span>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50/40 border border-rose-200/80 shadow-2xs space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-300 text-slate-700 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    AM
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#0F172A]">
                        Sarah (Junior Account Coordinator)
                      </span>
                      <span className="font-mono text-[10px] text-slate-600 font-medium">3 days ago</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-[12px] leading-relaxed">
                      "Hi! I forwarded your urgent styling ticket to our offshore contractor. They said this is out of scope and requires an extra $1,600 change order and 2 weeks. I've scheduled a catch-up call for next Thursday."
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-white border border-rose-200 flex items-center justify-between text-[10.5px] font-mono text-rose-700">
                  <span className="font-bold">TICKET #4819: PENDING PM REVIEW</span>
                  <span className="bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-bold">+2 WEEKS DELAY</span>
                </div>
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-mono text-[10px] text-slate-600 font-medium">
                  Multiple account managers • 0 direct developer access
                </span>
                <span className="font-mono text-[10.5px] font-bold text-rose-600">
                  High Overhead Cost
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-[#377a9b] text-white flex items-center justify-center font-bold text-[9px] ring-2 ring-white">
                      MV
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[9px] ring-2 ring-white">
                      FE
                    </div>
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px] ring-2 ring-white">
                      DO
                    </div>
                  </div>
                  <span className="font-bold text-[#0F172A] text-[11px]">
                    #squad-client-war-room
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>

                <div className="inline-flex items-center p-0.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setActiveChatTab('slack')}
                    className={`px-2.5 py-1 rounded-md text-[10.5px] font-mono font-bold transition-all cursor-pointer ${
                      activeChatTab === 'slack'
                        ? 'bg-[#377a9b] text-white shadow-xs'
                        : 'text-slate-500 hover:text-[#0F172A]'
                    }`}
                  >
                    Slack War-Room
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveChatTab('whatsapp')}
                    className={`px-2.5 py-1 rounded-md text-[10.5px] font-mono font-bold transition-all cursor-pointer ${
                      activeChatTab === 'whatsapp'
                        ? 'bg-[#25D366] text-white shadow-xs'
                        : 'text-slate-500 hover:text-[#0F172A]'
                    }`}
                  >
                    WhatsApp VIP
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {activeChatTab === 'slack' ? (
                  <motion.div
                    key="slack-view"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#377a9b] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-2xs">
                        MV
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#0F172A]">
                              Manthan Vaghasiya (Lead Architect)
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-[#377a9b]/10 text-[#377a9b] text-[9.5px] font-mono font-bold">
                              Slack Direct
                            </span>
                          </div>
                          <span className="font-mono text-[10px] text-slate-600 font-medium">10:42 AM</span>
                        </div>

                        <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed">
                          "Sprint 03 staging build is live. Redis edge cache index is verified at 38ms TTFB with zero dropped frames. Check your staging preview link—ready for your review!"
                        </p>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-[10.5px] font-mono text-slate-500">
                      <div className="flex items-center gap-2 truncate">
                        <Code2 className="w-3.5 h-3.5 text-[#377a9b] shrink-0" />
                        <span className="text-slate-700 font-bold">commit 9d42f8c:</span>
                        <span className="truncate">feat(cache): Edge ISR warmed across global edge nodes</span>
                      </div>
                      <span className="text-emerald-700 font-bold shrink-0 ml-2">PASS 100%</span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-mono text-[10px] text-slate-600 font-medium">
                        Average response: &lt; 12 mins • Direct Private Slack
                      </span>
                      <a
                        href="/contact"
                        aria-label="Request Slack invite from Webiox lead architect"
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#377a9b] hover:text-[#2b6683] transition-colors cursor-pointer"
                      >
                        <span>Request Slack Invite</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="whatsapp-view"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="p-3.5 sm:p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/90 shadow-2xs space-y-2.5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-2xs">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#0F172A]">
                              Manthan Vaghasiya (Lead Architect)
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9.5px] font-mono font-bold">
                              WhatsApp VIP Online
                            </span>
                          </div>
                          <span className="font-mono text-[10px] text-emerald-700 font-bold">Active Now</span>
                        </div>

                        <div className="p-3 rounded-xl bg-white border border-emerald-100 text-slate-700 text-xs sm:text-[12.5px] leading-relaxed shadow-2xs">
                          "Hey! Staging preview for your project is ready for your team. You have direct 24/7 access to our senior engineering squad right here on WhatsApp."
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-emerald-200/80 flex items-center justify-between text-[10.5px] font-mono text-emerald-800">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                        <span className="font-bold">WhatsApp Hotline:</span>
                        <span className="truncate">+91 96647 36245 (Direct to Lead Architect)</span>
                      </div>
                      <span className="text-emerald-700 font-bold shrink-0 ml-2">INSTANT</span>
                    </div>

                    <div className="pt-2 border-t border-emerald-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-mono text-[10px] text-slate-500">
                        Zero middleman delay • Direct to Manthan Vaghasiya
                      </span>
                      <a
                        href="https://wa.me/919664736245?text=Hi%20Manthan%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20Webiox."
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-mono text-[11px] font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp VIP</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
                onClick={() => {
                  setMode('webiox');
                  setActiveSpeedStack('webiox');
                }}
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
                onClick={() => {
                  setMode('traditional');
                  setActiveSpeedStack('traditional');
                }}
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

          {/* Dynamic Perspective Indicator Pill */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`mode-indicator-${mode}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="mt-4 flex items-center justify-center text-center px-4"
            >
              {mode === 'contrast' && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#377a9b] shrink-0" />
                  <span><strong>Direct Contrast Mode:</strong> Side-by-side interactive technical audit comparing Webiox engineering vs legacy practices.</span>
                </div>
              )}
              {mode === 'webiox' && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>The Webiox Standard:</strong> Sub-second edge speed, locked 14-day sprint SLAs, zero middlemen, 99.8% uptime.</span>
                </div>
              )}
              {mode === 'traditional' && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs font-mono">
                  <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span><strong>Traditional Agency Way:</strong> Sluggish monoliths, open-ended hourly billing, unpatched plugins, 48hr email delays.</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
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
                  className={`min-h-[50px] py-2 px-1 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 active:scale-[0.98] ${
                    isActive
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
                    className={`h-2 rounded-full transition-all duration-300 block ${
                      mobilePillar === idx ? 'w-6 bg-[#377a9b]' : 'w-2 bg-slate-200 hover:bg-slate-300'
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
            AEO OBJECTIVE BENCHMARK COMPARISON MATRIX
            Direct Answer Table optimized for Conversational & Answer Engines
           ════════════════════════════════════════════════════════════════════ */}
        <div className="mt-12 sm:mt-16 rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-7 md:p-8 shadow-[0_15px_40px_-10px_rgba(15,23,42,0.06)] overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#377a9b]/10 text-[#377a9b] text-[11px] font-mono font-bold mb-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>ARCHITECTURAL BENCHMARK MATRIX</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl text-[#0F172A] tracking-tight">
                Webiox Custom Framework vs Generic CMS &amp; Bloated Templates
              </h3>
            </div>
            <div className="text-[11px] font-mono text-slate-500 shrink-0">
              Objective Metric Audit • 2026 Standards
            </div>
          </div>

          {/* Desktop Matrix (Semantic Table for AI crawlers & Large screens) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono uppercase text-[10.5px]">
                  <th className="py-3 px-4 font-bold">Engineering Dimension</th>
                  <th className="py-3 px-4 font-bold text-[#377a9b] bg-[#377a9b]/5 rounded-t-xl">
                    Webiox Custom Code (Next.js 16)
                  </th>
                  <th className="py-3 px-4 font-bold text-rose-700">Generic Templates / WordPress</th>
                  <th className="py-3 px-4 font-bold text-slate-700">Measured Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON_METRICS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif]">
                      {row.metric}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-800 bg-[#377a9b]/5 font-mono">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{row.webiox}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold font-mono text-[#377a9b]">
                      {row.impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Alternative (Segmented Card Controller, >= 48px touch targets) */}
          <div className="block md:hidden">
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-100 mb-4">
              <button
                type="button"
                onClick={() => setMobileCompareTab('webiox')}
                className={`min-h-[44px] py-2 px-3 rounded-lg text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  mobileCompareTab === 'webiox'
                    ? 'bg-white text-[#377a9b] shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Webiox Custom</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileCompareTab('traditional')}
                className={`min-h-[44px] py-2 px-3 rounded-lg text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  mobileCompareTab === 'traditional'
                    ? 'bg-white text-rose-700 shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                <span>Bloated CMS</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {COMPARISON_METRICS.map((row, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all ${
                    mobileCompareTab === 'webiox'
                      ? 'bg-emerald-50/40 border-emerald-200/70'
                      : 'bg-rose-50/40 border-rose-200/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#0F172A]">
                      {row.metric}
                    </span>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-[#377a9b]">
                      {row.impact}
                    </span>
                  </div>
                  <div className="font-mono text-xs font-semibold">
                    {mobileCompareTab === 'webiox' ? (
                      <span className="text-emerald-800 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{row.webiox}</span>
                      </span>
                    ) : (
                      <span className="text-slate-700 flex items-start gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{row.traditional}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
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

