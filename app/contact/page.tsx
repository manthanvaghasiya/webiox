import { Metadata } from 'next';
import ContactClient from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: 'Contact Webiox | Start Your Project with Gujarat’s Leading Tech Agency',
  description: 'Connect with Webiox Digital Solutions in Surat, Gujarat. Discuss your custom software, web engineering, or AI automation project with our team.',
  openGraph: {
    title: 'Contact Webiox | Start Your Project with Gujarat’s Leading Tech Agency',
    description: 'Connect with Webiox Digital Solutions in Surat, Gujarat. Discuss your custom software, web engineering, or AI automation project with our team.',
    url: 'https://webiox.tech/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
