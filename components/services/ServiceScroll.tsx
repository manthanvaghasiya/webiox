'use client';

import { motion } from 'framer-motion';
import { services } from '@/data/services';
import { ArrowRight, CheckCircle2, Database, Code2, Network, Cpu, ShoppingCart, Layout, Smartphone, Globe, CreditCard, Lock } from 'lucide-react';
import Link from 'next/link';
import CodeToUIMorph from './CodeToUIMorph';

const premiumEase = "easeOut";

export default function ServiceScroll() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-32">
      <div className="flex flex-col gap-16 md:gap-32">
        {services.map((service, index) => (
          <div key={service.id} id={service.id} className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

            {/* Left Sticky Anchor */}
            <div className="lg:w-5/12 relative">
              <div className="lg:sticky lg:top-32">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: premiumEase }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-[1px] mb-8 shadow-xl`}>
                    <div className="w-full h-full bg-[#F9FAFB] rounded-[15px] flex items-center justify-center text-slate-800 text-3xl">
                      {service.icon}
                    </div>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-3 tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-lg font-medium text-[#0E5E64]/80 mb-8">
                    {service.subtitle}
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <Link href={`/services/${service.id}`} className="inline-block">
                    <motion.div className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#0E5E64] hover:text-[#FFBF00] transition-colors cursor-pointer">
                      Explore specs
                      <div className="w-8 h-8 rounded-full bg-[#0E5E64]/10 flex items-center justify-center group-hover:bg-[#0E5E64] group-hover:text-[#F9FAFB] transition-colors duration-300">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Right Scroll Content */}
            <div className="lg:w-7/12 flex flex-col gap-8">
              
              {/* Premium Abstract Visual Block (Replaces Image) */}
              <div className="relative group perspective-[1000px] w-full aspect-[4/3] md:aspect-[16/10]">
                {/* Background Glow */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${service.color} rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1, ease: premiumEase }}
                  className="relative w-full h-full bg-slate-950 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
                >
                  {/* High-tech Grid Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70" />
                  
                  {/* Floating Glowing Orbs */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br ${service.color} rounded-full blur-[100px]`}
                  />
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className={`absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr ${service.color} rounded-full blur-[100px]`}
                  />

                  {/* Main Abstract Composition - Varies by Index */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    
                    {service.id === 'ai-solutions' && (
                      <>
                        {/* Custom AI Visual: Neural Core & LLM Matrix */}
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                          {/* Pulsing Core */}
                          <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className={`absolute w-48 h-48 bg-gradient-to-br ${service.color} rounded-full blur-[40px]`}
                          />
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute w-64 h-64 border border-dashed border-white/20 rounded-full"
                          />
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute w-40 h-40 border border-white/30 border-t-white/80 rounded-full"
                          />
                          
                          {/* Brain / AI Icon Center */}
                          <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className={`relative z-10 w-24 h-24 bg-slate-900 rounded-2xl border border-white/20 shadow-2xl flex items-center justify-center`}
                          >
                             {service.icon}
                          </motion.div>

                          {/* Data Streams / Tokens */}
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -100, y: (Math.random() - 0.5) * 100 }}
                              animate={{ opacity: [0, 1, 0], x: 100, y: (Math.random() - 0.5) * 100 }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                              className={`absolute w-8 h-2 bg-gradient-to-r ${service.color} rounded-full blur-[1px]`}
                            />
                          ))}

                          {/* Floating Code Output Box */}
                          <motion.div 
                            animate={{ y: [10, -10, 10] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-6 left-8 bg-slate-900/80 backdrop-blur-md border border-white/10 p-4 rounded-xl w-48 shadow-xl"
                          >
                             <div className="flex items-center gap-2 mb-2">
                               <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                               <span className="text-[10px] text-white/70 font-mono">Generating response...</span>
                             </div>
                             <div className="space-y-2">
                               <motion.div animate={{ width: ["0%", "100%"] }} transition={{ duration: 2, repeat: Infinity }} className={`h-1.5 bg-gradient-to-r ${service.color} rounded-full opacity-70`} />
                               <motion.div animate={{ width: ["0%", "80%"] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} className={`h-1.5 bg-gradient-to-r ${service.color} rounded-full opacity-70`} />
                               <motion.div animate={{ width: ["0%", "60%"] }} transition={{ duration: 2, delay: 1, repeat: Infinity }} className={`h-1.5 bg-gradient-to-r ${service.color} rounded-full opacity-70`} />
                             </div>
                          </motion.div>

                          {/* Floating Model Stats */}
                          <motion.div 
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-8 right-8 bg-slate-900/80 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center gap-3 shadow-xl"
                          >
                             <Cpu className="w-5 h-5 text-white/80" />
                             <div className="flex flex-col">
                               <span className="text-[10px] text-white/50 font-bold uppercase">Model Latency</span>
                               <span className="text-xs text-white/90 font-mono">12ms</span>
                             </div>
                          </motion.div>
                        </div>
                      </>
                    )}
                    
                    {service.id === 'web-development' && (
                      <div className="relative flex items-center justify-center w-full h-full bg-[#030712] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl group perspective-[1200px]">
                        {/* Atmosphere: Shifting Gradient Mesh */}
                        <motion.div 
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 45, 0],
                            opacity: [0.15, 0.25, 0.15]
                          }}
                          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,rgba(6,182,212,0.05)_30%,transparent_70%)] pointer-events-none z-0" 
                        />

                        {/* Layer 1: The Engine (Background Code Terminal) */}
                        <motion.div 
                          className="absolute inset-x-4 top-4 sm:inset-x-8 sm:top-8 bottom-1/3 bg-slate-900/40 backdrop-blur-md rounded-xl border border-white/10 p-4 sm:p-5 font-mono text-[10px] sm:text-xs text-emerald-400/70 overflow-hidden shadow-2xl z-10"
                          style={{ transform: "translateZ(-50px) rotateX(5deg)" }}
                        >
                          <div className="flex gap-2 mb-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                          </div>
                          <div className="flex flex-col gap-1.5 opacity-80 leading-relaxed">
                            <div><span className="text-cyan-400">import</span> {'{'} NextResponse {'}'} <span className="text-cyan-400">from</span> <span className="text-emerald-300">'next/server'</span>;</div>
                            <div className="mt-2"><span className="text-cyan-400">export async function</span> <span className="text-emerald-300">GET</span>(req: Request) {'{'}</div>
                            <div className="pl-4"><span className="text-cyan-400">const</span> metrics = <span className="text-cyan-400">await</span> system.getTelemetry();</div>
                            <div className="pl-4"><span className="text-cyan-400">return</span> NextResponse.json(metrics, {'{'} status: 200 {'}'});</div>
                            <div>{'}'}</div>
                            <div className="mt-2 text-slate-500">// Actively compiling edge routes...</div>
                            <div>
                              <span className="text-slate-400">$</span>{' '}
                              <motion.div 
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-2 h-4 bg-emerald-400 inline-block align-middle"
                              />
                            </div>
                          </div>
                        </motion.div>

                        {/* Layer 2: The Pipeline (Middle Layer - CI/CD Track) */}
                        <motion.div 
                          className="absolute left-4 right-4 sm:left-8 sm:right-8 top-[45%] sm:top-1/2 -translate-y-1/2 bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-20"
                          style={{ transform: "translateZ(0px)" }}
                        >
                          <div className="flex items-center justify-between relative">
                            {/* Track Base */}
                            <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-slate-800 -translate-y-1/2 rounded-full overflow-hidden">
                              {/* Animated Glow on Track */}
                              <motion.div 
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="w-1/3 h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80"
                              />
                            </div>
                            
                            {/* Animated Pulse Dot */}
                            <motion.div 
                                animate={{ left: ["5%", "50%", "95%"], scale: [1, 1.5, 1] }} 
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee] z-20" 
                            />

                            {/* Nodes */}
                            <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-950 border border-slate-700 flex items-center justify-center shadow-lg">
                                <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                              </div>
                              <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest font-bold">Code</span>
                            </div>
                            
                            <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-950 border border-cyan-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                                <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                              </div>
                              <span className="text-[9px] sm:text-[10px] text-cyan-500 uppercase tracking-widest font-bold">Ship</span>
                            </div>
                            
                            <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-950 border border-emerald-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                              </div>
                              <span className="text-[9px] sm:text-[10px] text-emerald-500 uppercase tracking-widest font-bold">Live</span>
                            </div>
                          </div>
                        </motion.div>

                        {/* Layer 3: The Performance Output (Foreground Metrics Card) */}
                        <motion.div 
                          animate={{ y: [-8, 8, -8] }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-11/12 sm:w-3/4 max-w-sm bg-white/5 backdrop-blur-2xl border border-white/20 p-4 sm:p-5 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] z-30 flex items-center justify-between group-hover:-translate-y-2 transition-transform duration-500"
                          style={{ transform: "translateZ(50px)" }}
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold tracking-widest">Architecture</span>
                            <span className="text-xs sm:text-sm text-white font-semibold flex items-center gap-2">
                              <Layout className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" /> Next.js 14
                            </span>
                          </div>

                          <div className="h-8 w-[1px] bg-white/10" />

                          <div className="flex flex-col items-end gap-1">
                             <div className="flex items-center gap-2">
                               <span className="text-[9px] sm:text-[10px] text-emerald-400 uppercase font-bold tracking-widest">Edge Latency</span>
                               <div className="relative flex h-2 w-2">
                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                               </div>
                             </div>
                             <span className="text-xs sm:text-sm text-white font-mono font-medium">
                               50<span className="text-emerald-400/70">ms</span>
                             </span>
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {service.id === 'ecommerce-platforms' && (
                      <div className="relative flex items-center justify-center w-full h-full bg-slate-950 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
                        {/* Background glow - Stripe Blurple / Conversion Green */}
                        <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.1)_0%,transparent_70%)] pointer-events-none" />

                        {/* Frictionless Data Flow Pipeline (React -> Stripe -> DB) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <svg className="absolute w-full h-full opacity-40" preserveAspectRatio="none">
                            {/* React to Stripe */}
                            <motion.path
                              d="M 25% 50% L 50% 50%"
                              fill="none" stroke="rgba(99,102,241,0.5)" strokeWidth="2" strokeDasharray="6 6"
                              animate={{ strokeDashoffset: [0, -20] }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            {/* Stripe to DB */}
                            <motion.path
                              d="M 50% 50% L 75% 50%"
                              fill="none" stroke="rgba(16,185,129,0.5)" strokeWidth="2" strokeDasharray="6 6"
                              animate={{ strokeDashoffset: [0, -20] }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          </svg>

                          {/* Animated Data Packets */}
                          <motion.div
                            animate={{ x: ["-100%", "0%", "100%"], opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 left-[37.5%] -translate-y-1/2 w-4 h-1 bg-indigo-400 rounded-full shadow-[0_0_10px_#818cf8]"
                          />
                          <motion.div
                            animate={{ x: ["-100%", "0%", "100%"], opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }}
                            className="absolute top-1/2 left-[62.5%] -translate-y-1/2 w-4 h-1 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]"
                          />
                        </div>

                        {/* Node: React (Frontend) */}
                        <motion.div
                          animate={{ y: [-4, 4, -4] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute left-[15%] sm:left-[20%] top-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-slate-900 border border-white/10 rounded-2xl shadow-xl flex items-center justify-center z-10"
                        >
                          <Layout className="w-6 h-6 text-white/80" />
                        </motion.div>

                        {/* Node: Stripe (Payment) */}
                        <motion.div
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-slate-900 border border-indigo-500/40 rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.2)] flex items-center justify-center z-10"
                        >
                          <CreditCard className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-400" />
                        </motion.div>

                        {/* Node: Database (Ownership) */}
                        <motion.div
                          animate={{ y: [4, -4, 4] }}
                          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute right-[15%] sm:right-[20%] top-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.15)] flex flex-col items-center justify-center gap-1 z-10"
                        >
                          <Database className="w-5 h-5 text-emerald-400" />
                          <Lock className="w-3 h-3 text-emerald-400/70" />
                        </motion.div>

                        {/* Ownership Label */}
                        <motion.div 
                          animate={{ y: [4, -4, 4] }}
                          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute right-[10%] sm:right-[15%] top-[70%] bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full z-10"
                        >
                          <span className="text-[8px] sm:text-[9px] text-emerald-400 font-bold tracking-widest uppercase">100% Data Ownership</span>
                        </motion.div>

                        {/* Live Revenue/Metric Node */}
                        <motion.div 
                          animate={{ y: [-5, 5, -5] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute top-6 left-6 sm:top-8 sm:left-8 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex flex-col gap-2 z-30 min-w-[200px]"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 sm:gap-4 mb-1">
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                              Live Checkout
                            </span>
                            <div className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold w-fit">
                              +24% Conv. Rate
                            </div>
                          </div>
                          <div className="text-white font-mono text-sm sm:text-base font-medium flex items-center gap-2">
                            <span>🛍️</span> NEW ORDER: <span className="text-emerald-400">$1,249.00</span>
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {service.id === 'saas-development' && (
                      <div className="w-full h-full">
                        <CodeToUIMorph />
                      </div>
                    )}

                    {service.id === 'ui-ux-design' && (
                      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        {/* Floating Gradients & Shapes */}
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute w-64 h-64 bg-amber-500/20 rounded-full blur-[60px] top-10 left-10"
                        />
                        <motion.div 
                          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
                          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute w-56 h-56 bg-orange-500/20 rounded-full blur-[60px] bottom-10 right-10"
                        />

                        <motion.div
                          animate={{ y: [-10, 10, -10] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${service.color} p-[1px] shadow-2xl relative z-10`}
                        >
                          <div className="w-full h-full bg-slate-900/90 backdrop-blur-md rounded-[23px] flex items-center justify-center text-4xl">
                            {service.icon}
                          </div>
                        </motion.div>

                        {/* Interactive Palette */}
                        <motion.div 
                          animate={{ y: [-8, 8, -8] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute top-1/4 right-8 bg-white/5 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-xl flex flex-col gap-2"
                        >
                          <div className="w-10 h-10 rounded-full bg-amber-400" />
                          <div className="w-10 h-10 rounded-full bg-orange-500" />
                          <div className="w-10 h-10 rounded-full bg-rose-500" />
                          <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center">
                            <span className="text-white/50 text-xs">+</span>
                          </div>
                        </motion.div>

                        {/* Component Layout Skeleton */}
                        <motion.div 
                          animate={{ x: [-8, 8, -8] }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                          className="absolute bottom-1/4 left-8 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl w-40 shadow-xl"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Layout className="w-4 h-4 text-white/60" />
                            <div className="w-16 h-1.5 bg-white/20 rounded-full" />
                          </div>
                          <div className="w-full h-16 bg-white/10 rounded-lg mb-2 border border-white/5" />
                          <div className="flex gap-2">
                            <div className="w-1/2 h-8 bg-white/5 rounded border border-white/5" />
                            <div className={`w-1/2 h-8 bg-gradient-to-br ${service.color} rounded opacity-80`} />
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {service.id === 'mobile-apps' && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Smartphone Wireframe Glow */}
                        <div className="relative z-10 w-32 sm:w-40 h-64 sm:h-80 rounded-[2rem] border border-white/20 bg-slate-900/40 backdrop-blur-sm shadow-2xl flex flex-col items-center justify-between py-3 overflow-hidden">
                          {/* Notch */}
                          <div className="w-16 h-4 bg-black rounded-full" />
                          
                          {/* Inner Screen Content */}
                          <div className="w-full h-full mt-4 flex flex-col gap-3 px-4 relative">
                            {/* App Icon Grid */}
                            <div className="grid grid-cols-3 gap-2">
                              {[...Array(6)].map((_, i) => (
                                <motion.div 
                                  key={i}
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                  className={`aspect-square rounded-xl bg-gradient-to-br ${service.color} opacity-40`}
                                />
                              ))}
                            </div>
                            {/* Main Widget */}
                            <motion.div 
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 3, repeat: Infinity }}
                              className="w-full h-20 rounded-2xl bg-white/10 border border-white/5 mt-2 flex flex-col p-3 gap-2"
                            >
                              <div className="w-1/2 h-2 bg-white/20 rounded-full" />
                              <div className="w-full h-8 bg-white/5 rounded-lg" />
                            </motion.div>
                          </div>
                          
                          {/* Home Indicator */}
                          <div className="w-1/2 h-1 bg-white/20 rounded-full mb-1" />
                          
                          {/* Overlay Icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-16 h-16 bg-slate-900/80 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
                               <span className="text-3xl">{service.icon}</span>
                             </div>
                          </div>
                        </div>

                        {/* Floating Notifications */}
                        <motion.div 
                          animate={{ y: [10, -10, 10], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute top-1/4 right-4 sm:right-10 bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-20"
                        >
                          <Smartphone className="w-4 h-4 text-rose-400" />
                          <span className="text-xs text-white/90 font-medium">Build complete</span>
                        </motion.div>
                        
                        <motion.div 
                          animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                          className="absolute bottom-1/4 left-4 sm:left-10 bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-2xl shadow-xl flex flex-col z-20"
                        >
                          <span className="text-[10px] text-white/50 uppercase font-bold">App Store</span>
                          <div className="w-16 h-1.5 bg-gradient-to-r from-rose-500 to-red-400 rounded-full mt-1" />
                        </motion.div>
                      </div>
                    )}

                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Benefits */}
                <div className="flex flex-col gap-4">
                  {service.benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: premiumEase }}
                      className="group relative flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                    >
                      <div className={`relative z-10 w-10 h-10 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center shrink-0`}>
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-slate-800 font-medium leading-tight">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col justify-center shadow-lg"
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.color} opacity-20 blur-[60px] rounded-full pointer-events-none`} />
                  <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2 relative z-10">
                    <Database className="w-4 h-4" /> Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {service.tech.map((t, i) => (
                      <div key={i} className="px-4 py-2 bg-white/10 text-white rounded-xl text-sm font-medium backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors">
                        {t}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
