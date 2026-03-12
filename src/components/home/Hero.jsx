import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight, TrendingUp, Users, ShieldCheck } from 'lucide-react';

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const floatingVariant1 = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const floatingVariant2 = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
    }
  };

  const floatingVariant3 = {
    animate: {
      y: [0, -25, 0],
      transition: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
    }
  };

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center pt-24 pb-20 overflow-hidden bg-brand-gray text-center selection:bg-brand-blue selection:text-white">
      
      {/* Background Orbs to add depth without clutter */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[0%] right-[10%] w-[600px] h-[600px] rounded-full bg-brand-yellow/5 blur-[150px] pointer-events-none" />

      {/* Main Content Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="mb-6">
           <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-brand-blue/10 text-brand-blue font-bold text-xs tracking-widest uppercase shadow-sm">
             <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
             Global Enterprise Partner
           </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-brand-blue tracking-tight leading-[1.05] mb-8"
        >
          Engineering Digital <br />
          <span className="relative inline-block mt-2">
            Excellence.
            {/* Subtle underline SVG */}
            <svg className="absolute w-full h-4 -bottom-1 left-0 text-brand-yellow/30" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
            </svg>
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-2xl text-gray-600 mb-12 max-w-3xl leading-relaxed font-medium"
        >
          We partner with industry leaders to design, build, and scale world-class software platforms and digital experiences.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Button 
            to="/contact" 
            size="lg" 
            className="group relative overflow-hidden bg-brand-yellow hover:bg-yellow-400 text-brand-blue font-bold shadow-[0_0_30px_rgba(255,184,0,0.4)] hover:shadow-[0_0_40px_rgba(255,184,0,0.6)] border-none text-lg px-10 py-5 transition-all duration-500 rounded-full"
          >
            <span className="relative z-10 flex items-center">
              Start a Project <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Shine effect on hover */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite] skew-x-12 z-0" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Floating Glassmorphism Cards Container */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block overflow-hidden max-w-[100vw]">
         
         {/* Card 1: Top Left */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.8, x: -50 }}
           animate={{ opacity: 1, scale: 1, x: 0 }}
           transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
           className="absolute top-[20%] left-[8%]"
         >
           <motion.div 
             variants={floatingVariant1} 
             animate="animate"
             className="bg-white/70 backdrop-blur-xl border border-white p-5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,37,131,0.08)] flex items-center gap-4 w-64"
           >
             <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
               <TrendingUp className="w-6 h-6 text-brand-blue" />
             </div>
             <div>
               <p className="text-2xl font-black text-brand-blue leading-none mb-1">99.9%</p>
               <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Uptime SLA</p>
             </div>
           </motion.div>
         </motion.div>

         {/* Card 2: Right Middle */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.8, x: 50 }}
           animate={{ opacity: 1, scale: 1, x: 0 }}
           transition={{ duration: 1, delay: 1, ease: "easeOut" }}
           className="absolute top-[45%] right-[5%]"
         >
           <motion.div 
             variants={floatingVariant2} 
             animate="animate"
             className="bg-white/80 backdrop-blur-xl border border-white p-5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,37,131,0.08)] flex items-center gap-4 w-72"
           >
             <div className="w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center shrink-0">
               <Users className="w-6 h-6 text-brand-yellow" />
             </div>
             <div>
               <p className="text-2xl font-black text-brand-blue leading-none mb-1">100%</p>
               <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Client Success Rate</p>
             </div>
           </motion.div>
         </motion.div>

         {/* Card 3: Bottom Left */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.8, y: 50 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
           className="absolute bottom-[15%] left-[15%]"
         >
           <motion.div 
             variants={floatingVariant3} 
             animate="animate"
             className="glass bg-white/60 backdrop-blur-2xl border border-white p-4 rounded-2xl shadow-[0_8px_32px_0_rgba(0,37,131,0.08)] flex items-center gap-3 w-56"
           >
             <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center shrink-0 shadow-md">
               <ShieldCheck className="w-5 h-5 text-white" />
             </div>
             <div>
               <p className="text-sm font-black text-brand-blue leading-none mb-1">Enterprise Grade</p>
               <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Security Standards</p>
             </div>
           </motion.div>
         </motion.div>

      </div>
    </section>
  );
};

export default Hero;
