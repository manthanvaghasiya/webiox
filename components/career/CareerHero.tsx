'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function CareerHero() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0A1A1C] text-white selection:bg-[#FFBF00]/30 selection:text-[#FFBF00] pt-24 pb-20">
      
      {/* Animated Ambient Background Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-[#1a7097] rounded-full mix-blend-screen filter blur-[140px] pointer-events-none" 
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 right-1/4 w-[35rem] h-[35rem] bg-[#FFBF00] rounded-full mix-blend-screen filter blur-[150px] pointer-events-none" 
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_40%,#000_10%,transparent_70%)] pointer-events-none" />

      {/* Kinetic Marquee Background */}
      <div className="absolute inset-0 flex flex-col justify-center overflow-hidden opacity-[0.03] z-0 pointer-events-none">
        <motion.div 
          animate={{ x: [0, -2000] }} 
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="text-[12vw] font-black whitespace-nowrap leading-none mb-12 font-[Zain] uppercase tracking-wider"
        >
          INNOVATE CREATE BUILD SCALE INNOVATE CREATE BUILD SCALE
        </motion.div>
        <motion.div 
          animate={{ x: [-2000, 0] }} 
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
          className="text-[12vw] font-black whitespace-nowrap leading-none text-transparent font-[Zain] uppercase tracking-wider"
          style={{ WebkitTextStroke: '2px white' }}
        >
          ENGINEER DESIGN ARCHITECT ENGINEER DESIGN ARCHITECT
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center mt-8">
        
        {/* Premium Kicker */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.1)] mb-10 md:mb-14 hover:bg-white/10 transition-colors cursor-default"
        >
          <Sparkles className="w-4 h-4 text-[#FFBF00]" />
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-white uppercase">
            Careers at Webiox
          </span>
        </motion.div>

        {/* Massive Visible Typography */}
        <div className="relative w-full flex flex-col items-center justify-center leading-[0.85] tracking-tighter uppercase font-[Zain]">
          <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
             className="overflow-hidden pb-4"
          >
            <h1 className="text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-sm">
              Shape The
            </h1>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
             className="overflow-hidden mt-[-2rem] sm:mt-[-3rem] md:mt-[-4rem] pb-8"
          >
            <h1 className="text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[13rem] font-black flex relative group">
              {/* Glowing shadow behind */}
              <span className="absolute inset-0 text-[#FFBF00] blur-[40px] opacity-40 group-hover:opacity-70 transition-opacity duration-700">Future.</span>
              {/* Main glowing text */}
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#FFBF00] via-[#FFD040] to-[#FFBF00] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                Future.
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-10 max-w-2xl text-center"
        >
          <p className="text-base sm:text-lg md:text-xl text-white/70 font-light leading-relaxed font-[IBM_Plex_Sans]">
            We are looking for passionate builders, creative thinkers, and relentless innovators to craft <span className="text-white font-medium border-b border-[#FFBF00]/40 pb-0.5">next-generation</span> digital experiences.
          </p>
        </motion.div>

        {/* Elegant Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14"
        >
          <Link href="#open-roles">
            <button className="group inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/20 bg-white/10 hover:bg-[#FFBF00] hover:border-[#FFBF00] hover:text-[#0A1A1C] transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,191,0,0.3)] backdrop-blur-md">
              <span className="font-semibold text-sm sm:text-base tracking-wide text-white group-hover:text-[#0A1A1C] transition-colors">View Open Roles</span>
              <ArrowDown className="w-5 h-5 text-white group-hover:text-[#0A1A1C] group-hover:translate-y-1 transition-all duration-300" />
            </button>
          </Link>
        </motion.div>
        
      </div>
    </section>
  );
}
