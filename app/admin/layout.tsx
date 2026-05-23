import AdminProviders from '@/lib/admin/providers';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Webiox Admin Panel',
  description: 'Agency management and CRM dashboard.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProviders>
      <AdminLayout>{children}</AdminLayout>
    </AdminProviders>
  );
}
