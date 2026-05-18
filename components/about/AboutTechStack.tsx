'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Code2, Globe, Database, Layers, Wind, Zap,
  Server, GitBranch, Package, Cloud, Cpu, Layout, Fingerprint
} from 'lucide-react';
import { staggerContainer, fadeUpVariant } from '../../lib/motion/about';

const BentoCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    variants={fadeUpVariant}
    whileHover={{ y: -5 }}
    className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#F9FAFB]/5 to-[#F9FAFB]/[0.02] border border-[#F9FAFB]/10 backdrop-blur-sm p-8 group transition-all duration-500 hover:border-[#FFBF00]/30 hover:shadow-[0_20px_40px_rgba(255,191,0,0.05)] ${className}`}
  >
    {children}
  </motion.div>
);

const TechIcon = ({ name, icon: Icon, color, delay }: any) => (
  <motion.div 
    initial={{ x: -15, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay, type: "spring" }}
    viewport={{ once: true }}
    className="flex items-center gap-3 group cursor-default"
  >
    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#0E5E64]/80 border border-[#F9FAFB]/10 flex items-center justify-center group-hover:bg-[#F9FAFB]/15 transition-colors duration-300 shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]">
      <Icon className={`w-4 h-4 ${color}`} strokeWidth={2} />
    </div>
    <span className="text-xs font-semibold tracking-widest text-[#F9FAFB]/80 uppercase group-hover:text-[#F9FAFB] transition-colors">{name}</span>
  </motion.div>
);

export default function AboutTechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-32 bg-[#0E5E64] relative overflow-hidden" ref={ref}>
      
      {/* Immersive Infinite Marquee Background */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.03] overflow-hidden z-0 py-20">
        <motion.h1 
          animate={{ x: [0, -2000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
          className="text-[15vw] font-bold font-[Zain] uppercase whitespace-nowrap text-[#F9FAFB] leading-none"
        >
          ENGINEERING EXCELLENCE • NEXT GEN STACK • ENGINEERING EXCELLENCE • NEXT GEN STACK
        </motion.h1>
        <motion.h1 
          animate={{ x: [-2000, 0] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
          className="text-[15vw] font-bold font-[Zain] uppercase whitespace-nowrap text-[#F9FAFB] leading-none"
        >
          SCALABLE ARCHITECTURE • PERFORMANCE FIRST • SCALABLE ARCHITECTURE • PERFORMANCE FIRST
        </motion.h1>
      </div>

      {/* Lighting Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFBF00]/5 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center md:text-left mb-16 lg:mb-24 max-w-3xl"
        >
          <motion.div variants={fadeUpVariant} className="flex items-center justify-center md:justify-start gap-3 mb-6">
            <Cpu className="w-5 h-5 text-[#FFBF00]" />
            <span className="text-[#FFBF00] font-semibold tracking-[0.2em] uppercase text-xs">
              The Architecture
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-[#FFBF00] to-transparent" />
          </motion.div>
          <motion.h2 variants={fadeUpVariant} className="text-5xl md:text-6xl lg:text-7xl font-bold font-[Zain] text-[#F9FAFB] mb-6 tracking-tight leading-[1.1]">
            Powered by Elite <br/>
            <span className="text-transparent" style={{ WebkitTextStroke: "1px #F9FAFB" }}>Modern Tech.</span>
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-[#F9FAFB]/70 font-[IBM_Plex_Sans] leading-relaxed max-w-2xl">
            We don't just build websites; we engineer scalable digital infrastructures using the industry's most powerful and bleeding-edge frameworks.
          </motion.p>
        </motion.div>

        {/* Bento Box Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {/* Main Core Engine - Large Square / Wide Rectangle */}
          <BentoCard className="lg:col-span-2 lg:row-span-2 flex flex-col lg:flex-row gap-8 justify-between p-8 lg:p-12 border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.05)]">
            
            {/* Left Side Content & Tech Stack */}
            <div className="flex flex-col lg:w-1/2 z-10">
              <div className="mb-8">
                <Layers className="w-8 h-8 text-[#FFBF00] mb-4" />
                <h3 className="text-3xl font-[Alice] text-[#F9FAFB] mb-2">The Core Engine</h3>
                <p className="text-[#F9FAFB]/60 font-[IBM_Plex_Sans]">Server-side rendered, strictly typed, and built for absolute maximum performance and zero layout shifts.</p>
              </div>

              {/* 4 Items in a straight vertical line */}
              <div className="flex flex-col gap-4">
                <TechIcon name="Next.js 16" icon={Globe} color="text-white" delay={0.1} />
                <TechIcon name="React 19" icon={Code2} color="text-cyan-400" delay={0.2} />
                <TechIcon name="TypeScript" icon={Code2} color="text-blue-400" delay={0.3} />
                <TechIcon name="Tailwind v4" icon={Wind} color="text-teal-400" delay={0.4} />
              </div>
            </div>

            {/* Right Side: Long Vertical Animation */}
            <div className="flex-1 flex flex-col items-center justify-center relative min-h-[300px] lg:min-h-full py-8 lg:py-0 border-t lg:border-t-0 lg:border-l border-[#F9FAFB]/10">
              
              {/* Vertical Data Line */}
              <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#0E5E64] to-transparent">
                <motion.div 
                  className="w-full h-32 bg-gradient-to-b from-transparent via-[#FFBF00] to-transparent shadow-[0_0_15px_#FFBF00]"
                  animate={{ y: [-150, 400] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Lighthouse Score (Centered vertically in the line) */}
              <div className="relative w-40 h-40 lg:w-48 lg:h-48 flex items-center justify-center my-auto bg-[#0E5E64]/30 rounded-full border border-[#F9FAFB]/5 backdrop-blur-sm shadow-[inset_0_0_40px_rgba(14,94,100,0.5)] z-10">
                {/* Background Track */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="50%" cy="50%" r="42%" stroke="#0E5E64" strokeWidth="4" fill="none" className="opacity-30" />
                  {/* Animated Progress Ring */}
                  <motion.circle 
                    cx="50%" cy="50%" r="42%" 
                    stroke="#FFBF00" strokeWidth="4" fill="none" 
                    strokeLinecap="round"
                    strokeDasharray="1000"
                    initial={{ strokeDashoffset: 1000 }}
                    whileInView={{ strokeDashoffset: 0 }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </svg>
                {/* Complex Holographic Core */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5, type: "spring" }}
                  viewport={{ once: true }}
                  className="absolute inset-2 lg:inset-3 rounded-full bg-gradient-to-br from-[#FFBF00]/20 to-[#0E5E64]/20 border border-[#FFBF00]/40 shadow-[0_0_50px_rgba(255,191,0,0.6),inset_0_0_20px_rgba(255,191,0,0.3)] flex flex-col items-center justify-center backdrop-blur-md overflow-hidden"
                >
                  {/* Internal Spinning Dashed Ring */}
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border-[2px] border-dashed border-[#FFBF00]/30"
                  />
                  
                  {/* Pulse Effect Background */}
                  <motion.div 
                    animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-[#FFBF00]/30"
                  />

                  {/* Core Value */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#FFBF00] font-[Zain] leading-none drop-shadow-[0_0_15px_rgba(255,191,0,0.8)]">99</span>
                    <div className="flex items-center gap-1.5 mt-1 bg-[#0E5E64]/80 px-2 py-0.5 rounded-full border border-[#FFBF00]/50 shadow-[0_0_10px_rgba(255,191,0,0.3)]">
                      <Zap className="w-2.5 h-2.5 text-[#FFBF00] fill-[#FFBF00]" />
                      <span className="text-[9px] text-white uppercase tracking-[0.2em] font-bold">Perf</span>
                    </div>
                  </div>
                </motion.div>

                {/* Orbiting Particle */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-4px]"
                >
                  <div className="w-2.5 h-2.5 bg-white rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_15px_#ffffff]" />
                </motion.div>
              </div>
            </div>

            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-400/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-cyan-400/20 transition-colors duration-700 z-0" />
          </BentoCard>

          {/* Data & Backend - Wide Rectangle */}
          <BentoCard className="lg:col-span-2 lg:row-span-1 flex flex-col justify-between bg-gradient-to-br from-emerald-900/20 to-transparent border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.05)]">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <Database className="w-8 h-8 text-emerald-400 mb-3 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <h3 className="text-2xl font-[Alice] text-[#F9FAFB] mb-1">Data Layer</h3>
                <p className="text-[#F9FAFB]/70 font-[IBM_Plex_Sans] text-sm max-w-sm">Secure, high-availability data infrastructure handling millions of queries seamlessly.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <TechIcon name="Node.js" icon={Server} color="text-green-400" delay={0.2} />
              <TechIcon name="MongoDB" icon={Database} color="text-emerald-400" delay={0.3} />
              <TechIcon name="PostgreSQL" icon={Database} color="text-sky-400" delay={0.4} />
              <TechIcon name="Security" icon={Fingerprint} color="text-violet-400" delay={0.5} />
            </div>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-400/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-400/20 transition-colors duration-700" />
          </BentoCard>

          {/* Global Infrastructure - Small Square */}
          <BentoCard className="lg:col-span-1 lg:row-span-1 flex flex-col justify-between bg-gradient-to-br from-orange-900/20 to-transparent border-orange-500/20 shadow-[0_0_40px_rgba(249,115,22,0.05)]">
            <div className="mb-6">
              <Cloud className="w-7 h-7 text-orange-400 mb-3 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
              <h3 className="text-xl font-[Alice] text-[#F9FAFB] mb-1">Infrastructure</h3>
              <p className="text-[#F9FAFB]/70 font-[IBM_Plex_Sans] text-xs">Global CDN networks.</p>
            </div>
            <div className="flex flex-col gap-4 mt-auto">
              <TechIcon name="AWS" icon={Cloud} color="text-orange-400" delay={0.4} />
              <TechIcon name="Docker" icon={Package} color="text-blue-300" delay={0.5} />
            </div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-orange-400/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-orange-400/20 transition-colors duration-700" />
          </BentoCard>

          {/* Visceral Motion - Small Square */}
          <BentoCard className="lg:col-span-1 lg:row-span-1 flex flex-col justify-between bg-gradient-to-br from-purple-900/20 to-transparent border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.05)]">
            <div className="mb-6">
              <Zap className="w-7 h-7 text-purple-400 mb-3 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              <h3 className="text-xl font-[Alice] text-[#F9FAFB] mb-1">Motion</h3>
              <p className="text-[#F9FAFB]/70 font-[IBM_Plex_Sans] text-xs">Fluid physics animations.</p>
            </div>
            <div className="flex flex-col gap-4 mt-auto">
              <TechIcon name="Framer" icon={Layout} color="text-purple-400" delay={0.3} />
              <TechIcon name="WebGL" icon={Globe} color="text-pink-400" delay={0.4} />
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-purple-400/20 transition-colors duration-700" />
          </BentoCard>

        </motion.div>
      </div>
    </section>
  );
}
