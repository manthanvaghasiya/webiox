import { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import AboutStats from '@/components/about/AboutStats';
import AboutStory from '@/components/about/AboutStory';
import AboutValues from '@/components/about/AboutValues';
import AboutTechStack from '@/components/about/AboutTechStack';
import AboutCTA from '@/components/about/AboutCTA';

export const metadata: Metadata = {
  title: 'About Our Studio & Engineering Leadership',
  description: 'Learn about Webiox Digital Solutions—our mission, engineering philosophy, and how we build world-class digital platforms for businesses.',
  openGraph: {
    title: 'About Our Studio & Engineering Leadership | Webiox',
    description: 'Learn about Webiox Digital Solutions—our mission, engineering philosophy, and how we build world-class digital platforms.',
    url: 'https://webiox.tech/about',
    type: 'website',
  },
};

export default function About() {
  return (
    <div className="overflow-x-hidden w-full max-w-[100vw]">
      <AboutHero />
      <AboutStats />
      <AboutStory />
      <AboutTechStack />
      <AboutValues />
      <AboutCTA />
    </div>
  );
}
