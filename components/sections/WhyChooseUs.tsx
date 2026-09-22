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
    deliverables: ['Next.js 15 Server Components', 'Zero-Trust JWT Auth & RBAC', 'Edge Redis Cache Invalidation'],
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

const PILLARS = [
  { id: 'velocity', num: '01', title: 'Velocity', subtitle: 'Edge SLA', icon: Gauge },
  { id: 'milestones', num: '02', title: 'Milestones', subtitle: '100% Lock', icon: Clock },
  { id: 'security', num: '03', title: 'Security', subtitle: 'Zero-Trust', icon: Lock },
  { id: 'squad', num: '04', title: 'Direct Squad', subtitle: 'Zero Middlemen', icon: MessageSquare },
];

export default function WhyChooseUs() {
  const [mode, setMode] = useState<PerspectiveMode>('contrast');
  const [activeSpeedStack, setActiveSpeedStack] = useState<'webiox' | 'traditional'>('webiox');
  const [selectedGate, setSelectedGate] = useState<number>(2); // Default to active Phase 03
  const [threatSimulating, setThreatSimulating] = useState<boolean>(false);
  const [threatMitigated, setThreatMitigated] = useState<boolean>(false);
  const [activeChatTab, setActiveChatTab] = useState<'slack' | 'whatsapp'>('slack');
  const [mobilePillar, setMobilePillar] = useState<number>(0);

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
  const renderModule01 = (isMobile?: boolean) => (
    <div className={`w-full h-full rounded-3xl bg-white border border-slate-200/90 ${isMobile ? 'p-5' : 'p-6 sm:p-8'} relative overflow-hidden transition-all duration-500 shadow-[0_20px_50px_-15px_rgba(26,112,151,0.12)] hover:shadow-[0_30px_70px_-12px_rgba(26,112,151,0.24)] flex flex-col justify-between`}>
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#1a7097]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-3 left-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
      <div className="absolute top-3 right-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
      <div className="absolute bottom-3 right-3 text-slate-300 font-mono text-[9px] select-none pointer-events-none">SURAT_EDGE // 21.17°N 72.83°E</div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a7097]/10 border border-[#1a7097]/20 text-[10.5px] font-mono text-[#1a7097] font-bold">
            <Gauge className="w-3.5 h-3.5 text-[#1a7097]" />
            <span>01 // VELOCITY & INFRASTRUCTURE</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10.5px] font-mono font-bold text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>SUB-SECOND EDGE ACTIVE</span>
          </div>
        </div>

        <div className="mb-5">
          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl lg:text-3xl text-[#0F172A] tracking-tight mb-1.5">
            Sub-Second Edge Infrastructure.
          </h3>
          <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed max-w-xl">
            Next.js 15 App Router with Incremental Static Regeneration (ISR) and Edge Redis caching. Zero cold starts, sub-400ms LCP, and instant page transitions with sub-second edge delivery.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200/90 p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-[#1a7097] animate-pulse" />
            <span className="text-slate-700 font-bold uppercase tracking-wider text-[10.5px]">
              Live Route & Benchmark Profiler
            </span>
          </div>

          <div className="inline-flex items-center p-1 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveSpeedStack('webiox')}
              className={`px-2.5 py-1 rounded-lg text-[10.5px] font-mono font-bold transition-all cursor-pointer ${
                activeSpeedStack === 'webiox'
                  ? 'bg-[#1a7097] text-white shadow-xs'
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
        </div>

        <div className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-mono text-xs font-black text-[#0F172A] shrink-0">
                <Smartphone className="w-4 h-4 text-[#1a7097]" />
              </div>
              <div className="min-w-0">
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#0F172A] truncate">
                  Enterprise Client
                </div>
                <div className="font-mono text-[9px] text-slate-400">CLIENT_REQ</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 text-right">
              <div className="min-w-0">
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#0F172A] truncate">
                  {activeSpeedStack === 'webiox' ? 'Mumbai Edge PoP' : 'Uncached Origin'}
                </div>
                <div className="font-mono text-[9px] font-bold text-emerald-600">
                  {activeSpeedStack === 'webiox' ? '38ms Cache Hit' : '850ms Cold Parse'}
                </div>
              </div>
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-mono text-xs font-black shrink-0 ${
                activeSpeedStack === 'webiox'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                  : 'bg-rose-50 text-rose-700 border border-rose-200/80'
              }`}>
                <Server className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="pt-2.5 border-t border-slate-100 grid grid-cols-3 gap-1.5 sm:gap-3 text-center">
            <div className="p-1.5 sm:p-2 rounded-lg bg-slate-50/70 border border-slate-100">
              <span className="text-[9px] font-mono text-slate-400 block mb-0.5 truncate">TTFB Latency</span>
              <span className={`font-mono font-black text-xs sm:text-base ${
                activeSpeedStack === 'webiox' ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {activeSpeedStack === 'webiox' ? '38ms' : '850ms'}
              </span>
            </div>

            <div className="p-1.5 sm:p-2 rounded-lg bg-slate-50/70 border border-slate-100">
              <span className="text-[9px] font-mono text-slate-400 block mb-0.5 truncate">LCP Paint</span>
              <span className={`font-mono font-black text-xs sm:text-base ${
                activeSpeedStack === 'webiox' ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {activeSpeedStack === 'webiox' ? '0.38s' : '3.8s'}
              </span>
            </div>

            <div className="p-1.5 sm:p-2 rounded-lg bg-slate-50/70 border border-slate-100">
              <span className="text-[9px] font-mono text-slate-400 block mb-0.5 truncate">Core Vitals</span>
              <span className={`font-mono font-black text-xs sm:text-base ${
                activeSpeedStack === 'webiox' ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {activeSpeedStack === 'webiox' ? '99 / 100' : '48 / 100'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────────────────────────
      MODULE 02: MILESTONE LOCK PROTOCOL
     ────────────────────────────────────────────────────────────────── */
  const renderModule02 = (isMobile?: boolean) => (
    <div className={`w-full h-full rounded-3xl bg-white border border-slate-200/90 ${isMobile ? 'p-5' : 'p-6 sm:p-8'} relative overflow-hidden transition-all duration-500 shadow-[0_20px_50px_-15px_rgba(26,112,151,0.12)] hover:shadow-[0_30px_70px_-12px_rgba(26,112,151,0.24)] flex flex-col justify-between`}>
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E7B900]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-3 left-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
      <div className="absolute top-3 right-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
      <div className="absolute bottom-3 right-3 text-slate-300 font-mono text-[9px] select-none pointer-events-none">SLA_PROTOCOL // ZERO_DRIFT</div>

      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-[10.5px] font-mono text-amber-700 font-bold">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>02 // MILESTONE LOCK PROTOCOL</span>
          </div>

          <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
            100% SLA LOCK
          </span>
        </div>

        <div className="mb-5">
          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl lg:text-3xl text-[#0F172A] tracking-tight mb-1.5">
            Sprint Milestone Vault.
          </h3>
          <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
            Traditional agencies drag projects for months with hourly billing. Webiox locks delivery into verified 14-day sprint gates: payments unlock strictly after staging QA sign-off.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200/90 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3 text-xs font-mono">
          <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            Interactive Sprint Gates
          </span>
          <span className="text-amber-700 font-bold text-[10.5px]">
            0% Scope Drift
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {SPRINT_GATES.map((gate, idx) => (
            <button
              key={gate.id}
              type="button"
              onClick={() => setSelectedGate(idx)}
              className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer border ${
                selectedGate === idx
                  ? 'bg-white border-[#1a7097] text-[#0F172A] shadow-xs ring-1 ring-[#1a7097]/30'
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
                {SPRINT_GATES[selectedGate].name}
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                {SPRINT_GATES[selectedGate].duration}
              </span>
            </div>

            <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
              selectedGate === 2
                ? 'bg-[#1a7097]/10 text-[#1a7097] border border-[#1a7097]/20'
                : selectedGate < 2
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {SPRINT_GATES[selectedGate].status}
            </span>
          </div>

          <div className="space-y-1.5 my-2.5">
            {SPRINT_GATES[selectedGate].deliverables.map((item, dIdx) => (
              <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-600">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11.5px]">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-400">{SPRINT_GATES[selectedGate].verification}</span>
            <span className="text-[#1a7097] font-bold">QA Gate Verified ✓</span>
          </div>
        </div>
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────────────────────────
      MODULE 03: DEFENSIVE SECURITY CORE
     ────────────────────────────────────────────────────────────────── */
  const renderModule03 = (isMobile?: boolean) => (
    <div className={`w-full h-full rounded-3xl bg-white border border-slate-200/90 ${isMobile ? 'p-5' : 'p-6 sm:p-8'} relative overflow-hidden transition-all duration-500 shadow-[0_20px_50px_-15px_rgba(26,112,151,0.12)] hover:shadow-[0_30px_70px_-12px_rgba(26,112,151,0.24)] flex flex-col justify-between`}>
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-3 left-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
      <div className="absolute top-3 right-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
      <div className="absolute bottom-3 right-3 text-slate-300 font-mono text-[9px] select-none pointer-events-none">DEFENSE_CORE // SOC_2_READY</div>

      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10.5px] font-mono text-emerald-700 font-bold">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>03 // DEFENSIVE SECURITY CORE</span>
          </div>

          <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
            0 CVE VULNERABILITIES
          </span>
        </div>

        <div className="mb-5">
          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl lg:text-3xl text-[#0F172A] tracking-tight mb-1.5">
            Hardened Zero-Trust.
          </h3>
          <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
            Generic agencies install dozens of vulnerable plugins that invite exploits. We build custom hardened TypeScript architectures with cryptographic authentication and automated CI/CD audits.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200/90 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3 text-xs font-mono">
          <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            4-Layer Defense Perimeter
          </span>
          <button
            type="button"
            onClick={triggerThreatSimulation}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] font-mono font-bold transition-all cursor-pointer ${
              threatSimulating
                ? 'bg-amber-500 text-white animate-pulse'
                : threatMitigated
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-slate-200 text-[#1a7097] hover:bg-slate-50 shadow-2xs'
            }`}
          >
            <ShieldAlert className="w-3 h-3" />
            <span>
              {threatSimulating
                ? 'Simulating Attack...'
                : threatMitigated
                ? 'Threat Mitigated in 3.4ms ✓'
                : 'Simulate Threat Scan'}
            </span>
          </button>
        </div>

        <div className="space-y-2">
          {[
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
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border transition-all duration-300 flex items-start gap-2.5 ${
                threatSimulating
                  ? 'bg-amber-50/70 border-amber-200'
                  : threatMitigated
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : 'bg-white border-slate-200/80 shadow-2xs'
              }`}
            >
              <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#0F172A]">
                    {item.title}
                  </span>
                  <span className="font-mono text-[9.5px] font-bold text-emerald-700">
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

  /* ──────────────────────────────────────────────────────────────────
      MODULE 04: AGILITY & DIRECT COLLABORATION
     ────────────────────────────────────────────────────────────────── */
  const renderModule04 = (isMobile?: boolean) => (
    <div className={`w-full h-full rounded-3xl bg-white border border-slate-200/90 ${isMobile ? 'p-5' : 'p-6 sm:p-8'} relative overflow-hidden transition-all duration-500 shadow-[0_20px_50px_-15px_rgba(26,112,151,0.12)] hover:shadow-[0_30px_70px_-12px_rgba(26,112,151,0.24)] flex flex-col justify-between`}>
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#1a7097]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-3 left-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
      <div className="absolute top-3 right-3 text-slate-300 font-mono text-[10px] select-none pointer-events-none">+</div>
      <div className="absolute bottom-3 right-3 text-slate-300 font-mono text-[9px] select-none pointer-events-none">SQUAD_UPLINK // SURAT_DIRECT</div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a7097]/10 border border-[#1a7097]/20 text-[10.5px] font-mono text-[#1a7097] font-bold">
            <MessageSquare className="w-3.5 h-3.5 text-[#1a7097]" />
            <span>04 // AGILITY & DIRECT COLLABORATION</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1a7097]/10 border border-[#1a7097]/20 text-[10.5px] font-mono font-bold text-[#1a7097]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a7097] animate-pulse" />
            <span>12M AVG ARCHITECT REPLY</span>
          </div>
        </div>

        <div className="mb-5">
          <div className="flex items-baseline gap-3 mb-1.5">
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl lg:text-3xl text-[#0F172A] tracking-tight">
              Direct Senior Engineers.
            </h3>
            <span className="font-mono text-xs font-bold text-slate-400">
              Zero Middlemen
            </span>
          </div>
          <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed max-w-xl">
            No non-technical account managers playing telephone. You get a direct, dedicated engineering war-room on Slack or WhatsApp with the senior architects writing and shipping your code.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200/90 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-[#1a7097] text-white flex items-center justify-center font-bold text-[9px] ring-2 ring-white">
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
                  ? 'bg-[#1a7097] text-white shadow-xs'
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
                <div className="w-8 h-8 rounded-xl bg-[#1a7097] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-2xs">
                  MV
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#0F172A]">
                        Manthan Vaghasiya (Lead Architect)
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#1a7097]/10 text-[#1a7097] text-[9.5px] font-mono font-bold">
                        Slack Direct
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">10:42 AM</span>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed">
                    "Sprint 03 staging build is live. Redis edge cache index is verified at 38ms TTFB with zero dropped frames. Check your staging preview link—ready for your review!"
                  </p>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-[10.5px] font-mono text-slate-500">
                <div className="flex items-center gap-2 truncate">
                  <Code2 className="w-3.5 h-3.5 text-[#1a7097] shrink-0" />
                  <span className="text-slate-700 font-bold">commit 9d42f8c:</span>
                  <span className="truncate">feat(cache): Edge ISR warmed across global edge nodes</span>
                </div>
                <span className="text-emerald-600 font-bold shrink-0 ml-2">PASS 100%</span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-mono text-[10px] text-slate-400">
                  Average response: &lt; 12 mins • Direct Private Slack
                </span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#1a7097] hover:text-[#145b7c] transition-colors cursor-pointer"
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
                  rel="noopener noreferrer"
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
    </div>
  );

  return (
    <section
      id="why-choose-us"
      className="relative bg-[#FCFCFD] text-[#0F172A] py-20 sm:py-28 lg:py-32 overflow-hidden selection:bg-[#1a7097] selection:text-white"
    >
      {/* ── Ambient Background Lighting (Curtain Glows & Micro-Grid) ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(26, 112, 151, 0.08) 0%, transparent 65%),
            radial-gradient(circle at 85% 60%, rgba(231, 185, 0, 0.05) 0%, transparent 50%),
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
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#1a7097]/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-[#E7B900]/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-[11px] font-mono font-bold text-[#1a7097] mb-3 sm:mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E7B900]" />
            <span className="tracking-wider uppercase">THE WEBIOX ADVANTAGE</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">PROPRIETARY DELIVERY MODEL</span>
          </div>

          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-[-0.03em] leading-[1.15] mb-3 sm:mb-4 [text-wrap:balance]">
            <span>Why Ambitious Enterprises </span>
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#1a7097] via-[#0284c7] to-[#38bdf8] bg-clip-text text-transparent">
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
                    ? 'bg-white text-[#0F172A] shadow-xs border border-slate-200/80'
                    : 'text-slate-500 hover:text-[#0F172A]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Direct Contrast View</span>
                {mode === 'contrast' && (
                  <span className="ml-1 text-[9.5px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-[#1a7097] text-white">
                    Live
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMode('webiox')}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  mode === 'webiox'
                    ? 'bg-white text-[#0F172A] shadow-xs border border-slate-200/80'
                    : 'text-slate-500 hover:text-[#0F172A]'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>The Webiox Standard</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('traditional')}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  mode === 'traditional'
                    ? 'bg-white text-[#0F172A] shadow-xs border border-slate-200/80'
                    : 'text-slate-500 hover:text-[#0F172A]'
                }`}
              >
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                <span>Traditional Agency Way</span>
              </button>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            MOBILE: EXECUTIVE CONTROL DECK (< 520px COMPACT AGENCY EXPERIENCE)
            Segmented 4-Pillar Control with Smooth Fluid Transitions
           ════════════════════════════════════════════════════════════════════ */}
        <div className="block lg:hidden mb-8">
          {/* Segmented Pillar Navigator Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-slate-100/90 border border-slate-200/90 mb-4 shadow-2xs">
            {PILLARS.map((p, idx) => {
              const Icon = p.icon;
              const isActive = mobilePillar === idx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setMobilePillar(idx)}
                  className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    isActive
                      ? 'bg-white text-[#1a7097] shadow-xs border border-slate-200/80 font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#1a7097]' : 'text-slate-400'}`} />
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
                key={`mobile-pillar-${mobilePillar}`}
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

          {/* Mobile Pillar Navigation Bar */}
          <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-200/70">
            <button
              type="button"
              onClick={() => setMobilePillar((prev) => Math.max(0, prev - 1))}
              disabled={mobilePillar === 0}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-all flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            {/* 4 dots with active pill */}
            <div className="flex items-center gap-1.5">
              {PILLARS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMobilePillar(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    mobilePillar === idx ? 'w-6 bg-[#1a7097]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to pillar 0${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMobilePillar((prev) => Math.min(PILLARS.length - 1, prev + 1))}
              disabled={mobilePillar === PILLARS.length - 1}
              className="px-3 py-1.5 rounded-xl bg-[#1a7097] text-white text-xs font-mono font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#145b7c] transition-all flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            DESKTOP: THE ARCHITECTURAL ENGINEERING CONSOLE (12-COL GRID)
           ════════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid grid-cols-12 gap-7">
          <div className="lg:col-span-7">{renderModule01(false)}</div>
          <div className="lg:col-span-5">{renderModule02(false)}</div>
          <div className="lg:col-span-5">{renderModule03(false)}</div>
          <div className="lg:col-span-7">{renderModule04(false)}</div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            BOTTOM TRUST GUARANTEE & ARCHITECTURAL DISCOVERY CTA
           ════════════════════════════════════════════════════════════════════ */}
        <div className="mt-12 sm:mt-14 rounded-3xl bg-gradient-to-r from-slate-50 via-white to-slate-50 border border-slate-200/90 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_15px_35px_-10px_rgba(26,112,151,0.1)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E7B900]/15 border border-[#E7B900]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#E7B900]" />
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
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1a7097] hover:bg-[#145b7c] text-white text-xs sm:text-sm font-['Plus_Jakarta_Sans',sans-serif] font-bold shadow-lg shadow-[#1a7097]/20 hover:shadow-xl hover:shadow-[#1a7097]/30 transition-all shrink-0 cursor-pointer group"
          >
            <span>Claim Your Webiox Advantage</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
