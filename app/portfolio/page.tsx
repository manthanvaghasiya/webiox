'use client';

import { useEffect, useState, useMemo } from 'react';

import DeepDiveProject from '@/components/portfolio/DeepDiveProject';
import JourneyHero from '@/components/portfolio/JourneyHero';
import PortfolioFilter from '@/components/portfolio/PortfolioFilter';
import { allProjects } from '@/data/projects';

const Portfolio = () => {
  // Reset window to origin for uninterrupted 300vh experience
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Extract unique categories safely for the filter component
  const categories = useMemo(() => {
    const cats = new Set(allProjects.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, []);

  // Local state for tracking current active category
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return allProjects;
    return allProjects.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      {/* Light Mode Foundation for the entire page */}
      <main className="bg-slate-50 min-h-screen w-full font-sans selection:bg-primary/20 selection:text-primary relative pb-1">

        {/* Hero Concept Section */}
        <div className="relative z-20">
          <JourneyHero />
        </div>

        {/* Dynamic Category Filtering Block bridging the hero and the project list */}
        <div className="relative z-20 w-full bg-slate-50 pt-10 pb-16">
           <PortfolioFilter
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
           />
        </div>

        {/* Subtle Architectural Overlay for depth behind projects */}
        <div
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm39 39V1v38h38z' fill='%230f172a' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")" }}
        />

        {/* Project Pipeline Iteration - Render Filtered Projects */}
        <div className="relative z-10 w-full bg-slate-50">
          {filteredProjects.map((project, index) => (
            <DeepDiveProject
              key={project.id}
              project={project}
              index={index}
            />
          ))}

          {/* Empty state safeguard if a filter yields no projects somehow */}
          {filteredProjects.length === 0 && (
             <div className="h-[40vh] flex flex-col items-center justify-center text-slate-500 font-light text-xl">
                 <p>No projects found in this category.</p>
             </div>
          )}
        </div>

        {/* Elegant Footer Release */}
        <footer className="h-[60vh] w-full flex flex-col items-center justify-center relative bg-slate-50 z-10 overflow-hidden">
          <h2 className="text-slate-900 text-3xl sm:text-4xl md:text-7xl font-serif font-light tracking-widest uppercase mb-8 mix-blend-multiply text-center px-6">
             End of Journey
          </h2>
          <div className="w-[1px] h-32 bg-gradient-to-b from-slate-300 to-transparent" />
        </footer>

      </main>
    </>
  );
};

export default Portfolio;
