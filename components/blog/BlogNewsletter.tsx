'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Mail } from 'lucide-react';
import { newsletterVariants, premiumEase } from '@/lib/motion/blog';

export default function BlogNewsletter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section
      ref={ref}
      className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-32"
    >
      <motion.div
        variants={newsletterVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative rounded-[2.5rem] overflow-hidden"
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-[2.5rem] p-[1px] bg-gradient-to-br from-[#0E5E64] via-teal-400 to-[#FFBF00]">
          <div className="w-full h-full rounded-[2.5rem] bg-slate-900" />
        </div>

        <div className="relative p-10 md:p-16">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#0E5E64] opacity-15 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-teal-400 opacity-10 blur-[80px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#FFBF00] opacity-[0.03] blur-[100px] pointer-events-none" />

          {/* Floating shapes */}
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 right-12 w-16 h-16 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hidden md:block"
          />
          <motion.div
            animate={{ y: [10, -10, 10], rotate: [0, -3, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute bottom-12 right-24 w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] hidden md:block"
          />

          <div className="relative z-10 text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{
                delay: 0.3,
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0E5E64] to-teal-500 mb-8 shadow-lg shadow-[#0E5E64]/30"
            >
              <Sparkles className="w-7 h-7 text-white" />
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Join the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-[#0E5E64] to-[#FFBF00]">
                Inner Circle
              </span>
            </h2>

            <p className="text-white/50 mb-3 max-w-xl mx-auto text-base md:text-lg font-light">
              Exclusive architectural deep dives and engineering masterclasses
              delivered to your inbox. Zero fluff, pure value.
            </p>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="flex -space-x-2">
                {['MV', 'AK', 'RS', 'PD'].map((initials, i) => (
                  <div
                    key={initials}
                    className="w-7 h-7 rounded-full border-2 border-slate-900 flex items-center justify-center text-[8px] font-bold text-white"
                    style={{
                      background: ['#0E5E64', '#6366f1', '#EC4899', '#F59E0B'][i],
                      zIndex: 4 - i,
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span className="text-xs text-white/40">
                Join <span className="text-white/70 font-semibold">500+</span>{' '}
                engineers
              </span>
            </div>

            {/* Form */}
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/[0.06] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400/30 transition-all text-sm backdrop-blur-sm"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FFBF00] to-[#FFD54F] text-slate-900 font-bold rounded-2xl hover:shadow-[0_8px_30px_rgba(255,191,0,0.3)] transition-shadow duration-300 text-sm"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: premiumEase }}
                className="flex items-center justify-center gap-3 py-4"
              >
                <CheckCircle2 className="w-6 h-6 text-teal-400" />
                <span className="text-white font-semibold">
                  Welcome to the inner circle!
                </span>
              </motion.div>
            )}

            {/* Fine print */}
            <p className="text-[11px] text-white/20 mt-6">
              Unsubscribe anytime. We respect your inbox.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
