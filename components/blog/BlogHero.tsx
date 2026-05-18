'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { blogHeroVariants } from '@/lib/motion/blog';
import { useRef } from 'react';

export default function BlogHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
    >
      <motion.div 
        style={{ y, opacity }}
        className="max-w-5xl mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={blogHeroVariants}
      >
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#0E5E64]/20 bg-white/50 backdrop-blur-md">
          <span className="text-sm font-semibold tracking-wider text-[#0E5E64] uppercase">
            The Webiox Journal
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-8 tracking-tighter leading-[1.1]">
          Engineering <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0E5E64] to-teal-400">
            <Typewriter
              words={['Excellence', 'Innovation', 'Future', 'Insights']}
              loop={true}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
          Deep dives into web architecture, avant-garde design systems, and the art of building world-class digital products.
        </p>

        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-[#0E5E64] to-transparent animate-pulse" />
        </motion.div>
      </motion.div>
    </section>
  );
}
