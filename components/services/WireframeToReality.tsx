'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';

export default function WireframeToReality() {
  const [phase, setPhase] = useState<'blueprint' | 'isometric' | 'assembly' | 'interaction'>('blueprint');

  // Sequence orchestration
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === 'blueprint') {
      timeout = setTimeout(() => setPhase('isometric'), 2000);
    } else if (phase === 'isometric') {
      timeout = setTimeout(() => setPhase('assembly'), 1500);
    } else if (phase === 'assembly') {
      timeout = setTimeout(() => setPhase('interaction'), 2500);
    } else if (phase === 'interaction') {
      timeout = setTimeout(() => setPhase('blueprint'), 3500);
    }

    return () => clearTimeout(timeout);
  }, [phase]);

  // Spring configs for premium physics
  const springConfig = { type: 'spring' as const, stiffness: 100, damping: 20 };
  const widgetSpring = { type: 'spring' as const, stiffness: 120, damping: 22 };

  // Calculate dynamic rotations based on phase
  const getContainerRotation = () => {
    if (phase === 'blueprint') return { rotateX: 0, rotateY: 0, rotateZ: 0 };
    if (phase === 'interaction') return { rotateX: 52, rotateY: -5, rotateZ: -40 }; // slight hover tilt
    return { rotateX: 55, rotateY: 0, rotateZ: -45 }; // standard isometric
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full bg-[#030712] rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl p-4 sm:p-8 perspective-[1500px]">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* 3D Scene Container */}
      <motion.div
        className="relative w-64 h-[22rem] sm:w-72"
        style={{ transformStyle: 'preserve-3d' }}
        animate={getContainerRotation()}
        transition={springConfig}
      >
        {/* ================= LAYER 1: BASE CONTAINER ================= */}
        <motion.div
          className={`absolute inset-0 rounded-2xl transition-colors duration-1000 ${
            phase === 'blueprint' 
              ? 'border-2 border-dashed border-slate-700/50 bg-transparent' 
              : 'border border-cyan-500/20 bg-slate-950 shadow-[0_0_50px_rgba(6,182,212,0.15)]'
          }`}
          animate={{ z: phase === 'assembly' || phase === 'interaction' ? -60 : 0 }}
          transition={springConfig}
        >
          {/* Cyan Grid Dots (Visible mainly in blueprint) */}
          <div 
            className={`absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.3)_1px,transparent_1px)] bg-[length:20px_20px] transition-opacity duration-1000 ${
              phase === 'blueprint' || phase === 'isometric' ? 'opacity-100' : 'opacity-10'
            }`} 
          />
        </motion.div>

        {/* ================= LAYER 2: GLASSMORPHIC MIDDLE ================= */}
        <motion.div
          className="absolute inset-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: phase === 'assembly' || phase === 'interaction' ? 1 : 0,
            z: phase === 'assembly' || phase === 'interaction' ? 20 : 0 
          }}
          transition={springConfig}
        />

        {/* ================= LAYER 3: HIGH-FI UI WIDGETS ================= */}
        <motion.div
          className="absolute inset-0 p-5 flex flex-col gap-4"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ z: phase === 'assembly' || phase === 'interaction' ? 100 : 0 }}
          transition={springConfig}
        >
          {/* Hero Widget */}
          <motion.div 
            className={`w-full h-32 rounded-xl flex items-center justify-center transition-all duration-1000 overflow-hidden relative ${
              phase === 'blueprint' || phase === 'isometric'
                ? 'border-2 border-dashed border-slate-700 bg-slate-900/50'
                : 'border border-white/10 bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl'
            }`}
            animate={{ z: phase === 'assembly' || phase === 'interaction' ? 40 : 0 }}
            transition={widgetSpring}
          >
            {(phase === 'assembly' || phase === 'interaction') && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
                <Layers className="w-12 h-12 text-white/90 drop-shadow-lg" />
              </motion.div>
            )}
          </motion.div>

          {/* Typography Skeletons -> Real Text */}
          <div className="flex flex-col gap-2 relative" style={{ transformStyle: 'preserve-3d' }}>
            <motion.div 
              className={`h-6 rounded-md transition-all duration-1000 flex items-center ${
                phase === 'blueprint' || phase === 'isometric' ? 'w-3/4 bg-slate-800' : 'w-full bg-transparent'
              }`}
              animate={{ z: phase === 'assembly' || phase === 'interaction' ? 20 : 0 }}
              transition={widgetSpring}
            >
              {(phase === 'assembly' || phase === 'interaction') && (
                <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold text-white tracking-wide drop-shadow-md">
                  Pro Engine v2
                </motion.h3>
              )}
            </motion.div>
            
            <motion.div 
              className={`h-3 rounded-md transition-all duration-1000 flex items-center ${
                phase === 'blueprint' || phase === 'isometric' ? 'w-full bg-slate-800/50' : 'w-full bg-transparent'
              }`}
              animate={{ z: phase === 'assembly' || phase === 'interaction' ? 10 : 0 }}
              transition={widgetSpring}
            >
              {(phase === 'assembly' || phase === 'interaction') && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-slate-300 drop-shadow-sm">
                  Advanced 3D layering architecture unlocked.
                </motion.p>
              )}
            </motion.div>
            
            {(phase === 'blueprint' || phase === 'isometric') && (
              <div className="h-3 w-5/6 bg-slate-800/50 rounded-md" />
            )}
          </div>

          {/* Magnetic CTA Button */}
          <motion.div 
            className={`mt-auto w-full h-12 rounded-xl flex items-center justify-center transition-all duration-1000 relative ${
              phase === 'blueprint' || phase === 'isometric'
                ? 'border-2 border-dashed border-slate-700 bg-transparent'
                : 'bg-white shadow-[0_20px_40px_rgba(0,0,0,0.4)]'
            }`}
            animate={{ 
              z: phase === 'assembly' || phase === 'interaction' ? 60 : 0,
              scale: phase === 'interaction' ? 0.95 : 1 // button press down during interaction
            }}
            transition={{ ...widgetSpring, delay: phase === 'interaction' ? 1.5 : 0 }}
          >
            {(phase === 'assembly' || phase === 'interaction') && (
              <motion.span 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-slate-950 font-black text-sm uppercase tracking-widest flex items-center gap-2"
              >
                Upgrade Now <ArrowRight className="w-4 h-4" />
              </motion.span>
            )}
          </motion.div>
        </motion.div>

        {/* ================= INTERACTIVE CURSOR ================= */}
        <AnimatePresence>
          {phase === 'interaction' && (
            <motion.div
              initial={{ x: 150, y: 250, opacity: 0, z: 200 }}
              animate={{ 
                x: 80, 
                y: 190, 
                opacity: 1, 
                z: 200,
                scale: [1, 1, 0.8, 1] // simulates a click
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                duration: 2.5,
                times: [0, 0.6, 0.7, 1], // timing for move, hover, click, release
                ease: "easeInOut"
              }}
              className="absolute pointer-events-none drop-shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Premium Dark Cursor */}
              <svg width="32" height="48" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.65376 2.15376C5.40428 1.48866 4.49842 1.41908 4.15049 2.03893L0.244304 8.99596C-0.103632 9.61582 0.354162 10.3705 1.05436 10.3344L6.96024 10.0298L7.69707 16.5912C7.78184 17.346 8.78853 17.4878 9.13845 16.7915L13.8824 7.3524C14.1953 6.72979 13.6811 5.98634 12.9866 6.05436L7.54519 6.58757L5.65376 2.15376Z" fill="#0f172a"/>
                <path d="M5.65376 2.15376C5.40428 1.48866 4.49842 1.41908 4.15049 2.03893L0.244304 8.99596C-0.103632 9.61582 0.354162 10.3705 1.05436 10.3344L6.96024 10.0298L7.69707 16.5912C7.78184 17.346 8.78853 17.4878 9.13845 16.7915L13.8824 7.3524C14.1953 6.72979 13.6811 5.98634 12.9866 6.05436L7.54519 6.58757L5.65376 2.15376Z" stroke="#38bdf8" strokeWidth="1.5"/>
              </svg>
              
              {/* Click Ripple Indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.8, 0], scale: [0, 2, 3] }}
                transition={{ delay: 1.5, duration: 0.8 }} // Matches the click timing (60% of 2.5s)
                className="absolute -top-2 -left-2 w-10 h-10 rounded-full border-2 border-cyan-400"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
      </motion.div>
      
    </div>
  );
}
