import { getBlogs } from '@/app/actions/blog';
import { getInquiries } from '@/app/actions/contact';
import { getProjects } from '@/app/actions/portfolio';
import DashboardClient from './DashboardClient';

export default async function AdminDashboard() {
  const blogs = await getBlogs();
  const inquiries = await getInquiries();
  const projects = await getProjects();

  const totalBlogs = blogs.length;
  const totalPortfolios = projects.length;
  const totalInquiries = inquiries.length;
  
  // Calculate total views across all blogs
  const totalViews = blogs.reduce((acc: number, blog: any) => acc + (blog.views || 0), 0);

  const stats = {
    totalBlogs,
    totalPortfolios,
    totalInquiries,
    totalViews
  };

  const recentBlogs = blogs.slice(0, 3); // Get top 3 most recent blogs

  return <DashboardClient blogs={recentBlogs} stats={stats} />;
}
