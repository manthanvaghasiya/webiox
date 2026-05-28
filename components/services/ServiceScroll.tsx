'use client';

import { motion } from 'framer-motion';
import { services } from '@/data/services';
import { ArrowRight, CheckCircle2, Database, Code2, Network, Cpu } from 'lucide-react';
import Link from 'next/link';

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
                    
                    {service.id !== 'ai-solutions' && index % 3 === 0 && (
                      <>
                        {/* Variant 0: Holographic Core */}
                        <div className="relative flex items-center justify-center">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute w-40 h-40 rounded-full border border-white/10 border-t-white/50 border-b-white/50 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                          />
                          <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute w-56 h-56 rounded-full border border-dashed border-white/20 border-l-white/60 border-r-white/60 opacity-50"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br ${service.color} p-[1px] shadow-2xl relative z-10`}
                          >
                            <div className="w-full h-full bg-slate-900 rounded-[23px] flex items-center justify-center text-4xl sm:text-5xl">
                              {service.icon}
                            </div>
                          </motion.div>
                        </div>

                        {/* Floating UI Element - Top Left (Code/Data stream) */}
                        <motion.div 
                          animate={{ y: [-8, 8, -8] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute top-6 left-6 sm:top-8 sm:left-8 bg-white/5 backdrop-blur-xl border border-white/10 p-3 sm:p-4 rounded-2xl flex items-center gap-3 sm:gap-4 shadow-xl"
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <Database className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                          </div>
                          <div className="flex flex-col gap-1.5 sm:gap-2">
                            <div className="w-20 sm:w-24 h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div 
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className={`w-full h-full bg-gradient-to-r ${service.color}`}
                              />
                            </div>
                            <div className="w-12 sm:w-16 h-1.5 sm:h-2 bg-white/10 rounded-full" />
                          </div>
                        </motion.div>

                        {/* Floating UI Element - Bottom Right (Metrics) */}
                        <motion.div 
                          animate={{ y: [8, -8, 8] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                          className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 bg-white/5 backdrop-blur-xl border border-white/10 p-4 sm:p-5 rounded-2xl flex flex-col gap-3 sm:gap-4 w-36 sm:w-44 shadow-xl"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] sm:text-xs text-white/60 uppercase font-bold tracking-widest">Sys Health</span>
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                          </div>
                          <div className="flex items-end gap-1.5 h-10 sm:h-12">
                            {[40, 70, 45, 90, 65].map((height, i) => (
                              <motion.div 
                                key={i}
                                initial={{ height: "20%" }}
                                animate={{ height: [`${height}%`, `${height - 20}%`, `${height}%`] }}
                                transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                                className={`flex-1 bg-gradient-to-t ${service.color} opacity-80 rounded-t-sm`}
                              />
                            ))}
                          </div>
                        </motion.div>
                      </>
                    )}

                    {service.id !== 'ai-solutions' && index % 3 === 1 && (
                      <>
                        {/* Variant 1: Code Terminal / Flow */}
                        <div className="w-full h-full p-8 flex flex-col justify-center relative">
                          <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <Code2 className="w-64 h-64 text-white" />
                          </div>
                          <div className="space-y-4 relative z-10 w-3/4 max-w-sm">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.2, repeat: Infinity, repeatDelay: 3 }}
                                className="flex items-center gap-3"
                              >
                                <span className={`text-xs font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r ${service.color}`}>~ /</span>
                                <div className={`h-2 rounded bg-gradient-to-r ${service.color} opacity-80`} style={{ width: `${Math.random() * 60 + 20}%` }} />
                              </motion.div>
                            ))}
                          </div>
                          
                          <motion.div 
                            animate={{ y: [10, -10, 10] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 right-8 -translate-y-1/2 bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex flex-col gap-4 shadow-xl"
                          >
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                              <Cpu className="w-6 h-6 text-white/80" />
                            </div>
                            <div className="space-y-2">
                               <div className="w-24 h-2 bg-white/20 rounded-full" />
                               <div className="w-16 h-2 bg-white/10 rounded-full" />
                            </div>
                          </motion.div>
                        </div>
                      </>
                    )}

                    {service.id !== 'ai-solutions' && index % 3 === 2 && (
                      <>
                        {/* Variant 2: Neural Network / Nodes */}
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Connecting Lines */}
                          <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                            <motion.line 
                              x1="30%" y1="30%" x2="70%" y2="70%" 
                              stroke="white" strokeWidth="1" strokeDasharray="4"
                              animate={{ strokeDashoffset: [0, 100] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.line 
                              x1="70%" y1="30%" x2="30%" y2="70%" 
                              stroke="white" strokeWidth="1" strokeDasharray="4"
                              animate={{ strokeDashoffset: [0, -100] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.line 
                              x1="50%" y1="20%" x2="50%" y2="80%" 
                              stroke="white" strokeWidth="1" strokeDasharray="4"
                              animate={{ strokeDashoffset: [0, 100] }}
                              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            />
                          </svg>

                          {/* Nodes */}
                          <motion.div 
                            animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }}
                            className="absolute top-[20%] left-[50%] -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                          />
                          <motion.div 
                            animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                            className="absolute bottom-[20%] left-[50%] -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                          />
                          <motion.div 
                            animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            className="absolute top-[30%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/60"
                          />
                          <motion.div 
                            animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                            className="absolute bottom-[30%] right-[30%] translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-white/60"
                          />
                          <motion.div 
                            animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
                            className="absolute top-[30%] right-[30%] translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/60"
                          />
                          <motion.div 
                            animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
                            className="absolute bottom-[30%] left-[30%] -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-white/60"
                          />

                          {/* Center Node */}
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${service.color} p-[2px] shadow-2xl relative z-10 flex items-center justify-center rotate-45`}
                          >
                            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                              <div className="-rotate-45">
                                <Network className="w-10 h-10 text-white" />
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </>
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
