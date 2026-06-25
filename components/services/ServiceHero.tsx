'use client';

import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, Cpu, Globe2, Layers, BrainCircuit, ChevronDown, PenTool, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/data/services';

/* ── Utility: split text into animated spans ── */
const SplitText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => (
  <span className={className} aria-label={text}>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 60, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6, delay: delay + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
        style={{ transformOrigin: 'bottom' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </span>
);

/* ── Interactive Orbital Canvas ── */
const OrbitalCanvas = ({ mouseX, mouseY }: { mouseX: number; mouseY: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<any[]>([]);
  const orbitsRef = useRef<any[]>([]);

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

    // Create particles
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    const cx = W / 2;
    const cy = H / 2;

    particlesRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.7 ? '#FFBF00' : '#ffffff',
    }));

    orbitsRef.current = Array.from({ length: 4 }, (_, i) => ({
      radius: 100 + i * 70,
      speed: 0.0003 * (i % 2 === 0 ? 1 : -1),
      angle: Math.random() * Math.PI * 2,
      tilt: 0.3 + i * 0.12,
      dotCount: 3 + i,
      dots: Array.from({ length: 3 + i }, (_, j) => ({
        offset: (j / (3 + i)) * Math.PI * 2,
        size: 2 + Math.random() * 2,
        color: i % 2 === 0 ? '#FFBF00' : '#0E5E64',
      })),
    }));

    let time = 0;
    const animate = () => {
      time += 0.016;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      if (w === 0 || h === 0) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      const mxNorm = (mouseX / w - 0.5) * 30;
      const myNorm = (mouseY / h - 0.5) * 30;

      // Draw orbits
      orbitsRef.current.forEach((orbit) => {
        orbit.angle += orbit.speed;
        ctx.strokeStyle = 'rgba(255,255,255,0.07)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx + mxNorm, cy + myNorm, orbit.radius, orbit.radius * orbit.tilt, 0.2, 0, Math.PI * 2);
        ctx.stroke();

        orbit.dots.forEach((dot: any) => {
          const a = orbit.angle + dot.offset;
          const dx = cx + mxNorm + Math.cos(a) * orbit.radius;
          const dy = cy + myNorm + Math.sin(a) * orbit.radius * orbit.tilt;
          ctx.beginPath();
          ctx.arc(dx, dy, dot.size, 0, Math.PI * 2);
          ctx.fillStyle = dot.color;
          ctx.globalAlpha = 0.7 + Math.sin(time * 2 + dot.offset) * 0.3;
          ctx.fill();
          ctx.globalAlpha = 1;

          // Glow
          ctx.beginPath();
          ctx.arc(dx, dy, dot.size * 4, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(dx, dy, 0, dx, dy, dot.size * 4);
          glow.addColorStop(0, dot.color + '30');
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.fill();
        });
      });

      // Draw particles
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
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,255,255,${0.06 * (1 - dist / 120)})`;
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

/* ── Floating Service Pill ── */
const ServicePill = ({ icon: Icon, label, delay, x, y }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`absolute ${x} ${y} hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-20 group hover:border-[#FFBF00]/30 hover:bg-white/[0.08] transition-all duration-500 cursor-default`}
  >
    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFBF00]/20 to-[#0E5E64]/20 flex items-center justify-center group-hover:from-[#FFBF00]/40 group-hover:to-[#0E5E64]/40 transition-all duration-500">
      <Icon className="w-4 h-4 text-[#FFBF00]" />
    </div>
    <span className="text-xs font-semibold text-white/70 tracking-wide group-hover:text-white/90 transition-colors">{label}</span>
  </motion.div>
);

/* ── Counter Stat ── */
const CounterStat = ({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      let frame = 0;
      const total = 60;
      const interval = setInterval(() => {
        frame++;
        setCount(Math.round((frame / total) * value));
        if (frame >= total) clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="text-center group flex flex-col items-center"
    >
      <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
        {count}<span className="text-[#FFBF00]">{suffix}</span>
      </div>
      <div className="text-[10px] sm:text-xs text-white/40 font-medium tracking-widest uppercase mt-1">{label}</div>
    </motion.div>
  );
};

/* ── Main Component ── */
export default function ServiceHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeService, setActiveService] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scaleText = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Auto-cycle services
  useEffect(() => {
    const timer = setInterval(() => setActiveService((p) => (p + 1) % services.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const serviceIcons = [Globe2, Layers, Cpu, BrainCircuit, PenTool, Smartphone];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0E5E64]"
    >
      {/* Orbital Canvas Background */}
      <OrbitalCanvas mouseX={mouse.x} mouseY={mouse.y} />

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
          Services · 2026
        </div>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 origin-center text-white/15 text-[10px] font-mono uppercase tracking-[0.5em]">
          Engineering
        </div>
      </div>

      {/* Floating Service Pills */}
      <ServicePill icon={Globe2} label="Enterprise Web" delay={1.2} x="left-[2%]" y="top-[18%]" />
      <ServicePill icon={Cpu} label="SaaS Platform" delay={1.4} x="right-[4%]" y="top-[25%]" />
      <ServicePill icon={Layers} label="E-Commerce" delay={1.6} x="left-[6%]" y="bottom-[28%]" />
      <ServicePill icon={BrainCircuit} label="AI Agents" delay={1.8} x="right-[2%]" y="bottom-[32%]" />
      <ServicePill icon={PenTool} label="UI/UX Design" delay={2.0} x="left-[15%]" y="top-[10%]" />
      <ServicePill icon={Smartphone} label="Mobile Apps" delay={2.2} x="right-[15%]" y="top-[12%]" />

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
            What We Do
          </span>
          <Sparkles className="w-3 h-3 text-[#FFBF00]/60" />
        </motion.div>

        {/* Main Headline — Dramatic Brand Typography */}
        <div className="flex flex-col items-center w-full mb-6 md:mb-8">
          <div className="overflow-hidden w-full flex justify-center">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[3.2rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem] font-bold text-[#F9FAFB] leading-[1] tracking-tighter font-[Zain] flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6"
            >
              <span>Systems</span>
              <span 
                 className="text-transparent uppercase"
                 style={{ WebkitTextStroke: '2px #F9FAFB' }}
              >
                That
              </span>
            </motion.h1>
          </div>
          
          <div className="overflow-hidden w-full flex justify-center mt-[-0.5rem] md:mt-[-1rem]">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[3.2rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem] font-bold leading-[1] tracking-tighter font-[Zain] flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6"
            >
              <span className="text-[#FFBF00] font-[Alice] italic normal-case lowercase text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7.5rem] mt-2 md:mt-4" style={{ WebkitTextStroke: '0px' }}>
                drive
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFBF00] via-amber-300 to-[#F9FAFB]">
                Growth.
              </span>
            </motion.h1>
          </div>
        </div>

        {/* Elegant Subline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 md:mb-8 text-center"
        >
          <div className="hidden sm:block h-[1px] w-8 sm:w-12 bg-[#FFBF00]/50" />
          <span className="text-lg sm:text-2xl md:text-3xl font-[Alice] text-[#F9FAFB]/60 tracking-wide max-w-[280px] sm:max-w-none">
            Engineering. Design. Optimization.
          </span>
          <div className="hidden sm:block h-[1px] w-8 sm:w-12 bg-[#FFBF00]/50" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg md:text-xl text-[#F9FAFB]/50 max-w-xl font-[IBM_Plex_Sans] font-light leading-relaxed"
        >
          We are engineers, not hobbyists. We skip the generic templates and build{' '}
          high-performance, scalable web platforms designed to{' '}
          <span className="text-[#FFBF00] font-medium">solve real business problems</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-10 md:mt-14 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto"
        >
          <Link href="/contact" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 rounded-full bg-[#F9FAFB] text-[#0E5E64] font-bold text-sm tracking-wide overflow-hidden shadow-[0_0_50px_rgba(249,250,251,0.15)] hover:shadow-[0_0_70px_rgba(249,250,251,0.25)] transition-shadow duration-500 flex justify-center items-center gap-3"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">Start a Project</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </Link>
          <Link href="#web-development" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md text-white/80 font-semibold text-sm tracking-wide hover:border-white/30 hover:bg-white/[0.06] hover:text-white transition-all duration-500 flex justify-center items-center gap-3"
            >
              <span>See What We Do</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Live Service Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-20 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl w-[90%] sm:w-auto mx-auto overflow-hidden"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto overflow-x-auto hide-scrollbar pb-1 sm:pb-0 justify-center">
            {services.map((_, i) => {
              const Icon = serviceIcons[i] || Globe2;
              return (
                <motion.button
                  key={i}
                  onClick={() => setActiveService(i)}
                  className={`w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl flex items-center justify-center transition-all duration-400 ${
                    activeService === i
                      ? 'bg-[#FFBF00]/15 border border-[#FFBF00]/30 text-[#FFBF00]'
                      : 'bg-white/[0.03] border border-transparent text-white/30 hover:text-white/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </motion.button>
              );
            })}
          </div>
          <div className="hidden sm:block w-[1px] h-6 bg-white/10" />
          <AnimatePresence mode="wait">
            <motion.span
              key={activeService}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-xs sm:text-sm text-white/50 font-medium sm:min-w-[160px] text-center sm:text-left"
            >
              {services[activeService]?.title}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="mt-8 sm:mt-12 md:mt-20 w-full max-w-2xl flex flex-row items-center justify-between sm:justify-around gap-2 sm:gap-8 pb-16"
        >
          <CounterStat value={99} suffix="%" label="Uptime" delay={2.6} />
          <CounterStat value={50} suffix="ms" label="Response" delay={2.8} />
          <CounterStat value={4} suffix="x" label="ROI" delay={3.0} />
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade to next section */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#F9FAFB] via-[#F9FAFB]/60 to-transparent z-30 pointer-events-none" />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
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
