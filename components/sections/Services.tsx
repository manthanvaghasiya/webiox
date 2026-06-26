'use client';

import { useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  Layers,
  Monitor,
  type LucideIcon,
} from 'lucide-react';

import {
  cursorSpring,
  easeOutExpo,
  fadeUp,
  floatLoop,
  headlineContainer,
  headlineWord,
  indicatorSpring,
  marqueeLoop,
  showcaseChild,
  showcasePanel,
} from '@/lib/motion/services';

interface Metric {
  readonly label: string;
  readonly value: string;
  readonly caption: string;
}

interface HomeService {
  readonly id: string;
  readonly number: string;
  readonly tag: string;
  readonly shortTitle: string;
  readonly title: string;
  readonly promise: string;
  readonly description: string;
  readonly capabilities: readonly string[];
  readonly deliverables: readonly string[];
  readonly bestFor: readonly string[];
  readonly metric: Metric;
  readonly icon: LucideIcon;
  readonly video?: string;
  readonly accent: string;
  readonly accentSurface: string;
  readonly href: string;
}

const SERVICES: readonly HomeService[] = [
  {
    id: 'web-development',
    number: '01',
    tag: 'Websites',
    shortTitle: 'Websites & Storefronts',
    title: 'Websites that win you customers.',
    promise: "A site so fast and clear, your visitors don't think twice.",
    description:
      'We build websites that load instantly, look stunning on every phone, and turn casual visitors into paying customers — for clinics, factories, retailers, and everyone in between.',
    capabilities: ['Built in days', 'Mobile-first', 'SEO done right', 'Pixel perfect'],
    deliverables: [
      'Loads in under one second, even on slow internet',
      'Looks flawless on every device, from phone to 4K',
      'Found on Google for the searches that matter to you',
    ],
    bestFor: ['Clinics', 'Factories', 'Retail', 'Hospitality', 'Education'],
    metric: {
      label: 'Avg Speed Score',
      value: '99 / 100',
      caption: 'Across our last 24 client websites',
    },
    icon: Monitor,
    video: '/you_make_good_video_for_we_add.mp4',
    accent: '#0E5E64',
    accentSurface: '#EEF6F6',
    href: '/services#web-development',
  },
  {
    id: 'saas-development',
    number: '02',
    tag: 'Custom Software',
    shortTitle: 'SaaS & Internal Portals',
    title: 'Software your team will actually use.',
    promise: 'The internal tool your team has been waiting for.',
    description:
      'Stop forcing your business into off-the-shelf software. We build custom platforms — inventory tools, patient portals, branch dashboards — shaped around the way your team already works.',
    capabilities: ['Multi-branch ready', 'Right access for everyone', 'Live updates', 'Bank-grade safe'],
    deliverables: [
      'Workflows that match how you actually do business',
      'The right access for every team member, automatically',
      'One dashboard with everything that matters today',
    ],
    bestFor: ['Manufacturing', 'Healthcare', 'Retail Chains', 'Logistics'],
    metric: {
      label: 'Records Synced',
      value: '2.3M+',
      caption: 'Live across our active client systems',
    },
    icon: Layers,
    accent: '#FFBF00',
    accentSurface: '#FFFBEB',
    href: '/services#saas-development',
  },
  {
    id: 'ai-solutions',
    number: '03',
    tag: 'AI & Automation',
    shortTitle: 'AI Agents & Automation',
    title: 'AI that does the boring work for you.',
    promise: 'Quiet helpers that take routine off your team.',
    description:
      "Smart assistants that answer customer questions at 2 AM, sort invoices automatically, and turn yesterday's data into today's clear decisions — so your team can focus on work that needs a human.",
    capabilities: ['Always-on support', 'Document sorting', 'Daily insights', 'Voice & chat'],
    deliverables: [
      '24/7 customer support without growing your team',
      'Paperwork sorted and filed without a human touching it',
      "Daily summaries of what's working and what isn't",
    ],
    bestFor: ['Customer Support', 'Operations', 'Finance', 'Sales'],
    metric: {
      label: 'Queries This Week',
      value: '12,400+',
      caption: 'Handled overnight without a single human',
    },
    icon: Bot,
    accent: '#7C3AED',
    accentSurface: '#F5F3FF',
    href: '/services#ai-solutions',
  },
] as const;

const HEADLINE_WORDS = ['Three', 'services.', 'Built', 'without', 'compromise.'] as const;
const ACCENT_WORD_INDEX = 1;
const TOTAL_SERVICES = SERVICES.length;

const INDUSTRIES = [
  'Factories',
  'Clinics',
  'Retail Brands',
  'Hospitality',
  'Education',
  'Logistics',
  'E-Commerce',
  'Real Estate',
  'Studios',
  'Hospitals',
] as const;

export default function Services() {
  const [activeId, setActiveId] = useState<string>(SERVICES[0].id);
  const active = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-[#FAFBFC]"
    >
      <BackgroundCanvas accent={active.accent} />

      {/* Top Wavy Divider matching Hero background to reveal Services grid in the 'white space' */}
      <div className="absolute top-[-1px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg
          className="relative block w-full h-[40px] md:h-[60px] lg:h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 C377,-120 700,300 1200,0 V0 H0 Z"
            className="fill-[#0E5E64]"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 pb-24 lg:px-8 lg:pb-32 pt-[calc(6rem+40px)] md:pt-[calc(6rem+60px)] lg:pt-[calc(8rem+100px)]">
        <Header />

        <IndustriesMarquee />

        <TabStrip services={SERVICES} activeId={activeId} onSelect={setActiveId} />

        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              variants={showcasePanel}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6"
            >
              <ShowcaseStage service={active} />
              <ShowcaseContent service={active} />
            </motion.div>
          </AnimatePresence>
        </div>

        <TrustStrip />
      </div>
    </section>
  );
}

function Header() {
  return (
    <header className="mb-10 lg:mb-14">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mb-6 flex items-center gap-3"
      >
        <span aria-hidden className="h-[2px] w-8 rounded-full bg-[#0E5E64]/60" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0E5E64]/80">
          What We Build
        </span>
      </motion.div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <motion.h2
          id="services-heading"
          variants={headlineContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl text-[2.5rem] font-normal leading-[1.05] tracking-[-0.02em] text-slate-900 md:text-[3.25rem] lg:text-[3.75rem]"
        >
          {HEADLINE_WORDS.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="mr-[0.32em] inline-block overflow-hidden align-bottom"
            >
              <motion.span variants={headlineWord} className="inline-block will-change-transform">
                {i === ACCENT_WORD_INDEX ? (
                  <span className="bg-gradient-to-r from-[#0E5E64] via-[#1a8a8f] to-[#0E5E64] bg-clip-text text-transparent">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.25 }}
          className="max-w-md text-[1.05rem] leading-[1.8] text-slate-500 lg:pb-2 lg:text-lg"
        >
          Whether you run a clinic, a factory, or a retail chain — the principle stays the same:{' '}
          <span className="font-medium text-slate-700">simple, fast, and obsessed with results</span>.
        </motion.p>
      </div>
    </header>
  );
}

function IndustriesMarquee() {
  const items = [...INDUSTRIES, ...INDUSTRIES];

  return (
    <div
      aria-hidden
      className="relative my-10 overflow-hidden border-y border-slate-200/70 py-4"
    >
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={marqueeLoop}
        className="flex w-max items-center gap-12 whitespace-nowrap will-change-transform"
      >
        {items.map((industry, i) => (
          <span
            key={`${industry}-${i}`}
            className="flex items-center gap-12 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400"
          >
            {industry}
            <span aria-hidden className="h-1 w-1 rounded-full bg-slate-300" />
          </span>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FAFBFC] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FAFBFC] to-transparent" />
    </div>
  );
}

interface TabStripProps {
  readonly services: readonly HomeService[];
  readonly activeId: string;
  readonly onSelect: (id: string) => void;
}

function TabStrip({ services, activeId, onSelect }: TabStripProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="flex flex-col gap-2 rounded-2xl border border-slate-200/70 bg-white/70 p-2 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(15,23,42,0.08)] md:flex-row"
      role="tablist"
      aria-label="Service categories"
    >
      {services.map((service) => {
        const isActive = service.id === activeId;
        const Icon = service.icon;

        return (
          <button
            key={service.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`showcase-${service.id}`}
            onClick={() => onSelect(service.id)}
            className="group relative flex flex-1 items-center gap-4 rounded-xl px-4 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300"
          >
            {isActive && (
              <motion.span
                layoutId="services-tab-bg"
                aria-hidden
                className="absolute inset-0 rounded-xl"
                style={{ background: service.accentSurface }}
                transition={indicatorSpring}
              />
            )}

            <span
              className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300"
              style={{
                background: isActive ? service.accent : '#f1f5f9',
                boxShadow: isActive
                  ? `0 10px 24px -8px ${service.accent}66, inset 0 0 0 1px rgba(255,255,255,0.18)`
                  : 'none',
              }}
            >
              <Icon
                className="h-[18px] w-[18px] transition-colors duration-300"
                strokeWidth={1.8}
                style={{ color: isActive ? '#ffffff' : '#64748b' }}
              />
            </span>

            <span className="relative z-10 flex-1 min-w-0">
              <span
                className="block font-mono text-[10px] font-semibold tracking-[0.18em] transition-colors duration-300"
                style={{ color: isActive ? service.accent : '#94a3b8' }}
              >
                {service.number} — {service.tag.toUpperCase()}
              </span>
              <span
                className="mt-1 block truncate text-[14px] font-semibold leading-tight transition-colors duration-300"
                style={{ color: isActive ? '#0f172a' : '#475569' }}
              >
                {service.shortTitle}
              </span>
            </span>

            <ArrowUpRight
              aria-hidden
              className="relative z-10 h-4 w-4 shrink-0 transition-all duration-300"
              strokeWidth={2.2}
              style={{
                color: isActive ? service.accent : '#cbd5e1',
                transform: isActive ? 'translate(2px, -2px)' : 'translate(0, 0)',
              }}
            />
          </button>
        );
      })}
    </motion.div>
  );
}

function ShowcaseStage({ service }: { service: HomeService }) {
  const Icon = service.icon;
  const stageRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const smoothX = useSpring(mouseX, cursorSpring);
  const smoothY = useSpring(mouseY, cursorSpring);

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleLeave = () => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      id={`showcase-${service.id}`}
      role="tabpanel"
      className="relative overflow-hidden rounded-[28px] border border-slate-200/70 lg:col-span-7 aspect-[5/4] lg:aspect-auto lg:min-h-[600px]"
      style={{
        background: `linear-gradient(135deg, ${service.accentSurface} 0%, #ffffff 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 18% 22%, ${service.accent}26 0%, transparent 50%), radial-gradient(circle at 82% 78%, ${service.accent}1F 0%, transparent 55%)`,
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '3rem 3rem',
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[420px] w-[420px] rounded-full blur-[80px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          background: `radial-gradient(circle, ${service.accent}55 0%, transparent 70%)`,
        }}
      />

      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-12 select-none text-[18rem] font-black leading-none tracking-tighter md:text-[22rem]"
        style={{ color: `${service.accent}14` }}
      >
        {service.number}
      </span>

      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={floatLoop}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <div className="relative">
          <span
            aria-hidden
            className="absolute inset-0 scale-[1.6] rounded-[32px] blur-2xl"
            style={{ background: service.accent, opacity: 0.42 }}
          />
          <div
            className="relative flex h-[140px] w-[140px] items-center justify-center rounded-[28px] overflow-hidden md:h-[160px] md:w-[160px]"
            style={{
              background: `linear-gradient(135deg, ${service.accent} 0%, ${service.accent}DD 100%)`,
              boxShadow: `0 30px 80px -10px ${service.accent}88, inset 0 0 0 1px rgba(255,255,255,0.28)`,
            }}
          >
            {service.video ? (
              <video
                src={service.video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Icon className="h-16 w-16 text-white md:h-[72px] md:w-[72px]" strokeWidth={1.4} />
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={showcaseChild}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.15, duration: 0.55, ease: easeOutExpo }}
        className="absolute right-5 top-5 max-w-[230px] rounded-2xl border border-white/70 bg-white/80 p-4 shadow-[0_18px_40px_-16px_rgba(15,23,42,0.18)] backdrop-blur-xl md:right-7 md:top-7"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
              style={{ background: service.accent }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: service.accent }}
            />
          </span>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: service.accent }}
          >
            {service.metric.label}
          </span>
        </div>
        <p className="mt-2 text-[1.55rem] font-bold leading-none tracking-tight text-slate-900">
          {service.metric.value}
        </p>
        <p className="mt-1.5 text-[11.5px] leading-snug text-slate-500">
          {service.metric.caption}
        </p>
      </motion.div>

      <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2 md:inset-x-7 md:bottom-7">
        {service.capabilities.map((cap, i) => (
          <motion.span
            key={cap}
            variants={showcaseChild}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.28 + i * 0.06, duration: 0.5, ease: easeOutExpo }}
            className="rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-[11px] font-semibold backdrop-blur-md"
            style={{ color: service.accent }}
          >
            {cap}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function ShowcaseContent({ service }: { service: HomeService }) {
  return (
    <div className="flex flex-col rounded-[28px] border border-slate-200/70 bg-white p-7 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.14)] lg:col-span-5 lg:p-9">
      <div className="mb-6 flex items-center gap-3">
        <span
          className="font-mono text-[11px] font-semibold tracking-[0.2em]"
          style={{ color: service.accent }}
        >
          {service.number} / 0{TOTAL_SERVICES}
        </span>
        <span className="h-[1px] flex-1 bg-slate-200" />
        <span
          className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: service.accent, background: `${service.accent}14` }}
        >
          {service.tag}
        </span>
      </div>

      <motion.h3
        variants={showcaseChild}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.05, duration: 0.55, ease: easeOutExpo }}
        className="text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.015em] text-slate-900 lg:text-[2.15rem]"
      >
        {service.title}
      </motion.h3>

      <motion.p
        variants={showcaseChild}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.12, duration: 0.55, ease: easeOutExpo }}
        className="mt-3 text-[1rem] font-medium italic"
        style={{ color: service.accent }}
      >
        {service.promise}
      </motion.p>

      <motion.p
        variants={showcaseChild}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.18, duration: 0.55, ease: easeOutExpo }}
        className="mt-5 text-[0.95rem] leading-[1.75] text-slate-600"
      >
        {service.description}
      </motion.p>

      <div className="mt-7">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          What You Get
        </p>
        <ul className="list-none space-y-3">
          {service.deliverables.map((d, i) => (
            <motion.li
              key={d}
              variants={showcaseChild}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.24 + i * 0.06, duration: 0.5, ease: easeOutExpo }}
              className="flex items-start gap-3 text-[13.5px] text-slate-700"
            >
              <span
                aria-hidden
                className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{ background: `${service.accent}1A`, color: service.accent }}
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="leading-snug">{d}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-7">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Best For
        </p>
        <div className="flex flex-wrap gap-1.5">
          {service.bestFor.map((sector) => (
            <span
              key={sector}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[12px] text-slate-600"
            >
              {sector}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        variants={showcaseChild}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5, duration: 0.5, ease: easeOutExpo }}
        className="mt-8 flex flex-col gap-3 sm:flex-row"
      >
        <Link
          href={service.href}
          className="group/link inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[13px] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
          style={{
            background: service.accent,
            boxShadow: `0 14px 32px -10px ${service.accent}88`,
          }}
        >
          See examples
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            strokeWidth={2.4}
          />
        </Link>
        <Link
          href="/contact"
          className="group/cta inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3.5 text-[13px] font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
        >
          Book a 15-min call
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5"
            strokeWidth={2.4}
          />
        </Link>
      </motion.div>
    </div>
  );
}

function TrustStrip() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: 0.2 }}
      className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-slate-200/70 bg-white/60 px-6 py-5 backdrop-blur md:flex-row md:px-8"
    >
      <div className="flex items-center gap-3 text-center md:text-left">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <p className="text-[14px] text-slate-700">
          <span className="font-semibold text-slate-900">Currently taking on</span> 2 more projects
          this quarter.
        </p>
      </div>

      <Link
        href="/contact"
        className="group/cta inline-flex items-center gap-2.5 rounded-full bg-slate-900 px-6 py-3 text-[13px] font-semibold tracking-wide text-white shadow-[0_10px_30px_-10px_rgba(15,23,42,0.4)] transition-colors duration-300 hover:bg-[#0E5E64] hover:shadow-[0_14px_40px_-10px_rgba(14,94,100,0.5)]"
      >
        Tell us about your project
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
          strokeWidth={2.4}
        />
      </Link>
    </motion.div>
  );
}

function BackgroundCanvas({ accent }: { accent: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse at 50% 40%, black 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 60%, transparent 100%)',
        }}
      />
      <AnimatePresence mode="sync">
        <motion.div
          key={accent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.07 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="absolute -right-40 -top-48 h-[720px] w-[720px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
        />
      </AnimatePresence>
      <div
        className="absolute -bottom-56 -left-40 h-[640px] w-[640px] rounded-full opacity-[0.04] blur-3xl"
        style={{ background: 'radial-gradient(circle, #FFBF00 0%, transparent 70%)' }}
      />
    </div>
  );
}
