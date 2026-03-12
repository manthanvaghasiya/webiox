import { Reveal } from '../ui/Reveal';
import Button from '../ui/Button';

const CTA = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <Reveal direction="up" width="100%">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-teal-400/20 blur-[80px] rounded-full mix-blend-screen" />
            
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                Ready to Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-primary">Amazing?</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                Let's discuss how Webiox can solve your technical challenges and accelerate your business growth. We're currently accepting new projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button to="/contact" size="lg" icon variant="primary" className="bg-primary hover:bg-teal-500 text-white shadow-primary/30">
                  Start Your Project
                </Button>
                <Button to="/services" size="lg" variant="white">
                  Explore Services
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTA;
