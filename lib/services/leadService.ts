import { connectToDatabase } from '../mongodb';

export interface Lead {
  name?: string;
  email?: string;
  phone?: string;
  serviceInterest?: string;
  budget?: string;
  message?: string;
  chatTranscript?: string;
  createdAt: Date;
}

export async function saveLead(leadData: Partial<Lead>) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('leads');
    
    const newLead = {
      ...leadData,
      createdAt: new Date(),
    };
    
    const result = await collection.insertOne(newLead);
    return { success: true, id: result.insertedId };
  } catch (error) {
    console.error('Error saving lead:', error);
    return { success: false, error: 'Failed to save lead' };
  }
}
