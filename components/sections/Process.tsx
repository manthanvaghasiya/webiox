'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, PenTool, CodeXml, Rocket, Activity, MoveRight, LineChart, ShieldCheck } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import dynamic from 'next/dynamic';

const ProcessCanvas = dynamic(() => import('./ProcessCanvas'), {
  ssr: false,
});

const processes = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    description: 'We dive deep into your business goals, target audience, and competition to map a deterministic digital strategy.',
    icon: Search,
  },
  {
    num: '02',
    title: 'UX/UI Architecture',
    description: 'Our product designers craft intuitive, high-conversion wireframes and visual interfaces perfectly aligned with your brand.',
    icon: PenTool,
  },
  {
    num: '03',
    title: 'System Development',
    description: 'We engineer robust digital infrastructure using modern, scalable, and responsive web technologies.',
    icon: CodeXml,
  },
  {
    num: '04',
    title: 'Quality Assurance',
    description: 'Rigorous QA testing ensures a flawless product, identifying and resolving any issues before they affect end-users.',
    icon: Activity,
  },
  {
    num: '05',
    title: 'Deployment & Launch',
    description: 'We execute a seamless launch protocol, transitioning your digital product from staging to a live production environment.',
    icon: Rocket,
  },
  {
    num: '06',
    title: 'Growth & Scaling',
    description: 'Post-launch optimization and analytics tracking to ensure your product scales effortlessly with your user base.',
    icon: LineChart,
  },
  {
    num: '07',
    title: 'Continuous Support',
    description: 'Ongoing technical maintenance, security patches, and feature updates to keep your software at the cutting edge.',
    icon: ShieldCheck,
  }
];

export default function Process() {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const updateScrollRange = () => {
      if (scrollRef.current) {
        // Calculate the exact amount to scroll: Total width - viewport width
        setScrollRange(scrollRef.current.scrollWidth - window.innerWidth);
      }
    };
    
    updateScrollRange();
    window.addEventListener('resize', updateScrollRange);
    return () => window.removeEventListener('resize', updateScrollRange);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-[#F9FAFB] w-full">
      {/* The sticky container holds the unified 100vh viewport */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col py-8 md:py-12 overflow-hidden">
        
        <ProcessCanvas />

        {/* Overlay grid */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#0E5E64 2px, transparent 2px)', backgroundSize: '40px 40px' }} />

        {/* 1. Header Section - Locked to the top of the viewport */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 shrink-0">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-3 py-1.5 bg-gradient-to-r from-white/60 to-white/20 border border-[#0E5E64]/10 rounded-full mb-6 backdrop-blur-xl shadow-[0_4px_20px_rgba(14,94,100,0.05)] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative flex h-2.5 w-2.5 ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFBF00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFBF00]"></span>
                </span>
                <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#0E5E64] pr-2">
                  <Typewriter
                    words={['EXECUTION_PROTOCOL_', 'SYSTEM_ARCHITECTURE_', 'BUILD_PROCESS_']}
                    loop={true}
                    cursor
                    cursorStyle=''
                    typeSpeed={50}
                    deleteSpeed={30}
                    delaySpeed={2500}
                  />
                </span>
              </motion.div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6 flex flex-wrap items-center gap-x-3">
                <motion.span 
                  className="text-[#0E5E64]/80 inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  How We Build
                </motion.span>
                <motion.div 
                  initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="relative inline-block"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500 font-semibold tracking-tighter">
                    Great Software.
                  </span>
                  
                  {/* Decorative High-tech Accent */}
                  <div className="absolute -right-6 top-0 text-[#FFBF00] opacity-80 font-mono text-lg font-bold">*</div>
                  
                  {/* Animated underline */}
                  <motion.div 
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#0E5E64] via-[#FFBF00] to-transparent origin-left rounded-full"
                  />
                </motion.div>
              </h2>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed"
              >
                A structured, transparent approach that guides you from idea to launch—ensuring clarity, quality, and predictable delivery at every stage.
              </motion.p>
            </div>
          </div>
        </div>

        {/* 2. Horizontal Track Section - Takes up the bottom space */}
        <div className="relative z-20 w-full flex-1 flex flex-col justify-center mt-4">
          <motion.div style={{ x }} className="flex w-max">
            <div ref={scrollRef} className="flex pl-4 sm:pl-6 lg:pl-[calc((100vw-80rem)/2+1rem)] pr-[5vw] lg:pr-[calc((100vw-80rem)/2)] items-center py-12">
              {processes.map((process, index) => {
                const IconComponent = process.icon;
                const isLast = index === processes.length - 1;
                return (
                  <div key={index} className="flex items-center shrink-0">
                    <div
                      className="relative group w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[380px] xl:w-[420px] h-[55vh] min-h-[300px] max-h-[400px] shrink-0"
                    >
                      {/* Ultra-Glassmorphic Card */}
                      <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl rounded-3xl p-6 md:p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(14,94,100,0.1)] transition-all duration-500 overflow-hidden flex flex-col justify-between hover:-translate-y-2">
                        
                        {/* Animated Grid Background inside card */}
                        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                             style={{ backgroundImage: 'linear-gradient(rgba(14, 94, 100, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 94, 100, 0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                        {/* Gigantic Subtle Number */}
                        <div className="absolute -top-2 right-0 md:-top-4 md:-right-4 text-[120px] md:text-[160px] font-bold text-[#0E5E64]/[0.03] leading-none group-hover:text-[#0E5E64]/[0.05] group-hover:-translate-y-4 group-hover:-translate-x-4 transition-all duration-700 pointer-events-none font-sans tracking-tighter select-none z-0">
                          {process.num}
                        </div>

                        {/* Top Section */}
                        <div className="relative z-10">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#0E5E64] to-[#0a454a] flex items-center justify-center mb-6 shadow-[0_10px_20px_rgba(14,94,100,0.2)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 blur-md rounded-full -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                            <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white relative z-10" strokeWidth={1.5} />
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight pr-4">
                            {process.title}
                          </h3>
                        </div>

                        {/* Bottom Section */}
                        <div className="relative z-10 mt-auto">
                          <div className="h-[2px] w-12 bg-[#FFBF00] mb-5 group-hover:w-full transition-all duration-700 ease-out" />
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                            {process.description}
                          </p>
                          
                          <div className="flex items-center gap-2 text-[#0E5E64] font-semibold text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                            <span>Explore Phase</span>
                            <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step Connector */}
                    {!isLast && (
                      <div className="w-12 sm:w-16 md:w-24 lg:w-32 shrink-0 flex items-center justify-center relative">
                        {/* Continuous line */}
                        <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 bg-[#0E5E64]/10 overflow-hidden">
                           {/* Animated line segment */}
                           <motion.div 
                             className="h-full bg-gradient-to-r from-transparent via-[#FFBF00] to-transparent w-full"
                             animate={{
                               x: ['-100%', '100%']
                             }}
                             transition={{
                               duration: 1.5,
                               repeat: Infinity,
                               ease: 'linear',
                               delay: index * 0.2
                             }}
                           />
                        </div>
                        
                        {/* Center Node */}
                        <div className="relative z-10 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#F9FAFB] border-2 border-[#0E5E64]/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,191,0,0.1)]">
                          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#0E5E64] animate-pulse" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
