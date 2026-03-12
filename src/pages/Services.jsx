import { Reveal } from '../components/ui/Reveal';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import { Monitor, LayoutGrid, Smartphone, Zap, CheckCircle2, Bot } from 'lucide-react';

const services = [
  {
    id: 'web-development',
    icon: <Monitor className="w-8 h-8 text-primary" />,
    title: 'Enterprise Web Development',
    description: 'We build fast, secure, and scalable web applications tailored to your business needs, using modern frameworks like React and Next.js.',
    benefits: ['High Performance', 'Scalable Architecture', 'SEO Optimized', 'Custom Integrations'],
    tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL']
  },
  {
    id: 'ui-ux-design',
    icon: <LayoutGrid className="w-8 h-8 text-primary" />,
    title: 'UI/UX Design',
    description: 'Our design philosophy centers on creating intuitive, engaging, and beautiful interfaces that convert visitors into loyal customers.',
    benefits: ['User-Centric Design', 'Wireframing & Prototyping', 'Design Systems', 'Usability Testing'],
    tech: ['Figma', 'Framer', 'Illustrator', 'Tailwind CSS']
  },
  {
    id: 'saas-development',
    icon: <Smartphone className="w-8 h-8 text-primary" />,
    title: 'SaaS Product Development',
    description: 'From MVPs to complex SaaS platforms, we handle the entire product lifecycle including multi-tenant architectures and subscription billing.',
    benefits: ['Rapid Prototyping', 'Multi-tenant Architecture', 'Stripe Integration', 'Analytics Dasboards'],
    tech: ['TypeScript', 'AWS', 'Stripe', 'Redis']
  },
  {
    id: 'api-integration',
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: 'API & Backend Integration',
    description: 'We construct robust backend architectures and integrate third-party APIs seamlessly to empower your application\'s functionality.',
    benefits: ['REST & GraphQL', 'Microservices', 'High Availability', 'Secure Authentication'],
    tech: ['GraphQL', 'Express', 'Docker', 'Kubernetes']
  },
  {
    id: 'ai-solutions',
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: 'AI Solutions & Automation',
    description: 'Integrate the power of Large Language Models (LLMs) and custom AI agents into your workflows to automate processes and enhance user experiences.',
    benefits: ['LLM Integration', 'Custom Chatbots', 'Workflow Automation', 'Data Analysis pipeline'],
    tech: ['OpenAI API', 'LangChain', 'Python', 'Vector DBs']
  }
];

const Services = () => {
  return (
    <div className="pt-32 pb-24">
      {/* Hero Section */}
      <section className="mb-24 text-center px-4 max-w-4xl mx-auto">
        <Reveal direction="up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
            Services Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">Growth</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-10">
            We provide end-to-end digital solutions that transform ideas into scalable, high-performance products.
          </p>
        </Reveal>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-32">
          {services.map((service, index) => (
            <div key={service.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}>
              
              {/* Content Side */}
              <div className="flex-1 w-full">
                <Reveal direction={index % 2 === 1 ? "right" : "left"}>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {service.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                        <span className="text-gray-700 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Technologies We Use</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tech.map((t, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Visual Side */}
              <div className="flex-1 w-full">
                <Reveal direction={index % 2 === 1 ? "left" : "right"} delay={0.2}>
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gray-50 border border-gray-100 p-8 flex items-center justify-center group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-teal-400/5 group-hover:scale-105 transition-transform duration-700" />
                    {/* Placeholder visual representation instead of generic image */}
                    <div className="relative z-10 text-center">
                       <h3 className="text-2xl font-bold text-gray-300 mb-2">Illustration / UI Mockup</h3>
                       <p className="text-gray-400">Representing {service.title}</p>
                    </div>
                    {/* Decorative abstract elements */}
                    <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-teal-400/20 blur-2xl" />
                    <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl" />
                  </div>
                </Reveal>
              </div>
              
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mt-32 max-w-4xl mx-auto px-4 text-center">
        <Reveal direction="up">
          <div className="bg-primary/5 rounded-3xl p-12 border border-primary/10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Don't see what you need?</h2>
            <p className="text-xl text-gray-600 mb-8">
              We also offer custom development solutions tailored to unique technical requirements.
            </p>
            <Button to="/contact" size="lg">
              Let's Talk About Your Project
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Services;
