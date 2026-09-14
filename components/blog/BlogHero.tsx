'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';

export default function BlogHero() {
  return (
    <section className="relative w-full bg-[#052123] overflow-hidden pt-12 pb-20">
      {/* Animated Ambient Background Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-1/4 w-[30rem] h-[30rem] bg-[#1a7097] rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" 
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.25, 0.1],
          x: [0, -50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-20 right-1/4 w-[25rem] h-[25rem] bg-[#FFBF00] rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" 
      />

      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
          x: [0, 0, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[45rem] h-[45rem] bg-[#0A4044] rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" 
      />

      {/* Sophisticated Grid Pattern with radial mask */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(249,250,251,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(249,250,251,0.04)_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_20%,#000_10%,transparent_80%)] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center mt-4 md:mt-8">
        
        {/* Premium Kicker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.1)] mb-10 md:mb-14 hover:bg-white/10 transition-colors cursor-default"
        >
          <Sparkles className="w-4 h-4 text-[#FFBF00]" />
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#F9FAFB] uppercase">
            Engineering Insights & Agency Journal
          </span>
        </motion.div>

        {/* Sophisticated Typography */}
        <div className="flex flex-col items-center justify-center text-center leading-[0.9] tracking-tighter select-none z-10">
          <motion.div 
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
             className="overflow-hidden pb-2"
          >
            <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#F9FAFB] to-[#F9FAFB]/60 font-[Zain] uppercase drop-shadow-sm">
              The
            </h1>
          </motion.div>
          <motion.div 
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
             className="overflow-hidden mt-[-1rem] sm:mt-[-2rem] md:mt-[-3rem] lg:mt-[-4rem] pb-6"
          >
            <h1 className="text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[12rem] font-black font-[Zain] uppercase flex relative group">
              <span className="absolute inset-0 text-[#FFBF00] blur-[40px] opacity-30 group-hover:opacity-60 transition-opacity duration-700">Journal.</span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#FFBF00] via-[#FFD040] to-[#FFBF00] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                Journal.
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-10 max-w-2xl text-center"
        >
          <p className="text-base sm:text-lg md:text-xl text-[#F9FAFB]/70 font-light leading-relaxed font-[IBM_Plex_Sans]">
            Where architecture meets aesthetic. Discover our latest thoughts on <span className="text-white font-medium border-b border-[#FFBF00]/40 pb-0.5">engineering, design systems</span>, and building the future of the web.
          </p>
        </motion.div>

        {/* Elegant Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14"
        >
          <button onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })} className="group inline-flex items-center justify-center w-14 h-14 rounded-full border border-white/10 bg-white/5 hover:bg-[#FFBF00] hover:border-[#FFBF00] transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,191,0,0.3)]">
            <ArrowDown className="w-5 h-5 text-white group-hover:text-[#052123] group-hover:translate-y-1 transition-all duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
