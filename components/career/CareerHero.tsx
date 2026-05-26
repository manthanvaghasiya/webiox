'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CareerHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion values for smooth 60fps tracking without React re-renders
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const maskSize = useMotionValue(0);

  // Smooth springs for tracking
  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });
  const springMaskSize = useSpring(maskSize, { stiffness: 400, damping: 40 });

  // Template for the CSS mask property
  const maskImage = useMotionTemplate`radial-gradient(circle ${springMaskSize}px at ${springX}px ${springY}px, black 0%, transparent 100%)`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    
    const heroElement = containerRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', updateMousePosition);
      heroElement.addEventListener('mouseenter', () => maskSize.set(250));
      heroElement.addEventListener('mouseleave', () => maskSize.set(0));
    }
    
    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', updateMousePosition);
        heroElement.removeEventListener('mouseenter', () => maskSize.set(250));
        heroElement.removeEventListener('mouseleave', () => maskSize.set(0));
      }
    };
  }, [mouseX, mouseY, maskSize]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0E5E64] text-white selection:bg-[#FFBF00]/30 selection:text-[#FFBF00]"
    >
      {/* Background Grid & Noise */}
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Kinetic Marquee Background */}
      <div className="absolute inset-0 flex flex-col justify-center overflow-hidden opacity-[0.02] z-0 pointer-events-none">
        <motion.div 
          animate={{ x: [0, -2000] }} 
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="text-[12vw] font-bold whitespace-nowrap leading-none mb-12 font-[Zain] uppercase"
        >
          INNOVATE CREATE BUILD SCALE INNOVATE CREATE BUILD SCALE
        </motion.div>
        <motion.div 
          animate={{ x: [-2000, 0] }} 
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
          className="text-[12vw] font-bold whitespace-nowrap leading-none text-transparent font-[Zain] uppercase"
          style={{ WebkitTextStroke: '2px white' }}
        >
          ENGINEER DESIGN ARCHITECT ENGINEER DESIGN ARCHITECT
        </motion.div>
      </div>

      {/* Main Content Container (Parallax) */}
      <motion.div style={{ y: yText }} className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center pt-20">
        
        {/* Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-[#FFBF00]" />
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-white/80">
            Join Webiox
          </span>
        </motion.div>

        {/* The Base Dim Text */}
        <div className="relative w-full flex flex-col items-center justify-center">
          <h1 className="text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold leading-[0.85] tracking-tighter uppercase font-[Zain] text-white/10">
            Shape The <br /> Future.
          </h1>
          
          {/* The Spotlight Glowing Text (Revealed by mouse mask) */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{
              WebkitMaskImage: maskImage,
              maskImage: maskImage,
            } as any}
          >
            <h1 className="text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold leading-[0.85] tracking-tighter uppercase font-[Zain] text-transparent bg-clip-text bg-gradient-to-r from-[#FFBF00] via-yellow-200 to-[#FFBF00] drop-shadow-[0_0_30px_rgba(255,191,0,0.6)]">
              Shape The <br /> Future.
            </h1>
          </motion.div>
        </div>

        {/* Description & CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 flex flex-col items-center"
        >
          <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl leading-relaxed mb-8">
            We are looking for passionate builders, creative thinkers, and relentless innovators to craft next-generation digital experiences.
          </p>
          
          <Link href="#open-roles">
            <button className="group h-12 px-8 rounded-full bg-white text-[#0E5E64] font-bold text-sm tracking-wide overflow-hidden transition-all hover:scale-105 flex items-center gap-3">
              <span>View Open Roles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
        
      </motion.div>

      {/* Diagonal Cut to next section */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30 transform translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
          <path d="M1200 120L0 120 0 0 1200 120z" fill="#F9FAFB"></path>
        </svg>
      </div>
      
    </section>
  );
}
