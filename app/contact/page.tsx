import { Metadata } from 'next';
import ContactClient from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: 'Contact & Technical Inquiries',
  description: 'Connect with Webiox Digital Solutions. Discuss your web engineering, mobile app, custom software, or AI automation project with our team.',
  openGraph: {
    title: 'Contact & Technical Inquiries | Webiox',
    description: 'Connect with Webiox Digital Solutions. Discuss your web engineering, mobile app, custom software, or AI automation project with our team.',
    url: 'https://webiox.tech/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
