import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://webiox.tech'),
  title: {
    default: "Webiox Digital Solutions | Gujarat's Premier Tech Agency",
    template: "%s | Webiox Digital Solutions"
  },
  description: "Gujarat's premier digital engineering & product studio. We build ultra-fast web platforms, custom SaaS architectures, and autonomous AI systems for market leaders.",
  keywords: [
    "Webiox",
    "Tech Agency Surat",
    "Gujarat Web Agency",
    "Digital Engineering Studio",
    "Next.js Development Agency",
    "Custom Software India",
    "SaaS Architecture",
    "AI Automation Workflows"
  ],
  authors: [{ name: "Webiox Digital Solutions", url: "https://webiox.tech" }],
  creator: "Webiox",
  publisher: "Webiox Digital Solutions",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Webiox Digital Solutions | Gujarat's Premier Tech Agency",
    description: "Engineering ultra-fast web flagships, custom SaaS architectures, and autonomous AI systems for visionary businesses.",
    url: 'https://webiox.tech',
    siteName: 'Webiox Digital Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/webiox512.png',
        width: 512,
        height: 512,
        alt: 'Webiox Digital Solutions Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Webiox Digital Solutions | Gujarat's Premier Tech Agency",
    description: "Engineering ultra-fast web flagships, custom SaaS architectures, and autonomous AI systems for visionary businesses.",
    creator: '@webiox',
    images: ['/webiox512.png'],
  },
  icons: {
    icon: [
      { url: '/webiox32.png', sizes: '32x32', type: 'image/png' },
      { url: '/webiox48.png', sizes: '48x48', type: 'image/png' },
      { url: '/webiox96.png', sizes: '96x96', type: 'image/png' },
      { url: '/webiox192.png', sizes: '192x192', type: 'image/png' },
      { url: '/webiox512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/webiox192.png' },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F9FAFB] selection:bg-[#1a7097]/20 selection:text-[#1a7097] overflow-x-hidden">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
