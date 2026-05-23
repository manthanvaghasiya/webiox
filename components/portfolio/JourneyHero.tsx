'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { allProjects } from '@/data/projects';
import { ArrowDownRight, Sparkles } from 'lucide-react';

export default function JourneyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const images = allProjects.map((p) => p.image);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[90vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0E5E64] text-white selection:bg-[#FFBF00]/30 selection:text-[#FFBF00]"
    >
      {/* Dynamic Cursor Light */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-40 transition-opacity duration-500 hidden lg:block"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 191, 0, 0.08), transparent 80%)`
        }}
      />

      {/* Atmospheric Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#11737a] via-[#0E5E64] to-[#0a454a] opacity-80" />
      
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />



      <motion.div 
        style={{ y: yText, opacity: opacityFade }} 
        className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-20 md:pt-0 h-full flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
          
          {/* Left Side: Typography */}
          <div className="lg:col-span-6 flex flex-col items-start z-30">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-6 md:mb-10 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-[#FFBF00] animate-pulse" />
              <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.3em] text-white/70">
                Curated Cases
              </span>
            </motion.div>

            <div className="overflow-hidden flex flex-col">
              <motion.h1 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[4rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[7.5rem] xl:text-[8.5rem] font-bold leading-[0.85] tracking-tighter text-[#F9FAFB] uppercase font-[Zain]"
              >
                Selected
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 md:gap-6"
              >
                <h1 className="text-[4rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[7.5rem] xl:text-[8.5rem] font-bold leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#FFBF00] to-yellow-600 uppercase font-[Zain]">
                  Works.
                </h1>
                <ArrowDownRight className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white/20 hidden sm:block" strokeWidth={1} />
              </motion.div>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-6 md:mt-10 text-base md:text-lg lg:text-xl text-white/50 font-light max-w-md leading-relaxed border-l border-[#FFBF00]/30 pl-6"
            >
              Witness the intersection of high-end aesthetics and profound engineering. 
              We build scalable digital architecture for industry leaders.
            </motion.p>
          </div>

          {/* Right Side: Showcase Pill Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end z-20 w-full mt-12 lg:mt-0">
            <motion.div 
              style={{ y: yImage }}
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[30rem] sm:max-w-[36rem] lg:max-w-[42rem] xl:max-w-[48rem] aspect-[16/10] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-2 shadow-[0_0_80px_rgba(255,191,0,0.05)] group relative"
            >
              <div className="w-full h-full rounded-[1rem] md:rounded-[1.5rem] overflow-hidden relative bg-[#0a454a]">
                {images && images.length > 0 && (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentIndex}
                      src={images[currentIndex]}
                      alt="Selected Portfolio Work"
                      initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                    />
                  </AnimatePresence>
                )}
                {/* Image Overlay Gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Index Indicator */}
                <div className="absolute bottom-6 left-6 flex gap-2 z-10">
                  {images.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-6 bg-[#FFBF00]' : 'w-1.5 bg-white/40'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0E5E64] to-transparent pointer-events-none z-30" />

      {/* Elegant Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3 hidden sm:flex"
      >
        <span className="text-[10px] text-white/30 font-mono uppercase tracking-[0.4em]">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }} 
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-12 bg-gradient-to-b from-[#FFBF00]/80 to-transparent"
        />
      </motion.div>

    </section>
  );
}
