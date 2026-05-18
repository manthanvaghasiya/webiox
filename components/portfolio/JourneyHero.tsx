'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, Variants } from 'framer-motion';
import { allProjects } from '@/data/projects';

const JourneyHero = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = allProjects.map(p => p.image);

  // Slideshow Logic - Swaps image every 4 seconds
  useEffect(() => {
    if (!images || images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // Tie text slightly to parallax
  const yText = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const yMarquee = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);
  const xMarquee1 = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);
  const xMarquee2 = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const opacityText = useTransform(smoothProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const textVariants: Variants = {
    hidden: { y: 100, opacity: 0, scale: 0.95 },
    show: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", damping: 25, stiffness: 80, mass: 1 } }
  };

  const getAnimation = (index: number) => {
    const type = index % 4;
    switch (type) {
      case 0: return { initial: { opacity: 0, y: "100%", scale: 1.1 }, animate: { opacity: 1, y: "0%", scale: 1 }, exit: { opacity: 0, y: "-100%", scale: 0.9 }, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } };
      case 1: return { initial: { opacity: 0, x: "-100%" }, animate: { opacity: 1, x: "0%" }, exit: { opacity: 0, x: "100%" }, transition: { duration: 1.2, ease: "anticipate" as const } };
      case 2: return { initial: { opacity: 0, scale: 1.5, filter: "blur(20px)" }, animate: { opacity: 1, scale: 1, filter: "blur(0px)" }, exit: { opacity: 0, scale: 0.5, filter: "blur(20px)" }, transition: { duration: 1.5, ease: "easeOut" as const } };
      case 3: return { initial: { opacity: 0, rotate: 20, scale: 0.8 }, animate: { opacity: 1, rotate: 0, scale: 1 }, exit: { opacity: 0, rotate: -20, scale: 0.8 }, transition: { type: "spring" as const, bounce: 0.4, duration: 1.5 } };
      default: return {};
    }
  };

  const anim = getAnimation(currentIndex);

  return (
    <section ref={containerRef} className="relative min-h-[70vh] md:min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-[#0E5E64] text-slate-900 selection:bg-primary/20 selection:text-primary pt-20 pb-4 sm:pt-24" style={{ perspective: "1000px" }}>

      {/* Light cursor aura */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 hidden md:block"
        style={{ background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.03), transparent 60%)` }}
      />

      {/* Atmospheric Glow Orbs to fill corner spaces elegantly */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-teal-300/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      {/* Subtle Architectural Dot Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,#000_10%,transparent_100%)] pointer-events-none" />

      {/* Massive Background Typography (Marquee Effect filling extreme blank space) */}
      <motion.div style={{ y: yMarquee }} className="absolute inset-0 flex flex-col justify-center gap-16 md:gap-32 pointer-events-none z-0 overflow-hidden opacity-[0.03] select-none">
        <motion.div style={{ x: xMarquee1 }} className="whitespace-nowrap flex items-center">
          <h2 className="text-[12rem] md:text-[20rem] font-bold tracking-tighter leading-none">DIGITAL — EXPERIENCES — BRANDING —</h2>
        </motion.div>
        <motion.div style={{ x: xMarquee2 }} className="whitespace-nowrap flex items-center ml-[-50vw]">
          <h2 className="text-[12rem] md:text-[20rem] font-bold tracking-tighter leading-none font-serif italic">INNOVATION — CRAFT — ARCHITECTURE —</h2>
        </motion.div>
      </motion.div>

      {/* Edge Framing & Technical Accents filling the sides */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden sm:block">
        <div className="absolute top-12 bottom-12 left-12 right-12 border border-slate-200/60 rounded-xl" />
        <div className="absolute top-12 left-12 w-3 h-3 border-t-2 border-l-2 border-slate-400" />
        <div className="absolute top-12 right-12 w-3 h-3 border-t-2 border-r-2 border-slate-400" />
        <div className="absolute bottom-12 left-12 w-3 h-3 border-b-2 border-l-2 border-slate-400" />
        <div className="absolute bottom-12 right-12 w-3 h-3 border-b-2 border-r-2 border-slate-400" />
        <div className="absolute top-16 left-16 text-slate-400 text-[10px] font-mono uppercase tracking-widest">Global Portfolio / 2026</div>
        <div className="absolute bottom-16 right-16 text-slate-400 text-[10px] font-mono uppercase tracking-widest hidden md:block">Scroll Index (0.00—1.00)</div>
        <div className="absolute left-[2.5rem] top-1/2 -translate-y-1/2 -rotate-90 origin-left text-primary/60 text-[10px] font-mono uppercase tracking-widest hidden lg:block">System Design</div>
        <div className="absolute right-[1.5rem] top-1/2 -translate-y-1/2 rotate-90 origin-right text-primary/60 text-[10px] font-mono uppercase tracking-widest hidden lg:block">Architecture</div>
      </div>

      {/* Main Typography Block - Strictly constrained to center to rigorously prevent overlap */}
      <motion.div style={{ y: yText, opacity: opacityText }} className="relative z-20 w-full max-w-[100rem] mx-auto px-6 sm:px-8 flex flex-col items-center justify-center h-full pointer-events-none">

        <div className="flex flex-col items-center text-center w-full max-w-5xl mx-auto">

          {/* Top Pill Label */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="flex items-center gap-3 mb-6 sm:mb-10 bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border border-slate-200 shadow-sm pointer-events-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.4em] text-slate-500 uppercase">
              Curated Portfolio
            </span>
          </motion.div>

          {/* Typography Assembly */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } } }}
            className="w-full flex flex-col items-center pointer-events-auto"
          >

            {/* Top Text Row - SELECTED only */}
            <div className="overflow-hidden pb-1 sm:pb-4 flex items-center justify-center w-full">
              <motion.h1 variants={textVariants} className="text-[4rem] sm:text-6xl md:text-[7rem] lg:text-[8rem] xl:text-[9.5rem] font-bold tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-[#F9FAFB] to-[#FFBF00] transform-gpu whitespace-nowrap">
                SELECTED
              </motion.h1>
            </div>

            {/* Bottom Text Row - Slideshow Pill + WORK */}
            <div className="overflow-hidden pb-2 flex flex-col lg:flex-row items-center gap-4 lg:gap-8 justify-center transform-gpu w-full">
              {/* Dynamic Slideshow Inline Pill - STRICTLY BOUND NO-OVERLAP */}
              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 60, damping: 20 } } }}
                className="hidden lg:block w-64 lg:w-[24rem] xl:w-[32rem] h-[6rem] lg:h-[8rem] xl:h-[10rem] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] relative transform-gpu group border-[8px] border-white/50 bg-white"
              >
                {images && images.length > 0 && (
                  <AnimatePresence mode="popLayout" custom={currentIndex}>
                    <motion.img
                      key={currentIndex}
                      src={images[currentIndex]}
                      alt="Highlight Cycle"
                      initial={anim.initial}
                      animate={anim.animate}
                      exit={anim.exit}
                      transition={anim.transition}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 will-change-transform"
                    />
                  </AnimatePresence>
                )}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 z-10 pointer-events-none" />
              </motion.div>

              <motion.h1 variants={textVariants} className="text-[4.5rem] sm:text-6xl md:text-[7.5rem] lg:text-[9rem] xl:text-[10.5rem] font-bold tracking-tighter leading-[0.85] italic font-serif text-[#F9FAFB] flex items-center">
                WORK<span className="text-[#FFBF00] font-sans not-italic text-[1em]">.</span>
              </motion.h1>
            </div>

            {/* Subtext description constrained to center */}
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }} className="mt-8 md:mt-12 text-sm sm:text-base md:text-lg text-slate-500 font-medium tracking-wide leading-relaxed max-w-lg mx-auto text-center px-6 md:px-8 py-4 bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-slate-200/50 pointer-events-none">
              Witness the intersection of high-end aesthetics and profound engineering through our finest digital architectures.
            </motion.p>

          </motion.div>
        </div>
      </motion.div>

    </section>
  );
};

export default JourneyHero;
