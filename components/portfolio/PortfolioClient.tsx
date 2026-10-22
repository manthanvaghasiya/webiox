'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import DeepDiveProject from '@/components/portfolio/DeepDiveProject';
import JourneyHero from '@/components/portfolio/JourneyHero';
import PortfolioFilter from '@/components/portfolio/PortfolioFilter';
import { allProjects } from '@/data/projects';

export default function PortfolioClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mergedProjects = allProjects;

  const categories = useMemo(() => {
    const cats = new Set(mergedProjects.map((p) => p.category));
    return ['All', ...Array.from(cats)];
  }, [mergedProjects]);

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return mergedProjects;
    return mergedProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory, mergedProjects]);

  return (
    <main className="bg-slate-50 min-h-screen w-full font-sans selection:bg-[#1a7097]/20 selection:text-[#1a7097] relative pb-1">
      {/* Hero Concept Section */}
      <div className="relative z-20">
        <JourneyHero />
      </div>

      {/* Dynamic Category Filtering Block */}
      <div className="relative z-20 w-full bg-slate-50 pt-10 pb-16">
        <PortfolioFilter
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      {/* Subtle Architectural Overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm39 39V1v38h38z' fill='%230f172a' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Project Pipeline Iteration */}
      <div className="relative z-10 w-full bg-slate-50">
        {filteredProjects.map((project, index) => (
          <DeepDiveProject
            key={project.id}
            project={project}
            index={index}
          />
        ))}

        {filteredProjects.length === 0 && (
          <div className="h-[40vh] flex flex-col items-center justify-center text-slate-500 font-light text-xl">
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Pre-Footer Action Block */}
      <section className="py-20 md:py-28 w-full flex flex-col items-center justify-center relative bg-slate-50 z-10 overflow-hidden text-center px-6 border-t border-slate-200/60">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#1a7097] font-bold mb-3">
          Engineered by Webiox
        </span>
        <h2 className="text-slate-900 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6">
          Ready to Engineer Your Flagship Platform?
        </h2>
        <p className="text-slate-500 max-w-xl text-sm sm:text-base mb-8 font-normal leading-relaxed">
          From concept architecture to zero-downtime production deployments, our senior squads deliver at startup speed with milestone-locked precision.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1a7097] hover:bg-[#145b7c] text-white font-bold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-[#1a7097]/25"
        >
          <span>Start a Project</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
}
