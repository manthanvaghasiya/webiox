'use server';
import { connectToDatabase } from '@/lib/mongodb';

export async function submitInquiry(data: any) {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('inquiries').insertOne({
      ...data,
      createdAt: new Date(),
      status: 'New'
    });
    return { success: true, id: result.insertedId.toString() };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getInquiries() {
  try {
    const { db } = await connectToDatabase();
    const inquiries = await db.collection('inquiries').find().sort({ createdAt: -1 }).toArray();
    return inquiries.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      company: doc.company,
      service: doc.service,
      message: doc.message,
      status: doc.status || 'New',
      createdAt: doc.createdAt ? doc.createdAt.toISOString() : new Date().toISOString()
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

import { ObjectId } from 'mongodb';

export async function updateInquiryStatus(id: string, status: string) {
  try {
    const { db } = await connectToDatabase();
    await db.collection('inquiries').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteInquiry(id: string) {
  try {
    const { db } = await connectToDatabase();
    await db.collection('inquiries').deleteOne({ _id: new ObjectId(id) });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
