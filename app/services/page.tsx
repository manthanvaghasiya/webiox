import { Metadata } from 'next';
import ServicesClient from '@/components/services/ServicesClient';

export const metadata: Metadata = {
  title: 'Engineering Services & Technical Capabilities | Webiox',
  description: 'Explore Webiox capabilities: Enterprise Web Engineering, E-Commerce Infrastructure, SaaS Platforms, Autonomous AI Solutions, and Native Mobile Ecosystems.',
  openGraph: {
    title: 'Engineering Services & Technical Capabilities | Webiox',
    description: 'Enterprise Web Engineering, E-Commerce Infrastructure, SaaS Platforms, Autonomous AI Solutions, and Native Mobile Ecosystems.',
    url: 'https://webiox.tech/services',
    type: 'website',
    images: ['/webiox512.png'],
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
