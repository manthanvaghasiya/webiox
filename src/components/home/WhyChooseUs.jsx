import { Reveal } from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';
import { Rocket, ShieldCheck, Cpu, Users } from 'lucide-react';

const reasons = [
  {
    icon: <Rocket className="w-6 h-6 text-white" />,
    title: 'Fast Development',
    description: 'We use modern stacks like React, Next.js, and Node.js to deliver high-quality products faster than traditional agencies.'
  },
  {
    icon: <Cpu className="w-6 h-6 text-white" />,
    title: 'Modern Technologies',
    description: 'Built on scalable, future-proof tech stacks that ensure your product remains robust as your user base grows.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    title: 'Secure & Scalable',
    description: 'Enterprise-grade security and scalable cloud architectures that can handle high traffic volumes and complex data.'
  },
  {
    icon: <Users className="w-6 h-6 text-white" />,
    title: 'Client-Focused Approach',
    description: 'We prioritize transparent communication, regular updates, and a collaborative process to ensure we meet your specific goals.'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-teal-400/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <Reveal direction="left">
              <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">
                The Webiox Advantage
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
                Why Top Companies Choose <span className="text-teal-400">Webiox</span>
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                We don't just build websites; we build scalable digital businesses. Our engineering-first approach paired with premium design ensures that your digital presence acts as a powerful growth engine.
              </p>
              
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-white">99%</span>
                  <span className="text-sm text-gray-400 mt-1">Client Satisfaction</span>
                </div>
                <div className="w-px h-12 bg-gray-800" />
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-white">150+</span>
                  <span className="text-sm text-gray-400 mt-1">Projects Delivered</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <Reveal key={index} delay={0.2 + (index * 0.1)}>
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:bg-gray-800 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-5 shadow-lg shadow-primary/20">
                    {reason.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
