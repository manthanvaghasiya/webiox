import { Metadata } from 'next';
import CareerHero from '@/components/career/CareerHero';
import CultureValues from '@/components/career/CultureValues';
import PerksBenefits from '@/components/career/PerksBenefits';
import OpenPositions from '@/components/career/OpenPositions';

export const metadata: Metadata = {
  title: 'Careers | Webiox Digital Solutions',
  description: 'Join Webiox and build the future of digital architecture. Explore our open roles, culture, and benefits.',
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
