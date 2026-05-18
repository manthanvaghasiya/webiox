'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const premiumEase = "easeOut";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Web Development',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', company: '', projectType: 'Web Development', budget: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: premiumEase }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
              Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0E5E64] to-teal-400">extraordinary</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Whether you have a clear vision or need help defining it, our team is ready to turn your ideas into functional, beautifully designed digital products.
            </p>
          </motion.div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mt-20">

          {/* Contact Information (Left Column - Span 2) */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: premiumEase }}
            >
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Fill out the form and our team will get back to you within 24 hours. We'll start with a free consultation to understand your needs.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0E5E64]/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-[#0E5E64]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-1">Email Us</h4>
                      <p className="text-slate-600">manthanvaghasiya60@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0E5E64]/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-[#0E5E64]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-1">Call Us</h4>
                      <p className="text-slate-600">+91 9664736245</p>
                      <p className="text-slate-500 text-sm mt-1">Mon-Fri from 9am to 6pm IST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0E5E64]/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-[#0E5E64]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-1">Visit Us</h4>
                      <p className="text-slate-600 leading-relaxed">
                        C-144, Section-3, Gajanand<br />
                        Society, Yogichowk, Nana <br />
                        Varachha, Surat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Display */}
              <div className="mt-12 rounded-2xl overflow-hidden shadow-sm border border-slate-200 aspect-video relative group">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                  alt="Map Location"
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-[56%] left-[69%] transform -translate-x-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-[#0E5E64] rounded-full border-4 border-white shadow-lg shadow-[#0E5E64]/50 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form (Right Column - Span 3) */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: premiumEase, delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 sm:p-10 lg:p-12 relative overflow-hidden">
                {/* Decorative gradients */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0E5E64]/5 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/5 rounded-full blur-[80px]" />

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center py-20 relative z-10"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Request Received!</h3>
                    <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                      Thank you for reaching out. A member of our team will contact you shortly to schedule your discovery call.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 border-2 border-slate-900 text-slate-900 font-semibold rounded-full hover:bg-slate-900 hover:text-white transition-all"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-900">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0E5E64] focus:border-[#0E5E64] transition-all outline-none bg-slate-50/50 focus:bg-white"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-900">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0E5E64] focus:border-[#0E5E64] transition-all outline-none bg-slate-50/50 focus:bg-white"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium text-slate-900">Company Name</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0E5E64] focus:border-[#0E5E64] transition-all outline-none bg-slate-50/50 focus:bg-white"
                        placeholder="Your Company Inc."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="projectType" className="text-sm font-medium text-slate-900">Project Type</label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formState.projectType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0E5E64] focus:border-[#0E5E64] transition-all outline-none bg-slate-50/50 focus:bg-white cursor-pointer"
                        >
                          <option value="Web Development">Web Development</option>
                          <option value="SaaS Application">SaaS Application</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="E-Commerce">E-Commerce</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="budget" className="text-sm font-medium text-slate-900">Estimated Budget</label>
                        <select
                          id="budget"
                          name="budget"
                          value={formState.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0E5E64] focus:border-[#0E5E64] transition-all outline-none bg-slate-50/50 focus:bg-white cursor-pointer"
                        >
                          <option value="">Select a range...</option>
                          <option value="10k-25k">$10k - $25k</option>
                          <option value="25k-50k">$25k - $50k</option>
                          <option value="50k-100k">$50k - $100k</option>
                          <option value="100k+">$100k+</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-slate-900">Project Details</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0E5E64] focus:border-[#0E5E64] transition-all outline-none bg-slate-50/50 focus:bg-white resize-none"
                        placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-80"
                    >
                      {isSubmitting ? 'Sending Request...' : 'Send Project Request'}
                    </motion.button>

                    <p className="text-xs text-center text-slate-500 mt-4">
                      By submitting this form, you agree to our <a href="#" className="underline hover:text-[#0E5E64]">Privacy Policy</a>.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
