import { Reveal, FadeIn } from '../ui/Reveal';
import Button from '../ui/Button';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-400/5 blur-[120px]" />
        
        {/* Subtle grid pattern for modern SaaS look */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDEwaDQwdjJIMHoiIGZpbGw9InJnYmEoMCwwLDAsMC4wMikiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8cGF0aCBkPSJNMTAgMHY0MGgyVjB6IiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDIpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+')] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        <FadeIn delay={0.2} className="mb-6">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20">
            Award-Winning Digital Agency
          </span>
        </FadeIn>

        <Reveal delay={0.3} direction="up" width="100%">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-8 max-w-5xl mx-auto">
            Building Digital Experiences That <span className="text-gradient">Grow Your Business</span>
          </h1>
        </Reveal>

        <Reveal delay={0.4} direction="up" width="100%">
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            We partner with visionary companies to design, build, and scale world-class web applications and brand identities.
          </p>
        </Reveal>

        <Reveal delay={0.5} direction="up">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Button to="/contact" size="lg" icon>
              Start a Project
            </Button>
            <Button to="/portfolio" variant="white" size="lg">
              View Our Work
            </Button>
          </div>
        </Reveal>

        {/* Dashboard/UI Mockup Illustration */}
        <Reveal delay={0.7} direction="up" width="100%">
          <motion.div 
            className="mt-20 relative mx-auto w-full max-w-5xl"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            <div className="glass rounded-2xl md:rounded-3xl p-2 md:p-4 shadow-2xl shadow-gray-200 border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100 aspect-[16/9] w-full relative overflow-hidden flex flex-col">
                {/* Fake browser header */}
                <div className="h-10 border-b border-gray-200 flex items-center px-4 gap-2 bg-white">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                {/* Fake UI Body */}
                <div className="flex-1 p-6 md:p-10 flex gap-6">
                  {/* Sidebar */}
                  <div className="hidden md:flex flex-col gap-4 w-48">
                    <div className="h-8 bg-gray-200 rounded-md w-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded-md w-3/4 animate-pulse delay-75" />
                    <div className="h-4 bg-gray-200 rounded-md w-1/2 animate-pulse delay-100" />
                    <div className="h-4 bg-gray-200 rounded-md w-5/6 animate-pulse delay-150" />
                  </div>
                  {/* Main Content */}
                  <div className="flex-1 flex flex-col gap-6">
                    <div className="h-12 bg-primary/10 rounded-xl w-full" />
                    <div className="flex gap-4">
                      <div className="h-32 bg-gray-100 rounded-xl flex-1 animate-pulse" />
                      <div className="h-32 bg-gray-100 rounded-xl flex-1 animate-pulse delay-75" />
                      <div className="h-32 bg-gray-100 rounded-xl flex-1 animate-pulse delay-150" />
                    </div>
                    <div className="h-full bg-gray-100 rounded-xl w-full" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
