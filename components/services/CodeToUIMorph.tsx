'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { Terminal, Activity, ArrowRight, RotateCcw, Building2, Play, DollarSign, CornerDownLeft } from 'lucide-react';

export default function CodeToUIMorph() {
  const [phase, setPhase] = useState<'idle' | 'processing' | 'dashboard'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [mrr, setMrr] = useState(124500);
  
  const animatedMrr = useMotionValue(124500);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const [holdProgress, setHoldProgress] = useState(0);
  const holdIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'analytics' | 'customers'>('pipeline');

  const startHold = () => {
    if (phase !== 'idle') return;
    let progress = 0;
    holdIntervalRef.current = setInterval(() => {
      progress += 2.5; // 2.5% every 20ms = 800ms to execute
      if (progress >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        setHoldProgress(100);
        handleInject();
      } else {
        setHoldProgress(progress);
      }
    }, 20);
  };

  const cancelHold = () => {
    if (holdProgress < 100) {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
      setHoldProgress(0);
    }
  };

  useEffect(() => {
    if (phase === 'dashboard') {
      const controls = animate(animatedMrr, 174500, {
        duration: 2,
        ease: "easeOut",
        delay: 0.5,
        onUpdate: (latest) => setMrr(Math.round(latest))
      });
      return () => controls.stop();
    } else {
      setMrr(124500);
      animatedMrr.set(124500);
    }
  }, [phase, animatedMrr]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  const handleInject = () => {
    setPhase('processing');
    setLogs([]);
    setHoldProgress(0);
    
    const deploymentSteps = [
      "> curl -X POST https://api.saas.com/v1/leads \\",
      ">   -H 'Authorization: Bearer sk_live_...' \\",
      ">   -d '{\"company\":\"Acme Corp\",\"value\":50000}'",
      "Authenticating request...",
      "Validating payload...",
      "Executing workflow triggers...",
      "Updating pipeline stage...",
      "200 OK: Lead successfully inserted."
    ];

    let currentStep = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      if (currentStep < deploymentSteps.length) {
        setLogs(prev => [...prev, deploymentSteps[currentStep]]);
        currentStep++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => setPhase('dashboard'), 600);
      }
    }, 300); // Fast API execution
  };

  const reset = () => {
    setPhase('idle');
    setHoldProgress(0);
  };

  return (
    <div className="relative w-full h-full min-h-[450px] md:min-h-[500px] flex items-center justify-center p-4 sm:p-8 perspective-[1000px]">
      
      {/* Morphing Container */}
      <motion.div
        layout
        className={`relative overflow-hidden flex flex-col shadow-2xl border ${
          phase === 'dashboard' 
            ? 'bg-[#0B1120] border-white/5' 
            : 'bg-slate-900/90 backdrop-blur-xl border-white/10'
        }`}
        initial={{ borderRadius: 16 }}
        animate={{ 
          width: '100%',
          maxWidth: phase === 'dashboard' ? '100%' : '32rem', 
          height: phase === 'dashboard' ? '100%' : 'auto',
          borderRadius: phase === 'dashboard' ? 24 : 16,
        }}
        transition={{ type: 'spring', bounce: 0.15, duration: 0.8 }}
      >
        
        {/* ================= HEADER BAR ================= */}
        <motion.div layout className={`h-12 border-b flex items-center px-4 justify-between shrink-0 ${phase === 'dashboard' ? 'bg-[#0F172A] border-white/5' : 'bg-slate-950/50 border-white/10'}`}>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <motion.div layout className="flex items-center gap-2">
            {phase === 'dashboard' ? (
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" /> CRM Dashboard
              </span>
            ) : (
              <span className="text-[10px] sm:text-xs text-slate-500 font-mono flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> POST /api/leads
              </span>
            )}
          </motion.div>
        </motion.div>

        {/* ================= CONTENT AREA ================= */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <AnimatePresence mode="popLayout">
            
            {/* --- PHASE: IDLE (API Configuration) --- */}
            {phase === 'idle' && (
              <motion.div
                key="api"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="p-6 sm:p-8 flex flex-col gap-6 h-full justify-between"
              >
                <div className="font-mono text-xs sm:text-sm leading-loose flex flex-col gap-1 bg-slate-950 border border-white/5 p-4 rounded-xl">
                  <div className="text-slate-400">{'// Inject a $50,000 lead via API'}</div>
                  <div className="mt-2 text-pink-400">POST <span className="text-emerald-300">https://api.saas.com/v1/leads</span></div>
                  <div className="text-slate-500">Content-Type: application/json</div>
                  <br/>
                  <div className="text-cyan-400">{'{'}</div>
                  <div className="ml-4 flex flex-col">
                    <span><span className="text-indigo-300">"company"</span>: <span className="text-amber-300">"Acme Corp"</span>,</span>
                    <span><span className="text-indigo-300">"deal_value"</span>: <span className="text-amber-400">50000</span>,</span>
                    <span><span className="text-indigo-300">"status"</span>: <span className="text-amber-300">"closed_won"</span></span>
                  </div>
                  <div className="text-cyan-400">{'}'}</div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-1">Secure Execution</span>
                  <div 
                    onPointerDown={startHold}
                    onPointerUp={cancelHold}
                    onPointerLeave={cancelHold}
                    className="relative w-full h-14 bg-slate-900 border border-indigo-500/30 rounded-xl overflow-hidden cursor-pointer group shadow-inner flex items-center justify-center select-none"
                    style={{ WebkitTouchCallout: 'none' }} // Prevent text selection on mobile hold
                  >
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-indigo-500 transition-all duration-75 ease-linear pointer-events-none" 
                      style={{ width: `${holdProgress}%` }}
                    />
                    <div className={`absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${holdProgress > 0 ? 'hidden' : 'block'}`} />
                    
                    <span className={`relative z-10 text-xs sm:text-sm font-black tracking-widest uppercase transition-colors ${holdProgress > 50 ? 'text-white' : 'text-indigo-400'} pointer-events-none`}>
                      {holdProgress === 0 ? 'Hold to Authorize Request' : holdProgress < 100 ? 'Authenticating...' : 'Executed!'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- PHASE: PROCESSING (Terminal View) --- */}
            {phase === 'processing' && (
              <motion.div
                key="terminal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 sm:p-8 flex flex-col h-full bg-slate-950 font-mono text-xs sm:text-sm"
              >
                <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
                  {logs.map((log, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-start gap-3 ${log?.includes('200 OK') ? 'text-emerald-400 font-bold mt-4' : 'text-slate-400'}`}
                    >
                      <span>{log}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* --- PHASE: DASHBOARD (Live CRM View) --- */}
            {phase === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
                className="w-full h-full flex flex-col md:flex-row bg-[#020617]"
              >
                {/* Dashboard Sidebar */}
                <div className="w-full md:w-48 xl:w-56 border-b md:border-b-0 md:border-r border-white/5 bg-slate-900/50 backdrop-blur-xl p-4 flex flex-row md:flex-col gap-4 justify-between md:justify-start relative z-20">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)] border border-white/20">
                       <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                     </div>
                     <div className="hidden md:flex flex-col">
                       <span className="text-white font-black tracking-wide">NEXUS<span className="text-indigo-400">CRM</span></span>
                       <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Enterprise</span>
                     </div>
                   </div>
                   
                   <div className="hidden md:flex flex-col gap-2 mt-6">
                     <div 
                       onClick={() => setActiveTab('pipeline')}
                       className={`h-9 rounded-xl flex items-center px-4 relative overflow-hidden group cursor-pointer transition-all ${activeTab === 'pipeline' ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-transparent hover:bg-white/5'}`}
                     >
                        {activeTab === 'pipeline' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />}
                        <span className={`text-xs font-bold ${activeTab === 'pipeline' ? 'text-indigo-300' : 'text-slate-500'}`}>Sales Pipeline</span>
                     </div>
                     <div 
                       onClick={() => setActiveTab('analytics')}
                       className={`h-9 rounded-xl flex items-center px-4 relative overflow-hidden group cursor-pointer transition-all ${activeTab === 'analytics' ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-transparent hover:bg-white/5'}`}
                     >
                        {activeTab === 'analytics' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />}
                        <span className={`text-xs font-bold ${activeTab === 'analytics' ? 'text-indigo-300' : 'text-slate-500'}`}>Revenue Analytics</span>
                     </div>
                     <div 
                       onClick={() => setActiveTab('customers')}
                       className={`h-9 rounded-xl flex items-center px-4 relative overflow-hidden group cursor-pointer transition-all ${activeTab === 'customers' ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-transparent hover:bg-white/5'}`}
                     >
                        {activeTab === 'customers' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />}
                        <span className={`text-xs font-bold ${activeTab === 'customers' ? 'text-indigo-300' : 'text-slate-500'}`}>Customers</span>
                     </div>
                   </div>

                   <button 
                     onClick={reset} 
                     className="md:mt-auto px-4 py-2.5 bg-white/5 hover:bg-white/10 text-xs font-bold text-white rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 hover:border-white/20 shadow-lg"
                   >
                     <RotateCcw className="w-3.5 h-3.5 text-indigo-400"/> Reset API
                   </button>
                </div>

                {/* Dashboard Main Content */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 overflow-y-auto hide-scrollbar relative z-10">
                  
                  {/* Ambient Background Glow */}
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

                  {/* Tab Content Rendering */}
                  <AnimatePresence mode="wait">
                    {activeTab === 'pipeline' && (
                      <motion.div
                        key="pipeline"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex flex-col gap-4 sm:gap-6 w-full h-full"
                      >
                        {/* KPI Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                           
                           {/* MRR Card */}
                           <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-5 sm:p-6 flex flex-col relative overflow-hidden group shadow-2xl">
                             <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[50px] rounded-full group-hover:bg-emerald-500/20 transition-colors duration-700" />
                             
                             <div className="flex justify-between items-start mb-4 z-10">
                               <span className="text-[10px] sm:text-xs text-slate-400 font-black uppercase tracking-widest">Monthly Recurring Revenue</span>
                               <div className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                 <DollarSign className="w-4 h-4 text-emerald-400" />
                               </div>
                             </div>
                             
                             <div className="flex items-end gap-3 z-10 mb-2">
                               <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">${mrr.toLocaleString()}</span>
                             </div>
                             
                             <motion.div 
                               initial={{ opacity: 0, x: -10 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: 1 }}
                               className="text-xs font-bold text-emerald-400 z-10 flex items-center gap-1.5 bg-emerald-500/10 w-fit px-2 py-1 rounded-md border border-emerald-500/20"
                             >
                               <ArrowRight className="w-3 h-3 -rotate-45" /> +$50k Injected
                             </motion.div>
                             
                             {/* Mini Sparkline Chart */}
                             <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30 z-0 flex items-end">
                               {[10, 15, 12, 18, 24, 20, 35, 40, 38, 45, 60, mrr === 124500 ? 60 : 100].map((h, i) => (
                                 <motion.div 
                                   key={i}
                                   initial={{ height: 0 }}
                                   animate={{ height: `${h}%` }}
                                   transition={{ delay: i * 0.05, type: 'spring' }}
                                   className={`flex-1 mx-[1px] rounded-t-sm ${i === 11 && mrr > 124500 ? 'bg-emerald-400 opacity-100' : 'bg-slate-500'}`}
                                 />
                               ))}
                             </div>
                           </div>

                           {/* Active Customers Card */}
                           <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-5 sm:p-6 flex flex-col relative overflow-hidden group shadow-2xl">
                             <div className="absolute top-0 left-0 w-48 h-48 bg-indigo-500/10 blur-[50px] rounded-full group-hover:bg-indigo-500/20 transition-colors duration-700" />
                             
                             <div className="flex justify-between items-start mb-4 z-10">
                               <span className="text-[10px] sm:text-xs text-slate-400 font-black uppercase tracking-widest">Active Enterprise Clients</span>
                               <div className="p-1.5 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                                 <Building2 className="w-4 h-4 text-indigo-400" />
                               </div>
                             </div>
                             
                             <div className="flex items-end gap-3 z-10 mb-2">
                               <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                                 {mrr === 124500 ? '48' : '49'}
                               </span>
                             </div>
                             
                             <span className="text-xs font-bold text-slate-500 z-10 flex items-center gap-1.5 w-fit px-2 py-1">
                               Global Region
                             </span>
                           </div>
                        </div>

                        {/* Live Deal Feed */}
                        <div className="flex-1 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-4 sm:p-6 flex flex-col gap-6 shadow-2xl relative">
                           <div className="flex items-center justify-between">
                             <h3 className="text-sm font-black text-white tracking-wide">Live Deal Feed</h3>
                             <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold text-slate-400">Q3 2026</div>
                           </div>
                           
                           <div className="flex-1 flex flex-col gap-3">
                              
                              {/* The injected deal! */}
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.6, type: 'spring', bounce: 0.5, duration: 0.8 }}
                                className="w-full bg-gradient-to-r from-emerald-500/10 to-emerald-900/20 backdrop-blur-md border border-emerald-400/30 rounded-xl p-3 sm:p-4 shadow-[0_10px_30px_rgba(16,185,129,0.15)] relative overflow-hidden z-20 cursor-pointer group hover:border-emerald-400/50 transition-colors flex items-center justify-between"
                              >
                                <div className="absolute top-0 left-0 bottom-0 w-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]" />
                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/0 via-emerald-400/10 to-emerald-400/0 translate-x-[-100%] animate-[shimmer_2s_infinite] pointer-events-none" />
                                
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30 shrink-0">
                                    <Building2 className="w-4 h-4 text-emerald-400" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-xs sm:text-sm text-white font-black truncate">Acme Corp</span>
                                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Closed Won</span>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col items-end shrink-0 pl-2">
                                  <span className="text-[10px] text-emerald-500/80 font-bold uppercase tracking-wider mb-0.5">Value</span>
                                  <span className="text-sm sm:text-lg text-emerald-300 font-black drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
                                    $50k <span className="text-[10px] text-emerald-500 font-bold">MRR</span>
                                  </span>
                                </div>
                              </motion.div>

                              {/* Existing Deal 1 */}
                              <div className="w-full bg-slate-800/40 hover:bg-slate-800 transition-colors border border-white/5 rounded-xl p-3 sm:p-4 z-10 cursor-pointer flex items-center justify-between relative overflow-hidden">
                                <div className="absolute top-0 left-0 bottom-0 w-1 bg-indigo-500 opacity-50" />
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600 shrink-0">
                                    <Building2 className="w-4 h-4 text-slate-400" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-xs sm:text-sm text-slate-300 font-bold truncate">Globex Inc</span>
                                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Negotiation</span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end shrink-0 pl-2">
                                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Value</span>
                                  <span className="text-xs sm:text-sm text-slate-400 font-bold">
                                    $12.5k <span className="text-[10px] text-slate-600 font-bold">MRR</span>
                                  </span>
                                </div>
                              </div>

                              {/* Existing Deal 2 */}
                              <div className="w-full bg-slate-800/40 hover:bg-slate-800 transition-colors border border-white/5 rounded-xl p-3 sm:p-4 z-10 cursor-pointer flex items-center justify-between relative overflow-hidden hidden sm:flex">
                                <div className="absolute top-0 left-0 bottom-0 w-1 bg-slate-600 opacity-50" />
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600 shrink-0">
                                    <Building2 className="w-4 h-4 text-slate-400" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-xs sm:text-sm text-slate-300 font-bold truncate">Initech</span>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Prospect</span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end shrink-0 pl-2">
                                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Value</span>
                                  <span className="text-xs sm:text-sm text-slate-400 font-bold">
                                    $8.2k <span className="text-[10px] text-slate-600 font-bold">MRR</span>
                                  </span>
                                </div>
                              </div>

                           </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'analytics' && (
                      <motion.div
                        key="analytics"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex-1 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-2xl"
                      >
                        <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 flex items-center justify-center mb-4">
                          <Activity className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-black text-white mb-2">Revenue Analytics Module</h3>
                        <p className="text-sm text-slate-400 max-w-xs">Detailed drill-downs on expansion MRR, churn analysis, and cohort retention charts.</p>
                      </motion.div>
                    )}

                    {activeTab === 'customers' && (
                      <motion.div
                        key="customers"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex-1 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-2xl"
                      >
                        <div className="w-16 h-16 bg-pink-500/10 rounded-2xl border border-pink-500/20 flex items-center justify-center mb-4">
                          <Building2 className="w-8 h-8 text-pink-400" />
                        </div>
                        <h3 className="text-lg font-black text-white mb-2">Enterprise Customers</h3>
                        <p className="text-sm text-slate-400 max-w-xs">Manage API keys, access control, and usage billing for 49 enterprise clients.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
