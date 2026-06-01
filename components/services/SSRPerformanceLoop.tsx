'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { Terminal, Layout, Zap, Shield } from 'lucide-react';

export default function SSRPerformanceLoop() {
  const [phase, setPhase] = useState<'ssr' | 'live'>('ssr');

  useEffect(() => {
    let isActive = true;
    
    const runSequence = async () => {
      while (isActive) {
        // Phase 1: The SSR Render (0.0s - 1.0s)
        setPhase('ssr');
        await new Promise(r => setTimeout(r, 1000));
        if (!isActive) break;
        
        // Phase 2: The Render & Infinite Scroll
        setPhase('live');
        
        // Let it run for 15 seconds before looping back to SSR
        await new Promise(r => setTimeout(r, 15000));
      }
    };
    
    runSequence();
    return () => { isActive = false; };
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center p-4">
      {/* Floating Glassmorphic Metrics Overlay */}
      <div className="absolute top-8 right-0 md:-right-8 z-50 flex flex-col gap-3 pointer-events-none transition-all duration-300">
        <div className={`backdrop-blur-xl border px-4 py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-2 shadow-2xl transition-colors duration-500 ${phase === 'live' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800/50 border-slate-600/50 text-slate-300'}`}>
          <Zap className="w-4 h-4" /> 
          {phase === 'live' ? 'Performance: 100' : 'Latency: 12ms'}
        </div>
        <div className={`backdrop-blur-xl border px-4 py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-2 shadow-2xl transition-all duration-500 ${phase === 'live' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <Layout className="w-4 h-4" /> 60 FPS Scroll
        </div>
      </div>

      {/* The Container: macOS Browser Window */}
      <div className="w-full h-[500px] bg-[#0B1120] rounded-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative">
        
        {/* Mock Browser Header */}
        <div className="h-12 bg-slate-950 border-b border-white/5 flex items-center px-4 shrink-0 relative z-20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-slate-900 border border-white/5 rounded-md px-3 py-1 flex items-center gap-2">
              <Terminal className="w-3 h-3 text-slate-500" />
              <span className="text-xs text-slate-400 font-mono">
                {phase === 'ssr' ? 'Compiling Edge Routes...' : 'localhost:3000'}
              </span>
            </div>
          </div>
        </div>

        {/* Inner Content Area */}
        <div className="flex-1 relative overflow-hidden bg-[#030712]">
          
          {/* Phase 1: SSR Skeleton */}
          <motion.div 
            className="absolute inset-0 p-8 flex flex-col gap-8 z-0 transform-gpu will-change-opacity pointer-events-none bg-[#0B1120]"
            initial={false}
            animate={{ opacity: phase === 'ssr' ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-full flex flex-col items-center pt-8 gap-4">
              <div className="w-3/4 max-w-lg h-16 bg-slate-800/40 rounded-2xl border border-slate-700/40 border-dashed" />
              <div className="w-1/2 max-w-sm h-8 bg-slate-800/40 rounded-xl border border-slate-700/40 border-dashed" />
              <div className="w-32 h-12 bg-slate-800/40 rounded-full border border-slate-700/40 border-dashed mt-4" />
            </div>
            <div className="w-full max-w-3xl mx-auto flex-1 bg-slate-800/20 rounded-2xl border border-slate-700/40 border-dashed flex items-center justify-center mt-8">
              <span className="text-slate-500 font-mono text-sm uppercase tracking-widest animate-pulse">
                [AWAITING SSR RENDER]
              </span>
            </div>
          </motion.div>

          {/* Phase 2: The Real Website (Scrolling Container) */}
          <motion.div 
            className="absolute top-0 inset-x-0 h-[1500px] z-10 transform-gpu will-change-transform bg-[#030712]"
            initial={{ opacity: 0, y: "0%" }}
            animate={{ 
              opacity: phase === 'live' ? 1 : 0,
              y: phase === 'live' ? ["0%", "-50%"] : "0%"
            }}
            transition={{
              opacity: { duration: 0.3 },
              y: { 
                duration: 12, 
                ease: "linear", 
                repeat: phase === 'live' ? Infinity : 0,
                repeatType: "loop"
              }
            }}
          >
            {/* Mock Header */}
            <div className="w-full h-16 border-b border-white/5 flex items-center justify-between px-8 bg-white/5 backdrop-blur-md">
              <div className="font-bold text-white tracking-wider flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-cyan-500 to-emerald-500" />
                ENTERPRISE
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-2 rounded bg-white/10" />
                <div className="w-16 h-2 rounded bg-white/10" />
                <div className="w-16 h-2 rounded bg-white/10" />
              </div>
            </div>

            {/* Hero Section */}
            <div className="w-full px-8 py-24 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />
              <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs mb-6 z-10 border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 rounded-full">
                Edge Rendering 2.0
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight z-10 mb-6">
                Buttery Smooth<br/>Web Applications
              </h1>
              <p className="text-slate-400 max-w-lg text-sm md:text-base mb-10 z-10">
                Instantly deployed to a global edge network. Feel the weightless performance of server-side rendered React.
              </p>
              <div className="px-8 py-4 rounded-full bg-white text-black font-bold text-sm z-10 shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                Experience Performance
              </div>
            </div>

            {/* Bento Grid Features */}
            <div className="w-full max-w-5xl mx-auto px-8 pb-32">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Large Featured Card */}
                <div className="col-span-1 md:col-span-2 h-72 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 relative overflow-hidden p-8 flex flex-col justify-end">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full" />
                  <div className="absolute top-6 right-6 w-32 h-32 border border-white/10 rounded-full" />
                  <div className="absolute -top-10 -right-10 w-64 h-64 border border-white/10 rounded-full" />
                  <h3 className="text-2xl font-bold text-white z-10">Zero Layout Shift</h3>
                  <p className="text-slate-400 text-sm mt-3 z-10 max-w-sm">No more janky loading states. Your users get the perfectly rendered HTML document on the very first frame.</p>
                </div>
                {/* Small Card 1 */}
                <div className="col-span-1 h-72 rounded-3xl bg-slate-900/50 border border-white/5 p-8 relative overflow-hidden">
                   <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6 border border-cyan-500/30">
                      <Zap className="w-7 h-7 text-cyan-400" />
                   </div>
                   <h3 className="text-white font-bold text-xl mb-2">Instant Load</h3>
                   <p className="text-slate-500 text-sm">Under 50ms Time To Interactive (TTI) worldwide.</p>
                </div>
                {/* Small Card 2 */}
                <div className="col-span-1 h-72 rounded-3xl bg-slate-900/50 border border-white/5 p-8 relative overflow-hidden">
                   <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30">
                      <Shield className="w-7 h-7 text-purple-400" />
                   </div>
                   <h3 className="text-white font-bold text-xl mb-2">Secure Edge</h3>
                   <p className="text-slate-500 text-sm">Enterprise-grade security natively executed at the edge.</p>
                </div>
                {/* Wide Card */}
                <div className="col-span-1 md:col-span-2 h-72 rounded-3xl bg-slate-900/50 border border-white/5 p-8 relative overflow-hidden flex flex-col justify-center items-center text-center">
                  <h3 className="text-3xl font-black text-white mb-4">60 FPS Animations</h3>
                  <p className="text-slate-400 max-w-md">Silky smooth hardware-accelerated animations using Framer Motion and native CSS transforms.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
