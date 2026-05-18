import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Webiox Digital Solutions",
  description: "Premium digital solutions for modern businesses",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
