import { Reveal, FadeIn } from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Webiox completely transformed our digital presence. The new SaaS platform they built for us increased our user retention by 45% in the first quarter alone. Highly recommended.",
    author: "Sarah Jenkins",
    role: "CTO, TechFlow Inc.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "The attention to detail and engineering quality deliverd by the Webiox team is unparalleled. They didn't just build an app; they built a scalable product that our users love.",
    author: "David Chen",
    role: "Founder, HealthSync Apps",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "From discovery to launch, the process was seamless. The custom e-commerce solution they designed for us handles our heavy traffic flawlessly during peak sales events.",
    author: "Emily Roberts",
    role: "E-Commerce Director, RetailGen",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          pretitle="Client Success"
          title="What Our Partners Say"
          subtitle="Don't just take our word for it. Hear from the visionary companies we've helped grow."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {testimonials.map((testimonial, index) => (
            <Reveal key={index} delay={index * 0.15} direction="up">
              <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-300 relative group h-full flex flex-col">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-200 group-hover:text-primary/10 transition-colors" />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-8 flex-grow font-medium">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto border-t border-gray-200/60 pt-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
