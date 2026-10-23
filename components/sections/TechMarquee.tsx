'use client';

import React from 'react';
import {
  Code2,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  Terminal,
  Activity,
  Server,
  Lock,
  GitBranch,
} from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  spec: string;
}

const TECH_ECOSYSTEM: TechItem[] = [
  { name: 'Next.js 16', category: 'Frontend Engine', icon: Zap, spec: 'App Router • Turbopack' },
  { name: 'React 19', category: 'UI Runtime', icon: Layers, spec: 'Server Components & Actions' },
  { name: 'TypeScript', category: 'Language', icon: Code2, spec: 'Strict Type Soundness' },
  { name: 'PostgreSQL', category: 'Primary Database', icon: Database, spec: 'ACID Relational Partitioning' },
  { name: 'Cloudflare WAF', category: 'Edge Security', icon: ShieldCheck, spec: '300+ Edge Nodes • DDoS L7' },
  { name: 'Redis Edge', category: 'Distributed Cache', icon: Activity, spec: 'Sub-30ms TTFB Invalidation' },
  { name: 'Prisma ORM', category: 'Data Layer', icon: Database, spec: 'Type-Safe Migrations' },
  { name: 'Docker', category: 'Containerization', icon: Server, spec: 'Stateless Microservices' },
  { name: 'AWS Cloud', category: 'Infrastructure', icon: Globe, spec: 'ECS, RDS, S3 Multi-AZ' },
  { name: 'Python LangChain', category: 'AI Orchestration', icon: Cpu, spec: 'Autonomous Agent Pipelines' },
  { name: 'OWASP Verified', category: 'Security Standard', icon: Lock, spec: 'Zero Known CVE Surface' },
  { name: 'CI/CD Pipelines', category: 'Automated Release', icon: GitBranch, spec: 'Automated PR Staging & QA' },
];

export default function TechMarquee() {
  return (
    <section className="relative w-full py-7 sm:py-8 bg-[#FCFCFD] border-y border-slate-200/80 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3.5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-500 font-semibold tracking-wider uppercase text-[10.5px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#377a9b] animate-ping" />
          <span>PRODUCTION-GRADE ARCHITECTURAL ECOSYSTEM</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10.5px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/80">
          <span className="font-bold">VERIFIED 2026 STANDARDS</span>
        </div>
      </div>

      {/* Infinite Scrolling Marquee Track */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FCFCFD] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FCFCFD] to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-3 sm:gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...TECH_ECOSYSTEM, ...TECH_ECOSYSTEM].map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={`${tech.name}-${idx}`}
                className="group inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#377a9b]/50 hover:shadow-sm transition-all duration-300"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-[#377a9b]/10 text-slate-600 group-hover:text-[#377a9b] flex items-center justify-center shrink-0 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#0F172A] leading-tight">
                    {tech.name}
                  </div>
                  <div className="font-mono text-[9px] sm:text-[9.5px] text-slate-500 font-medium">
                    {tech.spec}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
