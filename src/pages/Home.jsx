import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import PortfolioPreview from '../components/home/PortfolioPreview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Process from '../components/home/Process';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <PortfolioPreview />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
};

export default Home;
