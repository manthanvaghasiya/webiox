'use client';

import { motion } from 'framer-motion';
import { services } from '@/data/services';
import { ArrowRight, CheckCircle2, Database } from 'lucide-react';
import Link from 'next/link';

const premiumEase = "easeOut";

export default function ServiceScroll() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-32">
      <div className="flex flex-col gap-16 md:gap-32">
        {services.map((service, index) => (
          <div key={service.id} id={service.id} className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

            {/* Left Sticky Anchor */}
            <div className="lg:w-5/12 relative">
              <div className="lg:sticky lg:top-32">
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

                  <Link href={`/services/${service.id}`} className="inline-block">
                    <motion.div className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#0E5E64] hover:text-[#FFBF00] transition-colors cursor-pointer">
                      Explore specs
                      <div className="w-8 h-8 rounded-full bg-[#0E5E64]/10 flex items-center justify-center group-hover:bg-[#0E5E64] group-hover:text-[#F9FAFB] transition-colors duration-300">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Right Scroll Content */}
            <div className="lg:w-7/12 flex flex-col gap-8">
              
              {/* Premium Image Block */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: premiumEase }}
                className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden group shadow-lg border border-slate-200"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 mix-blend-multiply z-10`} />
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Benefits */}
                <div className="flex flex-col gap-4">
                  {service.benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: premiumEase }}
                      className="group relative flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                    >
                      <div className={`relative z-10 w-10 h-10 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center shrink-0`}>
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-slate-800 font-medium leading-tight">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col justify-center shadow-lg"
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.color} opacity-20 blur-[60px] rounded-full pointer-events-none`} />
                  <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2 relative z-10">
                    <Database className="w-4 h-4" /> Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {service.tech.map((t, i) => (
                      <div key={i} className="px-4 py-2 bg-white/10 text-white rounded-xl text-sm font-medium backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors">
                        {t}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
