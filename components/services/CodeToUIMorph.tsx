'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Activity, Users, DollarSign, ArrowUpRight, BarChart3, CheckCircle2 } from 'lucide-react';

const codeLines = [
  "import { SaasApp } from '@webiox/core';",
  "",
  "export async function initPlatform() {",
  "  const app = new SaasApp({",
  "    edgeCaching: 'global',",
  "  });",
  "  return app.listen(3000);",
  "}",
];

export default function CodeToUIMorph() {
  const [phase, setPhase] = useState<'typing' | 'deploying' | 'dashboard'>('typing');
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  // Typewriter effect logic
  useEffect(() => {
    if (phase !== 'typing') return;

    if (currentLineIndex < codeLines.length) {
      const currentLine = codeLines[currentLineIndex];
      
      if (currentCharIndex < currentLine.length) {
        const timeout = setTimeout(() => {
          setTypedLines((prev) => {
            const newLines = [...prev];
            if (newLines[currentLineIndex] === undefined) {
              newLines[currentLineIndex] = '';
            }
            newLines[currentLineIndex] += currentLine[currentCharIndex];
            return newLines;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, Math.random() * 5 + 2); // Extremely fast typing speed

        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 30);
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => setPhase('deploying'), 300);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, phase]);

  // Deployment to Dashboard sequence
  useEffect(() => {
    if (phase === 'deploying') {
      const timeout = setTimeout(() => setPhase('dashboard'), 1000);
      return () => clearTimeout(timeout);
    }
    if (phase === 'dashboard') {
      const timeout = setTimeout(() => {
        // Reset and loop
        setPhase('typing');
        setTypedLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
      }, 3500);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  return (
    <div className="relative flex items-center justify-center w-full h-full bg-[#030712] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl perspective-[1000px]">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Center Morphing Container */}
      <motion.div
        layout
        className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
        initial={{ borderRadius: 16 }}
        animate={{ 
          width: phase === 'dashboard' ? '90%' : '80%',
          height: phase === 'dashboard' ? '85%' : '75%',
          borderRadius: phase === 'dashboard' ? 24 : 16,
        }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
      >
        
        {/* Header Bar */}
        <motion.div layout className="h-10 border-b border-white/10 flex items-center px-4 justify-between bg-slate-900/50 shrink-0">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <motion.div layout className="flex items-center gap-2">
            {phase === 'dashboard' ? (
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-emerald-400" /> SaaS Overview
              </span>
            ) : (
              <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5">
                <Terminal className="w-3 h-3" /> server.ts
              </span>
            )}
          </motion.div>
        </motion.div>

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden p-5">
          <AnimatePresence mode="popLayout">
            
            {(phase === 'typing' || phase === 'deploying') && (
              <motion.div
                key="editor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                transition={{ duration: 0.4 }}
                className="w-full h-full flex flex-col justify-between font-mono text-xs sm:text-sm text-emerald-400/80 leading-loose"
              >
                <div>
                  {typedLines.map((line, i) => (
                    <div key={i}>
                      <span className="text-slate-600 select-none mr-4 inline-block w-4 text-right">{i + 1}</span>
                      <span dangerouslySetInnerHTML={{ 
                        __html: (line || '')
                          .replace(/import/g, '<span class="text-indigo-400">import</span>')
                          .replace(/from/g, '<span class="text-indigo-400">from</span>')
                          .replace(/export async function/g, '<span class="text-indigo-400">export async function</span>')
                          .replace(/await/g, '<span class="text-indigo-400">await</span>')
                          .replace(/return/g, '<span class="text-indigo-400">return</span>')
                          .replace(/const/g, '<span class="text-cyan-400">const</span>')
                          .replace(/new/g, '<span class="text-cyan-400">new</span>')
                          .replace(/true/g, '<span class="text-amber-400">true</span>')
                          .replace(/'(.*?)'/g, '<span class="text-emerald-300">\'$1\'</span>')
                      }} />
                    </div>
                  ))}
                  {phase === 'typing' && currentLineIndex < codeLines.length && (
                    <motion.div 
                      animate={{ opacity: [1, 0] }} 
                      transition={{ duration: 0.8, repeat: Infinity }} 
                      className="w-2 h-4 bg-emerald-400 inline-block align-middle ml-1" 
                    />
                  )}
                </div>

                {/* Deployment Command */}
                {phase === 'deploying' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 pt-4 border-t border-dashed border-white/10"
                  >
                    <div className="text-slate-400">
                      <span className="text-emerald-400">~/webiox</span> $ npm run deploy
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-4 h-4 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                      <span className="text-slate-500">Compiling edge routes...</span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="flex items-center gap-2 mt-2 bg-emerald-500/10 w-fit px-3 py-1 rounded border border-emerald-500/20"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold tracking-widest text-[10px] uppercase">Status: Live</span>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {phase === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full h-full flex flex-col gap-4 font-sans"
              >
                {/* Dashboard Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col gap-1 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-20"><DollarSign className="w-8 h-8 text-emerald-400" /></div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">MRR</span>
                    <span className="text-2xl text-white font-bold">$124.5K</span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
                      <ArrowUpRight className="w-3 h-3" /> +14.2%
                    </span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col gap-1 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-20"><Users className="w-8 h-8 text-indigo-400" /></div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Active Users</span>
                    <span className="text-2xl text-white font-bold">8,249</span>
                    <span className="text-[10px] text-indigo-400 flex items-center gap-1 font-bold">
                      <ArrowUpRight className="w-3 h-3" /> +5.8%
                    </span>
                  </div>
                </div>

                {/* Dashboard Chart Mockup */}
                <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-white/80 font-semibold flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-slate-400" /> Revenue Growth
                    </span>
                  </div>
                  <div className="flex-1 flex items-end gap-2 sm:gap-3">
                    {[30, 45, 40, 60, 55, 80, 75, 100].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: i * 0.1, type: "spring", bounce: 0.3 }}
                        className="flex-1 bg-gradient-to-t from-indigo-500/20 to-indigo-500/80 rounded-t-sm"
                      />
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
