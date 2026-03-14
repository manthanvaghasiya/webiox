import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Scene from './Scene';

const ease = [0.76, 0, 0.24, 1];

// Word Reveal Component
const RevealText = ({ text }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const child = {
    hidden: { y: "150%", opacity: 0, rotate: 5 },
    visible: { 
      y: 0, 
      opacity: 1,
      rotate: 0,
      transition: { duration: 1.2, ease: ease } 
    }
  };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="visible"
      className="flex flex-wrap gap-x-3 gap-y-2 md:gap-x-4 md:gap-y-4 lg:gap-x-5 lg:gap-y-4"
    >
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden pb-4 md:pb-6 -mb-4 md:-mb-6">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#002583] overflow-hidden selection:bg-[#FFB800] selection:text-black flex flex-col justify-center">
      
      {/* 2-Column Layout */}
      <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 mt-20 lg:mt-0 pb-32">
        
        {/* Left Column: Typography & CTA */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center">
          
          {/* Subtle Accent Line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="h-1 w-20 bg-[#FFB800] mb-6 md:mb-10 origin-left"
          />

          {/* Massive Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[8rem] font-bold text-white leading-[1] tracking-tighter w-full">
            <RevealText text="Next Generation Digital Architect" />
          </h1>
          
          {/* Sub-headline */}
          <div className="overflow-hidden mt-8 md:mt-12 w-full max-w-2xl">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.2, ease }}
              className="text-base md:text-xl xl:text-2xl text-white/80 font-normal leading-relaxed"
            >
              We merge award-winning design with cutting-edge 3D technology to build immersive experiences for global visionaries.
            </motion.p>
          </div>

          {/* Glowing CTA Button */}
          <div className="overflow-hidden mt-12 md:mt-16 w-full sm:w-auto">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.5, ease }}
            >
              <button className="relative group w-full sm:w-auto bg-[#FFB800] text-[#002583] font-bold text-sm md:text-lg px-8 py-4 lg:px-12 lg:py-5 rounded-full hover:scale-105 transition-transform duration-300">
                <span className="relative z-10">Start The Future</span>
                <div className="absolute inset-0 rounded-full bg-[#FFB800] blur-[20px] opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
              </button>
            </motion.div>
          </div>
          
        </div>

        {/* Right Column: 3D Interactive Art */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease }}
          className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] min-h-[400px] relative mt-10 lg:mt-0 flex cursor-move"
        >
          <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
          <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </motion.div>

      </div>

      {/* Modern Wave/Curve Divider (Inspired by webiots) */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg 
          className="relative block w-[calc(100%+1.3px)] h-[100px] lg:h-[150px]" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C50.25,108.79,103.88,118.84,156.6,117.9,214.5,116.89,269.45,86.62,321.39,56.44Z" 
            className="fill-[#f8f9fa] dark:fill-[#111111]"
          />
        </svg>
      </div>

    </section>
  );
};

export default Hero;
