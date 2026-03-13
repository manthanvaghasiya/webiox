import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: 'FinTech Dashboard',
    category: 'SaaS Development',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    size: 'md:col-span-8',
    height: 'h-[400px] md:h-[500px]'
  },
  {
    id: 2,
    title: 'Health AI App',
    category: 'Mobile & AI',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    size: 'md:col-span-4',
    height: 'h-[400px] md:h-[500px]'
  },
  {
    id: 3,
    title: 'Modern E-Commerce',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2000&auto=format&fit=crop',
    size: 'md:col-span-5',
    height: 'h-[400px] md:h-[500px]'
  },
  {
    id: 4,
    title: 'Real Estate Platform',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop',
    size: 'md:col-span-7',
    height: 'h-[400px] md:h-[500px]'
  }
];

const PortfolioPreview = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-6">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-yellow font-bold tracking-wider uppercase text-sm mb-4"
            >
              Selected Work
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-brand-blue tracking-tight leading-[1.1]"
            >
              Transforming ideas into digital reality.
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:block"
          >
            <Button to="/portfolio" className="bg-brand-blue text-white hover:bg-brand-yellow hover:text-brand-blue transition-all duration-300">
              View All Projects
            </Button>
          </motion.div>
        </div>

        {/* Floating Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              className={`group ${project.size}`}
            >
              <Link to={`/portfolio/${project.id}`} className="block w-full h-full relative">
                <div className={`relative overflow-hidden rounded-3xl ${project.height} mb-6 shadow-lg group-hover:shadow-[0_20px_50px_rgba(0,37,131,0.15)] transition-all duration-500`}>
                  
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-10" />
                  
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="object-cover w-full h-full transform group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Floating Action Button (Mustard Yellow glow on hover) */}
                  <div className="absolute top-6 right-6 z-20 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-brand-yellow transition-all duration-500 shadow-xl">
                    <ArrowUpRight className="text-brand-blue w-6 h-6 transform group-hover:rotate-45 transition-transform duration-300" />
                  </div>

                  {/* Text inside the card (Bottom left) */}
                  <div className="absolute bottom-8 left-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-brand-yellow font-medium text-sm md:text-base mb-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full inline-block border border-white/20">
                      {project.category}
                    </p>
                    <h3 className="text-3xl font-bold text-white group-hover:text-brand-yellow transition-colors duration-300">{project.title}</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 md:hidden flex justify-center">
          <Button to="/portfolio" fullWidth className="bg-brand-blue text-white hover:bg-brand-yellow hover:text-brand-blue transition-all duration-300">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
