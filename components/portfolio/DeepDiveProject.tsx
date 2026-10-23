'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, ExternalLink, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { Project } from '@/data/projects';
import DeepDiveProjectMobile from './DeepDiveProjectMobile';

interface DeepDiveProjectProps {
   project: Project;
   index: number;
}

const DeepDiveProject = ({ project, index }: DeepDiveProjectProps) => {
   const containerRef = useRef<HTMLElement>(null);
   const [isMobile, setIsMobile] = useState(false);
   const [isRevealed, setIsRevealed] = useState(false);

   useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 1024);
      handleResize(); // Init check
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"]
   });

   // Mathematically map the unfolding sequence (Top-Level Agency Choreography):
   // Chapter 1 (0.00 - 0.14): First project image shows full in center stage (scale: 1, x: -50%). Card is hidden.
   // Chapter 2 (0.14 - 0.32): User scrolls -> image smoothly glides to its settled spot on the left (x: -79%, scale: 0.70).
   // Chapter 3 (0.32 - 0.86): Card animates in from bottom to up side and locks in solid view (tight gap, no overlap, zero bottom cutoff).
   // Chapter 4 (0.86 - 0.98): Smooth release fade out to next project.
   const imageScale = useTransform(scrollYProgress, [0, 0.14, 0.32, 0.86, 1], [1, 1, 0.70, 0.70, 0.64]);
   const imageX = useTransform(scrollYProgress, [0, 0.14, 0.32, 0.86, 1], ["-50%", "-50%", "-79%", "-79%", "-79%"]);

   // Sequential card reveal: triggers strictly AFTER image has set on its place (at 0.24)
   // Guaranteed 100% solid, crisp opacity - Hariram Motors and all cards render identically!
   useMotionValueEvent(scrollYProgress, "change", (latest) => {
      if (latest >= 0.22 && !isRevealed) {
         setIsRevealed(true);
      } else if (latest < 0.18 && isRevealed) {
         setIsRevealed(false);
      }
   });

   // Section release fade
   const sectionOpacity = useTransform(scrollYProgress, [0, 0.86, 0.98], [1, 1, 0]);

   // Description Parser for dynamic multi-paragraph content and checklists
   const parseDescription = (text: string) => {
      const items = text.split('\n').filter(p => p.trim() !== '');
      const intro = items.find(p => !p.trim().startsWith('•') && !p.trim().startsWith('?') && !p.trim().startsWith('-'));
      const bullets = items.filter(p => p.trim().startsWith('•') || p.trim().startsWith('?') || p.trim().startsWith('-'));

      return (
         <div className="flex flex-col gap-2">
            {intro && (
               <p className="text-slate-700 text-xs sm:text-[13.5px] lg:text-[14px] leading-relaxed font-normal">
                  {intro}
               </p>
            )}
            {bullets.slice(0, 3).map((para, i) => (
               <div key={i} className="flex items-start gap-2 mt-0.5">
                  <span className="text-[#377a9b] mt-0.5 flex-shrink-0">
                     <CheckCircle2 size={15} className="text-[#377a9b]" />
                  </span>
                  <p className="text-slate-600 text-xs sm:text-[12.5px] lg:text-[13px] leading-snug">
                     {para.replace(/^[•\?\-\*]\s*/, '').trim()}
                  </p>
               </div>
            ))}
         </div>
      );
   };

   if (isMobile) {
      return <DeepDiveProjectMobile project={project} index={index} />;
   }

   // Desktop 300vh Scroll Experience (Grand, Impressive, Zero Bottom Cutoff, Decreased Gap)
   return (
      <section ref={containerRef} className="relative h-[300vh] w-full bg-slate-50">
         <motion.div
            style={{ opacity: sectionOpacity }}
            className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
         >

            {/* Massive Background Logo Anchor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[42vw] opacity-[0.12] md:opacity-18 pointer-events-none select-none flex items-center justify-center">
               <img src="/logo_without_background.png" alt="Background Logo" className="w-full h-auto object-contain grayscale" />
            </div>

            {/* Dynamic Large Cinematic Image Container */}
            <motion.div
               style={{ scale: imageScale, x: imageX, y: "-50%" }}
               className="absolute top-1/2 left-1/2 w-[92vw] md:w-[84vw] lg:w-[80vw] 2xl:w-[74vw] h-[80vh] md:h-[84vh] 2xl:h-[88vh] z-20 origin-center will-change-transform flex items-center justify-center pointer-events-auto"
               data-cursor-hover="true"
            >
               <div className="relative w-full h-full flex items-center justify-center">
                  <img
                     src={project.image}
                     alt={project.title}
                     className="w-auto h-auto max-w-full max-h-full object-contain select-none rounded-[1.5rem] md:rounded-[2.2rem] shadow-[0_25px_70px_rgba(15,23,42,0.22)]"
                  />
               </div>
            </motion.div>

            {/* Emerging Text & Architecture Panel (Smooth agency bottom-to-up reveal, decreased gap) */}
            <motion.div
               animate={{
                  opacity: isRevealed ? 1 : 0,
                  y: isRevealed ? 0 : 80,
               }}
               transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1]
               }}
               className="absolute top-1/2 -translate-y-1/2 right-[3.5vw] lg:right-[4vw] 2xl:right-[5.5vw] w-[88vw] md:w-[43vw] lg:w-[39vw] 2xl:w-[36vw] flex flex-col z-30 pointer-events-none md:pointer-events-auto"
            >
               <div className="pointer-events-auto flex flex-col gap-2.5 sm:gap-3 bg-white/98 backdrop-blur-2xl p-5 sm:p-6 lg:p-7 rounded-[1.75rem] md:rounded-[2rem] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12)] border border-slate-200/90">

                  {/* Header Badges */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-[#377a9b] font-semibold">
                     <span className="px-2.5 py-0.5 rounded-md bg-[#377a9b]/10 text-[#377a9b] font-bold">
                        {String(index + 1).padStart(2, '0')} / 06
                     </span>
                     <span>{project.year}</span>
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                     <span>{project.category}</span>
                     {project.liveLink && project.liveLink !== '#' && (
                        <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                           LIVE
                        </span>
                     )}
                  </div>

                  {/* Project Title */}
                  <h2 className="text-2xl sm:text-3xl lg:text-[32px] 2xl:text-4xl font-black text-slate-900 tracking-tight leading-[1.1]">
                     {project.title}
                  </h2>

                  {/* Description & Deliverables */}
                  {parseDescription(project.fullDescription)}

                  {/* Core Feature Badges (if available) */}
                  {project.features && project.features.length > 0 && (
                     <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {project.features.slice(0, 3).map((feat, i) => (
                           <span
                              key={i}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-900 border border-amber-500/20 text-[10.5px] font-medium"
                           >
                              <Sparkles size={10} className="text-[#ffc312]" />
                              {feat}
                           </span>
                        ))}
                     </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                     {project.tech.map((tech, i) => (
                        <span
                           key={i}
                           className="px-2.5 py-0.5 bg-slate-100 hover:bg-[#377a9b]/10 hover:text-[#377a9b] text-slate-700 rounded-md text-[11px] font-mono font-medium border border-slate-200/70 transition-colors"
                        >
                           {tech}
                        </span>
                     ))}
                  </div>

                  {/* In-Card Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 mt-0.5 border-t border-slate-100">
                     <Link
                        href={`/portfolio/${project.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#377a9b] hover:bg-[#2b6683] text-white font-bold text-[11px] uppercase tracking-wider shadow-sm hover:shadow transition-all cursor-pointer group"
                     >
                        <span>Explore Case Study</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                     </Link>

                     {project.liveLink && project.liveLink !== '#' && (
                        <a
                           href={project.liveLink}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] uppercase tracking-wider border border-slate-700/60 transition-all group"
                        >
                           <span>Live Demo</span>
                           <ExternalLink size={12} className="text-[#ffc312] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                     )}
                  </div>

               </div>
            </motion.div>

            {/* Persistent Bottom Action Bar */}
            <motion.div
               animate={{
                  opacity: isRevealed ? 1 : 0,
                  y: isRevealed ? 0 : 30,
               }}
               transition={{
                  duration: 0.65,
                  delay: 0.08,
                  ease: [0.16, 1, 0.3, 1]
               }}
               className="absolute bottom-6 md:bottom-10 left-[5vw] 2xl:left-[8vw] z-40 pointer-events-auto flex items-center gap-3"
            >
               {project.liveLink && project.liveLink !== '#' && (
                  <a
                     href={project.liveLink}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="group relative px-6 py-3 md:px-7 md:py-3.5 bg-slate-900 shadow-2xl text-white rounded-full overflow-hidden hover:shadow-[0_10px_30px_rgba(55, 122, 155,0.3)] transition-all duration-300 inline-flex items-center gap-2 border border-slate-700/50"
                  >
                     <div className="absolute inset-0 bg-[#377a9b] translate-y-[110%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                     <span className="relative z-10 font-bold tracking-wider text-[10px] md:text-xs uppercase flex items-center gap-2 whitespace-nowrap">
                        Live Demo
                        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                     </span>
                  </a>
               )}

               <Link
                  href={`/portfolio/${project.id}`}
                  className="px-6 py-3 md:px-7 md:py-3.5 bg-[#377a9b] hover:bg-[#2b6683] shadow-lg text-white rounded-full transition-all duration-300 inline-flex items-center gap-2 font-bold tracking-wider text-[10px] md:text-xs uppercase cursor-pointer group"
               >
                  <span>Explore Case Study</span>
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
               </Link>
            </motion.div>

         </motion.div>
      </section>
   );
};

export default DeepDiveProject;
