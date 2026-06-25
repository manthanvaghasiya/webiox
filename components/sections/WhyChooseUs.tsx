'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Sparkles, ArrowRight, Users } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Typewriter } from 'react-simple-typewriter';
import * as THREE from 'three';

const ACCORDION_DATA = [
  {
    id: 'fast-development',
    title: 'Fast Development',
    subtitle: 'Speed & Efficiency',
    typewriterWords: ['Speed & Efficiency', 'React, Next.js, Node.js', 'Rapid Iteration'],
    description: 'We use modern stacks like React, Next.js, and Node.js to deliver high-quality products faster than traditional agencies.',
    icon: Zap,
    color: 'from-[#FFBF00]/30 via-orange-500/10 to-transparent',
    accent: 'text-[#FFBF00]',
    border: 'border-[#FFBF00]/40',
    number: '01'
  },
  {
    id: 'modern-technologies',
    title: 'Modern Technologies',
    subtitle: 'Next-Gen Stack',
    typewriterWords: ['Next-Gen Stack', 'Future-Proof Tech', 'Robust Architecture'],
    description: 'Built on scalable, future-proof tech stacks that ensure your product remains robust as your user base grows.',
    icon: Sparkles,
    color: 'from-blue-500/30 via-indigo-500/10 to-transparent',
    accent: 'text-blue-400',
    border: 'border-blue-500/40',
    number: '02'
  },
  {
    id: 'secure-scalable',
    title: 'Secure & Scalable',
    subtitle: 'Enterprise Ready',
    typewriterWords: ['Enterprise Ready', 'Top-Tier Security', 'Cloud Architectures'],
    description: 'Enterprise-grade security and scalable cloud architectures that can handle high traffic volumes and complex data.',
    icon: ShieldCheck,
    color: 'from-emerald-500/30 via-teal-500/10 to-transparent',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/40',
    number: '03'
  },
  {
    id: 'client-focused',
    title: 'Client-Focused Approach',
    subtitle: 'Your Vision First',
    typewriterWords: ['Your Vision First', 'Transparent Communication', 'Collaborative Process'],
    description: 'We prioritize transparent communication, regular updates, and a collaborative process to ensure we meet your specific goals.',
    icon: Users,
    color: 'from-purple-500/30 via-pink-500/10 to-transparent',
    accent: 'text-purple-400',
    border: 'border-purple-500/40',
    number: '04'
  }
];

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.03;
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.018} 
        color="#ffffff" 
        transparent 
        opacity={0.4} 
        sizeAttenuation 
        depthWrite={false} 
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const visceralSpring = {
  type: "spring" as const,
  stiffness: 110,
  damping: 22,
  mass: 1.1,
  restDelta: 0.001
};

export default function WhyChooseUs() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="why-choose-us" className="bg-brand-blue text-white">
      {/* Mobile Layout */}
      <div className="flex flex-col lg:hidden px-6 py-24 gap-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span aria-hidden className="h-[2px] w-8 rounded-full bg-[#FFBF00]/70" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FFBF00]/80">
              The Webiox Advantage
            </span>
          </div>
          <h2 className="text-[3rem] font-medium leading-[1.05] tracking-tight text-white mb-6">
            Why Top Companies <br />
            <span className="bg-gradient-to-r from-[#FFBF00] to-yellow-300 bg-clip-text text-transparent">Choose Webiox</span>
          </h2>
          <p className="text-base text-white/60 leading-relaxed font-light mb-8">
            We don't just build websites; we build scalable digital businesses. Our engineering-first approach paired with premium design ensures that your digital presence acts as a powerful growth engine.
          </p>
          <div className="flex gap-8 border-t border-white/10 pt-8">
             <div className="flex flex-col gap-2">
               <span className="text-4xl font-bold tracking-tight text-white">99<span className="text-[#FFBF00]">%</span></span>
               <span className="text-[10px] font-mono tracking-widest uppercase text-white/40">Client Satisfaction</span>
             </div>
             <div className="flex flex-col gap-2">
               <span className="text-4xl font-bold tracking-tight text-white">5<span className="text-[#FFBF00]">+</span></span>
               <span className="text-[10px] font-mono tracking-widest uppercase text-white/40">Projects Delivered</span>
             </div>
          </div>
        </div>

        {ACCORDION_DATA.map((item) => (
          <div key={item.id} className="relative overflow-hidden rounded-[20px] border border-white/10 bg-white/5 p-6 backdrop-blur-md group hover:border-white/20 transition-all duration-500">
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-40 mix-blend-screen transition-opacity duration-500 group-hover:opacity-70`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  {item.number}
                </span>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border ${item.border} bg-white/5 shadow-inner`}>
                  <item.icon className={`h-5 w-5 ${item.accent}`} />
                </div>
              </div>
              <h3 className="text-2xl font-medium tracking-tight text-white mb-2">{item.title}</h3>
              <p className={`text-[11px] font-mono tracking-widest uppercase mb-4 ${item.accent}`}>{item.subtitle}</p>
              <p className="text-[15px] leading-relaxed text-white/60 mb-6">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout - 60/40 Split */}
      <div className="hidden lg:flex max-w-[1400px] mx-auto px-6 lg:px-8 py-32 gap-12 lg:gap-16 items-center">
         
        {/* LEFT SIDE (60%): Immersive Interactive Accordion Container */}
        <div className="w-[60%] h-[480px] xl:h-[550px] flex flex-row overflow-hidden group rounded-[32px] border border-white/10 shadow-2xl bg-primary-950">
          {ACCORDION_DATA.map((item, index) => {
            const isActive = hoveredIndex === index;
            
            return (
              <motion.div
                key={item.id}
                onMouseEnter={() => setHoveredIndex(index)}
                initial={false}
                animate={{ 
                  flex: isActive ? 5.5 : 1,
                }}
                transition={visceralSpring}
                className="relative h-full flex items-end overflow-hidden border-r border-white/5 last:border-none cursor-pointer bg-primary-950"
              >
                {/* WebGL Canvas Background */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 z-0 pointer-events-none"
                    >
                      <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
                        <Particles />
                      </Canvas>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Gradient Ambient Glow */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className={`absolute inset-0 bg-gradient-to-t ${item.color} pointer-events-none mix-blend-screen z-0`}
                    />
                  )}
                </AnimatePresence>

                {/* Massive Watermark Icon */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
                      animate={{ opacity: 0.04, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.6, rotate: 25 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="absolute -right-20 -bottom-20 pointer-events-none z-0"
                    >
                      <item.icon className="w-[450px] h-[450px] text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Inactive Vertical Title */}
                <motion.div 
                  animate={{ opacity: isActive ? 0 : 0.8 }}
                  className="absolute inset-0 flex flex-col items-center justify-between py-10 pointer-events-none z-30"
                >
                   <span className="font-mono text-sm font-bold text-white/60">{item.number}</span>
                   <h2 
                     className="text-xl xl:text-2xl font-bold uppercase tracking-[0.2em] text-white"
                     style={{ 
                       writingMode: 'vertical-rl', 
                       transform: 'rotate(180deg)'
                     }}
                   >
                     {item.title}
                   </h2>
                </motion.div>

                {/* Active Content */}
                <motion.div 
                  initial={false}
                  animate={{ 
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : -40,
                    filter: isActive ? 'blur(0px)' : 'blur(12px)'
                  }}
                  transition={visceralSpring}
                  className="relative z-20 w-[400px] xl:w-[480px] max-w-none p-10 xl:p-12 flex flex-col justify-end h-full pointer-events-none"
                >
                   <div className="max-w-md pointer-events-auto">
                      <motion.div 
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-full border ${item.border} bg-brand-blue/50 mb-6 shadow-2xl backdrop-blur-lg`}
                      >
                        <item.icon className={`w-6 h-6 ${item.accent}`} />
                      </motion.div>
                      
                      <h3 className="text-[2.2rem] xl:text-[2.8rem] font-medium leading-none mb-3 text-white tracking-tight">
                        {item.title}.
                      </h3>
                      
                      {/* Elite Kinetic Typography */}
                      <div className={`text-[11px] xl:text-xs font-mono tracking-[0.15em] uppercase mb-6 ${item.accent} h-5`}>
                        {mounted && isActive ? (
                          <Typewriter
                            words={item.typewriterWords}
                            loop={1}
                            cursor
                            cursorStyle="|"
                            typeSpeed={40}
                            deleteSpeed={20}
                            delaySpeed={2000}
                          />
                        ) : (
                          item.subtitle
                        )}
                      </div>

                      <p className="text-[15px] xl:text-[17px] text-white/70 leading-relaxed mb-8 font-light">
                        {item.description}
                      </p>

                      <button className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors group/btn">
                        Explore Advantage
                        <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 group-hover/btn:border-white/80 group-hover/btn:bg-white/10 transition-all duration-300">
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </button>
                   </div>
                </motion.div>

                {/* Overlay shadow for unselected */}
                <motion.div
                  animate={{ opacity: isActive ? 0 : 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-primary-950 pointer-events-none z-10"
                />
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT SIDE (40%): Header & Stats */}
        <div className="w-[40%] flex flex-col gap-10">
           <div className="max-w-xl">
             <div className="flex items-center gap-3 mb-6">
               <span aria-hidden className="h-[2px] w-8 rounded-full bg-[#FFBF00]/70" />
               <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FFBF00]/80">
                 The Webiox Advantage
               </span>
             </div>
             <h2 className="text-4xl xl:text-5xl font-medium leading-[1.05] tracking-tight text-white mb-6">
               Why Top Companies <br className="hidden lg:block"/>
               <span className="bg-gradient-to-r from-[#FFBF00] to-yellow-300 bg-clip-text text-transparent">Choose Webiox</span>
             </h2>
             <p className="text-lg text-white/60 leading-relaxed font-light">
               We don't just build websites; we build scalable digital businesses. Our engineering-first approach paired with premium design ensures that your digital presence acts as a powerful growth engine.
             </p>
           </div>

           <div className="flex gap-12 border-t border-white/10 pt-8">
              <div className="flex flex-col gap-2">
                <span className="text-[3.5rem] font-bold tracking-tight text-white leading-none">99<span className="text-[#FFBF00]">%</span></span>
                <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">Client Satisfaction</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[3.5rem] font-bold tracking-tight text-white leading-none">5<span className="text-[#FFBF00]">+</span></span>
                <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">Projects Delivered</span>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
