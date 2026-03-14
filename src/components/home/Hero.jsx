import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.76, 0, 0.24, 1];

// Word Reveal Component
const RevealText = ({ text }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const child = {
    hidden: { y: "150%", opacity: 0, rotate: 5 },
    visible: { 
      y: 0, 
      opacity: 1,
      rotate: 0,
      transition: { duration: 1.2, ease: ease } 
    }
  };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="visible"
      className="flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-x-5 md:gap-y-4 lg:gap-x-6 lg:gap-y-4"
    >
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden pb-4 md:pb-6 -mb-4 md:-mb-6">
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
  const yParallax = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacityFade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen w-full bg-[#050505] flex items-center justify-center overflow-hidden selection:bg-[#FFD700] selection:text-black">
      
      {/* Background Glow Auras */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/30 blur-[150px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-20%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-amber-500/20 blur-[130px]"
        />
      </div>

      <motion.div 
        style={{ y: yParallax, opacity: opacityFade }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center justify-center text-center mt-12 md:mt-0"
      >
        
        {/* Tiny Glowing Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.6)]" />
            <span className="text-xs md:text-sm font-medium text-white/80 tracking-wider uppercase">
              Next-Gen Web Solutions
            </span>
          </div>
        </motion.div>

        {/* Massive Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold text-white leading-[1.05] tracking-tight w-full max-w-5xl">
          <RevealText text="Engineering The Future Of The Web." />
        </h1>
        
        {/* Soft Gray Sub-headline */}
        <div className="overflow-hidden mt-8 md:mt-12 max-w-3xl mx-auto">
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2, ease }}
            className="text-base md:text-xl text-gray-400 font-normal leading-relaxed"
          >
            We partner with global tech startups and visionary local businesses to craft award-winning, high-performance digital architectures.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-12 md:mt-16 w-full sm:w-auto overflow-hidden p-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5, ease }}
            className="w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto bg-white text-black font-semibold text-sm md:text-base px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] tracking-wide">
              Start Project
            </button>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.6, ease }}
            className="w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto bg-transparent text-white font-medium text-sm md:text-base px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm tracking-wide">
              View Our Work
            </button>
          </motion.div>
        </div>

      </motion.div>

    </section>
  );
};

export default Hero;
