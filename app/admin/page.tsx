import { getBlogs } from '@/app/actions/blog';
import { getInquiries } from '@/app/actions/contact';
import DashboardClient from './DashboardClient';

export default async function AdminDashboard() {
  const blogs = await getBlogs();
  const inquiries = await getInquiries();

  const totalBlogs = blogs.length;
  const totalInquiries = inquiries.length;
  
  // Calculate total views across all blogs
  const totalViews = blogs.reduce((acc: number, blog: any) => acc + (blog.views || 0), 0);

  const stats = {
    totalBlogs,
    totalInquiries,
    totalViews
  };

  const recentBlogs = blogs.slice(0, 3); // Get top 3 most recent blogs

  return <DashboardClient blogs={recentBlogs} stats={stats} />;
}
