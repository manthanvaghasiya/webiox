'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { blogPosts, allCategories } from '@/data/blog';
import { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronDown, BookOpen, Sparkles, PenTool } from 'lucide-react';

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

/* ─── Interactive Canvas Background ─── */
const BlogCanvas = ({ mouseX, mouseY }: { mouseX: number; mouseY: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    size: number; alpha: number; color: string;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;

    particlesRef.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.75 ? '#FFBF00' : '#ffffff',
    }));

    let time = 0;
    const animate = () => {
      time += 0.016;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.5 + Math.sin(time + p.x * 0.01) * 0.5);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Connect nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [mouseX, mouseY]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
};

/* ─── Rotating words ─── */
const rotatingWords = ['Excellence', 'Innovation', 'Deep Dives', 'Mastery'];

export default function BlogHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [wordIndex, setWordIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scaleText = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);

  const postCount = useCountUp(blogPosts.length, 1800);
  const totalMinutes = blogPosts.reduce((a, b) => a + b.readMinutes, 0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setWordIndex((p) => (p + 1) % rotatingWords.length), 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0E5E64]"
    >
      {/* Canvas Background */}
      <BlogCanvas mouseX={mouse.x} mouseY={mouse.y} />

      {/* Ambient Gradient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-black/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-15%] w-[50vw] h-[50vw] bg-[#FFBF00]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] w-[30vw] h-[30vw] bg-teal-300/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Architectural Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_20%,transparent_100%)] pointer-events-none" />

      {/* Edge Decorative Frame */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block">
        <div className="absolute top-8 left-8 w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
          <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
        </div>
        <div className="absolute top-8 right-8 w-16 h-16">
          <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/20 to-transparent" />
          <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
        </div>
        <div className="absolute bottom-8 left-8 w-16 h-16">
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
          <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-white/20 to-transparent" />
        </div>
        <div className="absolute bottom-8 right-8 w-16 h-16">
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/20 to-transparent" />
          <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-white/20 to-transparent" />
        </div>
        {/* Side Typography */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-white/15 text-[10px] font-mono uppercase tracking-[0.5em]">
          Journal · 2026
        </div>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 origin-center text-white/15 text-[10px] font-mono uppercase tracking-[0.5em]">
          Insights
        </div>
      </div>

      {/* Floating Pills */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[4%] top-[22%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-20"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFBF00]/20 to-[#0E5E64]/20 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-[#FFBF00]" />
        </div>
        <span className="text-xs font-semibold text-white/70 tracking-wide">{totalMinutes}+ Min Content</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[4%] top-[25%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-20"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFBF00]/20 to-[#0E5E64]/20 flex items-center justify-center">
          <PenTool className="w-4 h-4 text-[#FFBF00]" />
        </div>
        <span className="text-xs font-semibold text-white/70 tracking-wide">{allCategories.length} Topics</span>
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ y: yText, opacity: opacityText, scale: scaleText }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center pt-28 md:pt-32"
      >
        {/* Kicker Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl mb-10 md:mb-14 group hover:border-[#FFBF00]/20 transition-colors duration-500"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFBF00] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFBF00]" />
          </span>
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.35em] text-white/60 uppercase">
            The Webiox Journal
          </span>
          <Sparkles className="w-3 h-3 text-[#FFBF00]/60" />
        </motion.div>

        {/* Main Headline — Dramatic Brand Typography */}
        <div className="overflow-hidden mb-1 sm:mb-2">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[3.5rem] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-[#F9FAFB] leading-[0.85] tracking-tighter font-[Zain]"
          >
            Insights
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-1 sm:mb-2">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[3.5rem] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-[0.85] tracking-tighter font-[Zain] text-transparent uppercase"
            style={{ WebkitTextStroke: '2px #F9FAFB' }}
          >
            &{' '}
            <span className="text-[#FFBF00] font-[Alice] italic normal-case" style={{ WebkitTextStroke: '0px' }}>
              Ideas
            </span>
          </motion.h1>
        </div>

        {/* Elegant Subline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 sm:gap-6 mb-6 mt-4"
        >
          <div className="h-[1px] w-8 sm:w-12 bg-[#FFBF00]/50" />
          <span className="text-xl sm:text-2xl md:text-3xl font-[Alice] text-[#F9FAFB]/60 tracking-wide">
            Crafting{' '}
            <span className="relative inline-block w-[180px] sm:w-[240px] md:w-[300px] h-[1.15em] overflow-hidden align-bottom">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={wordIndex}
                  initial={{ y: '100%', opacity: 0, rotateX: -45 }}
                  animate={{ y: '0%', opacity: 1, rotateX: 0 }}
                  exit={{ y: '-100%', opacity: 0, rotateX: 45 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-0 text-[#FFBF00] whitespace-nowrap drop-shadow-[0_0_15px_rgba(255,191,0,0.4)]"
                >
                  {rotatingWords[wordIndex]}.
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
          <div className="h-[1px] w-8 sm:w-12 bg-[#FFBF00]/50" />
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg md:text-xl text-[#F9FAFB]/50 max-w-xl font-light leading-relaxed"
        >
          Deep dives into web architecture, avant-garde design systems,
          and the art of building{' '}
          <span className="text-[#FFBF00] font-medium">world-class digital products</span>.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-16 md:mt-20 w-full max-w-2xl grid grid-cols-3 gap-8 pb-16"
        >
          {[
            { value: postCount, suffix: '+', label: 'Articles' },
            { value: totalMinutes, suffix: 'min', label: 'Total Read' },
            { value: allCategories.length, suffix: '', label: 'Topics' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {stat.value}<span className="text-[#FFBF00]">{stat.suffix}</span>
              </div>
              <div className="text-xs text-white/40 font-medium tracking-widest uppercase mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade to next section */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#F9FAFB] via-[#F9FAFB]/60 to-transparent z-30 pointer-events-none" />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/25 font-mono uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
