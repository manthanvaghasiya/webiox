'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
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

  // ================= INTERNAL AUTO-LOOP (De-coupled from scroll) =================
  const internalProgress = useMotionValue(0);
  const innerScroll = useMotionValue(0); // mapped 0 to 60 for translateY %
  const innerScrollY = useMotionTemplate`-${innerScroll}%`;
  const [replayTrigger, setReplayTrigger] = useState(0);

  useEffect(() => {
    let isActive = true;
    
    const runSequence = async () => {
      // 1. Start in SSR Compiling Phase
      internalProgress.set(0);
      innerScroll.set(0);
      
      await new Promise(r => setTimeout(r, 400)); // Initial pause
      if (!isActive) return;
      
      // Phase 1: The Edge SSR Boot Logs
      await animate(internalProgress, 0.15, { duration: 0.1 }); // Log 1
      await new Promise(r => setTimeout(r, 200));
      if (!isActive) return;
      
      await animate(internalProgress, 0.3, { duration: 0.1 }); // Log 2
      await new Promise(r => setTimeout(r, 200));
      if (!isActive) return;
      
      await animate(internalProgress, 0.45, { duration: 0.1 }); // Log 3 (Compiled)
      await new Promise(r => setTimeout(r, 400));
      if (!isActive) return;
      
      // Phase 2: Snap to Render & Cinematic Scroll
      await animate(internalProgress, 1, { duration: 0.8, type: "spring", stiffness: 100, damping: 20 });
      if (!isActive) return;

      // Admire top of UI
      await new Promise(r => setTimeout(r, 600));
      if (!isActive) return;

      // Scroll to features
      await animate(innerScroll, 35, { duration: 1.5, type: "spring", stiffness: 60, damping: 15 });
      await new Promise(r => setTimeout(r, 1200));
      if (!isActive) return;

      // Scroll further down
      await animate(innerScroll, 60, { duration: 1.5, type: "spring", stiffness: 60, damping: 15 });
    };
    
    runSequence();
    return () => { isActive = false; };
  }, [internalProgress, innerScroll, replayTrigger]);

  // Phase 1 Logs Opacity
  const log1Opacity = useTransform(internalProgress, [0.05, 0.15], [0, 1]);
  const log2Opacity = useTransform(internalProgress, [0.15, 0.25], [0, 1]);
  const log3Opacity = useTransform(internalProgress, [0.25, 0.35], [0, 1]);
  const skeletonPulse = useTransform(internalProgress, [0.35, 0.45], [0.5, 1]);

  // Phase 2 Internal Animations
  const waveX = useTransform(internalProgress, [0.4, 0.8], ["-100%", "200%"]);
  const wireframeOpacity = useTransform(internalProgress, [0.45, 0.7], [1, 0]);
  const renderedOpacity = useTransform(internalProgress, [0.5, 1.0], [0, 1]);
  const renderedScale = useTransform(internalProgress, [0.5, 1.0], [0.95, 1]);

  // The Terminal elegantly slides out to give the Dashboard full width
  const terminalSize = useTransform(internalProgress, [0.5, 1.0], ["50%", "0%"]);
  const terminalOpacity = useTransform(internalProgress, [0.5, 0.8], [1, 0]);
  const uiSize = useTransform(internalProgress, [0.5, 1.0], ["50%", "100%"]);
  
  // Bento Grid Micro-Interactions (Mapped to Artificial innerScroll)
  const bento1Opacity = useTransform(innerScroll, [15, 35], [0, 1]);
  const bento1Y = useTransform(innerScroll, [15, 35], [40, 0]);
  
  const bento2Opacity = useTransform(innerScroll, [35, 55], [0, 1]);
  const bento2Y = useTransform(innerScroll, [35, 55], [40, 0]);
  
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
              
              {/* Telemetry Panel (Attached to the side on large screens) */}
              <motion.div
                 className="absolute top-12 md:top-24 right-4 md:-right-6 lg:-right-12 z-50 w-40 md:w-48 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-3 md:p-4 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col gap-2 md:gap-3 pointer-events-none"
              >
                 <span className="text-slate-400 text-[8px] md:text-[10px] uppercase font-bold tracking-widest border-b border-white/10 pb-2">Telemetry</span>
                 <div className="flex justify-between items-center text-[10px] md:text-xs font-mono">
                    <span className="text-slate-400">Latency</span>
                    <span className="text-emerald-400">12ms</span>
                 </div>
                 <motion.div className="flex justify-between items-center text-[10px] md:text-xs font-mono" style={{ opacity: renderedOpacity }}>
                    <span className="text-slate-400">Lighthouse</span>
                    <span className="text-cyan-400">100</span>
                 </motion.div>
                 <motion.div className="flex justify-between items-center text-[10px] md:text-xs font-mono" style={{ opacity: renderedOpacity }}>
                    <span className="text-slate-400">FPS</span>
                    <span className="text-white">60</span>
                 </motion.div>
                 <motion.div className="flex justify-between items-center text-[10px] md:text-xs font-mono" style={{ opacity: renderedOpacity }}>
                    <span className="text-slate-400">DOM Int.</span>
                    <span className="text-white">0.1s</span>
                 </motion.div>
              </motion.div>

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
                className="h-[var(--term-size)] md:h-auto md:w-[var(--term-size)] bg-slate-950 border-b md:border-b-0 md:border-r border-white/10 flex flex-col p-6 md:p-10 overflow-hidden shrink-0"
                style={{ opacity: terminalOpacity }}
              >
                <div className="font-mono text-xs md:text-sm leading-relaxed flex flex-col gap-4">
                  <motion.div style={{ opacity: log1Opacity }} className="text-slate-400 flex items-start gap-3">
                    <span className="text-slate-600 mt-0.5">❯</span>
                    <span>Compiling /page...<br/><span className="text-slate-500 text-[10px] md:text-xs">Generating static routes</span></span>
                  </motion.div>
                  
                  <motion.div style={{ opacity: log2Opacity }} className="text-cyan-400 flex items-start gap-3">
                    <span className="text-cyan-600 mt-0.5">❯</span>
                    <span>Edge Network Routing...<br/><span className="text-cyan-500/50 text-[10px] md:text-xs">Optimizing assets for 150+ regions</span></span>
                  </motion.div>
                  
                  <motion.div style={{ opacity: log3Opacity }} className="text-emerald-400 mt-2 font-bold flex items-center gap-3 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                    <CheckCircle2 className="w-5 h-5 shrink-0" /> 
                    <span>[Compiled Successfully in 12ms]</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* RIGHT/BOTTOM: DOM / UI Render */}
              <motion.div 
                className="h-[var(--ui-size)] md:h-auto md:w-[var(--ui-size)] bg-[#0B1120] relative shrink-0 overflow-hidden"
              >
                {/* LAYER 1: Empty Wireframe (Skeleton) */}
                <motion.div 
                  className="absolute inset-0 p-6 md:p-12 flex flex-col items-center justify-start gap-6 md:gap-8 z-0 transform-gpu will-change-opacity bg-[#0B1120]"
                  style={{ opacity: wireframeOpacity }}
                >
                  {/* Hero Skeleton */}
                  <div className="w-full flex flex-col items-center justify-center pt-8">
                    <div className="w-3/4 max-w-lg h-12 md:h-16 bg-slate-800/40 rounded-2xl border border-slate-700/40 border-dashed mb-4" />
                    <div className="w-1/2 max-w-sm h-6 md:h-8 bg-slate-800/40 rounded-xl border border-slate-700/40 border-dashed mb-8" />
                    <div className="w-32 h-10 md:h-12 bg-slate-800/40 rounded-full border border-slate-700/40 border-dashed" />
                  </div>
                  {/* Features Skeleton */}
                  <div className="w-full max-w-2xl flex-1 bg-slate-800/20 rounded-2xl border border-slate-700/40 border-dashed flex flex-col items-center justify-center mt-4">
                    <motion.span style={{ opacity: skeletonPulse }} className="text-slate-500 font-mono text-[10px] md:text-sm uppercase tracking-widest">[AWAITING SSR RENDER]</motion.span>
                  </div>
                </motion.div>

                {/* LAYER 2: Fully Rendered Scrolling Website */}
                <motion.div 
                  className="absolute inset-0 z-10 transform-gpu will-change-opacity overflow-hidden bg-[#030712]"
                  style={{ opacity: renderedOpacity, scale: renderedScale }}
                >
                  {/* Floating Metrics Overlay (Fixed relative to window) */}
                  <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50 flex flex-col gap-2 pointer-events-none">
                    <div className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-2 shadow-lg">
                      <Zap className="w-3 h-3" /> Performance: 100
                    </div>
                    <div className="bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 text-cyan-400 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-2 shadow-lg">
                      <Layout className="w-3 h-3" /> 60 FPS Scroll
                    </div>
                  </div>

                  {/* The Scrolling Content */}
                  <motion.div 
                    className="w-full flex flex-col items-center pb-32"
                    style={{ y: innerScrollY }}
                  >
                    {/* Mock Header */}
                    <div className="w-full h-16 border-b border-white/5 flex items-center justify-between px-6 md:px-8 bg-white/5 backdrop-blur-md z-20 sticky top-0">
                      <div className="font-bold text-white tracking-wider flex items-center gap-2 text-sm md:text-base">
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-gradient-to-tr from-cyan-500 to-blue-500" />
                        ACME CORP
                      </div>
                      <div className="flex gap-4">
                        <div className="w-12 md:w-16 h-2 rounded bg-white/10" />
                        <div className="w-12 md:w-16 h-2 rounded bg-white/10" />
                      </div>
                    </div>

                    {/* Hero Section */}
                    <div className="w-full px-6 md:px-8 py-16 md:py-24 flex flex-col items-center text-center relative overflow-hidden">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-cyan-500/20 blur-[80px] md:blur-[100px] rounded-full pointer-events-none" />
                      <span className="text-cyan-400 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4 z-10">Next-Gen Enterprise Web</span>
                      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight z-10 mb-4 md:mb-6">
                        Architecting the<br/>Future of Commerce
                      </h1>
                      <p className="text-slate-400 max-w-md text-xs md:text-sm mb-8 z-10">
                        Deploy sub-second storefronts with global edge networks and buttery smooth rendering.
                      </p>
                      <div className="px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-white text-black font-bold text-xs md:text-sm z-10 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform cursor-pointer">
                        Start Building
                      </div>
                    </div>

                    {/* Bento Grid Features */}
                    <div className="w-full max-w-4xl px-6 md:px-8 pb-20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* Large Card */}
                        <div className="col-span-1 md:col-span-2 h-48 md:h-64 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 relative overflow-hidden p-6 md:p-8 flex flex-col justify-end group">
                          <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-emerald-500/10 blur-[60px] md:blur-[80px] rounded-full group-hover:bg-emerald-500/20 transition-colors duration-500" />
                          <div className="absolute -top-10 -right-10 w-40 h-40 border border-white/5 rounded-full" />
                          <div className="absolute -top-20 -right-20 w-64 h-64 border border-white/5 rounded-full" />
                          <h3 className="text-lg md:text-2xl font-bold text-white z-10">Global Edge Network</h3>
                          <p className="text-slate-400 text-[10px] md:text-sm mt-2 z-10 max-w-sm">Deliver instant experiences with 0ms latency across 150+ global regions. Built for enterprise scale.</p>
                        </div>
                        {/* Small Card 1 */}
                        <motion.div 
                           className="h-40 md:h-48 rounded-2xl bg-slate-900/50 border border-white/5 p-6 relative overflow-hidden group"
                           style={{ opacity: bento1Opacity, y: bento1Y }}
                        >
                           <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-500/30">
                              <Zap className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                           </div>
                           <h3 className="text-white font-bold text-sm md:text-lg">Serverless Scaling</h3>
                           <p className="text-slate-500 text-[10px] md:text-xs mt-2">Zero config infrastructure.</p>
                        </motion.div>
                        {/* Small Card 2 */}
                        <motion.div 
                           className="h-40 md:h-48 rounded-2xl bg-slate-900/50 border border-white/5 p-6 relative overflow-hidden group"
                           style={{ opacity: bento2Opacity, y: bento2Y }}
                        >
                           <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 border border-purple-500/30">
                              <Shield className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                           </div>
                           <h3 className="text-white font-bold text-sm md:text-lg">Enterprise Security</h3>
                           <p className="text-slate-500 text-[10px] md:text-xs mt-2">DDoS protection by default.</p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

            </div>
          </motion.div>

          {/* Replay Control Pill */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
            style={{ opacity: screensOpacity }}
          >
            <button 
              onClick={() => setReplayTrigger(prev => prev + 1)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center gap-3 transition-colors group shadow-2xl"
            >
              <div className="w-4 h-4 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                <svg className="w-3 h-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
              <span className="text-white text-sm font-bold tracking-wide">Replay Render</span>
            </button>
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
