'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Terminal,
  Cpu,
  Network,
  Code2,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import { type MouseEvent } from 'react';
import {
  AuroraStreak,
  ConstellationDots,
  MeshGradient,
  NoiseOverlay,
  type Dot,
} from './AmbientFX';

const ctaDots: Dot[] = [
  { x: '5%', y: '12%', size: 3, delay: 0.4, color: 'teal' },
  { x: '8%', y: '78%', size: 2, delay: 1.6, color: 'yellow' },
  { x: '46%', y: '6%', size: 2, delay: 2.0, color: 'yellow' },
  { x: '52%', y: '94%', size: 3, delay: 0.9, color: 'teal' },
  { x: '93%', y: '18%', size: 3, delay: 1.3, color: 'teal' },
  { x: '95%', y: '82%', size: 2, delay: 2.6, color: 'yellow' },
];

const ctaMesh = `radial-gradient(at 18% 92%, rgba(14,94,100,0.07) 0px, transparent 50%),
radial-gradient(at 82% 8%, rgba(255,191,0,0.06) 0px, transparent 50%),
radial-gradient(at 50% 50%, rgba(199,232,155,0.18) 0px, transparent 55%)`;

interface FloatingIconProps {
  icon: LucideIcon;
  delay: number;
  className: string;
}

const FloatingIcon = ({ icon: Icon, delay, className }: FloatingIconProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{
      opacity: [0.08, 0.2, 0.08],
      scale: [1, 1.1, 1],
      y: [0, -15, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
    className={`absolute text-[#0E5E64] ${className}`}
  >
    <Icon strokeWidth={1.5} className="h-10 w-10 md:h-16 md:w-16" />
  </motion.div>
);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function AboutCTA() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlight = useMotionTemplate`radial-gradient(
    700px circle at ${mouseX}px ${mouseY}px,
    rgba(14, 94, 100, 0.16),
    transparent 75%
  )`;

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-20 lg:px-8 bg-gradient-to-b from-[#F7FAF8] via-[#F9FAFB] to-white">
      {/* Section-level animated blob — teal top-left */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 60, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-1/4 -left-1/4 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(14,94,100,0.08),transparent_60%)] pointer-events-none blur-[110px] z-0"
      />

      {/* Section-level animated blob — yellow bottom-right */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -50, 0], y: [0, -40, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(255,191,0,0.07),transparent_60%)] pointer-events-none blur-[110px] z-0"
      />

      {/* Section-level dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(rgba(14,94,100,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      {/* Mesh gradient overlay */}
      <MeshGradient stops={ctaMesh} />

      {/* Drifting aurora streaks */}
      <AuroraStreak position="top-[15%] -left-[20%]" color="yellow" angle={-6} duration={34} />
      <AuroraStreak position="bottom-[10%] -right-[20%]" color="teal" angle={8} duration={38} reverse />

      {/* Film-grain noise overlay */}
      <NoiseOverlay />

      {/* Floating constellation dots */}
      <ConstellationDots dots={ctaDots} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
          className="group relative w-full rounded-[2.5rem]"
          onMouseMove={handleMouseMove}
        >
          {/* Mouse-tracking spotlight border */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-[2px] z-0 rounded-[2.6rem] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{ background: spotlight }}
          />

          {/* Main light container */}
          <div className="relative z-10 h-full w-full overflow-hidden rounded-[2.5rem] border border-[#0E5E64]/12 bg-white p-8 text-center shadow-[0_30px_80px_-30px_rgba(14,94,100,0.25)] md:p-12 lg:py-16">
            {/* Subtle teal grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(14,94,100,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(14,94,100,0.04)_1px,transparent_1px)] bg-[size:32px_32px]"
            />

            {/* Soft top/bottom vignette to fade the grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"
            />

            {/* Corner glows — breathing */}
            <motion.div
              aria-hidden="true"
              animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#0E5E64]/25 blur-[110px]"
            />
            <motion.div
              aria-hidden="true"
              animate={{ scale: [1, 1.15, 1], opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#FFBF00]/30 blur-[110px]"
            />

            {/* Floating tech icons */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <FloatingIcon
                icon={Terminal}
                delay={0}
                className="left-[10%] top-[15%] rotate-12"
              />
              <FloatingIcon
                icon={Cpu}
                delay={1.5}
                className="bottom-[20%] left-[20%] -rotate-12"
              />
              <FloatingIcon
                icon={Network}
                delay={3}
                className="right-[15%] top-[25%] rotate-45"
              />
              <FloatingIcon
                icon={Code2}
                delay={4.5}
                className="bottom-[15%] right-[25%] -rotate-6"
              />
              <FloatingIcon
                icon={Layers}
                delay={2}
                className="right-[5%] top-[40%] rotate-90 opacity-10"
              />
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative z-20 mx-auto flex max-w-3xl flex-col items-center"
            >
              {/* Top badge */}
              <motion.div
                variants={itemVariants}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0E5E64]/20 bg-[#0E5E64]/[0.06] px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-[#0E5E64] shadow-[0_0_20px_rgba(14,94,100,0.08)]"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#FFBF00]" />
                System Ready. Awaiting Command.
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
              >
                Ready to Deploy Your <br />
                <span className="relative inline-block text-[#0E5E64]">
                  <motion.span
                    aria-hidden="true"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.9,
                      delay: 0.9,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                    className="absolute -inset-x-1 bottom-1 h-[14px] origin-left rounded-sm bg-[#FFBF00]/55 md:h-[12px] lg:h-[18px]"
                  />
                  <span className="relative">Next Vision?</span>
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600"
              >
                Let's architect solutions that scale with your ambitions. Connect
                with our engineering and design team to initiate your digital
                transformation.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex w-full flex-col justify-center gap-5 sm:w-auto sm:flex-row"
              >
                <Link href="/contact" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group/btn relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-[#FFBF00] px-8 py-4 text-lg font-bold text-[#0B1F22] shadow-[0_12px_32px_-10px_rgba(255,191,0,0.55)] transition-all hover:bg-amber-400 hover:shadow-[0_18px_42px_-10px_rgba(255,191,0,0.7)] sm:w-auto md:px-10"
                  >
                    {/* Sweep */}
                    <div className="absolute inset-0 h-full w-full -translate-x-[150%] bg-gradient-to-r from-transparent via-white/55 to-transparent transition-transform duration-1000 ease-in-out group-hover/btn:translate-x-[150%]" />
                    <span className="relative z-10">Initiate Project</span>
                    <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                  </motion.button>
                </Link>

                <Link href="/portfolio" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group/btn relative inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#0E5E64]/30 bg-white px-8 py-4 text-lg font-bold text-[#0E5E64] transition-colors duration-300 hover:border-[#0E5E64] hover:bg-[#0E5E64] hover:text-white sm:w-auto md:px-10"
                  >
                    View Frameworks
                    <Terminal className="h-5 w-5 transition-colors" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
