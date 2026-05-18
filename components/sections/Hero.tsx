'use client';

import React, { Suspense } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative w-full bg-[#0E5E64] overflow-hidden">

      {/* Background 3D Scene */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* The Content Grid (pointer-events-none so mouse passes through to Canvas) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 md:pt-20 md:pb-20 xl:pb-20 flex items-center pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full mt-10 lg:mt-0">

          {/* Left Column: Typography & CTA */}
          <div className="flex flex-col justify-center text-[#F9FAFB]">
            <h1 className="text-4xl md:text-5xl lg:text-[45px] lg:leading-[1.1] font-bold tracking-tight mb-2 font-[Zain] font-normal">

              {/* Line 1: 'Developing' + Typewriter */}
              <span className="flex flex-row items-center flex-wrap md:flex-nowrap gap-x-2 gap-y-1 lg:gap-4 mb-1 lg:mb-2">
                <span>Developing</span>
                <span className="text-[#FFBF00] min-w-[220px] sm:min-w-[280px] lg:min-w-[400px] font-[Alice] font-normal relative">
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
              <span className="block mt-1 md:mt-0">
                For Industry Leaders.
              </span>
            </h1>

            {/* Micro-copy / Kicker */}
            <div className="flex items-center gap-3 text-[#F9FAFB] font-medium tracking-wide mb-6 flex-wrap">
              <span>On Time</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F9FAFB]/50"></span>
              <span>On Budget</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F9FAFB]/50"></span>
              <span>On Target</span>
            </div>

            <p className="text-lg lg:text-xl text-[#F9FAFB]/90 mb-10 max-w-lg font-[IBM_Plex_Sans] font-normal leading-relaxed">
              We build high-speed websites, custom software, and smart AI agents to help businesses grow faster and smarter.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-full sm:w-auto bg-[#F9FAFB] text-[#0E5E64] px-6 py-4 lg:px-8 lg:py-5 rounded-full font-bold shadow-lg"
                >
                  Start Project
                </motion.button>
              </Link>
              <Link href="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-full sm:w-auto bg-transparent text-[#F9FAFB] border-2 border-[#F9FAFB] px-6 py-4 lg:px-8 lg:py-5 rounded-full font-bold"
                >
                  View Our Work
                </motion.button>
              </Link>
            </div>

          </div>

          {/* Right Column: 3D Developer Scene Image */}
          <div className="flex items-center justify-center lg:justify-end w-full h-[400px] sm:h-[500px] lg:h-full pointer-events-none relative pr-0 lg:pr-10 mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] select-none pointer-events-none"
            >
              <motion.img
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                src="/DeveloperScene.png"
                alt="3D Developer Holding Holographic Screen"
                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Wavy Bottom Divider */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg
          className="relative block w-full h-[40px] md:h-[60px] lg:h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 C377,-120 700,300 1200,0 V120 H0 Z"
            className="fill-[#FAFBFC]"
          />
        </svg>
      </div>

    </section>
  );
};

export default Hero;
