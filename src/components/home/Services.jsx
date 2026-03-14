import { motion } from 'framer-motion';
import { Monitor, Smartphone, LayoutGrid, Zap, Blocks, Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Monitor className="w-8 h-8 md:w-10 md:h-10 text-brand-yellow" />,
    title: 'Enterprise Web Development',
    description: 'High-performance, scalable web applications built with modern frameworks to drive your digital growth seamlessly.',
    span: 'col-span-1 md:col-span-2 row-span-2',
    bg: 'bg-brand-blue',
    textColor: 'text-white',
    descColor: 'text-blue-100',
    iconBg: 'bg-white/10',
    linkHover: 'group-hover:text-brand-yellow'
  },
  {
    icon: <LayoutGrid className="w-6 h-6 text-brand-blue" />,
    title: 'UI/UX Excellence',
    description: 'Pixel-perfect interfaces designed to maximize engagement.',
    span: 'col-span-1 md:col-span-1 row-span-1',
    bg: 'bg-white',
    textColor: 'text-brand-blue',
    descColor: 'text-gray-600',
    iconBg: 'bg-brand-gray',
    linkHover: 'group-hover:text-brand-yellow'
  },
  {
    icon: <Smartphone className="w-6 h-6 text-brand-blue" />,
    title: 'SaaS Platforms',
    description: 'End-to-end development of scalable SaaS products.',
    span: 'col-span-1 md:col-span-1 row-span-1',
    bg: 'bg-white',
    textColor: 'text-brand-blue',
    descColor: 'text-gray-600',
    iconBg: 'bg-brand-gray',
    linkHover: 'group-hover:text-brand-yellow'
  },
  {
    icon: <Zap className="w-6 h-6 text-brand-blue" />,
    title: 'API Integration',
    description: 'Seamless third-party and custom backend solutions.',
    span: 'col-span-1 md:col-span-1 row-span-1',
    bg: 'bg-white',
    textColor: 'text-brand-blue',
    descColor: 'text-gray-600',
    iconBg: 'bg-brand-gray',
    linkHover: 'group-hover:text-brand-yellow'
  },
  {
    icon: <Bot className="w-6 h-6 text-brand-blue" />,
    title: 'AI Workflows',
    description: 'Integrating LLMs to automate and enhance your product.',
    span: 'col-span-1 md:col-span-2 row-span-1',
    bg: 'bg-brand-gray',
    textColor: 'text-brand-blue',
    descColor: 'text-gray-700',
    iconBg: 'bg-white',
    linkHover: 'group-hover:text-brand-yellow'
  }
];

const Services = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-brand-gray overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-yellow font-bold tracking-wider uppercase text-sm mb-4"
          >
            Digital Ecosystem
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-brand-blue tracking-tight leading-tight"
          >
            Capabilities that define <br className="hidden md:block" /> the future.
          </motion.h2>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 auto-rows-[minmax(180px,auto)] md:auto-rows-[220px]">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden rounded-[2rem] p-6 text-left md:p-8 lg:p-12 flex flex-col justify-between ${service.bg} md:${service.span} shadow-sm hover:shadow-xl transition-all duration-300 border border-white/50`}
            >
              <div className="flex justify-between items-start">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${service.iconBg} flex items-center justify-center transform group-hover:-rotate-12 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <div className={`w-10 h-10 rounded-full bg-transparent flex items-center justify-center -mr-2 -mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 ${service.textColor}`}>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-8">
                <h3 className={`text-2xl font-bold mb-3 ${service.textColor}`}>{service.title}</h3>
                <p className={`text-base leading-relaxed max-w-md ${service.descColor}`}>
                  {service.description}
                </p>
              </div>

              {/* Subtle hover glow effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-yellow/30 rounded-3xl pointer-events-none transition-colors duration-500"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
