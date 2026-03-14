import React from 'react';
import { motion, stagger } from 'framer-motion';
import { Monitor, Bot, ShoppingCart, PenTool, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Custom Web Development',
    description: 'High-performance, scalable, and visually stunning digital platforms tailored to your business needs.',
    icon: <Monitor className="w-8 h-8 text-brand-blue" />,
  },
  {
    title: 'AI Automation & Agents',
    description: 'Streamline your operations with intelligent AI workflows and custom agents that save time and reduce costs.',
    icon: <Bot className="w-8 h-8 text-brand-blue" />,
  },
  {
    title: 'E-commerce Solutions',
    description: 'Robust and conversion-optimized online stores designed to maximize sales and provide seamless user experiences.',
    icon: <ShoppingCart className="w-8 h-8 text-brand-blue" />,
  },
  {
    title: 'UI/UX Design & Branding',
    description: 'Pixel-perfect, user-centric interfaces designed to maximize engagement and elevate your brand identity.',
    icon: <PenTool className="w-8 h-8 text-brand-blue" />,
  },
  {
    title: 'SEO & Performance Optimization',
    description: 'Data-driven strategies and technical optimizations to improve your search rankings and site speed.',
    icon: <TrendingUp className="w-8 h-8 text-brand-blue" />,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

const Services = () => {
  return (
    <section className="pt-10 pb-24 md:pt-20 md:pb-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center md:text-left mb-16 md:mb-24 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center md:justify-start gap-3 mb-6"
          >
            <span className="h-px w-12 bg-brand-yellow"></span>
            <p className="text-brand-yellow font-bold tracking-widest uppercase text-sm">
              Our Expertise
            </p>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-blue tracking-tight leading-tight"
          >
            Capabilities that define <br className="hidden md:block" /> the future.
          </motion.h2>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-[2rem] p-8 lg:p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full overflow-hidden"
            >
              <div className="relative z-10 flex-grow">
                {/* Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-gray-100 flex items-center justify-center mb-8 group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:scale-110 transition-all duration-500 shadow-sm">
                  {React.cloneElement(service.icon, {
                    className: "w-8 h-8 text-brand-blue group-hover:text-white transition-colors duration-500"
                  })}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-brand-blue group-hover:text-brand-blue/90 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed font-light">
                  {service.description}
                </p>
              </div>

              {/* Bottom Decoration & Call to action */}
              <div className="mt-10 relative z-10 flex items-center justify-between">
                <div className="flex items-center text-brand-yellow font-semibold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                  <span>Explore service</span>
                  <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                {/* Large Background Number (subtle) */}
                <div className="absolute -bottom-8 -right-8 text-[8rem] font-extrabold text-gray-50/50 group-hover:text-gray-100/50 transition-colors duration-500 select-none pointer-events-none z-0">
                  0{index + 1}
                </div>
              </div>

              {/* Subtle hover glow effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-blue/5 rounded-[2rem] pointer-events-none transition-colors duration-500"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
