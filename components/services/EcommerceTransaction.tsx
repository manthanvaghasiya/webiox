'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Loader2, Check, CreditCard, ArrowUpRight, ShieldCheck, Truck, PackageCheck, Pointer } from 'lucide-react';

export default function EcommerceTransaction() {
  const [phase, setPhase] = useState<'idle' | 'processing' | 'verifying' | 'revenue_update' | 'shipping'>('idle');
  const [revenue, setRevenue] = useState(24500);

  // Geometric Path State
  const [path1, setPath1] = useState('');
  const [path2, setPath2] = useState('');
  const [path3, setPath3] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const storefrontRef = useRef<HTMLDivElement>(null);
  const gatewayRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const shippingRef = useRef<HTMLDivElement>(null);

  // High-precision path calculation that handles dynamic conditional rendering
  const updatePaths = () => {
    if (!containerRef.current || !storefrontRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const storefront = storefrontRef.current.getBoundingClientRect();

    const getRightCenter = (rect: DOMRect) => ({
      x: rect.right - container.left,
      y: rect.top + rect.height / 2 - container.top,
    });

    const getLeftCenter = (rect: DOMRect) => ({
      x: rect.left - container.left,
      y: rect.top + rect.height / 2 - container.top,
    });

    // Storefront -> Gateway
    if (gatewayRef.current) {
      const gateway = gatewayRef.current.getBoundingClientRect();
      const p1Start = getRightCenter(storefront);
      const p1End = getLeftCenter(gateway);
      setPath1(`M ${p1Start.x} ${p1Start.y} C ${p1Start.x + 30} ${p1Start.y}, ${p1End.x - 30} ${p1End.y}, ${p1End.x} ${p1End.y}`);
    } else {
      setPath1('');
    }

    // Gateway -> Dashboard
    if (gatewayRef.current && dashboardRef.current) {
      const gateway = gatewayRef.current.getBoundingClientRect();
      const dashboard = dashboardRef.current.getBoundingClientRect();
      const p2Start = getRightCenter(gateway);
      const p2End = getLeftCenter(dashboard);
      setPath2(`M ${p2Start.x} ${p2Start.y} C ${p2Start.x + 30} ${p2Start.y}, ${p2End.x - 30} ${p2End.y}, ${p2End.x} ${p2End.y}`);
    } else {
      setPath2('');
    }

    // Dashboard -> Shipping
    if (dashboardRef.current && shippingRef.current) {
      const dashboard = dashboardRef.current.getBoundingClientRect();
      const shipping = shippingRef.current.getBoundingClientRect();
      const p3Start = getRightCenter(dashboard);
      const p3End = getLeftCenter(shipping);
      setPath3(`M ${p3Start.x} ${p3Start.y} C ${p3Start.x + 30} ${p3Start.y}, ${p3End.x - 30} ${p3End.y}, ${p3End.x} ${p3End.y}`);
    } else {
      setPath3('');
    }
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

  // Auto-scroll orchestration for mobile (and dynamic width changes)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === 'idle') {
        storefrontRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else if (phase === 'processing' || phase === 'verifying') {
        gatewayRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else if (phase === 'revenue_update') {
        dashboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else if (phase === 'shipping') {
        shippingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, 150); // Wait for AnimatePresence enter animations

    return () => clearTimeout(timer);
  }, [phase]);

  // Interactive Purchase Sequence
  const handlePurchase = () => {
    if (phase !== 'idle') return;

    setPhase('processing');

    setTimeout(() => {
      setPhase('verifying');
    }, 1200);

    setTimeout(() => {
      setPhase('revenue_update');
      setRevenue(25749);
    }, 2800);

    setTimeout(() => {
      setPhase('shipping');
    }, 4500);

    // Auto reset for demonstration purposes
    setTimeout(() => {
      setPhase('idle');
      setRevenue(24500);
    }, 12000);
  };

  const springConfig = { type: 'spring' as const, stiffness: 100, damping: 15 };

  return (
    <div
      className="relative w-full h-full min-h-[400px] md:min-h-[450px] flex flex-col items-center justify-center py-4 sm:py-8"
    >

      {/* ================= SVG WIRING CANVAS ================= */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Base Paths */}
        {path1 && <path d={path1} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="4 4" />}
        {path2 && <path d={path2} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="4 4" />}
        {path3 && <path d={path3} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="4 4" />}

        {/* Data Pulse: Storefront -> Gateway */}
        {['processing', 'verifying', 'revenue_update', 'shipping'].includes(phase) && path1 && (
          <motion.path
            d={path1}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            className="drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        )}

        {/* Data Pulse: Gateway -> Dashboard */}
        {['revenue_update', 'shipping'].includes(phase) && path2 && (
          <motion.path
            d={path2}
            fill="none"
            stroke="#34d399"
            strokeWidth="3"
            className="drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        )}

        {/* Data Pulse: Dashboard -> Shipping */}
        {phase === 'shipping' && path3 && (
          <motion.path
            d={path3}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            className="drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        )}
      </svg>

      {/* Horizontal Scroll Track */}
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-x-auto lg:overflow-x-hidden hide-scrollbar snap-x snap-mandatory flex items-center px-6 sm:px-12 md:px-8 lg:px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex flex-row items-center justify-start lg:justify-center gap-6 md:gap-4 z-10 w-max lg:w-full min-w-full pb-4 md:pb-0">

          <AnimatePresence mode="popLayout">
            {/* ================= NODE 1: STOREFRONT ================= */}
            <motion.div
              layout
              key="node-storefront"
              className="snap-center shrink-0 lg:shrink flex justify-center w-[85vw] max-w-[15rem] lg:max-w-[14rem] lg:min-w-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={springConfig}
            >
              <motion.div
                ref={storefrontRef}
                className="w-full max-w-[15rem] bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl flex flex-col gap-4 relative"
                animate={{ y: phase === 'idle' ? 0 : -2 }}
                transition={springConfig}
              >
                <div className="w-full h-28 bg-slate-800 rounded-xl overflow-hidden relative border border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-emerald-500/10" />
                  <ShoppingBag className="absolute inset-0 m-auto w-10 h-10 text-white/20" />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-white">Pro Engine v2</span>
                  <span className="text-[10px] text-slate-400">Digital License • Lifetime</span>
                </div>

                <div className="flex items-center justify-between mt-2 relative">
                  <span className="text-lg font-black text-white">$1,249</span>

                  {/* Pulse Indicator on Mobile/Desktop */}
                  <AnimatePresence>
                    {phase === 'idle' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute -top-12 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center gap-1.5 whitespace-nowrap z-50 pointer-events-none"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                        </span>
                        Tap to Demo
                        <div className="absolute -bottom-1 right-6 w-2 h-2 bg-emerald-500 rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    onClick={handlePurchase}
                    className={`h-9 px-4 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${phase === 'idle'
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-default'
                      }`}
                    whileHover={phase === 'idle' ? { scale: 1.05 } : {}}
                    whileTap={phase === 'idle' ? { scale: 0.95 } : {}}
                  >
                    <AnimatePresence mode="wait">
                      {phase === 'idle' && (
                        <motion.span key="buy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          Click to Buy
                        </motion.span>
                      )}
                      {phase === 'processing' && (
                        <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                        </motion.div>
                      )}
                      {(phase === 'verifying' || phase === 'revenue_update' || phase === 'shipping') && (
                        <motion.div key="check" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                          <Check className="w-4 h-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* ================= NODE 2: PAYMENT GATEWAY ================= */}
            {['processing', 'verifying', 'revenue_update', 'shipping'].includes(phase) && (
              <motion.div
                layout
                key="node-gateway"
                className="snap-center shrink-0 lg:shrink flex items-center justify-center my-0"
                initial={{ opacity: 0, scale: 0.5, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={springConfig}
              >
                <motion.div
                  ref={gatewayRef}
                  className={`w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border relative ${['verifying', 'revenue_update', 'shipping'].includes(phase)
                      ? 'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_30px_rgba(52,211,153,0.3)]'
                      : 'bg-slate-900/60 backdrop-blur-md border-white/10'
                    }`}
                  animate={{ scale: ['verifying', 'revenue_update', 'shipping'].includes(phase) ? 1.1 : 1 }}
                  transition={springConfig}
                >
                  {['verifying', 'revenue_update', 'shipping'].includes(phase) ? <ShieldCheck className="w-7 h-7 md:w-8 md:h-8 text-emerald-400" /> : <CreditCard className="w-7 h-7 md:w-8 md:h-8 text-slate-400" />}

                  {/* Status Label */}
                  <AnimatePresence>
                    {['verifying', 'revenue_update', 'shipping'].includes(phase) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-10 whitespace-nowrap bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-2 backdrop-blur-md"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                          Verified
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}

            {/* ================= NODE 3: REVENUE DASHBOARD ================= */}
            {['revenue_update', 'shipping'].includes(phase) && (
              <motion.div
                layout
                key="node-dashboard"
                className="snap-center shrink-0 lg:shrink flex justify-center w-[85vw] max-w-[15rem] lg:max-w-[14rem] lg:min-w-0"
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={springConfig}
              >
                <motion.div
                  ref={dashboardRef}
                  className="w-full max-w-[15rem] bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl flex flex-col gap-4 relative"
                  animate={{
                    scale: ['revenue_update', 'shipping'].includes(phase) ? 1.05 : 1,
                    borderColor: ['revenue_update', 'shipping'].includes(phase) ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.1)'
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
                      className={`text-3xl font-black transition-colors duration-300 ${['revenue_update', 'shipping'].includes(phase) ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]' : 'text-white'}`}
                    >
                      ${revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </motion.span>
                    <span className="text-[10px] text-slate-500 mt-1">Live from Stripe</span>
                  </div>

                  <div className="w-full h-12 mt-2 relative">
                    {/* Animated SVG Chart */}
                    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <motion.path
                        d={['revenue_update', 'shipping'].includes(phase) ? "M0,35 L20,30 L40,32 L60,20 L80,25 L100,5" : "M0,35 L20,30 L40,32 L60,20 L80,25 L100,20"}
                        fill="none"
                        stroke={['revenue_update', 'shipping'].includes(phase) ? "#34d399" : "#475569"}
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        animate={{ d: ['revenue_update', 'shipping'].includes(phase) ? "M0,35 L20,30 L40,32 L60,20 L80,25 L100,5" : "M0,35 L20,30 L40,32 L60,20 L80,25 L100,20" }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                      />
                      <motion.path
                        d={['revenue_update', 'shipping'].includes(phase) ? "M0,35 L20,30 L40,32 L60,20 L80,25 L100,5 L100,40 L0,40 Z" : "M0,35 L20,30 L40,32 L60,20 L80,25 L100,20 L100,40 L0,40 Z"}
                        fill={['revenue_update', 'shipping'].includes(phase) ? "url(#chart-success-eco)" : "url(#chart-idle-eco)"}
                        animate={{ d: ['revenue_update', 'shipping'].includes(phase) ? "M0,35 L20,30 L40,32 L60,20 L80,25 L100,5 L100,40 L0,40 Z" : "M0,35 L20,30 L40,32 L60,20 L80,25 L100,20 L100,40 L0,40 Z" }}
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
              </motion.div>
            )}

            {/* ================= NODE 4: SHIPPING & FULFILLMENT ================= */}
            {phase === 'shipping' && (
              <motion.div
                layout
                key="node-shipping"
                className="snap-center shrink-0 lg:shrink flex justify-center w-[85vw] max-w-[15rem] lg:max-w-[14rem] lg:min-w-0"
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={springConfig}
              >
                <motion.div
                  ref={shippingRef}
                  className={`w-full max-w-[15rem] bg-slate-900/60 backdrop-blur-xl border p-5 rounded-2xl shadow-2xl flex flex-col gap-4 relative transition-colors duration-500 ${phase === 'shipping' ? 'border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.15)]' : 'border-white/10'
                    }`}
                  animate={{
                    scale: phase === 'shipping' ? 1.05 : 1,
                    y: phase === 'shipping' ? -2 : 0
                  }}
                  transition={springConfig}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Logistics</span>
                    <PackageCheck className={`w-4 h-4 ${phase === 'shipping' ? 'text-amber-400' : 'text-slate-600'}`} />
                  </div>

                  <div className="w-full h-20 bg-slate-800/50 rounded-xl flex items-center justify-center relative overflow-hidden border border-white/5">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0"
                      animate={{ x: phase === 'shipping' ? ['-100%', '100%'] : '-100%' }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                    <Truck className={`w-8 h-8 transition-colors ${phase === 'shipping' ? 'text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]' : 'text-slate-600'}`} />
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
                    <motion.div
                      className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                      initial={{ width: '0%' }}
                      animate={{ width: phase === 'shipping' ? '100%' : '0%' }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    {phase === 'shipping' ? (
                      <motion.div
                        key="shipping"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Order Shipping</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="waiting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                      >
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Awaiting Order</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
