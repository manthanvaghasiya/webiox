import { Reveal } from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';
import { Monitor, Smartphone, LayoutGrid, Zap, Blocks, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Monitor className="w-8 h-8 text-primary" />,
    title: 'Web Development',
    description: 'High-performance, scalable web applications built with modern frameworks like React and Next.js.'
  },
  {
    icon: <LayoutGrid className="w-8 h-8 text-primary" />,
    title: 'UI/UX Design',
    description: 'Intuitive, pixel-perfect interfaces designed to maximize user engagement and conversion rates.'
  },
  {
    icon: <Smartphone className="w-8 h-8 text-primary" />,
    title: 'SaaS Development',
    description: 'End-to-end development of Software as a Service platforms with subscription models.'
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: 'API Integration',
    description: 'Seamless integration with third-party APIs and custom backend architecture solutions.'
  },
  {
    icon: <Blocks className="w-8 h-8 text-primary" />,
    title: 'E-Commerce Solutions',
    description: 'Custom Shopify and headless e-commerce builds designed for hyper-growth.'
  },
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: 'AI Solutions',
    description: 'Integration of LLMs and custom AI tools to automate workflows and enhance product value.'
  }
];

const Services = () => {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          pretitle="Our Expertise"
          title="Digital Solutions for Modern Brands"
          subtitle="We utilize cutting-edge technologies and industry best practices to deliver scalable, reliable, and premium digital products."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group h-full flex flex-col">
                <div className="w-16 h-16 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {service.description}
                </p>
                <div className="pt-6 mt-auto">
                  <Link to="/services" className="text-primary font-medium inline-flex items-center group-hover:gap-2 transition-all">
                    Learn more <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-2 transition-all">→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
