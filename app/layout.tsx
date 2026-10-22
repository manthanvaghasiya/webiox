import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Zain } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const zain = Zain({
  variable: "--font-zain",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://webiox.tech'),
  title: {
    default: "Webiox | Web Development, Apps & Software Architecture Studio",
    template: "%s | Webiox"
  },
  description: "Webiox is a premier digital engineering studio delivering custom web development, mobile apps, enterprise software architecture, and autonomous AI workflows.",
  keywords: [
    "Webiox",
    "webiox.tech",
    "Webiox Digital Solutions",
    "Webiox Tech",
    "Webiocs",
    "Webiox Agency",
    "Web Development",
    "Web Development Agency",
    "Next.js Development Studio",
    "Mobile App Development",
    "Custom Software Engineering",
    "Software Architecture",
    "Enterprise Software",
    "SaaS Architecture",
    "AI Workflows",
    "Autonomous AI Systems",
    "Technical SEO Agency",
    "Entity SEO Optimization"
  ],
  authors: [{ name: "Webiox Digital Solutions", url: "https://webiox.tech" }],
  creator: "Webiox",
  publisher: "Webiox Digital Solutions",
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    title: "Webiox | Web Development, Apps & Software Architecture Studio",
    description: "Webiox is a premier digital engineering studio delivering custom web development, mobile apps, enterprise software architecture, and autonomous AI workflows.",
    url: 'https://webiox.tech',
    siteName: 'Webiox Digital Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logo_without_background512.png',
        width: 512,
        height: 512,
        alt: 'Webiox Digital Solutions Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Webiox | Web Development, Apps & Software Architecture Studio",
    description: "Webiox is a premier digital engineering studio delivering custom web development, mobile apps, enterprise software architecture, and autonomous AI workflows.",
    site: '@webiox_tech',
    creator: '@webiox_tech',
    images: ['/logo_without_background512.png'],
  },
  icons: {
    icon: [
      { url: '/logo_without_background32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo_without_background48.png', sizes: '48x48', type: 'image/png' },
      { url: '/logo_without_background96.png', sizes: '96x96', type: 'image/png' },
      { url: '/logo_without_background192.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo_without_background512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/logo_without_background192.png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://webiox.tech/#organization",
      "name": "Webiox",
      "legalName": "Webiox Digital Solutions",
      "alternateName": [
        "Webiox Tech",
        "Webiox Agency",
        "Webiox Digital",
        "webiox.tech",
        "Webiocs",
        "Webiox Digital Solutions"
      ],
      "url": "https://webiox.tech",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://webiox.tech/#logo",
        "url": "https://webiox.tech/logo_without_background512.png",
        "contentUrl": "https://webiox.tech/logo_without_background512.png",
        "caption": "Webiox Digital Solutions Logo",
        "width": 512,
        "height": 512
      },
      "image": "https://webiox.tech/logo_without_background512.png",
      "description": "Webiox is an independent digital engineering studio and technical search authority agency specializing in high-performance web development, mobile applications, custom software architectures, and autonomous AI workflows.",
      "disambiguatingDescription": "Webiox (legal entity: Webiox Digital Solutions, domain: webiox.tech) is an independent technology agency and digital engineering studio specializing in web development, mobile applications, custom software engineering, and AI workflows. Webiox is an independent company and is completely distinct from Cisco Webex (the teleconferencing and video meeting platform).",
      "slogan": "Engineering High-Performance Web, Mobile & Custom Software Solutions",
      "priceRange": "$$",
      "email": "manthanvaghasiya@webiox.tech",
      "telephone": "+919664736245",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Palladium, Yogi Chowk",
        "addressLocality": "Surat",
        "postalCode": "395010",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "21.2144",
        "longitude": "72.8890"
      },
      "founder": {
        "@type": "Person",
        "@id": "https://webiox.tech/#founder",
        "name": "Manthan Vaghasiya",
        "jobTitle": "Founder & Principal Software Architect",
        "email": "manthanvaghasiya@webiox.tech",
        "sameAs": [
          "https://linkedin.com/in/manthanvaghasiya",
          "https://github.com/manthanvaghasiya"
        ]
      },
      "sameAs": [
        "https://www.instagram.com/webiox.ai/",
        "https://share.google/iDpXXxjX29qoPeAAO",
        "https://www.linkedin.com/company/webiox/",
        "https://github.com/webiox",
        "https://x.com/webiox_tech",
        "https://www.facebook.com/webiox",
        "https://www.youtube.com/@webiox"
      ],
      "knowsAbout": [
        "https://www.wikidata.org/wiki/Q386275",
        "https://en.wikipedia.org/wiki/Web_development",
        "https://www.wikidata.org/wiki/Q110852097",
        "https://en.wikipedia.org/wiki/Next.js",
        "https://www.wikidata.org/wiki/Q180711",
        "https://en.wikipedia.org/wiki/Search_engine_optimization",
        "https://www.wikidata.org/wiki/Q211158",
        "https://en.wikipedia.org/wiki/Software_as_a_service",
        "https://www.wikidata.org/wiki/Q11660",
        "https://en.wikipedia.org/wiki/Artificial_intelligence",
        "https://www.wikidata.org/wiki/Q1441865",
        "https://en.wikipedia.org/wiki/Semantic_search",
        "https://www.wikidata.org/wiki/Q33002955",
        "https://en.wikipedia.org/wiki/Google_Knowledge_Graph"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Webiox Core Engineering & Technical Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Enterprise Web Engineering & Web Development",
              "url": "https://webiox.tech/services/web-development",
              "description": "Custom, high-performance web platforms and websites engineered with Next.js, React, and Node.js for maximum conversion and speed."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Native & Cross-Platform Mobile Applications",
              "url": "https://webiox.tech/services/mobile-apps",
              "description": "Fluid 60 FPS iOS and Android mobile applications built with Swift, Kotlin, and React Native."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Software & SaaS Product Engineering",
              "url": "https://webiox.tech/services/saas-development",
              "description": "Scalable, multi-tenant cloud software architectures, ERPs, and internal tools built with TypeScript, AWS, and Docker."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Autonomous AI Workflows & Intelligent Systems",
              "url": "https://webiox.tech/services/ai-solutions",
              "description": "Autonomous AI agent workflows, custom LLM integrations, document intelligence pipelines, and operational automation."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "High-Conversion E-Commerce Platforms",
              "url": "https://webiox.tech/services/ecommerce-platforms",
              "description": "Custom headless e-commerce storefronts engineered for high throughput and zero checkout friction."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "UI/UX Design Systems & Prototyping",
              "url": "https://webiox.tech/services/ui-ux-design",
              "description": "Conversion-focused user interface design, tokenized design systems in Figma, and interactive clickable prototypes."
            }
          }
        ]
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+919664736245",
          "contactType": "sales",
          "email": "manthanvaghasiya@webiox.tech",
          "availableLanguage": ["en", "gu", "hi"]
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://webiox.tech/#website",
      "url": "https://webiox.tech",
      "name": "Webiox",
      "alternateName": "Webiox Digital Solutions",
      "publisher": {
        "@id": "https://webiox.tech/#organization"
      },
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://webiox.tech/blog?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://webiox.tech/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Webiox?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Webiox (legal entity: Webiox Digital Solutions, domain: webiox.tech) is an independent digital engineering studio and technology agency. Webiox builds high-performance web development platforms, mobile applications, custom software architectures, and autonomous AI workflows. Webiox is an independent company and is completely distinct from Cisco Webex and Zoom."
          }
        },
        {
          "@type": "Question",
          "name": "What core services does Webiox provide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Webiox specializes in three core areas: 1) High-performance web development and Next.js applications, 2) Native iOS and Android mobile app development along with custom software and SaaS engineering, and 3) Autonomous AI agent workflows and operational automation."
          }
        },
        {
          "@type": "Question",
          "name": "Is Webiox affiliated with Cisco Webex or Zoom?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Webiox (webiox.tech) is an independent software and web development agency founded by principal software architect Manthan Vaghasiya. Webiox is not affiliated with, sponsored by, or connected to Cisco Webex, Zoom, or teleconferencing software."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-D8X9VRH46J";

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable} ${zain.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
        {/* Google Analytics 4 (GA4) Tracking - Inlined in static head for instant crawler & audit tool detection */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        {/* Meta (Facebook) Pixel - Inlined for instant crawler & audit tool detection */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID || '1088421989781878'}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            className="hidden"
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID || '1088421989781878'}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-[#F9FAFB] selection:bg-[#1a7097]/20 selection:text-[#1a7097] overflow-x-clip">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
