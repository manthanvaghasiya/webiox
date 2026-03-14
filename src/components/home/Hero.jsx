import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#002583] overflow-hidden">
      
      {/* Step 3: The Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center pt-20 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              <span className="block mb-2">Developing</span>
              <span className="block text-[#eab308] min-h-[1.2em]">
                <Typewriter
                  words={['Web Platforms', 'Custom Software', 'AI Workflows']}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
              <span className="block mt-2">For Industry Leaders.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
              This is the left column dummy text. It will hold the beautiful Typography and the main Call-to-Action button.
            </p>
            <button className="bg-white text-[#002583] px-8 py-3 rounded-full font-bold w-fit hover:bg-gray-100 transition-colors">
              Call to Action
            </button>
          </div>

          {/* Right Column: 3D Element Placeholder */}
          <div className="flex items-center justify-center">
            <div className="w-full h-[400px] border-2 border-dashed border-white/30 rounded-2xl flex items-center justify-center text-white/50 text-xl font-medium tracking-wide bg-white/5 backdrop-blur-sm">
              3D Element Placeholder
            </div>
          </div>

        </div>
      </div>

      {/* Step 2: The Bottom Curve (SVG Wave) */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20">
        <svg 
          className="relative block w-[calc(100%+1.3px)] h-[100px] md:h-[150px]" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C50.25,108.79,103.88,118.84,156.6,117.9,214.5,116.89,269.45,86.62,321.39,56.44Z" 
            className="fill-[#ffffff]"
          />
        </svg>
      </div>

    </section>
  );
};

export default Hero;

