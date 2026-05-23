'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown, MapPin, Clock, Briefcase } from 'lucide-react';
import Link from 'next/link';

const POSITIONS = [
  {
    id: 1,
    title: 'Frontend Developer (React.js)',
    department: 'Engineering',
    location: 'Surat, Gujarat',
    type: 'Full-time',
    experience: '1 - 3 Years',
    description: 'We are looking for a passionate Frontend Developer skilled in React.js, Next.js, and Tailwind CSS. You will be responsible for converting complex Figma designs into responsive, high-performance web applications and ensuring cross-browser compatibility.',
  },
  {
    id: 2,
    title: 'Backend Developer (Node.js)',
    department: 'Engineering',
    location: 'Surat, Gujarat',
    type: 'Full-time',
    experience: '2 - 4 Years',
    description: 'Join our backend team to build scalable REST APIs and microservices. Strong experience with Node.js, Express, MongoDB/PostgreSQL, and API integrations is required. Familiarity with AWS deployment is a big plus.',
  },
  {
    id: 3,
    title: 'Business Development Executive (BDE)',
    department: 'Sales',
    location: 'Surat, Gujarat',
    type: 'Full-time',
    experience: '1 - 3 Years',
    description: 'We are seeking an energetic BDE to drive international sales. You must have excellent English communication skills, experience bidding on platforms like Upwork/Freelancer, and the ability to close inbound and outbound leads effectively.',
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Surat / Remote',
    type: 'Full-time',
    experience: '2+ Years',
    description: 'Looking for a creative UI/UX designer who can craft modern, user-centric web and mobile interfaces. Proficiency in Figma, wireframing, prototyping, and a strong portfolio demonstrating modern design trends is mandatory.',
  },
];

export default function OpenPositions() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full bg-white py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[#0E5E64] font-bold tracking-widest uppercase text-sm mb-4">
            Join The Team
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight font-[Zain] mb-6">
            Current Openings
          </h3>
          <p className="text-lg text-slate-600 font-light">
            Don't see a perfect fit? Send your resume to <a href="mailto:careers@webiox.tech" className="text-[#0E5E64] font-medium hover:underline">careers@webiox.tech</a>
          </p>
        </div>

        <div className="space-y-4">
          {POSITIONS.map((pos) => (
            <motion.div
              key={pos.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              className={`border rounded-2xl transition-all duration-300 ${
                openId === pos.id 
                  ? 'border-[#0E5E64]/30 shadow-lg bg-slate-50' 
                  : 'border-slate-200 hover:border-[#0E5E64]/30 hover:shadow-md bg-white'
              }`}
            >
              <button
                onClick={() => toggle(pos.id)}
                className="w-full text-left px-6 py-6 md:px-8 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 focus:outline-none"
              >
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">
                    {pos.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                      {pos.department}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" /> {pos.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {pos.type}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 self-end md:self-auto">
                  <div className={`p-2 rounded-full transition-colors duration-300 ${openId === pos.id ? 'bg-[#0E5E64] text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openId === pos.id ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {openId === pos.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-8 md:px-8 md:pb-8 pt-2 border-t border-slate-200/60 mt-2">
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {pos.description}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white p-6 rounded-xl border border-slate-200/50">
                        <div className="flex items-center gap-2 text-slate-700 font-semibold">
                          <Briefcase className="w-5 h-5 text-[#0E5E64]" />
                          Experience: {pos.experience}
                          <span className="text-sm font-normal text-slate-400 ml-2 border-l border-slate-200 pl-2">Salary: Based on Interview</span>
                        </div>
                        
                        <Link 
                          href={`/contact?role=${encodeURIComponent(pos.title)}`}
                          className="group inline-flex items-center justify-center gap-2 bg-[#0E5E64] text-white px-6 py-3 rounded-full font-semibold transition-all hover:bg-[#11737a] hover:shadow-lg w-full sm:w-auto"
                        >
                          Apply Now
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
