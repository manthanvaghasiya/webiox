'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Smartphone, Gamepad2, Cloud, Cpu, Sparkles, Layers, Radio } from 'lucide-react';

const AiInnovationFoundry = () => {
   const containerRef = useRef<HTMLDivElement>(null);
   const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
   const [isHovered, setIsHovered] = useState(false);

   // Interactive 3D Tilt Logic
   const handleMouseMove = (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x, y });
   };

   // Smooth springs for premium fluid motion when mouse stops or leaves
   const springX = useSpring(isHovered ? mousePos.x : 0.5, { stiffness: 100, damping: 30 });
   const springY = useSpring(isHovered ? mousePos.y : 0.5, { stiffness: 100, damping: 30 });

   // Subtle perspective tilt (only +-5 degrees so it doesn't break the isometric illusion)
   const rotateXRaw = useTransform(springY, [0, 1], [65, 55]);
   const rotateZRaw = useTransform(springX, [0, 1], [-55, -35]);

   const outputIcons = [Smartphone, Gamepad2, Cloud];

   return (
      <div 
         ref={containerRef}
         onMouseMove={handleMouseMove}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
         className="relative w-full aspect-square lg:aspect-[4/5] bg-gradient-to-br from-slate-50 to-slate-100 rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-white flex items-center justify-center isolate cursor-crosshair"
         style={{ perspective: "1500px" }}
      >
         {/* Sweeping Animated Glare overlaying the whole card */}
         <motion.div 
            className="absolute inset-0 z-50 pointer-events-none opacity-40 mix-blend-overlay"
            animate={{ backgroundPosition: ["0% 0%", "200% 200%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ backgroundImage: "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.7) 60%, transparent 80%)", backgroundSize: "200% 200%" }}
         />

         {/* Deep Ambient Background Glows */}
         <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
            <div className="absolute top-[10%] left-[10%] w-[30rem] h-[30rem] bg-[#0E5E64]/10 rounded-full blur-[100px] mix-blend-multiply" />
            <div className="absolute bottom-[10%] right-[10%] w-[30rem] h-[30rem] bg-[#FFBF00]/10 rounded-full blur-[100px] mix-blend-multiply" />
         </div>

         {/* Dynamic 3D Scene Wrapper - scales down smoothly on mobile */}
         <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] scale-[0.65] sm:scale-90 md:scale-100 lg:scale-[1.10]">
            
            {/* Interactive Tilt Isometric Plane Base */}
            <motion.div 
               className="absolute inset-0"
               style={{ 
                  rotateX: rotateXRaw, 
                  rotateZ: rotateZRaw, 
                  transformStyle: "preserve-3d" 
               }}
            >
               {/* Extremely detailed Floor Grid with Glowing Intersections */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.04)_2px,transparent_2px)] bg-[size:40px_40px] shadow-[inset_0_0_100px_rgba(255,255,255,0.8)] backdrop-blur-sm" style={{ transform: "translateZ(-1px)" }}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(248,250,252,0.9)_80%)]" />
               </div>

               {/* =========================================================
                   INPUT SECTOR (Glowing Data Lines & Packets)
                   ========================================================= */}
               
               {/* Track 1: From +x (bottom right) to center */}
               <div className="absolute top-1/2 left-1/2 w-48 h-[6px] bg-[#0E5E64]/10 rounded-full -mt-0.5 ml-16 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-white/40">
                  <motion.div 
                     className="h-full w-20 bg-gradient-to-r from-transparent via-[#0E5E64] to-white rounded-full shadow-[0_0_20px_rgba(14,94,100,1)]"
                     animate={{ x: [192, -80] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
               </div>
               
               {/* Track 2: From +y (bottom left) to center */}
               <div className="absolute top-1/2 left-1/2 w-[6px] h-48 bg-[#FFBF00]/10 rounded-full mt-16 -ml-[3px] overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-white/40">
                  <motion.div 
                     className="w-full h-20 bg-gradient-to-b from-transparent via-[#FFBF00] to-white rounded-full shadow-[0_0_20px_rgba(255,191,0,1)]"
                     animate={{ y: [192, -80] }}
                     transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.5 }}
                  />
               </div>

               {/* Track 3: Data pulses matching the track routing */}
               <div className="absolute top-1/2 left-1/2 w-[4px] h-[4px] rounded-full bg-white shadow-[0_0_20px_4px_rgba(14,94,100,1)] ml-16" style={{ transform: "translateZ(8px)" }}>
                 <motion.div animate={{ x: [192, -30] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-full h-full bg-white rounded-full" />
               </div>
               <div className="absolute top-1/2 left-1/2 w-[4px] h-[4px] rounded-full bg-white shadow-[0_0_20px_4px_rgba(255,191,0,1)] mt-16" style={{ transform: "translateZ(8px)" }}>
                 <motion.div animate={{ y: [192, -30] }} transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.5 }} className="w-full h-full bg-white rounded-full" />
               </div>

               {/* =========================================================
                   OUTPUT SECTOR (Moving Conveyor Belt & 3D Icons)
                   ========================================================= */}
               
               {/* Conveyor Belt Track Container */}
               <div className="absolute top-1/2 left-1/2 w-48 h-12 -mt-6 -ml-48 bg-gradient-to-r from-slate-200 to-slate-100 border-y-[4px] border-slate-300 shadow-[inset_0_4px_10px_rgba(0,0,0,0.05),_0_10px_20px_rgba(0,0,0,0.05)] flex items-center overflow-visible rounded-l-xl" style={{ transform: "translateZ(0px)" }}>
                  
                  {/* Conveyor Belt Animated Striping (gives impression of belt moving) */}
                  <motion.div 
                     className="absolute inset-0 opacity-20"
                     animate={{ x: [-20, 0] }}
                     transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                     style={{
                        backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 10px, #000 10px, #000 20px)"
                     }}
                  />
                  
                  {/* Moving Packaged 3D Products */}
                  {outputIcons.map((Icon, i) => (
                     <motion.div
                        key={i}
                        className="absolute right-0 w-12 h-12 flex items-center justify-center isolate"
                        style={{ transformStyle: "preserve-3d" }}
                        initial={{ x: 0, opacity: 0, scale: 0.5 }}
                        animate={{ 
                           x: [0, -180], 
                           opacity: [0, 1, 1, 0.2],
                           scale: [0.5, 1, 1, 0.4] 
                        }}
                        transition={{ 
                           duration: 4.5, 
                           repeat: Infinity, 
                           ease: "linear",
                           delay: i * 1.5 // Space 3 icons perfectly apart
                        }}
                     >
                        {/* Bobbing Box Animation (Standing Up) */}
                        <motion.div 
                           className="bg-white/90 backdrop-blur-xl shadow-[0_30px_50px_rgba(14,94,100,0.2)] rounded-[1.2rem] border-2 border-white/80 flex items-center justify-center p-3 relative"
                           style={{ transform: "rotateZ(45deg) rotateX(-60deg) translateZ(10px)", transformStyle: "preserve-3d" }}
                           animate={{ translateZ: [10, 20, 10] }}
                           transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
                        >
                           {/* Hovering Icon Inside Glass Box */}
                           <Icon className="w-6 h-6 text-[#0E5E64]" strokeWidth={2.5} />
                           {/* Small shadow underneath icon inside the box */}
                           <div className="absolute -bottom-1 w-4 h-1 bg-black/10 rounded-full blur-[2px]" />
                        </motion.div>
                     </motion.div>
                  ))}
               </div>

               {/* =========================================================
                   CENTRAL FOUNDRY CORE (Multi-tier Glassmorphic Processor)
                   ========================================================= */}
               
               {/* Glowing Base Platform */}
               <div className="absolute top-1/2 left-1/2 w-40 h-40 -mt-20 -ml-20 bg-gradient-to-br from-[#0E5E64]/5 to-[#FFBF00]/5 rounded-[3rem] border-4 border-white/40 shadow-[0_0_50px_rgba(255,191,0,0.15)] flex items-center justify-center" style={{ transform: "translateZ(0px)" }}>
                  {/* Concentric expanding ripples */}
                  <motion.div animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-full h-full border border-[#FFBF00]/40 rounded-[3rem] absolute" />
                  <motion.div animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }} className="w-full h-full border border-[#FFBF00]/40 rounded-[3rem] absolute" />
               </div>
               
               {/* Heavy Primary Foundation Core */}
               <div className="absolute top-1/2 left-1/2 w-32 h-32 -mt-16 -ml-16 bg-gradient-to-br from-slate-100 to-slate-200 border-[3px] border-white shadow-[0_20px_40px_rgba(0,0,0,0.1),inset_0_4px_10px_rgba(255,255,255,1)] rounded-[2.5rem]" style={{ transform: "translateZ(10px)" }} />
               
               {/* Internal Matrix Layer (Gears & Circuits) */}
               <div className="absolute top-1/2 left-1/2 w-28 h-28 -mt-14 -ml-14 flex items-center justify-center" style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}>
                  <motion.div
                     animate={{ rotateZ: -360 }}
                     transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 flex items-center justify-center"
                     style={{ transformStyle: "preserve-3d" }}
                  >
                     <div className="w-24 h-24 border-[4px] border-dotted border-[#FFBF00]/50 rounded-full flex items-center justify-center">
                        <div className="w-16 h-16 border-[2px] border-dashed border-[#0E5E64]/40 rounded-full" />
                     </div>
                  </motion.div>
               </div>
               
               {/* Top Frosted Glass Accelerator Layer */}
               <div className="absolute top-1/2 left-1/2 w-28 h-28 -mt-14 -ml-14 bg-white/40 border border-white/80 backdrop-blur-2xl rounded-[2rem] flex items-center justify-center shadow-[0_10px_40px_rgba(255,191,0,0.2),inset_0_10px_20px_rgba(255,255,255,0.8)] overflow-hidden" style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
                   {/* Glass Reflection Highlight */}
                   <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-gradient-to-bl from-white/60 via-transparent to-transparent -translate-y-1/2 translate-x-1/2 rotate-45" />
               </div>

               {/* Absolute Floating CPU Core (Standing Rigidly Up) */}
               <motion.div
                     animate={{ 
                        scale: [1, 1.1, 1], 
                        translateZ: [60, 75, 60],
                        rotateZ: 45,
                        rotateX: -60,
                        filter: ["drop-shadow(0 0 10px rgba(255,191,0,0))", "drop-shadow(0 30px 40px rgba(255,191,0,0.5))", "drop-shadow(0 0 10px rgba(255,191,0,0))"] 
                     }}
                     transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                     style={{ transform: "rotateZ(45deg) rotateX(-60deg) translateZ(60px)", transformStyle: "preserve-3d" }}
                     className="absolute top-1/2 left-1/2 -mt-6 -ml-6 w-12 h-12 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-[0_10px_30px_rgba(14,94,100,0.2)] border-2 border-[#FFBF00]/30 flex items-center justify-center isolate"
                  >
                     {/* Inner glowing CPU icon */}
                     <Cpu className="w-6 h-6 text-[#FFBF00] relative z-10" strokeWidth={2.5} />
                     <motion.div animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-0 bg-[#FFBF00]/10 rounded-2xl" />
               </motion.div>

               {/* Orbital Communication Nodes */}
               <motion.div 
                  className="absolute top-1/2 left-1/2 -mt-1 -ml-1 w-2 h-2" 
                  style={{ transform: "translateZ(50px)" }}
                  animate={{ rotateZ: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               >
                  <div className="absolute top-[-90px] w-3 h-3 bg-brand-yellow rounded-full shadow-[0_0_15px_rgba(255,184,0,1)] border border-white" />
                  <div className="absolute bottom-[-90px] w-3 h-3 bg-[#0E5E64] rounded-full shadow-[0_0_15px_rgba(14,94,100,1)] border border-white" />
               </motion.div>

            </motion.div>
         </div>

         {/* =========================================================
             FLOATING UI OVERLAYS (Outside the 3D space for crisp tech UI)
             ========================================================= */}
         
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="absolute bottom-6 md:bottom-8 right-6 md:right-8 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-200/60 shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex items-center gap-3 z-20 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,191,0,0.2)]"
         >
            <div className="relative flex h-2.5 w-2.5">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFBF00] opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFBF00] shadow-[0_0_10px_rgba(255,191,0,0.8)]"></span>
            </div>
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-widest whitespace-nowrap">Innovation Engine Live</span>
         </motion.div>

         <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="absolute top-6 left-6 md:top-8 md:left-8 flex flex-col gap-1 z-20 pointer-events-none"
         >
            <div className="text-[9px] font-mono font-bold text-[#FFBF00] uppercase tracking-[0.2em] opacity-80 flex items-center gap-1.5">
               <Radio className="w-3 h-3" />
               SYSTEM OVERRIDE
            </div>
            <div className="text-xl font-black text-slate-800 tracking-tighter">
               10x Scalability
            </div>
         </motion.div>

      </div>
   );
};

export default AiInnovationFoundry;
