import { Reveal } from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';

const processes = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    description: 'We dive deep into your business goals, target audience, and competition to create a comprehensive digital strategy.'
  },
  {
    num: '02',
    title: 'UX/UI Design',
    description: 'Our design team crafts intuitive wireframes and stunning visual interfaces that align with your brand identity.'
  },
  {
    num: '03',
    title: 'Development',
    description: 'Our engineers bring the designs to life using modern, scalable, and responsive web technologies.'
  },
  {
    num: '04',
    title: 'Testing & Launch',
    description: 'Rigorous QA testing ensures a flawless product. After launch, we provide ongoing support and optimization.'
  }
];

const Process = () => {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          pretitle="How We Work"
          title="Our Proven Process"
          subtitle="A systematic approach that ensures transparency, efficiency, and exceptional results from concept to deployment."
        />

        <div className="mt-20 relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-[40px] left-0 w-full h-[2px] bg-gray-200 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {processes.map((process, index) => (
              <Reveal key={index} delay={index * 0.1} direction="up">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center justify-center mb-8 mx-auto lg:mx-0">
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-teal-400">
                      {process.num}
                    </span>
                  </div>
                  
                  <div className="text-center lg:text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{process.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {process.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
