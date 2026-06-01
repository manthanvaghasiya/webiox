'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Loader2, Check, CreditCard, ArrowUpRight, ShieldCheck, ArrowRight } from 'lucide-react';

export default function EcommerceTransaction() {
  const [phase, setPhase] = useState<'idle' | 'processing' | 'verifying' | 'success'>('idle');
  const [revenue, setRevenue] = useState(24500);

  // Geometric Path State
  const [path1, setPath1] = useState('');
  const [path2, setPath2] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const storefrontRef = useRef<HTMLDivElement>(null);
  const gatewayRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  // High-precision path calculation
  const updatePaths = () => {
    if (!containerRef.current || !storefrontRef.current || !gatewayRef.current || !dashboardRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const storefront = storefrontRef.current.getBoundingClientRect();
    const gateway = gatewayRef.current.getBoundingClientRect();
    const dashboard = dashboardRef.current.getBoundingClientRect();

    const getRightCenter = (rect: DOMRect) => ({
      x: rect.right - container.left,
      y: rect.top + rect.height / 2 - container.top,
    });

    const getLeftCenter = (rect: DOMRect) => ({
      x: rect.left - container.left,
      y: rect.top + rect.height / 2 - container.top,
    });

    // Storefront -> Gateway
    const p1Start = getRightCenter(storefront);
    const p1End = getLeftCenter(gateway);
    setPath1(`M ${p1Start.x} ${p1Start.y} C ${p1Start.x + 40} ${p1Start.y}, ${p1End.x - 40} ${p1End.y}, ${p1End.x} ${p1End.y}`);

    // Gateway -> Dashboard
    const p2Start = getRightCenter(gateway);
    const p2End = getLeftCenter(dashboard);
    setPath2(`M ${p2Start.x} ${p2Start.y} C ${p2Start.x + 40} ${p2Start.y}, ${p2End.x - 40} ${p2End.y}, ${p2End.x} ${p2End.y}`);
  };

  useEffect(() => {
    let frameId: number;
    const loop = () => {
      updatePaths();
      frameId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Auto-loop orchestration
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === 'idle') {
      timeout = setTimeout(() => setPhase('processing'), 2000);
    } else if (phase === 'processing') {
      timeout = setTimeout(() => setPhase('verifying'), 800);
    } else if (phase === 'verifying') {
      timeout = setTimeout(() => {
        setPhase('success');
        setRevenue(25749);
      }, 1000);
    } else if (phase === 'success') {
      timeout = setTimeout(() => {
        setPhase('idle');
        setRevenue(24500);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [phase]);

  const springConfig = { type: 'spring' as const, stiffness: 100, damping: 15 };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full min-h-[400px] bg-[#030712] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl flex flex-col md:flex-row items-center justify-center p-4 sm:p-8"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.05)_0%,transparent_50%)] pointer-events-none" />

      {/* ================= SVG WIRING CANVAS ================= */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Base Paths */}
        <path d={path1 || ''} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="4 4" />
        <path d={path2 || ''} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="4 4" />

        {/* Data Pulse: Storefront -> Gateway */}
        {phase === 'processing' && (
          <motion.path
            d={path1 || ''}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            className="drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}

        {/* Data Pulse: Gateway -> Dashboard */}
        {phase === 'verifying' && (
          <motion.path
            d={path2 || ''}
            fill="none"
            stroke="#34d399"
            strokeWidth="3"
            className="drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        )}
      </svg>

      <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 z-10 max-w-4xl mx-auto">
        
        {/* ================= NODE 1: STOREFRONT ================= */}
        <div className="flex-1 flex justify-center w-full md:w-auto">
          <motion.div 
            ref={storefrontRef}
            className="w-full max-w-[16rem] bg-slate-900/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl flex flex-col gap-4 relative"
            animate={{ y: phase === 'idle' ? 0 : -2 }}
            transition={springConfig}
          >
            <div className="w-full h-32 bg-slate-800 rounded-xl overflow-hidden relative border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-emerald-500/10" />
              <ShoppingBag className="absolute inset-0 m-auto w-10 h-10 text-white/20" />
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-white">Pro Engine v2</span>
              <span className="text-[10px] text-slate-400">Digital License • Lifetime</span>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <span className="text-lg font-black text-white">$1,249</span>
              <motion.button 
                className={`h-9 px-4 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                  phase === 'idle' ? 'bg-white text-slate-950 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {phase === 'idle' && (
                    <motion.span key="buy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      1-Click Buy
                    </motion.span>
                  )}
                  {phase === 'processing' && (
                    <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    </motion.div>
                  )}
                  {(phase === 'verifying' || phase === 'success') && (
                    <motion.div key="check" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                      <Check className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
            
            {/* Automated Mouse Cursor Simulation */}
            <AnimatePresence>
              {phase === 'idle' && (
                <motion.div
                  initial={{ x: 100, y: 150, opacity: 0 }}
                  animate={{ x: 190, y: 220, opacity: 1, scale: [1, 1, 0.9, 1] }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    duration: 1.8, 
                    times: [0, 0.7, 0.8, 1], // glide, hover, click, release
                    ease: "easeInOut" 
                  }}
                  className="absolute pointer-events-none z-50 drop-shadow-2xl"
                >
                  <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.65376 2.15376C5.40428 1.48866 4.49842 1.41908 4.15049 2.03893L0.244304 8.99596C-0.103632 9.61582 0.354162 10.3705 1.05436 10.3344L6.96024 10.0298L7.69707 16.5912C7.78184 17.346 8.78853 17.4878 9.13845 16.7915L13.8824 7.3524C14.1953 6.72979 13.6811 5.98634 12.9866 6.05436L7.54519 6.58757L5.65376 2.15376Z" fill="#0f172a"/>
                    <path d="M5.65376 2.15376C5.40428 1.48866 4.49842 1.41908 4.15049 2.03893L0.244304 8.99596C-0.103632 9.61582 0.354162 10.3705 1.05436 10.3344L6.96024 10.0298L7.69707 16.5912C7.78184 17.346 8.78853 17.4878 9.13845 16.7915L13.8824 7.3524C14.1953 6.72979 13.6811 5.98634 12.9866 6.05436L7.54519 6.58757L5.65376 2.15376Z" stroke="#38bdf8" strokeWidth="1.5"/>
                  </svg>
                  {/* Click Ripple */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 0.8, 0], scale: [0, 2, 3] }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                    className="absolute -top-2 -left-2 w-8 h-8 rounded-full border border-sky-400"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ================= NODE 2: PAYMENT GATEWAY ================= */}
        <div className="flex-shrink-0 flex items-center justify-center my-8 md:my-0">
          <motion.div 
            ref={gatewayRef}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-colors duration-500 border relative ${
              (phase === 'verifying' || phase === 'success') ? 'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_30px_rgba(52,211,153,0.3)]' : 'bg-slate-900 border-white/10'
            }`}
            animate={{ scale: (phase === 'verifying' || phase === 'success') ? 1.1 : 1 }}
            transition={springConfig}
          >
            {(phase === 'verifying' || phase === 'success') ? <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" /> : <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />}
            
            {/* Status Label */}
            <AnimatePresence>
              {(phase === 'verifying' || phase === 'success') && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="absolute -top-10 whitespace-nowrap bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                    Payment Verified
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ================= NODE 3: REVENUE DASHBOARD ================= */}
        <div className="flex-1 flex justify-center w-full md:w-auto">
          <motion.div 
            ref={dashboardRef}
            className="w-full max-w-[16rem] bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl flex flex-col gap-4 relative"
            animate={{ 
              scale: phase === 'success' ? 1.05 : 1,
              borderColor: phase === 'success' ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.1)'
            }}
            transition={springConfig}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Gross Volume</span>
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[9px] font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(52,211,153,0.1)]">
                <ArrowUpRight className="w-3 h-3" /> +24%
              </div>
            </div>
            
            <div className="flex flex-col">
              <motion.span 
                key={revenue}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-3xl font-black transition-colors duration-300 ${phase === 'success' ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]' : 'text-white'}`}
              >
                ${revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </motion.span>
              <span className="text-[10px] text-slate-500 mt-1">Live from Stripe</span>
            </div>

            <div className="w-full h-16 mt-2 relative">
              {/* Animated SVG Chart */}
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <motion.path 
                  d={phase === 'success' ? "M0,35 L20,30 L40,32 L60,20 L80,25 L100,5" : "M0,35 L20,30 L40,32 L60,20 L80,25 L100,20"} 
                  fill="none" 
                  stroke={phase === 'success' ? "#34d399" : "#475569"} 
                  strokeWidth="2" 
                  vectorEffect="non-scaling-stroke" 
                  animate={{ d: phase === 'success' ? "M0,35 L20,30 L40,32 L60,20 L80,25 L100,5" : "M0,35 L20,30 L40,32 L60,20 L80,25 L100,20" }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                />
                <motion.path 
                  d={phase === 'success' ? "M0,35 L20,30 L40,32 L60,20 L80,25 L100,5 L100,40 L0,40 Z" : "M0,35 L20,30 L40,32 L60,20 L80,25 L100,20 L100,40 L0,40 Z"} 
                  fill={phase === 'success' ? "url(#chart-success-eco)" : "url(#chart-idle-eco)"} 
                  animate={{ d: phase === 'success' ? "M0,35 L20,30 L40,32 L60,20 L80,25 L100,5 L100,40 L0,40 Z" : "M0,35 L20,30 L40,32 L60,20 L80,25 L100,20 L100,40 L0,40 Z"} }
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                />
                <defs>
                  <linearGradient id="chart-success-eco" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(52,211,153,0.3)" />
                    <stop offset="100%" stopColor="rgba(52,211,153,0)" />
                  </linearGradient>
                  <linearGradient id="chart-idle-eco" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(71,85,105,0.3)" />
                    <stop offset="100%" stopColor="rgba(71,85,105,0)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
