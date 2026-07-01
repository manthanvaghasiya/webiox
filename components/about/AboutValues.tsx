'use client';

import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion';
import { useMemo, useRef } from 'react';
import {
  Zap,
  Shield,
  Eye,
  Rocket,
  Handshake,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import {
  AuroraStreak,
  ConstellationDots,
  MeshGradient,
  NoiseOverlay,
  type Dot,
} from './AmbientFX';

const valuesDots: Dot[] = [
  { x: '3%', y: '15%', size: 2, delay: 0.3, color: 'teal' },
  { x: '5%', y: '60%', size: 3, delay: 1.5, color: 'yellow' },
  { x: '7%', y: '88%', size: 2, delay: 0.8, color: 'teal' },
  { x: '95%', y: '10%', size: 3, delay: 1.2, color: 'yellow' },
  { x: '97%', y: '48%', size: 2, delay: 2.4, color: 'teal' },
  { x: '93%', y: '82%', size: 3, delay: 1.9, color: 'yellow' },
];

const valuesMesh = `radial-gradient(at 5% 32%, rgba(14,94,100,0.08) 0px, transparent 55%),
radial-gradient(at 95% 68%, rgba(255,191,0,0.06) 0px, transparent 55%),
radial-gradient(at 50% 4%, rgba(199,232,155,0.32) 0px, transparent 50%)`;

interface ValueItem {
  index: string;
  icon: LucideIcon;
  title: string;
  body: string;
  tag: string;
}

const values: ValueItem[] = [
  {
    index: '01',
    icon: Zap,
    title: 'Innovation',
    body: 'We hunt the edges of what is possible — fresh tools, smarter patterns, and ideas that put our clients three steps ahead of their market.',
    tag: 'Always On',
  },
  {
    index: '02',
    icon: Shield,
    title: 'Precision',
    body: 'Every pixel earns its place. Every API answers in milliseconds. Quality lives in the details that most teams overlook.',
    tag: 'Pixel Perfect',
  },
  {
    index: '03',
    icon: Eye,
    title: 'Transparency',
    body: 'You always know where the project stands, what is next, and why. No surprises — only steady, visible progress from day one.',
    tag: 'Open Book',
  },
  {
    index: '04',
    icon: Rocket,
    title: 'Velocity',
    body: 'Tight sprints, rapid prototypes, and lean workflows ship your idea while it still feels fresh — without ever cutting corners.',
    tag: 'Ship Daily',
  },
  {
    index: '05',
    icon: Handshake,
    title: 'Partnership',
    body: 'We work beside you, not for you. Your goals become our north star — your wins are how we measure ours.',
    tag: 'True Partner',
  },
  {
    index: '06',
    icon: Layers,
    title: 'Scalability',
    body: 'We build for the version of your business that exists three years from now. Every line of code is a foundation for what comes next.',
    tag: 'Built To Grow',
  },
];

const cardVariants: Variants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 60,
    x: i % 2 === 0 ? -40 : 40,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─────────────── Connector ─────────────── */

interface ConnectorProps {
  fromLeft: boolean;
  scrollYProgress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
  pathId: string;
}

const Connector = ({
  fromLeft,
  scrollYProgress,
  rangeStart,
  rangeEnd,
  pathId,
}: ConnectorProps) => {
  const pathLength = useTransform(
    scrollYProgress,
    [rangeStart, rangeEnd],
    [0, 1]
  );
  const lineOpacity = useTransform(
    scrollYProgress,
    [rangeStart, rangeStart + 0.005, rangeEnd],
    [0, 1, 1]
  );
  const afterDrawOpacity = useTransform(
    scrollYProgress,
    [rangeEnd - 0.03, rangeEnd],
    [0, 1]
  );

  // viewBox aspect ≈ container aspect (≈12:1 on lg) so circles render round, not oval
  const startX = fromLeft ? 456 : 744;
  const endX = fromLeft ? 744 : 456;
  const d = `M ${startX} 5 C ${startX} 50, ${endX} 50, ${endX} 95`;
  const glowId = `glow-${pathId}`;
  const gradId = `grad-${pathId}`;

  return (
    <div className="relative -my-2 h-24 w-full" aria-hidden="true">
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
        fill="none"
      >
        <defs>
          <path id={pathId} d={d} fill="none" />
          <filter
            id={glowId}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
          <linearGradient
            id={gradId}
            x1={startX}
            y1="0"
            x2={endX}
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#0E5E64" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#0E5E64" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFBF00" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* 1. Soft glow halo under the line */}
        <motion.path
          d={d}
          stroke="#0E5E64"
          strokeOpacity={0.45}
          strokeWidth={6}
          strokeLinecap="round"
          filter={`url(#${glowId})`}
          style={{ pathLength, opacity: lineOpacity }}
        />

        {/* 2. Main dashed line with brand-gradient stroke */}
        <motion.path
          d={d}
          stroke={`url(#${gradId})`}
          strokeWidth={1.8}
          strokeDasharray="4 5"
          strokeLinecap="round"
          style={{ pathLength, opacity: lineOpacity }}
        />

        {/* 3. Marching-ants accent layered on top — appears after drawn */}
        <motion.path
          d={d}
          stroke="#FFBF00"
          strokeOpacity={0.9}
          strokeWidth={1}
          strokeDasharray="2 18"
          strokeLinecap="round"
          style={{ opacity: afterDrawOpacity }}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="0.9s"
            repeatCount="indefinite"
          />
        </motion.path>

        {/* 4. Origin: outer ripple + dot */}
        <motion.circle
          cx={startX}
          cy={5}
          r={3}
          fill="none"
          stroke="#0E5E64"
          strokeOpacity={0.7}
          strokeWidth={1}
          style={{ opacity: lineOpacity }}
          animate={{ r: [3, 10, 3], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.circle
          cx={startX}
          cy={5}
          r={2.6}
          fill="#0E5E64"
          style={{ opacity: lineOpacity }}
        />

        {/* 5. Destination: ripple + filled dot + bright core */}
        <motion.circle
          cx={endX}
          cy={95}
          r={3}
          fill="none"
          stroke="#FFBF00"
          strokeOpacity={0.85}
          strokeWidth={1.2}
          style={{ opacity: afterDrawOpacity }}
          animate={{ r: [3, 12, 3], opacity: [0.85, 0, 0.85] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.circle
          cx={endX}
          cy={95}
          r={3.2}
          fill="#0E5E64"
          style={{ opacity: afterDrawOpacity }}
        />
        <motion.circle
          cx={endX}
          cy={95}
          r={1.5}
          fill="#FFBF00"
          style={{ opacity: afterDrawOpacity }}
          animate={{ opacity: [1, 0.4, 1], scale: [1, 1.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* 6. Comet stream — three particles riding the path with easing + stagger */}
        <motion.g style={{ opacity: afterDrawOpacity }}>
          {/* Lead particle: bright + soft halo */}
          <circle r="7" fill="#FFBF00" fillOpacity="0.35" filter={`url(#${glowId})`}>
            <animateMotion
              dur="2.8s"
              repeatCount="indefinite"
              begin="0s"
              calcMode="spline"
              keyPoints="0;1"
              keyTimes="0;1"
              keySplines="0.4 0 0.6 1"
            >
              <mpath href={`#${pathId}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;0.45;0.45;0"
              keyTimes="0;0.12;0.88;1"
              dur="2.8s"
              repeatCount="indefinite"
              begin="0s"
            />
          </circle>
          <circle r="2.8" fill="#FFBF00">
            <animateMotion
              dur="2.8s"
              repeatCount="indefinite"
              begin="0s"
              calcMode="spline"
              keyPoints="0;1"
              keyTimes="0;1"
              keySplines="0.4 0 0.6 1"
            >
              <mpath href={`#${pathId}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.12;0.88;1"
              dur="2.8s"
              repeatCount="indefinite"
              begin="0s"
            />
          </circle>

          {/* Second particle — teal, trailing */}
          <circle r="2" fill="#0E5E64">
            <animateMotion
              dur="2.8s"
              repeatCount="indefinite"
              begin="-0.95s"
              calcMode="spline"
              keyPoints="0;1"
              keyTimes="0;1"
              keySplines="0.4 0 0.6 1"
            >
              <mpath href={`#${pathId}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;0.95;0.95;0"
              keyTimes="0;0.12;0.88;1"
              dur="2.8s"
              repeatCount="indefinite"
              begin="-0.95s"
            />
          </circle>

          {/* Third particle — small spark */}
          <circle r="1.4" fill="#FFBF00">
            <animateMotion
              dur="2.8s"
              repeatCount="indefinite"
              begin="-1.85s"
              calcMode="spline"
              keyPoints="0;1"
              keyTimes="0;1"
              keySplines="0.4 0 0.6 1"
            >
              <mpath href={`#${pathId}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;0.85;0.85;0"
              keyTimes="0;0.12;0.88;1"
              dur="2.8s"
              repeatCount="indefinite"
              begin="-1.85s"
            />
          </circle>
        </motion.g>
      </svg>
    </div>
  );
};

/* ─────────────── Card ─────────────── */

interface CardProps {
  value: ValueItem;
  position: number;
}

const ValueCard = ({ value, position }: CardProps) => {
  const Icon = value.icon;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-120, 120], [5, -5]);
  const rotateY = useTransform(mouseX, [-200, 200], [-6, 6]);
  const iconX = useTransform(mouseX, [-200, 200], [-5, 5]);
  const iconY = useTransform(mouseY, [-120, 120], [-4, 4]);

  return (
    <motion.article
      custom={position}
      variants={cardVariants}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className="group relative flex overflow-hidden rounded-[28px] bg-[#E9F4EA] text-gray-900 shadow-[0_22px_50px_-26px_rgba(14,94,100,0.3)] transition-shadow duration-500 will-change-transform hover:shadow-[0_32px_60px_-22px_rgba(14,94,100,0.4)]"
    >
      {/* Left rotated tag strip */}
      <div className="relative flex w-10 sm:w-14 shrink-0 items-center justify-center overflow-hidden bg-[#0E5E64] py-6">
        {/* Strip shimmer on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-1/2 h-1/2 -translate-y-full bg-gradient-to-b from-white/0 via-white/20 to-white/0 transition-transform duration-1000 group-hover:translate-y-[400%]"
        />
        <span
          className="relative text-[11px] font-semibold uppercase tracking-[0.28em] text-white/95"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {value.tag}
        </span>
      </div>

      {/* Right content */}
      <div className="relative flex-1 overflow-hidden p-4 sm:p-5 md:p-7">
        {/* Oversized background numeral */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-3 -bottom-10 select-none text-[7rem] md:text-[10.5rem] font-black leading-none tracking-tighter text-[#0E5E64]/[0.08] transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-105"
        >
          {value.index}
        </div>

        {/* Hover bloom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,94,100,0.09),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Icon with parallax */}
        <motion.div
          style={{ x: iconX, y: iconY }}
          className="relative mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#0E5E64]/15 bg-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg] group-hover:border-[#0E5E64]/40"
        >
          <Icon
            className="h-5 w-5 text-[#0E5E64] transition-colors duration-300"
            strokeWidth={2}
          />
        </motion.div>

        {/* Title row */}
        <h3 className="relative mb-3 flex items-baseline gap-2.5 text-xl font-bold tracking-tight">
          <span className="text-[#0E5E64]/40">{value.index}</span>
          <span>{value.title}</span>
        </h3>

        {/* Animated underline accent */}
        <div
          aria-hidden="true"
          className="relative mb-4 h-px w-10 origin-left bg-[#0E5E64]/50 transition-all duration-500 group-hover:w-20"
        />

        {/* Body */}
        <p className="relative max-w-[38ch] text-sm leading-relaxed text-gray-600">
          {value.body}
        </p>
      </div>
    </motion.article>
  );
};

/* ─────────────── Mobile Card ─────────────── */

const MobileValueCard = ({ value, position, isLast }: { value: ValueItem; position: number; isLast: boolean }) => {
  const Icon = value.icon;

  return (
    <div className="relative z-10 flex w-full min-h-[6.5rem] items-stretch rounded-[20px] bg-white shadow-[0_8px_30px_-12px_rgba(14,94,100,0.2)]">
      {/* Left blue part */}
      <div 
        className="relative w-[35%] sm:w-[25%] shrink-0 overflow-hidden rounded-l-[20px] bg-[#0E5E64]"
        style={{ clipPath: 'polygon(0 0, 100% 0, 75% 100%, 0 100%)' }}
      >
        <div className="absolute inset-0 flex items-center justify-center pr-[15%]">
          <Icon className="h-8 w-8 text-white opacity-90" strokeWidth={1.5} />
        </div>
      </div>
      
      {/* Right content */}
      <div className="flex flex-1 flex-col justify-center py-4 pl-1 pr-16">
        <h3 className="text-base font-bold text-gray-900 leading-tight mb-1">{value.title}</h3>
        <p className="text-xs text-gray-500 leading-snug line-clamp-2">{value.body}</p>
      </div>
      
      {/* Number Circle */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-gray-50 bg-white shadow-sm z-10">
        <span className="text-sm font-extrabold text-[#0E5E64]">{value.index}.</span>
      </div>
      
      {/* Vertical Dashed Line connecting to next */}
      {!isLast && (
        <div className="absolute right-[37px] top-[50%] h-[calc(100%+2rem)] w-px border-l-[2px] border-dashed border-[#0E5E64]/30 z-0" />
      )}
    </div>
  );
};

/* ─────────────── Section ─────────────── */

export default function AboutValues() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const connectorRanges = useMemo(() => {
    const start = 0.22;
    const end = 0.78;
    const span = end - start;
    const step = span / (values.length - 1);
    return values.slice(0, -1).map((_, i) => ({
      start: start + step * i,
      end: start + step * (i + 1),
    }));
  }, []);

  // Header progress text — counts 01 → 06 as you scroll the section
  const headerProgress = useTransform(scrollYProgress, [0.1, 0.85], [0, 6]);
  const progressDisplay = useTransform(headerProgress, (v) =>
    String(Math.min(6, Math.max(1, Math.ceil(v) || 1))).padStart(2, '0')
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 sm:py-16 md:py-28 bg-gradient-to-b from-[#F7FAF8] via-[#E9F4EA]/30 to-[#F7FAF8]"
    >
      {/* Animated blob 1 — teal left */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-40 top-1/3 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,94,100,0.09),transparent_60%)] blur-[110px]"
      />

      {/* Animated blob 2 — yellow bottom-right */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -50, 0], y: [0, -40, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="pointer-events-none absolute -right-32 bottom-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,191,0,0.07),transparent_60%)] blur-[110px]"
      />

      {/* Animated blob 3 — mint top-right */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="pointer-events-none absolute -right-20 top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(199,232,155,0.45),transparent_60%)] blur-[100px]"
      />

      {/* Mesh gradient overlay */}
      <MeshGradient stops={valuesMesh} />

      {/* Drifting aurora streaks */}
      <AuroraStreak position="top-[30%] -left-[20%]" color="mint" angle={-6} duration={36} />
      <AuroraStreak position="bottom-[20%] -right-[20%]" color="yellow" angle={10} duration={42} reverse />

      {/* Film-grain noise overlay */}
      <NoiseOverlay />

      {/* Floating constellation dots — anchored to edges to avoid card content */}
      <ConstellationDots dots={valuesDots} />

      {/* Dot grid with vignette mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(14,94,100,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* Topographic curves at bottom */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-32 opacity-30 z-0"
        viewBox="0 0 1440 128"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 Q360,40 720,80 T1440,80"
          stroke="rgba(14,94,100,0.4)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 6"
        />
        <path
          d="M0,100 Q360,70 720,100 T1440,100"
          stroke="rgba(14,94,100,0.25)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M0,118 Q360,90 720,118 T1440,118"
          stroke="rgba(255,191,0,0.35)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="2 8"
        />
      </svg>

      {/* Vertical typographic accent — left edge, desktop only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 select-none xl:block"
      >
        <span
          className="block text-[11px] font-semibold uppercase tracking-[0.4em] text-[#0E5E64]/30"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          06 · The Foundation · Webiox
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 grid grid-cols-1 gap-10 md:mb-20 md:grid-cols-12 md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7"
          >
            <div className="mb-4 flex items-center gap-3">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                className="h-[2px] w-10 origin-left rounded-full bg-[#0E5E64]/70"
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#0E5E64]/85">
                Our Core Values
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-[1.05] tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-[3.4rem]">
              Six principles that{' '}
              <span className="relative inline-block">
                shape every
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-[#FFBF00]"
                />
              </span>{' '}
              project we ship.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
              Beyond writing great code, we built Webiox around a small set of
              values that keep our work honest, our partners informed, and the
              final product something everyone is proud of.
            </p>
          </motion.div>

          {/* Big numeral accent + progress */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:col-span-5 md:flex md:items-end md:justify-end"
          >
            <div className="flex items-end gap-6">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#0E5E64]/70">
                  Reading
                </span>
                <motion.span className="font-mono text-2xl font-bold text-[#0E5E64]">
                  <motion.span>{progressDisplay}</motion.span>
                  <span className="text-[#0E5E64]/35"> / 06</span>
                </motion.span>
              </div>
              <div className="relative flex h-28 items-center">
                <span
                  className="font-black leading-none tracking-tighter text-[#0E5E64]"
                  style={{ fontSize: '7rem' }}
                >
                  06
                </span>
                <span className="absolute -right-2 -top-2 inline-flex items-center justify-center rounded-full bg-[#FFBF00] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#0B1F22]">
                  Pillars
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Zigzag layout — desktop */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative hidden lg:block"
        >
          <div className="flex flex-col">
            {values.map((value, i) => {
              const isLeft = i % 2 === 0;
              const isLast = i === values.length - 1;
              const range = connectorRanges[i];
              return (
                <div key={value.title}>
                  <div
                    className={`flex ${
                      isLeft ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div className="w-[460px] max-w-[46%]">
                      <ValueCard value={value} position={i} />
                    </div>
                  </div>
                  {!isLast && range && (
                    <Connector
                      fromLeft={isLeft}
                      scrollYProgress={scrollYProgress}
                      rangeStart={range.start}
                      rangeEnd={range.end}
                      pathId={`webiox-connector-${i}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Stacked — tablet & mobile */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative lg:hidden mx-auto max-w-md pt-8"
        >
          <div className="relative space-y-8">
            {values.map((value, i) => (
              <MobileValueCard key={value.title} value={value} position={i} isLast={i === values.length - 1} />
            ))}
          </div>
        </motion.div>

        {/* Footer micro-line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-[#0E5E64]/60"
        >
          <span className="h-px w-10 bg-[#0E5E64]/30" />
          <span>Principles, not promises</span>
          <span className="h-px w-10 bg-[#0E5E64]/30" />
        </motion.div>
      </div>
    </section>
  );
}
