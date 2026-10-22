import { Metadata } from 'next';
import CareerHero from '@/components/career/CareerHero';
import CultureValues from '@/components/career/CultureValues';
import PerksBenefits from '@/components/career/PerksBenefits';
import OpenPositions from '@/components/career/OpenPositions';

export const metadata: Metadata = {
  title: 'Careers & Engineering Opportunities',
  description: 'Join Webiox Digital Solutions. Build high-performance web platforms, mobile apps, and autonomous AI systems. Explore open engineering, design, and sales roles.',
  openGraph: {
    title: 'Careers & Engineering Opportunities | Webiox',
    description: 'Join Webiox Digital Solutions. Build high-performance web platforms, mobile apps, and autonomous AI systems. Explore open engineering, design, and sales roles.',
    url: 'https://webiox.tech/career',
    type: 'website',
  },
};

export default function CareerPage() {
  return (
    <div className="w-full flex flex-col bg-[#F9FAFB]">
      <CareerHero />
      <CultureValues />
      <PerksBenefits />
      <OpenPositions />
    </div>
  );
}
