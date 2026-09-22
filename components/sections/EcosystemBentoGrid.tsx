'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  TrendingUp,
  Activity,
  Lock,
  Maximize2,
  ShieldCheck,
  Star,
  Cpu,
  Terminal,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ChevronLeft,
  ChevronDown,
  Bell,
  Plus,
} from 'lucide-react';

interface SatelliteCard {
  id: string;
  title: string;
  value: string;
  sub: string;
  iconType: 'activity' | 'zap' | 'star' | 'shield' | 'check' | 'terminal' | 'cpu' | 'trending';
  widgetType:
  | 'gauge'
  | 'stars'
  | 'sparkline'
  | 'gold_badge'
  | 'bars'
  | 'circle_ring'
  | 'latency'
  | 'router'
  | 'uptime'
  | 'fps'
  | 'clusters'
  | 'radar'
  | 'audit'
  | 'tech_stack'
  | 'soc2'
  | 'terminal'
  | 'trend_circle'
  | 'budget_donut'
  | 'cash_flow'
  | 'amount_saved'
  | 'ai_circle'
  | 'ai_donut'
  | 'ai_metrics'
  | 'ai_stat';
  positionClass: string;
  animation: {
    initial: { opacity: number; x: number; y: number; scale: number; rotate: number };
    restRotate: number;
    spring: { stiffness: number; damping: number; delay: number };
    float: { y: number[]; duration: number; delay?: number };
  };
}

interface DeliverableItem {
  title: string;
  desc: string;
}

interface ServiceSlide {
  id: string;
  index: string;
  badge: string;
  tabLabel: string;
  tagline: string;
  title: string;
  titlePrimary: string;
  titleAccent: string;
  description: string;
  accentColor: string;
  secondaryColor: string;
  deviceType: 'browser' | 'mobile';
  mockupImage: string;
  mockupUrl: string;
  deliverables: DeliverableItem[];
  techStack: string[];
  metricHighlight: {
    value: string;
    label: string;
    sub: string;
  };
  cards: SatelliteCard[];
}

const SERVICES_DATA: ServiceSlide[] = [
  {
    id: 'web',
    index: '01',
    badge: 'WEB DEVELOPMENT',
    tabLabel: '01 WEB Development',
    title: 'High-Performance Web Development',
    titlePrimary: 'High-Performance',
    titleAccent: 'Web Development',
    tagline: 'Sub-Second Latency • 99+ Core Web Vitals • Modern Tech Stack',
    description:
      'Ultra-fast Next.js & React architectures with sub-second page loads, responsive design, and 99+ Core Web Vitals engineered to scale your digital presence.',
    accentColor: '#1a7097',
    secondaryColor: '#38bdf8',
    deviceType: 'browser',
    mockupImage: '/showcase/web_screen.png',
    mockupUrl: 'solutionshub.agency/platform',
    deliverables: [
      {
        title: 'Next.js 15 & React 19 Architecture',
        desc: 'Server-side rendering, dynamic edge caching, and sub-0.5s initial page loads.',
      },
      {
        title: 'Conversion & SEO Engineering',
        desc: 'Optimized conversion funnels, structured schema, and 99+ Core Web Vitals.',
      },
      {
        title: 'Headless CMS & Custom APIs',
        desc: 'Tailor-made editorial workflows with Sanity, Strapi, or Shopify Plus.',
      },
    ],
    techStack: ['Next.js 15', 'React 19', 'TypeScript', 'TailwindCSS', 'Vercel Edge'],
    metricHighlight: {
      value: '3.2x',
      label: 'Speed Multiplier',
      sub: 'vs. legacy websites',
    },
    // 3 Unique Cards for Web Development (Asymmetrical E-Commerce & Web Layout)
    cards: [
      {
        id: 'web-c1',
        title: 'Conversion Rate',
        value: '3.40%',
        sub: '+14% MoM Growth',
        iconType: 'activity',
        widgetType: 'gauge',
        positionClass: '-top-3 sm:-top-1 left-0 sm:left-2 md:left-4 w-48 sm:w-56',
        animation: {
          initial: { opacity: 0, x: 180, y: 70, scale: 0.25, rotate: 22 },
          restRotate: -3.5,
          spring: { stiffness: 260, damping: 18, delay: 0.1 },
          float: { y: [0, -7, 0], duration: 4.4 },
        },
      },
      {
        id: 'web-c2',
        title: 'Median LCP Speed',
        value: '0.38s',
        sub: 'Global 100% Edge CDN',
        iconType: 'zap',
        widgetType: 'bars',
        positionClass: 'bottom-1 sm:bottom-3 left-0 sm:left-2 md:left-4 w-46 sm:w-54',
        animation: {
          initial: { opacity: 0, x: 140, y: -80, scale: 0.25, rotate: -16 },
          restRotate: 2.5,
          spring: { stiffness: 240, damping: 19, delay: 0.18 },
          float: { y: [0, 6, 0], duration: 5.0, delay: 0.3 },
        },
      },
      {
        id: 'web-c3',
        title: 'Lighthouse Scorecard',
        value: '4 × 100',
        sub: 'Perf • A11y • Best • SEO',
        iconType: 'check',
        widgetType: 'audit',
        positionClass: 'top-6 sm:top-10 right-0 sm:right-2 md:right-4 w-50 sm:w-60',
        animation: {
          initial: { opacity: 0, x: -190, y: 40, scale: 0.25, rotate: -20 },
          restRotate: -2,
          spring: { stiffness: 250, damping: 19, delay: 0.26 },
          float: { y: [0, -6, 0], duration: 4.0, delay: 0.5 },
        },
      },
    ],
  },
  {
    id: 'app',
    index: '02',
    badge: 'MOBILE APPS',
    tabLabel: '02 MOBILE APPS',
    title: 'Native iOS & Android Mobile Apps',
    titlePrimary: 'Native iOS & Android',
    titleAccent: 'Mobile Apps',
    tagline: 'Fluid 60 FPS • Offline-First Sync • Biometric Security',
    description:
      'Bespoke native Swift, Kotlin, and React Native mobile applications built with buttery-smooth 60 FPS interactions, offline-first sync, and bank-grade biometric security.',
    accentColor: '#1a7097',
    secondaryColor: '#0ea5e9',
    deviceType: 'mobile',
    mockupImage: '/showcase/mobile_app.png',
    mockupUrl: 'webiox.app/projects',
    deliverables: [
      {
        title: 'Native Swift & Kotlin Precision',
        desc: 'Pixel-perfect iOS & Android apps tuned for silky-smooth 60 FPS performance.',
      },
      {
        title: 'Offline-First Realtime Data Sync',
        desc: 'Local SQLite caching with automated conflict resolution & background sync.',
      },
      {
        title: 'Biometric Security & Push Engine',
        desc: 'Bank-grade FaceID/TouchID auth and automated customer notification workflows.',
      },
    ],
    techStack: ['Swift', 'Kotlin', 'React Native', 'GraphQL', 'Firebase'],
    metricHighlight: {
      value: '60 FPS',
      label: 'Fluid Framerate',
      sub: 'zero micro-stutters',
    },
    // 4 Unique Cards for Mobile Apps (Faithfully modeled after reference design)
    cards: [
      {
        id: 'app-c1',
        title: 'Trend Indicator',
        value: '',
        sub: '',
        iconType: 'trending',
        widgetType: 'trend_circle',
        positionClass: 'top-4 sm:top-6 left-3 sm:left-6 md:left-8',
        animation: {
          initial: { opacity: 0, x: 100, y: 80, scale: 0.2, rotate: -20 },
          restRotate: 0,
          spring: { stiffness: 270, damping: 17, delay: 0.1 },
          float: { y: [0, -6, 0], duration: 3.8 },
        },
      },
      {
        id: 'app-c2',
        title: 'Budget Scores',
        value: '52.1%',
        sub: 'This Month',
        iconType: 'activity',
        widgetType: 'budget_donut',
        positionClass: 'top-24 sm:top-28 left-0 sm:left-2 md:left-4 w-56 sm:w-64',
        animation: {
          initial: { opacity: 0, x: 140, y: 10, scale: 0.25, rotate: 12 },
          restRotate: 0,
          spring: { stiffness: 240, damping: 18, delay: 0.18 },
          float: { y: [0, 7, 0], duration: 4.6, delay: 0.2 },
        },
      },
      {
        id: 'app-c3',
        title: 'Cash Flow',
        value: '$965',
        sub: '$950',
        iconType: 'zap',
        widgetType: 'cash_flow',
        positionClass: 'top-6 sm:top-8 right-0 sm:right-2 md:right-4 w-52 sm:w-60',
        animation: {
          initial: { opacity: 0, x: -130, y: 60, scale: 0.25, rotate: -15 },
          restRotate: 0,
          spring: { stiffness: 260, damping: 18, delay: 0.24 },
          float: { y: [0, -7, 0], duration: 3.6, delay: 0.4 },
        },
      },
      {
        id: 'app-c4',
        title: 'Amount Saved',
        value: '$734.50',
        sub: '+4.2%',
        iconType: 'trending',
        widgetType: 'amount_saved',
        positionClass: 'bottom-10 sm:bottom-14 right-0 sm:right-2 md:right-4 w-46 sm:w-52',
        animation: {
          initial: { opacity: 0, x: -140, y: -60, scale: 0.25, rotate: 14 },
          restRotate: 0,
          spring: { stiffness: 240, damping: 19, delay: 0.32 },
          float: { y: [0, 6, 0], duration: 5.2, delay: 0.6 },
        },
      },
    ],
  },
  {
    id: 'saas',
    index: '03',
    badge: 'SOFTWARE DEVELOPMENT',
    tabLabel: '03 Software Development',
    title: 'Custom Software & Enterprise Architecture',
    titlePrimary: 'Custom Software &',
    titleAccent: 'Enterprise Systems',
    tagline: 'Kubernetes Scalability • Microservices • SOC-2 Ready',
    description:
      'Mission-critical custom software, distributed microservices, and automated Kubernetes cloud platforms with automated failover, ACID compliance, and SOC-2 security.',
    accentColor: '#1a7097',
    secondaryColor: '#6366f1',
    deviceType: 'browser',
    mockupImage: '/showcase/saas_cloud.jpg',
    mockupUrl: 'webiox.tech/cloud-monitoring',
    deliverables: [
      {
        title: 'Distributed Microservices & APIs',
        desc: 'High-throughput Go & Node backends engineered with ACID compliance.',
      },
      {
        title: 'Kubernetes Cloud Orchestration',
        desc: 'Auto-scaling clusters, Redis edge caching, and automated zero-downtime CI/CD.',
      },
      {
        title: 'SOC-2 & Enterprise Compliance',
        desc: 'Role-based access control, cryptographic audit trails, and data isolation.',
      },
    ],
    techStack: ['Go', 'Node.js', 'Docker', 'Kubernetes', 'PostgreSQL'],
    metricHighlight: {
      value: '99.99%',
      label: 'Guaranteed SLA',
      sub: 'enterprise-grade uptime',
    },
    // 3 Unique Cards for Software Development (Wide Distributed Cloud Layout)
    cards: [
      {
        id: 'saas-c1',
        title: 'Kubernetes Clusters',
        value: '14 Active',
        sub: '38 Nodes Healthy',
        iconType: 'activity',
        widgetType: 'sparkline',
        positionClass: '-top-2 sm:top-0 right-0 sm:right-2 md:right-4 w-50 sm:w-60',
        animation: {
          initial: { opacity: 0, x: -190, y: 60, scale: 0.25, rotate: 18 },
          restRotate: 3,
          spring: { stiffness: 250, damping: 18, delay: 0.12 },
          float: { y: [0, -6, 0], duration: 4.2 },
        },
      },
      {
        id: 'saas-c2',
        title: 'API Latency Telemetry',
        value: '28ms Avg',
        sub: 'Redis Edge Tier',
        iconType: 'zap',
        widgetType: 'latency',
        positionClass: 'bottom-2 sm:bottom-4 right-0 sm:right-2 md:right-4 w-48 sm:w-56',
        animation: {
          initial: { opacity: 0, x: -160, y: -90, scale: 0.25, rotate: -22 },
          restRotate: -3.5,
          spring: { stiffness: 230, damping: 19, delay: 0.22 },
          float: { y: [0, 8, 0], duration: 5.0, delay: 0.3 },
        },
      },
      {
        id: 'saas-c3',
        title: 'System Availability',
        value: '99.98%',
        sub: '3 Regions • SOC-2 Ready',
        iconType: 'shield',
        widgetType: 'clusters',
        positionClass: 'top-10 sm:top-14 left-0 sm:left-2 md:left-4 w-52 sm:w-62',
        animation: {
          initial: { opacity: 0, x: 210, y: -10, scale: 0.25, rotate: -14 },
          restRotate: -2,
          spring: { stiffness: 260, damping: 18, delay: 0.3 },
          float: { y: [0, -7, 0], duration: 4.5, delay: 0.5 },
        },
      },
    ],
  },
  {
    id: 'ai',
    index: '04',
    badge: 'AI AUTOMATION',
    tabLabel: '04 AI AUTOMATION',
    title: 'Autonomous AI Agents & Intelligent Workflows',
    titlePrimary: 'Autonomous AI Agents &',
    titleAccent: 'Intelligent Workflows',
    tagline: 'Multi-Model Squads • Zero Manual Ops • Self-Healing',
    description:
      'Custom LLM orchestration squads, autonomous RPA bots, and intelligent document processing pipelines that eliminate manual operational overhead with guaranteed precision.',
    accentColor: '#E7B900',
    secondaryColor: '#f59e0b',
    deviceType: 'browser',
    mockupImage: '/showcase/ai_agent.jpg',
    mockupUrl: 'webiox.tech/orchestrator-canvas',
    deliverables: [
      {
        title: 'Autonomous Multi-Agent Squads',
        desc: 'Coordinated LLM agent teams that execute end-to-end multi-step tasks.',
      },
      {
        title: 'Enterprise RAG & Self-Correction',
        desc: 'High-precision semantic retrieval with automated fact-checking guardrails.',
      },
      {
        title: 'Workflow & System Orchestration',
        desc: 'Native integrations into CRMs, ERPs, databases, email, and Slack.',
      },
    ],
    techStack: ['Gemini', 'GPT-4o', 'LangChain', 'Python', 'Vector DB'],
    metricHighlight: {
      value: '85%',
      label: 'Cost Reduction',
      sub: 'in routine manual hours',
    },
    // 4 Unique Cards for AI Automation (Styled with the clean, beloved Mobile App aesthetic)
    cards: [
      {
        id: 'ai-c1',
        title: 'AI Pulse Indicator',
        value: '',
        sub: '',
        iconType: 'trending',
        widgetType: 'ai_circle',
        positionClass: 'top-4 sm:top-6 left-3 sm:left-6 md:left-8',
        animation: {
          initial: { opacity: 0, x: 100, y: 80, scale: 0.2, rotate: -20 },
          restRotate: 0,
          spring: { stiffness: 270, damping: 17, delay: 0.1 },
          float: { y: [0, -6, 0], duration: 3.8 },
        },
      },
      {
        id: 'ai-c2',
        title: 'AI Workload',
        value: '48.2%',
        sub: 'This Month',
        iconType: 'activity',
        widgetType: 'ai_donut',
        positionClass: 'top-24 sm:top-28 left-0 sm:left-2 md:left-4 w-56 sm:w-64',
        animation: {
          initial: { opacity: 0, x: 140, y: 10, scale: 0.25, rotate: 12 },
          restRotate: 0,
          spring: { stiffness: 240, damping: 18, delay: 0.18 },
          float: { y: [0, 7, 0], duration: 4.6, delay: 0.2 },
        },
      },
      {
        id: 'ai-c3',
        title: 'Impact Metrics',
        value: '1,850h',
        sub: '85%',
        iconType: 'zap',
        widgetType: 'ai_metrics',
        positionClass: 'top-6 sm:top-8 right-0 sm:right-2 md:right-4 w-52 sm:w-60',
        animation: {
          initial: { opacity: 0, x: -130, y: 60, scale: 0.25, rotate: -15 },
          restRotate: 0,
          spring: { stiffness: 260, damping: 18, delay: 0.24 },
          float: { y: [0, -7, 0], duration: 3.6, delay: 0.4 },
        },
      },
      {
        id: 'ai-c4',
        title: 'Decisions Dispatched',
        value: '840k/mo',
        sub: '+28.4%',
        iconType: 'trending',
        widgetType: 'ai_stat',
        positionClass: 'bottom-10 sm:bottom-14 right-0 sm:right-2 md:right-4 w-46 sm:w-54',
        animation: {
          initial: { opacity: 0, x: -140, y: -60, scale: 0.25, rotate: 14 },
          restRotate: 0,
          spring: { stiffness: 240, damping: 19, delay: 0.32 },
          float: { y: [0, 6, 0], duration: 5.2, delay: 0.6 },
        },
      },
    ],
  },
];

const CYCLE_DURATION = 6.5; // Comfortable, generous 6.5-second reading cycle

function MobileAppScreen() {
  return (
    <div className="w-full h-full bg-[#f8fafc] text-slate-800 flex flex-col justify-between pt-7 sm:pt-8 pb-2 px-3 sm:px-3.5 select-none font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
      {/* 1. iOS Status Bar */}
      <div className="flex items-center justify-between px-1 mb-1 text-slate-800 shrink-0">
        <span className="font-bold text-[10px] tracking-tight">9:41</span>
        <div className="flex items-center gap-1.5 text-slate-800">
          {/* Cellular Signal Bars */}
          <div className="flex items-end gap-[1.5px] h-2.5">
            <span className="w-[2.5px] h-[3px] bg-slate-800 rounded-2xs" />
            <span className="w-[2.5px] h-[5px] bg-slate-800 rounded-2xs" />
            <span className="w-[2.5px] h-[7px] bg-slate-800 rounded-2xs" />
            <span className="w-[2.5px] h-[9px] bg-slate-800 rounded-2xs" />
          </div>
          {/* Wi-Fi Icon */}
          <svg className="w-3 h-3 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 2.5c3.98 0 7.57 1.62 10.18 4.23L12 18.89 1.82 10.73C4.43 8.12 8.02 6.5 12 6.5z" />
          </svg>
          {/* Battery Icon */}
          <div className="flex items-center">
            <div className="w-5 h-2.5 rounded-[3px] border border-slate-800 p-[1px] flex items-center">
              <div className="w-full h-full bg-slate-800 rounded-2xs" />
            </div>
            <div className="w-[1px] h-1 bg-slate-800 rounded-r-xs ml-[0.5px]" />
          </div>
        </div>
      </div>

      {/* 2. In-App Navigation Bar */}
      <div className="flex items-center justify-between px-0.5 mb-1.5 shrink-0">
        <div className="w-6 h-6 rounded-full bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors">
          <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="font-bold text-[11px] sm:text-xs text-[#0F172A]">Translate</span>
          <ChevronDown className="w-2.5 h-2.5 text-slate-400 stroke-[2.5]" />
        </div>
        <div className="w-6 h-6 rounded-full bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center text-slate-700 relative cursor-pointer hover:bg-slate-50 transition-colors">
          <Bell className="w-3 h-3 text-slate-600" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#1a7097]" />
        </div>
      </div>

      {/* 3. Luxury Credit Card (Salary Card 10,000$, VISA, •••• 3042) */}
      <div className="relative rounded-2xl bg-gradient-to-tr from-[#1a7097] via-[#0284c7] to-[#38bdf8] p-3 text-white shadow-[0_14px_28px_-8px_rgba(26,112,151,0.45)] overflow-hidden mb-1 shrink-0">
        {/* Holographic Watermark / Ambient Arcs */}
        <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -right-2 -top-6 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-start justify-between relative z-10 mb-1.5">
          <div>
            <span className="block text-[8px] uppercase tracking-wider text-sky-100/90 font-medium">
              Salary card
            </span>
            <div className="font-extrabold text-[15px] sm:text-[16px] tracking-tight leading-tight">
              10,000$
            </div>
          </div>
          {/* Contactless waves SVG */}
          <div className="w-5 h-5 flex items-center justify-center text-white/90">
            <svg className="w-3.5 h-3.5 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            </svg>
          </div>
        </div>

        {/* EMV Gold Smart Chip */}
        <div className="relative z-10 w-6 h-4.5 rounded-xs bg-gradient-to-tr from-amber-300 via-amber-200 to-yellow-400 border border-amber-400/80 shadow-2xs mb-1.5 flex items-center justify-center">
          <div className="w-full h-[1px] bg-amber-600/30" />
          <div className="absolute w-[1px] h-full bg-amber-600/30" />
          <div className="absolute w-2 h-2 rounded-2xs border border-amber-600/40" />
        </div>

        {/* Card Footer: Number & VISA */}
        <div className="flex items-end justify-between relative z-10">
          <div className="font-mono text-[9px] tracking-widest text-sky-100 font-semibold">
            •••• 3042
          </div>
          <div className="font-black italic text-[11px] tracking-wider text-white">
            VISA
          </div>
        </div>
      </div>

      {/* 4. Card Carousel Indicator Dots */}
      <div className="flex items-center justify-center gap-1 mb-1.5 shrink-0">
        <span className="w-3.5 h-1 rounded-full bg-[#1a7097]" />
        <span className="w-1 h-1 rounded-full bg-slate-300" />
        <span className="w-1 h-1 rounded-full bg-slate-300" />
      </div>

      {/* 5. Total Spend Section ($850.00) with Smooth Spline Area Chart */}
      <div className="rounded-xl bg-white p-2.5 border border-slate-200/80 shadow-2xs mb-1.5 shrink-0">
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="font-extrabold text-[14px] sm:text-[15px] text-[#0F172A] leading-none">
              $850.00
            </div>
            <div className="text-[8px] sm:text-[8.5px] text-slate-400 font-medium mt-0.5">
              Total Spend This Week
            </div>
          </div>
          <div className="w-5 h-5 rounded-md bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-500">
            <Activity className="w-2.5 h-2.5 text-[#1a7097]" />
          </div>
        </div>

        {/* Spline Area Wave Chart */}
        <div className="relative w-full h-11 mt-1">
          <svg viewBox="0 0 200 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mobileSpendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a7097" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1a7097" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Area Fill */}
            <path
              d="M 0,42 Q 25,40 50,32 T 100,24 T 150,10 T 200,28 L 200,50 L 0,50 Z"
              fill="url(#mobileSpendGradient)"
            />
            {/* Smooth Stroke */}
            <path
              d="M 0,42 Q 25,40 50,32 T 100,24 T 150,10 T 200,28"
              fill="none"
              stroke="#1a7097"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Peak Highlight Circle */}
            <circle cx="150" cy="10" r="3" fill="#ffffff" stroke="#1a7097" strokeWidth="2" />
            <circle cx="150" cy="10" r="5" fill="#1a7097" fillOpacity="0.25" />
          </svg>
        </div>

        {/* Days of Week Axis */}
        <div className="flex items-center justify-between text-[7px] font-mono text-slate-400 mt-0.5 px-0.5">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span className="font-bold text-[#1a7097]">Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>

      {/* 6. Quick Action Row */}
      <div className="grid grid-cols-4 gap-1.5 mb-1.5 shrink-0">
        <div className="p-1 rounded-xl bg-white border border-slate-200/70 shadow-2xs flex flex-col items-center gap-0.5 cursor-pointer hover:border-[#1a7097]/40 transition-all">
          <div className="w-5 h-5 rounded-full bg-blue-50 text-[#1a7097] flex items-center justify-center">
            <ArrowUpRight className="w-2.5 h-2.5 stroke-[2.5]" />
          </div>
          <span className="text-[7.5px] font-semibold text-slate-600">Transfer</span>
        </div>
        <div className="p-1 rounded-xl bg-white border border-slate-200/70 shadow-2xs flex flex-col items-center gap-0.5 cursor-pointer hover:border-[#1a7097]/40 transition-all">
          <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Plus className="w-2.5 h-2.5 stroke-[2.5]" />
          </div>
          <span className="text-[7.5px] font-semibold text-slate-600">Top-up</span>
        </div>
        <div className="p-1 rounded-xl bg-white border border-slate-200/70 shadow-2xs flex flex-col items-center gap-0.5 cursor-pointer hover:border-[#1a7097]/40 transition-all">
          <div className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <Zap className="w-2.5 h-2.5 stroke-[2.5]" />
          </div>
          <span className="text-[7.5px] font-semibold text-slate-600">Pay</span>
        </div>
        <div className="p-1 rounded-xl bg-white border border-slate-200/70 shadow-2xs flex flex-col items-center gap-0.5 cursor-pointer hover:border-[#1a7097]/40 transition-all">
          <div className="w-5 h-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
            <Activity className="w-2.5 h-2.5 stroke-[2.5]" />
          </div>
          <span className="text-[7.5px] font-semibold text-slate-600">Insights</span>
        </div>
      </div>

      {/* 7. Recent Activity Preview */}
      <div className="rounded-xl bg-white p-2 border border-slate-200/70 shadow-2xs mb-0.5 shrink-0">
        <div className="flex items-center justify-between text-[8px] mb-1">
          <span className="font-bold text-[#0F172A]">Recent Activity</span>
          <span className="text-[7px] text-[#1a7097] font-semibold cursor-pointer">See all</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-4.5 h-4.5 rounded-md bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-[8px]">
              
            </div>
            <div>
              <div className="text-[7.5px] font-bold text-[#0F172A] leading-tight">Apple Store</div>
              <div className="text-[6.5px] text-slate-400">Electronics • Today</div>
            </div>
          </div>
          <span className="text-[7.5px] font-bold text-slate-900">-$129.00</span>
        </div>
      </div>

      {/* 8. iOS Home Indicator Bar */}
      <div className="w-20 h-1 bg-slate-300 rounded-full mx-auto shrink-0" />
    </div>
  );
}

export default function EcosystemBentoGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeService = SERVICES_DATA[activeIndex];

  // Seamless continuous auto-cycle through the 4 services with comfortable 6.5s duration (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SERVICES_DATA.length);
    }, CYCLE_DURATION * 1000);
    return () => clearInterval(interval);
  }, [isPaused, activeIndex]);

  return (
    <div
      className="w-full max-w-7xl mx-auto mt-0 sm:mt-1 mb-2 sm:mb-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Cinematic Visual Stage ── */}
      <div className="relative rounded-3xl bg-gradient-to-b from-white via-slate-50/70 to-sky-50/40 border border-slate-200/90 p-5 sm:p-7 md:p-8 lg:p-10 shadow-[0_25px_65px_-15px_rgba(15,23,42,0.07),inset_0_1px_2px_rgba(255,255,255,0.95)] overflow-hidden">

        {/* Soft Fluted Vertical Curtain Light Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                rgba(26, 112, 151, 0.04) 0px,
                rgba(26, 112, 151, 0.04) 1px,
                transparent 1px,
                transparent 48px
              )
            `,
          }}
        />

        {/* Dynamic Ambient Aura matched to current service */}
        <motion.div
          key={`aura-${activeService.id}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[380px] rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              activeService.id === 'ai'
                ? 'radial-gradient(circle, rgba(231,185,0,0.16) 0%, rgba(26,112,151,0.06) 60%, transparent 80%)'
                : 'radial-gradient(circle, rgba(26,112,151,0.15) 0%, rgba(56,189,248,0.08) 60%, transparent 80%)',
          }}
        />

        {/* Fixed Header: OUR CORE SERVICES // 4 Dedicated Engineering Squads */}
        <div className="relative z-20 mb-3 sm:mb-4 pb-2.5 border-b border-slate-200/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1a7097] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1a7097]" />
            </span>
            <span className="font-mono font-extrabold text-xs sm:text-[12.5px] uppercase tracking-[0.2em] bg-gradient-to-r from-[#1a7097] via-[#0284c7] to-[#1a7097] bg-clip-text text-transparent">
              OUR CORE SERVICES
            </span>
            <span className="text-slate-300 font-mono font-light text-sm">/</span>
            <span className="font-mono text-xs sm:text-[12px] text-[#0F172A] font-bold tracking-wide">
              4 Dedicated Engineering Squads
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[10.5px] font-mono text-emerald-700 font-bold bg-emerald-50/90 px-2.5 py-0.5 rounded-full border border-emerald-200/70 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Guaranteed Milestones</span>
          </div>
        </div>

        {/* ── Dynamic Content Showcase: Side-by-Side Split Layout with Horizontal Slide ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center"
          >
            {/* ── LEFT COLUMN: Editorial Service Info, Deliverables & Specs ── */}
            <div className="lg:col-span-5 flex flex-col items-start text-left pr-0 lg:pr-3">

              {/* Dynamic Service Pill (No Dot) */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/95 border border-slate-200/90 shadow-2xs text-[11px] font-mono font-bold text-[#1a7097] tracking-wider backdrop-blur-md mb-2.5 transition-all">
                SERVICE {activeService.index} // {activeService.badge}
              </div>

              {/* Headline */}
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl sm:text-3xl lg:text-[28px] xl:text-[32px] text-[#0F172A] tracking-[-0.03em] leading-[1.18] mb-2.5 selection:bg-[#1a7097] selection:text-white">
                <span>{activeService.titlePrimary} </span>
                <span style={{ color: activeService.accentColor }}>{activeService.titleAccent}</span>
              </h2>

              {/* Description */}
              <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-[13.5px] text-[#475569] font-normal leading-[1.6] mb-3.5 selection:bg-[#1a7097] selection:text-white">
                {activeService.description}
              </p>

              {/* Deliverables Checklist (Headings Only) */}
              <div className="w-full space-y-2 mb-3.5 pt-2 border-t border-slate-200/60">
                {activeService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-left">
                    <div className="w-4 h-4 rounded-full bg-[#1a7097]/10 text-[#1a7097] flex items-center justify-center shrink-0 border border-[#1a7097]/20">
                      <CheckCircle2 className="w-3 h-3 text-[#1a7097]" />
                    </div>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-[13px] text-[#0F172A] leading-tight">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Highlight Metric Card + Tech Stack Strip */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {/* Highlight Metric Pill */}
                <div className="p-2.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs flex items-center gap-2.5">
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg text-[#1a7097] leading-none shrink-0">
                    {activeService.metricHighlight.value}
                  </div>
                  <div className="text-left leading-tight">
                    <div className="text-[11px] font-bold text-[#0F172A]">{activeService.metricHighlight.label}</div>
                    <div className="text-[9.5px] text-slate-400 font-mono">{activeService.metricHighlight.sub}</div>
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-200/80 flex flex-wrap items-center gap-1">
                  {activeService.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200/70 text-[9.5px] font-mono font-medium text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-1 flex-wrap">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1a7097] hover:bg-[#145b7c] text-white text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <span>Start {activeService.badge.toLowerCase()} project</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-slate-600 hover:text-[#1a7097] transition-colors"
                >
                  <span>View capabilities →</span>
                </Link>
              </div>
            </div>

            {/* ── RIGHT COLUMN: The 3D Stage (Central Device + Orbiting Satellite Cards) ── */}
            <div className="lg:col-span-7 relative w-full min-h-[400px] sm:min-h-[490px] md:min-h-[530px] flex items-center justify-center pt-2 pb-4 overflow-hidden lg:overflow-visible">

              {/* ── DYNAMIC SATELLITE CARDS: RENDERED PER-SERVICE (DIFFERENT COUNTS & POSITIONS) ── */}
              {activeService.cards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={card.animation.initial}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: card.animation.restRotate }}
                  transition={{
                    type: 'spring',
                    stiffness: card.animation.spring.stiffness,
                    damping: card.animation.spring.damping,
                    delay: card.animation.spring.delay,
                  }}
                  className={`absolute z-20 ${card.positionClass} origin-center scale-[0.82] xs:scale-90 sm:scale-100`}
                >
                  <motion.div
                    animate={{ y: card.animation.float.y }}
                    transition={{
                      duration: card.animation.float.duration,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: card.animation.float.delay || 0,
                    }}
                  >
                    {/* 1. Trend Circle Badge (From Reference Design) */}
                    {card.widgetType === 'trend_circle' ? (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#1a7097] to-sky-400 p-0.5 shadow-[0_12px_28px_-4px_rgba(26,112,151,0.4)] flex items-center justify-center border-2 border-white">
                        <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-tr from-[#1a7097] to-sky-400">
                          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.5]" />
                        </div>
                      </div>
                    ) : card.widgetType === 'budget_donut' ? (
                      /* 2. Budget Scores Donut Widget (From Reference Design) */
                      <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_22px_50px_-10px_rgba(15,23,42,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] text-left hover:border-[#1a7097]/50 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[12px] sm:text-[13px] text-[#0F172A]">
                            Budget Scores
                          </span>
                          <span className="text-[10px] font-medium text-slate-400 flex items-center gap-0.5 cursor-pointer hover:text-slate-600">
                            This Month <span className="text-[8px]">▼</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* SVG Donut Chart with 4 precise slices */}
                          <div className="relative w-14 h-14 shrink-0">
                            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                              {/* Needs (52.1%) */}
                              <circle
                                cx="18"
                                cy="18"
                                r="14"
                                fill="transparent"
                                stroke="#1a7097"
                                strokeWidth="5"
                                strokeDasharray="52.1 47.9"
                                strokeDashoffset="0"
                              />
                              {/* Wants (22.8%) */}
                              <circle
                                cx="18"
                                cy="18"
                                r="14"
                                fill="transparent"
                                stroke="#10b981"
                                strokeWidth="5"
                                strokeDasharray="22.8 77.2"
                                strokeDashoffset="-52.1"
                              />
                              {/* Nice to have (13.9%) */}
                              <circle
                                cx="18"
                                cy="18"
                                r="14"
                                fill="transparent"
                                stroke="#38bdf8"
                                strokeWidth="5"
                                strokeDasharray="13.9 86.1"
                                strokeDashoffset="-74.9"
                              />
                              {/* Trade Sales (11.2%) */}
                              <circle
                                cx="18"
                                cy="18"
                                r="14"
                                fill="transparent"
                                stroke="#93c5fd"
                                strokeWidth="5"
                                strokeDasharray="11.2 88.8"
                                strokeDashoffset="-88.8"
                              />
                            </svg>
                          </div>

                          {/* Legend */}
                          <div className="grid grid-cols-1 gap-0.5 text-[9px] sm:text-[9.5px] font-medium text-slate-600 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1a7097]" />
                                Needs
                              </span>
                              <span className="font-bold text-[#0F172A]">52.1%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                                Wants
                              </span>
                              <span className="font-bold text-[#0F172A]">22.8%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                                Nice to have
                              </span>
                              <span className="font-bold text-[#0F172A]">13.9%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#93c5fd]" />
                                Trade Sales
                              </span>
                              <span className="font-bold text-[#0F172A]">11.2%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : card.widgetType === 'cash_flow' ? (
                      /* 3. Cash Flow: Amount Received & Amount Spent */
                      <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_22px_50px_-10px_rgba(15,23,42,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] text-left flex items-center justify-between gap-3 sm:gap-4 hover:border-[#1a7097]/50 transition-all">
                        <div>
                          <span className="block text-[10px] text-slate-400 font-medium mb-0.5">Amount Received</span>
                          <div className="flex items-center gap-1 text-[#0F172A] font-black text-sm sm:text-base">
                            <span className="text-emerald-500 font-bold">↑</span>
                            <span>$965</span>
                          </div>
                        </div>
                        <div className="w-[1px] h-8 bg-slate-200/80" />
                        <div>
                          <span className="block text-[10px] text-slate-400 font-medium mb-0.5">Amount Spent</span>
                          <div className="flex items-center gap-1 text-[#0F172A] font-black text-sm sm:text-base">
                            <span className="text-rose-500 font-bold">↓</span>
                            <span>$950</span>
                          </div>
                        </div>
                      </div>
                    ) : card.widgetType === 'amount_saved' ? (
                      /* 4. Amount Saved Widget (Mobile App Service) */
                      <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_22px_50px_-10px_rgba(15,23,42,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] text-left hover:border-[#1a7097]/50 transition-all">
                        <span className="block text-[10px] text-slate-400 font-medium mb-1">Amount Saved</span>
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg sm:text-xl text-[#0F172A]">
                            $734.50
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                            <span>+4.2%</span>
                            <TrendingUp className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    ) : card.widgetType === 'ai_circle' ? (
                      /* 1. AI Glowing Pulse Circle Badge (Mobile Style) */
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#E7B900] via-[#f59e0b] to-[#1a7097] p-0.5 shadow-[0_12px_28px_-4px_rgba(231,185,0,0.4)] flex items-center justify-center border-2 border-white">
                        <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-tr from-[#E7B900] via-[#f59e0b] to-[#1a7097]">
                          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.5]" />
                        </div>
                      </div>
                    ) : card.widgetType === 'ai_donut' ? (
                      /* 2. AI Workload Donut Widget (Mobile Style) */
                      <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_22px_50px_-10px_rgba(15,23,42,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] text-left hover:border-[#1a7097]/50 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[12px] sm:text-[13px] text-[#0F172A]">
                            AI Workload
                          </span>
                          <span className="text-[10px] font-medium text-slate-400 flex items-center gap-0.5 cursor-pointer hover:text-slate-600">
                            This Month <span className="text-[8px]">▼</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* SVG Donut Chart with 4 precise slices */}
                          <div className="relative w-14 h-14 shrink-0">
                            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                              {/* Reasoning (48.2%) */}
                              <circle
                                cx="18"
                                cy="18"
                                r="14"
                                fill="transparent"
                                stroke="#1a7097"
                                strokeWidth="5"
                                strokeDasharray="48.2 51.8"
                                strokeDashoffset="0"
                              />
                              {/* Data Extraction (26.4%) */}
                              <circle
                                cx="18"
                                cy="18"
                                r="14"
                                fill="transparent"
                                stroke="#10b981"
                                strokeWidth="5"
                                strokeDasharray="26.4 73.6"
                                strokeDashoffset="-48.2"
                              />
                              {/* Automation (15.8%) */}
                              <circle
                                cx="18"
                                cy="18"
                                r="14"
                                fill="transparent"
                                stroke="#E7B900"
                                strokeWidth="5"
                                strokeDasharray="15.8 84.2"
                                strokeDashoffset="-74.6"
                              />
                              {/* Correction (9.6%) */}
                              <circle
                                cx="18"
                                cy="18"
                                r="14"
                                fill="transparent"
                                stroke="#38bdf8"
                                strokeWidth="5"
                                strokeDasharray="9.6 90.4"
                                strokeDashoffset="-90.4"
                              />
                            </svg>
                          </div>

                          {/* Legend */}
                          <div className="grid grid-cols-1 gap-0.5 text-[9px] sm:text-[9.5px] font-medium text-slate-600 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1a7097]" />
                                Reasoning
                              </span>
                              <span className="font-bold text-[#0F172A]">48.2%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                                Extraction
                              </span>
                              <span className="font-bold text-[#0F172A]">26.4%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E7B900]" />
                                Automation
                              </span>
                              <span className="font-bold text-[#0F172A]">15.8%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                                Correction
                              </span>
                              <span className="font-bold text-[#0F172A]">9.6%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : card.widgetType === 'ai_metrics' ? (
                      /* 3. AI Impact Dual Metric Pill (Mobile Style) */
                      <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_22px_50px_-10px_rgba(15,23,42,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] text-left flex items-center justify-between gap-3 sm:gap-4 hover:border-[#1a7097]/50 transition-all">
                        <div>
                          <span className="block text-[10px] text-slate-400 font-medium mb-0.5">Hours Saved</span>
                          <div className="flex items-center gap-1 text-[#0F172A] font-black text-sm sm:text-base">
                            <span className="text-emerald-500 font-bold">↑</span>
                            <span>1,850h</span>
                          </div>
                        </div>
                        <div className="w-[1px] h-8 bg-slate-200/80" />
                        <div>
                          <span className="block text-[10px] text-slate-400 font-medium mb-0.5">Cost Reduced</span>
                          <div className="flex items-center gap-1 text-[#0F172A] font-black text-sm sm:text-base">
                            <span className="text-emerald-500 font-bold">↓</span>
                            <span>85%</span>
                          </div>
                        </div>
                      </div>
                    ) : card.widgetType === 'ai_stat' ? (
                      /* 4. AI Decisions Dispatched Stat Card (Mobile Style) */
                      <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_22px_50px_-10px_rgba(15,23,42,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] text-left hover:border-[#1a7097]/50 transition-all">
                        <span className="block text-[10px] text-slate-400 font-medium mb-1">Decisions Dispatched</span>
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg sm:text-xl text-[#0F172A]">
                            840k/mo
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                            <span>+28.4%</span>
                            <TrendingUp className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Standard Satellite Card */
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_20px_45px_-10px_rgba(15,23,42,0.13),inset_0_1px_1px_rgba(255,255,255,0.9)] text-left hover:border-[#1a7097]/50 transition-all group">
                        {/* Header: Title + Dedicated Technical Icon */}
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                            {card.title}
                          </span>
                          <span className="p-1 rounded-md bg-[#1a7097]/10 text-[#1a7097]">
                            {card.iconType === 'activity' && <Activity className="w-3 h-3" />}
                            {card.iconType === 'zap' && <Zap className="w-3 h-3 text-emerald-600" />}
                            {card.iconType === 'star' && <Star className="w-3 h-3 text-[#E7B900] fill-[#E7B900]" />}
                            {card.iconType === 'shield' && <ShieldCheck className="w-3 h-3 text-emerald-600" />}
                            {card.iconType === 'check' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                            {card.iconType === 'terminal' && <Terminal className="w-3 h-3 text-emerald-600" />}
                            {card.iconType === 'cpu' && <Cpu className="w-3 h-3 text-[#1a7097]" />}
                            {card.iconType === 'trending' && <TrendingUp className="w-3 h-3 text-[#E7B900]" />}
                          </span>
                        </div>

                        {/* Value */}
                        <div className="flex items-baseline gap-2 mb-1.5">
                          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xl sm:text-2xl text-[#0F172A]">
                            {card.value}
                          </span>
                          {card.widgetType === 'gauge' && (
                            <span className="text-[10px] font-mono font-bold text-emerald-600 flex items-center">
                              <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                              Growth
                            </span>
                          )}
                        </div>

                        {/* Dedicated Live Interactive Widgets */}
                        {card.widgetType === 'gauge' && (
                          <div className="space-y-1.5 pt-1.5 border-t border-slate-100">
                            <div className="flex justify-between text-[9px] font-mono text-slate-500">
                              <span>Storefront Conversion</span>
                              <strong className="text-emerald-600 font-bold">Top 5%</strong>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="w-[92%] h-full bg-emerald-500 rounded-full" />
                            </div>
                          </div>
                        )}

                        {card.widgetType === 'bars' && (
                          <div className="pt-1.5 border-t border-slate-100">
                            <div className="flex justify-between text-[9px] font-mono text-slate-500 mb-1">
                              <span>Edge CDN Nodes</span>
                              <strong className="text-[#1a7097]">Global 100%</strong>
                            </div>
                            <div className="flex items-end gap-1 h-5">
                              <div className="w-2 h-2.5 bg-[#1a7097]/40 rounded-xs" />
                              <div className="w-2 h-4 bg-[#1a7097]/60 rounded-xs" />
                              <div className="w-2 h-5 bg-[#1a7097] rounded-xs" />
                              <div className="w-2 h-3.5 bg-[#1a7097]/70 rounded-xs" />
                              <div className="w-2 h-5 bg-[#E7B900] rounded-xs" />
                            </div>
                          </div>
                        )}

                        {card.widgetType === 'audit' && (
                          <div className="flex items-center justify-between pt-1.5 border-t border-slate-100">
                            {['Perf', 'A11y', 'SEO', 'PWA'].map((item) => (
                              <div key={item} className="flex flex-col items-center">
                                <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 text-[8px] font-bold flex items-center justify-center border border-emerald-300">
                                  100
                                </span>
                                <span className="text-[7.5px] font-mono text-slate-400 mt-0.5">{item}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {card.widgetType === 'stars' && (
                          <div className="flex items-center gap-1 pt-1.5 border-t border-slate-100">
                            <div className="flex text-[#E7B900]">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-[#E7B900]" />
                              ))}
                            </div>
                            <span className="text-[9px] font-mono text-slate-400 ml-1">{card.sub}</span>
                          </div>
                        )}

                        {card.widgetType === 'circle_ring' && (
                          <div className="flex items-center gap-2 pt-1.5 border-t border-slate-100">
                            <div className="w-5 h-5 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                            <span className="text-[9.5px] font-mono text-slate-500">{card.sub}</span>
                          </div>
                        )}

                        {card.widgetType === 'fps' && (
                          <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9.5px] font-mono text-slate-500">
                            <span>{card.sub}</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          </div>
                        )}

                        {card.widgetType === 'tech_stack' && (
                          <div className="pt-1.5 border-t border-slate-100 flex items-center gap-1 text-[9px] font-mono text-slate-500">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>{card.sub}</span>
                          </div>
                        )}

                        {card.widgetType === 'sparkline' && (
                          <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 text-[9.5px] font-mono">
                            <span className="text-slate-500">{card.sub}</span>
                            <span className="text-emerald-600 font-bold">Active</span>
                          </div>
                        )}

                        {card.widgetType === 'latency' && (
                          <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9.5px] font-mono">
                            <span className="text-slate-500">{card.sub}</span>
                            <span className="text-[#1a7097] font-bold">Sub-50ms</span>
                          </div>
                        )}

                        {card.widgetType === 'clusters' && (
                          <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9.5px] font-mono text-slate-500">
                            <span>{card.sub}</span>
                            <span className="flex gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            </span>
                          </div>
                        )}

                        {card.widgetType === 'gold_badge' && (
                          <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-100 text-[9.5px] font-mono text-amber-700">
                            <Sparkles className="w-3 h-3 text-[#E7B900]" />
                            <span>{card.sub}</span>
                          </div>
                        )}

                        {card.widgetType === 'router' && (
                          <div className="pt-1.5 border-t border-slate-100 flex items-center gap-1.5 text-[9px] font-mono text-slate-600">
                            <Cpu className="w-3 h-3 text-[#1a7097]" />
                            <span>{card.sub}</span>
                          </div>
                        )}

                        {card.widgetType === 'radar' && (
                          <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9.5px] font-mono text-slate-500">
                            <span>{card.sub}</span>
                            <span className="flex h-2 w-2 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                          </div>
                        )}

                        {card.widgetType === 'terminal' && (
                          <div className="pt-1.5 border-t border-slate-100 flex items-center gap-1 font-mono text-[9px] text-emerald-600">
                            <span className="text-slate-400">$</span>
                            <span>{card.sub}</span>
                            <span className="w-1.5 h-3 bg-emerald-500 animate-pulse" />
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}

              {/* ══════════════════════════════════════════════════════════════════════
                  CENTRAL DEVICE WITH HIGH-RES REALISTIC SCREEN
                 ══════════════════════════════════════════════════════════════════════ */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                className="relative z-10 w-full max-w-[260px] xs:max-w-[300px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[480px] mx-auto"
              >
                {/* 1. Browser Window Mockup */}
                {activeService.deviceType === 'browser' && (
                  <div className="rounded-2xl border border-slate-300/85 bg-white shadow-[0_28px_60px_-14px_rgba(15,23,42,0.22)] overflow-hidden transition-transform duration-500 hover:scale-[1.01]">
                    <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-100/95 border-b border-slate-200/80">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400/90" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90" />
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-mono text-slate-500 shadow-2xs">
                        <Lock className="w-2.5 h-2.5 text-emerald-600" />
                        <span>{activeService.mockupUrl}</span>
                      </div>
                      <div className="w-6 flex justify-end text-slate-400">
                        <Maximize2 className="w-3 h-3 opacity-60" />
                      </div>
                    </div>

                    <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
                      <Image
                        src={activeService.mockupImage}
                        alt={activeService.title}
                        fill
                        priority
                        className="object-cover object-top select-none"
                        sizes="(max-width: 768px) 300px, 430px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* 2. Realistic Mobile Phone Frame with High-Res Production App Interface */}
                {activeService.deviceType === 'mobile' && (
                  <div className="relative mx-auto w-56 sm:w-64 md:w-70 rounded-[44px] border-[8px] border-slate-900 bg-slate-900 p-1 shadow-[0_32px_70px_-15px_rgba(15,23,42,0.3)] transition-transform duration-500 hover:scale-[1.01]">
                    {/* Dynamic Island Capsule */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-22 h-5 bg-slate-900 rounded-full z-30 flex items-center justify-between px-2.5 pointer-events-none shadow-xs">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    {/* Screen Container with Native High-Performance Mobile Application Interface */}
                    <div className="relative w-full aspect-[9/18.5] rounded-[36px] overflow-hidden bg-[#f8fafc] select-none shadow-inner">
                      <MobileAppScreen />
                      {/* Subtle Glass Glare Reflection */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/10 pointer-events-none" />
                    </div>
                  </div>
                )}
              </motion.div>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* ── Minimalist Service Switcher Tabs (Seamless Continuous Auto-Cycle) ── */}
        <div className="relative z-10 mt-6 pt-3.5 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[10.5px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a7097] animate-ping" />
            <span>Select Service to Explore:</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center max-w-full">
            {SERVICES_DATA.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl font-mono text-[10px] sm:text-[11px] font-semibold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer overflow-hidden ${isActive
                      ? 'bg-white border border-slate-300/90 text-[#0F172A] shadow-2xs'
                      : 'bg-transparent text-slate-500 hover:text-slate-900 hover:bg-white/60'
                    }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#1a7097]' : 'bg-slate-300'
                      }`}
                  />
                  <span>{service.tabLabel}</span>

                  {/* Smooth auto-cycle progress indicator on active tab */}
                  {isActive && (
                    <motion.div
                      key={`tab-progress-${index}-${activeIndex}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: CYCLE_DURATION, ease: 'linear' }}
                      className="absolute bottom-0 left-0 h-[2px] bg-[#1a7097]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
