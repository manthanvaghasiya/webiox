'use server';
import { connectToDatabase } from '@/lib/mongodb';

export async function getBlogs() {
  try {
    const { db } = await connectToDatabase();
    const blogs = await db.collection('blogs').find().sort({ createdAt: -1 }).toArray();
    
    // Fallback to dummy data if db is empty for demonstration purposes
    if (blogs.length === 0) {
      return [
        { id: '1', title: 'Top 10 Web Design Trends in 2026', status: 'Published', date: 'June 19, 2026', views: 1240 },
        { id: '2', title: 'How AI is Transforming Agencies', status: 'Published', date: 'June 18, 2026', views: 890 },
        { id: '3', title: 'The Ultimate Guide to Next.js', status: 'Draft', date: 'June 17, 2026', views: 0 },
        { id: '4', title: 'Maximizing Client Retention', status: 'Published', date: 'June 10, 2026', views: 2100 },
      ];
    }

    return blogs.map((doc: any) => ({
      id: doc._id.toString(),
      title: doc.title,
      status: doc.status || 'Draft',
      date: doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : 'Unknown Date',
      views: doc.views || 0
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

import { ObjectId } from 'mongodb';

export async function addBlog(data: { title: string, status: string }) {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('blogs').insertOne({
      ...data,
      views: 0,
      slug: '',
      excerpt: '',
      content: '',
      author: '',
      authorRole: '',
      authorInitials: '',
      category: 'Uncategorized',
      image: '',
      tags: [],
      readTime: '5 min read',
      readMinutes: 5,
      featured: false,
      createdAt: new Date()
    });
    return { success: true, id: result.insertedId.toString() };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteBlog(id: string) {
  try {
    const { db } = await connectToDatabase();
    await db.collection('blogs').deleteOne({ _id: new ObjectId(id) });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getBlogById(id: string) {
  try {
    const { db } = await connectToDatabase();
    const blog = await db.collection('blogs').findOne({ _id: new ObjectId(id) });
    if (!blog) return null;
    
    return {
      id: blog._id.toString(),
      title: blog.title,
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      status: blog.status || 'Draft',
      date: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Unknown Date',
      views: blog.views || 0,
      author: blog.author || '',
      authorRole: blog.authorRole || '',
      authorInitials: blog.authorInitials || '',
      category: blog.category || 'Uncategorized',
      image: blog.image || '',
      tags: blog.tags || [],
      readTime: blog.readTime || '5 min read',
      readMinutes: blog.readMinutes || 5,
      featured: blog.featured || false
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateBlog(id: string, data: any) {
  try {
    const { db } = await connectToDatabase();
    await db.collection('blogs').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } }
    );
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
