import React, { Suspense } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import DeveloperScene from './DeveloperScene';

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#002583] overflow-hidden">

      {/* Background 3D Scene */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* The Content Grid (pointer-events-none so mouse passes through to Canvas) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center pt-10 pb-32 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">

          {/* Left Column: Typography & CTA */}
          <div className="flex flex-col justify-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-[45px] lg:leading-[1.1] font-extrabold tracking-tight mb-8">

              {/* Line 1: 'Developing' + Typewriter */}
              <span className="flex flex-row items-center flex-nowrap whitespace-nowrap gap-2 lg:gap-4 mb-2 lg:mb-4">
                <span>Developing</span>
                <span className="text-[#eab308] min-w-[300px] lg:min-w-[400px]">
                  <Typewriter
                    words={['Digital Platforms', 'Custom Software', 'AI Workflows']}
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

          {/* Right Column: 3D Developer Scene */}
          <div className="hidden lg:flex items-center justify-end w-full h-full pointer-events-none relative pr-4 lg:pr-10">
            <Suspense fallback={null}>
              <DeveloperScene />
            </Suspense>
          </div>

        </div>
      </div>

      {/* Wavy Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg
          className="relative block w-full h-[80px] md:h-[150px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C300,250 1000,-180 1300,150 V150 H0 Z"
            className="fill-[#ffffff]"
          />
        </svg>
      </div>

    </section>
  );
};

export default Hero;

