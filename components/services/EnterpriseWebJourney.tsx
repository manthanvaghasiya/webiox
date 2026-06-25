'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { Layout, CheckCircle2, Zap, Shield, Monitor, Code2, Cpu, RotateCcw } from 'lucide-react';

export default function EnterpriseWebJourney() {
  const [phase, setPhase] = useState<'idle' | 'optimizing' | 'live'>('idle');
  const [holdProgress, setHoldProgress] = useState(0);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const [score, setScore] = useState(42);
  const animatedScore = useMotionValue(42);

  const [logs, setLogs] = useState<string[]>([]);
  
  const startHold = () => {
    if (phase !== 'idle') return;
    let progress = 0;
    setPhase('optimizing');
    
    // Animate score from 42 to 99
    animate(animatedScore, 99, {
      duration: 1.5,
      ease: "circOut",
      onUpdate: (latest) => setScore(Math.round(latest))
    });

    const optimizationLogs = [
      "Analyzing bundle size...",
      "Extracting critical CSS...",
      "Converting to React Server Components...",
      "Optimizing images to WebP...",
      "Deploying to Edge Network...",
      "Bypassing Node.js runtime...",
      "Sub-second TTFB achieved."
    ];
    
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < optimizationLogs.length) {
        setLogs(prev => [...prev, optimizationLogs[logIndex]]);
        logIndex++;
      }
    }, 200);

    holdIntervalRef.current = setInterval(() => {
      progress += 1.5; // 1.5% every 20ms = ~1.3 seconds
      if (progress >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        clearInterval(logInterval);
        setHoldProgress(100);
        setPhase('live');
        setScore(100);
        animatedScore.set(100);
      } else {
        setHoldProgress(progress);
      }
    }, 20);
  };

  const cancelHold = () => {
    if (holdProgress < 100 && phase === 'optimizing') {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
      setHoldProgress(0);
      setPhase('idle');
      setScore(42);
      animatedScore.set(42);
      setLogs([]);
    }
  };

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  const reset = () => {
    setPhase('idle');
    setHoldProgress(0);
    setScore(42);
    animatedScore.set(42);
    setLogs([]);
  };

  return (
    <div className="w-full h-full bg-[#020617] relative flex flex-col md:flex-row overflow-hidden font-sans text-slate-300">
      
      {/* LEFT COLUMN: Terminal / Optimizer */}
      <div className="w-full md:w-5/12 h-1/2 md:h-full bg-[#090D16] border-b md:border-b-0 md:border-r border-white/5 flex flex-col relative z-10 shrink-0">
        <div className="h-10 md:h-12 bg-[#05080F] border-b border-white/5 flex items-center px-4 shrink-0">
          <div className="flex gap-1.5 md:gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
          </div>
          <div className="ml-4 flex items-center text-[10px] md:text-xs text-slate-500 font-mono gap-2">
            <Cpu className="w-3 h-3" /> Webiox Engine
          </div>
        </div>
        
        <div className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col relative">
          
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex flex-col">
              <span className="text-xs md:text-sm text-slate-400 font-mono mb-1">Lighthouse Score</span>
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl md:text-5xl font-black tracking-tighter ${score < 50 ? 'text-rose-500' : score < 90 ? 'text-amber-500' : 'text-emerald-400'}`}>
                  {score}
                </span>
                <span className="text-sm md:text-base text-slate-600 font-medium">/ 100</span>
              </div>
            </div>
            {phase === 'live' && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                onClick={reset}
                className="w-8 h-8 rounded-full bg-slate-800/50 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-slate-300" />
              </motion.button>
            )}
          </div>

          <div className="flex-1 font-mono text-[10px] md:text-xs text-slate-400 flex flex-col gap-1.5 md:gap-2 overflow-y-auto">
            {phase === 'idle' && (
              <div className="text-rose-400/80 flex items-start gap-2">
                <span className="text-rose-500/50">{'>'}</span> 
                Warning: Main thread blocked for 840ms. Large JS payloads detected.
              </div>
            )}
            
            <AnimatePresence>
              {logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-cyan-500/50">{'>'}</span>
                  <span className={i === logs.length - 1 && phase === 'live' ? 'text-emerald-400' : 'text-slate-300'}>{log}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Action Bar */}
          <div className="mt-4 pt-4 border-t border-white/5 relative">
            <AnimatePresence mode="wait">
              {phase === 'idle' || phase === 'optimizing' ? (
                <motion.div 
                  key="hold-btn"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="relative h-12 w-full rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden cursor-pointer select-none"
                  onMouseDown={startHold}
                  onMouseUp={cancelHold}
                  onMouseLeave={cancelHold}
                  onTouchStart={startHold}
                  onTouchEnd={cancelHold}
                >
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-cyan-400"
                    style={{ width: `${holdProgress}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 pointer-events-none">
                    <Zap className={`w-4 h-4 ${holdProgress > 0 ? 'text-white' : 'text-emerald-400'}`} />
                    <span className={`text-sm font-bold tracking-wide uppercase ${holdProgress > 0 ? 'text-white' : 'text-slate-300'}`}>
                      {holdProgress > 0 ? 'Optimizing...' : 'Hold to Optimize'}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="success-btn"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="h-12 w-full rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center gap-2 text-emerald-400 font-bold"
                >
                  <CheckCircle2 className="w-4 h-4" /> Edge SSR Active
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Browser UI */}
      <div className="flex-1 relative bg-[#020617] overflow-hidden flex items-center justify-center p-4 md:p-8">
        
        {/* Wireframe (Idle / Optimizing) */}
        <AnimatePresence>
          {(phase === 'idle' || phase === 'optimizing') && (
            <motion.div 
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10"
            >
              <div className="w-full max-w-lg">
                <motion.div 
                  animate={phase === 'optimizing' ? { opacity: [1, 0.5, 1], filter: ['blur(0px)', 'blur(4px)', 'blur(0px)'] } : {}}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-full flex flex-col items-center gap-6"
                >
                  <div className="w-3/4 h-12 md:h-16 bg-slate-800/40 rounded-2xl border border-slate-700/40 border-dashed" />
                  <div className="w-1/2 h-6 md:h-8 bg-slate-800/40 rounded-xl border border-slate-700/40 border-dashed" />
                  <div className="w-32 h-10 md:h-12 bg-slate-800/40 rounded-full border border-slate-700/40 border-dashed mt-4" />
                  
                  <div className="w-full h-48 bg-slate-800/20 rounded-2xl border border-slate-700/40 border-dashed mt-8 flex items-center justify-center">
                    <Monitor className="w-12 h-12 text-slate-700/50" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Award-Winning UI */}
        <AnimatePresence>
          {phase === 'live' && (
            <motion.div 
              initial={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 z-20 overflow-hidden"
            >
              {/* Gorgeous Abstract Background */}
              <div className="absolute inset-0 bg-slate-950">
                <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] rounded-full bg-emerald-500/20 blur-[100px]" />
                <div className="absolute -bottom-[40%] -left-[40%] w-[80%] h-[80%] rounded-full bg-cyan-500/20 blur-[100px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
              </div>

              <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-8">
                {/* Navbar Mock */}
                <div className="absolute top-0 inset-x-0 h-12 sm:h-16 border-b border-white/5 flex items-center justify-between px-4 sm:px-8 backdrop-blur-xl">
                  <div className="w-16 sm:w-24 h-4 sm:h-5 bg-white/90 rounded-md" />
                  <div className="flex gap-4 sm:gap-6">
                    <div className="w-8 sm:w-12 h-1.5 sm:h-2 bg-white/20 rounded-full" />
                    <div className="w-12 sm:w-16 h-1.5 sm:h-2 bg-white/20 rounded-full" />
                    <div className="w-8 sm:w-12 h-1.5 sm:h-2 bg-white/20 rounded-full" />
                  </div>
                </div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                  className="text-center flex flex-col items-center mt-12 sm:mt-16"
                >
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-bold mb-4 sm:mb-6">
                    <Zap className="w-3 h-3" /> Server-Side Rendered
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-3 sm:mb-4 leading-none">
                    Award-Winning <br className="sm:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Speed.</span>
                  </h1>
                  <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-[250px] sm:max-w-sm mb-6 sm:mb-8 leading-relaxed">
                    Instantly load your storefront. Convert more customers with zero-delay architecture.
                  </p>
                  
                  <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
                    <button className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white text-slate-900 font-bold text-xs sm:text-sm shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">
                      Explore
                    </button>
                    <button className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/5 text-white border border-white/10 font-bold text-xs sm:text-sm hover:bg-white/10 transition-colors">
                      View Lookbook
                    </button>
                  </div>
                </motion.div>
                
                {/* Glassmorphic Product Cards */}
                <motion.div 
                  initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                  className="w-full max-w-2xl mt-8 sm:mt-12 grid grid-cols-3 gap-2 sm:gap-4 px-2 sm:px-0"
                >
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-[4/5] rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 p-2 sm:p-4 flex flex-col hover:bg-white/10 transition-colors cursor-pointer group">
                      <div className="w-full flex-1 rounded-lg sm:rounded-xl bg-slate-800/50 mb-2 sm:mb-3 group-hover:scale-105 transition-transform" />
                      <div className="w-2/3 h-1.5 sm:h-2 bg-white/40 rounded-full mb-1 sm:mb-2" />
                      <div className="w-1/3 h-1.5 sm:h-2 bg-white/20 rounded-full" />
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
