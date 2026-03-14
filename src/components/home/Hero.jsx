import { motion, useScroll, useTransform } from 'framer-motion';

// Premium Easing for Smooth Reveals
const ease = [0.76, 0, 0.24, 1];

// Giant Text Reveal Component
const RevealText = ({ text }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
    }
  };

  const child = {
    hidden: { y: "100%", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 1.4, ease: ease } 
    }
  };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="visible"
      className="flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-x-6 md:gap-y-4 lg:gap-x-10 lg:gap-y-6"
    >
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden pb-4 md:pb-8 -mb-4 md:-mb-8">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <section className="relative min-h-screen w-full bg-[#E5E8EF] flex items-center justify-center overflow-hidden selection:bg-[#002583] selection:text-white">
      
      <motion.div 
        style={{ y: yParallax }}
        className="relative z-10 w-full max-w-[120rem] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col items-center justify-center text-center"
      >
        
        {/* 1. Giant Typography (The Never Settle Style) */}
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-[#002583] leading-[0.85] tracking-tighter uppercase w-full">
          <RevealText text="WE BUILD DIGITAL EXPERIENCES" />
        </h1>
        
        {/* 2. Empty Space & Minimal Subtitle */}
        <div className="overflow-hidden mt-16 md:mt-24 lg:mt-32">
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.5, ease }}
            className="text-base md:text-2xl text-[#002583]/70 font-medium max-w-2xl mx-auto"
          >
            An award-winning agency crafting digital products that redefine what is possible on the web.
          </motion.p>
        </div>

        {/* 3. Accent Button */}
        <div className="overflow-hidden mt-12 md:mt-16">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.8, ease }}
          >
            <button className="bg-[#FFB800] text-[#002583] font-bold text-sm md:text-lg px-10 py-5 lg:px-14 lg:py-6 rounded-full hover:scale-105 transition-transform duration-300 shadow-2xl shadow-[#FFB800]/20 uppercase tracking-widest outline-none focus:ring-4 focus:ring-[#FFB800]/50">
              Start a Project
            </button>
          </motion.div>
        </div>

      </motion.div>

    </section>
  );
};

export default Hero;
