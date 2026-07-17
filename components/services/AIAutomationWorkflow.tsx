'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Webhook, BrainCircuit, Database, Send, FileText, Smile, PenTool, CheckCircle2 } from 'lucide-react';

export default function AIAutomationWorkflow() {
  const [phase, setPhase] = useState<'idle' | 'ingesting' | 'orchestrating' | 'executing' | 'success'>('idle');
  const [terminalText, setTerminalText] = useState('');
  
  // DOM Refs for dynamic SVG path calculations
  const containerRef = useRef<HTMLDivElement>(null);
  const webhookRef = useRef<HTMLDivElement>(null);
  const brainRef = useRef<HTMLDivElement>(null);
  const dbRef = useRef<HTMLDivElement>(null);
  const telegramRef = useRef<HTMLDivElement>(null);

  const path1BaseRef = useRef<SVGPathElement>(null);
  const path2BaseRef = useRef<SVGPathElement>(null);
  const path3BaseRef = useRef<SVGPathElement>(null);
  const path1AnimRef = useRef<SVGPathElement>(null);
  const path2AnimRef = useRef<SVGPathElement>(null);
  const path3AnimRef = useRef<SVGPathElement>(null);

  const terminalLogs = [
    "> parsing payload...",
    "> init swarm...",
    "> ag_1: extracting... [DONE]",
    "> ag_2: sentiment... [DONE]",
    "> ag_3: drafting... [DONE]",
    "> formatting output...",
    "> executing downstream..."
  ];

  // Sequence orchestration
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === 'idle') {
      timeout = setTimeout(() => setPhase('ingesting'), 2000);
    } else if (phase === 'ingesting') {
      timeout = setTimeout(() => setPhase('orchestrating'), 1500);
    } else if (phase === 'orchestrating') {
      let currentLogIndex = 0;
      let currentCharIndex = 0;
      let currentText = '';
      
      const typeInterval = setInterval(() => {
        if (currentLogIndex < terminalLogs.length) {
          const log = terminalLogs[currentLogIndex];
          if (currentCharIndex < log.length) {
            currentText += log[currentCharIndex];
            setTerminalText(currentText);
            currentCharIndex++;
          } else {
            currentText += '\n';
            setTerminalText(currentText);
            currentLogIndex++;
            currentCharIndex = 0;
          }
        } else {
          clearInterval(typeInterval);
        }
      }, 20);

      timeout = setTimeout(() => {
        clearInterval(typeInterval);
        setPhase('executing');
      }, 3500);

      return () => {
        clearInterval(typeInterval);
        clearTimeout(timeout);
      };
    } else if (phase === 'executing') {
      timeout = setTimeout(() => setPhase('success'), 1500);
    } else if (phase === 'success') {
      timeout = setTimeout(() => {
        setPhase('idle');
        setTerminalText('');
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [phase]);

  // 60FPS DOM layout tracking for perfect SVG paths (handles window resize AND framer-motion physics)
  useEffect(() => {
    const createBezierPath = (startX: number, startY: number, endX: number, endY: number) => {
      const offset = Math.abs(endX - startX) * 0.4;
      return `M ${startX} ${startY} C ${startX + offset} ${startY}, ${endX - offset} ${endY}, ${endX} ${endY}`;
    };

    let animationFrameId: number;

    const updatePaths = () => {
      if (!containerRef.current || !webhookRef.current || !brainRef.current || !dbRef.current || !telegramRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const getRelativeCoords = (nodeRect: DOMRect, edge: 'right' | 'left') => ({
        x: edge === 'right' ? nodeRect.right - containerRect.left : nodeRect.left - containerRect.left,
        y: nodeRect.top - containerRect.top + nodeRect.height / 2
      });

      const webhookPoint = getRelativeCoords(webhookRef.current.getBoundingClientRect(), 'right');
      const brainLeftPoint = getRelativeCoords(brainRef.current.getBoundingClientRect(), 'left');
      const brainRightPoint = getRelativeCoords(brainRef.current.getBoundingClientRect(), 'right');
      const dbPoint = getRelativeCoords(dbRef.current.getBoundingClientRect(), 'left');
      const telegramPoint = getRelativeCoords(telegramRef.current.getBoundingClientRect(), 'left');

      const d1 = createBezierPath(webhookPoint.x, webhookPoint.y, brainLeftPoint.x, brainLeftPoint.y);
      const d2 = createBezierPath(brainRightPoint.x, brainRightPoint.y, dbPoint.x, dbPoint.y);
      const d3 = createBezierPath(brainRightPoint.x, brainRightPoint.y, telegramPoint.x, telegramPoint.y);

      // Direct DOM mutation to avoid React re-renders at 60fps
      if (path1BaseRef.current) path1BaseRef.current.setAttribute('d', d1);
      if (path2BaseRef.current) path2BaseRef.current.setAttribute('d', d2);
      if (path3BaseRef.current) path3BaseRef.current.setAttribute('d', d3);
      if (path1AnimRef.current) path1AnimRef.current.setAttribute('d', d1);
      if (path2AnimRef.current) path2AnimRef.current.setAttribute('d', d2);
      if (path3AnimRef.current) path3AnimRef.current.setAttribute('d', d3);

      animationFrameId = requestAnimationFrame(updatePaths);
    };

    updatePaths();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center w-full h-full min-h-[380px] lg:min-h-[450px] bg-[#030712] rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl p-4 sm:p-8">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Dynamic Status Indicator */}
      <div className="absolute top-6 z-40">
        <motion.div
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg border ${
            phase === 'idle' 
              ? 'bg-slate-800/80 text-emerald-400 border-slate-700 backdrop-blur-md' 
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md'
          }`}
        >
          {phase === 'idle' ? (
            <>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Listening for Webhooks
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              System Active
            </>
          )}
        </motion.div>
      </div>

      {/* SVG Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        
        {/* Base Lines */}
        <path ref={path1BaseRef} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
        <path ref={path2BaseRef} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
        <path ref={path3BaseRef} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />

        {/* Animated Data Pulses */}
        <AnimatePresence>
          {phase === 'ingesting' && (
            <motion.path
              ref={path1AnimRef}
              d={path1BaseRef.current?.getAttribute('d') || "M0,0 L1,1"}
              fill="none" stroke="#34d399" strokeWidth="2"
              initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
              animate={{ pathLength: [0, 0.4, 0], pathOffset: [0, 0.6, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ filter: 'drop-shadow(0 0 4px #34d399)' }}
            />
          )}

          {phase === 'executing' && (
            <>
              <motion.path
                ref={path2AnimRef}
                d={path2BaseRef.current?.getAttribute('d') || "M0,0 L1,1"}
                fill="none" stroke="#34d399" strokeWidth="2"
                initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                animate={{ pathLength: [0, 0.4, 0], pathOffset: [0, 0.6, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ filter: 'drop-shadow(0 0 4px #34d399)' }}
              />
              <motion.path
                ref={path3AnimRef}
                d={path3BaseRef.current?.getAttribute('d') || "M0,0 L1,1"}
                fill="none" stroke="#38bdf8" strokeWidth="2"
                initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                animate={{ pathLength: [0, 0.4, 0], pathOffset: [0, 0.6, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ filter: 'drop-shadow(0 0 4px #38bdf8)' }}
              />
            </>
          )}
        </AnimatePresence>
      </svg>

      {/* Nodes Container */}
      <div className="w-full flex items-center justify-between relative z-10 h-full pt-12 sm:pt-16">
        
        {/* NODE 1: Data Ingestion (Webhook) */}
        <div className="flex-1 flex flex-col items-center gap-2 sm:gap-3 z-10">
          <motion.div 
            ref={webhookRef}
            animate={{ 
              scale: phase === 'ingesting' ? 1.1 : 1,
              borderColor: phase === 'ingesting' ? 'rgba(52,211,153,0.5)' : 'rgba(30,41,59,1)',
              boxShadow: phase === 'ingesting' ? '0 0 20px rgba(52,211,153,0.2)' : 'none'
            }}
            className="w-10 h-10 sm:w-16 sm:h-16 rounded-2xl bg-slate-900/90 backdrop-blur-md border flex items-center justify-center relative"
          >
            <Webhook className={`w-5 h-5 sm:w-8 sm:h-8 ${phase === 'ingesting' ? 'text-emerald-400' : 'text-slate-400'}`} />
          </motion.div>
          <div className="text-center bg-slate-900/60 px-1 sm:px-2 py-1 rounded-lg border border-slate-800">
            <span className="text-[7px] sm:text-[10px] text-slate-300 font-bold uppercase block">Stripe</span>
            <span className="text-[6px] sm:text-[8px] text-slate-500 font-mono hidden sm:block">invoice.paid</span>
          </div>
        </div>

        {/* NODE 2: The AI Orchestrator */}
        <div className="flex-[2] flex justify-center items-center h-full z-10 mx-2 sm:mx-4 max-w-[50%]">
          <motion.div 
            ref={brainRef}
            layout
            initial={{ borderRadius: 24 }}
            animate={{
              width: phase === 'orchestrating' ? '100%' : '3.5rem',
              height: phase === 'orchestrating' ? 'auto' : '3.5rem',
              borderColor: phase === 'orchestrating' ? 'rgba(52,211,153,0.5)' : 'rgba(30,41,59,1)',
              boxShadow: phase === 'orchestrating' ? '0 0 40px rgba(16,185,129,0.15)' : 'none',
              padding: phase === 'orchestrating' ? '0.75rem' : '0'
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
            className="bg-slate-900/90 backdrop-blur-xl border flex flex-col justify-center items-center overflow-hidden relative sm:!w-[100%] sm:!h-[auto] sm:!p-[1.25rem]"
            style={phase !== 'orchestrating' ? { width: '3.5rem', height: '3.5rem' } : {}}
          >
            <motion.div layout className="flex items-center gap-2 sm:gap-3 w-full justify-center">
              <BrainCircuit className={`w-6 h-6 sm:w-10 sm:h-10 ${phase === 'orchestrating' ? 'text-emerald-400' : 'text-slate-400'}`} />
              {phase === 'orchestrating' && (
                <motion.span 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="text-[9px] sm:text-xs font-bold text-white uppercase tracking-wider sm:tracking-widest text-center"
                >
                  Orchestrator
                </motion.span>
              )}
            </motion.div>

            <AnimatePresence>
              {phase === 'orchestrating' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full mt-3 sm:mt-4 flex flex-col gap-2 sm:gap-3"
                >
                  {/* The 3 Parallel Agents */}
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg">
                      <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400 shrink-0" />
                      <span className="text-[7.5px] sm:text-[10px] text-slate-300 font-medium leading-tight">Agent 1: Extract Data...</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg">
                      <Smile className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400 shrink-0" />
                      <span className="text-[7.5px] sm:text-[10px] text-slate-300 font-medium leading-tight">Agent 2: Sentiment...</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg">
                      <PenTool className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
                      <span className="text-[7.5px] sm:text-[10px] text-slate-300 font-medium leading-tight">Agent 3: Reply...</span>
                    </div>
                  </div>

                  {/* Terminal Logs */}
                  <div className="mt-1 sm:mt-2 bg-black/50 rounded-lg p-1.5 sm:p-2 font-mono text-[6.5px] sm:text-[9px] text-emerald-500/80 min-h-[3.5rem] sm:min-h-[4rem] whitespace-pre-wrap leading-tight sm:leading-relaxed border border-white/5">
                    {terminalText}
                    <motion.span 
                      animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-1 h-2 sm:w-1.5 sm:h-2.5 bg-emerald-500 align-middle ml-1"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* NODE 3: Multi-Channel Output */}
        <div className="flex-1 flex flex-col justify-between h-full py-4 sm:py-8 relative gap-6 sm:gap-8 z-10">
          
          {/* Output A: PostgreSQL */}
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 w-full mt-0 sm:mt-[-2rem]">
            <motion.div 
              ref={dbRef}
              animate={{ 
                scale: phase === 'success' ? 1.1 : 1,
                borderColor: phase === 'success' ? 'rgba(52,211,153,0.5)' : 'rgba(30,41,59,1)',
                backgroundColor: phase === 'success' ? 'rgba(52,211,153,0.1)' : 'rgba(15,23,42,0.9)'
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl backdrop-blur-md border flex items-center justify-center relative shadow-lg"
            >
              <Database className={`w-4 h-4 sm:w-5 sm:h-5 ${phase === 'success' ? 'text-emerald-400' : 'text-slate-400'}`} />
              {phase === 'success' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-emerald-500 rounded-full p-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-950" />
                </motion.div>
              )}
            </motion.div>
            <div className="text-center bg-slate-900/60 px-1 sm:px-2 py-1 rounded-lg border border-slate-800">
              <span className="text-[7px] sm:text-[9px] text-slate-300 font-bold uppercase block">Postgres</span>
            </div>
          </div>

          {/* Output B: Telegram */}
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 w-full mb-0 sm:mb-[-2rem]">
            <motion.div 
              ref={telegramRef}
              animate={{ 
                scale: phase === 'success' ? 1.1 : 1,
                borderColor: phase === 'success' ? 'rgba(56,189,248,0.5)' : 'rgba(30,41,59,1)',
                backgroundColor: phase === 'success' ? 'rgba(56,189,248,0.1)' : 'rgba(15,23,42,0.9)'
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl backdrop-blur-md border flex items-center justify-center relative shadow-lg"
            >
              <Send className={`w-4 h-4 sm:w-5 sm:h-5 ${phase === 'success' ? 'text-sky-400' : 'text-slate-400'}`} />
              {phase === 'success' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-sky-500 rounded-full p-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-950" />
                </motion.div>
              )}
            </motion.div>
            <div className="text-center bg-slate-900/60 px-1 sm:px-2 py-1 rounded-lg border border-slate-800">
              <span className="text-[7px] sm:text-[9px] text-slate-300 font-bold uppercase block">Telegram</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
