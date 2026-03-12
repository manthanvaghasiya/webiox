import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/portfolio/${project.id}`} className="group block">
      <div className="relative overflow-hidden rounded-3xl mb-6 bg-gray-100 aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]">
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
        
        {/* Project Image */}
        <img 
          src={project.image} 
          alt={project.title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          loading="lazy"
        />
        
        {/* Floating Action Button */}
        <div className="absolute top-6 right-6 z-20 w-14 h-14 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 shadow-2xl transition-all duration-500 ease-out">
          <ArrowUpRight className="text-gray-900 w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" />
        </div>

        {/* Tech Stack Tags on Hover */}
        <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
           {project.tech.slice(0, 3).map((t, index) => (
             <span key={index} className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold rounded-full shadow-sm">
               {t}
             </span>
           ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider">{project.category}</p>
          <span className="text-gray-400 text-sm">{project.year}</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">{project.title}</h3>
      </div>
    </Link>
  );
};

export default ProjectCard;
