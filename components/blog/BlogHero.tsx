'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { blogPosts, allCategories } from '@/data/blog';
import { useRef, useEffect, useState } from 'react';
import { BookOpen, Sparkles, PenTool, ArrowUpRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

/* ─── Animated counter hook ─── */
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
}

export default function BlogHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const postCount = useCountUp(blogPosts.length, 1800);
  const totalMinutes = blogPosts.reduce((a, b) => a + b.readMinutes, 0);
  const categoriesCount = useCountUp(allCategories.length, 1500);

  // Mouse tracking for glowing effect on cards
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0E5E64]"
    >
      {/* Background Mesh Gradient (Replacing the Canvas) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-[#FFBF00]/15 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-teal-300/15 rounded-full blur-[150px] mix-blend-screen"
        />
        <div className="absolute top-[30%] left-[40%] w-[30vw] h-[30vw] bg-[#FFBF00]/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

      {/* Main Content - Bento Box Layout */}
      <motion.div
        style={{ y: yParallax, opacity: opacityFade }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(120px,auto)]">
          
          {/* Bento Card 1: Main Title (Spans 8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-8 md:row-span-2 relative group rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 md:p-12 overflow-hidden hover:border-white/20 transition-colors"
          >
            {/* Radial gradient hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 h-full flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#FFBF00]" />
                <span className="text-xs font-medium text-white/70 tracking-wide uppercase">The Webiox Journal</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.95] mb-4">
                Explore <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFBF00] to-yellow-200">
                  New Horizons.
                </span>
              </h1>
              
              <p className="text-white/50 text-lg max-w-md font-light">
                Deep dives into software engineering, emerging tech, and product design.
              </p>
            </div>
          </motion.div>

          {/* Bento Card 2: Featured Abstract (Spans 4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 md:row-span-1 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-[#FFBF00]/10 backdrop-blur-md p-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4">
              <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
            </div>
            <div className="h-full flex flex-col justify-end">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">Trending Now</h3>
              <p className="text-sm text-white/50">Discover our most read technical insights.</p>
            </div>
          </motion.div>

          {/* Bento Card 3: Stats 1 (Spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 md:row-span-1 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 flex flex-col items-center justify-center text-center group hover:bg-white/[0.04] transition-colors"
          >
            <BookOpen className="w-6 h-6 text-[#FFBF00] mb-3" />
            <div className="text-4xl font-bold text-white mb-1">{postCount}+</div>
            <div className="text-xs text-white/40 uppercase tracking-widest">Articles</div>
          </motion.div>

          {/* Bento Card 4: Stats 2 (Spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 md:row-span-1 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 flex flex-col items-center justify-center text-center group hover:bg-white/[0.04] transition-colors"
          >
            <PenTool className="w-6 h-6 text-[#FFBF00] mb-3" />
            <div className="text-4xl font-bold text-white mb-1">{categoriesCount}</div>
            <div className="text-xs text-white/40 uppercase tracking-widest">Topics</div>
          </motion.div>

          {/* Bento Card 5: Interactive Visual (Spans 12 cols or 8 depending on layout, let's make it span full width on bottom) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-12 md:row-span-1 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden relative"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="w-full text-[12vw] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent whitespace-nowrap select-none overflow-hidden flex items-center">
                 <motion.div 
                    animate={{ x: [0, -1000] }} 
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="flex"
                 >
                    <span className="px-8">ARCHITECTURE.</span>
                    <span className="px-8">ENGINEERING.</span>
                    <span className="px-8">DESIGN.</span>
                    <span className="px-8">INNOVATION.</span>
                 </motion.div>
              </div>
            </div>
            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready to read?</h3>
                <p className="text-white/50">Scroll down to explore our latest publications.</p>
              </div>
              <div className="flex -space-x-4">
                 {/* Decorative overlapping circles */}
                 {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-[#0E5E64] bg-gradient-to-br from-[#FFBF00] to-yellow-600 opacity-80" style={{ transform: `scale(${1 - i * 0.1})` }} />
                 ))}
              </div>
            </div>
          </motion.div>

        </div>
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
