import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <PortfolioPreview />
      <WhyChooseUs />
      <Process />
      <Testimonials />
    </>
  );
}
