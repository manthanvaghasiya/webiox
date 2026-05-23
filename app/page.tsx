import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://webiox.tech/#organization",
        "name": "Webiox Digital Solutions",
        "url": "https://webiox.tech",
        "logo": "https://webiox.tech/logo.png",
        "sameAs": [
          "https://linkedin.com/company/webiox",
          "https://twitter.com/webiox"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-0000000000",
          "contactType": "customer service",
          "areaServed": ["IN", "Global"],
          "availableLanguage": ["en", "hi", "gu"]
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://webiox.tech/#localbusiness",
        "name": "Webiox Digital Solutions",
        "image": "https://webiox.tech/office.jpg",
        "url": "https://webiox.tech",
        "telephone": "+91-0000000000",
        "priceRange": "₹15,000 - ₹2,00,000",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Business Hub",
          "addressLocality": "Ahmedabad",
          "addressRegion": "Gujarat",
          "postalCode": "380001",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "23.0225",
          "longitude": "72.5714"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://webiox.tech/#website",
        "url": "https://webiox.tech",
        "name": "Webiox Digital Solutions",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://webiox.tech/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Services />
      <PortfolioPreview />
      <WhyChooseUs />
      <Process />
      <Testimonials />
    </>
  );
}
