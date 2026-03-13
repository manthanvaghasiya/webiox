import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

// --- Premium Easing for Cinematic Reveals ---
const ease = [0.76, 0, 0.24, 1];

// --- Magnetic Button Component ---
const MagneticButton = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (isTouchDevice) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3); // Magnetic pull strength
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: isTouchDevice ? 0 : smoothX, y: isTouchDevice ? 0 : smoothY }}
      className="inline-block mt-12 md:mt-16"
    >
      <motion.button 
        className="group relative flex items-center justify-center gap-4 bg-[#FFB800] text-[#002583] px-10 py-5 rounded-full text-lg lg:text-xl font-bold overflow-hidden shadow-[0_20px_40px_rgba(255,184,0,0.3)] hover:shadow-[0_25px_50px_rgba(255,184,0,0.4)] transition-shadow duration-500"
        whileHover={isTouchDevice ? {} : { scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10">{children}</span>
        <div className="relative z-10 w-10 h-10 rounded-full bg-[#002583] flex items-center justify-center text-white group-hover:-rotate-45 transition-transform duration-500">
          <ArrowRight className="w-5 h-5" />
        </div>
      </motion.button>
    </motion.div>
  );
};

// --- Cinematic Masked Text Reveal Component ---
const CinematicText = ({ text }) => {
  const words = text.split(" ");
  
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.3 } 
    }
  };

  const wordVars = {
    hidden: { y: "100%", rotate: 5, opacity: 0 },
    visible: { 
      y: 0, 
      rotate: 0,
      opacity: 1,
      transition: { duration: 1.4, ease: ease } 
    }
  };

  return (
    <motion.div 
      variants={containerVars} 
      initial="hidden" 
      animate="visible"
      className="flex flex-wrap justify-center gap-x-4 gap-y-2 lg:gap-x-8 lg:gap-y-4"
    >
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden pb-4 md:pb-6 -mb-4 md:-mb-6">
          <motion.span variants={wordVars} className="inline-block">
            {word}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
};


// --- Main Hero Component ---
const Hero = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section className="relative min-h-[100vh] w-full bg-[#E5E8EF] overflow-hidden selection:bg-[#002583] selection:text-white flex items-center justify-center text-center">
      
      {/* 1. Cinematic Background Glowing Orbs (Mustard Yellow and Soft Blue) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* Soft floating orb 1 (Mustard Yellow) */}
        <motion.div 
          animate={{ 
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#FFB800] rounded-full mix-blend-multiply opacity-[0.08] blur-[120px]"
        />
        
        {/* Soft floating orb 2 (Strong Blue) */}
        <motion.div 
          animate={{ 
            x: [0, -100, 50, 0],
            y: [0, 100, -50, 0],
            scale: [1, 0.8, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] max-w-[700px] max-h-[700px] bg-[#002583] rounded-full mix-blend-multiply opacity-[0.06] blur-[140px]"
        />

      </div>

      {/* Main Centered Content */}
      <motion.div 
        style={{ y: yParallax }}
        className="relative z-10 w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 pt-16 flex flex-col items-center"
      >
        
        {/* Pre-title Reveal */}
        <div className="overflow-hidden mb-8 md:mb-12">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: ease }}
            className="flex items-center gap-4 justify-center"
          >
            <div className="w-12 h-[2px] bg-[#FFB800]" />
            <span className="text-[#002583] font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
              The Digital Masterpiece
            </span>
            <div className="w-12 h-[2px] bg-[#FFB800]" />
          </motion.div>
        </div>

        {/* 2. Massive Cinematic Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-[#002583] leading-[1.05] tracking-tight uppercase max-w-7xl mx-auto">
          <CinematicText text="Designing The Digital Future." />
        </h1>

        {/* Subtitle Reveal */}
        <div className="overflow-hidden mt-10 md:mt-16 max-w-3xl mx-auto">
          <motion.p 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5, ease: ease }}
            className="text-lg md:text-2xl lg:text-3xl text-gray-600 font-medium leading-relaxed px-4"
          >
            We engineer breathtaking web experiences for brands that refuse to be ordinary.
          </motion.p>
        </div>

        {/* 3. Reveal Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: ease }}
        >
          <MagneticButton>Start a Project</MagneticButton>
        </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="uppercase text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#002583]/60">Scroll to Explore</span>
        <motion.div 
          animate={{ height: ["0%", "100%", "0%"], y: [0, 0, 40] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-[#002583]/30 overflow-hidden relative"
        >
           <motion.div 
              animate={{ y: [-40, 40] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-full h-1/2 bg-[#002583]"
           />
        </motion.div>
      </motion.div>
      
    </section>
  );
};

export default Hero;
