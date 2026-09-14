import { getInquiries } from '@/app/actions/contact';
import DashboardClient from './DashboardClient';

export default async function AdminDashboard() {
  const inquiries = await getInquiries();

  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter((i: any) => i.status === 'New').length;
  const resolvedInquiries = inquiries.filter((i: any) => i.status === 'Resolved').length;

  const stats = {
    totalInquiries,
    newInquiries,
    resolvedInquiries,
  };

  const recentInquiries = inquiries.slice(0, 5);

  return <DashboardClient inquiries={recentInquiries} stats={stats} />;
}
