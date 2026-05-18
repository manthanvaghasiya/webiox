'use client';

import { motion } from 'framer-motion';
import AiInnovationFoundry from './AiInnovationFoundry';
import { Target, Lightbulb, Award } from 'lucide-react';
import {
  AuroraStreak,
  ConstellationDots,
  MeshGradient,
  NoiseOverlay,
  type Dot,
} from './AmbientFX';

const storyDots: Dot[] = [
  { x: '4%', y: '12%', size: 2, delay: 0.5, color: 'yellow' },
  { x: '12%', y: '88%', size: 3, delay: 1.8, color: 'teal' },
  { x: '48%', y: '8%', size: 3, delay: 0.2, color: 'teal' },
  { x: '92%', y: '20%', size: 2, delay: 2.4, color: 'yellow' },
  { x: '96%', y: '78%', size: 3, delay: 1.0, color: 'teal' },
  { x: '52%', y: '94%', size: 2, delay: 2.7, color: 'yellow' },
];

const storyMesh = `radial-gradient(at 82% 12%, rgba(255,191,0,0.07) 0px, transparent 50%),
radial-gradient(at 18% 76%, rgba(14,94,100,0.07) 0px, transparent 50%),
radial-gradient(at 55% 45%, rgba(199,232,155,0.22) 0px, transparent 55%)`;

const pillars = [
  {
    icon: Target,
    title: 'Our Mission',
    body: 'To empower ambitious businesses with high-performance web applications and SaaS platforms that drive measurable growth and solve real-world problems.',
  },
  {
    icon: Lightbulb,
    title: 'Our Vision',
    body: 'To be a leading force in modern web development, setting the standard for scalable, secure, and beautifully designed digital ecosystems.',
  },
  {
    icon: Award,
    title: 'Our Promise',
    body: 'Uncompromising engineering quality. Every pixel, every API, and every interaction is crafted with obsessive attention to detail and performance.',
  },
];

export default function AboutStory() {
  return (
    <section className="py-24 relative overflow-visible bg-white">
      {/* Animated blob 1 — yellow top-right (bleeds up into AboutStats) */}
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[30%] -right-1/4 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(255,191,0,0.07),transparent_60%)] pointer-events-none blur-[110px] z-0"
      />

      {/* Animated blob 2 — teal bottom-left */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[40%] -left-1/4 w-[900px] h-[900px] bg-[radial-gradient(circle_at_center,rgba(14,94,100,0.08),transparent_60%)] pointer-events-none blur-[110px] z-0"
      />

      {/* Animated blob 3 — mint center */}
      <motion.div
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(199,232,155,0.32),transparent_60%)] pointer-events-none blur-[90px] z-0"
      />

      {/* Mesh gradient overlay */}
      <MeshGradient stops={storyMesh} />

      {/* Drifting aurora streaks */}
      <AuroraStreak position="top-[25%] -left-[20%]" color="mint" angle={-10} duration={34} />
      <AuroraStreak position="bottom-[15%] -right-[20%]" color="teal" angle={8} duration={40} reverse />

      {/* Film-grain noise overlay */}
      <NoiseOverlay />

      {/* Floating constellation dots */}
      <ConstellationDots dots={storyDots} />

      {/* Diagonal stripe overlay — subtle directional energy */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 opacity-60"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent 0, transparent 80px, rgba(14,94,100,0.025) 80px, rgba(14,94,100,0.025) 81px)',
        }}
      />

      {/* SVG accent lines on right edge */}
      <svg
        aria-hidden="true"
        className="absolute top-1/4 right-0 w-32 h-64 pointer-events-none opacity-25 z-0"
        viewBox="0 0 128 256"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C40,80 40,176 0,256"
          stroke="rgba(14,94,100,0.5)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 6"
        />
        <path
          d="M16,0 C56,80 56,176 16,256"
          stroke="rgba(255,191,0,0.4)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              {/* Label */}
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase text-[#0E5E64] bg-[#0E5E64]/10 border border-[#0E5E64]/20 mb-6">
                Our Story
              </span>

              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
                Turning business <span className="text-[#0E5E64]">complexity into automated</span> simplicity.
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed mb-10">
                Webiox exists to bridge the gap between manual struggle and digital mastery. We don't just build websites; we engineer high-performance engines that automate your most difficult tasks and solve your toughest business challenges. We identify your most difficult manual hurdles and build custom digital solutions that solve them permanently.
              </p>

              {/* Pillars */}
              <div className="flex flex-col gap-4">
                {pillars.map(({ icon: Icon, title, body }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.55 }}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-[#0E5E64]/10 hover:border-[#0E5E64]/30 hover:shadow-[0_12px_30px_rgba(14,94,100,0.06)] transition-all duration-300 group relative z-10"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#0E5E64]/5 border border-[#0E5E64]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0E5E64] group-hover:shadow-[0_0_15px_rgba(14,94,100,0.2)] transition-all duration-500">
                      <Icon className="w-5 h-5 text-[#0E5E64] group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-0.5">{title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full flex items-center justify-center"
          >
            <AiInnovationFoundry />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
