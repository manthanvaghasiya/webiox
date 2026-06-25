'use client';

import { motion } from 'framer-motion';
import { Hexagon } from 'lucide-react';

export default function BlogHero() {
  return (
    <section className="relative w-full bg-[#0E5E64] overflow-hidden pt-24 pb-32">
      {/* Absolute Background Grid for 'Engineering' feel */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(249,250,251,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,250,251,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_10%,transparent_80%)] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center mt-12 md:mt-20">
        
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F9FAFB]/15 bg-[#F9FAFB]/[0.05] backdrop-blur-xl mb-8 md:mb-12"
        >
          <Hexagon className="w-3.5 h-3.5 text-[#FFBF00]" fill="#FFBF00" fillOpacity={0.2} />
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#F9FAFB]/80 uppercase">
            Webiox Insights
          </span>
        </motion.div>

        {/* Massive Clean Typography */}
        <div className="flex flex-col items-center justify-center text-center leading-[0.85] tracking-tighter select-none">
          <div className="overflow-hidden pb-4">
            <motion.h1
              initial={{ y: 150, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[5rem] sm:text-[8rem] md:text-[10rem] lg:text-[13rem] xl:text-[15rem] font-black text-[#F9FAFB] font-[Zain] uppercase drop-shadow-2xl"
            >
              The
            </motion.h1>
          </div>
          <div className="overflow-hidden mt-[-2rem] sm:mt-[-3rem] md:mt-[-4rem] lg:mt-[-5rem] pb-4">
            <motion.h1
              initial={{ y: 150, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[5rem] sm:text-[8rem] md:text-[10rem] lg:text-[13rem] xl:text-[15rem] font-black font-[Zain] uppercase flex"
            >
              <span className="text-[#FFBF00] drop-shadow-[0_10px_30px_rgba(255,191,0,0.2)]">
                Journal.
              </span>
            </motion.h1>
          </div>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-8 md:mt-12 max-w-2xl text-center"
        >
          <p className="text-lg md:text-xl text-[#F9FAFB]/70 font-light leading-relaxed font-[IBM_Plex_Sans]">
            Where architecture meets aesthetic. Discover our latest thoughts on <span className="text-[#F9FAFB] font-medium">engineering, design systems</span>, and building the future of the web.
          </p>
        </motion.div>
      </div>

      {/* Wavy Bottom Divider to match Home & Services */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg
          className="relative block w-full h-[40px] md:h-[60px] lg:h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 C377,-120 700,300 1200,0 V120 H0 Z"
            className="fill-[#FAFAFA]"
          />
        </svg>
      </div>
    </section>
  );
}
