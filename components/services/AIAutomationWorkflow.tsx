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
    "> parsing webhook payload...",
    "> initializing multi-agent swarm...",
    "> agent_1: extracting invoice data... [DONE]",
    "> agent_2: analyzing sentiment... [DONE]",
    "> agent_3: drafting response... [DONE]",
    "> formatting final output...",
    "> executing downstream functions..."
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
    <div ref={containerRef} className="relative flex flex-col items-center justify-center w-full h-full bg-[#030712] rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl p-4 sm:p-8">
      
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
                fill="none" stroke="#34d399" strokeWidth="2"
                initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                animate={{ pathLength: [0, 0.4, 0], pathOffset: [0, 0.6, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ filter: 'drop-shadow(0 0 4px #34d399)' }}
              />
              <motion.path
                ref={path3AnimRef}
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
      <div className="w-full flex items-center justify-between relative z-10 h-full pt-16">
        
        {/* NODE 1: Data Ingestion (Webhook) */}
        <div className="w-[20%] flex flex-col items-center gap-3">
          <motion.div 
            ref={webhookRef}
            animate={{ 
              scale: phase === 'ingesting' ? 1.1 : 1,
              borderColor: phase === 'ingesting' ? 'rgba(52,211,153,0.5)' : 'rgba(30,41,59,1)',
              boxShadow: phase === 'ingesting' ? '0 0 20px rgba(52,211,153,0.2)' : 'none'
            }}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-slate-900/90 backdrop-blur-md border flex items-center justify-center relative"
          >
            <Webhook className={`w-6 h-6 sm:w-8 sm:h-8 ${phase === 'ingesting' ? 'text-emerald-400' : 'text-slate-400'}`} />
          </motion.div>
          <div className="text-center bg-slate-900/60 px-2 py-1 rounded-lg border border-slate-800">
            <span className="text-[9px] sm:text-[10px] text-slate-300 font-bold uppercase block">Stripe Webhook</span>
            <span className="text-[8px] text-slate-500 font-mono">invoice.paid</span>
          </div>
        </div>

        {/* NODE 2: The AI Orchestrator */}
        <div className="w-[40%] flex justify-center items-center h-full">
          <motion.div 
            ref={brainRef}
            layout
            initial={{ borderRadius: 24 }}
            animate={{
              width: phase === 'orchestrating' ? '100%' : '5rem',
              height: phase === 'orchestrating' ? 'auto' : '5rem',
              borderColor: phase === 'orchestrating' ? 'rgba(52,211,153,0.5)' : 'rgba(30,41,59,1)',
              boxShadow: phase === 'orchestrating' ? '0 0 40px rgba(16,185,129,0.15)' : 'none',
              padding: phase === 'orchestrating' ? '1.25rem' : '0'
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
            className="bg-slate-900/90 backdrop-blur-xl border flex flex-col justify-center items-center overflow-hidden relative"
          >
            <motion.div layout className="flex items-center gap-3 w-full justify-center">
              <BrainCircuit className={`w-8 h-8 sm:w-10 sm:h-10 ${phase === 'orchestrating' ? 'text-emerald-400' : 'text-slate-400'}`} />
              {phase === 'orchestrating' && (
                <motion.span 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="text-xs font-bold text-white uppercase tracking-widest whitespace-nowrap"
                >
                  AI Orchestrator
                </motion.span>
              )}
            </motion.div>

            <AnimatePresence>
              {phase === 'orchestrating' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full mt-4 flex flex-col gap-3"
                >
                  {/* The 3 Parallel Agents */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                      <FileText className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="text-[9px] sm:text-[10px] text-slate-300 font-medium">Agent 1: Extracting Invoice Data...</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                      <Smile className="w-3.5 h-3.5 text-rose-400" />
                      <span className="text-[9px] sm:text-[10px] text-slate-300 font-medium">Agent 2: Analyzing Sentiment...</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                      <PenTool className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[9px] sm:text-[10px] text-slate-300 font-medium">Agent 3: Generating Reply...</span>
                    </div>
                  </div>

                  {/* Terminal Logs */}
                  <div className="mt-2 bg-black/50 rounded-lg p-2 font-mono text-[8px] sm:text-[9px] text-emerald-500/80 min-h-[4rem] whitespace-pre-wrap leading-relaxed border border-white/5">
                    {terminalText}
                    <motion.span 
                      animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-1.5 h-2.5 bg-emerald-500 align-middle ml-1"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* NODE 3: Multi-Channel Output */}
        <div className="w-[20%] flex flex-col justify-between h-full py-8 relative gap-8">
          
          {/* Output A: PostgreSQL */}
          <div className="flex flex-col items-center gap-2 w-full mt-[-2rem]">
            <motion.div 
              ref={dbRef}
              animate={{ 
                scale: phase === 'success' ? 1.1 : 1,
                borderColor: phase === 'success' ? 'rgba(52,211,153,0.5)' : 'rgba(30,41,59,1)',
                backgroundColor: phase === 'success' ? 'rgba(52,211,153,0.1)' : 'rgba(15,23,42,0.9)'
              }}
              className="w-12 h-12 rounded-2xl backdrop-blur-md border flex items-center justify-center relative shadow-lg"
            >
              <Database className={`w-5 h-5 ${phase === 'success' ? 'text-emerald-400' : 'text-slate-400'}`} />
              {phase === 'success' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-emerald-500 rounded-full p-0.5">
                  <CheckCircle2 className="w-3 h-3 text-slate-950" />
                </motion.div>
              )}
            </motion.div>
            <div className="text-center bg-slate-900/60 px-2 py-1 rounded-lg border border-slate-800">
              <span className="text-[8px] sm:text-[9px] text-slate-300 font-bold uppercase block">PostgreSQL</span>
            </div>
          </div>

          {/* Output B: Telegram */}
          <div className="flex flex-col items-center gap-2 w-full mb-[-2rem]">
            <motion.div 
              ref={telegramRef}
              animate={{ 
                scale: phase === 'success' ? 1.1 : 1,
                borderColor: phase === 'success' ? 'rgba(56,189,248,0.5)' : 'rgba(30,41,59,1)',
                backgroundColor: phase === 'success' ? 'rgba(56,189,248,0.1)' : 'rgba(15,23,42,0.9)'
              }}
              className="w-12 h-12 rounded-2xl backdrop-blur-md border flex items-center justify-center relative shadow-lg"
            >
              <Send className={`w-5 h-5 ${phase === 'success' ? 'text-sky-400' : 'text-slate-400'}`} />
              {phase === 'success' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-sky-500 rounded-full p-0.5">
                  <CheckCircle2 className="w-3 h-3 text-slate-950" />
                </motion.div>
              )}
            </motion.div>
            <div className="text-center bg-slate-900/60 px-2 py-1 rounded-lg border border-slate-800">
              <span className="text-[8px] sm:text-[9px] text-slate-300 font-bold uppercase block">Telegram</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
