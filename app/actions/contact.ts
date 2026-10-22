'use server';

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

export interface InquiryInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
}

export async function submitInquiry(raw: unknown) {
  try {
    if (!raw || typeof raw !== 'object') {
      return { success: false, error: 'Invalid inquiry data submitted.' };
    }

    const data = raw as Record<string, unknown>;
    const name = typeof data.name === 'string' ? data.name.trim().slice(0, 100) : '';
    const email = typeof data.email === 'string' ? data.email.trim().slice(0, 150) : '';
    const phone = typeof data.phone === 'string' ? data.phone.trim().slice(0, 50) : '';
    const company = typeof data.company === 'string' ? data.company.trim().slice(0, 120) : '';
    const service = typeof data.service === 'string' ? data.service.trim().slice(0, 100) : 'General Inquiry';
    const budget = typeof data.budget === 'string' ? data.budget.trim().slice(0, 100) : 'Standard';
    const message = typeof data.message === 'string' ? data.message.trim().slice(0, 3000) : '';

    if (!name || name.length < 2) {
      return { success: false, error: 'Please provide a valid full name.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return { success: false, error: 'Please provide a valid business email address.' };
    }

    const sanitizedDoc = {
      name,
      email,
      phone,
      company,
      service,
      budget,
      message,
      createdAt: new Date(),
      status: 'New',
    };

    const { db } = await connectToDatabase();
    const result = await db.collection('inquiries').insertOne(sanitizedDoc);
    return { success: true, id: result.insertedId.toString() };
  } catch (error: any) {
    console.error('Failed to record inquiry in MongoDB:', error?.message || error);
    return {
      success: false,
      error:
        error?.message?.includes('MONGODB_URI')
          ? 'Lead capture is currently offline. Please contact us directly at manthanvaghasiya@webiox.tech or via WhatsApp.'
          : error?.message || 'Failed to submit inquiry. Please try again.',
    };
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
      budget: doc.budget,
      message: doc.message,
      status: doc.status || 'New',
      createdAt: doc.createdAt ? doc.createdAt.toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error('getInquiries failed:', error);
    return [];
  }
}

export async function updateInquiryStatus(id: string, status: string) {
  try {
    if (!id || !ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid inquiry ID.' };
    }
    const { db } = await connectToDatabase();
    await db.collection('inquiries').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status.slice(0, 50) } }
    );
    return { success: true };
  } catch (error: any) {
    console.error('updateInquiryStatus failed:', error);
    return { success: false, error: error?.message || 'Update failed' };
  }
}

export async function deleteInquiry(id: string) {
  try {
    if (!id || !ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid inquiry ID.' };
    }
    const { db } = await connectToDatabase();
    await db.collection('inquiries').deleteOne({ _id: new ObjectId(id) });
    return { success: true };
  } catch (error: any) {
    console.error('deleteInquiry failed:', error);
    return { success: false, error: error?.message || 'Delete failed' };
  }
}
