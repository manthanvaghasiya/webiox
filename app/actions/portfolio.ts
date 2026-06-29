'use server';
import { connectToDatabase } from '@/lib/mongodb';

export async function getProjects() {
  try {
    const { db } = await connectToDatabase();
    const projects = await db.collection('projects').find().sort({ createdAt: -1 }).toArray();
    
    if (projects.length === 0) {
      return [
        { id: '1', name: 'EcoTech Startup Landing', category: 'Web Design', date: 'May 2026', img: 'bg-emerald-100' },
        { id: '2', name: 'Finance Dashboard UI', category: 'SaaS App', date: 'April 2026', img: 'bg-indigo-100' },
        { id: '3', name: 'Real Estate CRM', category: 'Enterprise', date: 'Jan 2026', img: 'bg-amber-100' },
        { id: '4', name: 'Fitness Mobile App', category: 'UI/UX', date: 'Dec 2025', img: 'bg-rose-100' },
      ];
    }

    return projects.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.name,
      category: doc.category,
      date: doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : 'Unknown',
      img: doc.img || 'bg-slate-100'
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

import { ObjectId } from 'mongodb';

export async function addProject(data: { name: string, category: string }) {
  try {
    const { db } = await connectToDatabase();
    
    // Assign a random background color for the image placeholder
    const colors = ['bg-emerald-100', 'bg-indigo-100', 'bg-amber-100', 'bg-rose-100', 'bg-blue-100'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const result = await db.collection('projects').insertOne({
      ...data,
      img: randomColor,
      createdAt: new Date()
    });
    return { success: true, id: result.insertedId.toString() };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProject(id: string) {
  try {
    const { db } = await connectToDatabase();
    await db.collection('projects').deleteOne({ _id: new ObjectId(id) });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
