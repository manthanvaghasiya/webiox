import { Reveal } from '../components/ui/Reveal';
import SectionHeader from '../components/ui/SectionHeader';
import { Target, Lightbulb, Users as UsersIcon, Code2 } from 'lucide-react';

const team = [
  {
    name: 'Alex Rivera',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
  },
  {
    name: 'Samantha Lee',
    role: 'Lead Designer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
  },
  {
    name: 'Marcus Johnson',
    role: 'Technical Director',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop',
  },
  {
    name: 'Elena Rostova',
    role: 'Lead Engineer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
  }
];

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 
  'Tailwind CSS', 'Framer Motion', 'PostgreSQL', 'AWS'
];

const About = () => {
  return (
    <div className="pt-32 pb-24">
      {/* Story & Mission Section */}
      <section className="mb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
                Redefining the digital landscape, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">one pixel at a time.</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Founded in 2020, Webiox was born from a simple idea: that enterprise-grade web applications shouldn't compromise on design or user experience. We bridge the gap between heavy-duty engineering and stunning aesthetics.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Our Mission</h4>
                    <p className="text-sm text-gray-600 mt-1">To empower businesses with digital products that drive measurable growth and unparalleled user engagement.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Our Vision</h4>
                    <p className="text-sm text-gray-600 mt-1">To be the industry standard for premium, high-performance web development and product design.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.2}>
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Webiox Team Collaboration" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50/50 py-24 mb-32 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            pretitle="Core Team"
            title="The Minds Behind Webiox"
            subtitle="An assembly of industry veterans, creative designers, and brilliant engineers."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {team.map((member, index) => (
              <Reveal key={index} delay={index * 0.1} direction="up">
                <div className="group">
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal direction="up">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Code2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Technologies We Master</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
              We leverage modern, battle-tested technologies to build platforms that scale securely and perform lightning-fast.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {technologies.map((tech, index) => (
                <div 
                  key={index}
                  className="px-6 py-3 bg-white border border-gray-200 shadow-sm rounded-full text-gray-800 font-medium hover:border-primary hover:text-primary transition-all duration-300 hover:shadow-md cursor-default"
                >
                  {tech}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default About;
