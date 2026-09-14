import { Metadata } from 'next';
import PortfolioClient from '@/components/portfolio/PortfolioClient';

export const metadata: Metadata = {
  title: 'Flagship Portfolio & Enterprise Case Studies | Webiox',
  description: 'Explore the digital flagships, SaaS platforms, and AI automation engines engineered by Webiox Digital Solutions for market-leading businesses.',
  openGraph: {
    title: 'Flagship Portfolio & Enterprise Case Studies | Webiox',
    description: 'Explore the digital flagships, SaaS platforms, and AI automation engines engineered by Webiox Digital Solutions.',
    url: 'https://webiox.tech/portfolio',
    type: 'website',
    images: ['/webiox512.png'],
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
