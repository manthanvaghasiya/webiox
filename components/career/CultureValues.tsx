'use client';

import { motion } from 'framer-motion';
import { Target, Heart, Zap, Cpu } from 'lucide-react';

const VALUES = [
  {
    icon: <Target className="w-6 h-6 text-[#0E5E64]" />,
    title: 'Relentless Craft',
    description: 'We obsess over the details. Good enough is never good enough. We build digital products that are meticulously engineered and stunningly designed.',
    className: 'md:col-span-2 bg-white',
  },
  {
    icon: <Zap className="w-6 h-6 text-[#FFBF00]" />,
    title: 'Pioneering Speed',
    description: 'We move fast and break barriers. Agile methodologies and modern stacks mean we ship high-quality code at unparalleled speed.',
    className: 'bg-[#0E5E64] text-white',
  },
  {
    icon: <Heart className="w-6 h-6 text-rose-500" />,
    title: 'Radical Candor',
    description: 'Transparency is our default. We communicate openly with each other and our clients to ensure complete alignment and trust.',
    className: 'bg-white',
  },
  {
    icon: <Cpu className="w-6 h-6 text-[#0E5E64]" />,
    title: 'Future Focused',
    description: 'We don’t just use current tech; we anticipate the next wave. Embracing AI, edge computing, and scalable architectures.',
    className: 'md:col-span-2 bg-white',
  },
];

export default function CultureValues() {
  return (
    <section className="w-full bg-[#F9FAFB] py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 justify-between items-start mb-16 md:mb-24">
          <div className="max-w-2xl">
            <h2 className="text-[#0E5E64] font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#0E5E64]" />
              Our DNA
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight font-[Zain] leading-[0.9]">
              Built on Craft & <br /> True Innovation.
            </h3>
          </div>
          <p className="text-lg text-slate-600 max-w-md font-light">
            Working at Webiox means surrounding yourself with high performers who care deeply about what they create. We believe in autonomy, mastery, and purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`p-8 md:p-12 rounded-[2rem] border border-slate-200/50 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between group ${value.className}`}
            >
              <div className="mb-8 p-4 rounded-2xl bg-slate-50 w-fit group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <div>
                <h4 className={`text-2xl font-bold mb-4 ${value.className.includes('bg-[#0E5E64]') ? 'text-white' : 'text-slate-900'}`}>
                  {value.title}
                </h4>
                <p className={`text-lg leading-relaxed ${value.className.includes('bg-[#0E5E64]') ? 'text-white/80' : 'text-slate-600'}`}>
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
