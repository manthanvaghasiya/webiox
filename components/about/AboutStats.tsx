'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Briefcase, Users, Calendar, ThumbsUp } from 'lucide-react';
import {
  AuroraStreak,
  ConstellationDots,
  MeshGradient,
  NoiseOverlay,
  type Dot,
} from './AmbientFX';

const statsDots: Dot[] = [
  { x: '6%', y: '18%', size: 3, delay: 0, color: 'teal' },
  { x: '22%', y: '74%', size: 2, delay: 1.4, color: 'yellow' },
  { x: '38%', y: '32%', size: 4, delay: 0.7, color: 'teal' },
  { x: '64%', y: '14%', size: 2, delay: 2.1, color: 'yellow' },
  { x: '82%', y: '62%', size: 3, delay: 1.1, color: 'teal' },
  { x: '93%', y: '28%', size: 2, delay: 2.8, color: 'yellow' },
  { x: '14%', y: '52%', size: 3, delay: 1.7, color: 'teal' },
  { x: '55%', y: '82%', size: 2, delay: 0.4, color: 'yellow' },
];

const statsMesh = `radial-gradient(at 15% 18%, rgba(14,94,100,0.07) 0px, transparent 50%),
radial-gradient(at 85% 32%, rgba(255,191,0,0.06) 0px, transparent 50%),
radial-gradient(at 50% 95%, rgba(199,232,155,0.32) 0px, transparent 55%)`;

const stats = [
  { icon: Briefcase, value: 5, suffix: '+', label: 'Projects Delivered', desc: 'From MVPs to enterprise platforms' },
  { icon: Users, value: 5, suffix: '+', label: 'Happy Clients', desc: 'Across countries worldwide' },
  { icon: Calendar, value: 5, suffix: '', label: 'Months of Excellence', desc: 'Building products since 2026' },
  { icon: ThumbsUp, value: 100, suffix: '%', label: 'Client Satisfaction', desc: '5-star rated on every delivery' },
];

function useCountUp(target: number, isInView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const totalFrames = Math.round((duration / 1000) * 60);
    const increment = target / totalFrames;
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      start = Math.min(Math.round(increment * frame), target);
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return count;
}

const StatCard = ({ icon: Icon, value, suffix, label, desc, delay }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const count = useCountUp(value, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="relative group bg-white/60 backdrop-blur-md rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#0E5E64]/10 hover:border-[#0E5E64]/30 hover:shadow-[0_20px_40px_rgba(14,94,100,0.1)] transition-all duration-500 overflow-hidden cursor-default z-10"
    >
      {/* Dynamic Background Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFBF00]/0 to-[#FFBF00]/0 group-hover:from-[#FFBF00]/5 group-hover:to-[#0E5E64]/5 transition-all duration-700" />

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 h-[3px] w-full bg-[#FFBF00] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out rounded-t-2xl" />

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-[#0E5E64]/5 border border-[#0E5E64]/10 flex items-center justify-center mb-8 group-hover:bg-[#0E5E64] group-hover:shadow-[0_0_20px_rgba(14,94,100,0.3)] transition-all duration-500 transform group-hover:-rotate-6">
        <Icon className="w-6 h-6 text-[#0E5E64] group-hover:text-white transition-colors duration-500" />
      </div>

      {/* Count */}
      <div className="flex items-end gap-1 mb-3 relative z-10">
        <span className="text-5xl font-black text-gray-900 tabular-nums leading-none tracking-tight group-hover:text-[#0E5E64] transition-colors duration-300">
          {count}
        </span>
        <span className="text-3xl font-black text-[#FFBF00] leading-none pb-0.5">{suffix}</span>
      </div>

      {/* Label */}
      <p className="text-lg font-bold text-gray-900 mb-2 relative z-10">{label}</p>
      <p className="text-sm text-gray-500 leading-relaxed font-light relative z-10">{desc}</p>
    </motion.div>
  );
};

export default function AboutStats() {
  return (
    <section className="py-24 relative overflow-visible bg-white">
      {/* Animated blob 1 — teal top-left */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[20%] -left-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(14,94,100,0.08),transparent_60%)] pointer-events-none blur-[90px] z-0"
      />

      {/* Animated blob 2 — yellow right */}
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/4 -right-1/4 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(255,191,0,0.07),transparent_60%)] pointer-events-none blur-[100px] z-0"
      />

      {/* Animated blob 3 — mint bottom-center */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute -bottom-[10%] left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(199,232,155,0.45),transparent_60%)] pointer-events-none blur-[80px] z-0"
      />

      {/* Mesh gradient overlay — multi-stop color depth */}
      <MeshGradient stops={statsMesh} />

      {/* Drifting aurora streaks */}
      <AuroraStreak position="top-[20%] -left-[20%]" color="yellow" angle={-8} duration={32} />
      <AuroraStreak position="bottom-[10%] -right-[20%]" color="teal" angle={6} duration={36} reverse />

      {/* Film-grain noise overlay */}
      <NoiseOverlay />

      {/* Floating constellation dots */}
      <ConstellationDots dots={statsDots} />

      {/* Subtle dot grid with vignette mask */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(14,94,100,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      {/* Topographic SVG accent at top */}
      <svg
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-40 pointer-events-none opacity-40 z-0"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 Q360,10 720,40 T1440,40"
          stroke="rgba(14,94,100,0.3)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="6 6"
        />
        <path
          d="M0,80 Q360,50 720,80 T1440,80"
          stroke="rgba(14,94,100,0.2)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M0,120 Q360,90 720,120 T1440,120"
          stroke="rgba(255,191,0,0.3)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="2 8"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
