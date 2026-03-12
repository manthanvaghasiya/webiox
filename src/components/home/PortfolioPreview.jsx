import { Reveal } from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: 'FinTech Dashboard',
    category: 'SaaS Development',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Health AI App',
    category: 'Mobile & AI',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Modern E-Commerce',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Real Estate Platform',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop',
  }
];

const PortfolioPreview = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <SectionHeader 
            pretitle="Selected Work"
            title="Featured Projects"
            align="left"
            className="mb-0"
          />
          <Reveal delay={0.2} direction="left">
            <Button to="/portfolio" variant="outline" className="hidden md:flex">
              View All Projects
            </Button>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
              <Link to={`/portfolio/${project.id}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[4/3] mb-6">
                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                  />
                  
                  {/* Floating Action Button */}
                  <div className="absolute top-6 right-6 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                    <ArrowUpRight className="text-gray-900 w-6 h-6" />
                  </div>
                </div>
                
                <div>
                  <p className="text-primary font-medium text-sm mb-2">{project.category}</p>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">{project.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 md:hidden flex justify-center">
          <Button to="/portfolio" variant="outline" fullWidth>
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
