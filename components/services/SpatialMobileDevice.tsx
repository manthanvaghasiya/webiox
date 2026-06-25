'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, User, Menu, Search, Compass, Home } from 'lucide-react';

export default function SpatialMobileDevice() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this massive container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 0.0 -> 0.3: Rotate from angled to flat
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [45, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.3], [-30, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

  // Screen Content Opacity (Skeleton to Real)
  const skeletonOpacity = useTransform(scrollYProgress, [0.2, 0.35], [1, 0]);
  const realUiOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);

  // 0.3 -> 0.7: App Content Scrolls up (translateY down)
  const appScrollY = useTransform(scrollYProgress, [0.35, 0.7], [0, -350]);

  // 0.7 -> 1.0: Bottom Sheet pops up
  const bottomSheetY = useTransform(scrollYProgress, [0.75, 0.9], [400, 0]);

  // Glare effect shifts as you scroll
  const glareY = useTransform(scrollYProgress, [0, 1], ['-100%', '100%']);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh]">
      {/* Sticky Container holding the 3D scene */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden perspective-[2000px]">
        
        {/* Background Ambience tied to scroll */}
        <motion.div 
           style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1]) }}
           className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" 
        />

        {/* The 3D Chassis */}
        <motion.div
          style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
          className="relative w-[18rem] h-[36rem] rounded-[3rem] bg-gradient-to-br from-slate-700 via-slate-900 to-slate-950 p-[3px] shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
        >
          {/* Glowing Edge Border */}
          <div className="absolute inset-0 rounded-[3rem] border border-emerald-500/20 shadow-[inset_0_0_20px_rgba(16,185,129,0.2)] pointer-events-none" />

          {/* Dynamic Island / Notch */}
          <div className="absolute top-2 inset-x-0 h-6 flex justify-center z-50">
            <div className="w-24 h-6 bg-black rounded-full" />
          </div>

          {/* The Screen Layer */}
          <div className="relative w-full h-full bg-slate-950 rounded-[2.8rem] overflow-hidden border-[6px] border-black flex flex-col relative">
            
            {/* Moving Glare */}
            <motion.div 
              className="absolute inset-0 w-[200%] h-[200%] pointer-events-none z-50 opacity-20 mix-blend-overlay"
              style={{ 
                background: 'linear-gradient(180deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)',
                y: glareY,
                x: '-25%'
              }}
            />

            {/* Skeleton Loading State (0.0 to 0.3) */}
            <motion.div style={{ opacity: skeletonOpacity }} className="absolute inset-0 p-6 pt-16 flex flex-col gap-6 z-10 bg-slate-950">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 animate-pulse shrink-0" />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="w-2/3 h-3 bg-slate-800 rounded-full animate-pulse" />
                  <div className="w-1/2 h-3 bg-slate-800 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="w-full h-48 bg-slate-800 rounded-2xl animate-pulse shrink-0" />
              <div className="flex flex-col gap-3 mt-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-full h-12 bg-slate-800 rounded-xl animate-pulse shrink-0" />
                ))}
              </div>
            </motion.div>

            {/* Real Scrollable App Interface (0.3 to 0.7) */}
            <motion.div 
              style={{ opacity: realUiOpacity, y: appScrollY }} 
              className="absolute top-0 inset-x-0 pt-16 px-4 flex flex-col gap-6 z-20"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <User className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Total Portfolio</span>
                    <span className="text-xl font-bold text-white">$142,500.00</span>
                  </div>
                </div>
              </div>

              {/* Chart / Graph Area */}
              <div className="w-full h-48 rounded-2xl bg-gradient-to-b from-emerald-500/10 to-slate-900 border border-emerald-500/20 p-4 flex flex-col justify-between relative overflow-hidden shrink-0">
                 <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/20 blur-2xl rounded-full" />
                 <span className="text-emerald-400 text-xs font-bold relative z-10">+12.5% this week</span>
                 {/* Fake SVG Chart Line */}
                 <svg className="absolute bottom-0 inset-x-0 w-full h-24" viewBox="0 0 100 50" preserveAspectRatio="none">
                   <path d="M0,50 L10,40 L20,45 L40,20 L60,30 L80,5 L100,10" fill="none" stroke="#34d399" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                   <path d="M0,50 L10,40 L20,45 L40,20 L60,30 L80,5 L100,10 L100,50 L0,50 Z" fill="rgba(52,211,153,0.1)" />
                 </svg>
              </div>

              {/* Transactions List */}
              <div className="flex flex-col gap-3 pb-24">
                <span className="text-sm font-bold text-white mb-1">Recent Activity</span>
                {[
                  { name: 'Apple Inc.', tag: 'Stock', amount: '+$450.00' },
                  { name: 'Stripe', tag: 'Payout', amount: '+$1,240.00' },
                  { name: 'AWS Cloud', tag: 'Server', amount: '-$120.00' },
                  { name: 'Vercel', tag: 'Hosting', amount: '-$20.00' },
                  { name: 'Tesla', tag: 'Stock', amount: '+$340.00' },
                  { name: 'Nvidia', tag: 'Stock', amount: '+$890.00' },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-white/5 shrink-0">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                         <div className="w-2 h-2 rounded-full bg-emerald-400" />
                       </div>
                       <div className="flex flex-col">
                         <span className="text-sm font-bold text-white">{tx.name}</span>
                         <span className="text-[10px] text-slate-400">{tx.tag}</span>
                       </div>
                    </div>
                    <span className={`text-sm font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-slate-300'}`}>{tx.amount}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bottom App Nav (Fixed inside screen) */}
            <div className="absolute bottom-0 inset-x-0 h-20 bg-slate-900/90 backdrop-blur-md border-t border-white/10 px-6 pb-4 pt-2 flex items-center justify-between z-30">
                <Home className="w-6 h-6 text-emerald-400" />
                <Search className="w-6 h-6 text-slate-500" />
                <Compass className="w-6 h-6 text-slate-500" />
                <Menu className="w-6 h-6 text-slate-500" />
            </div>

            {/* Bottom Sheet Modal (0.7 to 1.0) */}
            <motion.div 
              style={{ y: bottomSheetY }}
              className="absolute inset-x-0 bottom-0 h-64 bg-slate-800 rounded-t-3xl border-t border-emerald-500/30 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] z-40 flex flex-col items-center p-6 gap-4"
            >
              <div className="w-12 h-1 bg-slate-600 rounded-full mb-2 shrink-0" />
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center border-2 border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)] shrink-0">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              </div>
              <span className="text-lg font-bold text-white leading-none">Verification Complete</span>
              <span className="text-xs text-slate-400 text-center leading-tight">Your biometric identity has been securely verified using native hardware sensors.</span>
              <div className="w-full h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-bold mt-2 shrink-0">
                Continue
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
