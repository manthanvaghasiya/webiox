'use client';

import React, { Suspense } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative z-10 w-full bg-[#1a7097]">
      {/* Background container with overflow-hidden to clip 3D elements, but allow Wavy Divider to bleed out */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background 3D Scene */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>

        {/* Visibility Overlay */}
        <div className="absolute inset-0 z-[5] bg-gradient-to-b lg:bg-gradient-to-r from-[#1a7097]/95 via-[#1a7097]/20 to-[#1a7097]/90 pointer-events-none" />
      </div>

      {/* The Content Grid (pointer-events-none so mouse passes through to Canvas) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-4 md:pt-20 md:pb-10 lg:pb-8 flex items-center pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full mt-10 lg:mt-0">

          {/* Left Column: Typography & CTA */}
          <div className="flex flex-col justify-center text-[#F9FAFB] relative z-20">
            <h1 className="text-3xl leading-[1.1] min-[380px]:text-4xl sm:text-5xl lg:text-[42px] xl:text-[48px] font-bold tracking-tight mb-2 sm:mb-4 font-[Zain] font-normal drop-shadow-md">

              {/* Line 1: 'Developing' + Typewriter */}
              <span className="flex flex-col md:flex-row md:items-center md:flex-nowrap gap-x-2 xl:gap-x-3 mb-2 sm:mb-1 lg:mb-2 min-h-[2.2em] md:min-h-0">
                <span className="block whitespace-nowrap">Developing</span>
                <span className="text-[#FFBF00] font-[Alice] font-normal relative drop-shadow-lg block whitespace-nowrap">
                  <Typewriter
                    words={['Digital Platforms', 'Custom Software', 'AI Workflows']}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </span>
              </span>

              {/* Line 2 */}
              <span className="block mt-2 sm:mt-1 md:mt-0">
                For Industry Leaders.
              </span>
            </h1>

            {/* Micro-copy / Kicker */}
            <div className="flex items-center gap-2 sm:gap-3 text-[#F9FAFB] font-medium tracking-wide mb-6 flex-wrap drop-shadow-sm text-xs sm:text-sm">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFBF00] font-bold text-xs uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#FFBF00] animate-pulse"></span>
                Gujarat&apos;s Premier Tech Agency
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#F9FAFB]/40"></span>
              <span className="text-white/80">Sub-Second Speed SLA</span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#F9FAFB]/40"></span>
              <span className="text-white/80">Enterprise Scalability</span>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-[#F9FAFB]/90 mb-8 sm:mb-10 max-w-lg font-normal leading-relaxed drop-shadow-md">
              We architect ultra-fast web flagships, enterprise SaaS platforms, and custom AI agents for ambitious businesses in Gujarat and across the globe.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-row items-center gap-3 sm:gap-4 pointer-events-auto w-full sm:w-auto">
              <Link href="/contact" className="flex-1 sm:flex-none">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-full bg-[#FFBF00] text-slate-950 px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8 lg:py-5 rounded-full font-extrabold shadow-xl hover:shadow-[#FFBF00]/30 transition-all text-center text-sm sm:text-base whitespace-nowrap cursor-pointer"
                >
                  Start a Project
                </motion.button>
              </Link>
              <Link href="/portfolio" className="flex-1 sm:flex-none">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-full bg-transparent text-[#F9FAFB] border-2 border-[#F9FAFB]/60 hover:border-white px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8 lg:py-5 rounded-full font-bold text-center text-sm sm:text-base whitespace-nowrap transition-colors cursor-pointer"
                >
                  Explore Work
                </motion.button>
              </Link>
            </div>

          </div>

          {/* Right Column: 3D Developer Scene Image */}
          <div className="flex items-center justify-center lg:justify-end w-full h-auto lg:h-full pointer-events-none relative pr-0 lg:pr-10 mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              className="w-full max-w-[540px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] select-none pointer-events-none"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/DeveloperScene.png"
                  alt="3D Developer Holding Holographic Screen"
                  width={600}
                  height={600}
                  priority
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
