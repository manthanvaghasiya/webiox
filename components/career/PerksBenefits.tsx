'use client';

import { motion } from 'framer-motion';
import { Stethoscope, Clock, PartyPopper, CalendarDays, TrendingUp, MonitorPlay } from 'lucide-react';

const PERKS = [
  {
    icon: <Stethoscope className="w-8 h-8 text-[#FFBF00]" />,
    title: 'Health Benefits',
    description: 'Comprehensive medical insurance and health checkups for you and your family to ensure peace of mind.',
  },
  {
    icon: <CalendarDays className="w-8 h-8 text-[#FFBF00]" />,
    title: 'Generous Leaves',
    description: 'A well-balanced leave policy including Casual Leaves, Sick Leaves, Paid Time Off, and all major festival holidays.',
  },
  {
    icon: <Clock className="w-8 h-8 text-[#FFBF00]" />,
    title: 'Flexible Timings',
    description: 'We prioritize output over strict hours. Enjoy flexible shifts and a supportive environment to balance work and life.',
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-[#FFBF00]" />,
    title: 'Career Growth',
    description: 'Regular performance appraisals, skill development programs, and clear pathways to senior and leadership roles.',
  },
  {
    icon: <MonitorPlay className="w-8 h-8 text-[#FFBF00]" />,
    title: 'Modern Workspace',
    description: 'Work from our state-of-the-art office in Surat with the latest hardware, dual monitors, and high-speed connectivity.',
  },
  {
    icon: <PartyPopper className="w-8 h-8 text-[#FFBF00]" />,
    title: 'Fun & Culture',
    description: 'Frequent team outings, festive celebrations, Friday fun activities, and an always-stocked pantry.',
  },
];

export default function PerksBenefits() {
  return (
    <section className="w-full bg-slate-900 text-white py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#0E5E64]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-[#FFBF00]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6"
          >
            <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.3em] text-white/70">
              Why Join Us
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight font-[Zain] mb-6 leading-none"
          >
            More Than Just A Workplace.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light"
          >
            We believe in nurturing talent and providing an environment where you can grow professionally while maintaining a healthy work-life balance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PERKS.map((perk, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
            >
              <div className="mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10">
                {perk.icon}
              </div>
              <h4 className="text-xl font-bold mb-3 text-white">
                {perk.title}
              </h4>
              <p className="text-white/60 leading-relaxed font-light">
                {perk.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
