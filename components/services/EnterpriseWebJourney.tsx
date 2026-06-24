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
  const innerScroll = useMotionValue("0%");

  useEffect(() => {
    let isActive = true;
    
    const runSequence = async () => {
      while (isActive) {
        // 1. Start in SSR Compiling Phase
        internalProgress.set(0);
        innerScroll.set("0%");
        await new Promise(r => setTimeout(r, 600)); // 0.6s Compiling...
        if (!isActive) break;
        
        // 2. Flash "Compiled Successfully"
        await animate(internalProgress, 0.4, { duration: 0.2 });
        await new Promise(r => setTimeout(r, 300)); // Hold for 0.3s
        if (!isActive) break;
        
        // 3. Sweep wave & crossfade to Live UI
        await animate(internalProgress, 1, { duration: 0.8, ease: "easeInOut" });
        if (!isActive) break;

        // 4. Admire the top of the UI
        await new Promise(r => setTimeout(r, 600));
        if (!isActive) break;

        // 5. Scroll down to features
        await animate(innerScroll, "-35%", { duration: 1.2, ease: "easeInOut" });
        await new Promise(r => setTimeout(r, 1200));
        if (!isActive) break;

        // 6. Scroll further down
        await animate(innerScroll, "-60%", { duration: 1.2, ease: "easeInOut" });
        await new Promise(r => setTimeout(r, 1500));
      }
    };
    
    runSequence();
    return () => { isActive = false; };
  }, [internalProgress, innerScroll]);

  // Phase 2 Internal Animations (Driven by Auto-Loop)
  const compiledOpacity = useTransform(internalProgress, [0.2, 0.4], [0, 1]);
  const waveX = useTransform(internalProgress, [0.2, 0.8], ["-100%", "200%"]);
  
  // Wireframe cross-fades into Rendered UI
  const wireframeOpacity = useTransform(internalProgress, [0.4, 0.7], [1, 0]);
  const renderedOpacity = useTransform(internalProgress, [0.5, 1.0], [0, 1]);
  const renderedScale = useTransform(internalProgress, [0.5, 1.0], [0.95, 1]);

  // The Terminal elegantly slides out to give the Dashboard full width
  const terminalSize = useTransform(internalProgress, [0.5, 1.0], ["50%", "0%"]);
  const terminalOpacity = useTransform(internalProgress, [0.5, 0.8], [1, 0]);
  const uiSize = useTransform(internalProgress, [0.5, 1.0], ["50%", "100%"]);
  
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
          className="relative w-full max-w-7xl h-full flex items-center justify-center px-3 sm:px-6 lg:px-8"
          style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
        >

          {/* ================= DESKTOP WINDOW (Responsive Aspect Ratio) ================= */}
          <motion.div 
            className="relative z-10 w-full max-w-full h-[80vh] md:h-[600px] lg:h-auto lg:aspect-video bg-slate-900/90 backdrop-blur-2xl rounded-xl md:rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-slate-700/50 overflow-hidden flex flex-col mx-auto"
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
            <div className="h-10 md:h-12 bg-slate-950 flex items-center px-4 md:px-6 border-b border-white/10 shrink-0 flex-shrink-0 relative">
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
                className="h-[var(--term-size)] md:h-auto md:w-[var(--term-size)] bg-slate-950 border-b md:border-b-0 md:border-r border-white/10 flex flex-col overflow-hidden shrink-0"
                style={{ opacity: terminalOpacity }}
              >
                <div className="p-4 md:p-8 min-w-[280px] md:min-w-[400px]">
                  <div className="font-mono text-[10px] md:text-xs lg:text-sm leading-loose whitespace-nowrap overflow-hidden">
                    <div className="flex items-baseline text-emerald-400">
                    <span className="w-4 md:w-6 mr-2 md:mr-4 text-slate-600 select-none flex-shrink-0 text-right">1</span>
                    <span><span className="text-pink-400">export async function</span> generateMetadata() {'{'}</span>
                  </div>
                  <div className="flex items-baseline text-cyan-300">
                    <span className="w-4 md:w-6 mr-2 md:mr-4 text-slate-600 select-none flex-shrink-0 text-right">2</span>
                    <span className="ml-4 md:ml-6"><span className="text-pink-400">return</span> {'{'}</span>
                  </div>
                  <div className="flex items-baseline text-amber-300">
                    <span className="w-4 md:w-6 mr-2 md:mr-4 text-slate-600 select-none flex-shrink-0 text-right">3</span>
                    <span className="ml-8 md:ml-12">title: <span className="text-emerald-300">'Enterprise Edge'</span>,</span>
                  </div>
                  <div className="flex items-baseline text-amber-300">
                    <span className="w-4 md:w-6 mr-2 md:mr-4 text-slate-600 select-none flex-shrink-0 text-right">4</span>
                    <span className="ml-8 md:ml-12">desc: <span className="text-emerald-300">'Sub-second render'</span></span>
                  </div>
                  <div className="flex items-baseline text-cyan-300">
                    <span className="w-4 md:w-6 mr-2 md:mr-4 text-slate-600 select-none flex-shrink-0 text-right">5</span>
                    <span className="ml-4 md:ml-6">{'}'}</span>
                  </div>
                  <div className="flex items-baseline text-emerald-400 mb-4 md:mb-8">
                    <span className="w-4 md:w-6 mr-2 md:mr-4 text-slate-600 select-none flex-shrink-0 text-right">6</span>
                    <span>{'}'}</span>
                  </div>
                  
                  {/* Compilation Status */}
                  <div className="mt-2 md:mt-6 pt-4 md:pt-6 border-t border-white/10">
                    <div className="text-slate-400 flex items-center gap-2">
                      <Zap className="w-3 h-3 md:w-4 md:h-4 text-amber-400 shrink-0" /> <span className="truncate">Compiling Edge Routes...</span>
                    </div>
                    <motion.div 
                      className="text-emerald-400 mt-2 md:mt-3 font-bold flex items-center gap-2 text-[10px] md:text-sm lg:text-base"
                      style={{ opacity: compiledOpacity }}
                    >
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 shrink-0" /> <span className="truncate">[Compiled Successfully]</span>
                    </motion.div>
                  </div>
                </div>
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
                    <span className="text-slate-500 font-mono text-[10px] md:text-sm uppercase tracking-widest">[AWAITING SSR RENDER]</span>
                  </div>
                </motion.div>

                {/* LAYER 2: Fully Rendered Scrolling Website */}
                <motion.div 
                  className="absolute inset-0 z-10 transform-gpu will-change-opacity overflow-hidden bg-[#030712]"
                  style={{ opacity: renderedOpacity, scale: renderedScale }}
                >
                  {/* Floating Metrics Overlay (Fixed relative to window) */}
                  <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50 flex flex-col gap-2 pointer-events-none">
                    <div className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-emerald-400 px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[8px] sm:text-[10px] md:text-xs font-bold flex items-center gap-1 sm:gap-2 shadow-lg">
                      <Zap className="w-2 h-2 sm:w-3 sm:h-3" /> Performance: 100
                    </div>
                    <div className="bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 text-cyan-400 px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[8px] sm:text-[10px] md:text-xs font-bold flex items-center gap-1 sm:gap-2 shadow-lg">
                      <Layout className="w-2 h-2 sm:w-3 sm:h-3" /> 60 FPS Scroll
                    </div>
                  </div>

                  {/* The Scrolling Content */}
                  <motion.div 
                    className="w-full flex flex-col items-center pb-32"
                    style={{ y: innerScroll }}
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
                        <div className="h-40 md:h-48 rounded-2xl bg-slate-900/50 border border-white/5 p-6 relative overflow-hidden group">
                           <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-500/30">
                              <Zap className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                           </div>
                           <h3 className="text-white font-bold text-sm md:text-lg">Serverless Scaling</h3>
                           <p className="text-slate-500 text-[10px] md:text-xs mt-2">Zero config infrastructure.</p>
                        </div>
                        {/* Small Card 2 */}
                        <div className="h-40 md:h-48 rounded-2xl bg-slate-900/50 border border-white/5 p-6 relative overflow-hidden group">
                           <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 border border-purple-500/30">
                              <Shield className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                           </div>
                           <h3 className="text-white font-bold text-sm md:text-lg">Enterprise Security</h3>
                           <p className="text-slate-500 text-[10px] md:text-xs mt-2">DDoS protection by default.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
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
              className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/30 px-4 sm:px-6 md:px-8 py-2 md:py-3 rounded-full mb-6 sm:mb-8 md:mb-16 flex items-center gap-2 sm:gap-3 md:gap-4 shadow-[0_0_40px_rgba(52,211,153,0.3)]"
            >
              <div className="relative flex h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 bg-emerald-500" />
              </div>
              <span className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs md:text-base">Status: Shipped & Live</span>
            </motion.div>

            {/* Lighthouse Score Rings */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-12 w-full max-w-[95%] md:max-w-5xl bg-slate-900/60 backdrop-blur-3xl p-4 sm:p-6 md:p-12 rounded-[1.5rem] md:rounded-[3rem] border border-white/10 shadow-2xl">
              {[
                { label: "Performance", color: "#34d399" },
                { label: "Accessibility", color: "#34d399" },
                { label: "Best Practices", color: "#34d399" },
                { label: "SEO", color: "#34d399" }
              ].map((score, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex flex-col items-center gap-3 sm:gap-6"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
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
                      <motion.span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white">
                        <Counter value={scoreCounter} />
                      </motion.span>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold text-slate-300 uppercase tracking-wider text-center">{score.label}</span>
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
