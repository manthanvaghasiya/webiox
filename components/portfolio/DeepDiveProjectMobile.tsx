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
                  <span className="text-[#1a7097] mt-1 flex-shrink-0">
                     <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                     </svg>
                  </span>
                  <p className="text-slate-600 text-sm leading-relaxed">{para.replace('•', '').trim()}</p>
               </div>
            )
         }
         return <p key={i} className="text-slate-600 text-sm leading-relaxed mt-4 first:mt-0">{para}</p>
      })
   };

   return (
      <section className="w-full py-16 px-6 bg-slate-50 relative overflow-hidden border-t border-slate-200/50">
         {/* Background Watermark */}
         <div className="absolute top-10 right-0 w-[60vw] opacity-[0.15] pointer-events-none select-none flex items-end justify-end translate-x-[20%]">
            <img src="/logo_without_background.png" alt="Background Logo" className="w-full h-auto object-contain grayscale" />
         </div>

         <div className="flex flex-col gap-6 relative z-10 max-w-lg mx-auto">
            {/* Header */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.8 }}
               className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#1a7097] font-semibold"
            >
               <span>{String(index + 1).padStart(2, '0')}</span>
               <span className="w-1 h-1 rounded-full bg-slate-300" />
               <span>{project.year}</span>
               <span className="w-1 h-1 rounded-full bg-slate-300" />
               <span>{project.category}</span>
            </motion.div>

            <motion.h2
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.8, delay: 0.1 }}
               className="text-3xl font-black text-slate-900 tracking-tight leading-[1.1]"
            >
               {project.title}
            </motion.h2>

            {/* Image */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] bg-slate-950 border border-slate-800/80 p-1.5 mt-2 flex items-center justify-center"
            >
               <img src={project.image} alt={project.title} className="w-full h-full object-contain rounded-xl select-none" />
            </motion.div>

            {/* Content Box */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="flex flex-col bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-slate-200 mt-2"
            >
               <div className="flex flex-col">
                  {parseDescription(project.fullDescription)}
               </div>

               <div className="flex flex-wrap gap-2 mt-6">
                  {project.tech.map((tech, i) => (
                     <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-mono font-medium border border-slate-200/60">
                        {tech}
                     </span>
                  ))}
               </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="mt-4 flex flex-col gap-3"
            >
               <Link
                  href={`/portfolio/${project.id}`}
                  className="px-6 py-4 w-full bg-[#1a7097] hover:bg-[#145b7c] shadow-lg text-white rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
               >
                  <span>Explore Case Study</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
               </Link>

               {project.liveLink && project.liveLink !== '#' && (
                  <a
                     href={project.liveLink}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="px-6 py-3.5 w-full bg-slate-900 hover:bg-slate-800 shadow-md text-white rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700/50 transition-all"
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
