'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
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

   // Mathematically map the 3-stage unfolding sequence:
   // 0.0 - 0.2: Image locked in center.
   // 0.2 - 0.4: Image shrinks and translates to the left.
   const imageScale = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.8, 1], [1, 1, 0.54, 0.54, 0.48]);
   const imageX = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.8, 1], ["-50%", "-50%", "-88%", "-88%", "-88%"]);

   // Reveal text smoothly as soon as the image clears to the left (at 0.38 - 0.4)
   const [isRevealed, setIsRevealed] = useState(false);

   useMotionValueEvent(scrollYProgress, "change", (latest) => {
      if (latest > 0.36 && !isRevealed) {
         setIsRevealed(true);
      } else if (latest < 0.36 && isRevealed) {
         setIsRevealed(false);
      }
   });

   // 0.88 - 1.0: End sequence, section fades out completely for smooth release to next project
   const sectionOpacity = useTransform(scrollYProgress, [0, 0.88, 1], [1, 1, 0]);

   // Description Parser for dynamic multi-paragraph content and checklists
   const parseDescription = (text: string) => {
      return text.split('\n').filter(p => p.trim() !== '').map((para, i) => {
         const isBullet = para.trim().startsWith('•') || para.trim().startsWith('') || para.trim().startsWith('-');
         if (isBullet) {
            return (
               <div key={i} className="flex items-start gap-2 md:gap-3 mt-1.5 md:mt-2.5">
                  <span className="text-[#1a7097] mt-0.5 flex-shrink-0">
                     <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#1a7097]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                     </svg>
                  </span>
                  <p className="text-slate-600 text-xs md:text-sm lg:text-base leading-relaxed">{para.replace(/^[•\?\-\*]\s*/, '').trim()}</p>
               </div>
            );
         }
         return <p key={i} className="text-slate-600 text-xs md:text-sm lg:text-base leading-relaxed mt-2 md:mt-3 first:mt-0">{para}</p>;
      });
   };

   if (isMobile) {
      return <DeepDiveProjectMobile project={project} index={index} />;
   }

   // Desktop 300vh Scroll Experience (15.9 design perfected)
   return (
      <section ref={containerRef} className="relative h-[300vh] w-full bg-slate-50">
         <motion.div
            style={{ opacity: sectionOpacity }}
            className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
         >

            {/* Massive Background Logo Anchor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[40vw] opacity-[0.15] md:opacity-25 pointer-events-none select-none flex items-center justify-center">
               <img src="/logo_without_background.png" alt="Background Logo" className="w-full h-auto object-contain grayscale" />
            </div>

            {/* Dynamic Cinematic Image Container */}
            <motion.div
               style={{ scale: imageScale, x: imageX, y: "-50%" }}
               className="absolute top-1/2 left-1/2 w-[90vw] md:w-[80vw] 2xl:w-[70vw] h-[80vh] md:h-[90vh] 2xl:h-[92vh] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)] z-20 origin-center will-change-transform bg-slate-200 border border-slate-200/60"
               data-cursor-hover="true"
            >
               <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
            </motion.div>

            {/* Emerging Text & Architecture Panel (Cleanly aligned, vertically centered, fits all viewports) */}
            <motion.div
               animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 40 }}
               transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
               className="absolute top-1/2 -translate-y-1/2 right-[4vw] 2xl:right-[6vw] w-[90vw] md:w-[50vw] lg:w-[45vw] 2xl:w-[42vw] max-h-[85vh] flex flex-col z-30 pointer-events-none md:pointer-events-auto"
            >
               <div className="pointer-events-auto flex flex-col gap-3 md:gap-4 lg:gap-5 max-w-2xl ml-auto bg-slate-50/95 backdrop-blur-xl p-5 md:p-7 lg:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_15px_45px_rgba(0,0,0,0.06)] border border-white/70 overflow-y-auto max-h-[82vh]">

                  {/* Header Badges */}
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[10px] md:text-xs font-mono uppercase tracking-[0.1em] md:tracking-[0.25em] text-[#1a7097] font-semibold">
                     <span>{project.year}</span>
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                     <span>{project.category}</span>
                  </div>

                  {/* Project Title */}
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.05]">
                     {project.title}
                  </h2>

                  {/* Description & Deliverables */}
                  <div className="flex flex-col">
                     {parseDescription(project.fullDescription)}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 md:gap-2.5 mt-2 md:mt-3">
                     {project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 md:px-4 md:py-1.5 bg-slate-100 text-slate-700 rounded-lg text-[10px] md:text-xs font-mono font-medium border border-slate-200/70">
                           {tech}
                        </span>
                     ))}
                  </div>

               </div>
            </motion.div>

            {/* Persistent Action Bar */}
            <motion.div
               className="absolute bottom-6 md:bottom-10 left-[5vw] 2xl:left-[8vw] z-40 pointer-events-auto flex items-center gap-3"
            >
               {project.liveLink && project.liveLink !== '#' && (
                  <a
                     href={project.liveLink}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="group relative px-6 py-3 md:px-7 md:py-3.5 bg-slate-900 shadow-2xl text-white rounded-full overflow-hidden hover:shadow-[0_10px_30px_rgba(26,112,151,0.3)] transition-all duration-300 inline-flex items-center gap-2 border border-slate-700/50"
                  >
                     <div className="absolute inset-0 bg-[#1a7097] translate-y-[110%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
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
                  className="px-6 py-3 md:px-7 md:py-3.5 bg-[#1a7097] hover:bg-[#145b7c] shadow-lg text-white rounded-full transition-all duration-300 inline-flex items-center gap-2 font-bold tracking-wider text-[10px] md:text-xs uppercase cursor-pointer group"
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
