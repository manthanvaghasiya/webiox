'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';
import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-[#F9FAFB] overflow-hidden z-0">

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[#0E5E64]/5 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[#FFBF00]/10 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#0E5E64]/60 rounded-full" />
            <span className="text-[#0E5E64]/80 font-semibold tracking-[0.2em] uppercase text-[11px]">
              Client Success
            </span>
            <div className="w-8 h-[2px] bg-[#0E5E64]/60 rounded-full" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            What Our Partners Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the visionary companies we've helped grow.
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="relative group h-full flex flex-col bg-[#F9FAFB]/60 backdrop-blur-xl p-8 rounded-[2rem] border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,37,131,0.08)] transition-shadow duration-500 overflow-hidden bg-white"
            >
              {/* Decorative Gradient Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0E5E64]/0 via-transparent to-[#FFBF00]/0 group-hover:from-[#0E5E64]/5 group-hover:to-[#FFBF00]/10 transition-colors duration-500 pointer-events-none" />

              {/* Quote Icon */}
              <motion.div
                className="absolute top-6 right-6"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <Quote className="w-10 h-10 text-gray-200 group-hover:text-[#FFBF00]/40 transition-colors duration-300" />
              </motion.div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (index * 0.1) + (i * 0.05) }}
                  >
                    <Star className="w-5 h-5 fill-[#FFBF00] text-[#FFBF00] drop-shadow-sm" />
                  </motion.div>
                ))}
              </div>

              {/* Testimonial Body */}
              <p className="text-gray-700 leading-relaxed mb-8 flex-grow font-medium relative z-10">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 mt-auto border-t border-gray-100 pt-6 relative z-10">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover object-center bg-white p-1 border-2 border-slate-100 shadow-sm relative z-10"
                  />
                  <div className="absolute inset-0 rounded-full bg-[#FFBF00]/10 scale-105 blur-md group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm font-medium text-[#0E5E64]">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
