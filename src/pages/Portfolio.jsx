import { useState } from 'react';
import { Reveal, FadeIn } from '../components/ui/Reveal';
import ProjectCard from '../components/portfolio/ProjectCard';

const allProjects = [
  {
    id: 1,
    title: 'FinTech Analytics Dashboard',
    category: 'SaaS Development',
    year: '2023',
    tech: ['React', 'Next.js', 'Tailwind', 'GraphQL'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'HealthSync Mobile App',
    category: 'Mobile & AI',
    year: '2024',
    tech: ['React Native', 'OpenAI API', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'RetailGen E-Commerce',
    category: 'Web Development',
    year: '2023',
    tech: ['Shopify Plus', 'React', 'Remix'],
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Lumina Real Estate',
    category: 'UI/UX Design',
    year: '2024',
    tech: ['Figma', 'Framer', 'Three.js'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'CyberSec Enterprise Portal',
    category: 'Web Development',
    year: '2023',
    tech: ['Vue.js', 'Nuxt', 'Django', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1510511459019-5efa325aa8a8?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Nexus Data Infrastructure',
    category: 'SaaS Development',
    year: '2024',
    tech: ['SvelteKit', 'Go', 'Kubernetes'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
  }
];

const categories = ['All', 'Web Development', 'SaaS Development', 'UI/UX Design', 'Mobile & AI'];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      
      {/* Header */}
      <section className="mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <Reveal direction="up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Our Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">Works</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mx-auto sm:mx-0">
            A showcase of digital products we've engineered to solve complex problems and drive business value.
          </p>
        </Reveal>
      </section>

      {/* Filter Tabs */}
      <section className="mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center sm:justify-start">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Project Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-8 lg:gap-x-12">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 4) * 0.1} direction="up">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No projects found.</h3>
            <p className="text-gray-500">Try selecting a different category.</p>
          </div>
        )}
      </section>

    </div>
  );
};

export default Portfolio;
