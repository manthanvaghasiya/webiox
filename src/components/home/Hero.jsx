import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

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
      className="inline-block w-full sm:w-auto"
    >
      <motion.button 
        className="group relative flex items-center justify-center w-full sm:w-auto gap-3 bg-brand-blue text-white px-8 py-4 rounded-full text-lg font-bold overflow-hidden shadow-2xl"
        whileHover={isTouchDevice ? {} : { scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect inside button */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/0 via-brand-yellow/20 to-brand-yellow/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        
        <span className="relative z-10">{children}</span>
        
        <div className="relative z-10 w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center text-brand-blue group-hover:rotate-[-45deg] transition-transform duration-300">
          <ArrowRight className="w-5 h-5" />
        </div>
      </motion.button>
    </motion.div>
  );
};

// --- Kinetic Typography Component ---
const KineticText = ({ text }) => {
  const words = text.split(" ");
  
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.12, delayChildren: 0.2 } 
    }
  };

  const wordVars = {
    hidden: { y: "100%", opacity: 0, rotate: 5 },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotate: 0,
      transition: { duration: 1, ease: [0.2, 0.8, 0.2, 1] } 
    }
  };

  return (
    <motion.div 
      variants={containerVars} initial="hidden" animate="visible"
      className="flex flex-wrap gap-x-4 gap-y-2 lg:gap-x-6 lg:gap-y-4 mb-8"
    >
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden pb-4 -mb-4 inline-block">
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
  
  // Parallax for scroll
  const scrollY1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const scrollY2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const scrollY3 = useTransform(scrollY, [0, 1000], [0, 300]);
  
  // Mouse tracking variables
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse coordinates for parallax elements
  const smoothConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, smoothConfig);
  const smoothMouseY = useSpring(mouseY, smoothConfig);
  
  // Raw window tracker for spotlight to be immediate or slightly smoothed
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // 1. Raw coordinates for background spotlight
      setSpotlight({ x: e.clientX, y: e.clientY });
      
      // 2. Normalized coordinates for 3D parallax shapes (-1 to 1)
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(nx * 100); // 100px movement range
      mouseY.set(ny * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-[100vh] w-full bg-brand-gray overflow-hidden selection:bg-brand-blue selection:text-white flex items-center">
      
      {/* 1. Interactive Cursor Spotlight (Hidden on Mobile) */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0 opacity-80 mix-blend-color-burn hidden md:block"
        animate={{
          background: `radial-gradient(800px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,184,0,0.15), rgba(0,37,131,0.05) 40%, transparent 80%)`
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
      />
      
      {/* Background soft grid pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 37, 131, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 37, 131, 0.05) 1px, transparent 1px)', 
          backgroundSize: '100px 100px' 
        }}
      />

      {/* 4. 3D Parallax Floating Glass Shapes (Opposite mouse direction) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 hidden md:block">
        {/* Shape 1: Blur-glass orb top right */}
        <motion.div 
          style={{ x: useTransform(smoothMouseX, v => -v * 0.8), y: useTransform(smoothMouseY, v => -v * 0.8 + scrollY1.get()) }}
          className="absolute top-[10%] -right-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-tr from-brand-blue/10 to-brand-yellow/5 backdrop-blur-3xl border border-white/20 shadow-2xl"
        />
        
        {/* Shape 2: Sharp glass polygon bottom left */}
        <motion.div 
          style={{ x: useTransform(smoothMouseX, v => -v * 1.5), y: useTransform(smoothMouseY, v => -v * 1.5 + scrollY2.get()) }}
          className="absolute -bottom-[10%] -left-[5%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-brand-blue/5 rounded-[4rem] rotate-12 backdrop-blur-xl border border-white/40"
        />

        {/* Shape 3: Small floating accent */}
        <motion.div 
          style={{ x: useTransform(smoothMouseX, v => -v * 2), y: useTransform(smoothMouseY, v => -v * 2 + scrollY3.get()) }}
          className="absolute top-[30%] left-[15%] w-24 h-24 bg-brand-yellow/20 rounded-2xl rotate-45 backdrop-blur-md shadow-[0_0_50px_rgba(255,184,0,0.3)] hidden md:block"
        />
      </div>


      {/* Main Content Area */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 pt-24 md:pt-32">
        <div className="max-w-5xl">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[2px] bg-brand-yellow" />
            <span className="text-brand-blue font-bold tracking-widest uppercase text-sm md:text-base">
              Digital Masterpiece
            </span>
          </motion.div>

          {/* 2. Kinetic Typography: Multi-million dollar headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-blue leading-[1.1] md:leading-[1] tracking-tighter uppercase mb-6 drop-shadow-sm break-words">
            <KineticText text="Designing The" />
            <KineticText text="Digital Future." />
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-600 font-medium max-w-2xl mt-8 mb-16 leading-relaxed border-l-4 border-brand-yellow pl-6"
          >
            We build breathtaking, production-ready web experiences for brands that refuse to be ordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            {/* 3. Magnetic Button */}
            <MagneticButton>Start a Project</MagneticButton>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="uppercase text-[10px] font-bold tracking-widest text-brand-blue">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-brand-blue to-transparent"
        />
      </motion.div>
      
    </section>
  );
};

export default Hero;
