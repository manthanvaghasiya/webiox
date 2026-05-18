import AboutHero from '@/components/about/AboutHero';
import AboutStats from '@/components/about/AboutStats';
import AboutStory from '@/components/about/AboutStory';
import AboutValues from '@/components/about/AboutValues';
import AboutTechStack from '@/components/about/AboutTechStack';
import AboutCTA from '@/components/about/AboutCTA';

export default function About() {
  return (
    <div className="-mt-20 overflow-x-hidden w-full">
      <AboutHero />
      <AboutStats />
      <AboutStory />
      <AboutTechStack />
      <AboutValues />
      <AboutCTA />
    </div>
  );
}
