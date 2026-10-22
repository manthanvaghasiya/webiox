'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/data/projects';

interface DeepDiveProjectMobileProps {
  project: Project;
  index: number;
}

const DeepDiveProjectMobile = ({ project, index }: DeepDiveProjectMobileProps) => {
   // Description Parser for dynamic multi-paragraph content and checklists
   const parseDescription = (text: string) => {
      return text.split('\n').filter(p => p.trim() !== '').map((para, i) => {
         if (para.trim().startsWith('•')) {
            return (
               <div key={i} className="flex items-start gap-2 mt-2">
                  <span className="text-emerald-600 mt-0.5 flex-shrink-0">
                     <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                     </svg>
                  </span>
                  <p className="text-slate-600 text-sm leading-relaxed">{para.replace('•', '').trim()}</p>
               </div>
            );
         }
         return <p key={i} className="text-slate-700 text-sm leading-relaxed mt-3 first:mt-0 font-medium">{para}</p>;
      });
   };

   return (
      <section className="w-full py-14 px-5 bg-slate-50 relative overflow-hidden border-t border-slate-200/50">
         {/* Background Watermark */}
         <div className="absolute top-10 right-0 w-[60vw] opacity-[0.10] pointer-events-none select-none flex items-end justify-end translate-x-[20%]">
            <img src="/logo_without_background.png" alt="Background Logo" className="w-full h-auto object-contain grayscale" />
         </div>

         <div className="flex flex-col gap-5 relative z-10 max-w-lg mx-auto">
            {/* Header */}
            <motion.div
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.6 }}
               className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-[#1a7097] font-semibold"
            >
               <span className="px-2 py-0.5 rounded bg-[#1a7097]/10 font-bold">
                  {String(index + 1).padStart(2, '0')} / 06
               </span>
               <span>{project.year}</span>
               <span className="w-1 h-1 rounded-full bg-slate-300" />
               <span>{project.category}</span>
               {project.liveLink && project.liveLink !== '#' && (
                  <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                     LIVE
                  </span>
               )}
            </motion.div>

            <motion.h2
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.6, delay: 0.1 }}
               className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-[1.15]"
            >
               {project.title}
            </motion.h2>

            {/* Image */}
            <motion.div
               initial={{ opacity: 0, scale: 0.96 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.6, delay: 0.15 }}
               className="w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.12)] bg-slate-950 border border-slate-800/80 p-1 flex items-center justify-center"
            >
               <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-xl select-none" />
            </motion.div>

            {/* Content Box with full details */}
            <motion.div
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="flex flex-col bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200/90"
            >
               <div className="flex flex-col">
                  {parseDescription(project.fullDescription)}
               </div>

               {/* Tech tags */}
               <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-slate-100">
                  {project.tech.map((tech, i) => (
                     <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-[10px] font-mono font-medium border border-slate-200/60">
                        {tech}
                     </span>
                  ))}
               </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.6, delay: 0.25 }}
               className="flex flex-col gap-2.5"
            >
               <Link
                  href={`/portfolio/${project.id}`}
                  className="px-6 py-3.5 w-full bg-[#1a7097] hover:bg-[#145b7c] shadow-md text-white rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
               >
                  <span>Explore Case Study</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
               </Link>

               {project.liveLink && project.liveLink !== '#' && (
                  <a
                     href={project.liveLink}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="px-6 py-3 w-full bg-slate-900 hover:bg-slate-800 shadow-sm text-white rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700/50 transition-all"
                  >
                     <span>View Live Platform</span>
                     <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                     </svg>
                  </a>
               )}
            </motion.div>
         </div>
      </section>
   );
};

export default DeepDiveProjectMobile;
