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
          "https://twitter.com/webiox",
          "https://github.com/webiox"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-9664736245",
          "contactType": "sales",
          "areaServed": ["IN", "US", "GB", "AE", "Global"],
          "availableLanguage": ["en", "hi", "gu"]
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://webiox.tech/#localbusiness",
        "name": "Webiox Digital Solutions",
        "image": "https://webiox.tech/webiox512.png",
        "url": "https://webiox.tech",
        "telephone": "+91-9664736245",
        "priceRange": "₹25,000 - ₹5,00,000",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "The Palladium, Yogi Chowk",
          "addressLocality": "Surat",
          "addressRegion": "Gujarat",
          "postalCode": "395010",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "21.2185",
          "longitude": "72.8842"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
          ],
          "opens": "09:30",
          "closes": "19:00"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://webiox.tech/#website",
        "url": "https://webiox.tech",
        "name": "Webiox Digital Solutions"
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
