import React, { Suspense } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#002583] overflow-hidden">
      
      {/* Step 3: The Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
          
          {/* Left Column: Typography & CTA */}
          <div className="flex flex-col justify-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-[70px] lg:leading-[1.1] font-extrabold tracking-tight mb-8">
              
              {/* Line 1: 'Developing' + Typewriter */}
              <span className="flex flex-row items-center flex-nowrap whitespace-nowrap gap-2 lg:gap-4 mb-2 lg:mb-4">
                <span>Developing</span>
                <span className="text-[#eab308] min-w-[300px] lg:min-w-[600px]">
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
              </span>
              
              {/* Line 2 */}
              <span className="block mt-2 lg:mt-4">
                For Industry Leaders.
              </span>
              
            </h1>
            
            <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-lg">
              We merge award-winning design with cutting-edge 3D technology to build immersive experiences for global visionaries.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="w-full sm:w-auto bg-[#eab308] text-black px-6 py-4 lg:px-8 lg:py-5 rounded-full font-bold shadow-lg"
              >
                Start Project
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="w-full sm:w-auto bg-transparent text-white border-2 border-white px-6 py-4 lg:px-8 lg:py-5 rounded-full font-bold"
              >
                View Our Work
              </motion.button>
            </div>
            
          </div>

          {/* Right Column: 3D Interactive Art */}
          <div className="flex items-center justify-center relative w-full h-[40vh] lg:h-full lg:min-h-[500px] cursor-move mt-10 lg:mt-0">
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </div>

        </div>
      </div>

      {/* Step 2: The Bottom Curve (SVG Wave) */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg 
          className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[120px] lg:h-[150px]" 
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

