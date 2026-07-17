'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { submitInquiry } from '@/app/actions/contact';
import { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Web Development',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await submitInquiry(formState);
      if (response.success) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', phone: '', company: '', service: 'Web Development', message: '' });
      } else {
        setError(response.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const inputClass = "w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:border-[#0E5E64] focus:ring-2 focus:ring-[#0E5E64]/20 outline-none transition-all placeholder:text-slate-400";
  const labelClass = "text-sm font-semibold text-slate-700 mb-2 block";

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] selection:bg-[#0E5E64]/20 selection:text-[#0E5E64] font-sans">
      
      {/* Hero Section */}
      <section className="relative w-full bg-[#052123] pt-32 pb-44 px-6 lg:px-12 text-center overflow-hidden">
        {/* Animated Ambient Background Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[35rem] h-[35rem] bg-[#0E5E64] rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" 
        />
        
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] bg-[#FFBF00] rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" 
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(249,250,251,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(249,250,251,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_30%,#000_10%,transparent_80%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center mt-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.1)] mb-8 hover:bg-white/10 transition-colors cursor-default"
          >
            <Sparkles className="w-4 h-4 text-[#FFBF00]" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-white uppercase">
              Get In Touch
            </span>
          </motion.div>
          
          <div className="flex flex-col items-center justify-center leading-[0.9] tracking-tighter uppercase font-[Zain] mb-6">
            <motion.div
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
               className="overflow-hidden pb-2"
            >
              <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 drop-shadow-sm">
                Let's discuss your
              </h1>
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
               className="overflow-hidden mt-[-1rem] sm:mt-[-1.5rem] md:mt-[-2rem] pb-6"
            >
              <h1 className="text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[9rem] font-black flex relative group">
                <span className="absolute inset-0 text-[#FFBF00] blur-[30px] opacity-40 group-hover:opacity-70 transition-opacity duration-700">Next Project.</span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#FFBF00] via-[#FFD040] to-[#FFBF00] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                  Next Project.
                </span>
              </h1>
            </motion.div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed font-[IBM_Plex_Sans]"
          >
            We help businesses build <span className="text-white font-medium border-b border-[#FFBF00]/40 pb-0.5">scalable, high-performance</span> digital products. Fill out the form below and our team will get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Info Cards - Floating over the hero section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20 -mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="w-14 h-14 bg-teal-50 text-[#0E5E64] rounded-full flex items-center justify-center mb-6">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
            <p className="text-slate-600 mb-4">For general inquiries</p>
            <a href="mailto:manthanvaghasiya60@gmail.com" className="text-[#0E5E64] font-medium hover:underline">
              manthanvaghasiya60@gmail.com
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="w-14 h-14 bg-teal-50 text-[#0E5E64] rounded-full flex items-center justify-center mb-6">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Call Us</h3>
            <p className="text-slate-600 mb-4">Mon-Fri from 9am to 6pm IST</p>
            <p className="text-[#0E5E64] font-medium">
              +91 9664736245
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="w-14 h-14 bg-teal-50 text-[#0E5E64] rounded-full flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Visit Us</h3>
            <p className="text-slate-600 mb-4">Our Headquarters</p>
            <p className="text-[#0E5E64] font-medium leading-relaxed">
              The Palladium Mall, <br /> Yogi Chowk, Surat.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-24">
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12 lg:p-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Send us a message</h2>
            <p className="text-slate-600">Please fill out the form below and provide as much detail as possible.</p>
          </div>

          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Message Sent Successfully!</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Thank you for reaching out to us. A member of our team will review your inquiry and contact you shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-8 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-[#0E5E64] transition-colors shadow-lg"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-rose-50 text-rose-600 p-4 rounded-xl font-medium text-sm text-center border border-rose-100">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={labelClass}>Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="company" className={labelClass}>Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Company Inc."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className={labelClass}>Service Required</label>
                <select
                  id="service"
                  name="service"
                  value={formState.service}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center]`}
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>Project Details *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formState.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder="Please describe your project, goals, and timeline..."
                />
              </div>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 bg-[#0E5E64] text-white font-bold text-lg rounded-xl hover:bg-[#0b4a4f] shadow-lg shadow-[#0E5E64]/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                >
                  {isSubmitting ? 'Sending Request...' : 'Send Message'}
                  {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                </motion.button>
              </div>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
