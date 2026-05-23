'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { staggerContainer, fadeUpVariant, lineDrawVariant, letterStaggerContainer, letterVariant } from '../../lib/motion/about';

const rotatingWords = [
  "Digital Excellence",
  "Bold Brands",
  "Future Tech",
  "Elite Experiences"
];

export default function AboutHero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effect on scroll
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Spotlight Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const spotlightY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const headline = "WEBIOX";

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[80vh] md:min-h-[85vh] bg-[#0E5E64] flex flex-col justify-between overflow-hidden rounded-b-[8rem]"
    >
      {/* Interactive Spotlight Overlay */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: `radial-gradient(circle 600px at calc(${spotlightX.get()}px) calc(${spotlightY.get()}px), rgba(255,191,0,0.15), transparent 80%)`,
        }}
      />
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-color-dodge"
        style={{
          background: `radial-gradient(circle 300px at calc(${spotlightX.get()}px) calc(${spotlightY.get()}px), rgba(255,255,255,0.1), transparent 80%)`,
        }}
      />



      {/* Main Content Container */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{ y: yParallax, opacity: opacityParallax }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center justify-center h-full flex-grow pt-16 pb-8"
      >
        {/* Center Massive Typography */}
        <div className="flex flex-col justify-center items-center w-full relative group">

          {/* Kicker */}
          <motion.div variants={fadeUpVariant} className="overflow-hidden mb-2 lg:mb-0 w-full text-left">
            <span className="font-[Alice] text-2xl md:text-4xl lg:text-5xl text-[#FFBF00] italic">
              We are
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between w-full">
            {/* Letter Stagger Reveal - Hollow Stroke Effect that fills on hover */}
            <motion.h1
              variants={letterStaggerContainer}
              className="text-[18vw] lg:text-[15vw] leading-[0.8] font-bold tracking-tighter font-[Zain] text-transparent uppercase flex justify-start transition-all duration-700 ease-in-out hover:text-[#F9FAFB] cursor-default select-none"
              style={{ WebkitTextStroke: "2px #F9FAFB" }}
            >
              {headline.split('').map((char, index) => (
                <span key={index} className="overflow-hidden block">
                  <motion.span variants={letterVariant} className="block inline-block transition-transform duration-500 hover:scale-110 hover:text-[#FFBF00]">
                    {char}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            {/* Description Moved to Right Side */}
            <motion.div variants={fadeUpVariant} className="mt-8 lg:mt-0 lg:w-1/3 lg:pb-6 lg:pl-12">
              <p className="text-lg md:text-xl text-[#F9FAFB]/80 font-[IBM_Plex_Sans] font-normal leading-relaxed border-l-2 border-[#FFBF00] pl-6">
                A collective of visionary engineers, designers, and strategists obsessed with building products that defy the ordinary and dominate the digital landscape.
              </p>
            </motion.div>
          </div>

          {/* Crafting Digital Excellence — with Marquee above */}
          <div className="w-full mt-4 lg:mt-6 relative z-20 flex flex-col">
            
            {/* Infinite Marquee - Breaks out of container, sits above Crafting */}
            <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] overflow-hidden whitespace-nowrap bg-[#0E5E64]/60 backdrop-blur-md border-y border-[#FFBF00]/20 py-4 flex items-center shadow-[0_0_30px_rgba(14,94,100,0.5)] mb-4 lg:mb-6">
              <motion.div
                animate={{ x: [0, -1035] }} // Adjust based on text width
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                className="flex whitespace-nowrap text-[#F9FAFB]/60 font-[IBM_Plex_Sans] text-xs tracking-[0.2em] uppercase"
              >
                {/* Duplicate text 4 times for infinite loop illusion */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center">
                    <span className="mx-8">Digital Agency</span>
                    <span className="w-1.5 h-1.5 bg-[#FFBF00] rounded-full"></span>
                    <span className="mx-8">Established 2026</span>
                    <span className="w-1.5 h-1.5 bg-[#FFBF00] rounded-full"></span>
                    <span className="mx-8">Global Reach</span>
                    <span className="w-1.5 h-1.5 bg-[#FFBF00] rounded-full"></span>
                    <span className="mx-8 text-[#FFBF00] font-bold">Crafting Elite Experiences</span>
                    <span className="w-1.5 h-1.5 bg-[#FFBF00] rounded-full"></span>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="flex w-full items-center justify-end">
              {/* Line in front of crafting */}
              <motion.div variants={lineDrawVariant} className="flex-grow h-[1px] bg-[#F9FAFB]/30 mr-6 md:mr-12" />

              <motion.div variants={fadeUpVariant} className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-[Alice] text-[#F9FAFB] leading-[1.1] whitespace-nowrap">
                <span>Crafting </span>
                <span className="relative inline-block w-[280px] sm:w-[380px] lg:w-[480px] xl:w-[670px] h-[1.1em] overflow-hidden align-bottom">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={currentWordIndex}
                      initial={{ y: "100%", opacity: 0, rotateX: -45 }}
                      animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                      exit={{ y: "-100%", opacity: 0, rotateX: 45 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 top-0 text-[#FFBF00] whitespace-nowrap drop-shadow-[0_0_15px_rgba(255,191,0,0.4)]"
                    >
                      {rotatingWords[currentWordIndex]}.
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
