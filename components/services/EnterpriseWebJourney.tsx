'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { Terminal, Layout, CheckCircle2, Zap, Shield, Search, Smartphone, Monitor } from 'lucide-react';

export default function EnterpriseWebJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // ================= SCROLL MAPPINGS (250vh Timeline) =================

  // Phase 3 (0.7 - 1.0): Browser Pushes Back
  const desktopScale = useTransform(scrollYProgress, [0, 0.7, 1.0], [1, 1, 0.85]);
  const desktopZ = useTransform(scrollYProgress, [0, 0.7, 1.0], [0, 0, -200]);
  const blurVal = useTransform(scrollYProgress, [0.7, 0.85], [0, 12]);
  const desktopFilter = useMotionTemplate`blur(${blurVal}px)`;
  const screensOpacity = useTransform(scrollYProgress, [0.7, 0.9], [1, 0.4]);

  // Phase 2 (0.4 - 0.7): Flashing, Wave, and UI Render
  const compiledOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const waveX = useTransform(scrollYProgress, [0.4, 0.55], ["-100%", "200%"]);
  
  // Wireframe cross-fades into Rendered UI
  const wireframeOpacity = useTransform(scrollYProgress, [0.45, 0.55], [1, 0]);
  const renderedOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const renderedScale = useTransform(scrollYProgress, [0.45, 0.6], [0.95, 1]);

  // The Terminal elegantly slides out to give the Dashboard full width
  const terminalSize = useTransform(scrollYProgress, [0.5, 0.65], ["50%", "0%"]);
  const terminalOpacity = useTransform(scrollYProgress, [0.5, 0.6], [1, 0]);
  const uiSize = useTransform(scrollYProgress, [0.5, 0.65], ["50%", "100%"]);
  
  // Phase 3 (0.7 - 1.0): Lighthouse Scores Pop Out
  const scoreOpacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);
  const scoreZ = useTransform(scrollYProgress, [0.75, 0.95], [0, 200]);
  const ringProgress = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const scoreCounter = useTransform(scrollYProgress, [0.8, 1], [0, 100]);

  return (
    <div ref={containerRef} className="relative w-full h-[250vh]">
      {/* Sticky Container - No extra backgrounds/borders, just the page canvas */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Core 3D Container */}
        <motion.div 
          className="relative w-full max-w-7xl h-full flex items-center justify-center px-4"
          style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
        >

          {/* ================= DESKTOP WINDOW (Responsive Aspect Ratio) ================= */}
          <motion.div 
            className="absolute z-10 w-full max-w-6xl aspect-[4/5] md:aspect-video bg-slate-900/90 backdrop-blur-2xl rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-slate-700/50 overflow-hidden flex flex-col mx-auto"
            style={{ 
              scale: desktopScale, 
              z: desktopZ, 
              filter: desktopFilter,
              opacity: screensOpacity,
              transformStyle: "preserve-3d",
              // @ts-ignore - Pass motion values as CSS variables for responsive dimension mapping
              "--term-size": terminalSize,
              "--ui-size": uiSize
            }}
          >
            {/* macOS Browser Header */}
            <div className="h-10 md:h-12 bg-slate-950 flex items-center px-4 md:px-6 border-b border-white/10 shrink-0 relative">
              <div className="flex gap-1.5 md:gap-2 z-10">
                <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-1/2 md:w-1/3 h-6 md:h-7 bg-slate-800/50 rounded-md flex items-center justify-center px-4 border border-white/5">
                  <span className="text-[10px] md:text-xs text-slate-400 font-mono flex items-center gap-2">
                    <Monitor className="w-3 h-3" /> localhost:3000
                  </span>
                </div>
              </div>
            </div>

            {/* Browser Content Area (Responsive Split Screen) */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
              
              {/* Sweeping Data Wave (0.4 - 0.55) */}
              <motion.div 
                className="absolute inset-y-0 w-full md:w-64 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-2xl z-20 pointer-events-none"
                style={{ 
                  y: waveX, // On mobile, sweeps down
                  x: waveX, // On desktop, sweeps right (CSS media queries will handle the orientation)
                }}
              />

              {/* LEFT/TOP: Server Terminal */}
              <motion.div 
                className="h-[var(--term-size)] md:h-auto md:w-[var(--term-size)] bg-slate-950 border-b md:border-b-0 md:border-r border-white/10 flex flex-col p-4 md:p-8 overflow-hidden shrink-0"
                style={{ opacity: terminalOpacity }}
              >
                <div className="font-mono text-[10px] md:text-xs lg:text-sm leading-loose">
                  <div className="flex text-emerald-400">
                    <span className="mr-3 md:mr-6 text-slate-600 select-none">1</span>
                    <span><span className="text-pink-400">export async function</span> generateMetadata() {'{'}</span>
                  </div>
                  <div className="flex text-cyan-300">
                    <span className="mr-3 md:mr-6 text-slate-600 select-none">2</span>
                    <span className="ml-4 md:ml-6"><span className="text-pink-400">return</span> {'{'}</span>
                  </div>
                  <div className="flex text-amber-300">
                    <span className="mr-3 md:mr-6 text-slate-600 select-none">3</span>
                    <span className="ml-8 md:ml-12 flex flex-col md:inline">
                      title: <span className="text-emerald-300">'Enterprise Edge'</span>,
                    </span>
                  </div>
                  <div className="flex text-amber-300">
                    <span className="mr-3 md:mr-6 text-slate-600 select-none">4</span>
                    <span className="ml-8 md:ml-12 flex flex-col md:inline">
                      desc: <span className="text-emerald-300">'Sub-second render'</span>
                    </span>
                  </div>
                  <div className="flex text-cyan-300">
                    <span className="mr-3 md:mr-6 text-slate-600 select-none">5</span>
                    <span className="ml-4 md:ml-6">{'}'}</span>
                  </div>
                  <div className="flex text-emerald-400 mb-4 md:mb-8">
                    <span className="mr-3 md:mr-6 text-slate-600 select-none">6</span>
                    <span>{'}'}</span>
                  </div>
                  
                  {/* Compilation Status */}
                  <div className="mt-2 md:mt-6 pt-4 md:pt-6 border-t border-white/10">
                    <div className="text-slate-400 flex items-center gap-2">
                      <Zap className="w-3 h-3 md:w-4 md:h-4 text-amber-400" /> <span className="truncate">Compiling Edge Routes...</span>
                    </div>
                    <motion.div 
                      className="text-emerald-400 mt-2 md:mt-3 font-bold flex items-center gap-2 text-xs md:text-base"
                      style={{ opacity: compiledOpacity }}
                    >
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 shrink-0" /> <span className="truncate">[Compiled Successfully]</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT/BOTTOM: DOM / UI Render */}
              <motion.div 
                className="h-[var(--ui-size)] md:h-auto md:w-[var(--ui-size)] bg-[#0B1120] relative shrink-0 overflow-hidden"
              >
                {/* LAYER 1: Empty Wireframe (Skeleton) */}
                <motion.div 
                  className="absolute inset-0 p-4 md:p-10 flex flex-col gap-4 md:gap-8 z-0 transform-gpu will-change-opacity"
                  style={{ opacity: wireframeOpacity }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="w-40 md:w-56 h-6 md:h-8 bg-slate-800/40 rounded border border-slate-700/40 border-dashed" />
                    <div className="flex gap-4 md:gap-6">
                      <div className="w-20 md:w-28 h-6 md:h-8 bg-slate-800/40 rounded border border-slate-700/40 border-dashed" />
                      <div className="w-20 md:w-28 h-6 md:h-8 bg-slate-800/40 rounded border border-slate-700/40 border-dashed" />
                    </div>
                  </div>
                  <div className="w-full flex-1 bg-slate-800/20 rounded-xl md:rounded-2xl border border-slate-700/40 border-dashed flex items-center justify-center">
                    <span className="text-slate-500 font-mono text-[10px] md:text-sm uppercase tracking-widest">[AWAITING SSR RENDER]</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 md:gap-6 h-20 md:h-32">
                    <div className="w-full h-full bg-slate-800/20 rounded-xl md:rounded-2xl border border-slate-700/40 border-dashed" />
                    <div className="w-full h-full bg-slate-800/20 rounded-xl md:rounded-2xl border border-slate-700/40 border-dashed" />
                    <div className="w-full h-full bg-slate-800/20 rounded-xl md:rounded-2xl border border-slate-700/40 border-dashed hidden md:block" />
                  </div>
                </motion.div>

                {/* LAYER 2: Fully Rendered Webiox Edge Dashboard */}
                <motion.div 
                  className="absolute inset-0 p-4 md:p-10 flex flex-col gap-4 md:gap-6 bg-slate-950 z-10 transform-gpu will-change-opacity"
                  style={{ opacity: renderedOpacity, scale: renderedScale }}
                >
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 md:pb-6">
                    <div className="flex items-center gap-2 md:gap-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                        <Layout className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                      </div>
                      <span className="font-bold text-sm md:text-xl text-white tracking-wide">Webiox Edge Analytics</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-emerald-500"></span>
                      </span>
                      <span className="text-emerald-400 text-[10px] md:text-sm font-bold uppercase tracking-wider">Status: Live</span>
                    </div>
                  </div>

                  {/* Main Visual: Server Response Chart */}
                  <div className="w-full flex-1 bg-white/5 rounded-xl md:rounded-2xl border border-slate-800 p-4 md:p-8 relative overflow-hidden flex flex-col justify-between">
                    <div className="z-10 flex justify-between items-start">
                      <div>
                        <span className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest">Server Response Time</span>
                        <div className="text-2xl md:text-5xl font-black text-white mt-1 md:mt-2">12<span className="text-sm md:text-2xl text-slate-500 ml-1">ms</span></div>
                      </div>
                      <div className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[10px] md:text-xs text-slate-400 font-mono">
                        global_edge_net
                      </div>
                    </div>
                    {/* SVG Bezier Curve */}
                    <svg className="absolute bottom-0 inset-x-0 w-full h-24 md:h-40" viewBox="0 0 100 50" preserveAspectRatio="none">
                      {/* Cyan to Emerald Gradient Stroke */}
                      <defs>
                        <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                        <linearGradient id="fill-grad" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="rgba(16,185,129,0.2)" />
                          <stop offset="100%" stopColor="rgba(16,185,129,0)" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M0,45 C20,45 30,15 50,20 C70,25 80,5 100,10" 
                        fill="none" 
                        stroke="url(#line-grad)" 
                        strokeWidth="2.5" 
                        vectorEffect="non-scaling-stroke" 
                        className="drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      />
                      <path 
                        d="M0,45 C20,45 30,15 50,20 C70,25 80,5 100,10 L100,50 L0,50 Z" 
                        fill="url(#fill-grad)" 
                      />
                    </svg>
                  </div>

                  {/* Three Metric Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 h-24 md:h-32">
                    <div className="h-full bg-white/5 rounded-xl md:rounded-2xl border border-slate-800 p-3 md:p-6 flex flex-col justify-center gap-1 md:gap-2">
                      <span className="text-[10px] md:text-sm text-slate-400 uppercase tracking-wider font-bold">Uptime</span>
                      <span className="text-lg md:text-3xl font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">99.99%</span>
                    </div>
                    <div className="h-full bg-white/5 rounded-xl md:rounded-2xl border border-slate-800 p-3 md:p-6 flex flex-col justify-center gap-1 md:gap-2">
                      <span className="text-[10px] md:text-sm text-slate-400 uppercase tracking-wider font-bold">Latency</span>
                      <span className="text-lg md:text-3xl font-black text-cyan-400">12ms</span>
                    </div>
                    <div className="h-full bg-white/5 rounded-xl md:rounded-2xl border border-slate-800 p-3 md:p-6 hidden md:flex flex-col justify-center gap-1 md:gap-2">
                      <span className="text-[10px] md:text-sm text-slate-400 uppercase tracking-wider font-bold">Connections</span>
                      <span className="text-lg md:text-3xl font-black text-white">42K</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </motion.div>

          {/* ================= PHASE 4: THE PERFECT SCORE ================= */}
          <motion.div 
            className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity: scoreOpacity, z: scoreZ, transformStyle: "preserve-3d" }}
          >
            {/* Deployment Badge */}
            <motion.div 
              className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/30 px-6 md:px-8 py-2 md:py-3 rounded-full mb-8 md:mb-16 flex items-center gap-3 md:gap-4 shadow-[0_0_40px_rgba(52,211,153,0.3)]"
            >
              <div className="relative flex h-3 w-3 md:h-4 md:w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4 bg-emerald-500" />
              </div>
              <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs md:text-base">Status: Shipped & Live</span>
            </motion.div>

            {/* Lighthouse Score Rings */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 px-6 md:px-12 w-full max-w-[90%] md:max-w-5xl bg-slate-900/60 backdrop-blur-3xl p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl">
              {[
                { label: "Performance", color: "#34d399" },
                { label: "Accessibility", color: "#34d399" },
                { label: "Best Practices", color: "#34d399" },
                { label: "SEO", color: "#34d399" }
              ].map((score, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex flex-col items-center gap-6"
                >
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <motion.circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke={score.color} 
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_20px_rgba(52,211,153,0.6)]"
                        style={{ pathLength: ringProgress }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span className="text-4xl sm:text-5xl font-black text-white">
                        <Counter value={scoreCounter} />
                      </motion.span>
                    </div>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-slate-300 uppercase tracking-wider text-center">{score.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

// Safely render rounded values from Framer Motion
function Counter({ value }: { value: any }) {
  const [num, setNum] = useState(0);
  
  useEffect(() => {
    return value.on("change", (latest: number) => {
      setNum(Math.round(latest));
    });
  }, [value]);

  return <>{num}</>;
}
