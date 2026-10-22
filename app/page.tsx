import Hero from "@/components/sections/Hero";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FAQSection from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <PortfolioPreview />
      <Process />
      <Testimonials />
      <FAQSection />
    </>
  );
}
