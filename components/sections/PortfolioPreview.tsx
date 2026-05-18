'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { allProjects } from '@/data/projects';

const projects = allProjects.slice(0, 4);

const ProjectCard = ({ project, index, progress, totalCards }: any) => {
  const step = 1 / (totalCards - 1);
  const inStart = Math.max(0, (index - 1) * step);
  const inEnd = index * step;
  const outStart = index * step;
  const outEnd = 1;

  const yOffset = useTransform(progress, [inStart, inEnd], ['100vh', '0vh']);
  const y = index === 0 ? '0vh' : yOffset;

  const targetScale = 1 - ((totalCards - index - 1) * 0.04);
  const scale = useTransform(progress, [outStart, outEnd], [1, targetScale]);

  const filter = useTransform(
    progress,
    [outStart, outEnd],
    ['blur(0px)', `blur(${(totalCards - index - 1) * 1.5}px)`]
  );

  const opacity = useTransform(progress, [outStart, outEnd], [0, 0.4]);

  const stackOffset = 20;

  return (
    <motion.div
      className="absolute top-0 left-0 w-full flex justify-center origin-top will-change-transform pb-4 md:pb-8"
      style={{
        y,
        scale,
        filter,
        top: `calc(${index * stackOffset}px)`,
        height: `calc(100% - ${(totalCards - 1) * stackOffset}px - 4rem)`,
        zIndex: index + 1,
      }}
    >
      <div className="relative w-full max-w-[1400px] h-full overflow-hidden rounded-3xl md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] group bg-neutral-900 border border-[#F9FAFB]/10">
        <Link href={`/portfolio/${project.id}`} className="block w-full h-full relative group cursor-pointer" aria-label={`View ${project.title}`}>

          {/* Parallax Depth Darkening Overlay */}
          <motion.div
            style={{ opacity }}
            className="absolute inset-0 bg-black z-20 pointer-events-none"
          />

          {/* Aesthetic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 opacity-90 z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-100" />

          {/* Image wrapper */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-full will-change-transform"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Floating Action Button */}
          <div className="absolute top-6 right-6 md:top-10 md:right-10 z-30 w-14 h-14 md:w-20 md:h-20 bg-[#F9FAFB]/10 backdrop-blur-xl border border-[#F9FAFB]/20 rounded-full flex items-center justify-center translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-[#FFBF00] group-hover:border-transparent transition-all duration-500 ease-[0.16,1,0.3,1] shadow-2xl">
            <div className="transform group-hover:rotate-45 transition-transform duration-500 ease-[0.16,1,0.3,1]">
              <ArrowUpRight className="text-[#F9FAFB] group-hover:text-[#0E5E64] w-6 h-6 md:w-8 md:h-8 transition-colors duration-300" />
            </div>
          </div>

          {/* Descriptive Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 z-20 translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
            <div className="flex flex-col items-start gap-4 max-w-3xl">
              <span className="text-[#FFBF00] font-semibold text-xs md:text-sm px-5 py-2 bg-[#F9FAFB]/10 backdrop-blur-md rounded-full border border-[#F9FAFB]/20 uppercase tracking-widest shadow-lg">
                {project.category}
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#F9FAFB] tracking-tight leading-[1.1] mb-2 md:mb-4">
                {project.title}
              </h3>
            </div>
            <div className="w-0 h-1.5 bg-[#FFBF00] rounded-full mt-6 md:mt-8 group-hover:w-full max-w-[200px] transition-all duration-1000 ease-[0.16,1,0.3,1] opacity-0 group-hover:opacity-100" />
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default function PortfolioPreview() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-slate-50 pb-20 md:pb-32">
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden flex flex-col lg:flex-row items-center lg:items-stretch lg:justify-between px-4 sm:px-6 lg:px-12 xl:px-20 gap-8 lg:gap-16 pt-24 lg:pt-0 pb-24 lg:pb-32 xl:pb-40">

        {/* Left Side: Permanent Content */}
        <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-center lg:justify-start lg:pt-32 shrink-0 z-50 order-1 lg:order-none lg:h-[100vh]">
          <div className="max-w-xl mx-auto lg:mx-0 w-full text-center lg:text-left pt-6 lg:pt-0 relative">

            {/* Decorative background element */}
            <div className="absolute -left-5 md:-left-10 top-20 w-40 h-40 bg-[#FFBF00]/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

            {/* Premium Category Label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center lg:justify-start gap-4 mb-6 md:mb-8"
            >
              <span className="flex h-2 w-2">
                <span className="animate-pulse absolute inline-flex h-2 w-2 rounded-full bg-[#FFBF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFBF00]"></span>
              </span>
              <span className="text-slate-500 font-medium tracking-[0.2em] uppercase text-xs">
                Selected Work
              </span>
              <div className="hidden lg:block h-[1px] w-12 bg-slate-300" />
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-slate-900 tracking-tight leading-[1.1] mb-4 md:mb-6">
                Transforming <br className="hidden md:block" />
                <span className="relative inline-block text-[#0E5E64] italic pr-5">
                  ideas
                  <span className="absolute bottom-2 left-0 w-full h-[0.1em] bg-[#FFBF00]/30 -z-10 -rotate-2" />
                </span>
                into <br className="hidden lg:block" /> digital reality.
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative pl-0 lg:pl-6 border-l-0 lg:border-l border-slate-200 mb-10 md:mb-8"
            >
              <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto lg:mx-0 hidden md:block">
                Explore our portfolio of innovative digital solutions and transformative user experiences. We build <span className="text-slate-800 font-medium">precision-engineered platforms</span> for visionary brands.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex justify-center lg:justify-start"
            >
              <Link href="/portfolio" className="group relative inline-flex items-center justify-center">
                <div className="absolute inset-0 w-full h-full rounded-full bg-[#0E5E64] opacity-20 blur-xl group-hover:opacity-40 group-hover:blur-2xl transition-all duration-500" />
                <div className="relative text-[#F9FAFB] font-semibold text-sm md:text-base px-8 py-4 sm:px-10 sm:py-5 bg-slate-900 rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition-all duration-300">
                  <div className="absolute inset-x-0 bottom-0 h-0 bg-[#0E5E64] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:h-full z-0" />
                  <span className="relative z-10 flex items-center gap-3">
                    View Complete Index
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>

          </div>
        </div>

        {/* Right Side: Scrolling Cards Container */}
        <div className="w-full lg:w-[50%] xl:w-[55%] flex-1 relative flex flex-col justify-center lg:justify-start lg:pt-32 min-h-[500px] md:min-h-[600px] lg:h-[100vh] order-2 lg:order-none mt-8 lg:mt-0 pb-12 md:pb-24 lg:pb-48 xl:pb-64">
          <div className="relative w-full h-[60vh] lg:h-[75vh] max-w-[900px] mx-auto min-h-[450px]">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                progress={smoothProgress}
                totalCards={projects.length}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
