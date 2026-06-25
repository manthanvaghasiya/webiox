'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code2 } from 'lucide-react';

const premiumEase = "easeOut";

export default function ServiceCTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#F9FAFB] border-t border-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,rgba(14,94,100,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="p-8 sm:p-12 md:p-16 rounded-[2rem] sm:rounded-[3rem] bg-slate-900 text-[#F9FAFB] shadow-2xl relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[50%] -right-[50%] w-full h-full bg-gradient-to-br from-[#0E5E64] to-transparent opacity-30 blur-[100px] pointer-events-none"
          />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 relative z-10">
            Ready to construct your future?
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-10 font-light max-w-2xl mx-auto relative z-10">
            Bypass technical debt. Partner with engineering experts who understand business economics and rapid scalability.
          </p>

          <Link href="/contact" className="relative z-10 inline-block w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-4 sm:px-10 sm:py-5 bg-[#FFBF00] text-slate-900 font-bold text-base sm:text-lg rounded-full shadow-[0_0_40px_rgba(255,184,0,0.3)] hover:shadow-[0_0_60px_rgba(255,184,0,0.5)] transition-shadow flex justify-center items-center gap-2 sm:gap-3 mx-auto"
            >
              Initiate Project Architecture <Code2 className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
