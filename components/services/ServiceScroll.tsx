'use client';

import { motion } from 'framer-motion';
import { services } from '@/data/services';
import { ArrowRight, CheckCircle2, Database } from 'lucide-react';

const premiumEase = "easeOut";

export default function ServiceScroll() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-32">
      <div className="flex flex-col gap-16 md:gap-24">
        {services.map((service, index) => (
          <div key={service.id} id={service.id} className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

            {/* Left Sticky Anchor */}
            <div className="lg:w-5/12 relative">
              <div className="lg:sticky lg:top-24">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: premiumEase }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-[1px] mb-8 shadow-xl`}>
                    <div className="w-full h-full bg-[#F9FAFB] rounded-[15px] flex items-center justify-center text-slate-800 text-3xl">
                      {service.icon}
                    </div>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-3 tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-lg font-medium text-[#0E5E64]/80 mb-8">
                    {service.subtitle}
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <motion.button className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#0E5E64] hover:text-[#FFBF00] transition-colors">
                    Explore specs
                    <div className="w-8 h-8 rounded-full bg-[#0E5E64]/10 flex items-center justify-center group-hover:bg-[#0E5E64] group-hover:text-[#F9FAFB] transition-colors duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* Right Scroll Content */}
            <div className="lg:w-7/12 flex flex-col gap-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: premiumEase }}
                className={`relative w-full aspect-square md:aspect-[4/3] rounded-[2rem] bg-gradient-to-br ${service.color} border border-slate-200 overflow-hidden group shadow-sm flex items-center justify-center`}
              >
                <div className="text-center text-[#F9FAFB]">
                  <div className="text-7xl mb-4">{service.icon}</div>
                  <p className="text-xl font-semibold opacity-80">{service.title}</p>
                  <p className="text-sm opacity-60 mt-2">Interactive visualization</p>
                </div>
              </motion.div>

              {/* Benefits */}
              <div className="grid sm:grid-cols-1 gap-4">
                {service.benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: premiumEase }}
                    className={`group relative flex items-center gap-4 p-5 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-200/50 hover:bg-white hover:border-[#0E5E64]/30 hover:shadow-xl hover:shadow-[#0E5E64]/5 transition-all duration-400 overflow-hidden`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                    <div className={`relative z-10 w-8 h-8 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-800 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0E5E64]/20 blur-[80px] rounded-full pointer-events-none" />
                <p className="text-slate-400 text-sm font-semibold tracking-widest uppercase mb-6 flex items-center gap-2">
                  <Database className="w-4 h-4" /> Stack
                </p>
                <div className="flex flex-wrap gap-3">
                  {service.tech.map((t, i) => (
                    <div key={i} className="px-4 py-2 bg-[#F9FAFB]/10 text-[#F9FAFB] rounded-lg text-sm font-medium backdrop-blur-sm">
                      {t}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
