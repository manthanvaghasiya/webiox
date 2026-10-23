'use client';

import React from 'react';
import {
  Code2,
  Cpu,
  Layers,
  Zap,
  Globe,
  Database,
  Terminal,
  Server,
  Smartphone,
  Sparkles,
  GitBranch,
} from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  spec: string;
}

const TECH_ECOSYSTEM: TechItem[] = [
  { name: 'React.js', category: 'Frontend Engine', icon: Layers, spec: 'Component Architecture • UI' },
  { name: 'Next.js 16', category: 'Fullstack Framework', icon: Zap, spec: 'App Router • Turbopack • SSR' },
  { name: 'Node.js', category: 'Backend Runtime', icon: Server, spec: 'High-Concurrency Event Loop' },
  { name: 'Express.js', category: 'API Architecture', icon: Terminal, spec: 'RESTful Microservices' },
  { name: 'Flutter', category: 'Mobile Framework', icon: Smartphone, spec: 'Fluid 60 FPS iOS & Android' },
  { name: 'React Native', category: 'Mobile Ecosystem', icon: Smartphone, spec: 'Cross-Platform Native Apps' },
  { name: 'TypeScript', category: 'Type System', icon: Code2, spec: 'Strict Type Soundness' },
  { name: 'MongoDB', category: 'Document Database', icon: Database, spec: 'NoSQL Aggregation Pipelines' },
  { name: 'PostgreSQL', category: 'Relational Database', icon: Database, spec: 'ACID Relational Partitioning' },
  { name: 'Tailwind CSS', category: 'Modern Styling', icon: Sparkles, spec: 'Design Tokens & Fluid UI' },
  { name: 'Python & AI', category: 'AI Automation', icon: Cpu, spec: 'Autonomous Agent Pipelines' },
  { name: 'Docker & AWS', category: 'Cloud Infrastructure', icon: Globe, spec: 'Containerized Edge Deployment' },
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
                className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#377a9b]/50 hover:shadow-sm transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-[#377a9b]/10 text-slate-700 group-hover:text-[#377a9b] flex items-center justify-center shrink-0 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-[13px] text-[#0F172A] leading-tight">
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
