'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Project } from '@/data/projects';
import DeepDiveProjectMobile from './DeepDiveProjectMobile';

interface DeepDiveProjectProps {
   project: Project;
   index: number;
}

const DeepDiveProject = ({ project, index }: DeepDiveProjectProps) => {
   const containerRef = useRef(null);
   const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

   useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 1024);
      handleResize(); // Init check
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   const { scrollYProgress } = useScroll({
      target: containerRef,
      // Start tracking when top of section hits top of viewport
      // End tracking when bottom of section hits bottom of viewport
      offset: ["start start", "end end"]
   });

   // Mathematically map the 3-stage unfolding sequence:
   // 0.0 - 0.2: Image locked in center.
   // 0.2 - 0.4: Image shrinks and translates to the left.
   const imageScale = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.8, 1], [1, 1, 0.55, 0.55, 0.5]);
   const imageX = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.8, 1], ["-50%", "-50%", "-80%", "-80%", "-80%"]);

   // 0.25 - 0.45: Text slides up and fades in seamlessly AS image clears left.
   // Using React State for robust fading (fixes Safari / early-hydration opacity locking bugs)
   const [isRevealed, setIsRevealed] = useState(false);

   useMotionValueEvent(scrollYProgress, "change", (latest) => {
      // Trigger reveal ONLY AFTER the image has perfectly finished settling on the left (0.4)
      if (latest > 0.7 && !isRevealed) {
         setIsRevealed(true);
      } else if (latest < 0.7 && isRevealed) {
         setIsRevealed(false);
      }
   });

   // 0.85 - 1.0: End sequence, section fades out completely for release
   const sectionOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0]);

   // Description Parser for dynamic multi-paragraph content and checklists
   const parseDescription = (text: string) => {
      return text.split('\n').filter(p => p.trim() !== '').map((para, i) => {
         if (para.trim().startsWith('•')) {
            return (
               <div key={i} className="flex items-start gap-1.5 md:gap-3 mt-0.5 md:mt-2">
                  <span className="text-primary mt-1 flex-shrink-0">
                     <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                     </svg>
                  </span>
                  <p className="text-slate-600 text-xs md:text-base leading-relaxed">{para.replace('•', '').trim()}</p>
               </div>
            )
         }
         return <p key={i} className="text-slate-600 text-xs md:text-base leading-relaxed mt-2 md:mt-4 first:mt-0">{para}</p>
      })
   };



   if (isMobile) {
      return <DeepDiveProjectMobile project={project} index={index} />;
   }

   // Desktop 300vh Scroll Experience
   return (
      <section ref={containerRef} className="relative h-[300vh] w-full bg-slate-50">
         <motion.div
            style={{ opacity: sectionOpacity }}
            className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
         >

            {/* Massive Background Logo Anchor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[40vw] opacity-[0.15] md:opacity-30 pointer-events-none select-none flex items-center justify-center">
               <img src="/logo_without_background.png" alt="Background Logo" className="w-full h-auto object-contain grayscale" />
            </div>

            {/* Dynamic Image Container */}
            <motion.div
               style={{ scale: imageScale, x: imageX, y: "-50%" }}
               className="absolute top-1/2 left-1/2 w-[90vw] md:w-[80vw] 2xl:w-[70vw] h-[80vh] md:h-[90vh] 2xl:h-[95vh] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)] z-20 origin-center will-change-transform bg-slate-200"
               data-cursor-hover="true"
            >
               <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </motion.div>

            {/* Emerging Text & Architecture Panel */}
            <motion.div
               animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 50 }}
               transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
               className="absolute top-24 md:top-28 lg:top-[15vh] left-[5vw] md:left-auto right-[5vw] 2xl:right-[8vw] w-[90vw] md:w-[50vw] lg:w-[45vw] 2xl:w-[40vw] h-auto flex flex-col z-10 pointer-events-none md:pointer-events-auto"
            >
               <div className="pointer-events-auto flex flex-col gap-3 md:gap-5 lg:gap-6 max-w-2xl ml-auto bg-slate-50/90 backdrop-blur-xl p-5 md:p-8 lg:p-10 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-white/50">

                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[10px] md:text-xs font-mono uppercase tracking-[0.1em] md:tracking-[0.3em] text-primary">
                     <span>{project.year}</span>
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                     <span>{project.category}</span>
                  </div>

                  <h2 className="text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-slate-900 tracking-tighter leading-[1] font-['IBM_Plex_Sans']">
                     {project.title}
                  </h2>

                  <div className="flex flex-col">
                     {parseDescription(project.fullDescription)}
                  </div>

                  <div className="flex flex-wrap gap-2 md:gap-3 mt-3 md:mt-4">
                     {project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 md:px-5 md:py-2 bg-slate-100/80 text-slate-600 rounded-full text-[9px] md:text-[10px] font-bold tracking-widest uppercase shadow-sm">
                           {tech}
                        </span>
                     ))}
                  </div>

               </div>
            </motion.div>

            {/* Persistent Live Demo Action */}
            <motion.div
               className="absolute bottom-6 md:bottom-10 left-[5vw] 2xl:left-[8vw] z-40 pointer-events-auto"
            >
               <a href={project.liveLink} className="group relative px-6 py-3 md:px-8 md:py-4 bg-slate-900 shadow-2xl text-white rounded-full overflow-hidden hover:shadow-[0_10px_30px_rgba(33,166,139,0.3)] transition-all duration-300 inline-flex items-center gap-2 border border-slate-700/50">
                  <div className="absolute inset-0 bg-primary translate-y-[110%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                  <span className="relative z-10 font-semibold tracking-widest text-[10px] md:text-xs uppercase flex items-center gap-2 whitespace-nowrap">
                     Live Demo
                     <svg className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                     </svg>
                  </span>
               </a>
            </motion.div>

         </motion.div>
      </section>
   );
};

export default DeepDiveProject;
