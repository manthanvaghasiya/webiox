'use client';

import { motion } from 'framer-motion';
import { services } from '@/data/services';
import { ArrowRight, CheckCircle2, Database, Code2, Network, Cpu, ShoppingCart, Layout, Smartphone, Globe, CreditCard, Lock } from 'lucide-react';
import Link from 'next/link';
import CodeToUIMorph from './CodeToUIMorph';
import AIAutomationWorkflow from './AIAutomationWorkflow';
import WireframeToReality from './WireframeToReality';
import SpatialMobileDevice from './SpatialMobileDevice';
import EcommerceTransaction from './EcommerceTransaction';
import EnterpriseWebJourney from './EnterpriseWebJourney';

const premiumEase = "easeOut";

export default function ServiceScroll() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-32">
      <div className="flex flex-col gap-24 md:gap-32">
        {services.map((service, index) => (
          <div key={service.id} id={service.id} className="flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-24 relative">

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

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 mb-2 sm:mb-3 tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-base sm:text-lg font-medium text-[#0E5E64]/80 mb-6 sm:mb-8">
                    {service.subtitle}
                  </p>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8">
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
              
              {/* Premium Abstract Visual Block (Replaces Image) */}
              <div className={`relative group perspective-[1000px] w-full ${['mobile-apps', 'web-development'].includes(service.id) ? '' : 'aspect-[4/3] md:aspect-[16/10]'}`}>
                {/* Background Glow */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${service.color} rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1, ease: premiumEase }}
                  className={`relative w-full ${['mobile-apps', 'web-development'].includes(service.id) ? '' : 'h-full bg-slate-950 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl'}`}
                >
                  {/* High-tech Grid Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70" />
                  
                  {/* Floating Glowing Orbs */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br ${service.color} rounded-full blur-[100px]`}
                  />
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className={`absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr ${service.color} rounded-full blur-[100px]`}
                  />

                  {/* Main Abstract Composition - Varies by Index */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    

                    {service.id === 'web-development' && (
                      <div className="w-full h-full">
                        <EnterpriseWebJourney />
                      </div>
                    )}

                    {service.id === 'ecommerce-platforms' && (
                      <div className="w-full h-full">
                        <EcommerceTransaction />
                      </div>
                    )}

                    {service.id === 'saas-development' && (
                      <div className="w-full h-full">
                        <CodeToUIMorph />
                      </div>
                    )}

                    {service.id === 'ai-solutions' && (
                      <div className="w-full h-full">
                        <AIAutomationWorkflow />
                      </div>
                    )}

                    {service.id === 'ui-ux-design' && (
                      <div className="w-full h-full">
                        <WireframeToReality />
                      </div>
                    )}

                    {service.id === 'mobile-apps' && (
                      <div className="w-full h-full">
                        <SpatialMobileDevice />
                      </div>
                    )}

                  </div>
                </motion.div>
              </div>

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
                  className="bg-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden h-full flex flex-col justify-center shadow-lg mt-4 md:mt-0"
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
