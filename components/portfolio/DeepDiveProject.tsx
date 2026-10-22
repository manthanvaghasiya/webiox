'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '@/data/projects';
import DeepDiveProjectMobile from './DeepDiveProjectMobile';

interface DeepDiveProjectProps {
   project: Project;
   index: number;
}

const DeepDiveProject = ({ project, index }: DeepDiveProjectProps) => {
   const containerRef = useRef<HTMLElement>(null);
   const [isMobile, setIsMobile] = useState(false);

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

   // Mathematically map the unfolding sequence:
   // 0.0 - 0.15: Image full in center.
   // 0.15 - 0.35: Image shrinks smoothly and shifts to the left half.
   // 0.35 - 0.88: Image and Card stay locked side-by-side in view.
   // 0.88 - 1.0: Clean fade out to next project.
   const imageScale = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.88, 1], [1, 1, 0.52, 0.52, 0.48]);
   const imageX = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.88, 1], ["-50%", "-50%", "-86%", "-86%", "-86%"]);

   // Smooth continuous transforms for text reveal (no abrupt booleans that skip on fast scroll)
   const textOpacity = useTransform(scrollYProgress, [0.18, 0.32, 0.88, 0.98], [0, 1, 1, 0]);
   const textY = useTransform(scrollYProgress, [0.18, 0.32], [30, 0]);

   // Section release fade
   const sectionOpacity = useTransform(scrollYProgress, [0, 0.88, 1], [1, 1, 0]);

   // Description Parser for dynamic multi-paragraph content and checklists
   const parseDescription = (text: string) => {
      return text.split('\n').filter(p => p.trim() !== '').map((para, i) => {
         if (para.trim().startsWith('•')) {
            return (
               <div key={i} className="flex items-start gap-2 md:gap-2.5 mt-1.5 md:mt-2">
                  <span className="text-[#1a7097] mt-0.5 flex-shrink-0">
                     <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                     </svg>
                  </span>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{para.replace('•', '').trim()}</p>
               </div>
            );
         }
         return <p key={i} className="text-slate-700 text-xs md:text-sm leading-relaxed font-normal">{para}</p>;
      });
   };

   if (isMobile) {
      return <DeepDiveProjectMobile project={project} index={index} />;
   }

   // Desktop Deep-Dive Scroll Experience (with perfectly visible details & responsive card)
   return (
      <section ref={containerRef} className="relative h-[230vh] w-full bg-slate-50">
         <motion.div
            style={{ opacity: sectionOpacity }}
            className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
         >
            {/* Massive Background Logo Anchor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[40vw] opacity-[0.12] md:opacity-20 pointer-events-none select-none flex items-center justify-center">
               <img src="/logo_without_background.png" alt="Background Logo" className="w-full h-auto object-contain grayscale" />
            </div>

            {/* Dynamic Cinematic Image Container */}
            <motion.div
               style={{ scale: imageScale, x: imageX, y: "-50%" }}
               className="absolute top-1/2 left-1/2 w-[90vw] md:w-[80vw] 2xl:w-[70vw] h-[80vh] md:h-[88vh] 2xl:h-[90vh] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)] z-20 origin-center will-change-transform bg-slate-900 border border-slate-800/80"
               data-cursor-hover="true"
            >
               <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </motion.div>

            {/* Floating Glassmorphism Project Details Panel (Centered vertically, fits all screen heights) */}
            <motion.div
               style={{ opacity: textOpacity, y: textY }}
               className="absolute top-1/2 -translate-y-1/2 right-[4vw] 2xl:right-[6vw] w-[46vw] lg:w-[44vw] max-w-xl max-h-[86vh] flex flex-col z-30 pointer-events-auto"
            >
               <div className="flex flex-col gap-3 md:gap-4 bg-white/95 backdrop-blur-xl p-5 md:p-7 lg:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_15px_50px_rgba(0,0,0,0.08)] border border-slate-200/90 overflow-y-auto max-h-[84vh]">
                  
                  {/* Top Meta Badges */}
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] text-[#1a7097] font-semibold">
                     <span className="px-2 py-0.5 rounded bg-[#1a7097]/10 text-[#1a7097] font-bold">
                        {String(index + 1).padStart(2, '0')} / 06
                     </span>
                     <span>{project.year}</span>
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                     <span>{project.category}</span>
                     {project.liveLink && project.liveLink !== '#' && (
                        <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                           LIVE
                        </span>
                     )}
                  </div>

                  {/* Project Title */}
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-[1.1]">
                     {project.title}
                  </h2>

                  {/* Parsed Full Description & Checklist */}
                  <div className="flex flex-col gap-1 text-slate-600">
                     {parseDescription(project.fullDescription)}
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mt-1">
                     {project.tech.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-[10px] md:text-xs font-mono font-medium border border-slate-200/70">
                           {tech}
                        </span>
                     ))}
                  </div>

                  {/* Action CTAs inside the Details Card */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-3 mt-1 border-t border-slate-100">
                     <Link
                        href={`/portfolio/${project.id}`}
                        className="px-5 py-2.5 md:px-6 md:py-3 bg-[#1a7097] hover:bg-[#145b7c] shadow-md text-white rounded-full transition-all duration-300 inline-flex items-center gap-2 font-bold tracking-wider text-[10px] md:text-xs uppercase cursor-pointer group"
                     >
                        <span>Explore Case Study</span>
                        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                     </Link>

                     {project.liveLink && project.liveLink !== '#' && (
                        <a
                           href={project.liveLink}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="group relative px-5 py-2.5 md:px-6 md:py-3 bg-slate-900 shadow-md text-white rounded-full overflow-hidden hover:shadow-[0_10px_25px_rgba(26,112,151,0.25)] transition-all duration-300 inline-flex items-center gap-2 border border-slate-700/50"
                        >
                           <div className="absolute inset-0 bg-[#1a7097] translate-y-[110%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                           <span className="relative z-10 font-bold tracking-wider text-[10px] md:text-xs uppercase flex items-center gap-1.5 whitespace-nowrap">
                              Live Demo
                              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                           </span>
                        </a>
                     )}
                  </div>

               </div>
            </motion.div>

         </motion.div>
      </section>
   );
};

export default DeepDiveProject;
