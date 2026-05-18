'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0E5E64]/20 blur-[80px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-teal-400/20 blur-[80px] rounded-full mix-blend-screen" />

            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-bold text-[#F9FAFB] mb-6 tracking-tight leading-tight">
                Ready to Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-[#0E5E64]">Amazing?</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                Let's discuss how Webiox can solve your technical challenges and accelerate your business growth. We're currently accepting new projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0E5E64] text-[#F9FAFB] font-semibold hover:bg-[#0E5E64]/90 transition-all shadow-lg hover:shadow-[#0E5E64]/30"
                  >
                    Start Your Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-gray-600 text-[#F9FAFB] font-semibold hover:border-[#0E5E64] hover:bg-[#0E5E64]/5 transition-all"
                  >
                    Explore Services
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
