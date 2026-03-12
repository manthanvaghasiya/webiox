import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowDownRight } from 'lucide-react';

// Awwwards Style Details:
// 1. Asymmetrical Layout: No left/right split. Massive typography dominates the background.
// 2. Parallax & Mouse Tracking: Elements floating independent of standard grid rules.
// 3. Unconventional Stacking: Images overlapping text, breaking z-index norms.

const Hero = () => {
  const { scrollY } = useScroll();
  
  // Smooth parallax values for scrolling
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -400]);
  
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Mouse tracking for floating elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      mouseX.set(x * 50); // px range
      mouseY.set(y * 50); // px range
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-[120vh] w-full bg-brand-gray overflow-hidden selection:bg-brand-blue selection:text-white pt-20">
      
      {/* Abstract Noise Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} 
      />

      {/* Grid Pattern overlay - rotated for brutalist feel */}
      <div className="absolute inset-[-50%] z-0 rounded-full"
           style={{
              backgroundImage: 'radial-gradient(var(--tw-gradient-stops))',
              background: 'radial-gradient(circle at center, rgba(0, 37, 131, 0.03) 0, transparent 40%)',
              transform: 'rotate(-15deg) scale(2)'
           }}
      />

      {/* The main container breaks standard max-w grids to use full viewport width dynamically */}
      <div className="relative z-10 w-full h-full min-h-screen flex flex-col justify-center px-4 md:px-12 lg:px-24">
        
        {/* Layer 1: Massive Background Text (Parallax moves down) */}
        <motion.div 
          style={{ y: y1, opacity }}
          className="absolute top-[15%] left-[-5%] md:left-4 z-0 pointer-events-none w-full w-[120vw]"
        >
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] leading-[0.8] font-black text-brand-blue/5 uppercase tracking-tighter whitespace-nowrap"
          >
            Digital <br /> Visionary
          </motion.h1>
        </motion.div>

        {/* Layer 2: Foreground Content (Parallax moves up slightly, tracks mouse) */}
        <motion.div 
          style={{ x: smoothMouseX, y: smoothMouseY }}
          className="relative z-20 mt-32 md:mt-24 max-w-5xl"
        >
          {/* Animated line drawing in */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-1 bg-brand-blue w-24 mb-12 origin-left"
          />

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-blue leading-[0.9] tracking-tight uppercase"
            >
              We Reject
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-6 flex items-center flex-wrap gap-4">
            <motion.h2
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-600 leading-[0.9] tracking-tight uppercase"
            >
              The Ordinary.
            </motion.h2>
            
            {/* Contextual pill that floats within the headline */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: -5 }}
              transition={{ duration: 0.8, delay: 1, type: "spring", bounce: 0.5 }}
              className="px-6 py-2 rounded-full border-2 border-brand-yellow text-brand-blue font-bold text-lg bg-brand-yellow/10 backdrop-blur-md transform hidden md:inline-flex"
            >
              Established 2024
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-xl pl-4 md:pl-12 border-l-4 border-brand-yellow mt-12"
          >
            <p className="text-xl md:text-2xl font-medium text-brand-blue/80 leading-relaxed">
              We are an elite digital agency crafting bespoke, high-performance web experiences that refuse to conform to grid-locked templates.
            </p>
          </motion.div>
        </motion.div>

        {/* Layer 3: Unconventional Floating Action Button (Tracks mouse inverse) */}
        <motion.div
           style={{ 
             x: useTransform(smoothMouseX, (v) => -v * 1.5), 
             y: useTransform(smoothMouseY, (v) => -v * 1.5),
             opacity: useTransform(scrollY, [0, 300], [1, 0])
           }}
           className="absolute bottom-[20%] right-[10%] md:right-[20%] z-40 hidden md:block"
        >
          <a href="/portfolio" className="group relative w-48 h-48 rounded-full flex items-center justify-center pointer-events-auto">
            {/* Spinning text ring */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 rounded-full border border-brand-blue/20 group-hover:border-brand-yellow/50 transition-colors"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                 <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
                 <text className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.3em] group-hover:text-brand-yellow transition-colors duration-500">
                    <textPath href="#circlePath" startOffset="0%">
                       Explore Our Portfolio • See The Future • 
                    </textPath>
                 </text>
              </svg>
            </motion.div>
            {/* Center glowing circle */}
            <div className="w-20 h-20 rounded-full bg-brand-yellow flex items-center justify-center shadow-[0_0_30px_rgba(255,184,0,0.6)] group-hover:scale-110 transition-transform duration-500 will-change-transform z-10">
              <ArrowDownRight className="w-8 h-8 text-brand-blue group-hover:rotate-[-45deg] transition-transform duration-500" />
            </div>
            {/* Pulse effect */}
            <div className="absolute inset-0 w-20 h-20 m-auto rounded-full bg-brand-yellow/50 animate-ping opacity-50 z-0" />
          </a>
        </motion.div>

        {/* Layer 4: Abstract Overlapping Shape (Parallax moves up fast) */}
        <motion.div
           style={{ y: y3 }}
           className="absolute top-[40%] right-[-10%] md:right-[5%] z-10 pointer-events-none opacity-40 mix-blend-multiply"
        >
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            animate={{ scale: 1, rotate: 15 }}
            transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
            className="w-[300px] h-[500px] md:w-[400px] md:h-[600px] bg-brand-blue rounded-t-full rounded-br-full rotate-12 backdrop-blur-3xl"
          />
        </motion.div>

        <motion.div
           style={{ y: y2 }}
           className="absolute top-[60%] right-[10%] md:right-[20%] z-30 pointer-events-none"
        >
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "300px" }}
            transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
            className="w-[2px] bg-brand-yellow origin-top shadow-[0_0_15px_rgba(255,184,0,0.8)]"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
