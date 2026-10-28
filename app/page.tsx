import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TechMarquee from "@/components/sections/TechMarquee";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FAQSection from "@/components/sections/FAQSection";

export const metadata: Metadata = {
  title: "Webiox™ Digital Solutions | Web Development & Software Engineering Agency",
  description: "Webiox (webiox.tech) is an independent premier digital engineering studio delivering custom web development, mobile apps, software architecture, and autonomous AI systems.",
  alternates: {
    canonical: "https://webiox.tech",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <WhyChooseUs />
      <PortfolioPreview />
      <Process />
      <Testimonials />
      <FAQSection />
    </>
  );
}
